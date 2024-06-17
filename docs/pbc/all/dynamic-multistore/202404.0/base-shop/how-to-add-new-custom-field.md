---
title: Add Back Office form fields to store settings
description: This guide shows how to add custom field contact email for store settings.
last_updated: Jun 5, 2024
template: howto-guide-template
---


This document explains how to add a contact email field in the store settings.

## Add a contact email field to the Back Office

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

**src/Pyz/Zed/StoreContext/Business/StoreContextBusinessFactory.php**

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


4. To adjust the form in the Back Office, extend `StoreContextForm` and add the `contactEmail` field:

**src/Pyz/Zed/StoreContextGui/Communication/Form/StoreContextForm.php**

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

6. Replace `StoreContextForm` in the extended `StoreContextGuiCommunicationFactory`:

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
The new field should now be available in the Back Office.


## Set up and configure the store settings in the Back Office

1. In the Back Office, go to **Administration**.
2. On the **Stores** page choice store and click **Edit store**.
3. In the **Edit store** page, go to the **Settings** tab.
4. In the **Settings** tab, find the new field **Contact Email**.

![configure-application-timezone](/images/dynamic-multistore/screen2.png)

Each store must be have one default application block.

5. Click **Save** to save the changes.


## Example how extend StoreTransfer to extract the new field via Plugin

Adjust `StoreTransfer` to add new field `contactEmail`:

**src/Pyz/Shared/StoreContextStorage/Transfer/store_context_storage.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="Store">
        <property name="contactEmail" type="string"/>
    </transfer>
</transfers>


```

And implement the plugin to expand `StoreTransfer`:

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

And register the plugin in the `StoreDependencyProvider`:

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

Now you can use the new field `contactEmail` in the StoreTransfer.
