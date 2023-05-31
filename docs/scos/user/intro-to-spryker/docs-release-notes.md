---
title: Docs release notes
description: Spryker docs release notes
template: concept-topic-template
---

## May 2023

In May 2023, we have added and updated the following pages:

### New pages

- [Docs release notes](/docs/scos/user/intro-to-spryker/docs-release-notes.html)
- Multistore documentation:
    - [Multistore setup options](/docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/multistore-setup-options.html): Learn about all the setup options you have for a multistore environment.
    - [Checklist for a new store implementation](/docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/checklist-for-a-new-store-implementation.html): Overview of the high-level tasks and responsibilities of Spryker and Customer when setting up a new store.
- [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html): Learn how to install the App Orchestration Platform.
- [Run the evaluator tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html): Learn how to write the evaluator tool.
- [Upgardability guidelines](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html):
    - [Additional logic in dependency provider](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/additional-logic-in-dependency-provider.html): Resolve issues with additional logic in dependency provider
    - [Dead code checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/dead-code-checker.html): Check if there is dead code that extends core classes in your project.
    - [Minimum allowed shop version](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/minimum-allowed-shop-version.html): Learn how to resolve issues with project upgradability when your projects contains old package dependencies that are already not supported.
    - [Multidimensional array](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/multidimensional-array.html): Resolve issues with the multidimensional arrays inside the dependency provider’s methods.
    - [PHP version](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/php-version.html): Make sure the allowed and consistent PHP version is used in different project parts.
    - [Plugin registration with restrictions](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/plugin-registration-with-restrintions.html): Resolve isues related to plugin registration with restrictions.
    - [Security checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/security.html): Check if your PHP application depends on PHP packages with known security vulnerabilities.
    - [Single plugin argument](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/single-plugin-argument.html): Resolve issues related to single plugin arguments inside the dependency provider’s methods.
- [HowTo: Allow Zed SCSS/JS on a project level for `oryx-for-zed` version 2.12.0 and earlier](/docs/scos/dev/tutorials-and-howtos/howtos/howto-allow-zed-css-js-on-a-project-for-oryx-for-zed-2.12.0-and-earlier.html)
- [HowTo: Allow Zed SCSS/JS on a project level for `oryx-for-zed` version 2.13.0 and later](/docs/scos/dev/tutorials-and-howtos/howtos/howto-allow-zed-css-js-on-a-project-for-oryx-for-zed-2.13.0-and-later.html)
- [Add variables in the Parameter Store](/docs/cloud/dev/spryker-cloud-commerce-os/add-variables-in-the-parameter-store.html)
- [Change default branch](/docs/scu/dev/change-default-branch.html): Learn how to change the default branch in Spryker CI

### Updated pages

- [HowTo: Set up multiple stores](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html): Learn how to set up multiple stores.
- [App manifest](/docs/acp/user/app-manifest.html): Learn about the app manifest files and what necessary information they must contain
- [Spryker Code Upgrader](/docs/scu/dev/spryker-code-upgrader.html): Learn how to use the Spryker Code Upgrader to update your project easily.
- [Performance testing in staging environments](/docs/cloud/dev/spryker-cloud-commerce-os/performance-testing-in-staging-enivronments.html): Our tips on executing the performance testing
- [Configuring debugging in Docker](/docs/scos/dev/the-docker-sdk/202212.0/configuring-debugging-in-docker.html): Learn how to configure debugging in Docker.
- [Environment provisioning](/docs/cloud/dev/spryker-cloud-commerce-os/environment-provisioning.html): Learn how you can submit an environment provisioning request.
- [Configure Algolia](/docs/pbc/all/search/202212.0/third-party-integrations/configure-algolia.html): Learn how to configure the Algolia app.
- [Integrate Algolia](/docs/pbc/all/search/202212.0/third-party-integrations/integrate-algolia.html): Learn how to integrate the Algolia app.

## April 2023

In April 2023, we have added and updated the following pages:

### New pages

- [Connect the Upgrader to a project self-hosted with GitLab](/docs/scu/dev/onboard-to-spryker-code-upgrader/connect-spryker-ci-to-a-project-self-hosted-with-gitlab.html): Learn how to connect the Spryker Code Upgrader manually using a Gitlab CE/EE access token.
- [Updating Spryker](/docs/scos/dev/updating-spryker/updating-spryker.html#spryker-product-structure): Learn how and when to update your Spryker project.
- Warehouse picking feature integration guides:
    - [Install the Warehouse picking feature](/docs/scos/dev/feature-integration-guides/202304.0/install-the-warehouse-picking-feature.html)
    - [Install the Picker user login feature](/docs/scos/dev/feature-integration-guides/202304.0/install-the-picker-user-login-feature.html)
    - [Install the Warehouse picking + Inventory Management feature](/docs/scos/dev/feature-integration-guides/202304.0/install-the-warehouse-picking-inventory-management-feature.html)
    - [Install the Warehouse picking + Order Management feature](/docs/scos/dev/feature-integration-guides/202304.0/install-the-warehouse-picking-order-management-feature.html)
    - [Install the Warehouse picking + Product feature](/docs/scos/dev/feature-integration-guides/202304.0/install-the-warehouse-picking-product-feature.html)
   - [Install the Warehouse picking + Shipment feature](/docs/scos/dev/feature-integration-guides/202304.0/install-the-warehouse-picking-shipment-feature.html)
   - [Install the Warehouse picking + Spryker Core Back Office feature](/docs/scos/dev/feature-integration-guides/202304.0/install-the-warehouse-picking-spryker-core-back-office-feature.html)
- [Security release notes 202304.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202304.0/security-release-notes-202304.0.html)
- [Releases vs Customization types](/docs/sdk/dev/releases-vs-customization-types.html): Learn about the customization strategies and release types you can use to integrate releases and customize your project.

### Updated pages
- [Install the Spryker Core Back Office + Warehouse User Management feature](/docs/pbc/all/back-office/202304.0/install-spryker-core-back-office-warehouse-user-management-feature.html)
- [Install the Spryker Core Back Office feature](/docs/pbc/all/back-office/202304.0/install-the-spryker-core-back-office-feature.html)
- [Product + Category feature integration](/docs/pbc/all/product-information-management/202304.0/base-shop/install-and-upgrade/install-features/install-the-product-category-feature.html)
- [Install the Shipment feature](/docs/pbc/all/carrier-management/202304.0/base-shop/install-and-upgrade/install-the-shipment-feature.html)

For more details on the latest additions and updates to the Spryker docs, refer to the [docs release notes page on GitHub](https://github.com/spryker/spryker-docs/releases).
