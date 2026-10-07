This document describes how to install the [Order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-invoice-documents-overview.html) feature.

{% info_block infoBox "Liability" %}

Spryker does not generate, validate, or assume legal responsibility for invoices or credit notes. The seller remains the invoice issuer and is responsible for the document's tax and legal compliance, including its format under applicable national e-invoicing mandates.

Spryker's role is limited to forwarding the document links from the seller, making it available to the correct buyer/seller.

Spryker does not transmit documents to national e-invoicing or clearance networks such as Peppol, KSeF, or SdI. Transmission remains the responsibility of the seller or their e-invoicing provider.

The [Order confirmation / invoice notification email feature](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html) is non compliant with the latest EU e-invoicing requirements.

{% endinfo_block %}

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|---|---|---|
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Order Management | {{page.release_tag}} | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |
| Customer Account Management | {{page.release_tag}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |

The invoice notification email must be set up, including the invoice template in `SalesInvoiceConfig::getOrderInvoiceTemplatePath()` and the `invoice-generate` event in your OMS process. For details, see [Order confirmation / invoice notification email](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html).

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/sales-invoice:"^1.6.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|---|---|
| SalesInvoice | vendor/spryker/sales-invoice |

{% endinfo_block %}

### 2) Set up transfer objects

Generate the transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following transfer objects have been generated:

| TRANSFER | TYPE | EVENT | PATH |
|---|---|---|---|
| Order.fkCustomer | property | created | src/Generated/Shared/Transfer/OrderTransfer |
| Order.customer | property | created | src/Generated/Shared/Transfer/OrderTransfer |
| Customer.idCustomer | property | created | src/Generated/Shared/Transfer/CustomerTransfer |
| Customer.customerReference | property | created | src/Generated/Shared/Transfer/CustomerTransfer |

{% endinfo_block %}

### 3) Add translations

1. Append the glossary for the Storefront according to your configuration:

**data/import/common/common/glossary.csv**

```yaml
sales_invoice.order_documents.title,Documents,en_US
sales_invoice.order_documents.title,Dokumente,de_DE
sales_invoice.order_documents.no_documents,No documents,en_US
sales_invoice.order_documents.no_documents,Keine Dokumente,de_DE
sales_invoice.format.pdf,PDF,en_US
sales_invoice.format.pdf,PDF,de_DE
sales_invoice.order_documents.save_as_pdf,Save as PDF,en_US
sales_invoice.order_documents.save_as_pdf,Als PDF speichern,de_DE
```

2. Import the glossary:

```bash
console data:import glossary
```

The Back Office labels ship with the module in `data/translation/Zed/*.csv`. Rebuild the Back Office translation cache:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 4) Set up behavior

1. Register the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| RenderedOrderInvoiceDocumentProviderPlugin | Provides the default document of an invoice: the rendered invoice as a **PDF** document that opens as a page. |  | Spryker\Zed\SalesInvoice\Communication\Plugin\SalesInvoice |
| OrderInvoiceSalesListBlockRendererPlugin | Renders the **Documents** block on the Back Office order page. |  | Spryker\Zed\SalesInvoice\Communication\Plugin\Sales |

**src/Pyz/Zed/SalesInvoice/SalesInvoiceDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesInvoice;

use Spryker\Zed\SalesInvoice\Communication\Plugin\SalesInvoice\RenderedOrderInvoiceDocumentProviderPlugin;
use Spryker\Zed\SalesInvoice\SalesInvoiceDependencyProvider as SprykerSalesInvoiceDependencyProvider;

class SalesInvoiceDependencyProvider extends SprykerSalesInvoiceDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoiceDocumentProviderPluginInterface>
     */
    protected function getOrderInvoiceDocumentProviderPlugins(): array
    {
        return [
            new RenderedOrderInvoiceDocumentProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesInvoice\Communication\Plugin\Sales\OrderInvoiceSalesListBlockRendererPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\SalesDetailBlockRendererPluginInterface>
     */
    protected function getSalesDetailBlockRendererPlugins(): array
    {
        return [
            new OrderInvoiceSalesListBlockRendererPlugin(),
        ];
    }
}
```

2. Add the block to the Back Office order page. The position in the array is the position on the page:

**src/Pyz/Zed/Sales/SalesConfig.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesConfig as SprykerSalesConfig;

class SalesConfig extends SprykerSalesConfig
{
    /**
     * @return array<string, string>
     */
    public function getSalesDetailExternalBlocksUrls(): array
    {
        $externalBlocks = parent::getSalesDetailExternalBlocksUrls();
        $externalBlocks['documents'] = '/sales-invoice/sales/list';

        return $externalBlocks;
    }
}
```

3. Rebuild the caches:

```bash
console cache:class-resolver:build
console twig:cache:warmer
console cache:empty-all
```

{% info_block warningBox "Verification" %}

Open an order with a generated invoice in the Back Office. Make sure the **Documents** block lists the invoice with a **PDF** link and the link opens the invoice page in a new tab with a **Save as PDF** button.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the feature frontend.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|---|---|---|
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Customer Account Management | {{page.release_tag}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |

### 1) Set up widgets

1. Register the widget and the route provider:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| OrderInvoicesWidget | Renders the **Documents** section on the order details page. |  | Spryker\Yves\SalesInvoice\Widget |
| SalesInvoiceRouteProviderPlugin | Provides the route `customer/order/invoice` that shows the invoice page to the authorized customer. |  | Spryker\Yves\SalesInvoice\Plugin\Router |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\SalesInvoice\Widget\OrderInvoicesWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            OrderInvoicesWidget::class,
        ];
    }
}
```

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use Spryker\Yves\SalesInvoice\Plugin\Router\SalesInvoiceRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new SalesInvoiceRouteProviderPlugin(),
        ];
    }
}
```

2. Render the widget on the order details page, below the order totals:

**src/Pyz/Yves/CustomerPage/Theme/default/components/molecules/order-detail/order-detail.twig**

```twig
{% raw %}
{% block orderInvoices %}
    {% widget 'OrderInvoicesWidget' args [data.order] only %}{% endwidget %}
{% endblock %}
{% endraw %}
```

3. Rebuild the caches:

```bash
console cache:class-resolver:build
console router:cache:warm-up
console twig:cache:warmer
```

{% info_block warningBox "Verification" %}

Log in as the customer of an order with a generated invoice and open the order in **My Account > Orders**. Make sure the **Documents** section lists the invoice and the **PDF** link opens the invoice page in a new tab. Open the same URL as another customer and make sure it answers with a 404 page.

{% endinfo_block %}
