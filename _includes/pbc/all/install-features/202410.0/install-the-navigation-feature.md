

{% info_block errorBox "Attention" %}

The following feature integration guide expects the basic feature to be in place.

The current feature integration guide only adds the **Navigation as Content Item** functionality.

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Navigation feature core.


### Prerequisites

To start the feature integration, review and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Content Items | {{page.version}} |
| CMS | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/navigation:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed in `vendor/spryker`:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ContentNavigation | vendor/spryker/content-navigation |
| ContentNavigationGui | vendor/spryker/content-navigation-gui |
| ContentNavigationDataImport | vendor/spryker/content-navigation-data-import |
| Navigation | vendor/spryker/navigation |
| NavigationGui | vendor/spryker/navigation-gui |
| NavigationStorage | vendor/spryker/navigation-storage |

{% endinfo_block %}

### 2) Set up transfer objects

Generate changes in transfer objects:

```bash
console transfer:generate
```
{% info_block warningBox "Verification" %}

Ensure that you have triggered the following changes in transfer objects. See `src/Generated/Shared/Transfer/`.

| TRANSFER | TYPE | EVENT  |
| --- | --- | --- |
| ContentNavigationTransfer | class | created |
| ContentNavigationTypeTransfer | class | created |
| ContentNavigationTermTransfer | class | created |
| DuplicateNavigationTransfer | class | created |
| NavigationResponseTransfer | class | created |
| NavigationErrorTransfer | class | created |
| ContentValidationResponseTransfer | class | created |
| DataImporterConfigurationTransfer | class | created |

{% endinfo_block %}

### 3) Import data

Import the following data.

#### Import navigation content items into Zed

Prepare your data according to your requirements using our demo data:

**data/import/content_navigation.csv**

```yaml
key,name,description,navigation_key.default,navigation_key.de_DE,navigation_key.en_US
navigation-main-desktop,Desktop navigation,,MAIN_NAVIGATION,,
navigation-main-mobile,Mobile navigation,,MAIN_NAVIGATION,,
navigation-footer,Footer navigation,,FOOTER_NAVIGATION,,
navigation-payment-providers,List of payment providers,,PAYMENT_PROVIDERS,,
navigation-shipment-providers,List of carriers,,SHIPMENT_PROVIDERS,,
navigation-social-links,List of social networks,,SOCIAL_LINKS,,
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| key | Yes | String, unique across content items | navigation-main-desktop | Content navigation key. |
| name | Yes | String | Desktop navigation | Content navigation name. |
| description | No | String | This is the navigation that you will see across the whole website | Content navigation description. |
| navigation_key.default | Yes | String, should be a valid navigation key | MAIN_NAVIGATION | Default navigation key. |
| navigation_key.en_US | No | String, should be a valid navigation key | MAIN_NAVIGATION | Navigation key for the en_US locale. |
| navigation_key.de_DE | No | String, should be a valid navigation key | MAIN_NAVIGATION | Navigation key the de_DE locale. |

Register the following plugin to enable the Navigation Content Items data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ContentNavigationDataImportPlugin | Imports navigation content data into the database. | None | Spryker\Zed\ContentNavigationDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ContentNavigationDataImport\Communication\Plugin\ContentNavigationDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ContentNavigationDataImportPlugin(),
        ];
    }
}
```

Import data:

```bash
console data:import content-navigation
```

{% info_block warningBox "Verification" %}

Ensure that the import process has been finished successfully by checking the `spy_content_localized` database table.

{% endinfo_block %}

### 4) Set up behavior

Set up the following behaviors.

#### Set up the GUI Editor functionality

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| NavigationFormContentPlugin | Provides the form for editing Content Navigation data in the Back Office. | None | Spryker\Zed\ContentNavigationGui\Communication\Plugin\ContentGui |
| ContentNavigationContentGuiEditorPlugin | Adds a Navigation button to the Content Item drop-down menu in the WYSIWYG editor for CMS pages and CMS blocks. | None | Spryker\Zed\ContentNavigationGui\Communication\Plugin\ContentGui |

**src/Pyz/Zed/ContentGui/ContentGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ContentGui;

use Spryker\Zed\ContentGui\ContentGuiDependencyProvider as SprykerContentGuiDependencyProvider;
use Spryker\Zed\ContentNavigationGui\Communication\Plugin\ContentGui\ContentNavigationContentGuiEditorPlugin;
use Spryker\Zed\ContentNavigationGui\Communication\Plugin\ContentGui\NavigationFormContentPlugin;

class ContentGuiDependencyProvider extends SprykerContentGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentPluginInterface[]
     */
    protected function getContentPlugins(): array
    {
        return [
            new NavigationFormContentPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentGuiEditorPluginInterface[]
     */
    protected function getContentEditorPlugins(): array
    {
        return [
            new ContentNavigationContentGuiEditorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that, in the *Back Office > Content > Content Items*, you can see **Create** and **Edit** buttons next to Navigation content items.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that, in the WYSIWYG editor toolbar on *Edit Block Glossary: {block id}* and *Edit Placeholders: {rst1}* pages, you can see the **Content Item** drop-down menu with the **Navigation** button.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Navigation feature front end.

### Prerequisites

To start the feature integration, review, and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Content Items | {{page.version}} |
| CMS | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/navigation:"{{page.version}}" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed in `vendor/spryker-shop`:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ContentNavigationWidget | vendor/spryker-shop/content-navigation-widget |

{% endinfo_block %}

### 2) Set up behavior

Set up the following behaviors.

#### Set up content navigation twig function

1. Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ContentNavigationTwigPlugin | The twig function displays a content navigation item by the given content key and template. | None | SprykerShop\Yves\ContentNavigationWidget\Plugin\Twig |

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerShop\Yves\ContentNavigationWidget\Plugin\Twig\ContentNavigationTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            new ContentNavigationTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that navigation content Items inserted in CMS blocks or pages are displayed on Yves.

{% endinfo_block %}

2. Create `src/Pyz/Shared/CmsBlock/Theme/default/template/navigation_block.twig`:

```html
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    <!-- CMS_BLOCK_PLACEHOLDER : "title" -->
    <!-- CMS_BLOCK_PLACEHOLDER : "description" -->
    {% raw %}{{{% endraw %} spyCmsBlockPlaceholder('title') | raw {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} spyCmsBlockPlaceholder('description') | raw {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

3. Override `page-layout-main` on the core level by creating `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig`:

```html
{% raw %}{%{% endraw %} extends template('page-layout-main', '@SprykerShop:ShopUi') {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} block sidebar {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} embed organism('side-drawer') with {
        class: 'is-hidden-lg-xl',
        attributes: {
            'container-selector': 'js-page-layout-main',
            'trigger-selector': 'js-page-layout-main__side-drawer-trigger',
        },
    } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block mobileNavigation {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} cms_slot 'slt-mobile-header' {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block header {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} embed organism('header') only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block mainNavigation {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} cms_slot 'slt-desktop-header' {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

        {% raw %}{%{% endraw %} block mobile {% raw %}%}{% endraw %}
            <a href="#" class="link link--alt js-page-layout-main__side-drawer-trigger">
                {% raw %}{%{% endraw %} include atom('icon') with {
                    modifiers: ['big'],
                    data: {
                        name: 'bars',
                    },
                } only {% raw %}%}{% endraw %}
            </a>
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block footer {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} embed organism('footer') only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block footerNavigation {% raw %}%}{% endraw %}
            <div class="box">
                {% raw %}{%{% endraw %} cms_slot 'slt-footer' {% raw %}%}{% endraw %}
            </div>
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

{% info_block warningBox "Verification" %}

Ensure that slots are enabled:

1. Go to the *Back Office > Content > Slots*.
2. Deactivate the **Header desktop view** slot.
3. Run console `twig:cache:warmer`.
4. On the Storefront, the main navigation should not be displayed.

{% endinfo_block %}
