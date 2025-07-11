---
title: Tutorial — Troubleshooting failing Yves authentication
description: Troubleshoot Yves authentication failures in Spryker by reviewing Yves and Zed logs, and follow the steps to identify and resolve issues
template: troubleshooting-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-failing-yves-authentication.html
---

Yves authentication fails for all customers.

Since it's a customer-side issue, you need to go through customer-related stages of information flow (red arrrows on the diagram). The default information flow is frontend > Yves > Zed (boffice).

![information flow diagram](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/informatin-flow-diagram.png)

As authentication is not related to the frontend itself, you can skip it when troubleshooting through the flow.


## Check logs

Check Yves, and Zed (Back Office) logs as follows. Filter log groups by `yves` and `zed` ( `boffice` ).

{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->
