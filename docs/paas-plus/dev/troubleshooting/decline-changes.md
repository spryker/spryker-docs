---
title: How to decline the Spryker Code Upgrader changes
description: How to decline the changes done by Spryker Code Upgrader
template: concept-topic-template
---

After the successful execution of Spryker Code Upgrader, it creates the Pull Request in your project. If you don’t want to merge the suggested changes, you can always close the PR and delete the created branch.

Spryker Code Upgrader can be executed only once if the created Pull Request is still open for the same code base. It means that if you want to execute Spryker Code Upgrader again on the same code base, you need to close the open PR and delete the created remote branch, otherwise Spryker Code Upgrader can’t process your request and will inform you about that.

![Spryker Code Upgrader](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/troubleshooting/decline-changes.md/unprocessed-pr-log.png)

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).
