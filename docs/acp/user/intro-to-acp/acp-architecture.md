---
title: High-Level Architecture
description: Learn about the App Orchestration Platform architecture and how to use it.
template: concept-topic-template
redirect_from:
    - /docs/aop/user/intro-to-acp/acp-overview.html
keywords: acp
---

## Introduction

The App Composition Platform (ACP) aims to streamline the development process of Spryker Apps by providing a unified architecture. This architecture encompasses the communication between Spryker Core Operating System (SCOS), AppStoreCatalog, and third-party APIs. By adopting ACP, developers can focus on third-party implementations, reducing development time, simplifying testing, and separating responsibilities.

### Key Responsibilities of Apps

Every App within ACP is responsible for the following tasks:

* Persist configuration data for the App, managing `Connect/Disconnect` requests from the AppStoreCatalog.
* Handle synchronous requests from SCOS.
* Process messages received from SCOS.
* Send messages to SCOS.
* Implement a 3rd party API.

While these tasks are common across all Apps, the primary differentiator among App Categories lies in the communication with third-party APIs.

The following diagram illustrates the high-level architecture that significantly reduces development effort, enhances testability, clarifies responsibilities, and improves overall usability.

![High-Level Architecture](https://lh3.googleusercontent.com/u/1/drive-viewer/AEYmBYQBWwdbZBRnJe_mroroKU6ko1jtxBWOvGWnrRunnR5hgLblNWtbzxxOcixmfTYz2pnCCeOHTS65FncOmV6vj6hVpS4XGA=w1138-h993)

### SCOS

SCOS consists of a Category root module (e.g., `spryker/payment`) and a Connector module for this Category (e.g., `spryker/payment-app`). The Connector module facilitates communication between SCOS and Apps of that category.

### App

The App utilizes the `spryker/app-kernel`, the Category App package (e.g., `spryker/app-payment`), standalone packages, and, at the project level, a module that provides a `PlatformPluginInterface` implementation to the Category package (e.g., Stripe).

- The `spryker/app-kernel` contains all necessary code to interact with the AppStoreCatalog, capable of persisting and receiving configurations for a given App.
- The Category Package (e.g., `spryker/app-payment`) abstracts the communication between SCOS and the App, providing a `PlatformPluginInterface`.
- The Category implementation module furnishes a `PlatformPluginInterface` implementation that handles method calls, either internally or by consuming a 3rd party provider API.

Both `spryker/app-kernel` and `spryker/app-<categoty>` encapsulate the logic needed for communication with the AppStoreCatalog and SCOS, ensuring comprehensive coverage of the APIs within these packages.

## Next Steps
To integrate and use ACP Apps in your project, follow the steps outlined in the [ACP Installation Guide](/docs/acp/user/app-composition-platform-installation.html#getting-sccos-acp-ready).
