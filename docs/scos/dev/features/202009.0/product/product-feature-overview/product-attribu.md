---
title: Product attribute overview
originalLink: https://documentation.spryker.com/v6/docs/product-attribute-overview
redirect_from:
  - /v6/docs/product-attribute-overview
  - /v6/docs/en/product-attribute-overview
---

A *product attribute* is a characteristic of a product that consists of a name and value. For example, in the attribute `color = white`, `color` is the attribute name, and `white` is the attribute value.

You can create characteristic attributes for products, like brand or special features. You can define specific values to help you and your customers distinguish between products. You can assign multiple attributes to products to simplify the filter and category functions. 


A Back Office user can [create product attributes](https://documentation.spryker.com/docs/creating-a-product-attribute).

A developer can import [product attributes](https://documentation.spryker.com/docs/file-details-product-management-attributecsv) and [super attributes](https://documentation.spryker.com/docs/file-details-product-attribute-keycsv). 


## Product attribute inheritance 

A Back Office user can add product attributes to abstract and concrete products. If they add a product attribute to an abstract product, it is added to all its concrete products. If they add it to a concrete product, it's not added to the other concrete products. 


## Declared attributes
A declared attribute is an attribute that was [created](https://documentation.spryker.com/docs/creating-a-product-attribute) or [imported](https://documentation.spryker.com/docs/file-details-product-management-attributecsv).

After declaring an attribute, Back Office users can add it to products, and developers can import products with it. 

{% info_block warningBox "Undeclared attributes" %}

If a developer imports products with undeclared attributes, Back Office users cannot manage them. We recommend declaring all the attributes you are going to use. 

{% endinfo_block %}

## Super attributes
The Spryker Commerce OS product data model allows creating multiple variants of a product. For a shop to distinguish different product variants, some of their characteristics should be differerent. A product attribute that distinguishes one product variant from another is a *super attribute*. 

For a product variant to be selectable on the Storefront, a value of one of its product attributes should be unique compared to the product attribute values of other variants of the same abstract product. 

When creating a product attribute, a Back Office user selectes if it is a super attribute. 

Product variants of the same abstract product can differ by different super attributes. Check the following super attribute examples:

1. Abstract product X has concrete products A and B: 
    * A: `color = blue` 
    * B: `color = green`

2. Abstract product Y has concrete products C and D: 
    * C:  `color = red`
    * D:  `size = 45`
    







## Predefined product attribute values
A *predefined product attribute value* is a product attribute value that a Back Office user defines when managing product attributes. 

A Back Office user can configure configure a product attribute to accept only predefined values. In this case, when [defining the attribute value during product management](https://documentation.spryker.com/docs/managing-products#managing-product-attributes), they choose from the predefined values. Otherwise, they can enter any value for the attribute. 

## Product attribute translations
A Back Office user can localize product attributes. They can add translations for attribute names and values. For example, in the attribute `Color = White`, both `Color` and `White` can be localized. 

There are different ways to handle translations of attributes. See the examples below.

### Example 1: localized attributes and non-localized values

In a shop with German and English languages, product Y has the `weight` attribute name with the `63.5 g` value. We want to translate only the attribute name.

We localize the key as follows:
* en_EN: `Weight`
* de_DE: `Gewicht`

The attribute value `63.5 g` is not localized.

As a result, the following is displayed on the Storefront:
* English version of the shop: Weight = 63.5 g 
* German version of the shop: Gewicht = 63.5 g  

### Example 2: localized attributes and values
  In a shop with two languages Product X exists with an attribute `Protection Feature` and an attribute value `waterproof`. 
  
We localize them as follows:
* Attribute key:
    * en_EN: `Protection Feature`
    * de_DE: `Schutzfunktion` 
* Attribute value:
    * en_EN: `Waterproof` 
    * de_DE: `Wasserdicht` 

As a result, the following is displayed on the Storefront:
* English version of the shop: Protection Feature = Waterproof 
* German version of the shop: Schutzfunktion = Wasserdicht  

### Example 3: different localized attributes and values for different languages

Product Z has the `length` attribute and is sold in 3 countries: Germany, Ireland, and the US. Since the US does not use the metric system, in the US, we want to display the attribute values in feet. In Germany and Ireland, we want to display the values in meteres.

There are two ways to handle this:
* Add a non-localized attribute key for Germany and Ireland, and a localized key for the US. Two languages can share the same translation for the attribute, like in the [Example 1](#example-1-localized-attributes-and-non-localized-values).
* Add localized attribute keys and values for each language. 

#### Non-localized key and localized key for the US
In the DB, the `attribute.length` key is saved for non-localized values, and a localized key `attribute.length.us` is saved for the translations in the metric system: 

We localize two attribute keys:
* Key = attribute.length 
    * Value (en_IE) = Length 
    * Value (de_DE) = Länge 
* Key = attribute.length.us 
    * Value (en_US) = Length 



For the key `attribute.length` the value is `1.5 meter`. For the key `attribute.length.us` the value is `4.92 feet`.

#### Localized keys for US, DE and IE 

In the DB, the following localized keys are saved: `attribute.length.de`, `attribute.length.ie`, and `attribute.length.us`.


* Key = attribute.length.de 
* Value (de_DE) = Länge 

* Key = attribute.length.ie 
* Value (en_IE) = Length 

* Key = attribute.length.us 
* Value (en_US) = Length 

Now for each of the attribute keys we add the attribute values. 

For the key “attribute.length.de” the value is `1.5 meter`.

For the key “attribute.length.ie” the value is: 
Value = 1.5 meter 

For the key “attribute.length.us” the value is: 
Value = 4.92 feet 

What you see on the Irish and German versions of the shop: 
Length = 1.5 meter 
Länge = 1.5 meter 

What you see on the US version of the shop: 
Length = 4.92 feet  



## Database schema for product attributes

![Product attribute management](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Attributes/product_attribute_management.png)



## Current Constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future.

* When adding a product variant to an existing abstract product, you can only use the existing super attributes.

* To add another super attribute to variants, you need to recreate the abstract product with its concrete products from scratch.

* If you import a product without defining its attributes, you cannot edit the attributes in the Back Office.

{% info_block warningBox %}
We recommend defining all the atributes you want to use.
{% endinfo_block %}

