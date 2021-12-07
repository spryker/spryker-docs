---
title: Monitoring issues and informing about alerts
description: Learn how issues with environments are monitored and how customers are informed about alerts on PaaS
template: concept-topic-template
---

Every Spryker cloud environment is monitored by the monitoring systems and a dedicated 24/7 team that ensures that environments run stable for our customers. In case of problems, this team can take action autonomously or inform customers and partners if there is a need for further action on their side. This article explains in more detail how monitoring and alerting works on Spryker PaaS.

## What is monitored?

Here is a high-level overview of the alarms that are configured by default in our environments:

### Endpoint status

<div class="width-100">

|Name of metric   | Description  |
|---|---|
|External monitor: HTTP check Yves/Zed /health-check (Draft)   | Checks whether Yves and Ted health-check endpoints provide an expected response  |
| 200 responses on Yves / Glue in ALB  | Checks whether Yves and GLUE provide 200 OK response to an application load balancer  | 
| 200 responses on Zed in ALB  | Checks whether ZED endpoint provides 200 OK response to an application load balancer  | 
| AVG Response time in ms  | Checks the page response time and runs on a pre-set threshold  | 
| ALB 5XX response codes | Checks the status codes the application load balancer receives from the load balanced applications for the 5XX status codes  | 

</div>

### ElastiCache/Redis

<div class="width-100">

|Name of metric   | Description  | 
|---|---|
| ElastiCache Status  |Checks the status of the ‘ElastiCache for Redis’ status   | 
| Redis is not used by any service  | Checks whether ElastiCache is used  | 
| Redis is full  |Alerts the standby team when Redis has run out of memory and is swapping above 50MB of data, the amount of free memory on the host is running low, and when keys are evicted due to memory constraints   | 

</div>

### ElasticSearch

<div class="width-100">

| Name of metric  | Description  | 
|---|---|
| ES cluster status  | Checks the status of the Elasticsearch Cluster  |  

</div>

### Database

<div class="width-100">

|  Name of metric | Description  | 
|---|---|
|RDS DB connections   | Checks whether there are active connections to RDS  | 
| RDS IO Credits  | Checks whether the RDS instance is running low or is running out of IO Credits  |   

</div>

### Scheduler

<div class="width-100">

|  Name of metric | Description  | 
|---|---|
| Jenkins Failed Jobs  | Checks whether there are failed jobs on Jenkins  | 
| Scheduler disk is 90% filled  | Alerts the monitoring team once Jenkins disk utilization is at or above 90%  | 
| Jenkins container can't be deployed  |Checks whether there are deployment failures of Jenkins container   | 

</div>

### Message broker

<div class="width-100">

| Name of metric  | Description  |  
|---|---|
| RabbitMQ web page isn't accessible  | Checks whether RabbitMQ web UI is reachable  | 
| RMQ: status by host  | Checks whether the host that RabbitMQ is running on is online  | 
| RMQ: disk alarms (Draft)  | Checks the status of the storage that is attached the instance that RabbitMQ is running on  | 
| RMQ: memory alarms  |Checks memory utilization on RabbitMQ instance   | 

</div>

### Deployment and miscellaneous

<div class="width-100">

| Name of metric  | Description  |  
|---|---|
| ECR Image scan results  | Spryker scans images that are used during the application build process. If high/higher severity vulnerabilities are discovered, an alert is triggered  |

</div>

## When and how to get customers alerted?

Most of the alerts that we receive are temporary states and do not constitute a real problem; however, there are alert patterns that require us to take action. Here we differentiate between acutely critical issues in production environments and staging or test environments. We focus on critical infrastructure problems in the production environments. 

If the monitoring team does not find a likely benign explanation (temporary deployment error, etc.) and solution which does not require the consent or cooperation of the customer / partner, we will contact the customer / partner by opening an alert case and the contact persons known to us to get informed about the problem. In case a Solution Partner is responsible, the status of these alert cases and their associated tickets can be tracked in the Partner Portal in the Case Detail view under Ticket Status (daily update). 

If it is possible to resolve the problem on our own, we solve it, and the partner is subsequently informed about the incident via case (and Root Cause Analysis [RCA] report) if downtime or severe service degradation has occurred. 

In a nutshell, we try to proactively inform our partners and customers about infrastructure issues in their production environments where their collaboration in resolving them is necessary. In case of an emergency, we keep customers and partners in the loop by sharing our diagnosis, options for action, and finally, a root cause analysis after the problem is resolved.

## Want more insights?

We offer New Relic APM so that our customers can also monitor their applications and configure their alerting and monitoring to their needs. Please get in contact with us if you want to use New Relic APM with the Spryker Cloud.