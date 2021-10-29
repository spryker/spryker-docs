---
title: Using a Query Container
description: The query container of the current unterminated query is available via $this->getQueryContainer() in the factory of the communication and the business layer and can be injected into any model.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/using-a-query-container
originalArticleId: e5763c41-e709-4734-b47b-d1123cf4255a
redirect_from:
  - /2021080/docs/using-a-query-container
  - /2021080/docs/en/using-a-query-container
  - /docs/using-a-query-container
  - /docs/en/using-a-query-container
  - /v6/docs/using-a-query-container
  - /v6/docs/en/using-a-query-container
  - /v5/docs/using-a-query-container
  - /v5/docs/en/using-a-query-container
  - /v4/docs/using-a-query-container
  - /v4/docs/en/using-a-query-container
  - /v3/docs/using-a-query-container
  - /v3/docs/en/using-a-query-container
  - /v2/docs/using-a-query-container
  - /v2/docs/en/using-a-query-container
  - /v1/docs/using-a-query-container
  - /v1/docs/en/using-a-query-container
---

The query container of the current unterminated query is available via `$this->getQueryContainer()` in the [factory](/docs/scos/dev/back-end-development/factory/factory.html) of the communication and the business layer and can be injected into any model.

![Query container via factory](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Zed/Persistence+Layer/Query+Container/query-container-via-factory.png)

### Executing the Query

You can adjust the query itself, but you should avoid adding more filters or joins because this is a responsibility of the query container only.

```php
<?php
$templateQuery = $this->queryTemplateByPath($path);
$templateQuery->limit(100);
$templateQuery->offset(10);
$templateCollection = $templateQuery->find(); // or findOne()
```

You can also change the output format, e.g. to array instead of collection:

```php
<?php
$formatter = new SimpleArrayFormatter();
$templateQuery->setFormatter($formatter);
```
