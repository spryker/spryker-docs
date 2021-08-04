---
title: HowTo - Create CMS Templates
originalLink: https://documentation.spryker.com/v3/docs/ht-create-cms-templates
redirect_from:
  - /v3/docs/ht-create-cms-templates
  - /v3/docs/en/ht-create-cms-templates
---

This HowTo describes how to add a new page template in Yves using the CMS. 

To demonstrate the process, we will create a page with contact information.

{% info_block infoBox %}
CMS templates are fully project-specific, and to create them, some storefront design work needs to be done, usually in collaboration between a business person and a storefront developer.
{% endinfo_block %}

## Adding a Template For a CMS Page

In order to have a template to select in the Template drop-down list when creating a new [CMS page](/docs/scos/dev/features/202001.0/cms/cms-page/cms-page) on the [Create new CMS Block](https://documentation.spryker.com/v4/docs/assigning-blocks-to-category-and-product-pages) page in the Back Office, first you need to create the template itself.
			
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
In order to have a template to select in the Template drop-down list when creating a new [CMS block](/docs/scos/dev/features/202001.0/cms/cms-block/cms-block) on the [Create new CMS Block](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/blocks/creating-cms-bl) page in the Back Office, first you need to create the template itself.

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
    
## Adding a Template for a Content Item Widget
    
{% info_block infoBox %}
The article describes the steps on how to create a template for [content item widgets](/docs/scos/dev/features/201907.0/cms/content-item-widgets/content-items-w
{% endinfo_block %}.)
    
By default, the Spryker application provides two basic types of templates related to each content item widget: Banner widget, Abstract Product List widget, Product Set widget, and File widget. However, you, as a developer, can add a new type of template or adjust an existing one on a project level.
    
**To add a content item widget template:**
    
1. Depending on the type of a content item widget for which you want to create a template, make sure you have the respective Content Item Widget module installed::
* [ContentBannerWidget](https://github.com/spryker-shop/content-banner-widget)
* [ContentProductWidget](https://github.com/spryker-shop/content-product-widget)
* [ContentProductSetWidget](https://github.com/spryker-shop/content-product-set-widget)
* [ContentFileWidget](https://github.com/spryker-shop/content-file-widget)

2. Create a new Twig template file - **{new-template}.twig** - under the `src/Pyz/Yves/{ModuleWidget}/Theme/default/views/{template-folder}/` folder where:

* **{new-template}** is the name of the template you want to add
* **{ModuleWidget}** is the name of your Content Item Widget module.
* **{template-folder}** is the name of the template folder: banner, cms-product-abstract, content-product-set, or content-file.

By default, the template data is stored to the core modules of widgets. Thus, you can use it as an example.
    
3. Modify the template configuration in the {ModuleWidgetTwigFunction}.php file under the `Pyz/Yves/{ModuleWidget}/Twig/` folder:

{% info_block infoBox %}
You can find the name of the `{ModuleWidgetTwigFunction}.php` file here: `SprykerShop/Yves/{ModuleWidget}/Twig/`
{% endinfo_block %}

* Add the identifier of the template
* Add a path to the template based on its identifier

**Pyz/Yves/{ModuleWidget}/Twig/{ModuleWidgetTwigFunction}.php**
    
```php
namespace \Pyz\Yves\{ModuleWidget}\Twig;
 
class {ModuleWidgetTwigFunction} extends \SprykerShop\Yves\{ModuleWidget}\Twig\{ModuleWidgetTwigFunction}
{
    protected const WIDGET_TEMPLATE_IDENTIFIER_NEW_TEMPLATE = 'new-template';
     
    /**
    * @return array
    */
    protected function getAvailableTemplates(): array
    {
        return array_merge(parent::getAvailableTemplates(), [
            static::WIDGET_TEMPLATE_IDENTIFIER_NEW_TEMPLATE => '@{ModuleWidget}/views/{template-folder}/{new-template}.twig',
        ]);
    }
}
```
    
4. Override the method in the factory that creates the object of the **twig** function 

where **{ModuleWidgetTwigFunction}** is the configuration file name of the **Twig** function:
    
**Pyz/Yves/{ModuleWidget}/{ModuleWidget}Factory.php**
    
```php
namespace \Pyz\Yves\{ModuleWidget};
 
use \Pyz\Yves\{ModuleWidget}\Twig\{ModuleWidgetTwigFunction};
 
class {ModuleWidget}Factory extends \SprykerShop\Yves\{ModuleWidget}\{ModuleWidget}Factory
{
    /**
    * @param \Twig\Environment $twig
    * @param string $localeName
    *
    * @return \Pyz\Yves\{ModuleWidget}\Twig\{ModuleWidgetTwigFunction}
    */
    public function createContentBannerTwigFunction(Environment $twig, string $localeName): \SprykerShop\Yves\{ModuleWidget}\Twig\{ModuleWidgetTwigFunction}
    {
        return new {ModuleWidgetTwigFunction}(
            $twig,
            $localeName,
            $this->getContentBannerClient()
        );
    }
}
```
