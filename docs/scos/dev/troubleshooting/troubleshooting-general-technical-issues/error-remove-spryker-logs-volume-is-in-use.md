---
title: ERROR- remove spryker_logs- volume is in use
description: The solution to the `ERROR- remove spryker_logs- volume is in use` error.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/error-remove-spryker-logs-volume-is-in-use
originalArticleId: 2c841376-da36-4778-8964-306d0088f3d6
redirect_from:
  - /2021080/docs/error-remove-spryker-logs-volume-is-in-use
  - /2021080/docs/en/error-remove-spryker-logs-volume-is-in-use
  - /docs/error-remove-spryker-logs-volume-is-in-use
  - /docs/en/error-remove-spryker-logs-volume-is-in-use
  - /v6/docs/error-remove-spryker-logs-volume-is-in-use
  - /v6/docs/en/error-remove-spryker-logs-volume-is-in-use
---

You get the error `ERROR: remove spryker_logs: volume is in use - [{container_hash}]`

## Solution

1. Run the command:
```
docker rm -f {container_hash}
```

2. Repeat the failed command.
