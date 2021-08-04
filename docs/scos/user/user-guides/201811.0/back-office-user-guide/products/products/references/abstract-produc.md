---
title: Abstract Product- Reference Information
originalLink: https://documentation.spryker.com/v1/docs/abstract-product-reference-information
redirect_from:
  - /v1/docs/abstract-product-reference-information
  - /v1/docs/en/abstract-product-reference-information
---

The following tables describe the attributes that you use when creating and editing concrete and abstract products.
{% info_block warningBox "Note" %}
The set of tabs for Create and Edit pages, as well as for abstract and concrete products, is different. Hence the additional columns with identifiers are added for your convenience.
{% endinfo_block %}
**General tab**
| Attribute |Description | Create Abstract Product | Update Abstract Product |
| --- | --- | --- | --- |
|**Store relation**  | Defines the store for which the product can be available.</br>You can select multiple values. | **Yes** | **Yes** |
| **SKU Prefix** | A number that you assign to the product will help to track unique information related to that product. | **Yes** | **Display Only** |
| **Name** | The name of your product that will be displayed in the online store for your customers. | **Yes** |**Yes**  |
| **Description** | The description of the product that your customer sees in the online store. | **Yes** | **Yes** |
| **New from**</br>**New to**  | Defines the period of time for which a dynamic label **New** will be assigned to the product. Either no dates can be selected, or both. | **Yes** | **Yes** |

---
**Price & Stock tab**
| Attribute |Description | Create Abstract Product | Update Abstract Product |
| --- | --- | --- | --- |
|**Merchant Price Dimension**|**B2B Only**</br>The drop-down list that allows selecting a merchant relation and set up a specific price for a specific merchant.</br>If the Default value is selected, the prices will be the same for everyone.</br>The values available for selection derive from **Merchants > Merchant Relations**.</br>Only one value can be selected.|**Yes**|**Yes**|
| **Gross price**</br>**Net price** | The price value for gross and net mode.</br>The price you populate will be inherited by all product variants you add during abstract product creation.| **Yes** | **Yes** |
|**Default**</br>**Original**|Default prices are prices your customers will pay, whereas original prices are the "previous price" in case you want to display promotions. If you specify only a default price, it will be displayed just like a normal product price. However, if both prices are specified, the original one will appear crossed out in the shop.|**Yes**|**Yes**|
|**Add Product Volume Price**</br>**Edit Product Volume Price**|Once selected, the **Add volume price** (**Edit volume price**) page opens. This option allows you to define specific prices for a specific quantity of products that a customer selects. It works only in case of Default prices.</br>**Add Product Volume Price** appears only when the price for a currency was set up and saved.</br>**Edit Product Volume Price** appears only what the volume price was already set up for a currency.|**No**|**Yes**|
|**Tax Set**|The conditions under which a product is going to be taxed.</br>The values available for selection derive from **Taxes > Tax Sets**</br>Only one value can be selected.|**Yes**|**Yes**|

---
**Variants tab**
{% info_block warningBox "Note" %}
No values are available for selection when you create a product bundle. When you create a bundle, one product variant will be added by default.
{% endinfo_block %}
* **While creating** an abstract product, you will see a list of super attributes that derive from **Products > Attributes**. You can select as many super attributes as you need and define from one to many values for them (those values will define the difference between the product variants). Please keep in mind that moving forward, you will be able to create product variants only based on the selected super attributes. As well as you need to add at least one super attribute and define at least one value for it in order to be able to add more product variants in the future.
* **While editing the abstract product/product bundle**, you will see a table that displays the product variants that exist for this abstract product. From this page, you can View, Edit, and Manage Attributes for the product variant.
---
**SEO tab**
| Attribute |Description | Create Abstract Product | Update Abstract Product |
| --- | --- | --- | --- |
|**Title**|The meta title for your product.|**Yes**|**Yes**|
|**Keywords**|The meta keywords for your product.|**Yes**|**Yes**|
|**Description**|Meta description for your product.|**Yes**|**Yes**|

---
**Image tab**
| Attribute |Description | Create Abstract Product | Update Abstract Product |
| --- | --- | --- | --- |
|**Image Set Name**|The name of your image set.|**Yes**|**Yes**|
|**Small**|The link of the image that is going to be used in the product catalogs.|**Yes**|**Yes**|
|**Large**|The link to the image that is going to be used on the product details page.|**Yes**|**Yes**|
|**Sort Order**|If you add several images to an active image set, specify the order in which they are to be shown in the front end and back end using Sort Order fields. The order of images is defined by the order of entered numbers where the image set with sort order "0" is the first to be shown.|**Yes**|**Yes**|

---
**Scheduled Prices tab**
On this tab, you see a table with the scheduled prices imported via a CSV file. The following information is available:
* Currency, store, net, and gross price values
* Start from (included) and Finish at (included) values that identify a period of time when a specific price is going to be set for a product automatically.
