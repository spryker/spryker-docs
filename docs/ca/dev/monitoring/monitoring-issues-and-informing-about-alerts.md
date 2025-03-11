---
title: Monitoring issues and informing about alerts
DESCRIPTION: Monitor and manage Spryker Cloud environments with automatic alerts for system health, performance, and critical issues, ensuring proactive issue resolution.
template: concept-topic-template
last_updated: Feb 07, 2024
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/monitoring-issues-and-informing-about-alerts.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/monitoring/monitoring.html
  - /docs/customizing-aws-cloudwatch-dashboards
  - /docs/en/customizing-aws-cloudwatch-dashboards
  - /docs/cloud/dev/spryker-cloud-commerce-os/customizing-aws-cloudwatch-dashboards.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/monitoring/customize-aws-cloudwatch-dashboards.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/monitoring/performance-and-availability-monitoring-via-new-relic.html
  - /docs/ca/dev/monitoring/monitoring.html
  - /docs/ca/dev/monitoring/performance-and-availability-monitoring-via-new-relic.html
  - /docs/ca/dev/monitoring/customize-aws-cloudwatch-dashboards.html  
---

Every Spryker cloud environment is monitored by the monitoring systems and a dedicated 24/7 team that ensures that environments run stable. If an issue occurs, this team takes action autonomously and informs you about any further actions needed on their or your side. This document explains how monitoring and alerting works.

## What is monitored?

The following alerts are configured by default for all environments.

### Endpoint status

<div class="width-100">

| NAME OF METRIC   | DESCRIPTION  |
|---|---|
| External monitor: HTTP check Yves/Zed /health-check (Draft)   | Checks if Yves and Zed health-check endpoints provide an expected response.  |
| 200 responses on Yves / Glue in ALB  | Checks if Yves and GLUE provide the 200 OK response to the application load balancer.  |
| 200 responses on Zed in ALB  | Checks if the Zed endpoint provides the 200 OK response to the application load balancer.  |
| AVG Response time in ms  | Checks page response time and runs on a pre-set threshold.  |
| ALB 5XX response codes | Checks if the application load balancer receives 5XX status codes from the load-balanced applications.  |
| ALB Healthy Hosts in Target Group | Sends health checks to the registered targets.  |

</div>

### ElastiCache/Redis

<div class="width-100">

|NAME OF METRIC   | DESCRIPTION  |
|---|---|
| ElastiCache Status  | Checks the status of 'ElastiCache for Redis'.  |
| Redis is not used by any service  | Checks whether ElastiCache is used.  |
| Redis available Memory  | Checks if Redis free memory on the host is running low.  |
| Redis High CPU  | Checks if the Redis service is high on CPU usage.  |

</div>

### Elasticsearch

<div class="width-100">

| NAME OF METRIC  | DESCRIPTION  |
|---|---|
| ES Cluster Status  | Checks the status of the Elasticsearch cluster.  |  
| ES available storage  | Checks the available storage of the Elasticsearch cluster.  |  
| ES High CPU  | Checks if the Elasticsearch service is high on CPU usage.  |  

</div>

### Database

<div class="width-100">

|  NAME OF METRIC | DESCRIPTION  |
|---|---|
| RDS Status  | Checks the status of the RDS.  |   
| RDS IO Credits  | Checks if the RDS instance is running low or is running out of IO credits.  |   
| RDS available storage  | Checks available storage of RDS.  |
| RDS High CPU   | Checks if the RDS service is high on CPU usage.  |


</div>

### Scheduler

<div class="width-100">

|  NAME OF METRIC | DESCRIPTION  |
|---|---|
| Jenkins Status  | Checks the status of Jenkins.  |
| Scheduler disk is 90% filled  | Alerts the monitoring team once Jenkins disk utilization is at 90% or above.  |
| Scheduler inode usage is above 90%  | Alerts the monitoring team once Jenkins inode utilization is at 90% or above.  |
| Jenkins container can't be deployed  | Checks if there are deployment failures of the Jenkins container.   |
| Jenkins High CPU  | Checks if the Jenkins service is high on CPU usage.   |
| Jenkins High Memory  | Checks if the Jenkins service is high on memory usage. |

</div>

### Message broker

<div class="width-100">

| NAME OF METRIC  | DESCRIPTION  |  
|---|---|
| RabbitMQ web page isn't accessible  | Checks if RabbitMQ web UI is reachable.  |
| RMQ: status by host  | Checks if the RabbitMQ host is reachable.  |
| RMQ: disk alarms  | Checks the status of the storage attached to the instance which RabbitMQ is running on.  |
| RMQ: memory alarms  | Checks the memory utilization on the RabbitMQ instance.   |
| RMQ: missing queues  | Checks for missing queues on the RabbitMQ instance.   |
| RMQ: High CPU  | Checks if the RabbitMQ service is high on CPU usage.   |

</div>

### Elastic Container Services (ECS)

<div class="width-100">

| NAME OF METRIC  | DESCRIPTION  |  
|---|---|
| ECS Service Status  | Checks the status of all ECS services.  |
| ECS Service High CPU  | Checks if the ECS service is high on CPU usage.  |
| ECS Service High Memory  | Checks if the ECS service is high on memory usage.  |
| ECS Service Auto-Scaling  | Monitors the activity of the ECS service auto-scaling.  |


</div>

### Deployment and miscellaneous

<div class="width-100">

| NAME OF METRIC  | DESCRIPTION  |  
|---|---|
| ECR Image scan results  | Scans the images used for the application build process. If high severity vulnerabilities are discovered, an alert is triggered.  |

</div>

## In what cases do we contact you?

Most alerts we receive are temporary states and aren't a real problem. However, some alert patterns require us to take action. There is a difference between critical issues in production environments and staging or test environments. We focus on critical infrastructure problems in production environments.

If there is an alert, the monitoring team looks for a likely explanation, like a temporary deployment error. If the team needs to take an action, they decide if it requires consent or cooperation from your side. If cooperation or consent is needed, they will contact the responsible person by opening an alert case. If a Solution Partner is responsible, you can track the status of these alert cases and the tickets in the Partner Portal. We update them on a daily basis in the **Case Detail** view under **Ticket Status**.

If it's possible to resolve an issue on our own, we'll do it. In case of a downtime or severe service degradation, we inform you about the incident via a case and a Root Cause Analysis [RCA] report.
