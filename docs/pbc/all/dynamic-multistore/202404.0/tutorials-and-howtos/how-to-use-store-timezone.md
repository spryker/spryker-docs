---
title: How to use store context timezone in Yves.
description: This guide shows how to use store context timezone in yves
last_updated: Jun 5, 2024
template: howto-guide-template
---

## Prerequisites

* [Configure application context timezone](/docs/pbc/all/dynamic-multistore/{{page.version}}/tutorials-and-howtos/how-to-configure-application-timezone.html)


## How to Use Store Context Timezone

To use the store context timezone in Yves, you can follow these steps:

1. Retrieve the store timezone using the `StoreTransfer`:
Timezone is stored in the `StoreTransfer` object. You can retrieve the store timezone using the following code or something similar: 

    ```php
    $storeTransfer = $this->getFactory()->getStoreClient()->getCurrentStore();
    $storeTimezone = $storeTransfer->getTimezone();
    ```
`StoreTransfer` will contain also store context collection property `StoreTransfer.applicationContextCollection` which contains the timezone for each application in the store.

2. Use the store timezone in your code as needed. For example, you can format a date using the store timezone:

    ```php
    $dateTime = new DateTime();
    $dateTime->setTimezone(new DateTimeZone($storeTimezone));
    $formattedDate = $dateTime->format('Y-m-d H:i:s');
    ```

    In this example, `$formattedDate` will contain the current date and time in the store's timezone.

That's it! You have successfully used the store context timezone in Yves.

## How to Use store application contexts in Yves

To use the store application context in Yves, you can follow these steps:

1. Retrieve the store application context using the `StoreTransfer`:

    The store application context is stored in the `StoreTransfer` object. You can retrieve the store application context using the following code:

    ```php
    $storeTransfer = $this->getFactory()->getStoreClient()->getCurrentStore();
    $storeApplication = $storeTransfer->getApplication();
    ```