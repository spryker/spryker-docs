---
title: 'Step 1: Docker SDK Integration'
description: 
template: howto-guide-template
---

## Prerequisites
Before proceeding with the migration, make sure you have met the installation prerequisites as detailed in the [installation prerequisites guide](/docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html).

## Integrate Docker SDK
To facilitate local development and PaaS deployment, it's imperative to integrate the Docker SDK into your project. Be sure to select the appropriate [version](/docs/scos/dev/the-docker-sdk/202307.0/choosing-a-docker-sdk-version.html#why-should-i-use-a-particular-version-of-the-docker-sdk.html) of Docker SDK by following the guidance provided.

## Running the Project on Docker
To run your project on a local machine using the Docker SDK, refer to the [Docker SDK quick start guide](/docs/spryker/docs/scos/dev/the-docker-sdk/202307.0/docker-sdk-quick-start-guide.html#running-the-docker-sdk-in-a-local-environment). Additionally, prepare the necessary [deployment files](/docs/scos/dev/the-docker-sdk/202307.0/deploy-file/deploy-file.html) for both local and remote environments. You can use public demoshops as references, such as this example (https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.dev.yml).

Once you have successfully integrated the Docker SDK and defined your deploy files, the next step is to create [installation recipes](/docs/scos/dev/the-docker-sdk/202307.0/installation-recipes-of-deployment-pipelines.html) for deployment pipelines. Assuming all the preceding integration steps have been executed, your application should be bootable on a local machine with minimal data imported, making it ready for deployment to one of the demo environments.
