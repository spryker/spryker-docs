---
title: Vendor folder synchronization error
description: Learn how to fix the vendor folder synchronization error
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/vendor-folder-synchronization-error
originalArticleId: 375db95b-7144-4fb0-ac97-2ebec018f9d2
redirect_from:
  - /2021080/docs/vendor-folder-synchronization-error
  - /2021080/docs/en/vendor-folder-synchronization-error
  - /docs/vendor-folder-synchronization-error
  - /docs/en/vendor-folder-synchronization-error
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
