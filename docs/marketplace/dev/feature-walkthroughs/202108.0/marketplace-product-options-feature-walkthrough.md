---
title: Marketplace Product Options feature walkthrough
last_updated: Sep 17, 2021
description: Merchant categories allows creating product options and groups.
template: concept-topic-template
---

The *Marketplace Product Options* feature allows merchants to create their product option groups and values.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Product Options feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-product-options-feature-overview.html) for business users.

{% endinfo_block %}

## Modules relation

![Modules relation](https://confluence-connect.gliffy.net/embed/image/d8882366-b2dd-4d6c-b401-01db47a00481.png?utm_medium=live&utm_source=custom)

### Main Marketplace feature modules

| NAME | DESCRIPTION | 
| --- | --- |
| [MerchantProductOption](https://github.com/spryker/merchant-product-option) | Provides merchant product option main business logic and persistence. |
| [MerchantProductOptionDataImport](https://github.com/spryker/merchant-product-option-data-import) | Provides data import functionality for merchant product options. |
| [MerchantProductOptionStorage](https://github.com/spryker/merchant-product-option-storage) | Provides publish and sync functionality for merchant product options. |
| [MerchantProductOptionGui](https://github.com/spryker/merchant-product-option-gui) | Provides backoffice UI for merchant product options management. |

## Domain model

The following diagram illustrates domain model of Marketplace Product Options feature:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/90a0e5bc-a0d9-4cb2-a215-c5d08a786115.png?utm_medium=live&utm_source=custom)

## Related Developer articles

| INTEGRATION GUIDES | DATA IMPORT |
| ---- | --- |
| [Marketplace Product Option feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-option-feature-integration.html) | [File details: merchant product option group](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-option-group.csv.html) |
