---
title: Receive ACP Messages
description: Receive and manage Spryker ACP messages efficiently with this guide, covering integration details and message processing for optimized communication.
template: howto-guide-template
last_updated: Jan 09, 2024
redirect_from:
- /docs/acp/user/receive-acp-messages.html
---

Your Spryker project can receive ACP messages using the following commands:

Receive messages from all the channels:
```bash
console message-broker:consume
```

Receive messages from a specific channel:

```bash
console message-broker:consume {channel-name} # {channel-name} is the name of the channel, like `asset-commands`.
```


## Receiving messages automatically

The preceding command must be executed periodically. To set up a periodic execution, configure Jenkins in `config/Zed/cronjobs/jenkins.php`:

```php
$jobs[] = [
    'name' => 'message-broker-consume-channels',
    'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=15 --sleep=5',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```
