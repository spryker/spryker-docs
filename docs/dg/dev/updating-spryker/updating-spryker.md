---
title: Updating Spryker
description: Learn how to make the Spryker update process smoother, easier, and update efforts predictable
last_updated: Oct 10, 2023
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/updating-a-spryker-based-project
originalArticleId: 0aac9b81-7db9-4a7e-87f8-35c2ac6efe1d
redirect_from:
  - /docs/scos/dev/updating-a-spryker-based-project.html
  - /docs/scos/dev/updating-spryker/updating-spryker.html
---

Updating your Spryker shop is always an effort. New features, fixes, and updates are coming every day, and modules become more and more outdated. This raises many questions, the most common of which are:
- Do I actually need to update my project?
- If yes—how to do it wisely, to spend less time and stay up-to-date?
- How often should I update?
- What does the update process look like and how to plan and organize it?

This article gives answers to these questions and provides recommendations that will help you make the Spryker update process smoother, easier, and update efforts predictable.

[Spryker Code Upgrader](/docs/ca/devscu/spryker-code-upgrader.html) addresses the challenges of an application's upgradability and can help you semi-automate updates and make them regular.

## Spryker product structure

The smallest building block of Spryker is a *module*. Usually, a module does not represent a complete functionality. A complete functionality, or a *feature*, is represented by an aggregation of a set of modules. A feature is a virtual entity, which binds together a number of modules to satisfy certain functionalities. Check out the [Spryker feature repository](https://github.com/spryker-feature/) for detailed information about each feature.

The set of features makes up a *product*. Spryker offers the following products:
- [B2B Demo Shop](/docs/about/all/b2b-suite.html)
- [B2C Demo Shop](/docs/about/all/b2c-suite.html)
- [B2B Demo Marketplace](/docs/about/all/spryker-marketplace/marketplace-b2b-suite.html)
- [B2C Demo Marketplace](/docs/about/all/spryker-marketplace/marketplace-b2c-suite.html)
- [Master Suite](/docs/about/all/master-suite.html)

Schematically, the Spryker product structure looks like this:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Updating+a+Spryker-based+Project/product-structure.png)

## Why and when to update your Spryker shop

The most typical reasons to update modules or features are the following:
- There are important security or bug fixes that have been introduced recently.
- You want a new specific feature or module in your project, which requires a newer version of your modules.
- Your project has been started shortly before a new [product release](/docs/about/all/releases/product-and-code-releases.html#product-releases).
- You experience some issues with the shop that you would like to report or consult about.
- If you plan to extend your shop in future with new features from the ones that exist in Spryker or are coming out soon, your project should be always up to date. It will ease the new feature installation and reduce the migration efforts, allowing you to get the desired functionality faster.

{% info_block warningBox "Warning" %}

The more outdated your module versions become, the more effort will be needed to install the new features in future.

{% endinfo_block %}

The most *reasonable strategy* of staying up to date is sticking to the Spryker release cycle and updating modules whenever there is a new release announcement. To get notified about releases,  [subscribe to the release notes](/docs/about/all/releases/product-and-code-releases.html). During the active development phase, it makes sense to do updates more often, for example, monthly.

## Spryker Safari materials

Check out the how to migrate and update Spryker projects video for more details on the topic.

{% wistia kitd5w26zq 960 720 %}


## Next steps

[Feature or module updates](/docs/dg/dev/updating-spryker/feature-or-module-updates.html)
