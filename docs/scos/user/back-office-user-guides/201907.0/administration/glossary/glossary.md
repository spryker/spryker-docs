---
title: Glossary
description: The section is used to create translations for a new locale or update the existing ones in the Back Office.
last_updated: Nov 26, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v3/docs/glossary
originalArticleId: dc90e287-5e66-4d62-b1c7-44b04674cfc5
redirect_from:
  - /v3/docs/glossary
  - /v3/docs/en/glossary
---

The Glossary section in the Back Office is mostly used by administrators when a new locale for a store needs to be set up. In case no new locale needs to be set up, the Marketing Content Manager or Spryker Admin can use this section in order to improve the existing content (translations).

**Standardized flow of actions for a DevOps**
![Flow of actions for a DevOps](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Glossary/glossary-section.png) 

{% info_block infoBox %}
This is how the DevOps interacts with the Development Team and uses the Back Office to set up a new locale for a store.
{% endinfo_block %}

A glossary consists of
* a glossary key (which is used in the templates contained in the shop application)
* a glossary value for each locale defined in the online store

You can manage the translations, however, when creating or updating a glossary key, the changes are persisted in the back-end database. The changes are available in the online store after the client data storage is updated (either by manually running the update storage command or after the cronjob that does this update was executed. That is why interaction with the Development Team is needed.
***
**What's next?**
To know how the translations are managed, see the [Managing Glossary](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/glossary/managing-glossary.html) article.
