---
title: Using CMS blocks in content
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-use-cms-blocks
originalArticleId: 655564ee-69d9-455c-a495-88b6c4c4bfe2
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-use-blocks.html
  - /docs/pbc/all/content-management-system/202307.0/tutorials-and-howtos/howto-use-blocks.html
  - /docs/pbc/all/content-management-system/202307.0/base-shop/tutorials-and-howtos/howto-use-blocks.html
---

Blocks can be viewed as partial content snippets that can be embedded in other pages. From an SEO perspective, blocks are a real advantage.

The CMS Block module supports flexible extension by adding a new connector.

Spryker provides two extensions as examples CMS Block Category Connector and CMS Block Product Connector. However, you are free to extend and create new relations of blocks to other system subjects.

{% info_block infoBox "CMS Block GUI" %}

CMS Block module provides only business logic. For a better experience, install the CMS Block GUI module, which adds GUI to the Zed panel.

{% endinfo_block %}

The following steps show how CMS blocks work.

To add a CMS block with a hello message, follow these steps:

1. Add a template for the new block—similar to templates for pages.
2. Create a new Twig template under the `src/Pyz/Yves/CmsBlock/Theme/default/template/` folder. We call it `hello.twig`, and it contains the following structure:

```php
<!-- CMS_BLOCK_PLACEHOLDER : "helloBlockText" -->
<div class="cms-block">
    <h1>Hello World!</h1>
    <p>{% raw %}{{{% endraw %} spyCmsBlockPlaceholder('helloBlockText') | raw {% raw %}}}{% endraw %}</p>
</div>
```

3. Configure the new block in the CMS Block interface and add the corresponding glossary keys for the two included placeholders.
4. In Back Office, in **Content&nbsp;<span aria-label="and then">></span> Blocks**, click **Create Block**.
5. Select the newly created template from the list, select a static type, and enter a proper unique **NAME** ("HelloMessage").
6. To limit the availability to a date range, enter the **VALID FROM** and **VALID TO** dates.
7. Click **Save**.
8. Create the glossary keys for the placeholders (see the previous example).
9. Run the collectors so that the changes are effective in Yves.

The new block is now ready to be used and integrated in other Twig templates.

```
{% raw %}{{{% endraw %} spyCmsBlock({name: 'HelloMessage'}) {% raw %}}}{% endraw %}
```

## Multi-store environment

If you have a multiple store environment configured, you can also define in which of your stores the CMS Block can appear.

In the previous example, the CMS Block is assigned to DE and US only. If the CMS Block is enabled, it appears only in DE and US stores. Afterward, the user can define another CMS Block assigned to AT store only and have different content per store.
