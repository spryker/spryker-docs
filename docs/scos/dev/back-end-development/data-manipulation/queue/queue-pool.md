---
title: Queue Pool
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/queue-pool
originalArticleId: 44879d08-bebd-4028-80ff-13404057aaef
redirect_from:
  - /2021080/docs/queue-pool
  - /2021080/docs/en/queue-pool
  - /docs/queue-pool
  - /docs/en/queue-pool
  - /v6/docs/queue-pool
  - /v6/docs/en/queue-pool
  - /v5/docs/queue-pool
  - /v5/docs/en/queue-pool
  - /v4/docs/queue-pool
  - /v4/docs/en/queue-pool
  - /v3/docs/queue-pool
  - /v3/docs/en/queue-pool
  - /v2/docs/queue-pool
  - /v2/docs/en/queue-pool
  - /v1/docs/queue-pool
  - /v1/docs/en/queue-pool
---

Queue pool is designed to allow P&S ([Publish and Synchronization](/docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronization.html)) messages to be sent to several queues.

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
## Sending Messages
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

<!--Last review date: Apr 25, 2019 by by Ehsan Zanjani, Andrii Tserkovnyi-->
