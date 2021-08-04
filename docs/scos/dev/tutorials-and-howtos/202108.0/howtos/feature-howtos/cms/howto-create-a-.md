---
title: HowTo - create a custom content item
originalLink: https://documentation.spryker.com/2021080/docs/howto-create-a-custom-content-item
redirect_from:
  - /2021080/docs/howto-create-a-custom-content-item
  - /2021080/docs/en/howto-create-a-custom-content-item
---

By default, Spryker provides `Banner`, `Product Abstract List`, `Product Set` and `File List` content items.

If you need another type of content to display in CMS page/bock content or even inside a [Twig](https://twig.symfony.com/) template file, you can create it on the project level.

You can:

* Introduce a new entity with all the properties required by your project. See `ContentBanner` and `ContentBannerGui` modules  for examples.

* Use an entity that already exists in your shop database, like Location, Partner or Employee. See `ContentProduct` and `ContentProductGui` modules for examples.

To create a new custom content item, implement the following plugins in the order they are described.

## Content Form Plugin
Open `\Pyz\Zed\ContentGui\ContentGuiDependencyProvider::getContentPlugins()` to check the existing content form plugins.

{% info_block infoBox %}

Such plugins implement `\Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentPluginInterface`.

{% endinfo_block %}
***
To create a new content form plugin:
1. Create a module for the new content type, e. g. `src/Zed/ContentFooGui` with a plugin inside. Find the description of plugin methods below:

* `getTypeKey()` - returns a string with the name of your content item, e. g. Foo.

* `getTermKey()` - returns a string displaying the term for this content type in database, e.g. `Foo`, `Foo List` or `Foo Query`. In database, a content type can have different term representations. Correspondingly, there are different ways of getting information about content. For example:
    * `Foo List` - product list IDs
    * `Foo Query` - product query as part of SQL/ElasticSearch query. 

    This value will be displayed in the Back Office > **Content Management** > **Content Items** section.
* `getForm()` - a form class name with a namespace which should be displayed in the *Content create* or *Content edit* pages.

* `getTransferObject()` - maps form data to a content term transfer object, e. g. `ContentFooTermTransfer`.

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
  2. Create `ContentFooTermForm`. The main part of the plugin is the `Form` class that implements `\Symfony\Component\Form\FormBuilderInterface`. See:

* [Forms](https://symfony.com/doc/current/forms.html) for more information about Symfony forms.
* [Creating Forms](https://documentation.spryker.com/docs/t-working-forms#creating-forms) to learn about form creation procedure in Spryker.
* `\Spryker\Zed\ContentBannerGui\Communication\Form\BannerContentTermForm` as an example of a simple form.
* `\Spryker\Zed\ContentProductGui\Communication\Form\ProductAbstractListContentTermForm` as an example of a form with a dedicated template and a complex Javascript functionality.

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

After enabling the plugin, make sure there is the new content item in Back Office > **Content Management** > **Content Items** > **Add Content Item** drop-down menu.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Feature+HowTos/HowTo+-+Create+a+New+Custom+Content+Item/add-content-item-menu.png){height="" width=""}

{% endinfo_block %}

## Twig Plugin
After enabling the content form plugin, you will have your new content item data in Storage. To fetch the item data from Storage, use `\Spryker\Client\ContentStorage\ContentStorageClientInterface::findContentTypeContextByKey(string $contentKey, string $localeName)`.

* `$contentKey` is generated automatically after content saving.

* `$localeName` is an automatically provided locale by current Store. 

The method returns `ContentTypeContextTransfer` where `ContentTypeContextTransfer::$parameters` is the data saved by the form created in the previous section. 

***
To create a new Twig plugin:
    
1. Using `ContentTypeContextTransfer::$term` and `ContentTypeContextTransfer::$parameters`, fill in the properties of your new content transfer object, e.g. `ContentFooTransfer`, in `src/Shared/ContentFoo/Transfer/`.

2. Create a new module, e. g. `src/Yves/ContentFooWidget`.

3. Implement a Twig function using `\Spryker\Shared\Twig\TwigFunction`, e.g. `\SprykerShop\Yves\ContentBannerWidget\Twig\ContentBannerTwigFunction`.

4. Implement a Twig plugin using `\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface`, e.g. `\SprykerShop\Yves\ContentBannerWidget\Plugin\Twig\ContentBannerTwigPlugin`.

{% info_block infoBox "Function parameters" %}

The `$key` parameter is obligatory for the function, e.g. `function (string $key)`. 

Optionally, you can add the `$templateIdentifier` parameter, e.g. `function (string $key, string $templateIdentifier)`.

{% endinfo_block %}

5. Register your Twig plugin in `\Pyz\Yves\Twig\TwigDependencyProvider::getTwigPlugins()`. 

Now you can use your plugin as a function in Twig files. If you’ve named your plugin `content_foo`, in a Twig file, the function will look like `{% raw %}{{{% endraw %} content_foo('content-key', 'big-header') {% raw %}}}{% endraw %}`.

## WYSIWYG Editor Plugin

*CMS Block Glossary Edit* and *Placeholder Edit* pages contains WYSIWYG editor to put content into CMS block or page.  The **Content Item** drop-down menu in the WYSIWYG toolbar contains all the content items which you can add. See [Adding Content Item Widgets to Pages and Blocks](https://documentation.spryker.com/v4/docs/adding-content-item-widgets-to-pages-and-blocks#adding-content-item-widgets-to-pages-and-blocks) for more details.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Feature+HowTos/HowTo+-+Create+a+New+Custom+Content+Item/content-item-menu.png){height="" width=""}

***
To add the new content item to that list, in `src/Zed/ContentFooGui`, implement a new plugin using `\Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentGuiEditorPluginInterface`, e. g.  `ContentFooContentGuiEditorPlugin`.
You can find the method descriptions below:

* `getType()` returns a string displaying the content type, e.g. Foo.

* `getTemplates()` returns an array of templates supported by your Twig plugin created in the previous section. If there are no supported templates defined, returns an empty array.

* `getTwigFunctionTemplate()` returns a Twig expression that will be added into the content. 

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
                ->setName('Big Header'), // will be visible in UI.
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
