---
title: 413 Request Entity Too Large
originalLink: https://documentation.spryker.com/v6/docs/413-request-entity-too-large
redirect_from:
  - /v6/docs/413-request-entity-too-large
  - /v6/docs/en/413-request-entity-too-large
---

## Description
You get the `413 Request Entity Too Large` error.

## Solution
1. Increase the maximum request body size for the related application. See [Deploy File Reference - 1.0](https://documentation.spryker.com/docs/deploy-file-reference-10#groups-applications) to learn how to do that.
2. Fetch the update:
```bash
docker/sdk bootstrap
```
3. Re-build applications:
```bash
docker/sdk up
```
