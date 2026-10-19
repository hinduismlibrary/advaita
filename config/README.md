# Repository configuration

The repository root contains five folders: `.github/`, `config/`, `docs/`, `site/`, and `tools/`.

Each folder has its own `.gitignore` for local files, generated output, and credentials inside that folder. The shared patterns are kept in `gitignore.template`. Git does not apply a nested `.gitignore` to files created directly in the repository root, so use your local `.git/info/exclude` for root-level temporary files.

`site/` is published through `.github/workflows/publish-pages.yml`. Set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** for deployment from this folder.
