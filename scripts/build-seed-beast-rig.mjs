import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const sourcePath = resolve(root, 'assets/brand-source/seed-beast-c2/complete-rig-candidate/seed-beast-c2-rig-source.svg')
const outputPath = resolve(root, 'public/assets/brand/seed-beast-c2/complete-rig/seed-beast-c2-rig.svg')
const manifestPath = resolve(root, 'public/assets/brand/seed-beast-c2/complete-rig/rig.json')

const source = await readFile(sourcePath, 'utf8')
const size = source.match(/width="(\d+)" height="(\d+)"/)
const paths = [...source.matchAll(/<path d="([^"]+)" fill="(#[0-9A-F]{6})"\/>/g)].map((match) => ({ d: match[1], fill: match[2] }))

if (!size || paths.length !== 7) {
  throw new Error(`Unexpected stacked VTracer structure: size=${Boolean(size)} paths=${paths.length}`)
}

const features = paths[1].d.match(/[Mm][\s\S]*?Z/g)
if (!features || features.length !== 4) {
  throw new Error(`Expected leaf, two eyes, and mouth; found ${features?.length ?? 0} feature paths`)
}

const bodyPaths = [paths[0], ...paths.slice(2)]
let subpathOrigin = [0, 0]
const absoluteFeatures = features.map((path) => {
  const move = path.match(/^([Mm])(-?\d+(?:\.\d+)?)[, ]?(-?\d+(?:\.\d+)?)/)
  if (!move) throw new Error(`Feature path has no initial move command: ${path.slice(0, 24)}`)
  const x = Number(move[2])
  const y = Number(move[3])
  subpathOrigin = move[1] === 'm' ? [subpathOrigin[0] + x, subpathOrigin[1] + y] : [x, y]
  return `M${subpathOrigin[0]},${subpathOrigin[1]}${path.slice(move[0].length)}`
})
const [leaf, eyeLeft, eyeRight, mouth] = absoluteFeatures
const width = Number(size[1])
const height = Number(size[2])

const pathMarkup = (path, id) => `<path id="${id}" d="${path.d}" fill="${path.fill}"/>`
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="seed-beast-title seed-beast-desc">
  <title id="seed-beast-title">完整開源獸</title>
  <desc id="seed-beast-desc">可分層動畫的橘色種子角色，包含葉片、雙眼、小嘴與完整身體。</desc>
  <style>g{transform-box:fill-box;transform-origin:center}#leaf{transform-origin:80% 88%}#eye-left,#eye-right,#mouth{transform-origin:center}</style>
  <g id="body" data-rig-part="body">
    ${bodyPaths.map((path, index) => pathMarkup(path, `body-layer-${index + 1}`)).join('\n    ')}
  </g>
  <g id="leaf" data-rig-part="leaf"><path d="${leaf}" fill="${paths[1].fill}"/></g>
  <g id="eye-left" data-rig-part="eye-left"><path d="${eyeLeft}" fill="${paths[1].fill}"/></g>
  <g id="eye-right" data-rig-part="eye-right"><path d="${eyeRight}" fill="${paths[1].fill}"/></g>
  <g id="mouth" data-rig-part="mouth"><path d="${mouth}" fill="${paths[1].fill}"/></g>
</svg>
`

const manifest = {
  name: 'seed-beast-c2-complete',
  version: 1,
  source: 'assets/brand-source/seed-beast-c2/complete-rig-candidate/seed-beast-c2-rig-source.svg',
  identityAuthority: '../complete-master/seed-beast-c2-complete.png',
  viewBox: [0, 0, width, height],
  parts: {
    body: { selector: '#body', pivot: [0.5, 0.58] },
    leaf: { selector: '#leaf', pivot: [0.8, 0.88] },
    eyeLeft: { selector: '#eye-left', pivot: [0.5, 0.5] },
    eyeRight: { selector: '#eye-right', pivot: [0.5, 0.5] },
    mouth: { selector: '#mouth', pivot: [0.5, 0.5] },
  },
}

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, svg)
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Wrote ${outputPath}`)
console.log(`Wrote ${manifestPath}`)
