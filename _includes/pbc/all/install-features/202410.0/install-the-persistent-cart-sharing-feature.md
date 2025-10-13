

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Resource Sharing | {{page.version}} |
|   |   |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/persistent-cart-sharing: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| PersistentCartShare | vendor/spryker/persistent-cart-share |
| PersistentCartShareExtension | vendor/spryker/persistent-cart-share-extension |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| ResourceShareData.idQuote | property | added | src/Generated/Shared/Transfer/ResourceShareDataTransfer |
| ResourceShareData.ownerCompanyUserId | property | added | src/Generated/Shared/Transfer/ResourceShareDataTransfer |
| ResourceShareData.ownerCompanyBusinessUnitId | property | added | src/Generated/Shared/Transfer/ResourceShareDataTransfer |

{% endinfo_block %}

## Install feature frontend

### Prerequisites

Install the following required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Resource Sharing | {{page.version}} |
| Customer Account Management | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/persistent-cart-sharing: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| PersistentCartSharePage | vendor/spryker-shop/persistent-cart-share-page |
| PersistentCartShareWidget | vendor/spryker-shop/persistent-cart-share-widget |

{% endinfo_block %}

### 2) Add translations

Append glossary according to your configuration:

data/import/common/common/glossary.csv

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

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CartPreviewRouterStrategyPlugin | Redirects company user to the Cart Preview page if a cart was shared with Preview access. | None | SprykerShop\Yves\PersistentCartSharePage\Plugin |
| PreviewCartShareOptionPlugin | Provides an external (preview) share option for the Share Cart via link widget. | None | Spryker\Client\PersistentCartShare\Plugin |

**src/Pyz/Yves/ResourceSharePage/ResourceSharePageDependencyProvider.php**

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

**src/Pyz/Client/PersistentCartShare/PersistentCartShareDependencyProvider.php**

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


### 4) Enable controllers

#### Route list

Register the following route provider plugins:

| PROVIDER | NAMESPACE |
| --- | --- |
| PersistentCartSharePageRouteProviderPlugin | SprykerShop\Yves\PersistentCartSharePage\Plugin\Router |
| PersistentCartShareWidgetRouteProviderPlugin` | SprykerShop\Yves\PersistentCartShareWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\PersistentCartSharePage\Plugin\Router\PersistentCartSharePageRouteProviderPlugin;
use SprykerShop\Yves\PersistentCartShareWidget\Plugin\Router\PersistentCartShareWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new PersistentCartSharePageRouteProviderPlugin(),
            new PersistentCartShareWidgetRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure, that when you proceed with `https://mysprykershop.com/cart/preview/xxx` link, you're redirected to the "404" page with "Resource is not found by provided UUID." error message.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure, that when you're on a cart page, you can see the "Share Cart via Link" widget with an "External Users" radio button (if you logged in as company user and when you click on it - the cart share link is generated successfully and placed in the appeared text box (requires `ShareCartByLinkWidget` to be enabled).

{% endinfo_block %}

### 5) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ShareCartByLinkWidget | Provides an ability to share a cart for External Users (Preview). | None | SprykerShop\Yves\PersistentCartShareWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

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

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure, that when you're on a cart page, you can see the "Share Cart via Link" widget with an "External Users" radio button (if you logged in as company user).

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Login to Yves as Company User, add some product to the cart and go to the cart page.<br>Make sure, that you can see the "Share Cart via Link" widget on a cart page.<br>Make sure you can see an "External Users" radio button. Click on it.<br>Make sure, that you can see the generated link for Preview access.<br>Make sure, that you can see a "Copy" button near the link. Click on it.<br>Make sure, that the link was copied to the clipboard (or a message that it's impossible because of some browser limitations).<br>Copy the Cart Preview link and proceed with it. Make sure, that you are redirected to the Cart Preview page.

{% endinfo_block %}
