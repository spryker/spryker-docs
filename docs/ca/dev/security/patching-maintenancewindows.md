---
title: Patching and maintenance windows
description: Patching of cloud assets and the maintenance windows.
template: howto-guide-template
last_updated: Feb 18, 2026
---

This document answers the main questions asked by the Spryker Customers with regards to ongoing patching and connected maintenance windows. 

## Will I receive a support ticket or case notification for each patching cycle?

No. Customers will not receive individual support tickets or cases in the support portal for each maintenance cycle. All maintenance will take place within the officially announced maintenance windows, as communicated in the customer newsletter and platform status updates.

## Can I request a custom maintenance window for my environment?

Unfortunately, no exceptions or custom maintenance windows can be supported. The patching process is fully automated and standardized across all environments to ensure consistency and reliability.
Maintenance takes place during off-peak hours, specifically 22:00–02:00 depending on the region your environment is deployed. See Spryker Service Description for details.

## When exactly will patching and restarts occur within the announced window?

The specific timeframe for each environment falls within the official maintenance window mentioned above. The process is automated and follows a fixed schedule; it cannot be adjusted or narrowed further.

## Will patching happen for all customers at once, or in batches?

Patching is conducted in batches by environment type to minimize risk and ensure stability:
	•	Step 1: Non-production environments
	•	Step 2: Production environments (after a one-week gap)
Custom batch assignment or scheduling within a batch is not possible.

## What downtime or service impact should I expect?

The patching primarily affects infrastructure services, and most core services will remain operational.
Only a few components may experience short downtime — for example, Jenkins and RabbitMQ, with interruptions typically lasting 5–10 minutes.
All maintenance actions are fully automated and will execute in the predefined sequence.

## Whom should I contact if I have concerns or notice issues after maintenance?

You can contact your Customer Success Manager or create a support case via the Spryker Support Portal if you experience issues outside the communicated maintenance windows.