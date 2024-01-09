---
title: Receiving ACP Messages 
description: Find out how you can receive ACP messages in SCCOS.
template: howto-guide-template
last_updated: Jan 09, 2024
---

This document describes how to receive ACP messages in SCCOS.

Receive messages from all channels:
```bash
console message-broker:consume
```

Receive messages from the specific channel:
```bash
console message-broker:consume {channel-name} # {channel-name} is the name of the channel, like `asset-commands`.
```

This command must be executed periodically. To achieve this, configure Jenkins in `config/Zed/cronjobs/jenkins.php`:

```php
$jobs[] = [
    'name' => 'message-broker-consume-channels',
    'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=15 --sleep=5',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```
