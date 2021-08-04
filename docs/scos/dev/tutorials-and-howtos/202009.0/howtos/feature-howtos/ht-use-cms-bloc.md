---
title: HowTo - Use Blocks
originalLink: https://documentation.spryker.com/v6/docs/ht-use-cms-blocks
redirect_from:
  - /v6/docs/ht-use-cms-blocks
  - /v6/docs/en/ht-use-cms-blocks
---

Blocks can be viewed as partial content snippets that can be embedded in other pages. From a SEO perspective, blocks are a real advantage.        

The CMS Block module supports flexible extension by adding a new connector. 
Spryker provides two extensions as examples CMS Block Category Connector and CMS Block Product Connector. But you are free to extend and create new relations of blocks to other system subjects.

{% info_block infoBox "CMS Block GUI" %}
CMS Block module provides only business logic. For better experience install CMS Block GUI module, which will add GUI to Zed panel.
{% endinfo_block %}

### Main usage
To familiarize yourself with how to use blocks, follow the steps described below. These steps describe how to add a block with a hello message:

* Add a template for the new block - similar to templates for pages.        
* Create a new Twig template under the `src/Pyz/Yves/CmsBlock/Theme/default/template/` folder. We'll call it `hello.twig` and it will contain the following structure :

```php
<!-- CMS_BLOCK_PLACEHOLDER : "helloBlockText" -->
<div class="cms-block">
    <h1>Hello World!</h1>
    <p>{% raw %}{{{% endraw %} spyCmsBlockPlaceholder('helloBlockText') | raw {% raw %}}}{% endraw %}</p>
</div>
```

* Next, configure the new block in the CMS Block interface and add the corresponding glossary keys for the 2 included placeholders.
* Click **Create CMS Block** to take you to the page for creating a new block
* Select the newly created template from the list, select static type and give it a proper unique name ("HelloMessage").
* Enter the **Valid From** and **Valid To** dates if you want to limit the availability to a date range and click **Save**. 

* Create the glossary keys for the placeholders ( see previous example)
* Run the collectors so that the changes are effective in Yves.
        
The new block is now ready to be used and integrated in other Twig templates.

```
{% raw %}{{{% endraw %} spyCmsBlock({name: 'HelloMessage'}) {% raw %}}}{% endraw %}
```

### Multi-store Environment
In case you have multiple store environment configured, you can also define in which of your stores the CMS Block is allowed to appear.

#### Explanation
In the example above, the CMS Block is assigned to DE and US only. If the CMS Block is enabled, then it will appear only in store DE and US. Afterward the user could define another CMS Block assigned to AT store only and have a different content per store.      

