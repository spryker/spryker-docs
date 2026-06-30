---
title: Product Readiness overview
description: Understand how Product Readiness checks help you identify missing or incorrect product data and configuration issues before products go live.
last_updated: Nov 13, 2025
template: concept-topic-template
---

The Product Readiness feature provides diagnostic checks that evaluate the completeness and configuration quality of your products. It consolidates the critical prerequisites for making products available for sale and gives you immediate insight into what still needs attention. By surfacing potential data gaps and misconfigurations early, Product Readiness shortens the time required to prepare products for your storefront.

You can access the Product Readiness page from the product view page in the Back Office via the Product Readiness button.

{% info_block warningBox %}

Product Readiness identifies missing data and configuration inconsistencies, but it does not guarantee storefront visibility. Additional business logic or channel-specific rules can still prevent a product from appearing to shoppers.

{% endinfo_block %}

## Key capabilities

- Surfaces incomplete or inconsistent core product data, such as missing attribute values, pricing details, or stock information.
- Highlights configuration issues that block a product from reaching availability, including missing approvals or required assignments.
- Aggregates readiness signals in a single view so product teams can focus on remediation instead of manual investigations.

## How readiness checks work

- Product data is evaluated against a set of predefined readiness conditions that cover essential catalog requirements.
- Each condition returns a pass or actionable message describing what is missing or misconfigured.

## Use cases

| Scenario | Result |
| --- | --- |
| Launching a new product with complex attributes | Readiness checks ensure that vital data—such as descriptions, pricing, and stock—is populated before publication. |
| Investigating why a product is unavailable for purchase | Diagnostic messages point to missing prerequisites, reducing the time spent on manual troubleshooting. |
| Auditing seasonal campaign assortments | Teams can validate that all scheduled products satisfy baseline requirements ahead of launch. |
| Validating imported product batches | Import operators can confirm that newly created products include the necessary data before exposing them to sales channels. |

## Integration guide

The Back Office readiness view is powered by plugins that aggregate diagnostics from approval, activation, storage, and price modules. Implement the following steps in your project layer.

### 1. Register readiness provider plugins

Extend **\Pyz\Zed\ProductManagement\ProductManagementDependencyProvider** with the readiness providers that match your catalog requirements.

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductApprovalCommunication\Plugin\ProductManagement\ApprovalStatusAbstractProductReadinessProviderPlugin;
use Spryker\Zed\ProductApprovalCommunication\Plugin\ProductManagement\ApprovalStatusConcreteProductReadinessProviderPlugin;
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;
use Spryker\Zed\ProductPageSearchCommunication\Plugin\ProductManagement\PageSearchProductAbstractReadinessProviderPlugin;
use Spryker\Zed\ProductStorageCommunication\Plugin\ProductManagement\IsActiveAbstractProductReadinessProviderPlugin;
use Spryker\Zed\ProductStorageCommunication\Plugin\ProductManagement\IsActiveConcreteProductReadinessProviderPlugin;
use Spryker\Zed\ProductStorageCommunication\Plugin\ProductManagement\IsSearchableForLocaleAbstractProductReadinessProviderPlugin;
use Spryker\Zed\ProductStorageCommunication\Plugin\ProductManagement\IsSearchableForLocaleConcreteProductReadinessProviderPlugin;
use Spryker\Zed\ProductStorageCommunication\Plugin\ProductManagement\StorageTablePriceProductConcreteReadinessProviderPlugin;
use Spryker\Zed\ProductStorageCommunication\Plugin\ProductManagement\StorageTableProductAbstractReadinessProviderPlugin;
use Spryker\Zed\ProductStorageCommunication\Plugin\ProductManagement\StorageTableProductConcreteReadinessProviderPlugin;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    protected function getProductAbstractReadinessProviderPlugins(): array
    {
        return [
            new ApprovalStatusAbstractProductReadinessProviderPlugin(),
            new IsActiveAbstractProductReadinessProviderPlugin(),
            new IsSearchableForLocaleAbstractProductReadinessProviderPlugin(),
            new PageSearchProductAbstractReadinessProviderPlugin(),
            new StorageTableProductAbstractReadinessProviderPlugin(),
            new StorageTableProductConcreteReadinessProviderPlugin(),
        ];
    }

    protected function getProductConcreteReadinessProviderPlugins(): array
    {
        return [
            new ApprovalStatusConcreteProductReadinessProviderPlugin(),
            new IsActiveConcreteProductReadinessProviderPlugin(),
            new IsSearchableForLocaleConcreteProductReadinessProviderPlugin(),
            new StorageTablePriceProductConcreteReadinessProviderPlugin(),
            new StorageTableProductConcreteReadinessProviderPlugin(),
        ];
    }
}
```

## Extend readiness conditions on project level

You can add your own diagnostics by implementing the readiness provider plugin interfaces delivered by `spryker/product-management-extension`.

- `ProductAbstractReadinessProviderPluginInterface::provide()` receives a `ProductAbstractReadinessRequestTransfer` that contains the current `ProductAbstractTransfer`, its related `ProductConcreteTransfer` collection, and the existing `ProductReadinessTransfer` entries gathered so far. Return the same collection after appending your insights.
- `ProductConcreteReadinessProviderPluginInterface::provide()` works the same way for concrete products by consuming a `ProductConcreteReadinessRequestTransfer` that exposes the current `ProductConcreteTransfer`.
- Each `ProductReadinessTransfer` represents a single check. Populate the `title` and add one or more `values` that describe the current state (for example, *Yes*, *Missing price*).

### Sample concrete readiness plugin

The following example appends information about whether a concrete product is active. Use the same approach to describe other project-specific requirements, such as approval workflows or third-party data feeds.

```php
use ArrayObject;
use Generated\Shared\Transfer\ProductConcreteReadinessRequestTransfer;
use Generated\Shared\Transfer\ProductReadinessTransfer;
use Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteReadinessProviderPluginInterface;

class IsActiveConcreteProductReadinessProvider implements ProductConcreteReadinessProviderPluginInterface
{
    protected const TITLE_STATUS_IS_ACTIVE = 'Status is active';
    protected const VALUE_YES = 'Yes';
    protected const VALUE_NO = 'No';

    public function provide(
        ProductConcreteReadinessRequestTransfer $productConcreteReadinessRequestTransfer,
        ArrayObject $productReadinessTransfers
    ): ArrayObject {
        if (!$productConcreteReadinessRequestTransfer->getProductConcrete()) {
            return $productReadinessTransfers;
        }

        $productReadinessTransfers->append(
            (new ProductReadinessTransfer())
                ->setTitle(static::TITLE_STATUS_IS_ACTIVE)
                ->addValue(
                    $productConcreteReadinessRequestTransfer->getProductConcrete()->getIsActive()
                        ? static::VALUE_YES
                        : static::VALUE_NO,
                ),
        );

        return $productReadinessTransfers;
    }
}
```

Register the new plugin in the dependency provider method ProductManagementDependencyProvider::getProductConcreteReadinessProviderPlugins shown above so it appears in the Back Office Product Concrete readiness view together with the built-in checks.

## Related Business User documents

| BACK OFFICE USER GUIDES |
| --- |
| [Manage product variants](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/edit-product-variants.html) |
| [Manage abstract products and product bundles](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html) |

