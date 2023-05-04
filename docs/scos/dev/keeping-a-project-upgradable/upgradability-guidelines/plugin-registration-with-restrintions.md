---
title: Plugin registration with restrictions
description: Reference information for evaluator tools.
template: howto-guide-template
---

## Problem description
If plugins must be registered in a specific order `after` and `before` annotations must be provided in the doc blocks. They must have specific syntax.
Annotated class must be imported into the provider class.

## Example of code that causes an upgradability error:

```php
protected function getProductOfferReferenceStrategyPlugins(): array
{
    return [
        /**
          * Restrictions:
          * - before. Call it always before MerchantProductProductOfferReferenceStrategyPlugin.
          */
        new ProductOfferReferenceStrategyPlugin(),
        new MerchantProductProductOfferReferenceStrategyPlugin(),
        /**
          * Restrictions:
          * - modifier {@link \Spryker\Client\ProductOfferStorage\Plugin\ProductOfferStorage\ProductOfferReferenceStrategyPlugin}
          * - after {@link \Spryker\Client\MerchantProductStorage\Plugin\ProductOfferStorage\MerchantProductProductOfferReferenceStrategyPlugin} Call it always after ProductOfferReferenceStrategyPlugin and MerchantProductProductOfferReferenceStrategyPlugin.
          */
        new DefaultProductOfferReferenceStrategyPlugin(),
    ];
}
```

### Related error in the Evaluator output:

```shell
==============================================
PLUGINS REGISTRATION WITH RESTRICTIONS CHECKER
==============================================

+---+--------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| # | Message                                                                                                                        | Target                            |
+---+--------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| 1 | Class "\Spryker\Zed\CategoryNavigationConnector\Communication\Plugin\InvalidPlagin" is not used in current dependency provider | CategoryDependencyProvider.php:25 |
+---+--------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| 2 | Restriction rule does not match the pattern "/^\* - (before|after) \{@link (?<class>.+)\}( .*\.|)$/"                           | CategoryDependencyProvider.php:25 |
+---+--------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| 3 | Restriction rule does not match the pattern "/^\* - (before|after) \{@link (?<class>.+)\}( .*\.|)$/"                           | CategoryDependencyProvider.php:47 |
+---+--------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
```

### Resolving the error: 

- To solve this issue annotations must follow the syntax:
```
* - <order_definition> {@link <full_path_to_the_plugin>} <optional_info_message>.
```
- Plugin annotated class should be imported into the current provider class.
