

This document describes how to install the [Gift Cards feature](/docs/pbc/all/gift-cards/latest/gift-cards.html).

## Install feature core

Follow the steps below to install the Gift Cards feature core.

### Prerequisites

Install the required features:

| NAME   | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{site.version}}| [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Cart | 202507.0 |[Install the Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)|
|Product  | 202507.0 |[Install the Product feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)|
|Payments  | 202507.0 |[Install the Payments feature](/docs/pbc/all/payment-service-provider/latest/base-shop/install-and-upgrade/install-the-payments-feature.html)|
| Shipment | 202507.0 |[Install the Shipment feature](/docs/pbc/all/carrier-management/latest/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)|
| Order Management | 202507.0 |[Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html)|
| Mailing &amp; Notifications | 202507.0 |[Install the Mailing &amp; Notifications feature](/docs/pbc/all/emails/latest/install-the-mailing-and-notifications-feature.html)|
| Promotions &amp; Discounts | 202507.0 |[Install the Promotions &amp; Discounts feature](/docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html)|

### 1) Install the required modules

```bash
composer require spryker-feature/gift-cards:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CartCode | vendor/spryker/cart-code |
| CartCodeExtension | vendor/spryker/cart-code-extension |
| GiftCard | vendor/spryker/gift-card |
| GiftCardBalance | vendor/spryker/gift-card-balance |
| Nopayment | vendor/spryker/nopayment |

{% endinfo_block %}

### 2) Set up the Gift Card purchase process

Extend your project with the following configuration:

**src/Pyz/Zed/GiftCard/GiftCardConfig.php**

```php
<?php

namespace Pyz\Zed\GiftCard;

use Spryker\Shared\Shipment\ShipmentConfig;
use Spryker\Zed\GiftCard\GiftCardConfig as SprykerGiftCardConfig;

class GiftCardConfig extends SprykerGiftCardConfig
{
    /**
     * Provides a list of shipment method names that should be available in case there are only gift card items in the quote.
     *
     * @return array
     */
    public function getGiftCardOnlyShipmentMethods(): array
    {
        return [
            ShipmentConfig::SHIPMENT_METHOD_NAME_NO_SHIPMENT,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

After you finish the [Setup behavior](#install-the-required-modules) step, make sure that, when ordering only a gift card, the `NoShipment` shipment method is selected automatically.

{% endinfo_block %}

### 3) Set up the gift card usage process

Extend your project with the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Nopayment\NopaymentConfig;
use Spryker\Shared\Nopayment\NopaymentConstants;
use Spryker\Shared\Oms\OmsConstants;
use Spryker\Shared\Sales\SalesConstants;
use Spryker\Zed\GiftCard\GiftCardConfig;

// ---------- Dependency injector
$config[KernelConstants::DEPENDENCY_INJECTOR_ZED] = [
    'Oms' => [
        GiftCardConfig::PROVIDER_NAME,
    ],
];

$config[NopaymentConstants::NO_PAYMENT_METHODS] = [
    NopaymentConfig::PAYMENT_PROVIDER_NAME,
];
$config[NopaymentConstants::WHITELIST_PAYMENT_METHODS] = [
    GiftCardConfig::PROVIDER_NAME,
];

// ---------- State machine (OMS)
$config[OmsConstants::ACTIVE_PROCESSES] = [
    'Nopayment01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    GiftCardConfig::PROVIDER_NAME => 'DummyPayment01', // Order State Machine name of your choice
    NopaymentConfig::PAYMENT_PROVIDER_NAME => 'Nopayment01',
];
```

**src/Pyz/Zed/GiftCard/GiftCardConfig.php**

```php
<?php

namespace Pyz\Zed\GiftCard;

use Spryker\Shared\DummyPayment\DummyPaymentConfig;
use Spryker\Zed\GiftCard\GiftCardConfig as SprykerGiftCardConfig;

class GiftCardConfig extends SprykerGiftCardConfig
{
    /**
     * Provides a list of payment method names that are disabled to use when the quote contains gift card item(s) to purchase.
     *
     * @return array
     */
    public function getGiftCardPaymentMethodBlacklist(): array
    {
        return [
            DummyPaymentConfig::PAYMENT_METHOD_INVOICE,
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesConfig.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesConfig as SprykerSalesConfig;

class SalesConfig extends SprykerSalesConfig
{
    /**
     * @return array
     */
    public function getSalesDetailExternalBlocksUrls()
    {
        $projectExternalBlocks = [
            'giftCards' => '/gift-card/sales/list', // lists used gift cards for the order
        ];

        $externalBlocks = parent::getSalesDetailExternalBlocksUrls();

        return array_merge($externalBlocks, $projectExternalBlocks);
    }
}
```

{% info_block warningBox "Verification" %}
After you finish the [Setup Behavior](#install-the-required-modules) step, make sure the following applies:
- The `NoPayment01` state machine has been activated successfully.
- When using a gift card to pay for an entire order, the configured order state machine is used—for example, `Nopayment01`.
- You can't use denied payment methods when using a gift card.
- In the Back office, on the order details page, the gift cards used in an order are displayed.

{% endinfo_block %}

### 4) Set up the database schema

Apply database changes and to generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_gift_card | table | created |
| spy_gift_card_product_abstract_configuration | table | created |
| spy_gift_card_product_abstract_configuration_link | table | created |
| spy_gift_card_product_configuration | table | created |
| spy_gift_card_product_configuration_link | table | created |
| spy_payment_gift_card | table | created |
| spy_gift_card_balance_log | table | created |
| spy_sales_order_item_gift_card | table | created |

Make sure that propel entities have been generated successfully by checking their existence. Also, change the generated entity classes to extend from Spryker core classes.

| CLASS PATH | EXTENDS |
| --- | --- |
| src/Orm/Zed/GiftCard/Persistence/SpyGiftCard.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyGiftCard |
| src/Orm/Zed/GiftCard/Persistence/SpyGiftCardQuery.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyGiftCardQuery |
| src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductAbstractConfiguration.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyGiftCardProductAbstractConfiguration |
| src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductAbstractConfigurationQuery.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyGiftCardProductAbstractConfigurationQuery |
| src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductAbstractConfigurationLink.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyGiftCardProductAbstractConfigurationLink |
| src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductAbstractConfigurationLinkQuery.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyGiftCardProductAbstractConfigurationLink |
| src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductConfiguration.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyGiftCardProductConfiguration |
| src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductConfigurationQuery.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyGiftCardProductConfigurationQuery |
| src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductConfigurationLink.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyGiftCardProductConfigurationLink |
| src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductConfigurationLinkQuery.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyGiftCardProductConfigurationLinkQuery |
| src/Orm/Zed/GiftCard/Persistence/SpyPaymentGiftCard.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyPaymentGiftCard |
| src/Orm/Zed/GiftCard/Persistence/SpyPaymentGiftCardQuery.php | Spryker\\Zed\\GiftCard\\Persistence\\Propel\\AbstractSpyPaymentGiftCardQuery |
| src/Orm/Zed/GiftCardBalance/Persistence/SpyGiftCardBalanceLog.php | Orm\\Zed\\GiftCardBalance\\Persistence\\Base\\SpyGiftCardBalanceLog |
| src/Orm/Zed/GiftCardBalance/Persistence/SpyGiftCardBalanceLogQuery.php | Orm\\Zed\\GiftCardBalance\\Persistence\\Base\\SpyGiftCardBalanceLogQuery |
| src/Orm/Zed/Sales/Persistence/SpySalesOrderItemGiftCard.php | Spryker\\Zed\\Sales\\Persistence\\Propel\\AbstractSpySalesOrderItemGiftCard |
| | Spryker\\Zed\\Sales\\Persistence\\Propel\\AbstractSpySalesOrderItemGiftCardQuery |

{% endinfo_block %}

### 5) Import the gift card configuration data

{% info_block infoBox "" %}

The following step imports abstract and concrete gift card configurations. Implementation for the data importer isn't provided by Spryker Core, so you need to implement it on the project level. You can find an example implementation in the [`suit` repository](https://github.com/spryker-shop/suite/commit/f38bc5264e9964d2d2da5a045c0305973b3cb556#diff-e854f9b396bdaa07ca6276f168aaa76a); only `Console` and `DataImport` module changes are relevant. The following data import examples are based on this implementation.

 {% endinfo_block %}

1. Prepare your data according to your requirements using the demo data:

**data/import/gift_card_abstract_configuration.csv**

```yaml
abstract_sku,pattern
1234,{prefix}-{randomPart}-{suffix}
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| abstract_sku |mandatory  | string | 1234 |  SKU reference of an abstract gift card product. |
| pattern |mandatory  | string | {prefix}-{randomPart}-{suffix} | A pattern that is used to generate codes for purchased gift cards. |

**data/import/gift_card_concrete_configuration.csv**

```yaml
sku,value
1234_1,1000
1234_2,2000
1234_3,5000
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| sku | ✓ | string| 1234 | An SKU reference of an abstract gift card product. |
| value | ✓ | string	 | {prefix}-{randomPart}-{suffix} | A pattern that is used to generate codes for purchased gift cards. |

2. Import data:

```bash
console data:import:gift-card-abstract-configuration
console data:import:gift-card-concrete-configuration
```

{% info_block warningBox "Verification" %}

Make sure abstract and concrete gift card configuration has been imported to `spy_gift_card_product_abstract_configuration` and `spy_gift_card_product_configuration` database tables.

{% endinfo_block %}

### 6) Set up the shipment method data

{% info_block infoBox "" %}

In this step, you create a shipment method called `NoShipment`. The name of the shipment method must match the value of the `\Spryker\Shared\Shipment\ShipmentConfig::SHIPMENT_METHOD_NAME_NO_SHIPMENT` constant.

{% endinfo_block %}

1. Taking into account project customizations, extend the shipment method data importer as follows:

**data/import/shipment.csv**

```yaml
shipment_method_key,name,carrier,taxSetName
spryker_no_shipment,NoShipment,NoShipment,Tax Exempt
```

2. Taking into account project customizations, extend the shipment price data importer as follows:

**data/import/shipment_price.csv**

```yaml
shipment_method_key,store,currency,value_net,value_gross
spryker_no_shipment,DE,EUR,0,0
```

3. Apply changes:

```bash
console data:import:shipment
console data:import:shipment-price
```

{% info_block warningBox "Verification" %}

Make sure that a shipment method with the `NoShipment` name exists in `spy_shipment_method` and `spy_shipment_method_price` database tables.

{% endinfo_block %}

### 7) Import additional and optional data

{% info_block infoBox "" %}

To represent and display gift cards as products in your shop, you need to import data into your database depending on your project configuration and needs. The following list contains the points that can be used to get an idea of what gift card-related data you might want to use:
- *Product Attribute Key* to create a gift card `value` super attribute that defines gift card variants.
- *Abstract Product* that represents gift cards in your catalog.
- *Abstract Product Store Relation* to manage store-specific gift cards.
- *Concrete Product* that represents gift cards with a specific price value.
- *Product Image* for abstract and concrete products to display gift cards.
- *Product Price* for concrete gift card products where the price value matches the "value" super attribute.
- *Product Stock* data for concrete gift card products.
- *Product Management Attribute* to define the previously created "value" product attribute for the PIM.
- *Category* that represents all gift cards.
- *Navigation item* to display the gift card category or gift card product details page directly.

{% endinfo_block %}

### 8) Prepare order state machines for the Gift Card purchase process

{% info_block infoBox "" %}

In this step, you can customize your order state machine to purchase gift cards. The process distinguishes gift card order items and ships them by emailing the customer. The following example shows how the `DummyPayment` state machine is defined.

{% endinfo_block %}

The `DummyPayment` order state machine example:

<details>
<summary>config/Zed/oms/DummyPayment01.xml</summary>

```html
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="DummyPayment01" main="true">
        <subprocesses>
            <process>DummyRefund</process>
            <process>CreateGiftCard</process>
        </subprocesses>

        <states>
            <state name="new" reserved="true"/>
            <state name="payment pending" reserved="true"/>
            <state name="invalid">
                <flag>exclude from customer</flag>
            </state>
            <state name="cancelled">
                <flag>exclude from customer</flag>
            </state>
            <state name="paid" reserved="true"/>
            <state name="exported" reserved="true"/>
            <state name="confirmed" reserved="true"/>
            <state name="shipped" reserved="true"/>
            <state name="delivered"/>
            <state name="closed"/>
        </states>

        <transitions>
            <transition happy="true" condition="DummyPayment/IsAuthorized">
                <source>new</source>
                <target>payment pending</target>
                <event>authorize</event>
            </transition>

            <transition>
                <source>new</source>
                <target>invalid</target>
                <event>authorize</event>
            </transition>

            <transition happy="true" condition="DummyPayment/IsPayed">
                <source>payment pending</source>
                <target>paid</target>
                <event>pay</event>
            </transition>

            <transition>
                <source>payment pending</source>
                <target>cancelled</target>
                <event>pay</event>
            </transition>

            <transition happy="true">
                <source>paid</source>
                <target>confirmed</target>
                <event>confirm</event>
            </transition>

            <transition happy="true">
                <source>confirmed</source>
                <target>exported</target>
                <event>check giftcard purchase</event>
            </transition>

            <transition happy="true" condition="GiftCard/IsGiftCard">
                <source>confirmed</source>
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

            <transition>
                <source>delivered</source>
                <target>ready for return</target>
                <event>return</event>
            </transition>

            <transition happy="true">
                <source>delivered</source>
                <target>closed</target>
                <event>close</event>
            </transition>

        </transitions>

        <events>
            <event name="authorize" onEnter="true"/>
            <event name="pay" manual="true" timeout="1 hour" command="DummyPayment/Pay"/>
            <event name="confirm" onEnter="true" manual="true" command="Oms/SendOrderConfirmation"/>
            <event name="export" onEnter="true" manual="true" command="Oms/SendOrderShipped"/>
            <event name="ship" manual="true" command="Oms/SendOrderShipped"/>
            <event name="stock-update" manual="true"/>
            <event name="close" manual="true" timeout="1 hour"/>
            <event name="return" manual="true" />
        </events>
    </process>

    <process name="DummyRefund" file="DummySubprocess/DummyRefund01.xml"/>
    <process name="CreateGiftCard" file="GiftCardSubprocess/CreateGiftCard01.xml"/>

</statemachine>
```

![Dummy payment](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Feature+Integration+Guides/Gift+Cards+Feature+Integration/dummy-payment.svg)

</details>



<details><summary>config/Zed/oms/GiftCardSubprocess/CreateGiftCard01.xml</summary>

```html
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="CreateGiftCard">
        <states>
            <state name="gift card purchased"/>
            <state name="gift card created"/>
            <state name="gift card shipped"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>gift card purchased</source>
                <target>gift card created</target>
                <event>create giftcard</event>
            </transition>

            <transition happy="true">
                <source>gift card created</source>
                <target>gift card shipped</target>
                <event>ship giftcard</event>
            </transition>

        </transitions>

        <events>
            <event name="check giftcard purchase" onEnter="true"/>
            <event name="create giftcard" onEnter="true" command="GiftCard/CreateGiftCard" />
            <event name="ship giftcard" onEnter="true" command="GiftCardMailConnector/ShipGiftCard" />
            <event name="complete gift card creation" onEnter="true" />
        </events>
    </process>
</statemachine>
```

</details>


<details>
<summary>config/Zed/oms/DummySubprocess/DummyRefund01.xml</summary>

```html
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="DummyRefund">

        <states>
            <state name="ready for return" />
            <state name="returned"/>
            <state name="refunded"/>
        </states>

        <transitions>
            <transition>
                <source>ready for return</source>
                <target>returned</target>
                <event>execute-return</event>
            </transition>

            <transition>
                <source>returned</source>
                <target>refunded</target>
                <event>refund</event>
            </transition>
        </transitions>

        <events>
            <event name="execute-return" onEnter="true"/>
            <event name="refund" manual="true" command="DummyPayment/Refund"/>
        </events>
    </process>

</statemachine>
```

![Nopayment](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Feature+Integration+Guides/Gift+Cards+Feature+Integration/nopayment.svg)
</details>


### 9) Prepare order state machines for the Gift Card usage process

In this step, you customize your order state machine to place orders with zero prices to pay, by using gift cards. The process skips payment-related steps because there is nothing for a customer to pay. The following example shows how the `NoPayment` state machine is defined.

The `NoPayment` order state machine example:

<details><summary>config/Zed/oms/Nopayment01.xml</summary>

```html
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="Nopayment01" main="true">
        <subprocesses>
            <process>DummyRefund</process>
        </subprocesses>

        <states>
            <state name="new" reserved="true"/>
            <state name="paid" reserved="true"/>
            <state name="exported" reserved="true"/>
            <state name="shipped" reserved="true"/>
            <state name="delivered"/>
            <state name="closed"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>new</source>
                <target>paid</target>
                <event>authorize</event>
            </transition>

            <transition happy="true">
                <source>paid</source>
                <target>exported</target>
                <event>export</event>
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

            <transition>
                <source>delivered</source>
                <target>ready for return</target>
                <event>return</event>
            </transition>

            <transition happy="true">
                <source>delivered</source>
                <target>closed</target>
                <event>close</event>
            </transition>

        </transitions>

        <events>
            <event name="authorize" onEnter="true"/>
            <event name="export" onEnter="true" manual="true" command="Oms/SendOrderConfirmation"/>
            <event name="ship" manual="true" command="Oms/SendOrderShipped"/>
            <event name="stock-update" manual="true"/>
            <event name="close" manual="true" timeout="1 hour"/>
            <event name="return" manual="true" />
        </events>
    </process>

    <process name="DummyRefund" file="DummySubprocess/DummyRefund01.xml"/>

</statemachine>
```

![Nopayment](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Feature+Integration+Guides/Gift+Cards+Feature+Integration/nopayment.svg)

</details>


### 10) Enable the gift card purchase process

To enable purchasing of gifts, add the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|GiftCardCalculatorPlugin  | During quote recalculation, distinguishes applicable and non-applicable gift cards and creates payment methods for applicable gift cards. |  | Spryker\Zed\GiftCard\Communication\Plugin |
| GiftCardMetadataExpanderPlugin | Extends gift card items with gift card configuration metadata to change cart items. |  | Spryker\Zed\GiftCard\Communication\Plugin |
| `GiftCardCheckoutDoSaveOrderPlugin` | Saves gift cards items from the quote. Saves gift card payments from the quote. |  | `Spryker\Zed\GiftCard\Communication\Plugin\Checkout` |
| `GiftCardCheckoutPreConditionPlugin` | Returns true if `QuoteTransfer.payments` don't have `GiftCard` payments. Returns true if gift card was in use before and the amount is valid. Returns false otherwise. |  | `\Spryker\Zed\GiftCard\Communication\Plugin\Checkout` |
| `NopaymentCheckoutPreConditionPlugin` | Returns true if there is no `Nopayment` payment provider in `QuoteTransfer.payments`; otherwise, it does additional checks and logic. Returns true if `QuoteTransfer.totals.priceToPay` is greater than 0; otherwise,  adds an error into `CheckoutResponseTransfer` and returns false. |   | `\Spryker\Zed\Nopayment\Communication\Plugin\Checkout` |
| GiftCardDiscountableItemFilterPlugin |  Filters gift card items from discountable items. |  | Spryker\Zed\GiftCard\Communication\Plugin |
| GiftCardDeliveryMailTypePlugin | Provides a mail type for sending emails about successful gift card orders. |   | Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Mail |
| Command\ShipGiftCardByEmailCommandPlugin | Registers the `GiftCardMailConnector/ShipGiftCard` OMS command that is used to deliver a gift card by email. | Use the prior `GiftCardDeliveryMailTypePlugin` to register the necessary mail type. | Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Oms |
|CreateGiftCardCommandPlugin  | Registers the `GiftCard/CreateGiftCard` OMS command that is used to generate a new gift card based on a gift card order item configuration. |  | Spryker\Zed\GiftCard\Communication\Plugin\Oms\Command |
| IsGiftCardConditionPlugin | Registers the `GiftCard/IsGiftCard` OMS command that is used to check if an order item is a gift card.|  |  Spryker\Zed\GiftCard\Communication\Plugin\Oms\Condition|
|OnlyGiftCardShipmentMethodFilterPlugin  | Filters non-available shipment methods for gift card items to be purchased. | - | Spryker\Zed\GiftCard\Communication\Plugin |

**src/Pyz/Zed/Calculation/CalculationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Calculation;

use Spryker\Zed\Calculation\CalculationDependencyProvider as SprykerCalculationDependencyProvider;
use Spryker\Zed\GiftCard\Communication\Plugin\GiftCardCalculatorPlugin;
use Spryker\Zed\Kernel\Container;

class CalculationDependencyProvider extends SprykerCalculationDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface[]
     */
    protected function getQuoteCalculatorPluginStack(Container $container)
    {
        return [
            new GiftCardCalculatorPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\GiftCard\Communication\Plugin\GiftCardMetadataExpanderPlugin;
use Spryker\Zed\Kernel\Container;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
     */
    protected function getExpanderPlugins(Container $container)
    {
        return [
            new GiftCardMetadataExpanderPlugin(),
        ];
    }
}
```

<details><summary>src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\GiftCard\Communication\Plugin\Checkout\GiftCardCheckoutDoSaveOrderPlugin;
use Spryker\Zed\GiftCard\Communication\Plugin\Checkout\GiftCardCheckoutPreConditionPlugin;
use Spryker\Zed\Nopayment\Communication\Plugin\Checkout\NopaymentCheckoutPreConditionPlugin;
use Spryker\Zed\Kernel\Container;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            ...
            new GiftCardCheckoutPreConditionPlugin(),
            new NopaymentCheckoutPreConditionPlugin(),
            ...
        ];
    }
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[]|\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface[]
     */
    protected function getCheckoutOrderSavers(Container $container)
    {
        return [
            ...
            new GiftCardCheckoutDoSaveOrderPlugin(),
            ...
        ];
    }

    ...
}
```

</details>

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;

use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;
use Spryker\Zed\GiftCard\Communication\Plugin\GiftCardDiscountableItemFilterPlugin;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return array
     */
    protected function getDiscountableItemFilterPlugins()
    {
        return [
            new GiftCardDiscountableItemFilterPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Mail/MailDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Mail;

use Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Mail\GiftCardDeliveryMailTypePlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Mail\Business\Model\Mail\MailTypeCollectionAddInterface;
use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container->extend(static::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
            $mailCollection->add(new GiftCardDeliveryMailTypePlugin());

            return $mailCollection;
        });

        return $container;
    }
}
```

<details><summary>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\GiftCard\Communication\Plugin\Oms\Command\CreateGiftCardCommandPlugin;
use Spryker\Zed\GiftCard\Communication\Plugin\Oms\Condition\IsGiftCardConditionPlugin;
use Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Oms\Command\ShipGiftCardByEmailCommandPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionCollectionInterface;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->extendCommandPlugins($container);
        $container = $this->extendConditionPlugins($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new ShipGiftCardByEmailCommandPlugin(), 'GiftCardMailConnector/ShipGiftCard');
            $commandCollection->add(new CreateGiftCardCommandPlugin(), 'GiftCard/CreateGiftCard');

            return $commandCollection;
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container): Container
    {
        $container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            $conditionCollection
                ->add(new IsGiftCardConditionPlugin(), 'GiftCard/IsGiftCard');

            return $conditionCollection;
        });

        return $container;
    }
}
```

</details>

**src/Pyz/Zed/Shipment/ShipmentDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Shipment;

use Spryker\Zed\GiftCard\Communication\Plugin\OnlyGiftCardShipmentMethodFilterPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Shipment\ShipmentDependencyProvider as SprykerShipmentDependencyProvider;

class ShipmentDependencyProvider extends SprykerShipmentDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Shipment\Dependency\Plugin\ShipmentMethodFilterPluginInterface[]
     */
    protected function getMethodFilterPlugins(Container $container)
    {
        return [
            new OnlyGiftCardShipmentMethodFilterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

After completing the [frontend integration](#install-feature-frontend), make sure the following applies:
- You can add a gift card to cart.
- Discounts are not applied to the card.
- During the checkout process, because there is only a gift card in the cart, shipment method selection is optional.
- You can place the order successfully.
- You receive a gift card code to your mailbox.

{% endinfo_block %}

### 11) Enable the gift card code usage process

To enable purchasing with existing gift cards, add the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|GiftCardCartCodePlugin  | Manages adding and removing gift card code from a quote. | | Spryker\Client\GiftCard\Plugin\CartCode |
| GiftCardBalanceValueProviderPlugin | Calculates the remaining balance of a gift card based on its usage history and returns its value. |  |Spryker\Zed\GiftCardBalance\Communication\Plugin |
| BalanceTransactionLogPaymentSaverPlugin | Logs gift card payment transactions.  |  | Spryker\Zed\GiftCardBalance\Communication\Plugin |
| BalanceCheckerApplicabilityPlugin |  Calculates the remaining balance of a gift card based on its usage history and checks if the balance is positive.|   | Spryker\Zed\GiftCardBalance\Communication\Plugin |
| SendEmailToGiftCardUser | Sends a usage email notification to the user of the gift card. |  |Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Checkout |
|GiftCardUsageMailTypePlugin | Provides a mail type for sending gift card usage information emails. |  |  Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Mail|
|PriceToPayPaymentMethodFilterPlugin | Filters available payment methods based on the price-to-pay value of the quote. |  |Spryker\Zed\Nopayment\Communication\Plugin\Payment |
| GiftCardPaymentMethodFilterPlugin | Filters blacklisted payment methods if the quote contains a gift card to be purchased. | | Spryker\Zed\GiftCard\Communication\Plugin |
| GiftCardPaymentMapKeyBuilderStrategyPlugin | Returns payment map key based on `PaymentTransfer.paymentProvider`, `PaymentTransfer.paymentMethod`, and `PaymentTransfer.giftCard.idGiftCard`. |    | Spryker\Zed\GiftCard\Communication\Plugin\SalesPayment |

**src/Pyz/Client/CartCode/CartCodeDependencyProvider.php**

```php
<?php

namespace Pyz\Client\CartCode;

use Spryker\Client\CartCode\CartCodeDependencyProvider as SprykerCartCodeDependencyProvider;
use Spryker\Client\GiftCard\Plugin\CartCode\GiftCardCartCodePlugin;

class CartCodeDependencyProvider extends SprykerCartCodeDependencyProvider
{
    /**
     * @return \Spryker\Client\CartCodeExtension\Dependency\Plugin\CartCodePluginInterface[]
     */
    protected function getCartCodePluginCollection(): array
    {
        return [
            new GiftCardCartCodePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Checkout\SendEmailToGiftCardUser;
use Spryker\Zed\Kernel\Container;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    ...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPostSaveHookInterface[]
     */
    protected function getCheckoutPostHooks(Container $container)
    {
        return [
            ...
            new SendEmailToGiftCardUser(),
        ];
    }
}
```

<details><summary>src/Pyz/Zed/GiftCard/GiftCardDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\GiftCard;

use Spryker\Zed\GiftCard\GiftCardDependencyProvider as SprykerGiftCardDependencyProvider;
use Spryker\Zed\GiftCardBalance\Communication\Plugin\BalanceCheckerApplicabilityPlugin;
use Spryker\Zed\GiftCardBalance\Communication\Plugin\BalanceTransactionLogPaymentSaverPlugin;
use Spryker\Zed\GiftCardBalance\Communication\Plugin\GiftCardBalanceValueProviderPlugin;

class GiftCardDependencyProvider extends SprykerGiftCardDependencyProvider
{
    /**
     * @return \Spryker\Zed\GiftCard\Dependency\Plugin\GiftCardValueProviderPluginInterface
     */
    protected function getValueProviderPlugin()
    {
        return new GiftCardBalanceValueProviderPlugin();
    }

    /**
     * @return \Spryker\Zed\GiftCard\Dependency\Plugin\GiftCardPaymentSaverPluginInterface[]
     */
    protected function getPaymentSaverPlugins()
    {
        return [
            new BalanceTransactionLogPaymentSaverPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\GiftCard\Dependency\Plugin\GiftCardDecisionRulePluginInterface[]
     */
    protected function getDecisionRulePlugins()
    {
        return array_merge(parent::getDecisionRulePlugins(), [
            new BalanceCheckerApplicabilityPlugin(),
        ]);
    }
}
```

</details>

**src/Pyz/Zed/Mail/MailDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Mail;
se Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Mail\GiftCardUsageMailTypePlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Mail\Business\Model\Mail\MailTypeCollectionAddInterface;
use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container->extend(static::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
            $mailCollection->add(new GiftCardUsageMailTypePlugin());

            return $mailCollection;
        });

        return $container;
    }
}
```

**src/Pyz/Zed/Payment/PaymentDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Payment;

use Spryker\Zed\GiftCard\Communication\Plugin\GiftCardPaymentMethodFilterPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Nopayment\Communication\Plugin\Payment\PriceToPayPaymentMethodFilterPlugin;
use Spryker\Zed\Payment\PaymentDependencyProvider as SprykerPaymentDependencyProvider;

class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @return \Spryker\Zed\Payment\Dependency\Plugin\Payment\PaymentMethodFilterPluginInterface[]
     */
    protected function getPaymentMethodFilterPlugins()
    {
        return [
            new PriceToPayPaymentMethodFilterPlugin(),
            new GiftCardPaymentMethodFilterPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SalesPayment/SalesPaymentDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesPayment;

use Spryker\Zed\GiftCard\Communication\Plugin\SalesPayment\GiftCardPaymentMapKeyBuilderStrategyPlugin;
use Spryker\Zed\SalesPayment\SalesPaymentDependencyProvider as SprykerSalesPaymentDependencyProvider;

class SalesPaymentDependencyProvider extends SprykerSalesPaymentDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesPaymentExtension\Dependency\Plugin\PaymentMapKeyBuilderStrategyPluginInterface>
     */
    protected function getPaymentMapKeyBuilderStrategyPlugins(): array
    {
        return [
            new GiftCardPaymentMapKeyBuilderStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

After completing the [frontend integration](#install-feature-frontend), make sure the following applies:

- You can activate a gift card using its generated code.
- You can activate more than one gift card simultaneously using the generated codes.
- You can't activate a gift card with a depleted balance.
- During the checkout process, payment method selection is skipped if the gift card covers the grand total.
- Having made a successful purchase with the help of a gift card, you receive a gift card balance notification email.


{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Gift Cards feature frontend.

### Prerequisites

Install the required features:

| NAME   | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Cart | 202507.0 |[Install the Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)|
| Checkout | 202507.0 | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/gift-cards:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CartCodeWidget | vendor/spryker-shop/cart-code-widget |
| GiftCardWidget | vendor/spryker-shop/gift-card-widget |

{% endinfo_block %}

### 2) Set up configuration

Extend your project with the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Nopayment\NopaymentConfig;

// ---------- Dependency injector
$config[KernelConstants::DEPENDENCY_INJECTOR_YVES] = [
    'CheckoutPage' => [
        NopaymentConfig::PAYMENT_PROVIDER_NAME,
    ],
];
```

{% info_block warningBox "Verification" %}

Make sure the `nopayment` payment method is selected when the grand total of an order is covered by a gift card.

{% endinfo_block %}

### 3) Add translations

1. Append the glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
cart.total.price_to_pay,Zu bezahlender Betrag,de_DE
cart.total.price_to_pay,Price to pay,en_US
cart.giftcard.label,Gift card,en_US
cart.giftcard.label,Geschenkgutschein,de_DE
cart.giftcard.apply.failed,The gift card is not applicable,en_US
cart.giftcard.apply.failed,Geschenkgutschein konnte nicht angewendet werden,de_DE
cart.giftcard.apply.successful,Your gift card code has been applied,en_US
cart.giftcard.apply.successful,Ihr Geschenkgutschein wurde angewendet,de_DE
cart.voucher.apply.successful,Your voucher code has been applied,en_US
cart.voucher.apply.successful,Ihr Gutscheincode wurde angewendet,de_DE
cart.code.apply.failed,Code could not be applied,en_US
cart.code.apply.failed,Gutscheincode konnte nicht angewendet werden,de_DE
general.next.button,Next,en_US
general.next.button,Weiter,de_DE
checkout.giftcard.label,Gift card,en_US
checkout.giftcard.label,Geschenkgutschein,de_DE
roduct.attribute.value,Value,en_US
product.attribute.value,Der Wert,de_DE
mail.giftCard.delivery.subject,Your Gift card!,en_US
mail.giftCard.delivery.subject,Deine Geschenkkarte!,de_DE
mail.giftCard.delivery.text,"Sehr geehrter Kunde, vielen Dank für den Kauf einer Geschenkgutschein in unserem Shop. Ihr Gutscheincode lautet: ",de_DE
mail.giftCard.delivery.text,"Dear customer, thank you for buying a gift card at our shop. Your gift card code is: ",en_US
mail.giftCard.usage.subject,Thank you for using a Gift Card!,en_US
mail.giftCard.usage.subject,Vielen Dank dass Sie ein Geschenkgutschein benutzt haben.,de_DE
cart.code.enter-code,Gutscheincode/Geschenkgutscheincode eingeben,de_DE
cart.code.enter-code,Enter voucher/gift card code,en_US
```

2. Apply glossary keys:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Enable controllers

Register the following route provider plugin:

| PROVIDER                               | NAMESPACE |
|----------------------------------------| --- |
| CartCodeWidgetRouteProviderPlugin      | SprykerShop\Yves\CartCodeWidget\Plugin\Router |
| CartCodeAsyncWidgetRouteProviderPlugin | SprykerShop\Yves\CartCodeWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\CartCodeWidget\Plugin\Router\CartCodeWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new CartCodeWidgetRouteProviderPlugin(),
            new CartCodeAsyncWidgetRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

- Make sure a valid gift card code can be added and removed from cart by submitting the cart code form.
- Make sure a cart code can be applied with the cart actions AJAX mode enabled.

{% endinfo_block %}

### 5) Set up widgets

Register the following global widget:

| WIDGET | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| CartCodeFormWidget |Provides a cart code activation form.  | SprykerShop\Yves\CartCodeWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\CartCodeWidget\Widget\CartCodeFormWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            CartCodeFormWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the code widget is displayed on the **Cart** and **Summary** pages of the checkout process.

{% endinfo_block %}
