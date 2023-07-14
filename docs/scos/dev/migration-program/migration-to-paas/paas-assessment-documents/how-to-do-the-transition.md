---
title: How to do the transition?
description: This document describes how to do the transition.
template: howto-guide-template
---


## Resources for assessment

* Backend
* DevOps

## Description

In this step, you need to assess efforts related to the exact moment of switching the shops from on-prem to Spryker Cloud.

Before you start the transition, make sure that the following applies:

1. Depending on the environment type, a correspondent template was applied in the cloud service provider. Currently, it's AWS.
    All the stage-like environments, like dev, test, or qa, should have only one run task per basic service: Yves, Zed, Glue, etc.
    For a production system, there should be two tasks per basic service. Go to ECS > Clusters > <your_name> -> tab Services.
    Check the number in Desired/Running tasks columns.
2. If you are migrating a production environment, "Multi AZ" is enabled for RDS, OpenSearch(ES), and Redis(EC) services.
3. Data is present in RDS based on the dump provided by the customer.
4. All jobs in Jenkins are running and green.
5. There must not be any processing queues in the RabbitMQ, and all the error queues must be empty.
    You need to resolve all data issues before the environment is publicly available.

{% info_block warningBox "" %}

If a service wasn't migrated from on-premise to cloud and remain to work on a customer's side, a site-to-site VPN connection should be initiated between them. Verify the availability of the service from the cloud network.

{% endinfo_block %}

The shop switching assumes a recreation of existing url references from on-premise to cloud. Based on who manages the domain zone (customer or Spryker), the switching time may vary.

Because the infrastructure is fully managed by Spryker, you should create a ticket about endpoints update in [SalesForce portal](http://support.spryker.com) to Operation team. All further communication with a customer is carried out by any preferable channel, such as slack/email etc

## Formula for calculating the migration effort

If the dry-run switch has been executed we can get the precise time of down time and related efforts,
see [Switch from on prem to Spryker Cloud](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/switch-from-on-prem-to-spryker-cloud.html).
