---
title: HowTo - Dump Queue Messages
originalLink: https://documentation.spryker.com/v2/docs/ht-dump-queue-messages-201903
redirect_from:
  - /v2/docs/ht-dump-queue-messages-201903
  - /v2/docs/en/ht-dump-queue-messages-201903
---

## Introduction
This article provides information on the queue:dump command.

### What does the command do?
The command outputs a queue message information in a predefined output format.

### Where is the command used?
While working with the Queue system, you might need to check a queue message structure.
The console command allows to debug a message from a queue and output the data in a predefined format.

### How to use the command
To dump queue messages from a specific queue, use the `vendor/bin/console queue:dump` console command.

You can find argument transcriptions and usage examples below.

| Parameter name | Transcription |
| --- | --- |
|`queueName`  | Defines the queue to be dumped. |
| `outputFormat` | Defines the dump queue message output format (e.g json, csv). The default output format is json. |
|`limitAmount`  |Defines the amount of events to be read from the queue. If a limit option is not defined, the first 10 messages from the queue are displayed.  |
| `Acknowledge` | Defines if queue messages are to be acknowledged. By default, it's equal to false. |

### Usage examples

```bash
// Outputs the first 10 records from {queueName}.
vendor/bin/console queue:dump {queueName}
 
// Outputs the number of messages specified by {limitAmount} from the event queue.
vendor/bin/console queue:dump event -l {limitAmount}
 
// Outputs the first message from the event queue, where {Acknowledge} defines if the message is to be acknowledged.
vendor/bin/console queue:dump demo_queue -l 1 -k {Acknowledge}
 
// Outputs the first message from the event queue in the format defined by {outputFormat}. The message is acknowledged.
vendor/bin/console queue:dump event -l 1 -k 1 -f {outputFormat}
 
// Outputs the first message from the event queue in csv format. The message is acknowledged.
vendor/bin/console queue:dump event -l 1 -k 1 -f csv
```

<!-- Last review date: Mar 9, 2019 -by Oleksandr Myrnyi, Andrii Tserkovnyi-->
