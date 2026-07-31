---
title: Upcoming major module releases
description: Learn what modules and when will have the next major versions release
last_updated: Jul 31, 2026
template: concept-topic-template
---


This document lists all upcoming [major module releases](/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html). Major module relesases may require additional development effort during an upgrade, so we recommend planning ahead.

| MODULE | DATE | REASON FOR THE MAJOR VERSION |
| --- | --- | --- |
| ShopUi 2.0.0 | Aug 03 2026 | The frontend builder for Yves moves from the project's `frontend/` directory into the ShopUi module. Projects must point the `yves:*` npm scripts at the builder in the module, replace `frontend/settings.js` with `frontend/yves.settings.mts`, and run Node.js 24 or later. For details, see [Upgrade to frontend builder v2 for Yves](/docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-yves.html). |
