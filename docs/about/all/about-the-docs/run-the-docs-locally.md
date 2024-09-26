---
title: Run the docs locally
description: Learn how to build Spryker docs
last_updated: Sep 18, 2024
template: howto-guide-template
redirect_from:
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/building-the-documentation-site.html
  - /docs/scos/user/intro-to-spryker/contribute-to-the-documentation/build-the-documentation-site.html

related:
  - title: Add product sections to the documentation
    link: docs/about/all/about-the-docs/contribute-to-the-docs/add-global-sections-to-the-docs.html
  - title: Edit documentation via pull requests
    link: docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-using-a-web-browser.html
  - title: Report documentation issues
    link: docs/about/all/about-the-docs/contribute-to-the-docs/report-docs-issues.html
  - title: Review pull requests
    link: docs/about/all/about-the-docs/contribute-to-the-docs/review-docs-pull-requests.html
  - title: Markdown syntax
    link: docs/about/all/about-the-docs/style-guide/markdown-syntax.html
---

We use [Jekyll](https://jekyllrb.com/) to build Spryker docs. You can run Spryker docs on your own machine. This is usually useful when you want to edit some docs and see the changes before submitting a PR.

This document describes how to run Spryker docs on a MacBook with an M-series processor. For instructions for intel-based MacBooks, see []().


## Prerequisites


* To enable Rosetta for Terminal, follow the steps:

  1. In Finder, go to **Applications**>**Utilities**.
  2. Right-click **Terminal** and select **Get Info**.
    This opens the **Terminal Info** window.
  3. Select **Open using Rosetta**.

* Check the shell you're using:
```bash
echo $SHELL
```

This should be either `zsh` or `bash`; you will need this information later.



## 1. Install Homebrew


1. Install Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
This installs Homebrew and gives you the instructions to use in the next step.


2. To add Homebrew to your path, follow the instructions provided in the output of the previous command. Here's an example of the commands, which you need to run one by one.

![homebrew-next-steps](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/about-the-docs/run-the-docs-locally.md/homebrew-next-steps.png)

Running these commands should give no output.

Alternately, manually add Homebrew to your path using the instructions in the following sections.

### Manually add Homebrew to PATH

1. Open `.zprofile` in the editor:
```bash
nano ~/.zprofile
```

2. Add the following:
```bash
# Set PATH, MANPATH, etc., for Homebrew.
eval "$(/opt/homebrew/bin/brew shellenv)"
```

3. To save changes, press **control + o**.
4. To confirm, press **return**.
5. To close the editor, click **control x**.


## 2. Install Make

```bash
brew install make
```

## 3. Set up the Spryker docs repository

{% info_block warningBox "Duplicate repositories" %}

If you previusly edited Spryker docs on your machine, instead of cloning it, just go to its folder. If you cloned it using GitHub Desktop, the repository should be in `Documents/GitHub/spryker-docs`. To go there, run `cd Documents/GitHub/spryker-docs`.

{% endinfo_block %}

Clone the Spryker docs repository and go to the newly created directory:
```bash
git clone git@github.com:spryker/spryker-docs.git ./spryker-docs
cd spryker-docs
```

## 3. Install Ruby

1. Import RVM keys:
```bash
curl -sSL https://rvm.io/mpapis.asc | gpg --import -
```

```bash
curl -sSL https://rvm.io/pkuczynski.asc | gpg --import -
```

2. Instal RVM:

```bash
curl -sSL https://get.rvm.io | bash -s stable
```

3. Install Ruby 3.2.2:
```bash
rvm install 3.2.2
```

4. Depending on your shell type, add Ruby 3.2.2 to your environment in one of the following ways:
  * Zsh:
  ```bash
  echo 'export PATH="$HOME/.gem/ruby/3.2.2/bin:$PATH"' >> ~/.zshrc
  ```
  * Bash:
  ```bash
  echo 'export PATH="$HOME/.gem/ruby/3.2.2/bin:$PATH"' >> ~/.bash_profile
  ```



### 4. Install Jekyll and Bundler

1. Install Jekyll and Bundler gems:
```bash
gem install --user-install bundler jekyll
```

2. Install dependencies:

```bash
arch -arch x86_64 bundle install
```


## Build the docs

Build the website:
```bash
arch -arch x86_64 bundle exec jekyll serve
```

Now, you can access docs at `http://localhost:4000`.



## Tips and tricks

* To regenerate only those pages that were added or updated since the last build, build the site with the following command:
```bash
arch -arch x86_64 bundle exec jekyll serve --incremental
```

* To automatically refresh the page with each change you make to the source files, build the site with the following command:
```bash
arch -arch x86_64 bundle exec jekyll serve --incremental --livereload
```
