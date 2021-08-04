---
title: Business Models
originalLink: https://documentation.spryker.com/2021080/docs/business-models
redirect_from:
  - /2021080/docs/business-models
  - /2021080/docs/en/business-models
---

Business models are classes where you program the business logic of your system. With business logic we mean all kinds of algorithms (for example, cart calculation), storage procedures (for example, checkout save workflow) and interactions with external providers (for example, payment).

Business models are not visible from other layers and bundles. Although their methods are public they must not be used directly from the outside. In Java we would use the package-private access modifier, so that methods can only be called from within the same package/module. In PHP this modifier is missing, so instead of a explicit declaration we only have a convention.

## Dependency Injection

Business models must not directly depend on each other. The dependency container injects dependencies to the constructor and we use interfaces not to depend on concrete classes. This is very important for testability and decoupling. It also allows you to use country-specific extensions of models.

A typical constructor and the related properties of a business model looks like this:

```php
<?php
...
class KeyManager implements KeyManagerInterface
{
    /**
     * @var GlossaryQueryContainerInterface
     */
    protected $queryContainer;
 
    /**
     * @var KeySourceInterface
     */
    protected $keySource;
 
    /**
     * @param KeySourceInterface $keySource
     * @param GlossaryQueryContainerInterface $queryContainer
     */
    public function __construct(KeySourceInterface $keySource, GlossaryQueryContainerInterface $queryContainer)
    {
        $this->keySource = $keySource;
        $this->queryContainer = $queryContainer;
    }
...
```

As you can see, the `KeyManagerdepends` class on two other classes which are specified by their related interfaces. The constructor gets them injected and provides them as properties for the model’s methods. Please obey that the `KeyManager` implements a `KeyManagerInterface` that is used by other models who depend on the `KeyManager`.

Every business model ships with an interface which exposes all public methods.

## Avoid Hybrids

In case you need data objects, you can use transfer objects, entities or you can create your own DTOs for internal use. In any case do not mix them up with the business models. Each class is either a stateless model with functional methods or a data object with getters and setters.

[Avoid hybrids](https://books.google.de/books?id=_i6bDeoCQzsC&lpg=PT172&ots=eo5Pxl9g22&dq=Avoid%20hybrids%20clean%20code&hl=de&pg=PT172#v=onepage&q=Avoid%20hybrids%20clean%20code&f=false) is a rule from the Clean Code book.

The following example is a violation of this rule because it mixes :

```php
<?php
...
public function __construct(ModelInterface $myModel, array $data)
{
    $this->myModel = $myModel;
    $this->data = $data;
}
...
```

## Related Spryks

You might use the following definitions to generate related code:

* `vendor/bin/console spryk:run AddZedBusinessModel` - Add Zed Business Model
* `vendor/bin/console spryk:run AddZedBusinessModelInterface` - Add Zed Business Model Interface
* `vendor/bin/console spryk:run AddZedBusinessModelInterfaceMethod` - Add Zed Business Model Interface Method
* `vendor/bin/console spryk:run AddZedBusinessModelMethod` - Add Zed Business Model Method

See the [Spryk](https://documentation.spryker.com/docs/spryk-201903) documentation for details.
