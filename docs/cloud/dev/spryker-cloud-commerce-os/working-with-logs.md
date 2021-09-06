---
title: Working with logs
description: Locate the needed logs to debug an application.
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/working-with-logs
originalArticleId: bf2fcf27-ef7f-4ff5-b491-850d20b73a1e
redirect_from:
  - /docs/working-with-logs
  - /docs/en/working-with-logs
---

This document describes how to work with logs(events). Logs provide information about the state of application and related services. In Spryker Cloud Commerce OS, logging is maintained by [Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html).


## Log groups

To make log browsing easier, logs from the same source form a log stream. Log streams with the same retention, monitoring, and access control settings form a log group. You can check logs from the following log groups.

| HEADER | HEADER |
| --- | --- |
| AWS code build pipelines | DESTRUCTIVE pipeline jobs: /aws/codebuild/danger/{environment_name} </br> NORMAL pipeline jobs: /aws/codebuild/{environment_name} |
| AWS Elasticsearch | /aws/elasticsearch/{environment_name} |
| AWS RDS instances | /aws/rds/instance/{environment_name}/error |
| AWS Certificates expiration | /aws/lambda/{environment_name}-certificate-expiration |
| AWS Codebuild | /codebuild |
| EC2 Jenkins | /ec2/{environment_name}/jenkins/docker |
| ECS blackfire | /ecs/fargate/{environment_name}/blackfire/docker |
| Frontend service | /ecs/{environment_name}/frontend/docker |
| GLUE service | /ecs/{environment_name}/glue/docker |
| ECS Jenkins | /ecs/{environment_name}/jenkins/docker |
| RabbitMQ ECS | /ecs/{environment_name}/rabbitmq/docker |
| ECS YVES | /ecs/{environment_name}/yves/docker |
| ECS ZED | /ecs/{environment_name}/zed/docker |

## Search in logs

To search in logs:

1. In the AWS Management Console, go to **Services** > **CloudWatch** > **[Log groups](http://console.aws.amazon.com/cloudwatch/home?region=eu-central-1#logsV2:log-groups)**.

2. In the *Log groups* pane, filter log groups by entering a query in the search bar. For example, enter *staging*.

![filter log groups](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Working+with+logs/filter-log-groups.png)

3. Select the desired [log group](#log-groups).

4. In the *Log streams* pane, select the desired log stream. You can determine the log stream by the time of the last event. 

![select log stream](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Working+with+logs/select-log-stream.png)

5. In the *Log events* pane, filter events by entering a query in the search bar. 


## Next step

[Preparation for going live](/docs/cloud/dev/spryker-cloud-commerce-os/preparation-for-going-live.html)



