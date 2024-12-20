

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/dg/dev/upgrade-and-migrate/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using Composer:

```bash
composer update spryker/twig
```

2. Remove old service providers, if you have them in the project:

```php
\Spryker\Zed\Twig\Communication\Plugin\ServiceProvider\TwigServiceProvider
\Spryker\Yves\Twig\Plugin\ServiceProvider\TwigServiceProvider
```

3. Add new plugins to dependency providers:

**Zed integration**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Twig\Communication\Plugin\Application\TwigApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    ...
     /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new TwigApplicationPlugin(),
            ...
        ];
    }
     ...
}
```

**Yves integration**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use Spryker\Yves\Twig\Plugin\Application\TwigApplicationPlugin;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    ...
     /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new TwigApplicationPlugin(),
            ...
        ];
    }
     ...
}
```

4. Enable additional plugins:

**Twig Zed integration**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Service\UtilDateTime\Plugin\Twig\DateTimeFormatterTwigPlugin;
use Spryker\Shared\Twig\Plugin\FormTwigPlugin;
use Spryker\Shared\Twig\Plugin\RoutingTwigPlugin;
use Spryker\Shared\Twig\Plugin\SecurityTwigPlugin;
use Spryker\Shared\Twig\Plugin\VarDumperTwigPlugin;
use Spryker\Zed\Application\Communication\Plugin\Twig\ApplicationTwigPlugin;
use Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\ChartGuiTwigPlugin;
use Spryker\Zed\Currency\Communication\Plugin\Twig\CurrencyTwigPlugin;
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
use Spryker\Zed\Gui\Communication\Plugin\Twig\FormRuntimeLoaderTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\GuiFilterTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\GuiTwigLoaderPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\TabsTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\UrlDecodeTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\UrlTwigPlugin;
use Spryker\Zed\Http\Communication\Plugin\Twig\HttpKernelTwigPlugin;
use Spryker\Zed\Http\Communication\Plugin\Twig\RuntimeLoaderTwigPlugin;
use Spryker\Zed\Money\Communication\Plugin\Twig\MoneyTwigPlugin;
use Spryker\Zed\Scheduler\Communication\Plugin\Twig\SchedulerTwigPlugin;
use Spryker\Zed\Translator\Communication\Plugin\Twig\TranslatorTwigPlugin;
use Spryker\Zed\Twig\Communication\Plugin\FilesystemTwigLoaderPlugin;
use Spryker\Zed\Twig\Communication\Plugin\FormFilesystemTwigLoaderPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use Spryker\Zed\User\Communication\Plugin\Twig\UserTwigPlugin;
use Spryker\Zed\WebProfiler\Communication\Plugin\Twig\WebProfilerTwigLoaderPlugin;
use Spryker\Zed\ZedNavigation\Communication\Plugin\Twig\ZedNavigationTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            new VarDumperTwigPlugin(),
            new FormTwigPlugin(),
            new HttpKernelTwigPlugin(),
            new RoutingTwigPlugin(),
            new SecurityTwigPlugin(),
            new RuntimeLoaderTwigPlugin(),
            new FormRuntimeLoaderTwigPlugin(),
            new ApplicationTwigPlugin(),
            new ChartGuiTwigPlugin(),
            new UserTwigPlugin(),
            new MoneyTwigPlugin(),
            new CurrencyTwigPlugin(),
            new ZedNavigationTwigPlugin(),
            new TranslatorTwigPlugin(),
            new DateTimeFormatterTwigPlugin(),
            new SchedulerTwigPlugin(),

            new AssetsPathTwigPlugin(),
            new TabsTwigPlugin(),
            new UrlTwigPlugin(),
            new UrlDecodeTwigPlugin(),
            // Navigation buttons
            new ButtonGroupTwigPlugin(),
            new BackActionButtonTwigPlugin(),
            new CreateActionButtonTwigPlugin(),
            new ViewActionButtonTwigPlugin(),
            new EditActionButtonTwigPlugin(),
            new RemoveActionButtonTwigPlugin(),
            // Table row buttons
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

    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigLoaderPluginInterface[]
     */
    protected function getTwigLoaderPlugins(): array
    {
        return [
            new FilesystemTwigLoaderPlugin(),
            new FormFilesystemTwigLoaderPlugin(),
            new WebProfilerTwigLoaderPlugin(),
            new GuiTwigLoaderPlugin(),
        ];
    }
}
```

**EventDispatcher Zed integration**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Zed\Twig\Communication\Plugin\EventDispatcher\TwigEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            ...
            new TwigEventDispatcherPlugin(),
            ...
        ];
    }
}
```

**Twig Yves integration**

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Service\UtilDateTime\Plugin\Twig\DateTimeFormatterTwigPlugin;
use Spryker\Shared\Twig\Plugin\FormTwigPlugin;
use Spryker\Shared\Twig\Plugin\RoutingTwigPlugin;
use Spryker\Shared\Twig\Plugin\SecurityTwigPlugin;
use Spryker\Shared\Twig\Plugin\VarDumperTwigPlugin;
use Spryker\Yves\CmsContentWidget\Plugin\Twig\CmsContentWidgetTwigPlugin;
use Spryker\Yves\Http\Plugin\Twig\HttpKernelTwigPlugin;
use Spryker\Yves\Http\Plugin\Twig\RuntimeLoaderTwigPlugin;
use Spryker\Yves\Translator\Plugin\Twig\TranslatorTwigPlugin;
use Spryker\Yves\Twig\Plugin\FilesystemTwigLoaderPlugin;
use Spryker\Yves\Twig\Plugin\FormFilesystemTwigLoaderPlugin;
use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerShop\Yves\CartPage\Plugin\Twig\CartTwigPlugin;
use SprykerShop\Yves\CatalogPage\Plugin\Twig\CatalogPageTwigPlugin;
use SprykerShop\Yves\CategoryWidget\Plugin\Twig\CategoryTwigPlugin;
use SprykerShop\Yves\ChartWidget\Plugin\Twig\ChartTwigPlugin;
use SprykerShop\Yves\CmsBlockWidget\Plugin\Twig\CmsBlockTwigPlugin;
use SprykerShop\Yves\CmsPage\Plugin\Twig\CmsTwigPlugin;
use SprykerShop\Yves\ContentBannerWidget\Plugin\Twig\ContentBannerTwigPlugin;
use SprykerShop\Yves\ContentFileWidget\Plugin\Twig\ContentFileListTwigPlugin;
use SprykerShop\Yves\ContentProductSetWidget\Plugin\Twig\ContentProductSetTwigPlugin;
use SprykerShop\Yves\ContentProductWidget\Plugin\Twig\ContentProductAbstractListTwigPlugin;
use SprykerShop\Yves\CustomerPage\Plugin\Twig\CustomerTwigPlugin;
use SprykerShop\Yves\MoneyWidget\Plugin\Twig\MoneyTwigPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Twig\ShopApplicationFormTwigLoaderPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Twig\ShopApplicationTwigPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Twig\WidgetTagTwigPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Twig\WidgetTwigPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\TwigFormRuntimeLoaderPlugin;
use SprykerShop\Yves\ShopCmsSlot\Plugin\Twig\ShopCmsSlotTwigPlugin;
use SprykerShop\Yves\ShopPermission\Plugin\Twig\ShopPermissionTwigPlugin;
use SprykerShop\Yves\ShopUi\Plugin\Twig\FunctionTwigPlugin;
use SprykerShop\Yves\ShopUi\Plugin\Twig\ShopUiTwigPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\Twig\WebProfilerTwigLoaderPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            new VarDumperTwigPlugin(),
            new FormTwigPlugin(),
            new HttpKernelTwigPlugin(),
            new RoutingTwigPlugin(),
            new SecurityTwigPlugin(),
            new TranslatorTwigPlugin(),
            new RuntimeLoaderTwigPlugin(),
            new ShopApplicationTwigPlugin(),
            new TwigFormRuntimeLoaderPlugin(),
            new ChartTwigPlugin(),
            new CatalogPageTwigPlugin(),
            new CmsBlockTwigPlugin(),
            new MoneyTwigPlugin(),
            new WidgetTwigPlugin(),
            new CartTwigPlugin(),
            new ShopPermissionTwigPlugin(),
            new CmsContentWidgetTwigPlugin(),
            new CmsTwigPlugin(),
            new ShopUiTwigPlugin(),
            new CategoryTwigPlugin(),
            new DateTimeFormatterTwigPlugin(),
            new CustomerTwigPlugin(),
            new WidgetTagTwigPlugin(),
            new ContentBannerTwigPlugin(),
            new ContentProductAbstractListTwigPlugin(),
            new ContentProductSetTwigPlugin(),
            new ContentFileListTwigPlugin(),
            new FunctionTwigPlugin(),
            new ShopCmsSlotTwigPlugin(),
        ];
    }

    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigLoaderPluginInterface[]
     */
    protected function getTwigLoaderPlugins(): array
    {
        return [
            new FilesystemTwigLoaderPlugin(),
            new FormFilesystemTwigLoaderPlugin(),
            new ShopApplicationFormTwigLoaderPlugin(),
            new WebProfilerTwigLoaderPlugin(),
        ];
    }
}
```
