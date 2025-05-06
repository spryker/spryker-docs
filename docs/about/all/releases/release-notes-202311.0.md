---
title: Release notes 202311.0
description: Release notes for the Spryker SCOS release 202311.0
last_updated: Nov 7, 2023
template: concept-topic-template
redirect_from:
- /docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.html
- /docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202311.0/release-notes-202311.0.html

---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and enhancements.

For information about installing the Spryker Commerce OS, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).

## <span class="inline-img">![core-commerce](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/icon_Spryker+Commerce+OS_128.png)</span> Fulfillment App <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

As part of Spryker's Unified Commerce capability, the Fulfillment App provides an all-new user interface designed to streamline your order fulfillment process. Supporting new business models and with enhanced functionalities, the Fulfillment App simplifies tasks for warehouse and store staff, offering an efficient and effective fulfillment process.

The fulfillment App includes the following features:

- New picking list concept: Compatible with many picking strategies to increase order fulfillment efficiency.
- Warehouse allocation strategy: Optimize warehouse space utilization for your specific warehouse setup.
- Offline mode: Ensure uninterrupted picking, even without an internet connection.
- Backend API architecture: Better performance and improved scalability.
- Powered by Spryker's Oryx Framework: Make rapid frontend customizations by utilizing a rich library of components.

**Business benefits**:
- Fulfill orders faster, easier, and smarter.
- Rapidly customize and scale with a flexibly built app.

### Documentation
[Fulfillment App overview](/docs/pbc/all/warehouse-management-system/202311.0/unified-commerce/fulfillment-app-overview.html)


## <span class="inline-img">![core-commerce](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/icon_Spryker+Commerce+OS_128.png)</span> Click&Collect <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

With Enhanced Click&Collect, your customers now have the flexibility to choose between delivery and pickup during checkout, enhancing their shopping experience. Store operators also benefit from advanced configuration capabilities for their in-store stock.

Click&Collect includes the following features:

- Service points: Service points broaden the scope of services you can offer at your physical locations beyond order collection. Its adaptable framework simplifies implementing features such as return services and appointment scheduling, allowing businesses to tailor solutions to their specific needs.
- Integrated shipment types at checkout: Provide your customers with the flexibility to choose between delivery and pickup during checkout. With the flexible architecture of the Enhanced Click&Collect, you can create custom shipment types, like "Ship-from-Store", on the project level.
- Works seamlessly with multi-address checkout: Lets your customers divide their orders for different delivery methods. For example, they can have some items delivered to their doorstep while they pick up other items at a location they select.
- Merchant Portal integration: As a store operator, you can now do the following:
    - Specify product availability based on different service points: physical retail outlets, warehouses, or any other pickup location.
    - Adjust stock availability for each service point.
    - Offer varied pricing for items based on their pickup or delivery location.


![click-and-collect-demo](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202311.0/click-and-collect.gif)

**Business benefits**:<br>
Enhanced Click&Collect facilitates immediate product availability, offering both B2B and B2C clients the convenience of bypassing wait times associated with shipping. This feature not only significantly reduces or eliminates shipping costs but also provides an opportunity for immediate product inspection, ensuring quality and specifications meet the client's standards. Moreover, it seamlessly blends the digital shopping experience with the tangible benefits of a physical store, fostering direct customer-business interactions and potentially driving additional in-store purchases.

While pickup has its roots in B2C operations, its utility in B2B contexts is growing:
- Automotive industry: Manufacturers and dealers can offer customers the convenience of ordering parts online with the option for on-site installation.
- Manufacturing sector: Streamline operations by letting clients directly retrieve bulk orders from warehouses, enhancing the efficiency of the procurement process.

### Documentation

[Service point management](/docs/pbc/all/service-point-management/202311.0/service-point-management.html)

## <span class="inline-img">![data](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/data.png)</span> Data Exchange API <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Traditionally, developing APIs required technical expertise and time-consuming coding processes. However, with the new Spryker dynamic Data Exchange API infrastructure, we have removed the complexities, making it seamless for you to create APIs effortlessly. With this tool, you can quickly build, customize, and manage APIs tailored to your specific business requirements, all through an intuitive user interface.

The key features of the Data Exchange API include the following:

- No coding required: No complex coding and development efforts are needed. The user-friendly interface enables you to create APIs effortlessly.

- Rapid API generation: The streamlined process lets you generate APIs in a matter of minutes. This helps you speed up your integration projects and get your applications up and running faster than before.

- Flexibility and customization: You can tailor your API endpoints to your exact needs. You can define parameters, which allows for seamless compatibility with your systems.

- Real-time updates: You can modify your API endpoints on the go. Our infrastructure allows you to make changes dynamically so you can adapt to evolving business needs without any downtime.


**Business benefits**:
- Reduce time-to-market, speeding up faster integration
- Cost savings, especially on maintenance

### Documentation

- [Configure Data Exchange API endpoints](/docs/pbc/all/data-exchange/202311.0/tutorials-and-howtoes/how-to-configure-data-exchange-api.html)
- [How to send a request in Data Exchange API](/docs/pbc/all/data-exchange/202311.0/tutorials-and-howtoes/how-to-send-request-in-data-exchange-api.html)

### Technical prerequisites
- [Install the Data Exchange API](/docs/pbc/all/data-exchange/202311.0/install-and-upgrade/install-the-data-exchange-api.html)
[Install the Data Exchange API + Inventory Management feature](/docs/pbc/all/data-exchange/202311.0/install-and-upgrade/install-the-data-exchange-api-inventory-management-feature.html)

## <span class="inline-img">![data](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/data.png)</span> Next Generation Middleware: Spryker Middleware powered by Alumio <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The Spryker Middleware powered by Alumio solves the main challenges of data integrations in a flexible and customizable way and, therefore, greatly reduces the efforts for Spryker's data exchange use cases. It is the foundation on which we build our Integration Apps. The Spryker Middleware powered by Alumio uses Alumio data integration technology.

The Spryker Middleware powered by Alumio helps you to reach the following outcomes:

- Lower the total cost of ownership, centralizing the management of data flows.
- Lower return rate with more comprehensive & accurate product information.
- Gain higher customer satisfaction by keeping consistent and up-to-date data across all touchpoints.
- Gain higher conversion rate by reacting to customer demands and competitive challenges more quickly.

**Business benefit**:<br>
Faster time-to-value shortening setup times for integrations


### Technical prerequisites
To connect Spryker Middleware powered by Alumio with Spryker Cloud Commerce OS, you need to install or deploy the [Data Exchange API feature](/docs/pbc/all/data-exchange/202311.0/install-and-upgrade/install-the-data-exchange-api.html) in your environment.


## <span class="inline-img">![data](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/data.png)</span> Akeneo PIM Integration App <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Our Akeneo PIM Integration App simplifies the management of your product information by providing an out-of-the-box and highly flexible integration with the popular Akeneo PIM system. This saves you time and effort, allowing you to seamlessly manage your product information across all channels, resulting in a more efficient and effective sales process.

The Spryker Akeneo PIM Integration App allows you to do the following:
- Reduce time to market and set up a product data synchronization feed between Spryker and Akeneo PIM without any coding.
- Easily adapt to any changes in your data model with intuitive, visual data mapping capabilities.
- Increase the reliability of your data flow between Spryker and Akeneo PIM with buffering, retries, and extensive troubleshooting capabilities.


**Business benefit**:<br>
Reduce time-to-market with a flexible integration to Akeneo PIM, keeping new product information synchronized at the rhythm your business demands.


### Technical prerequisites
- To use your Akeneo PIM Integration App, you need to have the Spryker Middleware powered by Alumio.
- The Akeneo PIM Integration App works with B2C or B2B business models of Spryker Cloud Commerce. Currently, it doesn't cover the Marketplace business models.

## <span class="inline-img">![cloud](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/icon_Spryker+Cloud_128.png)</span> Log forwarding and metric streaming to Dynatrace <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>


{% info_block warningBox "Improved version of Dynatrace" %}

We're going to release a refactored version of the Dynatrace integration. This version will be more robust and future-proof. For most projects, we recommend waiting for the new version.

{% endinfo_block %}

We are delighted to announce our newest integration - Dynatrace with Log Forwarding and Metrics Streaming from Spryker PaaS+! This integration is a key step in our journey to support more monitoring platforms compatible with Open Telemetry.

This integration significantly enhances our current monitoring capabilities by extending the coverage of metrics and logs across crucial services such as Amazon ECS, RDS, OpenSearch Service, ElastiCache (Redis), PHP Exceptions, and RabbitMQ. Previously, the scope of these services was more limited, but with this enhancement, a broader and more precise range of metrics for tracking, debugging, and optimization is achieved. These monitoring improvements will also be available in New Relic and CloudWatch at no additional cost.

This feature is ideal for customer DevOps/SREs seeking enhanced, flexible monitoring solutions.

**Business benefits**:<br>
Until now, New Relic was the sole option for aggregating logs and metrics. This integration offers customers the flexibility to connect and integrate their Dynatrace account to Spryker PaaS+, thus enhancing observability and cloud extensibility.

Key features of this integration include the following:

- Log forwarding: Facilitates forwarding of logs from Spryker Cloud services to Dynatrace, covering services like Amazon RDS, ECS, Redis, RabbitMQ, and OpenSearch.
- Metric streaming: Streams performance metrics like CPU usage, memory, network latency, and error rates to Dynatrace, offering real-time insights.
- Unified Observability Platform: Offers a centralized platform for all monitoring needs, compatible with various third-party platforms.
- Efficient data processing: Ensures immediate forwarding of logs and metrics, with frequent data transmission for up-to-date monitoring.
- Spryker support 24/7: Designed to work seamlessly with existing monitoring solutions, Spryker will keep watching over for you 24/7, regardless of the monitoring platform you use.
- Scalability and adaptability: Can handle varying data volumes and peaks, with 24 hours of retention in case of unavailability.

### Technical prerequisites:
- Only available for Spryker Cloud customers.
- You need a self-managed Dynatrace account, and you have to provide the necessary Endpoints to Spryker.

## <span class="inline-img">![acp](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/icon_App+Orchestration+Platform_128.png)</span> Improved performance, stability, and scalability <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Adding third-party integrations via apps to your existing SCCOS solution has become easier with the App Composition Platform (ACP). Get in touch with us to get ACP enabled faster and take advantage of ACP's steadily growing number of no and low-code apps.

**Business benefit**:<br>
Simplified and faster enablement of ACP for SCCOS, as well as improved scalability, performance, and data security of the entire platform.

### Documentation
[ACP overview](/docs/acp/user/intro-to-acp/acp-overview.html)

### Technical prerequisites
[Install the ACP catalog](/docs/dg/dev/acp/app-composition-platform-installation.html)

## <span class="inline-img">![acp](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/icon_App+Orchestration+Platform_128.png)</span> Vertex app <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>
Staying up-to-date with ever-changing tax rules and rates can require a lot of resources. Spryker, through the Vertex integration, offers a means for businesses to automate tax calculation and centralize sales taxes on their transactions.

**Business benefits**:
- Comply with tax frameworks anywhere you do business. Let Vertex take care of tax management with a seamless and easy-to-use solution that meets the needs across Tax, IT, and Finance teams.
- Free up valuable resources for other operations as it stays compliant and up to date with the tax regulations of your markets.
- Automate tax processes and improve business agility by easily validating business tax at check-out and issuing tax-compliant invoices at the point of sale.

### Documentation
[Vertex](/docs/pbc/all/tax-management/202311.0/base-shop/third-party-integrations/vertex/vertex.html)

### Technical prerequisites
- [Install ACP](/docs/acp/user/app-composition-platform-installation.html)
- [Install Vertex](/docs/pbc/all/tax-management/202311.0/base-shop/third-party-integrations/vertex/install-vertex.html)

## <span class="inline-img">![acp](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/icon_App+Orchestration+Platform_128.png)</span> Algolia app <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Build an efficient path to purchase for your buyers with Algolia search, an innovative search and navigation solution that empowers your customers to quickly find the products they want. With our powerful and flexible implementation, headless or with search components on your storefront, you can easily integrate search capabilities into your storefront, streamlining the customer journey and increasing conversions.

**Business benefits**:
- Easily bring search into your storefront with our implementation, headless or with frontend search components, and enable customers to get to what matters faster.
- With the latest feature addition, you can now use the search components to display Algolia search results and support your users with search suggestions.

### Documentation
[Algolia](/docs/pbc/all/search/202311.0/base-shop/third-party-integrations/algolia/algolia.html)

### Technical prerequisites
[Integrate Algolia](/docs/pbc/all/search/202311.0/base-shop/third-party-integrations/algolia/integrate-algolia.html)

## <span class="inline-img">![code-upgrader](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/code-upgrader.png)</span> Autointegration of code releases <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

In addition to updating Spryker packages in your repository, with this release, Spryker Code Upgrader starts integrating plugins, settinh configurations keys, and adding new translations and similar elements to your project code. Now engineers don't have to figure out and manually apply code changes to activate new features.

**Business benefit**:<br>
Reduce the engineering time needed to integrate a Spryker module release into your project.

### Documentation
[Integrating code releases](/docs/ca/devscu/integrating-code-releases/integrating-code-releases.html)

### Technical prerequisites

Connect to [Spryker Code Upgrader](/docs/ca/devscu/spryker-code-upgrader.html) service to receive security updates semi-automatically.

## <span class="inline-img">![code-upgrader](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/code-upgrader.png)</span> Security upgrades <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Receive security releases before any other releases offered by Spryker Code Upgrader. The Upgrader prioritizes security releases, ensuring a timely application of critical security fixes.


**Business benefit**:<br>
Reduce the security risks from running outdated software by taking security updates before other updates.

### Documentation
[Integrating security releases](/docs/ca/devscu/integrating-code-releases/integrating-security-releases.html)

### Technical prerequisites
Connect to [Spryker Code Upgrader](/docs/ca/devscu/spryker-code-upgrader.html) service to receive security updates semi-automatically.

## <span class="inline-img">![code-upgrader](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/code-upgrader.png)</span> Upgradability Evaluator improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

This update offers notifications about critical security issues and vulnerabilities in Spryker and third-party components based on known vulnerability databases from NPM and Composer ecosystems. These improvements enhance the security monitoring and upgrade process. This update is complementary to the [Security Upgrades] improvement for Spryker Code Upgrader, but addresses all Spryker users.

**Business benefit**:<br>
Better awareness of security issues and vulnerabilities.

### Documentation
- [Handling upgrade warnings](/docs/ca/devscu/integrating-code-releases/handling-upgrade-warnings.html)
- [Spryker security checker](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-security-checker.html)
- [NPM checker](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/npm-checker.html)
- [Open-source vulnerabilities checker](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/open-source-vulnerabilities.html)

### Technical prerequisites
Install and run [Upgrader compliance Evaluator](/docs/dg/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html) to detect security issues.

## <span class="inline-img">![composable-frontend](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/icon_Composable+Storefront_128.png)</span> Oryx Framework <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Oryx Framework empowers developers to efficiently build composable frontends. Oryx provides a rich library of Oryx components, including a design system, allowing developers to rapidly create modern and visually appealing user interfaces. These components integrate with Spryker APIs by default, providing a seamless, decoupled experience for developers and end consumers.

**Business benefit**:<br>
Save time and effort with Oryx Framework. Spryker's purpose-built framework lets developers utilize fast, lightweight, and reactive components for storefronts and other frontends that quickly and dynamically display various devices.

### Learn more:
[Oryx in 90 seconds videos](https://www.youtube.com/playlist?list=PLJooqCSo73Sj9r_632NRtr-O0zuY7eHPb)

### Documentation:
[Oryx](/docs/dg/dev/frontend-development/202311.0/oryx/oryx.html)

### Technical prerequisites:
Oryx can be installed on your local machine and requires a Node.js or a compatible Javascript runtime and an npm runtime. For installation instructions, see [Set up Oryx](/docs/dg/dev/frontend-development/202311.0/oryx/getting-started/set-up-oryx.html).

## <span class="inline-img">![composable-frontend](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/icon_Composable+Storefront_128.png)</span> Composable Storefront: Additional foundation features - EA (early access) <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Additional features are being released for Spryker's new upgradeable, decoupled frontend solution — Composable Storefront. This set of features provides essential components for commonplace purchase journeys. Spryker Composable Storefront is built using Spryker's Oryx framework, a reactive, fast, and lightweight framework.

For more information about this Early Access product, contact your Spryker representative.

**Business benefit**:<br>
Provides commonplace features out-of-the-box for future-proof, agile, scalable, and upgradeable solutions for digital commerce business models.

### Learn more:
Composable Storefront is part of the Oryx framework. Oryx provides the features, and the presets for the various applications that you can create with Oryx, such as a Composable Storefront or Fulfillment App.

### Documentation
[Oryx](/docs/dg/dev/frontend-development/202311.0/oryx/oryx.html)

### Technical prerequisites:
Oryx can be installed on your local machine and requires a Node.js or a compatible Javascript runtime and an npm runtime. See Set up Oryx for more information on the installation.
