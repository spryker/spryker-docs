---
title: A facade implementation
description: Implement a facade in Business Layer to streamline interactions between modules. This guide explains best practices for creating a centralized API for module communication.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/implementing-facade
originalArticleId: 7a2cbc0a-f4d6-422a-8481-b385e6bfaf4d
redirect_from:
  - /docs/scos/dev/back-end-development/zed/business-layer/facade/a-facade-implementation.html
related:
  - title: Facade
    link: docs/dg/dev/backend-development/zed/business-layer/facade/facade.html
  - title: Facade use cases
    link: docs/dg/dev/backend-development/zed/business-layer/facade/facade-use-cases.html
  - title: Design by Contract (DBC) - Facade
    link: docs/dg/dev/backend-development/zed/business-layer/facade/design-by-contract-dbc-facade.html
---

## AbstractFacade

Every facade extends `Spryker\Zed\Kernel\Business\AbstractFacade`, which provides an important method:

| METHOD  | PURPOSE  |
| --- | --- |
| $this->getFactory() | Returns the factory needed to access the underlying models. |

## Methods

Inside a facade, the methods tell a story about the module. They expose the module's functions and delegate calls to internal models. A typical method looks like this:

```php
<?php
class GlossaryFacade extends AbstractFacade
{
    /**
     * @param string $keyName
     * @return bool
     */
    public function deleteKey($keyName)
    {
        $keyManager = $this->getFactory()->createKeyManager();
        return $keyManager->deleteKey($keyName);
    {% raw %}}}{% endraw %}
```

When you look at the `deleteKey()` method, observe the following:

* The method's name expresses exactly what happens. It uses the terms of the related terminology, but it is easy to grasp what happens ("A key is deleted").
* The method does not contain any control logic, like `if` or `foreach` statements; it just delegates to the business model and calls the right method.
* The business model KeyManager is created using the factory, so it does not need to know how the class is created.

## Parameters and return values

The main idea of the facade is to hide the implementation details. Typical return values of facade methods are the following:
* Native types (bool, int, float, string, array)
* Transfer objects

To hide and protect the underlying models and data structure, business models, or any propel entities and queries are never returned.

## Transfer objects

Each module ships with its own interface for each transfer object that is used. Transfer objects are much more descriptive compared to arrays.

```php
<?php
class GlossaryFacade extends AbstractFacade
{
    /**
     * @param CmsGlossaryTransfer $transferTranslation
     * @return CmsGlossaryTransfer
     */
    public function saveTranslation(CmsGlossaryTransfer $translationTransfer)
    {
        $translationManager = $this->getFactory()->createTranslationManager();
        return $translationManager->saveTranslation($translationTransfer);
    }
}
```

## Encapsulation

The idea of the `Business` layer is to present a facade to all clients and hide the internal details. This is the main requirement for future updates, and it keeps the bundles decoupled. So when you look at a module from another module, you only see the facade.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Zed/Business+Layer/How+to+Implement+a+Facade/facade-as-internal-api.png)

## Related Spryks

You might use the following definitions to generate related code:

* Add Zed Business facade.
* Add Zed Business facade interface.
* Add Zed Business facade interface method.
* Add Zed Business facade method.
* Add Zed Business facade method test.
* Add Zed Business facade test.
* Add Zed Business factory.
* Add Zed Business factory method.

For details, see the [Spryk](/docs/dg/dev/sdks/sdk/spryks/spryks.html) documentation.
