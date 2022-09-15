---
title: Performance testing in staging environments
description: Learn about performance testing for the Spryker Cloud Commerce OS
template: concept-topic-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/performance-testing.html
---

Performance testing is an integral part of the development and deployment process. Even if you execute performance testing during development, we highly recommend testing the performance of your code in a staging environment before deploying it in production environments.

Since the staging environment isn't designed to be as performant as the production environment, we recommend using a subset of the data and extrapolate the results.

If you want to execute a full load test on a production-like dataset and traffic, use a production environment. This could be your actual production environment if it is not yet live, or you can order an additional environment by contacting you Account Executive. Testing with real or at least mock data provides significantly better and more reliable results than testing with a small data set. To conduct effective performance tests, it is recommended to use the same amount of data that will be used in the production environment. 

If you are unable to use real data for your load tests, you can use the [test data](https://drive.google.com/drive/folders/1QvwDp2wGz6C4aqGI1O9nK7G9Q_U8UUS-?usp=sharing) for an expanding amount of use cases. Please note that we do not provide support for this data. However, if your specific use case is not covered, you can [contact support](https://spryker.force.com/support/s/knowledge-center), and we will try to accommodate your needs.

## Load testing tool for Spryker

To assist in performance testing, we have a [load testing tool](https://github.com/spryker-sdk/load-testing). The tool contains predefined test scenarios that are specific to Spryker. Test runs based on Gatling.io, an open-source tool. Web UI helps to manage runs and multiple target projects are supported simultaneously.

The tool can be used as a package integrated into the Spryker project or a standalone package. 

### Prerequisites

- Java 8+
- Node 10.10+

### Integrating the load testing tool into a staging environment

While this tool can be integrated into any on-going project, this guide will provide steps for setting it up with a new environment using one of Spryker’s many available demo shops.

For instructions on setting up a developer environment, you can visit our [getting started guide](/docs/scos/dev/developer-getting-started-guide.html) which shows you how to set up the Spryker Commerce OS.

Some of the following options are available to choose from:
- [B2B Demo Shop](/docs/scos/user/intro-to-spryker//b2b-suite.html): A boilerplate for B2B commerce projects.
- [B2C Demo Shop](/docs/scos/user/intro-to-spryker/b2c-suite.html): A starting point for B2C implementations.

#### B2C Demo Shop example

For this example, we will be using the B2C Demo Shop. To begin, we will need to create a project folder and clone the B2C Demo Shop and the Docker SDK:

```bash
mkdir spryker-b2c && cd spryker-b2c
git clone https://github.com/spryker-shop/b2c-demo-shop.git ./
git clone git@github.com:spryker/docker-sdk.git docker
```

##### Integrating Gatling

With the B2C Demo Shop and Docker SDK cloned, you will need to make a few changes to integrate Gatling into your project. These changes including requiring the load testing tool with composer as well as updating the [Router module](docs/scos/dev/migration-concepts/silex-replacement/router/router-yves.html) inside of Yves.

1. Require the *composer* package:

```bash
composer require spryker-sdk/load-testing --dev
```

2. Add the Router provider plugin to `src/Pyz/Yves/Router/RouterDependencyProvider.php`

```php
<?php

...

namespace Pyz\Yves\Router;

...

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    ...
    
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        ...
        if (class_exists(LoadTestingRouterProviderPlugin::class)) {
            $routeProviders[] = new LoadTestingRouterProviderPlugin();
        }
        
        return $routeProviders;
    }

    ...
}
```

3. Make sure the `fixtures` command is enabled in the main `codeception.yml`:

```yaml
...
extensions:
  commands:
    - \SprykerTest\Shared\Testify\Fixtures\FixturesCommand
...
```

##### Setting up the development environment

Before we can generate the fixtures needed to be loaded into the database, we still need to set up the development environment. We can do that with the following steps: 

1. Bootstrap the docker setup:

```bash
docker/sdk boot deploy.dev.yml
```

2. If the command you've run in the previous step returned instructions, follow them.

3. Build and start the instance:
```bash
docker/sdk up
```

4. Switch to your branch, re-build the application with assets and demo data from the new branch:

```bash
git checkout {your_branch}
docker/sdk boot -s deploy.dev.yml
docker/sdk up --build --assets --data
```

> Depending on your requirements, you can select any combination of the following `up` command attributes. To fetch all the changes from the branch you switch to, we recommend running the command with all of them:
> - `--build` - update composer, generate transfer objects, etc.
> - `--assets` - build assets
> - `--data` - get new demo data

You've set up your Spryker B2C Demo Shop and can access your applications.

##### Data preparation

With the integrations done and the environment set up, you will need to create and load the data fixtures. This is done by first generating the necessary fixtures before triggering a *publish* of all events and then running the *queue worker*. As this will be running tests for this data preparation step, this will need to be done in the [testing mode for the Docker SDK](/docs/scos/dev/the-docker-sdk/202204.0/running-tests-with-the-docker-sdk.html). To start, entering testing mode with the following command:

```bash
docker/sdk testing
```

Once inside the Docker SDK CLI, to create and load the fixtures, do the following:

1. Generate fixtures:

```bash
vendor/bin/codecept fixtures -c vendor/spryker-sdk/load-testing
```

2. Trigger all *publish* events:

```bash
console publish:trigger-events
```

3. Run the *queue worker*:

```bash
console q:w:s -s 
```

You should have the fixtures loaded into the databases and can exit the CLI to install Gatling into the project.

##### Installing and running Gatling

The last steps to getting the Spryker load testing tool set up with your project is to finally install Gatling. The load testing tool is set up with a PHP interface which makes calls to Gatling to run the tests that have been built into the tool. An installation script is included with the load testing tool and can be run with the following:

1. Enter the tests directory:

```bash
cd vendor/spryker-sdk/load-testing
```

2. Run the installation script: 

```bash
./install.sh
```

After this step has been finished, you will be able to run the Web UI and tool to perform load testing for your project. 

To get the Web UI of the Gatling tool, run:

```bash
npm run run
```

{% info_block infoBox %}

The tool runs on port 3000 by default. If you want to use a different port, specify it in the PORT environment variable.

{% endinfo_block %}

The tool should now be available at `http://localhost:3000`. Below is a list of available tests which can be run through the Web UI:

For *Yves*:
- `Home` - request to the Home page
- `Nope` - empty request
- `AddToCustomerCart` - scenario to add a random product from fixtures to a user cart
- `AddToGuestCart` - scenario to add a random product from fixtures to a guest cart
- `CatalogSearch` - search request for a random product from fixtures
- `Pdp` - request a random product detail page from fixtures
- `PlaceOrder` - request to place an order
- `PlaceOrderCustomer` - scenario to place an order

For *Glue API*:
- `CatalogSearchApi` - search request for a random product from fixtures
- `CheckoutApi` - scenario to checkout for logged user
- `GuestCheckoutApi` - scenario to checkout for guest user
- `CartApi` - scenario to add a product to the cart for logged user
- `GuestCartApi` - scenario to add a product to cart for guest user
- `PdpApi` - request a random product detail page from fixtures

For more information on either using Gatling as a stand-alone tool or for navigating through the tools, please refer to the available guides here:

- [Gatling](docs/load-testing-with-gatling/1-gatling-overview.md)
- [Installing Gatling](docs/load-testing-with-gatling/2-installing-gatling.md)
- [Running and using Gatling](docs/load-testing-with-gatling/3-running-and-using-gatling.md)

Based on our experience, the [Load testing tool](https://github.com/spryker-sdk/load-testing) can greatly assist you in conducting more effective load tests.