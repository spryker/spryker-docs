---
title: Private API was extended
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

## Private API was extended

Modules have public and private APIs. More information you can get here - https://docs.spryker.com/docs/scos/dev/architecture/module-api/definition-of-module-api.html

{% info_block infoBox "" %}
While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API.
{% endinfo_block %}

#### Example 1 of code that causes the upgradability error

For example, updating or reusing the private api for a form class can lead to breaking backward compatibility after Spryker update.

`CustomerAccessForm` extends `Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm`. It is a private API.

```php
namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm as SprykerCustomerAccessForm;

class CustomerAccessForm extends SprykerCustomerAccessForm
{
...
}
```

#### Example 1 of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------
"Please avoid dependency: "{name}" in "{name}""
------------------------------------------------------------------------------------
```

#### Solution to resolve the issue

To resolve the error provided in the example, do the following steps:
1. [Recommended] Check if it is possible to extend functionality with "Configuration" strategy (link to "Configuration" - https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#configuration)
2. [Recommended] Check if it is possible to extend functionality with "Plug and Play" strategy (link to "Plug and Play" - https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play)
3. [Recommended] Check if it is possible to extend functionality with "Project Modules" strategy (link to "Project Modules") - https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#project-modules
4. [Not Recommended] Copy the private API core functionality on the project level. Do not extend from the Private API.

{% info_block infoBox "" %}
Meanwhile, we are working on introducing a way to report such cases and add more extension points in the core.
{% endinfo_block %}

{% info_block infoBox "" %}
To make your code unique you can use prefixes. F.e. "Pyz" or {Project_mane}
{% endinfo_block %}

#### Example 1 to resolve the Evaluator check error
```php
<?php
namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;

class PyzCustomerAccessForm extends AbstractType
{
    ...
}
```

#### Example 2 of code that causes the upgradability error

Extending the private api for a business model.

```php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter as SprykerCustomerAccessFilter;

class CustomerAccessFilter extends SprykerCustomerAccessFilter
{
    ...
}
```

#### Example 2 of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------
"PrivateApi:PrivateApiDependencyInBusinessModel: "{name}" in "{name}""
------------------------------------------------------------------------------------
```

#### Example 2 to resolve the Evaluator check error
```php
<?php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

class PyzCustomerAccessFilter implements PyzCustomerAccessFilterInterface
{
    ...
}
```

#### Example 3 of code that causes the upgradability error

Extending a Private API for a dependency provider.

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

#### Example 3 of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------
"PrivateApi:MethodIsOverwritten: "{name}" in "{name}""
------------------------------------------------------------------------------------
```

#### Example 3 to resolve the Evaluator check error

To resolve this issue the dependency provider's method should be renamed. 

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
{% info_block infoBox "" %}

Public API in Dependency provider.
The one exception exist for the protected methods in dependency providers. 
That is methods that's returns array of plugins.

<details open>
 <summary markdown='span'>Public API in Dependency Provider</summary>

```php
    protected function getResourceCreatorPlugins(): array
    {
        return [];
    }
```
</details>

{% endinfo_block %}

