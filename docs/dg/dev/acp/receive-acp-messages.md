---
title: Receive ACP Messages
description: Receive and manage Spryker ACP messages efficiently with this guide, covering integration details and message processing for optimized communication.
template: howto-guide-template
last_updated: Jul 24, 2025
redirect_from:
- /docs/acp/user/receive-acp-messages.html
---

Your project can receive ACP messages using the message broker consume command with various options and arguments.

## Command syntax

Basic command syntax:

```bash
console message-broker:consume [channel-name...] [options]
```

## Arguments and options

### Optional: Channel name

- Description: Specifies one or more channels to consume messages from. Multiple channels can be specified as separate arguments.
- Usage: `console message-broker:consume {channel-name}` or `console message-broker:consume {channel1} {channel2} {channel3}`
- Example: `console message-broker:consume app-events` or `console message-broker:consume app-events notifications orders`
- Default behavior: If no channel is specified, messages are consumed from all available channels listed in `MessageBrokerConfig::getDefaultWorkerChannels()`

### Options

#### `--time-limit=SECONDS`

- Description: Sets the maximum time in seconds the worker should run before stopping
- Usage: `--time-limit=15`
- Purpose: Prevents workers from running indefinitely and ensures regular restarts
- Recommended value: 15-60 seconds for cron-based execution

{% info_block warningBox "Continuous execution" %}

Without the `--time-limit` option, the command runs continuously and doesn't stop automatically. It will keep polling for messages until manually terminated.

{% endinfo_block %}

#### `--sleep=SECONDS`

- Description: Sets the sleep time in seconds between message processing cycles when no messages are available
- Usage: `--sleep=5`
- Purpose: Reduces CPU usage by pausing between polling attempts
- Recommended value: 1-10 seconds depending on message frequency

## Usage examples

Receive messages from all channels:

```bash
console message-broker:consume
```

Receive messages from a specific channel:

```bash
console message-broker:consume app-events
```

Receive messages from multiple channels:

```bash
console message-broker:consume app-events notifications orders
```

Receive messages with time and sleep limits:

```bash
console message-broker:consume --time-limit=30 --sleep=3
```

Receive messages from a specific channel with options:

```bash
console message-broker:consume app-events --time-limit=15 --sleep=5
```


## Receiving messages automatically

The message broker consume command must be executed periodically to ensure continuous message processing. The recommended approach is to configure a cron job that runs every minute.

### Cron job configuration

Configure Jenkins in `config/Zed/cronjobs/jenkins.php`:

```php
if (\Spryker\Shared\Config\Config::get(\Spryker\Shared\MessageBroker\MessageBrokerConstants::IS_ENABLED)) {
    $jobs[] = [
        'name' => 'message-broker-consume-channels',
        'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=15 --sleep=5',
        'schedule' => '* * * * *',
        'enable' => true,
    ];
}
```

#### Configuration parameters

- Conditional check: `\Spryker\Shared\Config\Config::get(\Spryker\Shared\MessageBroker\MessageBrokerConstants::IS_ENABLED)` verifies if the message broker is enabled before adding the job
- Job name: `message-broker-consume-channels` - unique identifier for the cron job
- Command: The full console command with options:
  - `--time-limit=15`: Limits each worker execution to 15 seconds
  - `--sleep=5`: Waits 5 seconds between polling cycles when no messages are available
- Schedule: `* * * * *` - runs every minute
- Enable: `true` - activates the job during deployment

### Cron job execution

1. The cron job starts every minute
2. The worker checks for available messages in the configured channels
3. If messages are found, they're processed immediately
4. If no messages are available, the worker sleeps for the specified duration
5. After the time limit is reached, the worker stops gracefully
6. The next cron execution starts a fresh worker process


### Alternative configuration

Consider these configuration options according to your project needs.

#### Priority-based message processing

If some messages are more important than others, divide your jobs to handle critical messages more frequently while processing less important messages at longer intervals.

Process high-priority messages every minute:

```php
$jobs[] = [
    'name' => 'message-broker-consume-critical-channels',
    'command' => '$PHP_BIN vendor/bin/console message-broker:consume app-events --time-limit=15 --sleep=2',
    'schedule' => '* * * * *', // Every minute
    'enable' => true,
];
```

Process low-priority messages every 5 minutes:

```php
$jobs[] = [
    'name' => 'message-broker-consume-standard-channels',
    'command' => '$PHP_BIN vendor/bin/console message-broker:consume channel1 channel2 channel3 --time-limit=30 --sleep=5',
    'schedule' => '*/5 * * * *', // Every 5 minutes
    'enable' => true,
];
```

#### Environment-specific optimization

For high-traffic environments:

```php
// Shorter sleep time for faster message processing
'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=30 --sleep=1',
```

For low-traffic environments:

```php
// Longer intervals to reduce resource usage
'schedule' => '*/10 * * * *', // Every 10 minutes
'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=45 --sleep=10',
```