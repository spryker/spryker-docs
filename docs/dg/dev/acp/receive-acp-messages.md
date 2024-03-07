---
title: Receive ACP Messages 
description: Find out how you can receive ACP messages in SCCOS.
template: howto-guide-template
last_updated: Jan 09, 2024
redirect_from:
- /docs/acp/user/receive-acp-messages.html
---

This document describes how to receive ACP messages in SCCOS.

To receive messages from all the channels, run the following command:
```bash
console message-broker:consume
```

To receive messages from a specific channel, run the following command:

```bash
console message-broker:consume {channel-name} # {channel-name} is the name of the channel, like `asset-commands`.
```

This command must be executed periodically. To set up this periodic execution, configure Jenkins in `config/Zed/cronjobs/jenkins.php`:

```php
$jobs[] = [
    'name' => 'message-broker-consume-channels',
    'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=15 --sleep=5',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```