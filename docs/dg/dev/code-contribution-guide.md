---
title: Code contribution guide
description: Learn how to contribute code to Spryker with this comprehensive guide. Follow best practices for creating, reviewing, and submitting high-quality contributions efficiently.
last_updated: Sep 4, 2026
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/code-contribution-guide.html

---

We welcome all varieties of contributions, from issues to pull requests (PRs). Because PRs reflect the changes and the context, we verify and ship these faster. Therefore, *pull requests are the preferred method of contribution*.

## Licenses

Spryker uses our proprietary licenses and common open-source licenses. In general, you can contribute to our public repositories in these organizations:

- [Spryker](https://github.com/spryker)
- [Spryker-shop](https://github.com/spryker-shop)
- [Spryker-SDK](https://github.com/spryker-sdk)


## Preconditions

- You must have a [GitHub account](https://docs.github.com/en/account-and-profile/how-tos/account-management/creating-an-account-on-github).
- You must agree to the Spryker Contribution Terms located in each repository.

## Contribute

1. Identify the module you would like to contribute to:
   - In the `vendor/` directory there is the organization and the module name. For example, `spryker/acl`.
   - Find this module on Spryker's GitHub: [acl](https://github.com/spryker/acl).
2. Review CONTRIBUTING.md and agree to the contribution terms. If you cannot find them, [contact us](https://portal.spryker.com).
3. Fork the relevant repository as described in [Fork a repo](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo).
4. Apply your code changes. Make sure the commit description clearly reflects the changes.
5. Validate your code changes in at least one Demo Shop that is relevant to your contribution:
   - [B2C Demo Shop](https://github.com/spryker-shop/b2c-demo-shop)
   - [B2B Demo Shop](https://github.com/spryker-shop/b2b-demo-shop)
   - [B2C Demo Marketplace](https://github.com/spryker-shop/b2c-demo-marketplace)
   - [B2B Demo Marketplace](https://github.com/spryker-shop/b2b-demo-marketplace)

6. Make sure that the automated tests and code quality tools active in the Demo Shop pass on your code.
7. Create a PR as described in [Creating a pull-request from a fork](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork). Make sure the PR name and description clearly reflect the context and the changes.

[Example pull request](https://github.com/spryker/product-configurations-rest-api/pull/1).

If we cannot merge a PR because of our release process, we will try to manually introduce the change. Once the change is released, we inform you by closing the PR.

## Pull request processing time

We aim to acknowledge all pull requests within two weeks. If an important change is blocking you, notify your CSM or create a case in the [Spryker Portal](https://portal.spryker.com) to speed up the process.

<!--
## Any further questions?
Contact us!
-->




















