---
title: Managing Product Labels
description: The Managing Product Labels section describes the procedures you can use to view, edit, activate and/or deactivate product labels in the Back Office.
last_updated: Jul 31, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v2/docs/managing-product-labels
originalArticleId: 3659738b-28dd-4f90-a6a7-9d9aa7d985dd
redirect_from:
  - /v2/docs/managing-product-labels
  - /v2/docs/en/managing-product-labels
related:
  - title: Product Labels feature overview
    link: docs/scos/user/features/page.version/product-labels-feature-overview.html
  - title: Accessing Product Labels
    link: docs/scos/dev/glue-api-guides/page.version/managing-products/retrieving-product-labels.html
---

This topic describes the procedures of managing product labels.
***
To start managing product labels, navigate to **Products > Product Labels**.
***
You can view, edit, and activate or deactivate (depending on the current status) product labels by clicking respective buttons in the _Actions_ column in the list of Product Labels.
***
## Viewing Product Labels
To view a product label:
1. On the **Overview of Product Labels** page, click **View** in the _Actions_ column.
    Clicking View will take you to the **View Product Label** page.
2. On the **View Product Label** page, the following information is available:
    * General information about the label, including the name, exclusivity, and validity period.
    * Translation
    * Products to which the label is assigned. 
3. Being on the **View Product Label** page, do one of the following:
   * To view the product to which a specific label is assigned, click **View** in the action column of the product to which this label applies table. This will take you to the **View Abstract Product** page.
    * To activate/deactivate the label, click **Activate**/**Deactivate** in the top right corner of the page.
    * To edit the label, click **Edit** in the top right corner of the page.
    * To return back to the **Overview of Product Tables** page, click **Back to Product Labels**
***
## Editing a Product Label
{% info_block warningBox "Note" %}
Products for the dynamic labels (like **New**, or **Discontinued**
{% endinfo_block %} are assigned dynamically; there is no way to manage relations manually.)

To edit a product label:
1. Click **Edit** in the _Actions_ column of the **Overview of Product Labels** page. 
2. On the **Edit Product Label** page, edit the values. See [Product Labels: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/references/product-labels-reference-information.html).
3. Once done, click **Save**.
***
## Activating/Deactivating a Product Label
There are several ways to activate/deactivate a product label:

* Activate the label while creating/editing it by selecting the **Is Active** checkbox. The deselection of the checkbox deactivates the label.

* Deactivate the label while editing it by clicking **Deactivate** in the top right corner of the **Edit** page.

* Activate/deactivate a label while viewing it by clicking **Activate/Deactivate** in the top right corner of the **View** page.

* Activate/deactivate a label by selecting **Activate/Deactivate** in the _Actions_ column of the **Overview of Product Labels** page.
***
**What's next?** 
* Learn how to prioritize a label in the [Prioritizing Labels](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/prioritizing-labels.html) topic.
* To learn what attributes you enter and select while editing the product label, see the [Product Labels: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/references/product-labels-reference-information.html) article.
