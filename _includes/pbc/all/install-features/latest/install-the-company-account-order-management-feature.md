

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Order Management | {{page.version}} |
| Company Account | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/company-sales-connector: "^1.0.0" spryker/company-business-unit-sales-connector: "^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CompanySalesConnector | vendor/spryker/company-sales-connector |
| CompanyBuseinssUnitSalesConnector | vendor/spryker/company-business-unit-sales-connector |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:entity:generate
console uuid:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_company.uuid | column | created |
| spy_company_business_unit.uuid | column | created |
| spy_sales_order.company_uuid | column | created |
| spy_sales_order.company_business_unit_uuid | column | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| Company.uuid | property | Created | src/Generated/Shared/Transfer/CompanyTransfer |
| CompanyBusinessUnit.uuid | property | Created | src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer |
| Order.companyUuid | property | Created | src/Generated/Shared/Transfer/OrderTransfer |
| Order.companyBusinessUnitUuid | property | Created | src/Generated/Shared/Transfer/OrderTransfer |

{% endinfo_block %}

### 3) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
permission.name.SeeCompanyOrdersPermissionPlugin,View Company orders,en_US
permission.name.SeeCompanyOrdersPermissionPlugin,Firmenbestellungen anzeigen,de_DE
permission.name.SeeBusinessUnitOrdersPermissionPlugin,View Business Unit orders,en_US
permission.name.SeeBusinessUnitOrdersPermissionPlugin,Bestellungen von Geschäftsbereichen anzeigen,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| SaveCompanyBusinessUnitUuidOrderPostSavePlugin | Expands sales order with company business unit UUID and persists updated entity. | None | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales |
| SaveCompanyUuidOrderPostSavePlugin | Expands sales order with company UUID and persists updated entity. | None | Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales |

**Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales\SaveCompanyBusinessUnitUuidOrderPostSavePlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales\SaveCompanyUuidOrderPostSavePlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostSavePluginInterface[]
     */
    protected function getOrderPostSavePlugins(): array
    {
        return [
            new SaveCompanyBusinessUnitUuidOrderPostSavePlugin(),
            new SaveCompanyUuidOrderPostSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Log in as a company user and place an order.
Check `spy_sales_order` table and make sure that `company_uuid` and `company_business_unit_uuid` fields are filled with respective UUIDs for the recently placed order.

{% endinfo_block %}

Register permission plugins at Zed layer.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| SeeCompanyOrdersPermissionPlugin | Checks if the customer is allowed to see orders from the same company. | None | Spryker\Zed\CompanySalesConnector\Plugin\Permission |
| SeeBusinessUnitOrdersPermissionPlugin | Checks if the customer is allowed to see orders from same company business unit. | None | Spryker\Zed\CompanyBusinessUnitSalesConnector\Plugin\Permission |

**Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Permission\SeeBusinessUnitOrdersPermissionPlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Permission\SeeCompanyOrdersPermissionPlugin;
use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return \Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface[]
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new SeeBusinessUnitOrdersPermissionPlugin(),
            new SeeCompanyOrdersPermissionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Navigate to Backoffice UI → Maintenance → Sync permissions.
Make sure that you see rows with plugin names at `spy_permission` table.

{% endinfo_block %}

Register permission plugins at Client layer.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| SeeCompanyOrdersPermissionPlugin | Checks if the customer is allowed to see orders from the same company. | None | Spryker\Client\CompanySalesConnector\Plugin\Permission |
| SeeBusinessUnitOrdersPermissionPlugin | Checks if the customer is allowed to see orders from same company business unit. | None | Spryker\Client\CompanyBusinessUnitSalesConnector\Plugin\Permission |

**Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\CompanyBusinessUnitSalesConnector\Plugin\Permission\SeeBusinessUnitOrdersPermissionPlugin;
use Spryker\Client\CompanySalesConnector\Plugin\Permission\SeeCompanyOrdersPermissionPlugin;
use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return \Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface[]
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new SeeCompanyOrdersPermissionPlugin(),
            new SeeBusinessUnitOrdersPermissionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Re-login (or log in) as a Company Admin and navigate to `http://www.mysprykershop.com/en/company/company-role`.
Press **Edit** button for some role and make sure that you are able to assign following permissions:

- View Company orders
- View Business Unit orders

{% endinfo_block %}

Register customer access check plugins.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|CompanyBusinessUnitCustomerOrderAccessCheckPlugin | Returns true if the customer has `SeeBusinessUnitOrdersPermissionPlugin`, false otherwise. | None | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales |
| CompanyCustomerOrderAccessCheckPlugin | Returns true if the customer has `SeeCompanyOrdersPermissionPlugin`, false otherwise. | None | Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales |

**Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales\CompanyBusinessUnitCustomerOrderAccessCheckPlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales\CompanyCustomerOrderAccessCheckPlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales\CompanyFilterOrderSearchQueryExpanderPlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\CustomerOrderAccessCheckPluginInterface[]
     */
    protected function getCustomerOrderAccessCheckPlugins(): array
    {
        return [
            new CompanyBusinessUnitCustomerOrderAccessCheckPlugin(),
            new CompanyCustomerOrderAccessCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that results from `SalesFacade::getCustomerOrder()` are filtered according to access check plugins.

{% endinfo_block %}

### 5) Set up Order Search behavior

If you want to use the order search functionality, then register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CompanyBusinessUnitCustomerFilterOrderSearchQueryExpanderPlugin | Expands `QueryJoinCollectionTransfer` with additional `QueryJoinTransfers` to filter by customer name and email. | None | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales |
| CompanyBusinessUnitCustomerSortingOrderSearchQueryExpanderPlugin | Expands `QueryJoinCollectionTransfer` with additional `QueryJoinTransfers` to sort by customer name or email. | None | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales |
| CompanyBusinessUnitFilterOrderSearchQueryExpanderPlugin | Expands `QueryJoinCollectionTransfer` with additional `QueryJoinTransfer` to filter by company business unit. | None | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales |
| CompanyCustomerFilterOrderSearchQueryExpanderPlugin | Expands `QueryJoinCollectionTransfer` with additional `QueryJoinTransfers` to filter by customer name and email. |None  | Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales |
| CompanyCustomerSortingOrderSearchQueryExpanderPlugin | Expands `QueryJoinCollectionTransfer` with additional `QueryJoinTransfers` to sort by customer name or email. | None | Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales |
| CompanyFilterOrderSearchQueryExpanderPlugin | Expands `QueryJoinCollectionTransfer` with additional `QueryJoinTransfer` to filter by company. | None | Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales |

**Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales\CompanyBusinessUnitCustomerFilterOrderSearchQueryExpanderPlugin;
use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales\CompanyBusinessUnitCustomerSortingOrderSearchQueryExpanderPlugin;
use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales\CompanyBusinessUnitFilterOrderSearchQueryExpanderPlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales\CompanyCustomerFilterOrderSearchQueryExpanderPlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales\CompanyCustomerSortingOrderSearchQueryExpanderPlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales\CompanyFilterOrderSearchQueryExpanderPlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
     /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderQueryExpanderPluginInterface[]
     */
    protected function getOrderSearchQueryExpanderPlugins(): array
    {
        return [
            new CompanyBusinessUnitFilterOrderSearchQueryExpanderPlugin(),
            new CompanyFilterOrderSearchQueryExpanderPlugin(),
            new CompanyBusinessUnitCustomerFilterOrderSearchQueryExpanderPlugin(),
            new CompanyBusinessUnitCustomerSortingOrderSearchQueryExpanderPlugin(),
            new CompanyCustomerFilterOrderSearchQueryExpanderPlugin(),
            new CompanyCustomerSortingOrderSearchQueryExpanderPlugin(),
        ];
    }
}
```

## Install feature frontend

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Customer Account Management | {{page.version}} |
| Company Account | {{page.version}} |


Append glossary according to your configuration:

**src/data/import/glossary.csv**

```php
company_page.label.business_unit,Business Unit,en_US
company_page.label.business_unit,Geschäftsbereich,de_DE
company_page.choice.my_orders,My Orders,en_US
company_page.choice.my_orders,Meine Bestellungen,de_DE
company_page.choice.company_orders,Company Orders,en_US
company_page.choice.company_orders,Firmenbestellungen,de_DE
customer.order.company_user,Company User,en_US
customer.order.company_user,Firmenbenutzer,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 2) Set up order search behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CompanyBusinessUnitOrderSearchFormExpanderPlugin | Expands `OrderSearchForm` with company business unit dropdown. | None | SprykerShop\Yves\CompanyPage\Plugin\CustomerPage |
| CompanyBusinessUnitOrderSearchFormHandlerPlugin | Handles company business unit field data transforming. | None | SprykerShop\Yves\CompanyPage\Plugin\CustomerPage |

**Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CompanyPage\Plugin\CustomerPage\CompanyBusinessUnitOrderSearchFormExpanderPlugin;
use SprykerShop\Yves\CompanyPage\Plugin\CustomerPage\CompanyBusinessUnitOrderSearchFormHandlerPlugin;
use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\OrderSearchFormExpanderPluginInterface[]
     */
    protected function getOrderSearchFormExpanderPlugins(): array
    {
        return [
            new CompanyBusinessUnitOrderSearchFormExpanderPlugin(),
        ];
    }

    /**
     * @return \SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\OrderSearchFormHandlerPluginInterface[]
     */
    protected function getOrderSearchFormHandlerPlugins(): array
    {
        return [
            new CompanyBusinessUnitOrderSearchFormHandlerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Log in as a company user. Navigate to Order History page (`http://www.mysprykershop.com/en/customer/order`), and make sure that search form contains Business Unit dropdown.
Make sure that you are able to choose a certain business unit or company option at respective dropdown according to company user role permissions assigned.
Make sure that you are able to search and filter through the own / business unit/company orders.

{% endinfo_block %}
