---
title: Create CMS templates
description: Use the guide to create a template for a CMS page, CMS Block, Content Item Widget.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-create-cms-templates
originalArticleId: 6f52ee42-6c1a-4d0b-865b-3512b7f4b9aa
redirect_from:
  - /docs/scos/dev/tutorials/201811.0/howtos/feature-howtos/cms/howto-create-cms-templates.html
  - /docs/scos/dev/tutorials/201903.0/howtos/feature-howtos/cms/howto-create-cms-templates.html
  - /docs/scos/dev/tutorials/201907.0/howtos/feature-howtos/cms/howto-create-cms-templates.html
  - /docs/scos/dev/tutorials/202005.0/howtos/feature-howtos/cms/howto-create-cms-templates.html
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-cms-templates.html
  - /docs/pbc/all/content-management-system/202311.0/tutorials-and-howtos/howto-create-cms-templates.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/tutorials-and-howtos/howto-create-cms-templates.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/tutorials-and-howtos/create-cms-templates.html
related:
  - title: CMS Pages overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/cms-pages-overview.html
  - title: CMS Blocks overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/cms-blocks-overview.html
---

This document describes how to create CMS templates for Yves.

{% info_block infoBox %}

CMS templates are usually project-specific. To create them, some Storefront design work needs to be done, usually in collaboration between a business person and frontend project developer.

{% endinfo_block %}

## CMS page template

CMS page template is a [Twig](https://twig.symfony.com/) file that, when applied to a Storefront page, defines its design and layout.

To learn how the template is created, check the following exemplary procedure:

1. Create the Twig template `src/Pyz/Shared/Cms/Theme/default/templates/contact_page.twig`:

```twig
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

2. Define placeholders for translation:

```twig
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

The text in the defined placeholders is replaced at runtime by the glossary keys assigned to them.

A content manager can apply this template when [creating a CMS page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/create-cms-pages.html) in the Back Office.

## Template with slots

[Template with slots](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html) is a Twig file that defines the layout of slots across a Storefront page and has at least one slot assigned.

Create a template with slots:
1. Create a Twig template as described in [CMS Page Template](#cms-page-template).
2. For each slot that you want to have in the template, insert a [slot widget](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html#slot-widget).
3. [Import](/docs/dg/dev/data-import/{{site.version}}/data-importers-implementation.html) template and slot lists. Learn about the lists in the [Correlation](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html#correlation) section of the Templates & Slots feature overview.

Templates with slots are universal. In the Back Office, a content manager can apply this template when [creating a CMS page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/create-cms-pages.html) or [creating a category](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/categories/create-categories.html).

{% info_block warningBox %}

You can assign the template with slots to other page types only on a code level.

{% endinfo_block %}

## CMS Block template

CMS block template is a Twig file that, when applied to a [CMS Block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-blocks-overview.html), defines its design and layout.

Create the Twig template—`src/Pyz/Shared/CmsBlock/Theme/default/template//hello.twig`.

```twig
<!-- CMS_BLOCK_PLACEHOLDER : "helloBlockText" -->
<div class="cms-block">
	<h1>Hello World!</h1>
	<p>{% raw %}{{{% endraw %} spyCmsBlockPlaceholder('helloBlockText') | raw {% raw %}}}{% endraw %}</p>
</div>
```

A content manager can apply this template when [creating a CMS block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/create-cms-blocks.html) in the Back Office.

## Content item widget template

[Content item widget](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html) template is a Twig file that defines the layout of the content item it renders on Storefront.

By default, two content item widget templates are shipped per each content item:
- Banner widget
- Abstract Product List widget
- Product Set widget
- File widget

Create a content item widget template:

{% info_block infoBox %}

Depending on the content item widget you create the template for, make sure to install the respective Content Item Widget module:

- [ContentBannerWidget](https://github.com/spryker-shop/content-banner-widget)
- [ContentProductWidget](https://github.com/spryker-shop/content-product-widget)
- [ContentProductSetWidget](https://github.com/spryker-shop/content-product-set-widget)
- [ContentFileWidget](https://github.com/spryker-shop/content-file-widget)

{% endinfo_block %}

1. Create `src/Pyz/Yves/{ModuleWidget}/Theme/default/views/{template-folder}/{new-template}.twig`, where:
   - `{new-template}` is the template name.
   - `{ModuleWidget}` is the name of the respective Content Item Widget module.
   - `{template-folder}` is the template folder name. Based on the content item widget, choose:
       - banner
       - cms-product-abstract
       - content-product-set
       - content-file

The default templates located on the core level of each module can be used as examples.

2. Modify the template configuration in `Pyz/Yves/{ModuleWidget}/Twig/{ModuleWidgetTwigFunction}.php`:
   - Add the template identifier.
   - Based on the template identifier, add a path to the template.

{% info_block infoBox %}

`{ModuleWidgetTwigFunction}.php` must extend from the corresponding file in `SprykerShop/Yves/{ModuleWidget}/Twig/`.

{% endinfo_block %}

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

3. Override the method in the factory that creates the object of `{ModuleWidgetTwigFunction}`:

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
