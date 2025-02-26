---
title: Spryker Monitoring Integration
description:
last_updated: Feb 25, 2025
template: howto-guide-template
---

The Spryker Monitoring Integration provides advanced monitoring for applications and systems. Leveraging [OpenTelemetry](https://opentelemetry.io/), this solution enables seamless connectivity and forwarding of telemetry data, including traces and health status metrics, to OpenTelemetry-compatible monitoring platforms. This integration facilitates near real-time tracking of application performance and monitoring of system health status.

## OpenTelemetry
OpenTelemetry (OTel) is an open-source framework that provides APIs, libraries, and agents for collecting traces and metrics across various applications. It standardizes the instrumentation of software to help developers monitor and improve application performance effectively. OTel allows to provide a seamless and vendor-agnostic monitoring experience, empowering customers to integrate Spryker with their preferred APM solutions while adhering to industry best practices for collecting and analyzing performance data.

## Telemetry data in scope of Spryker Monitoring Integration

The Spryker Monitoring Integration focuses on the following entities to provide comprehensive monitoring.

### Traces and spans

{% info_block infoBox %}
The supported version of OTel Semantic Conventions is 1.30.0.
{% endinfo_block %}

In OpenTelemetry, a *trace* represents the journey of a single request or transaction as it moves through various components of a system, capturing the end-to-end flow. A *span* is a single operation or unit of work within a trace, containing information like the operation name, start and end times, and any relevant metadata. Together, traces and spans provide a detailed view of the interactions and performance of different parts of an application, helping to diagnose issues and optimize performance.

### Health status metrics
Spryker Monitoring Integration gives access to a set of service health metrics. These metrics provide a high-level view into the health status of enabled services such us database, message broker, or scheduler. The level of detail is as follows.

{% info_block infoBox %}
The terms labels, dimensions, and attribute are used interchangeably in relation to metrics depending on the telemetry platform used. For example, in Grafana, you have labels, and in Dynatrace, you have dimensions.
{% endinfo_block %}


#### Metrics without dimensions
The following metrics return a gauge with a binary value: 1 for green and 0 for red. They are composites of multiple service-related signals that, after transformations and calculations, yield a single value indicating the service's health.

```yaml
hc_rds: Reports 0 or 1 for the overall health of the RDS Service.
hc_jenkins: Reports 0 or 1 for the overall health of the Jenkins Service.
hc_rabbitmq: Reports 0 or 1 for RabbitMQ health.
```

#### Metrics with dimensions
These metrics have the following labels:
```yaml
hc_rabbitmq_message_count_sum: A count of RabbitMQ messages [dimension_queue, dimension_virtualhost].
hc_jenkins_builds_success_build_count_total.count: A count of successful Jenkins jobs [jenkins_job].
hc_jenkins_builds_failed_build_count_total.count: A count of failed Jenkins jobs [jenkins_job].
hc_tasks_cpu_average: CPU utilization in % for cluster tasks [dimension_clustername, dimension_servicename].
hc_tasks_memory_utilization: Memory utilization in % for cluster tasks [dimension_clustername, dimension_servicename].
```

#### Metric details
The default metrics resolution is 60 seconds. All metrics can be split by telemetry-data-account.

## How do I get it?
### Prerequisites
- Integrate an OpenTelemetry-compatible APM tool from the list of [supported vendors](https://opentelemetry.io/ecosystem/vendors/)
- Customers need to be eligible for Spryker Monitoring Integration

### How to activate Spryker Monitoring Integration
To request the Spryker Monitoring Integration, customers need to submit a Change Request through the [Support Portal](https://support.spryker.com/). Follow these steps:

- Submit a Change Request: Access the Support Portal and create a new Change Request.
- Provide the following Information:
  - Endpoint: The endpoint URL of your APM tool.
  - Token: An API token that Spryker can use to configure and communicate with your APM tool.

Spryker Support will guide you through the setup process once the request is submitted.

### Instrumenting Your Application
To send telemetry data to your APM tool, your application must be instrumented using OpenTelemetry. This process ensures that the necessary data is collected and forwarded to the monitoring system of your choice.
Customers can self-serve the instrumentation by following the [instrumentation guide](/docs/ca/dev/opentelemetry/how-to-instrument.md#integration), but Spryker also offers expert services to assist with this setup. If you require professional support, please contact your sales representative for further assistance.


{% info_block infoBox %}
This solution only supports the **OpenTelemetry Collector** for telemetry ingestion. **Proprietary vendor agents (e.g., Dynatrace, DataDog, or New Relic agents) are not supported**. Instead, these platforms ingest telemetry streamed through the OpenTelemetry Collector, ensuring flexibility, interoperability, and vendor neutrality while adhering to industry-standard observability practices. As a consequence of the OpenTelemetry activation, any previously installed proprietary agent will be removed.
{% endinfo_block %}


## Additional information
For more information, check out our [Spryker Service Description](https://spryker.com/ssd/).
