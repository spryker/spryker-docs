---
title: Merchant Portal - Marketplace Product feature integration
last_updated: Jan 05, 2021
description: This integration guide provides steps on how to integrate the Merchant Portal - Marketplace Product feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Marketplace Product feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Product feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Product | dev-master | [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html) |
| Marketplace Merchant Portal Core | dev-master | [Marketplace Merchant Portal Core feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-core-feature-integration.html) |
| Marketplace Inventory Management  | dev-master | [Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-inventory-management-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-merchant-portal-gui:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductMerchantPortalGui | spryker/product-merchant-portal-gui |
| ProductMerchantPortalGuiExtension | spryker/product-merchant-portal-gui-extension |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}
    
Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
|-|-|-|-|
| MerchantProductTableCriteria | class | Created | src/Generated/Shared/Transfer/MerchantProductTableCriteriaTransfer |
| ProductAbstractCollection | class | Created | src/Generated/Shared/Transfer/ProductAbstractCollectionTransfer |
| ProductTableCriteria | class | Created | src/Generated/Shared/Transfer/ProductTableCriteriaTransfer |
| ProductAttributeTableCriteria | class | Created | src/Generated/Shared/Transfer/ProductAttributeTableCriteriaTransfer |
| PriceProductTableCriteria | class | Created | src/Generated/Shared/Transfer/PriceProductTableCriteriaTransfer |
| PriceProductTableViewCollection | class | Created | src/Generated/Shared/Transfer/PriceProductTableViewCollectionTransfer |
| PriceProductTableView | class | Created | src/Generated/Shared/Transfer/PriceProductTableViewTransfer |
| MerchantUser.merchant | property | Created | src/Generated/Shared/Transfer/MerchantUserTransfer |

{% endinfo_block %}

### 3) Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```
