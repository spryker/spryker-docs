---
title: Jenkins does not restart
description: This article describes how to troubleshoot the most common problems with the jenkins scheulder
template: troubleshooting-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting-deployment/jenkins-does-not-restart.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting/troubleshooting-deployment-issues/jenkins-does-not-restart.html
---

When deploying an application, Jenkins does not restart properly and the `Deploy_Scheduler` deployment step fails.

## Cause

Jenkins does not have enough resources to process a long-running heavy job and, subsequently, cannot follow the stop command during a deployment.

## Solution

Before deploying an application, stop long-running, heavy jobs. In the *Build Executor Status* section of the Jenkins Web UI, select **x** next to each long-running job.
