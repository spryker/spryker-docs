---
title: Creating Content Items
originalLink: https://documentation.spryker.com/v3/docs/creating-content-items
redirect_from:
  - /v3/docs/creating-content-items
  - /v3/docs/en/creating-content-items
---

This topic provides a list of steps to create a content item in the Back Office.
***
To start working with the Content Items, navigate to the **Content Management** section and select **Content Items**.
***
## Creating a Content Item
On the **Overview of Content Items** page, you can create the **Banner**, **Abstract Product List**, **Product Set**, or **File List** content items.

To create a content item:

1. On the **Content Items** page, click **Add Content Item** in the top right corner of the page and select a content item you want to create:
    * Banner 
    * Abstract Product List 
    * Product Set
    * File List

{% info_block infoBox %}
See [Content Items Types: Module Relations](/docs/scos/dev/features/201907.0/cms/content-items/content-items-t
{% endinfo_block %} to learn more about types of content items.)

2. Follow the steps described below to create a specific content item type.

{% info_block infoBox %}
Keep in mind that the **Default** locale **must** be populated. If you populate only Default locale, other locales will automatically inherit its information. However, to create a different content item per specific locale(s
{% endinfo_block %}, populate the other locale(s) as well.)

### Content Item: Banner
To create a Banner content item:

1. From the **Add Content Item** drop-down menu, select **Banner**. 
2. On the **Create Content Item: Banner** page that opens, enter **Name** and **Description** of the Banner content item. Both fields are mandatory to specify. See [Content Items: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/content-items/references/content-items-r) to learn more about content item attributes. 
3. Amend the following **mandatory** fields per locale:
    * Title
    * Subtitle
    * Image URL
    * Click URL
    * Alt-text

![Banner content item](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Items/Creating+Content+Items/banner-content-item-page.png){height="" width=""}

4. Click **Save** to keep the changes. This will take you to the list of content items where you can see a new **Banner** content item in the table and the following message: '_Content item has been successfully created_'.
***
**Tips & Tricks**
On the **Create Content Item: Banner** page, you can:

* Clear all the fields in the _current_ locale by clicking **Clear locale**.

Clicking **Back to Content Items** in the top right corner of the page can trigger different actions:

* Selecting this option **prior to saving** the changes will discard all the changes and then take you to the **List of Content Items** page.
</br>
* Selecting this option **after** the changes have been saved will redirect you to the **List of Content Items** page.

***
### Content Item: Abstract Product List
To create an Abstract Product List content item:

1. From the **Add Content Item** drop-down menu, select **Abstract Product List**.
2. On the **Create Content Item: Abstract Product List** page that opens, enter **Name** and **Description** of the Abstract Product List content item. Both fields are mandatory to specify. See [Content Items: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/content-items/references/content-items-r) to learn more about content item attributes. 
3. In the _Add more products_ bottom table, select the products by clicking **+Add to list** in the _Selected_ column per locale. This will add the selected products to the top table.  

{% info_block infoBox %}
Using options in the _Actions_ column of the top table, you can:<ul><li>Change the order of products in the list by clicking **Move Down** or **Move Up**.</li><li>Remove the product(s
{% endinfo_block %} from the list. To do this, click **Delete** for a respective product.</li></ul>)

![Abstract product list content item](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Items/Creating+Content+Items/apl-create-page.png){height="" width=""}

4. To keep the changes, click **Save**. This will take you to the list of content items where you can see a new **Abstract Product List** content item in the table and the following message: '_Content item has been successfully created_'.
***
**Tips & Tricks**
On the **Create Content Item: Abstract Product List** page, you can:

* Filter search results by typing an abstract product list name, its ID, or SKU in the **Search** field.
* Clear all the fields in the _current_ locale by clicking **Clear locale**.

Clicking **Back to Content Items** in the top right corner of the page can trigger different actions:

* Selecting this option **prior to saving** the changes will discard all the changes and then take you to the **List of Content Items** page.
</br>
* Selecting this option **after** the changes have been saved will redirect you to the **List of Content Items** page.
***

### Content Item: Product Set
To create a Product Set content item:

1. From the **Add Content Item** drop-down menu, select **Product Set**. 
2. On the **Create Content Item: Product Set** page that opens, enter **Name** and **Description** of the Product Set content item. Both fields are mandatory to specify. See [Content Items: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/content-items/references/content-items-r) to learn more about content item attributes. 
3. In the _Available Product Sets_ bottom table, select only **one** product set by clicking **+Add** in the _Actions_ column per locale. This will add the selected product set to the top table. 

![Product set content item](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Items/Creating+Content+Items/product-set-create-page.png){height="" width=""}

4. To keep the changes, click **Save**. The **Overview of Content Items** page opens containing a new **Product Set** content item in the table.
***
**Tips & Tricks**
On the **Create Content Item: Product Set** page, you can:

* Filter search results by entering a product set name in the **Search** field.
* Remove the selected product set by clicking **Delete** or **Clear locale** per _current_ locale.

Clicking **Back to Content Items** in the top right corner of the page can trigger different actions:

* Selecting this option **prior to saving** the changes will discard all the changes and then take you to the **List of Content Items** page.
</br>
* Selecting this option **after** the changes have been saved will redirect you to the **List of Content Items** page.

***
### Content Item: File List
To create a File content item:

1. From the **Add Content Item** drop-down menu, select **File List**.
2. On the **Create Content Item: File List** page, enter **Name** and **Description** of the File List content item. Both fields are mandatory to specify. See [Content Items: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/content-items/references/content-items-r) to learn more about content item attributes. 
3. In the _Available Files_ bottom table, click **Add to list** next to the file you want to add per locale. This will add the file(s) to the _Selected Files_ top table. 

{% info_block infoBox %}
In the top table, you can re-order files by clicking **Move Up** and **Move Down** or remove the selected ones by clicking **Delete**.
{% endinfo_block %}
![File list content item](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Items/Creating+Content+Items/file-list-create.png){height="" width=""}

4. Click **Save**. This will successfully save the changes and take you to the list of content items where you can see a new **File List** content item in the table and the following message: '_Content item has been successfully created_'.

#### Tips & Tricks
On the **Create Content Item: File List** page, you can:

* Filter search results by entering a file name in the **Search** field.
* Clear all the fields in the current locale by clicking **Clear locale**.

Clicking **Back to Content Items** in the top right corner of the page can trigger different actions:

* Selecting this option **prior to saving** the changes will discard all the changes and then take you to the **List of Content Items** page.
</br>
* Selecting this option **after** the changes have been saved will redirect you to the **List of Content Items** page.

***
**What's next?**
The content item is created. Now, you can add it to a block or a page using a content item widget and selecting its template. Additionally, you can edit any of the content item elements if needed.

* To learn more about how to add content item widgets to a block or a page, see [Adding Content Item Widgets to Pages and Blocks](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/content-items/content-item-widgets/adding-content-).
* To know more about how to edit a content item, see [Editing Content Items](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/content-items/editing-content).
