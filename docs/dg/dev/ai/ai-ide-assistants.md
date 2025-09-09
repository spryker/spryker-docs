---
title: AI IDE assistants
description: Overview of AI IDE coding assistants for daily work
template: concept-topic-template
---

This document describes the AI IDE Assistants you can use when developing your Spryker projects. You will read about recommended AI IDE Assistants, how to set up and use them.

Here are some examples of how you can use AI assistants in your work:
- Generate a code completion suggestion
- Describe a code fragment
- Generate a doc block for a code fragment
- Fix syntax bugs in a code fragment
- Simplify a code fragment
- Generate tests for a code fragment
- IO interactions
- Code generation

{% info_block warningBox %}

Before using a AI-related tools, consult with your legal department.

{% endinfo_block %}

## Install AI Assistants

We recommend trying the following assistants:
- GitHub Copilot
- Qodo (formerly Codium)
- Cursor

### Install GitHub Copilot

GitHub Copilot is an AI pair programmer that helps you write code faster. It draws context from comments and code and suggests individual lines and whole functions instantly.
To start using GitHub Copilot, do the following:
1. Install the [GitHub Copilot extension](https://plugins.jetbrains.com/plugin/17718-github-copilot) in your IDE.
2. Authorize yourself as a GitHub user in **Preferences** > **Languages and Frameworks** > **GitHub Copilot**.

![github-copilot-config](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/github-copilot-config.png)

Now you can use the GitHub Copilot.

### Install Qodo

Qodo is an AI-powered tool that helps developers to generate code, tests, and docs.
To set up Qodo, install the [Qodo Gen plugin](https://plugins.jetbrains.com/plugin/21206-qodo-gen-formerly-codiumate-). If the installation is successful, you can see Codiumate in the context menu.

![qodo-menu](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/qodo-menu.png)

### Install Cursor

Cursor is an AI powered IDE forked from VS Code. To set up Cursor, follow the steps:
1. Download Cursor from its [official website](https://www.cursor.com/).
2. Install Cursor from the downloaded file.
3. Optional: To save your work, enable autosave files in the settings.

![cursor-autosave](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/cursor-autosave.png)


## Using GitHub Copilot

Most features of GitHub Copilot can be used as follows:
1. Highlight a code fragment to process.
2. Right-click to open the context menu.
3. In the context menu, hover over **GitHub Copilot** and click the needed option.

Generate suggestions based on the existing code in your project:

![github-copilot-suggestion](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/github-copilot-suggestion.png)

Explain a code fragment:

![github-copilot-description](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/github-copilot-description.png)


Generate doc blocks and add comments:

![github-copilot-generate-docs](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/github-copilot-generate-docs.png)

Generate suggestions for fixing syntax bugs:

![github-copilot-fix-syntax-bugs](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/github-copilot-fix-syntax-bugs.png)

Refactor a code fragment:

![github-copilot-refactor-code](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/github-copilot-refactor-code.png)

Generate tests:

![github-copilot-generate-tests](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/github-copilot-generate-tests.png)

Interact with GitHub Copilot using prompts:

![github-copilot-io-interaction](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/github-copilot-io-interaction.png)

## Generating tests using Qodo

When it comes to generating tests, Qodo offers a more flexible configuration and a wider range of test scenarios compared to GitHub Copilot. Here's an example of tests generated with Qodo:

![quodo-generate-tests](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/quodo-generate-tests.png)

## Code generation using Cursor

Cursor AI offers context-aware suggestions by considering the bigger picture within the codebase. This enables it to deliver more accurate and well-structured recommendations, in contrast to GitHub Copilot, which mainly focuses on real-time suggestions based on the specific line of code you're working on. It's great at generating basic code and significantly saves time, especially when you need to create something from scratch.

Here's an example of code generated with Cursor:

![cursor-generate-code](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/cursor-generate-code.png)


## Conclusion

This document provides a basic introduction to AI assistants. For a more detailed guide, check out the [AI assistants training course](https://spryker.sana.ai/s/pfsZ5F2hSheE/file:8m9CXXP3TjCD).
