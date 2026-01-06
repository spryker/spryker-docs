---
title: "Step engine: Use case scenario"
description: In this document, you have an example of the checkout process configuration.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/step-engine-use-case-scenario
originalArticleId: 53312978-30d8-435c-84a4-d6a26fabfc90
redirect_from:
  - /2021080/docs/step-engine-use-case-scenario
  - /2021080/docs/en/step-engine-use-case-scenario
  - /docs/step-engine-use-case-scenario
  - /docs/en/step-engine-use-case-scenario
  - /v6/docs/step-engine-use-case-scenario
  - /v6/docs/en/step-engine-use-case-scenario
  - /v5/docs/step-engine-use-case-scenario
  - /v5/docs/en/step-engine-use-case-scenario
  - /v4/docs/step-engine-use-case-scenario
  - /v4/docs/en/step-engine-use-case-scenario
  - /v3/docs/step-engine-use-case-scenario
  - /v3/docs/en/step-engine-use-case-scenario
  - /v2/docs/step-engine-use-case-scenario
  - /v2/docs/en/step-engine-use-case-scenario
  - /v1/docs/step-engine-use-case-scenario
  - /v1/docs/en/step-engine-use-case-scenario
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/step-engine/step-engine-use-case-scenario.html
related:
  - title: "Step engine: Workflow overview"
    link: docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/step-engine/step-engine-workflow-overview.html
  - title: "Step engine: Use case scenario"
    link: docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/step-engine/step-engine-create-breadcrumb-navigation.html
---

The following example represents the checkout process configuration, containing two steps: an entry step and a success step.

```php
<?php

namespace SprykerShop\Yves\CheckoutPage\Process;

use Spryker\Yves\Kernel\AbstractFactory;
use Spryker\Yves\StepEngine\Process\StepBreadcrumbGenerator;
use Spryker\Yves\StepEngine\Process\StepCollection;
use Spryker\Yves\StepEngine\Process\StepCollectionInterface;
use Spryker\Yves\StepEngine\Process\StepEngine;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider;
use SprykerShop\Yves\CheckoutPage\DataContainer\DataContainer;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCartClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCustomerClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToQuoteClientInterface;
use SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use SprykerShop\Yves\CheckoutPage\Process\Steps\EntryStep;
use SprykerShop\Yves\CheckoutPage\Process\Steps\SuccessStep;
use SprykerShop\Yves\HomePage\Plugin\Provider\HomePageControllerProvider;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class StepFactory extends AbstractFactory
{
    protected const ROUTE_CART = 'cart';

    /**
     * @return \SprykerShop\Yves\CheckoutPage\DataContainer\DataContainer
     */
    public function createDataContainer()
    {
        return new DataContainer($this->getQuoteClient());
    }

    /**
     * @param \Spryker\Yves\StepEngine\Process\StepCollectionInterface $stepCollection
     *
     * @return \Spryker\Yves\StepEngine\Process\StepEngine
     */
    public function createStepEngine(StepCollectionInterface $stepCollection)
    {
        return new StepEngine($stepCollection, $this->createDataContainer(), $this->createStepBreadcrumbGenerator());
    }

    /**
     * @return \Spryker\Yves\StepEngine\Process\StepCollectionInterface
     */
    public function createStepCollection()
    {
        $stepCollection = new StepCollection(
            $this->getUrlGenerator(),
            CheckoutPageControllerProvider::CHECKOUT_ERROR
        );

        $stepCollection
            ->addStep($this->createEntryStep())
            ->addStep($this->createSuccessStep());

        return $stepCollection;
    }

    /**
     * @return \SprykerShop\Yves\CheckoutPage\Process\Steps\EntryStep
     */
    public function createEntryStep()
    {
        return new EntryStep(
            static::ROUTE_CART,
            HomePageControllerProvider::ROUTE_HOME
        );
    }

    /**
     * @return \SprykerShop\Yves\CheckoutPage\Process\Steps\SuccessStep
     */
    public function createSuccessStep()
    {
        return new SuccessStep(
            $this->getCustomerClient(),
            $this->getCartClient(),
            $this->getConfig(),
            CheckoutPageControllerProvider::CHECKOUT_SUCCESS,
            HomePageControllerProvider::ROUTE_HOME
        );
    }

    /**
     * @return \Symfony\Component\Routing\Generator\UrlGeneratorInterface
     */
    public function getUrlGenerator()
    {
        return $this->getApplication()['url_generator'];
    }

    /**
     * @return \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToQuoteClientInterface
     */
    public function getQuoteClient(): CheckoutPageToQuoteClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_QUOTE);
    }

    /**
     * @return \Spryker\Yves\Kernel\Application
     */
    public function getApplication()
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::PLUGIN_APPLICATION);
    }

    /**
     * @return \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCartClientInterface
     */
    public function getCartClient(): CheckoutPageToCartClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_CART);
    }

    /**
     * @return \Spryker\Yves\StepEngine\Process\StepBreadcrumbGeneratorInterface
     */
    public function createStepBreadcrumbGenerator()
    {
        return new StepBreadcrumbGenerator();
    }

    /**
     * @return \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCustomerClientInterface
     */
    public function getCustomerClient(): CheckoutPageToCustomerClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_CUSTOMER);
    }
}
```
