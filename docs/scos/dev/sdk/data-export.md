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
related:
  - title: Code Generator
    link: docs/scos/dev/sdk/code-generator.html
  - title: Cronjob scheduling
    link: docs/scos/dev/sdk/cronjob-scheduling.html
  - title: Data import
    link: docs/scos/dev/sdk/data-import.html
  - title: Development virtual machine, docker containers & console
    link: docs/scos/dev/sdk/development-virtual-machine-docker-containers-and-console.html
  - title: Twig and TwigExtension
    link: docs/scos/dev/sdk/twig-and-twigextension.html
---

Export data on orders, generated in Spryker, to external systems like ERP or OMS using the Spryker Data Export feature. The current functionality allows you to export orders, order items, and order expenses data for one or multiple stores. At the same time, you don’t need to export all the data - you can define a filter to run export for specific stores and time period of orders in a .yml export configuration file.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/SDK/Data+Export/data-export.png)

## Next steps

* To install the Sales Data Export feature, see [Sales Data Export Feature Integration](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-sales-data-export-feature.html).
* To learn how you can export order information, see [Exporting Data](/docs/scos/dev/data-import/{{site.version}}/data-export.html).
