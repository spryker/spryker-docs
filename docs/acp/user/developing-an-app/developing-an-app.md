---
title: Developing an App
Descriptions: Learn the step-by-step process of developing an app using Spryker's Mini-Framework
template: howto-guide-template
redirect_from:
- /docs/acp/user/developing-an-app.html
---

# Developing an App with Spryker Mini-Framework

This guide will walk you through the process of developing an app using Spryker's Mini-Framework. Follow the steps below to set up and start your app development.

## Prerequisites

Before you begin, ensure that you have the following prerequisites in place:

- Completed the [thought process](#thought-process) for your app.
- An empty GitHub repository.
- A local project directory for your app (e.g., `/www/my-app`).
- [DockerSDK](https://github.com/spryker/docker-sdk) installed globally.

Make sure you have Spryker Docker SDK, Git, and an empty repository for your app code.

{% info_block infoBox "Info" %}
Download the completed example from the Mini-Framework [here](https://github.com/spryker-projects/mini-framework).
{% endinfo_block %}
 
## Thought process
First, think about what your app should be capable of: what features it will bring, and what data will be exchanged, not only to you but also to those interested in your app functionality. For example, what messages could be of interest to others, and what API endpoints you should provide. 

### API-first
It's strongly recommended that apps follow the API-first approach. 
API-first means that your app is centered on the API. It should be possible to perform every action via the scripting language, and every piece of functionality should be available for other systems to leverage. For more information on the API-first approach, see [this blog post](https://www.algolia.com/blog/product/the-5-principles-of-api-first-development-and-what-does-api-first-even-mean/).
You need to have a clear understanding of what your app API will provide to others, and always keep that in mind when designing your app.

### Schema-first

Before you start with the development, you should design your API schema files. Depending on your requirements, you can have an OpenAPI or an Async API schema file. In this step, you define the Sync API endpoints your app will provide to others, the messages you will emit or consume, and the data you expect to work with.

{% info_block infoBox "Info" %}
For more information about Async API schema design, see [Designing your APIs with Async API](https://www.asyncapi.com/blog/designing_your_apis_with_asyncapi_part_1). 

For more information about OpenAPI schema design, see [Best practices in API design](https://swagger.io/resources/articles/best-practices-in-api-design/).
{% endinfo_block %}

You can use the following tools to design your APIs:
- [Async API Studio](https://studio.asyncapi.com/)
- [Swagger Editor](https://editor.swagger.io/)

## Create an app

Creating an app is straightforward. Execute the following commands:
```bash
mkdir my-app
cd my-app
git clone https://github.com/spryker-projects/mini-framework.git . --depth 1 && rm -rf .git && git init
git add --all
git commit -m "first commit"
```

After these steps, you will have a new local repository that needs to be linked with your remote one.

If not done yet, create a new remote repository by opening your [Github account](https://github.com/newConnect). After you created a new repository, GitHub shows you instructions on how to continue. You should follow the list below as you don’t need some of the first steps proposed by GitHub as we’ve already initialized git and we already have a `README.md` from the cloned repository.

{% info_block infoBox "Info" %}
This step can also be done later
{% endinfo_block %}

```bash
git branch -M main
git remote add origin git@github.com:<organization>/<repository>.git
git push -u origin main
```

Now you have done the groundwork that enables you to develop an App. You created a new repository that contains the boilerplate code for almost any App you’d like to build.

## Start local development environment

The Mini-Framework already comes with a predefined Docker configuration. Change the `deploy.dev.yml` and replace `glue-backend.de.spryker.local` with `my-app.de.spryker.local` and then run the following command in the root of your new repository.

### Boot and Up your environment

With this command, you will boot your application and start it

```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

After creating the development environment for you, you have several ways of using the App. The easiest one is to run the test suite.

```bash
docker/sdk testing codecept run
```

You will see now that your App boilerplate code is running.

## Adding App manifest files

Before your App can be listed in the App Store Catalog you need to add the following files.

### Manifest

The manifest file is the most important one for the App and contains data that will be displayed in the App Store Catalog. You can use the [manifest code snippet](/docs/acp/user/developing-an-app/code-snippets/manifest.html) and update it to your needs. Add this file to `config/app/manifest/en_US.json` of your App.

Manifest files have to have the local name as file name e.g. `en_US.json` and the file has to be placed inside the `config/app/manifest` directory.

### Configuration

This file contains all necessary form fields for inputs required by the user of your App to be displayed in the App Store Catalog. You can use the [configuration code snippet](/docs/acp/user/developing-an-app/code-snippets/configuration.html) and update it to your needs. Add this file to `config/app/configuration.json` of your App.

### Translation

This file contains all translations for the form fields you’ve previously defined. You can use the Hello World example translation file and update it to your needs. Add this file to `config/app/translation.json` of your App.

## Adding the Registry code

Every App needs some default endpoints for the App Registry Service. This service is in between of the App Store Catalog and all Apps. Each App will be registered in the App Registry Service and to be able to configure your App needs the following endpoints for communication:
 - Configure
 - Disconnect

To be able to use your Mini Framework as an App you need to add a new Spryker module:
```bash
docker/sdk cli composer require spryker/app-kernel spryker/message-broker-aws spryker/propel-encryption-behavior 
```
This `spryker/app-kernel` module will make the Mini-Framework an App. It provides SyncAPI schema and code for configuration and disconnection as well as an AsyncAPI schema and code for the AppConfigure and AppDisconnect messages. 
The `spryker/message-broker-aws` module installs the needed plugins which will be used to send and receive messages. In addition to installing the modules you need to configure them.

## Setup the Message Broker

The MessageBroker needs to be installed and configured. Follow the description on this page [Setup the MessageBroker](/docs/acp/user/developing-an-app/setting-up-message-broker.html).

## Config

Every App needs an app identifier to be identifyable in the App Eco System. Add the following configuration to your `config/Shared/config_default.php`

```php
use Spryker\Shared\AppKernel\AppKernelConstants;

$config[AppKernelConstants::APP_IDENTIFIER] = getenv('APP_IDENTIFIER') ?: 'hello-world';
```

## Plugins

You need to add some Plugins to your App to enable certain functionality. 

### AppRouteProviderPlugin

Add the `\Spryker\Glue\App\Plugin\RouteProvider\AppRouteProviderPlugin` to the `\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider::getRouteProviderPlugins()` method. In case the method doesn’t exist add the complete method.

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\AppKernel\Plugin\RouteProvider\AppRouteProviderPlugin;
use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{   
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProviderPlugins(): array
    {
        return [
            new AppRouteProviderPlugin(),
        ];
    }
}
```

This enables the two required endpoints for the App Catalog Communication.

## Building the Transfer Objects

Transfer objects are used in many place and since we installed some modules we also need to run the console command to generate the transfers.

```bash
docker/sdk cli console transfer:generate
```

## Update the Database

Transfer objects are used in many place and since we installed some modules we also need to run the console command to generate the transfers.

```bash
docker/sdk cli console propel:install
```

## Testing the endpoints

You can now test the configure request with the following snippets. Run the cURL snippets from your host machine.

### Testing the /private/configure endpoint

```bash
curl --location --request POST 'http://my-app.de.spryker.local/private/configure' \
--header 'Content-Type: application/vnd.api+json' \
--header 'Accept: application/vnd.api+json' \
--header 'Accept-Language: en-US, en;q=0.9,*;q=0.5' \
--header 'X-Tenant-Identifier: dev-US' \
--data-raw '{
    "data": {
        "type": "configuration",
        "attributes": {
            "configuration": "{\"clientId\":\"clientId\",\"clientSecret\":\"clientSecret\",\"securityUri\":\"securityUri\",\"transactionCallsUri\":\"transactionCallsUri\",\"isActive\": false,\"isInvoicingEnabled\": false}"
        }
    }
}'
```

You can check now your database if it contains the newly created configuration in the `spy_app_config` table.

### Testing the /private/disconnect endpoint

```bash
curl --location --request POST 'http://my-app.de.spryker.local/private/disconnect' \
--header 'Content-Type: application/vnd.api+json' \
--header 'Accept: application/vnd.api+json' \
--header 'Accept-Language: de-DE, en;q=0.9,*;q=0.5' \
--header 'X-Tenant-Identifier: dev-US' \
--data-raw ''
```

You can check now your database if previously created configuration in the spy_app_config table is removed.

## Summary
Your app is now ready to be used, although it doesn't contain any business logic yet. 
Start implementing the business logic by Implementing a Synchronous API and/or Implementing an Asynchronous API.

## Debug your app

When you want to understand what is happening in the code you can [Debug your App](/docs/acp/user/developing-an-app/debug-an-app-with-xdebug.html) with XDebug and by adding `--cookie "XDEBUG_SESSION=PHPSTORM;path=/;" \` to the above cURL request.
Entry points for setting breakpoints are:
- `Spryker\Glue\App\Controller\AppConfigController`
- `\Spryker\Glue\App\Controller\AppDisconnectController`

