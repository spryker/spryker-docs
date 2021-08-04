---
title: Implementing a Facade
originalLink: https://documentation.spryker.com/v6/docs/implementing-facade
redirect_from:
  - /v6/docs/implementing-facade
  - /v6/docs/en/implementing-facade
---

## AbstractFacade

Every facade extends `Spryker\Zed\Kernel\Business\AbstractFacade` which provides an important method:

| Method              | Purpose                                                      |
| ------------------- | ------------------------------------------------------------ |
| $this->getFactory() | Returns the factory which is needed to access the underlying models. |

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



When you look at the `deleteKey()` method, please observe the following:

* The name of the method expresses exactly what happens. It uses the terms of the related terminology, but it is easy to grasp what happens (“A key will be deleted”).
* The method does not contain any control logic, like if or foreach statements; it just delegates to the business model and calls the right method.
* The business model KeyManager is created using the factory so it does not need to know how the class is created.

## Parameters and return values

The main idea of the facade is to hide the implementation details. Typical return values of facade methods are:

* native types (bool, int, float, string, array)
* transfer objects

To hide and protect the underlying models and data structure, we never return business models or any propel entities/queries.

## Transfer Objects

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

The idea of the business layer is to present a facade to all clients and to hide the internal details. This is the main requirement for future updates and it keeps the bundles decoupled. So when you look at a module from another module you will only see the facade.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Zed/Business+Layer/How+to+Implement+a+Facade/facade-as-internal-api.png){height="" width=""}

## Related Spryks

You might use the following definitions to generate related code:

* Add Zed Business Facade
* Add Zed Business Facade Interface
* Add Zed Business Facade Interface Method
* Add Zed Business Facade Method
* Add Zed Business Facade Method Test
* Add Zed Business Facade Test
* Add Zed Business Factory
* Add Zed Business Factory Method

See the [Spryk](https://documentation.spryker.com/v2/docs/spryk-201903) documentation for details.
