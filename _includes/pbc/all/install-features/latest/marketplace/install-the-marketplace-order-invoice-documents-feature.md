This document describes how to install the [Marketplace order invoice documents](/docs/pbc/all/order-management-system/latest/marketplace/marketplace-order-management-feature-overview/marketplace-order-invoice-documents-overview.html) feature.

{% include pbc/all/order-management-system/order-invoice-liability.md %} <!-- To edit, see /_includes/pbc/all/order-management-system/order-invoice-liability.md -->

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|---|---|---|
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Order Invoice Documents | {{page.release_tag}} | [Install the Order Invoice Documents feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-invoice-documents-feature.html) |
| Marketplace Order Management | {{page.release_tag}} | [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/latest/marketplace/install-features/install-the-marketplace-order-management-feature.html) |
| Marketplace Order Management + Merchant Portal | {{page.release_tag}} | [Install the Marketplace Order Management + Merchant Portal feature](/docs/pbc/all/order-management-system/latest/marketplace/install-features/install-the-marketplace-order-management-merchant-portal-feature.html) |
| Marketplace Merchant Portal Core | {{page.release_tag}} | [Install the Marketplace Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-sales-invoice:"^1.0.0" spryker/sales-invoice:"^1.7.0" spryker/sales-invoice-extension:"^1.1.0" spryker/sales-merchant-portal-gui:"^4.3.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|---|---|
| MerchantSalesInvoice | vendor/spryker/merchant-sales-invoice |
| SalesInvoice | vendor/spryker/sales-invoice |
| SalesInvoiceExtension | vendor/spryker/sales-invoice-extension |
| SalesMerchantPortalGui | vendor/spryker/sales-merchant-portal-gui |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

The module adds the merchant reference of an invoice to the `spy_sales_order_invoice` table. Apply the database changes and generate the transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied to the database:

| DATABASE ENTITY | TYPE | EVENT |
|---|---|---|
| spy_sales_order_invoice.merchant_reference | column | created |
| spy_sales_order_invoice-unique-sales_order-merchant_reference | unique key | created |

Make sure the following transfer objects have been generated:

| TRANSFER | TYPE | EVENT | PATH |
|---|---|---|---|
| OrderInvoice.merchantReference | property | created | src/Generated/Shared/Transfer/OrderInvoiceTransfer |
| OrderInvoice.merchant | property | created | src/Generated/Shared/Transfer/OrderInvoiceTransfer |
| MerchantOrder.orderInvoices | property | created | src/Generated/Shared/Transfer/MerchantOrderTransfer |

{% endinfo_block %}

### 3) Set up the OMS process

The invoice of a merchant is generated when the merchant's items enter the `shipped by merchant` state. Add the `MarketplaceInvoice` subprocess to the marketplace state machine and replace the direct transition from `shipped by merchant` to `delivered` with the transition through the new `invoice generated` state. The subprocess also declares the `deliver` event, so the items are delivered from `invoice generated`.

1. Create the subprocess:

**config/Zed/oms/MarketplaceSubprocess/MarketplaceInvoice01.xml**

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="MarketplaceInvoice">
        <states>
            <state name="invoice generated" reserved="true" display="oms.state.shipped-by-merchant"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>shipped by merchant</source>
                <target>invoice generated</target>
                <event>invoice-generate</event>
            </transition>

            <transition happy="true">
                <source>invoice generated</source>
                <target>delivered</target>
                <event>deliver</event>
            </transition>
        </transitions>

        <events>
            <event name="invoice-generate" onEnter="true" command="MerchantInvoice/Generate"/>
            <event name="deliver"/>
        </events>
    </process>

</statemachine>
```

2. Include the subprocess in the marketplace process, remove the direct `shipped by merchant` → `delivered` transition, and remove the `<event name="deliver"/>` declaration from the events of the main process, because the subprocess now declares it:

**config/Zed/oms/MarketplacePayment01.xml**

```xml
<process name="MarketplacePayment01" main="true">
    <subprocesses>
        <process>MarketplaceInvoice</process>
    </subprocesses>
</process>

<process name="MarketplaceInvoice" file="MarketplaceSubprocess/MarketplaceInvoice01.xml"/>
```

3. Optional: to get one invoice per merchant from the manual `invoice-generate` event of a non-marketplace payment process too, switch its command to `MerchantInvoice/Generate`:

**config/Zed/oms/DummySubprocess/DummyInvoice01.xml**

```xml
<event name="invoice-generate" manual="true" command="MerchantInvoice/Generate"/>
```

4. If the [Marketplace Return Management](/docs/pbc/all/return-management/latest/marketplace/install-and-upgrade/install-the-marketplace-return-management-feature.html) feature is installed, let returns start while the items are in `invoice generated`. Add the transition to the `MarketplaceReturn` subprocess and the state to the returnable states:

**config/Zed/oms/MarketplaceSubprocess/MarketplaceReturn01.xml**

```xml
<transition>
    <source>invoice generated</source>
    <target>waiting for return</target>
    <event>start-return</event>
</transition>
```

**src/Pyz/Zed/SalesReturn/SalesReturnConfig.php**

```php
<?php

namespace Pyz\Zed\SalesReturn;

use Spryker\Zed\SalesReturn\SalesReturnConfig as SprykerSalesReturnConfig;

class SalesReturnConfig extends SprykerSalesReturnConfig
{
    /**
     * @var array<string>
     */
    protected const RETURNABLE_STATE_NAMES = [
        'shipped',
        'delivered',
        'shipped by merchant',
        'invoice generated',
    ];
}
```

5. Register the OMS command:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| GenerateMerchantOrderInvoicesCommandPlugin | Generates one invoice per merchant of the order items of the OMS event and one invoice for the items without a merchant. |  | Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\Oms |

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\Oms\GenerateMerchantOrderInvoicesCommandPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandCollection;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(static::COMMAND_PLUGINS, function (CommandCollection $commandCollection) {
            $commandCollection->add(new GenerateMerchantOrderInvoicesCommandPlugin(), 'MerchantInvoice/Generate');

            return $commandCollection;
        });

        return $container;
    }
}
```

6. Rebuild the OMS process cache:

```bash
console oms:process-cache:warm-up
```

{% info_block warningBox "Verification" %}

Open **Administration&nbsp;<span aria-label="and then">></span> OMS** in the Back Office and make sure the `MarketplacePayment01` process shows the `invoice generated` state between `shipped by merchant` and `delivered`, with the `deliver` event leaving `invoice generated`. With the Marketplace Return Management feature, make sure the `start-return` event is available from `invoice generated` too.

{% endinfo_block %}

### 4) Set up behavior

1. Register the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| MerchantReferenceOrderInvoiceBeforeSavePlugin | Stores the merchant reference shared by the items of the invoice; `NULL` for the items without a merchant. |  | Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\SalesInvoice |
| MerchantOrderInvoiceExistenceCheckStrategyPlugin | Reports an existing invoice per order and merchant reference instead of per order. |  | Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\SalesInvoice |
| MerchantOrderInvoiceRenderOrderExpanderPlugin | Narrows the rendered order to the items, expenses, and totals of the invoice's merchant and adds the merchant to the invoice; recalculates the totals for the invoice of the items without a merchant. |  | Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\SalesInvoice |
| MerchantOrderInvoicesExpanderPlugin | Adds `OrderInvoice.merchant` to every loaded invoice with a merchant reference. |  | Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\SalesInvoice |
| OrderInvoicesMerchantOrderExpanderPlugin | Adds the invoices of the merchant to `MerchantOrder.orderInvoices` for the Merchant Portal order page. |  | Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\MerchantSalesOrder |
| MerchantSalesInvoiceMerchantAclRuleExpanderPlugin | Grants merchant users access to the `merchant-sales-invoice` bundle. |  | Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\AclMerchantPortal |
| MerchantSalesInvoiceMerchantAclEntityRuleExpanderPlugin | Expands the `AclEntityRule` transfer objects of a merchant with the rule that lets merchant users create, read, and update the `SpySalesOrderInvoice` entities of their orders. Required because the invoice is generated inside the Merchant Portal request that ships the items. |  | Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\AclMerchantPortal |
| MerchantSalesInvoiceAclEntityConfigurationExpanderPlugin | Registers `SpySalesOrderInvoice` as a regular child of `SpySalesOrder`, so that the merchant rule for invoices applies instead of the `create` permission of `SpySalesOrder`, and adds `SpySequenceNumber` to the ACL entity allow list, so that invoice references can be generated from the Merchant Portal. | Expects `SalesInvoiceAclEntityConfigurationExpanderPlugin` to be registered before it. | Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\AclMerchantPortal |
| MerchantOrderInvoiceSalesListBlockRendererPlugin | Renders the **Documents** block of the Back Office order page with a **Merchant** column; replaces `OrderInvoiceSalesListBlockRendererPlugin`. |  | Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\Sales |

**src/Pyz/Zed/SalesInvoice/SalesInvoiceDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesInvoice;

use Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\SalesInvoice\MerchantOrderInvoiceExistenceCheckStrategyPlugin;
use Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\SalesInvoice\MerchantOrderInvoiceRenderOrderExpanderPlugin;
use Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\SalesInvoice\MerchantOrderInvoicesExpanderPlugin;
use Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\SalesInvoice\MerchantReferenceOrderInvoiceBeforeSavePlugin;
use Spryker\Zed\SalesInvoice\SalesInvoiceDependencyProvider as SprykerSalesInvoiceDependencyProvider;

class SalesInvoiceDependencyProvider extends SprykerSalesInvoiceDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoiceBeforeSavePluginInterface>
     */
    protected function getOrderInvoiceBeforeSavePlugins(): array
    {
        return [
            new MerchantReferenceOrderInvoiceBeforeSavePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoicesExpanderPluginInterface>
     */
    protected function getOrderInvoicesExpanderPlugins(): array
    {
        return [
            new MerchantOrderInvoicesExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoiceExistenceCheckStrategyPluginInterface>
     */
    protected function getOrderInvoiceExistenceCheckStrategyPlugins(): array
    {
        return [
            new MerchantOrderInvoiceExistenceCheckStrategyPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoiceRenderOrderExpanderPluginInterface>
     */
    protected function getOrderInvoiceRenderOrderExpanderPlugins(): array
    {
        return [
            new MerchantOrderInvoiceRenderOrderExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/MerchantSalesOrder/MerchantSalesOrderDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantSalesOrder;

use Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\MerchantSalesOrder\OrderInvoicesMerchantOrderExpanderPlugin;
use Spryker\Zed\MerchantSalesOrder\MerchantSalesOrderDependencyProvider as SprykerMerchantSalesOrderDependencyProvider;

class MerchantSalesOrderDependencyProvider extends SprykerMerchantSalesOrderDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantSalesOrderExtension\Dependency\Plugin\MerchantOrderExpanderPluginInterface>
     */
    protected function getMerchantOrderExpanderPlugins(): array
    {
        return [
            new OrderInvoicesMerchantOrderExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\AclMerchantPortal\MerchantSalesInvoiceAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\AclMerchantPortal\MerchantSalesInvoiceMerchantAclEntityRuleExpanderPlugin;
use Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\AclMerchantPortal\MerchantSalesInvoiceMerchantAclRuleExpanderPlugin;
use Spryker\Zed\SalesInvoice\Communication\Plugin\AclMerchantPortal\SalesInvoiceAclEntityConfigurationExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\MerchantAclRuleExpanderPluginInterface>
     */
    protected function getMerchantAclRuleExpanderPlugins(): array
    {
        return [
            new MerchantSalesInvoiceMerchantAclRuleExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\MerchantAclEntityRuleExpanderPluginInterface>
     */
    protected function getMerchantAclEntityRuleExpanderPlugins(): array
    {
        return [
            new MerchantSalesInvoiceMerchantAclEntityRuleExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\AclEntityConfigurationExpanderPluginInterface>
     */
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            new SalesInvoiceAclEntityConfigurationExpanderPlugin(),
            new MerchantSalesInvoiceAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\MerchantSalesInvoice\Communication\Plugin\Sales\MerchantOrderInvoiceSalesListBlockRendererPlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\SalesDetailBlockRendererPluginInterface>
     */
    protected function getSalesDetailBlockRendererPlugins(): array
    {
        return [
            new MerchantOrderInvoiceSalesListBlockRendererPlugin(),
        ];
    }
}
```

2. Allow the Merchant Portal firewall to serve the invoice page. The default pattern of the Merchant Portal firewall covers only the `*-merchant-portal-gui` bundles; without the `merchant-sales-invoice` bundle in it, the Back Office firewall redirects the page to the Back Office login. Add `merchant-sales-invoice` as an alternative to the `MERCHANT_PORTAL_ROUTE_PATTERN` your project already has; with the core default, the result is:

**src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiConfig.php**

```php
<?php

namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiConfig as SprykerSecurityMerchantPortalGuiConfig;

class SecurityMerchantPortalGuiConfig extends SprykerSecurityMerchantPortalGuiConfig
{
    /**
     * @var string
     */
    protected const MERCHANT_PORTAL_ROUTE_PATTERN = '^/((.+)-merchant-portal-gui|merchant-sales-invoice)/';
}
```

3. Rebuild the caches and synchronize the ACL entities, so that existing merchant users get the new bundle rule and the ACL entity rule for invoices:

```bash
console cache:class-resolver:build
console router:cache:warm-up:merchant-portal
console translator:generate-cache
console acl-entity:synchronize
console cache:empty-all
```

{% info_block warningBox "Verification" %}

Place a marketplace order with items of two merchants, ship the items of one merchant in the Merchant Portal as a merchant user, and open the order in the Back Office. Make sure the **Documents** block lists one invoice for that merchant with the merchant's name in the **Merchant** column. Ship the items of the second merchant and make sure a second invoice appears. Open the merchant order in the Merchant Portal and make sure the **Documents** card lists only the invoice of that merchant and its **PDF** link opens the invoice page with the merchant's items and totals.

{% endinfo_block %}

### 5) Print the merchant requisites on the invoice

The invoice of a merchant carries the merchant in `invoice.merchant`. Print the merchant's requisites in your invoice template next to the operator's data:

**src/Pyz/Zed/SalesInvoice/Presentation/Invoice/invoice.twig**

```twig
{% raw %}
{% set merchant = invoice.merchant is defined ? invoice.merchant : null %}
{% set merchantProfile = merchant and merchant.merchantProfile ? merchant.merchantProfile : null %}
{% set merchantAddress = merchantProfile and merchantProfile.addressCollection is not empty ? merchantProfile.addressCollection | first : null %}
{% if merchant %}
    <strong>{{ merchant.name }}</strong>
    {% if merchant.registrationNumber %}
        <div class="text-small">{{ 'order_invoice.invoice_template.merchant.registration_number' | trans }} {{ merchant.registrationNumber }}</div>
    {% endif %}
    {% if merchantAddress %}
        <div class="text-small">
            {{ [merchantAddress.address1, merchantAddress.address2, merchantAddress.address3] | filter(line => line) | join(' ') }}<br>
            {{ merchantAddress.zipCode }} {{ merchantAddress.city }}<br>
            {{ merchantAddress.countryName }}
        </div>
    {% endif %}
{% endif %}
{% endraw %}
```

Append the glossary key and import it:

**data/import/common/common/glossary.csv**

```yaml
order_invoice.invoice_template.merchant.registration_number,Registration number:,en_US
order_invoice.invoice_template.merchant.registration_number,Registernummer:,de_DE
```

```bash
console data:import glossary
console twig:cache:warmer
```

{% info_block warningBox "Verification" %}

Open the invoice of a merchant and make sure the document shows the merchant's name, registration number, and address, and lists only that merchant's items with the merchant order totals.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the feature frontend.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|---|---|---|
| Order Invoice Documents | {{page.release_tag}} | [Install the Order Invoice Documents feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-invoice-documents-feature.html) |
| Marketplace Merchant | {{page.release_tag}} | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |

### 1) Set up widgets

The Storefront row of an invoice shows its merchant through the `SoldByMerchantWidget` of the `MerchantWidget` module. Register the widget if it is not registered yet:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| SoldByMerchantWidget | Shows the merchant of the invoice in the **Documents** section of the order details page. |  | SprykerShop\Yves\MerchantWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantWidget\Widget\SoldByMerchantWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SoldByMerchantWidget::class,
        ];
    }
}
```

```bash
console cache:class-resolver:build
console twig:cache:warmer
```

{% info_block warningBox "Verification" %}

Log in as the customer of a marketplace order with generated invoices and open the order in **Customer Account&nbsp;<span aria-label="and then">></span> Order History**. Make sure the **Documents** section lists one row per invoice and every row of a merchant's invoice shows the merchant's name.

{% endinfo_block %}
