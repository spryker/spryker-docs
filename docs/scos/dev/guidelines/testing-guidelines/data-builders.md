---
title: Data Builders
description: Learn how to configure data builders for creating transfer objects for your tests.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/data-builders
originalArticleId: 3737769e-2b8e-4756-857f-343009e09251
redirect_from:
  - /2021080/docs/data-builders
  - /2021080/docs/en/data-builders
  - /docs/data-builders
  - /docs/en/data-builders
  - /v6/docs/data-builders
  - /v6/docs/en/data-builders
  - /v5/docs/data-builder
  - /v5/docs/en/data-builders
  - /docs/scos/dev/guidelines/testing/data-builders.html
---

Data builders help you create transfer objects for your tests. Instead of preparing transfers each time you need them, data builders do the work for you. Data builders use the [Faker library](https://github.com/fzaninotto/Faker).

Data builders need to be configured only once, and then they are ready to use. The configuration is done within a `module.databuilder.xml` file that has to be placed into the `_data` directory.

Here is an example for a data builder configuration:
```
<?xml version="1.0"?>
<transfers
    xmlns="spryker:databuilder-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:databuilder-01 http://static.spryker.com/databuilder-01.xsd"
>

    <transfer name="Customer">
        <property name="firstName" dataBuilderRule="firstName"/>
    </transfer>

</transfers>
```
In your test, you will use the data builder with:
```
$customerTransfer = (new CustomerBuilder())->build();
```
With this code, you get CustomerTransfer that is filled by the [Faker library](https://github.com/fzaninotto/Faker) with the defined dataBuilderRule(s). When passing the optional `$seedData` to the constructor, the values you pass will be used instead.
