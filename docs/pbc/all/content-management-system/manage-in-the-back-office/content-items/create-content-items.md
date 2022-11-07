---
title: Creating content items
description: The guide provides a procedure on how to create a content item such as banner, abstract product list, product set, and file list in the Back Office.
last_updated: Jul 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-content-items
originalArticleId: 2b74257a-bed2-4e83-a271-59e1beb84262
redirect_from:
  - /2021080/docs/creating-content-items
  - /2021080/docs/en/creating-content-items
  - /docs/creating-content-items
  - /docs/en/creating-content-items
  - /docs/scos/user/back-office-user-guides/201811.0/content/content-items/creating-content-items.html
  - /docs/scos/user/back-office-user-guides/201903.0/content/content-items/creating-content-items.html
related:
  - title: Content Items feature overview
    link: docs/pbc/all/content-management-system/content-items-feature-overview.html
  - title: Editing Content Items
    link: docs/scos/user/back-office-user-guides/page.version/content/content-items/editing-content-items.html
---



## Create a navigation content item

To create a navigation content item:
1. On the *Create Content Item: Navigation* page, enter **Name** and **Description**.
2. In the *Default* tab, select a navigation from the *Navigation* drop-down list. See [Creating navigation elements](/docs/scos/user/back-office-user-guides/{{page.version}}/content/navigation/managing-navigation-elements.html#creating-a-navigation-element) to learn about creating navigation elements.

3. If needed, repeat the previous step in one or more locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific navigation element overwrites the default navigation element when rendered on a Storefront page with the [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html) selected.
* If no navigation element is selected for a locale, the default navigation element is displayed on a Storefront page with the locale selected.

{% endinfo_block %}

4. Click **Save**.
This takes you to the *Overview of Content Items* page. You can see the message about successful content item creation. The created content item is displayed in the *List of Content Items*.

### Reference information: Create a navigation content item

The following table describes the attributes on the *Create Content Item: Navigation* page.
