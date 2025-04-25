---
title: Debug listeners
description: Learn how to debug listeners in Spryker to ensure smooth data publishing. Follow best practices for troubleshooting backend events and improving performance.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-debug-listeners
originalArticleId: 283a1100-8a5f-4c6d-8cdd-a8a093aea5a6
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/debug-listeners.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/debugging-listeners.html
related:
  - title: Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronization.html
  - title: Implement Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html
  - title: Handle data with Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html
  - title: Adding publish events
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/add-publish-events.html
  - title: Implement event trigger publisher plugins
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-event-trigger-publisher-plugins.html
  - title: Implement synchronization plugins
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-synchronization-plugins.html
  - title: Publish and synchronize and multi-store shop systems
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-and-multi-store-shop-systems.html
  - title: Publish and Synchronize repeated export
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
  - title: Synchronization behavior - enabling multiple mappings
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/synchronization-behavior-enabling-multiple-mappings.html
---


The document provides information on the `event:trigger:listener` command. The command debugs an event message with a specific listener mapped to it.

Upon triggering the publish process, an event or events are posted to the event queue. Each event message posted to the queue contains the following information about the event that triggered it: event name, ID, names of the corresponding listeners and transfer classes, list of modified columns, as well as foreign keys necessary to backtrack the updated Propel entities. However, it does not contain the actual data that has changed, making it hard to debug the issue when the transformed data is not stored in the specific storage table. In this case, you need to debug the event message with a specific event listener mapped to it using the `event:trigger:listener` command.

## How to use the command
To debug an event message with a specific listener mapped to it, use the `vendor/bin/console event:trigger:listener` command with the following parameters:

| PARAMETER NAME | TRANSCRIPTION |
| --- | --- |
| `Event listener name` | Defines the listener name. |
| `Data` | Data for filling up the event and entity transfer—for example, `id=1`. |
| `Input format` |Defines the input format. The default format is `querystring`. |
| `Event name` | Defines the event name to be triggered. |

### Usage examples

```bash
// Triggers ProductAbstractStoragePublishListener for the product abstract with ID equal to 1.
vendor/bin/console event:trigger:listener 'Spryker\\Zed\\ProductStorage\\Communication\\Plugin\\Event\\Listener\\ProductAbstractStoragePublishListener' id=1

// Triggers ProductAbstractStoragePublishListener for the product abstract with {additional data} and ID equal to 1.
vendor/bin/console event:trigger:listener 'Spryker\\Zed\\ProductStorage\\Communication\\Plugin\\Event\\Listener\\ProductAbstractStoragePublishListener' id=1{additional data}

// Triggers ProductAbstractStoragePublishListener for the product abstract with ID equal to 1. The output is in JSON.
vendor/bin/console event:trigger:listener 'Spryker\\Zed\\ProductStorage\\Communication\\Plugin\\Event\\Listener\\ProductAbstractStoragePublishListener' {\"id\":1} -f json

// Triggers ProductAbstractStoragePublishListener for the product abstract with the  PRODUCT_ABSTRACT_PUBLISH event name and ID equal to 1. The output is in JSON.
vendor/bin/console event:trigger:listener 'Spryker\\Zed\\ProductStorage\\Communication\\Plugin\\Event\\Listener\\ProductAbstractStoragePublishListener' {\"id\":1} -f json -e PRODUCT_ABSTRACT_PUBLISH
```

<!-- Last review date: Mar 9, 2019 -by Oleksandr Myrnyi, Andrii Tserkovnyi-->
