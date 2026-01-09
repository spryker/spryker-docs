---
title: Using Jenkins for third-party integrations
description: Learn how to use Jenkins for automating data exchange tasks in Spryker,
  including importing, exporting, and triggering scheduled operations with third-party
  systems.
last_updated: July 9, 2025
template: default

---

Spryker uses Jenkins primarily for running scheduled or event-based console commands that handle data exchange tasks. This is especially useful for batch operations, such as importing or exporting data between Spryker and third-party systems, such as ERP, PIM, or CRM.

## Common use cases

- Importing data from an external source: CSV, S3, APIs.
- Exporting orders or stock levels to ERP or logistics systems.
- Triggering custom business logic on a schedule–for example, nightly cleanup, status updates.

## Configure Jenkins

1. Create a custom console command in your Spryker project: `vendor/bin/console your:custom:command`
2. Configure Jenkins to run this command via CLI:
    `vendor/bin/console your:custom:command`
3. Schedule jobs using Jenkins' built-in cron-style scheduler or trigger them based on specific events or external webhooks.
4. Monitor logs and statuses via the Jenkins UI, or configure alerts for failures.



