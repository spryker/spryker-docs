---
title: Demo data was imported incorrectly
originalLink: https://documentation.spryker.com/v6/docs/demo-data-was-imported-incorrectly
redirect_from:
  - /v6/docs/demo-data-was-imported-incorrectly
  - /v6/docs/en/demo-data-was-imported-incorrectly
---

## Description
Demo data was imported incorrectly.

## Solution
Re-load the demo data:
```bash
docker/sdk clean-data && docker/sdk up --data && docker/sdk console q:w:s -v -s
```
