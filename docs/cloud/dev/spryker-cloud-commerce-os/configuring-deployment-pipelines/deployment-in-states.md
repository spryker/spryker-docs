---
title: Deployment in states
description: Deployment pipelines consist of three configurable stages.
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/deployment-pipelines
originalArticleId: 14d91c9f-6c4e-4481-83ee-005683ce602f
redirect_from:
  - /docs/deployment-pipelines
  - /docs/en/deployment-pipelines
  - /docs/cloud/dev/spryker-cloud-commerce-os/deployment-pipelines/deployment-pipelines.html
---

When it comes to complex application, deploying to production environments is not just going from version one to version two. This document describes the states though which an application goes through during a deployment and how they affect its behavior.

## Prerequisites

To learn how pipelines work in SCCOS, see [Deployment pipelines](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/deployment-pipelines.html).

## Initial state

This is the application's state before you started a deployment. All the components are of version 1. The application is working correctly on prod.

## 1.

In this state database and search start transitioning to version 2. <!-- what issues can this cause? -->

Zed 2 enters the scene. It is used to transition database and search to v2.

<!--
1.  what's zed v2 in deployment tools? Where does it come from and how is it related to zed v2 that is not in the deployment tools?

2. How's yellow different from green ?


3. what's zed1 cron?


4. When a component finished upgrading to v2, does the app start using it immediately?


-->


## 2.



Redis and RabbitMQ: start transitioning. Important: Transitioning to v2 is not an atomic change. New key-value pairs and messages are added to existing ones. This means that during transitioning, they still contain v1 pairs and messages .







-- >
