---
title: Install recommended VS Code extensions
description: Install recommended VS Code extensions to improve speed and quality quality of your contributions.
last_updated: Feb 28, 2023
template: howto-guide-template
redirect_from:
- /docs/scos/user/intro-to-spryker/contribute-to-the-documentation/install-recommended-vs-code-extensions.html

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

We recommend the following VS Code extensions for writing and reviewing documents:
- *Grammarly*: Checks grammar, spelling, and punctuation in real-time as you write.
- *Vale*: Customizable linter that checks for style and grammar issues in Markdown and other supported files.
- *Markdown Shortcuts*: Provides shortcuts for formatting Markdown text.

## Install extensions

1. In the side pane, click the **Extensions** icon. Alternatively, you can use the shortcut <kbd>Ctrl+Shift+X</kbd> on Windows or <kbd>Cmd+Shift+X</kbd> on Mac.
2. In the search line of the **EXTENSIONS** menu, enter the name of the extension you want to install.
3. Find the extension in the search results list and click **Install**.

Some extensions, like Vale, need additional configuration. For Vale installation instructions, see the following sections.

## Vale overview

Vale works by analyzing the text of a file and comparing it to a set of customizable rules, which are located in the `vale/styles` folder.
Vale uses the rules to check for issues such as spelling, grammar, and stylistic errors.

The `vale/styles/Vocab/Base` folder holds the `accept.txt` and `reject.txt` files.
These files contain custom words and phrases that must always be accepted or rejected, respectively, during the Vale review process.

When Vale identifies an issue, it highlights the relevant text and displays an inline message that describes the issue and suggests a solution. These messages can include links to external resources or documentation for more information.
Additionally, Vale displays feedback in the VS Code **PROBLEMS** pane, which provides a list of all the issues found in the file.
To navigate directly to the relevant line of code in the file and make corrections, you need to click an issue in the **PROBLEMS** pane.

For more information about Vale, see [Vale's official documentation](https://vale.sh/docs/cli).

## Install Vale

To use Vale in VS Code, you need to install it on your computer. For installation instructions, see [Installation in Vale's official docs](https://vale.sh/docs/vale-cli/installation/).

## Configure Vale in VS Code

1. In the **Extensions** menu, right-click Vale and select **Extension Settings**.
2. On the **User** tab, for **Vale > Vale CLI: Config**, enter `${workspaceFolder}/.vale.ini`.
3. For **Vale › Vale CLI: Min Alert Level**, select **inherited**.
4. For **Vale › Vale CLI: Path**, enter `vale`.
5. Click the **Workspace** tab and repeat steps 2-4.
6. To apply the settings, relaunch VS Code.

 Now you can use Vale to lint and style-check Markdown files in the project.
