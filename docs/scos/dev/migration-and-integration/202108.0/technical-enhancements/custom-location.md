---
title: Custom Location for Static Assets
originalLink: https://documentation.spryker.com/2021080/docs/custom-location-for-static-assets
redirect_from:
  - /2021080/docs/custom-location-for-static-assets
  - /2021080/docs/en/custom-location-for-static-assets
---

## General Information
In Spryker, the default folders of static assets are:

* `public/Yves/assets/`
* `public/Zed/assets/`

For organizational or cost and speed optimization purposes, you may need to change the location of static assets to an external source, like a CDN (content delivery network).

## Integration

### Prerequisites
To start the integration, overview and install the necessary feature:

| Name | Version |
| --- | --- |
| Spryker Core | 202001.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/spryker-core: "^202001.0" --update-with-dependencies
```

### 2) Set up Behavior
Register the following Twig plugins for `Zed` application:

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\ChartGuiTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\AssetsPathTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Action\BackActionButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Action\CreateActionButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Action\EditActionButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Action\RemoveActionButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Action\ViewActionButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\ButtonGroupTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Form\SubmitButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Table\BackTableButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Table\CreateTableButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Table\EditTableButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Table\RemoveTableButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Table\ViewTableButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\GuiFilterTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\GuiTwigLoaderPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\TabsTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\UrlDecodeTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\UrlTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            new ChartGuiTwigPlugin(),
            new AssetsPathTwigPlugin(),
            new TabsTwigPlugin(),
            new UrlTwigPlugin(),
            new UrlDecodeTwigPlugin(),
            // navigation buttons
            new ButtonGroupTwigPlugin(),
            new BackActionButtonTwigPlugin(),
            new CreateActionButtonTwigPlugin(),
            new ViewActionButtonTwigPlugin(),
            new EditActionButtonTwigPlugin(),
            new RemoveActionButtonTwigPlugin(),
            // table row buttons
            new EditTableButtonTwigPlugin(),
            new BackTableButtonTwigPlugin(),
            new CreateTableButtonTwigPlugin(),
            new ViewTableButtonTwigPlugin(),
            new RemoveTableButtonTwigPlugin(),
            // Form buttons
            new SubmitButtonTwigPlugin(),
            new GuiFilterTwigPlugin(),
        ];
    }
}
```

Register the following Twig plugins for `Yves` application:

```php
namespace Pyz\Yves\Twig;

...
use SprykerShop\Yves\ShopUi\Plugin\Twig\ShopUiTwigPlugin;
...

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            ...
            new ShopUiTwigPlugin(),
            ...
        ];
    }
}    
```

### Change the Location of Static Assets
To change the location of static assets:
1. Define the source of assets for:
    a. Yves:

    ```bash
    # BASH shell
    export {application_variable}={source_URL}/{application_store}/{theme}
    ```

    For example, you would define the location for Yves assets as follows:

    ```bash
    # BASH shell
    export SPRYKER_YVES_ASSETS_URL_PATTERN=http://s3.aws-region.amazonaws.com/bucket/en/default # or any other CDN
    ```

    b. Zed:

    ```bash
    # BASH shell
    export {application_variable}={source_URL}
    ```

    For example, you would define the location for Zed assets as follows:

    ```bash
    # BASH shell
    export SPRYKER_ZED_ASSETS_BASE_URL=http://s3.aws-region.amazonaws.com/bucket # or any other CDN
    ```

2. Bootstrap the docker setup:

```bash
docker/sdk boot {deploy.dev.yml}
```

3. Once the job finishes, build and start the instance:

```bash
docker/sdk up
```

4. Open the application page in browser and verify the source of the assets in the page source.
