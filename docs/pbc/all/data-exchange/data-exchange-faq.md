---
title: Data Exchange FAQ
description: 
template: concept-topic-template
---
## Spryker Middleware powered by Alumio

**How can I understand where data is stuck? How can I rectify issues that occurred during an integration run?**

When data is not successfully processed via Alumio the specific Task (which contains the data) will be set to “Failed”. This allows you to easily spot via the Alumio dashboard which Tasks were not completed. You can also filter on this. The reason for failing can be found in either the “Import” or the “Export” logs of a Task (detail page of a Task). These logs will give clarity on why the import or export of data failed – and allow you to find the cause very fast. Besides that, in our latest version of Alumio we’ve made it possible to export Tasks (i.e. all failed tasks) to a CSV-file. This way other parties without access to Alumio can also analyse the data.

**How can I get notified of any issues?**
There are multiple types of alerts via email within Alumio. On the following pages on our forum you can find more detailed information:

[Alerts for Incoming Configurations](https://forum.alumio.com/t/alerts-for-incoming-configurations/355) 

[Alerts for Route Configurations](https://forum.alumio.com/t/alerts-for-route-configurations/357) 

**What is the performance of Alumio? Is there any overhead that Alumio adds?**

On the following page on our website you can find detailed statistics regarding the performance of Alumio: https://www.alumio.com/performance/reports . Alumio does add a very small amount of overhead, as processing the data takes effort. And the more data transformations you perform in Alumio, the more overhead you add. But this overhead without any transformations of data is very minimum (milliseconds per Task).

**What do I need to connect Spryker Middleware powered by Alumio to Spryker Cloud Commerce OS?**
On  your Alumio platform you just need to create an HTTP Client by selecting Spryker Data Exchange API. 

Also, on your Spryker Cloud Commerce OS platform you need to have installed the latest[ Data Exchange API modules integration](https://docs.spryker.com/docs/scos/dev/feature-integration-guides/202307.0/glue-api/dynamic-data-api/data-exchange-api-integration.html).
 

## Data Exchange API

**What is the difference between Backend API and (Dynamic) Data Exchange API?**

The difference between Backend API & Data Exchange API is that:

The Backend API is a resource/route based development driven API endpoints that serve a specific business logic purpose (like set calculate order totals or manage PIM data). 

On the other hand, the Data Exchange API is a REST API abstraction over our database tables that provide an easy (yet secure) access to our data model directly with higher levels of performance that is managed with no development efforts needed via UI or configuration files.


**Can the Data Exchange API be used without Spryker Middleware powered by Alumio?**

Yes, it can. The Data Exchange API is part of Spryker Cloud Commerce (SCCOS) core and it's not dependent on any middleware. It can be used by any middleware, application service, etc. to exchange data with SCCOS.
