# Spryker documentation

This repository contains the documentation for the [Spryker documentation portal](https://docs.spryker.com).

## Installation

To build the documentation site locally, see [buidling the documentation site](https://docs.spryker.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/building-the-documentation-site.html).

### Build with Docker

To build the documentation site with Docker, run this command:
`docker run --rm --volume="$PWD:/srv/jekyll" --volume="$PWD/vendor/bundle:/usr/local/bundle" -p 4000:4000 jekyll/jekyll:4.2.0 jekyll serve --incremental --livereload`

#### Install Vale
Vale documentation [https://vale.sh/](https://vale.sh/)
##### Windows
In terminal run command:
`choco install vale`
if you don't have `choco` read [https://chocolatey.org/](https://chocolatey.org/)

##### macOS
In terminal run command:
`brew install vale`
if you don't have `brew` read [https://brew.sh/](https://brew.sh/)

##### Linux
In terminal run command:
`brew install vale`
if you don't have `brew` read [https://docs.brew.sh/Homebrew-on-Linux](https://docs.brew.sh/Homebrew-on-Linux)

After installations you need run command `vale <path>/<name file>.md`,
ag: `vale docs/acp/user/apps/payone.md`


## To contribute

1. [Fork](https://help.github.com/articles/fork-a-repo/) the repository.
3. In your forked repository, go to the document you want to edit.
    The actual documents are in the `docs` directory.
4. Click the pencil icon in the top right menu.
5. Once you edited the document, write a message briefly explaining what you changed and click  **Propose changes**.
    This shows a diff of your changes compared to the current version of the master branch.
6.	Click **Create pull request**.
7.	To confirm the creation, click **Create pull request** again.
8. Set a respective [label](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels#applying-a-label) for your pull request (*in progress*, *tech review needed*, *TW review needed*, etc.) so we know that it's ready for review and merge.


**Markup language, style, and formatting**
For the specific Markdown syntax we use in documentation, see [Markdown syntax](/docs/scos/user/intro-to-spryker/contributing-to-documentation/markdown-syntax.html). For the general style, syntax, and formatting rules, see [Style, syntax, formatting, and general rules](/docs/scos/user/intro-to-spryker/contributing-to-documentation/style-formatting-general-rules.html).


That’s it! Your pull request has been created. Our Documentation team will review it, and once approved, your changes will be merged and available on the documentation website.
