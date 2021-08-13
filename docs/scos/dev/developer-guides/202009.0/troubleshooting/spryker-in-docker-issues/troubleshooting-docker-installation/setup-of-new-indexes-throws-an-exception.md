---
title: Setup of new indexes throws an exception
description: Learn how to fix the issue when setup of new indexes throws an exception
originalLink: https://documentation.spryker.com/v6/docs/setup-of-new-indexes-throws-an-exception
originalArticleId: 3196dd29-e5b1-42ff-ab82-7afe9e47a79f
redirect_from:
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
