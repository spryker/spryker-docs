---
title: Migration Guide - ProductPageSearch
last_updated: Dec 24, 2019
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-productpagesearch
originalArticleId: 8dc65c2e-d127-4ec9-a286-79939c4cee65
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

