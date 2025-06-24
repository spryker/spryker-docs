---
title: Tutorial — Troubleshooting an unavailable Zed
description: Resolve issues with an unavailable Zed in Spryker by troubleshooting ECS services, Redis, RDS, and logs to restore functionality and improve performance.
template: troubleshooting-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-an-unavailable-zed.html
---
Zed didn't restart after a deployment or you can't access it.


<!-- vale on -->
To troubleshoot this issue, you need to go through all the stages of information flow. The default information flow is:  Front end > Gateway(optional) > Zed > ElastiCache, Elasticsearch, RMQ, and RDS.
<!-- vale off -->


![information flow diagram](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/informatin-flow-diagram.png)

## 1. Check logs

Check front-end, gateway, and Zed logs described below. Filter log groups by the following:
- `frontend`
- `backgw`
- `boffice`
- `mportal`
- `backapi`
- `zed`

{% info_block warningBox "Troubleshooting error 504" %}

If you are troubleshooting response 504, besides errors, pay attention to warnings. Examples:


```text
WARNING:[pool worker] child 18, script 'index.php' (request: "GET /index.php") execution timed out (61 sec),terminating
WARNING:[pool worker] child 18 exited on signal 15 (SIGTERM) after 221.30 seconds from start
```

Response 504 can be caused by the `zed` or `boffice` container reaching memory limit. If none of the steps in this document reveal the issue, make sure to include these warnings in your support ticket.

{% endinfo_block %}


Check logs via Log groups:

{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->

## 2. Check multiple log groups at once

Check front-end, gateway, and Zed logs described below. Select the log groups containing the following:
- `frontend`
- `backgw`
- `boffice`
- `mportal`
- `backapi`
- `zed`

Check logs via Logs Insights:

{% include searching-by-multiple-log-groups.md %} <!-- To edit, see /_includes/searching-by-multiple-log-groups.md -->

## 3. Check ECS services and tasks

Check the ECS services and tasks that are postfixed with the following:
- Front-end: `frontend`
- If gateway is deployed:
  - `backgw`
  - `boffice`
  - `mportal`
  - `backapi`
- Zed: `zed`

To check the services and tasks, do the following:

{% include checking-the-status-of-ecs-services-and-tasks.md %} <!-- To edit, see /_includes/checking-the-status-of-ecs-services-and-tasks.md -->


## 4. Check Redis status

Check the status of Redis via AWS Management Console:

{% include checking-redis-status-via-aws-management-console.md %} <!-- To edit, see /_includes/checking-redis-status-via-aws-managemet-console.md -->


## 5. Check Redis system information

To check Redis system information via a CLI, do the following.

{% include checking-redis-system-information-via-a-cli.md %} <!-- To edit, see /_includes/checking-redis-system-information-via-a-cli.md -->


## 6. Check Elasticsearch status

Check Elasticsearch status via AWS Management Console:

{% include checking-elasticsearch-status-via-aws-management-console.md %} <!-- To edit, see /_includes/checking-elasticsearch-status-via-aws-management-console.md -->

## 7. Check Elasticsearch indices

To check Elasticsearch indices via a CLI, do the following.

{% include checking-elasticsearch-indices-via-a-cli.md %} <!-- To edit, see /_includes/checking-elasticsearch-indices-via-a-cli.md -->

## 8. Check the database

Check the status of the RDS database:

{% include checking-rds-database-status.md %} <!-- To edit, see /_includes/checking-rds-database-status.md -->
