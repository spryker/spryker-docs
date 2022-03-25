---
title: Private API class was extended or used
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

## Private API class was extended or used

Private API updates can break backward compatibility. Link for API's documentation - [see here]{link to "Private API class was extended or used" - private-api-class-extended-or-used.md#Private API class was extended or used}

The following core classes are exceptions, and you can use and extend them on the project level:

* All the classes from the modules:
    * Kernel
    * Bootstrap
    * Development

* Particular classes:
    * Facade
    * Factory
    * Entity manager
    * Repository
    * Dependency provider
    * Config
    * Configuration provider

#### Example of the code that can be reason of upgradability errors

`CustomerAccessForm` extends from `Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm` class from the core level.

```php
<?php

**
 * @method \Spryker\Zed\CustomerAccessGui\Communication\CustomerAccessGuiCommunicationFactory getFactory()
 */
class CustomerAccessForm extends SprykerCustomerAccessForm
{
    public const OPTION_CONTENT_TYPE_ACCESS_MANAGEABLE = 'OPTION_CONTENT_TYPE_ACCESS_MANAGEABLE';
    public const OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE = 'OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE';
    public const OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE_DATA = 'OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE_DATA';
...
}
```

#### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------
Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
"Please avoid dependency: Spryker\\Zed\\CustomerAccessGui\\Communication\\Form\\CustomerAccessForm in Pyz\\Zed\\CustomerAccessGui\\Communication\\Form\\CustomerAccessForm"
------------------------------------------------------------------------------------
```

#### Example of resolving this issue

To resolve this issue need to create new custom class and copy needed functionality that needed from the core's class
Do the following steps to resolve this issue:

1. Investigate if it is possible to extend functionality with configuration or plugins (link to "Configuration", "Plug and Play strategy" - https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play)
2. If it's impossible to extend functionality with plugins or configurations then introduce a custom class. For example, `src/Pyz/Zed/CustomerAccessGui/Communication/Form/PyzCustomerAccessForm.php`.
3. If you created new custom class then copy the needed functionality. For example, from `CustomerAccessForm` to `PyzCustomerAccessForm`.

<details open>
    <summary markdown='span'>Example of PyzCustomerAccessForm</summary>

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;

/**
 * @method \Spryker\Zed\CustomerAccessGui\Communication\CustomerAccessGuiCommunicationFactory getFactory()
 */
class PyzCustomerAccessForm extends AbstractType
{
    ...
}
```

</details>

4. Overwrite the `getCustomerAccessForm` method in `src/Pyz/Zed/CustomerAccessGui/Communication/CustomerAccessGuiCommunicationFactory.php`.
```php
public function getCustomerAccessForm(CustomerAccessTransfer $customerAccessTransfer, array $options)
{
    return $this->getFormFactory()->create(
        PyzCustomerAccessForm::class,
        $customerAccessTransfer,
        $options
    );
}
```
After replacing the core class with a custom one, re-evaluate the code. The same error shouldn't be returned.