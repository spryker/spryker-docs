---
title: Tax feature walkthrough
last_updated: Aug 20, 2021
description: The Tax module is responsible for handling tax rates that can apply for products, product options or shipment.
originalLink: https://documentation.spryker.com/v4/docs/tax-module
originalArticleId: 2f0a7456-26a9-4645-9737-9a5e570bf3d3
redirect_from:
  - /v4/docs/tax-module
  - /v4/docs/en/tax-module
---

The _Tax_ feature allows you to define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets.


To learn more about the feature and to find out how end users use it, see [Tax feature overview](/docs/scos/user/features/{{page.version}}/tax/tax-feature-overview.html) for business users.

## Related Developer articles

| MIGRATION GUIDES | GLUE API GUIDES | DATA IMPORT |
|---|---|---|
|Tax migration guide | [Retrieving tax sets](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-tax-sets.html) | [File details: tax.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-tax.csv.html) | |
|  |  | [File details: product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html) | |
|  |  | [File details: product_option.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html) | |
|  |  | [File details: shipment.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-shipment.csv.html) |

