---
title: Managing Configurable Bundle Templates
originalLink: https://documentation.spryker.com/v5/docs/managing-configurable-bundle-templates
redirect_from:
  - /v5/docs/managing-configurable-bundle-templates
  - /v5/docs/en/managing-configurable-bundle-templates
---

This article describes the managing actions that you can perform with the Configurable Bundle Templates.

To start working with configurable bundle templates, go to **Merchandising** > **Configurable Bundle Templates**.

---
## Editing a Configurable Bundle Template
To edit a Configurable Bundle Template:

* Click Edit in the Actions column of the Configurable Bundle Templates table.
* On the Edit Configurable Bundle Template page, you can:
    - Change general information for a template, such as Title.
    - Create / delete slots.
    - (Un)assign product category or individual products to slots.

**Tips & Tricks**
On this page, you can return to the list of Configurable Bundle Templates by clicking **Back to Template List** in the top right corner of the page.

### Creating a Slot for a Configurable Bundle Template
To create a slot for a template:

1. Click **Add Slot** in the top right corner on the **Create/Edit Configurable Bundle Template** page.
2. On the **Create Slot** page, enter the name of your Slot in the **Name** field for the corresponding locale and click **Save**.
3. Now you can proceed to add products to the slot.

### Editing a Slot for a Configurable Bundle Template
To edit a slot:

1. Click **Edit** in the *Actions* column for a slot in the **Edit Configurable Bundle Templates** page.
2. In the **General** tab, change the Slot name in the **Name** field for the corresponding locales.
3. Two tabs will be added to the **Slot details** page: **Assign Categories** and **Assign Products**.

#### Adding Products to a Slot
To add products to slot:

1. In the **Assign Categories** tab, select from one to many categories in the **Categories** field.
{% info_block infoBox "Info" %}
This step is optional as you can either add the categories to the list OR add specific products instead. You can also do both.
{% endinfo_block %}
Click Next to proceed to the **Assign Products** tab, or just click on it.
2. In the **Assign Products** tab, do one of the following:
    a) Click **Browse** in the Import Product List area. Select the .csv file to be uploaded. The file should contain `product_list_key` and `concrete_sku`.
OR
    b) In the **Select Products to assign** table, select the products that will be added to the list in the **Selected** column. 
{% info_block warningBox "Tip" %}
You can use Search to filter the results.
{% endinfo_block %}
3. Once you are satisfied with the setup, click **Save**.

#### Removing Products from a Slot
To remove a product from a slot, do the following:

1. Open the existing configurable bundle slot.
2. Navigate to the **Assign Products** tab.
3. In the **Products in this list** tab, define the products you would like to remove by selecting the respective checkboxes in the **Selected** column.
{% info_block infoBox "Info" %}
You can double-check the products that you are going to remove from the product list in the Products to be deassigned tab.
{% endinfo_block %}
4. Click **Save**.

#### Deleting a Slot from a Configurable Bundle Template
To delete a slot:

1. On the **Edit Configurable Bundle Template** page in the Slots tab, click **Delete** in the *Actions* column for the entry you want to remove.
2. In the **Delete Slot** pop-up, click **Confirm**.

## Activating and Deactivating a Configurable Bundle Template
You can activate (make visible in the shop application) or deactivate (make invisible in the shop application) a Configurable Bundle Template.

To activate a page, click **Activate** in the *Actions* column of the **Configurable Bundle Templates** table.

To deactivate a page, click Deactivate in the *Actions* column of the **Configurable Bundle Templates** table.

## Deleting a Configurable Bundle Template
To remove the Configurable Bundle Template:

1. From the **Configurable Bundle Templates** table, click **Delete** in the *Actions* column for the entry you want to remove.
2. On the **Delete Configurable Bundle Template** page, click **Delete Template** to confirm the action.

***
**What's next?**
Now you know how to manage the Configurable Bundle Templates that already exist in the shop.

Review [Configurable Bundle Templates: Reference Information](https://documentation.spryker.com/docs/en/configurable-bundle-templates-reference-information) to learn about the attributes you see, select, and enter while managing a template.

