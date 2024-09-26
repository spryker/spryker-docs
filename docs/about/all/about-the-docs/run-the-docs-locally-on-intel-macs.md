---
title: Run the docs locally on Intel Macs
description: Find out how you can build the Spryker documentation site
last_updated: Jul 18, 2022
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

This document describes how to run Spryker docs on Intel-based Macs. For instructions for M-series Macs, see [Run the docs locally](/docs/about/all/about-the-docs/run-the-docs-locally-on-intel-macs-linux-and-widnows.html).


## 1. Install Homebrew and Make

1. Install Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install Make:

```bash
brew install make
```

## 2. Set up the Spryker docs repository

{% info_block warningBox "Duplicate repositories" %}

If you previously edited Spryker docs on your machine, instead of cloning it, just go to its folder. If you cloned it using GitHub Desktop, the repository should be in `Documents/GitHub/spryker-docs`. To go there, run `cd Documents/GitHub/spryker-docs`.

{% endinfo_block %}

Clone the Spryker docs repository and go to the newly created directory:
```bash
git clone git@github.com:spryker/spryker-docs.git ./spryker-docs
cd spryker-docs
```


## 3. Install RVM and Ruby

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

## 4. Install Jekyll and Bundler

1. Install Jekyll and Bundler gems:
```bash
gem install --user-install bundler jekyll
```

2. Install dependencies:

```bash
bundle install
```


## Build the docs

Build the website:
```bash
bundle exec jekyll serve
```

Now, you can access the local instance in a browser at `http://localhost:4000`.


## Tips and tricks

* To regenerate only those pages that were added or updated since the last build, build the site with the following command:
```bash
bundle exec jekyll serve --incremental
```
* To automatically refresh the page with each change you make to the source files, build the site with the following command:
```bash
bundle exec jekyll serve --incremental --livereload
```







<!---

### Install Jekyll on Windows, Ubuntu, or other Linux systems

#### Prerequisites

To use Jekyll on Windows, Ubuntu, or other Linux systems, you also need to install the following:

* [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.4.0 or higher, including all development headers. To check your version, run `ruby -v`.
* [RubyGems](https://rubygems.org/pages/download), the latest version. To check your RubyGems version, run `gem -v`.
* [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/). To check your GCC version, run `gcc -v,g++ -v`, for Make version run `make -v`.


#### Install Jekyll on Windows

To install Jekyll on Windows, follow the [official Jekyll on Windows documentation](https://jekyllrb.com/docs/installation/windows/).

#### Install Jekyll on Ubuntu

To install Jekyll on Ubuntu, follow the [official Jekyll on Ubuntu documentation](https://jekyllrb.com/docs/installation/ubuntu/).

#### Other Linux systems

To install Jekyll on other Linux systems, follow the [official Jekyll on Linux documentation](https://jekyllrb.com/docs/installation/other-linux/).

--->
