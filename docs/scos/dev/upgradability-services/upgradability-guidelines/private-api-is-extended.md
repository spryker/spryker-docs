---
title: Private API is extended
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

Modules have public and private APIs. While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API.

For more information about module APIs, see [Definition of Module API](/docs/scos/dev/architecture/module-api/definition-of-module-api.html).

## Code that causes an upgradability error: Extending a private API form class

`CustomerAccessForm` extends `Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm` from a private API.

```php
namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm as SprykerCustomerAccessForm;

class CustomerAccessForm extends SprykerCustomerAccessForm
{
...
}
```

## Related error in the Evaluator output: Extending a private API form class

```bash
------------------------------------------------------------------------------------
"Please avoid dependency: ""Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm" in "Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm""
------------------------------------------------------------------------------------
```

## Resolving the error: Extending a private API form class

To resolve the error provided in the example, try the following in the provided order:
1. Recommended: Extend the functionality using the [Configuration strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#configuration).
2. Recommended: Extend the functionality using the [Plug and Play strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play).
3. Recommended: Extend the functionality using the [Project Modules strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#project-modules).
4. Not recommended: Copy the private API core functionality to the project level and give it a unique name. For an example, see [Example of resolving the error by copying the form class to the project level](#example-of-resolving-the-error-by-copying-the-form-class-to-the-project-level)

## Example of resolving the error by copying the form class to the project level

```php
<?php
namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;

class PyzCustomerAccessForm extends AbstractType
{
    ...
}
```

## Code that causes an upgradability error: Extending a private API business model

`CustomerAccessFilter` extends `Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter` from a private API.

```php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter as SprykerCustomerAccessFilter;

class CustomerAccessFilter extends SprykerCustomerAccessFilter
{
    ...
}
```

## Related error in the Evaluator output: Extending a private API business model

```bash
------------------------------------------------------------------------------------
"PrivateApi:PrivateApiDependencyInBusinessModel: ""Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter" in "Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter""
------------------------------------------------------------------------------------
```

## Example of resolving the error by copying the business model to the project level

```php
<?php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

class PyzCustomerAccessFilter implements PyzCustomerAccessFilterInterface
{
    ...
}
```

## Code that causes an upgradability error: Extending a private API dependency provider

`CheckoutPageDependencyProvider` extends `Spryker\Yves\CheckoutPage\CheckoutPageDependencyProvider` from a private API.

```php
namespace Pyz\Yves\CheckoutPage;

use Spryker\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerCheckoutPageDependencyProvider
{
    /**
     * ...
     */
    protected function getCustomerStepHandler(): ...
    {
        ...
    }
}
```

## Related error in the Evaluator output: Extending a private API dependency provider

```bash
------------------------------------------------------------------------------------
"PrivateApi:MethodIsOverwritten: "Spryker\Yves\CheckoutPage\CheckoutPageDependencyProvider::getCustomerStepHandler" in "Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider""
------------------------------------------------------------------------------------
```

## Example of resolving the error by copying the dependency provider to the project level

```php
namespace Pyz\Yves\CheckoutPage;

use Spryker\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerCheckoutPageDependencyProvider
{
    /**
     * ...
     */
    protected function getPyzCustomerStepHandler(): ...
    {
        ...
    }
}
```
