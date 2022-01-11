---
title: Managing Punch Out Connections
description: The Managing Punch out Connections guide lists steps on how to create, edit, view, activate and deactivate Punch out connections.
last_updated: Nov 22, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v4/docs/managing-punchout-connections
originalArticleId: 68b09a94-af04-4992-8047-d9ada995be13
redirect_from:
  - /v4/docs/managing-punchout-connections
  - /v4/docs/en/managing-punchout-connections
related:
  - title: Punch Out Feature Overview
    link: docs/scos/user/features/page.version/technology-partner-integrations/punch-out/punch-out-feature-overview.html
  - title: Punch Out
    link: docs/scos/user/features/page.version/technology-partner-integrations/punch-out/punch-out.html
---

This topic describes how to create and manage the Punch Out connections.

To start managing connections, navigate to the **Punch Out** section.

## Creating a new Punch Out Connection

To connect your ERP with the Spryker Commerce OS via the Punch Out protocol, you need to create a Punch Out connection.
To create the connection:
1. On the **Punch Out Connections** page, click **+New Connection** in the top right corner.
2. On the **Create Transferred Cart Connection** page, enter and select the attributes. See the [Punch Out: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/punch-out/references/punch-out-reference-information.html) article.
3. Click **Create**.

## Editing a Punch Out Connection

If the connection details change, edit them.
To edit the connection:
1. In the **List of Punch Out Connections > Actions** column, click **Edit** for a specific connection.
2. On the **Edit Transferred Cart Connection** page, change the attributes. See the [Punch Out: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/punch-out/references/punch-out-reference-information.html) article.
3. Click **Save**.

## Viewing the Entry Points

Entry points are the Gateway URLs that are available for connection, where ERP can punch out.
To view the entry points, in the **List of Punch Out Connections > Actions** column, click **Entry Points**.
![Entry points](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Punch+Out/entry-points.png)

## (De)Activating the Punch Out Connection

When you do not need the connection anymore, you can deactivate it. To do this, in the **List of Punch Out Connections > Actions** column, click **Deactivate**. The connection is deactivated immediately.

{% info_block warningBox "Note" %}

If you need the connection back, you can activate it again. To activate the connection, click **Activate** in the **List of Punch Out Connections > Actions** column.

{% endinfo_block %}

<!-- Last review date: Sep 2, 2019 by Oksana Karasyova  -->
