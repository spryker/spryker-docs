---
title: About the Business layer
description: The Business Layer handles core logic and processes like product data, order management, and payment. This guide explains how to manage business rules and integrate backend workflows.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/business-layer
originalArticleId: bdeffc0b-9e75-4fa0-b6ca-cc7e6513905e
redirect_from:
  - /docs/scos/dev/back-end-development/zed/business-layer/business-layer.html
related:
  - title: Facade
    link: docs/dg/dev/backend-development/zed/business-layer/facade/facade.html
  - title: Business models
    link: docs/dg/dev/backend-development/zed/business-layer/business-models.html
  - title: Custom exceptions
    link: docs/dg/dev/backend-development/zed/business-layer/custom-exceptions.html
  - title: About Communication layer
    link: docs/dg/dev/backend-development/zed/communication-layer/communication-layer.html
  - title: About the Persistence layer
    link: docs/dg/dev/backend-development/zed/persistence-layer/persistence-layer.html
---

Zed's `Business` layer is responsible for the entire business logic.

Most classes exist in this layer and this is the primary area for development.

The `Business` layer is used by the `Communication` layer and by other bundles. Here you know how to save data objects, but you do not care about data persistence.

## Business layer internal structure

| CONCEPT         | SHORT DESCRIPTION                                    |
| --------------- | ---------------------------------------------------- |
| Facade          | The facade acts like a public API for the module.     |
| Factory         | The factory creates and returns all internal classes. |
| Business models | These classes contain the logic of the module.        |
| Exceptions      | Exceptions thrown by this module.          |

## Interaction with other layers

The `Business` layer is in the middle, between the communication and persistence layers. It is used by controllers and plugins from the `Communication` layer and uses the entities and the query container from the `Persistence` layer.

![Interaction with the business layer](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Zed/Business+Layer/business-layer-interaction.png)
