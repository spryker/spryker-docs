---
title: Define parameter and secret values in SCCOS environments
description: Learn how to define parameter values in the Parameter Store.
last_updated: Jan 23, 2023
template: howto-guide-template
redirect_from:
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
        This updates the parameters in the Parameter Store.

## Define parameter and secret values         

1. In the AWS Management Console, go to **Services > Parameter Store**.
2. In the **My parameters** pane, click the parameter or secret you want to define the value for.
    You can use search to filter parameters by the name you've defined in the deploy file.
3. On the page of the parameter, click **Edit**.
4. Enter a **Value**.
5. Click **Save changes**.
6. This opens the **Parameter Store** page with a success message displayed.    
    After adding parameters and their values, you can use them for your application.

{% info_block warningBox "Propagation of Parameters" %}

Plese note that if you need parameters to be available in your Jenkins instance, we will need to terraform your added or changed parameters. Please create a [support case](https://docs.spryker.com/docs/scos/user/intro-to-spryker/support/how-to-use-the-support-portal.html#plattform-change-requests) to ask for this adjustment to be made.

{% endinfo_block %}
