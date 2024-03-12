
## How to add functionality



A Spryker module is a single-function unit that has well-defined dependencies and can be updated independently. [Composer](/docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html) is used for installing and managing module dependencies.

To define your strategy when implementing updates, learn about our [module and feature release process](/docs/scos/user/intro-to-spryker/spryker-release-process.html).


## Strategies of adding functionality

With Spryker, you can add functionality using the following approaches:

* Install PBC
* Install feature
* Install module

You don't have to stick to just one approach during your development. Using different approaches give you the flexibility and granularity of adding exactly what you need.

### Installing PBCs

PBC is the biggest unit of functionality in Spryker. Some PBCs can be installed as a single unit, others are broken down into features.

### Installing features

Feature is the most common unit of functionality in Spryker and is the recommended way of managing functionality in your project.

Most feature overviews contain links to the guides for installing a feature. For example, see the [Prices feature overview](/docs/pbc/all/price-management/202311.0/base-shop/prices-feature-overview/prices-feature-overview.html).

If you already have the list of features you want to install, you can find installation guides in the **Install and upgrade** section of each PBC in the [PBC catalog](/docs/pbc/all/pbc.html).

### Installing modules
