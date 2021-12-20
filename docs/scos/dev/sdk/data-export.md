---
title: Data export
description: The data export feature allows you to export orders from a Spryker shop to an external system.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/data-export
originalArticleId: 407e3f09-8906-4ab2-b043-40371cee5328
redirect_from:
  - /2021080/docs/data-export
  - /2021080/docs/en/data-export
  - /docs/data-export
  - /docs/en/data-export
  - /v6/docs/data-export
  - /v6/docs/en/data-export
  - /v5/docs/data-export
  - /v5/docs/en/data-export
  - /docs/scos/dev/sdk/201811.0/data-export.html
  - /docs/scos/dev/sdk/201903.0/data-export.html
  - /docs/scos/dev/sdk/201907.0/data-export.html
  - /docs/scos/dev/sdk/202001.0/data-export.html
  - /docs/scos/dev/sdk/202005.0/data-export.html
  - /docs/scos/dev/sdk/202009.0/data-export.html
  - /docs/scos/dev/sdk/202108.0/data-export.html
---

{% info_block warningBox "BETA version" %}

The Data Export is currently a BETA feature.

{% endinfo_block %}
Export data on orders, generated in Spryker, to external systems like ERP or OMS using the Spryker Data Export feature. The current functionality allows you to export orders, order items, and order expenses data for one or multiple stores. At the same time, you don’t need to export all the data - you can define a filter to run export for specific stores and time period of orders in a .yml export configuration file.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/SDK/Data+Export/data-export.png)

**What's next?**

* To install the Sales Data Export feature, see [Sales Data Export Feature Integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/sales-data-export-feature-integration.html).
* To learn how you can export order informaton, see [Exporting Data](/docs/scos/dev/data-export/{{site.version}}/data-export.html).
* For the examles of the exported files and details on their format, see [Data Export Orders .csv Files Format](/docs/scos/dev/data-export/{{site.version}}/data-export-orders-.csv-files-format.html).
