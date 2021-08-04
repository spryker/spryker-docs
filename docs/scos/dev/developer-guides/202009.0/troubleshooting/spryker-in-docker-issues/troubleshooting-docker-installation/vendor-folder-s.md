---
title: Vendor folder synchronization error
originalLink: https://documentation.spryker.com/v6/docs/vendor-folder-synchronization-error
redirect_from:
  - /v6/docs/vendor-folder-synchronization-error
  - /v6/docs/en/vendor-folder-synchronization-error
---

## Description
You get an error similar to `vendor/bin/console: not found`.

## Solution
Re-build basic images, assets, and codebase:
```bash
docker/sdk up --build --assets
```
