---
title: Private API is extended
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
related:
  - title: Upgradability guidelines
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html
  - title: Entity name is not unique
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/entity-name-is-not-unique.html
  - title: Private API is used on the project level
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-used-on-the-project-level.html
  - title: Private API method is overridden on the project level
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-method-is-overridden-on-the-project-level.html
---

[Private API is extended](/docs/scos/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html). Private API entities shouldn't be extended on the project side. This will allow you to improve the process of semi-automated delivery of Spryker module updates.

Modules have public and private APIs. While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API.

For more information about module APIs, see [Definition of Module API](/docs/scos/dev/architecture/module-api/definition-of-module-api.html).

## Example of code that causes an upgradability error: Extending a private API form class

`CustomerAccessForm` extends `Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm` from a private API.

```php
namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm as SprykerCustomerAccessForm;

class CustomerAccessForm extends SprykerCustomerAccessForm
{
...
}
```

### Related error in the Evaluator output: Extending a private API form class

```bash
------------------------------------------------------------------------------------
Please avoid extension of the PrivateApi Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm in Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
------------------------------------------------------------------------------------
```

### Resolving the error: Extending a private API form class

To resolve the error provided in the example, try the following in the provided order:
1. Recommended: Extend the functionality using the [Configuration strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#configuration).
2. Recommended: Extend the functionality using the [Plug and Play strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play).
3. Recommended: Extend the functionality using the [Project Modules strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#project-modules).
4. Not recommended: Copy the functionality from the core to the project level:
    1. Register the missing extension point in [Spryker Ideas](https://spryker.ideas.aha.io/), so we add it in future.
    2. Copy the private API core functionality to the project level and give it a unique name. For an example, see [Example of resolving the error by copying the form class to the project level](#example-of-resolving-the-error-by-copying-the-form-class-to-the-project-level).
    3. As soon as the extension point in core is released, refactor the code added in step 4.2 using the strategies in steps 1-3.
        While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.


### Example of resolving the error by copying the form class to the project level

```php
<?php
namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;

class PyzCustomerAccessForm extends AbstractType
{
    ...
}
```

After the fix re-evaluate the code. The same error shouldn’t be returned.


## Example of code that causes an upgradability error: Extending a private API business model

`CustomerAccessFilter` extends `Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter` from a private API.

```php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter as SprykerCustomerAccessFilter;

class CustomerAccessFilter extends SprykerCustomerAccessFilter
{
    ...
}
```

### Related error in the Evaluator output: Extending a private API business model

```bash
------------------------------------------------------------------------------------
Please avoid extension of the PrivateApi Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter in Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter
------------------------------------------------------------------------------------
```

### Example of resolving the error by copying the business model to the project level

```php
<?php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

class PyzCustomerAccessFilter implements PyzCustomerAccessFilterInterface
{
    ...
}
```

### Example of code that causes an upgradability error: Extending a private API Bridge

```php
namespace Pyz\Zed\PriceProduct\Dependency\Facade;

use Spryker\Zed\PriceProduct\Dependency\Facade\PriceProductToProductFacadeBridge as SprykerPriceProductToProductFacadeBridge;

class PriceProductToProductFacadeBridge extends SprykerPriceProductToProductFacadeBridge implements PriceProductToProductFacadeInterface
{
    ...
}
```

### Related error in the Evaluator output: Extending a private API Bridge


```bash
------------------------------------------------------------------------------------
Please avoid extension of the PrivateApi Spryker\Zed\PriceProduct\Dependency\Facade\PriceProductToProductFacadeBridge in Pyz\Zed\PriceProduct\Dependency\Facade\PriceProductToProductFacadeBridge
------------------------------------------------------------------------------------
```

### Example of resolving the error: Extending a private API Bridge
Remove the Bridge.

