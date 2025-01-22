---
title: Set up Fulfillment App
description: Learn how to install and configure Fulfillment App within your Spryker Unified Commerce projects.
last_updated: Nov 23, 2023
template: howto-guide-template
---

This document describes how to install Fulfillment App and connect it to your project.

## Install the required features

To enable the support of Fulfillment App in your project, install the following features:

| NAME  | VERSION          | INSTALLATION GUIDE |
|----------|------------------|--------------------|
| Warehouse picking               | {{page.version}} | [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/202311.0/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)                     |
| Warehouse User Management               | {{page.version}} | [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/202311.0/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)                     |
| Warehouse picking + Product               | {{page.version}} | [Install the Warehouse picking + Product feature](/docs/pbc/all/warehouse-management-system/202311.0/unified-commerce/install-and-upgrade/install-the-warehouse-picking-product-feature.html)                     |

## Install Fulfillment App

For instructions on installing Fulfillment App, see [Set up Oryx](/docs/dg/dev/frontend-development/{{page.version}}/oryx/getting-started/set-up-oryx.html).

## Connect Fulfillment App

To connect Fulfillment App to your project using Glue API, set the URL of your Glue Backend API in the environment configuration:

```text
...
SCOS_BASE_URL={GLUE_BACKEND_API_URL}
...
```
