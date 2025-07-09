---
title: Spryker Data Export
description: Learn how to configure and extend Spryker's data export functionality for reporting, analytics, and system integration.
last_updated: July 9, 2025
layout: custom_new
---

Some projects require data export for internal reporting, analytics, or integration with other systems. Spryker includes a default order export feature, which you can extend to support other entities.

Example workflow:

1. Enable the order export functionality in your project.
2. Set up a Jenkins job to run the export process at regular intervals.
3. Extend the existing export command or create a custom one to send the exported data to its destination.

For installation and configuration, refer to:

<a class="fl_cont" href="/docs/integrations/custom_building_integrations/data_exchange/data_export/install_the_sales_data_export_feature.html">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text">How to Install</div>
</a>

<a class="fl_cont" href="/docs/integrations/custom_building_integrations/data_exchange/data_export/orders_data_export.html">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text">Order Usage Example</div>
</a>

