---
title: Persistent Cart Sharing Feature Integration
originalLink: https://documentation.spryker.com/v4/docs/persistent-cart-sharing-feature-integration
redirect_from:
  - /v4/docs/persistent-cart-sharing-feature-integration
  - /v4/docs/en/persistent-cart-sharing-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |
| Resource Sharing | 201907.0 |
### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/persistent-cart-sharing: "^201907.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`PersistentCartShare`</td><td>`vendor/spryker/persistent-cart-share`</td></tr><tr><td>`PersistentCartShareExtension`</td><td>`vendor/spryker/persistent-cart-share-extension`</td></tr></tbody></table>
{% endinfo_block %}
### 2) Set up Transfer Objects
Run the following commands to generate transfer changes:
```bash
transfer:generate
```
{% info_block warningBox "Verification" %}
Make sure that the following changes in transfer objects:<table><col /><col  /><col  /><col /><thead><tr><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`ResourceShareData.idQuote`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/ResourceShareDataTransfer`</td></tr><tr><td>`ResourceShareData.ownerCompanyUserId`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/ResourceShareDataTransfer`</td></tr><tr><td>`ResourceShareData.ownerCompanyBusinessUnitId`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/ResourceShareDataTransfer`</td></tr></tbody></table>
{% endinfo_block %}
## Install Feature Frontend
### Prerequisites
Please overview and install the necessary features before beginning the integration step.

|Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |
| Resource Sharing | 201907.0 |
| Customer Account Management | 201907.0 |
### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/persistent-cart-sharing: "^201907.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><col /><col /><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`PersistentCartSharePage`</td><td>`vendor/spryker-shop/persistent-cart-share-page`</td></tr><tr><td>`PersistentCartShareWidget`</td><td>`vendor/spryker-shop/persistent-cart-share-widget`</td></tr></tbody></table>
{% endinfo_block %}
### 2) Add Translations
Append glossary according to your configuration:

src/data/import/glossary.csv

```yaml
persistent_cart_share.error.resource_is_not_available,The cart you are trying to access is not available.,en_US
persistent_cart_share.error.resource_is_not_available,"Der Warenkorb, auf den Sie zugreifen möchten, ist nicht verfügbar.",de_DE
persistent_cart_share.error.quote_is_not_available,The cart you are trying to access is not available.,en_US
persistent_cart_share.error.quote_is_not_available,"Der Warenkorb, auf den Sie zugreifen möchten, ist nicht verfügbar.",de_DE
persistent_cart_share.share_options.external.PREVIEW,,en_US
persistent_cart_share.share_options.external.PREVIEW,,de_DE
persistent_cart_share.share_options.internal.READ_ONLY,Read Only,en_US
persistent_cart_share.share_options.internal.READ_ONLY,Schreibgeschützt,de_DE
persistent_cart_share.share_options.internal.FULL_ACCESS,Full Access,en_US
persistent_cart_share.share_options.internal.FULL_ACCESS,Ohne Einschränkung,de_DE
persistent_cart_share.copy,Copy,en_US
persistent_cart_share.copy,Kopieren,de_DE
persistent_cart_share.external_users,External Users,en_US
persistent_cart_share.external_users,Externe Benutzer,de_DE
persistent_cart_share.internal_users,Internal Users,en_US
persistent_cart_share.internal_users,Interne Benutzer,de_DE
persistent_cart_share.title,Share Cart via link,en_US
persistent_cart_share.title,Einkaufswagen per Link teilen,de_DE
clipboard.copy.success,Successfully copied to clipboard!,en_US
clipboard.copy.success,Erfolgreich in die Zwischenablage kopiert!,de_DE
clipboard.copy.error,Copying to clipboard is not supported by your browser. Try to copy the text manually.,en_US
clipboard.copy.error,Das Kopieren in die Zwischenablage wird von Ihrem Browser nicht unterstützt. Versuchen Sie den Text manuell zu kopieren.,de_DE
persistent_cart_share_page.preview,Preview: %title%,en_US
persistent_cart_share_page.preview,Vorschau: %title%,de_DE
```
    
Run the following console command to import data:
```bash
console data:import glossary
```
{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}

### 3) Set up Behavior
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| CartPreviewRouterStrategyPlugin | Redirects company user to the Cart Preview page if a cart was shared with Preview access. | None | SprykerShop\Yves\PersistentCartSharePage\Plugin |
| PreviewCartShareOptionPlugin | Provides an external (preview) share option for the Share Cart via link widget. | None | Spryker\Client\PersistentCartShare\Plugin |

src/Pyz/Yves/ResourceSharePage/ResourceSharePageDependencyProvider.php

```php
<?php
 
namespace Pyz\Yves\ResourceSharePage;
 
use SprykerShop\Yves\PersistentCartSharePage\Plugin\CartPreviewRouterStrategyPlugin;
use SprykerShop\Yves\ResourceSharePage\ResourceSharePageDependencyProvider as SprykerResourceSharePageDependencyProvider;
 
class ResourceSharePageDependencyProvider extends SprykerResourceSharePageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\ResourceSharePageExtension\Dependency\Plugin\ResourceShareRouterStrategyPluginInterface[]
     */
    protected function getResourceShareRouterStrategyPlugins(): array
    {
        return [
            new CartPreviewRouterStrategyPlugin(),
        ];
    }
}
```

src/Pyz/Client/PersistentCartShare/PersistentCartShareDependencyProvider.php

```php
<?php
 
namespace Pyz\Client\PersistentCartShare;
 
use Spryker\Client\PersistentCartShare\PersistentCartShareDependencyProvider as SprykerPersistentCartShareDependencyProvider;
use Spryker\Client\PersistentCartShare\Plugin\PersistentCartShare\PreviewCartShareOptionPlugin;
 
class PersistentCartShareDependencyProvider extends SprykerPersistentCartShareDependencyProvider
{
    /**
     * @return \Spryker\Client\PersistentCartShareExtension\Dependency\Plugin\CartShareOptionPluginInterface[]
     */
    protected function getCartShareOptionPlugins(): array
    {
        return [
            new PreviewCartShareOptionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that when you followed cart share link with Preview access, you're redirected to the Cart Preview page.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure, that you are able to share a cart with "Preview" access to external users from the cart page.
{% endinfo_block %}

### 4) Enable Controllers
#### Controller Provider List
Register the following plugin:

| Provider | Namespace | Enabled Controller | Controller Specification |
| --- | --- | --- | --- |
| `PersistentCartSharePageControllerProvider` |`SprykerShop\Yves\PersistentCartSharePage\Plugin\Provider` | `PersistentCartSharePageController` | Provides a route to Cart Preview page. |
| `ShareCartByLinkWidgetControllerProvider` | `SprykerShop\Yves\PersistentCartShareWidget\Plugin\Provider` | `PersistentCartShareWidgetController` | Responsible for cart share links generation, used by `ShareCartByLinkWidget`. |

src/Pyz/Yves/ShopApplication/YvesBootstrap.php

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\PersistentCartSharePage\Plugin\Provider\PersistentCartSharePageControllerProvider;
use SprykerShop\Yves\PersistentCartShareWidget\Plugin\Provider\ShareCartByLinkWidgetControllerProvider;
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
            new PersistentCartSharePageControllerProvider($isSsl),
            new ShareCartByLinkWidgetControllerProvider($isSsl),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure, that when you proceed with `https://mysprykershop.com/cart/preview/xxx` link, you're redirected to the "404" page with "Resource is not found by provided UUID." error message.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure, that when you're on a cart page, you can see the "Share Cart via Link" widget with an "External Users" radio button (if you logged in as company user
{% endinfo_block %} and when you click on it - the cart share link is generated successfully and placed in the appeared text box (requires `ShareCartByLinkWidget` to be enabled).)

### 5) Set up Widgets
Register the following plugins to enable widgets:

| Plugin | Descripton | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ShareCartByLinkWidget` | Provides an ability to share a cart for External Users (Preview). | None | SprykerShop\Yves\PersistentCartShareWidget\Widget |

src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\PersistentCartShareWidget\Widget\ShareCartByLinkWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
 
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ShareCartByLinkWidget::class,
        ];
    }
}
```

Run the following command to enable Javascript and CSS changes:
```bash
console frontend:yves:build
```
{% info_block warningBox "Verification" %}
Make sure, that when you're on a cart page, you can see the "Share Cart via Link" widget with an "External Users" radio button (if you logged in as company user
{% endinfo_block %}.)
{% info_block warningBox "Verification" %}
Login to Yves as Company User, add some product to the cart and go to the cart page.<br>Make sure, that you can see the "Share Cart via Link" widget on a cart page.<br>Make sure you can see an "External Users" radio button. Click on it.<br>Make sure, that you can see the generated link for Preview access.<br>Make sure, that you can see a "Copy" button near the link. Click on it.<br>Make sure, that the link was copied to the clipboard (or a message that it's impossible due to some browser limitations
{% endinfo_block %}.<br>Copy the Cart Preview link and proceed with it. Make sure, that you are redirected to the Cart Preview page.)
