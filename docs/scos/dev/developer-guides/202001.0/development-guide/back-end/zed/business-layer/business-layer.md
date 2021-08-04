---
title: About the Business Layer
originalLink: https://documentation.spryker.com/v4/docs/business-layer
redirect_from:
  - /v4/docs/business-layer
  - /v4/docs/en/business-layer
---

Zed’s business layer is responsible for the entire business logic.

Most classes exist in this layer and this is the primary area for development.

The business layer is used by the communication layer and by other bundles. Here you know how to save data objects, but you do not care about data persistency.

## Business layer internal structure

| Facade          | The facade acts like a public API for the module     |
| --------------- | ---------------------------------------------------- |
| Factory         | The factory creates and returns all internal classes |
| Business models | These classes contain the logic of the module        |
| Exceptions      | Exceptions which are thrown by this module           |

------

## Interaction with other layers

The business layer is in the middle, between communication and persistence layer. It is used by controllers and plugins from the communication layer and uses the entities and the query container from the persistence layer.
![Interaction with the business layer](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Zed/Business+Layer/business-layer-interaction.png){height="" width=""}
