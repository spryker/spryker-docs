---
title: Episerver - Installation and Configuration
originalLink: https://documentation.spryker.com/v2/docs/episerver-installation-and-configuration
redirect_from:
  - /v2/docs/episerver-installation-and-configuration
  - /v2/docs/en/episerver-installation-and-configuration
---

## Installation

To install Episerver, run the command in the console:
```php
composer require spryker-eco/episerver
```

## Configuration

To set up the Episerver initial configuration, use the credentials received from your Episerver admin page.

The `REQUEST_BASE_URL` parameter should be: `https://api.campaign.episerver.net/`

To get `ORDER_LIST_AUTHORIZATION_CODE` or `CUSTOMER_LIST_AUTHORIZATION_CODE`, go to:

<i>Menu → API overview → SOAP API → Recipient lists → (Click one of your lists here) → Manage authorization codes → Authorization code</i>

To get any `...MAILING_ID`, go to:

<b>Menu → Transactional mails → ID</b>

```php
$config[EpiserverConstants::REQUEST_BASE_URL] = 'https://api.campaign.episerver.net/';
$config[EpiserverConstants::REQUEST_TIMEOUT] = 30;

$config[EpiserverConstants::ORDER_LIST_AUTHORIZATION_CODE] = 'QJd9U0M9xssRGhnJrNr5ztt9FQa2x1wA';
$config[EpiserverConstants::CUSTOMER_LIST_AUTHORIZATION_CODE] = 'QJd9U0M9xssRGhnJrNr5ztt9FQa2x1wA';

$config[EpiserverConstants::ORDER_NEW_MAILING_ID] = '237667360304';
$config[EpiserverConstants::ORDER_CANCELLED_MAILING_ID] = '237667360304';
$config[EpiserverConstants::ORDER_SHIPPING_CONFIRMATION_MAILING_ID] = '237667360304';
$config[EpiserverConstants::ORDER_PAYMENT_IS_NOT_RECEIVED_MAILING_ID] = '237667360304';

$config[EpiserverConstants::EPISERVER_CONFIGURATION_MAILING_ID_LIST] = [
 CustomerRegistrationMailTypePlugin::MAIL_TYPE => '243323625271',
 CustomerRestoredPasswordConfirmationMailTypePlugin::MAIL_TYPE => '243646188958',
 CustomerRestorePasswordMailTypePlugin::MAIL_TYPE => '243646188953',
];
```

## Installation

### Customer Registration / Reset Password / Reset Rassword Confirm Event

The Episerver module has `SprykerEco\Zed\Episerver\Communication\Plugin\Customer\EpiserverCustomerMailPlugin`.

To use it,  set up `provideBusinessLayerDependencies` in the class `Pyz\Zed\Mail\MailDependencyProvider`, for example:
<details open>
<summary>MailDependencyProvider</summary>

```php
 ->addProvider(new EpiserverCustomerMailPlugin(), [
 CustomerRegistrationMailTypePlugin::MAIL_TYPE,
 CustomerRestoredPasswordConfirmationMailTypePlugin::MAIL_TYPE,
 CustomerRestorePasswordMailTypePlugin::MAIL_TYPE,
])
```
<br>
</details>

### Customer (Un)Subscribe For Newsletter

The Episerver module has `\SprykerEco\Zed\Episerver\Business\Mapper\Customer\CustomerNewsletterMapper`.

To use it, set up `provideBusinessLayerDependencies` in the class `Pyz\Zed\Mail\MailDependencyProvider`, for example:

<details open>
<summary>MailDependencyProvider</summary>

```php
->addProvider(new EpiserverNewsletterSubscriptionMailPlugin(), [
 NewsletterSubscribedMailTypePlugin::MAIL_TYPE,
 NewsletterUnsubscribedMailTypePlugin::MAIL_TYPE,
 CustomerChangeProfileMailTypePlugin::MAIL_TYPE,
])
```
<br>
</details>

Add a page for (un)subscribing on your site's side. To complete it, first you need a controller:
<details open>
<summary>NewsletterController</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\NewsletterPage\Controller;
use Generated\Shared\Transfer\NewsletterSubscriberTransfer;
use Generated\Shared\Transfer\NewsletterSubscriptionRequestTransfer;
use Generated\Shared\Transfer\NewsletterTypeTransfer;
use Spryker\Shared\Newsletter\NewsletterConstants;
use SprykerShop\Yves\NewsletterPage\Controller\NewsletterController as SprykerNewsletterController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
/**
 * @method \Pyz\Yves\NewsletterPage\NewsletterPageFactory getFactory()
 */
class NewsletterController extends SprykerNewsletterController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Spryker\Yves\Kernel\View\View
     */
    public function successAction(Request $request)
    {
        $subscriberKey = $request->query->get('id', '');
        if ($subscriberKey === '') {
            return new RedirectResponse('/');
        }
        $newsletterSubscriber = new NewsletterSubscriberTransfer();
        $newsletterSubscriber->setSubscriberKey($subscriberKey);
        $newsletterSubscriptionApprovalResultTransfer = $this->getFactory()
            ->getNewsletterSubscriptionClient()
            ->approveDoubleOptInSubscriber($newsletterSubscriber);
        if ($newsletterSubscriptionApprovalResultTransfer->getIsSuccess() === false) {
            return new RedirectResponse('/');
        }
        return $this->view([], [], '@NewsletterPage/views/subscription-success/subscription-success.twig');
    }
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Spryker\Yves\Kernel\View\View
     */
    public function unsubscribeAction(Request $request)
    {
        $subscriberKey = $request->query->get('id', '');
        if ($subscriberKey === '') {
            return new RedirectResponse('/');
        }
        $newsletterSubscriberTransfer = new NewsletterSubscriberTransfer();
        $newsletterSubscriberTransfer->setSubscriberKey($subscriberKey);
        $newsletterSubscriptionRequestTransfer = new NewsletterSubscriptionRequestTransfer();
        $newsletterSubscriptionRequestTransfer->setNewsletterSubscriber($newsletterSubscriberTransfer);
        $newsletterSubscriptionRequestTransfer->addSubscriptionType((new NewsletterTypeTransfer())
            ->setName(NewsletterConstants::DEFAULT_NEWSLETTER_TYPE));
        $newsletterSubscriptionResponseTransfer = $this->getFactory()
            ->getNewsletterSubscriptionClient()
            ->unsubscribe($newsletterSubscriptionRequestTransfer);
        if ($newsletterSubscriptionResponseTransfer->getSubscriptionResults()[0]->getIsSuccess() === false) {
            return new RedirectResponse('/');
        }
        return $this->view([], [], '@NewsletterPage/views/unsubscription-success/unsubscription-success.twig');
    }
}
```
<br>
</details>

Expand the factory like this:

<details open>
<summary>NewsletterPageFactory</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\NewsletterPage;
use Pyz\Yves\NewsletterPage\Dependency\Client\NewsletterPageToNewsletterClientInterface;
use SprykerShop\Yves\NewsletterPage\NewsletterPageFactory as SprykerNewsletterPageFactory;
class NewsletterPageFactory extends SprykerNewsletterPageFactory
{
    /**
     * @return \Pyz\Yves\NewsletterPage\Dependency\Client\NewsletterPageToNewsletterClientInterface
     */
    public function getNewsletterSubscriptionClient(): NewsletterPageToNewsletterClientInterface
    {
        return $this->getProvidedDependency(NewsletterPageDependencyProvider::CLIENT_NEWSLETTER_SUBSCRIPTION);
    }
}
```
<br>
</details>

`CLIENT_NEWSLETTER_SUBSCRIPTION` should be defined like this:
<details open>
<summary>NewsletterPageDependencyProvider</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\NewsletterPage;
use Pyz\Yves\NewsletterPage\Dependency\Client\NewsletterPageToNewsletterClientBridge;
use Spryker\Yves\Kernel\Container;
use SprykerShop\Yves\NewsletterPage\NewsletterPageDependencyProvider as SprykerNewsletterPageDependencyProvider;
class NewsletterPageDependencyProvider extends SprykerNewsletterPageDependencyProvider
{
    public const CLIENT_NEWSLETTER_SUBSCRIPTION = 'CLIENT_NEWSLETTER_SUBSCRIPTION';
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = $this->addNewsletterClient($container);
        $container = $this->addCustomerClient($container);
        $container = $this->addNewsletterSubscriptionClient($container);
        return $container;
    }
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addNewsletterSubscriptionClient(Container $container)
    {
        $container[static::CLIENT_NEWSLETTER_SUBSCRIPTION] = function (Container $container) {
            return new NewsletterPageToNewsletterClientBridge($container->getLocator()->newsletter()->client());
        };
        return $container;
    }
}
```
<br>
</details>

Prepare `NewsletterPageToNewsletterClientBridge`:

<details open>
<summary>NewsletterPageToNewsletterClientBridge</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\NewsletterPage\Dependency\Client;
use Generated\Shared\Transfer\NewsletterSubscriberTransfer;
use Generated\Shared\Transfer\NewsletterSubscriptionApprovalResultTransfer;
use SprykerShop\Yves\NewsletterPage\Dependency\Client\NewsletterPageToNewsletterClientBridge as SprykerNewsletterPageToNewsletterClientBridge;
class NewsletterPageToNewsletterClientBridge extends SprykerNewsletterPageToNewsletterClientBridge implements NewsletterPageToNewsletterClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\NewsletterSubscriberTransfer $newsletterSubscriber
     *
     * @return \Generated\Shared\Transfer\NewsletterSubscriptionApprovalResultTransfer
     */
    public function approveDoubleOptInSubscriber(NewsletterSubscriberTransfer $newsletterSubscriber): NewsletterSubscriptionApprovalResultTransfer
    {
        return $this->newsletterClient->approveDoubleOptInSubscriber($newsletterSubscriber);
    }
}
```
<br>
</details>

And a contract for it:

<details open>
<summary>NewsletterPageToNewsletterClientInterface</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\NewsletterPage\Dependency\Client;
use Generated\Shared\Transfer\NewsletterSubscriberTransfer;
use Generated\Shared\Transfer\NewsletterSubscriptionApprovalResultTransfer;
use SprykerShop\Yves\NewsletterPage\Dependency\Client\NewsletterPageToNewsletterClientInterface as SprykerNewsletterPageToNewsletterClientInterface;
interface NewsletterPageToNewsletterClientInterface extends SprykerNewsletterPageToNewsletterClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\NewsletterSubscriberTransfer $newsletterSubscriber
     *
     * @return \Generated\Shared\Transfer\NewsletterSubscriptionApprovalResultTransfer
     */
    public function approveDoubleOptInSubscriber(NewsletterSubscriberTransfer $newsletterSubscriber): NewsletterSubscriptionApprovalResultTransfer;
}
```
<br>
</details>

Create a route for our controller. Here's an example:

<details open>
<summary>NewsletterPageControllerProvider</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\NewsletterPage\Plugin\Provider;
use Silex\Application;
use SprykerShop\Yves\NewsletterPage\Plugin\Provider\NewsletterPageControllerProvider as SprykerNewsletterPageControllerProvider;
class NewsletterPageControllerProvider extends SprykerNewsletterPageControllerProvider
{
    public const ROUTE_CUSTOMER_SUBSCRIBE = 'newsletter-success';
    public const ROUTE_CUSTOMER_UNSUBSCRIBE = 'newsletter-unsubscribe';
    /**
     * @param \Silex\Application $app
     *
     * @return void
     */
    protected function defineControllers(Application $app): void
    {
        $this
            ->addNewsletterRoute()
            ->addUnsubscriptionSuccessRoute()
            ->addSubscriptionSuccessRoute();
    }
    /**
     * @return $this
     */
    protected function addUnsubscriptionSuccessRoute()
    {
        $this->createController('/{newsletter}/unsubscribe', self::ROUTE_CUSTOMER_SUBSCRIBE, 'NewsletterPage', 'Newsletter', 'unsubscribe')
            ->assert('newsletter', $this->getAllowedLocalesPattern() . 'newsletter|newsletter')
            ->value('newsletter', 'newsletter')
            ->method('GET|POST');
        return $this;
    }
    /**
     * @return $this
     */
    protected function addSubscriptionSuccessRoute()
    {
        $this->createController('/{newsletter}/success', self::ROUTE_CUSTOMER_UNSUBSCRIBE, 'NewsletterPage', 'Newsletter', 'success')
            ->assert('newsletter', $this->getAllowedLocalesPattern() . 'newsletter|newsletter')
            ->value('newsletter', 'newsletter')
            ->method('GET|POST');
        return $this;
    }
}
```
<br>
</details>

A small template for a subscription:

<details open>
<summary>subscription-success</summary>

```html
{% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define data = {
    title: 'newsletter.subscription.success' | trans
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block pageInfo {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    <div class="box">
        <h4>{% raw %}{{{% endraw %}data.title{% raw %}}}{% endraw %}</h4>
    </div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
<br>
</details>

And the second one is almost the same:

<details open>
<summary>unsubscription-success</summary>

```html
{% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define data = {
    title: 'newsletter.unsubscription.success' | trans
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block pageInfo {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    <div class="box">
        <h4>{% raw %}{{{% endraw %}data.title{% raw %}}}{% endraw %}</h4>
    </div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
<br>
</details>

### Update User Data

In case you want to change user data on the Episerver side, you need to extend the Customer model

<details open>
<summary>Customer</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Zed\Customer\Business\Customer;
use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\MailTransfer;
use Pyz\Zed\Customer\Communication\Plugin\Mail\CustomerChangeProfileMailTypePlugin;
use Spryker\Zed\Customer\Business\Customer\Customer as SprykerCustomer;
class Customer extends SprykerCustomer
{
    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerResponseTransfer
     */
    public function update(CustomerTransfer $customerTransfer)
    {
        if (!empty($customerTransfer->getNewPassword())) {
            $customerResponseTransfer = $this->updatePassword(clone $customerTransfer);
            if ($customerResponseTransfer->getIsSuccess() === false) {
                return $customerResponseTransfer;
            }
        }
        $customerResponseTransfer = $this->createCustomerResponseTransfer();
        $customerResponseTransfer->setCustomerTransfer($customerTransfer);
        $customerEntity = $this->getCustomer($customerTransfer);
        $customerEntity->fromArray($customerTransfer->modifiedToArray());
        if ($customerTransfer->getLocale() !== null) {
            $this->addLocaleByLocaleName($customerEntity, $customerTransfer->getLocale()->getLocaleName());
        }
        $customerResponseTransfer = $this->validateCustomerEmail($customerResponseTransfer, $customerEntity);
        if (!$customerEntity->isModified() || $customerResponseTransfer->getIsSuccess() !== true) {
            return $customerResponseTransfer;
        }
        $customerEntity->save();
        $this->sendCustomerProfileUpdateMail($customerTransfer);
        if ($customerTransfer->getSendPasswordToken()) {
            $this->sendPasswordRestoreMail($customerTransfer);
        }
        return $customerResponseTransfer;
    }
    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return void
     */
    private function sendCustomerProfileUpdateMail(CustomerTransfer $customerTransfer): void
    {
        $mailTransfer = new MailTransfer();
        $mailTransfer->setType(CustomerChangeProfileMailTypePlugin::MAIL_TYPE);
        $mailTransfer->setCustomer($customerTransfer);
        $mailTransfer->setLocale($customerTransfer->getLocale());
        $this->mailFacade->handleMail($mailTransfer);
    }
}
```
<br>
</details>

Set up a factory for the Customer module on the project level

<details open>
<summary>CustomerBusinessFactory</summary>
```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Zed\Customer\Business;
use Pyz\Zed\Customer\Business\Customer\Customer;
use Spryker\Zed\Customer\Business\Customer\CustomerInterface;
use Spryker\Zed\Customer\Business\CustomerBusinessFactory as SprykerCustomerBusinessFactory;
/**
 * @method \Spryker\Zed\Customer\CustomerConfig getConfig()
 * @method \Spryker\Zed\Customer\Persistence\CustomerQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Customer\Persistence\CustomerEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\Customer\Persistence\CustomerRepositoryInterface getRepository()
 */
class CustomerBusinessFactory extends SprykerCustomerBusinessFactory
{
    /**
     * @return \Spryker\Zed\Customer\Business\Customer\CustomerInterface
     */
    public function createCustomer(): CustomerInterface
    {
        return new Customer(
            $this->getQueryContainer(),
            $this->createCustomerReferenceGenerator(),
            $this->getConfig(),
            $this->createEmailValidator(),
            $this->getMailFacade(),
            $this->getLocaleQueryContainer(),
            $this->getStore(),
            $this->createCustomerExpander(),
            $this->getPostCustomerRegistrationPlugins()
        );
    }
}
```
<br>
</details>

Create one more mail plugin for Customer on data changing (without a body)

<details open>
<summary>CustomerChangeProfileMailTypePlugin</summary>

```phph
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Zed\Customer\Communication\Plugin\Mail;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface;
use Spryker\Zed\Mail\Dependency\Plugin\MailTypePluginInterface;
/**
 * @method \Spryker\Zed\Customer\Business\CustomerFacadeInterface getFacade()
 * @method \Spryker\Zed\Customer\Communication\CustomerCommunicationFactory getFactory()
 * @method \Spryker\Zed\Customer\CustomerConfig getConfig()
 * @method \Spryker\Zed\Customer\Persistence\CustomerQueryContainerInterface getQueryContainer()
 */
class CustomerChangeProfileMailTypePlugin extends AbstractPlugin implements MailTypePluginInterface
{
    public const MAIL_TYPE = 'customer change profile';
    /**
     * @api
     *
     * @return string
     */
    public function getName(): string
    {
        return static::MAIL_TYPE;
    }
    /**
     * @api
     *
     * @param \Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface $mailBuilder
     *
     * @return void
     */
    public function build(MailBuilderInterface $mailBuilder): void
    {
    }
}
```
<br>
</details>

And add it to `MailDependencyProvider`:
```php
$container->extend(self::MAIL_PROVIDER_COLLECTION, function (MailProviderCollectionAddInterface $mailProviderCollection) {
    $mailProviderCollection
        ...
        ->addProvider(new EpiserverNewsletterSubscriptionMailPlugin(), [
            ...
            CustomerChangeProfileMailTypePlugin::MAIL_TYPE,
            ...
        ]);
    return $mailProviderCollection;
});
```

## Order Referenced Commands
The Episerver module has four different commands:

* `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverNewOrderPlugin`
* `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverOrderCanceledPlugin`
* `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverPaymentNotReceivedPlugin`
* `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverShippingConfirmationPlugin`
  

You can use these commands in `\Pyz\Zed\Oms\OmsDependencyProvider::getCommandPlugins`

<details open>
<summary>OmsDependencyProvider</summary>
```php
...
use SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverNewOrderPlugin;
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
    $collection->add(new EpiserverNewOrderPlugin(), 'Episerver/SendNewOrderRequest');
    $collection->add(new EpiserverOrderCanceledPlugin(), 'Episerver/SendOrderCanceledRequest');
    $collection->add(new EpiserverPaymentNotReceivedPlugin(), 'Episerver/PaymentNotReceivedRequest');
    $collection->add(new EpiserverShippingConfirmationPlugin(), 'Episerver/ShippingConfirmedRequest');
    ...
  
    return $collection;
}
```
<br>
</details>

After that you are ready to use commands in the OMS setup:

<details open>
<summary>OmsDependencyProvider</summary>
```html
<events>
    <event name="authorize" onEnter="true" command="Episerver/SendNewOrderRequest"/>
    <event name="shipped_confirmed"  manual="true" command="Episerver/ShippingConfirmedRequest"/>
    <event name="pay" manual="true" command="Episerver/PaymentNotReceivedRequest" />
    <event name="cancel" manual="true" command="Episerver/SendOrderCanceledRequest" />
</events>
```
<br>
</details>


<details open>
<summary>oms-statemachine</summary>
```html
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">
 
    <process name="OptivoPayment01" main="true">
        <states>
            <state name="new" reserved="true"/>
            <state name="shipping confirmed" reserved="true"/>
            <state name="payment pending" reserved="true"/>
            <state name="invalid">
                <flag>exclude from customer</flag>
            </state>
            <state name="cancelled">
                <flag>exclude from customer</flag>
            </state>
            <state name="optivo_cancelled" reserved="true"/>
        </states>
 
        <transitions>
            <transition happy="true" condition="DummyPayment/IsAuthorized">
                <source>new</source>
                <target>shipping confirmed</target>
                <event>authorize</event>
            </transition>
 
            <transition happy="true">
                <source>shipping confirmed</source>
                <target>payment pending</target>
                <event>shipped_confirmed</event>
            </transition>
 
            <transition>
                <source>new</source>
                <target>invalid</target>
                <event>authorize</event>
            </transition>
 
            <transition>
                <source>payment pending</source>
                <target>cancelled</target>
                <event>pay</event>
            </transition>
 
            <transition>
                <source>cancelled</source>
                <target>optivo_cancelled</target>
                <event>cancel</event>
            </transition>
 
        </transitions>
 
        <events>
            <event name="authorize" onEnter="true" command="Optivo/SendNewOrderRequest"/>
            <event name="shipped_confirmed"  manual="true" command="Optivo/ShippingConfirmedRequest"/>
            <event name="pay" manual="true" command="Optivo/PaymentNotReceivedRequest" />
            <event name="cancel" manual="true" command="Optivo/SendOrderCanceledRequest" />
        </events>
    </process>
 
</statemachine>
```
<br>
</details>


## API Requests
`\SprykerEco\Zed\Episerver\Business\Api\Adapter\EpiserverApiAdapter` contains all needed data for sending it to Episerver for events.

It sends the request via `\Generated\Shared\Transfer\EpiserverRequestTransfer`

<details open>
<summary>OmsDependencyProvider</summary>
```html
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd" >
 
    <transfer name="EpiserverResponse">
        <property name="isSuccessful" type="bool" />
        <property name="status" type="int" />
    </transfer>
 
    <transfer name="EpiserverRequest">
        <property name="authorizationCode" type="string" />
        <property name="operationType" type="string" />
        <property name="payload" type="array" />
    </transfer>
 
</transfers>
```
<br>
</details>

The payload for Customer loads from `\SprykerEco\Zed\Episerver\Business\Mapper\Customer\CustomerMapper::buildPayload`, for Order from `\SprykerEco\Zed\Episerver\Business\Mapper\Order\AbstractOrderMapper` and for Newsletter from `\SprykerEco\Zed\Episerver\Business\Mapper\Customer\CustomerNewsletterMapper`.

The abstract classes can be extended and changed in `\SprykerEco\Zed\Episerver\Business\EpiserverBusinessFactory`.
