---
title: Migration Guide - ProductPageSearch
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-productpagesearch
redirect_from:
  - /v4/docs/migration-guide-productpagesearch
  - /v4/docs/en/migration-guide-productpagesearch
---

## Upgrading from Version 2.* to Version 3.*
ProductPageSearch 3.0.0 got separate search index for Concrete Products. It includes database table and ElasticSearch index.

To perform the migration, follow the steps:

1. Run the database migration: 
```Bash
vendor/bin/console propel:install
```
2. Generate transfers:
```Bash:
vendor/bin/console transfer:generate
```
3. Install search:
```Bash:
vendor/bin/console search:setup
```
4. Sync concrete products data with ElasticSearch:
```Bash:
vendor/bin/console data:import:product-concrete
```
or 
```Bash
vendor/bin/console event:trigger -r product_concrete
```

*Estimated migration time: ~2h*

