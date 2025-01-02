---
title: Integrating Episerver
description: Integrate Episerver in the Spryker Commerce OS
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/episerver-integration-into-project
originalArticleId: 8852bd2c-599e-4f4b-9342-2cac18579da0
redirect_from:
  - /2021080/docs/episerver-integration-into-project
  - /2021080/docs/en/episerver-integration-into-project
  - /docs/episerver-integration-into-project
  - /docs/en/episerver-integration-into-project
  - /docs/scos/user/technology-partners/202204.0/marketing-and-conversion/customer-communication/episerver/integrating-episerver.html
  - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/customer-communication/episerver/integrating-episerver.html
  - /docs/scos/dev/technology-partner-guides/202204.0/marketing-and-conversion/customer-communication/episerver/integrating-episerver.html
related:
  - title: Episerver - Installation and Configuration
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/customer-communication/episerver/install-and-configure-episerver.html
  - title: Episerver - Order referenced commands
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/customer-communication/episerver/episerver-order-reference-commands.html
  - title: Episerver - API Requests
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/customer-communication/episerver/episerver-api.html
---

This article provides step-by-step instructions on integrating the Episerver module into your project.

## Prerequisites
Prior to integrating Episerver into your project, make sure you [installed and configured](/docs/pbc/all/miscellaneous/{{page.version}}/third-party-integrations/marketing-and-conversion/customer-communication/episerver/install-and-configure-episerver.html) the Episerver module.

## Customer Registration / Reset Password / Reset Rassword Confirm Event

The Episerver module has `SprykerEco\Zed\Episerver\Communication\Plugin\Customer\EpiserverCustomerMailPlugin`.

To use it,  set up `provideBusinessLayerDependencies` in the class `Pyz\Zed\Mail\MailDependencyProvider`, for example:

**MailDependencyProvider**

```php
 ->addProvider(new EpiserverCustomerMailPlugin(), [
 CustomerRegistrationMailTypePlugin::MAIL_TYPE,
 CustomerRestoredPasswordConfirmationMailTypePlugin::MAIL_TYPE,
 CustomerRestorePasswordMailTypePlugin::MAIL_TYPE,
])
```

## Customer (Un)Subscribe For Newsletter

The Episerver module has `\SprykerEco\Zed\Episerver\Business\Mapper\Customer\CustomerNewsletterMapper`.

To use it, set up `provideBusinessLayerDependencies` in the class `Pyz\Zed\Mail\MailDependencyProvider`, for example:

**MailDependencyProvider**

```php
->addProvider(new EpiserverNewsletterSubscriptionMailPlugin(), [
 NewsletterSubscribedMailTypePlugin::MAIL_TYPE,
 NewsletterUnsubscribedMailTypePlugin::MAIL_TYPE,
 CustomerChangeProfileMailTypePlugin::MAIL_TYPE,
])
```

Add a page for (un)subscribing on your site's side. To complete it, first you need a controller:

**NewsletterController**

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

Expand the factory like this:

**NewsletterPageFactory**

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

`CLIENT_NEWSLETTER_SUBSCRIPTION` should be defined like this:

**NewsletterPageDependencyProvider**

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

Prepare `NewsletterPageToNewsletterClientBridge`:

**NewsletterPageToNewsletterClientBridge**

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

And a contract for it:

**NewsletterPageToNewsletterClientInterface**

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

Create a route for our controller. Here's an example:

**NewsletterPageRouteProviderPlugin**

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\NewsletterPage\Plugin\Router;

use Spryker\Yves\Router\Route\RouteCollection;
use SprykerShop\Yves\NewsletterPage\Plugin\Router\NewsletterPageRouteProviderPlugin as SprykerShopNewsletterPageRouteProviderPlugin;

class NewsletterPageRoueProviderPlugin extends SprykerShopNewsletterPageRouteProviderPlugin
{
    public const ROUTE_NAME_CUSTOMER_SUBSCRIBE = 'newsletter-success';
    public const ROUTE_NAME_CUSTOMER_UNSUBSCRIBE = 'newsletter-unsubscribe';

    /**
     * Specification:
     * - Adds Routes to the RouteCollection.
     *
     * @api
     *
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/newsletter/success', 'NewsletterPage', 'Newsletter', 'successAction');
        $routeCollection->add(static::ROUTE_NAME_CUSTOMER_SUBSCRIBE, $route);

        $route = $this->buildRoute('/newsletter/unsubscribe', 'NewsletterPage', 'Newsletter', 'unsubscribeAction');
        $routeCollection->add(static::ROUTE_NAME_CUSTOMER_SUBSCRIBE, $route);

        return $routeCollection;
    }
}
```

A small template for a subscription:

**subscription-success**

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

And the second one is almost the same:

**unsubscription-success**

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

## Update User Data

In case you want to change user data on the Episerver side, you need to extend the Customer model

**Customer**

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

Set up a factory for the Customer module on the project level

**CustomerBusinessFactory**

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

Create one more mail plugin for Customer on data changing (without a body)

**CustomerChangeProfileMailTypePlugin**

```php
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
