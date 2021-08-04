---
title: Managing Categories
originalLink: https://documentation.spryker.com/v1/docs/managing-categories
redirect_from:
  - /v1/docs/managing-categories
  - /v1/docs/en/managing-categories
---

This topic describes how to manage categories:
* How to define an order according to which the products are going to be displayed.
* How to view, edit, and delete categories.
***
## Ordering Products in Categories
You can adjust the order in which products under the category are displayed in the store.
To define the order of displaying products, you need to set the numbers under which each product will be displayed on the page.
{% info_block infoBox "Example" %}
For example, you have ten products assigned to your category. For five of them, there is a seasonal discount applied. So you need those to be at the top of the list.
{% endinfo_block %}
***
**To change the order of products:**
1. Click **Assign Products** in the **Categories** table for a specific category.
2. Scroll down to the **Products in this category** section.
3. In the _Order_ column, set numbers 1-5 for specific products. 
    {% info_block warningBox "Note" %}
In case you have several products with the identical order number value, the ordering will be performed based on the _product name_ attribute.
{% endinfo_block %}
    {% info_block infoBox "Information" %}
The product with 0 in the _Order_ column will be displayed at the bottom.
{% endinfo_block %}
5. Once the order you have set is correct, click **Save**. 
***
## Viewing Categories
Before updating a category, you can view it to make sure that this is the needed category. 
***
**To view a category:**
1. In the _Actions_ column on the **Category** table view page, click **View**. 
2. You are redirected to the page where you see some general information about this category, like:
    * is the category active
    * is it visible in the category tree
    * what products does it contain 
    * in case if the category template is set to any CMS-related one, you will also have a chance to navigate directly to the **Edit CMS block** page by clicking the hyperlinked **CMS block name** in the **CMS Blocks** section.
3. To return back to the Category page, click **List of categories** in the top right corner.
***
## Editing Categories
There are two ways to navigate to the Edit Category page:
* While viewing a specific category, click **Edit** in the top right corner of the **View category** page.
* Click **Edit** in the _Actions_ column on the **Categories** table view page.

There is no difference between how you will initiate the flow. In any event, you will be redirected to the same page.
***
**To edit a category:**
1. Click **Edit**.
2. Update the needed values. See [Category: Reference Information](/docs/scos/dev/user-guides/201811.0/back-office-user-guide/category/references/category-refere).
3. Click **Save**.
***
## Deleting Categories
What if the category needs to be deleted? 
If at some point of time you need to delete a category, you will use the **Category** page.
***
**To delete a category:**
1. For the category you need to delete, click **Delete** in the _Actions_ column. 
2. On the **Delete category** page, you will be provided with detailed information about everything that will be de-assigned, moved, or deleted along with that category. 
3. Select the checkbox next to **Yes, I am sure** to confirm your awareness and click **Delete**.
{% info_block warningBox "Note" %}
Products assigned to this category will not be deleted. They will be de-assigned and continue to exist in the system. If the same products are assigned to other categories, they will stay assigned to those.
{% endinfo_block %}
***
**Tips & Tricks**
If your category contains any nested categories, you can re-sort them by a simple drag-and-drop action:
1. To get to **Re-sort View**, click **Re-sort child categories** for a specific category on the table view page.
2. Once in **Re-sort View**, play around by dragging & dropping categories. 
3. Once you see the correct order, click **Save**.
