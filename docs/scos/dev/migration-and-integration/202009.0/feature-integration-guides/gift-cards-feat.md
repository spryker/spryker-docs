---
title: Gift cards feature integration
originalLink: https://documentation.spryker.com/v6/docs/gift-cards-feature-integration
redirect_from:
  - /v6/docs/gift-cards-feature-integration
  - /v6/docs/en/gift-cards-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 202009.0 |
| Cart | 202009.0 |
|Product  | 202009.0 |
|Payments  | 202009.0 |
| Shipment | 202009.0 |
| Order Management | 202009.0 |
| Mailing &amp; Notifications | 202009.0 |
| Promotions &amp; Discounts | 202009.0 |

### 1) Install the required modules using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/gift-cards:"^202009.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`CartCode`</td><td>`vendor/spryker/cart-code`</td></tr><tr><td>`CartCodeExtension`</td><td>`vendor/spryker/cart-code-extension`</td></tr><tr><td>`GiftCard`</td><td>`vendor/spryker/gift-card`</td></tr><tr><td>`GiftCardBalance`</td><td>`vendor/spryker/gift-card-balance`</td></tr><tr><td>`Nopayment`</td><td>`vendor/spryker/nopayment`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Configuration
#### Gift Card Purchase Process
Extend your project with the following configuration.

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
Once you've finished the *Setup Behaviour* step, make sure that "NoShipment" shipment method is selected automatically while ordering only a gift card.
{% endinfo_block %}

#### Gift Card Usage Process
Extend your project with the following configuration.

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
    'Payment' => [
        GiftCardConfig::PROVIDER_NAME,
        NopaymentConfig::PAYMENT_PROVIDER_NAME,
    ],
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
Once you've finished Setup Behaviour step, make sure that:<ul><li>NoPayment01 statemachine is activated successfully.</li><li>When using a gift card to cover an entire order, the configured order state machine (e.g. "Nopayment01"
{% endinfo_block %} is used.</li><li>You can't use blacklisted payment methods when using a gift card.</li><li>In the order detail page in Back office, you see the gift cards used in the order.</li></ul>)

### 3) Set up Database Schema
Run the following commands to apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Verify the following changes have been applied by checking your database:<table><thead><tr><th>Database Entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_gift_card`</td><td>table</td><td>created</td></tr><tr><td>`spy_gift_card_product_abstract_configuration`</td><td>table</td><td>created</td></tr><tr><td>`spy_gift_card_product_abstract_configuration_link`</td><td>table</td><td>created</td></tr><tr><td>`spy_gift_card_product_configuration`</td><td>table</td><td>created</td></tr><tr><td>`spy_gift_card_product_configuration_link`</td><td>table</td><td>created</td></tr><tr><td>`spy_payment_gift_card`</td><td>table</td><td>created</td></tr><tr><td>`spy_gift_card_balance_log`</td><td>table</td><td>created</td></tr><tr><td>`spy_sales_order_item_gift_card`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that propel entities have been generated successfully by checking their existence. Also, change the generated entity classes to extend from Spryker core classes.<table><thead><tr><th>Class Path</th><th>Extends</th></tr></thead><tbody><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyGiftCard.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyGiftCard`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyGiftCardQuery.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyGiftCardQuery`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductAbstractConfiguration.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyGiftCardProductAbstractConfiguration`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductAbstractConfigurationQuery.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyGiftCardProductAbstractConfigurationQuery`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductAbstractConfigurationLink.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyGiftCardProductAbstractConfigurationLink`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductAbstractConfigurationLinkQuery.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyGiftCardProductAbstractConfigurationLink`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductConfiguration.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyGiftCardProductConfiguration`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductConfigurationQuery.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyGiftCardProductConfigurationQuery`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductConfigurationLink.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyGiftCardProductConfigurationLink`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyGiftCardProductConfigurationLinkQuery.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyGiftCardProductConfigurationLinkQuery`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyPaymentGiftCard.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyPaymentGiftCard`</td></tr><tr><td>`src/Orm/Zed/GiftCard/Persistence/SpyPaymentGiftCardQuery.php`</td><td>`Spryker\Zed\GiftCard\Persistence\Propel\AbstractSpyPaymentGiftCardQuery`</td></tr><tr><td>`src/Orm/Zed/GiftCardBalance/Persistence/SpyGiftCardBalanceLog.php`</td><td>`Orm\Zed\GiftCardBalance\Persistence\Base\SpyGiftCardBalanceLog`</td></tr><tr><td>`src/Orm/Zed/GiftCardBalance/Persistence/SpyGiftCardBalanceLogQuery.php`</td><td>`Orm\Zed\GiftCardBalance\Persistence\Base\SpyGiftCardBalanceLogQuery`</td></tr><tr><td>`src/Orm/Zed/Sales/Persistence/SpySalesOrderItemGiftCard.php`</td><td>`Spryker\Zed\Sales\Persistence\Propel\AbstractSpySalesOrderItemGiftCard`</td></tr><tr><td>`src/Orm/Zed/Sales/Persistence/SpySalesOrderItemGiftCardQuery.php`</td><td>`Spryker\Zed\Sales\Persistence\Propel\AbstractSpySalesOrderItemGiftCardQuery`</td></tr></tbody></table>
{% endinfo_block %}

### 4) Import Data
#### Gift Card Configuration Data
{% info_block infoBox "Info" %}
The following step imports abstract and concrete gift card configurations. Implementation for the data importer is not provided by Spryker Core, so you need to implement it on project level.</br></br>You can find an exemplary implementation [here](https://github.com/spryker-shop/suite/commit/f38bc5264e9964d2d2da5a045c0305973b3cb556#diff-e854f9b396bdaa07ca6276f168aaa76a
{% endinfo_block %} (only Console and DataImport module changes are relevant). The following data import examples are based on this implementation.)

**data/import/gift_card_abstract_configuration.csv**

```yaml
abstract_sku,pattern
1234,{prefix}-{randomPart}-{suffix}
```

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `abstract_sku	` |mandatory  | string | 1234 |  SKU reference of an abstract gift card product.|
| `pattern` |mandatory  | string | {prefix}-{randomPart}-{suffix} | A pattern that is used to generate codes for purchased gift card codes. |

data/import/gift_card_concrete_configuration.csv

```yaml
sku,value
1234_1,1000
1234_2,2000
1234_3,5000
```

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `sku` | mandatory | string| 1234 | SKU reference of an abstract gift card product. |
| `value` | mandatory | string	 | {prefix}-{randomPart}-{suffix} | A pattern that is used to generate codes for purchased gift card codes. |

```bash
console data:import:gift-card-abstract-configuration
console data:import:gift-card-concrete-configuration
```

{% info_block warningBox "Verification" %}
Make sure to have imported abstract and concrete gift card configuration into your `spy_gift_card_product_abstract_configuration` and `spy_gift_card_product_configuration` database tables.
{% endinfo_block %}

#### Shipment Method Data
{% info_block infoBox "Info" %}
In this step, you will create a shipment method called "NoShipment". The name of the shipment method has to match the value of `\Spryker\Shared\Shipment\ShipmentConfig::SHIPMENT_METHOD_NAME_NO_SHIPMENT` constant.
{% endinfo_block %}

Taking into account project customizations, extend shipment method data importer as shown below:

**data/import/shipment.csv**

```yaml
shipment_method_key,name,carrier,taxSetName
spryker_no_shipment,NoShipment,NoShipment,Tax Exempt
```

Taking into account project customizations, extend your shipment price data importer as shown below:

**data/import/shipment_price.csv**

```yaml
shipment_method_key,store,currency,value_net,value_gross
spryker_no_shipment,DE,EUR,0,0
```

Run the following command(s) to apply changes:

```bash
console data:import:shipment
console data:import:shipment-price
```

{% info_block warningBox "Verification" %}
Make sure that a shipment method with "NoShipment" name exists in your `spy_shipment_method` and `spy_shipment_method_price` database tables.
{% endinfo_block %}

#### Additional, Optional Data Imports
{% info_block infoBox "Info" %}
To be able to represent and display gift cards as products in your shop, you need to import some data into your database depending on your project configuration and needs. The following list contains the points which can be used to get the idea of what gift card related data you might want to use:<ul><li>**Product Attribute Key** to create a gift card "value" super attribute that defines gift card variants.</li><li>**Abstract Product** that represents gift cards in your catalog.</li><li>**Abstract Product Store Relation** to manage store-specific gift cards.</li><li>**Concrete Product** that represents gift cards with a specific price value.</li><li>**Product Image** for abstract and concrete product to display gift cards.</li><li>**Product Price** for concrete gift card products where the price value matches the "value" super attribute.</li><li>**Product Stock** data for concrete gift card products.</li><li>**Product Management Attribute** to define the previously created "value" product attribute for the PIM.</li><li>**Category** that represents all gift cards.</li><li>**Navigation item** to display gift card category or gift card product detail page directly.</li>
{% endinfo_block %}

### 5) Set up Behaviour
#### Prepare Order State Machines - Gift Card Purchase Process

{% info_block infoBox "Info" %}
In this step, you will customize your Order State Machine to purchase gift cards. The process should distinguish gift card order items and ship them by sending an email to the customer. Below, you can see an example of how DummyPayment state machine is defined.
{% endinfo_block %}
DummyPayment Order State Machine Example:

**config/Zed/oms/DummyPayment01.xml**

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

![Dummy payment](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Feature+Integration+Guides/Gift+Cards+Feature+Integration/dummy-payment.svg){height="" width=""}

**config/Zed/oms/GiftCardSubprocess/CreateGiftCard01.xml**

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

**config/Zed/oms/DummySubprocess/DummyRefund01.xml**

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

![Nopayment ](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Feature+Integration+Guides/Gift+Cards+Feature+Integration/nopayment.svg){height="" width=""}

#### Prepare Order State Machines - Gift Card Usage Process

{% info_block infoBox "Info" %}
In this step, you should customize your Order State Machine to place orders with 0 price to pay (by using gift cards
{% endinfo_block %}. The process should skip payment-related steps as there is nothing for the customer to pay any more. Below you can see the example of how NoPayment state machine is defined.)
NoPayment Order State Machine Example:

**config/Zed/oms/Nopayment01.xml**
    
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

![Nopayment](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Feature+Integration+Guides/Gift+Cards+Feature+Integration/nopayment.svg){height="" width=""}

#### Gift Card Purchase Process
{% info_block infoBox "Info" %}
In this step, you'll enable gift card purchasing in your project.
{% endinfo_block %}

Add the following plugins to your project:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|`GiftCardCalculatorPlugin`  | During quote recalculation, distinguishes applicable and non-applicable gift cards and creates payment methods for applicable gift cards. | - | `Spryker\Zed\GiftCard\Communication\Plugin` |
| `GiftCardMetadataExpanderPlugin` | Extends gift card items with gift card configuration metadata to change cart items. | - | `Spryker\Zed\GiftCard\Communication\Plugin` |
| `GiftCardOrderItemSaverPlugin` | Saves gift card order data to the database. |-  | `Spryker\Zed\GiftCard\Communication\Plugin` |
| `GiftCardDiscountableItemFilterPlugin` |  Filters gift card items from discountable items.|- | `Spryker\Zed\GiftCard\Communication\Plugin` |
| `GiftCardDeliveryMailTypePlugin` | Provides a mail type for sending e-mails about successful gift card orders. |-  | `Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Mail` |
| `Command\ShipGiftCardByEmailCommandPlugin` | Registers `GiftCardMailConnector/ShipGiftCard` OMS command that is used to deliver a gift card by e-mail. | Use `GiftCardDeliveryMailTypePlugin` above to register the necessary mail type. | `Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Oms` |
|`CreateGiftCardCommandPlugin`  | Registers `GiftCard/CreateGiftCard` OMS command that is used to generate a new gift card based on a gift card order item configuration. |-  | `Spryker\Zed\GiftCard\Communication\Plugin\Oms\Command` |
| `IsGiftCardConditionPlugin` | Registers `GiftCard/IsGiftCard` OMS command that is used to check whether an order item is a gift card.| - |  `Spryker\Zed\GiftCard\Communication\Plugin\Oms\Condition`|
|`OnlyGiftCardShipmentMethodFilterPlugin`  | Filters non-available shipment methods for gift card items to be purchased. | - | `Spryker\Zed\GiftCard\Communication\Plugin` |

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

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Checkout;
 
use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\GiftCard\Communication\Plugin\GiftCardOrderItemSaverPlugin;
use Spryker\Zed\Kernel\Container;
 
class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[]
     */
    protected function getCheckoutOrderSavers(Container $container)
    {
        return [
            new GiftCardOrderItemSaverPlugin(),
        ];
    }
}
```

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

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

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
Make sure that,<ul><li>You can put a configured gift card product to cart and purchase it.</li><li>The gift card item shouldn't have any discounts applied.</li><li>During the checkout process, shipment method selection should be optional if there is only a gift card in cart.</li><li>The GiftCart/ShipGiftCard OMS command was invoked and customer received an email with the generated gift card code once the order is placed.</li></ul>Note: You need to complete Feature Frontend integration before you can verify these points.
{% endinfo_block %}

#### Gift Card Code Usage Process

{% info_block infoBox "Info" %}
In this step, you'll enable purchasing with existing gift cards in your project.
{% endinfo_block %}

Add the following plugins to your project:

| Plugin | Specification |Prerequisites  |Namespace  |
| --- | --- | --- | --- |
|`GiftCardCartCodePlugin`  | Manages adding and removing gift card code from a quote. | - | `Spryker\Client\GiftCard\Plugin\CartCode` |
| `GiftCardBalanceValueProviderPlugin` | Calculates the remaining balance of a gift card based on its usage history and returns its value. | - |`Spryker\Zed\GiftCardBalance\Communication\Plugin` |
| `BalanceTransactionLogPaymentSaverPlugin` |Logs a gift card payment transaction.  | - | `Spryker\Zed\GiftCardBalance\Communication\Plugin` |
| `BalanceCheckerApplicabilityPlugin` |  Calculates the remaining balance of a gift card based on its usage history and checks if the balance is positive.|-  | `Spryker\Zed\GiftCardBalance\Communication\Plugin` |
| `SendEmailToGiftCardUser` | Sends usage email notification to the user of the gift card. | - |`Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Checkout`  |
|`GiftCardUsageMailTypePlugin`  | Provides a mail type for sending gift card usage information emails. | - |  `Spryker\Zed\GiftCardMailConnector\Communication\Plugin\Mail`|
|`PriceToPayPaymentMethodFilterPlugin`  | Filters available payment methods based on the price-to-pay value of the quote. | - |`Spryker\Zed\Nopayment\Communication\Plugin\Payment`  |
| `GiftCardPaymentMethodFilterPlugin` | Filters blacklisted payment methods in case the quote contains a gift card to be purchased. |-  | `Spryker\Zed\GiftCard\Communication\Plugin` |
| `GiftCardPreCheckPlugin` | Checks if a gift card payment method value is not bigger than the rest of the gift card value to be used to pay. | - | `Spryker\Zed\GiftCard\Communication\Plugin`|
| `GiftCardOrderSaverPlugin`| Saves a gift card payment to the database when an order is placed. | - | `Spryker\Zed\GiftCard\Communication\Plugin`| 
|`NopaymentPreCheckPlugin`| Checks if a "Nopayment" payment method is allowed to be used. | - | `Spryker\Zed\Nopayment\Communication\Plugin\Checkout`|

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
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPostSaveHookInterface[]
     */
    protected function getCheckoutPostHooks(Container $container)
    {
        return [
            new SendEmailToGiftCardUser(),
        ];
    }
}
```

**src/Pyz/Zed/GiftCard/GiftCardDependencyProvider.php**

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
 
use Spryker\Shared\Nopayment\NopaymentConfig as SprykerNopaymentConfig;
use Spryker\Zed\GiftCard\Communication\Plugin\GiftCardOrderSaverPlugin;
use Spryker\Zed\GiftCard\Communication\Plugin\GiftCardPaymentMethodFilterPlugin;
use Spryker\Zed\GiftCard\Communication\Plugin\GiftCardPreCheckPlugin;
use Spryker\Zed\GiftCard\GiftCardConfig as SprykerGiftCardConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Nopayment\Communication\Plugin\Checkout\NopaymentPreCheckPlugin;
use Spryker\Zed\Nopayment\Communication\Plugin\Payment\PriceToPayPaymentMethodFilterPlugin;
use Spryker\Zed\Payment\Dependency\Plugin\Checkout\CheckoutPluginCollectionInterface;
use Spryker\Zed\Payment\PaymentDependencyProvider as SprykerPaymentDependencyProvider;
 
class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->extendPaymentPlugins($container);
 
        return $container;
    }
 
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
 
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendPaymentPlugins(Container $container): Container
    {
        $container->extend(
            PaymentDependencyProvider::CHECKOUT_PLUGINS,
            function (CheckoutPluginCollectionInterface $pluginCollection) {
                $pluginCollection->add(
                    new GiftCardPreCheckPlugin(),
                    SprykerGiftCardConfig::PROVIDER_NAME,
                    PaymentDependencyProvider::CHECKOUT_PRE_CHECK_PLUGINS
                );
 
                $pluginCollection->add(
                    new GiftCardOrderSaverPlugin(),
                    SprykerGiftCardConfig::PROVIDER_NAME,
                    PaymentDependencyProvider::CHECKOUT_ORDER_SAVER_PLUGINS
                );
 
                $pluginCollection->add(
                    new NopaymentPreCheckPlugin(),
                    SprykerNopaymentConfig::PAYMENT_PROVIDER_NAME,
                    PaymentDependencyProvider::CHECKOUT_ORDER_SAVER_PLUGINS
                );
 
                return $pluginCollection;
            }
        );
 
        return $container;
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that:<ul><li>You can activate a gift card using its generated code.</li><li>You can't activate a gift card the balance of which has been depleted.</li><li>During the checkout process, payment method selection is skipped in case the gift card covers the grand total.</li><li>Having made a successful purchase with the help of a gift card, you receive a gift card balance notification e-mail.</li></ul>Note: You need to complete Feature Frontend integration before you can verify these points.
{% endinfo_block %}

## Install Feature Frontend

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 202009.0 |
| Cart | 202009.0 |
| Checkout | 202009.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/gift-cards:"^202009.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`CartCodeWidget`</td><td>`vendor/spryker-shop/cart-code-widget`</td></tr><tr><td>`GiftCardWidget`</td><td>`vendor/spryker-shop/gift-card-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Configuration
Extend your project with the following configuration.

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
Make sure to have "nopayment" payment method successfully selected when you cover an entire order with a gift card.
{% endinfo_block %}

### 2) Add Translations
Append glossary according to your configuration:

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

Run the following command(s) to apply glossary keys:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}
Make sure that, in the database, the configured data has been added to the `spy_glossary` table.
{% endinfo_block %}

### 3) Set up Widgets
Register the following global widget(s):

| Widget | Specification | Namespace |
| --- | --- | --- |
| `CartCodeFormWidget` |Provides a cart code activation form.  | `SprykerShop\Yves\CartCodeWidget\Widget` |

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
Make sure that the widget is displayed on the Cart page and the Summary page of the Checkout process. 
{% endinfo_block %}

### 4) Enable Controllers
#### Route List

Register the following route provider plugins:

| Provider | Namespace |
| --- | --- | 
| `CartCodeWidgetRouteProviderPlugin` | `SprykerShop\Yves\CartCodeWidget\Plugin\Router` |

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
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that a valid gift card code can be added and removed from the cart by submitting the cart code form (activated by the previous step
{% endinfo_block %}.)
