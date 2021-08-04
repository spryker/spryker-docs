---
title: Comments Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/comments-feature-integration
redirect_from:
  - /v3/docs/comments-feature-integration
  - /v3/docs/en/comments-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |
| Customer Account Management | 201907.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/comments: "^201907.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr ><td>`Comment`</td><td>`vendor/spryker/comment`</td></tr><tr><td>`CommentDataImport`</td><td>`vendor/spryker/comment-data-import`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Configuration
Add the following configuration to your project:

| Configuration | Specification | Namespace |
| --- | --- | --- |
| `CommentConfig::getAvailableCommentTags()` | Used to allow saving comment tags to the database. | `Pyz\Shared\Comment` |
| A regular expression (See below in `config/Shared/config_default.php`) | Used to close access for not logged customers. | None |

<details open>
<summary>src/Pyz/Zed/Comment/CommentConfig.php</summary>
    
```php
<?php
 
namespace Pyz\Shared\Comment;
 
use Spryker\Shared\Comment\CommentConfig as SprykerCommentConfig;
 
class CommentConfig extends SprykerCommentConfig
{
	/**
	 * @return string[]
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
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that when you add/remove comment tag (listed in config
{% endinfo_block %} to comment is allowed.)

<details open>
<summary>config/Shared/config_default.php</summary>

```php
<?php
 
$config[CustomerConstants::CUSTOMER_SECURED_PATTERN] = '(^(/en|/de)?/comment($|/))';

```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that `mysprykershop.com/comment` with a guest user redirects to login page.
{% endinfo_block %}

### 3) Set up Database Schema and Transfer Objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes were applied by checking your database:<table><thead><tr><th>Database Entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_comment`</td><td>table</td><td>created</td></tr><tr><td>`spy_comment_tag`</td><td>table</td><td>created</td></tr><tr><td>`spy_comment_thread`</td><td>table</td><td>created</td></tr><tr><td>`spy_comment_to_comment_tag`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes in transfer objects:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`SpyCommentEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCommentEntityTransfer`</td></tr><tr><td>`SpyCommentTagEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCommentTagEntityTransfer`</td></tr><tr><td>`SpyCommentThreadEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCommentThreadEntityTransfer`</td></tr><tr><td>`SpyCommentToCommentTagEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SpyCommentToCommentTagEntityTransfer`</td></tr><tr><td>`Comment`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/Comment`</td></tr><tr><td>`CommentThread`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CommentThread`</td></tr><tr><td>`CommentTag`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CommentTag`</td></tr><tr><td>`CommentFilter`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CommentFilter`</td></tr><tr><td>`CommentRequest`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CommentRequest`</td></tr><tr><td>`CommentTagRequest`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CommentTagRequest`</td></tr><tr><td>`CommentThreadResponse`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CommentThreadResponse`</td></tr></tbody></table>
{% endinfo_block %}

### 4) Add Translations
Append glossary according to your configuration:

<details open>
<summary>src/data/import/glossary.csv</summary>

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
<br>
</details>

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}

### 5) Set up Behavior

#### Set up Comment Workflow
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CommentDataImportPlugin` | Imports Comments data. | None | `Spryker\Zed\CommentDataImport\Communication\Plugin` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\DataImport;
 
use Spryker\Zed\CommentDataImport\Communication\Plugin\CommentDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
 
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	/**
	 * @return array
	 */
	protected function getDataImporterPlugins(): array
	{
		return [
			new CommentDataImportPlugin(),
		];
	}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that `spy_comment`, `spy_comment_thread`, and `spy_comment_to_comment_tag` are not empty.
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |
| Customer Account Management | 201907.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/comments: "^201907.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`CommentWidget`</td><td>`vendor/spryker-shop/comment-widget`</td></tr><tr><td>`CommentWidgetExtension`</td><td>`vendor/spryker-shop/comment-widget-extension`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations
Append glossary according to your configuration:

<details open>
<summary>src/data/import/glossary.csv</summary>

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
<br>
</details>

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}

### 3) Enable Controllers
#### Controller Provider List
Register controller provider(s) in the Yves application

| Provider | Namespace |
| --- | --- |
| `CommentWidgetControllerProvider` | `SprykerShop\Yves\CommentWidget\Plugin\Provider` |

<details open>
<summary>src/Pyz/Yves/ShopApplication/YvesBootstrap.php</summary>

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\CommentWidget\Plugin\Provider\CommentWidgetControllerProvider;
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;
 
class YvesBootstrap extends SprykerYvesBootstrap
{
	/**
	 * @param bool|null $isSsl
	 *
	 * @return \SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider[]
	 */
	protected function getControllerProviderStack($isSsl)
	{
		return [
			new CommentWidgetControllerProvider($isSsl),
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Verify the `CommentWidgetControllerProvider`, log in as a customer and open the link: `mysprykershop.com/comment/0adafdf4-cb26-477d-850d-b26412fbd382/tag/add?returnUrl=/cart`</br>Make sure that the error flash message was shown.
{% endinfo_block %}

### 4) Set up Widgets
Register the following plugins to enable widgets:

| Plugin | Description | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CommentThreadWidget` | Displays comments. | None | `SprykerShop\Yves\CommentWidget\Widget` |

<details open>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\CommentWidget\Widget\CommentThreadWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
 
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			CommentThreadWidget::class,
		];
	}
}
```
<br>
</details>

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}
Make sure that the following widget was registered:<table><thead><tr><th>Module</th><th>Test</th></tr></thead><tbody><tr><td>`CommentThreadWidget`</td><td>You can check availability in twig `{% raw %}{%{% endraw %} widget 'CommentThreadWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`</td></tr></tbody></table>
{% endinfo_block %}
