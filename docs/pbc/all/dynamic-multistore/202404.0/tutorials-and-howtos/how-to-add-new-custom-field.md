---
title: How to add a new custom field to store settings
description: This guide shows how to add custom field contact email for store settings.
last_updated: Jun 5, 2024
template: howto-guide-template
---

This document describes how to add a  custom contact email field in store settings. 
Let's add a new field `contactEmail` to `StoreContextApplicationTransfer` and configure the timezone for each application in the store.


## Adjust StoreContextApplicationTransfer to add a new field

Add new field `contactEmail` to `StoreContextApplicationTransfer`:

**src/Pyz/Shared/StoreContext/Transfer/store_context.transfer.xml**
```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="StoreApplicationContext" strict="true">
        <property name="contactEmail" type="string"/>
    </transfer>
</transfers>

```

## Added specific validation rules for the new field

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
Also, add new rule to the validator via extending `StoreContextBusinessFactory`

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


## Extend StoreContextFormExpander

To adjust the form in the Back Office, we need to extend `StoreContextFormExpander` and add a new field to the form.

First, need to extend `StoreContextForm` and add new field to the form.

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
                'label' => 'Email',
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

Next step is to extend `StoreContextCollectionForm` and use new `StoreContextForm` in the `StoreContextCollectionForm`.

*src/Pyz/Zed/StoreContextGui/Communication/Form/StoreContextCollectionForm.php*

```php
<?php

namespace Pyz\Zed\StoreContextGui\Communication\Form;

use Pyz\Zed\StoreContextGui\Communication\Form\StoreContextForm;
use Spryker\Zed\StoreContextGui\Communication\Form\StoreContextCollectionForm as SprykerStoreContextCollectionForm;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;

class StoreContextCollectionForm extends SprykerStoreContextCollectionForm
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array<string, mixed> $options
     *
     * @return void
     */
    protected function addStoreContextForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add(static::FORM_STORE_CONTEXT, CollectionType::class, [
            'entry_type' => StoreContextForm::class,
            'entry_options' => [
                static::OPTION_TIMEZONES => $options[static::OPTION_TIMEZONES],
                static::OPTION_APPLICATIONS => $options[static::OPTION_APPLICATIONS],
            ],
            'label' => false,
            'allow_add' => true,
            'allow_delete' => true,
            'prototype' => true,
            'prototype_name' => '__store_context__',
        ]);
    }
}

```

Finally, extend `StoreContextFormExpander` and use new `StoreContextCollectionForm` in the `StoreContextFormExpander`.

*src/Pyz/Zed/StoreContextGui/Communication/Expander/StoreContextFormExpander.php*

```php

namespace Pyz\Zed\StoreContextGui\Communication\Expander;

use Generated\Shared\Transfer\StoreTransfer;
use Spryker\Zed\StoreContextGui\Communication\Expander\StoreContextFormExpander as SprykerStoreContextFormExpander;
use Pyz\Zed\StoreContextGui\Communication\Form\StoreContextCollectionForm;
use Symfony\Component\Form\FormBuilderInterface;

class StoreContextFormExpander extends SprykerStoreContextFormExpander
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param \Generated\Shared\Transfer\StoreTransfer $storeTransfer
     *
     * @return \Symfony\Component\Form\FormBuilderInterface
     */
    public function expand(FormBuilderInterface $builder, StoreTransfer $storeTransfer): FormBuilderInterface
    {
        $builder->add(
            static::FIELD_APPLICATION_CONTEXT_COLLECTION,
            StoreContextCollectionForm::class,
            $this->getOptions(),
        );

        return $builder;
    }
}
```

*src/Pyz/Zed/StoreContextGui/Communication/StoreContextGuiCommunicationFactory.php*

```php

namespace Pyz\Zed\StoreContextGui\Communication;

use Pyz\Zed\StoreContextGui\Communication\Expander\StoreContextFormExpander;
use Spryker\Zed\StoreContextGui\Communication\Expander\StoreContextFormExpanderInterface;
use Spryker\Zed\StoreContextGui\Communication\StoreContextGuiCommunicationFactory as SprykerStoreContextGuiCommunicationFactory;

class StoreContextGuiCommunicationFactory extends SprykerStoreContextGuiCommunicationFactory
{
    /**
     * @return \Spryker\Zed\StoreContextGui\Communication\Expander\StoreContextFormExpanderInterface
     */
    public function createStoreContextFormExpander(): StoreContextFormExpanderInterface
    {
        return new StoreContextFormExpander(
            $this->createStoreContextFormDataProvider(),
        );
    }
}
```

## Setup and configure the store settings in the Back Office

1. In the Back Office, go to **Administration**.
2. On the **Stores** page choice store and click **Edit store**.
3. In the **Edit store** page, go to the **Settings** tab.
4. In the **Settings** tab, find the new field **Contact Email**.

![configure-application-timezone](/images/dynamic-multistore/screen2.png)

Each store must be have one default application block.

5. Click **Save** to save the changes.


## How extract new field value from StoreTransfer

This is simple example how to extract the new field `contactEmail` value from `StoreTransfer` in the project.

```php

// .... 

function extractContactEmail(StoreTransfer $storeTransfer): ?string
{

    foreach ($storeTransfer->getApplicationContextCollectionOrFail()->getApplicationContexts() as $storeApplicationContextTransfer) {
        if ($storeApplicationContextTransfer->getApplication() === APPLICATION && $storeApplicationContextTransfer->getContactEmail() !== null) {
            return $storeApplicationContextTransfer->getContactEmail();
        }

        if ($storeApplicationContextTransfer->getApplication() === null) {
           return $storeApplicationContextTransfer->getContactEmail();
      }
    }
}

// ....

```
