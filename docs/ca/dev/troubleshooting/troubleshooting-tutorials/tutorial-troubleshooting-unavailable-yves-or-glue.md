---
title: Tutorial — Troubleshooting unavailable Yves or Glue
description: Learn how to troubleshoot unavailable Yves or Glue
template: troubleshooting-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-unavailable-yves-or-glue.html
---
Yves or Glue didn't restart after a deployment or you can't access it.

To troubleshoot this issue, you need to go through all the stages of information flow. The default information flow is front end > Yves or Glue > ElastiCache, ElasticSearch, and Zed.

![information flow diagram](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/informatin-flow-diagram.png)

## 1. Check logs

Check front-end, Yves, and Glue logs as follows. Filter log groups by `yves`, `frontend`, and `glue`.

{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->

## 2. Check multiple log groups

Check front-end, Yves, and Glue logs via Logs Insights as follows. Select the log groups containing `yves`, `frontend`, and `glue`.

{% include searching-by-multiple-log-groups.md %} <!-- To edit, see /_includes/searching-by-multiple-log-groups.md -->

## 3. Check ECS services and tasks

Check front-end, Yves, and Glue services and tasks as follows. The respective services and tasks are postfixed with `frontend`, `yves`, and `glue`.

{% include checking-the-status-of-ecs-services-and-tasks.md %} <!-- To edit, see /_includes/checking-the-status-of-ecs-services-and-tasks.md -->

## 4. Check Redis status

Check the status of Redis via AWS Management Console:

{% include checking-redis-status-via-aws-management-console.md %} <!-- To edit, see /_includes/checking-redis-status-via-aws-managemet-console.md -->


## 5. Check Redis system information

Check Redis system information via a CLI as follows.

{% include checking-redis-system-information-via-a-cli.md %}  <!-- To edit, see /_includes/checking-redis-system-information-via-a-cli.md -->

## 6. Check ElasticSearch status

Check ElasticSearch status via AWS Management Console:

{% include checking-elasticsearch-status-via-aws-management-console.md %} <!-- To edit, see /_includes/checking-elasticsearch-status-via-aws-management-console.md -->

## 7. Check ElasticSearch indices

Check ElasticSearch status via a CLI:

{% include checking-elasticsearch-indices-via-a-cli.md %} <!-- To edit, see /_includes/checking-elasticsearch-indices-via-a-cli.md -->
