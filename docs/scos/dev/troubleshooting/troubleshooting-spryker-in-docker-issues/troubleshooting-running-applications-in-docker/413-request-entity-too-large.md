---
title: 413 Request Entity Too Large
description: Learn how to fix the issue 413 Request Entity Too Large
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/413-request-entity-too-large
originalArticleId: 5cfeaaf5-441d-4e75-92c8-215c2db21af5
redirect_from:
  - /2021080/docs/413-request-entity-too-large
  - /2021080/docs/en/413-request-entity-too-large
  - /docs/413-request-entity-too-large
  - /docs/en/413-request-entity-too-large
  - /v6/docs/413-request-entity-too-large
  - /v6/docs/en/413-request-entity-too-large
---

## Description
You get the `413 Request Entity Too Large` error.

## Solution
1. Increase the maximum request body size for the related application. See [Deploy File Reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html) to learn how to do that.
2. Fetch the update:
```bash
docker/sdk bootstrap
```
3. Re-build applications:
```bash
docker/sdk up
```
