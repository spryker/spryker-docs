# Overview

As part of Spryker's introduced Open Telemetry (OTEL) initiative, we offer Spryker's Metrics Integration (SMI), a set of service health metrics generated for our customers. These metrics provide a high-level view into the health status of enabled services. The level of detail is as follows:

## Metrics Without Dimensions

The following metrics return a gauge with a binary value: 1 (Green) or 0 (Red). They are composites of multiple service-related signals that, after transformations and calculations, yield a single value indicating the service's health.

- **hc_jenkins**: Reports 0 or 1 for the overall health of the Jenkins Service.
- **hc_rabbitmq**: Reports 0 or 1 for RabbitMQ health.

## Metrics with Dimensions

These metrics can be split by the following dimensions/labels*:

- **hc_rabbitmq_message_count_sum**: A count of RabbitMQ messages [dimension_queue, dimension_virtualhost].
- **hc_jenkins_builds_success_build_count_total.count**: A count of successful Jenkins jobs [jenkins_job].
- **hc_jenkins_builds_failed_build_count_total.count**: A count of failed Jenkins jobs [jenkins_job].
- **hc_tasks_cpu_average**: CPU utilization in % for cluster tasks [dimension_clustername, dimension_servicename].
- **hc_tasks_memory_utilization**: Memory utilization in % for cluster tasks [dimension_clustername, dimension_servicename].

## Metric Details

The default metrics resolution is 60 seconds. All metrics can be split by telemetry-data-account.

## Terminology
In this document, Labels/Dimensions/Attributes in relation to metrics are used interchangeably. The terminology depends on the customer's solution choice.
For example, in Grafana, we would use the term labels, while in Dynatrace, we use dimensions, etc.
