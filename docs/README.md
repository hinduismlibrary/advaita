# Repository map

This repository contains a static GitHub Pages site and the material used to maintain it.

- `config/` documents repository settings and contains the shared ignore template.
- `site/` is the published site source. GitHub Actions uploads this folder as the Pages artifact, preserving the public URL paths.
- `docs/project-history/` contains project completion notes, audits, and the site guide.
- `docs/audits/` contains verification reports and generated audit data.
- `docs/templates/` contains editorial template notes.
- `tools/scripts/` contains maintenance and site-check scripts.
- `.github/` contains GitHub Actions workflows and issue templates.

The site’s public paths remain rooted at `/advaita/`; repository storage under `site/` does not add a `/site/` segment to published URLs.
