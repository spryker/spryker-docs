---
title: Merchant Portal - Marketplace Product feature integration
last_updated: Jan 05, 2021
summary: This integration guide provides steps on how to integrate the Merchant Portal - Marketplace Product feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Merchant Portal - Marketplace Product feature core.

### Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Product | dev-master | [Marketplace Product feature integration](docs/marketplace/dev/feature-integration-guides/marketplace-product-feature-integration.html) |
| Marketplace Merchant Portal Core | dev-master | [Merchant Portal Core feature integration](docs/marketplace/dev/feature-integration-guides/merchant-portal-core-feature-integration.html) |

### 1) Install the required modules using Composer
Run the following commands to install the required modules:

```bash
composer require spryker/product-merchant-portal-gui:"dev-master" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductMerchantPortalGui | spryker/product-merchant-portal-gui |
| ProductMerchantPortalGuiExtension | spryker/product-merchant-portal-gui-extension |

---

### 2) Set up transfer objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
|-|-|-|-|
| MerchantProductTableCriteria | class | Created | src/Generated/Shared/Transfer/MerchantProductTableCriteriaTransfer |
| ProductAbstractCollection | class | Created | src/Generated/Shared/Transfer/ProductAbstractCollectionTransfer |
| PriceProductAbstractTableCriteria | class | Created | src/Generated/Shared/Transfer/PriceProductAbstractTableCriteriaTransfer |
| PriceProductAbstractTableViewCollection | class | Created | src/Generated/Shared/Transfer/PriceProductAbstractTableViewCollectionTransfer |
| PriceProductAbstractTableView | class | Created | src/Generated/Shared/Transfer/PriceProductAbstractTableViewTransfer |

---
