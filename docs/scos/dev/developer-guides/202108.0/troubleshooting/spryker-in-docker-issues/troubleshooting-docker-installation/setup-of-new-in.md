---
title: Setup of new indexes throws an exception
originalLink: https://documentation.spryker.com/2021080/docs/setup-of-new-indexes-throws-an-exception
redirect_from:
  - /2021080/docs/setup-of-new-indexes-throws-an-exception
  - /2021080/docs/en/setup-of-new-indexes-throws-an-exception
---

## Description
Running the command `setup-search-create-sources [vendor/bin/console search:setup:sources]` returns the exception:
```
Elastica\Exception\Connection\HttpException - Exception: Couldn't resolve host
in /data/vendor/ruflin/elastica/lib/Elastica/Transport/Http.php (190)
```

## Solution
Increase RAM for Docker usage.
