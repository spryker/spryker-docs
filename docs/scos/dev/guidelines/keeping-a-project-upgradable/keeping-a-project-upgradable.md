---
title: Keeping a project upgradable
description: Tools and guidelines for keeping a project upgradable
template: concept-topic-template
---

Keeping software up to date is a known concern, especially when it comes to transactional business models with sophisticated requirements.

We established development customization guidelines to make sure that you build and always keep your project upgradable while continuing to benefit from Spryker customization flexibility.

Following these guidelines throughout your development lifecycle is key to an effortless upgrade experience, even when your business requires highly complex customizations.

By keeping your project compliant with our development guidelines, you make sure that you can take minor and patch updates without breaking anything. Additionally, if your project is enrolled into [PaaS+](https://spryker.com/en/paas-plus/), being compatible enables you to take the updates *automatically*.

The following steps will help you understand what development strategies you can implement  how they affect upgradability, and what you need to do to keep your project upgradable.

## 1. Select a development strategy

A development strategy is the approach you follow when customizing a project. When choosing a strategy, take into account how it will affect the upgradability of your project.

To keep your project upgradable, we recommend using the following development strategies:

* Configuration
* Plug and play
* Project modules

For more information about the strategies and how they affect upgradability, see [Development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html).


## 2. Follow development guidelines

The best way to prevent compatibility issues is to prevent them. Throughout the development cycle, we recommend following our [Project development guidelines](/docs/scos/dev/guidelines/project-development-guidelines.html).

## 3. Check if project is upgradable using the Evaluator tool

The Evaluator tool is part of Spryker SDK that performs a number of checks are based on the static analysis of our tools.

Evaluator provides informative output about your code. If all the checks are successful, the tool returns zero messages.

Evaluation example without compliance errors:

```bash
Total messages: 0
```

If one or more checks fail, Evaluator returns errors per check.

<details open>
    <summary>Evaluation example with compliance errors</summary>

```bash
...
NotUnique:Constant Pyz\Shared\ContentBannerGui\ContentBannerGuiConfig::WIDGET_TEMPLATE_DISPLAY_NAME_SLIDER_WITHOUT_LINK name has to have project namespace, like PYZ_WIDGET_TEMPLATE_DISPLAY_NAME_SLIDER_WITHOUT_LINK.
------------------ ----------------------------------------------------------------------------------------------------
NotUnique:DatabaseColumn Database column name has to have project prefix Pyz in src/Pyz/Zed/ExampleStateMachine/Persistence/Propel/Schema/spy_example_state_machine.schema.xml, like pyz_name
------------------------ ----------------------------------------------------------------------------------------------------
NotUnique:Method Method name Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider::extendPaymentMethodHandler() should contains project prefix, like pyzExtendPyzPaymentMethodHandler
---------------- ----------------------------------------------------------------------------------------------------
NotUnique:TransferName Transfer object name ProductAbstractStore has to have project prefix Pyz in src/Pyz/Shared/Product/Transfer/product.transfer.xml, like PyzProductAbstractStore
---------------------- ----------------------------------------------------------------------------------------------------
NotUnique:TransferProperty Transfer property contentWidgetParameterMap for LocaleCmsPageData has to have project prefix Pyz in src/Pyz/Shared/Cms/Transfer/cms.transfer.xml, like pyzContentWidgetParameterMap
-------------------------- ----------------------------------------------------------------------------------------------------
PrivateApi:Dependency Please avoid usage of ProductStorageDependencyProvider::FACADE_PRODUCT in Pyz\Zed\ProductStorage\Business\ProductStorageBusinessFactory
--------------------- ----------------------------------------------------------------------------------------------------
PrivateApi:Extension Please avoid extension of the PrivateApi SprykerShop\Yves\ContentProductWidget\Twig\ContentProductAbstractListTwigFunctionProvider in Pyz\Yves\ContentProductWidget\Twig\ContentProductAbstractListTwigFunctionProvider
-------------------- ----------------------------------------------------------------------------------------------------
PrivateApi:PrivateApiDependencyInBusinessModel Please avoid usage of Spryker\Zed\ProductSet\Business\Model\Touch\ProductSetTouchInterface in Pyz\Zed\ProductSet\Business\Model\ProductSetUpdater
---------------------------------------------- ----------------------------------------------------------------------------------------------------
PrivateApi:MethodIsOverwritten Please avoid usage of core method Spryker\Client\Kernel\AbstractFactory::getConfig() in the class Pyz\Client\ExampleProductSalePage\ExampleProductSalePageFactory
------------------------------ ----------------------------------------------------------------------------------------------------
...
Total messages: 11

```    

</details>


### Using the evaluator tool

You can use the evaluator tool as follows:

* Analyze project code compliance:
```bash
analyze:php:code-compliance
```

* Generate a report about code compliance issues:
```bash
analyze:php:code-compliance-report
```

For detailed instructions, see [Running the evaluator tool](/docs/scos/dev/keeping-a-project-upgradable/running-the-evaluator-tool.html).

## 4. Resolve the evaluation issues

If Evaluator detects compliance issues, resolve them by using the instructions in [Upgradability guidelines](/docs/scos/dev/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html).

## 5. Update your project

After passing an evaluation successfully, you can safely take minor and patch updates. If the project is enrolled into PaaS+, the updates will be applied automatically during the next deployment.
