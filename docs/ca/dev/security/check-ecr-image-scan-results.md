---
title: Check ECR image scan results
description: Protect your applications by resolving issues detected by ECR image scans.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/checking-ecr-image-scan-results
originalArticleId: df76db2c-05f5-4ec8-b5b4-3dee7dd3a152
redirect_from:
  - /docs/checking-ecr-image-scan-results
  - /docs/en/checking-ecr-image-scan-results
  - /docs/cloud/dev/spryker-cloud-commerce-os/security/checking-ecr-image-scan-results.html
---

This document describes how to check ECR image scan results.

After a new code is pushed to a repository, ECR scans images for known vulnerabilities. You can check scan results and resolve detected issues to protect your applications.  See [Image scanning](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html) to learn more about ECR image scans.

To check image scan results:

1. In the AWS Management Console, go to **Services** > [Elastic Container Registry](https://console.aws.amazon.com/ecr/repositories).
2. From the navigation bar, select the region the desired repository is located in.
3. In the navigation pane, select **Repositories**.
4. On the *Repositories* page, select the repository that contains the image whose scan you want to check.
5. In the *Vulnerabilities* column of the *Images* page, select **Details** next to the image whose scan you want to check.

You've located ECR image scan results.
