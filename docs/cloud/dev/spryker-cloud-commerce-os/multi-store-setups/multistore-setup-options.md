---
title: {Meta name}
description: {Meta description}
template: howto-guide-template
---

This document describes all options for the multistore setup that we highly recommend you to learn at the stage of defining the architecture for your project, and before you start implementing a new store.

This document outlines the various options available for a multistore setup and is essential to review when defining the architecture for your project and prior to implementing a new store. 

Keep in in mind, that the definition of a store can vary depending on the business use case. For example, it can refer to region, market, country, and a physical store.

## Assess whether your shop is fit for Spryker Multistore

When planning for multiple stores, it is crucial to determine whether your project supports the Spryker Multistore solution and assess whether it is necessary for your business needs.

The Spryker Multistore solution is designed to represent several business channels on a single platform. These channels include:

- Localization: The support of different locales, currencies, and languages for each store to ensure customers see the correct information and pricing based on their location. The localization channel can include:

    - Different regions: Americas, EU, MENA, APAC, etc.
    - Different countries: DE, FR, ES, NL, etc.
    - Combination of regions and countires.

- Custom functionality per store: The ability to offer a customized shopping experience to customers by displaying relevant products, content, and promotions based on their location or interest. This can include different brands under a single franchise, such as Swatch, Omega, etc., or different business models like new cars, used cars, spare parts.
- Sales and marketing: The ability to track sales and customer data for each store to monitor performance and make data-driven decisions about future expansion.
- Order management: The ability to manage orders from multiple stores effectively and track the progress of each order from start to finish.
- Reporting: The ability to generate reports for each store to see sales, customer data, and inventory levels, enabling informed business decisions.
- Shipping and fulfillment: The ability to offer shipping options based on the customer's location and automate the fulfillment process to ensure prompt and accurate delivery of orders.
- Customer service: Providing consistent customer service across all stores, ensuring customers have a positive experience regardless of which store they shop at.
- Integrations: Integrating with other tools, such as payment gateways, Tax Calculation, shipping carriers, and marketing platforms to streamline workflow and automate routine tasks.

## Select the appropriate setup

There are three types of setup that you can choose from.

### Setup 1: Shared infrastructure resources (default)
![setup-1](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups/setup-1.png)

This setup has the following characteristics:

- One store or multiple stores 
- Each store has a dedicated index for ES and its own key-value storage namespace (Redis)
- One shared database
- One region with multiple stores
- Shared codebase
- Use of code buckets for store customization (logic)
- Use theme for a different visual look and feel
- Centralized third party integrations

This is a standard Spryker setup. It is best suited for the following use cases:
- Your multi-shop system is mostly using the same business logic, any differences are not significant and can be covered within the code. Any updates to the business logic are be applied to all stores. If a store-specific business logic is necessary, you can use [code buckets](https://docs.spryker.com/docs/scos/dev/architecture/code-buckets.html) to achieve it.
- Products, customers, orders, etc. are stored in the same database, which simplifies its collaborative management across all the stores.

The following table provides details on infrastructure for this setup:


| What | How |
|------|-----|
| DB     | Shared    |
| Key Value Storage (Redis) and Search (OpenSearch/ElasticCache) services     | Shared    |
| Spryker Storefront Yves     |Shared     |
| Spryker Commerce OS (Backend Gateway Zed + Glue Backend API + Back Office)     | Shared   |
| Complexity of rollout     | Low   |

### Setup 2: Isolated virtual database
![setup-2](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups/setup-2.png)

This setup has the following characteristics:

- Multiple stores 
- Each store has a dedicated index for Elasticsearch and its own key-value storage namespace (Redis)
- Virtual separated database per store

{% info_block infoBox "Info" %}

You can have cluster sharing the same database or use different database setups. See [example configuration of the deploy file](https://github.com/spryker/docker-sdk/blob/master/docs/07-deploy-file/02-deploy.file.reference.v1.md#database).

{% endinfo_block %}

- One region with multiple stores
- Shared codebase
- Use of code buckets for store customization (logic)
- Use theme for a different visual look and feel
- Centralized third party integrations

This setup is recommend when you don’t have shared data.

The following table provides details on infrastructure for this setup:

| What | How |
|------|-----|
| DB     | Separate    |
| Key Value Storage (Redis)  and Search (OpenSearch/ElasticCache) services     | Shared    |
| Spryker Storefront Yves     |Shared     |
| Spryker Commerce OS (Backend Gateway Zed + Glue Backend API + Back Office)     | Shared   |
| Complexity of rollout     | Medium   |

{% info_block infoBox "Info" %}

You can apply the virtually isolated database to setup 1 and setup 3 too. See [Shared setup](/docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/multi-store-setups.html#shared-setup) for more details.

{% endinfo_block %}

### Setup 3: Separate Infrastructure resources (AWS accounts)
![setup-3](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups/setup-3.png)

This setup has the following characteristics:

- Multiple stores 
- Each store has a dedicated search and key-value storage Services 
- Separate database per account
- Allows for different regions
- Use theme for a different visual look and feel
- Possibility of isolated codebase for each store. In this case, it is possible to have fully independent development teams
- In case of shared codebase:
    - Use of code buckets for store customization (logic)
    - Centralized third party integrations

This setup is recommended for the following cases: 
- Your shops look completely different—not only from the design perspective but also from business logic and used features/modules due to completely separated code.
- Shop maintenance and development happens independently, you may have multiple teams working on different shops, having their own development workflow and release cycles.
- Data management (products, customers, orders, etc) is separated due to separate databases. Data sharing and synchronization is possible with help of external systems.

In terms on infrastructure, this setup is the most flexible way of scaling and deploying your setups independently since all of the infrastructure parts are separate cloud resources:

- Single stores can be hosted in different AWS regions. For example, the US store can be hosted in N. Virginia, and the DE store— in Frankfurt.
- Traffic distribution is _independent_ for every store* due to ALB+NLBs (ALB-->NLB-->Nginx-->PHP-FPM).

{% info_block infoBox "Info" %}

In each AWS account you can have several stores.

{% endinfo_block %}a physi

SSL certificates may be generated automatically or uploaded manually in AWS. 

SSL termination process is handled by ALB in all setup models. There is also a built-in functionality, which allows to set several different certificates (issued for different domains) to one ALB.

The following table provides details on infrastructure for this setup:

| What | How |
|------|-----|
| DB     | Separate    |
| Key Value Storage (Redis)  and Search (OpenSearch/ElasticCache) services     | Separate    |
| Spryker Storefront Yves     |Separate     |
| Spryker Commerce OS (Backend Gateway Zed + Glue Backend API + Back Office)     | Separate   |
| Complexity of rollout     | High   |

## Conclusion and summary

When you set up multiple stores, we generally recommend that you group stores to regional stores that share the same processes and data. For example, if your DE and AT stores share the same database, it is best not to separate them, but have one regional store instead.