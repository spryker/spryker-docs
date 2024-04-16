---
title: Queue pool
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/queue-pool
originalArticleId: 44879d08-bebd-4028-80ff-13404057aaef
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/queue/queue-pool.html
related:
  - title: Queue
    link: docs/scos/dev/back-end-development/data-manipulation/queue/queue.html
---

Queue pool is designed to allow P&S ([Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html)) messages to be sent to several queues.

## Configuration

Queue pools are defined with unique names in `config/Shared/stores.php`

```php
<?php
...
    'currencyIsoCodes' => ['EUR', 'CHF'],
    'queuePools' => [
        'synchronizationPool' => [
            'AT-connection',
            'DE-connection',
        ],
        'fooPool' => [
            'DE-connection',
            'US-connection',
        ]
    ],
    'storesWithSharedPersistence' => ['AT'],
];
...
```

## Sending messages

Messages must be prepared for sending to queue pools. You can do it by setting the `QueuePool` property for the `QueueSendMessageTransfer`.

```php
<?php
...
$queueSendTransfer = new QueueSendMessageTransfer();
    $queueSendTransfer->setQueuePoolName('fooPool');

    $queueClient->sendMessage('mail', $queueSendTransfer);
...
```

In this example, the message is configured to be sent to mail queue in DE and US store queues.
