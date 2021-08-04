---
title: Project Development Guidelines
originalLink: https://documentation.spryker.com/v5/docs/project-development-guidelines
redirect_from:
  - /v5/docs/project-development-guidelines
  - /v5/docs/en/project-development-guidelines
---

Spryker OS exposes codebase Projects, which enables a high level of customization and can satisfy even the most complex Project business requirements. 

The project development, the team is free to decide what approach to use. Spryker recommends considering **Configuration**, **Plug and Play**, and **Project modules** first to get maximum from the Spryker OS codebase, atomic releases, leverage minimum efforts for the integration of the new features and keeping system up to date.

## Development Strategies

### Configuration

Spryker provides an extensive configuration capability using `DependencyProviders` and Configuration.

Existing Spryker modules remain untouched.

{% info_block infoBox "Example" %}

To adjust Spryker behavior to Project needs, I can extend `\Spryker\Zed\Product\ProductConfig` on the project and adjust the number of products shown in the suggestion `\Pyz\Zed\Product\ProductConfig::getFilteredProductsLimitDefault()` to 20.

{% endinfo_block %}

{% info_block infoBox "Example" %}

In my Project, we don’t calculate refundable amount inside Spryker OS, so I need to extend `\Spryker\Zed\Calculation\CalculationDependencyProvider` by
`\Pyz\Zed\Calculation\CalculationDependencyProvider` and remove `RefundableAmountCalculatorPlugin` from the `CalculationDependencyProvider::getQuoteCalculatorPluginStack()` plugin stack.

{% endinfo_block %}
Spryker OS support: High, you can safely take minor and patch releases.

### Plug and Play

When existing OOTB functionality is not enough, we need to consider building our Plugins for existing plugin stacks in separate Project modules.

The existing Spryker modules remain untouched.

{% info_block infoBox "Example" %}

In my Project, we don’t store prices in Spryker OS, but in an external system. I need to create a new module SuperPrice with a new plugin `\Pyz\Zed\SuperPrice\Communication\Plugin\Calculator\PriceCalculatorPlugin` which will perform a call to my Super ERP and gather prices. Once it’s done, I replace default `\Spryker\Zed\Calculation\Communication\Plugin\Calculator\PriceCalculatorPlugin` with my Project `PriceCalculatorPlugin`. 

{% endinfo_block %}
Spryker OS support: High, you can safely take minor and patch releases.

### Project Modules

When the Spryker OS does not provide certain functionality, domain object, or concept, we need to create a new Project module where we implement new business requirements.

The existing Spryker modules remain untouched.
{% info_block infoBox "Example" %}

In my Project, we would like to introduce Product Label groups. In this case, I need to introduce a new Project module `ProductLabelGroup`, which will provide a new domain object `ProductLabelGroup` in a database (by adding `product_label_group.schema.xml` to Persistence layer to Zed) and call `ProductLabelFacade::findLabelById()` and `ProductLabelFacade::findAllLabels()` to manage the `ProductLabel` to `ProductLabelGroup` relations.

{% endinfo_block %}
Spryker OS support: High, you can safely take minor and patch releases.

### Spryker OS Module Customization

When specific OOTB Spryker behavior doesn’t fit Project requirements, you can enable the full power of available for your codebase by extending existing business modules. 

As it’s quite a substantial change, we need to go deeper and not only extend OOTB Spryker behaviors but also change it, some of the non-API change become dangerous. That’s why a module constraint to a specific minor version is required (using ~ instead of ^).

Consider using the composition design pattern instead of the direct class extensions: it could increase development costs, but also increases vendor support and simplifies minor updates.

{% info_block infoBox "Example" %}

In my Project, Order entity should not be hydrated during the buying process (we are building a vitrine). In this case, I need to create `\Pyz\Zed\Sales\Business\Order\OrderReader`, which will extend the existing `\Spryker\Zed\Sales\Business\Order\OrderReader` and replace the implementation of the `findOrderByIdSalesOrdermethod()`, where I will adjust the hydration calls.

{% endinfo_block %}
Spryker OS support: Reduced, you can safely take patch releases.

### Spryker OS Module Replacement

When an existing Spryker module provides functionality that doesn’t fit the Project conceptually, there is a possibility to replace a Spryker module completely using the “composer replace” feature.

This option is not available for every module, as sometimes conceptual changes could lead to high development efforts.
{% info_block infoBox "Example" %}

In my Project, the URL should be built in a completely different concept that Spryker offers. In this case, I need to create a Project module Url, provide an implementation for every API function (Facade, Client, Service, etc.) and replace OOTB module `spryker/url` with `my-super-project/url`. Spryker features based on URL will use Project implementation to process URLs.

{% endinfo_block %}
Spryker OS support: No support. 

## Development & Tests

From the very first day of project development, it’s recommended to establish an incremental development process based on CI/CD supported by tests. 

Spryker provides an infrastructure for Unit, Functional, and Acceptance tests. 

General test coverage depends on project business requirements and the complexity of a project. But defining critical e-commerce functionalities and covering them with tests is necessary for every project (even if they are only big 5: Home page, Catalog Page, PDP, Add to cart, and Place order).

<!--More on test infrastructure <link>

How to write the very first project test <link>-->
