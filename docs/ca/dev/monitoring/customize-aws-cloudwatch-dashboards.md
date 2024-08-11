---
title: Customize AWS CloudWatch dashboards
description: Adjust AWS CloudWatch dashboards to your needs.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/customizing-aws-cloudwatch-dashboards
originalArticleId: 20c2a91e-d6c8-446b-ace9-4723e2fd078a
redirect_from:
  - /docs/customizing-aws-cloudwatch-dashboards
  - /docs/en/customizing-aws-cloudwatch-dashboards
  - /docs/cloud/dev/spryker-cloud-commerce-os/customizing-aws-cloudwatch-dashboards.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/monitoring/customize-aws-cloudwatch-dashboards.html
---

This document describes how to customize AWS CloudWatch dashboards.

AWS CloudWatch dashboards give you a good overview of what is going on in your environments and can show potential bottlenecks.

{% info_block infoBox %}

You might not be able to find memory or disk utilization metrics for some services and instances. This is an AWS limitation that can be solved by installing the CloudWatch Agent on the instances you want to monitor. To install the CloudWatch Agent, [contact us](https://support.spryker.com).

{% endinfo_block %}


## Adding a new widget


In the instructions below, we customize an existing dashboard by adding a widget displaying CPU utilization of Jenkins. You can use the instructions with new dashboards and other services and metrics.

To add a widget displaying CPU utilization of Jenkins to a dashboard:

1. In the AWS Management Console, go to **Services** > **CloudWatch**.

2. In the navigation pane, select **Dashboards**.
    In the **Dashboards** pane, you can see the list of preconfigured dashboards.

3. Select the dashboard you want to add the widget to.
    You should see preconfigured metrics, like CPU utilization and HTTP responses.

4. Select **Add widget**.


5. In the **Add widget** dialogue box, select **Line**.  

![widget type selection](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Customizing+AWS+CloudWatch+dashboards/widget-type-selection.png)

6. In the **Add to this dashboard** dialogue box, select **Metrics**.

7. Since Jenkins is running on EC2, in the **Metrics** pane, select **EC2** > **Per-Instance Metrics**.

![metrics selection](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Customizing+AWS+CloudWatch+dashboards/metrics-selection.png)

8. Select the _scheduler_ instance with the _CPUUtilization_ metric name.

9. Select **Create widget**.

The dialogue box closes with the new widget displayed in the dashboard.  

![created widget](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Customizing+AWS+CloudWatch+dashboards/created-widget.png)

## Customizing an existing widget

To customize an existing widget:

1.  At the top-right corner of the widget, select _Widget actions_ > **Edit**.  

![widget actions in context](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Customizing+AWS+CloudWatch+dashboards/widget-actions-in-context.png)

2.  In the **Edit graph** dialogue box, adjust the widget per your requirements.

3.  Select **Update widget**.
