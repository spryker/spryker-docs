---
title: Product is Available Again Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/product-is-available-again-feature-integration-201903
redirect_from:
  - /v2/docs/product-is-available-again-feature-integration-201903
  - /v2/docs/en/product-is-available-again-feature-integration-201903
---

## Install Feature Core

### Prerequisites

Ensure that the related features are installed:

| Name | Version |
| --- | --- |
| Mailing & Notifications | 201903.0 |
| Inventory Management | 201903.0 |
| Product | 201903.0 |
| Spryker Core | 201903.0 |

### 1) Install the Required Modules Using Composer

Run the following command to install the required modules:
```bash
composer require "spryker-feature/availability-notification":"^201903.0" --update-with-dependencies 
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`AvailabilityNotification`</td><td>`vendor/spryker/availability-notification`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set Up Database Schema and Transfer Objects

Run the following commands to apply database changes, generate entities and transfer changes:
```bash
console transfer:generate
console propel:install
console transfer:generate 
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been implemented in your database:<table><thead><tr><th>Database Entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_availability_notification_subscription`</td><td>Table</td><td>Created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that propel entities have been generated successfully by checking their existence. Also, change the generated entity classes to extend from Spryker core classes.<table><thead><tr><th>Class path</th><th>Extends</th></tr></thead><tbody><tr><td>`src/Orm/Zed/AvailabilityNotification/Persistence/SpyAvailabilityNotificationSubscription.php`</td><td>`Spryker\Zed\AvailabilityNotification\Persistence\Propel\AbstractSpyAvailabilityNotificationSubscription`</td></tr><tr><td>`src/Orm/Zed/AvailabilityNotification/Persistence/SpyAvailabilityNotificationSubscriptionQuery.php`</td><td>`Spryker\Zed\AvailabilityNotification\Persistence\Propel\AbstractSpyAvailabilityNotificationSubscriptionQuery`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been implemented in transfer objects:<table><thead><tr><th>Transfer </th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`AvailabilityNotificationSubscriptionTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/AvailabilityNotificationSubscriptionTransfer.php`</td></tr><tr><td>`AvailabilityNotificationSubscriptionResponseTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/AvailabilityNotificationSubscriptionResponseTransfer.php`</td></tr><tr><td>`AvailabilityNotificationSubscriptionRequestTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/AvailabilityNotificationSubscriptionRequestTransfer.php`</td></tr><tr><td>`AvailabilityNotificationSubscriptionMailDataTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/AvailabilityNotificationSubscriptionMailDataTransfer.php`</td></tr><tr><td>`AvailabilityNotificationDataTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/AvailabilityNotificationDataTransfer.php`</td></tr><tr><td>`CustomerTransfer.availabilityNotificationSubscriptionSkus`</td><td>column</td><td>created</td><td>`src/Generated/Shared/Transfer/CustomerTransfer.php`</td></tr><tr><td>`MailTransfer.availabilityNotificationSubscriptionMailData`</td><td>column</td><td>created</td><td>`src/Generated/Shared/Transfer/MailTransfer.php`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Set Up Behavior

#### Listening the `availability_notification` Event

Add the following plugin in your project:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `AvailabilityNotificationSubscriber` | This plugins is responsible for listening and processing product availability changes. | None |  `Spryker\Zed\AvailabilityNotification\Business\Subscription` |

<details open>
<summary> src/Pyz/Zed/Event/EventDependencyProvider.php</summary>

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
<br>
</details>

 {% info_block warningBox "Verification" %}
To verify that `AvailabilityNotificationSubscriber` is working:<ol><li>add a new product and make it unavailable;</li><li>on Yves, as a customer, subscribe to its availability notifications;</li><li>make the product available;</li><li>check your mailbox for the email about the product's availability.</li></ol>
{% endinfo_block %}

#### Email Handling

Add the following plugins in your project:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `AvailabilityNotificationSubscriptionMailTypePlugin` | Handles the email sent after subscribing to product availability notification. | None |  `Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail` |
|  `AvailabilityNotificationUnsubscribedMailTypePlugin` | Handles the email sent after unsubscribing from product availability notification. | None |  `Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail` |
|  `AvailabilityNotificationMailTypePlugin` | Handles the email sent after product's availability status change. | None |  `Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail` |

<details open>
<summary> src/Pyz/Zed/Mail/MailDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Mail;
...
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail\AvailabilityNotificationMailTypePlugin;
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail\AvailabilityNotificationSubscriptionMailTypePlugin;
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail\AvailabilityNotificationUnsubscribedMailTypePlugin;
...
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Mail\Business\Model\Mail\MailTypeCollectionAddInterface;
...
use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
...

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
<br>
</details>

{% info_block warningBox "Verification" %}
 To verify that `AvailabilityNotificationSubscriptionMailTypePlugin`, `AvailabilityNotificationUnsubscribedMailTypePlugin` and `AvailabilityNotificationMailTypePlugin` are working:<ol><li>add a new product;</li><li>on YVES, as a customer, subscribe to its availability notifications;</li><li> switch the availability status of the product several times;</li><li>check your mailbox for the emails about the product's status being switched to available and unavailable.</li></ol>
{% endinfo_block %}

#### Customer Behavior

Add the following plugins in your project:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `AvailabilityNotificationAnonymizerPlugin` | Anonymizes customer data during customer anonymization. | None |  `Spryker\Zed\AvailabilityNotification\Communication\Plugin\CustomerAnonymizer` |
|  `AvailabilityNotificationSubscriptionCustomerTransferExpanderPlugin` | Expands `CustomerTransfer` with availability notification subscriptions data. | None |  `Spryker\Zed\AvailabilityNotification\Communication\Plugin\Customer` |

<details open>
<summary> src/Pyz/Zed/Customer/CustomerDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Customer;

...
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Customer\AvailabilityNotificationSubscriptionCustomerTransferExpanderPlugin;
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\CustomerAnonymizer\AvailabilityNotificationAnonymizerPlugin;
...
use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
...

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
<br>
</details>

{% info_block warningBox "Verification" %}
 To verify that `AvailabilityNotificationAnonymizerPlugin` is working:<ol><li>add a new product;</li><li>on Yves, as a company user, subscribe to its availability notifications;</li><li>Check that the corresponding line is added to `spy_availability_notification_subscription` table;</li><li>delete this user;</li><li>check that the line is deleted from `spy_availability_notification_subscription` table.</li></ol>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
To verify that `AvailabilityNotificationSubscriptionCustomerTransferExpanderPlugin` is working:<ol><li>add a new product;</li><li>on Yves, as a company user, subscribe to its availability notifications;</li><li>on Yves, go to account overview> *Newsletters* page;</li><li>check that you are subscribed to the product's availability notifications.</li></ol>
{% endinfo_block %}

## Install Feature Frontend

### Prerequisites

Ensure that the related features are installed:

| Name | Version |
| --- | --- |
| Mailing & Notifications | 201903.0 |
| Inventory Management | 201903.0 |
| Product | 201903.0 |
| Spryker Core | 201903.0 |

### 1) Install the Required Modules Using Composer

Run the following command to install the required modules:
```bash
composer require "spryker-feature/availability-notification":"^201903.0" --update-with-dependencies 
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr class="TableStyle-PatternedRows2-Head-Header1"><th class="TableStyle-PatternedRows2-HeadE-Regular-Header1">Module</th><th class="TableStyle-PatternedRows2-HeadD-Regular-Header1">Expected Directory</th></tr></thead><tbody><tr class="TableStyle-PatternedRows2-Body-LightRows"><td class="TableStyle-PatternedRows2-BodyE-Regular-LightRows">`AvailabilityNotificationPage`</td><td class="TableStyle-PatternedRows2-BodyD-Regular-LightRows">`vendor/spryker-shop/availability-notification-page`</td></tr><tr class="TableStyle-PatternedRows2-Body-DarkerRows"><td class="TableStyle-PatternedRows2-BodyB-Regular-DarkerRows">`AvailabilityNotificationPageWidget`</td><td class="TableStyle-PatternedRows2-BodyA-Regular-DarkerRows">`vendor/spryker-shop/availability-notification-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations

Feature-specific glossary keys:

<details open>
<summary> /data/import/glossary.csv</summary>

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
<br>
</details>

Run the following console command to import data:
```bash
console data:import glossary 
```

{% info_block warningBox "Verification" %}
Make sure that, in the database, the configured data is added to the `spy_glossary` table.
{% endinfo_block %}

### 3)Enable Controllers

Register the following controller providers in Yves application:

| Provider | Namespace | Enabled Controller | Controller specification |
| --- | --- | --- | --- |
|  `AvailabilityNotificationPageControllerProvider` |  `SprykerShop\Yves\AvailabilityNotificationPage\Plugin\Provider` |  `AvailabilityNotificationPageController` | Provides the functionality of subscription removal by subscription key. |
|  `AvailabilityNotificationWidgetControllerProvider` |  `SprykerShop\Yves\AvailabilityNotificationWidget\Plugin\Provider` |  `AvailabilityNotificationSubscriptionController` | Provides subscription management functionality for `AvailabilityNotificationWidget`. |

<details open>
<summary> src/Pyz/Yves/ShopApplication/YvesBootstrap.php</summary>

```php
<?php

namespace Pyz\Yves\ShopApplication;

...
use SprykerShop\Yves\AvailabilityNotificationPage\Plugin\Provider\AvailabilityNotificationPageControllerProvider;
use SprykerShop\Yves\AvailabilityNotificationWidget\Plugin\Provider\AvailabilityNotificationWidgetControllerProvider;
...
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;
...

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
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that the following URLs are available on Yves:<ul><li>`http://mysprykershop.com/availability-notification/unsubscribe-by-key/{32 characters key}`</li><li>`http://mysprykershop.com/en/availability-notification/unsubscribe-by-key/{32 characters key}`</li><li>`http://mysprykershop.com/de/availability-notification/unsubscribe-by-key/{32 characters key}`</li></ul>
{% endinfo_block %}

If you have any other languages configured, the corresponding links must be available too.

### 4) Set up Widgets

Register the following plugins to enable widgets:

| Widget | Description | Namespace |
| --- | --- | --- |
|  `AvailabilityNotificationSubscriptionWidget` | Renders the subscription form in the *product details* page |  `SprykerShop\Yves\AvailabilityNotificationWidget\Widget` |

<details open>
<summary> src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

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
<br>
</details>

Run the following command to enable Javascript and CSS changes:

```shell
console frontend:yves:build 
```

In case you have a custom template, put `AvailabilityNotificationSubscriptionWidget` to your `src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-configurator/product-configurator.twig` file:

```php
...
{% raw %}{%{% endraw %} set isProductAbstract = data.product.idProductConcrete is empty {% raw %}%}{% endraw %}
...

{% raw %}{%{% endraw %} if not isAvailable and not isProductAbstract {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} widget 'AvailabilityNotificationSubscriptionWidget' args [data.product] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
... 
```

{% info_block warningBox "Verification" %}
Make sure that the availability subscription form is present in the *product details* page. To do this, find a concrete product that is out of stock and visit its product details page.
{% endinfo_block %}
