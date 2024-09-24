

This document describes how to install the Merchant Portal - Marketplace Product feature.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Product feature core.

### Prerequisites

Install the required features:

| NAME                             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                                    |
|----------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Product              | {{page.version}} | [Install the Marketplace Product feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html)                |
| Marketplace Merchant Portal Core | {{page.version}} | [Install the Marketplace Merchant Portal Core feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |
| Marketplace Inventory Management | {{page.version}} | [Install the Marketplace Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-inventory-management-feature.html)             |


### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-merchant-portal-product-management:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                            | EXPECTED DIRECTORY                            |
|-----------------------------------|-----------------------------------------------|
| ProductMerchantPortalGui          | spryker/product-merchant-portal-gui           |
| ProductMerchantPortalGuiExtension | spryker/product-merchant-portal-gui-extension |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                        | TYPE     | EVENT   | PATH                                                                  |
|---------------------------------|----------|---------|-----------------------------------------------------------------------|
| MerchantProductTableCriteria    | class    | Created | src/Generated/Shared/Transfer/MerchantProductTableCriteriaTransfer    |
| ProductAbstractCollection       | class    | Created | src/Generated/Shared/Transfer/ProductAbstractCollectionTransfer       |
| ProductTableCriteria            | class    | Created | src/Generated/Shared/Transfer/ProductTableCriteriaTransfer            |
| ProductAttributeTableCriteria   | class    | Created | src/Generated/Shared/Transfer/ProductAttributeTableCriteriaTransfer   |
| PriceProductTableCriteria       | class    | Created | src/Generated/Shared/Transfer/PriceProductTableCriteriaTransfer       |
| PriceProductTableViewCollection | class    | Created | src/Generated/Shared/Transfer/PriceProductTableViewCollectionTransfer |
| PriceProductTableView           | class    | Created | src/Generated/Shared/Transfer/PriceProductTableViewTransfer           |
| MerchantUser.merchant           | property | Created | src/Generated/Shared/Transfer/MerchantUserTransfer                    |

{% endinfo_block %}

### 3) Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure that you can create a new product in the Merchant Portal and observe it after creation in the product data table.

{% endinfo_block %}

### 4) Configure navigation

Add marketplace section to `navigation-main-merchant-portal.xml`:

**config/Zed/navigation-main-merchant-portal.xml**

```xml
<?xml version="1.0"?>
<config>
    <product-merchant-portal-gui>
        <label>Products</label>
        <title>Products</title>
        <icon>products</icon>
        <bundle>product-merchant-portal-gui</bundle>
        <controller>products</controller>
        <action>index</action>
    </product-merchant-portal-gui>
    <variants-product-merchant-portal-gui>
        <label>Variants</label>
        <title>Variants</title>
        <icon>variants</icon>
        <bundle>product-merchant-portal-gui</bundle>
        <controller>products-concrete</controller>
        <action>index</action>
    </variants-product-merchant-portal-gui>
</config>
```

Execute the following command:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that you can see the **Products** and **Variants** buttons in the navigation menu of the Merchant Portal.

{% endinfo_block %}