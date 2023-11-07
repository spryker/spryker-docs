---
title: Docs updates
description: Spryker docs release notes
template: concept-topic-template
last_updated: Oct 2, 2023
redirect_from:
- /docs/scos/user/intro-to-spryker/docs-release-notes.html
---

## September 2023

In September 2023, we have added and updated the following pages:

### New pages

- [Catalog + Merchant Product Restrictions feature integration guide](/docs/pbc/all/search/202307.0/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-catalog-merchant-product-restrictions-feature.html)
- [Container set function](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/container-set-function.html): Check how plugins are registered in the dependency provider on the project level.
- [Ignore evaluation errors](/docs/scos/dev/guidelines/keeping-a-project-upgradable/ignore-evaluation-errors.html): Configure the evaluator to ignore some errors.
- [Spryker dev packages checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-dev-packages-checker.html): Check if all your Spryker packages have valid version constraints to prevent issues with Spryker Code Upgrader.
- [Configure Data Exchange API endpoints](/docs/scos/dev/glue-api-guides/202307.0/data-exchange-api/how-to-guides/how-to-configure-data-exchange-api.html).
- [How to send a request in Data Exchange API](/docs/scos/dev/glue-api-guides/202307.0/dynamic-data-api/how-to-guides/how-to-send-request-in-data-exchange-api.html).
- [Install the Data Exchange API](/docs/scos/dev/feature-integration-guides/202307.0/glue-api/data-exchange-api/install-the-data-exchange-api.html).

### Updated pages

- [Dynamic Multistore feature overview](/docs/pbc/all/dynamic-multistore/202307.0/base-shop/dynamic-multistore-feature-overview.html).
- [Delete stores](/docs/pbc/all/dynamic-multistore/202307.0/base-shop/delete-stores.html): Learn how to delete a store for the Dynamic Multistore feature.
- [Prepare a project for Spryker Code Upgrader](/docs/scu/dev/onboard-to-spryker-code-upgrader/prepare-a-project-for-spryker-code-upgrader.html): Get your project ready to start using Spryker Code Upgrader.
- [Bazaarvoice app integration guide](/docs/pbc/all/ratings-reviews/202307.0/third-party-integrations/integrate-bazaarvoice.html).
- [Algolia app integration guide](/docs/pbc/all/search/202311.0/base-shop/third-party-integrations/integrate-algolia.html).
- [Cart Notes feature integration guide](/docs/pbc/all/cart-and-checkout/202311.0/base-shop/install-and-upgrade/install-features/install-the-cart-notes-feature.html).
- [Order management feature integration guide](/docs/pbc/all/order-management-system/202311.0/base-shop/install-features/install-the-order-management-feature.html).
- [Packaging Units feature integration guide](/docs/pbc/all/product-information-management/202311.0/base-shop/install-and-upgrade/install-features/install-the-packaging-units-feature.html).
- [Push notification feature integration guide](/docs/pbc/all/push-notification/202311.0/unified-commerce/install-and-upgrade/install-the-push-notification-feature.html).
- [HowTo: Reduce Jenkins execution by up to 80% without P&S and Data importers refactoring](/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-costs-without-refactoring.html).
- [HowTo: Import big databases between environments](/docs/scos/dev/tutorials-and-howtos/howtos/howto-import-big-databases-between-environments.html).
- [Vertex app integration guide](/docs/pbc/all/tax-management/202311.0/base-shop/vertex/install-vertex.html).

For more details about these and other updates to the Spryker docs in September 2023, refer to the [docs release notes page on GitHub](https://github.com/spryker/spryker-docs/releases).


## August 2023

In August 2023, we have added and updated the following pages:

### New pages

- [HowTo: Reduce Jenkins execution by up to 80% without P&S and Data importers refactoring](/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-costs-without-refactoring.html): Learn how to save Jenkins-related costs or speed up background jobs processing by implementing a single custom worker for all stores.
- [Release notes 202307.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/release-notes-202307.0.html).
- [Security release notes 202307.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/security-release-notes-202307.0.html).
- [Spryker security checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/security.html): Learn how to check for security fixes in the Spryker modules.
- [Open-source vulnerabilities checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/open-source-vulnerabilities.html): Learn how to check if your PHP application depends on PHP packages with known security vulnerabilities.
- [Dynamic multistore docs](/docs/pbc/all/dynamic-multistore/202307.0/dynamic-multistore.html):
    - [Dynamic Multistore feature overview](/docs/pbc/all/dynamic-multistore/202307.0/base-shop/dynamic-multistore-feature-overview.html).
    - [Dynamic Multistore feature integration guide](/docs/pbc/all/dynamic-multistore/202307.0/base-shop/install-and-upgrade/install-features/install-dynamic-multistore.html).
    - [Dynamic Multistore + Availability Notification feature integration guide](/docs/pbc/all/dynamic-multistore/202307.0/base-shop/install-and-upgrade/install-features/install-dynamic-multistore-availability-notification-feature.html).
    - [Dynamic Multistore + Cart feature integration guide](/docs/pbc/all/dynamic-multistore/202307.0/base-shop/install-and-upgrade/install-features/install-dynamic-multistore-cart-feature.html).
    - [Dynamic Multistore + CMS feature integration guide](/docs/pbc/all/dynamic-multistore/202307.0/base-shop/install-and-upgrade/install-features/install-dynamic-multistore-cms-feature.html).
- [Service Points + Customer Account Management feature integration guide](/docs/pbc/all/service-points/202311.0/unified-commerce/install-and-upgrade/install-the-customer-account-management-service-points-feature.html).
- [Npm checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/npm-checker.html): Learn how you can identify security vulnerabilities in the npm dependencies with the Npm checker.
- [HowTo: Set up XDebug profiling](/docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-xdebug-profiling.html): Learn how to set up XDebug profiling in a local development environment.
- [Vertex integration guide](/docs/pbc/all/tax-management/202311.0/base-shop/vertex/install-vertex.html).
- [Select target branch for PRs](/docs/scu/dev/select-target-branch-for-prs.html): Learn how to select a target branch on Spryker CI.
- [Configure Spryker Code Upgrader](/docs/scu/dev/configure-spryker-code-upgrader.html): Learn how to configure the Spryker Code Upgrader.
- [Oryx: Design tokens](/docs/scos/dev/front-end-development/202307.0/oryx/building-applications/styling/oryx-design-tokens.html): Learn about the design tokens that provide a centralized and consistent approach for styling components in Oryx applications.
- [Oryx: Icon system](/docs/scos/dev/front-end-development/202307.0/oryx/building-applications/styling/oryx-icon-system.html): Learn about the icons that provide a consistent design system throughout components in Oryx applications.
- [Oryx: Localization](/docs/scos/dev/front-end-development/202307.0/oryx/building-applications/oryx-localization.html): Learn how localization is handled in Oryx applications.
- [Oryx: Typography](/docs/scos/dev/front-end-development/202307.0/oryx/building-applications/styling/oryx-typography.html): Learn about typography in Oryx.
- [File manager feature integration guide](/docs/pbc/all/content-management-system/202311.0/base-shop/install-and-upgrade/install-features/install-the-file-manager-feature.html).
- [Scheduled Prices feature integration guide](/docs/pbc/all/price-management/202311.0/base-shop/install-and-upgrade/install-features/install-the-scheduled-prices-feature.html).
- [Product Lists feature integration guide](/docs/pbc/all/product-information-management/202311.0/base-shop/install-and-upgrade/install-features/install-the-product-lists-feature.html).


### Updated pages

- [Minimum allowed shop version](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/minimum-allowed-shop-version.html): Learn how to resolve issues with project upgradability when your projects contains old package dependencies that are already not supported.
- [Product Offer Shipment feature integration guide](/docs/pbc/all/offer-management/202311.0/unified-commerce/install-and-upgrade/install-the-product-offer-shipment-feature.html).
- [Shipment + Service Points feature integration guide](/docs/pbc/all/carrier-management/202311.0/unified-commerce/install-and-upgrade/install-the-shipment-service-points-feature.html).
- [Product Rating and Reviews feature integration guide](/docs/pbc/all/ratings-reviews/202307.0/install-and-upgrade/install-the-product-rating-and-reviews-feature.html).
- [Shipment feature integration guide](/docs/pbc/all/carrier-management/202311.0/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html).
- [Best practises: Jenkins stability](/docs/cloud/dev/spryker-cloud-commerce-os/best-practices/best-practises-jenkins-stability.html): Learn how to improve the stability of the scheduler component..
- [Decoupled Glue infrastructure: Integrate the authentication](/docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html): Learn how to create an authentication token for the Storefront and Backend API applications in your project.
- [Add variables in the Parameter Store](/docs/ca/dev/add-variables-in-the-parameter-store.html):Learn how to define variables in the Parameter Store.

For more details about these and other updates to the Spryker docs in August 2023, refer to the [docs release notes page on GitHub](https://github.com/spryker/spryker-docs/releases).


## July 2023

In July 2023, we have added and updated the following pages:

### New pages
- [Oryx: Color system](/docs/scos/dev/front-end-development/202212.0/oryx/building-applications/styling/oryx-color-system.html): Documentation on colors in Oryx.
- [Best practises: Jenkins stability](/docs/ca/dev/best-practices/best-practises-jenkins-stability.html): Best practices for maintaining Jenkins stability.
- [HowTo: Reduce Jenkins execution by up to 80% without P&S and Data importers refactoring](/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-costs-without-refactoring.html): Save Jenkins-related costs or speed up background jobs processing by implementing a single custom Worker for all stores.
- [Release notes 202307.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/release-notes-202307.0.html): Release notes for the Spryker SCOS release 202307.0
- [Install the Product Rating and Reviews Glue API](/docs/pbc/all/ratings-reviews/202307.0/install-and-upgrade/install-the-product-rating-and-reviews-glue-api.html): This document describes how to integrate the [Product Rating and Reviews](/docs/pbc/all/ratings-reviews/{{site.version}}/ratings-and-reviews.html) Glue API feature into a Spryker project.
- [Configure Usercentrics](/docs/pbc/all/usercentrics/configure-usercentrics.html): Find out how you can configure Usercentrics in your Spryker shop.
- [Ratings and Reviews data import](/docs/pbc/all/ratings-reviews/202204.0/import-and-export-data/ratings-and-reviews-data-import.html): Details about data import files for the Ratings and Reviews PBC.
- [Search data import](/docs/pbc/all/search/202212.0/base-shop/import-and-export-data/search-data-import.html): Details about data import files for the Search PBC.
- [Tax Management data import](/docs/pbc/all/tax-management/202307.0/base-shop/spryker-tax/import-and-export-data/tax-management-data-import.html): Details about data import files for the Tax Management PBC.
- [Warehouse Management System data import](/docs/pbc/all/warehouse-management-system/202212.0/base-shop/import-and-export-data/warehouse-management-system-data-import.html): Details about data import files for the Warehouse Management System PBC.
- [Marketplace Merchant Portal Product Management feature overview](/docs/pbc/all/product-information-management/202212.0/marketplace/marketplace-merchant-portal-product-management-feature-overview.html): Overview of the Marketplace Merchant Portal Product Management feature.
-
### Updated pages
- [Integrate Usercentrics](/docs/pbc/all/usercentrics/integrate-usercentrics.html): Find out how you can integrate Usercentrics in your Spryker shop.
- [Usercentrics](/docs/pbc/all/usercentrics/usercentrics.html): [Usercentrics](https://usercentrics.com/) is the Consent Management Platform (CMP) that lets you obtain and manage the consent of your users to use cookies across your store.
- [Adding variables in the parameter store](/docs/ca/dev/add-variables-in-the-parameter-store.html): Added reserved variable sub-section and removed deprecated text.
- [Security Release Notes 202306.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202306.0/security-release-notes-202306.0.html): Added missing security HTTP headers.
- [Merchant Users Overview](/docs/pbc/all/merchant-management/202212.0/marketplace/marketplace-merchant-feature-overview/merchant-users-overview.html): Added information about the assignment of groups for the merchant user.
- [Handle data with Publish and Synchronization](/docs/scos/dev/back-end-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html): Publish and Synchronization (P&S) lets you export data from Spryker backend (Zed) to external endpoints.
- [How send a request in Data Exchange API](/docs/scos/dev/glue-api-guides/202307.0/data-exchange-api/how-to-guides/how-to-send-request-in-data-exchange-api.html): Added error codes and error code descriptions.
- [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/202307.0/install-and-upgrade/install-features/install-the-spryker-core-feature.html): Updated code sample.
- [Install Docker prerequisites on Linux](/docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-linux.html): Learn about the steps you need to take before you can start working with Spryker in Docker on Linux.
- [Payment Service Provider](/docs/pbc/all/payment-service-provider/202212.0/payment-service-provider.html): Different payment methods for your shop.
- [System requirements](/docs/scos/dev/system-requirements/202304.0/system-requirements.html): This document provides the configuration that a system must have in order for the Spryker project to run smoothly and efficiently.
- [Supported browsers](/docs/scos/user/intro-to-spryker/supported-browsers.html): This document lists browsers supported by Spryker Cloud Commerce OS.
- [Install the shipment feature](/docs/pbc/all/carrier-management/202311.0/unified-commerce/install-and-upgrade/install-the-shipment-feature.html)
- [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html)
- [App manifest](/docs/acp/user/app-manifest.html): App Manifest is a set of JSON files that contain all the necessary information to register an application in the Application Tenant Registry Service and to display information about the application in the Application Catalog.
- [Development strategies](/docs/scos/dev/back-end-development/extend-spryker/development-strategies.html): Development strategies that you can use when building a Spryker project.
- [Project development guidelines](/docs/scos/dev/guidelines/project-development-guidelines.html): This document describes the strategies a project team can take while building a Spryker-based project.
- [Handling security issues](/docs/scos/user/intro-to-spryker/support/handling-security-issues.html): Use this document to learn how to report a security issue and to understand how we handle these reports.     
- [Install the Measurement Units feature](/docs/pbc/all/product-information-management/202307.0/base-shop/install-and-upgrade/install-features/install-the-measurement-units-feature.html): The guide describes how to integrate the [Measurement Units](/docs/pbc/all/product-information-management/202307.0/base-shop/feature-overviews/measurement-units-feature-overview.html) feature into your project.

For more details about these and other updates to the Spryker docs in July 2023, refer to the [docs release notes page on GitHub](https://github.com/spryker/spryker-docs/releases).

## June 2023

In June 2023, we have added and updated the following pages:

### New pages
- [Security release notes 202306.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202306.0/security-release-notes-202306.0.html).
- [Oryx: Presets](/docs/scos/dev/front-end-development/202212.0/oryx/building-applications/oryx-presets.html): Learn how you can use presets to install predefined applications.
- [Service Points feature integration guide](/docs/pbc/all/service-points/202311.0/unified-commerce/install-the-service-points-feature.html).
- [Shipment + Service Points feature integration guide](/docs/pbc/all/carrier-management/202311.0/unified-commerce/install-and-upgrade/install-the-shipment-service-points-feature.html).
- [Backend API - Glue JSON:API Convention integration](/docs/scos/dev/feature-integration-guides/202307.0/glue-api/install-backend-api-glue-json-api-convention.html).
- Documentation on shipment data import:
    - [File details - shipment_method_shipment_type.csv](/docs/pbc/all/carrier-management/202311.0/unified-commerce/import-and-export-data/import-file-details-shipment-method-shipment-type.csv.html).
    - [File details - shipment_type_store.csv](/docs/pbc/all/carrier-management/202311.0/unified-commerce/import-and-export-data/import-file-details-shipment-type-store.csv.html).
    - [File details - shipment_type.csv](/docs/pbc/all/carrier-management/202311.0/unified-commerce/import-and-export-data/import-file-details-shipment-type.csv.html).
- [Migration guide - Upgrade Node.js to v18 and npm to v9](/docs/scos/dev/front-end-development/202212.0/migration-guide-upgrade-nodejs-to-v18-and-npm-to-v9.html).
- [Spryker documentation style guide](/docs/scos/user/intro-to-spryker/contribute-to-the-documentation/spryker-documentation-style-guide/spryker-documentation-style-guide.html):
    - [Examples](/docs/scos/user/intro-to-spryker/contribute-to-the-documentation/spryker-documentation-style-guide/examples.html).
    - [Spelling](/docs/scos/user/intro-to-spryker/contribute-to-the-documentation/spryker-documentation-style-guide/spelling.html).

## Updated pages
- [Shipment feature integration guide](/docs/pbc/all/carrier-management/202311.0/unified-commerce/install-and-upgrade/install-the-shipment-feature.html).
- [Environments overview](/docs/ca/dev/environments-overview.html).
- [Spryker Core Back Office + Warehouse User Management feature integration guide](/docs/pbc/all/back-office/202311.0/unified-commerce/install-and-upgrade/install-the-spryker-core-back-office-warehouse-user-management-feature.html).
- [Warehouse User Management feature integration guide](/docs/pbc/all/warehouse-management-system/202311.0/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html).
- [Warehouse picking feature integration guide](/docs/pbc/all/warehouse-picking/202311.0/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html).
- [Push notification feature integration guide](/docs/pbc/all/push-notification/202311.0/unified-commerce/install-and-upgrade/install-the-push-notification-feature.html).
- [Product Offer Shipment feature integration guide](/docs/pbc/all/offer-management/202311.0/unified-commerce/install-and-upgrade/install-the-product-offer-shipment-feature.html).
- [Service Points feature integration guide](/docs/pbc/all/service-points/202311.0/unified-commerce/install-the-service-points-feature.html).
- [Additional logic in dependency provider](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/additional-logic-in-dependency-provider.html): Resolve issues with additional logic in dependency provider.
- [Dead code checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/dead-code-checker.html): Check if there is dead code that extends core classes in your project.
- [Minimum allowed shop version](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/minimum-allowed-shop-version.html): Learn how to resolve issues with project upgradability when your projects contains old package dependencies that are already not supported.
- [Multidimensional array](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/multidimensional-array.html): Resolve issues with the multidimensional arrays inside the dependency provider’s methods.
- [PHP version](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/php-version.html): Make sure the allowed and consistent PHP version is used in different project parts.
- [Plugin registration with restrictions](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/plugin-registration-with-restrintions.html): Resolve isues related to plugin registration with restrictions.
- [Security checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/security.html): Check if your PHP application depends on PHP packages with known security vulnerabilities.
- [Single plugin argument](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/single-plugin-argument.html): Resolve issues related to single plugin arguments inside the dependency provider’s methods.
- [Integrate profiler module](/docs/scos/dev/technical-enhancement-integration-guides/Integrate-profiler-module.html).
- [Approval Process feature overview](/docs/pbc/all/cart-and-checkout/202212.0/base-shop/approval-process-feature-overview.html).
- [Approval Process feature integration](/docs/pbc/all/cart-and-checkout/202212.0/base-shop/install-and-upgrade/install-features/install-the-approval-process-feature.html).

For more details on these and other updates to the Spryker docs in June 2023, refer to the [docs release notes page on GitHub](https://github.com/spryker/spryker-docs/releases).
## May 2023

In May 2023, we have added and updated the following pages:

### New pages

- [Docs release notes](/docs/scos/user/intro-to-spryker/docs-release-notes.html)
- Multistore documentation:
    - [Multistore setup options](/docs/ca/dev/multi-store-setups/multistore-setup-options.html): Learn about all the setup options you have for a multi-store environment.
    - [Checklist for a new store implementation](/docs/ca/dev/multi-store-setups/checklist-for-a-new-store-implementation.html): Overview of the high-level tasks and responsibilities of Spryker and Customer when setting up a new store.
- [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html): Learn how to install the App Orchestration Platform.
- [Run the evaluator tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html): Learn how to run the evaluator tool.
- [Upgradability guidelines](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html):
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
- [Add variables in the Parameter Store](/docs/ca/dev/add-variables-in-the-parameter-store.html)
- [Change default branch](/docs/scu/dev/change-default-branch.html): Learn how to change the default branch in Spryker CI
- [Oryx](/docs/scos/dev/front-end-development/202212.0/oryx/oryx.html) documentation:
    - [Set up Oryx](/docs/scos/dev/front-end-development/202212.0/oryx/getting-started/set-up-oryx.html): Learn how to set up an environment for developing in the Oryx framework.
    - [Oryx: Boilerplate](/docs/scos/dev/front-end-development/202212.0/oryx/getting-started/oryx-boilerplate.html): Create maintainable and upgradeable applications using the Oryx boilerplate.
    - [Oryx: Feature sets](/docs/scos/dev/front-end-development/202212.0/oryx/building-applications/oryx-feature-sets.html): Learn what the feature sets in Oryx are all about.
    - [Oryx: Packages](/docs/scos/dev/front-end-development/202212.0/oryx/getting-started/oryx-packages.html): Use Oryx packages from npm to ensure you can easily upgrade to newer versions.
    - [Oryx: Routing](/docs/scos/dev/front-end-development/202212.0/oryx/building-pages/oryx-routing.html): Lear how to set up the Oryx routing.
    - [Oryx: Versioning](/docs/scos/dev/front-end-development/202212.0/oryx/getting-started/oryx-versioning.html): Learn about the methods used in Oryx to deliver an advanced application development platform while maintaining stability.
    - [Oryx: Supported browsers](/docs/scos/dev/front-end-development/202212.0/oryx/getting-started/oryx-supported-browsers.html): Learn what browsers Oryx supports.
    - [Dependency injection](/docs/scos/dev/front-end-development/202212.0/oryx/architecture/dependency-injection/dependency-injection.html): Learn about the dependency injection that lets you customize logic but keep your project upgradable.
    - [Oryx service layer](/docs/scos/dev/front-end-development/202212.0/oryx/architecture/dependency-injection/oryx-service-layer.html): Learn about the service layer in Oryx serves as the foundation for the business logic.
    - [Dependency Injection: Using services](/docs/scos/dev/front-end-development/202212.0/oryx/architecture/dependency-injection/dependency-injection-using-services.html): Learn how to inject services and dependencies.
    - [Dependency Injection: Defining services](/docs/scos/dev/front-end-development/202212.0/oryx/architecture/dependency-injection/dependency-injection-defining-services.html): Recommended conventions for defining services.
    - [Dependency Injection: Providing services](/docs/scos/dev/front-end-development/202212.0/oryx/architecture/dependency-injection/dependency-injection-providing-services.html): Recommended conventions for providing services.
    - [Dependency Injection: Advanced strategies](/docs/scos/dev/front-end-development/202212.0/oryx/architecture/dependency-injection/dependency-injection-advanced-strategies.html): Strategies for using DI that cover advanced use cases.
    - [Oryx application orchestration](/docs/scos/dev/front-end-development/202212.0/oryx/building-applications/oryx-application-orchestration/oryx-application-orchestration.html): Orchestration of the Oryx Application.
    - [Oryx application](/docs/scos/dev/front-end-development/202212.0/oryx/building-applications/oryx-application-orchestration/oryx-application.html): Learn about the app of the Oryx Application.
    - [Oryx application environment](/docs/scos/dev/front-end-development/202212.0/oryx/building-applications/oryx-application-orchestration/oryx-application-environment.html): Learn about the environment of the Oryx Application.
    - [Oryx application feature](/docs/scos/dev/front-end-development/202212.0/oryx/building-applications/oryx-application-orchestration/oryx-application-feature.html): Learn about the feature of the Oryx Application.
    - [Oryx application plugins](/docs/scos/dev/front-end-development/202212.0/oryx/building-applications/oryx-application-orchestration/oryx-application-plugins.html): Learn about plugins of the Oryx Application.
    - [Reactivity](/docs/scos/dev/front-end-development/202212.0/oryx/architecture/reactivity/reactivity.html): Learn how Reactivity enables real-time updates.
    - [Key concepts of Reactivity](/docs/scos/dev/front-end-development/202212.0/oryx/architecture/reactivity/key-concepts-of-reactivity.html): Understand the Reactivity concepts that will help you understand how Oryx works.
    - [Reactive components](/docs/scos/dev/front-end-development/202212.0/oryx/architecture/reactivity/reactive-components.html): Learn about the reactive components that are built with Lit.
    - [Oryx: Integration of backend APIs](/docs/scos/dev/front-end-development/202212.0/oryx/architecture/reactivity/oryx-integration-of-backend-apis.html): Compose a frontend application from backend APIs.


### Updated pages

- [HowTo: Set up multiple stores](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html): Learn how to set up multiple stores.
- [App manifest](/docs/acp/user/app-manifest.html): Learn about the app manifest files and what necessary information they must contain
- [Spryker Code Upgrader](/docs/scu/dev/spryker-code-upgrader.html): Learn how to use the Spryker Code Upgrader to update your project easily.
- [Performance testing in staging environments](/docs/ca/dev/performance-testing-in-staging-enivronments.html): Our tips on executing the performance testing.
- [Configuring debugging in Docker](/docs/scos/dev/the-docker-sdk/202212.0/configuring-debugging-in-docker.html): Learn how to configure debugging in Docker.
- [Environment provisioning](/docs/ca/dev/environment-provisioning.html): Learn how you can submit an environment provisioning request.
- [Configure Algolia](/docs/pbc/all/search/202212.0/base-shop/third-party-integrations/algolia/configure-algolia.html): Learn how to configure the Algolia app.
- [Integrate Algolia](/docs/pbc/all/search/202212.0/base-shop/third-party-integrations/algolia/integrate-algolia.html): Learn how to integrate the Algolia app.

For more details on these and other updates to the Spryker docs in May 2023, refer to the [docs release notes page on GitHub](https://github.com/spryker/spryker-docs/releases).

## April 2023

In April 2023, we have added and updated the following pages:

### New pages

- [Connect the Upgrader to a project self-hosted with GitLab](/docs/scu/dev/onboard-to-spryker-code-upgrader/connect-spryker-ci-to-a-project-self-hosted-with-gitlab.html): Learn how to connect the Spryker Code Upgrader manually using a Gitlab CE/EE access token.
- [Updating Spryker](/docs/scos/dev/updating-spryker/updating-spryker.html#spryker-product-structure): Learn how and when to update your Spryker project.
- Warehouse picking feature integration guides:
    - [Install the Warehouse picking feature](/docs/pbc/all/warehouse-picking/202311.0/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
    - [Install the Warehouse picking + Product feature](/docs/pbc/all/warehouse-picking/202311.0/unified-commerce/install-and-upgrade/install-the-warehouse-picking-product-feature.html)
- [Security release notes 202304.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202304.0/security-release-notes-202304.0.html)
- [Releases vs Customization types](/docs/sdk/dev/releases-vs-customization-types.html): Learn about the customization strategies and release types you can use to integrate releases and customize your project.

### Updated pages
- [Install the Spryker Core Back Office + Warehouse User Management feature](/docs/pbc/all/back-office/202311.0/unified-commerce/install-and-upgrade/install-the-spryker-core-back-office-warehouse-user-management-feature.html)
- [Install the Spryker Core Back Office feature](/docs/pbc/all/back-office/202307.0/install-the-spryker-core-back-office-feature.html)
- [Product + Category feature integration](/docs/pbc/all/product-information-management/202307.0/base-shop/install-and-upgrade/install-features/install-the-product-category-feature.html)
- [Install the Shipment feature](/docs/pbc/all/carrier-management/202311.0/unified-commerce//install-and-upgrade/install-the-shipment-feature.html)

For more details about the latest additions and updates to the Spryker docs, refer to the [docs release notes page on GitHub](https://github.com/spryker/spryker-docs/releases).
