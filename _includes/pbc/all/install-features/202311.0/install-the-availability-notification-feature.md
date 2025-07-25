


This document describes how to install the [Availability Notification](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/availability-notification-feature-overview.html).

## Install feature core

Follow the steps below to install the Availability Notification feature core.

### Prerequisites

Install the required features:

| NAME                      | VERSION            | INSTALLATION GUIDE                                                                                                                                                                         |
|---------------------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mailing and Notifications | {{site.version}}   | [Install the Mailing and Notifications feature](/docs/pbc/all/emails/{{page.version}}/install-the-mailing-and-notifications-feature.html)                            |
| Inventory Management      | {{site.version}}   | [Install the Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-feature.html) |
| Product                   | {{site.version}}   | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                                                                |
| Spryker Core              | {{site.version}}   | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                                      |

### 1) Install the required modules

```bash
composer require "spryker-feature/availability-notification":"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                   | EXPECTED DIRECTORY                       |
|--------------------------|------------------------------------------|
| AvailabilityNotification | vendor/spryker/availability-notification |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes, generate entities, and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been implemented in your database:

| DATABASE ENTITY                            | TYPE  | EVENT   |
|--------------------------------------------|-------|---------|
| spy_availability_notification_subscription | table | created |

Make sure that propel entities have been generated successfully by checking their existence. Also, change the generated entity classes to extend from Spryker core classes.

| CLASS PATH                                                                                        | EXTENDS                                                                                                      |
|---------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| src/Orm/Zed/AvailabilityNotification/Persistence/SpyAvailabilityNotificationSubscription.php      | Spryker\Zed\AvailabilityNotification\Persistence\Propel\AbstractSpyAvailabilityNotificationSubscription      |
| src/Orm/Zed/AvailabilityNotification/Persistence/SpyAvailabilityNotificationSubscriptionQuery.php | Spryker\Zed\AvailabilityNotification\Persistence\Propel\AbstractSpyAvailabilityNotificationSubscriptionQuery |

Make sure that the following changes have been implemented in transfer objects:

| TRANSFER                                                  | TYPE   | EVENT   | PATH                                                                                   |
|-----------------------------------------------------------|--------|---------|----------------------------------------------------------------------------------------|
| AvailabilityNotificationSubscriptionTransfer              | class  | created | src/Generated/Shared/Transfer/AvailabilityNotificationSubscriptionTransfer.php         |
| AvailabilityNotificationSubscriptionResponseTransfer      | class  | created | src/Generated/Shared/Transfer/AvailabilityNotificationSubscriptionResponseTransfer.php |
| AvailabilityNotificationSubscriptionRequestTransfer       | class  | created | src/Generated/Shared/Transfer/AvailabilityNotificationSubscriptionRequestTransfer.php  |
| AvailabilityNotificationSubscriptionMailDataTransfer      | class  | created | src/Generated/Shared/Transfer/AvailabilityNotificationSubscriptionMailDataTransfer.php |
| AvailabilityNotificationDataTransfer                      | class  | created | src/Generated/Shared/Transfer/AvailabilityNotificationDataTransfer.php                 |
| CustomerTransfer.availabilityNotificationSubscriptionSkus | column | created | src/Generated/Shared/Transfer/CustomerTransfer.php                                     |
| MailTransfer.availabilityNotificationSubscriptionMailData | column | created | src/Generated/Shared/Transfer/MailTransfer.php                                         |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins.

#### Configure listening to the availability_notification event

Add the following plugin to your project:

| PLUGIN                             | SPECIFICATION                                                                            | PREREQUISITES | NAMESPACE                                                  |
|------------------------------------|------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------|
| AvailabilityNotificationSubscriber | This plugin is responsible for listening to and processing product availability changes. |               | Spryker\Zed\AvailabilityNotification\Business\Subscription |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Event\Subscriber\AvailabilityNotificationSubscriber;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
     /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
     public function getEventSubscriberCollection()
     {
         $eventSubscriberCollection = parent::getEventSubscriberCollection();

         $eventSubscriberCollection->add(new AvailabilityNotificationSubscriber());

         return $eventSubscriberCollection;
     }
}
```

{% info_block warningBox "Verification" %}

Verify that `AvailabilityNotificationSubscriber` works:

1. Add a new product and make it unavailable.
2. As a customer, subscribe to its availability notifications on the Storefront.
3. Make the product available.
4. Check your mailbox for the email about the product's availability.

{% endinfo_block %}

#### Configure email handling

Add the following plugins to your project:

| PLUGIN                                             | SPECIFICATION                                                                      | PREREQUISITES | NAMESPACE                                                      |
|----------------------------------------------------|------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------|
| AvailabilityNotificationSubscriptionMailTypePlugin | Handles the email sent after subscribing to product availability notification.     |               | Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail |
| AvailabilityNotificationUnsubscribedMailTypePlugin | Handles the email sent after unsubscribing from product availability notification. |               | Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail |
| AvailabilityNotificationMailTypePlugin             | Handles the email sent after the product's availability status change.             | None          | Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail |

<details><summary>src/Pyz/Zed/Mail/MailDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Mail;

use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail\AvailabilityNotificationMailTypePlugin;
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail\AvailabilityNotificationSubscriptionMailTypePlugin;
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail\AvailabilityNotificationUnsubscribedMailTypePlugin;
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
             $mailCollection
             ...
             ->add(new AvailabilityNotificationUnsubscribedMailTypePlugin())
             ->add(new AvailabilityNotificationSubscriptionMailTypePlugin())
             ->add(new AvailabilityNotificationMailTypePlugin())
             ...
             ;

            return $mailCollection;
        });
        ...

        return $container;
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Verify that `AvailabilityNotificationSubscriptionMailTypePlugin`, `AvailabilityNotificationUnsubscribedMailTypePlugin`, and `AvailabilityNotificationMailTypePlugin` work:
1. Add a new product.
2. On the Storefront, as a customer, subscribe to its availability notifications.
3. Switch the availability status of the product several times.
4. Check your mailbox for emails about the product's status being switched to available and unavailable.

{% endinfo_block %}

#### Configure customer behavior

Add the following plugins to your project:

| PLUGIN                                                             | SPECIFICATION                                                                 | PREREQUISITES | NAMESPACE                                                                    |
|--------------------------------------------------------------------|-------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------|
| AvailabilityNotificationAnonymizerPlugin                           | Anonymizes customer data during customer anonymization.                       |               | Spryker\Zed\AvailabilityNotification\Communication\Plugin\CustomerAnonymizer |
| AvailabilityNotificationSubscriptionCustomerTransferExpanderPlugin | Expands `CustomerTransfer` with availability notification subscriptions data. |               | Spryker\Zed\AvailabilityNotification\Communication\Plugin\Customer           |

<details>
<summary>src/Pyz/Zed/Customer/CustomerDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Customer\AvailabilityNotificationSubscriptionCustomerTransferExpanderPlugin;
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\CustomerAnonymizer\AvailabilityNotificationAnonymizerPlugin;
use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;

class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
    ...

     /**
     * @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerAnonymizerPluginInterface[]
     */
     protected function getCustomerAnonymizerPlugins()
     {
         return [
             ...
             new AvailabilityNotificationAnonymizerPlugin(),
         ];
     }

     /**
     * @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface[]
     */
     protected function getCustomerTransferExpanderPlugins()
     {
         return [
         ...
            new AvailabilityNotificationSubscriptionCustomerTransferExpanderPlugin(),
         ];
     }
}
```
</details>

{% info_block warningBox "Verification" %}

Verify that `AvailabilityNotificationAnonymizerPlugin` works:
1. Add a new product.
2. On the Storefront, as a company user, subscribe to its availability notifications.
3. Check that the corresponding line is added to the `spy_availability_notification_subscription` table.
4. Delete the company user that is subscribed to the product's availability.
5. Check that the line is deleted from the `spy_availability_notification_subscription` table.

Verify that `AvailabilityNotificationSubscriptionCustomerTransferExpanderPlugin` works:
1. Add a new product.
2. On the Storefront, as a company user, subscribe to its availability notifications.
3. On the Storefront, go to account overview&nbsp;<span aria-label="and then">></span> **Newsletters**.
4. Check that you are subscribed to the product's availability notifications.

{% endinfo_block %}

### 4) Set up the configuration

{% info_block infoBox %}

You can define stores to Yves hosts mapping. This allows generating correct URLs—for example, unsubscription URL—for multi-store setup when product availability is shared between two or more stores.

{% endinfo_block %}

1. Add the following configuration:

| CONFIGURATION                                                 | SPECIFICATION                                                                                                                                            | NAMESPACE                               |
|---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| AvailabilityNotificationConstants::BASE_URL_YVES_PORT         | Defines base URL Yves port.                                                                                                                              | Spryker\Shared\AvailabilityNotification |
| AvailabilityNotificationConstants::STORE_TO_YVES_HOST_MAPPING | Defines stores to Yves host mapping. Example: the format of returned array is ['DE' => 'yves.de.mysprykershop.com', 'AT' => 'yves.at.mysprykershop.com'] | Spryker\Shared\AvailabilityNotification |

**config/Shared/config_default.php**

```php
use Spryker\Shared\AvailabilityNotification\AvailabilityNotificationConstants;

// >>> Availability Notification
$config[AvailabilityNotificationConstants::BASE_URL_YVES_PORT] = $yvesPort;
$config[AvailabilityNotificationConstants::STORE_TO_YVES_HOST_MAPPING] = [
    'DE' => getenv('SPRYKER_YVES_HOST_DE'),
    'AT' => getenv('SPRYKER_YVES_HOST_AT'),
    'US' => getenv('SPRYKER_YVES_HOST_US'),
];
```

2. To set YVES host environment variables, adjust your deploy file:

**deploy.*.yml**

```yaml
version: "0.1"

namespace: spryker_demo
tag: '1.0'

environment: docker.dev
image:
    environment:
        SPRYKER_YVES_HOST_DE: yves.de.spryker.local
        SPRYKER_YVES_HOST_AT: yves.at.spryker.local
        SPRYKER_YVES_HOST_US: yves.us.spryker.local
...
```

{% info_block infoBox %}

You can control whether `AvailabilityNotificationFacade::subscribe()` throws an exception `\Spryker\Zed\Product\Business\Exception\MissingProductException` (if SKU does not exist in the database) or not. You can do it through the `AvailabilityNotificationConfig::AVAILABILITY_NOTIFICATION_CHECK_PRODUCT_EXISTS` config setting. If set to `false` (by default), then the exception is thrown. If set to `true`, then the exception is not thrown, but `AvailabilityNotificationFacade::subscribe()` returns the instance of `AvailabilityNotificationSubscriptionResponseTransfer::$isSuccess = true`.

{% endinfo_block %}

**src/Pyz/Glue/AvailabilityNotification/AvailabilityNotificationConfig.php**

```php
<?php

namespace Pyz\Zed\AvailabilityNotification;

use Spryker\Zed\AvailabilityNotification\AvailabilityNotificationConfig as SprykerAvailabilityNotificationConfig;

class AvailabilityNotificationConfig extends SprykerAvailabilityNotificationConfig
{
    protected const AVAILABILITY_NOTIFICATION_CHECK_PRODUCT_EXISTS = true;
}
```

{% info_block warningBox "Verification" %}

We recommend setting `AVAILABILITY_NOTIFICATION_CHECK_PRODUCT_EXISTS` to true.
Make sure that don't catch the previously mentioned exception somewhere in your Pyz code but use the check of `$availabilityNotificationSubscriptionResponseTransfer->getIsSuccess()`.

The config setting exists for BC reasons only.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Availability Notification feature frontend.

### Prerequisites

To start feature integration, integrate the required feature:

| NAME                      | VERSION            | INSTALLATION GUIDE                                                                                                                                                                         |
|---------------------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mailing and Notifications | {{site.version}}   | [Install the Mailing and Notifications feature](/docs/pbc/all/emails/{{page.version}}/install-the-mailing-and-notifications-feature.html)                            |
| Inventory Management      | {{site.version}}   | [Install the Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-feature.html) |
| Product                   | {{site.version}}   | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                                                                |
| Spryker Core              | {{site.version}}   | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                                      |

### 1) Install the required modules

```bash
composer require "spryker-feature/availability-notification":"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                             | EXPECTED DIRECTORY                                   |
|------------------------------------|------------------------------------------------------|
| AvailabilityNotificationPage       | vendor/spryker-shop/availability-notification-page   |
| AvailabilityNotificationPageWidget | vendor/spryker-shop/availability-notification-widget |

{% endinfo_block %}

### 2) Add translations

Feature-specific glossary keys:

<details>
<summary>/data/import/glossary.csv</summary>

```yaml
availability_notification.notify_me,Notify me when back in stock,en_US
availability_notification.notify_me,"Benachrichtigen Sie mich, wenn der Artikel wieder verfügbar ist",de_DE
availability_notification.do_not_notify_me,Do not notify me when back in stock,en_US
availability_notification.do_not_notify_me,"Benachrichtigen Sie mich nicht, wenn der Artikel wieder verfügbar ist",de_DE
availability_notification.subscribed,Successfully subscribed,en_US
availability_notification.subscribed,Erfolgreich abonniert,de_DE
availability_notification.unsubscribed,Successfully unsubscribed,en_US
availability_notification.unsubscribed,Erfolgreich abgemeldet,de_DE
availability_notification.successfully_unsubscribed,"Successfully unsubscribed",en_US
availability_notification.successfully_unsubscribed,"Erfolgreich abbestellt",de_DE
availability_notification.successfully_unsubscribed_text,"You have successfully unsubscribed from being notified when the product is available again",en_US
availability_notification.successfully_unsubscribed_text,"Sie haben erfolgreich eine Benachrichtigung erhalten, wenn das produkt wieder verfügbar ist",de_DE
availability_notification_subscription.mail.subscribed.head,"We just informed our purchase team about your subscription!",en_US
availability_notification_subscription.mail.subscribed.head,"Wir haben unser Einkaufsteam gerade über Ihr Abonnement informiert!",de_DE
availability_notification_subscription.mail.subscribed.body,"You will receive an email when the product will be available again",en_US
availability_notification_subscription.mail.subscribed.body,"Sie erhalten eine E-Mail, sobald das Produkt wieder verfügbar ist",de_DE
availability_notification_subscription.mail.subscribed.subject,"We just informed our purchase team about your subscription!",en_US
availability_notification_subscription.mail.subscribed.subject,"Abonnement für Produktverfügbarkeit",de_DE
availability_notification_subscription.mail.unsubscribed.subject,"You will not be notified when the product %name% will be available again.",en_US
availability_notification_subscription.mail.unsubscribed.subject,"Sie werden nicht benachrichtigt, wenn das Produkt %name% wieder verfügbar ist.",de_DE
availability_notification_subscription.mail.unsubscribed.body,"You will not be notified when the product %name% will be available again.",en_US
availability_notification_subscription.mail.unsubscribed.body,"Sie werden nicht benachrichtigt, wenn das Produkt %name% wieder verfügbar ist.",de_DE
availability_notification_subscription.mail.notification.buy_now,"Buy now",en_US
availability_notification_subscription.mail.notification.buy_now,"Kaufe jetzt",de_DE
availability_notification_subscription.mail.notification.subject,"%name% is available again!",en_US
availability_notification_subscription.mail.notification.subject,"%name% ist wieder verfügbar!",de_DE
availability_notification_subscription.mail.notification.head,"%name% is available again!",en_US
availability_notification_subscription.mail.notification.head,"%name% ist wieder verfügbar",de_DE
availability_notification_subscription.mail.notification.body,"The wait is over, you can not add this product inside your cart.",en_US
availability_notification_subscription.mail.notification.body,"Das Warten hat ein Ende, Sie können dieses Produkt nicht in Ihren Warenkorb legen.",de_DE
availability_notification_subscription.mail.copyright,"<em>Copyright © current year company name, All rights reserved.</em><br><br>",en_US
availability_notification_subscription.mail.copyright,"<em>Copyright © Name des aktuellen Jahres, Alle Rechte vorbehalten.</em><br><br>",de_DE
availability_notification_subscription.mail.unsubscribe,"Want to change how you receive these emails?<br>You can <a target=""_blank"" href=""%link%"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #656565;font-weight: normal;text-decoration: underline;"">unsubscribe from this list</a>.",en_US
availability_notification_subscription.mail.unsubscribe,"Möchten Sie ändern, wie Sie diese E-Mails erhalten?<br>Sie können <a target=""_blank"" href=""%link%"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #656565;font-weight: normal;text-decoration: underline;"">aus dieser Liste austragen</a>.",de_DE
availability_notification.email_address,"Email address",en_US
availability_notification.email_address,"E-Mail-Addresse",de_DE
```
</details>

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Enable controllers

Register the following controller providers in the Yves application:

| PROVIDER                                         | NAMESPACE                                                       | ENABLE CONTROLLER                              | CONTROLLER SPECIFICATION                                                             |
|--------------------------------------------------|-----------------------------------------------------------------|------------------------------------------------|--------------------------------------------------------------------------------------|
| AvailabilityNotificationPageControllerProvider   | SprykerShop\Yves\AvailabilityNotificationPage\Plugin\Provider   | AvailabilityNotificationPageController         | Provides the functionality of subscription removal by a subscription key.              |
| AvailabilityNotificationWidgetControllerProvider | SprykerShop\Yves\AvailabilityNotificationWidget\Plugin\Provider | AvailabilityNotificationSubscriptionController | Provides subscription management functionality for `AvailabilityNotificationWidget`. |

**src/Pyz/Yves/ShopApplication/YvesBootstrap.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\AvailabilityNotificationPage\Plugin\Provider\AvailabilityNotificationPageControllerProvider;
use SprykerShop\Yves\AvailabilityNotificationWidget\Plugin\Provider\AvailabilityNotificationWidgetControllerProvider;
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;

class YvesBootstrap extends SprykerYvesBootstrap
{
    ...

     /**
     * @param bool|null $isSsl
     *
     * @return \SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider[]
     */
     protected function getControllerProviderStack($isSsl)
     {
         return [
             ...
             new AvailabilityNotificationWidgetControllerProvider($isSsl),
             new AvailabilityNotificationPageControllerProvider($isSsl),
             ...
         ];
     }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following URLs are available on the Storefront:
- `https://mysprykershop.com/availability-notification/unsubscribe-by-key/{32 characters key}`
- `https://mysprykershop.com/en/availability-notification/unsubscribe-by-key/{32 characters key}`
- `https://mysprykershop.com/de/availability-notification/unsubscribe-by-key/{32 characters key}`

{% endinfo_block %}

If you have any other languages configured, the corresponding links must be available too.

### 4) Set up widgets

1. Register the following plugins to enable widgets:

| WIDGET                                     | DESCRIPTION                                                  | NAMESPACE                                              |
|--------------------------------------------|--------------------------------------------------------------|--------------------------------------------------------|
| AvailabilityNotificationSubscriptionWidget | Renders the subscription form on the product details page. | SprykerShop\Yves\AvailabilityNotificationWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\AvailabilityNotificationWidget\Widget\AvailabilityNotificationSubscriptionWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
     /**
     * @return string[]
     */
     protected function getGlobalWidgets(): array
     {
         return [
            AvailabilityNotificationSubscriptionWidget::class,
         ];
     }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

3. If you have a custom template, put `AvailabilityNotificationSubscriptionWidget` to your `src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-configurator/product-configurator.twig` file:

```twig
...
{% raw %}{%{% endraw %} set isProductAbstract = data.product.idProductConcrete is empty {% raw %}%}{% endraw %}
...

{% raw %}{%{% endraw %} if not isAvailable and not isProductAbstract {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} widget 'AvailabilityNotificationSubscriptionWidget' args [data.product] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
...
```

{% info_block warningBox "Verification" %}

Make sure that the availability subscription form is present on the product details page. To do this, find a concrete product that is out of stock and visit its product details page.

{% endinfo_block %}
