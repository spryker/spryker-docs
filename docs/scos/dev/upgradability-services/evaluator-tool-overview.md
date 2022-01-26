---
title: evaluator tool overview
description: Functionalities of the evaluator tool
last_updated: Nov 25, 2021
template: concept-topic-template
---

The evaluator tool is a part of Spryker SDK that performs automated quality checks against our own and industry standards.

## How the evaluator tool works

The evaluator tool performs a number of checks that are based on the static analysis of our tools. Currently, it performs the following checks:

* Is not unique:
  * Transfer
  * Transfer property
  * Database table
  * Database column
  * Method
  * Constant
* Method is overridden:
  * Factory
  * Dependecy provider
  * Repository
  * Entity manager
* Non-public API class was extended or used

The evaluator tool provides informative output about your code. If all the checks are successful, the tool returns zero messages.

Evaluation example without compliance errors:

```bash
Total messages: 0
```

If one or more checks fail, the tool returns errors per check.

Evaluation example with compliance errors:
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
Total messages: 244

```

## Using the evaluator tool

You can use the evaluator tool as follows:
* Analyze project code compliance:
```bash
analyze:php:code-compliance
```

* Generate a report about code compliance issues:
```bash
analyze:php:code-compliance-report
```

For detailed instructions, see [Running the evaluator tool](/docs/scos/dev/upgradability-services/running-the-evaluator-tool.html).


## Next steps

[Running the evaluator tool](/docs/scos/dev/upgradability-services/running-the-evaluator-tool.html)
