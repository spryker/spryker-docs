---
title: "HowTo: Set up stores with multiple locales"
description: Use the guide to configure different locales for your store.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-setup-stores-with-multiple-locales
originalArticleId: 500c225f-7bdc-4284-888a-34e45540831b
redirect_from:
  - /2021080/docs/ht-setup-stores-with-multiple-locales
  - /2021080/docs/en/ht-setup-stores-with-multiple-locales
  - /docs/ht-setup-stores-with-multiple-locales
  - /docs/en/ht-setup-stores-with-multiple-locales
  - /v6/docs/ht-setup-stores-with-multiple-locales
  - /v6/docs/en/ht-setup-stores-with-multiple-locales
  - /v5/docs/ht-setup-stores-with-multiple-locales
  - /v5/docs/en/ht-setup-stores-with-multiple-locales
  - /v4/docs/ht-setup-stores-with-multiple-locales
  - /v4/docs/en/ht-setup-stores-with-multiple-locales
  - /v3/docs/ht-setup-stores-with-multiple-locales
  - /v3/docs/en/ht-setup-stores-with-multiple-locales
  - /v2/docs/ht-setup-stores-with-multiple-locales
  - /v2/docs/en/ht-setup-stores-with-multiple-locales
  - /v1/docs/ht-setup-stores-with-multiple-locales
  - /v1/docs/en/ht-setup-stores-with-multiple-locales
---

{% info_block warningBox %}

Dynamic Multistore is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %} 

This document describes the steps to consider when setting up stores with multiple locales.

## Configure locales for store

{% info_block warningBox %}

When using the Dynamic Multi-Store functionality, configuration via the `stores.php` file is no longer supported. Please refer to the [Integration Guide](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-dynamic-multiple-stores.html) for additional information.

{% endinfo_block %}

You can find the stores' configuration in the `config/Shared/stores.php` file.

You can define a set of locales for each store. The first locale is the default one.

```php
<?php
'locales' => 				
[
// first entry is default
	'en' => 'en_US',
	'de' => 'de_DE',
]
```

In the example above, the `en` key is associated with the `en_US` locale.

## Route URLs for stores with multiple locales

In Yves, the key for the selected locale is contained in the URL; if no key is contained in the URL, the default locale is considered the current one.

In Demoshop, for listing the current content of the cart, the following URLs are routed to the same controller and action:

| URL	| LOCALE |
| --- | --- |
| https://mysprykershop.com/cart | en_US |
| https://mysprykershop.com/de/cart | de_DE|
| https://mysprykershop.com/en/cart | en_US|

You can define a list of available locales in the `\Pyz\Yves\Router\RouterConfig::getAllowedLanguages()` method.

```php
<?php
class RouterConfig extends SprykerRouterConfig
{
    /**
     * @return array<string>
     */
    public function getAllowedLanguages(): array
    {
        return [
            'de',
            'en',
        ];
    }
}
```

## Products with localized attributes

The details of the abstract products are stored localized in the `spy_product_abstract_localized_attributes` table. For each abstract product, there is an entry in this table that corresponds to each locale, containing the associated attributes for the defined locale.

Similarly, the details of the concrete products are kept localized in the `spy_product_localized_attributes` table.

The localized attributes are loaded in the key-value data storage by the Collectors so that the details can be rendered in Yves according to the selected locale.

The following details are stored localized in the Demoshop for both abstract and concrete products:

* Name
* Short description
* Long description

### Import products with localized attributes

When importing product data in your application, consider the list of locales that are defined for the store.

The CSV file containing the product data that needs to be imported must contain the name of the product for each locale: `name.en_US`, `name.de_DE`

The CSV file that contains the attributes for the products to be imported must contain the short and long description for each locale:

* `short_description.en_US`, `short_description.de_DE`
* `long_description.en_US`, `long_description.de_DE`

## Categories with localized attributes

The details of the categories are kept in the `spy_category_attribute`. For each category defined in the `spy_category` table, there is an entry for each defined locale containing the details of the category localized.

The attributes are loaded in the key-value data storage by the Collectors so that the details can be rendered in Yves according to the selected locale.

The following category details are stored localized:

* `meta_title`
* `meta_description`
* `category_image_name`

### Import categories with localized attributes

The product categories are imported through the Importer.

Similar to importing product data, consider each locale defined in the application when importing the attributes for the categories.

The CSV file containing the product data that needs to be imported must contain the name of the product for each locale:

* `category_name.en_US`, `category_name.de_DE`
* `low_pic.en_US`, `low_pic.de_DE`
* `category_description.en_US`, `category_description.de_DE`

## Import CMS blocks and pages

The CMS blocks and pages can render localized content through the use of placeholders. The placeholders have a glossary key associated; at runtime, the placeholder is replaced with the glossary value that corresponds to the current locale. Also, a static page has a distinct URL for each locale defined in the application.

The CMS blocks and pages are imported through XML files. The structure of the XML file is very simple: it contains a list of blocks, and each block has a template associated, a name, and a list of placeholders for each locale.

**Example**

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

The XML file structure for loading static pages is similar to the one for importing blocks; the only differences are that a page also has a URL associated for each locale, and it doesn’t have a name linked to it.

**Code sample**

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

### Localized URLs

The `spy_url` table stores the URLs that correspond to the following:

* Category pages
* Product details pages
* Static pages defined in CMS

For each category, there is a distinct URL for each configured locale. Similar works for product details pages. These URLs are automatically created and stored in the database when importing products and categories through the Importer.

{% info_block infoBox "Info" %}

`/en/computers` and `/de/computers` are the URLs for the same category but for different locales.

{% endinfo_block %}

The URLs assigned for each imported CMS static page are distinct for each defined locale.

{% info_block infoBox "Info" %}

`/en/privacy` and `/de/datenschutz` point to the same template; when rendered, they are loaded with the glossary values that correspond to the associated locale.

{% endinfo_block %}
