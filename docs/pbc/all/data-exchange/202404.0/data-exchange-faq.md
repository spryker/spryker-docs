---
title: Data Exchange FAQ
description: 
template: concept-topic-template
last_updated: Oct 18, 2023
---
## Spryker Middleware powered by Alumio

**How can I understand where data is stuck? How can I rectify issues that occurred during an integration run?**

When data isn't processed successfully via Alumio, the specific task which contains the data will be set to “Failed”. This feature allows you to identify incomplete tasks through the Alumio dashboard. You can also filter tasks by this status. The reason for the failure can be located in the task detail page, within either the *Import* or *Export* logs. These logs provide insights into why the data import or export failed and allow you to find the cause. Additionally, the latest version of Alumio allows you to export tasks, specifically all failed tasks, to a .CSV file. This way, other parties without access to Alumio can also analyze the data.

**How can I get notified of any issues?**

There are multiple types of alerts via email within Alumio. See the following pages for more details:

- [Alerts for Incoming Configurations](https://forum.alumio.com/t/alerts-for-incoming-configurations/355)
- [Alerts for Route Configurations](https://forum.alumio.com/t/alerts-for-route-configurations/357) 

**What is the performance of Alumio? Is there any overhead that Alumio adds?**

Alumio does introduce a minimal amount of overhead, as processing the data requires resources. The extent of this overhead depends on the number of data transformations carried out in Alumio. In cases where no data transformations are applied, the overhead is extremely low, measuring in milliseconds per task.
Check the following Alumio report with the detailed statistics regarding the performance of Alumio: https://www.alumio.com/performance/reports. 

**What do I need to connect Spryker Middleware powered by Alumio to Spryker Cloud Commerce OS?**

On your Alumio platform, you need to create an HTTP Client by selecting Spryker Data Exchange API. 

Also, on your Spryker Cloud Commerce OS platform, you have to install the latest [Data Exchange API modules integration](https://docs.spryker.com/docs/scos/dev/feature-integration-guides/202307.0/glue-api/dynamic-data-api/data-exchange-api-integration.html).
 
 ## Integration Apps
 
 **What is the difference between an Alumio Connector and an Integration App?**

An Alumio Connector enables connectivity between a data source, such as an external system, and the Alumio platform (Spryker Middleware powered by Alumio). The connector itself doesn't include any business logic or data transformation.

While an Integration Apps is a pre-built integration that links popular platforms with Spryker Cloud Commerce OS. The integration apps reduce the time and complexity of setting up new data exchange pathways. The integration apps usually encompass business logic, data mapping, and data transformation.

## Data Exchange API

**What is the difference between Backend API and Data Exchange API?**

The difference between Backend API and Data Exchange API lies in their functionalities:

- The Backend API consists of resource/route-based development-driven API endpoints that serve a specific business logic purpose, such as calculating order totals or managing PIM data. 
- In contrast, the Data Exchange API is a REST API abstraction layer over our database tables, offering secure and convenient access to our data model with enhanced performance. It's managed through UI or configuration files without requiring development efforts.

**Can the Data Exchange API be used without Spryker Middleware powered by Alumio?**

Yes, it can. The Data Exchange API is part of Spryker Cloud Commerce core and it's not dependent on any middleware. It can be used by any middleware, application service, etc., to exchange data with SCCOS.
