---
title: Managing Punch Out Connections
originalLink: https://documentation.spryker.com/v3/docs/managing-punchout-connections
redirect_from:
  - /v3/docs/managing-punchout-connections
  - /v3/docs/en/managing-punchout-connections
---

This topic describes how to create and manage the Punch Out connections.

To start managing connections, navigate to the **Punch Out** section.

## Creating a new Punch Out Connection
To connect your ERP with the Spryker Commerce OS via the Punch Out protocol, you need to create a Punch Out connection.
To create the connection:
1. On the **Punch Out Connections** page, click **+New Connection** in the top right corner.
2. On the **Create Transferred Cart Connection** page, enter and select the attributes. See [Punch Out: Reference Information](/docs/scos/dev/user-guides/201907.0/back-office-user-guide/punch-out/references/punch-out-refer).
3. Click **Create**.

## Editing a Punch Out Connection
If the connection details change, edit them.
To edit the connection:
1. In the **List of Punch Out Connections > Actions** column, click **Edit** for a specific connection.
2. On the **Edit Transferred Cart Connection** page, change the attributes. See [Punch Out: Reference Information](/docs/scos/dev/user-guides/201907.0/back-office-user-guide/punch-out/references/punch-out-refer).
3. Click **Save**.

## Viewing the Entry Points
Entry points are the Gateway URLs that are available for connection, where ERP can punch out.
To view the entry points, in the **List of Punch Out Connections > Actions** column, click **Entry Points**.
![Entry points](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Punch+Out/entry-points.png){height="" width=""}

## (De)Activating the Punch Out Connection
When you do not need the connection anymore, you can deactivate it. To do this, in the **List of Punch Out Connections > Actions** column, click **Deactivate**. The connection is deactivated immediately.

{% info_block warningBox "Note" %}
If you need the connection back, you can activate it again. To activate the connection, click **Activate** in the **List of Punch Out Connections > Actions** column.
{% endinfo_block %}
