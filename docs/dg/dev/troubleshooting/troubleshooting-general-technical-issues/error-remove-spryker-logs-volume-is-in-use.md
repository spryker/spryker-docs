---
title: ERROR- remove spryker_logs- volume is in use
description: Learn how to troubleshoot and the solution to the `ERROR- remove spryker_logs- volume is in use` error within your Spryker projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/error-remove-spryker-logs-volume-is-in-use
originalArticleId: 2c841376-da36-4778-8964-306d0088f3d6
redirect_from:
  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/error-remove-spryker-logs-volume-is-in-use.html
  - /v6/docs/en/error-remove-spryker-logs-volume-is-in-use
---

You get the error `ERROR: remove spryker_logs: volume is in use - [{container_hash}]`

## Solution

1. Run the command:

```
docker rm -f {container_hash}
```

2. Repeat the failed command.
