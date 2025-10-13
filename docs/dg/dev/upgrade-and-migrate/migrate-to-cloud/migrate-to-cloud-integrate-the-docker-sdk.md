---
title: "Migrate to cloud: Integrate the Docker SDK"
description: Learn how to integrate the Docker SDK to start your migration to Spryker Cloud Commerce OS.
template: howto-guide-template
last_updated: Dec 6, 2023
redirect_from:
  - /docs/scos/dev/migration-concepts/migrate-to-sccos/step-1-integrate-the-docker-sdk.html
---

To start migrating from the on-prem system to SCCOS, the first thing you need to do is to integrate the Docker SDK. To integrate the Docker SDK, follow these steps.

## Prerequisites

Make sure you have met the installation prerequisites as detailed in the [installation prerequisites guide](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html).

## 1. Integrate the Docker SDK

To facilitate local development and SCCOS deployment, you have to integrate the Docker SDK into your project. Be sure to select the appropriate version of Docker SDK as described in [Choosing a Docker SDK version](/docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html).

## 2. Running the project on Docker

To run your project on a local machine using the Docker SDK, refer to the [Docker SDK quick start guide](/docs/dg/dev/sdks/the-docker-sdk/docker-sdk-quick-start-guide.html). Additionally, prepare the necessary [deployment files](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html) for both local and remote environments. You can use public Demo Shops as references. For example, check out the deploy file of the [B2B public Demo Shop](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.dev.yml).
Once you have successfully integrated the Docker SDK and defined your deploy files, create the [installation recipes](/docs/dg/dev/sdks/the-docker-sdk/installation-recipes-of-deployment-pipelines.html) for deployment pipelines. Assuming all the preceding integration steps have been executed, your application should be bootable on a local machine with minimal data imported, making it ready for deployment to one of the demo environments.

## Next step

[Step 2: Upgrade the PHP version](/docs/dg/dev/upgrade-and-migrate/migrate-to-cloud/migrate-to-cloud-upgrade-the-php-version.html)
