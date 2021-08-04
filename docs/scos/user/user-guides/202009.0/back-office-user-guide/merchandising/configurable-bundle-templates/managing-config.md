---
title: Managing configurable bundle templates
originalLink: https://documentation.spryker.com/v6/docs/managing-configurable-bundle-templates
redirect_from:
  - /v6/docs/managing-configurable-bundle-templates
  - /v6/docs/en/managing-configurable-bundle-templates
---

This article describes how to manage configurable bundle templates.

To start working with configurable bundle templates, go to **Merchandising** > **Configurable Bundle Templates**.

---
## Editing configurable bundle templates
To edit a configurable bundle template:

1. Select **Edit** next to the configurable bundle template you want to edit.
2. On the *Edit Configurable Bundle Template: {template ID}* page:
    - Change the **Name** for one or more locales.
    - [Create a slot](#creating-slots-in-configurable-bundle-templates).
    - [Edit a slot](#editing-slots-in-configurable-bundle-templates).
    - [Delete a slot](#deleting-slots-from-configurable-bundle-templates)

3. Select **Save**.
The page refreshes with the success message displayed.



### Creating slots in configurable bundle templates
To create a slot in a configurable bundle template:

1. On the *Edit Configurable Bundle Template: {template ID}* page, select **+ Add Slot** in the top right corner.
2. On the *Create Slot for {template name}* page, enter a **Name** for each available locale.
3. Select **Save**.
The *Edit Slot: {ID of the created slot} for {template name}* page opens with the success message displayed.

### Editing slots in configurable bundle templates
To edit a slot in a configurable bundle template:

1. On the *Edit Configurable Bundle Template: {template ID}* page, switch to the **Slots** tab.
2. Select **Edit** next to the slot you want to edit.
3. On the *Edit Slot: {slot ID} for {template name}* page:
    * In the **General** tab, update the slot **Name** for one or more locales.
    * [Assign categories to the slot](assigning-categories-to-slots-in-configurable-bundle-templates).
    * [Deassign categories from the slot](deassigning-categories-from-slots-in-configurable-bundle-templates).
    * [Assign products to the slot](assigning-products-to-slots-in-configurable-bundle-templates).
    * [Deassign products from the slot](deassigning-products-from-slots-in-configurable-bundle-templates).
4. Select **Save**.
The page refreshes with the success message displayed.

#### Assigning categories to slots in configurable bundle templates

To assign categories to a slot in a configurable bundle template:
1. On the *Edit Slot: {slot ID} for {template name}* page, switch to the **Assign Categories** tab.
2. In the **Categories** field, start typing the name of a category to see matching results. Select the desired category.
3. Repeat the previous step until you assign all the desired categories.
4. Select **Save**
The page refreshes with the success message displayed.

#### Deassigning categories from slots in configurable bundle templates

To deassign categories from a slot in a configurable bundle template:
1. On the *Edit Slot: {slot ID} for {template name}* page, switch to the **Assign Categories** tab.
2. In the **Categories** field, select **X** next to the categories you want to deassign.
3. Select **Save**.
The page refreshes with the success message displayed.


#### Assigning products to slots in configurable bundle templates
To assign products to slot in a configurable bundle template:

1. On the *Edit Slot: {slot ID} for {template name}* page, switch to the **Assign Products** tab.
2. Assign one or more products as follows:
    * Under *Import Product List*, select **Choose File**. 
    * Select a CSV file with the product list.
        The file should contain `product_list_key` and `concrete_sku` fields.

    * In the **Select Products to assign** table, select one or more products.
6. Select **Save**.
The page refreshes with the success message displayed.

**Tips & Tricks**
* To double-check the list of products that are to be assigned, switch to the **Products to be assigned** tab.

#### Deassigning products from slots in configurable bundle templates

To deassign a product from a slot in a configurable bundle template:

1. On the *Edit Slot: {slot ID} for {template name}* page, switch to the **Assign Products** tab.
2. In the **Products in this list** table, select one or more products.
3. Select **Save**.
The page refreshes with the success message displayed.

**Tips & Tricks**
* To double-check the list of products that are to be deassigned, switch to the **Products to be deassigned** tab.


### Deleting slots from configurable bundle templates
To delete a slot from a configurable bundle template:

1. On the *Edit Configurable Bundle Template: {template ID}* page, switch to the **Slots** tab.
2. Select **Delete** next to the slot you want to delete.
The page refreshes with the success message displayed.

## Activating and deactivating configurable bundle templates

To activate a configurable bundle template, select **Activate** next to it.

To deactivate a configurable bundle template, select **Deactivate** next to it.

After activating or deactivating a template, the page refreshes with the success message displayed.

## Deleting configurable bundle templates

To delete a configurable bundle template:

1. Select **Delete** next to the configurable bundle template you want to delete.
2. On the *Delete Configurable Bundle Template #{template ID}* page, select **Delete Template**.
This opens the *Configurable Bundle Templates* page with the success message displayed.



***
**What's next?**
Now you know how to manage the configurable bundle templates that already exist in the shop.

See [configurable bundle templates: Reference Information](https://documentation.spryker.com/docs/configurable-bundle-templates-reference-information) to learn about the attributes used to manage configurable bundle templates.

