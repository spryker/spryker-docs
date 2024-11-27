---
title: Tutorial — Troubleshooting a killed process
description: Troubleshoot and resolve issues when a process is killed in Spryker, including steps to identify OOM Killer errors and check container task statuses.
template: troubleshooting-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-a-killed-process.html
---

One of the reasons for a process being killed is OOM Killer(Out of memory Killer).

The OOM Killer is a process that the Linux kernel employs when the system is critically low on memory. This happens when the Linux kernel over-allocates memory to its processes.  

If the primary container process was killed by OOM Killer, the container exit status is `139`. To check the exit status of a process, do the following:

{% include checking-the-status-of-ecs-services-and-tasks.md %} <!-- To edit, see /_includes/checking-the-status-of-ecs-services-and-tasks.md -->
