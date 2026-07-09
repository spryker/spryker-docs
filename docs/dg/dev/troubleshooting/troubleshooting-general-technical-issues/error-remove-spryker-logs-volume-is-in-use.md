---
title: ERROR- remove spryker_logs- volume is in use
description: Learn how to troubleshoot and the solution to the `ERROR- remove spryker_logs- volume is in use` error within your Spryker projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/error-remove-spryker-logs-volume-is-in-use.html
  - /v6/docs/en/error-remove-spryker-logs-volume-is-in-use
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


You get the error `ERROR: remove spryker_logs: volume is in use - [{container_hash}]`

## Solution

1. Run the command:

```bash
docker rm -f {container_hash}
```

2. Repeat the failed command.
