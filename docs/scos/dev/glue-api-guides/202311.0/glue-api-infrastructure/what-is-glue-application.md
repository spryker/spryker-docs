---
title: What is API application?
description: This document will describe what is API Application and why do we need it.
last_updated: December 12, 2023
template: glue-api-storefront-guide-template
---

Currently, Glue includes 3 applications: Legacy Glue API, Glue Storefront API and Glue Backend API. All those applications share some of their infrastructure from [GlueApplication module](/docs/scos/dev/glue-api-guides/{{page.version}}/glue-api-infrastructure/glue-application-common-infrastrtructure.html), but also have a few infrastructural differences.

## What is Glue Application?

Glue Application is a set of plugins, classes and infrastructure components that allows to expose your own API Application by re-using existing infrastructure.
Applications are separated by domain (e.g. `glue-storefront.spryker.local` and `glue-backend.spryker.local`) and by codebase. Each application has a set of their own resources and they are not intersected.
Currently, those API applications can be `Request Flow Agnostic` or `Request Flow Aware`.

### Request Flow Agnostic API Application

Legacy Glue API is an example of `Request Flow Agnostic` application. Its main purpose is to provide an easy way to create your own API application with infrastructure and codebase that you want.
E.g. you want to create an API application with its own request flow and application plugins and you need just an entry point for it. In this case you shoul use `Request Flow Agnostic` approach.

In order to create such application, your application class must extend `\Spryker\Glue\GlueApplication\ApiApplication\Type\RequestFlowAgnosticApiApplication` abstract class. For the full tutorial how to create a new application, please check the [dedicated document](/docs/scos/dev/glue-api-guides/{{page.version}}/create-glue-api-applications.html).

### Request Flow Aware API Application

The `Request Flow Aware` application is another type of application provided OOTB. Examples of such application are Glue Backend API and Glue Storefront API applications.
From its name it should be clear, that this application is aware of the request flow that Glue provide an infrastructure for. So your API request will be validated, expanded and processed using all mechanism and conventions that current Glue Infrastructure has.

In order to create such application, your application class must extend `\Spryker\Glue\GlueApplication\ApiApplication\Type\RequestFlowAwareApiApplication` abstract class. For the full tutorial how to create a new application, please check the [dedicated document](/docs/scos/dev/glue-api-guides/{{page.version}}/create-glue-api-applications.html), because `Request Flow Aware` applications can be also `storefront` and `backend` one.
The difference is quite easy to understand - `storefront` application has no direct access to DB and can use only `storage` or `search` to fetch data directly, or use RPC call to the backoffice. But the `backend` one has this direct access to DB and also to `Facades` via `DependencyProvider`.

