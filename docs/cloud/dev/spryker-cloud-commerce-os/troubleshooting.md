---
title: Troubleshooting
description: Solutions to common issues related to Spryker Cloud Commerce OS.
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/troubleshooting
originalArticleId: de8342de-9e4a-451f-8294-7a59a893b099
redirect_from:
  - /docs/troubleshooting
  - /docs/en/troubleshooting
---

This document contains solutions to common issues. 

## Assets, logs or pipelines are not visible in AWS Management Console

**when**
You don't see your assets, logs or pipelines In the AWS Management Console.

![Empty log groups](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Troubleshooting/empty-log-groups.png)

**then**
In the right corner of the navigation bar, select the region your assets are deployed in. 

![Region selection drop-down menu](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Troubleshooting/region-selection-drop-down.png)

## Changing a source branch fails

**when**

After saving pipeline settings with a new source branch, the branch is not added.

**then**

Add the branch once again. When updating the pipeline settings, make sure to select **No resource updates needed for this source action change**.

![troubleshooting-branch-source-change](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Troubleshooting/troubleshooting-branch-source-change.png)

## Deployment fails 

**when**

A deployment fails with the `Post https://auth.docker.io/token: EOF` error.

**then**

Wait for at least 30 minutes and deploy once more. 


