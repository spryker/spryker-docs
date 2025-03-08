---
title: Spryker Monitoring Integration
description:
last_updated: Feb 25, 2025
template: howto-guide-template
---

The Spryker Monitoring Integration provides advanced monitoring for applications and systems. Leveraging [OpenTelemetry](https://opentelemetry.io/), this solution enables seamless connectivity and forwarding of telemetry data, including traces and health status metrics, to OpenTelemetry-compatible monitoring platforms. This integration facilitates near real-time tracking of application performance and monitoring of system health status.

## OpenTelemetry
OpenTelemetry (OTel) is an open-source framework that provides APIs, libraries, and agents for collecting traces and metrics across various applications. It standardizes the instrumentation of software to help developers monitor and improve application performance effectively. OTel enables a seamless and vendor-agnostic monitoring experience, empowering to integrate Spryker with APM solutions while adhering to industry best practices for collecting and analyzing performance data.

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

To request the Spryker Monitoring Integration, on [Support Portal](https://support.spryker.com/), create a Change Request with the following details:
  - Endpoint: The endpoint URL of your APM tool.
  - Token: An API token to configure the connection and communication of Spryker with the APM tool.

We'll guide you through the setup process once you submit the request.

### Instrumenting your application
To send telemetry data to an APM tool, you need to instrument the application using OTel. For information on instrumenting your application, see
[OpenTelemetry instrumentation](/docs/ca/dev/monitoring/opentelemetry-instrumentation.html).

We're also providing expert services for instrumentation setups. If you need help with instrumentation, contact your sales representative.


## OpenTelemetry Collector

This solution supports data ingestion only through the OpenTelemetry Collector. Proprietary vendor agents, such as Dynatrace, DataDog, or New Relic agents, are not supported. These platforms are still supported but have to ingest data through the collector. Once OTel is activeted, any proprietary agents are removed.


## Additional information

For more information, check out our [Spryker Service Description](https://spryker.com/ssd/).
