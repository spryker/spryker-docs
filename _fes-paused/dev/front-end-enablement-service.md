---
title: Frontend Enablement Service
description: Overview of Frontend Enablement Service, an application for launching frontends.
last_updated: Jun 21, 2022
template: concept-topic-template
---

Frontend Enablement Service (FES) is an application that enables everyone to launch and manage frontends easily and quickly.

Its main objectives are as follows:
* To enable business users to manage frontends without developers' help.
* To give developers more time to focus on the parts of an application that gain more value from their effort, like custom functionality.

Quick and easy provisioning of frontends speeds up project development. Every frontend seamlessly connects to any Spryker Cloud Commerce OS (SCCOS) backend and automatically deploys your code changes.

For content managers, it simplifies day-to-day work, like creating frontends for new regions, minisites, or brands and managing their look and feel.

## FES overview

FES consists of Spryker Launchpad and Spryker Experience Builder. The Launchpad is responsible for launching and managing frontends. The Experience Builder is responsible for managing the structure and layout of frontends.

FES is structured around four key concepts:

* Frontends are connected to SCCOS via APIs.
* Frontends are easily deployed and can be connected to different backends.
* Frontends are continuously updated with code changes deployed automatically.
* Page layout and structure are managed with Spryker Experience Builder.

Combined, they let you make changes without developers’ help, decouple and speed up frontend and backend development cycles.

### Spryker Launchpad

The Launchpad lets developers and content managers create frontend applications and connect them to Spryker backends.

![Spryker Launchpad](https://spryker.s3.eu-central-1.amazonaws.com/docs/dev/front-end-enablement-service.md/spryker-launchpad.png)


The default frontend template is a Storefront based on a [progressive web application (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) that supports mobile first design and native features.

#### Spryker Launchpad architecture

The Launchpad is a multi-tenant application that interacts with the following components:
* SCCOS environment running on [Spryker PaaS](https://spryker.com/en/paas-cloud/).
* GitHub repository that stores frontends’ code.
* Netlify hosting provider, where frontends are built and distributed across a CDN.

![launchpad-architecture](https://confluence-connect.gliffy.net/embed/image/9cb232d7-e48c-48da-a53d-d78b4ba577c4.png?utm_medium=live&utm_source=custom)

Glue API is used for the following purposes:
* To connect your SCCOS environments to the Launchpad. When creating a frontend, you can see the list of your environments, locales, and currencies.
* When a frontend is deployed to Netlify, to connect the frontend to the backend in a SCCOS environment.

#### Repository and hosting provider
When you create a frontend, the Launchpad creates a deployment pipeline that fetches code from the selected GitHub repository, pushes it to the Netlify hosting provider, and provides automatic configuration to connect the application back to SCCOS. On code changes, the update pipeline rebuilds and deploys the updated frontend automatically.

Developers can switch the application between multiple repositories. For example, a developer points a frontend to a development server while testing. After testing, they point it to a production environment, and the frontend goes live without having to test it in this environment.


![continuous-development](https://spryker.s3.eu-central-1.amazonaws.com/docs/fes/dev/front-end-enablement-service.md/continuous-development.png)

### Spryker Experience Builder
The Experience Builder lets content managers manage the structure and layout of frontends without developer’s help. It is in development, and we will release it soon.

## What projects can use FES?
Any project running on PaaS and with up-to-date APIs can use FES for its frontends.

## Who are the users of FES?
FES is designed to be used by both developers and content managers.

## Next steps

[Launching Storefronts](/docs/fes/dev/launching-storefronts.html)
