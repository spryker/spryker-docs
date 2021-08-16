---
title: Migration Guide - NavigationGui
description: Use the guide to migrate to a newer version of the NavigationGui module.
originalLink: https://documentation.spryker.com/2021080/docs/mg-navigation-gui
originalArticleId: 16ab6db2-ee08-4363-9223-8733a25a1f06
redirect_from:
  - /2021080/docs/mg-navigation-gui
  - /2021080/docs/en/mg-navigation-gui
  - /docs/mg-navigation-gui
  - /docs/en/mg-navigation-gui
---

## Upgrading from Version 1.* to Version 2.*

In version 2, validity dates allow preseting date boundaries for each navigation node to control their own and their descendants visibility.

* Upgrade Navigation module to at least 2.0.0 version. See [Migration Guide - Navigation](/docs/scos/dev/migration-and-integration/{{page.version}}/module-migration-guides/migration-guide-navigation.html) to learn how to migrate the `Navigation` module.
* Update the NavigationGui module to at least 2.0.0 version in your `composer.json`.
* Make sure the new Zed user interface assets are built by running `npm run zed` (or `antelope build zed` for older versions).

Now, validity dates will be stored in Storage. 

To apply validity dates on navigation node display, take a look on Navigation feature integration.

<!-- Last review date: Sep 21, 2017 by Karoly Gerner -->
