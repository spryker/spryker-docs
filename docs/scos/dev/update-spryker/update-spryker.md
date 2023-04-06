---
title: Update Spryker
description: Learn how to make the Spryker update process smoother, easier, and update efforts predictable
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/updating-a-spryker-based-project
originalArticleId: 0aac9b81-7db9-4a7e-87f8-35c2ac6efe1d
redirect_from:
  - /2021080/docs/updating-a-spryker-based-project
  - /2021080/docs/en/updating-a-spryker-based-project
  - /docs/updating-a-spryker-based-project
  - /docs/en/updating-a-spryker-based-project
  - /v6/docs/updating-a-spryker-based-project
  - /v6/docs/en/updating-a-spryker-based-project
  - /v5/docs/updating-a-spryker-based-project
  - /v5/docs/en/updating-a-spryker-based-project
  - /v4/docs/updating-a-spryker-based-project
  - /v4/docs/en/updating-a-spryker-based-project
---

Updating your Spryker shop is always an effort. New features, fixes, and updates are coming every day, and modules become more and more outdated. This raises many questions, the most common of which are:
* Do I actually need to update my project?
* If yes—how to do it wisely, to spend less time and stay up-to-date?
* How often should I update?
* What does the update process look like and how to plan and organize it?

This article gives answers to these questions and provides recommendations that will help you make the Spryker update process smoother, easier, and update efforts predictable.

## Spryker product structure

The smallest building block of Spryker is a *module*. Usually, a module does not represent a complete functionality. A complete functionality, or a *feature*, is represented by an aggregation of a set of modules. A feature is a virtual entity, which binds together a number of modules to satisfy certain functionalities. Check out the [Spryker feature repository](https://github.com/spryker-feature/) for detailed information about each feature.

The set of features makes up a *product*. Spryker offers the following products:
* [B2B Demo Shop](/docs/scos/user/intro-to-spryker/b2b-suite.html)
* [B2C Demo Shop](/docs/scos/user/intro-to-spryker/b2c-suite.html)
* [Master Suite](/docs/scos/user/intro-to-spryker/master-suite.html)

Schematically, the Spryker product structure looks like this:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Updating+a+Spryker-based+Project/product-structure.png)

## Why and when to update your Spryker shop

The most typical reasons to update modules or features are the following:
* There are important security or bug fixes that have been introduced recently.
* You want a new specific feature or module in your project, which requires a newer version of your modules.
* Your project has been started shortly before a new [product release](/docs/scos/user/intro-to-spryker/spryker-release-process.html#product-releases).
* You experience some issues with the shop that you would like to report or consult about.
* If you plan to extend your shop in future with new features from the ones that exist in Spryker or are coming out soon, your project should be always up to date. It will ease the new feature installation and reduce the migration efforts, allowing you to get the desired functionality faster.

{% info_block warningBox "Warning" %}

The more outdated your module versions become, the more effort will be needed to install the new features in future.

{% endinfo_block %}

The most *reasonable strategy* of staying up to date is sticking to the Spryker release cycle and updating modules whenever there is a new release announcement. To get notified about releases,  [subscribe to the release notes](/docs/scos/user/intro-to-spryker/releases/releases.html). During the active development phase, it makes sense to do updates more often, for example, monthly.

## Features versus individual module updates

When you know that you need to update your project, you need to decide at which level you want to do updates: at the *feature *level* or the *module* level*.

{% info_block infoBox %}

Spryker does big [Product Releases](/docs/scos/user/intro-to-spryker/spryker-release-process.html#product-releases) of features every several months. The *modules* fall under the [Code Release](/docs/scos/user/intro-to-spryker/spryker-release-process.html#atomic-code-releases) process, and therefore there can be up to several module updates per day.

{% endinfo_block %}

The table below shows when it might be more relevant to you to make updates at the feature level and when at the module level.

| FEATURE-LEVEL UPDATE | MODULE-LEVEL UPDATE |
| --- | --- |
| Your project is in *operations mode*. The project is completed and is in the support phase, not much development is happening. | Your project is in active *development mode*, and you want to update more often to get the latest features and bugfixes. |
| You want to update as soon as a Spryker Product Release happens. | You are getting core commitments from Spryker at the module level. |
| Your strategy is to install and update features at once. | Your strategy is to have smaller and simpler updates more often. |
|  | You want to do updates with a single-module precision. |
|  | You want to be more flexible and be able to split updates into chunks, distributing them across your sprints. |
|  | You have not been updating for a while (6+ months), and now you have to do a big update. |
|  | Your project is highly customized, and you extended a lot of code at the project level. |

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

## Check the modules a feature consists of

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

You can replace the `spryker-feature/agent-assist` dependency in your `composer.json` with the list of its dependencies (modules). After doing the same to other features, the project starts depending on modules instead of features. At the same time, the shops functionality does not change.













## Spryker Safari materials

Check out the [How to migrate and update Spryker projects video](https://training.spryker.com/pages/spryker-tv?wchannelid=papy2tx2f6&wmediaid=kitd5w26zq) for more details on the topic.
