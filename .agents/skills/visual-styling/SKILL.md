---
name: visual-styling
description: Make scoped, accessible, responsive visual changes to the correct Advaita Library page family without rewriting content, reader data, or application behavior.
---

# Visual styling

Own typography, spacing, color, layout, and visual states. Do not own editorial content, primary text, source data, or JavaScript behavior.

## Read first

- The requested route and its page family
- `SITE_MAINTENANCE.md`
- The nearest style reference and the stylesheet actually loaded by the target page
- Existing responsive and accessibility rules in that component

Examples of distinct families include standardized essays (`site/assets/css/article-standard.css`, with the Vishnu article as a reference), shared site chrome (`site/assets/css/site-chrome.css`), Shankara readers (`site/assets/css/shankara-reader-standard.css`), MMK readers (`site/assets/css/mmk-reader.css`), and Bhagavad Gītā pages (`site/assets/css/bhagavad-gita.css`). Identify the target before choosing a stylesheet.

## Workflow

1. Record the target route, viewport(s), page family, visual reference, and exact design issue.
2. Inspect DOM structure and current styles; choose the narrowest responsible stylesheet and selector scope.
3. Change one coherent visual concern at a time. Preserve page-specific layout and shared tokens.
4. Check desktop and narrow layouts, keyboard focus, contrast, readable line lengths, overflow, and content visibility. Ensure style does not depend on a script that removes or replaces the document.
5. Hand off changed selectors/files, routes, viewports, reference, and unresolved differences to quality testing.

## Do

- Keep page-family-specific changes scoped; use shared chrome only when the request is genuinely site-wide.
- Preserve native document flow, source order, responsive tables, visible focus, and no-JavaScript reading.
- Use existing typography, colors, spacing, and components when they meet the brief.
- Make content hierarchy clear without changing what the text says.

## Do not

- Do not rewrite, truncate, hide, reorder, or manufacture content to achieve a layout.
- Do not modify JSON data, source manifests, translations, or reader semantics from this role.
- Do not broaden selectors or alter global chrome for a single-page problem.
- Do not use CSS to hide a failed test, missing asset, absent text, or accessibility issue.
- Do not patch JavaScript or site routing under the guise of a styling fix; hand it to the appropriate specialist.

## Completion and handoff

Use the shared handoff template. Include target route, reference page, stylesheets/selectors changed, viewport coverage, focus and overflow observations, and known visual differences. Leave functional and cross-browser claims to quality testing.
