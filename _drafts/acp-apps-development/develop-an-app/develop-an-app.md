---
title: Developing an app with Spryker Mini-Framework
Descriptions: Learn the step-by-step process of developing an app using Spryker's Mini-Framework
template: howto-guide-template
last_updated: Jan 23, 2024
redirect_from:
- /docs/acp/user/developing-an-app.html
- /docs/acp/user/developing-an-app/developing-an-app.html
- /docs/acp/user/develop-an-app/develop-an-app.html
---

This document will walk you through the process of developing an app using Spryker's Mini-Framework. Follow the steps below to set up and start your app development.

{% info_block infoBox "Development guidelines" %}

Development guidelines for ACP apps contain general rules on how to design an app and write code for it.
ACP apps are based on the [mini-framework](https://github.com/spryker-projects/mini-framework), which in its turn is based on the Spryker Framework. Therefore, we recommend following the same rules that are applicable for the [Spryker project development](https://docs.spryker.com/docs/scos/dev/guidelines/project-development-guidelines.html#updating-spryker).

{% endinfo_block %}

## Prerequisites

Before you begin, make sure that the following prerequisites are met:

- You have completed the [thought process](#thought-process) for your app.
- There is an empty GitHub repository.
- There is a local project directory for your app (for example, `/www/my-app`).
- [DockerSDK](https://github.com/spryker/docker-sdk) is installed globally.

Make sure you have the Spryker Docker SDK, Git, and an empty repository for your app code.

{% info_block infoBox "Info" %}

[Download](https://github.com/spryker-projects/mini-framework/tree/examples/acp/create-an-app-final) the completed example from the Mini-Framework.

{% endinfo_block %}
 
## 1. Thought process
First, think about what your app should be capable of: what features it will bring and what data will be exchanged, not only to you but also to those interested in your app functionality. For example, what messages could be of interest to others and what API endpoints you should provide. 

### API-first
It's strongly recommended that apps follow the API-first approach. 
API-first means that your app is centered around the API. It should be possible to perform every action via the scripting language, and every piece of functionality should be available for other systems to leverage. For more information on the API-first approach, see [this blog post](https://www.algolia.com/blog/product/the-5-principles-of-api-first-development-and-what-does-api-first-even-mean/).
You need to have a clear understanding of what your app API will provide to others and always keep that in mind when designing your app.

### Schema-first

Before you start with the development, you should design your API schema files. Depending on your requirements, you can have an OpenAPI or an Async API schema file. In this step, you define the Sync API endpoints your app will provide to others, the messages you will emit or consume, and the data you expect to work with.

{% info_block infoBox "Info" %}

For more information about Async API schema design, see [Designing your APIs with Async API](https://www.asyncapi.com/blog/designing_your_apis_with_asyncapi_part_1).

For more information about OpenAPI schema design, see [Best practices in API design](https://swagger.io/resources/articles/best-practices-in-api-design/).

{% endinfo_block %}

You can use the following tools to design your APIs:
- [Async API Studio](https://studio.asyncapi.com/)
- [Swagger Editor](https://editor.swagger.io/)

## 2. Create an app

To create an app, execute the following commands:

```bash
mkdir my-app
cd my-app
git clone https://github.com/spryker-projects/mini-framework.git . --depth 1 && rm -rf .git && git init
git add --all
git commit -m "first commit"
```

After running these commands, you get a new local repository that needs to be linked with your remote one.

If not done yet, create a new remote repository by opening your [Github account](https://github.com/newConnect). After you have created the new repository, GitHub will display instructions on how to proceed. Execute the commands from the list below, as you don't need some of the first steps proposed by GitHub since you've already initialized Git and you already have the `README.md` file from the cloned repository.

```bash
git branch -M main
git remote add origin git@github.com:<organization>/<repository>.git
git push -u origin main
```
{% info_block infoBox "Info" %}

You can also execute this step later.

{% endinfo_block %}

Now, you have done the groundwork that enables you to develop an app. You created a new repository that contains the boilerplate code for almost any app you'd like to build.

### Validation

Make sure that the project is cloned properly and has no uncommitted files.


## 3. Start the local development environment

To start the local development environment, you need must boot and up your environment. Do the following:

1. Clone Spryker Docker SDK to the project directory:

```bash
git clone git@github.com:spryker/docker-sdk.git docker
```

2. Execute the following command to boot your application and start it:

```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

3. Validate if everything is set up correctly. Do the following:

- Make sure that all the commands are executed without errors and the tests are successfully passed.
- Check that docker containers are started by executing the `docker/sdk ps` command.
- Make sure that `my-app.spryker.local` domain is resolved by executing the `ping my-app.spryker.local` command.

After creating the development environment, you have several ways of using the app. The easiest one is to run the test suite as follows:

```bash
docker/sdk testing codecept run
```

Now, your app boilerplate code should be up and running.

## 4. Add the app manifest files

Before your app can be listed in the ACP App Catalog, you need to add the following files.

### Manifest

The manifest file is the most important one for the app. It contains data that will be displayed in the ACP App Catalog. You can use the [manifest code snippet](/docs/acp/user/develop-an-app/code-snippets/manifest-json-file.html) and update it to your needs. Add the manifest file to `config/app/manifest/en_US.json` of your app.

Manifest files must have the locale name as the filename, for example, `en_US.json`, and should be placed inside the `config/app/manifest` directory.

### Configuration

The configuration file contains all necessary form fields for inputs required by the user of your app, to be displayed in the ACP App Catalog. You can use the [configuration code snippet](/docs/acp/user/develop-an-app/code-snippets/configuration-json-file.html) and update it to your needs. Add this file to `config/app/configuration.json` of your app.

### Translation

The translation file contains all translations for the form fields you've previously defined. You can use the Hello World [example translation file](/docs/acp/user/develop-an-app/code-snippets/translation-json-file.html) and update it to your needs. Add this file to `config/app/translation.json` of your app.

### Validation

Make sure that all the needed configuration files have been created and populated properly.

## 5. Add the registry (code)

Every app requires default endpoints for the App Registry Service. This service acts as an intermediary between the ACP App Catalog and all apps. Each app is registered in the App Registry Service and requires the following endpoints for communication:

 - Configure
 - Disconnect

The `spryker/app-kernel` module transforms the Mini-Framework into an app. It provides SyncAPI schema and code for configuration and disconnection, as well as an AsyncAPI schema and code for the AppConfigure and AppDisconnect messages. 
The `spryker/message-broker-aws` module installs the necessary plugins for sending and receiving messages. 

### Validation

After the next two steps, check the new routes in [Test the endpoints](#test-the-endpoints).

## 6. Build the transfer objects

Transfer objects are used in many places. Since you installed some modules, you also need to generate the transfers. To generate the transfers, run the following command:

```bash
docker/sdk cli console transfer:generate
```

## 7. Update the database

Generate the database entities and update the database:

```bash
docker/sdk cli console propel:install
```

## 8. Test the endpoints

You can now test the `configure` request with the following snippets. Run the cURL snippets from your host machine.

### Test the /private/configure endpoint

Follow the guidelines in [Test the endpoints](/docs/dg/dev/acp/develop-an-app/connect-an-app.html#test-the-endpoints).

## 9. Implement business logic

Your app is now ready to use, although it doesn't contain any business logic yet. 
Start implementing the business logic by implementing a synchronous or asynchronous API.

## 10. Debug your app

If you want to understand what is happening in the code, you can [debug your app](/docs/acp/user/develop-an-app/debug-an-app-with-xdebug.html) with XDebug and by adding `--cookie "XDEBUG_SESSION=PHPSTORM;" \` to the above cURL request.

Entry points for setting breakpoints are the following:
- `Spryker\Glue\App\Controller\AppConfigController`
- `\Spryker\Glue\App\Controller\AppDisconnectController`
