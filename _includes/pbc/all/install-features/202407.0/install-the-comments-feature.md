This document describes how to install the Comments feature.

## Install feature core

Follow the steps below to install the Comments feature.

## Prerequisites

Install the required features:

| NAME                        | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                                     |
|-----------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Customer Account Management | {{page.version}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |
| Spryker Core                | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                                            |

### 1) Install the required modules

To install the required modules using Composer:

```bash
composer require spryker-feature/comments: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE            | EXPECTED DIRECTORY                 |
|-------------------|------------------------------------|
| Comment           | vendor/spryker/comment             |
| CommentDataImport | vendor/spryker/comment-data-import |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration to your project:

| CONFIGURATION                                                          | SPECIFICATION                                      | NAMESPACE          |
|------------------------------------------------------------------------|----------------------------------------------------|--------------------|
| CommentConfig::getAvailableCommentTags()                               | Allows saving comment tags to the database. | Pyz\Shared\Comment |
| See the regular expression in `config/Shared/config_default.php`. | Blocks access for customers that are not logged in.     | None               |

**src/Pyz/Zed/Comment/CommentConfig.php**

```php
<?php

namespace Pyz\Shared\Comment;

use Spryker\Shared\Comment\CommentConfig as SprykerCommentConfig;

class CommentConfig extends SprykerCommentConfig
{
	/**
	 * @return list<String>
	 */
	public function getAvailableCommentTags(): array
	{
		return [
			'delivery',
			'important',
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that the comment tags defined in the `getAvailableCommentTags()` method of the `CommentConfig` class are available on the **Cart** page.

{% endinfo_block %}

**config/Shared/config_default.php**

```php
<?php

$config[CustomerConstants::CUSTOMER_SECURED_PATTERN] = '(^(/en|/de)?/comment($|/))';

```

{% info_block warningBox "Verification" %}

Make sure that accessing `https://mysprykershop.com/comment` with a guest user redirects to the login page.

{% endinfo_block %}

### 3) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied by checking your database:

| DATABASE ENTITY            | TYPE  | EVENT   |
|----------------------------|-------|---------|
| spy_comment                | table | created |
| spy_comment_tag            | table | created |
| spy_comment_thread         | table | created |
| spy_comment_to_comment_tag | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                             | TYPE  | EVENT   | PATH                                                               |
|--------------------------------------|-------|---------|--------------------------------------------------------------------|
| Comment                              | class | created | src/Generated/Shared/Transfer/Comment                              |
| CommentThread                        | class | created | src/Generated/Shared/Transfer/CommentThread                        |
| CommentTag                           | class | created | src/Generated/Shared/Transfer/CommentTag                           |
| CommentFilter                        | class | created | src/Generated/Shared/Transfer/CommentFilter                        |
| CommentRequest                       | class | created | src/Generated/Shared/Transfer/CommentRequest                       |
| CommentTagRequest                    | class | created | src/Generated/Shared/Transfer/CommentTagRequest                    |
| CommentThreadResponse                | class | created | src/Generated/Shared/Transfer/CommentThreadResponse                |

{% endinfo_block %}

### 4) Add translations

1. Append the glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
comment.validation.error.comment_not_found,Comment not found.,en_US
comment.validation.error.comment_not_found,Kommentar nicht gefunden.,de_DE
comment.validation.error.comment_thread_not_found,Comment Thread not found.,en_US
comment.validation.error.comment_thread_not_found,Kommentar Thread nicht gefunden.,de_DE
comment.validation.error.access_denied,Access denied.,en_US
comment.validation.error.access_denied,Zugriff verweigert.,en_US
comment.validation.error.comment_thread_already_exists,Comment Thread already exists.,de_DE
comment.validation.error.comment_thread_already_exists,Kommentar Thread existiert bereits.,de_DE
comment.validation.error.invalid_message_length,Invalid message length.,en_US
comment.validation.error.invalid_message_length,Ungültige Nachrichtenlänge.,de_DE
comment.validation.error.comment_tag_not_available,Comment tag not available.,en_US
comment.validation.error.comment_tag_not_available,Kommentar-Tag nicht verfügbar.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 5) Import data

Import the following data.

#### Import merchant relationships

1. Prepare data according to your requirements using our demo data:

**data/import/common/DE/comment.csv**

```yaml
message_key,owner_type,owner_key,customer_reference,message,tags
message--1,quote,quote-25,DE--21,"We have a new Scrum master in our Berlin office. In addition to our standard Newcomers package, could you please add the following items to the cart: big colored stickers, flip chart and whiteboard to put it on a wall. Please contact him for more details regarding the needed amount of items.",
message--2,quote,quote-25,DE--20,"I have contacted Greg and he said that he also plans to work from home office twice a week. So he requested the stickers, whiteboard and flip chart to be ordered for his home office. Can we do that?",
message--3,quote,quote-25,DE--21,"Yes, we can.",
message--4,quote,quote-25,DE--20,"Should we add the above mentioned items to this order, or should we create a new one?",
message--5,quote,quote-25,DE--21,"Please add the items to this order and attach the delivery instructions in a separate comment.",
message--6,quote,quote-25,DE--21,"Delivery instructions: Max-Müllner-Straße 1 80933 München",
message--7,quote,quote-76,DE--34,"Could you please provide additional details regarding this cart: the reason to buy new office accessories in the middle of the month. Do you have any new employees onboarded?",
message--8,quote,quote-76,DE--33,"On Friday, June 11th we had a Company Birthday party in our Berlin office. Currently we are replacing the office accessories after the party: 2 office chairs, 3 desks, 1 schreder and 2 keyboards.",
message--9,quote,quote-76,DE--34,"Why do you replace those accessories? Was it planned?",
message--10,quote,quote-76,DE--33,"It was an unexpected expense. It is beyond our budget and my purchase limit.",
message--11,quote,quote-76,DE--34,"I will approve this purchase this time. However, I strongly recommend you to fit your expenses in the existing budget.",
```

| COLUMN             | REQUIRED | DATA TYPE | DATA EXAMPLE              | DATA EXPLANATION                                |
|--------------------|----------|-----------|---------------------------|-------------------------------------------------|
| message_key        | ✓        | String    | message--1                | A reference used for the comment data import.   |
| owner_type         | ✓        | String    | quote                     | Comment owner name.                          |
| owner_key          | ✓        | String    | quote-1                   | Comment owner ID.                               |
| customer_reference | ✓        | String    | DE--1                     | A reference to the customer who left a comment. |
| message            | ✓        | String    | "Comment text"            | Comment text.                                   |
| tags               |          | String    | ["delivery","important"]  | Comment tags.                                   |

2. Register the following plugin to enable data import:

| PLUGIN                  | SPECIFICATION                           | PREREQUISITES | NAMESPACE                                          |
|-------------------------|-----------------------------------------|---------------|----------------------------------------------------|
| CommentDataImportPlugin | Imports comment data into the database. |               | Spryker\Zed\CommentDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\CommentDataImport\Communication\Plugin\CommentDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new CommentDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import comment
```

{% info_block warningBox "Verification" %}

Make sure the entities have been imported to the following database tables:

- `spy_comment_thread`
- `spy_comment`
- `spy_comment_to_comment_tag`

{% endinfo_block %}

### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                        | SPECIFICATION                                                                        | PREREQUISITES | NAMESPACE                                        |
|-----------------------------------------------|--------------------------------------------------------------------------------------|---------------|--------------------------------------------------|
| CustomerCommentAuthorValidationStrategyPlugin | Validates if a customer with the provided ID exists and if the comment belongs to them. |               | Spryker\Zed\Comment\Communication\Plugin\Comment |
| CommentThreadQuoteExpanderPlugin              | Expands `QuoteTransfer` with a comment thread.                                         |               | Spryker\Zed\Comment\Communication\Plugin\Quote   |

**src/Pyz/Zed/Comment/CommentDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Comment;

use Spryker\Zed\Comment\CommentDependencyProvider as SprykerCommentDependencyProvider;
use Spryker\Zed\Comment\Communication\Plugin\Comment\CustomerCommentAuthorValidationStrategyPlugin;

class CommentDependencyProvider extends SprykerCommentDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CommentExtension\Dependency\Plugin\CommentAuthorValidatorStrategyPluginInterface>
     */
    protected function getCommentAuthorValidatorStrategyPlugins(): array
    {
        return [
            new CustomerCommentAuthorValidationStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\Comment\Communication\Plugin\Quote\CommentThreadQuoteExpanderPlugin;
use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteExpanderPluginInterface>
     */
    protected function getQuoteExpanderPlugins(): array
    {
        return [
            new CommentThreadQuoteExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. On the Storefront, log in as a customer.
2. Add a comment.
3. Reload the page.
 	Make sure that you can see customer's information under the added comment.

{% endinfo_block %}

## Install feature frontend

### Prerequisites

Install the required features:

| NAME                        | VERSION          |
|-----------------------------|------------------|
| Spryker Core                | {{page.version}} |
| Customer Account Management | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/comments: "{{page.version}}" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                 | EXPECTED DIRECTORY                           |
|------------------------|----------------------------------------------|
| CommentWidget          | vendor/spryker-shop/comment-widget           |
| CommentWidgetExtension | vendor/spryker-shop/comment-widget-extension |

{% endinfo_block %}

### 2) Add translations

1. Append the glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
comment_widget.comments_to_cart,Comments to Cart,en_US
comment_widget.comments_to_cart,Kommentare zum Warenkorb,de_DE
comment_widget.form.add_comment,Add,en_US
comment_widget.form.add_comment,Hinzufügen,de_DE
comment_widget.form.update_comment,Update,en_US
comment_widget.form.update_comment,Aktualisieren,de_DE
comment_widget.form.remove_comment,Remove,en_US
comment_widget.form.remove_comment,Entfernen,de_DE
comment_widget.form.you,You,en_US
comment_widget.form.you,Sie,de_DE
comment_widget.form.attach,Attach,en_US
comment_widget.form.attach,Anhängen,de_DE
comment_widget.form.unattach,Unattach,en_US
comment_widget.form.unattach, Anhang entfernen,de_DE
comment_widget.form.all,All,en_US
comment_widget.form.all,Alles,de_DE
comment_widget.form.attached,Attached,en_US
comment_widget.form.attached,Angehängt,de_DE
comment_widget.form.button_default,Button,en_US
comment_widget.form.button_default,Schaltfläche,de_DE
comment_widget.form.edited,edited,en_US
comment_widget.form.edited,bearbeitet,de_DE
comment_widget.form.tags,Tags,en_US
comment_widget.form.tags,Tags,de_DE
comment_widget.form.placeholder.add_comment,Add a comment,en_US
comment_widget.form.placeholder.add_comment,Kommentar hinzufügen,de_DE
comment_widget.tags.all,All,en_US
comment_widget.tags.all,Alles,de_DE
comment_widget.tags.delivery,Delivery,en_US
comment_widget.tags.delivery,Lieferung,de_DE
comment_widget.tags.important,Important,en_US
comment_widget.tags.important,Wichtig,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Enable controllers

Enable the following controllers.

#### Route List

Register the following route provider plugins:

| PROVIDER                         | NAMESPACE                                    |
|----------------------------------|----------------------------------------------|
| CommentWidgetRouteProviderPlugin | SprykerShop\Yves\CommentWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\CommentWidget\Plugin\Router\CommentWidgetAsyncRouteProviderPlugin;
use SprykerShop\Yves\CommentWidget\Plugin\Router\CommentWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new CommentWidgetRouteProviderPlugin(),
            new CommentWidgetAsyncRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

- Log in as a customer and open `https://mysprykershop.com/comment/0adafdf4-cb26-477d-850d-b26412fbd382/tag/add?returnUrl=/cart`. Make sure that the error flash message is displayed.
- Open `https://mysprykershop.com/comment/0adafdf4-cb26-477d-850d-b26412fbd382/tag/async/add and make sure that the JSON with messages is displayed.

{% endinfo_block %}

### 4) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN              | SPECIFICATION      | PREREQUISITES | NAMESPACE                             |
|---------------------|--------------------|---------------|---------------------------------------|
| CommentThreadWidget | Displays comments. |               | SprykerShop\Yves\CommentWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\CommentWidget\Widget\CommentThreadWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return list<String>
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			CommentThreadWidget::class,
		];
	}
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Verify the following widgets have been registered by adding the respective code snippets to a Twig template:

| MODULE              | TEST                                                                                                                                                                                         | VERIFICATION |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| - |
| CommentThreadWidget | `{% raw %}{%{% endraw %} widget 'CommentThreadWidget' args \[...\] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` | Add a comment on the **Cart** page. Submit the order. Go to the order details page and make sure the comment you've added is displayed in the order. |


{% endinfo_block %}
