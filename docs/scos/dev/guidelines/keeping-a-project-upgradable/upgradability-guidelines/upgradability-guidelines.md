---
title: Upgradability guidelines
description: Find solutions to Evaluator violations
template: howto-guide-template
redirect_from:
---

The documents in this section will help you resolve the issues related to code evaluation in a way that keeps your code upgradable and up to date with both Spryker's and industry coding standards.

When you get an evaluation error, check the name of the triggered check in the Evaluation output logs. The name is at the beginning of each error log.

Example:
```bash
============================================
DEPENDENCY PROVIDER ADDITIONAL LOGIC CHECKER
============================================

Message: In DependencyProvider, the "if (!static::IS_DEV) {}" conditional statement is forbidden.
Target:  tests/Acceptance/_data/InvalidProject/src/Pyz/Zed/Console/ConsoleDependencyProvider.php
```

In the example, the name is `DEPENDENCY PROVIDER ADDITIONAL LOGIC CHECKER`. The table bellow describes the error and documentation about it.

<div class="width-100">


| Check name  | Error message template                                                   | Documentation                                                                                                                                                                          |
| ----------- |--------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DEPENDENCY PROVIDER ADDITIONAL LOGIC CHECKER | The condition statement if {statement} is forbidden in the DependencyProvider | [Dependency provider additional logic checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/additional-logic-in-dependency-provider.html) |

</div>


## Avoid using deprecated method and classes
By avoiding [deprecated methods and classes](https://docs.spryker.com/docs/scos/dev/updating-spryker/updating-spryker.html) ensures stability, security, and compatibility with newer versions.

## Avoid using additional logic in dependency provider
Avoiding [additional logic in dependency providers](https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/additional-logic-in-dependency-provider.html) is required to maintain simplicity, reliability, and adherence to best practices, ensuring clean and efficient dependency injection.

## PHP Version
Use one [PHP version](https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/php-version.html) across all your environments.

## Avoid using outdated modules
Avoid using [outdated](https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/minimum-allowed-shop-version.html) feature- and core- modules.

## Avoid multiple nesting in the plugin registration methods 
Avoid to use [multiple nesting](https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/multidimensional-array.html) within plugin registration methods in the dependency providers.






