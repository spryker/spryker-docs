---
title: Multiple Stores
originalLink: https://documentation.spryker.com/v2/docs/multiple-stores
redirect_from:
  - /v2/docs/multiple-stores
  - /v2/docs/en/multiple-stores
---

With the Spryker Commerce OS you can freely create Multiple Stores for different scenarios that suit your business needs. Build one Store that services multiple countries and languages or setup a different store for each region. Easily share abstract products, discounts and other logics and code between stores or separate your setup for each. You can for example define separate search preferences to create an entirely different set of rankings, rules and settings per store. The Multi Store Setup is very versatile and can be customized to your needs.

There can be multiple stores that represent different countries of the shop.

* Stores share the same code base but allow to customize logic and templates by inheritance
* The SQL database can be shared among all stores or there can be a dedicated database per store
* Hosting infrastructure can be shared or separated for the stores

You can set up the stores together with their settings such as a date format or a currency and also you can set up the default store for your application.

## Configure Stores

The stores configuration can be found in `config/Shared/stores.php`

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

Here you can configure the formatting settings, depending on the context (for the shop or for the back-office interface).

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
  
  You can have shared configuration for common settings(e.g. timezone).
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
  
  You can specify for each shop the locales that need to be supported:
  ```php
  <?php
'locales' => [
        // first entry is default
       'en' => 'en_US',
       'de' => 'de_DE',
    ],
 ```
 
 You can also specify the currency and country for the shop you’re configuring:
 ```php
 <?php
'countries' => ['DE'],
'currencyIsoCode' => 'EUR'
```

Example of configuration for application supporting 2 shops:
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

### Configuration Files for Stores
Each store defined in the `config/Shared/stores.php` must have a dedicated configuration file. The configuration file holds details such as database name and credentials for the store that it corresponds to.

{% info_block infoBox %}
Example: `config_default-development_DE.php` is the configuration file for the DE store, for the development environment.
{% endinfo_block %}

### Configure Default Store
The default store is configured in the `config/Shared/default_store.php` file.
Example:
```php
<?php
return 'DE';
```

You can check the list of created stores in the **Back Office > Administration section > Stores** section.	

<!-- once published, add it to related articles: https://documentation.spryker.com/administration_interface_guide/administration/references/stores-reference-information-201911.htm -->
