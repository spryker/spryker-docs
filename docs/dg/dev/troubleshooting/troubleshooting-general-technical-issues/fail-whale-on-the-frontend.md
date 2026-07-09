---
title: Fail whale on the frontend
description: Learn how to troubleshoot and the solution for the fail whale on the front end within your Spryker based projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/fail-whale-on-the-frontend.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


A fail whale is displayed on the front end.

## Solution

1. Run the command:

```bash
docker/sdk logs
```

2. Add several returns to mark the line you started from.
3. Open the page with the error.
4. Check the logs.
