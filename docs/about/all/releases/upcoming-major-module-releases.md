---
title: Upcoming major module releases
description: Learn what modules and when will have the next major versions release
last_updated: Nov 12, 2026
template: concept-topic-template
---


This document lists all upcoming [major module releases](/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html). Major module releases may require additional development effort during an upgrade, so we recommend planning ahead.

| MODULE | DATE | REASON FOR THE MAJOR VERSION |
| --- | --- | --- |
| ShopUi 2.0.0 | Aug 03 2026 | The frontend builder for Yves moves from the project's `frontend/` directory into the ShopUi module. Projects must point the `yves:*` npm scripts at the builder in the module, replace `frontend/settings.js` with `frontend/yves.settings.mts`, and run Node.js 24 or later. |
| Chart 2.0.0 | TBD | The Back Office charts move from Plotly to ECharts, and the `spryker-zed-chart-plotly-main` bundle is replaced with `spryker-zed-chart-main`. The Twig chart plugins, `TwigChartFunctionServiceProvider`, the Plotly templates and the plugin stacks in `ChartDependencyProvider` are removed. The Back Office must be built with frontend builder v2, which requires `spryker/gui` 5.8.0 or later and Node.js 24.15.0 or later. Projects must register chart plugins in `ChartGuiDependencyProvider::getChartPlugins()`, use the Twig plugins of `spryker/chart-gui`, and rebuild the Zed frontend. For the steps, see [Upgrade the Chart module](/docs/pbc/all/back-office/latest/base-shop/install-and-upgrade/upgrade-the-chart-module.html). |
| ChartGui 2.0.0 | TBD | The `chart`, `barChart`, `lineChart` and `pieChart` Twig functions render one template, `@ChartGui/Chart/chart.twig`, with ECharts. The per-type Plotly templates, `ChartGuiConfig::getDefaultChartLayout()` and the deprecated `BartChartTwigPlugin` are removed, and the chart size comes from CSS. The Back Office must be built with frontend builder v2, which requires `spryker/gui` 5.8.0 or later and Node.js 24.15.0 or later. Projects must register `ChartGuiTwigPlugin` in the Zed Twig plugin stack, call `chartAssets()` in any project override of `chart.twig`, and move project overrides of the removed templates to the new chart view templates. For the steps, see [Upgrade the Chart module](/docs/pbc/all/back-office/latest/base-shop/install-and-upgrade/upgrade-the-chart-module.html). |

