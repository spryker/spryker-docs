---
title: How to create custome Data Exchange API constraint validators. 
description: This document describes how to create custom Data Exchange API constraint validators.
last_updated: Aug 5, 2024
template: howto-guide-template
---


## Prerequisites  

* [Install the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api.html)
* [Configure the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/configure-data-exchange-api.html)
* [Sending requests with Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/sending-requests-with-data-exchange-api.md)


## Create a new constraint validator

For some specific requirements, you may need to create custom constraint validators. 
For implementing custom constraint validators, you need to create a new class that implements the `ConstraintInterface` interface.
Interface `ConstraintInterface` has three methods: `isApplicable`, `isValid`, and `getErrorMessage`.

Methods:
* `isApplicable` - checks if the constraint is applicable to the field.
* `isValid` - checks if the field value is valid. Method should return `true` if the field value is valid, otherwise `false`.
* `getErrorMessage` - returns the error message key for the constraint.


### Implement the `ConstraintInterface` interface

**Code sample:**

`src/Pyz/Zed/DynamicEntity/Business/Validator/Field/Completeness/Constraint/CustomFieldConstraint.php`
```php
<?php

namespace Pyz\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint;

use Generated\Shared\Transfer\DynamicEntityFieldDefinitionTransfer;
use Generated\Shared\Transfer\DynamicEntityTransfer;
use Spryker\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint\ConstraintInterface;

class CustomFieldConstraint implements ConstraintInterface
{
    /**
     * @var string
     */
    protected const APPLICABLE_FIELD_NAME = 'custome_field_name';

    /**
     * @var string
     */
    protected const GLOSSARY_KEY_INVALID_KEY = 'dynamic_entity.validation.invalid_key';

    /**
     * @param string $constraintName
     *
     * @return bool
     */
    public function isApplicable(string $constraintName): bool
    {
        return $constraintName === static::APPLICABLE_FIELD_NAME;
    }

    /**
     * @param \Generated\Shared\Transfer\DynamicEntityTransfer $dynamicEntityTransfer
     * @param \Generated\Shared\Transfer\DynamicEntityFieldDefinitionTransfer $fieldDefinitionTransfer
     *
     * @return bool
     */
    public function isValid(DynamicEntityTransfer $dynamicEntityTransfer, DynamicEntityFieldDefinitionTransfer $fieldDefinitionTransfer): bool
    {
        // Add your validation logic here...

        return true;
    }

    /**
     * @return string
     */
    public function getErrorMessage(): string
    {
        return static::GLOSSARY_KEY_INVALID_KEY;
    }
}

```

After creating the custom constraint validator, you need to add it to the `DynamicEntityBusinessFactory` class and merge it with the existing constraints.

`src/Pyz/Zed/DynamicEntity/Business/DynamicEntityBusinessFactory.php`
```php
<?php

namespace Pyz\Zed\DynamicEntity\Business;

use Pyz\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint\CustomFieldConstraint;
use Spryker\Zed\DynamicEntity\Business\DynamicEntityBusinessFactory as SprykerDynamicEntityBusinessFactory;
use Spryker\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint\ConstraintInterface;

class DynamicEntityBusinessFactory extends SprykerDynamicEntityBusinessFactory
{
    /**
     * @return array<\Spryker\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint\ConstraintInterface>
     */
    public function getFieldsValidationConstraints(): array
    {
        return parent::getFieldsValidationConstraints() + [
            $this->createCustomFieldConstraint(),
        ];
    }

    /**
     * @return \Spryker\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint\ConstraintInterface
     */
    public function createCustomFieldConstraint(): ConstraintInterface
    {
        return new CustomFieldConstraint();
    }
}
```
