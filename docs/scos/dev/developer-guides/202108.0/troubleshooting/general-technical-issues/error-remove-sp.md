---
title: ERROR- remove spryker_logs- volume is in use
originalLink: https://documentation.spryker.com/2021080/docs/error-remove-spryker-logs-volume-is-in-use
redirect_from:
  - /2021080/docs/error-remove-spryker-logs-volume-is-in-use
  - /2021080/docs/en/error-remove-spryker-logs-volume-is-in-use
---

You get the error `ERROR: remove spryker_logs: volume is in use - [{container_hash}]`

## Solution

1. Run the command:
```
docker rm -f {container_hash}
```

2. Repeat the failed command.
