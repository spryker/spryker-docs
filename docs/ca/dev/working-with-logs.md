---
title: Working with logs
description: Locate the needed logs to debug an application.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/working-with-logs
originalArticleId: bf2fcf27-ef7f-4ff5-b491-850d20b73a1e
redirect_from:
  - /docs/working-with-logs
  - /docs/en/working-with-logs
  - /docs/cloud/dev/spryker-cloud-commerce-os/working-with-logs.html
---

This document describes how to work with logs(events). Logs provide information about the state of application and related services. In Spryker Cloud Commerce OS, logging is maintained by [Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html).


## Log groups

To make log browsing easier, logs from the same source form a log stream. Log streams with the same retention, monitoring, and access control settings form a log group. The following is an approximate list of log groups that can be available in your project. The actual list of log groups depends on your setup.

| LOG GROUP | PATH |
| --- | --- |
| AWS code build pipelines | DESTRUCTIVE pipeline jobs: /aws/codebuild/danger/{environment_name} <br> NORMAL pipeline jobs: /aws/codebuild/{environment_name} |
| AWS Elasticsearch | /aws/elasticsearch/{environment_name} |
| AWS RDS instances | /aws/rds/instance/{environment_name}/error |
| AWS Certificates expiration | /aws/lambda/{environment_name}-certificate-expiration |
| AWS Codebuild | /codebuild |
| EC2 Jenkins | /ec2/{environment_name}/jenkins/docker |
| ECS blackfire | /ecs/fargate/{environment_name}/blackfire/docker |
| Frontend service | /ecs/{environment_name}/frontend/docker |
| Glue API | /ecs/{environment_name}/glue/docker |
| Glue Backend API | /ecs/{environment_name}/glue_backend/docker |
| ECS Jenkins | /ecs/{environment_name}/jenkins/docker |
| RabbitMQ ECS | /ecs/{environment_name}/rabbitmq/docker |
| Storefront (Yves) | /ecs/{environment_name}/yves/docker |
| ECS ZED | /ecs/{environment_name}/zed/docker |
| Back Office | /ecs/{environment_name}/boffice/docker |
| Merchant Portal | /ecs/{environment_name}/mportal/docker |

### Audit logs

Audit logs are a type of logs used to track user-related activities. If [audit logs are installed](/docs/dg/dev/backend-development/audit-logs/audit-logs.html), you can browse them for the following log groups:

* Storefront (Yves)
* Back Office
* Merchant Portal
* Glue API
* Glue Backend API

The actual list of applications for which audit logs are enabled depends on your setup.

The following audit events are logged by default:

* Successful login
* Failed login
* Password reset requested
* Password updated after reset
* [Agent Assist feature](/docs/pbc/all/user-management/{{site.version}}/base-shop/agent-assist-feature-overview.html) logs:
  * Impersonation started
  * Impersonation ended

## Search in logs

{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->


## Next step

[Preparation for going live](/docs/ca/dev/preparation-for-going-live.html)
