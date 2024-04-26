---
title: Create a visibility condition for CMS Blocks
description: Visibility condition is a tool used to define particular pages in which the content of CMS block is displayed.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-create-a-visibility-condition-for-cms-blocks
originalArticleId: 0e3aef82-ebd1-4c7a-bb05-d0bf5cd54bd7
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-a-visibility-condition-for-cms-blocks.html
  - /docs/pbc/all/content-management-system/202311.0/tutorials-and-howtos/howto-create-a-visibility-condition-for-cms-blocks.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/tutorials-and-howtos/howto-create-a-visibility-condition-for-cms-blocks.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/tutorials-and-howtos/create-a-visibility-condition-for-cms-blocks.html
related:
  - title: Templates & Slots overview
    link: docs/scos/user/features/page.version/cms-feature-overview/templates-and-slots-overview.html
  - title: Managing slots
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/manage-slots.html
---

*Visibility Condition* is a [Templates & Slots](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html) feature functionality that lets you define when a CMS block is displayed on a page. The [Spryker CMS Blocks content provider](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html#spryker-cms-blocks) for slots has the following [visibility conditions](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html#visibility-conditions) by default:

* Category condition for the **Category** page.
* Product and category conditions for the product details page.
* CMS page condition for the **CMS** page.

Each page type has a dedicated template with several [slot widgets](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html#slot-widget). The visibility conditions of each template are defined in module configuration.

```php
namespace Pyz\Zed\CmsSlotBlock;

use Spryker\Zed\CmsSlotBlock\CmsSlotBlockConfig as SprykerCmsSlotBlockConfig;

class CmsSlotBlockConfig extends SprykerCmsSlotBlockConfig
{
    /**
     * @return string[][]
     */
    public function getTemplateConditionsAssignment(): array
    {
        return [
            '@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig' => [
                'category',
            ],
            '@ProductDetailPage/views/pdp/pdp.twig' => [
                'productCategory',
            ],
            '@Cms/templates/placeholders-title-content-slot/placeholders-title-content-slot.twig' => [
                'cms_page',
            ],
        ];
    }
}
```

As shown in the preceding example, the visibility condition configuration is an array, so you can have a combination of visibility conditions in a template. For example, the product details page template can have `productCategory` and `customer` visibility conditions. It means that the CMS block for which these conditions are defined  is only displayed when both of the defined conditions are fulfilled. In particular, the CMS block is displayed in the following cases:
* On the product details pages belonging to a defined categories and products.
* When the user login status is equal to the defined login status.
* When user account details are equal to the defined account details.

## Visibility condition for a template

To show the procedure, the following steps walk you through the creation of the `customer` visibility condition for the product details page template:

1. Assign the new condition to the template in `src/Pyz/Zed/CmsSlotBlock/CmsSlotBlockConfig.php`:

```php
    /**
     * @return string[][]
     */
    public function getTemplateConditionsAssignment(): array
    {
        return [
            '@ProductDetailPage/views/pdp/pdp.twig' => [
                'productCategory',
                'customer'
            ],
        ];
    }
```

1. From the properties available on the product details page, choose the properties to pass to the slot widget. For example, property values related to user account details (like `age` or `city`) can be fetched from the session.
   A slot widget with `idProductAbstract`, `isGuest`, `age`, and `city` properties looks as follows:

```twig
{% raw %}{%{% endraw %} cms_slot 'slt-key' required ['idProductAbstract'] with {
    idProductAbstract: data.product.idProductAbstract,
    isGuest: customer is null, {# user logged in or session is empty #}
    age: cutomer ?? customer.age,
    city: cutomer ?? customer.location.city,
} {% raw %}%}{% endraw %}
```

3. Insert it into the product details page template—`@ProductDetailPage/views/pdp/pdp.twig`.

4. Define new properties for `CmsSlotBlockConditionTransfer` and `CmsSlotParamsTransfer` in `src/Pyz/Shared/CmsSlotBlockCustomer/Transfer/cms_slot_block_customer.transfer.xml`:

```xml
<transfer name="CmsSlotParams">
    <property name="isGuest" type="bool"/>
    <property name="age" type="int"/>
    <property name="city" type="string"/>
</transfer>

<transfer name="CmsSlotBlockCondition">
    <property name="isGuest" type="bool"/>
    <property name="fromAge" type="int"/>
    <property name="toAge" type="int"/>
    <property name="city" type="string"/>
</transfer>
```

## Visibility condition form plugin for the Back Office

1. Implement the following plugin for the Back Office using `\Spryker\Zed\CmsSlotBlockGuiExtension\Communication\Plugin\CmsSlotBlockGuiConditionFormPluginInterface`:

<details><summary markdown='span'>CustomerSlotBlockConditionFormPlugin</summary>

```php
namespace Pyz\Zed\CmsSlotBlockCustomerGui\Communication\Plugin\CmsSlotBlockGui;

use Generated\Shared\Transfer\CmsSlotTemplateConfigurationTransfer;
use Spryker\Zed\CmsSlotBlockGuiExtension\Communication\Plugin\CmsSlotBlockGuiConditionFormPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * @method \Spryker\Zed\CmsSlotBlockCmsGui\Communication\CmsSlotBlockCmsGuiCommunicationFactory getFactory()
 * @method \Spryker\Zed\CmsSlotBlockCmsGui\CmsSlotBlockCmsGuiConfig getConfig()
 */
class CustomerSlotBlockConditionFormPlugin extends AbstractPlugin implements CmsSlotBlockGuiConditionFormPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CmsSlotTemplateConfigurationTransfer $cmsSlotTemplateConfigurationTransfer
     *
     * @return bool
     */
    public function isApplicable(CmsSlotTemplateConfigurationTransfer $cmsSlotTemplateConfigurationTransfer): bool
    {
        return in_array('customer', $cmsSlotTemplateConfigurationTransfer->getConditions(), true);
    }

    /**
     *
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return void
     */
    public function addConditionForm(FormBuilderInterface $builder): void
    {
        $customerSlotBlockConditionForm = $this->getFactory()->createCustomerConditionForm();
        $customerSlotBlockFormDataProvider = $this->getFactory()->createCustomerConditionFormDataProvider();
        $customerSlotBlockConditionForm->buildForm($builder, $customerSlotBlockFormDataProvider->getOptions());
    }
}
```
</details>

2. Put `CustomerSlotBlockConditionFormPlugin` into the `src/Pyz/Zed/CmsSlotBlockCustomerGui` module.

3. Create `CustomerSlotBlockConditionForm`. It is a regular Symfony Form class that implements `\Symfony\Component\Form\FormBuilderInterface`. For details, see the following:
   * [Forms](https://symfony.com/doc/current/forms.html) for more information about Symfony forms.
   * [Creating Forms](/docs/dg/dev/backend-development/forms/create-forms.html) to learn about form creation procedure in Spryker.
   * A form example in `\Spryker\Zed\CmsSlotBlockProductCategoryGui\Communication\Form\ProductCategorySlotBlockConditionForm`.

{% info_block errorBox %}

The name of the first form element must correspond to the condition name you create. In this case, it looks like `$builder->add('customer', FormType::class)`.

Child form elements can have any names and subsequent child form elements.

{% endinfo_block %}

In this case, the created form has five elements:
* `customer` parent form with four children:
    * `isGuest` radio button.
    * `fromAge` numeric input field.
    * `toAge` numeric input field.
    * `city` dropdown with the city list fetched from database.

```php
/**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('customer', FormType::class, [
            'label' => false,
            'error_mapping' => [
                '.' => static::FIELD_ALL,
            ]
          ]);

         $builder->get('customer')->add('isGuest', ChoiceType::class, [
            'choices' => ['For logged-in Users' => false, 'For Guests' => true],
            'multiple' => false,
         ]);

         $builder->get('customer')->add('fromAge', IntegerType::class);
         $builder->get('customer')->add('toAge', IntegerType::class);
         $builder->get('customer')->add('city', Select2ComboBoxType::class, [
            'choices' => $options['city_list'], // from CustomerSlotBlockFormDataProvider
          ]);
    }
```

4. Add the new plugin to the `\Pyz\Zed\CmsSlotBlockGui\CmsSlotBlockGuiDependencyProvider::getCmsSlotBlockFormPlugins()` plugin list in `CustomerSlotBlockConditionFormPlugin`.

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Content Management&nbsp;<span aria-label="and then">></span> Slots**.
2. For **List of Templates**, select a product details page template.
3. In the **List of Slots for *`{name}`* Template**, Select a slot .
4. Add or choose one CMS block in the **List of Blocks for the *`{name}`*** slot.

    {% info_block infoBox %}

    You must be able to see a rendered form of the customer visibility condition.

    {% endinfo_block %}

5. Select any visibility conditions and take note of them.
6. Click **Save**.
7. In the database, check the last added rows in the `spy_cms_slot_block.conditions` and `spy_cms_slot_block_storage.data` columns.

{% info_block infoBox %}

`spy_cms_slot_block.conditions` and `spy_cms_slot_block_storage.data` must contain the customer condition data that you have set in the Back Office.

{% endinfo_block %}

{% endinfo_block %}

## Visibility condition resolver plugin for a slot widget

1. Implement the following plugin using `\Spryker\Client\CmsSlotBlockExtension\Dependency\Plugin\CmsSlotBlockVisibilityResolverPluginInterface`:

<details><summary markdown='span'>CustomerSlotBlockConditionResolverPlugin</summary>

```php

namespace Pyz\Client\CmsSlotBlockCustomer\Plugin\CmsSlotBlock;

use Generated\Shared\Transfer\CmsSlotBlockTransfer;
use Generated\Shared\Transfer\CmsSlotParamsTransfer;
use Spryker\Client\CmsSlotBlockExtension\Dependency\Plugin\CmsSlotBlockVisibilityResolverPluginInterface;
use Spryker\Client\Kernel\AbstractPlugin;

class CustomerSlotBlockConditionResolverPlugin extends AbstractPlugin implements CmsSlotBlockVisibilityResolverPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CmsSlotBlockTransfer $cmsSlotBlockTransfer
     *
     * @return bool
     */
    public function isApplicable(CmsSlotBlockTransfer $cmsSlotBlockTransfer): bool
    {
        return $cmsSlotBlockTransfer->getConditions()
            ->offsetExists('customer');
    }

    /**
     * @param \Generated\Shared\Transfer\CmsSlotBlockTransfer $cmsSlotBlockTransfer
     * @param \Generated\Shared\Transfer\CmsSlotParamsTransfer $cmsSlotParamsTransfer
     *
     * @return bool
     */
    public function isCmsBlockVisibleInSlot(
        CmsSlotBlockTransfer $cmsSlotBlockTransfer,
        CmsSlotParamsTransfer $cmsSlotParamsTransfer
    ): bool {
        /** @var \Generated\Shared\Transfer\CmsSlotBlockConditionTransfer $cmsSlotBlockConditionTransfer */
        $cmsSlotBlockConditionTransfer = $cmsSlotBlockTransfer->getConditions()
            ->offsetGet('customer');

        if ($cmsSlotBlockConditionTransfer->getIsGuest() && $cmsSlotParamsTransfer->getIsGuest()) {
            return true;
        }

        $isBlockVisible = false;
        if ($cmsSlotParamsTransfer->getAge()) {
            $age = $cmsSlotParamsTransfer->getAge();
            if ($cmsSlotBlockConditionTransfer->getFromAge() && $age < $cmsSlotBlockConditionTransfer->getFromAge()) {
                return false;
            }

            if ($cmsSlotBlockConditionTransfer->getToAge() && $age > $cmsSlotBlockConditionTransfer->getToAge()) {
                return false;
            }

            $isBlockVisible = true;
        }

        if ($cmsSlotParamsTransfer->getCity()) {
            if (
              $cmsSlotBlockConditionTransfer->getCity()
              && $cmsSlotParamsTransfer->getCity() !== $cmsSlotBlockConditionTransfer->getCity()
            ) {
                return false;
            }
        }

        return $isBlockVisible;
    }
}
```

</details>

2. Insert it into the `src/Pyz/Client/CmsSlotBlockCustomer` module.

3. Enable `CustomerSlotBlockConditionResolverPlugin` in `\Pyz\Client\CmsSlotBlock\CmsSlotBlockDependencyProvider::getCmsSlotBlockVisibilityResolverPlugins()` .

{% info_block warningBox "Verification" %}

On the Storefront, open the product details page that contains the CMS block for which you have selected the visibility conditions.
* Make sure that you fulfill the visibility conditions and see the CMS block content.
* Make sure that you do not fulfill the visibility conditions and do not see the CMS block content.

For example, you can select and check the content against the following visibility conditions:
* Login status
* Location
* Age

{% endinfo_block %}
