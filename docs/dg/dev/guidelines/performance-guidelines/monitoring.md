---
title: Monitoring
description: This guideline explains the importance of effective monitoring for production e-commerce applications and how to properly configure APM tools.
last_updated: Feb 26, 2026
template: concept-topic-template
---

**First things first.** Effective monitoring is required for a production e-commerce application to stay healthy and react on potential issues fast. The Spryker Cloud team does environment monitoring and adjustments as necessary (for PROD environments). But application monitoring is the responsibility of a partner or customer.

## Ensure the APM tool is active

It can be NewRelic or OpenTelemetry with any supported backend (for example Grafana, DataDog, etc).

### OpenTelemetry

For OpenTelemetry integration, see [OpenTelemetry - Spryker Monitoring Integration](/docs/ca/dev/monitoring/spryker-monitoring-integration/spryker-monitoring-integration.html).

### NewRelic

For NewRelic configuration:
- [Configure services](/docs/dg/dev/integrate-and-configure/configure-services#new-relic)
- [Deploy file inheritance: common use cases - Enabling NewRelic](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-inheritance-common-use-cases#enabling-new-relic)
- [Troubleshooting Performance Issues](/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/troubleshooting-performance-issues)

#### NewRelic instrumentation for Backend-Gateway

Starting from `spryker/monitoring` version 2.10.0, the Backend-Gateway transaction naming is handled by the core module out of the box through `GatewayMonitoringRequestTransactionEventDispatcherPlugin`. This plugin splits the single `index.php` transaction into individual transactions based on route names, providing better visibility into Backend-Gateway performance in NewRelic.

To enable it, register `\Spryker\Zed\Monitoring\Communication\Plugin\EventDispatcher\GatewayMonitoringRequestTransactionEventDispatcherPlugin` in `\Pyz\Zed\EventDispatcher\EventDispatcherDependencyProvider::getBackendGatewayEventDispatcherPlugins()`.

## APM is properly configured

Traces/transactions are grouped by application (Yves, Zed, Glue, etc) and by URL or command name (for example `/place-order` or `oms:check-conditions`, etc). Spryker OpenTelemetry APM has it OOTB, NewRelic has to be configured on a project level.

For NewRelic transactions grouping, see [New Relic transactions grouping by queue names](/docs/dg/dev/guidelines/performance-guidelines/elastic-computing/new-relic-transaction-grouping-by-queue-names).

## APM-based troubleshooting

For a step-by-step guide on using New Relic APM to troubleshoot performance issues in Spryker applications, see [APM — New Relic based troubleshooting](/docs/dg/dev/guidelines/performance-guidelines/apm-newrelic-based-troubleshooting.html).

## APM access

The development team has a NewRelic "Full User" account and is able to access APM metrics for a project.
