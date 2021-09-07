---
title: Marketplace Return Management feature walkthrough
last_updated: Aug 09, 2021
description: This article provides technical details on the Marketplace Return Management feature.
template: concept-topic-template
---

With the *Marketplace Return Management* feature, marketplace merchants can manage their returns.

To learn more about the feature and to find out how end users use it, see [Marketplace Return Management](/docs/marketplace/user/features/{{page.version}}/marketplace-return-management-feature-overview.html) feature overview for business users.

## Merchant Order Return Process 

The following schema illustrates Merchant Order Return Process:
![Entity diagram](https://confluence-connect.gliffy.net/embed/image/e12bcdcb-8510-4ebf-80c3-0ee1c3054002.png?utm_medium=live&utm_source=confluence)

**SalesReturnExtension** - created `ReturnPreCreatePluginInterface` and `ReturnRequestValidatorPluginInterface` plugin interfaces to expand functionality of `SalesReturn` module.

**MerchantSalesReturn** - introduced `MerchantReturnRequestValidatorPlugin` to check return items that they belongs to the same merchant.

**MerchantSalesReturnWidget** - introduced new widget to expand form for creating returns.

**DummyMarketplacePayment** -  created new plugin and facade method to expand Oms process for returns.

**SalesReturn** - executes new `ReturnPreCreatePluginInterface` and `ReturnRequestValidatorPluginInterface` plugin stacks for 

**SalesReturnPage** - uses new `MerchantSalesReturnWidget`, introduced `return-create-form.twig` molecule.

The following schema illustrates relations in the Return entity:
![Entity diagram](https://confluence-connect.gliffy.net/embed/image/9f01ed2f-2be0-4e59-afa3-e56fd8390b51.png?utm_medium=live&utm_source=confluence)

## Marketplace Returns (Operator and Main Merchant)

The following schema illustrates relations for Marketplace Returns (Operator and Main Merchant):
![Entity diagram](https://confluence-connect.gliffy.net/embed/image/cbd07a83-ec3f-4114-9d47-85a16615d4da.png?utm_medium=live&utm_source=confluence)

**MerchantSalesReturnMerchantUserGui** - added navigation and introduced controller to manage merchant returns in `BackOffice`.

**MerchantSalesReturnGui** - created new template to expand `SalesReturnGui` module template.

**MerchantSalesReturn** - introduced `MerchantReturnCreateTemplatePlugin` to override items rendering on return create page.

**MerchantSalesReturnsRestApi**  - constrapdated due to base module major.

**SalesReturnExtension** - introduced `ReturnExpanderPluginInterface` to expand `ReturnTransfer` during to get returns, deprecated `ReturnCollectionExpanderPluginInterface`.

**SalesReturnGuiExtension** - introduced `ReturnCreateTemplatePluginInterface` to replace the template, that renders item table, for return create page.

**SalesReturn** - executes new plugin stacks.

**SalesReturnGui** - executes new plugin stacks.

**MerchantSalesOrder** - adjusted functionality to get data about merchant sales orders. 

## Related Developer articles

| INTEGRATION GUIDES      | GLUE API GUIDES     |
| -------------------- | -------------- |
| [Marketplace Return Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-return-management-feature-integration.html) | [Managing the returns](/docs/marketplace/dev/glue-api-guides/{{page.version}}/managing-the-returns.html) |
| [Glue API: Marketplace Return Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-return-management-feature-integration.html) |                                                              |
