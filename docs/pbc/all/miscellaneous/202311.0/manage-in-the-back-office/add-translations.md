---
title: Add translations
description: Learn how to add and edit translations in the Back Office.
last_updated: June 3, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-glossary
originalArticleId: a485b9af-b90b-4847-904c-3f87891de5c9
redirect_from:
  - /2021080/docs/managing-glossary
  - /2021080/docs/en/managing-glossary
  - /docs/managing-glossary
  - /docs/en/managing-glossary
  - /docs/scos/user/back-office-user-guides/202200.0/administration/glossary/managing-glossary.html
  - /docs/scos/user/back-office-user-guides/202204.0/administration/glossary/managing-glossary.html  
  - /docs/scos/user/back-office-user-guides/202204.0/administration/glossary/add-translations.html
---

To add a translation in the Back Office, follow the steps:

1. Go to the **Administration&nbsp;<span aria-label="and then">></span> Glossary**.
2. On the **Glossary** page, click **Create Translation**.
3. On the **Create Translation** page, enter a **NAME**.
4. Optional: Enter translations per locale.
5. Click **Save**.
    This opens the **Glossary** page with a success message displayed. The translation is displayed in the list.
6. Ask your development team to add the translation on the code level.
    Now you can add translations to content. See [Next steps](#next-steps) for details.

![Example of translations](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Glossary/Managing+Glossary/managing-glossary.png)

## Reference information: NAME

A **NAME** of a translation is a glossary key, a unique identifier of the translation. You use it to add translations to different types of content. When the content is rendered on the Storefront, the glossary key is replaced with a translation based on selected locale and the translation you entered for the locale.


## Next steps

* Add translations to CMS block by editing [placeholders in CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/edit-placeholders-in-cms-blocks.html).
* Add translations to CMS page by editing [placeholders in CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/edit-cms-pages.html).
