---
title: "HowTo: Change the default behavior of event triggering in the AvailabilityStorage module"
description: Learn how to change the default behavior of the event being triggered in the AvailabilityStorage module when the amount of product is changed.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
originalArticleId: b2cacf56-0d51-4a1d-832f-25c0a57fd0b2
redirect_from:
  - /2021080/docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /2021080/docs/en/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /docs/en/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v6/docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v6/docs/en/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v5/docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v5/docs/en/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v4/docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v4/docs/en/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v3/docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v3/docs/en/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v2/docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v2/docs/en/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v1/docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
  - /v1/docs/en/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module
---

By default, events are triggered when product status changes from `available` to `not available` and vice versa.
To change this behavior for the events to be triggered when the amount of product changes, follow these steps:

1. In `src/Pyz/Zed/Availability/Persistence/Propel/Schema/spy_availability.schema.xml`, remove `value="0"` and `operator="==="` from the line `<parameter name="spy_availability_abstract_quantity" column="quantity" value="0" operator="==="/>`:

```xml
<table name="spy_availability_abstract">
        <behavior name="event>
            <parameter name="spy_availability_abstract_quantity" column="quantity"/>
       </behavior>
</table>
```

2. Run the commands:

```bash
console propel:schema:copy
console propel:model:build
```
