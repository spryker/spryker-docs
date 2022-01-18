---
title: HowTo - Set up multiple stores
description: Learn how to set up multiple stores for your project.
last_updated: Nov 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-set-up-multiple-stores
originalArticleId: 218ea4d5-de80-4aba-96fc-f67a9d13711c
redirect_from:
  - /2021080/docs/howto-set-up-multiple-stores
  - /2021080/docs/en/howto-set-up-multiple-stores
  - /docs/howto-set-up-multiple-stores
  - /docs/en/howto-set-up-multiple-stores
  - /v6/docs/howto-set-up-multiple-stores
  - /v6/docs/en/howto-set-up-multiple-stores
  - /docs/multiple-stores
  - /docs/en/multiple-stores
---

{% info_block warningBox "Cloud environment restrictions" %}

Currently, Spryker Cloud Commerce OS does not support all the multi-store configuration options, like creation of different regions. Soon, we will publish the documentation on all the available configuration options for the cloud environment. In the meantime, if you want to set up multiple stores, [contact support](https://spryker.force.com/support/s/knowledge-center) to learn about available configuration options.

{% endinfo_block %}

With the Spryker Commerce OS, you can create multiple stores for different scenarios per your business requirements. The multi-store setup is very versatile and customizable. For example, you can:

* Build one store for multiple countries and languages or separate stores for each region.

* Make abstract products, discounts, and other logic and code shared between stores or create a dedicated setup for each of them.

* Define separate search preferences to create an entirely different set of rankings, rules, and settings per store. For example, a date format or a currency.

* Set up a default store.


## Multi-store setup infrastructure options

Multi-store setup 1: Database, search engine, and key-value storage are shared between stores.

![multi-store setup 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/how-to-set-up-multiple-stores.md/multi-store-setup-configuration-option-1.png)


Due to the resources being shared, the infrastructure costs are low. This setup is most suitable for B2C projects with low traffic and small amount of data like products and prices.

Multi-store setup 2: Each store has a dedicated search engine and key-value storage while the database is shared.

![multi-store setup 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/how-to-set-up-multiple-stores.md/multi-store-setup-configuration-option-2.png)


This setup is most suitable for B2B projects with high traffic and a big amount of data.

Multi-store setup 3: Each store has a dedicated database, a search engine, and a key-value storage.

![multi-store setup 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/how-to-set-up-multiple-stores.md/multi-store-setup-configuration-option-3.png)


This setup is most suitable for the projects with the following requirements:

* Completely different business requirements per store, like business logic and features.

* Independent maintenance and development flow.

* Separated data management for entities like products, customers, and orders.

* On-demand setup of any type of environment per store, like test, staging, or production.

It’s the most expensive but flexible option in terms of per-store scaling and performance.


## Setting up multiple stores

To set up multiple stores, do the following.

### Configuring code buckets
Code buckets provide an easy way to execute different business logics in runtime based on different HTTP or console command requests. To configure code buckets, see [Code buckets](/docs/scos/dev/architecture/code-buckets.html).

### Configuring stores

To configure stores, do the following.

#### 1. Define the stores

Define the desired stores in `config/Shared/stores.php`. In the example below, we define DE and AT stores:

<details>
  <summary markdown='span'>config/Shared/stores.php</summary>

```php
<?php

$stores = [];

$stores['DE'] = [
    'contexts' => [
        '*' => [
            'timezone' => 'Europe/Berlin',
            'dateFormat' => [
                'short' => 'd/m/Y',
                'medium' => 'd. M Y',
                'rfc' => 'r',
                'datetime' => 'Y-m-d H:i:s',
            ],
        ],
        'yves' => [],
        'zed' => [
            'dateFormat' => [
                'short' => 'Y-m-d',
            ],
        ],
    ],
    // locales configuration
    'locales' => [
         'en' => 'en_US',
         'de' => 'de_DE',
    ],
    // country and currency configuration
    'countries' => ['DE'],
    'currencyIsoCode' => 'EUR',
    // Queue pool is the mechanism which sends messages to several queues.
    'queuePools' => [
        'synchronizationPool' => [
            'AT-connection',
            'DE-connection',
        ],
    ],
    'storesWithSharedPersistence' => ['AT'],
];

$stores['AT'] = [
    'contexts' => [
        '*' => [
            'timezone' => 'Europe/Vienna',
            'dateFormat' => [
                'short' => 'd/m/Y',
                'medium' => 'd. M Y',
                'rfc' => 'r',
                'datetime' => 'Y-m-d H:i:s',
            ],
        ],
        'yves' => [],
        'zed' => [
            'dateFormat' => [
                'short' => 'Y-m-d',
            ],
        ],
    ],
    'locales' => [
         'en' => 'en_US',
         'de' => 'de_AT',
    ],
    'countries' => ['AT'],
    'currencyIsoCode' => 'EUR',
];

return $stores;
```

</details>

#### 2. Optional: Define store-specific configuration

1. For one or more stores you’ve defined in `config/Shared/stores.php`, define separate store-specific configuration. For example, `config/Shared/config-default_docker_de.php` is the configuration file for the `DE` store in the docker environment.

2. To apply the defined store-specific configuration, adjust the related deploy file in the `environment:` section.
In the following example, the `docker_de` environment name points to the `config/Shared/config-default_docker_de.php` store-specific configuration file. For more information about this deploy file parameter, see [environment:](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html#environment).

```yaml
....

environment: docker_de

image:
  tag:
```

#### 3. Define the default store
Define the default store in `config/Shared/default_store.php`. In the following example, we define `DE` as the default store.

```php
<?php

return 'DE';
...
```

#### 4. Adjust data import configuration

Adjust all the [import files and import configuration](/docs/scos/dev/data-import/{{site.version}}/data-importers-overview-and-implementation.html) to import data for the stores you’ve added. For example, define the import source for the `DE` store you’ve added:

```php
#2. Catalog Setup data import
...
- data_entity: product-price
  source: data/import/common/DE/product_price.csv
...   
```

#### 5. Configure installation recipes
Add the new stores to the installation recipes in `config/install/*` as follows:

```yaml
...

stores:
    ...
    - {STORE_NAME}
...    
```

For example, to add the `AT` and `DE` stores, we adjust an installation recipe as follows:

```yaml
...

stores:
    ...
    - DE
    - AT
...    
```

## Configuring the deploy file

According to the desired infrastructure setup, configure the deploy file for the multi-store setup. In the example below, we configure the [multi-store setup 1](#multi-store-setup-infrastructure-options): database, search engine, and key-value storage are shared:

<details>
  <summary markdown='span'>Deploy file configuration for the multi-store setup 1</summary>

```yaml
......

regions:
    EU:
        services:
            mail:
                sender:
                    name: No-Reply
                    email: no-reply@example.com
            database:
                database: database-name
                username: database-username
                password: database-password
        stores:
            DE:
                services:
                    broker:
                        namespace: de_queue
                    key_value_store:
                        namespace: 1
                    search:
                        namespace: de_search
                    session:
                        namespace: 2
            AT:
                services:
                    broker:
                        namespace: at_queue
                    key_value_store:
                        namespace: 3
                    search:
                        namespace: at_search
                    session:
                        namespace: 4
....                        
```

</details>

We use the following configuration parameters in this example:

* *Region* defines one or more isolated instances of the Spryker applications that have only one persistent database to work with. Visibility of the project's *Stores* is limited to operate only with the *Stores* that belong to a *Region*. *Region* refers to geographical terms like data centers, regions, and continents in the real world.

* *Store* defines the list of *Stores* and store-specific settings for *Services*.

For more information about deploy file configuration, see [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html).

## Defining the store context

You can define stores by domains or by headers. We recommend defining stores by domains, which is supported by default.  

Defining stores by headers is not supported by default, but you can use the following workaround.

{% info_block infoBox %}

The workaround is only supported by the [multi-store store setup 1](#multi-store-setup-infrastructure-options), when all the resources are shared. With the other setup, you need to manage the infrastructure configuration on the application level.

{% endinfo_block %}




**public/Glue/index.php**
```php
<?php

...
require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

// Add this block
if (isset($_SERVER['HTTP_APPLICATION_STORE'])) {
    putenv('APPLICATION_STORE=' . $_SERVER['HTTP_APPLICATION_STORE']);
}

Environment::initialize();

...
```

To check if the workaround works, in the browser console, run the following:
```php
fetch("http://{domain-name}/catalog-search", {
  "headers": {
    "upgrade-insecure-requests": "1",
    "application-store": "MY_STORE"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}).then(r => console.log(r.text()));
```

You’ve successfully added the stores and can access them according to how you’ve defined their context.
