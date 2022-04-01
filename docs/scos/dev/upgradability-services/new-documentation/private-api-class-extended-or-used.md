---
title: Private API class was extended or used
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

## Private API for Form class was extended or used

Updating or reusing the private api for a form class can lead to breaking backward compatibility after updating an extended core class.

#### Example of the usage of a Form that can be reason of upgradability errors

`CustomerAccessForm` extends from `Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm` class from the core level.

```php
<?php

/**
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

#### Example of resolving this usage issue

To resolve this issue the custom class need to not extends core's form. The functionality that need to be changes or adjusted can be modified or adjusted via plugins and changing configuration.
That is the most appropriate way to modify functionality that Spryker recommends.
More about this approach can be found here (link to "Configuration", "Plug and Play strategy" - https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play)
In case is the needed functionality can't be modified with the "Configuration", "Plug and Play strategy" strategies, needed functionality can be implemented via custom project modules with custom specific functionality.
More about this approach here {link to https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#project-modules}
In case if needed logic can't be implemented with the custom module the needed functionality also can be implemented via custom form that's copy needed functionality from the core's type.

<details open>
    <summary markdown='span'>Example of creating custom PyzCustomerAccessForm</summary>

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
After creating custom form it should be placed in the factory's method `getCustomerAccessForm` in `src/Pyz/Zed/CustomerAccessGui/Communication/CustomerAccessGuiCommunicationFactory.php`.
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
</details>


## Private API for business models class was extended or used

Updating or reusing the private api for a business module class can lead to breaking backward compatibility after updating an extended core class.

#### Example of the usage of a business module that can be reason of upgradability errors

```php
<?php

namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter as SprykerCustomerAccessFilter;

class CustomerAccessFilter extends SprykerCustomerAccessFilter
{
  /**
    * @var \Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface
    */
  protected $customerAccessReader;

  /**
    * @param \Pyz\Zed\CustomerAccess\CustomerAccessConfig $customerAccessConfig
    * @param \Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface $customerAccessReader
    */
  public function __construct(CustomerAccessConfig $customerAccessConfig, CustomerAccessReaderInterface $customerAccessReader)
  {
      $this->customerAccessReader = $customerAccessReader;
      $this->customerAccessConfig = $customerAccessConfig;
  }
    ...
}
```

#### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------------------------------------------
PrivateApi:PrivateApiDependencyInBusinessModel "Please avoid Spryker dependency: Spryker\\Zed\\CustomerAccess\\Business\\CustomerAccess\\CustomerAccessReaderInterface in Pyz\\Zed\\CustomerAccess\\Business\\CustomerAccess\\CustomerAccessFilter"
------------------------------------------------------------------------------------------------------------------------
```

#### Example of resolving this business module usage issue

{Input description of resolving after text reduction}


<details open>
    <summary markdown='span'>Example of creating custom business model PyzCustomerAccessFilter</summary>

```php
<?php

namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter as SprykerCustomerAccessFilter;

class PyzCustomerAccessFilter implements PyzCustomerAccessFilterInterface
{
  /**
    * @var \Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface
    */
  protected $customerAccessReader;

  /**
    * @param \Pyz\Zed\CustomerAccess\CustomerAccessConfig $customerAccessConfig
    * @param \Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface $customerAccessReader
    */
  public function __construct(CustomerAccessConfig $customerAccessConfig, CustomerAccessReaderInterface $customerAccessReader)
  {
      $this->customerAccessReader = $customerAccessReader;
      $this->customerAccessConfig = $customerAccessConfig;
  }
    ...
}
```
</details>

## Private API for dependency provider class was extended or used

Project level dependency provider should avoid to overrides core's methods

#### Example of overriding the dependency provider method that can be reason of upgradability errors

```php
<?php

namespace Pyz\Yves\CheckoutPage;

class CheckoutPageDependencyProvider {
    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginInterface
     */
    protected function getCustomerStepHandler(): StepHandlerPluginInterface
    {
        return new CustomerStepHandler();
    }
}
```

#### Example related error in the Evaluator output

```bash
------------------------------- ----------------------------------------------------------------------------------------------------
PrivateApi:MethodIsOverwritten Please avoid usage of core method SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider::getCustomerStepHandler() in the class Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider
------------------------------ ----------------------------------------------------------------------------------------------------
```

#### Example of solving this dependency provider issue

To resolve this issue the dependency provider's method should be renamed. Example of renaming method can be found here {link to unique-entity-name-not-unique.md#Making method names unique}

In this particular example the protected method will be renamed by adding project name prefix for the method name
```php
<?php

namespace Pyz\Yves\CheckoutPage;

class CheckoutPageDependencyProvider {
    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginInterface
     */
    protected function getPyzCustomerStepHandler(): StepHandlerPluginInterface
    {
        return new CustomerStepHandler();
    }
}
```
{% info_block infoBox "" %}

The one exception exist for the protected methods in dependency providers. That is methods that's returns array of plugins. These methods count as public api.

<details open>
 <summary markdown='span'>Example of the method</summary>

```php
    protected function getResourceCreatorPlugins(): array
    {
        return [
            new PageResourceCreatorPlugin(),
            new CatalogPageResourceCreatorPlugin(),
            ...
        ];
    }
```
</details>

{% endinfo_block %}

