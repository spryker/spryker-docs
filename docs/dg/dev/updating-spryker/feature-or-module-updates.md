---
title: Feature or module updates
description: Choose at which level to take updates
last_updated: Jun 16, 2021
template: concept-topic-template
redirect_from:
- /docs/scos/dev/updating-spryker/feature-or-module-updates.html
---

When you know that you need to update your project, you need to decide if you want to do updates on the *feature* or the *module* level.

Features are released every several month as part of [Product Releases](/docs/about/all/releases/product-and-code-releases.html#product-releases). Modules updates are released as frequently as several times per day and are part of [Code Releases](/docs/about/all/releases/product-and-code-releases.html#atomic-code-releases).

The table below shows when it might be more relevant for you to make updates at the feature level and when at the module level.

| FEATURE-LEVEL UPDATE | MODULE-LEVEL UPDATE |
| --- | --- |
| Your project is in *operations mode*. The project is completed and is in the support phase, not much development is happening. | Your project is in active *development mode*, and you want to update more often to get the latest features and bug fixes. |
| You want to update as soon as a Spryker Product Release happens. | You are getting core commitments from Spryker at the module level. |
| Your strategy is to install and update features at once. | Your strategy is to have smaller and simpler updates more often. |
|  | You want to do updates with a single-module precision. |
|  | You want to be more flexible and be able to split updates into chunks, distributing them across sprints. |
|  | You have not been updating for a while (6+ months), and now you have to do a big update. |
|  | Your project is highly customized, and you extended a lot of code on the project level. |

## Switch from feature to module dependencies

To switch from updates on a feature level to a module level, you need to update your `composer. json` by replacing feature dependencies with the module dependencies which the features consist of.

### Check the features in your project

If you started with Spryker features, your `composer.json` should look similar to the following:

```json
"ext-readline": "*",
"ext-redis": "*",
"spryker-eco/loggly": "^0.1.0",
"spryker-feature/agent-assist": "^{{page.version}}",
"spryker-feature/alternative-products": "^{{page.version}}",
"spryker-feature/approval-process": "^{{page.version}}",
"spryker-feature/availability-notification": "^{{page.version}}",
"spryker-feature/cart": "^{{page.version}}",
....
```

### Check the modules a feature consists of

Every Spryker feature is a standalone module with a `composer.json` file with a list of individual Spryker modules as dependencies. A feature contains no functional code; the entire code is kept in modules.
Following the example with the `spryker-feature/agent-assist` feature, check [its composer.json file](https://github.com/spryker-feature/product-sets/blob/master/composer.json):

```json
{
  "name": "spryker-feature/product-sets",
  "description": "Product Sets [feature]",
  "type": "metapackage",
  "license": "proprietary",
  "minimum-stability": "dev",
  "prefer-stable": true,
  "require": {
    "php": ">=7.2",
    "spryker-shop/product-set-detail-page": "^1.5.0",
    "spryker-shop/product-set-list-page": "^1.0.1",
    "spryker-shop/product-set-widget": "^1.3.0",
    "spryker/product-set": "^1.4.0",
    "spryker/product-set-gui": "^2.3.0",
    "spryker/product-set-page-search": "^1.3.0",
    "spryker/product-set-storage": "^1.6.0"
  },
  "extra": {
    "branch-alias": {
      "dev-master": "202001.x-dev"
    }
  }
}
```

In the `require` part, you can see the modules this feature consists of.

### Replace feature dependencies with module dependencies

You can replace the `spryker-feature/agent-assist` dependency in your `composer.json` with the list of its dependencies (modules). After doing the same to other features, the project starts depending on modules instead of features. At the same time, the shop's functionality does not change.

## Next steps

[Plan updates](/docs/dg/dev/updating-spryker/planning-updates.html)
