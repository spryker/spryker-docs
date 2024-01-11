---
title: Monitoring issues and informing about alerts
DESCRIPTION: Learn how issues with environments are monitored and how customers are informed about alerts on SCCOS
template: concept-topic-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/monitoring-issues-and-informing-about-alerts.html
---

Every Spryker cloud environment is monitored by the monitoring systems and a dedicated 24/7 team that ensures that environments run stable. In case of problems, this team takes action autonomously or inform you if there is a need for further action on their side. This document explains in details how monitoring and alerting works on Spryker Cloud Commerce OS.

## What is monitored?

The following alerts are configured by default for all environments.

### Endpoint status

<div class="width-100">

|NAME OF METRIC   | DESCRIPTION  |
|---|---|
|External monitor: HTTP check Yves/Zed /health-check (Draft)   | Checks if Yves and Zed health-check endpoints provide an expected response.  |
| 200 responses on Yves / Glue in ALB  | Checks whether Yves and GLUE provide 200 OK response to application load balancer.  |
| 200 responses on Zed in ALB  | Checks whether ZED endpoint provides 200 OK response to application load balancer.  |
| AVG Response time in ms  | Checks the page response time and runs on a pre-set threshold.  |
| ALB 5XX response codes | Checks the status codes the application load balancer receives from the load balanced applications for the 5XX status codes.  |

</div>

### ElastiCache/Redis

<div class="width-100">

|NAME OF METRIC   | DESCRIPTION  |
|---|---|
| ElastiCache Status  | Checks the status of ‘ElastiCache for Redis’.  |
| Redis is not used by any service  | Checks whether ElastiCache is used.  |
| Redis is full  | Alerts the standby team when Redis runs out of memory and is swapping above 50MB of data, the amount of free memory on the host is running low, and when keys are evicted due to memory constraints.   |

</div>

### ElasticSearch

<div class="width-100">

| NAME OF METRIC  | DESCRIPTION  |
|---|---|
| ES cluster status  | Checks the status of the Elasticsearch Cluster.  |  

</div>

### Database

<div class="width-100">

|  NAME OF METRIC | DESCRIPTION  |
|---|---|
|RDS DB connections   | Checks if there are active connections to RDS.  |
| RDS IO Credits  | Checks if the RDS instance is running low or is running out of IO Credits.  |   

</div>

### Scheduler

<div class="width-100">

|  NAME OF METRIC | DESCRIPTION  |
|---|---|
| Jenkins Failed Jobs  | Checks if there are failed jobs on Jenkins.  |
| Scheduler disk is 90% filled  | Alerts the monitoring team once Jenkins disk utilization is at 90% or above.  |
| Jenkins container can't be deployed  | Checks whether there are deployment failures of the Jenkins container.   |

</div>

### Message broker

<div class="width-100">

| NAME OF METRIC  | DESCRIPTION  |  
|---|---|
| RabbitMQ web page isn't accessible  | Checks if RabbitMQ web UI is reachable.  |
| RMQ: status by host  | Checks if the host that RabbitMQ is running on is online.  |
| RMQ: disk alarms (Draft)  | Checks the status of the storage that is attached the instance that RabbitMQ is running on.  |
| RMQ: memory alarms  | Checks memory utilization on the RabbitMQ instance.   |

</div>

### Deployment and miscellaneous

<div class="width-100">

| NAME OF METRIC  | DESCRIPTION  |  
|---|---|
| ECR Image scan results  | Spryker scans images that are used during the application build process. If high severity vulnerabilities are discovered, an alert is triggered.  |

</div>

## In what cases do we contact you?

Most of the alerts that we receive are temporary states and do not constitute a real problem. However, there are alert patterns that require us to take action. Here we differentiate between acutely critical issues in production environments and staging or test environments. We focus on critical infrastructure problems in the production environments.

If there is an alert, the monitoring team looks for a likely explanation, like a temporary deployment error. If the alert requires an action, the team decides if it requires consent or cooperation from your side. If cooperation or consent is needed, they will contact the responsible person by opening an alert case. If a Solution Partner is responsible, you can track the status of these alert cases and the tickets in the Partner Portal. We update them on a daily basis in the Case Detail view under Ticket Status.

If it is possible to resolve the problem on our own, we solve it. In case of  downtime or severe service degradation, we inform you about the incident via a case and a Root Cause Analysis [RCA] report.

To sum up, we proactively inform you about infrastructure issues where your collaboration is necessary. In case of an emergency, we keep you in the loop by sharing our diagnosis, options for action, and after the issue is resolved, a root cause analysis.

## Want more insights?

We offer New Relic APM, so you can also monitor applications and configure alerts and monitoring to fulfill your needs. If you want to request an offer for New Relic APM, [contact support](https://support.spryker.com) via **create Case** - **Get Help**.
