---
title: Multi-language setup
description: This document exmplains multi-language setup details
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/multi-language-setup
originalArticleId: cf160490-ae8e-45c1-80a6-bcd667498ae0
redirect_from:
  - /2021080/docs/multi-language-setup
  - /2021080/docs/en/multi-language-setup
  - /docs/multi-language-setup
  - /docs/en/multi-language-setup
  - /v6/docs/multi-language-setup
  - /v6/docs/en/multi-language-setup
  - /v5/docs/multi-language-setup
  - /v5/docs/en/multi-language-setup
  - /v4/docs/multi-language-setup
  - /v4/docs/en/multi-language-setup
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html
---

All textual elements can be created in various languages to support content creation for multiple language setups—for example, for your international stores.
* Customers can switch locales in the shop.
* Locales can be shared among stores.

The `Glossary` module is responsible for managing glossary keys that hold the localized content in the database.

For each entry in glossary keys, there is a corresponding entry in the `Touch` table. The `Touch` table has a time stamp that marks the last update made on the glossary keys that needs to be also updated in the frontend key-value storage.

The glossary keys are kept in sync on the key-value storage by using a cron job that periodically runs the update storage collector command. The storage collector grabs the glossary key entries that were marked for an update in the `Touch` table after the last storage update command was run.

## Set up stores with multiple locales

This section describes the steps that you need to consider when you have to set up stores with multiple locales.

### Configure locales for store

The stores' configuration can be found in the `config/Shared/stores.php` file.

For each store, you can define a set of locales, and the first locale is the default one.

```php
<?php
 'locales' => [
        // first entry is default
        'en' => 'en_US',
        'de' => 'de_DE',
    ]
```

{% info_block infoBox %}

In the previous example, the `en` key is associated with the `en_US` locale.

{% endinfo_block %}

### URL routing for stores with multiple locales

In Yves, the key for the selected locale is contained in the URL. If URL does not contain any key, the default locale is considered the current one.

In Demoshop, for listing the current content of the cart, the following URLs are routed to the same controller and action:

| URL | LOCALE |
| --- | --- |
| `https://mysprykershop.com/cart` | en_US |
| `https://mysprykershop.com/de/cart` | de_DE |
| `https://mysprykershop.com/en/cart` | en_US |

#### Routing the URLs

For URL routing, when defining the controllers in your controller provider, you must include the allowed locales for the application.

The allowed locales pattern can be retrieved using `getAllowedLocalesPattern` from the base class of the controller provider—`AbstractYvesControllerProvider`.

```php
<?php
$allowedLocalesPattern = $this->getAllowedLocalesPattern();

$this->createGetController('/{cart}', static::ROUTE_CART, 'Cart', 'Cart')
     ->assert('cart', $allowedLocalesPattern . 'cart|cart')
     ->value('cart', 'cart');
```

### Products with localized attributes

The details of the abstract products are stored localized in the `spy_product_abstract_localized_attributes` table. Each abstract product has an entry in this table that corresponds to each locale, containing the associated attributes for the defined locale.

Similarly, the details of the concrete products are kept localized in the `spy_product_localized_attributes` table.

The localized attributes are loaded in the key-value data storage by the Collectors so that the details can be rendered in Yves according to the selected locale.

The following details are stored localized in Demoshop for both abstract and concrete products:

* Name
* Short description
* Long description

#### Importing products with localized attributes

When importing product data in your application. you need to consider the list of locales that are defined for the store.

The CSV file containing the product data that needs to be imported must contain the name of the product for each locale:

* `name.en_US, name.de_DE`

The CSV file that contains the attributes for the products that need to be imported must contain a short and long description for each locale:

* `short_description.en_US, short_description.de_DE`
* `long_description.en_US, long_description.de_DE`

### Categories with localized attributes

The details of the categories are kept in `spy_category_attribute`. For each category defined in the `spy_category` table, there is an entry for each defined locale containing the details of the category localized.

The attributes are loaded in the key-value data storage by the Collectors so that the details can be rendered in Yves according to the selected locale.

The following category details are stored localized:

* `meta_title`
* `meta_description`
* `category_image_name`

#### Importing categories with localized attributes

The product categories are imported through the `Importer` module.

Similar to importing product data, you need to consider each locale defined in the application when importing the attributes for the categories.

A CSV file containing the product data that needs to be imported must contain the name of the product for each locale:

* `category_name.en_US, category_name.de_DE`
* `low_pic.en_US, low_pic.de_DE`
* `category_description.en_US, category_description.de_DE`

### Importing CMS blocks and pages

The CMS blocks and pages can render localized content through the use of placeholders. The placeholders have a glossary key associated. At runtime, the placeholder is replaced with the glossary value that corresponds to the current locale. Also, a static page has a distinct URL for each locale defined in the application.

{% info_block infoBox %}

For more details on CMS, see [Defining the maximum size of content fields](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/define-the-maximum-size-of-content-fields.html).

{% endinfo_block %}

The CMS blocks and pages are imported through XML files. The structure of the XML file is straightforward. It contains a list of blocks; each block has a template associated, a name, and a list of placeholders for each locale.

Example:

```xml
<?xml version="1.0"?>
<blocks>
 <block>
        <template>data_privacy</template>
        <blockName>data_privacy_block</blockName>
        <locales>
            <de_DE>
                <placeholders>
                    <placeholder>
                        <name>privacy_policy</name>
                        <translation>Datenschutzerklärung</translation>
                    </placeholder>
                </placeholders>
            </de_DE>
            <en_US>
                <placeholders>
                    <placeholder>
                        <name>privacy_policy</name>
                        <translation>Data Privacy Policy</translation>
                    </placeholder>
                </placeholders>
            </en_US>
        </locales>
    </block>
</blocks>
```

The XML file structure for loading static pages is similar to the one for importing blocks; the only differences are that a page also has an associated URL for each locale and doesn't have a name linked to it.

```xml
<?xml version="1.0"?>
<pages>
<page>
   <template>data_privacy</template>
        <locales>
            <de_DE>
              <url>/de/datenschutz</url>
                <placeholders>
                    <placeholder>
                        <name>privacy_policy</name>
                        <translation>Datenschutzerklärung</translation>
                    </placeholder>
                </placeholders>
            </de_DE>
            <en_US>
              <url>/en/privacy</url>
                <placeholders>
                    <placeholder>
                        <name>privacy_policy</name>
                        <translation>Data Privacy Policy</translation>
                    </placeholder>
                </placeholders>
            </en_US>
        </locales>
</page>
</pages>
```

**Localized URLs**

The `spy_url` table stores the URLs that correspond to:

* Category pages
* Product details pages
* Static pages defined in CMS

Each category has a distinct URL for each configured locale and product details page. These URLs are automatically created and stored in the DB when importing products and categories through the `Importer` module.

{% info_block infoBox %}

For example, `/en/computers` and `/de/computers` are the URLs for the same category but different locales.

{% endinfo_block %}

The URLs assigned for each imported CMS static page are distinct for each defined locale.

* `/en/privacy` and `/de/datenschutz` point to the same template; when rendered, they are loaded with the glossary values that correspond to the associated locale.

The XML file structure for loading static pages is similar to the one for importing blocks; the only differences are that a page has also an associated URL for each locale, and it doesn't have a name linked to it.

```xml
<?xml version="1.0"?>
<pages>
<page>
   <template>data_privacy</template>
        <locales>
            <de_DE>
              <url>/de/datenschutz</url>
                <placeholders>
                    <placeholder>
                        <name>privacy_policy</name>
                        <translation>Datenschutzerklärung</translation>
                    </placeholder>
                </placeholders>
            </de_DE>
            <en_US>
              <url>/en/privacy</url>
                <placeholders>
                    <placeholder>
                        <name>privacy_policy</name>
                        <translation>Data Privacy Policy</translation>
                    </placeholder>
                </placeholders>
            </en_US>
        </locales>
</page>
</pages>
```
