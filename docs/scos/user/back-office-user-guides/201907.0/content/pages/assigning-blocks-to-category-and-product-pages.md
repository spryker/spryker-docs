---
title: Assigning Blocks to Category and Product Pages
description: The guide provides instructions on how to assign blocks to category and product detail pages, and add CMS blocks to a CMS page in the Back Office.
last_updated: Dec 23, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v3/docs/assigning-blocks-to-category-and-product-pages
originalArticleId: 777e5102-a37c-4cba-94df-335a09ea6049
redirect_from:
  - /v3/docs/assigning-blocks-to-category-and-product-pages
  - /v3/docs/en/assigning-blocks-to-category-and-product-pages
related:
  - title: CMS Page
    link: docs/scos/user/features/page.version/cms-feature-overview/cms-pages-overview.html
  - title: Editing CMS Pages
    link: docs/scos/user/back-office-user-guides/page.version/content/pages/editing-cms-pages.html
  - title: Managing CMS Page Versions
    link: docs/scos/user/back-office-user-guides/page.version/content/pages/managing-cms-page-versions.html
  - title: CMS Pages- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/content/pages/references/cms-pages-reference-information.html
---

This topic describes how you can create category or product detail pages by adding a CMS block to a page.
***
To assign a block to a category or product, navigate to the  **Content Management** > **Pages** section.
***
**Prerequisite**
 Make sure that the block to be added _exists_, is _active_ and has _not expired_.
 ***
**To add a CMS block to a CMS page:**
1. On the **Overview of CMS Pages** page in the _Actions_ column, click **Edit > Placeholders** next to the page you want to add a block to.
2. On the **Edit Placeholders: [Page Name]** page that opens, switch to the **Placeholders** tab and place your cursor where you want to insert a CMS block.
3. Enter the following information:

    {% raw %}{{{% endraw %} cms_block( {'Block name'} ) {% raw %}}}{% endraw %} where **Block name** is a name of the block.

{% info_block infoBox %}

Alternatively, you can create a CMS block on the page manually. To do this, click **Cms content widgets usage information**, copy the **cms_block** code and paste it into the page.

{% endinfo_block %}

4. Replace **block_name_placeholder** with the name of the block you want to add to this current page.

{% info_block infoBox %}

You can get a block name in the _Name_ column of the List of CMS blocks on the Overview of CMS Blocks page.

{% endinfo_block %}

5. To keep the changes, click **Save**.
***
**Tips and tricks**
If you want to create different versions of the page per locale, add the general information to the section in the corresponding language.
***
**What's next?**
The block has been added to the page. So, you can preview the page draft to see how it will look like on the store website or publish the page.

* To learn how to preview the page draft, see the [Previewing a Page](/docs/scos/user/back-office-user-guides/{{page.version}}/content/pages/managing-cms-pages.html#previewing-cms-pages) section in [Managing CMS Pages](/docs/scos/user/back-office-user-guides/{{page.version}}/content/pages/managing-cms-pages.html).

* To learn how to publish the page, see the [Publishing a Page](/docs/scos/user/back-office-user-guides/{{page.version}}/content/pages/managing-cms-pages.html#publishing-a-page) section in [Managing CMS Pages](/docs/scos/user/back-office-user-guides/{{page.version}}/content/pages/managing-cms-pages.html).
