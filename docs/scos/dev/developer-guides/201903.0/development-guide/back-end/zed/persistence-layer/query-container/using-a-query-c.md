---
title: Using a Query Container
originalLink: https://documentation.spryker.com/v2/docs/using-a-query-container
redirect_from:
  - /v2/docs/using-a-query-container
  - /v2/docs/en/using-a-query-container
---

The query container of the current unterminated query is available via `$this->getQueryContainer()` in the [factory](https://documentation.spryker.com/resources_and_developer_tools/factory.htm) of the communication and the business layer and can be injected into any model.

![Query container via factory](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Zed/Persistence+Layer/Query+Container/query-container-via-factory.png){height="" width=""}

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
