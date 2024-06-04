---
title: Configure application context timezone
description: This guide shows how to configure timezone for store application
last_updated: Jun 5, 2024
template: howto-guide-template
---

This document describes how to create and configure store context application settings. 

## Create and configure application timezone in database

To setup timezone for each application in store need add configuration in `spy_store_context` table. 

The table contains the configuration of  and has the following columns:

| COLUMN | SPECIFICATION |
| --- | --- |
| id_store_context | ID of the store context configuration. |
| application_context_collection | A JSON-formatted string containing the configuration for each application in the store. |
| fk_store | Foreign key of the store ID.  |

The following example shows a possible value of the `spy_store_context.application_context_collection` field configured for the some store with default timezone `Europe/Berlin` and different timezone for `zed` and `yves` applications. 


```json
[
    {
        "application" : null, 
        "timezone" : "Europe/Berlin"
    },
    {
        "application" : "zed", 
        "timezone" : "Europe/Berlin"
    },
    {
        "application" : "yves", 
        "timezone" : "Europe/Austria"
    }
]
```

| FIELD | DESCRIPTION |
| --- | --- |
| application | Application name.  |
| timezone | Timezone for the application. | 


`application` field can be `null` for default store timezone.
Supported timezone values can be found [here](https://www.php.net/manual/en/timezones.php).


## Setup and configure the store settings in the Back Office

1. In the Back Office, go to **Administration**.
2. On the **Stores** page choice store and click **Edit store**.
3. In the **Edit store** page, go to the **Settings** tab.
4. In the **Settings** tab, find the **Timezone** field and select the timezone for the store application.

![configure-application-timezone](/images/dynamic-multistore/screen1.png)

Each store must be have one default timezone and can have different timezone for each application.

![configure-application-timezone-applications](/images/dynamic-multistore/screen2.png)

Select the timezone for each application in the store if need or set the default timezone for all applications.

5. Click **Save** to save the changes.
