---
title: 'API request fails with the exception: Session has not been set'
description: Learn how to resolve the issue with an exception that session has not been set.
last_updated: Jan 24, 2023
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/api-request-fails-with-the-exception-session-has-not-been-set.html

---

Executing an API command leads to the exception `Session has not been set`.

## Cause

Most probably, you're using a code that is relying on session. However, obviously, in case of an API, you don't have the session.

## Solution

Switch the session storage for the Messenger module to `IN MEMORY`:

```php
use Spryker\Shared\Messenger\MessengerConfig as SharedMessengerConfig;
use Spryker\Zed\Messenger\MessengerConfig;
....

MessengerConfig::setMessageTray(SharedMessengerConfig::IN_MEMORY_TRAY);

```
