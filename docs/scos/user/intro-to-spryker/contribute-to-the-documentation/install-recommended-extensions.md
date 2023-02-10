---
title: Install recommended extensions
description: Install recommended extensions to improve the quality of your contributions
last_updated: Jul 18, 2022
template: howto-guide-template
related:
  - title: Build the documentation site
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/build-the-documentation-site.html
  - title: Addi product sections to the documentation
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/add-product-sections-to-the-documentation.html
  - title: Report documentation issues
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/report-documentation-issues.html
  - title: Review pull requests
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/review-pull-requests.html
  - title: Style, syntax, formatting, and general rules
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/style-formatting-general-rules.html
  - title: Markdown syntax
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/markdown-syntax.html
---

We have a list of recommended VS Code extensions that help improve the quality of our documentation as we create or edit it locally:
* Grammarly: checks grammar, spelling, and plagiarism.
* Vale: provides customizable spelling, style, and grammar checking.
* Markdown Shortcuts: adds shortcuts for markdown editing.

## Install an extension

To install an extension, follow these steps:
1. In the sidebar menu, click Extensions
2. In the search line of the Extensions menu, enter a needed extension's name.
3. Find the extension in the search results list and click install.

Some extensions, like Vale, need configuration before you can use them. 
The following sections describe how to configure it.

### Configure Vale

1. In the **Extensions** menu, find Vale and open its settings.
2. On the User tab, do the following:
   1. For **Vale > Vale CLI: Config**, enter `.vale.ini`.
   2. For **Vale › Vale CLI: Min Alert Level**, select **inherited**.
   3. For **Vale › Vale CLI: Path**, enter `vale`.
3. On the **Workspace** tab, enter and select the same values as in step 2.
4. Relaunch VS Code to make sure settings have been applied.

If you now open any markdown (MD) file 





