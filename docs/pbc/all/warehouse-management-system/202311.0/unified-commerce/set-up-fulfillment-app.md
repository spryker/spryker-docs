---
title: Set up Fulfillment App
description: Learn how to install and configure Fulfillment App
last_updated: Nov 23, 2023
template: howto-guide-template
---

This document describes how to install Fulfillment App and connect it to your project.

## Install the required features

To enable the support of Fulfillment App in your project, install the following features:

| NAME  | VERSION          | INSTALLATION GUIDE |
|----------|------------------|--------------------|
| Install the Warehouse picking feature               | {{page.version}} | [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/202311.0/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)                     |
| Install the Warehouse picking feature               | {{page.version}} | [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/202311.0/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)                     |
| Install the Warehouse picking feature               | {{page.version}} | [Install the Warehouse picking + Product feature](/docs/pbc/all/warehouse-management-system/202311.0/unified-commerce/install-and-upgrade/install-the-warehouse-picking-product-feature.html)                     |

## Install Fulfillment App

For instructions on installing Fulfillment App, see [Set up Oryx](/docs/scos/dev/front-end-development/{{page.version}}/oryx/getting-started/set-up-oryx.html).

## Connect Fulfillment App

To connect Fulfillment App to your project using Glue API, There's a pre-configured API configured in the .env file as a fallback (ORYX_FALLBACK_SCOS_BASE_URL) that you can replace with a project specific base url, using the SCOS_BASE_URL.
