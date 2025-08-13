---
title: Reference information - GlueApplication errors
description: Find out what common GlueAplication errors you can come across when sending and receiving data via the Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/reference-information-glueapplication-errors
originalArticleId: f6139bab-d9f0-4394-8cab-40665a1866d8
redirect_from:
  - /docs/scos/dev/glue-api-guides/202404.0/old-glue-infrastructure/reference-information-glueapplication-errors.html
  - /docs/scos/dev/glue-api-guides/202200.0/reference-information-glueapplication-errors.html
  - /docs/scos/dev/glue-api-guides/202404.0/reference-information-glueapplication-errors.html
  - /docs/scos/dev/glue-api-guides/202204.0/reference-information-glueapplication-errors.html
  - /docs/dg/dev/glue-api/202410.0/old-glue-infrastructure/reference-information-glueapplication-errors
related:
  - title: Glue REST API
    link: docs/dg/dev/glue-api/latest/rest-api/glue-rest-api.html
---

<!-- 2020307.0 is the last version to support this doc. Don't move it to the next versions -->

{% info_block warningBox %}

This is a document related to the Old Glue infrastructure. For the new one, see [Decoupled Glue API](/docs/dg/dev/glue-api/{{page.version}}/decoupled-glue-api.html)

{% endinfo_block %}

This page lists the generic errors that originate from the Glue Application. These errors can occur for any resource, and they are always the same for all the resources.

| ERROR | DESCRIPTION |
| --- | --- |
| 400 | Resource ID is not specified. |
| 404 | Wrong request URL, type, or method. |
| 429 | Too many unsuccessful login attempts. |
