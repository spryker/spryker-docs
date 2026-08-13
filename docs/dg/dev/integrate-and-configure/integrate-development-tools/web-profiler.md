---
title: WebProfiler
description: Learn why the Spryker WebProfiler is essential for performance work and how to integrate it in Yves, Glue, Zed, and the Backend Gateway.
last_updated: Aug 13, 2026
template: concept-topic-template
keywords: web profiler, webprofiler, performance, profiling, debugging, sql, n+1, symfony profiler
related:
  - title: Integrate Web Profiler Widget for Yves
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html
  - title: Integrate Web Profiler for Glue
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-glue.html
  - title: Integrate Web Profiler for Backend Gateway
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-backend-gateway.html
  - title: Integrate Web Profiler for Zed
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-zed.html
---

The *WebProfiler* records what every web request actually did: the SQL statements it ran, the Redis and Elasticsearch calls it made, the Yves-to-Zed calls it triggered, and the time and memory it consumed. Spryker collects this data automatically, so you can inspect a request after it completes.

The WebProfiler is based on the *Symfony Profiler*. For details, see [Profiler documentation](https://symfony.com/doc/current/profiler.html).

{% info_block warningBox "Development only" %}

Enable the WebProfiler in development environments only. Collecting and storing profiles on every request adds significant overhead and exposes internal request data.

{% endinfo_block %}

## Why you need the profiler

Performance problems in a Spryker project are rarely caused by slow PHP code. They are caused by a request doing too much I/O—usually more database queries than anyone expected. The profiler shows you that:

- **It replaces guessing with measurement.** A page that renders in two seconds tells you nothing about where the time went. The profiler tells you that it ran 261 SQL queries, 180 of which were duplicates.
- **It exposes N+1 queries.** A loop that loads one entity per iteration looks harmless in code and scales badly in production.
- **It checks the architecture boundary.** The Zed request count shows how many times a storefront request called into Zed. A single page issuing many calls indicates a design problem.
- **It gives you before-and-after evidence.** Query and call counts are stable between runs, so you can prove that an optimization worked.

{% info_block infoBox "Count the I/O, not the milliseconds" %}

Local wall time swings widely for identical work, and Xdebug inflates it several-fold. Query, Redis, Elasticsearch, and Zed request counts are stable and are what scales badly in production. Compare counts.

{% endinfo_block %}

## Integrate the profiler

Each application registers its own profiler and its own set of collectors, so you integrate them separately:

- [Web Profiler for Yves](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html)
- [Web Profiler for Glue](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-glue.html)
- [Web Profiler for Backend Gateway](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-backend-gateway.html)
- [Web Profiler for Zed](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-zed.html)

Because one user action spans several applications, a single click on the storefront produces several profiles. Profile the request that does the work, not only the one shown in the browser address bar. Yves has no SQL collector by design, so a storefront profile always reports no database data.

## Read profiles with AI

Reading stored profiles by hand means clicking through collector panels and repeating that for every request in a user action. The [AI Dev SDK Profiler Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-profiler-workflow.html) removes that work: the `spryker-profiler` skill reads the stored profiles directly, reduces them to the metrics that matter, and reconstructs the full request tree for a user action. It also diagnoses profiler setup when there is nothing to read.

## Related

- [Set up XDebug profiling](/docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/set-up-xdebug-profiling.html)—function-level profiling for code the WebProfiler cannot reach, such as console commands and queue workers
- [Development tools](/docs/dg/dev/development-tools.html)—the full Spryker development toolkit
