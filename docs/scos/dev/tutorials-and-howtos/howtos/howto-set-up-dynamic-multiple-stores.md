---
title: "HowTo: Set up dynamic multiple stores"
description: Learn how to set up multiple stores for your project.
last_updated: Feb 1, 2023
template: howto-guide-template
originalArticleId: 218ea4d5-de80-4aba-96fc-f67a9d13711c
redirect_from:
  - /docs/howto-set-up-dynamic-multiple-stores
  - /docs/en/howto-set-up-dynamic-multiple-stores
  - /v6/docs/howto-set-up-dynamic-multiple-stores
  - /v6/docs/en/howto-set-up-dynamic-multiple-stores
  - /docs/dynamic-multiple-stores
  - /docs/en/dynamic-multiple-stores
---

{% info_block warningBox "Dynamic multiple stores in cloud environments" %}

For instructions about setting up dynamic multiple stores in Spryker Cloud Commerce OS, see [Add and remove databases of stores](/docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/add-and-remove-databases-of-stores.html).

{% endinfo_block %}

With the Spryker Commerce OS, you can create multiple stores per your business requirements for different scenarios. 
The dynamic multi-store setup is very versatile and customizable—for example, you can do the following:

* Build one store for multiple countries and languages or separate stores for each region.
* Make abstract products, discounts, and other logic and code shared between stores or create a dedicated setup for each of them.
* Define separate search preferences to create an entirely different set of rankings, rules, and settings per store—for example, a date format or a currency.

## Dynamic multi-store setup infrastructure options

**Dynamic multi-store setup 1: Database, search engine, and key-value storage are shared between stores.**

![dynamic multi-store setup 1](/images/howto-set-up-dynamic-multiple-stores/dynamic-multi-store-setup-configuration-option-1.png)

Due to the resources being shared, the infrastructure costs are low. This setup is most suitable for B2C projects with low traffic and a small amount of data like products and prices.


**Dynamic multi-store setup 2: Each region has a dedicated search engine and key-value storage while the database is shared.**

![dynamic multi-store setup 2](/images/howto-set-up-dynamic-multiple-stores/dynamic-multi-store-setup-configuration-option-2.png)

This setup is most suitable for B2B projects with high traffic and a large amount of data.

**Dynamic multi-store setup 3: Each store has a dedicated database, search engine, and key-value storage.**

![dynamic multi-store setup 3](/images/howto-set-up-dynamic-multiple-stores/dynamic-multi-store-setup-configuration-option-3.png)

This setup is most suitable for projects with the following requirements:

* Completely different business requirements per store, like business logic and features.
* Independent maintenance and development flow.
* Separated data management for entities like products, customers, and orders.
* On-demand setup of any type of environment per region, store, like test, staging, or production.

It's the most expensive but flexible option in terms of per-store scaling and performance.

## Set up multiple stores

To set up multiple stores, follow the steps in the following sections:

### Configure code buckets

Code buckets provide an easy way to execute different business logic in runtime based on different HTTP or console command requests. To configure code buckets, see [Code buckets](/docs/scos/dev/architecture/code-buckets.html).

### Configure stores

1. Configiguretion stores will be created in the database. To configure stores, see [Dynamic multiple stores installation and configuration](/docs/scos/dev/feature-integration-guides/202212.0/dynamic-multiple-stores.html).
2. Optional: Define store-specific configuration:
  1. For one or more stores you've defined in database, define a separate store-specific configuration. For example, `config/Shared/config-default_docker_de.php` is the configuration file for the `DE` store in the docker environment.
  2. To apply the defined store-specific configuration, adjust the related deploy file in the `environment` section.

  In the following example, the `docker_de` environment name points to the `config/Shared/config-default_docker_de.php` store-specific configuration file. For more information about this deploy file parameter, see [environment](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html#environment):

  ```yaml
  ....

  environment: docker_de

  image:
    tag:
  ```

3. To import data for the stores you've added, adjust all the [import files and import configuration](/docs/scos/dev/data-import/{{site.version}}/data-importers-overview-and-implementation.html).

For example, define the import source for the `EU` region and  `DE` store you've added:

```php
# Setup data import for region 

 - data_entity: store
   source: data/import/common/EU/store.csv

# Catalog Setup data import
...
- data_entity: product-price
  source: data/import/common/DE/product_price.csv
...   
```

4. Configure installation recipes

Add the new regions to the installation recipes in `config/install/*` as follows:

```yaml
...

regions:
    ...
    - {REGION_NAME}
...    
```

For example, to add the `EU` and `US` region, adjust an installation recipe as follows:

```yaml
...

stores:
    ...
    - EU
    - US
...    
```

Also, make sure that commands that need to trigger for each store have stores: `true` added, as in the following example. This is especially important for validation cache generation in the `docker.yml` file, as this is responsible for generating the validation cache when your application is deployed on the Spryker PaaS:

```yaml
...
        rest-request-validation-cache-warmup:
            command: 'vendor/bin/console rest-api:build-request-validation-cache'
            stores: true
...
```

## Configure the deploy file

According to the desired infrastructure setup, configure the deploy file for the dynamic multi-store setup. In the following example, we configure the [dynamic multi-store setup 1](#multi-store-setup-infrastructure-options): database, search engine, and key-value storage are shared:

Deploy file configuration for the dynamic multi-store setup 1:

```yaml
# ....

regions:
    EU:
        services:
            mail:
                sender:
                    name: Spryker No-Reply
                    email: no-reply@spryker.local
            database:
                database: eu-docker
                username: spryker
                password: secret

            broker:
                namespace: eu-docker
            key_value_store:
                namespace: 1
            search:
                namespace: eu_search

    US:
        services:
            mail:
                sender:
                    name: Spryker No-Reply
                    email: no-reply@spryker.local
            database:
                database: us-docker
                username: spryker
                password: secret
            broker:
                namespace: us-docker
            key_value_store:
                namespace: 3
            search:
                namespace: us_search
# ...                      
```

* The `regions` parameter defines one or more isolated instances of the Spryker applications that have only one persistent database to work with. The visibility of the project's stores is limited to operating only with the stores that belong to a region, which refers to geographical terms like data centers, regions, and continents in the real world.

For more information about deploy file configuration, see [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html).

## Define the store context

You can define regions by domains and define stores by domains or by headers. We recommend defining stores by regions, which is supported by default.  

Defining stores by headers is not supported by default, but you can use the following workaround.

You've successfully added the stores and can access them according to how you've defined their context.


