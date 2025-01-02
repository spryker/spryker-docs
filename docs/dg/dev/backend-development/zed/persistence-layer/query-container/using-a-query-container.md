---
title: Using a query container
description: The query container of the current unterminated query is available via $this->getQueryContainer() in the factory of the communication and the Business layer and can be injected into any model.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/using-a-query-container
originalArticleId: e5763c41-e709-4734-b47b-d1123cf4255a
redirect_from:
  - /docs/scos/dev/back-end-development/zed/persistence-layer/query-container/using-a-query-container.html
related:
  - title: About the query container
    link: docs/dg/dev/backend-development/zed/persistence-layer/query-container/query-container.html
  - title: Implement a query container
    link: docs/dg/dev/backend-development/zed/persistence-layer/query-container/implement-a-query-container.html
---

{% info_block infoBox "When to use query containers" %}

Don't use query containers to cross-module boundaries, as this increases module coupling. However, you can use them behind [Repository](/docs/dg/dev/backend-development/zed/persistence-layer/repository.html) and [Entity Manager](/docs/dg/dev/backend-development/zed/persistence-layer/entity-manager.html) as query aggregations.
Previously, query containers were used to cross-module borders (using dependency providers), which led to higher module coupling and leaking of the `Persistence` layer from one domain object to another, and therefore, to higher maintenance efforts and lower code reusability. This approach is deprecated, so we don't recommend using query containers like this in your project development.

{% endinfo_block %}

The query container of the current unterminated query is available via `$this->getQueryContainer()` in the [factory](/docs/dg/dev/backend-development/factory/factory.html) of the `Communication` and `Business` layers and can be injected into any model.

![Query container via factory](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Zed/Persistence+Layer/Query+Container/query-container-via-factory.png)

### Executing the query

You can adjust the query itself, but avoid adding more filters or joins because this is the responsibility of the query container only.

```php
<?php
$templateQuery = $this->queryTemplateByPath($path);
$templateQuery->limit(100);
$templateQuery->offset(10);
$templateCollection = $templateQuery->find(); // or findOne()
```

You can also change the output format—for example, to array instead of collection:

```php
<?php
$formatter = new SimpleArrayFormatter();
$templateQuery->setFormatter($formatter);
```
