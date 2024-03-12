---
title: Code contribution guide
description: Contribute into Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/code-contribution-guide
originalArticleId: d5ded6f2-5bb9-4288-bc96-3fabf7e32c8f
redirect_from:
  - /docs/scos/dev/code-contribution-guide.html
---

{% info_block infoBox %}
We are currently revising our code contribution concept and will update this page once the new concept is finalised. Please note that while we are working on the new concept we will unfortunately not be able to consider external contributions to our code base.
{% endinfo_block %}

In Spryker, we welcome contributions in all forms, be it detailed Issues or Pull Requests (PRs). As PRs directly show the changes and the context, we verify and ship them faster. Therefore, *PRs are the preferred method of contribution*.


## Licenses

Spryker uses different licenses: our proprietary licenses and common open-source licenses. In general, you can contribute to our public repositories
- [spryker](https://github.com/spryker)
- [spryker-shop](https://github.com/spryker-shop)
- [spryker-eco](https://github.com/spryker-eco)
- [spryker-sdk](https://github.com/spryker-sdk)
- [spryker-middleware](https://github.com/spryker-middleware)

Read `CONTRIBUTING.md` of a module before opening a PR.

## Opening pull requests

To contribute to a Spryker repository, follow these steps:
1. Fork the repository and create a branch with your changes. Ensure that the commit messages explain the aim of the applied changes or fixes.
2. Open a PR in the repository. Ensure that the title and description clearly describe the context of your work.
3. Create a Support Case in (https://spryker.force.com/support/s/) and link your pull request inside it.

If we cannot merge a PR due to our release process, we manually introduce the change. Once the change is released, we inform you by closing the PR. We also provide the link to the relevant release or releases so you can check your changes. Issue integration process is shown in the following diagram.

For most Spryker and SprykerShop modules we need a special process since those are developed in a mono-repo:
<div style="text-align:center;"><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Code+Contribution+Guide/code-contirubtion.png" alt="code-contirubtion.png"></div>


## When will you process my request?

The processing time depends on the importance of the changes and the amount of work required to check and implement the changes. In case an important change is requested via a PR, we may be able to ship it within one day.

If you create a PR and feel that the issue is important, [contact our support](https://spryker.force.com/support/s/) to speed up the process.

---
**See also:**

[Contribute to documentation](/docs/about/all/contribute-to-the-documentation/contribute-to-the-documentation.html)
