---
title: Fail whale on the frontend
description: Learn how to troubleshoot and the solution for the fail whale on the front end within your Spryker based projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/fail-whale-on-the-front-end
originalArticleId: bf2d7e12-feee-4369-a291-72d4fc5ed562
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/fail-whale-on-the-frontend.html
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
