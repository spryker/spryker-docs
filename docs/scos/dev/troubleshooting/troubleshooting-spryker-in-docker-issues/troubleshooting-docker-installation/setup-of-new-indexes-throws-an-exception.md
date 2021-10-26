---
title: Setup of new indexes throws an exception
description: Learn how to fix the issue when setup of new indexes throws an exception
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/setup-of-new-indexes-throws-an-exception
originalArticleId: bd5c483b-b968-46ce-9995-a293a74a8269
redirect_from:
  - /2021080/docs/setup-of-new-indexes-throws-an-exception
  - /2021080/docs/en/setup-of-new-indexes-throws-an-exception
  - /docs/setup-of-new-indexes-throws-an-exception
  - /docs/en/setup-of-new-indexes-throws-an-exception
  - /v6/docs/setup-of-new-indexes-throws-an-exception
  - /v6/docs/en/setup-of-new-indexes-throws-an-exception
---

## Description
Running the command `setup-search-create-sources [vendor/bin/console search:setup:sources]` returns the exception:
```
Elastica\Exception\Connection\HttpException - Exception: Couldn't resolve host
in /data/vendor/ruflin/elastica/lib/Elastica/Transport/Http.php (190)
```

## Solution
Increase RAM for Docker usage.
