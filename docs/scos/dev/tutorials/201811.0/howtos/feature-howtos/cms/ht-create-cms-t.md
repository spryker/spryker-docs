---
title: HowTo - Create CMS Templates
originalLink: https://documentation.spryker.com/v1/docs/ht-create-cms-templates
redirect_from:
  - /v1/docs/ht-create-cms-templates
  - /v1/docs/en/ht-create-cms-templates
---

This HowTo describes how to add a new page template in Yves using the CMS. 

To demonstrate the process, we will create a page with contact information.

{% info_block infoBox "Info" %}
CMS templates are fully project-specific, and to create them, some storefront design work needs to be done, usually in collaboration between a business person and a storefront developer.
{% endinfo_block %}

## Adding a Template For a CMS Page

In order to have a template to select in the Template drop-down list when creating a new [CMS page](/docs/scos/dev/features/201811.0/cms/cms-page/cms-page) on the [Create new CMS Block](/docs/scos/dev/user-guides/201811.0/back-office-user-guide/content-management/pages/assigning-block) page in the Back Office, first you need to create the template itself.
			
Create a new Twig template under the `src/Pyz/Yves/Cms/Theme/default/template/ folder`.  

We call it `contact_page.twig` and it will contain the following content:

```php
<h1>CONTACT US </h1>
    <div>
        <strong>  Get in touch </strong>
        <br>
        <strong>Phone number : </strong> +1 (000) 000-0000
        <br>
        <strong>Email : </strong> info@companyname.com
        <br><br>
        <strong> Visit our store </strong><br>
        123 Demo Street<br>
        Demo City<br>
        1234<br>
        <br>
    </div>
```
## Adding Placeholders to Support In-Page Translated Text
In order to have the text translated, add placeholders to the text you want to have translated. The placeholders will be replaced at runtime by the corresponding values of the glossary keys assigned to each of them.

```php
<!-- CMS_PLACEHOLDER : "PlaceholderContactPageHeader" -->
    <!-- CMS_PLACEHOLDER : "PlaceholderContactHeader" -->
    <!-- CMS_PLACEHOLDER : "PlaceholderPhoneNr" -->
    <!-- CMS_PLACEHOLDER : "PlaceholderEmail" -->
    <!-- CMS_PLACEHOLDER : "PlaceholderStoreAddress" -->
    
 <h1>{% raw %}{{{% endraw %} spyCms('PlaceholderContactPageHeader') {% raw %}}}{% endraw %} </h1>
    <div>
        <strong>{% raw %}{{{% endraw %} spyCms('PlaceholderContactHeader') {% raw %}}}{% endraw %} </strong> <br>
        <strong>{% raw %}{{{% endraw %} spyCms('PlaceholderPhoneNr') {% raw %}}}{% endraw %} </strong> +1 (000) 000-0000 <br>
        <strong>{% raw %}{{{% endraw %} spyCms('PlaceholderEmail') {% raw %}}}{% endraw %}  </strong> info@companyname.com <br>
        <strong>{% raw %}{{{% endraw %} spyCms('PlaceholderStoreAddress') {% raw %}}}{% endraw %}  
        </strong><br>
      
        123 Demo Street<br>
        Demo City<br>
        1234<br>
    </div>
```


## Adding a Template for a CMS Block
In order to have a template to select in the Template drop-down list when creating a new [CMS block](https://documentation.spryker.com/v1/docs/cms-block-1) on the [Create new CMS Block](/docs/scos/dev/user-guides/201811.0/back-office-user-guide/content-management/blocks/creating-cms-bl) page in the Back Office, first you need to create the template itself.

Procedure of adding template for the new block is similar to templates for pages.

Create a new Twig template under the `src/Pyz/Yves/CmsBlock/Theme/default/template/ folder`. We'll call it `hello.twig` and it will contain the following structure:

```php
<!-- CMS_BLOCK_PLACEHOLDER : "helloBlockText" -->
<div class="cms-block">
	<h1>Hello World!</h1>
	<p>{% raw %}{{{% endraw %} spyCmsBlockPlaceholder('helloBlockText') | raw {% raw %}}}{% endraw %}</p>
</div>	
```

Next, configure the new block in the CMS Block interface and add the corresponding glossary keys (EN, DE, for example) for the 2 included placeholders.
