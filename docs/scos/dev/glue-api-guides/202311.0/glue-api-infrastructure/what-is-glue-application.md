---
title: What is API application?
description: This document will describe what is API Application and why do we need it.
last_updated: December 12, 2023
template: glue-api-storefront-guide-template
---

Currently, Glue includes 3 applications: Legacy Glue API, Glue Storefront API and Glue Backend API. All those applications share a common infrastructure in [GlueApplication module](/docs/scos/dev/glue-api-guides/{{page.version}}/glue-api-infrastructure/glue-application-common-infrastrtructure.html), but also have a few infrastructural differences.

## What is Glue Application?

Glue Application is a set of plugins, classes and infrastructure components that allows to expose your own API Application by re-using existing infrastructure.
Applications are separated by domain (e.g. `glue-storefront.spryker.local` and `glue-backend.spryker.local`) and by codebase. Each application has a set of their own resources and they are not intersected.
Currently, those API applications can be `Request Flow Agnostic` or `Request Flow Aware`.

### Request Flow Agnostic API Application

Legacy Glue API is an example of `Request Flow Agnostic` application. Its main purpose is to provide an easy way to create your own API application with infrastructure and codebase that you want.
E.g. you want to create an API application that is a proxy for your 3rd party system. In this case you don't need all those request building, routing and content negotiation that Glue Infrastructure provides you with. You can just do a calls to your system and return response as it is.

In order to create such application, your application class must extend `\Spryker\Glue\GlueApplication\ApiApplication\Type\RequestFlowAgnosticApiApplication` abstract class. For the full tutorial how to create a new application, please check the [dedicated document](/docs/scos/dev/glue-api-guides/{{page.version}}/create-glue-api-applications.html).

### Request Flow Aware API Application

On the opposite to `Request Flow Agnostic` is `Request Flow Aware` application.
From its name it should be clear, that this application is aware of the request flow that Glue provide an infrastructure for. So your API request will be validated, expanded and processed using all mechanism and conventions that current Glue Infrastructure has.
Glue Backend API and Glue Storefront API applications are `Request Flow Aware` application.

In order to create such application, your application class must extend `\Spryker\Glue\GlueApplication\ApiApplication\Type\RequestFlowAwareApiApplication` abstract class. For the full tutorial how to create a new application, please check the [dedicated document](/docs/scos/dev/glue-api-guides/{{page.version}}/create-glue-api-applications.html), because `Request Flow Aware` applications can be also `storefront` and `backend` one.
The difference is quite easy to understand - `storefront` application has no direct access to DB and can use only `storage` or `search` to fetch data directly, or use RPC call to the backoffice. But the `backend` one has this direct access to DB and also to `Facades` via `DependencyProvider`.

