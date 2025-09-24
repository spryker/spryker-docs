---
title: Edit slots in configurable bundle templates
description: Learn how to edit slots in configurable bundle templates directly in the Spryker Cloud Commerce OS Back Office.
template: back-office-user-guide-template
last_updated: Nov 21, 2023
related:
  - title: Create configurable bundle templates
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/configurable-bundle-templates/create-configurable-bundle-templates.html
  - title: Edit slots in configurable bundle templates
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/configurable-bundle-templates/edit-slots-in-configurable-bundle-templates.html
  - title: Configurable Bundle feature overview
    link: docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/configurable-bundle-feature-overview.html
redirect_from:
- /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/configurable-bundle-templates/edit-slots-in-configurable-bundle-templates.html
---

This document describes how to edit slots in configurable bundle templates in the Back Office.

## Prerequisites

1. [Create a slot](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/configurable-bundle-templates/edit-configurable-bundle-templates.html#create-slots-in-a-configurable-bundle-template).
2. To start editing slots, do the following:
    1. Go to **Merchandising&nbsp;<span aria-label="and then">></span> Configurable Bundle Templates**.
        This opens the **Configurable Bundle Templates** page.
    2. Next to the template containing the slot you want to edit, click **Edit**.
    3. On the **Edit Configurable Bundle Template** page, click the **Slots** tab.
    4. Next to the slot you want to edit, click **Edit**.


## Edit the name of a slot in a configurable bundle template

1. Click the **General** tab.
2. Update **NAME** for needed locales.
3. Click **Save**.
    The page refreshes with the success message displayed.

## Assign and deassign categories from a slot in configurable bundle templates

1. Click the **Assign Categories** tab.
2. For **CATEGORIES**, do any of the following:
    - Assign categories by entering and selecting the names of the needed categories.
    - Deassign categories by clicking **x** next to the categories you want to deassign.
3. Select **Save**
    The page refreshes with the success message displayed.


## Assign and deassign products from a slot in a configurable bundle template

1. Click the **Assign Products** tab.
2. In the **Select Products to assign** subtab, select the checkboxes next to the products you want to assign.
3. In the **Products in this list** subtab, select the checkboxes next to the products you want to deassign.
4. Click **Save**.
    The page refreshes with the success message displayed. The updated product selection is displayed in the **Products in this list** subtab.

**Tips and tricks**
When assigning and deassigning a lot of products, it might be useful to double-check your selection in **Products to be assigned** and **Products to be deassigned** subtabs.

## Import products for a slot in a configurable bundle template


{% info_block warningBox "" %}

If there are assigned products, they are replaced with the product list you import.

{% endinfo_block %}

1. Click the **Assign Products** tab.
2. Click **Choose File**.
3. Select a CSV file with the product list. The file should contain `product_list_key` and `concrete_sku` fields.
4. Click **Save**
    The page refreshes with the success message displayed. The updated product selection is displayed in the **Products in this list** subtab.
