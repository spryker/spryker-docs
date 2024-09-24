---
title: ACP and destructive deployment
Descriptions: Learn how to use ACP and destructive deployment in Spryker projects.
template: howto-guide-template
last_updated: Dec 18, 2023

---

This document describes how to use the App Composition Platform (ACP) and destructive deployment in Spryker projects.

App Composition Platform (ACP) enables you to connect, configure, and use third-party services with zero or low development effort. For business information about ACP, see [Spryker App Composition Platform](https://spryker.com/app-composition-platform/#/).

When using ACP, you can run a destructive deployment. Destructive deployment is a deployment strategy that involves deleting the existing resources and creating new ones. This strategy is useful when you need to recreate the resources from scratch, for example–when you need to implement BC breaking changes to your database.

With ACP, you need to consider the following when running destructive deployment:
* Every connected app might have already created resources for your project.
* Wiping out the resources of an app may lead to data loss or inconsistency.

To avoid these issues, you need to follow the best practices when using ACP and destructive deployment together:

{% info_block warningBox "Disconnect every connected App before running destructive deployment" %}
Before running destructive deployment, disconnect every connected App from the App Catalog.
This ensures that the App can recreate the resources from scratch.
If additional steps are required to disconnect an App (e.g. putting orders to a closed state or similar), you will receive a warning message explaining what is missing/what needs to be done to properly disconnect the App.
{% endinfo_block %}
