This document describes how to install the Order Amendment feature.

## Install feature core

Some plugins are needed only for optional features. The document provides a list of plugins for all possible integration scenarios, but you need to include only the plugins that match your setup.

### Prerequisites

Install the required features:

| NAME             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                       |
|------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core     | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                              |
| Order Management | 202507.0 | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html)  |
| Reorder          | 202507.0 | [Install the Reorder feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-reorder-feature.html)                          |
| Prices           | 202507.0 | [Install the Prices feature](/docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html)                             |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/order-amendment: "202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                   | EXPECTED DIRECTORY                                           |
|------------------------------------------|--------------------------------------------------------------|
| SalesOrderAmendment                      | vendor/spryker/sales-order-amendment                         |
| SalesOrderAmendmentOms                   | vendor/spryker/sales-order-amendment-oms                     |
| SalesOrderAmendmentExtension             | vendor/spryker/sales-order-amendment-extension               |
| OrderAmendmentsRestApi                   | vendor/spryker/sales-order-amendments-rest-api               |
| PriceProductSalesOrderAmendment          | vendor/spryker/price-product-sales-order-amendment           |
| PriceProductSalesOrderAmendmentExtension | vendor/spryker/price-product-sales-order-amendment-extension |

{% endinfo_block %}

### 2) Set up configuration

1. Add the following configuration:

| CONFIGURATION                                                               | SPECIFICATION                                                                                                 | NAMESPACE                   |
|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|-----------------------------|
| A regular expression, see `config/Shared/config_default.php`.      | Closes access for non-logged-in users.                                                             |                         |
| MultiCartConfig::getQuoteFieldsAllowedForCustomerQuoteCollectionInSession() | Defines which quote fields can be saved in the quote collection of a customer's session. | Pyz\Client\MultiCart        |
| QuoteConfig::getQuoteFieldsAllowedForSaving()                               | Enables saving order amendment-related quote fields to the database.   | Pyz\Zed\Quote               |
| SalesOrderAmendmentConfig::getQuoteFieldsAllowedForSaving()                 | Enables saving quote-related fields to the database.   | Pyz\Zed\SalesOrderAmendment |

**config/Shared/config_default.php**

```php
<?php

$config[CustomerConstants::CUSTOMER_SECURED_PATTERN] = '(^(/en|/de)?/order-amendment($|/))';
```

{% info_block warningBox "Verification" %}

Make sure that accessing `https://mysprykershop.com/order-amendment` as a guest user redirects to the login page.

{% endinfo_block %}

**src/Pyz/Client/MultiCart/MultiCartConfig.php**

```php
<?php

namespace Pyz\Client\MultiCart;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Client\MultiCart\MultiCartConfig as SprykerMultiCartConfig;

class MultiCartConfig extends SprykerMultiCartConfig
{
    /**
     * @return array<string|array<string>>
     */
    public function getQuoteFieldsAllowedForCustomerQuoteCollectionInSession(): array
    {
        return array_merge(parent::getQuoteFieldsAllowedForCustomerQuoteCollectionInSession(), [
            QuoteTransfer::AMENDMENT_ORDER_REFERENCE
        ]);
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that only configured fields are saved in a customer's session.

{% endinfo_block %}

**src/Pyz/Zed/Quote/QuoteConfig.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Quote\QuoteConfig as SprykerQuoteConfig;

class QuoteConfig extends SprykerQuoteConfig
{
    /**
     * @return list<string>
     */
    public function getQuoteFieldsAllowedForSaving()
    {
        return array_merge(parent::getQuoteFieldsAllowedForSaving(), [
            QuoteTransfer::AMENDMENT_ORDER_REFERENCE,
            QuoteTransfer::QUOTE_PROCESS_FLOW,
            QuoteTransfer::ORIGINAL_SALES_ORDER_ITEM_UNIT_PRICES,
            QuoteTransfer::ORIGINAL_SALES_ORDER_ITEMS,
        ]);
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you edit an order, the following applies:
- `amendmentOrderReference` and `quoteProcessFlow` are added to the JSON data in the `spy_quote.quote_data` database column of the corresponding quote.
- `originalSalesOrderItems` is added to the JSON data in the `spy_quote.quote_data` database column of the corresponding quote.

{% endinfo_block %}

**src/Pyz/Zed/SalesOrderAmendment/SalesOrderAmendmentConfig.php**

```php
<?php

namespace Pyz\Zed\SalesOrderAmendment;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\SalesOrderAmendment\SalesOrderAmendmentConfig as SprykerSalesOrderAmendmentConfig;

class SalesOrderAmendmentConfig extends SprykerSalesOrderAmendmentConfig
{
    /**
     * @return array<string>
     */
    public function getQuoteFieldsAllowedForSaving(): array
    {
        return array_merge(parent::getQuoteFieldsAllowedForSaving(), [
            QuoteTransfer::BUNDLE_ITEMS,
            QuoteTransfer::CART_NOTE,
            QuoteTransfer::EXPENSES,
            QuoteTransfer::VOUCHER_DISCOUNTS,
            QuoteTransfer::GIFT_CARDS,
            QuoteTransfer::CART_RULE_DISCOUNTS,
            QuoteTransfer::PROMOTION_ITEMS,
            QuoteTransfer::IS_LOCKED,
            QuoteTransfer::QUOTE_REQUEST_VERSION_REFERENCE,
            QuoteTransfer::QUOTE_REQUEST_REFERENCE,
            QuoteTransfer::MERCHANT_REFERENCE,
            QuoteTransfer::IS_ORDER_PLACED_SUCCESSFULLY,
        ]);
    }
}
```

2. Remove the quote fields that are not relevant for your project.

3. Configure the batch availability check facade method:

**src/Pyz/Zed/SalesOrderAmendment/SalesOrderAmendmentConfig.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
declare(strict_types = 1);

namespace Pyz\Zed\ProductBundle;

use Generated\Shared\Transfer\ItemTransfer;
use Spryker\Zed\ProductBundle\ProductBundleConfig as SprykerProductBundleConfig;

class ProductBundleConfig extends SprykerProductBundleConfig
{
    /**
     * @var bool
     */
    protected const USE_BATCH_AVAILABILITY_CHECK = true;
}
```

#### Configure OMS

1. Create the OMS subprocess file using the example:

<details>
    <summary>config/Zed/oms/DummySubprocess/DummyOrderAmendment01.xml</summary>

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="DummyOrderAmendment">
        <states>
            <state name="order amendment" reserved="true" display="oms.state.order-amendment">
                <flag>amendment in progress</flag>
            </state>
            <state name="deleted item unreserved" display="oms.state.new"/>
        </states>

        <transitions>
            <transition happy="true">
              <source>grace period pending</source>
              <target>deleted item unreserved</target>
              <event>unreserve deleted items</event>
            </transition>
  
            <transition happy="true">
              <source>deleted item unreserved</source>
              <target>grace period started</target>
              <event>start grace period</event>
            </transition>

            <transition>
                <source>grace period started</source>
                <target>order amendment</target>
                <event>start-order-amendment</event>
            </transition>

            <transition>
                <source>order amendment</source>
                <target>cancelled</target>
                <event>finish-order-amendment</event>
            </transition>

            <transition>
                <source>order amendment</source>
                <target>grace period started</target>
                <event>cancel-order-amendment</event>
            </transition>

            <transition>
                <source>order amendment</source>
                <target>grace period finished</target>
                <event>skip-order-amendment</event>
            </transition>
        </transitions>

        <events>
            <event name="start grace period" command="OrderAmendment/StartGracePeriod" onEnter="true"/>
            <event name="unreserve deleted items" command="OrderAmendment/UnreserveDeletedItems" onEnter="true"/>
            <event name="skip-order-amendment"/>
            <event name="start-order-amendment"/>
            <event name="finish-order-amendment"/>
            <event name="cancel-order-amendment"/>
        </events>
    </process>

</statemachine>
```

</details>

{% info_block warningBox "Verification" %}

Verify the order amendment state machine configuration in the following step.

{% endinfo_block %}

2. Using the following process as an example, adjust your OMS state machine configuration according to your project's requirements.

<details><summary>config/Zed/oms/DummyPayment01.xml</summary>

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="DummyPayment01" main="true">
        <subprocesses>
            <process>DummyRefund</process>
            <process>DummyReturn</process>
            <process>DummyInvoice</process>
            <process>DummyPicking</process>
            <process>CreateGiftCard</process>
            <process>WarehouseAllocation</process>
            <process>DummyMerchantCommission</process>
            <process>DummyOrderAmendment</process>
        </subprocesses>

        <states>
            <state name="new" display="oms.state.new">
                <flag>cancellable</flag>
            </state>
            <state name="grace period pending" display="oms.state.new"/>
            <state name="grace period started" reserved="true" display="oms.state.new">
                <flag>cancellable</flag>
                <flag>amendable</flag>
            </state>
            <state name="grace period finished" reserved="true" display="oms.state.new">
                <flag>cancellable</flag>
            </state>
            <state name="payment pending" reserved="true" display="oms.state.payment-pending">
                <flag>cancellable</flag>
            </state>
            <state name="invalid" display="oms.state.invalid">
                <flag>exclude from customer</flag>
            </state>
            <state name="cancelled" display="oms.state.canceled"/>
            <state name="paid" reserved="true" display="oms.state.paid">
                <flag>cancellable</flag>
            </state>
            <state name="tax pending" reserved="true" display="oms.state.tax-pending"/>
            <state name="tax invoice submitted" reserved="true" display="oms.state.paid"/>
            <state name="waiting" reserved="true" display="oms.state.waiting"/>
            <state name="exported" reserved="true" display="oms.state.exported"/>
            <state name="product review requested" reserved="true" display="oms.state.paid"/>
            <state name="confirmed" reserved="true" display="oms.state.confirmed"/>
            <state name="shipped" reserved="true" display="oms.state.shipped"/>
            <state name="delivered" display="oms.state.delivered"/>
            <state name="closed" display="oms.state.closed"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>new</source>
                <target>grace period pending</target>
            </transition>

            <transition happy="true">
                <source>grace period started</source>
                <target>grace period finished</target>
                <event>skip grace period</event>
            </transition>

            <transition happy="true">
                <source>grace period finished</source>
                <target>warehouse allocated</target>
                <event>allocate warehouse</event>
            </transition>

            <transition happy="true" condition="DummyPayment/IsAuthorized">
                <source>warehouse allocated</source>
                <target>payment pending</target>
                <event>authorize</event>
            </transition>

            <transition>
                <source>warehouse allocated</source>
                <target>invalid</target>
                <event>authorize</event>
            </transition>

            <transition>
                <source>warehouse allocated</source>
                <target>cancelled</target>
                <event>cancel</event>
            </transition>

            <transition happy="true" condition="DummyPayment/IsPayed">
                <source>payment pending</source>
                <target>paid</target>
                <event>pay</event>
            </transition>

            <transition happy="true">
                <source>tax pending</source>
                <target>tax invoice submitted</target>
                <event>submit tax invoice</event>
            </transition>

            <transition>
                <source>payment pending</source>
                <target>cancelled</target>
                <event>pay</event>
            </transition>

            <transition>
                <source>payment pending</source>
                <target>cancelled</target>
                <event>cancel</event>
            </transition>

            <transition happy="true">
                <source>tax invoice submitted</source>
                <target>product review requested</target>
                <event>request product review</event>
            </transition>

            <transition happy="true">
                <source>product review requested</source>
                <target>confirmed</target>
                <event>confirm</event>
            </transition>

            <transition happy="true">
                <source>confirmed</source>
                <target>waiting</target>
                <event>skip timeout</event>
            </transition>

            <transition happy="true">
                <source>waiting</source>
                <target>picking list generation scheduled</target>
                <event>picking list generation schedule</event>
            </transition>

            <transition>
                <source>waiting</source>
                <target>exported</target>
                <event>skip picking</event>
            </transition>

            <transition happy="true">
                <source>picking finished</source>
                <target>exported</target>
                <event>finish picking</event>
            </transition>

            <transition happy="true" condition="GiftCard/IsGiftCard">
                <source>waiting</source>
                <target>gift card purchased</target>
                <event>check giftcard purchase</event>
            </transition>

            <transition happy="true">
                <source>gift card shipped</source>
                <target>delivered</target>
                <event>complete gift card creation</event>
            </transition>

            <transition happy="true">
                <source>exported</source>
                <target>shipped</target>
                <event>ship</event>
            </transition>

            <transition happy="true">
                <source>shipped</source>
                <target>delivered</target>
                <event>stock-update</event>
            </transition>

            <transition happy="true">
                <source>delivered</source>
                <target>closed</target>
                <event>close</event>
            </transition>

        </transitions>

        <events>
            <event name="authorize" timeout="1 second"/>
            <event name="start grace period" onEnter="true"/>
            <event name="skip grace period" manual="true" timeout="2 hour"/>
            <event name="pay" manual="true" timeout="1 hour" timeoutProcessor="OmsTimeout/Initiation"
                   command="DummyPayment/Pay"/>
            <event name="submit tax invoice" onEnter="true" command="TaxApp/SubmitPaymentTaxInvoice"/>
            <event name="request product review" onEnter="true" command="Order/RequestProductReviews"/>
            <event name="confirm" onEnter="true" manual="true" command="Oms/SendOrderConfirmation"/>
            <event name="skip timeout" manual="true" timeout="30 minute"/>
            <event name="skip picking" manual="true" timeout="30 minute"/>
            <event name="cancel" manual="true"/>
            <event name="export" onEnter="true" manual="true" command="Oms/SendOrderShipped"/>
            <event name="ship" manual="true" command="Oms/SendOrderShipped"/>
            <event name="stock-update" manual="true"/>
            <event name="close" manual="true" timeout="1 hour"/>
        </events>
    </process>

    <process name="DummyRefund" file="DummySubprocess/DummyRefund01.xml"/>
    <process name="DummyReturn" file="DummySubprocess/DummyReturn01.xml"/>
    <process name="DummyPicking" file="DummySubprocess/DummyPicking01.xml"/>
    <process name="DummyInvoice" file="DummySubprocess/DummyInvoice01.xml"/>
    <process name="CreateGiftCard" file="GiftCardSubprocess/CreateGiftCard01.xml"/>
    <process name="WarehouseAllocation" file="WarehouseAllocationSubprocess/WarehouseAllocation01.xml"/>
    <process name="DummyMerchantCommission" file="DummySubprocess/DummyMerchantCommission01.xml"/>
    <process name="DummyOrderAmendment" file="DummySubprocess/DummyOrderAmendment01.xml"/>

</statemachine>
```

</details>

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Administration&nbsp;<span aria-label="and then">></span> OMS**.

2. Select **DummyPayment01** and check the following:

- The `grace period started` state has the `amendable` tag
- The `order amendment` state exists

{% endinfo_block %}

## 3) Set up database schema and transfer objects

Apply database changes and generate transfer changes:

```bash
console transfer:generate
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY                 | TYPE  | EVENT   |
|---------------------------------|-------|---------|
| spy_sales_order_amendment       | table | created |
| spy_sales_order_amendment_quote | table | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER                                         | TYPE  | EVENT   | PATH                                                                                       |
|--------------------------------------------------|-------|---------|--------------------------------------------------------------------------------------------|
| SalesOrderAmendment                              | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentTransfer.php                              |
| SalesOrderAmendmentQuote                         | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentQuoteTransfer.php                         |
| SalesOrderAmendmentCriteria                      | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentCriteriaTransfer.php                      |
| SalesOrderAmendmentQuoteCriteria                 | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentQuoteCriteriaTransfer.php                 |
| SalesOrderAmendmentQuoteConditions               | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentQuoteConditionsTransfer.php               |
| SalesOrderAmendmentDeleteCriteria                | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentDeleteCriteriaTransfer.php                |
| SalesOrderAmendmentQuoteCollectionDeleteCriteria | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentQuoteCollectionDeleteCriteriaTransfer.php |
| SalesOrderAmendmentConditions                    | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentConditionsTransfer.php                    |
| SalesOrderAmendmentCollection                    | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentCollectionTransfer.php                    |
| SalesOrderAmendmentQuoteCollection               | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentQuoteCollectionTransfer.php               |
| SalesOrderAmendmentRequest                       | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentRequestTransfer.php                       |
| SalesOrderAmendmentQuoteCollectionRequest        | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentQuoteCollectionRequestTransfer.php        |
| SalesOrderAmendmentQuoteCollectionResponse       | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentQuoteCollectionResponseTransfer.php       |
| SalesOrderAmendmentResponse                      | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentResponseTransfer.php                      |
| SalesOrderAmendmentItemCollection                | class | created | src/Generated/Shared/Transfer/SalesOrderAmendmentItemCollectionTransfer.php                |
| Quote                                            | class | updated | src/Generated/Shared/Transfer/QuoteTransfer.php                                            |
| QuoteUpdateRequestAttributes                     | class | updated | src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer.php                     |
| CartReorderRequest                               | class | updated | src/Generated/Shared/Transfer/CartReorderRequestTransfer.php                               |
| Order                                            | class | updated | src/Generated/Shared/Transfer/OrderTransfer.php                                            |
| Item                                             | class | updated | src/Generated/Shared/Transfer/ItemTransfer.php                                             |
| ErrorCollection                                  | class | created | src/Generated/Shared/Transfer/ErrorCollectionTransfer.php                                  |
| CartReorderResponse                              | class | created | src/Generated/Shared/Transfer/CartReorderResponseTransfer.php                              |
| CartReorder                                      | class | created | src/Generated/Shared/Transfer/CartReorderTransfer.php                                      |
| OrderConditions                                  | class | created | src/Generated/Shared/Transfer/OrderConditionsTransfer.php                                  |
| OrderCriteria                                    | class | created | src/Generated/Shared/Transfer/OrderCriteriaTransfer.php                                    |
| OrderCollection                                  | class | created | src/Generated/Shared/Transfer/OrderCollectionTransfer.php                                  |
| OrderItemFilter                                  | class | created | src/Generated/Shared/Transfer/OrderItemFilterTransfer.php                                  |
| CheckoutResponse                                 | class | updated | src/Generated/Shared/Transfer/CheckoutResponseTransfer.php                                 |
| OmsOrderItemState                                | class | created | src/Generated/Shared/Transfer/OmsOrderItemStateTransfer.php                                |
| RestCartsAttributes                              | class | created | src/Generated/Shared/Transfer/RestCartsAttributesTransfer.php                              |
| RestCartReorderRequestAttributes                 | class | created | src/Generated/Shared/Transfer/RestCartReorderRequestAttributesTransfer.php                 |
| RestOrderAmendmentsAttributes                    | class | created | src/Generated/Shared/Transfer/RestOrderAmendmentsAttributesTransfer.php                    |
| PriceProductResolveConditions                    | class | created | src/Generated/Shared/Transfer/PriceProductResolveConditionsTransfer.php                    |
| PriceProductFilter                               | class | updated | src/Generated/Shared/Transfer/PriceProductFilterTransfer.php                               |
| OriginalSalesOrderItem                           | class | updated | src/Generated/Shared/Transfer/OriginalSalesOrderItemTransfer.php                           |
| SellableItemsRequest                             | class | updated | src/Generated/Shared/Transfer/SellableItemsRequestTransfer.php                             |
| SellableItemRequest                              | class | updated | src/Generated/Shared/Transfer/SellableItemRequestTransfer.php                              |
| ProductAvailabilityCriteria                      | class | updated | src/Generated/Shared/Transfer/ProductAvailabilityCriteriaTransfer.php                      |
| SellableItemResponse                             | class | updated | src/Generated/Shared/Transfer/SellableItemResponseTransfer.php                             |
| SellableItemsResponse                            | class | updated | src/Generated/Shared/Transfer/SellableItemsResponseTransfer.php                            |

{% endinfo_block %}

### 4) Add translations

1. Append glossary according to your language configuration:

**src/data/import/glossary.csv**

```yaml
sales_order_amendment_oms.validation.order_not_amendable,The order cannot be amended.,en_US
sales_order_amendment_oms.validation.order_not_amendable,Die Bestellung kann nicht geändert werden.,de_DE
sales_order_amendment_oms.validation.amended_order_does_not_exist,Order with reference %order_reference% could not be found.,en_US
sales_order_amendment_oms.validation.amended_order_does_not_exist,Bestellnummer %order_reference% konnte nicht gefunden werden.,de_DE
sales_order_amendment_oms.validation.amendment_order_does_not_exist,Order with reference %order_reference% could not be found.,en_US
sales_order_amendment_oms.validation.amendment_order_does_not_exist,Bestellnummer %order_reference% konnte nicht gefunden werden.,de_DE
sales_order_amendment.validation.sales_order_amendment_does_not_exist,Can not update the sales order amendment with ID %uuid%. Please check the ID.,en_US
sales_order_amendment.validation.sales_order_amendment_does_not_exist,Die Änderung der Bestellung mit der ID %uuid% kann nicht aktualisiert werden. Bitte überprüfen Sie die ID.,de_DE
sales_order_amendment.validation.order_amendment_duplicated,An amendment is already in progress for this order. Please complete or cancel it before starting a new one.,en_US
sales_order_amendment.validation.order_amendment_duplicated,"Für diese Bestellung ist bereits eine Änderung in Bearbeitung. Diese Änderung muss abgeschlossen oder storniert sein, damit Sie eine neue Änderung beginnen können.",de_DE
sales_order_amendment.validation.cart_reorder.order_reference_not_match,"Another order is currently being amended. Complete or cancel the previous amendment before making changes to this order.",en_US
sales_order_amendment.validation.cart_reorder.order_reference_not_match,"Eine andere Bestellung wird gerade geändert. Diese Änderung muss abgeschlossen oder storniert sein, bevor Sie Änderungen an dieser Bestellung vornehmen können.",de_DE
sales_order_amendment.validation.cart.cart_cant_be_amended,"Current cart cannot be amended.",en_US
sales_order_amendment.validation.cart.cart_cant_be_amended,"Der aktuelle Warenkorb kann nicht geändert werden.",de_DE
oms.state.order-amendment,Editing in Progress,en_US
oms.state.order-amendment,Bestelländerung in Bearbeitung,de_DE
sales_order_amendment_oms.validation.order_not_being_amended,This order cannot be edited because the time limit for changes has expired.,en_US
sales_order_amendment_oms.validation.order_not_being_amended,"Eine Bearbeitung dieser Bestellung ist nicht möglich, da die Änderungsfrist abgelaufen ist.",de_DE
sales_order_amendment.pre_check.cannot_change_currency,"Currency cannot be changed during order edit.",en_US
sales_order_amendment.pre_check.cannot_change_currency,"Währung kann während der Bearbeitung einer Bestellung nicht geändert werden.",de_DE
sales_order_amendment.pre_check.cannot_change_price_mode,"Price mode cannot be changed during order edit.",en_US
sales_order_amendment.pre_check.cannot_change_price_mode,"Preismodus kann während der Bearbeitung einer Bestellung nicht geändert werden.",de_DE
store.cart_reorder.error.store_mismatch,"This order was placed in a different store. This action cannot be performed.",en_US
store.cart_reorder.error.store_mismatch,"Diese Bestellung wurde in einem anderen Store getätigt. Aktion kann nicht ausgeführt werden.",de_DE
sales_order_amendment.quote_request.validation.error.forbidden,"Quote requests are unavailable during order amendment.",en_US
sales_order_amendment.quote_request.validation.error.forbidden,"Angebotsanfragen sind während der Bestelländerung nicht verfügbar.",de_DE
sales_order_amendment.order_amendment_after_rfq.validation.error.forbidden,"Amendments are not allowed for orders created from a quote.",en_US
sales_order_amendment.order_amendment_after_rfq.validation.error.forbidden,"Für Bestellungen, die aus einem Angebot erstellt wurden, sind keine Änderungen zulässig.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                 | SPECIFICATION                                                                                                                                                                                              | PREREQUISITES                                                                                                                               | NAMESPACE                                                                            |
|------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| OrderAmendmentCartReorderValidatorPlugin                               | Validates if quote amendment order reference matches `CartReorderTransfer.order.orderReference`.                                                                                                           |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder                     |
| OrderAmendmentQuoteProcessFlowExpanderCartPreReorderPlugin             | Expands the quote process flow with the quote process flow name.                                                                                                                                           |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder                     |
| StartOrderAmendmentCartReorderPostCreatePlugin                         | Triggers the OMS event to start the order amendment process.                                                                                                                                               |                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\CartReorder                  |
| IsAmendableOrderCartReorderRequestValidatorPlugin                      | Validates if all order items are in the order item state that has the `amendable` flag.                                                                                                                    |                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\CartReorder                  |
| AmendmentOrderReferenceCartPreReorderPlugin                            | Sets `CartReorderTransfer.quote.amendmentOrderReference` taken from `CartReorderRequestTransfer.orderReference`.                                                                                           |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder                     |
| AmendmentQuoteNameCartPreReorderPlugin                                 | Updates `CartReorderTransfer.quote.name` with a custom amendment quote name.                                                                                                                               |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder                     |
| OriginalSalesOrderItemPriceCartPreReorderPlugin                        | Adds original sales order item unit prices to `CartReorderTransfer.quote.originalSalesOrderItemUnitPrices` with group keys as an array.                                                                    |                                                                                                                                             | Spryker\Zed\PriceProductSalesOrderAmendment\Communication\Plugin\CartReorder         |
| OrderSalesOrderAmendmentValidatorRulePlugin                            | Validates if an order with provided original or amended order reference exists.                                                                                                                            |                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\SalesOrderAmendment          |
| CartNoteSalesOrderItemCollectorPlugin                                  | Iterates over `SalesOrderAmendmentItemCollectionTransfer.itemsToSkip` and compares an item's cart notes with the corresponding item's cart notes from `OrderTransfer.items`.                               |                                                                                                                                             | Spryker\Zed\CartNote\Communication\Plugin\SalesOrderAmendment                        |
| ShipmentSalesOrderItemCollectorPlugin                                  | Iterates over `SalesOrderAmendmentItemCollectionTransfer.itemsToSkip` and compares an item's shipments with the corresponding item's shipments from `OrderTransfer.items`.                                 |                                                                                                                                             | Spryker\Zed\Shipment\Communication\Plugin\SalesOrderAmendment                        |
| ConfigurableBundleNoteSalesOrderItemCollectorPlugin                    | Iterates over `SalesOrderAmendmentItemCollectionTransfer.itemsToSkip` and compares an item's configurable bundle notes with the corresponding item's configurable bundle notes from `OrderTransfer.items`. |                                                                                                                                             | Spryker\Zed\ConfigurableBundleNote\Communication\Plugin\SalesOrderAmendment          |
| SalesProductConfigurationSalesOrderItemCollectorPlugin                 | Iterates over `SalesOrderAmendmentItemCollectionTransfer.itemsToSkip` and compares an item's configurations with the corresponding item's configurations from `OrderTransfer.items`.                       |                                                                                                                                             | Spryker\Zed\SalesProductConfiguration\Communication\Plugin\SalesOrderAmendment       |
| SalesServicePointSalesOrderItemCollectorPlugin                         | Iterates over `SalesOrderAmendmentItemCollectionTransfer.itemsToSkip` and compares an item's service points with the corresponding item's service points from `OrderTransfer.items`.                       |                                                                                                                                             | Spryker\Zed\SalesServicePoint\Communication\Plugin\SalesOrderAmendment               |
| OrderAmendmentRestCartReorderAttributesMapperPlugin                    | Maps the `isAmendment` property from `RestCartReorderRequestAttributesTransfer` to `CartReorderRequestTransfer`.                                                                                           |                                                                                                                                             | Spryker\Glue\OrderAmendmentsRestApi\Plugin\CartReorderRestApi                        |
| OrderAmendmentRestCartAttributesMapperPlugin                           | Maps the `amendmentOrderReference` field from `QuoteTransfer` to `RestCartsAttributesTransfer`.                                                                                                            |                                                                                                                                             | Spryker\Glue\OrderAmendmentsRestApi\Plugin\CartsRestApi                              |
| OrderAmendmentCheckoutPreCheckPlugin                                   | Validates if an order is in a state that allows amendment.                                                                                                                                                 |                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Checkout                     |
| CustomerOrderSavePlugin                                                | Saves customer info to a sales related table.                                                                                                                                                              |                                                                                                                                             | Spryker\Zed\Customer\Communication\Plugin\Checkout                                   |
| UpdateOrderByQuoteCheckoutDoSaveOrderPlugin                            | Updates order billing address with billing address data from quote.                                                                                                                                        |                                                                                                                                             | Spryker\Zed\Sales\Communication\Plugin\Checkout                                      |
| OrderTotalsSaverPlugin                                                 | Saves order totals.                                                                                                                                                                                        |                                                                                                                                             | Spryker\Zed\Sales\Communication\Plugin\Checkout                                      |
| ReleaseUsedCodesCheckoutDoSaveOrderPlugin                              | Decreases the number of uses of each of located discount codes by 1.                                                                                                                                       |                                                                                                                                             | Spryker\Zed\Discount\Communication\Plugin\Checkout                                   |
| ShipmentTypeCheckoutDoSaveOrderPlugin                                  | Creates or updates a sales shipment type entity.                                                                                                                                                           |                                                                                                                                             | Spryker\Zed\SalesShipmentType\Communication\Plugin\Checkout                          |
| UpdateCartNoteCheckoutDoSaveOrderPlugin                                | Updates an order's cart note with the cart note provided in `QuoteTransfer.cartNote`.                                                                                                                      |                                                                                                                                             | Spryker\Zed\CartNote\Communication\Plugin\Checkout                                   |
| ReplaceSalesOrderDiscountsCheckoutDoSaveOrderPlugin                    | Deletes sales discount and sales discount code entities related to a provided sales order ID. Iterates over `orderItems` and `orderExpenses` and creates sales discount entities for each item.            |                                                                                                                                             | Spryker\Zed\Discount\Communication\Plugin\Checkout                                   |
| ReplaceSalesOrderShipmentCheckoutDoSaveOrderPlugin                     | Recreates new sales shipment expenses for each item level shipment.                                                                                                                                        |                                                                                                                                             | Spryker\Zed\Shipment\Communication\Plugin\Checkout                                   |
| SalesOrderAmendmentItemsCheckoutDoSaveOrderPlugin                      | Replaces an order item during amendment process.                                                                                                                                                           |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout                        |
| ProductBundleOrderSaverPlugin                                          | Saves order bundle items.                                                                                                                                                                                  |                                                                                                                                             | Spryker\Zed\ProductBundle\Communication\Plugin\Checkout                              |
| ReplaceSalesOrderPaymentCheckoutDoSaveOrderPlugin                      | Saves order payments from `QuoteTransfer`.                                                                                                                                                                 |                                                                                                                                             | Spryker\Zed\SalesPayment\Communication\Plugin\Checkout                               |
| GiftCardPaymentCheckoutDoSaveOrderPlugin                               | Iterates over `QuoteTransfer.payments` and saves gift card related payments into the `spy_payment_gift_card` table.                                                                                        |                                                                                                                                             | Spryker\Zed\GiftCard\Communication\Plugin\Checkout                                   |
| ReplaceSalesOrderThresholdExpensesCheckoutDoSaveOrderPlugin            | Iterates over `QuoteTransfer.expenses` and stores expenses of the type defined by `{@link \Spryker\Shared\SalesOrderThreshold\SalesOrderThresholdConfig::THRESHOLD_EXPENSE_TYPE}` in the database.         |                                                                                                                                             | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout                        |
| FinishOrderAmendmentCheckoutPostSavePlugin                             | Triggers the OMS event defined in `{@link \Spryker\Zed\SalesOrderAmendmentOms\SalesOrderAmendmentOmsConfig::getFinishOrderAmendmentEvent()}` to finish the order amendment process.                        |                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Checkout                     |
| DummyPaymentCheckoutPostSavePlugin                                     | If `QuoteTransfer.billingAddress.lastName` is `Invalid`, adds the error into `CheckoutResponseTransfer`.                                                                                                   |                                                                                                                                             | Spryker\Zed\DummyPayment\Communication\Plugin\Checkout                               |
| CloseQuoteRequestCheckoutPostSaveHookPlugin                            | If quote contains a quote request version reference, marks the quote request as closed.                                                                                                                    |                                                                                                                                             | Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout                               |
| SendEmailToGiftCardUser                                                | Sends an email to a Gift Card user.                                                                                                                                                                        |                                                                                                                                             | Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Checkout                      |
| PaymentAuthorizationCheckoutPostSavePlugin                             | Checks whether the payment method selected for the given order requires authorization.                                                                                                                     |                                                                                                                                             | Spryker\Zed\Payment\Communication\Plugin\Checkout                                    |
| PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin                    | Send a request to the used PSP App to confirm the preorder payment.                                                                                                                                        |                                                                                                                                             | Spryker\Zed\Payment\Communication\Plugin\Checkout                                    |
| DisallowQuoteCheckoutPreSavePlugin                                     | Disallows quote checkout for the configured amount of seconds.                                                                                                                                             |                                                                                                                                             | Spryker\Zed\QuoteCheckoutConnector\Communication\Plugin\Checkout                     |
| SalesOrderExpanderPlugin                                               | Transforms the provided cart items according to the configured cart item transformer strategies.                                                                                                           |                                                                                                                                             | Spryker\Zed\Sales\Communication\Plugin\Checkout                                      |
| OriginalOrderQuoteExpanderCheckoutPreSavePlugin                        | Sets `QuoteTransfer.originalOrder` with a found order entity.                                                                                                                                              |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout                        |
| CancelOrderAmendmentQuoteDeleteAfterPlugin                             | Triggers the OMS event defined in `{@link \Spryker\Zed\SalesOrderAmendmentOms\SalesOrderAmendmentOmsConfig::getCancelOrderAmendmentEvent()}` to cancel the order amendment process.                        |                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Quote                        |
| SalesOrderAmendmentOrderExpanderPlugin                                 | Expands `OrderTransfer.salesOrderAmendment` with a found sales order amendment.                                                                                                                            |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Sales                           |
| IsAmendableOrderExpanderPlugin                                         | Checks if all order items are in the order item state that has a flag defined in `{@link \Spryker\Zed\SalesOrderAmendmentOms\SalesOrderAmendmentOmsConfig::getAmendableOmsFlag()}`.                        |                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Sales                        |
| CreateSalesOrderAmendmentOrderPostSavePlugin                           | Persists a sales order amendment entity.                                                                                                                                                                   |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Sales                           |
| OrderAmendmentCartPreCheckPlugin                                       | Validates if the customer order with a provided amendment order reference exists.                                                                                                                          |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Cart                            |
| ResetAmendmentOrderReferencePreReloadItemsPlugin                       | Resets `QuoteTransfer.amendmentOrderReference` before reloading cart items.                                                                                                                                |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Cart                            |
| ResetOriginalSalesOrderItemUnitPricesPreReloadItemsPlugin              | Resets `QuoteTransfer.originalSalesOrderItemUnitPrices` before reloading cart items.                                                                                                                       |                                                                                                                                             | Spryker\Zed\PriceProductSalesOrderAmendment\Communication\Plugin\Cart                |
| ResetAmendmentQuoteProcessFlowQuotePostMergePlugin                     | If `PersistentQuoteTransfer.idQuote` is not equal to `CurrentQuoteTransfer.idQuote`, and `quoteProcessFlow` is set to `order-amendment`, resets `quoteProcessFlow`.                                        |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\PersistentCart                  |
| DefaultQuoteCollectionFilterPlugin                                     | Filters out non-default quotes.                                                                                                                                                                            |                                                                                                                                             | Spryker\Zed\MultiCart\Communication\Plugin\Quote                                     |
| IsAmendableOrderSearchOrderExpanderPlugin                              | Expands the `OrderTransfer.isAmendable` property.                                                                                                                                                          |                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Sales                        |
| OrderAmendmentDefaultOrderItemInitialStateProviderPlugin               | Returns the initial OMS order item state for order items in the order amendment flow.                                                                                                                      |                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Sales                        |
| OrderAmendmentsByOrderResourceRelationshipPlugin                       | Adds the `order-amendments` resource as relationship if `OrderTransfer` and `OrderTransfer.salesOrderAmendment` are provided as a payload.                                                                 |                                                                                                                                             | Spryker\Glue\OrderAmendmentsRestApi\Plugin\GlueApplication                           |
| CountriesCheckoutDataValidatorPlugin                                   | Verifies if countries can be found by `countryIso2Codes` given in `CheckoutDataTransfer.shipments.shippingAddress`.                                                                                        |                                                                                                                                             | Spryker\Zed\Country\Communication\Plugin\CheckoutRestApi                             |
| ShipmentMethodCheckoutDataValidatorPlugin                              | Verifies if a shipment method is valid.                                                                                                                                                                    |                                                                                                                                             | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi                    |
| ItemsCheckoutDataValidatorPlugin                                       | Validates if `CheckoutDataTransfer` provides shipment data per item level.                                                                                                                                 |                                                                                                                                             | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi                    |
| CustomerAddressCheckoutDataValidatorPlugin                             | Checks if customer addresses exist.                                                                                                                                                                        |                                                                                                                                             | Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi                    |
| CompanyBusinessUnitAddressCheckoutDataValidatorPlugin                  | Checks if company addresses exist.                                                                                                                                                                         |                                                                                                                                             | Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\CheckoutRestApi |
| ShipmentTypeCheckoutDataValidatorPlugin                                | Validates whether a shipment type related to the shipment method is active and belongs to the quote store.                                                                                                 |                                                                                                                                             | Spryker\Zed\ShipmentTypesRestApi\Communication\Plugin\CheckoutRestApi                |
| ClickAndCollectExampleReplaceCheckoutDataValidatorPlugin               | Replaces filtered product offers with suitable product offers from Persistence.                                                                                                                            |                                                                                                                                             | Spryker\Zed\ClickAndCollectExample\Communication\Plugin\CheckoutRestApi              |
| SaveOrderCommentThreadOrderPostSavePlugin                              | Saves a comments thread after an order is saved.                                                                                                                                                           |                                                                                                                                             | Spryker\Zed\CommentSalesConnector\Communication\Plugin\Sales                         |
| SaveCompanyBusinessUnitUuidOrderPostSavePlugin                         | Saves company business unit UUID to the order after it's saved.                                                                                                                                            |                                                                                                                                             | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales             |
| SaveCompanyUuidOrderPostSavePlugin                                     | Saves company UUID to the order after it's saved.                                                                                                                                                          |                                                                                                                                             | Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales                         |
| DiscountSalesOrderItemCollectionPreDeletePlugin                        | Deletes sales discount and sales discount code entities found by criteria.                                                                                                                                 |                                                                                                                                             | Spryker\Zed\Discount\Communication\Plugin\Sales                                      |
| SalesDiscountSalesExpensePreDeletePlugin                               | Deletes sales discount entities related to provided expenses.                                                                                                                                              |                                                                                                                                             | Spryker\Zed\Discount\Communication\Plugin\Sales                                      |
| GiftCardOrderItemsPostSavePlugin                                       | Processes gift card order items after they're saved.                                                                                                                                                       |                                                                                                                                             | Spryker\Zed\GiftCard\Communication\Plugin\Sales                                      |
| GiftCardSalesOrderItemCollectionPreDeletePlugin                        | Deletes sales order item gift card entities found by criteria.                                                                                                                                             |                                                                                                                                             | Spryker\Zed\GiftCard\Communication\Plugin\Sales                                      |
| NopaymentSalesOrderItemCollectionPreDeletePlugin                       | Deletes no-payment paid entities found by criteria.                                                                                                                                                        |                                                                                                                                             | Spryker\Zed\Nopayment\Communication\Plugin\Sales                                     |
| DefaultOrderItemInitialStateProviderPlugin                             | Sets the initial OMS state for order items.                                                                                                                                                                |                                                                                                                                             | Spryker\Zed\Oms\Communication\Plugin\Sales                                           |
| OmsItemHistorySalesOrderItemCollectionPreDeletePlugin                  | Deletes entities found by criteria.                                                                                                                                                                        |                                                                                                                                             | Spryker\Zed\Oms\Communication\Plugin\Sales                                           |
| UpdateOrderCustomReferenceOrderPostSavePlugin                          | Updates custom order reference after an order is saved.                                                                                                                                                    |                                                                                                                                             | Spryker\Zed\OrderCustomReference\Communication\Plugin\Sales                          |
| ProductOptionOrderItemsPostSavePlugin                                  | Processes product option order items after they're saved.                                                                                                                                                  |                                                                                                                                             | Spryker\Zed\ProductOption\Communication\Plugin\Sales                                 |
| ProductOptionSalesOrderItemCollectionPostUpdatePlugin                  | Processes product options after an order items collection is  updated.                                                                                                                                     |                                                                                                                                             | Spryker\Zed\ProductOption\Communication\Plugin\Sales                                 |
| ProductOptionSalesOrderItemCollectionPreDeletePlugin                   | Deletes sales order item option entities.                                                                                                                                                                  |                                                                                                                                             | Spryker\Zed\ProductOption\Communication\Plugin\Sales                                 |
| SalesConfigurableBundleSalesOrderItemCollectionPreDeletePlugin         | Deletes sales order configured bundle item entities.                                                                                                                                                       |                                                                                                                                             | Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales                       |
| SalesConfiguredBundlesSalesOrderItemCollectionPostUpdatePlugin         | Processes configured bundles after an order items collection is  updated.                                                                                                                                  |                                                                                                                                             | Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales                       |
| SalesProductConfigurationSalesOrderItemCollectionPostUpdatePlugin      | Processes product configurations after an order items collection is updated.                                                                                                                               |                                                                                                                                             | Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales                     |
| SalesProductConfigurationSalesOrderItemCollectionPreDeletePlugin       | Deletes sales order item configuration entities found by criteria.                                                                                                                                         |                                                                                                                                             | Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales                     |
| ItemMetadataSalesOrderItemCollectionPostUpdatePlugin                   | Processes item metadata after an order items collection is updated.                                                                                                                                        |                                                                                                                                             | Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales                         |
| ItemMetadataSalesOrderItemCollectionPreDeletePlugin                    | Deletes sales order item metadata entities found by criteria.                                                                                                                                              |                                                                                                                                             | Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales                         |
| SalesReclamationSalesOrderItemCollectionPreDeletePlugin                | Deletes sales reclamation item entities found by criteria.                                                                                                                                                 |                                                                                                                                             | Spryker\Zed\SalesReclamation\Communication\Plugin\Sales                              |
| ServicePointSalesOrderItemCollectionPostUpdatePlugin                   | Processes service points after an order items collection is updated.                                                                                                                                       |                                                                                                                                             | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales                             |
| ServicePointSalesOrderItemCollectionPreDeletePlugin                    | Deletes sales order item service point entities found by criteria.                                                                                                                                         |                                                                                                                                             | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales                             |
| SalesOrderAmendmentCurrentCurrencyIsoCodePreCheckPlugin                | Disallows changing the currency when an order is being edited.                                                                                                                                             |                                                                                                                                             | Spryker\Client\SalesOrderAmendment\Plugin\Currency                                   |
| SalesOrderAmendmentCurrentPriceModePreCheckPlugin                      | Disallows changing the price mode when an order is being edited.                                                                                                                                           |                                                                                                                                             | Spryker\Client\SalesOrderAmendment\Plugin\Price                                      |
| PriceItemExpanderPlugin                                                | Adds product prices to item based on currency, price mode, and price type. Allows to expand items with nullable prices.                                                                                    | For Order amendment flow, should be executed instead of `{@link \Spryker\Zed\PriceCartConnector\Communication\Plugin\CartItemPricePlugin}`. | Spryker\Zed\PriceCartConnector\Communication\Plugin\Cart                             |
| OriginalSalesOrderItemPriceItemExpanderPlugin                          | Replaces an item's prices with the original sales order item's prices before adding or removing cart items to persistence.                                                                                 | Should be executed after `{@link \Spryker\Zed\PriceCartConnector\Communication\Plugin\PriceItemExpanderPlugin}`.                            | Spryker\Zed\PriceProductSalesOrderAmendment\Communication\Plugin\Cart                |
| OriginalSalesOrderItemPriceProductPostResolvePlugin                    | Replaces an item's prices with the original sales order item's prices after resolving prices for the resulting `PriceProductTransfer`.                                                                     |                                                                                                                                             | Spryker\Client\PriceProductSalesOrderAmendment\Plugin\PriceProduct                   |
| OrderItemPriceProductResolveConditionsPriceProductFilterExpanderPlugin | Expands `PriceProductFilterTransfer` with `PriceProductResolveConditionsTransfer` from `ProductViewTransfer`.                                                                                              |                                                                                                                                             | Spryker\Client\PriceProductSalesOrderAmendment\Plugin\PriceProductStorage            |
| CurrentStoreCartReorderValidatorPlugin                                 | Validates that the current store matches the store of the order and quote.                                                                                                                                 |                                                                                                                                             | Spryker\Zed\Store\Communication\Plugin\CartReorder                                   |
| ProductOfferOriginalSalesOrderItemGroupKeyExpanderPlugin               | Expands a provided group key with a product offer reference if `ItemTransfer.productOfferReference` is set.                                                                                                |                                                                                                                                             | Spryker\Service\ProductOffer\Plugin\SalesOrderAmendment                              |
| ProductOfferOriginalSalesOrderItemPriceGroupKeyExpanderPlugin          | Expands a provided price group key with a product offer reference if `ItemTransfer.productOfferReference` is set.                                                                                          |                                                                                                                                             | Spryker\Service\ProductOffer\Plugin\SalesOrderAmendment                              |
| OrderAmendmentQuantityBatchAvailabilityStrategyPlugin                  | Calculates available quantity for each processed item.                                                                                                                                                     |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Availability                    |
| OrderAmendmentProductApprovalCartPreCheckPlugin                        | Checks the approval status for products. Skips items that are part of the original order.                                                                                                                  |                                                                                                                                             | Spryker\Zed\ProductApproval\Communication\Plugin\Cart                                |
| OrderAmendmentProductApprovalPreReloadItemsPlugin                      | Checks and removes unapproved product items from Quote transfer. Skips items that are part of the original order.                                                                                          |                                                                                                                                             | Spryker\Zed\ProductApproval\Communication\Plugin\Cart                                |
| OrderAmendmentProductBundleAvailabilityCartPreCheckPlugin              | Checks if product bundle items in `CartChangeTransfer` are available and active. Skips `isActive` validation for items with SKUs from `CartChangeTransfer.quote.originalSalesOrderItems`.                  |                                                                                                                                             | Spryker\Zed\ProductBundle\Communication\Plugin\Cart                                  |
| OrderAmendmentProductBundleStatusCartPreCheckPlugin                    | Checks if product bundle items in `CartChangeTransfer` are active. Skips validation for items with SKUs from `CartChangeTransfer.quote.originalSalesOrderItems`.                                           |                                                                                                                                             | Spryker\Zed\ProductBundle\Communication\Plugin\Cart                                  |
| OrderAmendmentProductExistsCartPreCheckPlugin                          | Checks if the products added to cart exist. Skips items that are part of the original order.                                                                                                               |                                                                                                                                             | Spryker\Zed\ProductCartConnector\Communication\Plugin\Cart                           |
| OrderAmendmentRemoveInactiveItemsPreReloadPlugin                       | Removes inactive items from quote. Skips items that are part of the original order.                                                                                                                        |                                                                                                                                             | Spryker\Zed\ProductCartConnector\Communication\Plugin\Cart                           |
| OrderAmendmentProductDiscontinuedCartPreCheckPlugin                    | Checks all item related products from a cart change request are not discontinued. Skips items that are part of the original order.                                                                         |                                                                                                                                             | Spryker\Zed\ProductDiscontinued\Communication\Plugin\Cart                            |
| OrderAmendmentFilterInactiveProductOfferPreReloadItemsPlugin           | Checks and removes inactive product offers from cart. Skips inactive product offers that are part of the original order.                                                                                   |                                                                                                                                             | Spryker\Zed\ProductOffer\Communication\Plugin\Cart                                   |
| OrderAmendmentProductOfferCartPreCheckPlugin                           | Checks if a cart item product offer belongs to a product. Skips product offers that are part of the original order.                                                                                        |                                                                                                                                             | Spryker\Zed\ProductOffer\Communication\Plugin\Cart                                   |
| OriginalOrderBundleItemCartPreReorderPlugin                            | Expands `CartReorderTransfer.quote` with original sales order items from a provided `CartReorderTransfer.order.bundleItems`.                                                                               |                                                                                                                                             | Spryker\Zed\ProductBundle\Communication\Plugin\CartReorder                           |
| OriginalSalesOrderItemCartPreReorderPlugin                             | Expands `CartReorderTransfer.quote` with original sales order items from a provided `CartReorderTransfer.order.items`.                                                                                     |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder                     |
| RemoveInactiveProductOptionItemsCartReorderPreAddToCartPlugin          | Filters out items with inactive product options from `CartChangeTransfer`.                                                                                                                                 |                                                                                                                                             | Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\CartReorder              |
| OrderAmendmentProductApprovalCheckoutPreConditionPlugin                | Returns `false` if at least one quote item transfer has items with unapproved product. Skips items that are part of the original order.                                                                    |                                                                                                                                             | Spryker\Zed\ProductApproval\Communication\Plugin\Checkout                            |
| OrderAmendmentProductBundleAvailabilityCheckoutPreConditionPlugin      | Checks if the product bundle items in the `QuoteTransfer` are available and active. Skips `isActive` validation for items with SKUs from `QuoteTransfer.originalSalesOrderItems`.                          |                                                                                                                                             | Spryker\Zed\ProductBundle\Communication\Plugin\Checkout                              |
| OrderAmendmentProductExistsCheckoutPreConditionPlugin                  | Validates if concrete products with the `QuoteTransfer.item.sku` SKU exist and are active. Skips items that are part of the original order.                                                                |                                                                                                                                             | Spryker\Zed\ProductCartConnector\Communication\Plugin\Checkout                       |
| OrderAmendmentProductDiscontinuedCheckoutPreConditionPlugin            | Checks if there are no discontinued products in checkout. Skips items that are part of the original order.                                                                                                 |                                                                                                                                             | Spryker\Zed\ProductDiscontinued\Communication\Plugin\Checkout                        |
| OrderAmendmentProductOfferCheckoutPreConditionPlugin                   | Returns `false` if at least one quote item transfer has items with inactive or unapproved `ProductOffer`. Skips product offers that are part of the original order.                                        |                                                                                                                                             | Spryker\Zed\ProductOffer\Communication\Plugin\Checkout                               |
| SalesOrderAmendmentQuoteCheckoutDoSaveOrderPlugin                      | Creates a new sales order amendment quote entity based on a provided `QuoteTransfer`.                                                                                                                      |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout                        |
| UpdateDeletedItemReservationCommandByOrderPlugin                       | Retrieves the sales order amendment quote collection by order reference. If the collection is not empty, updates the reservations of deleted items in the order.                                           |                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Oms                          |
| OriginalSalesOrderItemGroupKeyCartReorderItemHydratorPlugin            | Hydrates `items.originalSalesOrderItemGroupKey` with the original sales order item group key.                                                                                                              |                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder                     |



<details>
  <summary>src/Pyz/Service/SalesOrderAmendment/SalesOrderAmendmentDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Service\SalesOrderAmendment;

use Spryker\Service\ProductOffer\Plugin\SalesOrderAmendment\ProductOfferOriginalSalesOrderItemGroupKeyExpanderPlugin;
use Spryker\Service\SalesOrderAmendment\SalesOrderAmendmentDependencyProvider as SprykerSalesOrderAmendmentDependencyProvider;

class SalesOrderAmendmentDependencyProvider extends SprykerSalesOrderAmendmentDependencyProvider
{
    /**
     * @return list<\Spryker\Service\SalesOrderAmendmentExtension\Dependency\Plugin\OriginalSalesOrderItemGroupKeyExpanderPluginInterface>
     */
    protected function getOriginalSalesOrderItemGroupKeyExpanderPlugins(): array
    {
        return [
            new ProductOfferOriginalSalesOrderItemGroupKeyExpanderPlugin(),
        ];
    }
}
```

</details>

<details>
    <summary>src/Pyz/Service/PriceProductSalesOrderAmendment/PriceProductSalesOrderAmendmentDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Service\PriceProductSalesOrderAmendment;

use Spryker\Service\PriceProductOfferSalesOrderAmendmentConnector\Plugin\PriceProductSalesOrderAmendment\ProductOfferOriginalSalesOrderItemPriceGroupKeyExpanderPlugin;
use Spryker\Service\PriceProductSalesOrderAmendment\PriceProductSalesOrderAmendmentDependencyProvider as SprykerPriceProductSalesOrderAmendmentDependencyProvider;

class PriceProductSalesOrderAmendmentDependencyProvider extends SprykerPriceProductSalesOrderAmendmentDependencyProvider
{
    /**
     * @return list<\Spryker\Service\PriceProductSalesOrderAmendmentExtension\Dependency\Plugin\OriginalSalesOrderItemPriceGroupKeyExpanderPluginInterface>
     */
    protected function getOriginalSalesOrderItemPriceGroupKeyExpanderPlugins(): array
    {
        return [
            new ProductOfferOriginalSalesOrderItemPriceGroupKeyExpanderPlugin(),
        ];
    }
}
```

</details>


<details>
  <summary>src/Pyz/Zed/SalesOrderAmendment/SalesOrderAmendmentDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\SalesOrderAmendment;

use Spryker\Zed\CartNote\Communication\Plugin\SalesOrderAmendment\CartNoteSalesOrderItemCollectorPlugin;
use Spryker\Zed\ConfigurableBundleNote\Communication\Plugin\SalesOrderAmendment\ConfigurableBundleNoteSalesOrderItemCollectorPlugin;
use Spryker\Zed\SalesOrderAmendment\SalesOrderAmendmentDependencyProvider as SprykerSalesOrderAmendmentDependencyProvider;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\SalesOrderAmendment\OrderSalesOrderAmendmentValidatorRulePlugin;
use Spryker\Zed\SalesProductConfiguration\Communication\Plugin\SalesOrderAmendment\SalesProductConfigurationSalesOrderItemCollectorPlugin;
use Spryker\Zed\SalesServicePoint\Communication\Plugin\SalesOrderAmendment\SalesServicePointSalesOrderItemCollectorPlugin;
use Spryker\Zed\Shipment\Communication\Plugin\SalesOrderAmendment\ShipmentSalesOrderItemCollectorPlugin;

class SalesOrderAmendmentDependencyProvider extends SprykerSalesOrderAmendmentDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesOrderAmendmentExtension\Dependency\Plugin\SalesOrderAmendmentValidatorRulePluginInterface>
     */
    protected function getSalesOrderAmendmentCreateValidationRulePlugins(): array
    {
        return [
            new OrderSalesOrderAmendmentValidatorRulePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesOrderAmendmentExtension\Dependency\Plugin\SalesOrderItemCollectorPluginInterface>
     */
    protected function getSalesOrderItemCollectorPlugins(): array
    {
        return [
            new CartNoteSalesOrderItemCollectorPlugin(),
            new ShipmentSalesOrderItemCollectorPlugin(),
            new ConfigurableBundleNoteSalesOrderItemCollectorPlugin(),
            new SalesProductConfigurationSalesOrderItemCollectorPlugin(),
            new SalesServicePointSalesOrderItemCollectorPlugin(),
        ];
    }
}
```

</details>


<details>
  <summary>src/Pyz/Zed/CartReorder/CartReorderDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\CartReorder;

use Spryker\Zed\CartReorder\CartReorderDependencyProvider as SprykerCartReorderDependencyProvider;
use Spryker\Zed\PriceProductSalesOrderAmendment\Communication\Plugin\CartReorder\OriginalSalesOrderItemPriceCartPreReorderPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\AmendmentOrderReferenceCartPreReorderPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\AmendmentQuoteNameCartPreReorderPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\OrderAmendmentCartReorderValidatorPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\OrderAmendmentQuoteProcessFlowExpanderCartPreReorderPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\CartReorder\IsAmendableOrderCartReorderRequestValidatorPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\CartReorder\StartOrderAmendmentCartReorderPostCreatePlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\OriginalSalesOrderItemGroupKeyCartReorderItemHydratorPlugin;
use Spryker\Zed\Store\Communication\Plugin\CartReorder\CurrentStoreCartReorderValidatorPlugin;

class CartReorderDependencyProvider extends SprykerCartReorderDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderRequestValidatorPluginInterface>
     */
    protected function getCartReorderRequestValidatorPlugins(): array
    {
        return [
            new IsAmendableOrderCartReorderRequestValidatorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderValidatorPluginInterface>
     */
    protected function getCartReorderValidatorPluginsForOrderAmendment(): array
    {
        return [
            new CurrentStoreCartReorderValidatorPlugin(),
            new OrderAmendmentCartReorderValidatorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartPreReorderPluginInterface>
     */
    protected function getCartPreReorderPlugins(): array
    {
        return [
            new OrderAmendmentQuoteProcessFlowExpanderCartPreReorderPlugin(),
            new AmendmentOrderReferenceCartPreReorderPlugin(),
            new AmendmentQuoteNameCartPreReorderPlugin(),
            new OriginalSalesOrderItemPriceCartPreReorderPlugin(),
        ];
    }
    
    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderItemHydratorPluginInterface>
     */
    protected function getCartReorderItemHydratorPlugins(): array
    {
        return [
            new OriginalSalesOrderItemGroupKeyCartReorderItemHydratorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartPostReorderPluginInterface>
     */
    protected function getCartPostReorderPlugins(): array
    {
        return [
            new StartOrderAmendmentCartReorderPostCreatePlugin(),
        ];
    }
}
```

</details>

<details>
  <summary>src/Pyz/Glue/CartReorderRestApi/CartReorderRestApiDependencyProvider.php</summary>


```php
<?php

namespace Pyz\Glue\CartReorderRestApi;

use Spryker\Glue\CartReorderRestApi\CartReorderRestApiDependencyProvider as SprykerCartReorderRestApiDependencyProvider;
use Spryker\Glue\OrderAmendmentsRestApi\Plugin\CartReorderRestApi\OrderAmendmentRestCartReorderAttributesMapperPlugin;

class CartReorderRestApiDependencyProvider extends SprykerCartReorderRestApiDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\CartReorderRestApiExtension\Dependency\Plugin\RestCartReorderAttributesMapperPluginInterface>
     */
    protected function getRestCartReorderAttributesMapperPlugins(): array
    {
        return [
            new OrderAmendmentRestCartReorderAttributesMapperPlugin(),
        ];
    }
}
```

</details>

<details>
  <summary>src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php</summary>


```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\OrderAmendmentsRestApi\Plugin\CartsRestApi\OrderAmendmentRestCartAttributesMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\RestCartAttributesMapperPluginInterface>
     */
    protected function getRestCartAttributesMapperPlugins(): array
    {
        return [
            new OrderAmendmentRestCartAttributesMapperPlugin(),
        ];
    }
}
```


</details>


<details>
  <summary>src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\CartNote\Communication\Plugin\Checkout\UpdateCartNoteCheckoutDoSaveOrderPlugin;
use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Customer\Communication\Plugin\Checkout\CustomerOrderSavePlugin;
use Spryker\Zed\Discount\Communication\Plugin\Checkout\ReleaseUsedCodesCheckoutDoSaveOrderPlugin;
use Spryker\Zed\Discount\Communication\Plugin\Checkout\ReplaceSalesOrderDiscountsCheckoutDoSaveOrderPlugin;
use Spryker\Zed\DummyPayment\Communication\Plugin\Checkout\DummyPaymentCheckoutPostSavePlugin;
use Spryker\Zed\GiftCard\Communication\Plugin\Checkout\GiftCardPaymentCheckoutDoSaveOrderPlugin;
use Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Checkout\SendEmailToGiftCardUser;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentAuthorizationCheckoutPostSavePlugin;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin;
use Spryker\Zed\ProductApproval\Communication\Plugin\Checkout\OrderAmendmentProductApprovalCheckoutPreConditionPlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Checkout\FilterOriginalOrderBundleItemCheckoutPreSavePlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Checkout\OrderAmendmentProductBundleAvailabilityCheckoutPreConditionPlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Checkout\ProductBundleOrderSaverPlugin;
use Spryker\Zed\ProductCartConnector\Communication\Plugin\Checkout\OrderAmendmentProductExistsCheckoutPreConditionPlugin;
use Spryker\Zed\ProductDiscontinued\Communication\Plugin\Checkout\OrderAmendmentProductDiscontinuedCheckoutPreConditionPlugin;
use Spryker\Zed\ProductOffer\Communication\Plugin\Checkout\OrderAmendmentProductOfferCheckoutPreConditionPlugin;
use Spryker\Zed\QuoteCheckoutConnector\Communication\Plugin\Checkout\DisallowQuoteCheckoutPreSavePlugin;
use Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout\CloseQuoteRequestCheckoutPostSaveHookPlugin;
use Spryker\Zed\Sales\Communication\Plugin\Checkout\OrderTotalsSaverPlugin;
use Spryker\Zed\Sales\Communication\Plugin\Checkout\SalesOrderExpanderPlugin;
use Spryker\Zed\Sales\Communication\Plugin\Checkout\UpdateOrderByQuoteCheckoutDoSaveOrderPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout\OriginalOrderQuoteExpanderCheckoutPreSavePlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout\SalesOrderAmendmentItemsCheckoutDoSaveOrderPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout\SalesOrderAmendmentQuoteCheckoutDoSaveOrderPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Checkout\FinishOrderAmendmentCheckoutPostSavePlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Checkout\OrderAmendmentCheckoutPreCheckPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout\ReplaceSalesOrderThresholdExpensesCheckoutDoSaveOrderPlugin;
use Spryker\Zed\SalesPayment\Communication\Plugin\Checkout\ReplaceSalesOrderPaymentCheckoutDoSaveOrderPlugin;
use Spryker\Zed\SalesShipmentType\Communication\Plugin\Checkout\ShipmentTypeCheckoutDoSaveOrderPlugin;
use Spryker\Zed\Shipment\Communication\Plugin\Checkout\ReplaceSalesOrderShipmentCheckoutDoSaveOrderPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>
     */
    protected function getCheckoutPreConditionsForOrderAmendment(Container $container): array
    {
        return [
            new OrderAmendmentProductBundleAvailabilityCheckoutPreConditionPlugin(),
            new OrderAmendmentProductDiscontinuedCheckoutPreConditionPlugin(),
            new OrderAmendmentProductOfferCheckoutPreConditionPlugin(),
            new OrderAmendmentProductExistsCheckoutPreConditionPlugin(),
            new OrderAmendmentProductApprovalCheckoutPreConditionPlugin(),
            new OrderAmendmentCheckoutPreCheckPlugin(),
        ];
    }


    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface|\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface>
     */
    protected function getCheckoutOrderSaversForOrderAmendment(Container $container): array
    {
        return [
            new CustomerOrderSavePlugin(),
            new UpdateOrderByQuoteCheckoutDoSaveOrderPlugin(),
            new OrderTotalsSaverPlugin(),
            new ReleaseUsedCodesCheckoutDoSaveOrderPlugin(),
            new ShipmentTypeCheckoutDoSaveOrderPlugin(),
            new UpdateCartNoteCheckoutDoSaveOrderPlugin(),
            new ReplaceSalesOrderDiscountsCheckoutDoSaveOrderPlugin(),
            new ReplaceSalesOrderShipmentCheckoutDoSaveOrderPlugin(),
            new SalesOrderAmendmentItemsCheckoutDoSaveOrderPlugin(),
            new ProductBundleOrderSaverPlugin(),
            new ReplaceSalesOrderPaymentCheckoutDoSaveOrderPlugin(),
            new SalesOrderAmendmentQuoteCheckoutDoSaveOrderPlugin(),
            new GiftCardPaymentCheckoutDoSaveOrderPlugin(),
            new ReplaceSalesOrderThresholdExpensesCheckoutDoSaveOrderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface>
     */
    protected function getCheckoutPostHooks(Container $container): array
    {
        return [
            new FinishOrderAmendmentCheckoutPostSavePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface>
     */
    protected function getCheckoutPostHooksForOrderAmendment(Container $container): array
    {
        return [
            new DummyPaymentCheckoutPostSavePlugin(),
            new CloseQuoteRequestCheckoutPostSaveHookPlugin(),
            new SendEmailToGiftCardUser(),
            new PaymentAuthorizationCheckoutPostSavePlugin(),
            new PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveHookInterface|\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveInterface|\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreSavePluginInterface>
     */
    protected function getCheckoutPreSaveHooksForOrderAmendment(Container $container): array
    {
        return [
            new DisallowQuoteCheckoutPreSavePlugin(),
            new SalesOrderExpanderPlugin(),
            new OriginalOrderQuoteExpanderCheckoutPreSavePlugin(),
            new FilterOriginalOrderBundleItemCheckoutPreSavePlugin(),
        ];
    }
}
```

</details>



<details>
  <summary>src/Pyz/Zed/Quote/QuoteDependencyProvider.php</summary>


```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\MultiCart\Communication\Plugin\Quote\DefaultQuoteCollectionFilterPlugin;
use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Quote\CancelOrderAmendmentQuoteDeleteAfterPlugin;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteDeleteAfterPluginInterface>
     */
    protected function getQuoteDeleteAfterPlugins(): array
    {
        return [
            new CancelOrderAmendmentQuoteDeleteAfterPlugin(),
        ];
    }
    
    /**
     * @return list<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteCollectionFilterPluginInterface>
     */
    protected function getQuoteCollectionFilterPlugins(): array
    {
        return [
            new DefaultQuoteCollectionFilterPlugin(),
        ];
    }
}
```

</details>



<details>
  <summary>src/Pyz/Zed/Sales/SalesDependencyProvider.php</summary>


```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\CommentSalesConnector\Communication\Plugin\Sales\SaveOrderCommentThreadOrderPostSavePlugin;
use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales\SaveCompanyBusinessUnitUuidOrderPostSavePlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales\SaveCompanyUuidOrderPostSavePlugin;
use Spryker\Zed\Discount\Communication\Plugin\Sales\DiscountSalesOrderItemCollectionPreDeletePlugin;
use Spryker\Zed\Discount\Communication\Plugin\Sales\SalesDiscountSalesExpensePreDeletePlugin;
use Spryker\Zed\GiftCard\Communication\Plugin\Sales\GiftCardOrderItemsPostSavePlugin;
use Spryker\Zed\GiftCard\Communication\Plugin\Sales\GiftCardSalesOrderItemCollectionPreDeletePlugin;
use Spryker\Zed\Nopayment\Communication\Plugin\Sales\NopaymentSalesOrderItemCollectionPreDeletePlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\DefaultOrderItemInitialStateProviderPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\OmsItemHistorySalesOrderItemCollectionPreDeletePlugin;
use Spryker\Zed\OrderCustomReference\Communication\Plugin\Sales\UpdateOrderCustomReferenceOrderPostSavePlugin;
use Spryker\Zed\ProductOption\Communication\Plugin\Sales\ProductOptionOrderItemsPostSavePlugin;
use Spryker\Zed\ProductOption\Communication\Plugin\Sales\ProductOptionSalesOrderItemCollectionPostUpdatePlugin;
use Spryker\Zed\ProductOption\Communication\Plugin\Sales\ProductOptionSalesOrderItemCollectionPreDeletePlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales\SalesConfigurableBundleSalesOrderItemCollectionPreDeletePlugin;
use Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales\SalesConfiguredBundlesSalesOrderItemCollectionPostUpdatePlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Sales\CreateSalesOrderAmendmentOrderPostSavePlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Sales\SalesOrderAmendmentOrderExpanderPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Sales\IsAmendableOrderExpanderPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Sales\IsAmendableOrderSearchOrderExpanderPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Sales\OrderAmendmentDefaultOrderItemInitialStateProviderPlugin;
use Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales\SalesProductConfigurationSalesOrderItemCollectionPostUpdatePlugin;
use Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales\SalesProductConfigurationSalesOrderItemCollectionPreDeletePlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales\ItemMetadataSalesOrderItemCollectionPostUpdatePlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales\ItemMetadataSalesOrderItemCollectionPreDeletePlugin;
use Spryker\Zed\SalesReclamation\Communication\Plugin\Sales\SalesReclamationSalesOrderItemCollectionPreDeletePlugin;
use Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointSalesOrderItemCollectionPostUpdatePlugin;
use Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointSalesOrderItemCollectionPreDeletePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface>
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new SalesOrderAmendmentOrderExpanderPlugin(),
            new IsAmendableOrderExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostSavePluginInterface>
     */
    protected function getOrderPostSavePluginsForOrderAmendment(): array
    {
        return [
            new SaveOrderCommentThreadOrderPostSavePlugin(),
            new UpdateOrderCustomReferenceOrderPostSavePlugin(),
            new SaveCompanyBusinessUnitUuidOrderPostSavePlugin(),
            new SaveCompanyUuidOrderPostSavePlugin(),
            new CreateSalesOrderAmendmentOrderPostSavePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderExpanderPluginInterface>
     */
    protected function getSearchOrderExpanderPlugins(): array
    {
        return [
            new IsAmendableOrderSearchOrderExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
     */
    protected function getOrderItemsPostSavePlugins(): array
    {
        return [
            new GiftCardOrderItemsPostSavePlugin(),
            new ProductOptionOrderItemsPostSavePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\SalesExpensePreDeletePluginInterface>
     */
    protected function getSalesExpensePreDeletePlugins(): array
    {
        return [
            new SalesDiscountSalesExpensePreDeletePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\SalesOrderItemCollectionPreDeletePluginInterface>
     */
    protected function getSalesOrderItemCollectionPreDeletePlugins(): array
    {
        return [
            new DiscountSalesOrderItemCollectionPreDeletePlugin(),
            new ItemMetadataSalesOrderItemCollectionPreDeletePlugin(),
            new OmsItemHistorySalesOrderItemCollectionPreDeletePlugin(),
            new ProductOptionSalesOrderItemCollectionPreDeletePlugin(),
            new ServicePointSalesOrderItemCollectionPreDeletePlugin(),
            new SalesConfigurableBundleSalesOrderItemCollectionPreDeletePlugin(),
            new SalesProductConfigurationSalesOrderItemCollectionPreDeletePlugin(),
            new GiftCardSalesOrderItemCollectionPreDeletePlugin(),
            new NopaymentSalesOrderItemCollectionPreDeletePlugin(),
            new SalesReclamationSalesOrderItemCollectionPreDeletePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\SalesOrderItemCollectionPostUpdatePluginInterface>
     */
    protected function getOrderItemCollectionPostUpdatePlugins(): array
    {
        return [
            new SalesConfiguredBundlesSalesOrderItemCollectionPostUpdatePlugin(),
            new SalesProductConfigurationSalesOrderItemCollectionPostUpdatePlugin(),
            new ItemMetadataSalesOrderItemCollectionPostUpdatePlugin(),
            new ServicePointSalesOrderItemCollectionPostUpdatePlugin(),
            new ProductOptionSalesOrderItemCollectionPostUpdatePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemInitialStateProviderPluginInterface>
     */
    protected function getOrderItemInitialStateProviderPlugins(): array
    {
        return [
            new DefaultOrderItemInitialStateProviderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemInitialStateProviderPluginInterface>
     */
    protected function getOrderItemInitialStateProviderPluginsForOrderAmendment(): array
    {
        return [
            new OrderAmendmentDefaultOrderItemInitialStateProviderPlugin(),
        ];
    }
}
```

</details>

<details>
  <summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\OrderAmendmentsRestApi\Plugin\GlueApplication\OrderAmendmentsByOrderResourceRelationshipPlugin;
use Spryker\Glue\OrdersRestApi\OrdersRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            OrdersRestApiConfig::RESOURCE_ORDERS,
            new OrderAmendmentsByOrderResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```



</details>



<details>
  <summary>src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>


```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\ClickAndCollectExample\Communication\Plugin\CheckoutRestApi\ClickAndCollectExampleReplaceCheckoutDataValidatorPlugin;
use Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\CheckoutRestApi\CompanyBusinessUnitAddressCheckoutDataValidatorPlugin;
use Spryker\Zed\Country\Communication\Plugin\CheckoutRestApi\CountriesCheckoutDataValidatorPlugin;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\CustomerAddressCheckoutDataValidatorPlugin;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ItemsCheckoutDataValidatorPlugin;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ShipmentMethodCheckoutDataValidatorPlugin;
use Spryker\Zed\ShipmentTypesRestApi\Communication\Plugin\CheckoutRestApi\ShipmentTypeCheckoutDataValidatorPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataValidatorPluginInterface>
     */
    protected function getCheckoutDataValidatorPluginsForOrderAmendment(): array
    {
        return [
            new CountriesCheckoutDataValidatorPlugin(),
            new ShipmentMethodCheckoutDataValidatorPlugin(),
            new ItemsCheckoutDataValidatorPlugin(),
            new CustomerAddressCheckoutDataValidatorPlugin(),
            new CompanyBusinessUnitAddressCheckoutDataValidatorPlugin(),
            new ShipmentTypeCheckoutDataValidatorPlugin(),
            new ClickAndCollectExampleReplaceCheckoutDataValidatorPlugin(),
        ];
    }
}
```

</details>

<details>
  <summary>src/Pyz/Zed/Availability/AvailabilityDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Availability;

use Spryker\Zed\Availability\AvailabilityDependencyProvider as SprykerAvailabilityDependencyProvider;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Availability\OrderAmendmentQuantityBatchAvailabilityStrategyPlugin;

class AvailabilityDependencyProvider extends SprykerAvailabilityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AvailabilityExtension\Dependency\Plugin\BatchAvailabilityStrategyPluginInterface>
     */
    protected function getBatchAvailabilityStrategyPlugins(): array
    {
        return [
            /*
             * OrderAmendmentQuantityBatchAvailabilityStrategyPlugin needs to be after all other implementations including ProductConcreteBatchAvailabilityStrategyPlugin.
             */
            new OrderAmendmentQuantityBatchAvailabilityStrategyPlugin(),
        ];
    }
}
```

</details>

<details>
  <summary>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Oms\DeleteOrderAmendmentQuoteCommandByOrderPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Oms\UpdateDeletedItemReservationCommandByOrderPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new UpdateDeletedItemReservationCommandByOrderPlugin(), 'OrderAmendment/UnreserveDeletedItems');
            $commandCollection->add(new DeleteOrderAmendmentQuoteCommandByOrderPlugin(), 'OrderAmendment/StartGracePeriod');

            return $commandCollection;
        });

        return $container;
    }
}
```

</details>

{% info_block warningBox "Verification" %}

1. Place an order with different types of products–for example, physical or digital, and check if the order amendment is available.
2. Go to order detail and order list pages and check if the **edit order** button is displayed.
3. Deactivated and discontinue the products in the order. Make sure the order can be amended.

{% endinfo_block %}

**src/Pyz/Client/Currency/CurrencyDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Currency;

use Spryker\Client\Currency\CurrencyDependencyProvider as SprykerCurrencyDependencyProvider;
use Spryker\Client\SalesOrderAmendment\Plugin\Currency\SalesOrderAmendmentCurrentCurrencyIsoCodePreCheckPlugin;

class CurrencyDependencyProvider extends SprykerCurrencyDependencyProvider
{
    /**
     * @return list<\Spryker\Client\CurrencyExtension\Dependency\Plugin\CurrentCurrencyIsoCodePreCheckPluginInterface>
     */
    protected function getCurrentCurrencyIsoCodePreCheckPlugins(): array
    {
        return [
            new SalesOrderAmendmentCurrentCurrencyIsoCodePreCheckPlugin(),
        ];
    }
}
```

**src/Pyz/Client/Price/PriceDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Price;

use Spryker\Client\Price\PriceDependencyProvider as SprykerPriceDependencyProvider;
use Spryker\Client\SalesOrderAmendment\Plugin\Price\SalesOrderAmendmentCurrentPriceModePreCheckPlugin;

class PriceDependencyProvider extends SprykerPriceDependencyProvider
{
    /**
     * @return list<\Spryker\Client\PriceExtension\Dependency\Plugin\CurrentPriceModePreCheckPluginInterface>
     */
    protected function getCurrentPriceModePreCheckPlugins(): array
    {
        return [
            new SalesOrderAmendmentCurrentPriceModePreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make a Glue API call with a currency and price mode different from those in the cart when an order is being edited. For example: `htts://glue.mysprykershop.com/catalog-search?q=001&currency=CHF&priceMode=NET_MODE`. Make sure the currency and price mode remain unchanged.

{% endinfo_block %}

<details>
  <summary>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\PriceCartConnector\Communication\Plugin\Cart\PriceItemExpanderPlugin;
use Spryker\Zed\PriceProductSalesOrderAmendment\Communication\Plugin\Cart\OriginalSalesOrderItemPriceItemExpanderPlugin;
use Spryker\Zed\PriceProductSalesOrderAmendment\Communication\Plugin\Cart\ResetOriginalSalesOrderItemUnitPricesPreReloadItemsPlugin;
use Spryker\Zed\ProductApproval\Communication\Plugin\Cart\OrderAmendmentProductApprovalCartPreCheckPlugin;
use Spryker\Zed\ProductApproval\Communication\Plugin\Cart\OrderAmendmentProductApprovalPreReloadItemsPlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Cart\OrderAmendmentProductBundleAvailabilityCartPreCheckPlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Cart\OrderAmendmentProductBundleStatusCartPreCheckPlugin;
use Spryker\Zed\ProductCartConnector\Communication\Plugin\Cart\OrderAmendmentProductExistsCartPreCheckPlugin;
use Spryker\Zed\ProductCartConnector\Communication\Plugin\Cart\OrderAmendmentRemoveInactiveItemsPreReloadPlugin;
use Spryker\Zed\ProductDiscontinued\Communication\Plugin\Cart\OrderAmendmentProductDiscontinuedCartPreCheckPlugin;
use Spryker\Zed\ProductOffer\Communication\Plugin\Cart\OrderAmendmentFilterInactiveProductOfferPreReloadItemsPlugin;
use Spryker\Zed\ProductOffer\Communication\Plugin\Cart\OrderAmendmentProductOfferCartPreCheckPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Cart\OrderAmendmentCartPreCheckPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Cart\ResetAmendmentOrderReferencePreReloadItemsPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface>
     */
    protected function getExpanderPluginsForOrderAmendment(Container $container): array
    {
        return [
            new PriceItemExpanderPlugin(),
            new OriginalSalesOrderItemPriceItemExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface>
     */
    protected function getCartPreCheckPluginsForOrderAmendment(): array
    {
        return [
            new OrderAmendmentProductExistsCartPreCheckPlugin(),
            new OrderAmendmentProductBundleAvailabilityCartPreCheckPlugin(),
            new OrderAmendmentProductBundleStatusCartPreCheckPlugin(),
            new OrderAmendmentProductDiscontinuedCartPreCheckPlugin(),
            new OrderAmendmentProductOfferCartPreCheckPlugin(),
            new OrderAmendmentProductApprovalCartPreCheckPlugin(),
            // Plugins from getCartPreCheckPlugins() without CartItemPricePreCheckPlugin
            new OrderAmendmentCartPreCheckPlugin(),
        ];
    }
    
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface>
     */
    protected function getPreReloadPlugins(Container $container): array
    {
        new ResetAmendmentOrderReferencePreReloadItemsPlugin(),
        new ResetOriginalSalesOrderItemUnitPricesPreReloadItemsPlugin(),
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface>
     */
    protected function getPreReloadPluginsForOrderAmendment(Container $container): array
    {
        return [
            new OrderAmendmentRemoveInactiveItemsPreReloadPlugin(),
            new OrderAmendmentFilterInactiveProductOfferPreReloadItemsPlugin(),
            new OrderAmendmentProductApprovalPreReloadItemsPlugin(),
            // Plugins from getPreReloadPlugin() without FilterItemsWithoutPricePlugin
        ];
    }
}
```

</details>

**src/Pyz/Zed/PersistentCart/PersistentCartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PersistentCart;

use Spryker\Zed\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\PersistentCart\ResetAmendmentQuoteProcessFlowQuotePostMergePlugin;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\PersistentCartExtension\Dependency\Plugin\QuotePostMergePluginInterface>
     */
    protected function getQuotePostMergePlugins(): array
    {
        return [
            new ResetAmendmentQuoteProcessFlowQuotePostMergePlugin(),
        ];
    }
}
```

**src/Pyz/Client/PriceProduct/PriceProductDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PriceProduct;

use Spryker\Client\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Client\PriceProductSalesOrderAmendment\Plugin\PriceProduct\OriginalSalesOrderItemPriceProductPostResolvePlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * @return list<\Spryker\Client\PriceProductExtension\Dependency\Plugin\PriceProductPostResolvePluginInterface>
     */
    protected function getPriceProductPostResolvePlugins(): array
    {
        return [
            new OriginalSalesOrderItemPriceProductPostResolvePlugin(),
        ];
    }
}
```

**src/Pyz/Client/PriceProductStorage/PriceProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PriceProductStorage;

use Spryker\Client\PriceProductSalesOrderAmendment\Plugin\PriceProductStorage\OrderItemPriceProductResolveConditionsPriceProductFilterExpanderPlugin;
use Spryker\Client\PriceProductStorage\PriceProductStorageDependencyProvider as SprykerPriceProductStorageDependencyProvider;

class PriceProductStorageDependencyProvider extends SprykerPriceProductStorageDependencyProvider
{
    /**
     * @return list<\Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductFilterExpanderPluginInterface>
     */
    protected function getPriceProductFilterExpanderPlugins(): array
    {
        return [
            new OrderItemPriceProductResolveConditionsPriceProductFilterExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Place an order with a product.  
2. Increase the price of the product from the order.  
3. Start the order amendment process for the order you've placed.
  Make sure the product still has the original price.
4. Go to the order details page and click the product to go to the product details page.
  Make sure that, on the product details page, the product still has the original price.



{% endinfo_block %}

## Add the quotation process context

Take the steps in the following sections to add the context for quote requests.

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/sales-quote-request-connector: "^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                     | EXPECTED DIRECTORY                           |
|----------------------------|----------------------------------------------|
| SalesQuoteRequestConnector | vendor/spryker/sales-quote-request-connector |

{% endinfo_block %}

### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                          | SPECIFICATION                                                                                                                        | PREREQUISITES | NAMESPACE                                                         |
|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------|
| QuoteRequestVersionReferenceOrderPostSavePlugin | Persists the `QuoteTransfer.quoteRequestVersionReference` transfer property in the `spy_sales_order` table.                                  |               | Spryker\Zed\SalesQuoteRequestConnector\Communication\Plugin\Sales |
| OrderAmendmentQuoteRequestQuoteCheckPlugin      | Returns false if quote is in amendment process; otherwise, returns true.                                                                      |               | Spryker\Client\SalesOrderAmendment\Plugin\QuoteRequest            |
| OrderAmendmentQuoteRequestValidatorPlugin       | Prevents create and update of a quote request with quote in order amendment process.                                                       |               | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\QuoteRequest |
| OrderAmendmentQuoteRequestUserValidatorPlugin   | Prevents create and update of a quote request with quote in order amendment process.                                                        |               | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\QuoteRequest |
| QuoteRequestVersionCartReorderValidatorPlugin   | Returns `CartReorderResponseTransfer.errors` with error messages if `CartReorderTransfer.order.quoteRequestVersionReference` is set. |               | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder  |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesQuoteRequestConnector\Communication\Plugin\Sales\QuoteRequestVersionReferenceOrderPostSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostSavePluginInterface>
     */
    protected function getOrderPostSavePlugins(): array
    {
        return [
            new QuoteRequestVersionReferenceOrderPostSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Create a request for quote.
2. As an agent, approve the quote request.
3. Place an order that was converted from request for quote.
Make sure the `quote_request_version_reference` column in the `spy_sales_order` table is populated with the correct value.

{% endinfo_block %}

**src/Pyz/Client/QuoteRequest/QuoteRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Client\QuoteRequest;

use Spryker\Client\QuoteRequest\QuoteRequestDependencyProvider as SprykerQuoteRequestDependencyProvider;
use Spryker\Client\SalesOrderAmendment\Plugin\QuoteRequest\OrderAmendmentQuoteRequestQuoteCheckPlugin;

class QuoteRequestDependencyProvider extends SprykerQuoteRequestDependencyProvider
{
    /**
     * @return list<\Spryker\Client\QuoteRequestExtension\Dependency\Plugin\QuoteRequestQuoteCheckPluginInterface>
     */
    protected function getQuoteRequestQuoteCheckPlugins(): array
    {
        return [
            new OrderAmendmentQuoteRequestQuoteCheckPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/QuoteRequest/QuoteRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\QuoteRequest;

use Spryker\Zed\QuoteRequest\QuoteRequestDependencyProvider as SprykerQuoteRequestDependencyProvider;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\QuoteRequest\OrderAmendmentQuoteRequestUserValidatorPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\QuoteRequest\OrderAmendmentQuoteRequestValidatorPlugin;

class QuoteRequestDependencyProvider extends SprykerQuoteRequestDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\QuoteRequestExtension\Dependency\Plugin\QuoteRequestValidatorPluginInterface>
     */
    protected function getQuoteRequestValidatorPlugins(): array
    {
        return [
            new OrderAmendmentQuoteRequestValidatorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\QuoteRequestExtension\Dependency\Plugin\QuoteRequestUserValidatorPluginInterface>
     */
    protected function getQuoteRequestUserValidatorPlugins(): array
    {
        return [
            new OrderAmendmentQuoteRequestUserValidatorPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CartReorder/CartReorderDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartReorder;

use Spryker\Zed\CartReorder\CartReorderDependencyProvider as SprykerCartReorderDependencyProvider;
use Spryker\Zed\ProductBundle\Communication\Plugin\CartReorder\OriginalOrderBundleItemCartPreReorderPlugin;
use Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\CartReorder\RemoveInactiveProductOptionItemsCartReorderPreAddToCartPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\OriginalSalesOrderItemCartPreReorderPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\QuoteRequestVersionCartReorderValidatorPlugin;

class CartReorderDependencyProvider extends SprykerCartReorderDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderValidatorPluginInterface>
     */
    protected function getCartReorderValidatorPluginsForOrderAmendment(): array
    {
        return [
            new OriginalSalesOrderItemCartPreReorderPlugin(),
            new QuoteRequestVersionCartReorderValidatorPlugin(),
        ];
    }
    
    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderPreAddToCartPluginInterface>
     */
    protected function getCartReorderPreAddToCartPluginsForOrderAmendment(): array
    {
        return [
            new RemoveInactiveProductOptionItemsCartReorderPreAddToCartPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify that reordering is disabled for orders created from a quote request:

1. Create a request for quote.
2. As an agent, approve the quote request.
3. Place an order that was converted from the request.
4. Try to reorder the order.
 Make sure the error message is displayed: `You cannot reorder this order because it is in the amendment process.`.

{% endinfo_block %}

## Enable order editing by company users

Take the steps in the following sections to enable order editing by company users.

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/company-business-unit-sales-connector: "^1.3.0" spryker/company-sales-connector: "^1.3.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                            | EXPECTED DIRECTORY                                   |
|-----------------------------------|------------------------------------------------------|
| CompanyBusinessUnitSalesConnector | vendor/spryker/company-business-unit-sales-connector |
| CompanySalesConnector             | vendor/spryker/company-sales-connector               |

{% endinfo_block %}

### 2) Add translations

1. Append glossary according to your configuration:


<details><summary>src/data/import/glossary.csv</summary>

```yaml
permission.name.EditCompanyOrdersPermissionPlugin,Edit Company orders,en_US
permission.name.EditCompanyOrdersPermissionPlugin,Edit Company orders,de_DE
permission.name.EditBusinessUnitOrdersPermissionPlugin,Edit Business unit orders,en_US
permission.name.EditBusinessUnitOrdersPermissionPlugin,Edit Business unit orders,de_DE
```

</details>


2. Import data:

```bash
console data:import glossary
```

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                  | SPECIFICATION                                                                                                                             | PREREQUISITES | NAMESPACE                                                                      |
|---------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------|
| EditCompanyOrdersPermissionPlugin                       | Adds permission for company users to edit orders from the same company in the Client layer.                                               |               | Spryker\Client\CompanySalesConnector\Plugin\Permission                         |
| EditCompanyOrdersPermissionPlugin                       | Adds permission for company users to edit orders from the same company in the Zed layer.                                                  |               | Spryker\Zed\CompanySalesConnector\Communication\Plugin\Permission              |
| EditBusinessUnitOrdersPermissionPlugin                  | Adds permission for company users to edit orders from the same business unit in the Client layer.                                         |               | Spryker\Client\CompanyBusinessUnitSalesConnector\Plugin\Permission             |
| EditBusinessUnitOrdersPermissionPlugin                  | Adds permission for company users to edit orders from the same business unit in the Zed layer.                                            |               | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Permission  |
| EditCompanyOrderCartReorderOrderProviderPlugin          | Provides an order if `CartReorderRequestTransfer.companyUserTransfer` has permission to edit company orders.                              |               | Spryker\Zed\CompanySalesConnector\Communication\Plugin\CartReorder             |
| EditBusinessUnitOrderCartReorderOrderProviderPlugin     | Provides an order if `CartReorderRequestTransfer.companyUserTransfer` has permission to edit business unit orders.                        |               | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\CartReorder |
| EditCompanyOrderQuoteExpanderCheckoutPreSavePlugin      | Expands `QuoteTransfer` with original order if `QuoteTransfer.customer.companyUserTransfer` has permission to edit company orders.        |               | Spryker\Zed\CompanySalesConnector\Communication\Plugin\Checkout                |
| EditBusinessUnitOrderQuoteExpanderCheckoutPreSavePlugin | Expands `QuoteTransfer` with original order if `QuoteTransfer.customer.companyUserTransfer` has permission to edit  business unit orders. |               | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Checkout    |

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\CompanyBusinessUnitSalesConnector\Plugin\Permission\EditBusinessUnitOrdersPermissionPlugin;
use Spryker\Client\CompanySalesConnector\Plugin\Permission\EditCompanyOrdersPermissionPlugin;
use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
	/**
	 * @return list<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
	 */
	protected function getPermissionPlugins(): array
	{
		return [
			new EditCompanyOrdersPermissionPlugin(),
			new EditBusinessUnitOrdersPermissionPlugin(),
		];
	}
}
```

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Permission\EditBusinessUnitOrdersPermissionPlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Permission\EditCompanyOrdersPermissionPlugin;
use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
	/**
	 * @return list<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
	 */
	protected function getPermissionPlugins(): array
	{
		return [
			new EditCompanyOrdersPermissionPlugin(),
			new EditBusinessUnitOrdersPermissionPlugin(),
		];
	}
}
```

3. Execute console command:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

1. Log in as a company admin.
2. Go to `https://www.mysprykershop.com/en/company/company-role`.
3. Click **Edit** next to a role.
   Make sure you can assign the **Edit Company orders** and **Edit Business unit orders** permissions.

{% endinfo_block %}

**src/Pyz/Zed/CartReorder/CartReorderDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartReorder;

use Spryker\Zed\CartReorder\CartReorderDependencyProvider as SprykerCartReorderDependencyProvider;
use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\CartReorder\EditBusinessUnitOrderCartReorderOrderProviderPlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\CartReorder\EditCompanyOrderCartReorderOrderProviderPlugin;

class CartReorderDependencyProvider extends SprykerCartReorderDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderOrderProviderPluginInterface>
     */
    protected function getCartReorderOrderProviderPlugins(): array
    {
        return [
            new EditCompanyOrderCartReorderOrderProviderPlugin(),
            new EditBusinessUnitOrderCartReorderOrderProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/CartReorderRestApi/CartReorderRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CartReorderRestApi;

use Spryker\Glue\CartReorderRestApi\CartReorderRestApiDependencyProvider as SprykerCartReorderRestApiDependencyProvider;
use Spryker\Glue\CompaniesRestApi\Plugin\CartReorderRestApi\CompanyUserCompanyCartReorderRequestExpanderPlugin;
use Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\CartReorderRestApi\CompanyUserCompanyBusinessUnitCartReorderRequestExpanderPlugin;

class CartReorderRestApiDependencyProvider extends SprykerCartReorderRestApiDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\CartReorderRestApiExtension\Dependency\Plugin\CartReorderRequestExpanderPluginInterface>
     */
    protected function getCartReorderRequestExpanderPlugins(): array
    {
        return [
            new CompanyUserCompanyCartReorderRequestExpanderPlugin(),
            new CompanyUserCompanyBusinessUnitCartReorderRequestExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Checkout\EditBusinessUnitOrderQuoteExpanderCheckoutPreSavePlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Checkout\EditCompanyOrderQuoteExpanderCheckoutPreSavePlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreSavePluginInterface>
     */
    protected function getCheckoutPreSaveHooksForOrderAmendment(Container $container): array
    {
        return [
            new EditCompanyOrderQuoteExpanderCheckoutPreSavePlugin(),
            new EditBusinessUnitOrderQuoteExpanderCheckoutPreSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Place an order as a company user.
2. Login as a different company user from the same company and business unit.
2. Go to `https://www.mysprykershop.com/en/company/company-role`.
2. Click **Edit** next to a role for your user.
3. Assign the **Edit Company orders**, **Edit Business unit orders**, **View Company orders** and **View Business Unit orders** permission to the role.
4. Re-login as the same user.
5. Go to `https://www.mysprykershop.com/en/customer/order` and select **Company orders**.
6. Make sure that after clicking the **edit order** button for an order from the same company or business unit the order amendment for the order has been started.
7. Proceed with the order amendment and place the order, make sure the order has been placed successfully.

{% endinfo_block %}

## Optionally: Enable order amendment in asynchronous mode

Order amendment can be enabled in asynchronous mode to improve performance by offloading the most resource-intensive operations to the OMS.

### 1) Install the required modules

Some of the Async Order Amendment functionality is provided by an example module. You can install it to see how it works in practice and replace it with your own implementation if needed.

Install the OrderAmendmentExample module using Composer:

```bash
composer require spryker/order-amendment-example: "^0.3.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                     |
|-----------------------|----------------------------------------|
| OrderAmendmentExample | vendor/spryker/order-amendment-example |

{% endinfo_block %}

### 2) Set up configuration

1. Add the following configuration:

```php
<?php

namespace Pyz\Zed\SalesOrderAmendment;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\SalesOrderAmendment\SalesOrderAmendmentConfig as SprykerSalesOrderAmendmentConfig;

class SalesOrderAmendmentConfig extends SprykerSalesOrderAmendmentConfig
{
    /**
     * @return array<string>
     */
    public function getQuoteFieldsAllowedForSaving(): array
    {
        return array_merge(parent::getQuoteFieldsAllowedForSaving(), [
            QuoteTransfer::CUSTOMER,
            QuoteTransfer::CUSTOMER_REFERENCE,
            QuoteTransfer::STORE,
            QuoteTransfer::PAYMENT,
            QuoteTransfer::PAYMENTS,
            QuoteTransfer::BILLING_ADDRESS,
            QuoteTransfer::SHIPPING_ADDRESS,
            QuoteTransfer::ORDER_CUSTOM_REFERENCE,
            QuoteTransfer::SHIPMENT,
            QuoteTransfer::ERRORS,
        ]);
    }
}
```

2. Remove the quote fields that are not relevant for your project.

{% info_block warningBox "Verification" %}

Make sure `SalesOrderAmendmentQuoteCheckoutDoSaveOrderPlugin` saves the specified fields to `spy_sales_order_amendment_quote`.

{% endinfo_block %}

#### Configure OMS

1. Create the async Order amendment OMS subprocess file using the example:

<details>
    <summary>config/Zed/oms/DummySubprocess/DummyOrderAmendmentAsync01.xml</summary>

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="DummyOrderAmendmentAsync">
        <states>
            <state name="order amendment draft pending" reserved="true" display="oms.state.order-amendment-draft-pending">
                <flag>amendment in progress</flag>
            </state>

            <state name="order amendment draft" reserved="true" display="oms.state.order-amendment-draft">
                <flag>amendment in progress</flag>
            </state>

            <state name="order amendment draft applied" reserved="true" display="oms.state.order-amendment-draft-applied">
                <flag>amendment in progress</flag>
            </state>

            <state name="draft apply succeeded" reserved="true" display="oms.state.draft-apply-succeeded">
                <flag>amendment in progress</flag>
            </state>

            <state name="draft apply failed" reserved="true" display="oms.state.draft-apply-failed">
                <flag>amendment in progress</flag>
            </state>
        </states>

        <transitions>

            <transition happy="true">
                <source>order amendment draft pending</source>
                <target>order amendment draft</target>
            </transition>

            <transition happy="true">
                <source>order amendment draft</source>
                <target>order amendment draft applied</target>
                <event>apply-order-amendment-draft</event>
            </transition>

            <transition happy="true" condition="DummyOrderAmendmentAsync/IsSuccessfullyApplied">
                <source>order amendment draft applied</source>
                <target>draft apply succeeded</target>
            </transition>

            <transition happy="true">
                <source>order amendment draft applied</source>
                <target>draft apply failed</target>
            </transition>

            <transition happy="true">
                <source>draft apply succeeded</source>
                <target>grace period pending</target>
                <event>notify-order-amendment-applied</event>
            </transition>

            <transition happy="true">
                <source>draft apply failed</source>
                <target>grace period pending</target>
                <event>notify-order-amendment-failed</event>
            </transition>

            <transition>
                <source>order amendment</source>
                <target>order amendment draft pending</target>
                <event>start-order-amendment-draft</event>
            </transition>

        </transitions>

        <events>
            <event name="start-order-amendment-draft"/>
            <event name="apply-order-amendment-draft" command="OrderAmendmentAsync/ApplyOrderAmendmentDraft" onEnter="true"/>
            <event name="notify-order-amendment-applied" command="OrderAmendmentAsync/NotifyOrderAmendmentApplied" onEnter="true"/>
            <event name="notify-order-amendment-failed" command="OrderAmendmentAsync/NotifyOrderAmendmentFailed" onEnter="true"/>
        </events>
    </process>

</statemachine>
```

</details>

2. Adjust your OMS state machine configuration according to your project's requirements.

<details><summary>config/Zed/oms/DummyPayment01.xml</summary>

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="DummyPayment01" main="true">
        <subprocesses>
            <process>DummyOrderAmendmentAsync</process>
        </subprocesses>

    </process>

    <process name="DummyOrderAmendmentAsync" file="DummySubprocess/DummyOrderAmendmentAsync01.xml"/>

</statemachine>
```

</details>

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Administration&nbsp;<span aria-label="and then">></span> OMS**.

2. Select **DummyPayment01 [preview-version]** and make sure the `order amendment draft pending` state exists.

{% endinfo_block %}

### 3) Add translations

1. Append glossary according to your configuration:


<details><summary>src/data/import/glossary.csv</summary>

```yaml
sales_order_amendment_oms.mail.order_amendment_applied.subject,Your order has been successfully updated,en_US
sales_order_amendment_oms.mail.order_amendment_applied.subject,Ihre Bestellung wurde erfolgreich aktualisiert,de_DE
sales_order_amendment_oms.mail.order_amendment_applied.salutation,Hello,en_US
sales_order_amendment_oms.mail.order_amendment_applied.salutation,Hallo,de_DE
sales_order_amendment_oms.mail.order_amendment_applied.title,Your order has been successfully updated,en_US
sales_order_amendment_oms.mail.order_amendment_applied.title,Ihre Bestellung wurde erfolgreich aktualisiert,de_DE
sales_order_amendment_oms.mail.order_amendment_applied.text.line_1,Thank you for shopping at Spryker Shop!,en_US
sales_order_amendment_oms.mail.order_amendment_applied.text.line_1,Danke für deine Bestellung beim Spryker Shop!,de_DE
sales_order_amendment_oms.mail.order_amendment_applied.text.line_2,We are writing to let you know that your order has been successfully updated as requested. You will receive a shipping confirmation by e-mail as soon as your updated order has been sent.,en_US
sales_order_amendment_oms.mail.order_amendment_applied.text.line_2,"Wir möchten Sie darüber informieren, dass Ihre Bestellung wie gewünscht erfolgreich aktualisiert wurde. Sobald Ihre aktualisierte Bestellung versendet wurde, erhalten Sie eine Versandbestätigung per E-Mail.",de_DE
sales_order_amendment_oms.mail.order_amendment_applied.text.line_3,"If you change your mind, you can return the items within 14 days after delivery. We hope you enjoy your purchase!",en_US
sales_order_amendment_oms.mail.order_amendment_applied.text.line_3,"Falls Sie es sich anders überlegen, können Sie die Artikel innerhalb von 14 Tagen nach Lieferung zurücksenden. Wir wünschen Ihnen viel Freude mit Ihrem Einkauf!",de_DE
sales_order_amendment_oms.mail.order_amendment_failed.subject,Order edit could not be saved,en_US
sales_order_amendment_oms.mail.order_amendment_failed.subject,Bestelländerung konnte nicht gespeichert werden,de_DE
sales_order_amendment_oms.mail.order_amendment_failed.salutation,Hello,en_US
sales_order_amendment_oms.mail.order_amendment_failed.salutation,Hallo,de_DE
sales_order_amendment_oms.mail.order_amendment_failed.title,Order edit could not be saved,en_US
sales_order_amendment_oms.mail.order_amendment_failed.title,Bestelländerung konnte nicht gespeichert werden,de_DE
sales_order_amendment_oms.mail.order_amendment_failed.text.line_1,Thank you for shopping at Spryker Shop!,en_US
sales_order_amendment_oms.mail.order_amendment_failed.text.line_1,Danke für deine Bestellung beim Spryker Shop!,de_DE
sales_order_amendment_oms.mail.order_amendment_failed.text.line_2,"We are writing to let you know that we tried to update your order as requested. Unfortunately, the changes could not be saved due to the following error:",en_US
sales_order_amendment_oms.mail.order_amendment_failed.text.line_2,"Wir möchten Sie darüber informieren, dass wir versucht haben, Ihre Bestellung wie gewünscht zu aktualisieren. Leider konnten die Änderungen aufgrund des folgenden Fehlers nicht gespeichert werden:",de_DE
sales_order_amendment_oms.mail.order_amendment_failed.text.line_3,"Your original order remains unchanged. If you need help or would like to try again, please contact our customer service team. We’re happy to assist you.",en_US
sales_order_amendment_oms.mail.order_amendment_failed.text.line_3,"Ihre ursprüngliche Bestellung bleibt unverändert. Wenn Sie Hilfe benötigen oder es erneut versuchen möchten, wenden Sie sich bitte an unser Kundenservice — wir helfen Ihnen gerne weiter.",de_DE
sales_order_amendment_oms.mail.footer.text.line_1,Viele Grüße,de_DE
sales_order_amendment_oms.mail.footer.text.line_1,Have a great day!,en_US
sales_order_amendment_oms.mail.footer.text.line_2,Dein Spryker Shop,de_DE
sales_order_amendment_oms.mail.footer.text.line_2,Your Spryker Shop,en_US
sales_order_amendment_oms.error.apply_order_amendment_draft_failed,We could not process your order edit.,en_US
sales_order_amendment_oms.error.apply_order_amendment_draft_failed,Ihre Bestelländerung konnte nicht bearbeitet werden.,de_DE
oms.state.order-amendment-draft-pending,Editing in Progress,en_US
oms.state.order-amendment-draft-pending,Bestelländerung in Bearbeitung,de_DE
oms.state.order-amendment-draft-applied,Editing in Progress,en_US
oms.state.order-amendment-draft-applied,Bestelländerung in Bearbeitung,de_DE
```

</details>


2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                  | SPECIFICATION                                                                                                                                        | PREREQUISITES | NAMESPACE                                                        |
|---------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------|
| QuoteToSaveOrderMapperCheckoutDoSaveOrderPlugin         | Maps an original order from `QuoteTransfer.originalOrder` to `SaveOrderTransfer`.                                                                   |               | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout    |
| StartOrderAmendmentDraftCheckoutPostSavePlugin          | Triggers the OMS event to start the order amendment draft.                                                                                               |               | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Checkout |
| NotifyOrderAmendmentAppliedMailTypeBuilderPlugin        | Builds `MailTransfer` with data for the `notify order amendment applied` email.                                                                       |               | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Mail     |
| NotifyOrderAmendmentFailedMailTypeBuilderPlugin         | Builds `MailTransfer` with data for the `notify order amendment failed` email.                                                                        |               | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Mail     |
| ApplyOrderAmendmentDraftCommandByOrderPlugin            | Places an order with a found sales order amendment quote and quote process flow set to `order-amendment`.                                             |               | Spryker\Zed\OrderAmendmentExample\Communication\Plugin\Oms       |
| NotifyOrderAmendmentAppliedCommandPlugin                | When a sales order amendment quote is found, sends an email notification about successfully applying order amendment.                        |               | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Oms      |
| NotifyOrderAmendmentFailedCommandPlugin                 | If a sales order amendment quote is found, sends an email notification about failing order amendment.                                           |               | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Oms      |
| IsOrderAmendmentDraftSuccessfullyAppliedConditionPlugin | Returns `true` if the sales order amendment quote is not found; otherwise returns `false`.                                                           |               | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Oms      |
| ShipmentGroupsSalesOrderAmendmentQuoteExpanderPlugin    | Expands each `SalesOrderAmendmentQuoteTransfer` in `SalesOrderAmendmentQuoteCollectionTransfer.salesOrderAmendmentQuotes` with shipment groups data. |               | Spryker\Zed\Shipment\Communication\Plugin\SalesOrderAmendment    |

<details>
  <summary>src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout\QuoteToSaveOrderMapperCheckoutDoSaveOrderPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout\SalesOrderAmendmentQuoteCheckoutDoSaveOrderPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Checkout\StartOrderAmendmentDraftCheckoutPostSavePlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface|\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface>
     */
    protected function getCheckoutOrderSaversForOrderAmendmentAsync(Container $container): array // phpcs:ignore SlevomatCodingStandard.Functions.UnusedParameter
    {
        return [
            new QuoteToSaveOrderMapperCheckoutDoSaveOrderPlugin(), #Order Amendment Feature
            new SalesOrderAmendmentQuoteCheckoutDoSaveOrderPlugin(), #Order Amendment Feature
        ];
    }
    
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface>
     */
    protected function getCheckoutPostHooksForOrderAmendmentAsync(Container $container): array // phpcs:ignore SlevomatCodingStandard.Functions.UnusedParameter
    {
        return [
            new StartOrderAmendmentDraftCheckoutPostSavePlugin(), #Order Amendment Feature
        ];
    }
}
```

</details>

<details>
  <summary>src/Pyz/Zed/Mail/MailDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Mail;

use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Mail\NotifyOrderAmendmentAppliedMailTypeBuilderPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Mail\NotifyOrderAmendmentFailedMailTypeBuilderPlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MailExtension\Dependency\Plugin\MailTypeBuilderPluginInterface>
     */
    protected function getMailTypeBuilderPlugins(): array
    {
        return [
            new NotifyOrderAmendmentAppliedMailTypeBuilderPlugin(),
            new NotifyOrderAmendmentFailedMailTypeBuilderPlugin(),
        ];
    }
}
```

</details>

<details>
  <summary>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\OrderAmendmentExample\Communication\Plugin\Oms\ApplyOrderAmendmentDraftCommandByOrderPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Oms\IsOrderAmendmentDraftSuccessfullyAppliedConditionPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Oms\NotifyOrderAmendmentAppliedCommandPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Oms\NotifyOrderAmendmentFailedCommandPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new ApplyOrderAmendmentDraftCommandByOrderPlugin(), 'OrderAmendmentAsync/ApplyOrderAmendmentDraft');
            $commandCollection->add(new NotifyOrderAmendmentAppliedCommandPlugin(), 'OrderAmendmentAsync/NotifyOrderAmendmentApplied');
            $commandCollection->add(new NotifyOrderAmendmentFailedCommandPlugin(), 'OrderAmendmentAsync/NotifyOrderAmendmentFailed');

            return $commandCollection;
        });

        return $container;
    }
    
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container): Container // phpcs:ignore SlevomatCodingStandard.Functions.UnusedParameter
    {
        $container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            $conditionCollection
                ->add(new IsOrderAmendmentDraftSuccessfullyAppliedConditionPlugin(), 'DummyOrderAmendmentAsync/IsSuccessfullyApplied');

            return $conditionCollection;
        });
}
```

</details>

<details>
  <summary>src/Pyz/Zed/SalesOrderAmendment/SalesOrderAmendmentDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\SalesOrderAmendment;

use Spryker\Zed\SalesOrderAmendment\SalesOrderAmendmentDependencyProvider as SprykerSalesOrderAmendmentDependencyProvider;
use Spryker\Zed\Shipment\Communication\Plugin\SalesOrderAmendment\ShipmentGroupsSalesOrderAmendmentQuoteExpanderPlugin;

class SalesOrderAmendmentDependencyProvider extends SprykerSalesOrderAmendmentDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesOrderAmendmentExtension\Dependency\Plugin\SalesOrderAmendmentQuoteExpanderPluginInterface>
     */
    protected function getSalesOrderAmendmentQuoteExpanderPlugins(): array
    {
        return [
            new ShipmentGroupsSalesOrderAmendmentQuoteExpanderPlugin(),
        ];
    }
}
```

</details>


### Enable asynchronous order amendment

You can set up asynchronous order amendment in two ways:

1. Conditionally: The standard order amendment flow starts first, then switches to the asynchronous flow based on specific conditions.
2. Unconditionally: The asynchronous flow runs from the start.

Follow the instructions in the following sections according to how you want to set it up.

#### Option 1: Enable async order amendment conditionally

The Example module lets you enable the asynchronous order amendment flow based on the selected payment method. To configure this behavior, follow the steps:

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                                | SPECIFICATION                                                                                                    | PREREQUISITES | NAMESPACE                                                       |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------|
| PaymentToAsyncOrderAmendmentFlowCheckoutPreSavePlugin | Sets `QuoteTransfer.quoteProcessFlow` to a new `QuoteProcessFlowTransfer` with the `order-amendment-async` name. |               | Spryker\Zed\OrderAmendmentExample\Communication\Plugin\Checkout |

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\OrderAmendmentExample\Communication\Plugin\Checkout\PaymentToAsyncOrderAmendmentFlowCheckoutPreSavePlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveHookInterface|\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveInterface|\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreSavePluginInterface>
     */
    protected function getCheckoutPreSaveHooksForOrderAmendment(Container $container): array
    {
        return [
            new PaymentToAsyncOrderAmendmentFlowCheckoutPreSavePlugin(),
        ];
    }
}
```


2. Specify the payment methods to enable the asynchronous order amendment checkout process flow for:

**src/Pyz/Zed/OrderAmendmentExample/OrderAmendmentExampleConfig.php**

```php
<?php

namespace Pyz\Yves\SalesOrderAmendmentWidget;

use Spryker\Zed\OrderAmendmentExample\OrderAmendmentExampleConfig as SprykerOrderAmendmentExampleConfig;

class OrderAmendmentExampleConfig extends SprykerOrderAmendmentExampleConfig
{
    /**
     * @var list<string>
     */
    protected const ASYNC_ORDER_AMENDMENT_PAYMENT_METHOD_NAMES = [
        'dummyPaymentInvoice',
    ];
}
```

#### Option 2: Enable async order amendment unconditionally

1. Specify the order amendment quote process flow:

**src/Pyz/Zed/SalesOrderAmendment/SalesOrderAmendmentConfig.php**

```php
<?php

namespace Pyz\Zed\SalesOrderAmendment;

use Generated\Shared\Transfer\QuoteProcessFlowTransfer;
use Spryker\Zed\SalesOrderAmendment\SalesOrderAmendmentConfig as SprykerSalesOrderAmendmentConfig;

class SalesOrderAmendmentConfig extends SprykerSalesOrderAmendmentConfig
{
    /**
     * Specification:
     * - Returns the default order amendment quote process flow.
     *
     * @api
     *
     * @return \Generated\Shared\Transfer\QuoteProcessFlowTransfer
     */
    public function getDefaultOrderAmendmentQuoteProcessFlow(): QuoteProcessFlowTransfer
    {
        return (new QuoteProcessFlowTransfer())->setName(SalesOrderAmendmentExtensionContextsInterface::CONTEXT_ORDER_AMENDMENT_ASYNC);
    }
}
```

2. Enable plugins for the asynchronous order amendment checkout process flow:

Make sure all the needed plugins registered for the `order-amendment` checkout process flow are also registered for the `order-amendment-async` checkout process flow.

Replace dependency provider methods postfixed with `ForOrderAmendment` with `ForOrderAmendmentAsync` methods in the following modules:
- `Cart`
- `CartReorder`
- `Checkout`
- `CheckoutRestApi`
- `Sales`


{% info_block warningBox "Verification" %}

1. Place an order.
2. Initiate and finish order amendment. Make sure the following applies:
- The order doesn't show the changes you've submitted.
- The quote has been saved to the `spy_sales_order_amendment_quote` table.
- The order items are in the `order amendment draft pending` state.
3. Execute `console oms:check-condition` command.
- Make sure the order items are in the `order amendment draft applied` state.
- Make sure the changes made in the order have been applied to the order.
- Make sure an email notification about order amendment has been sent.

{% endinfo_block %}

#### Optional: Project level customizations

- Display errors: Display errors appearing during the `ApplyOrderAmendmentDraftCommandByOrderPlugin` execution. If any errors occur, `ApplyOrderAmendmentDraftCommandByOrderPlugin` saves them to `spy_sales_order_amendment_quote` table to the `quote_data` with the other Quote data. You can obtain them from the Quote and display in the frontend.
- Customize email templates: Customize email templates for the order amendment applied and failed notifications by redefining Twig templates:
  - `notify-order-amendment-applied.html.twig`
  - `notify-order-amendment-applied.text.twig`
  - `notify-order-amendment-failed.html.twig`
  - `notify-order-amendment-failed.text.twig`
- Customize the OMS process: you can customize you OMS processes to add more states and transitions, for example, to add a state and transition to implement the retry logic for the order amendment draft applying in case of errors.

## Install feature frontend

Take the following steps to install the feature frontend.

### Prerequisites

Install the following required features:

| NAME             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                      |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core     | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                             |
| Order Management | 202507.0 | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/order-amendment: "202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                        | EXPECTED DIRECTORY                               |
|-------------------------------|--------------------------------------------------|
| SalesOrderAmendmentWidget     | vendor/spryker-shop/sales-order-amendment-widget |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration:

| CONFIGURATION                                                            | SPECIFICATION                                                                                                                                                                          | NAMESPACE                          |
|--------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| SalesOrderAmendmentWidgetConfig::ORDER_AMENDMENT_CART_REORDER_STRATEGY   | Defines the cart reorder strategy for order amendment, for example `replace`, `new`. The corresponding strategy plugin handling the specified value must be registered in the project. | Pyz\Yves\SalesOrderAmendmentWidget |
| SalesOrderAmendmentWidgetConfig::IS_ORDER_AMENDMENT_CONFIRMATION_ENABLED | Defines if the order amendment confirmation popup window is displayed.                                                                                                                 | Pyz\Yves\SalesOrderAmendmentWidget |

**src/Pyz/Yves/SalesOrderAmendmentWidget/SalesOrderAmendmentWidgetConfig.php**

```php
<?php

namespace Pyz\Yves\SalesOrderAmendmentWidget;

use SprykerShop\Yves\SalesOrderAmendmentWidget\SalesOrderAmendmentWidgetConfig as SprykerSalesOrderAmendmentWidgetConfig;

class SalesOrderAmendmentWidgetConfig extends SprykerSalesOrderAmendmentWidgetConfig
{
    /**
     * @var string|null
     */
    protected const ORDER_AMENDMENT_CART_REORDER_STRATEGY = 'replace';
    
    /**
     * @var bool
     */
    protected const IS_ORDER_AMENDMENT_CONFIRMATION_ENABLED = true;
}
```

### 3) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
sales_order_amendment_widget.edit_order,Edit Order,en_US
sales_order_amendment_widget.edit_order,Bestellung bearbeiten,de_DE
sales_order_amendment_widget.edit_order.cancel,Cancel,en_US
sales_order_amendment_widget.edit_order.cancel,Abbrechen,de_DE
sales_order_amendment_widget.edit_order.warning_message,"Editing this order will replace the items in your current cart with those from the order?",en_US
sales_order_amendment_widget.edit_order.warning_message,"Durch die Bearbeitung dieser Bestellung werden die Artikel in Ihrem aktuellen Warenkorb durch die Artikel der Bestellung ersetzt?",de_DE
sales_order_amendment_widget.cancel_order_amendment,Cancel Edit,en_US
sales_order_amendment_widget.cancel_order_amendment,Bearbeiten abbrechen,de_DE
sales_order_amendment_widget.amendment_cant_be_canceled,"This order amendment cannot be canceled.",en_US
sales_order_amendment_widget.amendment_cant_be_canceled,"Diese Bestelländerung kann nicht storniert werden. ",de_DE
sales_order_amendment_widget.amendment_canceled,"The order amendment has been successfully canceled.",en_US
sales_order_amendment_widget.amendment_canceled,"Die Bestelländerung wurde erfolgreich storniert.",de_DE
sales_order_amendment_widget.summary_step.update.order,Update order,en_US
sales_order_amendment_widget.summary_step.update.order,Bestellung aktualisieren,de_DE
sales_order_amendment_widget.success_step.update.success.title,Your order has been updated successfully!,en_US
sales_order_amendment_widget.success_step.update.success.title,Ihre Bestellung wurde erfolgreich aktualisiert!,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                       | SPECIFICATION                                                                                    | PREREQUISITES | NAMESPACE                                                |
|----------------------------------------------|--------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------|
| SalesOrderAmendmentWidgetRouteProviderPlugin | Expands the router collection with the `order-amendment` and `cancel-order-amendment` endpoints. |               | SprykerShop\Yves\SalesOrderAmendmentWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\SalesOrderAmendmentWidget\Plugin\Router\SalesOrderAmendmentWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new SalesOrderAmendmentWidgetRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure order amendment is available on order details and orders pages.

{% endinfo_block %}

### 5) Set up widgets

To enable widgets, register the following plugins:

| PLUGIN                                    | SPECIFICATION                                                       | PREREQUISITES | NAMESPACE                                         |
|-------------------------------------------|---------------------------------------------------------------------|---------------|---------------------------------------------------|
| OrderAmendmentWidget                      | Enables customers to edit existing orders.                          |               | SprykerShop\Yves\SalesOrderAmendmentWidget\Widget |
| CancelOrderAmendmentWidget                | Enables customers to cancel order amendment requests.               |               | SprykerShop\Yves\SalesOrderAmendmentWidget\Widget |
| OrderAmendmentItemLinkWidget              | Handles URL generation for deactivated products in order amendment. |               | SprykerShop\Yves\SalesOrderAmendmentWidget\Widget |
| UpdateOrderCheckoutSubmitButtonTextWidget | Displays the text for the submit order update button.               |               | SprykerShop\Yves\SalesOrderAmendmentWidget\Widget |
| UpdateOrderCheckoutSuccessTitleWidget     | Displays the title for the successful order update page.            |               | SprykerShop\Yves\SalesOrderAmendmentWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\SalesOrderAmendmentWidget\Widget\CancelOrderAmendmentWidget;
use SprykerShop\Yves\SalesOrderAmendmentWidget\Widget\OrderAmendmentItemLinkWidget;
use SprykerShop\Yves\SalesOrderAmendmentWidget\Widget\OrderAmendmentWidget;
use SprykerShop\Yves\SalesOrderAmendmentWidget\Widget\UpdateOrderCheckoutSubmitButtonTextWidget;
use SprykerShop\Yves\SalesOrderAmendmentWidget\Widget\UpdateOrderCheckoutSuccessTitleWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            OrderAmendmentWidget::class,
            CancelOrderAmendmentWidget::class,
            OrderAmendmentItemLinkWidget::class,
            UpdateOrderCheckoutSubmitButtonTextWidget::class,
            UpdateOrderCheckoutSuccessTitleWidget::class,
        ];
    }
}
```

{% info_block warningBox "Widgets in Twig" %}

If your project uses Twig templates, make sure the corresponding widgets are used in the redefined templates.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE                                    | TEST                                                                                                                                                                         |
|-------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OrderAmendmentWidget                      | Make sure the edit order button is displayed on the orders and order details pages.                                                                                              |
| CancelOrderAmendmentWidget                | Make sure the cancel order amendment button is displayed on the Cart page.                                                                                                   |
| OrderAmendmentItemLinkWidget              | Make sure that, on the Cart page, product URLs are not displayed for deactivated products.                                                                                      |
| UpdateOrderCheckoutSubmitButtonTextWidget | Make sure that, on the Checkout summary page, the submit button text is displayed as configured for the `sales_order_amendment_widget.summary_step.update.order` glossary key.   |
| UpdateOrderCheckoutSuccessTitleWidget     | Make sure that, on the Successful order update page, the title is displayed as configured for the `sales_order_amendment_widget.success_step.update.success.title` glossary key. |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

- Make sure that after clicking the edit order button the specified reorder strategy for order amendment is applied (the current cart items are replaced by the amended order items in case the `replace` strategy is applied, new cart is created in case the `new` strategy is applied).

- Ensure that clicking the "Edit Order" button applies the specified reorder strategy for order amendment:  
  - `replace` strategy: current cart items are replaced with amended order items
  - `new` strategy: a new cart is created
- If the `IS_ORDER_AMENDMENT_CONFIRMATION_ENABLED` configuration is set to `true`, make sure that the order amendment confirmation popup window is displayed.

{% endinfo_block %}


































