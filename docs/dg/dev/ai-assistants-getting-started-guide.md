---
title: AI-Assistants getting started guide
description: This is a step-by-step checklist that you can follow through all the stages of working with AI tools in Spryker.
template: concept-topic-template
---

This document provides an overview of the AI Assistants feature in Spryker Cloud Commerce OS. It explains how to set up and configure AI Assistants in your Spryker project. Also, it provides basic examples how to use different tools.

## Important information

Before using any AI-related tool, please consult with the legal department of your organization.

## Install AI Assistants

Spryker Commerce OS could be used with a lot of different tools, however our team recommends to start with the following AI Assistants:
- GitHub Copilot
- Qodo
- Cursor

### Install GitHub Copilot

GitHub Copilot is an AI pair programmer that helps you write code faster. It draws context from comments and code, and suggests individual lines and whole functions instantly.
To start using GitHub Copilot, you need to perform few steps:
- Install the GitHub Copilot [extension](https://plugins.jetbrains.com/plugin/17718-github-copilot) in your IDE.
- Authorize yourself as a GitHub user in the Preferences->Languages and Frameworks-> GitHub Copilot.




And after these small steps, you will be able to use the GitHub Copilot.

### Install Qodo

The setup of the Qodo tool is straightforward. All you need to do is install the following [plugin](https://plugins.jetbrains.com/plugin/21206-qodo-gen-formerly-codiumate-). If the installation was correct, you could check that the plugin works. An example is in the screenshot below.



### Install Cursor

Cursor is an AI powered IDE which is basically a fork from VS Code. To install Cursor, you need to follow the steps above:
- You need to download the installation file from the [official website](https://www.cursor.com/). Once downloaded, run the installer to begin.
- After the successful installation, you need to enable autosave files in the settings to prevent data loss during work. This will ensure your progress is saved automatically.




## Common Use Cases of AI Assistants

### General Description

There are several ways, how you can utilize AI Assistants in your daily work. Here are some examples:
- Code completion tool.
- Describe the selected code fragment.
- Generate doc blocks for the selected code fragment.
- Fix syntax bugs for the selected code fragment.
- Simplify the selected code fragment.
- Generate tests for the selected code fragment.
- IO interaction.

### Code completion tool

GitHub Copilot can generate suggestions based on the existing code inside your project.
The video screenshot will show how it works:




### Describe the selected code fragment

GitHub Copilot can explain the code fragment. The screenshot below will show this in action:




### Generate doc blocks for the selected code fragment

GitHub Copilot can generate doc blocks for a method, as well as add comments to the code. The screenshot below will show this in action.




### Fix syntax bugs for the selected code fragment

GitHub Copilot can suggest how to fix syntax bugs in the method. The screenshot below will show an example:




### Simplify the selected code fragment

GitHub Copilot can refactor a code fragment. The screenshot below will show this in action:




### Generate tests for the selected code fragment

GitHub Copilot can generate tests for the selected code fragment. Video below will show the example:




### IO interaction

You can interact with GitHub Copilot using prompts. An example is in the screenshot below.

In the next example, you'll see how to generate transfer definition XML code using GitHub Copilot IO interaction mode.




### Generate tests using Qodo

Alternatively, tests can be generated using the Qodo tool (formerly CodiumAI). Qodo offers more flexible configuration options and a wider range of test scenarios compared to GitHub Copilot.
The example is in the screenshot below:

### Code generation using Cursor

Cursor AI excels at offering context-aware suggestions by considering the bigger picture within the codebase. This enables it to deliver more accurate and well-structured recommendations, in contrast to GitHub Copilot, which mainly focuses on real-time suggestions based on the specific line of code you're working on.
It's great at generating basic code and significantly saves time, especially when you need to create something from scratch.
An example is in the screenshot below:




## Conclusion

This document provides a step-by-step guide on how to install and configure AI Assistants in your Spryker project. It also provides examples of how to use different AI tools. We hope this guide will help you to get started with AI Assistants in Spryker Cloud Commerce OS. For more details please check our [training course](https://spryker.sana.ai/s/pfsZ5F2hSheE/file:8m9CXXP3TjCD).
