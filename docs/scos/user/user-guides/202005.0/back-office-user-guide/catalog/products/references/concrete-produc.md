---
title: Concrete Product- Reference Information
originalLink: https://documentation.spryker.com/v5/docs/concrete-product-reference-information
redirect_from:
  - /v5/docs/concrete-product-reference-information
  - /v5/docs/en/concrete-product-reference-information
---

This topic describes the reference information for working with concrete and abstract products.
{% info_block warningBox "Note" %}
The set of tabs for Create and Edit pages, as well as for abstract and concrete products, is different. Hence the additional columns with identifiers are added for your convenience.
{% endinfo_block %}
**General tab**
| Attribute |Description | Create Concrete Product|Update Concrete Product|
| --- | --- | --- | --- | 
|**Store relation**  | Defines the store for which the product can be available.</br>You can select multiple values. | **No**|**No**|
| **SKU Prefix** | A number that you assign to the product will help to track unique information related to that product. | **Yes**|**Display Only**|
| **Autogenerate SKU** | Allows the system to autogenerate the SKU once you click **Save**. | **Yes**|**No**|
| **Super Attributes** | This section is only available if you have added more than one super attribute and defined more than one value for it.</br>E.g. if you selected the **color** to be a super attribute and defined **green**, **white**, and **black**, you will see "**color**" in this section and a drop-down with the colors you defined.</br>Only one value can be selected. |**Yes**|**No**|
| **Name** | The name of your product that will be displayed in the online store for your customers. | | **Yes**|**Yes** |
| **Description** | The description of the product that your customer sees in the online store. | **Yes** |**Yes** |
| **Searchable** | A checkbox that defines if the concrete product can be searched via the Search function in the online store. If not selected, no values will be displayed when searching for this product. | **Yes** | **Yes**|
| **Valid from**</br>**Valid to**  | Defines the period of time when the product is in active state. The **Valid from** date triggers the activation, while the **Valid to** date triggers the deactivation. Either no dates can be selected, or both. |**Yes** |**Yes** |


**Price & Stock tab**
| Attribute |Description | Create Concrete Product|Update Concrete Product|
| --- | --- | --- | --- |
|**Use prices from abstract product**|Once the checkbox is selected, the prices from the abstract product are taken over.|**Yes**|**No**|
|**Merchant Price Dimension**|**B2B Only**</br>The drop-down list that allows you to select a merchant relation and set up a specific price for a specific merchant.</br>If the Default value is selected, the prices will be the same for everyone.</br>The values available for selection derive from **Merchants > Merchant Relations**.</br>Only one value can be selected.|**Yes**|**Yes**|
| **Gross price**</br>**Net price** | The price value for gross and net mode.</br>For concrete products, the prices are inherited from their abstract product and can be updated vile editing the concrete product.|**Yes**  |**Yes**  | 
|**Default**</br>**Original**|Default prices are the prices your customers will pay, whereas original prices are the "previous prices" in case you want to display promotions. If you specify only a default price, it will be displayed just like a normal product price. However, if both prices are specified, the original one will appear crossed out in the shop.|**Yes**|**Yes**|
|**Add Product Volume Price**</br>**Edit Product Volume Price**|Once selected, the **Add volume price** (**Edit volume price**) page opens. This option allows you to define specific prices for a specific quantity of products that a customer selects. Works only in case of Default prices.</br>**Add Product Volume Price** appears only when the price for a currency was set up and saved.</br>**Edit Product Volume Price** appears only what the volume price was already set up for a currency.|**No**|**Yes**|
|(Stock) **Type**|Display-only field that displays warehouses according to your store|**Yes**|**Yes**|
|(Stock) **Quantity**|The number of items available in the warehouse.|**Yes**|**Yes**|
|(Stock) **Never out of stock**|The check-box that once selected will make the product always available to be purchased.|**Yes**|**Yes**|


**Image tab**
| Attribute |Description | Create Concrete Product | Update Concrete Product |
| --- | --- | --- | --- |
|**Image Set Name**|The name of your image set.|**Yes**|**Yes**|
|**Small**|The link of the image that is going to be used in the product catalogs.|**Yes**|**Yes**|
|**Large**|The link to the image that is going to be used on the product details page.|**Yes**|**Yes**|
|**Sort Order**|If you add several images to an active image set, specify the order in which they are to be shown in the front end and back end using Sort Order fields. The order of images is defined by the order of entered numbers where the image set with sort order "0" is the first to be shown.|**Yes**|**Yes**|


**Assign bundled products tab**
On this tab, you see a table with the concrete products that you can select to be included in a bundle of a specific variant. If you do need to create a bundle, do not select the values and skip the tab.


**Discontinue tab**
Available on the Edit page only.
Once you select to discontinue the product, you can add a note about that on this tab.


**Product Alternatives tab**
The only field available is **Add Product Alternative by Name or SKU**. Here it is enough to enter three characters of a product name or SKU to see the autosuggested product list. From one to many values can be selected. If there is no need to set up an alternative product, you can skip this tab. 


**Scheduled Prices tab**
On this tab, you see a table with the scheduled prices imported via a CSV file. The following information is available:
* Currency, store, net, and gross price values
* Start from (included) and Finish at (included) values that identify a period of time when a specific price is going to be set for a product automatically.
