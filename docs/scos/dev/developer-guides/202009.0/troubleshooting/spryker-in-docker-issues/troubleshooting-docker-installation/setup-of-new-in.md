---
title: Setup of new indexes throws an exception
originalLink: https://documentation.spryker.com/v6/docs/setup-of-new-indexes-throws-an-exception
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
