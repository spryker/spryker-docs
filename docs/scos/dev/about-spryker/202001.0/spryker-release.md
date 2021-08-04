---
title: Spryker Release Process
originalLink: https://documentation.spryker.com/v4/docs/spryker-release-process
redirect_from:
  - /v4/docs/spryker-release-process
  - /v4/docs/en/spryker-release-process
---

Spryker has always prided itself on the fast pace of innovation and rapid development of new functionality. New features and enhancements are shipped almost daily.

Many customers benefit from these continuous releases by having immediate access to new, sometimes even beta versions of the Spryker's modules. At the same time, with the growth of our product, we faced a necessity to also have a more structured and organized release approach. To accommodate both the fast pace of innovation and predictability of the upgrade process, we support two types of releases: Atomic (Code) Releases and Product Releases.

![Product releases flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/image2018-8-10_17-10-26.png){height="" width=""}

## Atomic (Code) Releases
Atomic, or Code Release approach, implies that we introduce changes gradually and release updates only for the modified modules. So you don’t need to invest time in updating all the modules available in your project every time there is an update. Each Spryker module is released independently and has its own version. Also, every module has its own repository and dependencies declared in a `composer.json` file, which means you can select a specific module version and update it separately.

New versions of the existing Spryker modules as well as new modules are released, as soon as they are ready, in the [Spryker Commerce OS \(SCOS\) project repository](https://github.com/spryker-shop/suite).

The main benefit of the Code Releases is that customers who urgently need this new functionality can get access to it immediately. Such speed comes, of course, with some drawbacks.

We are making sure to provide draft documentation for the new functionality, as well as a module-level migration guide. Still, we cannot deliver full documentation and training materials at that time. Our QA team validates the newly released functionality and overall quality of the module, but cannot thoroughly check new module compatibility with other modules in all required combinations.

Also, Code Releases are not incorporated into the [Demo Shops](https://documentation.spryker.com/v4/docs/demoshops) and can contain beta versions on modules.

## Product Releases
Product Release is done every several months. The Product Release has its own version and is accompanied by the [Release Notes](/docs/scos/dev/about-spryker/202001.0/releases/release-notes/release-notes).  The Product Release code is stored in our [B2B Demo Shop repository](https://github.com/spryker-shop/b2b-demo-shop) and [B2C Demo Shop repository](https://github.com/spryker-shop/b2c-demo-shop) and includes a specific feature set that we believe is best suitable for each vertical.

A Product Release does not include beta modules. All of its features are integrated and tested in the Demo Shops, as well as fully documented.

