

This document describes how to install the Product Approval Process feature.

## Install feature core

Follow the steps below to install the Marketplace Product Approval Process feature core.

### Prerequisites

Install the required features:

| NAME         | VERSION            | INSTALLATION GUIDE                                                                                                                    |
|--------------|--------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product      | 202507.0 | [Install the Product feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)           |
| Cart         | 202507.0 | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)                 |
| Checkout     | 202507.0 | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html)         |


### 1) Install the required modules using Сomposer

Install the required modules using Composer:

```bash
composer require spryker-feature/product-approval-process:"202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                      | EXPECTED DIRECTORY                          |
|-----------------------------|---------------------------------------------|
| ProductApproval             | vendor/spryker/product-approval             |
| ProductApprovalDataImport   | vendor/spryker/product-approval-data-import |
| ProductApprovalGui          | vendor/spryker/product-approval-gui         |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                       | TYPE   | EVENT   |
|---------------------------------------|--------|---------|
| spy_product_abstract.approval_status  | column | added   |

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER                                    | TYPE     | EVENT    | PATH                                                                      |
|---------------------------------------------|----------|----------|---------------------------------------------------------------------------|
| ProductAbstractTransfer                     | class    | created  | src/Generated/Shared/Transfer/ProductAbstractTransfer                     |
| ProductConcreteTransfer                     | class    | created  | src/Generated/Shared/Transfer/ProductConcreteTransfer                     |
| CartChangeTransfer                          | class    | created  | src/Generated/Shared/Transfer/CartChangeTransfer                          |
| CartPreCheckResponseTransfer                | class    | created  | src/Generated/Shared/Transfer/CartPreCheckResponseTransfer                |
| MessageTransfer                             | class    | created  | src/Generated/Shared/Transfer/MessageTransfer                             |
| ProductConcreteStorageTransfer              | class    | created  | src/Generated/Shared/Transfer/ProductConcreteStorageTransfer              |
| ProductAbstractStorageTransfer              | class    | created  | src/Generated/Shared/Transfer/ProductAbstractStorageTransfer              |
| CheckoutErrorTransfer                       | class    | created  | src/Generated/Shared/Transfer/CheckoutErrorTransfer                       |
| CheckoutResponseTransfer                    | class    | created  | src/Generated/Shared/Transfer/CheckoutResponseTransfer                    |
| QuoteTransfer                               | class    | created  | src/Generated/Shared/Transfer/QuoteTransfer                               |
| ItemTransfer                                | class    | created  | src/Generated/Shared/Transfer/ItemTransfer                                |
| ShoppingListPreAddItemCheckResponseTransfer | class    | created  | src/Generated/Shared/Transfer/ShoppingListPreAddItemCheckResponseTransfer |
| ShoppingListItemTransfer                    | class    | created  | src/Generated/Shared/Transfer/ShoppingListItemTransfer                    |
| ProductPageSearchTransfer                   | class    | created  | src/Generated/Shared/Transfer/ProductPageSearchTransfer                   |
| DataImporterConfigurationTransfer           | class    | created  | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer           |
| DataImporterReportTransfer                  | class    | created  | src/Generated/Shared/Transfer/DataImporterReportTransfer                  |
| ButtonCollectionTransfer                    | class    | created  | src/Generated/Shared/Transfer/ButtonCollectionTransfer                    |
| QueryCriteriaTransfer                       | class    | created  | src/Generated/Shared/Transfer/QueryCriteriaTransfer                       |
| ButtonTransfer                              | class    | created  | src/Generated/Shared/Transfer/ButtonTransfer                              |

{% endinfo_block %}

### 3) Add translations

Add translations as follows:

1. Append glossary according to your configuration:

 ```yaml
product-approval.message.not-approved,Product sku %sku% is not active.,en_US
product-approval.message.not-approved,Produkt sku %sku% ist nicht aktiv.,de_DE
```

Add the glossary keys:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

2. Generate new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                                      | SPECIFICATION                                                                                                            | PREREQUISITES | NAMESPACE                                                             |
|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------|
| ProductApprovalCartPreCheckPlugin                           | Checks the approval status for products.                                                                                 | None          | Spryker\Zed\ProductApproval\Communication\Plugin\Cart                 |
| ProductApprovalPreReloadItemsPlugin                         | Checks and removes not approved product items.                                                                           | None          | Spryker\Zed\ProductApproval\Communication\Plugin\Cart                 |
| ProductApprovalCheckoutPreConditionPlugin                   | Returns `false` response if at least one quote item transfer has items with not approved product.                        | None          | Spryker\Zed\ProductApproval\Communication\Plugin\Checkout             |
| ProductApprovalProductAbstractPreCreatePlugin               | Expands `ProductAbstract` transfer with default approval status if `ProductAbstract.approvalStatus` property is not set. | None          | Spryker\Zed\ProductApproval\Communication\Plugin\Product              |
| ProductApprovalProductConcreteCollectionFilterPlugin        | Filters out products which have not `approved` status.                                                                   | None          | Spryker\Zed\ProductApproval\Communication\Plugin\ProductPageSearch    |
| ProductApprovalProductPageSearchCollectionFilterPlugin      | Filters out products which have not `approved` status.                                                                   | None          | Spryker\Zed\ProductApproval\Communication\Plugin\ProductPageSearch    |
| ProductApprovalProductAbstractStorageCollectionFilterPlugin | Filters out abstract products which have not `approved` status.                                                          | None          | Spryker\Zed\ProductApproval\Communication\Plugin\ProductStorage       |
| ProductApprovalProductConcreteStorageCollectionFilterPlugin | Filters out products which have not `approved` status.                                                                   | None          | Spryker\Zed\ProductApproval\Communication\Plugin\ProductStorage       |
| ProductApprovalProductAbstractEditViewExpanderPlugin        | Expands view data with abstract product approval status data.                                                            | None          | Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement |
| ProductApprovalProductTableActionExpanderPlugin             | Expands product table with abstract product approval status actions.                                                     | None          | Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement |
| ProductApprovalProductTableConfigurationExpanderPlugin      | Expands `ProductTable` configuration with abstract product approval status column.                                       | None          | Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement |
| ProductApprovalProductTableDataBulkExpanderPlugin           | Expands product table items with abstract product approval status.                                                       | None          | Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement |
| ProductApprovalProductTableQueryCriteriaExpanderPlugin      | Expands query criteria with approval status column.                                                                      | None          | Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement |


**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductApproval\Communication\Plugin\Cart\ProductApprovalCartPreCheckPlugin;
use Spryker\Zed\ProductApproval\Communication\Plugin\Cart\ProductApprovalPreReloadItemsPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface>
     */
    protected function getCartPreCheckPlugins(Container $container): array
    {
        return [
            new ProductApprovalCartPreCheckPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface>
     */
    protected function getPreReloadPlugins(Container $container): array
    {
        return [
            new ProductApprovalPreReloadItemsPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductApproval\Communication\Plugin\Checkout\ProductApprovalCheckoutPreConditionPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>
     */
    protected function getCheckoutPreConditions(Container $container): array
    {
        return [
            new ProductApprovalCheckoutPreConditionPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Product/ProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use Spryker\Zed\ProductApproval\Communication\Plugin\Product\ProductApprovalProductAbstractPreCreatePlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractPreCreatePluginInterface>
     */
    protected function getProductAbstractPreCreatePlugins(): array
    {
        return [
            new ProductApprovalProductAbstractPreCreatePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Zed\ProductApproval\Communication\Plugin\ProductPageSearch\ProductApprovalProductConcreteCollectionFilterPlugin;
use Spryker\Zed\ProductApproval\Communication\Plugin\ProductPageSearch\ProductApprovalProductPageSearchCollectionFilterPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageSearchCollectionFilterPluginInterface>
     */
    protected function getProductPageSearchCollectionFilterPlugins(): array
    {
        return [
            new ProductApprovalProductPageSearchCollectionFilterPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductConcreteCollectionFilterPluginInterface>
     */
    protected function getProductConcreteCollectionFilterPlugins(): array
    {
        return [
            new ProductApprovalProductConcreteCollectionFilterPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductStorage;

use Spryker\Zed\ProductApproval\Communication\Plugin\ProductStorage\ProductApprovalProductAbstractStorageCollectionFilterPlugin;
use Spryker\Zed\ProductApproval\Communication\Plugin\ProductStorage\ProductApprovalProductConcreteStorageCollectionFilterPlugin;
use Spryker\Zed\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductStorageExtension\Dependency\Plugin\ProductAbstractStorageCollectionFilterPluginInterface>
     */
    protected function getProductAbstractStorageCollectionFilterPlugins(): array
    {
        return [
            new ProductApprovalProductAbstractStorageCollectionFilterPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductStorageExtension\Dependency\Plugin\ProductConcreteStorageCollectionFilterPluginInterface>
     */
    protected function getProductConcreteStorageCollectionFilterPlugins(): array
    {
        return [
            new ProductApprovalProductConcreteStorageCollectionFilterPlugin(),
        ];
    }
}
```

<details><summary>src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement\ProductApprovalProductAbstractEditViewExpanderPlugin;
use Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement\ProductApprovalProductTableActionExpanderPlugin;
use Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement\ProductApprovalProductTableConfigurationExpanderPlugin;
use Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement\ProductApprovalProductTableDataBulkExpanderPlugin;
use Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement\ProductApprovalProductTableQueryCriteriaExpanderPlugin;
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractEditViewExpanderPluginInterface>
     */
    protected function getProductAbstractEditViewExpanderPlugins(): array
    {
        return [
            new ProductApprovalProductAbstractEditViewExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableQueryCriteriaExpanderPluginInterface>
     */
    protected function getProductTableQueryCriteriaExpanderPluginInterfaces(): array
    {
        return [
            new ProductApprovalProductTableQueryCriteriaExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableConfigurationExpanderPluginInterface>
     */
    protected function getProductTableConfigurationExpanderPlugins(): array
    {
        return [
            new ProductApprovalProductTableConfigurationExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableDataBulkExpanderPluginInterface>
     */
    protected function getProductTableDataBulkExpanderPlugins(): array
    {
        return [
            new ProductApprovalProductTableDataBulkExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableActionExpanderPluginInterface>
     */
    protected function getProductTableActionExpanderPlugins(): array
    {
        return [
            new ProductApprovalProductTableActionExpanderPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure that the shop owner can approve products so customers can follow the review process in his company.

{% endinfo_block %}

2. Set up shopping list plugins:

| PLUGIN                                                      | SPECIFICATION                                                                                                            | PREREQUISITES | NAMESPACE                                                             |
|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------|
| ProductApprovalAddItemPreCheckPlugin                        | Checks the product approval status for shopping list item.                                                               | None          | Spryker\Zed\ProductApproval\Communication\Plugin\ShoppingList         |

**src/Pyz/Zed/ShoppingList/ShoppingListDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ShoppingList;

use Spryker\Zed\ProductApproval\Communication\Plugin\ShoppingList\ProductApprovalAddItemPreCheckPlugin;
use Spryker\Zed\ShoppingList\ShoppingListDependencyProvider as SprykerShoppingListDependencyProvider;

class ShoppingListDependencyProvider extends SprykerShoppingListDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\AddItemPreCheckPluginInterface>
     */
    protected function getAddItemPreCheckPlugins(): array
    {
        return [
            new ProductApprovalAddItemPreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that shopping list item can't be added to shopping list with not approved status.

{% endinfo_block %}

3. Set up product offer merchant portal plugins:

| PLUGIN                                          | SPECIFICATION                                                                                            | PREREQUISITES | NAMESPACE                                                                               |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------|
| ProductApprovalStatusProductTableExpanderPlugin | Expands GuiTableConfigurationTransfer and GuiTableDataResponseTransfer.data with approval status column. | None          | Spryker\Zed\ProductMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui |

**src/Pyz/Zed/ProductOfferMerchantPortalGui/ProductOfferMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferMerchantPortalGui;

use Spryker\Zed\ProductMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui\ProductApprovalStatusProductTableExpanderPlugin;
use Spryker\Zed\ProductOfferMerchantPortalGui\ProductOfferMerchantPortalGuiDependencyProvider as SprykerProductOfferMerchantPortalGuiDependencyProvider;

class ProductOfferMerchantPortalGuiDependencyProvider extends SprykerProductOfferMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferMerchantPortalGuiExtension\Dependency\Plugin\ProductTableExpanderPluginInterface>
     */
    protected function getProductTableExpanderPlugins(): array
    {
        return [
            new ProductApprovalStatusProductTableExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `GuiTableDataResponseTransfer.data` was extended with approval status column.

{% endinfo_block %}

### 5) Import data

Follow the steps to import product approval data:

1. Prepare data according to your requirements using the following demo data:

<details>
<summary>data/import/common/common/product_abstract_approval_status.csv</summary>

```yaml
sku,approval_status
001,approved
002,approved
003,approved
004,approved
005,approved
006,approved
007,approved
008,approved
009,approved
010,approved
011,approved
012,approved
013,approved
014,approved
015,approved
016,approved
017,approved
018,approved
019,approved
020,approved
021,approved
022,approved
023,approved
024,approved
025,approved
026,approved
027,approved
028,approved
029,approved
030,approved
031,approved
032,approved
033,approved
034,approved
035,approved
036,approved
037,approved
038,approved
039,approved
040,approved
041,approved
042,approved
043,approved
044,approved
045,approved
046,approved
047,approved
048,approved
049,approved
050,approved
051,approved
052,approved
053,approved
054,approved
055,approved
056,approved
057,approved
058,approved
059,approved
060,approved
061,approved
062,approved
063,approved
064,approved
065,approved
066,approved
067,approved
068,approved
069,approved
070,approved
071,approved
072,approved
073,approved
074,approved
075,approved
076,approved
077,approved
078,approved
079,approved
080,approved
081,approved
082,approved
083,approved
084,approved
085,approved
086,approved
087,approved
088,approved
089,approved
090,approved
091,approved
092,approved
093,approved
094,approved
095,approved
096,approved
097,approved
098,approved
099,approved
100,approved
101,approved
102,approved
103,approved
104,approved
105,approved
106,approved
107,approved
108,approved
109,approved
110,approved
111,approved
112,approved
113,approved
114,approved
115,approved
116,approved
117,approved
118,approved
119,approved
120,approved
121,approved
122,approved
123,approved
124,approved
125,approved
126,approved
127,approved
128,approved
129,approved
130,approved
131,approved
132,approved
133,approved
134,approved
135,approved
136,approved
137,approved
138,approved
139,approved
140,approved
141,approved
142,approved
143,approved
144,approved
145,approved
146,approved
147,approved
148,approved
149,approved
150,approved
151,approved
152,approved
153,approved
154,approved
155,approved
156,approved
157,approved
158,approved
159,approved
160,approved
161,approved
162,approved
163,approved
164,approved
165,approved
166,approved
167,approved
168,approved
169,approved
170,approved
171,approved
172,approved
173,approved
174,approved
175,approved
176,approved
177,approved
178,approved
179,approved
180,approved
181,approved
182,approved
183,approved
184,draft
185,approved
186,approved
187,approved
188,approved
189,approved
190,approved
191,approved
192,approved
193,approved
194,approved
195,approved
196,denied
197,approved
198,approved
199,approved
200,approved
201,approved
202,approved
203,approved
204,approved
205,approved
206,approved
207,approved
208,approved
209,waiting_for_approval
210,approved
211,approved
212,approved
213,approved
214,approved
215,approved
216,approved
217,approved
218,approved
218,approved
219,approved
666,approved
fish-1,approved
potato-1,approved
cable-hdmi-1,approved
cable-vga-1,approved
```

</details>

| COLUMN          | Required | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                                |
|-----------------|----------|-----------|--------------|-----------------------------------------------------------------|
| concrete_sku    | &check;        | string    | 214          | Unique abstract product identifier.                             |
| approval_status | &check;        | string    | approved     | Product status (draft, waiting_for_approval, approved, denied). |

2. Register the following data import plugins:

| PLUGIN                                         | SPECIFICATION                               | PREREQUISITES | NAMESPACE                                                             |
|------------------------------------------------|---------------------------------------------|---------------|-----------------------------------------------------------------------|
| ProductAbstractApprovalStatusDataImportPlugin  | Imports abstract product approval statuses. | None          | Spryker\Zed\ProductApprovalDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\ProductApprovalDataImport\Communication\Plugin\DataImport\ProductAbstractApprovalStatusDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerSynchronizationDependencyProvider;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
          new ProductAbstractApprovalStatusDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import product-approval-status
```

{% info_block warningBox "Verification" %}

Make sure that statuses has been added to the `spy_product_abstract` table.

{% endinfo_block %}
