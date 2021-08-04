---
title: Inxmail
originalLink: https://documentation.spryker.com/2021080/docs/inxmail
redirect_from:
  - /2021080/docs/inxmail
  - /2021080/docs/en/inxmail
---

## Partner Information
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Marketing+%26+Conversion/inxmail_logo.png){height="" width=""}

[ABOUT INXMAIL](https://www.inxmail.com)
With nearly 20 years of experience, we are a pioneer in software development for email marketing. We support our customers and partners with fantastic service and grow their potential in a targeted way. In doing so, we draw upon a broad range of technology and services.Our solutions are influenced by our strong relationships with customers. We flexibly adapt our solutions to meet specific customer needs. Expertise that pays off: We have been implementing successful email marketing and multichannel campaigns for over 2,000 customers in more than 20 countries since 1999. 

YOUR ADVANTAGES:

* Broad portfolio of technology, service and know-how - from the standard solution to individual solution packages
* E-mail delivery solutions for highly personalized newsletters, transaction mails, and automated e-mail campaigns
* Delivery security via whitelisted mail server even with high mail volumes
* Powerful interfaces for seamless integration into existing system landscapes
* Software made and hosted in Germany
* DSGVO-compliant e-mail marketing
* Co-founder and member of the Certified Senders Alliance (CSA)
* Award Winning: Competent, Fast and Reliable Customer Service and Support
* Personal advice and contact person 

## Installation

To install Inxmail run the command in the console:
```php
 composer require spryker-eco/inxmail:1.1.0
 ```

## Configuration

{% info_block infoBox %}

The module supports only a subset of Inxmail REST API—transactional emails (events). 

{% endinfo_block %}
To set up the Inxmail initial configuration, use the credentials you received from your Inxmail server. Key ID and secret you can get from Settings → API keys panel on Inxmail server:
```php
 $config[InxmailConstants::API_EVENT_URL] = '';
 $config[InxmailConstants::KEY_ID] = '';
 $config[InxmailConstants::SECRET] = '';
 ```

Event names depend on your events names on Inxmail server:
```php
 $config[InxmailConstants::EVENT_CUSTOMER_REGISTRATION] = '';
 $config[InxmailConstants::EVENT_CUSTOMER_RESET_PASSWORD] = '';
 $config[InxmailConstants::EVENT_ORDER_NEW] = '';
 $config[InxmailConstants::EVENT_ORDER_SHIPPING_CONFIRMATION] = '';
 $config[InxmailConstants::EVENT_ORDER_CANCELLED] = '';
 $config[InxmailConstants::EVENT_ORDER_PAYMENT_IS_NOT_RECEIVED] = '';
 ```

## Integration

### New customer registration event

Inxmail module has `\SprykerEco\Zed\Inxmail\Communication\Plugin\Customer\InxmailPostCustomerRegistrationPlugin`. This plugin implements `PostCustomerRegistrationPluginInterface` and can be used in `\Pyz\Zed\Customer\CustomerDependencyProvider::getPostCustomerRegistrationPlugins.`

```php
 ...
 use SprykerEco\Zed\Inxmail\Communication\Plugin\Customer\InxmailPostCustomerRegistrationPlugin
 ...

 /**
 * @return \Spryker\Zed\CustomerExtension\Dependency\Plugin\PostCustomerRegistrationPluginInterface[]
 */
 protected function getPostCustomerRegistrationPlugins(): array
 {
 return [
 ...
 new InxmailPostCustomerRegistrationPlugin(),
 ...
 ];
 }
 ```

### The customer asked to reset password event

Inxmail module has `\SprykerEco\Zed\Inxmail\Communication\Plugin\Customer\InxmailCustomerRestorePasswordMailTypePlugin`. This plugin implements `MailTypePluginInterface` and can be used in `\Pyz\Zed\Mail\MailDependencyProvider::provideBusinessLayerDependencies`

```php
 ...
 use \SprykerEco\Zed\Inxmail\Communication\Plugin\Customer\InxmailCustomerRestorePasswordMailTypePlugin;
 ...

 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Kernel\Container
 */
 public function provideBusinessLayerDependencies(Container $container)
 {
 $container = parent::provideBusinessLayerDependencies($container);

 $container->extend(self::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
 $mailCollection
 ...
 ->add(new InxmailCustomerRestorePasswordMailTypePlugin())
 ...

 return $mailCollection;
 });

 ...

 return $container;
 }
 ```

### Order Referenced Commands

Inxmail module has four different commands:

* `\SprykerEco\Zed\Inxmail\Communication\Plugin\Oms\Command\InxmailNewOrderPlugin`
* `\SprykerEco\Zed\Inxmail\Communication\Plugin\Oms\Command\InxmailOrderCanceledPlugin`
* `\SprykerEco\Zed\Inxmail\Communication\Plugin\Oms\Command\InxmailPaymentNotReceivedPlugin`
* `\SprykerEco\Zed\Inxmail\Communication\Plugin\Oms\Command\InxmailShippingConfirmationPlugin`

You can use this commands in `\Pyz\Zed\Oms\OmsDependencyProvider::getCommandPlugins`
```php
 ...
 use SprykerEco\Zed\Inxmail\Communication\Plugin\Oms\Command\InxmailNewOrderPlugin;
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
 $collection->add(new InxmailNewOrderPlugin(), 'Inxmail/SendNewOrderRequest');
 ...

 return $collection;
 }
 ```

After that you are ready to use commands in OMS setup:
```php
 <events>
 <event name="authorize" onEnter="true" manual="true" command="Inxmail/SendNewOrderRequest"/>
 <event name="pay" manual="true" timeout="1 hour" />
 <event name="export" onEnter="true" manual="true" command="Oms/SendOrderConfirmation"/>
 <event name="ship" manual="true" command="Oms/SendOrderShipped"/>
 <event name="stock-update" manual="true"/>
 <event name="close" manual="true" timeout="1 hour"/>
 <event name="return" manual="true" />
 </events>
 ```

## API Requests

`\SprykerEco\Zed\Inxmail\Business\Api\Adapter\EventAdapter` which extend `\SprykerEco\Zed\Inxmail\Business\Api\Adapter\AbstractAdapter` contains all needed data for sending data to Inxmail for events.

It sends the request via `&#xA0;\Generated\Shared\Transfer\InxmailRequestTransfer`
```xml
 <?xml version="1.0"?>
 <transfers xmlns="http://xsd.spryker.com"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://static.spryker.com http://static.spryker.com/transfer-01.xsd">

 <transfer name="InxmailRequest">
 <property name="event" type="string" />
 <property name="transactionId" type="string" />
 <property name="payload" type="array" />
 </transfer>

 </transfers>
 ```

The payload for customer loads from `\SprykerEco\Zed\Inxmail\Business\Mapper\Customer\AbstractCustomerMapper::getPayload` and for order from `\SprykerEco\Zed\Inxmail\Business\Mapper\Order\AbstractOrderMapper`. Abstract classes can be extended and changed in `\SprykerEco\Zed\Inxmail\Business\InxmailBusinessFactory.`

For right URL's to images in the email body you should extend `\SprykerEco\Zed\Inxmail\Business\Mapper\Order\AbstractOrderMapper` and implement protected method `getImageItemLink(ArrayObject $images)`.

---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>

