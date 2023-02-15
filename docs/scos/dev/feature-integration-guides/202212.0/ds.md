---
title: Dynamic store installation and configuration
description: Learn how to integrate the Dynamic Store feature into your project
last_updated: Feb 1, 2023
template: feature-integration-guide-template
---

Short plan 


1. Які мінімальні пакети spryker/feature потрібні 

2. Установка пакетів 
    1. Список мінімальних версій пакетів 
    2. Установка 
    3. Виправленян можливих проблем 
    4. Верифікація пакетів 

3. Міграція бази даних 
    4.1 Міграція таблиць 
    4.2 Веріфікація 

4. Обновелння трансферів 
    5.1 Обновлення трансферів
    5.2 Перевірка трансферів 

5. Додавання перекладів 
http://localhost:4000/docs/scos/dev/feature-integration-guides/202212.0/merchant-feature-integration.html#add-zed-translations

6. Підгтовка даних для імпорту даних налаштуваннь  на базі файла store.php 

Написати що потрібно зробити іморт країн локалей а також інші дані на базі даних в налаштуваннях в конфігруації 
Щось схоже як тут 
http://localhost:4000/docs/scos/dev/feature-integration-guides/202212.0/merchant-feature-integration.html#import-merchants-data

    - Дані в csv 
    - Таблиця з описом полів 
    - Приклади
    - Встановлення датаімпортів 

7.  Set up behavior (встановлення плагінів)


8. Використання env змінної 
умвімкнути магазин







{% include pbc/all/install-features/{{page.version}}/install-the-dynamic-store.md %} <!-- To edit, see /_includes/pbc/all/install-features/202212.0/install-the-dynamic-store.md -->


## Helpers


{% info_block warningBox "Title" %}

Text

{% endinfo_block %}


{% info_block infoBox "Title" %}

Text

{% endinfo_block %}

{% info_block errorBox "Title" %}

Text

{% endinfo_block %}


Links 

https://docs.spryker.com/docs/pbc/all/shopping-list-and-wishlist/202212.0/install-and-upgrade/install-the-wishlist-alternative-products-feature.html#prerequisites

https://docs.spryker.com/docs/pbc/all/shopping-list-and-wishlist/202212.0/install-and-upgrade/integrate-the-wishlist-glue-api.html#install-the-required-modules-using-composer

https://docs.spryker.com/docs/pbc/all/identity-access-management/202212.0/install-and-upgrade/install-the-customer-account-management-glue-api.html#prerequisites


https://docs.spryker.com/docs/scos/dev/feature-integration-guides/202212.0/glue-api/glue-api-installation-and-configuration.html#installing-glue



### Some else 


Follow the steps below to install Dynamic store feature.


## Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{site.version}} | [Glue API: Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/glue-api/glue-api-spryker-core-feature-integration.html) |


## Install  the required modules using Composer

Minimum version for packages 

| Packege  | Min version |
| spryker/spryker | 0.0.1 | 


1. Підготуйте дані для налаштувань міграції 

2. Run the following command(s) to install the required modules:

```bash
composer require spryker/module-name:"^1.1.0" --update-with-dependencies
composer require spryker/cart-codes-rest-api:"^1.0.0" --update-with-dependencies
composer require spryker/discount-promotions-rest-api:"^1.1.0" --update-with-dependencies
```


{% info_block warningBox "Verification" %}

Make sure that the new modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductLabelsRestApi | vendor/spryker/product-labels-rest-api |
| CartCodesRestApi | vendor/spryker/cart-codes-rest-api |
| DiscountPromotionsRestApi | vendor/spryker/discount-promotions-rest-api |

{% endinfo_block %}

If you can’t install the required version, run the following command to see what else you need to update:


```bash

composer why-not spryker/module-name:1.0.0
```

3. Set up database schema and transfer objects

Run the following commands to generate transfer changes:

```bash
console propel:install
console transfer:generate
```

4. Set up database schema and transfer objects

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_locale_storage | column | added |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in the transfers:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestProductLabelsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestDiscountsAttributesTransfer |


{% endinfo_block %}



*** 


Notes: 

Migration guide


Example: 

https://docs.spryker.com/docs/pbc/all/product-information-management/202212.0/install-and-upgrade/upgrade-modules/upgrade-the-categorypagesearch-module.html
https://docs.spryker.com/docs/pbc/all/product-information-management/202212.0/install-and-upgrade/upgrade-modules/upgrade-the-categorystorage-module.html

Country
Currency
Locale


Integration guide 

Example:
https://docs.spryker.com/docs/scos/dev/technical-enhancement-integration-guides/integrating-separate-endpoint-bootstraps.html#update-module s-using-composer
https://docs.spryker.com/docs/scos/dev/technical-enhancement-integration-guides/integrate-multi-database-logic.html#define-databases

https://docs.spryker.com/docs/scos/dev/technical-enhancement-integration-guides/integrating-symfony-5.html#integration

Like this 
https://docs.spryker.com/docs/pbc/all/discount-management/202212.0/install-and-upgrade/integrate-the-promotions-and-discounts-glue-api.html



Data Migration
Propel install ? Generate transfer? 




Dynamic store guide e.g what happens to stores.php

Integration guide ?

Examples: 
https://docs.spryker.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html#multi-store-setup-infrastructure-options
https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/add-and-remove-databases-of-stores.html#prerequisites



Another 

https://spryker.atlassian.net/wiki/spaces/CORE/pages/2838528001/Dynamic+store+POC+overview