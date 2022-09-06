---
title: API request fails with an exception `Session has not been set`
description: Learn how to resolve the issue with an exception that session has not been set.
last_updated: Sep 6, 2022
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/api-request-fails-exception-session-has-not-been-set
---

Executing some API command leads to the exception `Session has not been set`

## Solution

* Most probably, you're using a code which is relying on the Session.
In case of API, of course, you don't have a session.
To solve this, you must switch session storage for Messenger to IN MEMORY:

```
use Spryker\Shared\Messenger\MessengerConfig as SharedMessengerConfig;
use Spryker\Zed\Messenger\MessengerConfig;
....

MessengerConfig::setMessageTray(SharedMessengerConfig::IN_MEMORY_TRAY);

```
