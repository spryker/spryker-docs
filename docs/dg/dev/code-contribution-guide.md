---
title: Code contribution guide
description: Learn how to contribute code to Spryker with this comprehensive guide. Follow best practices for creating, reviewing, and submitting high-quality contributions efficiently.
last_updated: Apr 3, 2024
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/code-contribution-guide
originalArticleId: d5ded6f2-5bb9-4288-bc96-3fabf7e32c8f
redirect_from:
  - /docs/scos/dev/code-contribution-guide.html

---

We welcome all varieties of contributions, from issues to pull requests (PRs). Because PRs reflect the changes and the context, we verify and ship these faster. Therefore, *pull requests are the preferred method of contribution*.

## Licenses

Spryker uses our proprietary licenses and common open-source licenses. In general, you can contribute to our public repositories in these organizations:

- https://github.com/spryker
- https://github.com/spryker-shop
- https://github.com/spryker-sdk


## Preconditions
- You must have a [GitHub account](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github).
- You must agree to the Spryker Contribution Terms located in each repository.

## Contribute

1. Identify the module you would like to contribute to:
   - In the `vendor/` directory there is the organization and the module name. For example, `spryker/acl`.
   - Find this module on Spryker's GitHub https://github.com/spryker/acl.
2. Review CONTRIBUTING.md and agree to the contribution terms. In case you cannot find them, [contact us](https://support.spryker.com).
3. Fork the relevant repository as detailed [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
4. Apply your code changes. Make sure the commit description clearly reflects the changes.
5. Validate your code changes in at least one Demo Shop that is relevant to your contribution:
   - https://github.com/spryker-shop/b2c-demo-shop
   - https://github.com/spryker-shop/b2b-demo-shop
   - https://github.com/spryker-shop/b2c-demo-marketplace
   - https://github.com/spryker-shop/b2b-demo-marketplace

6. Make sure that the automated tests and code quality tools active in the Demo Shop pass on your code.
7. Create a PR as detailed [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork). Make sure the PR name and description clearly reflect the context and the changes.

For example, here is a result of this flow: https://github.com/spryker/product-configurations-rest-api/pull/1.

If we can't merge a PR because of our release process, we manually introduce the change. Once the change is released, we inform you by closing the PR.

## Pull request processing time

Spryker endeavors to acknowledge all pull requests within two weeks. If an important change is submitted, we usually process it within a day.

If you create a pull request and feel that the issue is important, [contact support](https://support.spryker.com) to speed up the process.

<!--
## Any further questions?
Contact us!
-->
