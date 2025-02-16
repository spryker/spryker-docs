# Spryker documentation

This repository contains the documentation for the [Spryker documentation portal](https://docs.spryker.com).

## Installation

To build the documentation site locally, see [building the documentation site](https://docs.spryker.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/building-the-documentation-site.html).

### Build with Docker

To build the documentation site with Docker, run this command:
`docker run --rm --volume="$PWD:/srv/jekyll" --volume="$PWD/vendor/bundle:/usr/local/bundle" -p 4000:4000 jekyll/jekyll:4.2.0 jekyll serve --incremental --livereload`

## Contribute

For the specific Markdown syntax we use in documentation, see [Markdown syntax](/docs/about/all/contributing-to-documentation/markdown-syntax.html). For the general style, syntax, and formatting rules, see [Style, syntax, formatting, and general rules](/docs/about/all/contributing-to-documentation/style-formatting-general-rules.html).

To suggest changes, follow the steps:

1. [Fork](https://help.github.com/articles/fork-a-repo/) the repository.
2. In your forked repository, go to the document you want to edit.
    The actual documents are in the `docs/` directory.
3. To edit the document, click the pencil icon in the top right menu.
4. Add the needed changes.
5. In the **Commit changes** pane, describe your changes and click **Commit changes**.
    This shows the updated document.
6. To go to the main page of the repository, click **Code**.
7. Next to **This branch is 1 commit ahead of spryker:master.**, click **Contribute** > **Open pull request**.
8. Enter a **Title**.
9. For **Write**, enter a description of your changes.
10. Click **Create pull request**.
11. To confirm that the PR is ready to merge, set a [label](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels#applying-a-label), like **in progress**, **tech review needed**, or **TW review needed**.

That's it! Your pull request has been created. Once we review and approve the changes, they will be published on the documentation website.

## Contributors

Thank you to all our contributors!

<a href="https://github.com/spryker/spryker-docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=spryker/spryker-docs" />
</a>
