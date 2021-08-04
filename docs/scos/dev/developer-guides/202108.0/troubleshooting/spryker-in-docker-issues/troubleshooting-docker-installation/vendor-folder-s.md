---
title: Vendor folder synchronization error
originalLink: https://documentation.spryker.com/2021080/docs/vendor-folder-synchronization-error
redirect_from:
  - /2021080/docs/vendor-folder-synchronization-error
  - /2021080/docs/en/vendor-folder-synchronization-error
---

## Description
You get an error similar to `vendor/bin/console: not found`.

## Solution
Re-build basic images, assets, and codebase:
```bash
docker/sdk up --build --assets
```
