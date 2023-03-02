---
title: Install recommended extensions
description: Install recommended VS Code extensions to improve speed and quality quality of your contributions.
last_updated: Feb 28, 2023
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

We have a list of recommended VS Code extensions that our team uses for writing and reviewing documentation:
* *Grammarly*: Checks your grammar, spelling, and punctuation in real-time as you write.
* *Vale*: Customizable linter that checks for style and grammar issues in Markdown and other supported files.
* *Markdown Shortcuts*: Provides shortcuts for formatting Markdown text.

## Install an extension

To install an extension, follow these steps:
1. In the side pane, click the **Extensions** icon. Alternatively, you can use the shortcut <kbd>Ctrl+Shift+X</kbd> on Windows or <kbd>Cmd+Shift+X</kbd> on Mac.
2. In the search line of the **EXTENSIONS** menu, enter the extension name you want to install.
3. Find the extension in the search results list and click **Install**.

Some extensions, like Vale, need configuration before you can use them.

### Configure Vale

Once you've installed Vale, you need to configure it:

1. In the **Extensions** menu, find Vale and open **Extension Settings**.
2. On the **User** tab, configure the following settings:
   1. For **Vale > Vale CLI: Config**, enter an absolute path to the `vale.ini` file. The file is located in the root folder of the project—for example, if the project is located in `/Users/{USER_NAME}/Spryker/GitHub/spryker-docs/`, then the absolute path is `/Users/{USER_NAME}/Spryker/GitHub/spryker-docs/.vale.ini`. The `{USER_NAME}` placeholder stands for your user name. If you are using Windows OS, you can enter `${workspaceFolder}/vale.ini`. The `${workspaceFolder}` variable adds the absolute path automatically, so you don't need to enter the path manually.
   2. For **Vale › Vale CLI: Min Alert Level**, select **inherited**.
3. On the **Workspace** tab, enter and select the same values as in steps 1 and 2.
4. Relaunch VS Code to make sure settings have been applied.

 Now you can use Vale to lint and style-check Markdown files within the project.

#### Vale overview

Vale works by analyzing the text of a file and comparing it to a set of customizable rules, which are located in the `vale/styles` folder. 
Vale uses the rules to check for issues such as spelling errors, grammar mistakes, and stylistic inconsistencies.

The `vale/styles/Vocab/Base` folder holds the `accept.txt` and `reject.txt` files. 
These files contain custom words and phrases that must always be accepted or rejected, respectively, during the Vale review process.

When Vale identifies an issue, it highlights the relevant text and displays an inline message that describes the issue and suggests a solution. These messages can include links to external resources or documentation for more information.
Additionally, Vale displays feedback in the VS Code **PROBLEMS** pane, which provides a list of all the issues found in the file.
To navigate directly to the relevant line of code in the file and make corrections, you need to click an issue in the **PROBLEMS** pane.

For more information about Vale soon, see [Vale's official documentation](https://vale.sh/docs/vale-cli/overview/).