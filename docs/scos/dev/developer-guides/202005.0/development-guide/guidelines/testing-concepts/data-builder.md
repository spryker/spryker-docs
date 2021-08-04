---
title: Data builder
originalLink: https://documentation.spryker.com/v5/docs/data-builder
redirect_from:
  - /v5/docs/data-builder
  - /v5/docs/en/data-builder
---

## Data builder
Data builder help  you to create transfer objects for your tests. Instead of preparing transfers each time you need them databuilder take to work ffrom you. Data builder make use of the [Faker library](https://github.com/fzaninotto/Faker).

Data builder need to be configured only once and then they are ready to use. The configuration is done within a `module.databuilder.xml` that has to be placed into the `_data` directcory.

Here is an example for a databuilder configuration:
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
In your test you will use the databuilder with:
```
$customerTransfer = (new CustomerBuilder())->build();
```
With this you get a CustomerTransfer that is filled by the [Faker library](https://github.com/fzaninotto/Faker) with the defined dataBuilderRule(s). When passing the optional `$seedData` to the constructor the values you pass will be used instead.
