---
title: Business models
description: Implement and customize business models to handle data like products, orders, and payments. This guide helps you structure models to maintain efficient backend operations.
last_updated: Sep 27, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/business-models
originalArticleId: 951be56f-357e-46ac-895c-5171bbc5dc63
redirect_from:
  - /docs/scos/dev/back-end-development/zed/business-layer/business-models.html
related:
  - title: About the Business layer
    link: docs/dg/dev/backend-development/zed/business-layer/business-layer.html
  - title: Custom exceptions
    link: docs/dg/dev/backend-development/zed/business-layer/custom-exceptions.html
---

*Business models* are classes where you program the *business logic* of your system. Business logic includes all kinds of algorithms (for example, cart calculation), storage procedures (for example, checkout save workflow), and interactions with external providers (for example, payment).

Business models are not visible from other layers and bundles. Although their methods are public, they must not be used directly from the outside. In Java, the package-private access modifier is used so that methods can only be called from within the same package or module. In PHP, this modifier is missing, so instead of an explicit declaration, there's only a convention.

## Dependency injection

Business models must not directly depend on each other. The dependency container injects dependencies to the constructor, and we use interfaces not to depend on concrete classes. This is very important for testability and decoupling. It also lets you use country-specific extensions of models.

A typical constructor and the related properties of a business model are as follows:

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

As you can see, the `KeyManager` class depends on two other classes, which are specified by their related interfaces. The constructor gets them injected and provides them as properties for the model's methods.

{% info_block infoBox "Info" %}

The `KeyManager` class implements `KeyManagerInterface`, which is used by other models that depend on `KeyManager`.

{% endinfo_block %}

Every business model is shipped with an interface that exposes all public methods.

## Avoid hybrids

If you need data objects, you can use transfer objects and entities or your own DTOs for internal use. In any case, do not mix them up with business models. Each class is either a stateless model with functional methods or a data object with getters and setters.

[Avoid hybrids](https://books.google.de/books?id=_i6bDeoCQzsC&lpg=PT172&ots=eo5Pxl9g22&dq=Avoid%20hybrids%20clean%20code&hl=de&pg=PT172#v=onepage&q=Avoid%20hybrids%20clean%20code&f=false) is a rule from the Clean Code book.

The following example is a violation of this rule because it mixes:

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

To generate related code, you might use the following definitions:

- `vendor/bin/console spryk:run AddZedBusinessModel`: Add Zed Business model.
- `vendor/bin/console spryk:run AddZedBusinessModelInterface`: Add Zed business model interface.
- `vendor/bin/console spryk:run AddZedBusinessModelInterfaceMethod`: Add Zed business model interface method.
- `vendor/bin/console spryk:run AddZedBusinessModelMethod`: Add Zed business model method.

For details, see [Spryks](/docs/dg/dev/sdks/sdk/spryks/spryks.html).
