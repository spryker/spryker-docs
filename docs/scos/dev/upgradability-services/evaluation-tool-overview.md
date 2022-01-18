---
title: Evaluation tool overview
description: Functionalities of the evaluation tool
last_updated: Nov 25, 2021
template: concept-topic-template
---

The evaluation tool is a part of Spryker-SDK, that performs automated quality checks against our own and industry standards.

## Installing the evaluation tool

As the evaluation tool is part of Spryker-SDK, we should install it globally into docker/sdk cli and initialize. 
After that we will be able to run the evaluation commands

```bash
docker/sdk cli
composer global require spryker-sdk/sdk "dev-master"
~/.composer/vendor/spryker-sdk/sdk/bin/console sdk:init:sdk
```

## Using the evaluation tool

at this moment we have next commands:
- analyze:php:code-compliance (analyzes project code compliance)
- analyze:php:code-compliance-report (report code compliance issues)

For detailed instructions, see [Running the evaluation tool](/docs/scos/dev/upgradability-services/running-the-evaluation-tool.html).

## How the evaluation tool works

The evaluation tool performs a number of checks that are based on the static analysis of our own tools. Currently, it performs the following checks:

- Is not unique - Transfer/Transfer property / DB table / DB column / Method / Constant
- Method is overridden - Factory/DP (not plug-in)/Repository/EntityManager
- Non public API class was extended or used

The evaluation tool provides you with informative output about your code. If all the checks you’ve run are successful, the tool returns an empty result.

Example of a successful evaluation:

```bash
Total messages: 0
```

If one or more checks fail, the Evaluation tool returns the errors per check.

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

## Next steps

[Running the evaluation tool](/docs/scos/dev/upgradability-services/running-the-evaluation-tool.html)
