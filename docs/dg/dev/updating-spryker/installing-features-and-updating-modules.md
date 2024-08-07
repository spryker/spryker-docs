---
title: Installing features and updating modules
description: Learn how to take different kinds of updates and install new packages
last_updated: Jun 16, 2021
template: concept-topic-template
redirect_from:
- /docs/scos/dev/updating-spryker/installing-features-and-updating-modules.html
---

This document describes how to install new features and modules and take different kind of updates.

## Bugfix and minor version updates

For *bugfix* and *minor* module version updates, run the update for modules from your update iteration. Example:

```BASH
composer update spryker/propel spryker/oms spryker/currency spryker/money spryker/glossary spryker/mail spryker/customer-extension spryker/calculation spryker/price-product …
```

If Composer warns you about dependencies on other modules, keep adding them to the list but make sure your update iteration does not get blown up too much. Otherwise, split the iteration into several ones.

Before taking minor updates for the modules you customized on the project level, double-check  that the update does not conflict with the project-level logic:

1. Go to `https://github.com/[module-name-here]/compare/[your-version]…[available-version]`.  For example, [https://github.com/spryker/price/compare/4.0.0...5.0.0](https://github.com/spryker/price/compare/4.0.0...5.0.0).
2. Carefully check the code changes.
3. Fix or integrate with any issues you find.

## Update to a major versions and install new packages

For *major* module version updates or installation of *new packages*, follow the steps below.

1. Require the new module:

```BASH
php -d memory_limit=-1 composer.phar require "spryker/price:^5.0.0"
```
If no extra dependencies are found, `composer.json` is updated respectively. Otherwise, see [Update is not possible](/docs/dg/dev/updating-spryker/troubleshooting-updates.html).

2. Follow the upgrade steps of the needed module version in the upgrade guide. Following the example with the price module, see [Upgrade the Price module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html).
3.  Check for project changes, just like for the *minor* updates in the section above. Go to  `https://github.com/[module-name-here]/compare/[your-version]…[available-version]` and check if there are any changes that might conflict with your business logic.


## Updating and installing features

At some point, you need to install new or update existing features.

Features are grouped into packaged business capabilities(PBCs). For a complete list of PBCs and respective features, see [Packaged Business Capabilities](/docs/pbc/all/pbc.html). In the Related Developer documents section of each feature overview, you can find links to the installation guides for the feature. For example, see [Related Developer documents](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/checkout-feature-overview/checkout-feature-overview.html#related-developer-documents) for the Checkout feature. Use the installation guides to install or update features.

When you open an installation guide, in the right upper corner of the page, select the version of the feature you want to install.

Sometimes, you may want to install a feature of a version higher than that of your installed features. In this case, instead of adding the feature to your `composer.json`, you need to add the modules which the feature consists of. For example, instead of `spryker-feature/gift-cards":"^201907.0"`, you can add the following:

```json
...
"spryker-shop/cart-code-widget": "^1.0.0",
"spryker-shop/gift-card-widget": "^1.1.0",`
...
```

A new feature may require a higher major version of a specific module. In this case, do a [single module update](#update-to-a-major-versions-and-install-new-packages).

You can learn about new Spryker features from the [release notes](/docs/about/all/releases/product-and-code-releases.html). Not to miss new release notes, we recommend [subscribing to our release newsletter](/docs/about/all/releases/product-and-code-releases.html).

## Next steps

[Testing updates](/docs/dg/dev/updating-spryker/testing-updates.html)
