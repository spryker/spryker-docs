---
title: Customization strategies and upgradability
description: Explain Spryker Corer release types and how different project development strategies are affected by each of them.
template: concept-topic-template
redirect_from:
- /docs/sdk/dev/releases-vs-customization-types.html

last_updated: May 16, 2023
---
Spryker uses semantic versioning for its packages. There are 3 release types: major, minor, and patch. For more information, see [Semantic versioning - major vs. minor vs. patch release](/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html#what-is-a-release).

Depending on the customization strategy and the type of release, you may need to invest additional efforts to integrate a release.

## Customization types

You can use the following strategies to customize your Spryker project:

- Configuration customization
- Plug and Play customization
- Project modules development strategy
- Module customization (or, Private API customization)
- Module replacement

For more information, see [Development strategies](/docs/dg/dev/backend-development/extend-spryker/development-strategies.html) article.

In terms of upgradability, we'll look at the following customization strategies:

- Module configuration customization.
- Module customization.
- Plug and Play development strategies.

### Module configuration customization

Module configuration is one of the Public APIs.  This means that Spryker makes sure to keep both the environment and module configuration stable in the patch and minor releases.

### Plug and Play customization

Plug and Play is Spryker's out-of-the-box development strategy that allows customers to extend a project with various built-in plugins. In case there's no plugin, it's recommended to create a feature request or create a custom plugin and wire it up in the DependencyProvider, or via configuration.

Check out our [Plugins](/docs/dg/dev/backend-development/plugins/plugins.html) article to get more information.

### Private API customization
Spryker generally allows changing private APIs and core code. However in this case, part of the upgrade responsibilities move to the side of the customer.

What is a Private API?

A [Private API](/docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html#private-api) in SCOS is everything that is not a [Public API](/docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html#public-api). For example, it can be a _Business model_, or any file in the _Persistence_ layer, except for _QueryContainer_.

## Project customization and release types in terms of upgradability

This section explains how different project customizations affect upgradability for each release type.

<table>
    <thead>
        <tr>
            <th rowspan="2">Customization type</th>
            <th colspan="3">Release Type</th>
        </tr>
        <tr>
            <th>Patch Release</th>
            <th>Minor Release</th>
            <th>Major Release</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Module configuration customization</td>
            <td>➕</td>
            <td>➕</td>
            <td>➖</td>
        </tr>
        <tr>
            <td>Plug and Play customization</td>
            <td>➕</td>
            <td>⚠️</td>
            <td>➖</td>
        </tr>
        <tr>
            <td>Module customization</td>
            <td>➕</td>
            <td>⚠️</td>
            <td>➖</td>
        </tr>
    </tbody>
</table>

➕ Customization doesn't affect the upgradability process.

⚠️ Customization may affect the upgradability process, cause some issues, and sometimes requires review.

➖ Customization heavily affects upgradability and requires review and manual changes.

{% info_block warningBox "Note" %}

Only cases related to existing packages are addressed below. For new packages, upgradability works perfectly.

{% endinfo_block %}

### Module configuration customization and how it affects upgradability

In terms of Spryker releases, module configuration customization is generally the least complex. As long as the modules being customized remain compatible with the version of Spryker being used, there should be no issues integrating new releases. Here's an example.

Suppose we have a core config in the Category module:

```php
namespace Spryker\Zed\Category;

class CategoryConfig extends AbstractBundleConfig
{
    protected const DEFAULT_CATEGORY_READ_CHUNK = 10000;

    public function getDefaultCategoryReadChunk (): int
    {
        return static::DEFAULT_CATEGORY_READ_CHUNK;
    }
}
```

And we want to customize the configuration of the Spryker Category module to change an existing attribute to the catalog read batch size. We can do this by creating a new configuration file in our project's config directory:

```php
namespace Pyz\Zed\Category;

class CategoryConfig extends SprykerCategoryConfig
{
    protected const DEFAULT_CATEGORY_READ_CHUNK = 50;
}
```

We managed to adjust the chunk size according to our needs and everything works as intended.

Assuming this customization is compatible with the version of Spryker being used, we can integrate new releases of the Catalog module without any additional effort.

Let's see how this affects our upgrade process.

#### Patch releases

Patch releases, such as for example 1.2.1 to 1.2.2, will not affect the `DEFAULT_CATEGORY_READ_CHUNK` value or usage so it's safe to automatically update to patches even if the project has modified the constant value to suit its needs.

#### Minor release

Say the `DEFAULT_CATEGORY_READ_CHUNK` constant in the core module is deprecated in a minor version release, for example 1.2.1 to 1.3.0,  and a new constant `CATEGORY_READ_CHUNK` is introduced to replace it. Spryker will keep backwards compatibility and the old constant will still be used which makes minor updates also safe for automatic update.

A potential issue can be found in the minor releases that modify the project-level value of the constant. In case the project did not modify the default Core configuration value previously, the Upgrader tool might automatically add a new project-level value that might not suit the project's needs. In this case, a review might be required.

#### Major release

If the `DEFAULT_CATEGORY_READ_CHUNK` constant is completely removed from the core module in a major version release, for example 1.2.1 to 2.0.0, and a new constant `CATEGORY_READ_CHUNK` is used instead, end users who have customized `DEFAULT_CATEGORY_READ_CHUNK` in their project-level configuration will need to update their configuration to remove any references to the removed constant and use `CATEGORY_READ_CHUNK` instead. If they do not update their configuration, their application may experience unexpected behavior.

In general, it's important for you to be aware of any changes to module configuration in new releases and to update your project-level configuration accordingly. This can help to ensure that your application continues to function as expected and to avoid unexpected issues or errors.

### Plug and Play customization and how it affects upgradability

Let's check this with the `DiscountCalculationConnector` module example and its releases.

The `Calculation` module provides an extension point via `CalculationDependencyProvider`, so you can create your own plugins that implement `CalculationPluginInterface` and add it to the plugin stack in the `CalculationDependencyProvider::getOrderCalculatorPluginStack()`. Let's imagine you added your own plugins in the following way:

```php
/**
 * @return array<\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface>
 */
protected function getOrderCalculatorPluginStack(): array
{
    return [
        new PriceCalculatorPlugin(),
        new DiscountCalculatorPlugin(),
        new TaxAmountCalculatorPlugin(),
        new CustomTaxAmountCalculatorPlugin(),
    ];
}
```

In this particular example, the order does matter. Tax can't be calculated before final price calculation.

Now let's check how this affects upgradability.

#### Patch release

The 1.0.0 to 1.0.1 version release of the `DiscountCalculationConnector` module provides nothing beyond a typo fix in the `DiscountCalculator` business model used by the `DiscountCalculatorPlugin`. This change does not affect the plugin external API, which in turn means it doesn't affect upgradability.

#### Minor release

The `DiscountCalculationConnector` module has a new 1.0.0 to 1.1.0 version that deprecates the old `DiscountCalculatorPlugin` and introduces the new `DiscountAmountCalculatorPlugin`.

In this case, the Upgrader tool automatically unwires the old plugin and adds a new plugin to the end of the plugin stack. The upgraded code will be the following:

```php
protected function getOrderCalculatorPluginStack(): array
{
    return [
        new PriceCalculatorPlugin(),
        new TaxAmountCalculatorPlugin(),
        new CustomRefundAmountCalculatorPlugin(),
        new DiscountAmountCalculatorPlugin(),
    ];
}
```

As a result, the refunded amount will be higher than the amount that the client paid for the order because the plugin doesn't take into account the discount. The project still works, and nothing fails but the business logic is changed leading to incorrect calculations during the checkout. Because of this, automatically applied minor release changes need review and QA before going to production.

Another case we can look at is when a project has previously customized the whole discount calculation process by unwiring the old plugin and introducing the new custom one to replace it:

```php
protected function getOrderCalculatorPluginStack(): array
{
    return [
        new PriceCalculatorPlugin(),
        new CustomDiscountAmountCalculatorPlugin(),
        new TaxAmountCalculatorPlugin(),
        new CustomRefundAmountCalculatorPlugin(),
    ];
}
```

In this case, the automatic update to the `DiscountCalculationConnector` module version 1.1.0 will introduce an additional plugin for discount calculation while not removing the custom project's plugin. This means that a project developer (or anyone else who reviews the upgrader pull requests) needs to keep an eye open for this new plugin and remove it when it's added:

```php
protected function getOrderCalculatorPluginStack(): array
{
    return [
        new PriceCalculatorPlugin(),
        new CustomDiscountAmountCalculatorPlugin(),
        new TaxAmountCalculatorPlugin(),
        new CustomRefundAmountCalculatorPlugin(),
        new DiscountAmountCalculatorPlugin(), // <-- This automatically integrated plugin needs to be removed.
    ];
}
```

#### Major release

For instance, the `DiscountCalculationConnector` before the major release, such as 1.0.0 to 2.0.0, provided the `DiscountCalculatorPlugin`:

```php
protected function getOrderCalculatorPluginStack(): array
{
    return [
        new PriceCalculatorPlugin(),
        new DiscountCalculatorPlugin(),
        new TaxAmountCalculatorPlugin(),
        new CustomRefundAmountCalculatorPlugin(),
    ];
}
```

In the major version 2.0.0, the previously deprecated `DiscountCalculatorPlugin` is removed and a new plugin `DiscountAmountCalculatorPlugin` is added to replace it. The upgrader tool will update `DiscountCalculationConnector` package to the latest version and will try to update the plugin stack in the project.

Let's say the project has modified the original plugin's behaviour by extending the `DiscountCalculatorPlugin` on the project level and wiring it instead.

```php
protected function getOrderCalculatorPluginStack(): array
{
    return [
        new PriceCalculatorPlugin(),
        new CustomDiscountCalculatorPlugin(), // <-- extends DiscountCalculatorPlugin.
        new CustomRefundAmountCalculatorPlugin(),
        new TotalTaxAmountCalculatorPlugin(),
    ];
}
```

The automatic integration will result in the following:

```php
protected function getOrderCalculatorPluginStack(): array
{
    return [
        new PriceCalculatorPlugin(),
        new CustomDiscountCalculatorPlugin(),
        new TotalTaxAmountCalculatorPlugin(),
        new DiscountAmountCalculatorPlugin(),
    ];
}
```

In the example above, the following issues may appear:

- If `CustomDiscountAmountCalculatorPlugin` extends core `DiscountCalculatorPlugin` which does not exist anymore, the code will fail.
- The `DiscountAmountCalculatorPlugin` was added to the end because the Upgrader couldn't find the removed plugin in the stack and didn't replace it.
- The discount is calculated two times.

As a result, `getOrderCalculatorPluginStack` must be adjusted manually in order to fix the issues that came up.

### Private API customization and how it affects upgradability

Let's check this scenario with the `Acme` module example and its releases.

A core module named `Acme` is provided as a `spryker/acme` package with version 1.0.0. For instance, it contains `AcmeReader`.

```php
class AcmeReader implements AcmeReaderInterface
{   
    public function readAcme(AcmeCriteriaTransfer $acmeCriteriaTransfer): AcmeTransfer
    {
        $acmeTransfer = $this->acmeRepository->findAcmeById($acmeCriteriaTransfer->getId());

        $fooTransfer = $this->fooFacade->findFooByAcme($acmeCriteriaTransfer->getId());
        $acmeTransfer->setFoo($fooTransfer);

        return $this->acmExpander->expand($acmeTransfer);   
    }

}
```

And let's say for some reason, the customer wants to customize `AcmeReader`, or example,  by adding extra logic execution.

```php
class AcmeReader extends SprykerAcmeReader
{
    public function readAcme(AcmeCriteriaTransfer $acmeCriteriaTransfer): AcmeTransfer
    {
        $acmeTransfer = $this->acmeRepository->findAcmeById($acmeCriteriaTransfer->getId());

        $fooTransfer = $this->fooFacade->findFooByAcme($acmeCriteriaTransfer->getId());
        $acmeTransfer->setFoo($fooTransfer);

        $this->callBeforeExpand($acmeTransfer);

        $this->acmeExpander->expand($acmeTransfer);

        return $acmeTransfer;
    }

    protected function callBeforeExpand(AcmeTransfer $acmeTransfer): void
    {
        // Do something
    }
}
```

Now, let's imagine Spryker released new versions of the `spryker/acme` package.

#### Patch release

The patch release, for example from 1.0.0 to 1.0.1, fixed a typo in the variables.

```php
return $this->acmExpander->expand($acmeTransfer);
```

is changed to this

```php
return $this->acmeExpander->expand($acmeTransfer);
```

As you can see, this doesn't affect custom code and everything works fine.

#### Minor release

In this example, the minor release 1.0.0 to 1.1.0 has Spryker replace the method it uses from `FooFacade`. The method `findFooByAcme(int $id)` is marked as deprecated, and a new method `findFooByCriteria(FooCriteriaTransfer $fooCriteriaTransfer)` is provided, with more generic functionality. The `AcmeReader` also changed and now it looks like this:

```php
public function readAcme(AcmeCriteriaTransfer $acmeCriteriaTransfer): AcmeTransfer
{
    $acmeTransfer = $this->acmeRepository->findAcmeById($acmeCriteriaTransfer->getId());

    $fooCriteriaTransfer = (new FooCriteriaTransfer())
        ->setAcmeId($acmeCriteriaTransfer->getId();
    $fooTransfer = $this->fooFacade->findFooByCriteria($fooCriteriaTransfer);
    $acmeTransfer->setFoo($fooTransfer);

    return $this->acmExpander->expand($acmeTransfer);   
}
```

This does not break any customized logic. The project code continues to work just fine using the deprecated external facade method, and it might only miss some performance improvements potentially brought by the new method.

#### Major release (e.g., 1.0.0 to 2.0.0)

In the major version  release 1.0.0 to 2.0.0, the deprecated method `FooFacade::findFooByAcme(int $id)` is completely removed. The upgrader tool will update the `spryker/acme` and `spryker/foo` packages to the latest version. Because of this, the project's code now throws an `Error` exception and breaks the application because the old method does not exist anymore. This means you need to manually fix this issue.
