---
title: How to do the transition?
description: This document describes how to do the transition.
template: howto-guide-template
---

# How to do the transition?

{% info_block infoBox %}

Resources: Backend, DevOps

{% endinfo_block %}

## Description

In this step, we need to assess efforts related to the exact moment of switching the shops from on-prem to Spryker Cloud.

Before you start the transition please make sure that:

1. Depending on a environment type a correspondent template was applied in your cloud service provider (currently, is AWS).
    All stage similar ones (dev/uat/test/qa etc) should have only one run task per basic service (Yves/Zed/Glue...).
    For production system this number is 2. Go to ECS -> Clusters -> <your_name> -> tab Services.
    Check the number in Desired/Running tasks columns.
2. If you have a production environment, then "Multi AZ" is enabled for RDS/OpenSearch(ES)/Redis(EC) services.
3. Data is present in RDS based on a dump provided by customer.
4. All jobs in jenkins are up and running and have green color.
5. No any processing in RabbitMQ and the error queues don't have stacked messages. You have to resolve all data issues
   before env is publicly available.

**! Note:** If some service wasn't migrated from on-premise into cloud and remain to work on a customer' side then
a Site-to-Site VPN connection should be initiated between them. Verify the availability of the service from your cloud network.

During a transition process we don't consider any blue/green deployment strategy. The cloud env is a copy of on-premise
system and should have a similar set of services to run.

The shop switching assumes a recreation of existing url references from on-premise to cloud. Based on who manages
a domain zone (customer or Spryker) the switching time may vary.

Due to infra side is fully managed by Spryker a ticket about endpoints update should be created in [SalesForce portal](http://support.spryker.com)
to Operation team. All further communication with a customer is carried out by any preferable channel, such as slack/email etc

## Formula

If the dry-run switch has been executed we can get the precise time of down time and related efforts,
see [Switch from on prem to Spryker Cloud](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/switch-from-on-prem-to-spryker-cloud.html).
