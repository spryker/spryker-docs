---
title: Product and code releases
description: An introduction to the Spryker product and atomic code releases and how Spryker releases new updates and features.
last_updated: Jul 3, 2026
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/spryker-release-process
originalArticleId: 3195aac4-0b8e-43a7-b540-0222f567c9fc
redirect_from:
- /docs/scos/user/intro-to-spryker/releases/releases.html
- /docs/scos/user/intro-to-spryker/releases/releases-archive.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-april-1-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-april-2-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-may-1-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-may-2-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-june-1-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-june-2-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-july-1-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-july-2-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-august-1-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-august-2-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-september-1-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-september-2-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-october-1-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-october-2-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-november-1-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-november-2-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2017/release-notes-december-2017.html
- /docs/scos/user/intro-to-spryker/releases/archive/2018/release-notes-january-2018.html
- /docs/scos/user/intro-to-spryker/releases/archive/2018/release-notes-february-2-2018.html
- /docs/scos/user/intro-to-spryker/releases/archive/2018/release-notes-february-1-2018.html
- /docs/scos/user/intro-to-spryker/releases/archive/2018/release-notes-march-2018.html
- /docs/scos/user/intro-to-spryker/releases/archive/2018/release-notes-april-2018.html
- /docs/scos/user/intro-to-spryker/whats-new/security-updates.html
- /docs/scos/user/intro-to-spryker/spryker-release-process.html
- /docs/scos/user/intro-to-spryker/releases/release-notes/release-notes.html

---

To accommodate both the fast pace of innovation and predictability of the upgrade process, we support two types of releases: atomic (code) releases and product releases.

![Product releases flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/image2018-8-10_17-10-26.png)

## Atomic (code) releases

Atomic, or code release approach, implies that we introduce changes gradually and release updates only for the modified modules. So you don't need to invest time in updating all the modules available in your project every time there is an update.
Each Spryker module is released independently and has its own version. Also, every module has its own repository and dependencies declared in a `composer.json` file, which means you can select a specific module version and update it separately.

New versions of the existing Spryker modules as well as new modules are integrated into [B2B Demo Marketplace](https://github.com/spryker-shop/b2b-demo-marketplace/) during the product release.

The main benefit of the Code Releases is that customers who urgently need new functionality can get access to it by installing corresponding module.

We are making sure to provide draft documentation for the new functionality, as well as a module-level migration guide. Our QA team validates the newly released functionality and overall quality of the module but cannot thoroughly check the new module's compatibility with other modules in all required combinations.

## Product releases

A product release happens every several months. A product release has its own version and is accompanied by release notes with a respective version. The product release code is stored in our [B2B Demo Marketplace repository](https://github.com/spryker-shop/b2b-demo-marketplace) and includes the most suitable feature set.

All of its features are integrated and tested, as well as fully documented.

## Release history

See [release-history](https://api.release.spryker.com/release-history) for latest releases including necessary project changes.
It also comes with an RSS feed.

## Mailing lists

We recommend that you subscribe to our release newsletter and security updates mailing lists so that we can let you know about new features and be immediately informed of any security updates that you need to know about.

To join our release notes mailing list, subscribe here:

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="b4d730db-d20e-4bb4-bd80-4cd7c9a2dc21" id="hubspot-1"></div>

To receive the security updates, request a subscription at [support@spryker.com](mailto:support@spryker.com).

## Next steps

- [Release notes](/docs/about/all/releases/product-and-code-releases.html)
