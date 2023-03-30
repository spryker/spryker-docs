To integrate Dynamic multistore feature  in your project, you need to:

- [Define the region stores context by domain](#define-the-region-stores-context-by-domain)
- [Integration Dynamic Store feature](#integration-dynamic-store-feature)
- [Deploy file changes and enable dynamic store feature](#deploy-file-changes-and-enable-dynamic-store-feature)
- [Delete store in database](#delete-store-in-database)


## Define the region stores context by domain

Since implementation dynamic multistore features you can define region or store by domains or by headers.
We recommend defining region by domains, which is supported by default for dynamic store. 

{% info_block infoBox "Recomedations for changing domain name" %}

For example, you have an existing store that uses the domain de.spryker.shop. With the integration of Dynamic Store, you have also started using the domain eu.spryker.shop. 
We recommend making de.spryker.shop a mirror of eu.spryker.shop to preserve the availability of old links in search engines.

{% endinfo_block %}

## Integration Dynamic Store feature

To install it, you need to do the following:

{% info_block warningBox "Note" %}

Spryker Shop Suite contains Dynamic store out of the box. If your project has the latest Shop Suite master merged, you can proceed directly to step <a href="#enabling-ds">2. Enable Dynamic Store</a>.

{% endinfo_block %}

### Install feature core

Follow the steps below to install the feature core.

To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{site.version}}   | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/spryker-core-feature-integration.html) |
| Spryker Dynamic multistore | {{site.version}} | [Dynamic multistore feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/) |


### Install the required modules using Composer

Please note if you don't use some features, you can skip some packages for update.

Minimum version for packages 

For Dynamic Store feature you need to update the following packages

{% info_block infoBox "Note" %}

You can found the list of modules and their versions in the table by the [link](https://api.release.spryker.com/release-group/0000). <!-- Update link after release-->

{% endinfo_block %}

<details><summary markdown='span'>Click to expend table </summary>

###  Min version modules

| MODULE                                        | MIN VERSION |
|-----------------------------------------------|-------------|
| spryker/category-data-import                  | 0.4.0       |
| spryker/country                               | 4.0.0       |
| spryker/country-data-import                   | 0.1.0       |
| spryker/country-gui                           | 1.0.0       |
| spryker/currency                              | 4.0.0       |
| spryker/currency-data-import                  | 0.1.0       |
| spryker/currency-gui                          | 1.0.0       |
| spryker/locale                                | 4.0.0       |
| spryker/locale-data-import                    | 0.1.0       |
| spryker/locale-gui                            | 1.0.0       |
| spryker/product-category-filter-gui-extension | 1.0.0       |
| spryker/product-label-data-import             | 0.2.0       |
| spryker/products-backend-api                  | 0.2.0       |
| spryker/search-http                           | 0.3.0       |
| spryker/store-context-gui                     | 1.0.0       |
| spryker/store-data-import                     | 0.1.0       |
| spryker/store-extension                       | 1.0.0       |
| spryker/store-gui-extension                   | 1.0.0       |
| spryker/store-storage                         | 1.0.0       |
| spryker-shop/store-widget                     | 1.0.0       |
| spryker-eco/payone                            | 4.5.0       |
| spryker/rabbit-mq                             | 2.16.0      |
| spryker/app-catalog-gui                       | 1.3.0       |
| spryker/application                           | 3.32.0      |
| spryker/category-gui                          | 2.2.0       |
| spryker/category-image                        | 1.3.0       |
| spryker/category-storage                      | 2.6.0       |
| spryker/cms                                   | 7.13.0      |
| spryker/cms-block-storage                     | 2.5.0       |
| spryker/cms-page-data-import                  | 1.2.0       |
| spryker/cms-page-search                       | 2.6.0       |
| spryker/cms-storage                           | 2.7.0       |
| spryker/config                                | 3.6.0       |
| spryker/console                               | 4.12.0      |
| spryker/customer                              | 7.51.0      |
| spryker/data-import                           | 1.21.0      |
| spryker/discount                              | 9.33.0      |
| spryker/gift-card-mail-connector              | 1.2.0       |
| spryker/glue-application                      | 1.50.0      |
| spryker/http                                  | 1.9.0       |
| spryker/kernel                                | 3.72.0      |
| spryker/manual-order-entry-gui                | 0.9.4       |
| spryker/merchant-data-import                  | 0.5.1       |
| spryker/money                                 | 2.12.0      |
| spryker/multi-cart                            | 1.10.0      |
| spryker/navigation-storage                    | 1.10.0      |
| spryker/offer-gui                             | 0.3.10      |
| spryker/oms                                   | 11.26.0     |
| spryker/persistent-cart                       | 3.6.0       |
| spryker/price-product-schedule                | 2.7.0       |
| spryker/product-bundle                        | 7.15.0      |
| spryker/product-category-filter-gui           | 2.4.0       |
| spryker/product-label-gui                     | 3.4.0       |
| spryker/product-merchant-portal-gui           | 3.4.0       |
| spryker/product-option                        | 8.15.0      |
| spryker/product-packaging-unit                | 4.7.0       |
| spryker/product-page-search                   | 3.30.0      |
| spryker/product-relation                      | 3.3.0       |
| spryker/product-review-search                 | 1.8.0       |
| spryker/product-set-page-search               | 1.8.0       |
| spryker/propel                                | 3.37.0      |
| spryker/quote                                 | 2.18.0      |
| spryker/quote-extension                       | 1.8.0       |
| spryker/rest-request-validator                | 1.5.0       |
| spryker/sales                                 | 11.38.0     |
| spryker/sales-data-export                     | 0.2.1       |
| spryker/sales-invoice                         | 1.4.0       |
| spryker/sales-order-threshold-data-import     | 0.1.4       |
| spryker/sales-order-threshold-gui             | 1.9.0       |
| spryker/scheduler                             | 1.3.0       |
| spryker/scheduler-jenkins                     | 1.3.0       |
| spryker/search                                | 8.20.0      |
| spryker/search-elasticsearch                  | 1.15.0      |
| spryker/storage                               | 3.20.0      |
| spryker/store                                 | 1.19.0      |
| spryker/store-gui                             | 1.2.0       |
| spryker/stores-rest-api                       | 1.1.0       |
| spryker/synchronization                       | 1.16.0      |
| spryker/tax                                   | 5.14.0      |
| spryker/testify                               | 3.48.0      |
| spryker/url-storage                           | 1.16.0      |
| spryker/user-locale                           | 1.3.0       |
| spryker/user-merchant-portal-gui              | 2.4.0       |
| spryker/util-date-time                        | 1.4.0       |
| spryker/zed-request                           | 3.19.0      |
| spryker-shop/catalog-page                     | 1.25.0      |
| spryker-shop/checkout-page                    | 3.24.0      |
| spryker-shop/cms-page                         | 1.8.0       |
| spryker-shop/company-page                     | 2.21.0      |
| spryker-shop/configurable-bundle-widget       | 1.8.0       |
| spryker-shop/currency-widget                  | 1.6.0       |
| spryker-shop/customer-page                    | 2.41.0      |
| spryker-shop/customer-reorder-widget          | 6.14.0      |
| spryker-shop/language-switcher-widget         | 1.5.0       |
| spryker-shop/money-widget                     | 1.7.0       |
| spryker-shop/price-product-volume-widget      | 1.9.0       |
| spryker-shop/product-measurement-unit-widget  | 1.2.0       |
| spryker-shop/product-new-page                 | 1.4.0       |
| spryker-shop/product-packaging-unit-widget    | 1.6.0       |
| spryker-shop/product-search-widget            | 3.5.0       |
| spryker-shop/quick-order-page                 | 4.9.0       |
| spryker-shop/shop-application                 | 1.15.0      |
| spryker-shop/shop-ui                          | 1.68.0      |
| spryker-shop/shopping-list-page               | 1.9.0       |
| spryker/synchronization-behavior              | 1.10.0      |
| spryker/price-product-schedule-gui            | 2.3.1       |
| spryker/product-image-storage                 | 1.15.1      |
| spryker/sales-reclamation-gui                 | 1.7.1       |

</details>


This list of modules can be separated in two groups. List of modules to update in order for the functionality to work and list of modules to update in order for them to work with the new functionality.
Bellow provided list of modules which need to be updated for integration Dynamic Store:

Modules to update in order for the functionality to work:

<!-- main-modules.md -->

| MODULE                                        | VERSION |
|-----------------------------------------------|---------|
| spryker/category-data-import                  | 0.4.0   |
| spryker/country                               | 4.0.0   |
| spryker/country-data-import                   | 0.1.0   |
| spryker/country-gui                           | 1.0.0   |
| spryker/currency                              | 4.0.0   |
| spryker/currency-data-import                  | 0.1.0   |
| spryker/currency-gui                          | 1.0.0   |
| spryker/locale                                | 4.0.0   |
| spryker/locale-data-import                    | 0.1.0   |
| spryker/locale-gui                            | 1.0.0   |
| spryker/product-category-filter-gui-extension | 1.0.0   |
| spryker/product-label-data-import             | 0.2.0   |
| spryker/products-backend-api                  | 0.2.0   |
| spryker/search-http                           | 0.3.0   |
| spryker/store-context-gui                     | 1.0.0   |
| spryker/store-data-import                     | 0.1.0   |
| spryker/store-extension                       | 1.0.0   |
| spryker/store-gui-extension                   | 1.0.0   |
| spryker/store-storage                         | 1.0.0   |
| spryker-shop/store-widget                     | 1.0.0   |
| spryker/rabbit-mq                             | 2.16.0  |
| spryker/application                           | 3.32.0  |
| spryker/config                                | 3.6.0   |
| spryker/console                               | 4.12.0  |
| spryker/customer                              | 7.51.0  |
| spryker/data-import                           | 1.21.0  |
| spryker/discount                              | 9.33.0  |
| spryker/glue-application                      | 1.50.0  |
| spryker/http                                  | 1.9.0   |
| spryker/kernel                                | 3.72.0  |
| spryker/money                                 | 2.12.0  |
| spryker/oms                                   | 11.26.0 |
| spryker/product-page-search                   | 3.30.0  |
| spryker/propel                                | 3.37.0  |
| spryker/quote                                 | 2.18.0  |
| spryker/scheduler                             | 1.3.0   |
| spryker/scheduler-jenkins                     | 1.3.0   |
| spryker/search                                | 8.20.0  |
| spryker/search-elasticsearch                  | 1.15.0  |
| spryker/storage                               | 3.20.0  |
| spryker/store                                 | 1.19.0  |
| spryker/store-gui                             | 1.2.0   |
| spryker/zed-request                           | 3.19.0  |
| spryker/synchronization-behavior              | 1.10.0  |

Composer command to update modules:

```bash
composer require spryker/category-data-import:"^0.4.0" --update-with-dependencies
composer require spryker/country:"^4.0.0" --update-with-dependencies
composer require spryker/country-data-import:"^0.1.0" --update-with-dependencies
composer require spryker/country-gui:"^1.0.0" --update-with-dependencies
composer require spryker/currency:"^4.0.0" --update-with-dependencies
composer require spryker/currency-data-import:"^0.1.0" --update-with-dependencies
composer require spryker/currency-gui:"^1.0.0" --update-with-dependencies
composer require spryker/locale:"^4.0.0" --update-with-dependencies
composer require spryker/locale-data-import:"^0.1.0" --update-with-dependencies
composer require spryker/locale-gui:"^1.0.0" --update-with-dependencies
composer require spryker/product-category-filter-gui-extension:"^1.0.0" --update-with-dependencies
composer require spryker/product-label-data-import:"^0.2.0" --update-with-dependencies
composer require spryker/products-backend-api:"^0.2.0" --update-with-dependencies
composer require spryker/search-http:"^0.3.0" --update-with-dependencies
composer require spryker/store-context-gui:"^1.0.0" --update-with-dependencies
composer require spryker/store-data-import:"^0.1.0" --update-with-dependencies
composer require spryker/store-extension:"^1.0.0" --update-with-dependencies
composer require spryker/store-gui-extension:"^1.0.0" --update-with-dependencies
composer require spryker/store-storage:"^1.0.0" --update-with-dependencies
composer require spryker-shop/store-widget:"^1.0.0" --update-with-dependencies
composer require spryker/rabbit-mq:"^2.16.0" --update-with-dependencies
composer require spryker/application:"^3.32.0" --update-with-dependencies
composer require spryker/config:"^3.6.0" --update-with-dependencies
composer require spryker/console:"^4.12.0" --update-with-dependencies
composer require spryker/customer:"^7.51.0" --update-with-dependencies
composer require spryker/data-import:"^1.21.0" --update-with-dependencies
composer require spryker/discount:"^9.33.0" --update-with-dependencies
composer require spryker/glue-application:"^1.50.0" --update-with-dependencies
composer require spryker/http:"^1.9.0" --update-with-dependencies
composer require spryker/kernel:"^3.72.0" --update-with-dependencies
composer require spryker/money:"^2.12.0" --update-with-dependencies
composer require spryker/oms:"^11.26.0" --update-with-dependencies
composer require spryker/product-page-search:"^3.30.0" --update-with-dependencies
composer require spryker/propel:"^3.37.0" --update-with-dependencies
composer require spryker/quote:"^2.18.0" --update-with-dependencies
composer require spryker/scheduler:"^1.3.0" --update-with-dependencies
composer require spryker/scheduler-jenkins:"^1.3.0" --update-with-dependencies
composer require spryker/search:"^8.20.0" --update-with-dependencies
composer require spryker/search-elasticsearch:"^1.15.0" --update-with-dependencies
composer require spryker/storage:"^3.20.0" --update-with-dependencies
composer require spryker/store:"^1.19.0" --update-with-dependencies
composer require spryker/store-gui:"^1.2.0" --update-with-dependencies
composer require spryker/zed-request:"^3.19.0" --update-with-dependencies
composer require spryker/synchronization-behavior:"^1.10.0" --update-with-dependencies
```

And list of modules to update in order for them to work with the new functionality:


<details><summary markdown='span'>Click to expend table </summary>

<!-- other-modules.md -->
| MODULE                                                | VERSION                 |
|-------------------------------------------------------|-------------------------|
| spryker-eco/payone                                    | 4.5.0                   |
| spryker/app-catalog-gui                               | 1.3.0                   |
| spryker/category-gui                                  | 2.2.0                   |
| spryker/category-image                                | 1.3.0                   |
| spryker/category-storage                              | 2.6.0                   |
| spryker/cms                                           | 7.13.0                  |
| spryker/cms-block-storage                             | 2.5.0                   |
| spryker/cms-page-data-import                          | 1.2.0                   |
| spryker/cms-page-search                               | 2.6.0                   |
| spryker/cms-storage                                   | 2.7.0                   |
| spryker/gift-card-mail-connector                      | 1.2.0                   |
| spryker/manual-order-entry-gui                        | 0.9.4                   |
| spryker/merchant-data-import                          | 0.5.1                   |
| spryker/multi-cart                                    | 1.10.0                  |
| spryker/navigation-storage                            | 1.10.0                  |
| spryker/offer-gui                                     | 0.3.10                  |
| spryker/persistent-cart                               | 3.6.0                   |
| spryker/price-product-schedule                        | 2.7.0                   |
| spryker/product-bundle                                | 7.15.0                  |
| spryker/product-category-filter-gui                   | 2.4.0                   |
| spryker/product-label-gui                             | 3.4.0                   |
| spryker/product-merchant-portal-gui                   | 3.4.0                   |
| spryker/product-option                                | 8.15.0                  |
| spryker/product-packaging-unit                        | 4.7.0                   |
| spryker/product-relation                              | 3.3.0                   |
| spryker/product-review-search                         | 1.8.0                   |
| spryker/product-set-page-search                       | 1.8.0                   |
| spryker/quote-extension                               | 1.8.0                   |
| spryker/rest-request-validator                        | 1.5.0                   |
| spryker/sales                                         | 11.38.0                 |
| spryker/sales-data-export                             | 0.2.1                   |
| spryker/sales-invoice                                 | 1.4.0                   |
| spryker/sales-order-threshold-data-import             | 0.1.4                   |
| spryker/sales-order-threshold-gui                     | 1.9.0                   |
| spryker/stores-rest-api                               | 1.1.0                   |
| spryker/synchronization                               | 1.16.0                  |
| spryker/tax                                           | 5.14.0                  |
| spryker/testify                                       | 3.48.0                  |
| spryker/url-storage                                   | 1.16.0                  |
| spryker/user-locale                                   | 1.3.0                   |
| spryker/user-merchant-portal-gui                      | 2.4.0                   |
| spryker/util-date-time                                | 1.4.0                   |
| spryker-shop/catalog-page                             | 1.25.0                  |
| spryker-shop/checkout-page                            | 3.24.0                  |
| spryker-shop/cms-page                                 | 1.8.0                   |
| spryker-shop/company-page                             | 2.21.0                  |
| spryker-shop/configurable-bundle-widget               | 1.8.0                   |
| spryker-shop/currency-widget                          | 1.6.0                   |
| spryker-shop/customer-page                            | 2.41.0                  |
| spryker-shop/customer-reorder-widget                  | 6.14.0                  |
| spryker-shop/language-switcher-widget                 | 1.5.0                   |
| spryker-shop/money-widget                             | 1.7.0                   |
| spryker-shop/price-product-volume-widget              | 1.9.0                   |
| spryker-shop/product-measurement-unit-widget          | 1.2.0                   |
| spryker-shop/product-new-page                         | 1.4.0                   |
| spryker-shop/product-packaging-unit-widget            | 1.6.0                   |
| spryker-shop/product-search-widget                    | 3.5.0                   |
| spryker-shop/quick-order-page                         | 4.9.0                   |
| spryker-shop/shop-application                         | 1.15.0                  |
| spryker-shop/shop-ui                                  | 1.68.0                  |
| spryker-shop/shopping-list-page                       | 1.9.0                   |
| spryker/price-product-schedule-gui                    | 2.3.1                   |
| spryker/product-image-storage                         | 1.15.1                  |
| spryker/sales-reclamation-gui                         | 1.7.1                   |
</details>


If you can’t install the required version, run the following command to see what else you need to update:

```bash
composer why-not spryker/module-name:1.0.0
```

And for check installed modules run:

```bash
composer show spryker/*
```


{% info_block warningBox "Verification" %}

Make sure that the new modules have been installed:
| MODULE                                        | EXPECTED DIRECTORY                                   |
|-----------------------------------------------|------------------------------------------------------|
| spryker/country-data-import                   | vendor/spryker/country-data-import                   |
| spryker/country-gui                           | vendor/spryker/country-gui                           |
| spryker/currency-data-import                  | vendor/spryker/currency-data-import                  |
| spryker/currency-gui                          | vendor/spryker/currency-gui                          |
| spryker/locale-data-import                    | vendor/spryker/locale-data-import                    |
| spryker/locale-gui                            | vendor/spryker/locale-gui                            |
| spryker/product-category-filter-gui-extension | vendor/spryker/product-category-filter-gui-extension |
| spryker/store-context-gui                     | vendor/spryker/store-context-gui                     |
| spryker/store-data-import                     | vendor/spryker/store-data-import                     |
| spryker/store-extension                       | vendor/spryker/store-extension                       |
| spryker/store-gui-extension                   | vendor/spryker/store-gui-extension                   |
| spryker/store-storage                         | vendor/spryker/store-storage                         |
| spryker-shop/store-widget                     | vendor/spryker-shop/store-widget                     |

{% endinfo_block %}


{% info_block infoBox "Note" %}

More details about the updated modules can be found at the [link](https://api.release.spryker.com/release-group/0000). <!-- Update link after release-->

{% endinfo_block %}


### Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:
    
```bash 
console propel:install
console transfer:generate

```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                       | TYPE   | EVENT   |
|---------------------------------------|--------|---------|
| spy_store.fk_currency                 | column | added   |
| spy_store.fk_locale                   | column | added   |
| spy_country_store                     | table  | added   |
| spy_locale_store                      | table  | added   |
| spy_currency_store                    | table  | added   |

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| CurrencyCriteria | class | created | src/Generated/Shared/Transfer/CurrencyCriteriaTransfer  |
| LocaleConditions | class | created | src/Generated/Shared/Transfer/LocaleConditionsTransfer  |
| SearchContext.storeName | property | added | src/Generated/Shared/Transfer/SearchContextTransfer |
| SchedulerJob.region     | property | added | src/Generated/Shared/Transfer/SchedulerJobTransfer  |
| ProductConcrete.stores            | property | added | src/Generated/Shared/Transfer/ProductConcreteTransfer  |
| Customer.storeName                | property | added | src/Generated/Shared/Transfer/CustomerTransfer  |
| Store.defaultCurrencyIsoCode      | property | added | src/Generated/Shared/Transfer/CustomerTransfer  |

{% endinfo_block %}

 
### Change configuration 

{% info_block warningBox "Configuration store.php" %}

Dynamic store allows not to use the configuration in the file `config/Shared/stores.php` where setup configuration for stores. 

{% endinfo_block %}

1. Change the configuration file. 
Allow configurations for queues to be set dynamically.

Modify your configuration file

```
config/Shared/config_default.php
```

Change the following code block:

```php
<?php
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [];
$connectionKeys = array_keys($rabbitConnections);
$defaultKey = reset($connectionKeys);
if (getenv('SPRYKER_CURRENT_REGION')) {
    $defaultKey = getenv('SPRYKER_CURRENT_REGION');
}
if (getenv('APPLICATION_STORE') && (bool)getenv('SPRYKER_DYNAMIC_STORE_MODE') === false) {
    $defaultKey = getenv('APPLICATION_STORE');
}
foreach ($rabbitConnections as $key => $connection) {
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key] = $defaultConnection;
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_CONNECTION_NAME] = $key . '-connection';
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_STORE_NAMES] = [$key];
    foreach ($connection as $constant => $value) {
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][constant(RabbitMqEnv::class . '::' . $constant)] = $value;
    }
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION] = $key === $defaultKey;
}
```

to

```php
<?php 

$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [];
$connectionKeys = array_keys($rabbitConnections);
$defaultKey = reset($connectionKeys);
if (getenv('SPRYKER_CURRENT_REGION')) {
    $defaultKey = getenv('SPRYKER_CURRENT_REGION');
}
if (getenv('APPLICATION_STORE') && (bool)getenv('SPRYKER_DYNAMIC_STORE_MODE') === false) {
    $defaultKey = getenv('APPLICATION_STORE');
}
foreach ($rabbitConnections as $key => $connection) {
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key] = $defaultConnection;
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_CONNECTION_NAME] = $key . '-connection';
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_STORE_NAMES] = [$key];
    foreach ($connection as $constant => $value) {
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][constant(RabbitMqEnv::class . '::' . $constant)] = $value;
    }
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION] = $key === $defaultKey;
}
```

This code allows to set the configuration for queues dynamically. Use environment variables `SPRYKER_CURRENT_REGION` and `APPLICATION_STORE` to set the configuration for queues.

Also add configuration for queues dynamically. Use environment variables `SPRYKER_YVES_HOST_EU` and `SPRYKER_YVES_HOST_US` to set the configuration for queues. Please add the following code to the configuration file:

```php
$config[AvailabilityNotificationConstants::REGION_TO_YVES_HOST_MAPPING] = [
    'EU' => getenv('SPRYKER_YVES_HOST_EU'),
    'US' => getenv('SPRYKER_YVES_HOST_US'),
];
```


###  Change configuration for Jenkins jobs.

Delete the variable `$allStores` and its use in the configuration of the jobs through the `stores` parameter.

```
config/Zed/cronjobs/jenkins.php
```

So, the code block should be delete in you configuration file.


```php
$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');

$allStores = array_keys($stores);

```

So, job configuration will be like this:

```php
$jobs[] = [
    'name' => 'job-name',
    'command' => '$PHP_BIN vendor/bin/console product:check-validity',
    'schedule' => '0 6 * * *',
    'enable' => true,
];
```

For jobs `queue-worker-start`, `apply-price-product-schedule` add parameter `storeAware` with value `true`


```php
$jobs[] = [
    'name' => 'queue-worker-start',
    'command' => '$PHP_BIN vendor/bin/console queue:worker:start',
    'schedule' => '* * * * *',
    'enable' => true,
    'storeAware' => true,
];

$jobs[] = [
    'name' => 'apply-price-product-schedule',
    'command' => '$PHP_BIN vendor/bin/console price-product-schedule:apply',
    'schedule' => '0 6 * * *',
    'enable' => true,
    'storeAware' => true,
];
```
Please add the following code to the end of the configuration of the jobs in the configuration of the current region (if it is set).

```php

if (getenv('SPRYKER_CURRENT_REGION')) {
    foreach ($jobs as $job) {
        $job['region'] = getenv('SPRYKER_CURRENT_REGION');
    }
}
```

You also can check this configuration in the file `config/Zed/cronjobs/jenkins.php` in the [Spryker Suite repository](https://github.com/spryker-shop/suite).


### Wire plugin in QuoteDependencyProvider

Add the following code to the configuration file `src/Pyz/Zed/Quote/QuoteDependencyProvider.php`:

```php
<?php

namespace Pyz\Client\Quote;

use Spryker\Client\PersistentCart\Plugin\Quote\QuoteSyncDatabaseStrategyReaderPlugin;
use Spryker\Client\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return array<\Spryker\Client\QuoteExtension\Dependency\Plugin\DatabaseStrategyReaderPluginInterface>
     */
    protected function getDatabaseStrategyReaderPlugins(): array
    {
        return [
            new QuoteSyncDatabaseStrategyReaderPlugin(),
        ];
    }
}

```


### Change the configuration of the RabbitMQ queue.

The configuration of the RabbitMQ connection is set in the configuration file `config/Shared/config_default.php` and `config/Shared/config_ci.php`. 

Also need add the following code to the configuration queue pools for the current region, default locale and synchronization queue configuration. 

```
src/Pyz/Client/RabbitMq/RabbitMqConfig.php
```

```php 
<?php 

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\StoreStorage\StoreStorageConfig;


class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<array<string>>
     */
    public function getQueuePools(): array
    {
        return [
            'synchronizationPool' => $this->getQueueConnectionNames(),
        ];
    }

    /**
     * @return string|null
     */
    public function getDefaultLocaleCode(): ?string
    {
        return 'en_US';
    }


    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE,
        ];
    }

    /**
     * @return array<string>
     */
    protected function getQueueConnectionNames(): array
    {
        return array_map(
            function (array $connection): string {
                return $connection[RabbitMqEnv::RABBITMQ_CONNECTION_NAME];
            },
            $this->get(RabbitMqEnv::RABBITMQ_CONNECTIONS),
        );
    }    
}    

```

### Change the configuration of the Store module.


Wire `StoreStorageStoreExpanderPlugin` plugin to the `StoreDependencyProvider` to extend the StoreTransfer with the current store data.

```
src/Pyz/Client/Store/StoreDependencyProvider.php
```
```php
<?php

namespace Pyz\Client\Store;

use Spryker\Client\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;
use Spryker\Client\StoreStorage\Plugin\Store\StoreStorageStoreExpanderPlugin;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Client\StoreExtension\Dependency\Plugin\StoreExpanderPluginInterface>
     */
    protected function getStoreExpanderPlugins(): array
    {
        return [
            new StoreStorageStoreExpanderPlugin(),
        ];
    }
}
```

### Adjust the configuration of the ZedRequest module. 

```
src/Pyz/Client/ZedRequest/ZedRequestDependencyProvider.php
```

Class `ZedRequestDependencyProvider` should be extended from `Spryker\Client\ZedRequest\ZedRequestDependencyProvider` and the method `getMetaDataProviderPlugins` should be overridden, Like this:

```php
<?php

namespace Pyz\Client\ZedRequest;

use Spryker\Client\Currency\Plugin\ZedRequestMetaDataProviderPlugin;
use Spryker\Client\Locale\Plugin\ZedRequest\LocaleMetaDataProviderPlugin;
use Spryker\Client\Store\Plugin\ZedRequest\StoreMetaDataProviderPlugin;
use Spryker\Client\ZedRequest\ZedRequestDependencyProvider as SprykerZedRequestDependencyProvider;

class ZedRequestDependencyProvider extends SprykerZedRequestDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ZedRequestExtension\Dependency\Plugin\MetaDataProviderPluginInterface>
     */
    protected function getMetaDataProviderPlugins(): array
    {
        return [
            'currency' => new ZedRequestMetaDataProviderPlugin(),
            'store' => new StoreMetaDataProviderPlugin(),
            'locale' => new LocaleMetaDataProviderPlugin(),            
        ];
    }
}

```


### Adjust GlueApplicationDependencyProvider class. 

Replace `SetStoreCurrentLocaleBeforeActionPlugin` plugin in the `GlueApplicationDependencyProvider::getControllerBeforeActionPlugins()` method with `StoreHttpHeaderApplicationPlugin` and `LocaleApplicationPlugin` plugins.

```
src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php
```

```php
<?php 

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin;
use Spryker\Glue\Locale\Plugin\Application\LocaleApplicationPlugin;
use Spryker\Glue\StoresRestApi\Plugin\Application\StoreHttpHeaderApplicationPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @deprecated Will be removed without replacement.
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerBeforeActionPluginInterface>
     */
    protected function getControllerBeforeActionPlugins(): array
    {
        return [
            new StoreHttpHeaderApplicationPlugin(),
            new LocaleApplicationPlugin(),
        ];
    }
}
```


### Adjust GlueStorefrontApiApplicationDependencyProvider.

Add `StoreHttpHeaderApplicationPlugin` plugin to the `getApplicationPlugins` method.

```
src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php
```

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\Http\Plugin\Application\HttpApplicationPlugin;
use Spryker\Glue\Locale\Plugin\Application\LocaleApplicationPlugin;
use Spryker\Glue\StoresRestApi\Plugin\Application\StoreHttpHeaderApplicationPlugin;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new HttpApplicationPlugin(),
            new StoreHttpHeaderApplicationPlugin(),
            new LocaleApplicationPlugin(),
        ];
}

```

### Adjust GlueBackendApiApplicationDependencyProvider.

Same for `GlueBackendApiApplicationDependencyProvider` class.

```
src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php
```

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\StoresRestApi\Plugin\Application\StoreHttpHeaderApplicationPlugin;
 

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new StoreHttpHeaderApplicationPlugin(),
        ];
    }
}
```

### Add RouterConfig class.

Addd the following code to the `RouterConfig` class, use the following code:

```
src/Pyz/Yves/Router/RouterConfig.php
```

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Client\Kernel\Container;
use Spryker\Yves\Router\RouterConfig as SprykerRouterConfig;

/**
 * @method \Spryker\Shared\Router\RouterConfig getSharedConfig()
 */
class RouterConfig extends SprykerRouterConfig
{
    /**
     * @see \Spryker\Yves\Router\Plugin\RouterEnhancer\LanguagePrefixRouterEnhancerPlugin
     *
     * @return array<string>
     */
    public function getAllowedLanguages(): array
    {
        return (new Container())->getLocator()->locale()->client()->getAllowedLanguages();
    }
}
```

By using this code, you can utilize the language prefix in the URL. The function `RouterConfig::getAllowedLanguages()` will provide a list of supported languages for manipulating the Route. If an incoming URL contains a language prefix, such as `/en/home`, the router will remove the prefix so that it only contains the relevant URL path, such as `/home`. This is because the router is only configured to handle URL paths without optional prefixes or suffixes.

### Addjust ShopApplicationDependencyProvider

Add `StoreSwitcherWidget` to the `getGlobalWidgets` method. 

```
src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php
```

```php
<?php 
namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\StoreWidget\Plugin\ShopApplication\StoreApplicationPlugin;
use SprykerShop\Yves\StoreWidget\Widget\StoreSwitcherWidget;


class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            StoreSwitcherWidget::class,
        ];
    }

    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new StoreApplicationPlugin(),
        ];
    }    
}
```

### Adjust AclMerchantPortalDependencyProvider class.

Wire up the new plugins to the `AclMerchantPortalDependencyProvider` class.

```
src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php
```
```php
<?php

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\Country\Communication\Plugin\AclMerchantPortal\CountryStoreAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\Currency\Communication\Plugin\AclMerchantPortal\CurrencyStoreAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\Locale\Communication\Plugin\AclMerchantPortal\LocaleStoreAclEntityConfigurationExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\AclEntityConfigurationExpanderPluginInterface>
     */
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            new CountryStoreAclEntityConfigurationExpanderPlugin(),
            new CurrencyStoreAclEntityConfigurationExpanderPlugin(),
            new LocaleStoreAclEntityConfigurationExpanderPlugin(),
        ];
    }
}

```


### Adjust ApplicationDependencyProvider. 

Add `CurrencyBackendGatewayApplicationPlugin`, `LocaleBackendGatewayApplicationPlugin`, `StoreBackendGatewayApplicationPlugin`, `RequestBackendGatewayApplicationPlugin` plugins to the `getBackendGatewayApplicationPlugins` method, and add `BackofficeStoreApplicationPlugin` to the `getBackofficeApplicationPlugins` method.

```
src/Pyz/Zed/Application/ApplicationDependencyProvider.php
```

```php 
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Currency\Communication\Plugin\Application\CurrencyBackendGatewayApplicationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Application\LocaleBackendGatewayApplicationPlugin;
use Spryker\Zed\Store\Communication\Plugin\Application\BackofficeStoreApplicationPlugin;
use Spryker\Zed\Store\Communication\Plugin\Application\StoreBackendGatewayApplicationPlugin;
use Spryker\Zed\ZedRequest\Communication\Plugin\Application\RequestBackendGatewayApplicationPlugin;


class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{

        /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getBackofficeApplicationPlugins(): array
    {
        return [
            new BackofficeStoreApplicationPlugin(),
        ];
    }


    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getBackendGatewayApplicationPlugins(): array
    {
        return [
            new RequestBackendGatewayApplicationPlugin(),
            new StoreBackendGatewayApplicationPlugin(),
            new LocaleBackendGatewayApplicationPlugin(),
            new CurrencyBackendGatewayApplicationPlugin(),
        ];
    }
}
```

###  Add method to CustomerConfig class.


Add the following code to the `CustomerConfig` class, use the following code:

```
src/Pyz/Zed/Customer/CustomerConfig.php
```

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerConfig as SprykerCustomerConfig;

class CustomerConfig extends SprykerCustomerConfig
{
    /**
     * {@inheritDoc}
     *
     * @return string|null
     */
    public function getCustomerSequenceNumberPrefix(): ?string
    {
        return 'customer';
    }
}

```


###  ProductCategoryFilterGuiDependencyProvider class.


Review the `ProductCategoryFilterGuiDependencyProvider` class and add the `StoreProductCategoryListActionViewDataExpanderPlugin` plugin to the `getProductCategoryListActionViewDataExpanderPlugins` method. 
Plugin is used to add store information to the category list.

```
src/Pyz/Zed/ProductCategoryFilterGui/ProductCategoryFilterGuiDependencyProvider.php
```

```php
<?php
namespace Pyz\Zed\ProductCategoryFilterGui;

use Spryker\Zed\ProductCategoryFilterGui\ProductCategoryFilterGuiDependencyProvider as SprykerProductCategoryFilterGuiDependencyProvider;
use Spryker\Zed\StoreGui\Communication\Plugin\ProductCategoryFilterGui\StoreProductCategoryListActionViewDataExpanderPlugin;

class ProductCategoryFilterGuiDependencyProvider extends SprykerProductCategoryFilterGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductCategoryFilterGuiExtension\Dependency\Plugin\ProductCategoryListActionViewDataExpanderPluginInterface>
     */
    protected function getProductCategoryListActionViewDataExpanderPlugins(): array
    {
        return [
            new StoreProductCategoryListActionViewDataExpanderPlugin(),
        ];
    }
}
```

### Adjust PublisherDependencyProvider class.

Add publisher plugins to the `getPublisherPlugins` method.

```
src/Pyz/Zed/Publisher/PublisherDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\CountryStore\CountryStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\CurrencyStore\CurrencyStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\LocaleStore\LocaleStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store\StoreSynchronizationTriggeringPublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store\StoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\StorePublisherTriggerPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            // ...
            $this->getStoreStoragePlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new StorePublisherTriggerPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getStoreStoragePlugins(): array
    {
        return [
            new StoreWritePublisherPlugin(),
            new StoreSynchronizationTriggeringPublisherPlugin(),
            new CurrencyStoreWritePublisherPlugin(),
            new CountryStoreWritePublisherPlugin(),
            new LocaleStoreWritePublisherPlugin(),
        ];
    }
}
```

###  Enable SynchronizationStorageQueueMessageProcessorPlugin in the QueueDependencyProvider class.

For synchronization storage queue, add the `SynchronizationStorageQueueMessageProcessorPlugin` plugin to the `getProcessorMessagePlugins` method.

```
src/Pyz/Zed/Queue/QueueDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Zed\Kernel\Container;
use Spryker\Shared\StoreStorage\StoreStorageConfig;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

### Create StoreDependencyProvider class.

StoreDependencyProvider class is used to register new plugins for the Store module. 

Add the following code to the `StoreDependencyProvider` class:


```
src/Pyz/Zed/Store/StoreDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Store;

use Spryker\Zed\Country\Communication\Plugin\Store\CountryStoreCollectionExpanderPlugin;
use Spryker\Zed\Country\Communication\Plugin\Store\CountryStorePostCreatePlugin;
use Spryker\Zed\Country\Communication\Plugin\Store\CountryStorePostUpdatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStoreCollectionExpanderPlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStorePostCreatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStorePostUpdatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\DefaultCurrencyStorePreCreateValidationPlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\DefaultCurrencyStorePreUpdateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePostCreatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePostUpdatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePreCreateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePreUpdateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStoreCollectionExpanderPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStorePostCreatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStorePostUpdatePlugin;
use Spryker\Zed\Search\Communication\Plugin\Store\SearchSetupSourcesStorePostCreatePlugin;
use Spryker\Zed\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreCreateValidationPluginInterface>
     */
    protected function getStorePreCreateValidationPlugins(): array
    {
        return [
            new DefaultLocaleStorePreCreateValidationPlugin(),
            new DefaultCurrencyStorePreCreateValidationPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreUpdateValidationPluginInterface>
     */
    protected function getStorePreUpdateValidationPlugins(): array
    {
        return [
            new DefaultLocaleStorePreUpdateValidationPlugin(),
            new DefaultCurrencyStorePreUpdateValidationPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostCreatePluginInterface>
     */
    protected function getStorePostCreatePlugins(): array
    {
        return [
            new CountryStorePostCreatePlugin(),
            new CurrencyStorePostCreatePlugin(),
            new DefaultLocaleStorePostCreatePlugin(),
            new LocaleStorePostCreatePlugin(),
            new SearchSetupSourcesStorePostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostUpdatePluginInterface>
     */
    protected function getStorePostUpdatePlugins(): array
    {
        return [
            new CountryStorePostUpdatePlugin(),
            new CurrencyStorePostUpdatePlugin(),
            new DefaultLocaleStorePostUpdatePlugin(),
            new LocaleStorePostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StoreCollectionExpanderPluginInterface>
     */
    protected function getStoreCollectionExpanderPlugins(): array
    {
        return [
            new CountryStoreCollectionExpanderPlugin(),
            new CurrencyStoreCollectionExpanderPlugin(),
            new LocaleStoreCollectionExpanderPlugin(),
        ];
    }
}

```

### Create class `StoreGuiDependencyProvider`.

The `StoreGuiDependencyProvider` class is used to register new plugins for the StoreGui module. 

Add the following code to the `StoreGuiDependencyProvider` class:

```
src/Pyz/Zed/StoreGui/StoreGuiDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\StoreGui;

use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\AssignedCountriesStoreViewExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormTabExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormViewExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreTableExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\AssignedCurrenciesStoreViewExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreFormExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreFormTabExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreFormViewExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreTableExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\AssignedLocalesStoreViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\DefaultLocaleStoreViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormTabExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreTableExpanderPlugin;
use Spryker\Zed\StoreGui\StoreGuiDependencyProvider as SprykerStoreGuiDependencyProvider;

class StoreGuiDependencyProvider extends SprykerStoreGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormExpanderPluginInterface>
     */
    protected function getStoreFormExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormExpanderPlugin(),
            new CurrencyStoreFormExpanderPlugin(),
            new CountryStoreFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormViewExpanderPluginInterface>
     */
    protected function getStoreFormViewExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormViewExpanderPlugin(),
            new CurrencyStoreFormViewExpanderPlugin(),
            new CountryStoreFormViewExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormTabExpanderPluginInterface>
     */
    protected function getStoreFormTabsExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormTabExpanderPlugin(),
            new CurrencyStoreFormTabExpanderPlugin(),
            new CountryStoreFormTabExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreViewExpanderPluginInterface>
     */
    protected function getStoreViewExpanderPlugins(): array
    {
        return [
            new DefaultLocaleStoreViewExpanderPlugin(),
            new AssignedLocalesStoreViewExpanderPlugin(),
            new AssignedCurrenciesStoreViewExpanderPlugin(),
            new AssignedCountriesStoreViewExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreTableExpanderPluginInterface>
     */
    protected function getStoreTableExpanderPlugins(): array
    {
        return [
            new LocaleStoreTableExpanderPlugin(),
            new CurrencyStoreTableExpanderPlugin(),
            new CountryStoreTableExpanderPlugin(),
        ];
    }
}
```

### Create class StoreStorageConfig.

```
src/Pyz/Zed/StoreStorage/StoreStorageConfig.php
```

```php
<?php

namespace Pyz\Zed\StoreStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\CompanyUserStorage\CompanyUserStorageConfig;
use Spryker\Shared\CustomerAccessStorage\CustomerAccessStorageConstants;
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Shared\MerchantSearch\MerchantSearchConfig;
use Spryker\Shared\MerchantStorage\MerchantStorageConfig;
use Spryker\Shared\NavigationStorage\NavigationStorageConstants;
use Spryker\Shared\ProductMeasurementUnitStorage\ProductMeasurementUnitStorageConfig;
use Spryker\Shared\ProductPackagingUnitStorage\ProductPackagingUnitStorageConfig;
use Spryker\Shared\ProductReviewSearch\ProductReviewSearchConfig;
use Spryker\Shared\SalesReturnSearch\SalesReturnSearchConfig;
use Spryker\Zed\StoreStorage\StoreStorageConfig as SprykerStoreStorageConfig;

class StoreStorageConfig extends SprykerStoreStorageConfig
{
    /**
     * @return string|null
     */
    public function getStoreSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return array<string>
     */
    public function getStoreCreationResourcesToReSync(): array
    {
        return [
            GlossaryStorageConfig::TRANSLATION_RESOURCE_NAME,
            ProductReviewSearchConfig::PRODUCT_REVIEW_RESOURCE_NAME,
            NavigationStorageConstants::RESOURCE_NAME,
            ProductMeasurementUnitStorageConfig::PRODUCT_MEASUREMENT_UNIT_RESOURCE_NAME,
            ProductPackagingUnitStorageConfig::PRODUCT_PACKAGING_UNIT_RESOURCE_NAME,
            CustomerAccessStorageConstants::CUSTOMER_ACCESS_RESOURCE_NAME,
            CompanyUserStorageConfig::COMPANY_USER_RESOURCE_NAME,
            MerchantStorageConfig::MERCHANT_RESOURCE_NAME,
            SalesReturnSearchConfig::RETURN_REASON_RESOURCE_NAME,
            MerchantSearchConfig::MERCHANT_RESOURCE_NAME,
        ];
    }
}

```

### Add plugin to StoreGuiDependencyProvider.

Wire the `StoreSynchronizationDataPlugin` plugin to the `StoreGuiDependencyProvider` class for the `getSynchronizationDataPlugins()` method. This plugin will be used to synchronize the store data. 

```
src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\StoreStorage\Communication\Plugin\Synchronization\StoreSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new StoreSynchronizationDataPlugin(),
        ];
    }
}

```

### Change CodeBucketConfig class.

Please, adjust the `CodeBucketConfig` class to your needs. For example, you can replace a new code bucket.

```
src/SprykerConfig/CodeBucketConfig.php
```

```php
<?php

namespace SprykerConfig;

use Spryker\Shared\Kernel\CodeBucket\Config\AbstractCodeBucketConfig;

class CodeBucketConfig extends AbstractCodeBucketConfig
{
    /**
     * @return array<string>
     */
    public function getCodeBuckets(): array
    {
        return [
            'EU',
            'US',
        ];
    }

    /**
     * @deprecated This method implementation will be removed when environment configs are cleaned up.
     *
     * @return string
     */
    public function getDefaultCodeBucket(): string
    {
        $codeBuckets = $this->getCodeBuckets();

        return defined('APPLICATION_REGION') ? APPLICATION_REGION : reset($codeBuckets);
    }
}

```


### Dataimport and console commands.

Due to release new major version of `spryker/locale`, `spryker/currency`, `spryker/country` modules, we need to adjust data import.

##### Remove class list: 

- `src/Pyz/Zed/DataImport/Business/Model/Store/StoreReader.php` 
- `src/Pyz/Zed/DataImport/Business/Model/Store/StoreWriterStep.php` 


### Adjust DataImportBusinessFactory` class.

Remove mthod `createStoreImporter` and in method `getDataImporterByType` remove the following code with case `DataImportConfig::IMPORT_TYPE_STORE`. 

```
src/Pyz/Zed/DataImport/Business/DataImportBusinessFactory.php
```

```php

    case DataImportConfig::IMPORT_TYPE_STORE:
        return $this->createStoreImporter($dataImportConfigurationActionTransfer);
```


### Adjust `ProductStockBulkPdoDataSetWriter::persistAvailability()` method.


```
src/Pyz/Zed/DataImport/Business/Model/ProductStock/Writer/ProductStockBulkPdoDataSetWriter.php
```

Replace following code:

```php

    /**
     * @return void
     */
    protected function persistAvailability(): void
    {
        $skus = $this->dataFormatter->getCollectionDataByKey(static::$stockProductCollection, static::COLUMN_CONCRETE_SKU);
        $storeTransfer = $this->storeFacade->getCurrentStore();

        $concreteSkusToAbstractMap = $this->mapConcreteSkuToAbstractSku($skus);
        $reservations = $this->getReservationsBySkus($skus);

        $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservations);

        $sharedStores = $storeTransfer->getStoresWithSharedPersistence();
        foreach ($sharedStores as $storeName) {
            $storeTransfer = $this->storeFacade->getStoreByName($storeName);
            $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservations);
        }

        $this->updateBundleAvailability();
    }
```
to code:

```php

    /**
     * @return void
     */
    protected function persistAvailability(): void
    {
        $skus = $this->dataFormatter->getCollectionDataByKey(static::$stockProductCollection, static::COLUMN_CONCRETE_SKU);

        $concreteSkusToAbstractMap = $this->mapConcreteSkuToAbstractSku($skus);
        $reservations = $this->getReservationsBySkus($skus);

        foreach ($this->storeFacade->getStoresAvailableForCurrentPersistence() as $storeTransfer) {
            $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservations);
        }

        $this->updateBundleAvailability();
    }
```

### Adjust `ProductStockBulkPdoMariaDbDataSetWriter::persistAvailability()` method.

You need to replace the following code:

```
src/Pyz/Zed/DataImport/Business/Model/ProductStock/Writer/ProductStockBulkPdoMariaDbDataSetWriter.php
```

```php

    /**
     * @return void
     */
    protected function persistAvailability(): void
    {
        $skus = $this->dataFormatter->getCollectionDataByKey(static::$stockProductCollection, static::COLUMN_CONCRETE_SKU);
        $storeTransfer = $this->storeFacade->getCurrentStore();

        $concreteSkusToAbstractMap = $this->mapConcreteSkuToAbstractSku($skus);
        $reservationItems = $this->getReservationsBySkus($skus);

        $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservationItems);

        $sharedStores = $storeTransfer->getStoresWithSharedPersistence();
        foreach ($sharedStores as $storeName) {
            $storeTransfer = $this->storeFacade->getStoreByName($storeName);
            $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservationItems);
        }

        $this->updateBundleAvailability();
    }

```

Replace method `persistAvailability` with the following code:

```php
    /**
     * @return void
     */
    protected function persistAvailability(): void
    {
        $skus = $this->dataFormatter->getCollectionDataByKey(static::$stockProductCollection, static::COLUMN_CONCRETE_SKU);

        $concreteSkusToAbstractMap = $this->mapConcreteSkuToAbstractSku($skus);
        $reservationItems = $this->getReservationsBySkus($skus);

        foreach ($this->storeFacade->getStoresAvailableForCurrentPersistence() as $storeTransfer) {
            $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservationItems);
        }

        $this->updateBundleAvailability();
    }

```

### Adjust `ProductStockPropelDataSetWriter::updateAvailability()` and `ProductStockPropelDataSetWriter::getStoreIds()` methods.

Replace the following code:


```
src/Pyz/Zed/DataImport/Business/Model/ProductStock/Writer/ProductStockPropelDataSetWriter.php
```

```php
    /**
     * @return array<int>
     */
    protected function getStoreIds(): array
    {
        $storeTransfer = $this->storeFacade->getCurrentStore();
        $storeIds = [$storeTransfer->getIdStoreOrFail()];

        foreach ($storeTransfer->getStoresWithSharedPersistence() as $storeName) {
            $storeTransfer = $this->storeFacade->getStoreByName($storeName);
            $storeIds[] = $storeTransfer->getIdStoreOrFail();
        }

        return $storeIds;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function updateAvailability(DataSetInterface $dataSet): void
    {
        $storeTransfer = $this->storeFacade->getCurrentStore();

        $this->updateAvailabilityForStore($dataSet, $storeTransfer);

        foreach ($storeTransfer->getStoresWithSharedPersistence() as $storeName) {
            $storeTransfer = $this->storeFacade->getStoreByName($storeName);
            $this->updateAvailabilityForStore($dataSet, $storeTransfer);
        }
    }

```

replace with the following code: 

```php
    /**
     * @return array<int>
     */
    protected function getStoreIds(): array
    {
        $storeIds = [];

        foreach ($this->storeFacade->getStoresAvailableForCurrentPersistence() as $storeTransfer) {
            $storeIds[] = $storeTransfer->getIdStoreOrFail();
        }

        return $storeIds;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function updateAvailability(DataSetInterface $dataSet): void
    {
        foreach ($this->storeFacade->getStoresAvailableForCurrentPersistence() as $storeTransfer) {
            $this->updateAvailabilityForStore($dataSet, $storeTransfer);
        }
    }
```

### Adjust DataImportConfig class.

Replace method `getDefaultYamlConfigPath()` with the following code:

```php
    /**
     * @return string|null
     */
    public function getDefaultYamlConfigPath(): ?string
    {
        $regionDir = defined('APPLICATION_REGION') ? APPLICATION_REGION : 'EU';

        return APPLICATION_ROOT_DIR . DIRECTORY_SEPARATOR . 'data/import/local/full_' . $regionDir . '.yml';
    }
```

### Add new plugins to `DataImportDependencyProvider`.

```
src/Pyz/Zed/DataImport/DataImportDependencyProvider.php
```
```php
namespace Pyz\Zed\DataImport;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\StoreDataImport\Communication\Plugin\DataImport\StoreDataImportPlugin;
use Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport\DefaultLocaleStoreDataImportPlugin;
use Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport\LocaleStoreDataImportPlugin;
use Spryker\Zed\CountryDataImport\Communication\Plugin\DataImport\CountryStoreDataImportPlugin;
use Spryker\Zed\CurrencyDataImport\Communication\Plugin\DataImport\CurrencyStoreDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new StoreDataImportPlugin(),
            new CountryStoreDataImportPlugin(),
            new CurrencyStoreDataImportPlugin(),
            new LocaleStoreDataImportPlugin(),
            new DefaultLocaleStoreDataImportPlugin(),
        ];     
    }
}
```

### Adjust ConsoleDependencyProvider.

```
src/Pyz/Zed/Console/ConsoleDependencyProvider.php
```

```php
<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\StoreDataImport\StoreDataImportConfig;
use Spryker\Zed\Locale\Communication\Plugin\Application\ConsoleLocaleApplicationPlugin;
use Spryker\Zed\LocaleDataImport\LocaleDataImportConfig;
use Spryker\Zed\CountryDataImport\CountryDataImportConfig;
use Spryker\Zed\CurrencyDataImport\CurrencyDataImportConfig;

/**
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 * @method \Pyz\Zed\Console\ConsoleConfig getConfig()
 */
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @var string
     */
    protected const COMMAND_SEPARATOR = ':';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . CountryDataImportConfig::IMPORT_TYPE_COUNTRY_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . CurrencyDataImportConfig::IMPORT_TYPE_CURRENCY_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . LocaleDataImportConfig::IMPORT_TYPE_LOCALE_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . LocaleDataImportConfig::IMPORT_TYPE_DEFAULT_LOCALE_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . StoreDataImportConfig::IMPORT_TYPE_STORE),            
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    public function getApplicationPlugins(Container $container): array
    {
        $applicationPlugins = parent::getApplicationPlugins($container);

        $applicationPlugins[] = new ConsoleLocaleApplicationPlugin();

        return $applicationPlugins;
    }

}
```


### Preparing csv files for configure stores, locales, currencies, countries via data import 

Below you can find examples of csv files for configure stores, locales, currencies, countries via data import, but also you can find them in the `data/import/common` folder of public repository [spryker-shop/suite](https://github.com/spryker-shop/suite).

Example for DE store locales configurations: 
`data/import/common/DE/locale_store.csv`

```
locale_name,store_name
en_US,DE
de_DE,DE
```

Example for DE store default locale:
`data/import/common/DE/default_locale_store.csv`

```
locale_name,store_name
en_US,DE
```

Example for DE store currency-store configurations:
`data/import/common/DE/currency_store.csv`

```csv
currency_code,store_name,is_default
EUR,DE,1
CHF,DE,0
```

Example for DE store coutry-store configurations:
`data/import/common/DE/country_store.csv`

```
store_name,country
DE,DE
DE,FR
```

Use data import command for import configuration


```bash 
vendor/bin/console data:import:locale-store 
vendor/bin/console data:import:default-locale-store
vendor/bin/console data:import:currency-store   
vendor/bin/console data:import:country-store
```

### Add translations

Add new translation files for widget labls.

**1. Append glossary according to your configuration:**

By default, the glossary is located in the following directory:

```
data/import/common/common/glossary.csv
```

CSV file example:

```csv
store_widget.switcher.store,Store:,en_US
store_widget.switcher.store,Shop:,de_DE
```

**2. Add the glossary keys use command:**

```bash
console data:import:glossary
```

**3. Generate new translation cache:**

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the spy_glossary table in the database.

{% endinfo_block %}


## Deploy file changes and enable dynamic store feature 

Due to a change in the ideology of the region instead store configuration, you need to change the deploy file to enable the dynamic store feature.

1.  To use the new region configuration, create a new deployment file, such as `deploy.dynamic-store.yml` (or `deploy.dev.dynamic-store.yml` for development environment).

For example development deoploy file for EU region:

```
deploy.dev.dynamic-store.yml
```

```yml
version: '0.1'

namespace: spryker-dynamic-store
tag: 'dev'

environment: docker.dev
image:
    # ...
    environment:
        # ...
        SPRYKER_DYNAMIC_STORE_MODE: true # Enable dynamic store feature 
    node:
        version: 16
        npm: 8

regions:
    EU:
        # Services for EU region. Use one of the following services: mail, database, broker, key_value_store, search for all stores in EU region.
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
    # ...

groups:
    EU:
        region: EU
        applications:
            merchant_portal_eu:
                application: merchant-portal
                endpoints:
                    mp.eu.spryker.local: # Changed Merchant portal endpoint for EU region. Use new domain name for EU region.
                        region: EU
                        entry-point: MerchantPortal
                        primal: true
                        services:
                            session:
                                namespace: 7
            # Changed Yves endpoint for EU region. Use new domain name for all stores in EU region.
            yves_eu: 
                application: yves
                endpoints:
                    yves.eu.spryker.local:
                        region: EU # Use region instead store name for all stores in EU region
                        services:
                            session:
                                namespace: 1
            # Same for Glue endpoints
            glue_eu: 
                application: glue
                endpoints:
                    glue.eu.spryker.local:
                        region: EU
            glue_storefront_eu:
                application: glue-storefront
                endpoints:
                    glue-storefront.eu.spryker.local:
                        region: EU
            glue_backend_eu:
                application: glue-backend
                endpoints:
                    glue-backend.eu.spryker.local:
                        region: EU
            backoffice_eu:
                application: backoffice
                endpoints:
                    backoffice.eu.spryker.local:
                        region: EU
                        primal: true
                        services:
                            session:
                                namespace: 3
            backend_gateway_eu:
                application: backend-gateway
                endpoints:
                    backend-gateway.eu.spryker.local:
                        region: EU
                        primal: true
            backend_api_eu:
                application: zed
                endpoints:
                    backend-api.eu.spryker.local:
                        region: EU
                        entry-point: BackendApi

    US:
        # ...
 
# ...
docker:
    # ...
    testing:
        region: EU # Use EU region for testing insted store. 

```

New configuration for deploy file use region instead store name for services, endpoints, applications, etc.
Evnironment variable `SPRYKER_DYNAMIC_STORE_MODE` enable dynamic store feature, by default it is disabled.
Also you need to change domain name for all endpoints in EU region.
Please, check `deploy.dev.dynamic-store.yml` file for more details.


## Delete store in database

How to delete store you can find by link [How To: Delete store when using the dynamic store feature](docs/scos/dev/tutorials-and-howtos/howtos/howto-store-delete.html)


## Note: Codeception tests suite configuration changes

For correct work tests with dynamic store feature, you need to add the following helper `ContainerHelper` and `StoreDependencyHelper` to the codeception.yml files:


```yml
suites:
    GroupName:
        actor: GroupNameTester
        modules:
            enabled:
                - Asserts
                .
                .
                .
                - \SprykerTest\Service\Container\Helper\ContainerHelper
                - \SprykerTest\Shared\Store\Helper\StoreDependencyHelper

```