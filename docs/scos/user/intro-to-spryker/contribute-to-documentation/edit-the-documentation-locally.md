This document describes how to you can edit documents on your machine and submit your changes directly to our repository.

## Prerequisites

* Account on [GitHub](github.com).
* [GitHub Desktop](https://desktop.github.com/).
* Editor of your choice. We recommend [Visual Studio Code](https://code.visualstudio.com/) or similar editors which let you browse files.

## Clone the Spryker docs repository

1. Open GitHub Desktop.
2. Go to the [Spryker docs repository](https://github.com/spryker/spryker-docs).
-
3. Click **Code** > **Open with GitHub Desktop**.
    You may need to allow opening links in the desktop application. This opens GitHub Desktop with the **Clone a Repository** window. The fields are pre-filled.

![Open with GitHub Desktop](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/3041132680/Creating+pull+requests+on+GitHub)

4. Optional: For **Local Path**, click **Choose** and select a suitable location to store the repository.
5. Click **Clone**.
    This clones the repository to your machine. When finished, you can see the current state of the repository on your machine. The **Current Branch** is **master**.
-

6. To change the branch, click **Current Branch** > **New Branch**.
    This opens the **Create a Brunch** window.
7. For **Name**, enter a branch name that would best describe your changes.
    The app automatically replaces spaces in branch names with hyphens. You don't have to do anything about it.
8. Click **Create Branch**.
    This changes the **Current Branch** to the branch name you've entered. The branch exists only on your machine.
9. To add the branch to our repository on GitHub, click **Publish branch**.
-


## Find the documents you want to edit on your machine

-

At this point, you are most likely to know which document you want to edit. To find the document on your machine, you need to look up its path in the URL. Open the document on our website and check the path starting from `/docs/`. For example, the URL of the document you are reading is `https://docs.spryker.com/docs/scos/user/intro-to-spryker/contribute-to-the-documentation/edit-the-documentation-locally.html`. The path of this document on your machine is `docs/scos/user/intro-to-spryker/contribute-to-the-documentation/edit-the-documentation-locally.md`. The path is relative to where you chose to store the repository.

-

## Edit documents

1. Open the document you want to edit in an editor.
2. Add the needed changes.
    You'd help us a lot by following [Markdown syntax](/docs/scos/user/intro-to-spryker/contribute-to-documentation/markdown-syntax.html) and [general rules](https://docs.spryker.com/docs/scos/user/intro-to-spryker/contribute-to-documentation/style-formatting-general-rules.html), but it's completely optional. We are grateful for your contribution in any form.
3. Save the edited document.
4. In GitHub Desktop, double-check your changes in the **Changes** tab.
5. Optional: Below the list of edit files, enter the name and description of your changes.
6. To add your changes to the branch, click **Commit to {BRANCH_NAME}**.
7. To publish the changes on GitHub, click **Push origin**.
    If you are editing in several sessions, it is good practice to commit and push after each session. If something happens to the changes on your machine, they will be safe on GitHub, and you will be able to keep working on them.

## Submit changes for publishing

1. To prepare the changes to be published on the documentation website, click **Create Pull Request**.
    This opens the **Open a pull request** page with prefilled name and description.
2. Optional: Update the name to describe your changes.     
3. Add a description of what you've changed.
4. Click **Create pull request**.
    This refreshes the page and displays the created pull request. The status is **Open**.

That's it. We'll take it from here. During review, we can post comments for your changes. Notifications about comments and PR status changes will be emailed to the email address of your GitHub account.     
