---
title: 413 Request Entity Too Large
description: Learn how to fix the issue 413 Request Entity Too Large when running your applications in docker with your Spryker projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/413-request-entity-too-large
originalArticleId: 5cfeaaf5-441d-4e75-92c8-215c2db21af5
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/413-request-entity-too-large.html

---

## Description

You get the `413 Request Entity Too Large` error.

## Solution

1. Increase the maximum request body size for the related application. See [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html) to learn how to do that.
2. Fetch the update:

```bash
docker/sdk bootstrap
```

3. Re-build applications:

```bash
docker/sdk up
```
