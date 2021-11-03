---
title: HowTo - Set up multiple stores
description: Learn how to set up multiple stores for your project.
last_updated: Jun 16, 2021
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

{% info_block warningBox "Warning" %}

Please note that not all options to set up multiple stores that are currently possible with the Docker SDK will be applicable for our PaaS customers. Some options to set up multiple stores, like creating different regions, is not currently supported for our PaaS customers. Alternatives exist though and we are rolling out documentation that will explain more about this popular topic soon. In the meanwhile: Please do not hesitate to reach out to us and we will help you decide which approach is most suitable for you.

{% endinfo_block %}

With the Spryker Commerce OS, you can create multiple stores for different scenarios that suit your business needs. The multi-store setup is very versatile and can be customized to your needs. For example, you can:

* Build one store that services multiple countries and languages or set up a different store for each region.
* Share abstract products, discounts, and other logics and code between stores or separate your setup for each store.
* Define separate search preferences to create an entirely different set of rankings, rules, and settings per store (for example, a date format or a currency).
* Set up the default store for your application.

If you set up multiple stores that represent different countries of the shop, you might choose the following approaches:

* Stores share the same code base but allow to customize logic and templates by inheritance.
* The SQL database can be shared among all stores, or there can be a dedicated database per store.
* Hosting infrastructure can be shared or separated for the stores.

To set up multiple stores for your project, follow the steps below.

## 1. Configure stores

The stores are configured in `config/Shared/stores.php`:

```php
<?php

$stores = [];

$stores['DE'] = [
    // place the DE store configuration here
];
$stores['AT'] = [
    // place the AT store configuration here
];
return $stores;
```

In this file, you can:
* Configure the formatting settings, depending on the context (for the Storefront or for the Back Office interface):

```php
<?php
stores['DE'] = [
    // different contexts
    'contexts' => [
        // settings for contexts (overwrites shared configurations)
        'yves' => [],
        'zed' => [
            'dateFormat' => [
                // short date (2012-12-28)
                'short' => 'Y-m-d',
            ],
        ],
    ]
  ];
  ```

* Set up shared configuration for common settings, for example, a timezone:

```php
  <?php
stores['DE'] = [
    // different contexts
    'contexts' => [
        // shared settings for all contexts
        '*' => [
            'timezone' => 'Europe/Berlin',
            'dateFormat' => [
                'short' => 'd/m/Y',
                'medium' => 'd. M Y',
                // date formatted as described in RFC 2822
                'rfc' => 'r',
                'datetime' => 'Y-m-d H:i:s',
            ],
        ],
    ]
  ];
  ```

* For each store, specify the locales that need to be supported:

```php
  <?php
'locales' => [
        // first entry is default
       'en' => 'en_US',
       'de' => 'de_DE',
    ],
 ```
 See [HowTo - Set up stores with multiple locales](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-stores-with-multiple-locales.html) for details on how to configure stores with multiple locales.

* Specify currency and country for the store you configure:
  
 ```php
 <?php
'countries' => ['DE'],
'currencyIsoCode' => 'EUR'
```

Example of configuration for an application supporting two stores:

<details open>
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
    'locales' => [
         'en' => 'en_US',
         'de' => 'de_DE',
    ],
    'countries' => ['DE'],
    'currencyIsoCode' => 'EUR',
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

## 2. Add configuration files for stores
Each store defined in `config/Shared/stores.php` must have a dedicated configuration file. The configuration file holds such details such as the database name and credentials for the store that it corresponds to.
For example, `config_default-development_DE.php` is the configuration file for the DE store, for the development environment.

## 3. Configure the default store
You can configure the default store in the `config/Shared/default_store.php` file.

Example:
```php
<?php
return 'DE';
```

## 4. Verification

Once done, you can check the list of the created stores in the Back Office, in [**Administration > Stores**](/docs/scos/user/back-office-user-guides/{{site.version}}/administration/stores.html).
