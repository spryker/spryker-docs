---
title: Demo data was imported incorrectly
description: Learn how to fix the issue when demo data was imported incorrectly
originalLink: https://documentation.spryker.com/2021080/docs/demo-data-was-imported-incorrectly
originalArticleId: 49e90c4b-9c36-4d31-af99-c48dc9d0b412
redirect_from:
  - /2021080/docs/demo-data-was-imported-incorrectly
  - /2021080/docs/en/demo-data-was-imported-incorrectly
  - /docs/demo-data-was-imported-incorrectly
  - /docs/en/demo-data-was-imported-incorrectly
---

## Description
Demo data was imported incorrectly.

## Solution
Re-load the demo data:
```bash
docker/sdk clean-data && docker/sdk up --data && docker/sdk console q:w:s -v -s
```
