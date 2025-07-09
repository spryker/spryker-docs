---
title: Using Jenkins for Third Party Integrations
description: API documentation for dynamic-entity-availability-abstracts.
last_updated: Mar 21, 2025
layout: custom_new
---

## Using Jenkins for Data Exchange in Spryker

Spryker uses Jenkins primarily for running scheduled or event-based console commands that handle data exchange tasks. This is especially useful for batch operations, such as importing or exporting data between Spryker and third-party systems (e.g., ERP, PIM, CRM, etc.).

### Common Use Cases

- Importing data from an external source (CSV, S3, APIs).
- Exporting orders or stock levels to ERP or logistics systems.
- Triggering custom business logic on a schedule (e.g., nightly cleanup, status updates).

### How It Works

1. Create a custom console command in your Spryker project:
   `vendor/bin/console your:custom:command`
2. Configure Jenkins to run this command via CLI:
3. Schedule jobs using Jenkins’ built-in cron-style scheduler or trigger them based on specific events or external webhooks.
4. Monitor logs and statuses via the Jenkins UI, or configure alerts for failures.



