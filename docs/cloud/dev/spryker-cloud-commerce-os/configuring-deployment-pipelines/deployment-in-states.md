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
