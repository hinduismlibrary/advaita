# Repository tools

Run scripts from the repository root.

- `python3 tools/scripts/site-checks/verify-site-chrome.py` checks published HTML files under `site/` for the shared site chrome.
- `python3 tools/scripts/content-maintenance/audit_bhagavatam_canto11.py` performs the deterministic Canto 11 mapping audit. It writes reports under `docs/audits/canto11/`.
- `python3 tools/scripts/content-maintenance/reconcile_bhagavatam_canto11_ch22.py` applies the narrow verified 11.22 numbering correction.
- `python3 tools/scripts/content-maintenance/reconcile_bhagavatam_canto11_verified.py` applies the separately reviewed Canto 11 corrections.
- `python3 tools/scripts/content-maintenance/make_bhavisya.py` regenerates the Bhaviṣya evidence data in `site/articles/puranic-chronology/`.

The GitHub Actions workflows in `.github/workflows/` are the supported automation entry points for changes that should be reviewed or deployed.
