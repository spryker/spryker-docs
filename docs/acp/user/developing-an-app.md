---
title: Developing an app
Descriptions: Learn how to develop an app
template: howto-guide-template
---

To develop an app, follow the instructions in this document.

## Prerequisites

- You have completed the [thought process](#thought-process) for your app.
- You have [installed the Spryker SDK](/docs/sdk/dev/spryker-sdk.html#installation).
- You have an empty GitHub repository.
- You have a local project directory where you want to work, for example, `/www/my-app`.
 
## Thought process
First, think about what your app should be capable of: what features it will bring, and what data will be exchanged, not only to you but also to those interested in your app functionality. For example, what messages could be of interest to others, and what API endpoints you should provide. 

### API-first
It's strongly recommended that apps follow the API-first approach. 
API-first means that your app is centered on the API. It should be possible to perform every action via the scripting language, and every piece of functionality should be available for other systems to leverage. For more information on the API-first approach, see [this blog post](https://www.algolia.com/blog/product/the-5-principles-of-api-first-development-and-what-does-api-first-even-mean/).
You need to have a clear understanding of what your app API will provide to others, and always keep that in mind when designing your app.

### Schema-first

Before you start with the development, you should design your API schema files. Depending on your requirements, you can have an OpenAPI or an [Async API](#async-api) schema file. In this step, you define the [Sync API](#sync-api) endpoints your app will provide to others, the messages you will emit or consume, and the data you expect to work with.

{% info_block infoBox "Info" %}

For more information about Async API schema design, see [Designing your APIs with Async API](https://www.asyncapi.com/blog/designing_your_apis_with_asyncapi_part_1). 

For more information about OpenAPI schema design, see [Best practices in API design](https://swagger.io/resources/articles/best-practices-in-api-design/).

{% endinfo_block %}

You can use the following tools to design your APIs:
- [Async API Studio](https://studio.asyncapi.com/)
- [Swagger Editor](https://editor.swagger.io/)

You can also use wizards provided by Spryker, which will be used by the [SprykerSDK workflow](/docs/sdk/dev/initialize-and-run-workflows.html).

## Build an app

You can build a new app with the help of the SprykerSDK. After you have installed the Spryker SDK, you can run the following commands to start building the app.

1. Ensure that you are in the correct working directory:

```bash
cd /www/my-app (The local project directory you created before)
```
2. Initialize the project:

```bash
spryker-sdk sdk:init:project --workflow=app
```
3. Run the workflow:

```bash
spryker-sdk sdk:workflow:run
```

{% info_block infoBox "Info" %}

You can skip through the prompts by hitting **Enter**.

{% endinfo_block %}

Starting from SprykerSDK version 0.3.0, you can use the following set of commands:

```bash
cd /www/my-app (The local project directory you created before)
spryker-sdk sdk:workflow:run # and select the app workflow
```
The workflow guides you as much as possible through the process of building an app. Whenever something needs manual interaction, the workflow stops with a message on what you need to do. After you completed the manual step, re-run the workflow with the `spryker-sdk sdk:workflow:run` command. This continues the previously paused workflow.

### Workflow details

The `spryker-sdk sdk:workflow:run` command guides you through the whole process of building an app. This command does the following.

#### 1. Downloads the boilerplate code and adds app definition files

One of the first steps of the workflow is downloading a reduced Spryker project into the working directory. It already contains a lot of code that lets you start implementing your business logic.
This step can take a few minutes to complete.

{% info_block infoBox "Info" %}

At this point, no dependencies are installed. 

{% endinfo_block %}

There are a couple of files that an app must have. The workflow guides you through creating them.

##### Manifest files
The manifest files define the details like title, category, and description of the app. The manifest files are also used to display information about the app on the App Catalog Page and the App Detail Page in the Back office.

For more details on the manifest files, see [App manifest](/docs/acp/user/app-manifest.html).

{% info_block infoBox "Info" %}

You need to update the manifest file manually. The SDK only creates a boilerplate file.

{% endinfo_block %}

##### Configuration file
The configuration file defines the form that is displayed in the Back Office App Catalog after the App was connected and needed some configuration. 

This file is created with the help of a wizard, but you can also add or update it manually.

For more details, see [App Configuration](/docs/acp/user/app-configuration.html).

![acp-sdk-workflow-1](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/developing-an-app/ACP-SDK-Workflow-black-1.jpg)

##### Translation file
The translation file contains the keys and the translation values for each locale in which the app should be displayed. 

This file is created with the help of a wizard, but you can also add or update it manually.

For more details, see [App Configuration Translation](/docs/acp/user/app-configuration-translation.html).

#### 2. Creates app API

The command defines Sync API and Async API.

##### Sync API
The Sync API defines the app's synchronous endpoints, or [Glue](/docs/scos/dev/glue-api-guides/{{site.version}}/old-glue-infrastucture/glue-rest-api.html) endpoints. The workflow creates a boilerplate that you need to update with the required endpoints your app should have. See the [current OpenAPI specification](https://spec.openapis.org/oas/v3.1.0).

For more details about the Sync API with information specific to Spryker, see [Sync API](/docs/acp/user/sync-api.html).

##### Async API

The Async API defines the app's asynchronous endpoints, also known as events and messaging. The workflow creates a boilerplate one that you need to update with the required endpoints your app should have. See the [current Async API specification](https://www.asyncapi.com/docs/reference).

For more details about the Async API with information specific to Spryker, see [Async API](/docs/acp/user/async-api.html).

![acp-sdk-workflow-2](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/developing-an-app/ACP-SDK-Workflow-black-2.jpg)

#### 3. Runs code generators
After the previous steps were executed and you updated the API schema files to your needs, the code generators are executed. The code generators load the schema files and create as much code, including tests, as possible.

{% info_block warningBox "Warning" %}

Review the generated code carefully.

{% endinfo_block %}

![acp-sdk-workflow-3](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/developing-an-app/ACP-SDK-Workflow-black-3.jpg)

#### 4. Performs validation

The workflow executes some validations during the process. The workflow stops when some validations fail and displays a message that helps you to fix the issues.

![acp-sdk-workflow-4](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/developing-an-app/ACP-SDK-Workflow-black-4.jpg)

## What's next
With the executed workflow, you can develop with the code as you’re used to developing Spryker applications.
