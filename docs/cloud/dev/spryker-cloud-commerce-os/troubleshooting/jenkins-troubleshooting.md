---
title: Jenkins Troubleshooting
description: This article describes how to troubleshoot the most common problems with the jenkins scheulder
template: troubleshooting-guide-template
---

<!-- Locate your guide to one of the troubleshooting sections:

* Troubleshooting installation issues
* Troubleshooting Spryker in Docker issues
* Troubleshooting general technical issues

Every troubleshooting article should have its own page in the respective section.-->

## Title

Jenkins does not restart properly due to long running job

## {Description}

You may encounter problems when trying to do new deployments on your environments if Jenkins is running a job that is usually running for an extended period of time and cannot be completed before the deployment. Typical symptoms of this problem is that deployment fails in Deploy_Scheduler deployment step.

## Cause

The cause of this problem is that long running, heavy jobs might saturate the resources that Jenkins has available to a degree that the instance cannot follow the stop command it receives during deploy and the pipeline will subsequently fail at this step.

## Solution

Before running deploys, please access Jenkins via web UI and stop any long running, heavy jobs. You can do this by finding the job in the Build Executor Status list and stop it by clicking on the X next to it.
After that, please run your deploy.