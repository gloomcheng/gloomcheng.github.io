#!/usr/bin/env node
/**
 * Profile Site Harness (ESM / Node.js / Bun)
 *
 * Usage:
 *   bun run scripts/harness.mjs dev [--port 4321]
 *   bun run scripts/harness.mjs preview [--port 4173]
 *   bun run scripts/harness.mjs stop
 *   bun run scripts/harness.mjs status
 *   bun run scripts/harness.mjs check
 */

import { execSync, spawn } from 'node:child_process'
import { existsSync, readFileSync, unlinkSync } from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_DIR = path.resolve(__dirname, '..')
const PID_FILE_DEV = '/tmp/profile-site-dev.pid'
const PID_FILE_PREVIEW = '/tmp/profile-site-preview.pid'

const args = process.argv.slice(2)
const command = args[0] || 'status'

function getPortArg(defaultPort) {
  const idx = args.indexOf('--port')
  if (idx !== -1 && args[idx + 1]) {
    return parseInt(args[idx + 1], 10)
  }
  return defaultPort
}

function findPidsOnPort(port) {
  try {
    const stdout = execSync(`lsof -t -i:${port}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] })
    return stdout.trim().split('\n').filter(Boolean).map(p => parseInt(p, 10))
  } catch {
    return []
  }
}

function isServerHealthy(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/`, { timeout: 1500 }, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400)
    })
    req.on('error', () => resolve(false))
    req.on('timeout', () => {
      req.destroy()
      resolve(false)
    })
  })
}

function openInBrave(url) {
  try {
    const script = `tell application "Brave Browser" to set URL of active tab of front window to "${url}"`
    execSync(`osascript -e '${script}'`, { stdio: 'ignore' })
  } catch {}
}

async function cmdStop() {
  console.log('🛑 Stopping profile site servers...')
  let stoppedAny = false

  for (const port of [4321, 4173]) {
    const pids = findPidsOnPort(port)
    for (const pid of pids) {
      try {
        process.kill(pid, 'SIGTERM')
        stoppedAny = true
        console.log(`  ✓ Stopped process ${pid} on port ${port}`)
      } catch {}
    }
  }

  for (const pidFile of [PID_FILE_DEV, PID_FILE_PREVIEW]) {
    if (existsSync(pidFile)) {
      try {
        const pid = parseInt(readFileSync(pidFile, 'utf8').trim(), 10)
        process.kill(pid, 'SIGKILL')
      } catch {}
      try { unlinkSync(pidFile) } catch {}
    }
  }

  if (!stoppedAny) {
    console.log('  ℹ️ No active servers found on ports 4321 or 4173.')
  } else {
    console.log('  ✓ All servers stopped.')
  }
}

async function cmdStatus() {
  console.log('📊 Profile Site Status:')
  let found = false

  for (const [port, label] of [[4321, 'Dev Server'], [4173, 'Preview Server']]) {
    const pids = findPidsOnPort(port)
    if (pids.length > 0) {
      found = true
      const healthy = await isServerHealthy(port)
      const statusSymbol = healthy ? '🟢 Healthy' : '🟡 Listening'
      console.log(`  • ${label} (Port ${port}): ${statusSymbol} — PIDs: [${pids.join(', ')}]`)
      console.log(`    URL: http://localhost:${port}`)
      console.log(`    Blog: http://localhost:${port}/blog`)
      console.log(`    Resume: http://localhost:${port}/resume`)
      console.log(`    English: http://localhost:${port}/resume/en`)
    } else {
      console.log(`  • ${label} (Port ${port}): ⚪ Inactive`)
    }
  }

  if (!found) {
    console.log('\n  💡 Start server with: bun run harness dev')
  }
}

async function cmdDev() {
  const port = getPortArg(4321)
  await cmdStop()

  console.log(`🚀 Starting Astro Dev Server on port ${port} (0.0.0.0)...`)
  const proc = spawn('bunx', ['astro', 'dev', '--host', '0.0.0.0', '--port', String(port)], {
    cwd: SITE_DIR,
    stdio: 'inherit',
    detached: true
  })
  proc.unref()
  writeFileSync(PID_FILE_DEV, String(proc.pid))

  process.stdout.write('  Waiting for server readiness...')
  let ready = false
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 300))
    process.stdout.write('.')
    if (await isServerHealthy(port)) {
      ready = true
      break
    }
  }
  console.log()

  if (ready) {
    console.log(`  ✓ Dev server is live at http://localhost:${port}`)
    console.log(`    • Story:   http://localhost:${port}/`)
    console.log(`    • Blog:    http://localhost:${port}/blog`)
    console.log(`    • Resume:  http://localhost:${port}/resume`)
    console.log(`    • English: http://localhost:${port}/resume/en`)
    openInBrave(`http://localhost:${port}/resume`)
  } else {
    console.log(`  ⚠️ Server started (PID ${proc.pid}) but did not respond within timeout.`)
  }
}

async function cmdPreview() {
  const port = getPortArg(4173)
  await cmdStop()

  console.log('🔨 Building site first...')
  try {
    execSync('bun run build', { cwd: SITE_DIR, stdio: 'inherit' })
  } catch {
    console.error('❌ Build failed! Aborting preview.')
    process.exit(1)
  }

  console.log(`🚀 Starting Astro Preview Server on port ${port} (0.0.0.0)...`)
  const proc = spawn('bunx', ['astro', 'preview', '--host', '0.0.0.0', '--port', String(port)], {
    cwd: SITE_DIR,
    stdio: 'inherit',
    detached: true
  })
  proc.unref()
  writeFileSync(PID_FILE_PREVIEW, String(proc.pid))

  process.stdout.write('  Waiting for server readiness...')
  let ready = false
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 300))
    process.stdout.write('.')
    if (await isServerHealthy(port)) {
      ready = true
      break
    }
  }
  console.log()

  if (ready) {
    console.log(`  ✓ Preview server is live at http://localhost:${port}`)
    console.log(`    • Story:   http://localhost:${port}/`)
    console.log(`    • Blog:    http://localhost:${port}/blog`)
    console.log(`    • Resume:  http://localhost:${port}/resume`)
    console.log(`    • English: http://localhost:${port}/resume/en`)
    openInBrave(`http://localhost:${port}/resume`)
  } else {
    console.log(`  ⚠️ Server started (PID ${proc.pid}) but did not respond within timeout.`)
  }
}

async function main() {
  switch (command) {
    case 'dev':
      await cmdDev()
      break
    case 'preview':
      await cmdPreview()
      break
    case 'stop':
      await cmdStop()
      break
    case 'status':
      await cmdStatus()
      break
    default:
      console.log('Profile Site Harness')
      console.log('Commands: dev | preview | stop | status')
  }
}

main()
