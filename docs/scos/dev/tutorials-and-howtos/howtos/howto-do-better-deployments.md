---
title: "HowTo: Do better deployments"
description: This document shows how to do better deployments by using your local environment as a preview for how your application will behave when deployed to PaaS
last_updated: Jul 27, 2022
template: howto-guide-template
---

You are about to roll out an important feature to your staging or production environment and want to be extra sure that everything will work out right? This document provides tips that can help you avoid surprises and help you prepare your project optimally for being deployed.

## Prerequisites

Read access to your codebase

## Simulate your application

To simulate your application behavior and how it looks when deployed to the staging or production environment, bootstrap the `deploy.yml` files used by those environments. The following sections show what needs to be done.

### Prepare your local hosts file

In these `deploy.yml` files, you specify the actual endpoint names that determine the URLs under which your environment is reachable. To work locally, point your DNS names to your local development environment by adding host entries in your local `/etc/hosts` file. 

{% info_block warningBox "Verification" %}

Make sure that all endpoints in your `deploy.*.yml` file are referenced there and point to `127.0.0.1`.

{% endinfo_block %}



### Bootstrap with `deploy.yml`

For development purposes, your project has different `deploy.yml` files. You can, however, use the `deploy.yml` files used during deployment to staging and production environments to simulate the app's behavior.

You must have the following `deploy.yml` files in your project (it may vary, depending on the total quantity of your environments):
- `deploy.(PROJECT_NAME)-prod.yml`
- `deploy.(PROJECT_NAME)-staging.yml`

`PROJECT_NAME` represents the name of your project.

Bootstrap your `deploy.yml`:

```
docker/sdk boot (THE YML file of your choice) && docker/sdk up
```

It starts up your application, which is reachable through its staging and production URLs and behaves just like it would in your PaaS environments. This setup shows whether your application builds correctly with the deploy files used in the PaaS pipelines and lets you check out the look and feel of your application more authentically.
