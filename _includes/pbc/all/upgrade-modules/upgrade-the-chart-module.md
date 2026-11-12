## Upgrading from version 1.x to version 2.0.0

In version 2.0.0 of the Chart module and the ChartGui module, the Back Office charts moved from Plotly to ECharts. The two modules are released together and must be upgraded together. For more details about the changes, see the [Chart module release page](https://github.com/spryker/chart/releases) and the [ChartGui module release page](https://github.com/spryker/chart-gui/releases).

*Estimated migration time: 30 min*

### Prerequisites

The chart scripts are TypeScript entry points, so the Back Office must be built with frontend builder v2, which requires `spryker/gui` 5.8.0 or later. If your project still builds the Back Office with `@spryker/oryx-for-zed`, follow [Upgrade to frontend builder v2 for the Back Office](/docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-back-office.html) first.

### 1) Update the modules

```bash
composer require spryker/chart:"^2.0.0" spryker/chart-gui:"^2.0.0" --no-update
composer update spryker/chart spryker/chart-gui spryker/dashboard spryker/sales-statistics spryker-shop/chart-widget --with-dependencies
```

### 2) Move the chart plugins to ChartGui

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

`DailyOrderCountChartPlugin` and `OrderItemCountByStatusChartPlugin` replace `CountOrderChartPlugin` and `StatusOrderChartPlugin` with charts designed for the new views. The old plugins still work, so this replacement is optional. If you replace them, do the same in `DashboardDependencyProvider::getDashboardPlugins()`.

### 3) Replace the removed Twig plugins

The Twig plugins of the Chart module were removed. Replace them wherever your project registers them:

| Removed | Replacement |
| --- | --- |
| `Spryker\Zed\Chart\Communication\Plugin\Twig\ChartTwigPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\ChartGuiTwigPlugin` |
| `Spryker\Zed\Chart\Communication\Plugin\ServiceProvider\TwigChartFunctionServiceProvider` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\ChartGuiTwigPlugin` |
| `Spryker\Zed\Chart\Communication\Plugin\Twig\TwigChartPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\ChartTwigPlugin` |
| `Spryker\Zed\Chart\Communication\Plugin\Twig\TwigBarChartPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\BarChartTwigPlugin` |
| `Spryker\Zed\Chart\Communication\Plugin\Twig\TwigLineChartPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\LineChartTwigPlugin` |
| `Spryker\Zed\Chart\Communication\Plugin\Twig\TwigPieChartPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\PieChartTwigPlugin` |
| `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\BartChartTwigPlugin` | `Spryker\Zed\ChartGui\Communication\Plugin\Twig\Chart\BarChartTwigPlugin` |

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

### 4) Update the project chart templates and configuration

Skip this step if your project does not override chart templates or chart configuration.

- The `@ChartGui/Chart/bar-chart.twig`, `line-chart.twig`, `pie-chart.twig` and `_partials/plotly-chart.twig` templates were removed. Every chart Twig function renders `@ChartGui/Chart/chart.twig`. Move your overrides there, or to the view templates in `@ChartGui/Chart/strategies/`.
- An override of `chart.twig` must keep the `chartAssets` block or call `chartAssets()` itself. Without it, the page does not load the chart script, and the chart stays empty.
- The template no longer receives `layout`. The chart size is defined by CSS: style the `.chart` and `.chart-plot--*` classes instead.
- `ChartConfig::getDefaultChartLayout()` and `ChartGuiConfig::getDefaultChartLayout()` were removed. Delete their overrides from `src/Pyz/Zed/Chart/ChartConfig.php` and `src/Pyz/Zed/ChartGui/ChartGuiConfig.php`.
- A project chart plugin can select a view by setting `ChartDataTransfer.view` to `cartesian`, `daily-bar`, `pie`, `order-status` or `ranking`. Without a view, a pie series is drawn with the `pie` view and any other series with the `cartesian` view. `ChartLayoutablePluginInterface::getChartLayout()` is ignored.
- `TopOrdersChartPlugin` sets the `ranking` view since `spryker/sales-statistics` 1.4.0, the minimum version that ChartGui 2.0.0 allows. If your project overrides `TopOrdersChartPlugin::getChartData()`, call `setView('ranking')` on the returned `ChartDataTransfer`. Without it, the chart shows **No data to display**.

### 5) Add the removed translations

The Chart module no longer provides the `Count orders`, `SKU` and `Title` Zed translations. If your project templates use them, add them to the project Zed translation files, then regenerate the translation cache:

```bash
console translator:generate-cache
```

### 6) Rebuild the Back Office frontend

The ECharts dependency is installed through the npm workspace of the Chart module. Make sure that the `workspaces` section of the project `package.json` covers the `assets/Zed` directories of the modules:

```json
"workspaces": [
    "vendor/spryker/*/assets/Zed"
]
```

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
