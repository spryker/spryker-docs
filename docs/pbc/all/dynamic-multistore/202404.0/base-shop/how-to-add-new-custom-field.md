---
title: Add fields to Back Office forms
description: This guide shows how to add custom field contact email for store settings.
last_updated: Jun 5, 2024
template: howto-guide-template
---

This document explains how to add fields to Back Office forms.

## Add a contact email field to the store settings in the Back Office

To add the `contactEmail` field to `StoreContextApplicationTransfer` and configure it for each application in the store, follow the steps:

1. Add the field to `StoreContextApplicationTransfer`:

**src/Pyz/Shared/StoreContext/Transfer/store_context.transfer.xml**
```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="StoreApplicationContext" strict="true">
        <property name="contactEmail" type="string"/>
    </transfer>
</transfers>

```

2. Add validation rules for the field:

**src/Pyz/Zed/StoreContext/Business/Validator/Rule/СontactEmailRule.php**

```php

namespace Pyz\Zed\StoreContext\Business\Validator\Rule;

use Generated\Shared\Transfer\StoreContextTransfer;
use Spryker\Zed\StoreContext\Business\Validator\Rule\StoreContextValidatorRuleInterface;

class СontactEmailRule implements StoreContextValidatorRuleInterface
{
    /**
     * @param \Generated\Shared\Transfer\StoreContextTransfer $storeContextTransfer
     *
     * @return array<\Generated\Shared\Transfer\ErrorTransfer>
     */
    public function validateStoreContext(StoreContextTransfer $storeContextTransfer): array
    {
        $storeApplicationContextTransfers = $storeContextTransfer->getApplicationContextCollectionOrFail()->getApplicationContexts();

        foreach ($storeApplicationContextTransfers as $storeApplicationContextTransfer) {
            $contactEmail = $storeApplicationContextTransfer->getContactEmail();

            if ($contactEmail === null) {
                continue;
            }

            // Add your custom validation logic here
        }

        return [];
    }
}

```
3. Add a rule to the validator by extending `StoreContextBusinessFactory`:

<details>
<summary>src/Pyz/Zed/StoreContext/Business/StoreContextBusinessFactory.php</summary>

```php
namespace Pyz\Zed\StoreContext\Business;

use Pyz\Zed\StoreContext\Business\Validator\Rule\СontactEmailRule;
use Spryker\Zed\StoreContext\Business\StoreContextBusinessFactory as SprykerStoreContextBusinessFactory;
use Spryker\Zed\StoreContext\Business\Validator\Rule\StoreContextValidatorRuleInterface;

class StoreContextBusinessFactory extends SprykerStoreContextBusinessFactory
{
    /**
     * @return \Spryker\Zed\StoreContext\Business\Validator\Rule\StoreContextValidatorRuleInterface
     */
    public function createСontactEmailRule(): StoreContextValidatorRuleInterface
    {
        return new СontactEmailRule();
    }

    /**
     * @return array<\Spryker\Zed\StoreContext\Business\Validator\Rule\StoreContextValidatorRuleInterface>
     */
    public function getDefaultValidatorRules(): array
    {
        $rules = parent::getDefaultValidatorRules();

        $rules[] = $this->createСontactEmailRule();

        return $rules;
    }

    /**
     * @return array<\Spryker\Zed\StoreContext\Business\Validator\Rule\StoreContextValidatorRuleInterface>
     */
    public function getCreateValidatorRules(): array
    {
        $rules = parent::getDefaultValidatorRules();

        $rules[] = $this->createСontactEmailRule();

        return $rules;
    }

    /**
     * @return array<\Spryker\Zed\StoreContext\Business\Validator\Rule\StoreContextValidatorRuleInterface>
     */
    public function getUpdateValidatorRules(): array
    {
        $rules = parent::getDefaultValidatorRules();

        $rules[] = $this->createСontactEmailRule();

        return $rules;
    }
}
```

</details>


4. Extend the `StoreContextForm` form with the `contactEmail` field:

<details>
<summary>src/Pyz/Zed/StoreContextGui/Communication/Form/StoreContextForm.php</summary>

```php

namespace Pyz\Zed\StoreContextGui\Communication\Form;

use Spryker\Zed\StoreContextGui\Communication\Form\StoreContextForm as SprykerStoreContextForm;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

class StoreContextForm extends SprykerStoreContextForm
{
    /**
     * @var string
     */
    protected const FIELD_SUPPORT_CONTACT_EMAIL = 'contactEmail';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array<string, mixed> $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        parent::buildForm($builder, $options);

        $this->addContactEmailField($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array<string, mixed> $options
     *
     * @return \Spryker\Zed\StoreContextGui\Communication\Form\StoreContextForm
     */
    protected function addContactEmailField(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add(static::FIELD_SUPPORT_CONTACT_EMAIL, EmailType::class, [
                'label' => 'Contact Email',
                'constraints' => $this->createEmailConstraints(),
            ]);

        return $this;
    }

    /**
     * @return array
     */
    protected function createEmailConstraints(): array
    {
        return  [
            new Email(),
        ];
    }
}

```

</details>

6. Use `StoreContextForm` , which is extended with the field, in the extended `StoreContextGuiCommunicationFactory` class:

*src/Pyz/Zed/StoreContextGui/Communication/StoreContextGuiCommunicationFactory.php*

```php

namespace Pyz\Zed\StoreContextGui\Communication;

use Pyz\Zed\StoreContextGui\Communication\Form\StoreContextForm;
use Spryker\Zed\StoreContextGui\Communication\StoreContextGuiCommunicationFactory as SprykerStoreContextGuiCommunicationFactory;

class StoreContextGuiCommunicationFactory extends SprykerStoreContextGuiCommunicationFactory
{
    /**
     * @return string
     */
    public function getStoreContextFormClass(): string
    {
        return StoreContextForm::class;
    }
}
```


{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Administration**>**Stores**.
2. On the **Stores** page, click **Edit store** next to a store.
3. On the **Edit store** page, click the **Settings** tab.
In the **Settings** tab, make sure the following applies:
  * The default block with the **APPLICATION** value set to **Default** is displayed.
  * The new **Contact Email** field is displayed, Please see the screenshot below for reference.
  * The **Contact Email** field is required and accepts only valid email addresses.
4. Click **Save** to save the changes and validate whether the new field is saved correctly.

![configure-application-timezone](/images/dynamic-multistore/screen2.png)


{% endinfo_block %}



## Extend StoreTransfer

This section explains how to extend StoreTransfer and extract a field using a plugin for access to the `contactEmail` field directly from the `StoreTransfer`. The contact email field is used as an example.

1. Adjust `StoreTransfer` to add the `contactEmail` field:

**src/Pyz/Shared/StoreContextStorage/Transfer/store_context_storage.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="Store">
        <property name="contactEmail" type="string"/>
    </transfer>
</transfers>


```

2. To expand `StoreTransfer`, implement the following plugin:

**src/Pyz/Client/StoreContextStorage/Plugin/Store/ContactEmailStoreStorageStoreExpanderPlugin.php**

```php
namespace Pyz\Client\StoreContextStorage\Plugin\Store;

use Generated\Shared\Transfer\StoreTransfer;
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\StoreExtension\Dependency\Plugin\StoreExpanderPluginInterface;

class ContactEmailStoreStorageStoreExpanderPlugin  extends AbstractPlugin implements StoreExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\StoreTransfer $storeTransfer
     *
     * @return \Generated\Shared\Transfer\StoreTransfer
     */
    public function expand(StoreTransfer $storeTransfer): StoreTransfer
    {
        if ($storeTransfer->getApplicationContextCollection() === null) {
            return $storeTransfer;
        }

        foreach ($storeTransfer->getApplicationContextCollectionOrFail()->getApplicationContexts() as $storeApplicationContextTransfer) {
            if ($storeApplicationContextTransfer->getApplication() === APPLICATION && $storeApplicationContextTransfer->getContactEmail() !== null) {
                return $storeTransfer->setContactEmail($storeApplicationContextTransfer->getContactEmail());
            }

            if ($storeApplicationContextTransfer->getApplication() === null) {
                $storeTransfer->setContactEmail($storeApplicationContextTransfer->getContactEmail());
            }
        }

        return $storeTransfer;
    }
}


```

3. Register the plugin in `StoreDependencyProvider`:

**src/Pyz/Client/Store/StoreDependencyProvider.php**

```php
namespace Pyz\Client\Store;

use Pyz\Client\StoreContextStorage\Plugin\Store\ContactEmailStoreStorageStoreExpanderPlugin;
use Spryker\Client\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Client\StoreExtension\Dependency\Plugin\StoreExpanderPluginInterface>
     */
    protected function getStoreExpanderPlugins(): array
    {
        return [
            new ContactEmailStoreStorageStoreExpanderPlugin(),
        ];
    }
}

```

Now you can use the `contactEmail` field in `StoreTransfer`.
