---
title: Managing Glossary
description: he guide provides instructions for shop owners to learn how to create and handle information in different languages in the Back Office.
last_updated: Dec 6, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v4/docs/managing-glossary
originalArticleId: c9e0341a-91b7-42d7-a33e-f33f0f6a0929
redirect_from:
  - /v4/docs/managing-glossary
  - /v4/docs/en/managing-glossary
---

This article describes how the translations in the Glossary section are created and managed.
***
To start managing translations, navigate to the **Glossary** section.
***
**To create a new translation:**

1. In the top-right corner of the **Overview of Translations** page click **Create Translation**.
2. On the **Create Translation** page, do the following:
3. Enter the glossary key in the **Name** field.

    {% info_block errorBox %}

    You can not just add/update a glossary key without using it in code, otherwise the translation will not be applied. Threfore, if you need to add a new translation, ask a developer to apply the glossary key and its translation values in code as well.

    {% endinfo_block %}

4. Populate the glossary values per the locales.
5. Once done, click **Save**.

This is the example of how the translations can look like:
![Example of translations](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Glossary/Managing+Glossary/managing-glossary.png)

***
**To edit an existing translation:**

1. On the **Overview of Translations** page, click **Edit** in the _Actions_ column for a specific glossary key.
2. On the **Edit Translation** page, change the translation values in the locales (the **Name** field is greyed out thus the glossary key itself is not available for modifications).
3. Once done, click **Save**.
