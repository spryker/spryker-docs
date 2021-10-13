---
title: Data Export
description: The data export feature allows you to export orders from a Spryker shop to an external system.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/data-export
originalArticleId: 957e00dc-8861-4f29-847c-de1e89b31656
redirect_from:
  - /v5/docs/data-export
  - /v5/docs/en/data-export
---

{% info_block warningBox "BETA version" %}

The Data Export is currently a BETA feature.

{% endinfo_block %}
Export data on orders, generated in Spryker, to external systems like ERP or OMS using the Spryker Data Export feature. The current functionality allows you to export orders, order items, and order expenses data for one or multiple stores. At the same time, you don’t need to export all the data - you can define a filter to run export for specific stores and time period of orders in a .yml export configuration file.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/SDK/Data+Export/data-export.png)

**What's next?**

* To install the Sales Data Export feature, see [Sales Data Export Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/sales-data-export-feature-integration.html).
* To learn how you can export order informaton, see [Exporting Data](/docs/scos/dev/data-export/{{page.version}}/exporting-data.html).
* For the examles of the exported files and details on their format, see [Data Export Orders .csv Files Format](/docs/scos/dev/data-export/{{page.version}}/data-export-orders-.csv-files-format.html).
