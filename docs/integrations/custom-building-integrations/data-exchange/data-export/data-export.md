---
title: Data export
description: Learn how to configure and extend Spryker's data export functionality for reporting, analytics, and system integration.
last_updated: July 9, 2025
template: default
---

Some projects require data export for internal reporting, analytics, or integration with other systems. Spryker includes a default order export feature, which you can extend to support other entities.

Example workflow:

1. Enable the order export functionality in your project.
2. Set up a Jenkins job to run the export process at regular intervals.
3. Extend the existing export command or create a custom one to send the exported data to its destination.

For installation and configuration, see the following docs:

- [How to install](/docs/integrations/custom-building-integrations/data-exchange/data-export/install-the-sales-data-export-feature.html)
- [Order usage example](/docs/integrations/custom-building-integrations/data-exchange/data-export/orders-data-export.html)  


