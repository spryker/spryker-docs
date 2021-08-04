---
title: Seven Senders
originalLink: https://documentation.spryker.com/v3/docs/sevensenders
redirect_from:
  - /v3/docs/sevensenders
  - /v3/docs/en/sevensenders
---

## Partner Information

[ABOUT SEVEN SENDERS](https://www.sevensenders.com/)
SEVEN SENDERS optimizes international cross-border shipments by serving as Europe's Leading Delivery Platform. We unite online retailers of all sizes with local premium carriers abroad, thereby achieving faster and cheaper delivery for customers worldwide. In addition, we offer the SaaS-based solution SENDWISE, that brings full transparency into the international parcel flow, offers seamless tracking and a proactive communication with the end customer to provide a unique shopping experience. 

YOUR ADVANTAGES: 

* Seamless integration into the services offered by SEVEN SENDERS
* Full control over the customer experience during the delivery process
* Proactively creating the customer journey during delivery
* Tracking page in the shop design - in no time and without IT support
* Direct delivery updates to the customer: the right information at the right time
* 25% reduction of customer service efforts through proactive customer communication
* Harmonization of shipment data including all shipping providers and warehouse locations
* Access to all premium parcel delivery providers through one platform
* Multi-carrier solution: the optimal carrier for each parcel
* Straightforward connection to the own online shop through our APIs and partner plugins 

## Installation

To install Seven Senders, run the command in the console:
```bash
composer require spryker-eco/sevensenders:1.0.0
```

## Configuration

To set up the Seven Senders initial configuration, use the credentials you received from your Seven Senders server. Space id, key id and secret you can get from Settings → API keys panel on Seven Senders server:
```php
$config[SevensendersConstants::API_KEY] = '';
$config[SevensendersConstants::API_URL] = '';
```

## Integration

### Oms Commands

Seven Senders module has two different commands:

* `\SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Command\SevensendersOrderPlugin`
* `\SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Command\SevensendersShipmentPlugin`

You can use this commands in `\Pyz\Zed\Oms\OmsDependencyProvider::getCommandPlugins`
```php
...
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\SendOrderConfirmationPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\SendOrderShippedPlugin;
...

/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandCollection
 */
protected function getCommandPlugins(Container $container)
{
 $collection = parent::getCommandPlugins($container);

 ...
 $collection->add(new SevenordersOrderPlugin(), 'Sevensenders/NewOrder');
 $collection->add(new SevenordersShipmentPlugin(), 'Sevensenders/NewShipment');
 ...

 return $collection;
}
```

After you are ready to use commands in OMS setup:
```xml
<events>
 <event name="shipping_confirmed" onEnter="true" command="Sevensenders/NewOrder"/>
 <event name="shipping_delivered" manual="true" command="Sevensenders/NewShipment"/>
</events>
```

### Oms Conditions

Sevensenders module has two different conditions:

* `SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Condition\IsSuccessfulPreviousOrderResponseConditionPlugin`
* `SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Condition\IsSuccessfulPreviousShipmentResponseConditionPlugin`

You can use these commands in `\Pyz\Zed\Oms\OmsDependencyProvider::getConditionPlugins`
```php
...
use SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Condition\IsSuccessfulPreviousOrderResponseConditionPlugin;
use SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Condition\IsSuccessfulPreviousShipmentResponseConditionPlugin;
...

/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\ConditionCollection
 */
protected function getConditionPlugins(Container $container)
{
 $collection = parent::getConditionPlugins($container);

 ...
 $collection->add(new IsSuccessfulPreviousOrderResponseConditionPlugin(), 'Sevensenders/IsSuccessfulResponse');
 $collection->add(new IsSuccessfulPreviousShipmentResponseConditionPlugin(), 'Sevensenders/IsSuccessfulResponse');
 ...

 return $collection;
}
```

After you are ready to use commands in OMS setup:
```xml
<transition happy="true" condition="Sevensenders/IsSuccessfulResponse">
 <source>new</source>
 <target>shipping confirmed</target>
 <event>shipping_confirmed</event>
</transition>
```

## API Requests

`\SprykerEco\Zed\Inxmail\Business\Api\Adapter\EventAdapter` extending `\SprykerEco\Zed\Sevensenders\Business\Api\Adapter\SevensendersApiAdapter` contains everything for sending data to Seven Senders system for events.

You should use `\Generated\Shared\Transfer\SevensendersRequestTransfer` for request and `\Generated\Shared\Transfer\SevensendersResponseTransfer`
```xml
<?xml version="1.0"?>
<transfers xmlns="http://xsd.spryker.com"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://static.spryker.com http://static.spryker.com/transfer-01.xsd">

 <transfer name="SevensendersRequest">
 <property name="payload" type="array"/>
 </transfer>

 <transfer name="SevensendersResponse">
 <property name="requestPayload" type="array"/>
 <property name="responsePayload" type="array"/>
 <property name="status" type="int"/>
 <property name="status" type="int"/>
 </transfer>
</transfers>
```

## Mappers

For mapping data from Spryker to Seven Senders `\SprykerEco\Zed\Sevensenders\Business\Mapper\OrderMapper` and `\SprykerEco\Zed\Sevensenders\Business\Mapper\ShipmentMapper` are used by default.
```php
<?php

namespace SprykerEco\Zed\Sevensenders\Business\Mapper;

use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\SevensendersRequestTransfer;

class OrderMapper implements MapperInterface
{
 /**
 * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
 *
 * @return \Generated\Shared\Transfer\SevensendersRequestTransfer
 */
 public function map(OrderTransfer $orderTransfer): SevensendersRequestTransfer
 {
 $payload = [
 'order_id' => (string)$orderTransfer->getIdSalesOrder(),
 'order_url' => '',
 'order_date' => $orderTransfer->getCreatedAt(),
 'delivered_with_seven_senders' => true,
 'boarding_complete' => true,
 'language' => $orderTransfer->getLocale() ? $orderTransfer->getLocale()->getLocaleName() : '',
 'promised_delivery_date' => $orderTransfer->getShipmentDeliveryTime(),
 ];

 $transfer = new SevensendersRequestTransfer();
 $transfer->setPayload($payload);

 return $transfer;
 }
}

```

You can extend `OrderMapper` on the project level and map fields as you need. If you want to create a new mapper you should implement `SprykerEco\Zed\Sevensenders\Business\Mapper\MapperInterface`.

## Persistence layer

There is a table in the database for saving response and request data:

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 name="zed"
 xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
 namespace="Orm\Zed\Sevensenders\Persistence"
 package="src.Orm.Zed.Sevensenders.Persistence">

 <table name="spy_sevensenders_response" idMethod="native">
 <column name="fk_sales_order" type="INTEGER" required="true" primaryKey="true"/>
 <column name="request_payload" type="LONGVARCHAR" required="true"/>
 <column name="resource_type" type="VARCHAR" required="true" primaryKey="true"/>
 <column name="response_payload" type="LONGVARCHAR" required="true"/>
 <column name="response_status" type="INTEGER" required="true"/>
 <column name="iri" type="VARCHAR" required="true"/>

 <unique name="spy_sevensenders_request-order_reference">
 <unique-column name="fk_sales_order"/>
 <unique-column name="resource_type"/>
 </unique>

 <foreign-key name="spy_sevensenders_request-fk_sales_order" foreignTable="spy_sales_order" phpName="SalesOrder">
 <reference local="fk_sales_order" foreign="id_sales_order"/>
 </foreign-key>
 </table>

 <table name="spy_sevensenders_token" idMethod="native">
 <column name="token" type="VARCHAR" required="true"/>
 <column name="created_at" type="VARCHARv required="true"/>
 </table>
</database>
```

---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-forms hubspot-forms--docs">
<div class="hubspot-form" id="hubspot-partners-1">
            <div class="script-embed" data-code="
                                            hbspt.forms.create({
				                                portalId: '2770802',
				                                formId: '163e11fb-e833-4638-86ae-a2ca4b929a41',
              	                                onFormReady: function() {
              		                                const hbsptInit = new CustomEvent('hbsptInit', {bubbles: true});
              		                                document.querySelector('#hubspot-partners-1').dispatchEvent(hbsptInit);
              	                                }
				                            });
            "></div>
</div>
</div>
