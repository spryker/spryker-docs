---
title: The process exceeded the timeout
description: What to do if you get the timeout error in Spryker Code Upgrader
template: concept-topic-template
redirect_from:
  - /docs/paas-plus/dev/troubleshooting/the-process-exceeded-the-timeout.html
---

If the execution of Spryker Code Upgrader returns a Composer timeout error, make sure that your access token is still valid. It may be expired or have incorrect permissions.

## Error

Similar to the following:

```shell
The process ... exceeded the timeout of ... seconds.
```

## Solution

Check that your access token is still active and has correct permissions. For token requirements, see one of the following documents:

* [GitHub access token requirements](/docs/scu/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.html#prerequisites)
* [GitLab access token requirements](/docs/scu/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.html#prerequisites)
* [Azure access token requirements](/docs/scu/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-azure-managed-project.html#prerequisites)

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).
