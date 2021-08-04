---
title: Category- Reference Information
originalLink: https://documentation.spryker.com/v3/docs/category-reference-information
redirect_from:
  - /v3/docs/category-reference-information
  - /v3/docs/en/category-reference-information
---

This topic contains the reference information that you need to know when working in the **Category** section.
***
## Categories Page
In the **Category** section, you see the following:
* Category key, category name, and the parent category to which a specific one is assigned
* Identifiers for Active, Visible and Searchable
* Template type 
* Actions that you can do on a specific category
***
## Category Page Template Types
When you create or update the categories, you select a template according to which your category (and the assigned to it products) is going to be displayed in your online store. 

The following templates are used to set up your category look:

* **Catalog (default)**
    Select this template if you want to display all product pages linked to the selected category. The product pages include the general product description, a price, an image, and a clickable **View** button that will redirect you to the product details page.
  See how the **Catalog** template looks on Yves.
![Catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category%3A+Reference+Information/Catalog.gif){height="" width=""}

* **Catalog+CMS Block**
    Select this template if you want to show all product pages assigned to the selected category and a CMS Block. Depending on your design requirements, you need to set a specific CMS block and to specify where it should be displayed: top, middle, or bottom. See Content Management topics for more information.
    
    See how the **Catalog+CMS Block** template looks on Yves.
![Catalog + CMS block](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category%3A+Reference+Information/Catalog%2BCms+Block.gif){height="" width=""}

    The category is in the catalog, and two CMS blocks are now displayed on the page: _Tackle Your To-Do's_ and _Build a Space That Spurs Creativity_ in the example).
    
* **CMS Block**
    Select this template if you want to display only a specific CMS block on the category page. In this case, choose a position of the CMS block on the page. 
    See how the **CMS Block** template looks on Yves.
   
![CMS block](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category%3A+Reference+Information/CMS+Block.gif){height="" width=""}

Instead of navigating you to the catalog view, once such a category is selected you see the CMS block.
    
* **Sub Category grid**
    Select if you want to create a multilevel category structure. Here you can assign an image to each subcategory. 
    See how the **Sub Category grid** template looks on Yves.
  
![Sub category grid](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category%3A+Reference+Information/sub+category.gif){height="" width=""}

***
## Create and Edit Category Page Attributes
The following table describes the attributes you use when creating or updating a category.

### General tab
| Attribute |Description|
| --- | --- |
|**Category key**|The value you enter can later be used to automatically assign products and CMS blocks to your category through the import.  |
|**Active**|Defines if the category is in the active state and is visible in the shop application.|
| **Visible in the category tree** |Defines if the category is shown in the menu in the shop application. |
| **Allow to search for this category** |Defines if the category is available in search results. |
|  **Parent**|A drop-down list with categories under which your category will be displayed in the hierarchical tree. It means that the category you are currently creating will be nested under the particular category you select. Only one value can be selected. |
| **Additional Parents**| A drop-down list with categories under which you can locate your specific category in addition to the Parent.  Several values can be selected.|
|**Template**|A drop-down list with templates that you select to define the look of your category in the online store. (See _Category Page Template Types_)|
|**Translations**| In this section you define the meta details. Their purpose is to improve search ranking in the search engines.|
|**Translations: Name**|The name that serves as an ID for the back end.</br>The name that will be displayed to the customer on the shop website is rendered with the help of the category key.|
|**Translations: Meta Title**|The title that describes the category.|
|**Translations: Meta Description**|The description of the category. The text you enter as meta information will not be displayed on the website to the customer but will be located in the HTML code of the category page. |
|**Translations: Meta Keywords**|The keywords that are suitable for the category.|
If you select the CMS-related template (either Catalog+CMS Block, or CMS block), the following additional attributes appear: 

| Attribute |  Description|
| --- | --- |
| **CMS Blocks: top** | Defines a CMS Block for a top position. Several values can be selected.|
| **CMS Blocks: middle** | Defines a CMS Block for a middle position. Several values can be selected. |
|**CMS Blocks: bottom** | Defines a CMS Block for a bottom position. Several values can be selected. |

### Image tab

| Attribute | Description |
| --- | --- |
|  **Image Set Name**|Defines the name of the image set, e.g. Default.  |
|**Small**  | URL of the small version of the image. |
|  **Large**| URL of the large version of the image. |
|**Sort Order**|A numeric identifier of the image in the order of other images of an image set. This defines the order in which the images are shown in the back end and front end. The order starts from "0".|
