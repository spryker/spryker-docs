---
title: Performance testing in staging environments
description: Learn how to efficiently conduct performance testing in Spryker Cloud Commerce OS staging environments, ensuring scalability and high-quality performance before production.
last_updated: Sep 15, 2022
template: concept-topic-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/performance-testing.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/performance-testing-in-staging-enivronments.html
---

Performance testing is an integral part of the development and deployment process. Even if you execute performance testing during development, we highly recommend testing the performance of your code in a staging environment before deploying it in production environments.

Since the staging environment isn't designed to be as performant as the production environment, we recommend using a subset of the data and extrapolate the results.

If you want to execute a full load test on a production-like dataset and traffic, use a production environment. If you production isn't live yet, you can use directly in that environment. Otherwise, you can order an additional environment by contacting you Account Executive. Testing with real or at least mock data provides significantly better and more reliable results than testing with a small data set. To conduct effective performance tests, we recommend the same data that you're going to use use in the live production environment.

If you are unable to use real data for your load tests, you can use the [test data](https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/performance-testing-in-staging-enivronments.md/performance-testing-data.zip) for an expanding amount of use cases. Additional support ins't provided for this data.

Based on our experience, the [Load testing tool](https://github.com/spryker-sdk/load-testing) can greatly assist you in conducting more effective load tests.

## Load testing tool for Spryker

To assist in performance testing, we have a [load testing tool](https://github.com/spryker-sdk/load-testing). The tool contains predefined test scenarios that are specific to Spryker. Test runs based on Gatling.io, an open-source tool. Web UI helps to manage runs and multiple target projects are supported simultaneously.

The tool can be used as a package integrated into the Spryker project or as a standalone package.

### What is Gatling?

Gatling is a powerful performance testing tool that supports HTTP, WebSocket, Server-Sent-Events, and JMS. Gatling is built on top of Akka that enables thousands of virtual users on a single machine. Akka has a message-driven architecture, and this overrides the JVM limitation of handling many threads. Virtual users are not threads but messages.

Gatling is capable of creating an immense amount of traffic from a single node, which helps obtain the most precise information during the load testing.

### Prerequisites

- Java 8+
- Node 10.10+

### Including the load testing tool into an environment

The purpose of this guide is to show you how to integrate Spryker's load testing tool into your environment. While the instructions here will focus on setting this up with using one of Spryker's many available demo shops, it can also be implemented into an on-going project.

For instructions on setting up a developer environment using one of the available Spryker shops, you can visit our [getting started guide](/docs/dg/dev/development-getting-started-guide.html) which shows you how to set up the Spryker Commerce OS.

Some of the following options are available to choose from:
- [B2B Demo Shop](/docs/about/all//b2b-suite.html): A boilerplate for B2B commerce projects.
- [B2C Demo Shop](/docs/about/all/b2c-suite.html): A starting point for B2C implementations.

If you wish to start with a demo shop that has been pre-configured with the Spryker load testing module, you can use the [Spryker Suite Demo Shop](https://github.com/spryker-shop/suite).

For this example, we will be using the B2C Demo Shop. While a demo shop is used in this example, this can be integrated into a pre-existing project. You will just need to integrate Gatling into your project and generate the necessary data from fixtures into your database.

To begin, we will need to create a project folder and clone the B2C Demo Shop and the Docker SDK:

```bash
mkdir spryker-b2c && cd spryker-b2c
git clone https://github.com/spryker-shop/b2c-demo-shop.git ./
git clone git@github.com:spryker/docker-sdk.git docker
```

#### Integrating Gatling

With the B2C Demo Shop and Docker SDK cloned, you will need to make a few changes to integrate Gatling into your project. These changes include requiring the load testing tool with composer as well as updating the [Router module](/docs/dg/dev/upgrade-and-migrate/silex-replacement/router/router-yves.html) inside of Yves.

{% info_block infoBox %}

The required composer package as well as the changes to the Router module are needed on the project level. They are what help to run the appropriate tests and generate the data needed for the load test tool.

It should be noted that the Spryker Suite already has these changes implemented in them and comes pre-configured for load testing. For either of the B2C or B2B Demo Shops, you will need to implement the below changes.

{% endinfo_block %}

1. Requires the *composer* package. This step is necessary if you are looking to implement the Gatling load testing tool into your project. This line will add the new package to your `composer.json` file. The `--dev` flag will install the requirements needed for development which have a version constraint–for example, "spryker-sdk/load-testing": "^0.1.0").

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

#### Setting up the environment

{% info_block infoBox %}

This step is only needed for a new project, such as our B2C Demo Shop example. Otherwise, if you have a pre-existing project, once the above changes for integrating Gatling have been made, you merely need to re-build the application (such as with `docker/sdk up --build --assets --data`) to apply the changes.

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

#### Data preparation

With the integrations done and the environment set up, you will need to create and load the data fixtures. This is done by first generating the necessary fixtures before triggering a *publish* of all events and then running the *queue worker*. As this will be running tests for this data preparation step, this will need to be done in the [testing mode for the Docker SDK](/docs/dg/dev/sdks/the-docker-sdk/running-tests-with-the-docker-sdk.html).

These steps assume you are working from a local environment. If you are attempting to implement these changes to a production or staging environment, you will need to take separate steps to generate parity data between the load-testing tool and your cloud-based environment.

##### Steps for using a cloud-hosted environment.

The Gatling test tool uses pre-seeded data which is used locally for both testing and generating the fixtures in the project's database. If you wish to test a production or a staging environment, there are several factors which need to be addressed.

- You may have data you wish to test with directly which the sample dummy data may not cover.
- Cloud-hosted applications are not able to be run in test mode.
- Cloud-hosted applications are not set up to run `codeception`.
- Jenkins jobs in a cloud-hosted application are set up to run differently than those found on a locally hosted environment.
- Some cloud-hosted applications may require `BASIC AUTH` authentication or require being connected to a VPN to access.

Data used for Gatling's load testing can be found in **/load-test-tool-dir/tests/_data**. Any data that you generate from your cloud-hosted environment will need to be stored here.

###### Setting up for basic authentication.

If your environment is set for `BASIC AUTH` authentication and requires a user name and password before the site can be loaded, Gatling needs additional configuration. Found within **/load-test-tool-dir/resources/scenarios/spryker/**, two files control the HTTP protocol which is used by each test within the same directory. `GlueProtocol.scala` and `YvesProtocol.scala` each have a value (`httpProtocol`) which needs an additional argument to account for this authentication mode.

```scala
val httpProtocol = http
   .baseUrl(baseUrl)

...
   .basicAuth("usernamehere","passwordhere")
...

   .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")
```

**usernamehere** and **passwordhere** should match the username and password used for your environment's basic authentication, and not an account created within Spryker. This username and password are typically set up within your deploy file.

###### Generating product data

{% info_block errorBox %}

You will need to be connected to the appropriate VPN for whichever resource you are trying to access.

{% endinfo_block %}

Product data can be generated from existing product data for use with the load-testing tool. Within **/load-test-tool-dir/tests/_data**, you will find `product_concrete.csv` which stores the necessary **sku** and **pdp_url** for each product. This information can be parsed directly from the existing data of your cloud-hosted environment. To do so, connect to your store's database. Product data is stored in the `data` column found within the `spy_product_concrete_storage` table as a JSON entry. We can extract this information and format it with the appropriate column names with the following command:

```sql
-- `us-docker` refers to your database name. Please make the appropriate adjustments in the SQL query below

SELECT
       JSON_UNQUOTE(JSON_EXTRACT(data, "$.sku")) as `sku`,
       JSON_UNQUOTE(JSON_EXTRACT(data, "$.url")) as `url`
FROM `us-docker`.`spy_product_concrete_storage`;
```

This command parses through the JSON entry and extracts what we need. Once this information has been generated, it should be saved as `product_concrete.csv` and saved in the **/load-test-tool-dir/tests/_data** directory.

###### Generating customer data

{% info_block errorBox %}

You will need to be connected to the appropriate VPN for whichever resource you are trying to access.

{% endinfo_block %}

Customer data can be generated from existing product data for use with the load-testing tool. Within **/load-test-tool-dir/tests/_data**, you will find `customer.csv` which stores the necessary fields for each user (email, password, auth_token, first_name, and last_name). Most of this information can be parsed directly from the existing data of your cloud-hosted environment. There are a number of caveats which come with generating this customer data:

- To generate information for `auth_token`, a separate Glue call is required.
- Passwords are encrypted in the database, while the load-testing tool requires a password to use in plain-text.

Because of these aforementioned issues, we recommended creating the test users you need first through the Back Office. For instructions, see [Managing customers](/docs/pbc/all/customer-relationship-management/{{site.version}}/base-shop/manage-in-the-back-office/customers/create-customers.html).

Once the users have been created, you will need to generate access tokens for each. This can be done using Glue with the `access-token` end point. You can review the [access-token](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html) documentation for further guidance, but below is a sample of the call to be made.

Expected request body
```json
{
  "data": {
    "type": "string",
    "attributes": {
      "username": "string",
      "password": "string"
    }
  }
}
```

Sample call with CURL
```bash
curl -X POST "http://glue.de.spryker.local/access-tokens" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"data\":{\"type\":\"access-tokens\",\"attributes\":{\"username\":\"emailgoeshere\",\"password\":\"passwordgoeshere\"}}}"
```

{% info_block infoBox %}

For each of these, the username is typically the email of the user that was created. Within the response from Glue, you will also want the **accessToken** to be saved for the **auth_token** column.

{% endinfo_block %}

Once users have been created and access tokens generated, this information should be stored and formatted in `customer.csv` and saved in the **/load-test-tool-dir/tests/_data** directory. Make sure to put the correct information under the appropriate column name.

##### Steps for using a local environment

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

3. Run the *queue worker*. The [Queue System](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html) provides a protocol for managing asynchronous processing, meaning that the sender and the receiver do not have access to the same message at the same time. Queue Workers are commands which send the queued task to a background process and provides it with parallel processing. The `-s` or `--stop-when-empty` flag stops worker execution only when the queues are empty.

```bash
console queue:worker:start -s
```

You should have the fixtures loaded into the databases and can now exit the CLI to install Gatling into the project.

##### Alternative method to generate local fixtures.

Jenkins is the default scheduler which ships with Spryker. It is an automation service which helps to automate tasks within Spryker. If you would like an alternative way to generate fixtures for your local environment, Jenkins can be used to schedule the necessary tasks you need for the data preparation step.

1. From the Dashboard, select `New Item`.
![new-item](https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/performance-testing-in-staging-enivronments.md/new-item.png)

2. Enter an item name for the new job and select `Freestyle project`. Once you have done that, you can move to the next step with `OK`.
![freestyle-project](https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/performance-testing-in-staging-enivronments.md/freestyle-project.png)

3. The next step will allow up to input the commands we need to run. While a description is optional, you can choose to set one here. There are also additional settings, such as a display name, which may also be toggled. As you only need the commands to run once, you can move down to the `Build` section to add the three build steps needed.

Click on `Add build step` and select `Execute shell`. A Command field will appear, allowing you to input the following:

```bash
APPLICATION_STORE="DE" COMMAND="$PHP_BIN vendor/bin/codecept fixtures -c vendor/spryker-sdk/load-testing" bash /usr/bin/spryker.sh
```

{% info_block errorBox %}

Once these fixtures have been generated, attempting to rerun them in the future with the default data files found in **/vendor/spryker-sdk/load-testing/tests/_data/** will cause an error. New data should be considered if you wish to regenerate fixtures for whatever reason.

{% endinfo_block %}

You can change the store for which you wish to generate fixtures for, that is `AT` or `US`. This command allows Codeception to locate the proper configuration file with the `-c` flag for the load testing tool. Once the fixtures have been generated, the data needs to be republished. We can have Jenkins do that with the same job by adding an additional build step with `Add build step`.

```bash
APPLICATION_STORE="DE" COMMAND="$PHP_BIN vendor/bin/console publish:trigger-events" bash /usr/bin/spryker.sh
```

From here, you can either add another build step to toggle the queue worker to run, or you can run the queue worker job already available within Jenkins, that is `DE__queue-worker-start`.

```bash
APPLICATION_STORE="DE" COMMAND="$PHP_BIN vendor/bin/console queue:worker:start -s " bash /usr/bin/spryker.sh
```
![workers](https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/performance-testing-in-staging-enivronments.md/workers.png)

4. Once the build steps have been added, you can `Save` to be taken to the project status page for the newly created job. As this is a job that you only need to run once and no schedule was set, you can select the `Build Now` option.
![build-now](https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/performance-testing-in-staging-enivronments.md/build-now.png)

5. With the job set to build and run, it will build a new workspace for the tasks and run each build step that you specified. Once the build has successfully completed, you can review the `Console Output` and then remove the project with `Delete Project` once you are finished, if you no longer need it.
![console-output](https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/performance-testing-in-staging-enivronments.md/console-output.png)

{% info_block infoBox %}

While it's possible to change the Jenkins cronjobs found at **/config/Zed/cronjobs/jenkins.php**,  note that these entries require a scheduled time and setting this will cause those jobs to run until they have been disabled in the Jenkins web UI.

{% endinfo_block %}

You are now done and can move on to [Installing Gatling](#installing-gatling)!

#### Installing Gatling

{% info_block infoBox %}

If you are running this tool, you will need to have access to the appropriate Yves and Glue addresses of your environment. This may require your device be white-listed or may need to be accessed through VPN.

Both Java 8+ and Node 10.10+ are requirements to run Gatling from any system. This may also require further configuration on the standalone device.

{% endinfo_block %}

The last steps to getting the Spryker load testing tool set up with your project is to finally install Gatling. The load testing tool is set up with a PHP interface which makes calls to Gatling to run the tests that have been built into the tool.

If you are attempting to load test your production or staging environment and are not testing your site locally, you can skip to the [steps for standalone installation](/docs/ca/dev/performance-testing-in-staging-enivronments.html#installing-gatling-as-a-standalone-package).

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

##### Installing Gatling as a standalone package

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

#### Running Gatling

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

{% info_block errorBox %}

Tests like **CartApi** and **GuestCartApi** use an older method of the `cart` end-point and will need to have their scenarios updated. These and other tests may need to be updated to take this into account. Please visit the [Glue Cart](/docs/pbc/all/cart-and-checkout/{{site.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html#create-a-cart) reference for more details.

{% endinfo_block %}


### Using Gatling

In the testing tool Web UI, you can do the following:
- Create, edit, and delete instances.
- Run one of the available tests on a specific instance.
- View detailed reports on all the available instances and tests.

You can perform all these actions from the main page:

![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/main-page.png)


#### Managing instances

You can create new instances and edit or delete the existing ones.

##### Creating an instance

To create an instance:

1. In the navigation bar, click **New instance**. The *Instance* page opens.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/instance.png)
2. Enter the instance name.
3. Optional: in the Yves URL field, enter the Yves server URL.
4. Optional: in the Glue URL field, enter the GLUE API server URL.
5. Click **Go**.

Now, the new instance should appear in the navigation bar in *INSTANCES* section.


##### Editing an instance
For the already available instances, you can edit Yves URL and Glue URL. Instance names cannot be edited.

To edit an instance:
1. In the navigation bar, click **New instance**. The *Instance* page opens.
2. Click the *edit* sign next to the instance you want to edit:
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/edit-instance.png)
3. Edit the Yves URL or the Glue URL.
4. Click **Go**.

Now, the instance data is updated.

##### Deleting an instance
To delete an instance:
1. In the navigation bar, click **New instance**. The *Instance* page opens.
2. Click the X sign next to the instance you want to delete:
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/delete-instance.png)
3. Click **Go**.

Your instance is now deleted.

#### Running tests

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


#### Viewing the test reports

On the main page, you can check what tests are currently being run as well as view the detailed log for the completed tests.

---
**Info**

By default, information on all instances and tests is displayed on the main page. To check details for specific tests or instances, specify them in the *Test* or *Instance* columns, respectively:
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/filter.png)

---

To check what tests are being run, on the main page, expand the *Running* section.

To view the reports of the completed tests, on the main page, in the *Done* section, click **Report log** for the test you need:
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/reports.png) A new tab with the detailed Gatling reports is opened.



### Example test: Measuring the capacity

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

### Gatling Reports

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


#### Indicators

This chart shows how response times are distributed among the standard ranges.
The right panel shows the number of OK/KO requests.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/indicators.png)

#### Statistics

This table shows some standard statistics such as min, max, average, standard deviation, and percentiles globally and per request.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/statistics.png)

#### Active users among time

This chart displays the active users during the simulation: total and per scenario.

"Active users" is neither "concurrent users" or "users arrival rate". It's a kind of mixed metric that serves for both open and closed workload models, and that represents "users who were active on the system under load at a given second".

It's computed as:
```
(number of alive users at previous second)
+ (number of users that were started during this second)
- (number of users that were terminated during the previous second)
```
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/active-users-among-time.png)

#### Response time distribution

This chart displays the distribution of response times.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/response-time-distribution.png)

#### Response time percentiles over time (OK)

This chart displays a variety of response time percentiles over time, but only for successful requests. As failed requests can end prematurely or be caused by timeouts, they would have a drastic effect on the computation for percentiles.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/response-time-percentiles-over-time-ok.png)

#### Number of requests per second

This chart displays the number of requests sent per second overtime.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/number-of-requests-per-second.png)

#### Number of responses per second

This chart displays the number of responses received per second overtime: total, successes, and failures.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/number-of-responses-per-second.png)

#### Response time against Global RPS

This chart shows how the response time for the given request is distributed, depending on the overall number of requests at the same time.
![screenshot](https://github.com/spryker-sdk/load-testing/raw/master/docs/images/response-time-against-global-rps.png)
