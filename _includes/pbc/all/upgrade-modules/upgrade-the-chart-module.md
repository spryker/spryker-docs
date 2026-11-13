## Upgrading from version 1.x to version 2.0.0

In version 2.0.0 of the Chart module and the ChartGui module, the Back Office charts moved from Plotly to ECharts. The two modules are released together and must be upgraded together. For more details about the changes, see the [Chart module release page](https://github.com/spryker/chart/releases) and the [ChartGui module release page](https://github.com/spryker/chart-gui/releases).

*Estimated migration time: 30 min*

### Prerequisites

The chart scripts are TypeScript entry points, so the Back Office must be built with frontend builder v2. It requires `spryker/gui` 5.8.0 or later and Node.js 24.15.0 or later. If your project still builds the Back Office with `@spryker/oryx-for-zed`, follow [Upgrade to frontend builder v2 for the Back Office](/docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-back-office.html) first.

### 1) Update the modules

```bash
composer require spryker/chart:"^2.0.0" spryker/chart-gui:"^2.0.0" --no-update
composer update spryker/chart spryker/chart-gui spryker/dashboard spryker/sales-statistics spryker-shop/chart-widget --with-dependencies
```

The command updates three more packages, because Chart 2.0.0 and ChartGui 2.0.0 cannot be installed next to their older versions:

- `spryker/sales-statistics`: 1.4.0 or later. ChartGui 2.0.0 conflicts with older versions, because `TopOrdersChartPlugin` sets the `ranking` view only from 1.4.0.
- `spryker-shop/chart-widget`: the release that allows `spryker/chart` `^2.0.0`. With an older one, composer cannot resolve Chart 2.0.0.
- `spryker/dashboard`: the minor released together with Chart 2.0.0. It provides the card layout the new charts are designed for.

If your project does not use the storefront chart widget, composer reports that `spryker-shop/chart-widget` is not locked. This warning is expected.

### 2) Regenerate transfers and caches

Chart 2.0.0, ChartGui 2.0.0 and SalesStatistics 1.4.0 add `ChartDataTransfer.view`, which ChartGui reads for every chart. Without regenerated transfers, every chart call fails with `Call to undefined method ChartDataTransfer::getView()`. The new chart templates also use translations that ship with ChartGui 2.0.0, such as **No data to display** and **Total items**.

```bash
console transfer:generate
console translator:generate-cache
console twig:cache:warmer
```

### 3) Move the chart plugins to ChartGui

The Chart module no longer has plugin stacks: `ChartDependencyProvider::getChartPlugins()` and `ChartDependencyProvider::getTwigChartFunctionPlugins()` were removed. If your project has `src/Pyz/Zed/Chart/ChartDependencyProvider.php`, move its chart plugins to `ChartGuiDependencyProvider::getChartPlugins()` and delete the file.

**src/Pyz/Zed/ChartGui/ChartGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ChartGui;

use Spryker\Zed\ChartGui\ChartGuiDependencyProvider as SprykerChartGuiDependencyProvider;
use Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\BarChartTwigPlugin;
use Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\ChartTwigPlugin;
use Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\LineChartTwigPlugin;
use Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\PieChartTwigPlugin;
use Spryker\Zed\SalesStatistics\Communication\Plugin\DailyOrderCountChartPlugin;
use Spryker\Zed\SalesStatistics\Communication\Plugin\OrderItemCountByStatusChartPlugin;
use Spryker\Zed\SalesStatistics\Communication\Plugin\TopOrdersChartPlugin;

class ChartGuiDependencyProvider extends SprykerChartGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\Chart\Dependency\Plugin\ChartPluginInterface>
     */
    protected function getChartPlugins(): array
    {
        return [
            new DailyOrderCountChartPlugin(),
            new OrderItemCountByStatusChartPlugin(),
            new TopOrdersChartPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Shared\Chart\Dependency\Plugin\TwigChartFunctionPluginInterface>
     */
    protected function getTwigChartFunctionPlugins(): array
    {
        return [
            new BarChartTwigPlugin(),
            new ChartTwigPlugin(),
            new LineChartTwigPlugin(),
            new PieChartTwigPlugin(),
        ];
    }
}
```

SalesStatistics 1.4.0 adds two chart plugins that can replace `CountOrderChartPlugin` and `StatusOrderChartPlugin`. The old plugins still work. The new ones show different data, so replacing them is a functional decision, not only a visual one:

<div class="width-100">

| OLD | NEW |
| --- | --- |
| `CountOrderChartPlugin` (`count-orders`): the orders of the last 7 × 24 hours, one bar per day that has orders. | `DailyOrderCountChartPlugin` (`daily-order-count`): one bar per calendar day, today included, and days without orders shown as zero. The period is defined by `SalesStatisticsConfig::getDailyOrderCountChartDays()`, 7 days by default. |
| `StatusOrderChartPlugin` (`status-orders`): the sum of the item prices to pay per OMS state. | `OrderItemCountByStatusChartPlugin` (`order-item-count-by-status`): the number of order items per OMS state. |

</div>

If you replace the plugins:

- The chart names change. Update the project templates that call a chart by name, for example, `chart('count-orders')` becomes `chart('daily-order-count')`.
- Replace the plugins in both stacks. `DashboardDependencyProvider::getDashboardPlugins()` renders a dashboard chart, and `ChartGuiDependencyProvider::getChartPlugins()` provides its data. A chart registered in only one of them fails with `ChartPluginNotFoundException`.

### 4) Replace the removed Twig plugins

The Twig plugins of the Chart module were removed. Replace them wherever your project registers them:

<div class="width-100">

| REMOVED | REPLACEMENT |
| --- | --- |
| `Spryker\Zed\Chart\Communication\Plugin\Twig\ChartTwigPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\ChartGuiTwigPlugin` |
| `Spryker\Zed\Chart\Communication\Plugin\Twig\TwigChartPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\ChartTwigPlugin` |
| `Spryker\Zed\Chart\Communication\Plugin\Twig\TwigBarChartPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\BarChartTwigPlugin` |
| `Spryker\Zed\Chart\Communication\Plugin\Twig\TwigLineChartPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\LineChartTwigPlugin` |
| `Spryker\Zed\Chart\Communication\Plugin\Twig\TwigPieChartPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\PieChartTwigPlugin` |
| `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\BartChartTwigPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\BarChartTwigPlugin` |

</div>

`Spryker\Zed\Chart\Communication\Plugin\ServiceProvider\TwigChartFunctionServiceProvider` was removed as well. It is a service provider, so remove it from `Pyz\Zed\Application\ApplicationDependencyProvider::getServiceProviders()`, and register `ChartGuiTwigPlugin` in the Twig plugin stack instead.

`ChartGuiTwigPlugin` must be registered in the Zed Twig plugin stack, because it provides the `chartAssets()` function that `@ChartGui/Chart/chart.twig` calls:

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\ChartGuiTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            ...
            new ChartGuiTwigPlugin(),
        ];
    }
}
```

### 5) Update the project chart templates and configuration

Skip this step if your project does not override chart templates or chart configuration.

- The templates of the Chart module were removed: `@Chart/_template/chart.twig`, `bar-chart.twig`, `line-chart.twig`, `pie-chart.twig` and `@Chart/_partials/plotly-chart.twig`. Overrides under `src/Pyz/Zed/Chart/Presentation/` are no longer rendered.
- The `@ChartGui/Chart/bar-chart.twig`, `line-chart.twig`, `pie-chart.twig` and `_partials/plotly-chart.twig` templates were removed too. Every chart Twig function renders `@ChartGui/Chart/chart.twig`. Move your overrides there, or to the view templates in `@ChartGui/Chart/strategies/`.
- An override of `chart.twig` can rely on these blocks: `chartContent`, which moved there from `_partials/plotly-chart.twig`, and the new `chartTitle`, `chartBody`, `chartTemplates` and `chartAssets`. The template receives `data`, `chartKind` and `chartView`. It no longer receives `layout`.
- An override of `chart.twig` must keep the `chartAssets` block or call `chartAssets()` itself. Without it, the page does not load the chart script, and the chart stays empty.
- The chart size is defined by CSS: style the `.chart` and `.chart-plot--*` classes instead of passing a layout.
- The Zed `ChartConfig::getDefaultChartLayout()` and `ChartGuiConfig::getDefaultChartLayout()` were removed. Delete their overrides from `src/Pyz/Zed/Chart/ChartConfig.php` and `src/Pyz/Zed/ChartGui/ChartGuiConfig.php`. `Spryker\Shared\Chart\ChartConfig::getDefaultChartLayout()` stays: it sets the layout of the storefront chart widget, so keep it and the `ChartWidgetConfig` override.
- `ChartLayoutablePluginInterface::getChartLayout()` is ignored by the Back Office charts.

A project chart plugin selects its view by setting `ChartDataTransfer.view`. For project charts, use the general-purpose views:

- `cartesian`: line and bar series. This is the default for any series that is not a pie.
- `pie`: one pie series. This is the default for a pie series.

The other three views draw the data of one SalesStatistics plugin each and render order texts, such as **Daily orders**, **Total items** and **SKU**. Use them only for data of the same shape:

- `daily-bar`: one trace, with ISO dates (`Y-m-d`) in `labels` and counts in `values`.
- `order-status`: one pie trace, with the OMS state names in `labels` and the item counts in `values`.
- `ranking`: one trace, with titles in `values`, counts in `labels` and SKUs in `options`.

In version 1.x, `chart.twig` drew a bar trace with the `top-orders` key as a horizontal ranking. Version 2.0.0 decides by the view only. If your project overrides `TopOrdersChartPlugin::getChartData()` without calling the parent, or has its own chart of this shape, call `setView('ranking')` on the returned `ChartDataTransfer`. Without it, the chart falls back to the `cartesian` view, and the card shows **No data to display**.

### 6) Add the removed translations

The Chart module no longer provides Zed translations. Two of its keys are provided by other modules now: `SKU` by ChartGui 2.0.0, and `Count orders` by Dashboard, which changes its text to **Orders over time** in the same release. Add the keys that remain without a provider to the project Zed translation files, `src/Pyz/Zed/Translator/data/*/<locale>.csv`:

- `Title`, if your project uses it.
- `Count orders`, if your project uses `CountOrderChartPlugin` or `DailyOrderCountChartPlugin` without `spryker/dashboard`. This key is the title of both plugins.

Then regenerate the translation cache:

```bash
console translator:generate-cache
```

### 7) Rebuild the Back Office frontend

The ECharts dependency is declared only in `vendor/spryker/chart/assets/Zed/package.json`, so it is installed only when the Chart module is an npm workspace of the project. [Upgrade to frontend builder v2 for the Back Office](/docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-back-office.html) declares only `vendor/spryker/gui/assets/Zed`, which does not cover Chart. In the `workspaces` section of the project `package.json`, replace the Gui entry with a glob that covers the `assets/Zed` directories of all modules, or add `vendor/spryker/chart/assets/Zed` next to it:

```json
"workspaces": [
    "vendor/spryker/*/assets/Zed"
]
```

For how the workspaces work, see [npm workspaces for the frontend builders](/docs/dg/dev/frontend-development/latest/npm-workspaces-for-frontend-builders.html).

If your project added `plotly.js-dist-min` or the Plotly polyfills `assert`, `buffer` and `stream-browserify` to its own `package.json`, remove them. Then install the dependencies and build the Back Office:

```bash
npm install
npm run zed
```

{% info_block warningBox "Verification" %}

In the Back Office, go to **Dashboard**. Make sure that the charts are displayed and that the browser console shows no errors.

{% endinfo_block %}

## Upgrading from version 1.5.0 to version 1.6.1

In version 1.6.1 of the Chart module, we  updated the dev dependencies with Node.js polyfills. For more details about the changes, see the [Chart module release page](https://github.com/spryker/chart/releases).

*Estimated migration time: 15 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the Chart module using Composer:

```bash
composer update spryker/chart:"^1.6.1" --update-with-dependencies
```

2. On the project level, update the the `@spryker/oryx-for-zed` dependency to version 3.3 or higher:

```json
{
    "@spryker/oryx-for-zed": "^3.3.0"
}
```

3. Run and build the Back Office frontend:

```bash
docker/sdk cli npm install
docker/sdk up --assets
```

## Upgrading from version 1.4.0 to version 1.5.0

In version 1.5.0 of the Chart module, we've updated the `plotly.js` dependency from version 1.54.5 to 2.26.0. For more details about the changes, see the [Chart module release page](https://github.com/spryker/chart/releases).

Upgrade to the latest major version to incorporate the latest improvements and optimize both runtime and processing performance.


*Estimated migration time: 15 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the Chart module to the new version:

```bash
composer update spryker/chart:"^1.5.0" --update-with-dependencies
```

2. The 1.5.0 module version requires an update of the `@spryker/oryx-for-zed` dependency to version 3.1 or later, as well as an update of the `webpack` dependency to version 5.88 or later at the project level.
To perform the updates, in the root `package.json` file, update the dependencies to the following versions or newer:

```json
{
    "@spryker/oryx-for-zed": "^3.1.0",
    "webpack": "^5.88.2"
}
```

3. Run and build the Back Office frontend:

```bash
docker/sdk cli npm install
docker/sdk up --assets
```

or

```bash
npm install && npm run zed
```
