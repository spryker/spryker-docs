---
title: Define parameter and secret values
description: Learn how to define parameter values in the Parameter Store.
last_updated: Nov 2, 2022
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/managing-parameters-in-the-parameter-store
originalArticleId: 2047c84c-bd7b-4bce-9203-08945367ad46
redirect_from:
  - /docs/managing-parameters-in-the-parameter-store
  - /docs/en/managing-parameters-in-the-parameter-store
  - /docs/cloud/dev/spryker-cloud-commerce-os/managing-parameters-in-the-parameter-store.html
---

Parameters are used for multiple purposes, like storing mail server details or providing Composer authentication details to the build and deploy process securely.

To define parameters and their values, do the following.

## Prerequisites

1. [Define parameters and secrets](/docs/scos/dev/the-docker-sdk/{{site.version}}/define-parameters-and-secrets.html).
2. Push the updates to the SCCOS environment.
3. Deploy the application with the updated configuration by following one of the following docs:
    * [Deploying in a staging environment](/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-staging-environment.html)
    * [Deploying in a production environment](/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-production-environment.html)
        This should update the parameters in the Parameter Store.

## Define parameter and secret values         





    After adding parameters and their values, you can use them for your application.
