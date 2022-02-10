---
title: Editing documentation via pull requests
description: Learn how you can propose changes to the Spryker docs
template: howto-guide-template
redirect_from:
   - /docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-spryker-documentation.html
---

The Spryker documentation is hosted on GitHub, in the [spryker-docs](https://github.com/spryker/spryker-docs) repository. Therefore, to contribute to the Spryker documents, you have to use GitHub. For more information about what GitHub is, see [About Git](https://docs.github.com/en/get-started/using-git/about-git).

{% info_block infoBox "Info" %}

We write the Spryker documentation using Markdown. If you don’t know Markdown yet, check the [GitHub Markdown Guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax). For the documentation-specific Markdown elements and HTML syntax used where Markdown is not enough, see [Markdown syntax](/docs/scos/user/intro-to-spryker/contributing-to-documentation/markdown-syntax.html).

{% endinfo_block %}

This instruction explains how to contribute to the Spryker documentation by creating [pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) on GitHub.

{% info_block infoBox "Info" %}

For information about the structure of the Spryker documentation, as well as style and formatting rules, see [Style, syntax, formatting, and general rules](/docs/scos/user/intro-to-spryker/contributing-to-documentation/style-formatting-general-rules.html).

{% endinfo_block %}

## Prerequisites

To start contributing to the Spryker documentation, make sure you have a GitHub account.

For information about how to create a new account on GitHub, see [Signing up for a new GitHub account](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account) in the official GitHub documentation.

## Propose changes to the Spryker documentation

To propose changes to the Spryker documentation, take the following steps:
1. At the top right corner of the page you want to propose changes to, click **Edit on GitHub**.
   This opens the document on GitHub.
![opening-a-document](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-spryker-documentation/1-opening-a-document.png)
2. At the top right corner of the GitHub page, click the **Edit** icon.
   This launches the edit mode to make changes to the document.
![editing-the-document](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-spryker-documentation/2-editing-a-document.png)
3. On the **Edit file** tab, edit the document.
4. To complete your editing and propose changes, in the **Propose changes** section, fill in the following fields:
   * **Create *[document-name.md]***: Give a meaningful name to your commit.
   * **Add an optional extended description...** (optional): Provide an optional detailed description of your commit. For information about commits, see [About commits](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/about-commits) in the official GitHub documentation.
5. Click **Propose changes**.
   This takes you to the **Comparing changes** page.
![proposing-changes](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-spryker-documentation/3-saving-changes.png)
6. On the **Comparing changes** page, open a pull request by clicking **Create pull request**. For information about pull requests, see [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) in the official GitHub documentation.
![comparing-changes](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-spryker-documentation/4-creating-a-pull-request.png)
7. On the **Open a pull request** page, the **Title** field is autopopulated with the name you gave to your commit with the changes proposed in step 5.
{% info_block infoBox "Renaming pull requests" %}

To rename your pull request, delete the autopopulated title and enter a new one.

{% endinfo_block %}

8.  Optional: On the **Write** tab, in the **## PR Description** section, add an extended description of your pull request.
9.  Click **Create pull request**.
![creating-a-pull-request](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-spryker-documentation/5-naming-the-pr-and-saving-it.png)

Your pull request is created. Now, it will be picked up by the Spryker docs team for review and merge.
