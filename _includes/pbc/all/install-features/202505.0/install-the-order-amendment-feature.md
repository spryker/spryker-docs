# Install the Order Amendment feature

This document describes how to install the Order Amendment feature.

## Install feature core

Follow the steps below to install the Order Amendment feature core.

When implementing the Order Amendment feature, be aware that some of the plugins mentioned in the documentation might
not be relevant to your project if you haven't installed certain optional features.
Only include the plugins for features that are installed in your project. The documentation provides a comprehensive
list to cover all possible integration scenarios.

### Prerequisites

Install the required features:

| NAME             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                      |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core     | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                             |
| Order Management | {{page.version}} | [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |
| Reorder          | {{page.version}} | [Install the Reorder feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-reorder-feature.html)                         |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/order-amendment: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following modules have been installed:

| MODULE                       | EXPECTED DIRECTORY                             |
|------------------------------|------------------------------------------------|
| SalesOrderAmendment          | vendor/spryker/sales-order-amendment           |
| SalesOrderAmendmentOms       | vendor/spryker/sales-order-amendment-oms       |
| SalesOrderAmendmentExtension | vendor/spryker/sales-order-amendment-extension |
| OrderAmendmentsRestApi       | vendor/spryker/sales-order-amendments-rest-api |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration to your project:

| CONFIGURATION                                                               | SPECIFICATION                                                                                                 | NAMESPACE                   |
|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|-----------------------------|
| A regular expression (See below in `config/Shared/config_default.php`)      | Used to close access for not logged in customers.                                                             | None                        |
| MultiCartConfig::getQuoteFieldsAllowedForCustomerQuoteCollectionInSession() | Used to configure the quote fields that are allowed for saving in quote collection in the customer's session. | Pyz\Client\MultiCart        |
| QuoteConfig::getQuoteFieldsAllowedForSaving()                               | Used to allow saving order amendment related fields of the quote to the database.                             | Pyz\Zed\Quote               |
| SalesOrderAmendmentConfig::getQuoteFieldsAllowedForSaving()                 | Used to allow saving quote related fields of the quote to the database.                                       | Pyz\Zed\SalesOrderAmendment |

**config/Shared/config_default.php**

```php
<?php

$config[CustomerConstants::CUSTOMER_SECURED_PATTERN] = '(^(/en|/de)?/order-amendment($|/))';
```

{% info_block warningBox "Verification" %}

Make sure that `mysprykershop.com/order-amendment` with a guest user redirects to login page.

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
        ]);
    }
}
```

{% info_block warningBox “Verification” %}

Make sure that when you edit order, JSON data in the database column `spy_quote.quote_data` of the corresponding quote
contains `amendmentOrderReference` and `quoteProcessFlow`.

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

Some quote fields could be not relevant for your project. You can remove them from the list.

{% info_block warningBox “Verification” %}

Table `spy_sales_order_amendment_quote` is not used yet and should be empty. This table could be used as a temporary storage for the quote
data during the order amendment process in order to allow async mode for the order amendment process.

{% endinfo_block %}

#### Configure OMS

1. Create the OMS sub-process file:

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
            <state name="order amendment" display="oms.state.order-amendment">
                <flag>amendment in progress</flag>
            </state>
        </states>

        <transitions>
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

Verify the order-amendment state machine configuration in the following step.

{% endinfo_block %}

2. Using the following process as an example, adjust your OMS state-machine configuration according to your project's
   requirements.

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
                <target>grace period started</target>
                <event>start grace period</event>
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

Ensure that you've configured OMS:

1. In the Back Office, go to **Administration&nbsp;<span aria-label="and then">></span> OMS**.

2. Select **DummyPayment01 [preview-version]** and check the following:

- The `grace period started` state keep the `amendable` tag inside.
- The `order amendment` state has been added.

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
oms.state.order-amendment,Editing in Progress,en_US
oms.state.order-amendment,Bestelländerung in Bearbeitung,de_DE
sales_order_amendment_oms.validation.order_not_being_amended,This order cannot be edited because the time limit for changes has expired.,en_US
sales_order_amendment_oms.validation.order_not_being_amended,"Eine Bearbeitung dieser Bestellung ist nicht möglich, da die Änderungsfrist abgelaufen ist.",de_DE
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

| PLUGIN                                                            | SPECIFICATION                                                                                                                                                                                           | PREREQUISITES                                                                                                                                    | NAMESPACE                                                                            |
|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| OrderAmendmentCartReorderValidatorPlugin                          | Validates if quote amendment order reference matches `CartReorderTransfer.order.orderReference`.                                                                                                        | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder                     |
| OrderAmendmentQuoteProcessFlowExpanderCartPreReorderPlugin        | Expands quote process flow with the quote process flow name.                                                                                                                                            | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder                     |
| StartOrderAmendmentCartReorderPostCreatePlugin                    | Triggers OMS event to start the order amendment process.                                                                                                                                                | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\CartReorder                  |
| IsAmendableOrderCartReorderValidatorRulePlugin                    | Validates if all order items are in order item state that has `amendable` flag.                                                                                                                         | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\CartReorder                  |
| AmendmentOrderReferenceCartPreReorderPlugin                       | Sets `CartReorderTransfer.quote.amendmentOrderReference` taken from `CartReorderRequestTransfer.orderReference`.                                                                                        | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder                     |
| AmendmentQuoteNameCartPreReorderPlugin                            | Updates `CartReorderTransfer.quote.name` with custom amendment quote name.                                                                                                                              | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder                     |
| OrderSalesOrderAmendmentValidatorRulePlugin                       | Validates if order with provided original/amended order reference exists.                                                                                                                               | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\SalesOrderAmendment          |
| CartNoteSalesOrderItemCollectorPlugin                             | Iterates over `SalesOrderAmendmentItemCollectionTransfer.itemsToSkip` and compares item's cart notes with the corresponding item's cart notes from `OrderTransfer.items`.                               | None                                                                                                                                             | Spryker\Zed\CartNote\Communication\Plugin\SalesOrderAmendment                        |
| ShipmentSalesOrderItemCollectorPlugin                             | Iterates over `SalesOrderAmendmentItemCollectionTransfer.itemsToSkip` and compares item's shipments with the corresponding item's shipments from `OrderTransfer.items`.                                 | None                                                                                                                                             | Spryker\Zed\Shipment\Communication\Plugin\SalesOrderAmendment                        |
| ConfigurableBundleNoteSalesOrderItemCollectorPlugin               | Iterates over `SalesOrderAmendmentItemCollectionTransfer.itemsToSkip` and compares item's configurable bundle notes with the corresponding item's configurable bundle notes from `OrderTransfer.items`. | None                                                                                                                                             | Spryker\Zed\ConfigurableBundleNote\Communication\Plugin\SalesOrderAmendment          |
| SalesProductConfigurationSalesOrderItemCollectorPlugin            | Iterates over `SalesOrderAmendmentItemCollectionTransfer.itemsToSkip` and compares item's configurations with the corresponding item's configurations from `OrderTransfer.items`.                       | None                                                                                                                                             | Spryker\Zed\SalesProductConfiguration\Communication\Plugin\SalesOrderAmendment       |
| SalesServicePointSalesOrderItemCollectorPlugin                    | Iterates over `SalesOrderAmendmentItemCollectionTransfer.itemsToSkip` and compares item's service points with the corresponding item's service points from `OrderTransfer.items`.                       | None                                                                                                                                             | Spryker\Zed\SalesServicePoint\Communication\Plugin\SalesOrderAmendment               |
| OrderAmendmentRestCartReorderAttributesMapperPlugin               | Maps 'isAmendment' property from `RestCartReorderRequestAttributesTransfer` to `CartReorderRequestTransfer`.                                                                                            | None                                                                                                                                             | Spryker\Glue\OrderAmendmentsRestApi\Plugin\CartReorderRestApi                        |
| OrderAmendmentRestCartAttributesMapperPlugin                      | Maps field `amendmentOrderReference` from `QuoteTransfer` to `RestCartsAttributesTransfer`.                                                                                                             | None                                                                                                                                             | Spryker\Glue\OrderAmendmentsRestApi\Plugin\CartsRestApi                              |
| OrderAmendmentCheckoutPreCheckPlugin                              | Validates if order is in a state that allows amendment.                                                                                                                                                 | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Checkout                     |
| CustomerOrderSavePlugin                                           | Saves customer info to sales related table.                                                                                                                                                             | None                                                                                                                                             | Spryker\Zed\Customer\Communication\Plugin\Checkout                                   |
| UpdateOrderByQuoteCheckoutDoSaveOrderPlugin                       | Updates order billing address with billing address data from quote.                                                                                                                                     | None                                                                                                                                             | Spryker\Zed\Sales\Communication\Plugin\Checkout                                      |
| OrderTotalsSaverPlugin                                            | Saves order totals.                                                                                                                                                                                     | None                                                                                                                                             | Spryker\Zed\Sales\Communication\Plugin\Checkout                                      |
| ReleaseUsedCodesCheckoutDoSaveOrderPlugin                         | Decreases the number of uses of each of found discount codes by 1.                                                                                                                                      | None                                                                                                                                             | Spryker\Zed\Discount\Communication\Plugin\Checkout                                   |
| ShipmentTypeCheckoutDoSaveOrderPlugin                             | Creates/updates sales shipment type entity.                                                                                                                                                             | None                                                                                                                                             | Spryker\Zed\SalesShipmentType\Communication\Plugin\Checkout                          |
| UpdateCartNoteCheckoutDoSaveOrderPlugin                           | Updates order's cart note with the cart note provided in `QuoteTransfer.cartNote`.                                                                                                                      | None                                                                                                                                             | Spryker\Zed\CartNote\Communication\Plugin\Checkout                                   |
| ReplaceSalesOrderDiscountsCheckoutDoSaveOrderPlugin               | Deletes sales discount and sales discount code entities related to provided sales order ID. Iterates over `orderItems`, `orderExpenses` and creates sales discount entities for each item.              | None                                                                                                                                             | Spryker\Zed\Discount\Communication\Plugin\Checkout                                   |
| ReplaceSalesOrderShipmentCheckoutDoSaveOrderPlugin                | Recreates new sales shipment expenses for each item level shipment.                                                                                                                                     | None                                                                                                                                             | Spryker\Zed\Shipment\Communication\Plugin\Checkout                                   |
| SalesOrderAmendmentItemsCheckoutDoSaveOrderPlugin                 | Replaces order item during amendment process.                                                                                                                                                           | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout                        |
| ProductBundleOrderSaverPlugin                                     | Saves order bundle items.                                                                                                                                                                               | None                                                                                                                                             | Spryker\Zed\ProductBundle\Communication\Plugin\Checkout                              |
| ReplaceSalesOrderPaymentCheckoutDoSaveOrderPlugin                 | Saves order payments from `QuoteTransfer`.                                                                                                                                                              | None                                                                                                                                             | Spryker\Zed\SalesPayment\Communication\Plugin\Checkout                               |
| GiftCardPaymentCheckoutDoSaveOrderPlugin                          | Iterates over `QuoteTransfer.payments` and saves gift card related payments into the `spy_payment_gift_card` DB table.                                                                                  | None                                                                                                                                             | Spryker\Zed\GiftCard\Communication\Plugin\Checkout                                   |
| ReplaceSalesOrderThresholdExpensesCheckoutDoSaveOrderPlugin       | Iterates over `QuoteTransfer.expenses` and stores expenses of the type defined by {@link \Spryker\Shared\SalesOrderThreshold\SalesOrderThresholdConfig::THRESHOLD_EXPENSE_TYPE} in the database.        | None                                                                                                                                             | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout                        |
| FinishOrderAmendmentCheckoutPostSavePlugin                        | Triggers OMS event defined in {@link \Spryker\Zed\SalesOrderAmendmentOms\SalesOrderAmendmentOmsConfig::getFinishOrderAmendmentEvent()} to finish the order amendment process.                           | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Checkout                     |
| DummyPaymentCheckoutPostSavePlugin                                | If QuoteTransfer.billingAddress.lastName is 'Invalid' the plugin adds the error into CheckoutResponseTransfer.                                                                                          | None                                                                                                                                             | Spryker\Zed\DummyPayment\Communication\Plugin\Checkout                               |
| CloseQuoteRequestCheckoutPostSaveHookPlugin                       | If quote contains quote request version reference - marks quote request as closed.                                                                                                                      | None                                                                                                                                             | Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout                               |
| SendEmailToGiftCardUser                                           | Sends an email to a Gift Card user.                                                                                                                                                                     | None                                                                                                                                             | Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Checkout                      |
| PaymentAuthorizationCheckoutPostSavePlugin                        | Checks whether a payment method that requires authorization is selected for the given order.                                                                                                            | None                                                                                                                                             | Spryker\Zed\Payment\Communication\Plugin\Checkout                                    |
| PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin               | Send a request to the used PSP App to confirm the pre-order payment.                                                                                                                                    | None                                                                                                                                             | Spryker\Zed\Payment\Communication\Plugin\Checkout                                    |
| DisallowQuoteCheckoutPreSavePlugin                                | Disallows quote checkout for the configured amount of seconds.                                                                                                                                          | None                                                                                                                                             | Spryker\Zed\QuoteCheckoutConnector\Communication\Plugin\Checkout                     |
| SalesOrderExpanderPlugin                                          | Transforms provided cart items according configured cart item transformer strategies.                                                                                                                   | None                                                                                                                                             | Spryker\Zed\Sales\Communication\Plugin\Checkout                                      |
| OriginalOrderQuoteExpanderCheckoutPreSavePlugin                   | Sets `QuoteTransfer.originalOrder` with found order entity.                                                                                                                                             | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout                        |
| ResetQuoteNameQuoteBeforeSavePlugin                               | Sets `QuoteTransfer.name` to null if quote has no items and `QuoteTransfer.amendmentOrderReference` is set.                                                                                             | Should be executed before {@link \Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Quote\ResetAmendmentOrderReferenceBeforeQuoteSavePlugin}. | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Quote                           |
| CancelOrderAmendmentBeforeQuoteSavePlugin                         | Triggers OMS event defined in {@link \Spryker\Zed\SalesOrderAmendmentOms\SalesOrderAmendmentOmsConfig::getCancelOrderAmendmentEvent()} to cancel the order amendment process.                           | Should be executed before {@link \Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Quote\ResetAmendmentOrderReferenceBeforeQuoteSavePlugin}. | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Quote                        |
| ResetAmendmentOrderReferenceBeforeQuoteSavePlugin                 | Sets `QuoteTransfer.amendmentOrderReference` to null if `QuoteTransfer.amendmentOrderReference` is not null.                                                                                            | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Quote                           |
| CancelOrderAmendmentQuoteDeleteAfterPlugin                        | Triggers OMS event defined in {@link \Spryker\Zed\SalesOrderAmendmentOms\SalesOrderAmendmentOmsConfig::getCancelOrderAmendmentEvent()} to cancel the order amendment process.                           | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Quote                        |
| SalesOrderAmendmentOrderExpanderPlugin                            | Expands `OrderTransfer.salesOrderAmendment` with found sales order amendment.                                                                                                                           | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Sales                           | 
| IsAmendableOrderExpanderPlugin                                    | Checks if all order items are in order item state that has a flag defined in {@link \Spryker\Zed\SalesOrderAmendmentOms\SalesOrderAmendmentOmsConfig::getAmendableOmsFlag()}.                           | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Sales                        | 
| CreateSalesOrderAmendmentOrderPostSavePlugin                      | Persists sales order amendment entity.                                                                                                                                                                  | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Sales                           |
| IsAmendableOrderSearchOrderExpanderPlugin                         | Expands the `OrderTransfer.isAmendable` property.                                                                                                                                                       | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Sales                        |
| OrderAmendmentDefaultOrderItemInitialStateProviderPlugin          | Returns initial oms order item state for order items in order amendment flow.                                                                                                                           | None                                                                                                                                             | Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Sales                        |
| OrderAmendmentsByOrderResourceRelationshipPlugin                  | Adds `order-amendments` resource as relationship in case `OrderTransfer` and `OrderTransfer.salesOrderAmendment` are provided as a payload.                                                             | None                                                                                                                                             | Spryker\Glue\OrderAmendmentsRestApi\Plugin\GlueApplication                           |
| CountriesCheckoutDataValidatorPlugin                              | Verifies if countries can be found by countryIso2Codes given in `CheckoutDataTransfer.shipments.shippingAddress`.                                                                                       | None                                                                                                                                             | Spryker\Zed\Country\Communication\Plugin\CheckoutRestApi                             |
| ShipmentMethodCheckoutDataValidatorPlugin                         | Verifies if shipment method is valid.                                                                                                                                                                   | None                                                                                                                                             | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi                    |
| ItemsCheckoutDataValidatorPlugin                                  | Validates if `CheckoutDataTransfer` provides shipment data per item level.                                                                                                                              | None                                                                                                                                             | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi                    |
| CustomerAddressCheckoutDataValidatorPlugin                        | Checks if customer addresses exists.                                                                                                                                                                    | None                                                                                                                                             | Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi                    |
| CompanyBusinessUnitAddressCheckoutDataValidatorPlugin             | Checks if company addresses exists.                                                                                                                                                                     | None                                                                                                                                             | Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\CheckoutRestApi |
| ShipmentTypeCheckoutDataValidatorPlugin                           | Validates whether shipment type related to the shipment method is active and belongs to the quote store.                                                                                                | None                                                                                                                                             | Spryker\Zed\ShipmentTypesRestApi\Communication\Plugin\CheckoutRestApi                |
| ClickAndCollectExampleReplaceCheckoutDataValidatorPlugin          | Replaces filtered product offers with suitable product offers from Persistence.                                                                                                                         | None                                                                                                                                             | Spryker\Zed\ClickAndCollectExample\Communication\Plugin\CheckoutRestApi              |
| SaveOrderCommentThreadOrderPostSavePlugin                         | Saves comments thread after order is saved.                                                                                                                                                             | None                                                                                                                                             | Spryker\Zed\CommentSalesConnector\Communication\Plugin\Sales                         |
| SaveCompanyBusinessUnitUuidOrderPostSavePlugin                    | Saves company business unit UUID to the order after it's saved.                                                                                                                                         | None                                                                                                                                             | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Sales             |
| SaveCompanyUuidOrderPostSavePlugin                                | Saves company UUID to the order after it's saved.                                                                                                                                                       | None                                                                                                                                             | Spryker\Zed\CompanySalesConnector\Communication\Plugin\Sales                         |
| DiscountSalesOrderItemCollectionPreDeletePlugin                   | Deletes found by criteria sales discount and sales discount code entities.                                                                                                                              | None                                                                                                                                             | Spryker\Zed\Discount\Communication\Plugin\Sales                                      |
| SalesDiscountSalesExpensePreDeletePlugin                          | Deletes sales discount entities related to provided expenses.                                                                                                                                           | None                                                                                                                                             | Spryker\Zed\Discount\Communication\Plugin\Sales                                      |
| GiftCardOrderItemsPostSavePlugin                                  | Processes gift card order items after they're saved.                                                                                                                                                    | None                                                                                                                                             | Spryker\Zed\GiftCard\Communication\Plugin\Sales                                      |
| GiftCardSalesOrderItemCollectionPreDeletePlugin                   | Deletes found by criteria sales order item gift card entities.                                                                                                                                          | None                                                                                                                                             | Spryker\Zed\GiftCard\Communication\Plugin\Sales                                      |
| NopaymentSalesOrderItemCollectionPreDeletePlugin                  | Deletes found by criteria nopayment paid entities.                                                                                                                                                      | None                                                                                                                                             | Spryker\Zed\Nopayment\Communication\Plugin\Sales                                     |
| DefaultOrderItemInitialStateProviderPlugin                        | Sets the initial OMS state for order items.                                                                                                                                                             | None                                                                                                                                             | Spryker\Zed\Oms\Communication\Plugin\Sales                                           |
| OmsItemHistorySalesOrderItemCollectionPreDeletePlugin             | Deletes found by criteria entities.                                                                                                                                                                     | None                                                                                                                                             | Spryker\Zed\Oms\Communication\Plugin\Sales                                           |
| UpdateOrderCustomReferenceOrderPostSavePlugin                     | Updates custom order reference after order is saved.                                                                                                                                                    | None                                                                                                                                             | Spryker\Zed\OrderCustomReference\Communication\Plugin\Sales                          |
| ProductOptionOrderItemsPostSavePlugin                             | Processes product option order items after they're saved.                                                                                                                                               | None                                                                                                                                             | Spryker\Zed\ProductOption\Communication\Plugin\Sales                                 |
| ProductOptionSalesOrderItemCollectionPostUpdatePlugin             | Processes product options after order items collection update.                                                                                                                                          | None                                                                                                                                             | Spryker\Zed\ProductOption\Communication\Plugin\Sales                                 |
| ProductOptionSalesOrderItemCollectionPreDeletePlugin              | Deletes sales order item option entities.                                                                                                                                                               | None                                                                                                                                             | Spryker\Zed\ProductOption\Communication\Plugin\Sales                                 |
| SalesConfigurableBundleSalesOrderItemCollectionPreDeletePlugin    | Deletes sales order configured bundle item entities.                                                                                                                                                    | None                                                                                                                                             | Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales                       |
| SalesConfiguredBundlesSalesOrderItemCollectionPostUpdatePlugin    | Processes configured bundles after order items collection update.                                                                                                                                       | None                                                                                                                                             | Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\Sales                       |
| SalesProductConfigurationSalesOrderItemCollectionPostUpdatePlugin | Processes product configurations after order items collection update.                                                                                                                                   | None                                                                                                                                             | Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales                     |
| SalesProductConfigurationSalesOrderItemCollectionPreDeletePlugin  | Deletes found by criteria sales order item configuration entities.                                                                                                                                      | None                                                                                                                                             | Spryker\Zed\SalesProductConfiguration\Communication\Plugin\Sales                     |
| ItemMetadataSalesOrderItemCollectionPostUpdatePlugin              | Processes item metadata after order items collection update.                                                                                                                                            | None                                                                                                                                             | Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales                         |
| ItemMetadataSalesOrderItemCollectionPreDeletePlugin               | Deletes found by criteria sales order item metadata entities.                                                                                                                                           | None                                                                                                                                             | Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales                         |
| SalesReclamationSalesOrderItemCollectionPreDeletePlugin           | Deletes found by criteria sales reclamation item entities.                                                                                                                                              | None                                                                                                                                             | Spryker\Zed\SalesReclamation\Communication\Plugin\Sales                              |
| ServicePointSalesOrderItemCollectionPostUpdatePlugin              | Processes service points after order items collection update.                                                                                                                                           | None                                                                                                                                             | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales                             |
| ServicePointSalesOrderItemCollectionPreDeletePlugin               | Deletes found by criteria sales order item service point entities.                                                                                                                                      | None                                                                                                                                             | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales                             |

**src/Pyz/Zed/SalesOrderAmendment/SalesOrderAmendmentDependencyProvider.php**

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

**src/Pyz/Zed/CartReorder/CartReorderDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartReorder;

use Spryker\Zed\CartReorder\CartReorderDependencyProvider as SprykerCartReorderDependencyProvider;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\AmendmentOrderReferenceCartPreReorderPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\AmendmentQuoteNameCartPreReorderPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\OrderAmendmentCartReorderValidatorPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\CartReorder\OrderAmendmentQuoteProcessFlowExpanderCartPreReorderPlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\CartReorder\IsAmendableOrderCartReorderValidatorRulePlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\CartReorder\StartOrderAmendmentCartReorderPostCreatePlugin;

class CartReorderDependencyProvider extends SprykerCartReorderDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderValidatorPluginInterface>
     */
    protected function getCartReorderValidatorPluginsForOrderAmendment(): array
    {
        return [
            new OrderAmendmentCartReorderValidatorPlugin(),
            new IsAmendableOrderCartReorderValidatorRulePlugin(),
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

**src/Pyz/Glue/CartReorderRestApi/CartReorderRestApiDependencyProvider.php**

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

**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

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

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

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
use Spryker\Zed\ProductBundle\Communication\Plugin\Checkout\ProductBundleOrderSaverPlugin;
use Spryker\Zed\QuoteCheckoutConnector\Communication\Plugin\Checkout\DisallowQuoteCheckoutPreSavePlugin;
use Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout\CloseQuoteRequestCheckoutPostSaveHookPlugin;
use Spryker\Zed\Sales\Communication\Plugin\Checkout\OrderTotalsSaverPlugin;
use Spryker\Zed\Sales\Communication\Plugin\Checkout\SalesOrderExpanderPlugin;
use Spryker\Zed\Sales\Communication\Plugin\Checkout\UpdateOrderByQuoteCheckoutDoSaveOrderPlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout\OriginalOrderQuoteExpanderCheckoutPreSavePlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Checkout\SalesOrderAmendmentItemsCheckoutDoSaveOrderPlugin;
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
        ];
    }
}
```

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Quote\ResetAmendmentOrderReferenceBeforeQuoteSavePlugin;
use Spryker\Zed\SalesOrderAmendment\Communication\Plugin\Quote\ResetQuoteNameQuoteBeforeSavePlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Quote\CancelOrderAmendmentBeforeQuoteSavePlugin;
use Spryker\Zed\SalesOrderAmendmentOms\Communication\Plugin\Quote\CancelOrderAmendmentQuoteDeleteAfterPlugin;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{

    /**
     * @return array<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface>
     */
    protected function getQuoteUpdateBeforePlugins(): array
    {
        return [
            new ResetQuoteNameQuoteBeforeSavePlugin(),
            new CancelOrderAmendmentBeforeQuoteSavePlugin(),
            new ResetAmendmentOrderReferenceBeforeQuoteSavePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteDeleteAfterPluginInterface>
     */
    protected function getQuoteDeleteAfterPlugins(): array
    {
        return [
            new CancelOrderAmendmentQuoteDeleteAfterPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

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
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface>
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
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderExpanderPluginInterface>
     */
    protected function getSearchOrderExpanderPlugins(): array
    {
        return [
            new IsAmendableOrderSearchOrderExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
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

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

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

**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

Place an order with different types of products (e.g., physical, digital, etc.) and check if the order amendment is available.
Go to order detail and order list pages and check if the "edit order" button is present.

{% endinfo_block %}

## Install feature frontend

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| NAME             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                      |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core     | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                             |
| Order Management | {{page.version}} | [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/order-amendment: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                    | EXPECTED DIRECTORY                               |
|---------------------------|--------------------------------------------------|
| SalesOrderAmendmentWidget | vendor/spryker-shop/sales-order-amendment-widget |

{% endinfo_block %}

### 2) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
sales_order_amendment_widget.edit_order,Edit Order,en_US
sales_order_amendment_widget.edit_order,Bestellung bearbeiten,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                       | SPECIFICATION                                              | PREREQUISITES | NAMESPACE                                                |
|----------------------------------------------|------------------------------------------------------------|---------------|----------------------------------------------------------|
| SalesOrderAmendmentWidgetRouteProviderPlugin | Expands router collection with `order-amendment` endpoint. | None          | SprykerShop\Yves\SalesOrderAmendmentWidget\Plugin\Router |

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

Make sure that the order amendment is available for the customer in order detail and order list pages.

{% endinfo_block %}

### 4) Set up widgets

To enable widgets, register the following plugins:

| PLUGIN               | SPECIFICATION                            | PREREQUISITES | NAMESPACE                                         |
|----------------------|------------------------------------------|---------------|---------------------------------------------------|
| OrderAmendmentWidget | Allows customers to edit existing order. | None          | SprykerShop\Yves\SalesOrderAmendmentWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\SalesOrderAmendmentWidget\Widget\OrderAmendmentWidget;
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
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE               | TEST                                                                                                 |
|----------------------|------------------------------------------------------------------------------------------------------|
| OrderAmendmentWidget | Go to the **Order List** or **Order Detail** pages and make sure the "edit order" button is present. |

{% endinfo_block %}
