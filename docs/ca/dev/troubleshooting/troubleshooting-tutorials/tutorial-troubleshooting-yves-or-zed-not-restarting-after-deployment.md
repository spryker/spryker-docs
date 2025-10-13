---
title: Tutorial — Troubleshooting Yves or Zed not restarting after deployment
description: Troubleshoot Yves or Zed not restarting after deployment in Spryker by checking ECS service status, task logs, and errors to identify and resolve issues.
template: troubleshooting-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-yves-or-zed-not-restarting-after-deployment.html
---

Yves or Zed is not accessible after deployment or the deployment is failed.

## Check the status of service and task

Check the service and task of the service that's not restarting as follows. For Yves, check the service and task postfixed with `yves`. For Zed, check the service and task postfixed with `zed`.

{% include checking-the-status-of-ecs-services-and-tasks.md %} <!-- To edit, see /_includes/checking-the-status-of-ecs-services-and-tasks.md -->
