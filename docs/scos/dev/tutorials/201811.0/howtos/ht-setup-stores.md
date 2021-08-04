---
title: HowTo - Set up Stores with Multiple Locales
originalLink: https://documentation.spryker.com/v1/docs/ht-setup-stores-with-multiple-locales
redirect_from:
  - /v1/docs/ht-setup-stores-with-multiple-locales
  - /v1/docs/en/ht-setup-stores-with-multiple-locales
---

{% info_block infoBox "Multiple Locales" %}
This article describes the steps you need to consider when you have to set up stores with multiple locales.
{% endinfo_block %}

## Configure Locales for Store
		
The stores configuration can be found in the `config/Shared/stores.php` file. 

For each store you can define a set of locales; the first locale is the default one.

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

## URL Routing for Stores with Multiple Locales
		
In Yves, the key for the selected locale is contained in the URL; if no key is contained in the URL, the default locale is considered as the current one.

In Demoshop, for listing the current content of the cart, the following URLs are routed to the same controller and action:

| URL	| Locale |
| --- | --- |
| http://www.de.demoshop.local/cart | en_US |
| http://www.de.demoshop.local/de/cart |  de_DE|
|http://www.de.demoshop.local/en/cart  |  en_US|

## Products with Localized Attributes
		
The details of the abstract products are stored localized in the `spy_product_abstract_localized_attributes` table. For each abstract product, there is an entry in this table that corresponds to each locale, containing the associated attributes for the defined locale.
		
Similar, the details of the concrete products are kept localized in the `spy_product_localized_attributes` table.

The localized attributes are loaded in the key-value data storage by the Collectors, so that the details can be rendered in Yves according to the selected locale.

The following details are stored localized in the Demoshop, for both abstract and concrete products:

* name
* short description
* long description

### Importing products with localized attributes
When importing product data in your application, you need to consider the list of locales that are defined for the store.

The CSV file containing the product data that needs to be imported must contain the name of the product for each locale:

`name.en_US`, `name.de_DE`
			
The CSV file that contains the attributes for the products to be imported must contain the short and long description for each locale:
		
* `short_description.en_US`, `short_description.de_DE`
* `long_description.en_US`, `long_description.de_DE`

## Categories with Localized Attributes
		
The details of the categories are kept in the `spy_category_attribute`. For each category defined in the `spy_category` table, there is an entry for each defined locale containing the details of the category localized.
		
The attributes are loaded in the key-value data storage by the Collectors, so that the details can be rendered in Yves according to the selected locale.

The following category details are stored localized:

* `meta_title`
* `meta_description`
* `category_image_name`

### Importing categories with localized attributes
		
The product categories are imported through the Importer.

Similar to importing product data, you need to consider each locale defined in the application when importing the attributes for the categories.

The CSV file containing the product data that needs to be imported must contain the name of the product for each locale:

* `category_name.en_US`, `category_name.de_DE`
* `low_pic.en_US`, `low_pic.de_DE`
* `category_description.en_US`, `category_description.de_DE`

## Importing CMS Blocks and Pages
		
The CMS blocks and pages are able to render localized content through the use of placeholders. The placeholders have a glossary key associated; at runtime, the placeholder is replaced with the glossary value that corresponds to the current locale. Also, a static page will have a distinct URL for each locale defined in the application.

The CMS blocks and pages are imported through XML files. The structure of the XML file is very simple: it contains a list of blocks, each block has a template associated, a name and a list of placeholders for each locale.

<details open>
<summary>Example:</summary>
    
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

</br>
</details>

The XML file structure for loading static pages is similar to the one for importing blocks; the only differences are that a page has also a URL associated for each locale and it doesn’t have a name linked to it.

<details open>
<summary>Code sample:</summary>
    
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
   
</br>
</details>

### Localized URLs
The `spy_url` table stores the URLs that correspond to:

* category pages
* product details pages
* static pages defined in CMS
			
For each category there is a distinct URL for each configured locale. Similar for product details pages. These URLs are automatically created and stored in the database when importing products and categories through the `Importer`.

{% info_block infoBox "Info" %}
`/en/computers` and `/de/computers` are the URL’s for the same category but for different locales.
{% endinfo_block %}

The URLs assigned for each imported CMS static page are distinct for each defined locale.

{% info_block infoBox "Info" %}
`/en/privacy` and `/de/datenschutz` point to the same template; when rendered, they’ll be loaded with the glossary values that correspond to the associated locale.
{% endinfo_block %}
