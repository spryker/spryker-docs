---
title: Fail whale on the front end
originalLink: https://documentation.spryker.com/2021080/docs/fail-whale-on-the-front-end
redirect_from:
  - /2021080/docs/fail-whale-on-the-front-end
  - /2021080/docs/en/fail-whale-on-the-front-end
---

A fail whale is displayed on the front end.

## Solution

1. Run the command:
```bash
docker/sdk logs
```

2. Add several returns to mark the line you started from.
3. Open the page with the error.
4. Check the logs.

