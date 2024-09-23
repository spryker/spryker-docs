---
title: ACP and destructive deployment
Descriptions: Learn how to use ACP and destructive deployment in Spryker projects.
template: howto-guide-template
last_updated: Dec 18, 2023

---

This document describes how to use the App Composition Platform (ACP) and destructive deployment in Spryker projects.

## ACP and destructive deployment

The App Composition Platform (ACP) enables you to connect, configure, and use the available third-party services with zero or low development effort. For business information about ACP, see [Spryker App Composition Platform](https://spryker.com/app-composition-platform/#/).

When you use ACP in your Spryker project, you can also use destructive deployment. Destructive deployment is a deployment strategy that involves deleting the existing resources and creating new ones. This strategy is useful when you need to recreate the resources from scratch, for example, when you need to implement BC breaking changes to your database.

However, when you use ACP and destructive deployment together, you need to consider the following:
* Every connected app might have already created resources for your project.
* Wiping out the resources of an App might lead to data loss or other issues, like inconsistent data.

To avoid data loss or other issues, you need to follow the best practices when using ACP and destructive deployment together:

{% info_block warningBox "Disconnect every connected App before running destructive deployment" %}
Before running destructive deployment, disconnect every connected App in your project.
This ensures that the App can recreate the resources from scratch.
If additional steps are required to disconnect an App, you will receive a warning message.
{% endinfo_block %}

