---
title: Developing an app with Spryker Mini-Framework
Descriptions: Learn the step-by-step process of developing an app using Spryker's Mini-Framework
template: howto-guide-template
redirect_from:
- /docs/acp/user/developing-an-app.html
- /docs/acp/user/developing-an-app/developing-an-app.html
---

This document will walk you through the process of developing an app using Spryker's Mini-Framework. Follow the steps below to set up and start your app development.

{% info_block infoBox "Development guidelines" %}

Development guidelines for ACP apps contains general rules how to design an app and write code for it.
ACP apps are based on the [mini-framework](https://github.com/spryker-projects/mini-framework), which is its turn is based on the Spryker Framework. Therefore, we recommend following the same rules that are applicable for the [Spryker project development](https://docs.spryker.com/docs/scos/dev/guidelines/project-development-guidelines.html#updating-spryker).

{% endinfo_block %}

## Prerequisites

Before you begin, ensure that you have the following prerequisites in place:

- Completed the [thought process](#thought-process) for your app.
- An empty GitHub repository.
- A local project directory for your app (for example, `/www/my-app`).
- [DockerSDK](https://github.com/spryker/docker-sdk) installed globally.

Make sure you have the Spryker Docker SDK, Git, and an empty repository for your app code.

{% info_block infoBox "Info" %}

[Download](https://github.com/spryker-projects/mini-framework) the completed example from the Mini-Framework.

{% endinfo_block %}
 
## Thought process
First, think about what your app should be capable of: what features it will bring and what data will be exchanged, not only to you but also to those interested in your app functionality. For example, what messages could be of interest to others, and what API endpoints you should provide. 

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

To create an app, execute the following commands:

```bash
mkdir my-app
cd my-app
git clone https://github.com/spryker-projects/mini-framework.git . --depth 1 && rm -rf .git && git init
git add --all
git commit -m "first commit"
```

After running these commands, you will have a new local repository that needs to be linked with your remote one.

If not done yet, create a new remote repository by opening your [Github account](https://github.com/newConnect). After you created a new repository, GitHub shows you instructions on how to continue. Follow the list below, as you don’t need some of the first steps proposed by GitHub since you’ve already initialized Git and you already have the `README.md` file from the cloned repository.

```bash
git branch -M main
git remote add origin git@github.com:<organization>/<repository>.git
git push -u origin main
```
{% info_block infoBox "Info" %}

You can also execute this step later.

{% endinfo_block %}

Now, you have done the groundwork that enables you to develop an App. You created a new repository that contains the boilerplate code for almost any App you’d like to build.

## Start the local development environment

The Mini-Framework already comes with the predefined Docker configuration. Change the `deploy.dev.yml` by replacing `glue-backend.de.spryker.local` with `my-app.de.spryker.local`. After that, run the command provided in the next section at the root of your new repository.

### Boot and up your environment

Execute the following command to boot your application and start it:

```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

After creating the development environment, you have several ways of using the app. The easiest one is to run the test suite as follows:

```bash
docker/sdk testing codecept run
```

You will now see that your app boilerplate code is up and running.

## Add the app manifest files

Before your app can be listed in the App Store Catalog, you need to add the following files.

### Manifest

The manifest file is the most important one for the app. It contains data that will be displayed in the App Store Catalog. You can use the [manifest code snippet](/docs/acp/user/develop-an-app/code-snippets/manifest-json-file.html) and update it to your needs. Add the manifest file to `config/app/manifest/en_US.json` of your app.

Manifest files must have the local name as the filename, for example, `en_US.json`, and should be placed inside the `config/app/manifest` directory.

### Configuration

The configuration file contains all necessary form fields for inputs required by the user of your app, to be displayed in the App Store Catalog. You can use the [configuration code snippet](/docs/acp/user/develop-an-app/code-snippets/configuration-json-file.html) and update it to your needs. Add this file to `config/app/configuration.json` of your app.

### Translation

The translation file contains all translations for the form fields you’ve previously defined. You can use the Hello World [example translation file](/docs/acp/user/develop-an-app/code-snippets/translation-json-file.html) and update it to your needs. Add this file to `config/app/translation.json` of your app.

## Add the registry (code)

Every app requires default endpoints for the App Registry Service. This service acts as an intermediary between the App Store Catalog and all apps. Each app is registered in the App Registry Service and requires the following endpoints for communication:

 - Configure
 - Disconnect

To be able to use your Mini Framework as an app, add a new Spryker module:

```bash
docker/sdk cli composer require spryker/app-kernel spryker/message-broker-aws spryker/propel-encryption-behavior 
```

The `spryker/app-kernel` module transforms the Mini-Framework into an app. It provides SyncAPI schema and code for configuration and disconnection, as well as an AsyncAPI schema and code for the AppConfigure and AppDisconnect messages. 
The `spryker/message-broker-aws` module installs the necessary plugins for sending and receiving messages. 
After installing the modules, you need to configure them. See the [configuration example](https://github.com/spryker-projects/mini-framework/blob/examples/acp/hello-world/my-app-final/config/Shared/config_default.php#L28).

## Set up the message broker

Install and configure the message broker as described in [Set up the message broker](/docs/acp/user/develop-an-app/set-up-the-message-broker.html).

## Config

To be identifiable in the App Eco System, every app needs an app identifier. To provide the identifier, add the following configuration to `config/Shared/config_default.php`:

```php
use Spryker\Shared\AppKernel\AppKernelConstants;

$config[AppKernelConstants::APP_IDENTIFIER] = getenv('APP_IDENTIFIER') ?: 'hello-world';
```

## Plugins

Add some plugins to your app to enable certain functionality. 

### AppRouteProviderPlugin

Add `\Spryker\Glue\App\Plugin\RouteProvider\AppRouteProviderPlugin` to the `\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider::getRouteProviderPlugins()` method. In case the method doesn’t exist, add the complete method.

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

## Build the transfer objects

Transfer objects are used in many places. Since you installed some modules, you also need to generate the transfers. To generate the transfers, run the following command:

```bash
docker/sdk cli console transfer:generate
```

## Update the database

Generate the database entities and update the database:

```bash
docker/sdk cli console propel:install
```

## Test the endpoints

You can now test the `configure` request with the following snippets. Run the cURL snippets from your host machine.

### Test the /private/configure endpoint

Follow the guidelines in [Test the endpoints](/docs/acp/user/connect-an-app.html#test-the-endpoints).

## Implement business logic

Your app is now ready to use, although it doesn't contain any business logic yet. 
Start implementing the business logic by implementing a synchronous or asynchronous API.

## Debug your app

If you want to understand what is happening in the code, you can [debug your app](/docs/acp/user/develop-an-app/debug-an-app-with-xdebug.html) with XDebug and by adding `--cookie "XDEBUG_SESSION=PHPSTORM;path=/;" \` to the above cURL request.

Entry points for setting breakpoints are the following:
- `Spryker\Glue\App\Controller\AppConfigController`
- `\Spryker\Glue\App\Controller\AppDisconnectController`
