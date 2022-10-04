---
title: Performance testing in staging environments
description: Learn about performance testing for the Spryker Cloud Commerce OS
last_updated: Sep 15, 2022
template: concept-topic-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/performance-testing.html
---

Performance testing is an integral part of the development and deployment process. Even if you execute performance testing during development, we highly recommend testing the performance of your code in a staging environment before deploying it in production environments.

Since the staging environment isn't designed to be as performant as the production environment, we recommend using a subset of the data and extrapolate the results.

If you want to execute a full load test on a production-like dataset and traffic, use a production environment. This could be your actual production environment if it is not yet live, or you can order an additional environment by contacting you Account Executive. Testing with real or at least mock data provides significantly better and more reliable results than testing with a small data set. To conduct effective performance tests, it is recommended to use the same amount of data that will be used in the production environment. 

If you are unable to use real data for your load tests, you can use the [test data](https://drive.google.com/drive/folders/1QvwDp2wGz6C4aqGI1O9nK7G9Q_U8UUS-?usp=sharing) for an expanding amount of use cases. Please note that we do not provide support for this data. However, if your specific use case is not covered, you can [contact support](https://spryker.force.com/support/s/knowledge-center), and we will try to accommodate your needs.

# Load testing tool for Spryker

To assist in performance testing, we have a [load testing tool](https://github.com/spryker-sdk/load-testing). The tool contains predefined test scenarios that are specific to Spryker. Test runs based on Gatling.io, an open-source tool. Web UI helps to manage runs and multiple target projects are supported simultaneously.

The tool can be used as a package integrated into the Spryker project or a standalone package. 

## What is Gatling?

Gatling is a powerful performance testing tool that supports HTTP, WebSocket, Server-Sent-Events, and JMS. Gatling is built on top of Akka that enables thousands of virtual users on a single machine. Akka has a message-driven architecture, and this overrides the JVM limitation of handling many threads. Virtual users are not threads but messages.

Gatling is capable of creating an immense amount of traffic from a single node, which helps to obtain the most precise information during the load testing.

## Prerequisites

- Java 8+
- Node 10.10+

## Integrating the load testing tool into an environment

The purpose of this guide is to show you how to integrate Spryker's load testing tool into your environment. While the instructions here will focus on setting this up with using one of Spryker’s many available demo shops, it can also be implemented into an on-going project.

For instructions on setting up a developer environment using one of the available Spryker shops, you can visit our [getting started guide](/docs/scos/dev/developer-getting-started-guide.html) which shows you how to set up the Spryker Commerce OS.

Some of the following options are available to choose from:
- [B2B Demo Shop](/docs/scos/user/intro-to-spryker//b2b-suite.html): A boilerplate for B2B commerce projects.
- [B2C Demo Shop](/docs/scos/user/intro-to-spryker/b2c-suite.html): A starting point for B2C implementations.

If you wish to start with a demo shop that has been pre-configured with the Spryker load testing module, you can use the [Spryker Suite Demo Shop](https://github.com/spryker-shop/suite).

For this example, we will be using the B2C Demo Shop. While a demo shop is used in this example, this can be integrated into a pre-existing project. You will just need to integrate Gatling into your project and generate the necessary data from fixtures into your database.

To begin, we will need to create a project folder and clone the B2C Demo Shop and the Docker SDK:

```bash
mkdir spryker-b2c && cd spryker-b2c
git clone https://github.com/spryker-shop/b2c-demo-shop.git ./
git clone git@github.com:spryker/docker-sdk.git docker
```

### Integrating Gatling

With the B2C Demo Shop and Docker SDK cloned, you will need to make a few changes to integrate Gatling into your project. These changes include requiring the load testing tool with composer as well as updating the [Router module](/docs/scos/dev/migration-concepts/silex-replacement/router/router-yves.html) inside of Yves. 

{% info_block infoBox %}

The required composer package as well as the changes to the Router module are needed on the project level. They are what help to run the appropriate tests and generate the data needed for the load test tool.

It should be noted that the Spryker Suite already has these changes implemented in them and comes pre-configured for load testing. For either of the B2C or B2B Demo Shops, you will need to implement the below changes.

{% endinfo_block %}

1. Require the *composer* package. This step is necessary if you are looking to implement the Gatling load testing tool into your project. This line will add the new package to your `composer.json` file. The `--dev` flag will install the requirements needed for development which have a version constraint (e.g. "spryker-sdk/load-testing": "^0.1.0").

```bash
composer require spryker-sdk/load-testing --dev
```

2. Add the Router provider plugin to `src/Pyz/Yves/Router/RouterDependencyProvider.php`. Please note that you must import the appropriate class, `LoadTestingRouterProviderPlugin` to initialize the load testing. We also need to build onto the available array, so the `return` clause should be updated to reflect the additions to the array with `$routeProviders`.

```php
<?php

...

namespace Pyz\Yves\Router;

...
use SprykerSdk\Yves\LoadTesting\Plugin\Router\LoadTestingRouterProviderPlugin;
...

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    ...
    
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        $routeProviders = [
        ...
        ];
		
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

### Setting up the environment

{% info_block infoBox %}

This step is only needed for a new project, such as our B2C Demo Shop example. Otherwise, if you have a pre-existing project, once the above changes for integrating Gatling have been made, you merely need to re-built the application (such as with `docker/sdk up --build --assets --data`) to apply the changes.

{% endinfo_block %}

Before we can generate the fixtures needed to be loaded into the database, we still need to set up the environment. We can do that with the following steps: 

1. Bootstrap the docker setup:

```bash
docker/sdk boot deploy.dev.yml
```

2. If the command you've run in the previous step returned any instructions, follow them.

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

You've set up your Spryker B2C Demo Shop and can now access your applications.

### Data preparation

With the integrations done and the environment set up, you will need to create and load the data fixtures. This is done by first generating the necessary fixtures before triggering a *publish* of all events and then running the *queue worker*. As this will be running tests for this data preparation step, this will need to be done in the [testing mode for the Docker SDK](/docs/scos/dev/the-docker-sdk/202204.0/running-tests-with-the-docker-sdk.html). 

These steps assume you are working from a local environment. If you are attempting to implement these changes to a production or staging environment, you will need to configure these commands to run with a Jenkins.


#### Steps for configuring a job in Jenkins

Jenkins is the default scheduler which ships with Spryker. It is an automation service which helps to automate tasks within Spryker. For an environment that is already set-up and hosted in the cloud, Jenkins can be used to schedule the necessary tasks you need for the data preparation step.

{% info_block infoBox %}

For most environments hosted, you will need to be connected to a VPN to access the Jenkins web UI.

{% endinfo_block %}

1. From the Dashboard, select `New Item`.
![screenshot](https://lh3.googleusercontent.com/drive-viewer/AJc5JmTzW2A-gkFX6PC1YiG4r0EUQX5S2xWDRQWq4hkgzKn889xva_FwrEaDo-lYl2i3CWgXiMqebPA=w1920-h919)

2. Enter an item name for the new job and select `Freestyle project`. Once you have done that, you can move to the next step with `OK`.
![screenshot](https://lh3.googleusercontent.com/drive-viewer/AJc5JmR2mN1q7_Du2JZPTw_CFqi9hjYnEqi8XvjXpgidcmcEeIEvUYwiEFX2GAAeLU105pz53guDHqI=w1920-h919)

3. The next step will allow up to input the commands we need to run. While a description is optional, you can choose to set one here. There are also additional settings, such as a display name, which may also be toggled. As you only need the commands to run once, you can move down to the `Build` section to add the three build steps needed.

Click on `Add build step` and select `Execute shell`. A Command field will appear, allowing you to input the following: 

```bash
APPLICATION_STORE="DE" COMMAND="$PHP_BIN vendor/bin/codecept fixtures -c vendor/spryker-sdk/load-testing" bash /usr/bin/spryker.sh
```

{% info_block errorBox %}

Once these fixtures have been generated, attempting to rerun them in the future with the default data files found in **/vendor/spryker-sdk/load-testing/tests/_data/** will cause an error. New data should be considered if you wish to regenerate fixtures for whatever reason.

{% endinfo_block %}

You can change the store for which you wish to generate fixtures for (i.e., `AT` or `US`). This command allows Codeception to locate the proper configuration file with the `-c` flag for the load testing tool. Once the fixtures have been generated, the data needs to be republished. We can have Jenkins do that with the same job by adding an additional build step with `Add build step`.

```bash
APPLICATION_STORE="DE" COMMAND="$PHP_BIN vendor/bin/console publish:trigger-events" bash /usr/bin/spryker.sh
```

From here, you can either add another build step to toggle the queue worker to run, or you can run the queue worker job already available within Jenkins, i.e. `DE__queue-worker-start`.

```bash
APPLICATION_STORE="DE" COMMAND="$PHP_BIN vendor/bin/console queue:worker:start -s " bash /usr/bin/spryker.sh
```
![screenshot](https://lh3.googleusercontent.com/drive-viewer/AJc5JmTeb8OPIZwA65e57LNg8fq_t7DnQ2T_okTLFBxcljKIXgqXcjWyt9yiCFiPKX50_Nb2LyE__Ao=w1920-h919)

4. Once the build steps have been added, you can `Save` to be taken to the project status page for the newly-created job. As this is a job that you only need to run once and no schedule was set, you can select the `Build Now` option.
![screenshot](https://lh3.googleusercontent.com/drive-viewer/AJc5JmRTLzDFMolgcaZ_xE-nKMNBEiIDXkSjwEiInkEIJL3ZbMbIY5ygKXqc-7eE_H5N2X-m7ap1l8s=w1920-h919)

5. With the job set to build and run, it will build a new workspace for the tasks and run each build step that you specified. Once the build has successfully completed, you can review the `Console Output` and then remove the project `Delete Project` once you as finished if you no longer need it.
![screenshot](https://lh3.googleusercontent.com/drive-viewer/AJc5JmSJmYXg2MyBlTWGbCU6BtzL4ye4y2YOiKNFSobALdDrnescyH8wgIIOzF84QfWQAeSVEmz5HnI=w1920-h919)

{% info_block infoBox %}

While it is possible to change the Jenkins cronjobs found at **/config/Zed/cronjobs/jenkins.php**, please note that these entries require a scheduled time and setting this will cause those jobs to run until they have been disabled in the Jenkins web UI.

{% endinfo_block %}

You are now done and can move on to [Installing Gatling](#installing-gatling)!

#### Steps for using a local environment

To start, entering testing mode with the following command:

```bash
docker/sdk testing
```

Once inside the Docker SDK CLI, to create and load the fixtures, do the following:

1. Generate fixtures and data for the load testing tool to utilize. As we are specifying a different location for the configuration files, we will need to use the `-c` or `--config` flag with our command. These tests will run to generate the data that is needed for load testing purposes. This can be done with the following:

```bash
vendor/bin/codecept fixtures -c vendor/spryker-sdk/load-testing
```

2. As we generated fixtures to be used with the Spryker load testing tool, the data needs to be republished. To do this, we need to trigger all *publish* events to publish Zed resources, such as products and prices, to storage and search functionality.

```bash
console publish:trigger-events
```

3. Run the *queue worker*. The [Queue System](/docs/scos/dev/back-end-development/data-manipulation/queue/queue.html) provides a protocol for managing asynchronous processing, meaning that the sender and the receiver do not have access to the same message at the same time. Queue Workers are commands which send the queued task to a background process and provides it with parallel processing. The `-s` or `--stop-when-empty` flag stops worker execution only when the queues are empty.

```bash
console queue:worker:start -s 
```

You should have the fixtures loaded into the databases and can exit the CLI to install Gatling into the project.

### Installing Gatling

{% info_block infoBox %}

If you are running this tool, you will need to have access to the appropriate Yves and Glue addresses of your environment. This may require your device be white-listed or may need to be accessed through VPN.

Both Java 8+ and Node 10.10+ are requirements to run Gatling from any system. This may also require further configuration on the standalone device.

{% endinfo_block %}

The last steps to getting the Spryker load testing tool set up with your project is to finally install Gatling. The load testing tool is set up with a PHP interface which makes calls to Gatling to run the tests that have been built into the tool. 

If you are attempting to load test your production or staging environment and are not testing your site locally, you can skip to the [steps for standalone installation](/docs/cloud/dev/spryker-cloud-commerce-os/performance-testing-in-staging-enivronments.html#installing-gatling-as-a-standalone-package).

An installation script is included with the load testing tool and can be run with the following:

1. Enter the tests directory:

```bash
cd vendor/spryker-sdk/load-testing
```

2. Run the installation script: 

```bash
./install.sh
```

After this step has been finished, you will be able to run the Web UI and tool to perform load testing for your project on the local level.

#### Installing Gatling as a standalone package

It is possible for you to run Gatling as a standalone package. Fixtures and data are still needed to be generated on the project level to determine what loads to send with each test. However, as the Spryker load testing tool utilizes NPM to run a localized server for the Web UI, you can do the following to install it:


1. You will first need to clone to the package directory from the Spryker SDK repository and navigate to it:

```bash
git clone git@github.com:spryker-sdk/load-testing.git
cd load-testing
```
2. Once you have navigated to the appropriate folder, you can run the installation script as follows:

```bash
./install.sh
```

This should install Gatling with Spryker's available Web UI, making it ready for load testing.

### Running Gatling

To get the Web UI of the Gatling tool, run:

```bash
npm run run
```

{% info_block infoBox %}

The tool runs on port 3000 by default. If you want to use a different port, specify it in the PORT environment variable.

{% endinfo_block %}

The tool should now be available at `http://localhost:3000`. The Web UI comes with a variety of pre-built tests. These tests can be run against either the front-end of Yves or through the Glue API. It allows you to set up an instance of a host using the Yves and Glue addresses which can have these tests applied against. Each of the available tests allows you to run with either a growing load or a constant load for a designated amount of time and number of requests per second. Gatling will run the tests specified through the Web UI and then out-put their results in a separate report with charts that can be further broken down.

Below is a list of available tests which can be run through the Web UI:

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

## Using Gatling

In the testing tool Web UI, you can do the following:
- Create, edit, and delete instances.
- Run one of the available tests on a specific instance.
- View detailed reports on all the available instances and tests.

You can perform all these actions from the main page:

![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/main-page.png)


### Managing instances

You can create new instances and edit or delete the existing ones.

#### Creating an instance

To create an instance:

1. In the navigation bar, click **New instance**. The *Instance* page opens.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/instance.png)
2. Enter the instance name.
3. Optional: in the Yves URL field, enter the Yves server URL.
4. Optional: in the Glue URL field, enter the GLUE API server URL.
5. Click **Go**.

Now, the new instance should appear in the navigation bar in *INSTANCES* section.


#### Editing an instance
For the already available instances, you can edit Yves URL and Glue URL. Instance names cannot be edited.

To edit an instance:
1. In the navigation bar, click **New instance**. The *Instance* page opens.
2. Click the *edit* sign next to the instance you want to edit: 
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/edit-instance.png)
3. Edit the Yves URL or the Glue URL.
4. Click **Go**.

Now, the instance data is updated.

#### Deleting an instance
To delete an instance:
1. In the navigation bar, click **New instance**. The *Instance* page opens.
2. Click the X sign next to the instance you want to delete: 
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/delete-instance.png)
3. Click **Go**.
 
Your instance is now deleted.

### Running tests

To run a new load test:

1. In the navigation bar, click **New test**. The *Run a test* page opens:
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/test.png)
2. Select the instance you want to run the test for. See [Managing instances](#managing-instances) for information on how you can create and manage instances.
3. In the *Test* field, select the test you want to run.
4. In the *Type* field, select one of the test types:
	- *Ramp*: Test type with the growing load (request per second), identifies a Peak Load capacity.
	- *Steady*: Test type with the constant load, confirms reliance of a system under the Peak Load.
5. In the *Target RPS* field, set the test RPS (request per second) value.
6. In the *Duration* field, set the test duration.
7. Optional: In the *Description*, provide the test description.
8. Click **Go**.

That's it - your test should run now. While it runs, you see a page where logs are generated. Once the time you specified in the Duration field from step 6 elapses, the test stops, and you can view the detailed test report. 


### Viewing the test reports

On the main page, you can check what tests are currently being run as well as view the detailed log for the completed tests.

---
**Info**

By default, information on all instances and tests is displayed on the main page. To check details for specific tests or instances, specify them in the *Test* or *Instance* columns, respectively:
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/filter.png)

---

To check what tests are being run, on the main page, expand the *Running* section. 

To view the reports of the completed tests, on the main page, in the *Done* section, click **Report log** for the test you need:
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/reports.png) A new tab with the detailed Gatling reports is opened. 



## Example test: Measuring the capacity

Let's consider the example of measuring the capacity with the `AddToCustomerCart` or `AddToGuestCart` test.

During the test, Gatling calls Yves, Yves calls Zed, Zed operates with the database. Data flows through the entire infrastructure.

For the *Ramp probe* test type, the following is done:

- Ramping *Requests per second* (RPS) from 0 to 100 over 10 minutes.
- Measuring the RPS right before the outage.
- Measuring the average response time before the outage under maximum load.
  [56 RPS, 250ms]
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/ramp-probe.png)

For the *Steady probe* test type, the following is done:

- Keeping the RPS on the expected level for 30 minutes. [56 RPS]
- Checking that the response time is in acceptable boundaries. [< 400ms for 90% of requests]
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/steady-probe.png)

## Gatling Reports

Gatling reports are a valuable source of information to read the performance data by providing some details about requests and response timing. 

There are the following report types in Gatling:
- Indicators
- Statistics
- Active users among time
- Response time distribution
- Response time percentiles over time (OK)
- Number of requests per second
- Number of responses per second
- Response time against Global RPS


### Indicators

This chart shows how response times are distributed among the standard ranges.
The right panel shows the number of OK/KO requests.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/indicators.png)

### Statistics

This table shows some standard statistics such as min, max, average, standard deviation, and percentiles globally and per request.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/statistics.png)

### Active users among time

This chart displays the active users during the simulation: total and per scenario.

“Active users” is neither “concurrent users” or “users arrival rate”. It’s a kind of mixed metric that serves for both open and closed workload models, and that represents “users who were active on the system under load at a given second”.

It’s computed as:
```
(number of alive users at previous second)
+ (number of users that were started during this second)
- (number of users that were terminated during the previous second)
```
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/active-users-among-time.png)

### Response time distribution

This chart displays the distribution of response times.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/response-time-distribution.png)

### Response time percentiles over time (OK)

This chart displays a variety of response time percentiles over time, but only for successful requests. As failed requests can end prematurely or be caused by timeouts, they would have a drastic effect on the computation for percentiles.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/response-time-percentiles-over-time-ok.png)

### Number of requests per second

This chart displays the number of requests sent per second overtime.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/number-of-requests-per-second.png)

### Number of responses per second

This chart displays the number of responses received per second overtime: total, successes, and failures.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/number-of-responses-per-second.png)

### Response time against Global RPS

This chart shows how the response time for the given request is distributed, depending on the overall number of requests at the same time.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/response-time-against-global-rps.png)

Based on our experience, the [Load testing tool](https://github.com/spryker-sdk/load-testing) can greatly assist you in conducting more effective load tests.