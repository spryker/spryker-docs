---
title: Integrate the Vertex app
description: Find out how you can integrate the Vertex app into your Spryker shop
last_updated: May 17, 2024
template: howto-guide-template
redirect_from:
related:
  - title: Vertex
    link: docs/pbc/all/tax-management/page.version/base-shop/third-party-integrations/vertex/vertex.html

---

After you have [integrated the ACP connector module](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/integrate-the-acp-connector-module-for-tax-calculation.html) for tax calculation, you can integrate the Vertex app.

Spryker doesn't have the same data model as Vertex, which is necessary for accurate tax calculations. Therefore, the integration requires project developers to add some missing information to the Quote object before sending a calculation request.

The following diagram shows the data flow of the tax calculation request from the Spryker Cart to the Vertex API.

![tax-calculation-request](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/install-vertex/tax-calculation-requests.png)

To integrate Vertex, follow these steps.

## 1. Configure Vertex-specific metadata transfers

Define specific Vertex Tax metadata transfers and extend other transfers with them:

```xml

<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="spryker:transfer-01
    http://static.spryker.com/transfer-01.xsd">

    <!-- Calculable Object is extended with SaleTaxMetadata -->
    <transfer name="CalculableObject">
        <property name="taxMetadata" type="SaleTaxMetadata" strict="true"/>
    </transfer>

    <!-- Order is extended with SaleTaxMetadata -->
    <transfer name="Order">
        <property name="taxMetadata" type="SaleTaxMetadata" strict="true"/>
    </transfer>

    <!-- Expense is extended with ItemTaxMetadata -->
    <transfer name="Expense">
        <property name="taxMetadata" type="ItemTaxMetadata" strict="true"/>
    </transfer>

    <!-- Item is extended with ItemTaxMetadata -->
    <transfer name="Item">
        <property name="taxMetadata" type="ItemTaxMetadata" strict="true"/>
    </transfer>

    <!-- Product Option is extended with ItemTaxMetadata -->
    <transfer name="ProductOption">
        <property name="taxMetadata" type="ItemTaxMetadata" strict="true"/>
    </transfer>

    <!-- Sales Tax Metadata. It contains Vertex tax metadata which is related to Order or Quote in general. -->
    <transfer name="SaleTaxMetadata" strict="true">
        <property name="seller" type="array" associative="true" singular="_"/>
        <property name="customer" type="array" associative="true" singular="_"/>
    </transfer>

    <!-- Items Tax Metadata. It contains Vertex tax metadata which is related to Item.-->
    <transfer name="ItemTaxMetadata" strict="true">
        <property name="product" type="array" associative="true" singular="_"/>
        <property name="flexibleFields" type="array" associative="true" singular="_"/>
    </transfer>

</transfers>

```

`SaleTaxMetadata` and `ItemTaxMetadata` are designed to be equal to the Vertex Tax Calculation API request body. You can extend them as you need, following the Vertex API structure.

- `SaleTaxMetadata` equals the Invoicing/Quotation request payload, excluding LineItems.

- `ItemTaxMetadata` equals the Line Item API payload.

## 2. Implement Vertex-specific metadata extender plugins

You need to introduce several types of expander plugins. As a starting point, you use the examples provided in the [tax-app-vertex](https://github.com/spryker/tax-app-vertex) module. The plugins in this module are for development purposes. The data in the `TaxMetaData` fields needs to be collected from the project database or other sources, like an external ERP.

### Configure the Customer Class Code Expander plugins

1. Introduce `Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Order/OrderCustomerWithVertexCodeExpanderPlugin.php` using the following example:

```php
<?php

namespace Pyz\Zed\{YourDesiredModule}\Communication\Plugin\Order;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\TaxAppExtension\Dependency\Plugin\OrderTaxAppExpanderPluginInterface;

class OrderCustomerWithVertexCodeExpanderPlugin extends AbstractPlugin implements OrderTaxAppExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function expand(OrderTransfer $orderTransfer): OrderTransfer
    {
        $orderTransfer->getTaxMetadata()->setCustomer(['customerCode' => ['classCode' => 'vertex-customer-code']]);

        return $orderTransfer;
    }
}
```

2. Introduce `Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Quote/CalculableObjectCustomerWithVertexCodeExpanderPlugin.php` using the following example:

```php
<?php

namespace Spryker\Zed\{YourDesiredModule}\Communication\Plugin\Quote;

use Generated\Shared\Transfer\CalculableObjectTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\TaxAppExtension\Dependency\Plugin\CalculableObjectTaxAppExpanderPluginInterface;

class CalculableObjectCustomerWithVertexCodeExpanderPlugin extends AbstractPlugin implements CalculableObjectTaxAppExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer
     *
     * @return \Generated\Shared\Transfer\CalculableObjectTransfer
     */
    public function expand(CalculableObjectTransfer $calculableObjectTransfer): CalculableObjectTransfer
    {
        $calculableObjectTransfer->getTaxMetadata()->setCustomer(['customerCode' => ['classCode' => 'vertex-customer-code']]);

        return $calculableObjectTransfer;
    }
}
```

### Configure the Customer Exemption Certificate Expander plugins

Configure the following plugins using the provided example.

| PLUGIN | NAMESPACE |
| - | - |
| Customer Exemption Certificate Expander plugin for order | Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Order/OrderCustomerWithVertexExemptionCertificateExpanderPlugin.php |
| Customer Exemption Certificate Expander plugin for quote | Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Quote/CalculableObjectCustomerWithVertexExemptionCertificateExpanderPlugin.php |

```php
// ...
class OrderCustomerWithVertexExemptionCertificateExpanderPlugin extends AbstractPlugin implements CalculableObjectTaxAppExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer
     *
     * @return \Generated\Shared\Transfer\CalculableObjectTransfer
     */
    public function expand(CalculableObjectTransfer $calculableObjectTransfer): CalculableObjectTransfer
    {
        $calculableObjectTransfer->getTaxMetadata()->setCustomer(['exemptionCertificate' => ['exemptionCertificateNumber' => 'vertex-exemption-certificate-number']]);

        return $calculableObjectTransfer;
    }
}
```

### Configure the Product Class Code Expander plugins

Configure the following plugins using the provided example.

| PLUGIN | NAMESPACE |
| - | - |
| Product Class Code Expander plugin for order items | Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Order/OrderItemVertexProductClassCodeExpanderPlugin.php` |
| Product Class Code Expander plugin for quote items | Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Quote/CalculableObjectItemWithVertexProductClassCodeExpanderPlugin.php |

```php
// ...
class ItemWithVertexClassCodeExpanderPlugin extends AbstractPlugin implements CalculableObjectTaxAppExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer
     *
     * @return \Generated\Shared\Transfer\CalculableObjectTransfer
     */
    public function expand(CalculableObjectTransfer $calculableObjectTransfer): CalculableObjectTransfer
    {
        foreach ($calculableObjectTransfer->getItems() as $itemTransfer) {
            $itemTransfer->getTaxMetadata()->setProduct(['productClass' => 'vertex-product-class-code']);
        }

        return $calculableObjectTransfer;
    }
}
```

{% info_block infoBox "Use the same Product Class Code" %}

You must use the same Product Class Code extension for all product options and other order expenses. Vertex considers each of them as a separate item for tax calculation. For guidance on where to place them, see the definition of transfers in [Configure Vertex-specific Metadata Transfers](#configure-vertex-specific-metadata-transfers).

{% endinfo_block %}

### Configure the flexible fields extension

Configure the flexible files extension using the following example:

```php

class ItemWithFlexibleFieldsExpanderPlugin extends AbstractPlugin implements CalculableObjectTaxAppExpanderPluginInterface
{
    // ...

    /**
     * @param \CalculableObjectTransfer $calculableObjectTransfer
     *
     * @return \CalculableObjectTransfer
     */
    public function expand(CalculableObjectTransfer $calculableObjectTransfer): CalculableObjectTransfer
    {
        foreach ($calculableObjectTransfer->getItems() as $itemTransfer) {
            $itemTransfer
                ->getTaxMetadata()
                ->setFlexibleFields(
                    [
                        'flexibleCodeFields' => [
                            [
                                'fieldId' => 1,
                                'value' => 'vertex-flexible-code-value',
                            ],
                        ],
                    ],
                );
        }

        return $calculableObjectTransfer;
    }
}
```

## 3. Configure the Tax App dependency provider

After the Tax App dependency provider configuration, the plugin stack should look similar to the following:

```php

namespace Pyz\Zed\TaxApp;

// The following plugins are for Marketplace only.
use Spryker\Zed\MerchantProfile\Communication\Plugin\TaxApp\MerchantProfileAddressCalculableObjectTaxAppExpanderPlugin;
use Spryker\Zed\MerchantProfile\Communication\Plugin\TaxApp\MerchantProfileAddressOrderTaxAppExpanderPlugin;
use Spryker\Zed\ProductOfferAvailability\Communication\Plugin\TaxApp\ProductOfferAvailabilityCalculableObjectTaxAppExpanderPlugin;
use Spryker\Zed\ProductOfferAvailability\Communication\Plugin\TaxApp\ProductOfferAvailabilityOrderTaxAppExpanderPlugin;

class TaxAppDependencyProvider extends SprykerTaxAppDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\TaxAppExtension\Dependency\Plugin\CalculableObjectTaxAppExpanderPluginInterface>
     */
    protected function getCalculableObjectTaxAppExpanderPlugins(): array
    {
        return [       
            # This plugin stack is responsible for expansion of CalculableObjectTransfer based on present fields. Add your custom implemented expander plugins here following the example in `spryker/tax-app-vertex` module.

            // The following plugins are for Marketplace only.
            # This plugin is expanding CalculableObjectTransfer object with merchant address information.
            new MerchantProfileAddressCalculableObjectTaxAppExpanderPlugin(),
            # This plugin is expanding CalculableObjectTransfer object with product offer availability information.
            new ProductOfferAvailabilityCalculableObjectTaxAppExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\TaxAppExtension\Dependency\Plugin\OrderTaxAppExpanderPluginInterface>
     */
    protected function getOrderTaxAppExpanderPlugins(): array
    {
        return [
            # This plugin stack is responsible for expansion of OrderTransfer based on present fields. Add your custom implemented expander plugins here following the example in `spryker/tax-app-vertex` module.

            // The following plugins are for Marketplace only.
            # This plugin is expanding OrderTransfer object with merchant address information.
            new MerchantProfileAddressOrderTaxAppExpanderPlugin(),
            # This plugin is expanding OrderTransfer object with product offer availability information.
            new ProductOfferAvailabilityOrderTaxAppExpanderPlugin(),
        ];
    }
}

```

## 4. Marketplace only: Configure Product Offer Stock dependency provider

After you have configured the Product Offer Stock dependency provider for Marketplace, the plugin stack should look similar to the following:

```php

namespace Pyz\Zed\ProductOfferStock;

use Spryker\Zed\ProductOfferStock\ProductOfferStockDependencyProvider as SprykerProductOfferStockDependencyProvider;
use Spryker\Zed\StockAddress\Communication\Plugin\Stock\StockAddressStockTransferProductOfferStockExpanderPlugin;

class ProductOfferStockDependencyProvider extends SprykerProductOfferStockDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferStockExtension\Dependency\Plugin\StockTransferProductOfferStockExpanderPluginInterface>
     */
    protected function getStockTransferExpanderPluginCollection(): array
    {
        return [
            # This plugin is providing warehouse address to StockTransfer objects which is used during tax calculation.
            new StockAddressStockTransferProductOfferStockExpanderPlugin(),
        ];
    }
}

```

## 5. Optional: Configure custom seller and buyer countries

If a user doesn't choose a country during the checkout Address step, the system automatically usse the first country listed in the selected Spryker store. The same rule applies to sellers, except that the country is taken from the first warehouse address of a product stock.

To change this default behavior, you can configure the country for both sellers and buyers. These configured countries will be the default values for tax calculations. You can use the following configuration methods to do this:

```php

namespace Pyz\Zed\TaxApp;

use Spryker\Zed\TaxApp\TaxAppConfig as SprykerTaxAppConfig;

class TaxAppConfig extends SprykerTaxAppConfig
{

    public function getSellerCountryCode(): string
    {
        return 'FR';
    }

    public function getCustomerCountryCode(): string
    {
        return 'DE';
    }
}

```

### 6. Add translations

1. Append the glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
cart.total.tax_total.calculated_at_checkout,an der Kasse berechnet,de_DE
cart.total.tax_total.calculated_at_checkout,calculated at checkout,en_US
```

2. Import the updated glossary:

```yaml
console data:import glossary
```

---

## Reference: Mapping of Quote and Order objects to Vertex API

The following table reflects the mapping of the Spryker Quote and Order transfer object to the Vertex API request format. This information is useful for developing custom plugins for a deeper integration with your project.

| QuoteTransfer/OrderTransfer object properties            | Vertex API field         | Comment     |
|-------------------------|-------------------------------------|----------|
| Current date (Y-m-d)       | documentDate          |                          |
| QuoteTransfer.uuid / OrderTransfer.orderReference / new Uuid4 (if quote.uuid is not present) | documentNumber          |            |
| QuoteTransfer.uuid / OrderTransfer.orderReference / new Uuid4 (if quote.uuid is not present) | transactionId       |             |
| - | transactionType   | Always `SALE`.|
| -  | saleMessageType  | Depending on the type of operation, `INVOICE` or `QUOTATION`. |
| taxMetadata | Mapped over the final request 1:1. | Metadata needs to follow the structure of the Vertex API request. |
| taxMetadata.seller.company       | seller.company  | Required by Vertex from the legal standpoint. |
| items[].sku | lineItems[].lineItemId; lineItems[].product.value; lineItems[].vendorSku | `lineItems[].lineItemId` can be changed if there are multiple items with the same SKU in the request.       |
| items[].shipment.shippingAddress | lineItems[].customer.destination |    |
| billingAddress | lineItems[].customer.administrativeDestination  |       |
| items[].merchantStockAddresses | lineItems[].seller.physicalOrigin       | Multiple addresses are mapped to multiple items in the Vertex PBC and Vertex API `lineItems[]`. |
| items[].merchantProfileAddress   | lineItems[].seller.administrativeOrigin |     |
| items[].unitDiscountAmountFullAggregation      | lineItems[].discount.discountValue| Prices are converted from the Spryker's cent-based format to the Vertex decimal format. |
| -     | lineItems[].discount.discountType | Always `DiscountAmount`. Spryker stores discounts based on amount, so there is no need for percentage-based discounts.  |
| items[].unitPrice (either GROSS or NET depending on the selected mode) | lineItems[].unitPrice | Prices are converted from Spryker's cent-based format to Vertex decimal format. |
| items[].merchantStockAddresses.quantityToShip  | lineItems[].quantity.value | If `quantityToShip` is less than the quantity requested in cart, the item is mapped to multiple items in the Vertex API.      |
| - | lineItems[].quantity.unitOfMeasure   | Always `EA` ("each"). Other units of measure are not supported. |
| items[].taxMetadata | Mapped over specific `lineItem` one to one. | Metadata needs to follow the structure of the Vertex API request. For `lineItems`, it's mapped over each corresponding item based on `lineItemId`. |
| items[].taxMetadata.seller.company | lineItems[].seller.company | Required by Vertex from the legal standpoint. |
| expenses (only for expenses with the `SHIPMENT_EXPENSE_TYPE` type) | lineItems | Shipments are treated like products in Vertex - like a line item. |
| expenses.hash  | lineItems[].lineItemId |      |
| expenses.shipment.shipmentAddress | lineItems[].customer.destination | |
| expenses.shipment.method.shipmentMethodKey | lineItems[].product.value | Depends on the selected shipment method. |
| billingAddress     | lineItems[].customer.administrativeDestination |                                  |
| expenses.sumPrice (either GROSS or NET depending on the selected mode)                       | lineItems[].extendedPrice |       |
| expenses.sumDiscountAmountAggregation             | lineItems[].discount.discountValue | Prices are converted from the Spryker's cent-based format to the Vertex decimal format. |
| lineItems[].discount.discountType  | Always `DiscountAmount`. Spryker stores discounts based on amount, so there is no need to use percentage-based discounts.  | priceMode|
| lineItems[].taxIncludedIndicator           |                              | NET mode: false; GROSS mode: true. |

### Location mapping

| Spryker          | Vertex         | Comment                            |
|------------------|----------------|------------------------------------|
| address1         | streetAddress1 |                                    |
| address2         | streetAddress2 | Should be either not empty or `null`. |
| city             | city           |                                    |
| state            | mainDivision   | Should be either not empty or `null`. |
| zipCode          | postalCode     |                                    |
| country.iso2Code | country        |                                    |


## Next step

[Configure Vertex in the Back Office](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/connect-vertex.html)

















