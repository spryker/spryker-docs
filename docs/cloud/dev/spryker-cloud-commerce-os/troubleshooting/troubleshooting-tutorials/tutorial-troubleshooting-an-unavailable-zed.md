---
title: Tutorial — Troubleshooting an unavailable Zed
description: Learn how to troubleshoot an unavailable Zed
template: troubleshooting-guide-template
---
Zed didn't restart after a deployment or you can't access it.

To troubleshoot this issue, you need to go through all the stages of information flow. The default information flow is:  Front end > Gateway(optional) > Zed > ElastiCache, ElasticSearch, RMQ, and RDS.

![information flow diagram](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/informatin-flow-diagram.png)

## 1. Check logs

Check front-end, gateway, and Zed logs described below. Filter log groups by the following:
* `frontend`
* `backgw`
* `boffice`
* `mportal`
* `backapi`
* `zed`

Check logs via Log groups:

{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->

## 2. Check multiple log groups at once

Check front-end, gateway, and Zed logs described below. Select the log groups containing the following:
* `frontend`
* `backgw`
* `boffice`
* `mportal`
* `backapi`
* `zed`

Check logs via Logs Insights:

{% include searching-by-multiple-log-groups.md %} <!-- To edit, see /_includes/searching-by-multiple-log-groups.md -->

## 3. Check ECS services and tasks

Check the ECS services and tasks that are postfixed with the following:
* Front-end: `frontend`
* If gateway is deployed:
  * `backgw`
  * `boffice`
  * `mportal`
  * `backapi`
* Zed: `zed`

To check the services and tasks, do the following:

{% include checking-the-status-of-ecs-services-and-tasks.md %} <!-- To edit, see /_includes/checking-the-status-of-ecs-services-and-tasks.md -->

## 4. In case you have got 504 responses from the server 

One of the reasons for 504 response can be reaching out container memory limit.

In this case you have found in zed (boffice) container logs messages like: 

```
WARNING:[pool worker] child 18, script 'index.php' (request: "GET /index.php") execution timed out (61 sec),terminating
WARNING:[pool worker] child 18 exited on signal 15 (SIGTERM) after 221.30 seconds from start
```
you need to create a support request to check cluster node system logs for OOM killer messages 


## 5. Check Redis status

Check the status of Redis via AWS Management Console:

{% include checking-redis-status-via-aws-management-console.md %} <!-- To edit, see /_includes/checking-redis-status-via-aws-managemet-console.md -->


## 6. Check Redis system information

To check Redis system information via a CLI, do the following.

{% include checking-redis-system-information-via-a-cli.md %} <!-- To edit, see /_includes/checking-redis-system-information-via-a-cli.md -->


## 7. Check ElasticSearch status

Check ElasticSearch status via AWS Management Console:

{% include checking-elasticsearch-status-via-aws-management-console.md %} <!-- To edit, see /_includes/checking-elasticsearch-status-via-aws-management-console.md -->

## 8. Check ElasticSearch indices

To check ElasticSearch indices via a CLI, do the following.

{% include checking-elasticsearch-indices-via-a-cli.md %} <!-- To edit, see /_includes/checking-elasticsearch-indices-via-a-cli.md -->

## 9. Check the database

Check the status of the RDS database:

{% include checking-rds-database-status.md %} <!-- To edit, see /_includes/checking-rds-database-status.md -->
