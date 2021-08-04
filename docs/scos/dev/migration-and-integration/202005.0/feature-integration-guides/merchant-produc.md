---
title: Merchant Product Restrictions Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/merchant-product-restrictions-feature-integration
redirect_from:
  - /v5/docs/merchant-product-restrictions-feature-integration
  - /v5/docs/en/merchant-product-restrictions-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core |master  |
| Product Lists | master |
| Merchant | master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/merchant-product-restrictions:"^master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed: 

| Module | Expected Directory |
| --- | --- |
| `MerchantRelationshipProductList` | `vendor/spryker/merchant-relationship-product-list` |
| `MerchantRelationshipProductListDataImport` | `vendor/spryker/merchant-relationship-product-list-data-import` |
| `MerchantRelationshipProductListGui` | `vendor/spryker/merchant-relationship-product-list-gui` |

{% endinfo_block %}

### 2) Set up Database Schema
Run the following commands to apply database changes, as well as generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```
{% info_block warningBox "Verification" %}

Make sure that the following changes by checking your database:

| Database Entity | Type | Event |
| --- | --- | --- |
| `spy_product_list.fk_merchant_relationship` | column | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Type |
| --- | --- | --- | --- |
| `MerchantRelationshipFilter` | class | created | `src/Generated/Shared/Transfer/MerchantRelationshipFilterTransfer` |

{% endinfo_block %}


### 3) Import Data
#### Import Merchant Relationship to Product Lists
Prepare your data according to your requirements using our demo data:

```yaml
merchant_relation_key,product_list_key
mr-008,pl-001
mr-008,pl-002
mr-008,pl-003
mr-009,pl-004
mr-010,pl-005
mr-011,pl-006
mr-011,pl-007
mr-011,pl-008
```

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
|`merchant_relation_key`  | mandatory | string | mr-008 | Identifier of merchant relations. The merchant relations must exist already. |
| `product_list_key` |mandatory  | string | pl-001 | Identifier of product lists. The product lists must exist already. |
		
Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `MerchantRelationshipProductListDataImportPlugin` | Imports basic product list data into the database. | <ul><li>Merchant relations must be imported first.</li><li>Product lists must be imported first.</li></ul> | `Spryker\Zed\MerchantRelationshipProductListDataImport\Communication\Plugin` |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**
    
```php
<?php
   
namespace Pyz\Zed\DataImport;
   
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantRelationshipProductListDataImport\Communication\Plugin\MerchantRelationshipProductListDataImportPlugin;
   
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantRelationshipProductListDataImportPlugin(),
        ];
    }
} 
```

Run the following console command to import data:

```bash
console data:import merchant-relationship-product-list
```

{% info_block warningBox "Verification" %}
Make sure that the configured data are added to the `spy_product_list` table in the database.
{% endinfo_block %}

### 4) Set up Behavior

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|`ProductListCustomerTransferExpanderPlugin`  | <ul><li>Expands the customer transfer object with their assigned product lists.</li><li>The product list information is based on the customer's merchant relationship.</li></ul> | None |  `Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\Customer` |

**src/Pyz/Zed/Customer/CustomerDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Customer;
 
use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\Customer\ProductListCustomerTransferExpanderPlugin;
 
class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
    /**
     * @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface[]
     */
    protected function getCustomerTransferExpanderPlugins()
    {
        return [
            new ProductListCustomerTransferExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure, that when a customer (with an assigned merchant relationship that has assigned product lists) logs in, sees products only according their product list restrictions.

{% endinfo_block %}

#### Register Post-create and Post-update Plugins for MerchantRelationship Module

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|`ProductListMerchantRelationshipPostCreatePlugin`  | Assigns Product Lists to Merchant Relationship after its creation. | None |  `Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\MerchantRelationship` |
|`ProductListMerchantRelationshipPostUpdatePlugin`  | Assigns/unassigns Product Lists to Merchant Relationship after its update. | None |  `Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\MerchantRelationship` |
|`ProductListRelationshipMerchantRelationshipPreDeletePlugin`  | Cleanups relations to merchant from product list on merchant relationship removing. | None |  `Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\MerchantRelationship` |

**src/Pyz/Zed/MerchantRelationship/MerchantRelationshipDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\MerchantRelationship;
 
use Spryker\Zed\MerchantRelationship\MerchantRelationshipDependencyProvider as SprykerMerchantRelationshipDependencyProvider;
use Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\MerchantRelationship\ProductListMerchantRelationshipPostCreatePlugin;
use Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\MerchantRelationship\ProductListMerchantRelationshipPostUpdatePlugin;
use Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\MerchantRelationship\ProductListRelationshipMerchantRelationshipPreDeletePlugin;
 
class MerchantRelationshipDependencyProvider extends SprykerMerchantRelationshipDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantRelationshipExtension\Dependency\Plugin\MerchantRelationshipPreDeletePluginInterface[]
     */
    protected function getMerchantRelationshipPreDeletePlugins(): array
    {
        return [
            new ProductListRelationshipMerchantRelationshipPreDeletePlugin(),
        ];
    }
    /**
     * @return \Spryker\Zed\MerchantRelationshipExtension\Dependency\Plugin\MerchantRelationshipPostCreatePluginInterface[]
     */
    protected function getMerchantRelationshipPostCreatePlugins(): array
    {
        return [
            new ProductListMerchantRelationshipPostCreatePlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Zed\MerchantRelationshipExtension\Dependency\Plugin\MerchantRelationshipPostUpdatePluginInterface[]
     */
    protected function getMerchantRelationshipPostUpdatePlugins(): array
    {
        return [
            new ProductListMerchantRelationshipPostUpdatePlugin(),
        ];
    }
}
```

{% info_block warningBox "your title goes here" %}

Make sure that `fk_merchant_relationship field` of the `spy_product_list` table was changed while assigning product lists at merchant relationship create/update pages.

Make sure that `fk_merchant_relationship` field of the `spy_product_list` will be set to null after merchant relationship deletion.

{% endinfo_block %}

#### Register Delete Pre-check Plugins for the ProductList Module

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `MerchantRelationshipProductListDeletePreCheckPlugin` | Finds merchant relationships that use given Product List. Disallows Product List deleting if any usage cases found. | None | `Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\ProductList` |

**src/Pyz/Zed/ProductList/ProductListDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\ProductList;
 
use Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\ProductList\MerchantRelationshipProductListDeletePreCheckPlugin;
use Spryker\Zed\ProductList\ProductListDependencyProvider as SprykerProductListDependencyProvider;
 
class ProductListDependencyProvider extends SprykerProductListDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductListExtension\Dependency\Plugin\ProductListDeletePreCheckPluginInterface[]
     */
    protected function getProductListDeletePreCheckPlugins(): array
    {
        return [
            new MerchantRelationshipProductListDeletePreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that it's impossible to delete a Product List if it's used by Merchant Relation.

{% endinfo_block %}

### 8) Configure Zed UI
#### Register Form Expander Plugins for the MerchantRelationshipGui Module
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductListMerchantRelationshipCreateFormExpanderPlugin` | Adds Product List multi-select field to merchant relationship create form. | None | `Spryker\Zed\MerchantRelationshipProductListGui\Communication\Plugin\MerchantRelationshipGui` |
| `ProductListMerchantRelationshipEditFormExpanderPlugin` | Adds Product List multi-select field to merchant relationship create form. | None | `Spryker\Zed\MerchantRelationshipProductListGui\Communication\Plugin\MerchantRelationshipGui` |
{% info_block warningBox "Verification" %}

Make sure that additional field **Assigned Product Lists** is present at **Merchant Relationship create/edit** pages.

{% endinfo_block %}

#### Register Plugins for the ProductListGui Module

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `MerchantRelationListProductListTopButtonsExpanderPlugin` | Expands buttons list with Merchant Relations list page button. | cell | `Spryker\Zed\MerchantRelationshipProductListGui\Communication\Plugin\ProductListGui`|
| `MerchantRelationshipProductListUsedByTableExpanderPlugin` | Expands table data with Merchant Relationships which use Product List. | cell | `Spryker\Zed\MerchantRelationshipProductListGui\Communication\Plugin\ProductListGui` |

**src/Pyz/Zed/ProductListGui/ProductListGuiDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\ProductListGui;
 
use Spryker\Zed\MerchantRelationshipProductListGui\Communication\Plugin\ProductListGui\MerchantRelationListProductListTopButtonsExpanderPlugin;
use Spryker\Zed\MerchantRelationshipProductListGui\Communication\Plugin\ProductListGui\MerchantRelationshipProductListUsedByTableExpanderPlugin;
use Spryker\Zed\ProductListGui\ProductListGuiDependencyProvider as SprykerProductListGuiDependencyProvider;
 
class ProductListGuiDependencyProvider extends SprykerProductListGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductListGuiExtension\Dependency\Plugin\ProductListTopButtonsExpanderPluginInterface[]
     */
    protected function getProductListTopButtonsExpanderPlugins(): array
    {
        return [
            new MerchantRelationListProductListTopButtonsExpanderPlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Zed\ProductListGuiExtension\Dependency\Plugin\ProductListUsedByTableExpanderPluginInterface[]
     */
    protected function getProductListUsedByTableExpanderPlugins(): array
    {
        return [
            new MerchantRelationshipProductListUsedByTableExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that **Merchant Relations** button exists on the **Overview of Product lists** page.

Make sure that **Used by** table was populated by merchant relationships (in cases of relationship) on the **Edit Product List** page.

{% endinfo_block %}
