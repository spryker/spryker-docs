---
title: The process exceeded the timeout
description: Learn what to do if you get the Process exceeded the timeout error in Spryker and how to resolve this issue.
template: concept-topic-template
last_updated: May 8, 2023
redirect_from:
  - /docs/paas-plus/dev/troubleshooting/the-process-exceeded-the-timeout.html
---

If executing the Upgrader returns a Composer timeout error, make sure that your access token is still valid. It may be expired or have incorrect permissions.

## Error

Similar to the following:

```shell
The process ... exceeded the timeout of ... seconds.
```

## Solution

Check that your access token is still active and has correct permissions. For token requirements, see one of the following documents:

* [GitHub access token requirements](/docs/ca/devscu/connect-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.html#prerequisites)
* [GitLab access token requirements](/docs/ca/devscu/connect-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.html#prerequisites)
* [GitLab access token requirements for self-hosted projects](/docs/ca/devscu/connect-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-project-self-hosted-with-gitlab.html#prerequisites)
* [Azure access token requirements](/docs/ca/devscu/connect-spryker-code-upgrader/connect-spryker-code-upgrader-to-an-azure-managed-project.html#prerequisites)

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://support.spryker.com).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).
