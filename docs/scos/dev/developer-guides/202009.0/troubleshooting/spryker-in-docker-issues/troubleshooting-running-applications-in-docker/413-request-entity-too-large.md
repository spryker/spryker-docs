---
title: 413 Request Entity Too Large
description: Learn how to fix the issue "413 Request Entity Too Large"
originalLink: https://documentation.spryker.com/v6/docs/413-request-entity-too-large
originalArticleId: cb1eb218-60a0-45ed-a437-1281758afec1
redirect_from:
  - /v6/docs/413-request-entity-too-large
  - /v6/docs/en/413-request-entity-too-large
---

## Description
You get the `413 Request Entity Too Large` error.

## Solution
1. Increase the maximum request body size for the related application. See [Deploy File Reference - 1.0](/docs/scos/dev/developer-guides/202009.0/docker-sdk/deploy-file-reference-1.0.html#groups-applications) to learn how to do that.
2. Fetch the update:
```bash
docker/sdk bootstrap
```
3. Re-build applications:
```bash
docker/sdk up
```
