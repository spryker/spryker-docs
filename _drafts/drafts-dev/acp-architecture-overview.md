---
title: ACP architecture overview
description: Learn about the App Orchestration Platform architecture and how to use it.
template: concept-topic-template
last_updated: Jan 17, 2024
redirect_from:
    - /docs/aop/user/intro-to-acp/acp-overview.html
    - /docs/acp/user/intro-to-acp/acp-architecture-overview.html
keywords: acp
---

The App Composition Platform (ACP) aims to streamline the development process of the Spryker apps by providing a unified architecture. This architecture encompasses the communication between Spryker Cloud Commerce OS (SCCOS), ACP App Catalog, and third-party APIs. By adopting ACP, developers can focus on third-party implementations, reducing development time, simplifying testing, and separating responsibilities.

## Key responsibilities of apps

Every app within ACP is responsible for the following tasks:

* Persist configuration data for the app, managing `Connect/Disconnect` requests from the ACP App Catalog.
* Handle synchronous requests from SCCOS.
* Process messages received from SCCOS.
* Send messages to SCCOS.
* Implement a third-party API.

While these tasks are common across all apps, the primary differentiator among app categories lies in the communication with third-party APIs.

The following diagram illustrates the high-level architecture that significantly reduces development effort, enhances testability, clarifies responsibilities, and improves overall usability.

![high-Level-architecture](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/acp-architecture/high-level-architecture.png)

## SCCOS

SCOS consists of a Category root module (for example, `spryker/payment`) and a Connector module for this category (for example, `spryker/payment-app`). The Connector module facilitates communication between SCCOS and apps of that category.

## App

The app uses `spryker/app-kernel`, the Category App package (for example, `spryker/app-payment`), standalone packages, and, at the project level, a module that provides a `PlatformPluginInterface` implementation to the Category package (for example, Stripe).

- The `spryker/app-kernel` contains all necessary code to interact with the ACP App Catalog, capable of persisting and receiving configurations for a given app.
- The Category package (e.g., `spryker/app-payment`) abstracts the communication between SCCOS and the app, providing a `PlatformPluginInterface`.
- The Category implementation module furnishes a `PlatformPluginInterface` implementation that handles method calls, either internally or by consuming a third-party provider API.

Both `spryker/app-kernel` and `spryker/app-<categoty>` contain the logic needed for communication with the ACP App Catalog and SCCOS, ensuring comprehensive coverage of the APIs within these packages.

## Next steps

To integrate and use ACP Apps in your project, follow the [ACP Installation guide](/docs/dg/dev/acp/app-composition-platform-installation.html#getting-sccos-acp-ready).
