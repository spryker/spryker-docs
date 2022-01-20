---
title: Tutorial — Troubleshooting Yves authentication failed issue
description: Learn how to troubleshoot Yves authentication failed issue
template: troubleshooting-guide-template
---
Yves authentication failed for all customers.

To troubleshoot this issue, you need to go through customer-related stages of information flow (red line). The default information flow front end > Yves > Zed (boffice).

In case if Yves is available and you have only "Authentication failed" issue, you can skip the frontend logs check.

![information flow diagram](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/informatin-flow-diagram.png)

## 1. Check logs

Check Yves, and Zed (backoffice) logs as follows. Filter log groups by `yves` and `zed` ( `boffice` ).

{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->
