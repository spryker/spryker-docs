---
title: Release notes 202108.0
last_updated: Sep 7, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-2021080
originalArticleId: 174adeff-8507-4fb6-9d7c-df0299956f14
redirect_from:
  - /2021080/docs/release-notes-2021080
  - /2021080/docs/en/release-notes-2021080
  - /docs/release-notes-2021080
  - /docs/en/release-notes-2021080
---

The Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business level description of new features and enhancements.
For information about installing the Spryker Commerce OS, see [Getting Started Guide](/docs/scos/dev/developer-getting-started-guide.html).


## Spryker Cloud Commerce OS

This section describes the new features released for Spryker Commerce OS.

### Password and security

With this release, you can tailor the customer registration process to your needs. A customer can register with an email address and a password, or you can choose to ask for more details. Once a customer enters the required information, the customer account is created. A double-opt-in option ensures that the registration process follows all the GDPR requirements.
Also, we’ve improved the Storefront security check. Now, the shop owners can set password requirements for customers and agent users, such as minimum length and special characters.
Password configuration comes with a brute force attack protection: after a certain number of failed login attempts, the user account can be locked for a set amount of time. You can configure the threshold for the number of login attempts and the account lockout duration.

#### Documentation

* [Customer Registration overview](/docs/scos/user/features/202108.0/customer-account-management-feature-overview/customer-registration-overview.html)
* [Customer Login overview](/docs/scos/user/features/202108.0/customer-account-management-feature-overview/customer-login-overview.html)


### Identity Access Manager: Back Office Login
With the support of the OpenID Connect protocol, you can now use Identity Access Managers to log in to the Spryker Back Office. To illustrate this capability, we offer the integration of the Microsoft Azure Active Directory service that allows your users to log in to the Back Office with their Microsoft Azure Active Directory credentials.

#### Documentation
[Back Office Login overview](/docs/scos/user/features/202108.0/spryker-core-back-office-feature-overview/spryker-core-back-office-feature-overview.html)

### Category per store
Spryker now supports store relations at the category level. You can hide and show categories per store depending on your business requirements. Child categories inherit the store relations of the parent category.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+notes+202108.0/category-per-store.png)

#### Documentation
[Category management](/docs/scos/user/features/202108.0/category-management-feature-overview.html)

### Avalara integration
Calculating sales tax for an order is never a trivial matter. Different products and services can have different tax rates or fixed tax amounts. In Europe, tax rates are the same for the whole country, but in the USA, tax rates are different per state, per city, and per zip code. Moreover, depending on your warehouses’ locations and your customers' locations, the taxes they pay for the same product are different. Each jurisdiction can always change the tax rate at its discretion.
Since tax calculation is not an area where mistakes are allowed, we decided to partner with [Avalara](https://www.avalara.com/us/en/index.html), a company that “lives and breathes tax compliance, so you don’t have to.”
The Avalara integration enables you to validate your customers’ and your warehouses’ addresses to improve the rate accuracy when calculating sales tax in the checkout process.

#### Documentation
[Tax](/docs/scos/user/features/202108.0/tax-feature-overview.html)

### Data exchange
While expanding the Spryker's out-of-the-box data exchange capabilities, we’ve implemented additional data importers and made small improvements, such as exception handling, dependencies, upgrading to PHP 7.3+, and minor bug fixes, that allow you to keep your software up to date.

#### Data import
These are the new data importers available in our default data import framework:

* Categories per store: [Import data associating categories with stores](/docs/scos/dev/data-import/202108.0/data-import-categories/catalog-setup/categories/file-details-category-store.csv.html).
* Warehouse address: [Import the warehouse address data](/docs/scos/dev/data-import/202108.0/data-import-categories/commerce-setup/file-details-warehouse-address.csv.html).

#### Data export
Within the Spryker’s default data export framework, we have made small improvements: exception handling, dependencies, upgrades, and minor fixes.

### Middleware
We have completed maintenance activities and done minor fixes helping you to keep your project up to date.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+notes+202108.0/middleware.png)

## The Docker SDK

This section describes the new functionalities released for the Docker SDK.

### Email configuration
The Docker SDK supports two new mailing-related parameters: `name` and `email address`. When sending emails like customer registration, the values of the parameters are used in the `From` field. You can define them in the `regions:services:mail:` section of the desired Deploy file.

#### Documentation
[Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html#regions)

### Sync solution: Mutagen

The Docker SDK supports [Mutagen](https://mutagen.io/) as the new default sync solution. You can configure it in the `docker:mount:` section of the desired Deploy file.

#### Documentation
[Configuring mutagen mount mode on MacOS](/docs/scos/dev/the-docker-sdk/202108.0/configuring-a-mount-mode.html#configuring-mutagen-mount-mode-on-macos)

### Smaller production images

The Docker SDK supports defining if Xdebug is to be built in Docker images. By default, it is enabled for the development environment and disabled for the production environment. You can define it in the `docker:debug:enabled:` section of the desired Deploy file.

#### Documentation
[Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html#docker-debug)

### Configurable cors-allow-origin

The Docker SDK supports defining [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for the Glue API application. You can define it in the `groups: applications: endpoints: cors-allow-origin:` section of the desired Deploy file.

#### Documentation
[Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html#groups-applications-endpoints)

### Accessing private repositories via SSH agent

The Docker SDK supports accessing private repositories via SSH agent. Private repository credentials are provided by SSH agent. They are used only when building images. You can use SSH agent for development environments and CI/CD pipelines.

#### Documentation
[Configuring access to private repositories](/docs/scos/dev/the-docker-sdk/202108.0/configuring-access-to-private-repositories.html)

### Graceful handling of SIGTERM and SIGSTOP

Worker processes support `SIGTERM` and `SIGSTOP` signal handling and gracefully shut down active tasks. It helps to address data consistency during autoscaling: a process can be killed to save resources or to be started in a different environment. This functionality is shipped by default with our Demo Shops.

#### Documentation
[Queue worker signal handling](/docs/scos/dev/technical-enhancement-integration-guides/configuring-queue-worker-signal-handling.html)

### ECR image scanning
[Amazon ECR image scanning](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html) is enabled in all environments and for all customers. ECR Image scanning scans each Docker image prepared during a CD pipeline execution and provides security findings you can analyze to improve security.
Images are scanned in the background when they are pushed to AWS ECR, so it does not affect the deployment duration. Reports are available as soon as an image was scanned.

### Configurable max-request-body-size
The Docker SDK supports configuring `max-request-body-size` per application. It is limited in the code for security reasons, but you can increase or remove the maximum value for selected applications. You can configure `max-request-body-size` in the `groups: applications: application: http: max-request-body-size:` section of the desired Deploy file.

#### Documentation
[Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html#groups-applications)

### CloudTrail retention time changes
Cloud Trail logs are now saved for at least 12 months for governance, compliance, operational auditing, and risk auditing of accounts. You can adjust the interval per your requirements.

### Elasticsearch: defining prefixes for indexes via a Deploy file
The Docker SDK configures prefixes for Elasticsearch index names based on the `namespace` attribute from a Deploy file. Now you can have several environment or application-related indexes inside the same Elasticsearch service. It works only in a local development environment.

### Documentation updates
We released the documentation covering the following Docker SDK topics: installing on Windows with WSL2, introduction and quick start guides, development: debugging, testing, configuring synchronization modes.

#### Documentation
[Docker SDK](/docs/scos/dev/the-docker-sdk/202108.0/the-docker-sdk.html)

## Spryker Glue API
We continue to add support for new storefront APIs.

### CMS pages API (basic information)
With the **CMS APIs**, you can retrieve basic information on CMS pages individually and in collections. The retrievable basic information includes name, URL, status, validity, SEO meta-title, meta-description, and meta-keywords. Information contained in content blocks is not retrievable yet.
If you use content banners and content product abstracts for your CMS page representation, you can retrieve their information together with the CMS page’s basic details in one request by including those resources in the request.

#### Documentation
[Retrieving CMS pages](/docs/scos/dev/glue-api-guides/202108.0/retrieving-cms-pages.html)

### Agent Assist APIs
With the **Agent Assist APIs**, you can create representations that enable a user to log in as agent, search for customers and log in on their behalf by using an impersonation token. After the login, the agent can carry out actions for the selected customer.

#### Documentation

* [Authenticating as an agent assist](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-agent-assists/authenticating-as-an-agent-assist.html)
* [Searching by customers as an agent assist](/docs/scos/dev/glue-api-guides/202108.0/managing-agent-assists/searching-by-customers-as-an-agent-assist.html)
* [Impersonating customers as an agent assist](/docs/scos/dev/glue-api-guides/202108.0/managing-agent-assists/impersonating-customers-as-an-agent-assist.html)
* [Managing agent assist authentication tokens](/docs/scos/dev/glue-api-guides/202108.0/managing-agent-assists/managing-agent-assist-authentication-tokens.html)

### Product Bundles APIs
With the **Product Bundles APIs**, you can create representations that cover the use of product bundles throughout the user journey, both for B2C and B2B. With this release, products, carts, and sales order endpoints support product bundles: you can retrieve product bundles, add them to the cart, manage them in the cart, and remove product bundles from the cart. All these endpoints consider the nature of the product bundles as a set of products that are always sold together.

#### Documentation

* [Retrieving bundled products](/docs/scos/dev/glue-api-guides/202108.0/managing-products/retrieving-bundled-products.html)
* [Retrieving concrete products](/docs/scos/dev/glue-api-guides/202108.0/managing-products/concrete-products/retrieving-concrete-products.html)
* [Retrieving abstract products](/docs/scos/dev/glue-api-guides/202108.0/managing-products/abstract-products/retrieving-abstract-products.html)
* [Managing items in carts of registered users](/docs/scos/dev/glue-api-guides/202108.0/managing-carts/carts-of-registered-users/managing-items-in-carts-of-registered-users.html)
* [Managing guest cart items](/docs/scos/dev/glue-api-guides/202108.0/managing-carts/guest-carts/managing-guest-cart-items.html)


### Configurable Bundles APIs
The **Configurable Bundle** endpoints allow you to create representations that enable your B2B customers to set up bundles that meet their expectations. There is an endpoint to get a collection of all the configurable bundle templates or individual ones. Configurable bundles can be added, updated, or deleted in registered users’ carts and in guest carts. The order placement and retrieval endpoints now also support the configurable bundle products.

#### Documentation

* [Retrieving configurable bundle templates](/docs/scos/dev/glue-api-guides/202108.0/managing-products/retrieving-configurable-bundle-templates.html)
* [Adding a configurable bundle to a guest cart](/docs/scos/dev/glue-api-guides/202108.0/managing-carts/guest-carts/managing-guest-cart-items.html#add-a-configurable-bundle-to-a-guest-cart)
* [Changing quantity of configurable bundles in a guest cart](/docs/scos/dev/glue-api-guides/202108.0/managing-carts/guest-carts/managing-guest-cart-items.html#change-quantity-of-configurable-bundles-in-a-guest-cart)
* [Removing a configurable bundle from a guest cart](/docs/scos/dev/glue-api-guides/202108.0/managing-carts/guest-carts/managing-guest-cart-items.html#remove-a-configurable-bundle-from-a-guest-cart)
* [Adding a configurable bundle to a registered user’s cart](/docs/scos/dev/glue-api-guides/202108.0/managing-carts/carts-of-registered-users/managing-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart)
* [Changing quantity of configurable bundles in a registered user’s cart](/docs/scos/dev/glue-api-guides/202108.0/managing-carts/carts-of-registered-users/managing-items-in-carts-of-registered-users.html#change-quantity-of-configurable-bundles-in-a-registered-users-cart)
* [Removing a configurable bundle from a registered user’s cart](/docs/scos/dev/glue-api-guides/202108.0/managing-carts/carts-of-registered-users/managing-items-in-carts-of-registered-users.html#remove-a-configurable-bundle-from-a-registered-users-cart)
* [Checking our purchases with configurable bundles](/docs/scos/dev/glue-api-guides/202108.0/checking-out/checking-out-purchases.html)
* [Retrieving orders with configurable bundles](/docs/scos/dev/glue-api-guides/202108.0/retrieving-orders.html)


### Product Management Attributes API
The **Product Management Attributes API** allows you to define and set interfaces for products with full control of the filters to be displayed and the allowed values to be used for each filtering.
In the context of this API, you can retrieve all searchable attributes or a specific one. Besides other values, the response contains localized attribute names and possible attribute values.

#### Documentation
[Retrieving product attributes](/docs/scos/dev/glue-api-guides/202108.0/managing-products/retrieving-product-attributes.html)

### Glue APIs support split delivery
With this release, the existing checkout-data, checkout, and orders endpoints support the **split delivery**. Now, you can create interfaces that enable a checkout process where customers can ship items to different addresses with different shipping methods in one order.

#### Documentation

* [Submitting checkout data](/docs/scos/dev/glue-api-guides/202108.0/checking-out/submitting-checkout-data.html)
* [Checking out purchases](/docs/scos/dev/glue-api-guides/202108.0/checking-out/checking-out-purchases.html)
* [Retrieving orders](/docs/scos/dev/glue-api-guides/202108.0/retrieving-orders.html)

### Customer saved addresses can be retrieved as a related resource for the checkout process (checkout-data GLUE API improvement)
You can now use the customers’ saved account addresses and retrieve them together with the checkout-data response in one request, as customer addresses (B2C) and business units address (B2B) can now be requested and included with the checkout data response.

#### Documentation
[Submitting checkout data](/docs/scos/dev/glue-api-guides/202108.0/checking-out/submitting-checkout-data.html)

### Double opt-in API
When users create an account in your system, an email with the registration confirmation link is sent to the users. The double opt-in endpoint allows making the customer registration confirmation a prerequisite for the successful customer login.
To enable the double opt-in process, we have added an incremental value to customer creation and access token endpoints.

#### Documentation
[Confirming customer registration](/docs/scos/dev/glue-api-guides/202108.0/managing-customers/confirming-customer-registration.html)

### Back-in-stock product notifications (email subscriptions) APIs
With this release, we introduce a set of endpoints that enable users to **subscribe to products** when they are out of stock, see active subscriptions and delete them.

#### Documentation

* [Managing availability notifications](/docs/scos/dev/glue-api-guides/202108.0/managing-products/managing-availability-notifications/managing-availability-notifications.html)
* [Retrieving subscriptions to availability notifications](/docs/scos/dev/glue-api-guides/202108.0/managing-products/managing-availability-notifications/retrieving-subscriptions-to-availability-notifications.html)

### Authentication compliance to OAuth 2.0 for Glue API
In the customer authorization context, there is now a new endpoint that is fully **compliant with the Oauth 2.0** framework.

#### Documentation
[Managing customer authentication tokens via OAuth 2.0](/docs/scos/dev/glue-api-guides/202108.0/managing-customers/managing-customer-authentication-tokens-via-oauth-2.0.html)

## Technical Enhancements
### Cart performance
We have revamped the shopping list and cart experience addressing the main performance drags on the most usual actions like adding new products, converting a shopping list, duplicating a cart, etc. We have achieved this due to the following techniques:

* Parallelizing the product availability check with MGET instead of single calls. Thus, we have also reduced the number of the single calls.
* Deferring non-essential cart items to AJAX calls.
* Adding the possibility of using eventual consistency patterns.

### Framework upgrade
We have done a complete revamp of the Spryker external libraries where we are deprecating some of the old ones in favor of their latest versions. Specifically, we have done the following:

* Included Symfony 5 support.
* Deprecated our PhantomJS dependencies for Chromedriver (Headless Chromium) with increase in speed and Codeception compatibility.
* Updated Twig to v1.42 and v3^.
* Updated Redis to v6.
* Added PHP 8 compatibility, in Spryker as well as in Propel where we will be dropping PHP 7.2 as deprecated.

#### Documentation

* [Symfony 5 integration](/docs/scos/dev/technical-enhancement-integration-guides/integrating-symfony-5.html)
* [Chromium browser for tests](/docs/scos/dev/technical-enhancement-integration-guides/integrating-chromium-browser-for-tests.html)
* [Test framework](/docs/scos/dev/guidelines/testing-guidelines/test-framework.html)
* [Migrating from Twig v1 to Twig v3](/docs/scos/dev/migration-concepts/migrating-from-twig-v1-to-twig-v3.html)
* [Supported versions of PHP](/docs/scos/user/intro-to-spryker/whats-new/supported-versions-of-php.html)


### MariaDB as a default Spryker database
We have chosen **Maria DB as the default database** for Spryker installations. Therefore, we have adjusted our tests, environments, and checks to this. Spryker will continue to be compatible with other engines, but expect the best performance and reliability from this new setup.

#### Documentation
[MariaDB database engine](/docs/scos/dev/technical-enhancement-integration-guides/integrating-mariadb-database-engine.html)

### P&S Testing Infrastructure
We are making available a **testing infrastructure** specifically for the Publish and Synchronize architecture. Now, we can run independent tests in our CI pipeline as well as constant Heartbeat tests that ensure the system is working properly.
We have also extended the testing framework so that you can include your tests.

#### Documentation
[Test framework](/docs/scos/dev/guidelines/testing-guidelines/test-framework.html)

### Transfer strict mode
We have introduced the **strict mode** and type hints for transfer objects in function arguments and return types. This allows for safer and cleaner code, raises the code legibility and the checking capacity of our validation tools. We maintain the flexibility to define as Strict, specific transfers or even fields within transfers.

#### Documentation
[Transfer strict types](/docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/creating-using-and-extending-the-transfer-objects.html#transfer-strict-types)


### Front-end (Profiling + Microdata)
Yves has also got its fresh features: the structured information is now generated on *Product details, Catalog, Shared Shopping List*, and *Product bundle* pages, allowing for a better SEO indexation. We have also included a Symfony Web Profiler that captures Zed, Redis, and ES calls which we believe will be very useful in controlling Yves behavior and its interactions with the rest of the components.

#### Documentation

* [Web Profiler Widget for Yves](/docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-web-profiler-widget-for-yves.html)
* [Basic SEO techniques to use in your project](/docs/scos/dev/best-practices/basic-seo-techniques-to-use-in-your-project.html)
