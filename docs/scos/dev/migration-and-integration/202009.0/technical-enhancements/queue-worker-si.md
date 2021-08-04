---
title: Queue worker signal handling
originalLink: https://documentation.spryker.com/v6/docs/queue-worker-signal-handling
redirect_from:
  - /v6/docs/queue-worker-signal-handling
  - /v6/docs/en/queue-worker-signal-handling
---

Signal Handling is a configured behavior of an application invoked by receiving a signal. Signals are sent by an operating system to interact with the application. In PHP, there are [many signals](http://linux.die.net/man/7/signal), and just a couple of them are important. For example, the `SIGTERM` signal is a request that tells an application “I would really like you to shut down”. Most applications do terminate at such request, sometimes with issues. For example, sending the `SIGTERM` signal to an application while data is being processed may result into data inconsistency. That’s where signal handling can help. 

When an application is configured to treat a signal, it performs all the configured actions instead of performing the only action invoked by the signal. For example, you configure an application to finish all its processes before shutting down as instructed by the `SIGTERM` signal. It’s called a *graceful shutdown*.

To configure a graceful shutdown of queue worker, define the list of signals to be handled as follows:

```php
<?php

namespace Pyz\Zed\Queue;

...

class QueueConfig extends SprykerQueueConfig
{
    /**
     * Defines the list of signals that will be handled for the graceful worker shutdown.
     *
     * @return int[]
     */
    public function getSignalsForGracefulWorkerShutdown(): array
    {
        return [
            SIGTERM,
            SIGINT,
            SIGQUIT,
            SIGABRT,
        ];
    }
}
...
```

When queue worker receives one of the defined signals, it finishes all the items that are being processed, saves results, prepares for graceful shutdown, and stops all active processes.
