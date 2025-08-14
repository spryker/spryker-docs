---
title: "Glue API: Retrieve merchant opening hours"
description: Learn how to retrieve merchant opening hours in your Spryker marketplace project via the Spryker Glue API
template: glue-api-storefront-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/dev/glue-api-guides/202311.0/merchants/retrieving-merchant-opening-hours.html
  - /docs/pbc/all/merchant-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-merchant-opening-hours.html
related:
  - title: Retrieving merchants
    link: docs/pbc/all/merchant-management/page.version/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html
  - title: Retrieving merchant addresses
    link: docs/pbc/all/merchant-management/page.version/marketplace/manage-using-glue-api/glue-api-retrieve-merchant-addresses.html
---

This document describes how to retrieve merchant opening hours.

## Retrieve merchant opening hours

To retrieve a merchant opening hours, send the request:

***
`GET` {% raw %}**/merchants/*{{merchantId}}*/merchant-opening-hours**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{merchantId}}***{% endraw %} | Unique identifier of a merchant to retrieve the addresses of. To get it, [retrieve all merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html#retrieve-merchants). |

{% info_block warningBox "Note" %}

This endpoint returns only [active](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html#merchant-statuses) merchants. You can activate merchants in the Back Office.

{% endinfo_block %}


### Request

Request sample: retrieve merchant opening hours

`GET https://glue.mysprykershop.com/merchants/MER000001/merchant-opening-hours`

### Response

<details><summary>Response sample: retrieve merchant opening hours</summary>

```json
{
    "data": [
        {
            "type": "merchant-opening-hours",
            "id": "MER000001",
            "attributes": {
                "weekdaySchedule": [
                    {
                        "day": "MONDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "13:00:00.000000"
                    },
                    {
                        "day": "MONDAY",
                        "timeFrom": "14:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "TUESDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "WEDNESDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "THURSDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "FRIDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "SATURDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "SUNDAY",
                        "timeFrom": null,
                        "timeTo": null
                    }
                ],
                "dateSchedule": [
                    {
                        "date": "2020-01-01",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "New Year's Day"
                    },
                    {
                        "date": "2020-04-10",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Good Friday"
                    },
                    {
                        "date": "2020-04-12",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Easter Sunday"
                    },
                    {
                        "date": "2020-04-13",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Easter Monday"
                    },
                    {
                        "date": "2020-05-01",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "May Day"
                    },
                    {
                        "date": "2020-05-21",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Ascension of Christ"
                    },
                    {
                        "date": "2020-05-31",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Whit Sunday"
                    },
                    {
                        "date": "2020-06-01",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Whit Monday"
                    },
                    {
                        "date": "2020-06-11",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Corpus Christi"
                    },
                    {
                        "date": "2020-11-01",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "All Saints' Day"
                    },
                    {
                        "date": "2020-12-25",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "1st Christmas day"
                    },
                    {
                        "date": "2020-12-26",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "2nd Christmas day"
                    },
                    {
                        "date": "2021-11-28",
                        "timeFrom": "13:00:00.000000",
                        "timeTo": "18:00:00.000000",
                        "note": "Sunday Opening"
                    },
                    {
                        "date": "2021-12-31",
                        "timeFrom": "10:00:00.000000",
                        "timeTo": "17:00:00.000000",
                        "note": ""
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001/merchant-opening-hours"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/merchants/MER000001/merchant-opening-hours"
    }
}
```

</details>

<a name="merchant-opening-hours-response-attributes"></a>

| ATTRIBUTE | DESCRIPTION |
| --------------- | --------------------- |
| weekdaySchedule | Array of the schedule for weekdays. |
| weekdaySchedule.day | Name of the day. |
| weekdaySchedule.timeFrom | Time when the merchant starts working on a usual day. |
| weekdaySchedule.timeTo | Time when the merchant stops working on a usual day. |
| dateSchedule | Array of the schedule for special working days, like holidays. |
| dateSchedule.date | Date of the special opening hours. |
| dateSchedule.timeFrom | Time when the merchant starts working during the special working hours. |
| dateSchedule.timeTo | Time when the merchant stops working during the special working hours. |
| dateSchedule.note | Description of the special opening hours. |

## Possible errors

For statuses, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
