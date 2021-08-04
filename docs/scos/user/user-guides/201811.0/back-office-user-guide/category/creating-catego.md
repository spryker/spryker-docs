---
title: Creating Categories
originalLink: https://documentation.spryker.com/v1/docs/creating-categories
redirect_from:
  - /v1/docs/creating-categories
  - /v1/docs/en/creating-categories
---

This topic describes how you create categories.
***
For example, you have several new products in your store. You want to group them into one logical chunk so that:
* You can have all new products under one category 
* The buyer can see them all at once by navigating to that category

Instead of assigning those to already existing categories, you can collect the products under a new category called, for example, **Newcomers**. 
To do that, click **Create category** in the top right corner.
    
The Create page is split into two tabs: **General** and **Image**:
* The **General** tab is used to provide all the descriptive information.
* The **Image** tab is used to provide visual support (mostly used with the **Sub Category grid** template.)
***
**To create a product category:**
1. In the **General** tab, enter and select the attributes for your category. See [Category: Reference Information](/docs/scos/dev/user-guides/201811.0/back-office-user-guide/category/references/category-refere).
2. Enter the attributes of your image set. See [Category: Reference Information](/docs/scos/dev/user-guides/201811.0/back-office-user-guide/category/references/category-refere).
{% info_block infoBox %}
Small images will be used when subcategories on the parent category page are displayed as a list, while the large images will be used when subcategories are displayed as a grid.
{% endinfo_block %}

{% info_block infoBox %}
Even though you can add several image sets and several images to an image set, out of the box, there is no place in the back end and front end where several image sets or images can be displayed for a category. However, if you still do that, the following logic applies:
{% endinfo_block %}
*     When adding several image sets, the image set going first or having the name 'default' will be applied to the category. 
*     When adding several images to the image set that is active for the category, the image with the lowest Sort Order field value is applied to the category. If there are several images with the same value, the image which has been added first is applied. The lowest possible value is "0".

3. Click **Next** at the bottom of the page, or select the **Image** tab next to **General**.
4. In the **Image** tab, add an image to the category:
    1. Click **Add image set**.
    2. Enter the attributes of your image set. See [Category: Reference Information](/docs/scos/dev/user-guides/201811.0/back-office-user-guide/category/references/category-refere).  
    {% info_block infoBox %}
Keep in mind that small images will be used when subcategories on the parent category page are displayed as a list, while the large images will be used when subcategories are displayed as a grid.
{% endinfo_block %}
    3. If you want to assign several images or image sets, click **Add image** or **Add image set** respectively, and enter URLs. 
    Even though you can add several image sets and several images to an image set, out of the box, there is no place in the back end and front end where several image sets or images can be displayed for a category. However, if you still do that, the following logic applies:
        * When adding several image sets, the image set going first or having the name 'default' will be applied to the category. 
        * When adding several images to the image set that is active for the category, the image with the lowest Sort Order field value is applied to the category. If there are several images with the same value, the image which has been added first is applied. The lowest possible value is "0".
4. Click **Save**. 
* * *
**Tips & Tricks**
* When you already know the exact parent category under which the category that you create is going to be nested, you can click **Add category to this node** for a specific parent category. This will redirect you to the **Create category** page where you can perform the steps described above. The only difference is that the **Parent** field will be autopopulated with the needed value. 
* The same products can be assigned to multiple categories.
