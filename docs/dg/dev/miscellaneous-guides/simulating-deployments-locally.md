---
title: Simulating deployments locally
description: This document shows how to do better deployments by using your local environment as a preview for how your application will behave when deployed to PaaS
last_updated: Jul 27, 2022
template: howto-guide-template
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-do-better-deployments.html

---

Are you about to roll out an important feature to your staging or production environment and want to ensure that everything will work out right? Or you are encountering behavior in your application when it's deployed that does not seem right, and you are wondering how to best debug it? This document provides tips that can help you avoid surprises and help you prepare your project optimally for deployment and build a local development setup with which you can debug more effectively.

To simulate your application behavior and how it looks when deployed to the staging or production environment, bootstrap the `deploy.yml` files used by those environments. The following sections show what needs to be done.

## Prerequisites

Read access to your codebase.

## Prepare your local hosts file

In these `deploy.yml` files, you specify the actual endpoint names that determine the URLs under which your environment is reachable. To work locally, point your DNS names to your local development environment by adding host entries in your local `/etc/hosts` file.

{% info_block warningBox "Verification" %}

Make sure that all endpoints in your `deploy.*.yml` file are referenced there and point to `127.0.0.1`.

{% endinfo_block %}

## Bootstrap with `deploy.yml`

For development purposes, your project has different `deploy.yml` files. However, to simulate the app's behavior, you can use the `deploy.yml` files used during deployment to staging and production environments.

You must have the following `deploy.yml` files in your project (it may vary, depending on the total quantity of your environments):
- `deploy.(PROJECT_NAME)-prod.yml`
- `deploy.(PROJECT_NAME)-staging.yml`

`PROJECT_NAME` represents the name of your project.

Bootstrap your `deploy.yml`:

```
docker/sdk boot DEPLOY_FILE.yml && docker/sdk up
```

Replace `DEPLOY_FILE.yml` with the YML file of your choice.

It starts up your application, which is reachable through its staging and production URLs and behaves just like it would in your PaaS environments. This setup shows whether your application builds correctly with the deploy files used in the PaaS pipelines and lets you check out the look and feel of your application more authentically.

## Ingest staging or production data

{% info_block warningBox "Mind the database load" %}

Creating a database dump can cause a significant load on your database. If you are creating a database dump from a production environment, ensure you are doing so by using a read replica (if available). You can check whether you have a read replica for your production database by searching for RDS in the AWS console. This lets you find your read replica listed next to your production RDS database. You can obtain the host address there.

{% endinfo_block %}

By ingesting the data in your staging or production database, you can go even one step further and bring your local environment even closer to its staging or production form.
You can easily create a dump of your staging or production database by connecting to the RDS instance while having your VPN connected to the respective environment.
For this, you need two things:
- Your RDS instance URL.
- Your DB credentials.

To obtain all these things, follow these steps:
1. Log in to the AWS console and search for "Task Definitions".
2. To open the task definitions overview of Amazon Elastic Container Service, click the feature.
3. Select your backend gateway task (backgw) and then its latest revision (should be top of the list).
4. Switch to the **JSON** view and find the following parameters in the JSON document shown:
- `SPRYKER_DB_HOST`
- `SPRYKER_DB_ROOT_USERNAME`
- `SPRYKER_DB_PASSWORD`

With this information, you can connect to the database from any SQL client and create a database dump which you can then import locally. After you have imported the data, don't forget to publish events so that all the data gets imported to Redis and Elastic Search as well. You can use the following command to achieve that.

```bash
command publish:trigger-events
```
