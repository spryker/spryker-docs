---
title: Create a custom content item
description: If the content items shipped with Spryker do not fulfill your needs, the document shows how to create a new one.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-create-a-custom-content-item
originalArticleId: 82c46d06-3f67-4bad-8142-b83624c79197
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-a-custom-content-item.html
  - /docs/pbc/all/content-management-system/202311.0/tutorials-and-howtos/howto-create-a-custom-content-item.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/tutorials-and-howtos/howto-create-a-custom-content-item.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/tutorials-and-howtos/create-a-custom-content-item.html
---

By default, Spryker provides `Banner`, `Product Abstract List`, `Product Set` and `File List` content items.

If you need another type of content to display in a CMS page or bock content or even inside a [Twig](https://twig.symfony.com/) template file, you can create it on the project level.

You can do the following:

* Introduce a new entity with all the properties required by your project. For example, see `ContentBanner` and `ContentBannerGui` modules.
* Use an entity that already exists in your shop database, like `Location`, `Partner`, or `Employee`. For example, see `ContentProduct` and `ContentProductGui` modules.

To create a new custom content item, implement the following plugins in the order they are described.

## Content form plugin

To check the existing content form plugins, open `\Pyz\Zed\ContentGui\ContentGuiDependencyProvider::getContentPlugins()`.

{% info_block infoBox %}

Such plugins implement `\Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentPluginInterface`.

{% endinfo_block %}

To create a new content form plugin, follow these steps:
1. Create a module for the new content type—for example, `src/Zed/ContentFooGui`, with a plugin inside. The following list represents the description of plugin methods:
   * `getTypeKey()`—returns a string with the name of your content item—for example, Foo.
   * `getTermKey()`—returns a string displaying the term for this content type in database—for example, `Foo`, `Foo List` or `Foo Query`. In database, a content type can have different term representations. Correspondingly, there are different ways of getting information about content. For example:
     * `Foo List`—product list IDs.
     * `Foo Query`—product query as part of SQL/ElasticSearch query. This value is displayed in the Back Office, in **Content Management&nbsp;<span aria-label="and then">></span> Content Items**.
   * `getForm()`—a form class name with a namespace which is displayed on the **Content create** or **Content edit** pages.
   * `getTransferObject()`—maps form data to a content term transfer object—for example, `ContentFooTermTransfer`.

```php
<?php

namespace Spryker\Zed\ContentFootGui\Communication\Plugin\ContentGui;

use Spryker\Shared\Kernel\Transfer\TransferInterface;
use Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentPluginInterface;
use Spryker\Zed\ContentFooGui\Communication\Form\ContentFooTermForm;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class ContentFooFormPlugin extends AbstractPlugin implements ContentPluginInterface
{
    /**
     * @return string
     */
    public function getTermKey(): string
    {
        return 'Foo';
    }

    /**
     * @return string
     */
    public function getTypeKey(): string
    {
        return 'Foo';
    }

    /**
     * @return string
     */
    public function getForm(): string
    {
        return ContentFooTermForm::class;
    }

    /**
     * @param array|null $params
     *
     * @return \Generated\Shared\Transfer\ContentFooTermTransfer
     */
    public function getTransferObject(?array $params = null): TransferInterface
    {
        $contentFooTermTransfer = new ContentFooTermTransfer();

        if ($params) {
            $contentFooTermTransfer->fromArray($params);
        }

        return $contentFooTermTransfer;
    }
}
```
  1. Create `ContentFooTermForm`. The main part of the plugin is the `Form` class that implements `\Symfony\Component\Form\FormBuilderInterface`.
     * For more information about Symfony forms, see [Forms](https://symfony.com/doc/current/forms.html).
     * To learn about form creation procedure in Spryker, see [Creating forms](/docs/dg/dev/backend-development/forms/create-forms.html)
     * `\Spryker\Zed\ContentBannerGui\Communication\Form\BannerContentTermForm` as an example of a simple form.
     * `\Spryker\Zed\ContentProductGui\Communication\Form\ProductAbstractListContentTermForm` as an example of a form with a dedicated template and complex Javascript functionality.

Each form shipped by default require at least one form field to be filled out before it can be submitted. However, you can add more form constraints with additional validation.

```php
namespace Spryker\Zed\ContentFooGui\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;

class ContentFooTermForm extends AbstractType
{
    /**
     * @return string
     */
    public function getBlockPrefix(): string
    {
        return 'foo';
    }

    **
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('name', TextType::class, [
            'label' => 'Name',
        ]);

        $builder->add('city', TextType::class, [
            'label' => 'City',
        ]);

        $builder->add('address', TextType::class, [
            'label' => 'Address',
        ]);

        $builder->add('numberOfEmployees', IntegerType::class, [
            'label' => 'Number of employees',
        ]);
    }

    /**
     * User this method if you need to provide custom template path or additional data to template
     *
     * @param \Symfony\Component\Form\FormView $view
     * @param \Symfony\Component\Form\FormInterface $form
     * @param array $options
     *
     * @return void
     */
    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $view->vars['attr']['template_path'] = '@ContentFooGui/_includes/foo_form.twig';
    }
}
```

{% info_block warningBox "Verification" %}

After enabling the plugin, make sure there is a new content item in the Back Office, in **Content Management&nbsp;<span aria-label="and then">></span> Content Items&nbsp;<span aria-label="and then">></span> Add Content Item**.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Feature+HowTos/HowTo+-+Create+a+New+Custom+Content+Item/add-content-item-menu.png)

{% endinfo_block %}

## Twig plugin
After enabling the content form plugin, you have your new content item data in Storage. To fetch the item data from Storage, use `\Spryker\Client\ContentStorage\ContentStorageClientInterface::findContentTypeContextByKey(string $contentKey, string $localeName)`.

* `$contentKey` is generated automatically after content saving.
* `$localeName` is an automatically provided locale by current Store.

The method returns `ContentTypeContextTransfer`, where `ContentTypeContextTransfer::$parameters` is the data saved by the form created in the previous section.

To create a new Twig plugin, follow these steps:
1. Using `ContentTypeContextTransfer::$term` and `ContentTypeContextTransfer::$parameters`, fill in the properties of your new content transfer object—for example, `ContentFooTransfer`, in `src/Shared/ContentFoo/Transfer/`.
2. Create a new module—for example, `src/Yves/ContentFooWidget`.
3. Implement a Twig function using `\Spryker\Shared\Twig\TwigFunction`—for example, `\SprykerShop\Yves\ContentBannerWidget\Twig\ContentBannerTwigFunction`.
4. Implement a Twig plugin using `\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface`—for example, `\SprykerShop\Yves\ContentBannerWidget\Plugin\Twig\ContentBannerTwigPlugin`.

{% info_block infoBox "Function parameters" %}

The `$key` parameter is obligatory for the function—for example, `function (string $key)`.

Optional: You can add the `$templateIdentifier` parameter—for example, `function (string $key, string $templateIdentifier)`.

{% endinfo_block %}

5. In `\Pyz\Yves\Twig\TwigDependencyProvider::getTwigPlugins()`, register your Twig plugin.

Now you can use your plugin as a function in Twig files. If you’ve named your plugin `content_foo`, in a Twig file, the function looks like `{% raw %}{{{% endraw %} content_foo('content-key', 'big-header') {% raw %}}}{% endraw %}`.

## WYSIWYG editor plugin

The **CMS Block Glossary Edit** and **Placeholder Edit** pages contain the WYSIWYG editor to put content into a CMS block or page. In the WYSIWYG toolbar, the **Content Item** drop-down menu contains all the content items which you can add. For more details, see [Add content items to CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/add-content-items-to-cms-blocks.html).

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Feature+HowTos/HowTo+-+Create+a+New+Custom+Content+Item/content-item-menu.png)

To add the new content item to that list, in `src/Zed/ContentFooGui`, implement a new plugin using `\Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentGuiEditorPluginInterface`—for example,  `ContentFooContentGuiEditorPlugin`.
The following are the method descriptions:
* `getType()`: Returns a string displaying the content type—for example, Foo.
* `getTemplates()`: Returns an array of templates supported by your Twig plugin created in the previous section. If there are no supported templates defined, returns an empty array.
* `getTwigFunctionTemplate()`: Returns a Twig expression that is added into the content.

```php
<?php
namespace Spryker\Zed\ContentFooGui\Communication\Plugin\ContentGui;

use Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentGuiEditorPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\ContentProductGui\Communication\ContentProductGuiCommunicationFactory getFactory()
 * @method \Spryker\Zed\ContentProductGui\ContentProductGuiConfig getConfig()
 */
class ContentFooContentGuiEditorPlugin extends AbstractPlugin implements ContentGuiEditorPluginInterface
{
    /**
     * @return string
     */
    public function getType(): string
    {
        return 'Foo';
    }

    /**
     * @return \Generated\Shared\Transfer\ContentWidgetTemplateTransfer[]
     */
    public function getTemplates(): array
    {
        return [
            (new ContentWidgetTemplateTransfer())
                ->setIdentifier('big-header') // $templateIdentifier from step 2
                ->setName('Big Header'), // is visible in UI.
            (new ContentWidgetTemplateTransfer())
                ->setIdentifier('full-width')
                ->setName('Full Width'),
        ];
    }

    /**
     * @return string
     */
    public function getTwigFunctionTemplate(): string
    {
        return "{% raw %}{{{% endraw %} content_foo('%KEY%', '%TEMPLATE%') {% raw %}}}{% endraw %}";
    }
}
```

Extend `\Pyz\Zed\CmsContentWidgetCmsContentWidgetDependencyProvider::getCmsContentWidgetParameterMapperPlugins()` in order to map Twig function name with item key mapper plugin, for example:
```php 
class CmsContentWidgetDependencyProvider extends SprykerCmsContentWidgetDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CmsContentWidget\Dependency\Plugin\CmsContentWidgetParameterMapperPluginInterface>
     */
    protected function getCmsContentWidgetParameterMapperPlugins(Container $container)
    {
        return [
            ...
            'content_foo' => new CmsContentItemKeyMapperPlugin(),
        ];
    }
}
```
