# gloomcheng.github.io

Public founder profile and writing archive for [gloomcheng](https://gloomcheng.github.io/): healthcare AI, FHIR, education technology, open source and the migrated tayanswa「Culture is Life」blog.

## Local development

```bash
bun install
bun run dev
```

Useful routes:

- `/` — personal feature
- `/blog/` — one chronological archive; no reader-facing categories
- `/resume/` — complete Traditional Chinese profile
- `/resume/en/` — English profile

## Verification

```bash
bun run check
```

The repository owns the Astro source and GitHub Pages workflow. A push to `main` installs dependencies, builds `dist/` and deploys the Pages artifact; generated `dist/` files are not committed.

## tayanswa migration

The raw Drupal tree and SQL remain outside this public repository. `scripts/import-tayanswa.mjs` reads an already restored local MariaDB container and generates sanitized Markdown plus referenced public media.

```bash
TAYANSWA_ARCHIVE_DIR=/path/to/private/tayanswa \
TAYANSWA_DB_PASSWORD=temporary-local-password \
bun run import:tayanswa
```

The generated posts preserve original titles, dates, paths and tags for provenance. The public interface intentionally presents one chronological Blog rather than exposing the old Drupal content taxonomy.
