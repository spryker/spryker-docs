---
title: Release notes 202307.0
description: Release notes for the Spryker SCOS release 202307.0
last_updated: Jul 31, 2023
template: concept-topic-template
redirect_from:
- /docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/release-notes-202307.0.html

---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and enhancements.

For information about installing the Spryker Commerce OS, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).

## Spryker Commerce OS

This section describes the new features released for Spryker Commerce OS.

### [Spryker SDK] Performance Tracing Toolbar <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Trace your request execution flow to find bottlenecks and optimize your code. The developer toolbar has a new section now, allowing engineers to easily activate the request tracing and examine the whole request flow to find bottlenecks and build performant and optimal code.

![request-tracing](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/release-notes-202307.0.md/request-tracing.png)

**Business benefit**: Lower response time, faster end-user experience resulting in higher conversion rates.

#### Documentation

[Integrate profiler module](/docs/dg/dev/integrate-and-configure/Integrate-profiler-module.html#prerequisites)

### [Spryker Code Upgrader] Upgrader Compliance Evaluator <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Make sure your code is compliant and simple to upgrade with Spryker Code Upgrader. This tool allows your team to evaluate your project code and highlight potential issues. Fixing these issues simplifies your upgrading experience.

* [Detecting dead code](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/dead-code-checker.html): Reducing dead code is important for maintenance and upgrade because otherwise, your teams invest time in maintaining the code that is not used.
* [Security checker](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-security-checker.html): We let you know about known vulnerabilities in third-party packages so that your team keeps them up-to-date.
* [Minimal version check](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/minimum-allowed-shop-version.html): Spryker Code Upgrader is available for customers from SCOS version 2022.04.
* [PHP versions check](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/php-version.html): We verify that you use the same version of PHP in composer.json, deploy*.yml, and your runtime to maintain consistency and prevent possible incompatibilities when installing dependencies. For instance, if you are using PHP 8.1 during development or upgrades, but your production system is running on PHP 7.4. Additionally, we check for the minimal PHP version, which is PHP 7.4. Keep in mind that the minimal version will be upgraded to 8.0 in the future, as 7.4 has reached its end of life.

These are the structural code validator of dependency providers:

* [Additional logic in dependency provider](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/additional-logic-in-dependency-provider.html): From an architectural standpoint, dependency providers must contain no business logic. Otherwise, the dependency providers are harder to maintain.
* [Flatter arrays in dependency providers](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/multidimensional-array.html): It is recommended to have flat arrays of plugins in dependency providers, as it simplifies the upgrade process.
* [Simple plugin instantiation in dependency providers](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/multidimensional-array.html): Plugins should be easy to instantiate and have minimal injected dependencies. Otherwise, the leakage of business logic into dependency providers makes maintenance more complex.

Example of the violation report:
```bash
=================
DEAD CODE CHECKER
=================

Message: The class "Pyz/Zed/Single/Communication/Plugin/SinglePlugin" is not used in the project.
Target:  Pyz/Zed/Single/Communication/Plugin/SinglePlugin
```

**Business benefit**: Easier upgrades, fewer security risks, and higher awareness of known vulnerabilities in your dependencies.

#### Documentation

* [Run the evaluator tool](/docs/dg/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html)
* [Upgradability guidelines](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html)


### [ACP App] Algolia App <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

With Algolia Search, you can create an efficient path to purchase for your customers using our innovative search and navigation solution. It empowers your buyers to quickly discover the products they desire. Currently designed for headless storefronts, the ACP Algolia App is not directly compatible with Yves storefronts out of the box. However, it offers a powerful and flexible implementation that allows you to integrate robust search capabilities into your Storefront, streamlining the customer journey and effectively increasing conversions.

**Business benefit**: More accurate search results without any additional maintenance.

#### Documentation

* [Algolia](/docs/pbc/all/search/202307.0/base-shop/third-party-integrations/algolia.html)
* Technical prerequisites:
  * [Integrate Algolia](/docs/pbc/all/search/202307.0/third-party-integrations/integrate-algolia.html)

### [ACP App] Bazaarvoice App <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Spryker has updated how purchase data is synchronized with Bazaarvoice by embedding the process in our Order Management System (OMS). Spryker customers now have maximum control over when requests are sent to buyers to review purchased products.

**Business benefit**: Send optimally timed reminders to customers for reviews, increasing the possibility of gaining social proof for your products.

#### Documentation

* [Bazaarvoice](/docs/pbc/all/ratings-reviews/202307.0/third-party-integrations/bazaarvoice.html)
* Technical prerequisites:
  * [Integrate Bazaarvoice](/docs/pbc/all/ratings-reviews/202307.0/third-party-integrations/integrate-bazaarvoice.html)

### [ACP App] Consent Management with Usercentrics <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Usercentrics, a consent management platform, helps with privacy regulations and data quality. Enabling organizations to collect, manage, and document website visitors' consent, Usercentrics helps mitigate legal risks, secure data capture, and increase revenues. Usercentrics is now available on Spryker App Composition Platform.

The Usercentrics app helps you as follows:
* Address your consent management needs globally in one click.
* Obtain, manage, and document the consent of your website visitors frictionlessly.
* Ensure you are compliant with privacy laws (GDPR, CCPA, LPGD) out of the box.
* Provide a great user experience for your visitors to manage their cookie preferences.

**Business benefit**: Empower companies to take control of their data and to easily comply with privacy regulations with minimal investment.

#### Documentation

[Usercentrics](/docs/pbc/all/usercentrics/usercentrics.html)

### [ACP App] Payments with PAYONE <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Revolutionize the way you accept payments with the PAYONE app, which is now available on Spryker's App Composition Platform. As the leading payment service provider in Germany and Austria, PAYONE has over 1,200 experts who deliver the latest payment services from a single source–for all company sizes and industries.

With the PAYONE app, you can do the following:
* Enable your customers to make payments with credit cards and via PayPal.
* Seamlessly integrate PAYONE payments with just one click.
* Secure payments according to international standards through fraud prevention and integrated risk management.
* Rest assured that all PCI compliance concerns are taken care of for you.

**Business benefit**: Securely process payments with ease using a leading payment provider, with a quick and easy setup.

#### Documentation

[Payone integration in the Back Office](/docs/pbc/all/payment-service-provider/202307.0/third-party-integrations/payone/integration-in-the-back-office/payone-integration-in-the-back-office.html)

### [ACP Foundation] Monitoring and Logging for SCCOS <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

ACP tenant monitoring and logging are required to oversee all ACP-related transactions within Spryker Cloud Commerce OS (SCCOS) properly.

Spryker is providing this feature as an integral part of having an end-to-end monitoring and logging system in place for all ACP app-related actions within SCOS.

This feature works out of the box; no additional configuration is required.

**Business benefit**: Ensure the stability and monitoring of your transactions when using ACP apps.

### [Framework] GlueApplication as API enabler infrastructure <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Glue as an API stays the same, but the main module carrying the infrastructure for our API development layer gets a complete rework as the GlueApplication module transforms from a Storefront-specific JSON:API complying API provider to an infrastructure that allows the development of different API applications. The applications now follow two separate types: Storefront and backend, which have access to different storage engines that allow for different use cases and get deployed in two different types of containers. The Storefront type has access to Redis & Search storages which allow for quick horizontal scalability to support bursts of traffic. The backend type has direct access to Zed application layer facades, which allow APIs to be built on top of the core business logic.

**Business benefit**: The separation of API applications by type and functionality allows for more diversity in how we design APIs and the exposure of business logic to consumers.

#### Documentation

* General concept documentation
  * [Decoupled Glue API](/docs/dg/dev/glue-api/202307.0/decoupled-glue-api.html)
* How-to documentation:
  * [Create storefront resources](/docs/dg/dev/glue-api/202307.0/routing/create-storefront-resources.html)
  * [Create backend resources](/docs/dg/dev/glue-api/202307.0/routing/create-backend-resources.html)
  * [How to create resources with parent-child relationships](/docs/dg/dev/glue-api/202307.0/create-glue-api-resources-with-parent-child-relationships.html)
  * [Create routes](/docs/dg/dev/glue-api/202307.0/routing/create-routes.html)
  * [ and Storefront API module differences](/docs/dg/dev/glue-api/202307.0/backend-and-storefront-api-module-differences.html)
  * [How to use default Glue parameters](/docs/dg/dev/glue-api/202307.0/use-default-glue-parameters.html)
  * [How to create a JSON API relationship](/docs/dg/dev/glue-api/202307.0/create-json-api-relationships.html)
  * [How to document Glue API endpoints](/docs/dg/dev/glue-api/202307.0/document-glue-api-endpoints.html)
  * [How to create authorization strategies](/docs/dg/dev/glue-api/202307.0/create-glue-api-authorization-strategies.html)
  * [How to use Glue API authorization scopes](/docs/dg/dev/glue-api/202307.0/use-glue-api-authorization-scopes.html)
  * [How to create protected endpoints](/docs/dg/dev/glue-api/202307.0/create-protected-glue-api-endpoints.html)
  * [Create and change Glue API conventions](/docs/dg/dev/glue-api/202307.0/create-and-change-glue-api-conventions.html)
  * [How to create grant type parameters](/docs/dg/dev/glue-api/202307.0/create-grant-type-parameters.html)
  * [How to use an authentication server](/docs/dg/dev/glue-api/202307.0/use-authentication-servers-with-glue-api.html)
  * [Authentication and authorization](/docs/dg/dev/glue-api/202307.0/authentication-and-authorization.html)
  * [Security and authentication](/docs/dg/dev/glue-api/202307.0/security-and-authentication.html)

### [Framework] Configure OAuth 2.0 clients on install <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Previously, OAuth 2.0 clients were not able to be updated other than having one client per installation. To begin, our client was our own Storefront, but when opening the consuming of APIs, we had to allow more API consumer clients to be installed in the system. This feature allows for creating as many OAuth 2.0 clients as needed for consumers.

**Business benefit**:

Allows for the creation of multiple OAuth 2.0 clients, so the business can allow for secure connection of multiple API consumers with different access rights.

#### Documentation

[Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html)

### [Framework] Catalog Back Office Performance Improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Searching our tables in the back office can cause serious pain for business users that are trying to search any large tables due to how our querying works on the database in the back office. We allowed now for the possibility for our customers to decide on specific tables to allow a more strict yet performant search on specific columns in tables.

**Business benefit**: If a business user has a specific need for faster search on product SKUs or prices or something that contains a large amount of data, a quick configuration in code can help allow for strict yet more performant search

#### Documentation

[Create and configure Zed tables](/docs/dg/dev/backend-development/zed-ui-tables/create-and-configure-zed-tables.html)

### [Framework] Replace Swift Mailer / Swift Mailer library <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

We have been dependant on a deprecated library, Swift Mailer, in our email-sending library. This has been reworked to allow the usage of the more up-to-date [Symfony Mailer](https://github.com/symfony/mailer) component.

**Business benefit**: Jumping to a more widely used and supported component allows customers higher maintainability and feature richness.

#### Documentation

* [Tutorial: Sending an email](/docs/pbc/all/emails/202307.0/tutorial-sending-an-email.html)
* [Emails](/docs/pbc/all/emails/202307.0/emails.html)
* [HowTo: Create and register a MailTypeBuilderPlugin](/docs/pbc/all/emails/202307.0/howto-create-and-register-a-mail-type-builder-plugin.html)
* [HowTo: Create and register a mail provider](/docs/pbc/all/emails/202307.0/howto-create-and-register-a-mail-provider.html)

### [Cloud Self-Service] Management of Spryker CI variables <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Access to the variables in Spryker CI lets you change pipelines' behavior without having to wait for our support. You can now manage the following variables:

* `SDK_VERSION`
* `UPGRADER_STRATEGY`
* `UPGRADER_RELEASE_GROUP_PROCESSOR`
* `UPGRADER_CUSTOM_AGRUMENTS`

**Business benefit**: Gives you more control over your projects and enables you to resolve issues faster.

Documentation for this feature is coming soon.

### [Cloud Self-Service] Maintenance Mode <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Turn on and off the maintenance mode of an application using a dedicated pipeline without having to create a support ticket. This lets you deploy new versions of applications without disrupting the user experience with unexpected errors.

**Business benefit**: Easier management of maintenance. You can turn on maintenance mode more quickly, reducing downtime and minimizing disruption.

#### Documentation

* [Enable and disable maintenance mode](/docs/ca/dev/manage-maintenance-mode/enable-and-disable-maintenance-mode.html)
* [Configure access to applications in maintenance mode](/docs/ca/dev/manage-maintenance-mode/configure-access-to-applications-in-maintenance-mode.html)

### [Cloud Self-Service] Environment variables management <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Manage environment variables and secrets of applications using a UI without having to create a support ticket. This lets you make changes autonomously, controlling the scope of the application and scheduler variables. You decide if changes should be applied immediately or during the next deployment.

**Business benefit**: Flexibility. You can change environment variables according to a needed schedule, which lets you adapt more easily to changing needs and requirements.

#### Documentation

[Add variables in the Parameter Store](/docs/ca/dev/add-variables-in-the-parameter-store.html)

### [Cloud Observability] Infrastructure Health Check Monitoring Dashboard <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Empowers your team with built-in dashboards to observe the status of the whole platform.

At a glance, your team can monitor the health status and uptime of their environment as a whole, the applications running, the average response time, and the availability of single services and components.

{% info_block infoBox "Info" %}

Infrastructure Health Check Monitoring Dashboard feature is *not* part of Spryker's base offering and is an *optional* additional feature.

{% endinfo_block %}

**Business benefit**: Access to actionable insights to improve operational efficiency.


Documentation for this feature is coming soon.


Infrastructure Health Check Monitoring Dashboard: Birds eye overview example:

![bird-eye-overview-example](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/release-notes-202307.0.md/bird-eye-overview-example.png)


Infrastructure Health Check Monitoring Dashboard: ELB/ALB example:

![ELB/ALB-example](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/release-notes-202307.0.md/elb-alb-example.png)


Infrastructure Health Check Monitoring Dashboard: ElastiCache example:

![elasticache-example](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/release-notes-202307.0.md/elasticache-example.png)

Infrastructure Health Check Monitoring Dashboard: RDS example:

![rds-example](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/release-notes-202307.0.md/rds-example.png)

Infrastructure Health Check Monitoring Dashboard: Elasticsearch example:

![elasticsearch-example](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/release-notes-202307.0.md/elasticsearch-example.png)


### [Cloud Observability] Pipeline Success Dashboard <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Provides your team with a real-time view of the deployment pipeline performance, enabling them to track the success and failure rates of pipeline runs, allowing them to:

Easily monitor their pipeline metrics, including the number of overall succeeded pipeline runs and the overall number of failed runs, and quickly identify and troubleshoot any issues,

Have visibility into pipeline performance to drive continuous improvement of deployment processes,

Optimize release cycles and ultimately deliver applications faster and more reliably.

{% info_block infoBox "Info" %}

Pipeline Success Dashboard is not part of Spryker's base offering and is an optional additional feature.

{% endinfo_block %}

**Business benefit**: Access to actionable insights to improve operational efficiency.

Documentation for this feature is coming soon.

Pipeline Success Dashboard example:

![pipeline-success-dashboard](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/release-notes-202307.0.md/pipeline-success-dashboard.png)

### [Core Commerce] Upgraded Angular to v15 and Node.js to v18 <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

To maintain the stability and longevity of our platform, we have migrated to Angular v15 and Node.js v18, which are actively supported by their respective communities. This ensures continued support and leveraging of these versions' latest features and improvements. No infrastructure changes are required on your end before performing the upgrade.

#### Documentation

* [Upgrade to Angular v15](/docs/dg/dev/upgrade-and-migrate/upgrade-to-angular-15.html)
* [Upgrade to Node.js v18](/docs/dg/dev/upgrade-and-migrate/upgrade-nodejs-to-v18-and-npm-to-v9.html)

### [Composable Storefront] Early Access release

Spryker is launching an Early Access program for customers who want to be among the first to utilize the new Spryker Composable Storefront.

{% info_block warningBox %}

Composable Storefront is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

Spryker Composable Storefront provides an efficient solution for developers to implement and customize stores on Spryker's commerce platform. It offers pre-packaged, decoupled, composable components for common features found on digital commerce sites. Customers can also create their own custom components to be used in the Storefront.

If you are interested in being part of Spryker's Composable Storefront Early Access program, contanct your Spryker representative.

**Business benefit**: Spryker Composable Storefront allows Spryker customers to implement and customize a decoupled storefront quickly. It offers Spryker customers a future-proof, agile, and scalable solution.
#### Documentation

[Oryx](/docs/dg/dev/frontend-development/202307.0/oryx/oryx.html)

### [Dynamic Multistore] Early Access release

Spryker is launching an Early Release Access program for customers who want to be among the first to utilize the new Dynamic Multistore.

{% info_block warningBox %}

Dynamic Multistore is currently running under an *Early Access Release*. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

Dynamic Multistore lets business users create stores in your platform's back-end without the help from the development team.

For further information about accessing this Early Release feature, contact your Spryker representative.

**Business benefit**: Boosts productivity and agility whilst empowering business users.

#### Documentation

[Dynamic Multistore](/docs/pbc/all/dynamic-multistore/202307.0/dynamic-multistore.html)
