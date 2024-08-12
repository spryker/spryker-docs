

Functionality in Spryker is managed with the help of modules. A module is a single-function unit that has well-defined dependencies and can be installed and updated independently. [Composer](/docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html) is used for installing and managing module dependencies.

To make the management of functionality more efficient, modules combine into features, and features combine into PBCs. When you install a feature, you install a set of modules. When you install a PBC, you install a set of features. This gives you the flexibility of choosing the granularity of the functionality you want to add. You don't have to stick to just one approach during your development. For more details about modules, features, and PBCs, see [Modularity]()

## Installing PBCs

PBC is the biggest unit of functionality in Spryker. Some PBCs can be installed as a single unit, others are broken down into features.

## Installing features

Feature is the most common unit of functionality in Spryker and is the recommended way of managing functionality in your project.

Most feature overviews contain links to the guides for installing a feature. For example, see the [Prices feature overview](/docs/pbc/all/price-management/202311.0/base-shop/prices-feature-overview/prices-feature-overview.html).

If you already have the list of features you want to install, you can find installation guides in the **Install and upgrade** section of each PBC in the [PBC catalog](/docs/pbc/all/pbc.html).

## Installing modules

Installing modules comes in handy when you don't need an entire feature, but a certain functionality from it. To add a module, you need to add it to your project's `composer.json`.

For more details about managing dependencies with Composer, see [Managing dependencies with Composer](/docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html).

For a full list of modules, see the [Spryker repository](https://github.com/spryker).


## Next step of the getting started

[Customizing functionality]()
