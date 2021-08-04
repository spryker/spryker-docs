---
title: Multi-Language Setup
originalLink: https://documentation.spryker.com/v4/docs/multi-language-setup
redirect_from:
  - /v4/docs/multi-language-setup
  - /v4/docs/en/multi-language-setup
---

## Multi-Language Setup

All textual elements can be created in various languages to support content creation for multiple language setups, for example, for your international stores.

* Customers can switch locales in the shop
* Locales can be shared among stores

The Glossary module has the responsibility to manage glossary keys that hold the localized content in the database.

For each entry in the glossary, keys table there is a corresponding entry in the `Touch` table. The `Touch` table has a time stamp that marks the last update that was made on that glossary keys that needs to be updated also in the front end key-value storage.

The glossary keys are kept in sync on the key-value storage by using a cron job that periodically runs the update storage collector command. The storage collector grabs the glossary key entries that were marked for update in the `Touch` table after the last storage update command was run.

## Set up Stores with Multiple Locales

This section describes the steps that you need to consider when you have to set up stores with multiple locales.

### Configure Locales for Store
The stores configuration can be found in the `config/Shared/stores.php` file.

For each store you can define a set of locales and the first locale is the default one.

```php
<?php
 'locales' => [
        // first entry is default
        'en' => 'en_US',
        'de' => 'de_DE',
    ]
```

{% info_block infoBox %}
In the example above, the `en` key is associated with the `en_US` locale.
{% endinfo_block %}

### URL Routing for Stores with Multiple Locales
In Yves, the key for the selected locale is contained in the URL. If URL does not contain any key, the default locale is considered as the current one.

In Demoshop, for listing the current content of the cart, the following URLs are routed to the same controller and action:

| URL | Locale |
| --- | --- |
| http://www.de.demoshop.local/cart | en_US |
| http://www.de.demoshop.local/de/cart | de_DE |
| http://www.de.demoshop.local/en/cart | en_US |

#### Routing the URLs
For URL routing, when defining the controllers in your controller provider, you must include the allowed locales for the application.

The allowed locales pattern can be retrieved using the `getAllowedLocalesPattern` from the base class of the controller provider (`AbstractYvesControllerProvider`).

```php
<?php
$allowedLocalesPattern = $this->getAllowedLocalesPattern();

$this->createGetController('/{cart}', static::ROUTE_CART, 'Cart', 'Cart')
     ->assert('cart', $allowedLocalesPattern . 'cart|cart')
     ->value('cart', 'cart');
```

### Products with Localized Attributes
The details of the abstract products are stored localized in the `spy_product_abstract_localized_attributes` table. For each abstract product, there is an entry in this table that corresponds to each locale, containing the associated attributes for the defined locale.

Similar, the details of the concrete products are kept localized in the `spy_product_localized_attributes` table.

The localized attributes are loaded in the key-value data storage by the Collectors, so that the details can be rendered in Yves according to the selected locale.

The following details are stored localized in the Demoshop, for both abstract and concrete products:

* Name
* Short description
* Long description

#### Importing Products with Localized Attributes

When importing product data in your application you need to consider the list of locales that are defined for the store.

The CSV file containing the product data that needs to be imported must contain the name of the product for each locale:

* `name.en_US, name.de_DE`

The CSV file that contains the attributes for the products that need to be imported must contain the short and long description for each locale :

* `short_description.en_US, short_description.de_DE`
* `long_description.en_US, long_description.de_DE`

### Categories with Localized Attributes
The details of the categories are kept in the `spy_category_attribute`. For each category defined in the `spy_category` table there is an entry for each defined locale containing the details of the category localized.

The attributes are loaded in the key-value data storage by the Collectors, so that the details can be rendered in Yves according to the selected locale.

The following category details are stored localized:

* `meta_title`
* `meta_description`
* `category_image_name`

#### Importing Categories with Localized Attributes
The product categories are imported through the Importer module.

Similar to importing product data, you need to consider each locale defined in the application when importing the attributes for the categories.

The CSV file containing the product data that needs to be imported must contain the name of the product for each locale:

* `category_name.en_US, category_name.de_DE`
* `low_pic.en_US, low_pic.de_DE`
* `category_description.en_US, category_description.de_DE`

### Importing CMS Blocks and Pages

The CMS blocks and pages are able to render localized content through the use of placeholders. The placeholders have a glossary key associated. At runtime, the placeholder is replaced with the glossary value that corresponds to the current locale. Also, a static page will have a distinct URL for each locale defined in the application.

{% info_block infoBox %}
For more details on CMS, see [Defining Maximum Size of Content Fields](/docs/scos/dev/tutorials/202001.0/howtos/content-fields-
{% endinfo_block %}.)

The CMS blocks and pages are imported through XML files. The structure of the XML file is very simple: it contains a list of blocks, each block has a template associated, a name and a list of placeholders for each locale.

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

The XML file structure for loading static pages is similar to the one for importing blocks; the only differences are that a page has also a URL associated for each locale and it doesn’t have a name linked to it.

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

For each category there is a distinct URL for each configured locale. Similar for product details pages. These URLs are automatically created and stored in the DB when importing products and categories through the `Importer` module.

{% info_block infoBox %}
For example, `/en/computers` and `/de/computers` are the URL’s for the same category but for different locales.
{% endinfo_block %}

The URLs assigned for each imported CMS static page are distinct for each defined locale.

* `/en/privacy and /de/datenschutz` point to the same template; when rendered, they’ll be loaded with the glossary values that correspond to the associated locale.

The XML file structure for loading static pages is similar to the one for importing blocks; the only differences are that a page has also a URL associated for each locale and it doesn’t have a name linked to it.

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
