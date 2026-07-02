---
title: Order details page performance guidance
description: Learn how Spryker optimizes the Back Office order details page performance by replacing sub-requests with plugin-based data expansion and rendering.
last_updated: Mar 25, 2026
template: concept-topic-template
---

The Back Office order details page can contain a large number of sub-requests. While sub-requests are a valid architectural pattern, in high-traffic environments they can become a source of performance issues—each sub-request adds latency and load to the system.

To address this, Spryker introduces two plugin stacks that replace sub-requests with direct plugin-based data expansion and rendering on the order details page.

## How it works

Previously, the order details page loaded data and rendered blocks by making sub-requests to other modules. Each sub-request was an independent HTTP call processed by the application stack, which multiplied response time and resource consumption proportionally to the number of blocks on the page.

The new approach uses two plugin stacks:

1. **Data expansion plugins**: Plugins collect and provide data directly, bypassing sub-requests.
2. **Block renderer plugins**: Plugins render template blocks directly, bypassing sub-requests.

If a plugin is registered, its data or rendered output is used. If a plugin is not registered, the system falls back to the original sub-request behavior, ensuring backward compatibility.

## Install the feature

To install the feature, update the required modules using Composer. The following is the full list of modules involved—your project may not require all of them.

```bash
composer update spryker/gift-card:"^1.13.0" spryker/manual-order-entry:"^1.3.0" spryker/money:"^2.17.0" spryker/oms:"^11.52.0" spryker/refund:"^5.15.0" spryker/sales:"^11.81.0" spryker/sales-extension:"^1.14.0" spryker/sales-order-threshold-gui:"^2.2.0" spryker/sales-payment-detail:"^1.6.0" spryker/sales-product-configuration-gui:"^1.1.0" spryker/sales-return-gui:"^2.2.0" spryker/shipment-gui:"^3.2.0" spryker-feature/self-service-portal:"^19.4.0" spryker/merchant-user:"^1.9.1"
```

For a full integration example, see the [B2B Demo Marketplace integration PR](https://github.com/spryker-shop/b2b-demo-marketplace/pull/957/changes).

For the complete release details, see [Release Group 6396](https://api.release.spryker.com/release-group/6396).

## Plugin stacks

### Data expansion plugins

The `getSalesOrderDetailDataExpanderPlugins()` method in `SalesDependencyProvider` registers plugins that expand order detail data directly, without sub-requests.

**Location:** `src/Pyz/Zed/Sales/SalesDependencyProvider.php`

```php
/**
 * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\SalesOrderDetailDataExpanderPluginInterface>
 */
protected function getSalesOrderDetailDataExpanderPlugins(): array
{
    return [
        new ShipmentSalesOrderDetailDataExpanderPlugin(),
        new ProductConfigurationSalesOrderDetailDataExpanderPlugin(),
        new CommentsSalesOrderDetailDataExpanderPlugin(),
        new OmsFormsSalesOrderDetailDataExpanderPlugin(),
        new ThresholdExpensesSalesOrderDetailDataExpanderPlugin(),
        new ShipmentExpensesSalesOrderDetailDataExpanderPlugin(),
    ];
}
```

{% info_block infoBox "Plugin registration" %}

Register only the plugins that are relevant to your project. Not all plugins may be required depending on the modules you use.

{% endinfo_block %}

### Block renderer plugins

The `getSalesDetailBlockRendererPlugins()` method in `SalesDependencyProvider` registers plugins that render order detail blocks directly, without sub-requests.

**Location:** `src/Pyz/Zed/Sales/SalesDependencyProvider.php`

```php
/**
 * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\SalesDetailBlockRendererPluginInterface>
 */
protected function getSalesDetailBlockRendererPlugins(): array
{
    return [
        new OrderTransferBlockRendererPlugin(),
        new SalesCommentBlockRendererPlugin(),
        new SalesReturnListBlockRendererPlugin(),
        new SalesPaymentDetailListBlockRendererPlugin(),
        new RefundSalesListBlockRendererPlugin(),
        new SelfServicePortalOrderInquiryListBlockRendererPlugin(),
    ];
}
```

{% info_block infoBox "Plugin registration" %}

Register only the plugins that are relevant to your project. Not all plugins may be required depending on the modules you use.

{% endinfo_block %}

This plugin stack replaces the sub-request configuration defined in `\Pyz\Zed\Sales\SalesConfig::getSalesDetailExternalBlocksUrls`.

### OrderTransferBlockRendererPlugin template map

`OrderTransferBlockRendererPlugin` requires an additional configuration on the project level that maps block URLs to Twig templates.

**Location:** `src/Pyz/Zed/Sales/SalesConfig.php`

```php
/**
 * @return array<string, string>
 */
public function getOrderDetailBlockUrlToTemplateMap(): array
{
    return [
        '/cart-note/sales/list' => '@CartNote/Sales/list.twig',
        '/comment-sales-connector/sales/list' => '@CommentSalesConnector/Sales/list.twig',
        '/cart-note-product-bundle-connector/sales/list' => '@CartNoteProductBundleConnector/Sales/list.twig',
        '/sales-payment-gui/sales/list' => '@SalesPaymentGui/Sales/list.twig',
        '/discount/sales/list' => '@Discount/Sales/list.twig',
    ];
}
```

Include only the entries that correspond to the modules enabled in your project.
