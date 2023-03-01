---
title: "TransportException: Cannot move pack"
description: How to solve the problem trying to connect the repository to Spryker Code Upgrader project
template: concept-topic-template
---

If you are connecting the Upgrader to your repository using an access token, the token should have the correct rights.

## Error

```shell
TransportException: Cannot move pack to ...
```

![Spryker Code Upgrader](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/troubleshooting/repository-connection-error.md/connection-error.png)

## Solution

1. Double-check the permissions of the access token based on the requirements:

* [GitHub access token requirements](/docs/paas-plus/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.html#prerequisites)
* [GitLab access token requirements](/docs/paas-plus/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.html#prerequisites)

2. If the permissions are correct, reconnect the repository.

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).
