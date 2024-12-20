---
title: Multi-store setup options
description: Learn about all the setup options you have for a multi-store environment.
template: howto-guide-template
last_updated: Nov 15, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/multistore-setup-options.html
  - /docs/scos/user/introduction-to-the-spryker-commerce-os/multiple-stores/multi-store-setup.html
related:
  - title: Add and remove databases of stores
    link: docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/add-and-remove-databases-of-stores.html
---

This document outlines the various options available for a multi-store setup and is essential to review when defining the architecture for your project and prior to implementing a new store.

Keep in mind that the definition of a store can vary depending on the business use case. For example, it can refer to a region, market, country, or a physical store.

## Assess whether your shop is fit for Spryker Multi-Store

When planning multiple stores, it is crucial to determine whether your project supports the Spryker Multistore solution and assess whether it is necessary for your business needs.

The Spryker Multi-Store solution is designed to represent several business channels on a single platform. These channels include:

- Localization: Involves supporting different locales, currencies, and languages for each store to ensure customers see the correct information and pricing based on their location. The localization channel can include the following:

    - Different regions: Americas, EU, MENA, APAC, etc.
    - Different countries: DE, FR, ES, NL, etc.
    - Combination of regions and countries.

- Custom functionality per store: Allows offering a customized shopping experience to customers by displaying relevant products, content, and promotions based on their location or interest. This can include different brands under a single franchise, such as Swatch, Omega, etc., or different business models, like new cars, used cars, and spare parts.
- Sales and marketing: The ability to track sales and customer data for each store to monitor performance and make data-driven decisions about future expansion.
- Order management: The ability to manage orders from multiple stores effectively and track the progress of each order from start to finish.
- Reporting: The ability to generate reports for each store to see sales, customer data, and inventory levels, enabling informed business decisions.
- Shipping and fulfillment: The ability to offer shipping options based on the customer's location and automate the fulfillment process to ensure prompt and accurate delivery of orders.
- Customer service: Providing consistent customer service across all stores, ensuring customers have a positive experience regardless of which store they shop at.
- Integrations: Integrating with other tools, such as payment gateways, tax calculation, shipping carriers, and marketing platforms to streamline workflow and automate routine tasks.

{% info_block warningBox "Warning" %}

Don't use the Spryker Multistore concept as a representation of a physical store.

{% endinfo_block %}


 ## Select the appropriate setup

There are three types of setups you can choose from.

{% info_block infoBox "Stores grouping" %}

When setting up multiple stores, we recommended to group stores that share the same processes and data to regional stores. For instance, if your DE and AT stores share the same database, it is best not to separate them but to have one regional store instead.

{% endinfo_block %}

### Setup 1: Shared infrastructure resources (default)
![setup-1](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups/setup-1.png)

This setup has the following characteristics:

- One store or multiple stores. 
- Each store has a dedicated index for ES and its own key-value storage namespace (Redis).
{% info_block infoBox "Info" %}

While the search index and key-value storages are shared resources, you can have multiple indexes within the same search instance and multiple namespaces in Redis.

{% endinfo_block %}

- One shared database.
- One region with multiple stores.
- Shared codebase.
- Use of code buckets for store customization (logic).
- Use a theme for a different visual look and feel.
- Centralized third-party integrations.

This is a standard Spryker setup, best suited for the following use cases:
- Your multi-shop system mostly uses the same business logic. Any differences are insignificant and can be covered within the code. Any updates to the business logic apply to all stores. If necessary, you can use, you can use [code buckets](/docs/dg/dev/architecture/code-buckets.html) to achieve store-specific business logic.
- Products, customers, orders, etc., are stored in the same database, making collaborative management across all stores simpler.

On the infrastructure level, applications can't be scaled or deployed independently since all cloud resources are shared. Here are some other infrastructure-related points to keep in mind:

- By default, all stores can only be hosted in one AWS region.
- Traffic distribution is shared for all stores using ALB+NLBs (ALB-->NLB-->Nginx-->PHP-FPM).
- SSL certificates may be generated automatically or uploaded manually in AWS.
- SSL termination process is handled by ALB. There is also a built-in functionality, which allows to set several different certificates (issued for different domains) to one ALB.

The following table provides details on infrastructure for this setup:

<div class="width-100">

| What                                                                           | How    |
| ------------------------------------------------------------------------------ | ------ |
| DB                                                                             | Shared |
| Key-value storage (Redis) and Elasticsearch (OpenSearch/ElasticCache) services | Shared |
| Spryker Storefront Yves                                                        | Shared |
| Spryker Commerce OS (Backend Gateway Zed + Glue Backend API + Back Office)     | Shared |
| Complexity of rollout                                                          | Low    |

</div>

### Setup 2: Isolated virtual database
{% info_block warningBox "Mandatory information" %}
In case if Dynamic Multistore feature enabled separate database can be used only per region, not per each store.
{% endinfo_block %}

![setup-2](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups/setup-2.png)

This setup has the following characteristics:

- Multiple stores. 
- Each store has a dedicated Elasticsearch index and its own Redis key-value storage namespace.

{% info_block infoBox "Info" %}

While the search index and key-value storages are shared resources, you can have multiple indexes within the same search instance and multiple namespaces in Redis.

{% endinfo_block %}

- Virtual separated database per store. For details on how to add virtual databases to your store, see [Add and remove databases of stores](/docs/ca/dev/multi-store-setups/add-and-remove-databases-of-stores.html).

{% info_block infoBox "Info" %}

You can have a cluster sharing the same database or use different database setups. See [example configuration of the deploy file](https://github.com/spryker/docker-sdk/blob/master/docs/07-deploy-file/02-deploy.file.reference.v1.md#database).

{% endinfo_block %}

- One region with multiple stores.
- Shared codebase.
- Use of code buckets for store customization (logic).
- Use of a theme for a different visual look and feel.
- Centralized third-party integrations.

This setup is recommended when you don’t have shared data.

The following table provides details on the infrastructure for this setup:

<div class="width-100">

| What                                                                           | How      |
| ------------------------------------------------------------------------------ | -------- |
| DB                                                                             | Separate |
| Key-value storage (Redis) and Elasticsearch (OpenSearch/ElasticCache) services | Shared   |
| Spryker Storefront Yves                                                        | Shared   |
| Spryker Commerce OS (Backend Gateway Zed + Glue Backend API + Back Office)     | Shared   |
| Complexity of rollout                                                          | Medium   |

</div>

{% info_block infoBox "Info" %}

You can apply the virtually isolated database to setup one and setup three too. See [Shared setup](/docs/ca/dev/multi-store-setups/multi-store-setups.html#shared-setup) for more details.

{% endinfo_block %}

### Setup 3: Separate Infrastructure resources (AWS accounts)
![setup-3](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups/setup-3.png)

This setup has the following characteristics:

- Multiple stores. 
- Each store has dedicated key-value storage (Redis) and Elasticsearch (OpenSearch/ElasticCache) services.
- Separate database per account.
- Allows for different regions.
- Lets you use themes for a different visual look and feel.
- Possibility of an isolated codebase for each store. In this case, it is possible to have fully independent development teams.
- In the case of a shared codebase:
    - Use of code buckets for store customization (logic).
    - Centralized third-party integrations.

This setup is recommended for the following cases:
- Your shops look completely different—not only from the design perspective but also from business logic and used features/modules due to completely separated code.
- Shop maintenance and development happen independently. You may have multiple teams working on different shops, having their own development workflow and release cycles.
- Data management (products, customers, orders, etc.) is separated due to separate databases. Data sharing and synchronization is possible with the help of external systems.

In terms of infrastructure, this setup is the most flexible way of scaling and deploying your setups independently since all of the infrastructure parts are separate cloud resources:

- You can host single stores in different AWS regions. For example, you can host the US store in N. Virginia and the DE store—in Frankfurt.
- Traffic distribution is _independent_ for every store* due to ALB+NLBs (ALB-->NLB-->Nginx-->PHP-FPM).

{% info_block infoBox "Info" %}

In each AWS account, you can have several stores.

{% endinfo_block %}

- SSL certificates may be generated automatically or uploaded manually in AWS.
- SSL termination process is handled by ALB in all setup models. There is also a built-in functionality, which allows to set several different certificates (issued for different domains) to one ALB.

The following table provides details on the infrastructure for this setup:

<div class="width-100">

| What                                                                           | How      |
| ------------------------------------------------------------------------------ | -------- |
| DB                                                                             | Separate |
| Key-value storage (Redis) and Elasticsearch (OpenSearch/ElasticCache) services | Separate |
| Spryker Storefront Yves                                                        | Separate |
| Spryker Commerce OS (Backend Gateway Zed + Glue Backend API + Back Office)     | Separate |
| Complexity of rollout                                                          | High     |

</div>

## Summary

The following tables contain high-level criteria that sum up the setups described in this document and help you decide on the most suitable setup for your requirements.

**Infrastructure details:**

| What                                                                          | Setup 1 | Setup 2  | Setup 3  |
| ----------------------------------------------------------------------------- | ------- | -------- | -------- |
| DB                                                                            | Shared  | Separate | Separate |
| Ke-value storage (Redis) and Elasticsearch (OpenSearch/ElasticCache) services | Shared  | Shared   | Separate |
| Spryker Storefront Yves                                                       | Shared  | Shared   | Separate |
| Spryker Commerce OS                                                           | Shared  | Shared   | Separate |
| Complexity of rollout                                                         | Low     | Medium   | High     |

**High-level characteristics:**

| What                                 | Setup 1                                                                                 | Setup 2                                                                                                  | Setup 3                                                                                 |
| ------------------------------------ | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Stores                               | 1 store or multiple stores                                                              | Multiple stores                                                                                          | Multiple stores                                                                         |
| ES and Redis                         | Each store has a dedicated index for ES and its own key-value storage namespace (Redis) | Each store has a dedicated index for ES and its own key-value storage namespace (Redis)                  | Each store has a dedicated index for ES and its own key-value storage namespace (Redis) |
| Database                             | One shared database                                                                     | Virtual separated database per store: you can have cluster sharing same or use different database setups | Separate database per store                                                             |
| AWS regions                          | One region with multiple stores                                                         | One region with multiple stores                                                                          | Allows different regions                                                                |
| Codebase                             | Shared codebase                                                                         | Shared codebase                                                                                          | Shared or separate codebases (up to a project development team)                         |
| Code bucket/themes                   | Supported                                                                               | Supported                                                                                                | Supported (for shared codebase)                                                         |
| Centralized third-party integrations | Supported                                                                               | Supported                                                                                                | Supported (for shared codebase)                                                         |
| Fully independent development teams  | Not supported                                                                           | Not supported                                                                                            | Supported (for separate codebases)                                                      |


**Load criteria:**

|         | Page view load (Storefront Yves) | Backend load (Spryker Commerce OS) | Database Throughput | Shared data (customers, orders, etc.) |
| ------- | -------------------------------- | ---------------------------------- | ------------------- | ------------------------------------- |
| SETUP 1 | Normal                           | Normal                             | Normal              | Yes                                   |
| SETUP 2 | Normal/High                      | Normal/High                        | Normal/High         | No                                    |
| SETUP 3 | High                             | High                               | High                | No                                    |


{% info_block warningBox "High load" %}

If you anticipate a high load, it's essential to consult and obtain guidance from the Spryker team. The load-related requirements for one or more stores can significantly affect the above criteria and, therefore, the application architecture, as there might be many ways to address them.

{% endinfo_block %}

**Limitations:**

|                 | Setup 1                                                                                                                                                                                         | Setup 2                                                                                                                                                                       | Setup 3                                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ACCESSIBILITY   | <ul><li>Data is separated only on the application level.</li><li>Complexity in data separation in the Back Office.</li></ul>                                                                    | Full data separation                                                                                                                                                          | Full data separation                                                                                                                                     |
| MAINTAINABILITY | <ul><li>Not all features fully support Multi-Store in one database. Some features have to be customized as multi-country</li><li>New codebase is rolled out to all countries at once.</li></ul> | <ul><li>Import of each country’s data into its own database only, so there is no shared catalog data.</li> <li>New codebase is rolled out to all countries at once.</li></ul> | <ul><li>Data import has to be executed on all environments.</li><li>It is impossible to roll out the codebase to all regions at the same time.</li></ul> |
| PERFORMANCE     | Infrastructure is subject to more frequent scaling up in case of higher loads.                                                                                                                  | Infrastructure is subject to more frequent scaling up in case of higher loads.                                                                                                | Isolated AWS accounts.                                                                                                                                   |

## Next steps

- [Implement a new store for your multi-store environment](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html)
- [Check your and Spryker's tasks when setting up a new store](/docs/ca/dev/multi-store-setups/checklist-for-a-new-store-implementation.html)
