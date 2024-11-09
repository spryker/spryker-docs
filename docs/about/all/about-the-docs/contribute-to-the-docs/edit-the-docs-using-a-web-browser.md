---
title: Edit the docs using a web browser
description: Learn how you can contribute and propose changes to the Spryker documentation through the web browser
last_updated: Jul 18, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-spryker-documentation.html
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-documentation.html
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/editing-documentation-via-pull-requests.html
  - /docs/scos/user/intro-to-spryker/contribute-to-the-documentation/edit-documentation-via-pull-requests.html

related:
  - title: Build the documentation site
    link: docs/about/all/about-the-docs/run-the-docs-locally.html
  - title: Addi product sections to the documentation
    link: docs/about/all/about-the-docs/contribute-to-the-docs/add-global-sections-to-the-docs.html
  - title: Report documentation issues
    link: docs/about/all/about-the-docs/contribute-to-the-docs/report-docs-issues.html
  - title: Review pull requests
    link: docs/about/all/about-the-docs/contribute-to-the-docs/review-docs-pull-requests.html
  - title: Markdown syntax
    link: docs/about/all/about-the-docs/style-guide/markdown-syntax.html
---

The Spryker documentation is hosted on GitHub, in the [spryker-docs](https://github.com/spryker/spryker-docs) repository. Therefore, to contribute to the Spryker documents, you have to use GitHub. For more information about what GitHub is, see [About Git](https://docs.github.com/en/get-started/using-git/about-git).

{% info_block infoBox "Info" %}

We write the Spryker documentation using Markdown. If you don’t know Markdown yet, check the [GitHub Markdown Guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax). For the documentation-specific Markdown elements and HTML syntax used where Markdown is not enough, see [Markdown syntax](/docs/about/all/about-the-docs/style-guide/markdown-syntax.html).

{% endinfo_block %}

This instruction explains how to contribute to the Spryker documentation by creating [pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) on GitHub.

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
   * **Create *[document-name.md]***: Give your commit a name that matches the page title or section you create or edit. For example, if you edit the document called "Install the Cart feature", your commit must also be named "Install the Cart feature".
   * **Add an optional extended description...** (optional): Provide an optional detailed description of your commit. For information about commits, see [About commits](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/about-commits) in the official GitHub documentation.
5. Click **Propose changes**.
   This takes you to the **Comparing changes** page.
![proposing-changes](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-spryker-documentation/3-saving-changes.png)
6. On the **Comparing changes** page, open a pull request by clicking **Create pull request**. For information about pull requests, see [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) in the official GitHub documentation.
![comparing-changes](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-spryker-documentation/4-creating-a-pull-request.png)
7. On the **Open a pull request** page, the **Title** field is auto-populated with the name you gave to your commit with the changes proposed in step 5.
{% info_block infoBox "Renaming pull requests" %}

To rename your pull request, delete the auto-populated title and enter a new one. Keep in mind that the pull request's name must correspond to the name of document or section that you create or edt.

{% endinfo_block %}

8. Optional: On the **Write** tab, in the **## PR Description** section, add an extended description of your pull request.
9. Click **Create pull request**.
![creating-a-pull-request](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/contributing-to-spryker-documentation/5-naming-the-pr-and-saving-it.png)

Your pull request is created. Now, it will be picked up by the Spryker docs team for review and merge.
