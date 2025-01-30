---
title: Run the docs locally
description: Learn how to Build and run Spryker Documentation directly on your local machine with this guide.
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

We use [Jekyll](https://jekyllrb.com/) to build the Spryker documentation site. To build it locally, you need to:

1. Install Jekyll
2. Set up the documentation site locally
3. Run the documentation site locally


## Install Jekyll

Depending on your operating system, follow the Jekyll installation guides below.

### Install Jekyll on MacOS

The installation process is different depending whether you are using a Mac with an Intel processor or with a Silicon M1 chip. To find out whether you have an Intel or a Silicon M1 Mac, click the **Apple** menu and choose **About This Mac**.

* Silicon Macs with the M1 processor show an item labeled _Chip_ followed by the name of the Apple chip.

* Intel-based Macs show an item labeled _Processor_ followed by the name and/or model number of the Intel processor.

{% info_block warningBox "MacOS on M1 processor – Open Terminal using Rosetta" %}

On a MacBook with the M1 processor, make sure your Terminal is opened with Rosetta 2, by following the instructions here. Rosetta is a translation layer that enables non-native Intel x86 apps, including Homebrew, to run on Apple Silicon Macs.
To open your terminal using Rosetta, follow these steps:
1.	Open a _Finder_ window.
2.	In _Applications_, locate _Terminal_.
3.	Right click on **Terminal** and select **Get Info**.
4.	Make sure _Open using Rosetta_ is checked.

{% endinfo_block %}

On either an M1 or an Intel Mac, follow the steps below to install Jekyll. M1-specific instructions appear as notes wherever necessary.  

#### 1. Install Homebrew

Homebrew is a package manager for macOS because by default Mac doesn't have a package manager. You use Homebrew to install Ruby in the next step. Additionally, when you install Homebrew, Xcode command line tools and GCC are also installed automatically.

To install Homebrew, follow these steps:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
{% info_block infoBox "MacOS on M1 processor" %}

On an M1 Mac, Homebrew files are installed into the `/opt/homebrew` folder. Because this folder is not part of the default $PATH, you need to follow the next steps that Homebrew includes at the end of the installation output to add Homebrew to your PATH. In the example below, we've replaced your actual username with:  `/Users/_username_/.zprofile`.

```bash
==> Next steps:
- Run these three commands in your terminal to add Homebrew to your PATH:
    echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/_username_/.zprofile
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/_username_/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
```

Alternately, or if you have problems using these commands to update your PATH, you can add Homebrew to your .zprofile file. First, run the following command:
```bash
nano ~/.zprofile
```

If the profile file has not yet been created on your system, this command creates a new one. If the file already exists, this command opens it.

To add Homebrew, paste this text into the .zprofile file open in your terminal:
```bash
# Set PATH, MANPATH, etc., for Homebrew.
eval "$(/opt/homebrew/bin/brew shellenv)"
```
To save the updated .zprofile file, click **control o**. Then, to exit the .zprofile file, click **control x**.

{% endinfo_block %}

#### 2. Install Make

```bash
brew install make
```

#### 3. Install Ruby
Check your current Ruby version:

```bash
ruby -v
```
{% info_block infoBox "Don't use system Ruby" %}

You should not use the Ruby version that came pre-installed with your Mac. Apple includes an older, non-updatable version of Ruby on macOS for compatibility with legacy software.

{% endinfo_block %}

If you have not yet installed a recent Ruby version, install Ruby:

```bash
brew install ruby
```
Add the brew Ruby and gems path to your shell configuration:
1. Check what shell you are using:
    ```
    echo $SHELL
    ```
2. Depending which shell you are using, add the path using one of the following commands:
   * Zsh:
        ```bash
        echo 'export PATH="/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/3.0.0/bin:$PATH"' >> ~/.zshrc
        ```
   * Bash:
        ```bash
        echo 'export PATH="/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/3.0.0/bin:$PATH"' >> ~/.bash_profile
        ```

#### 3. Install Jekyll and Bundler
1. Install Jekyll and Bundler gems:
```bash
gem install --user-install bundler jekyll
```
2. Check the installed Ruby version:
```bash
ruby -v
```  
3. Append your path file with the following, replacing `X.X` with the first two digits of the Ruby version you've checked in the previous step:
    * Zsh:
    ```bash
    echo 'export PATH="$HOME/.gem/ruby/X.X.0/bin:$PATH"' >> ~/.zshrc
    ```
    * Bash:
    ```bash
    echo 'export PATH="$HOME/.gem/ruby/X.X.0/bin:$PATH"' >> ~/.bash_profile
    ```

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

## Set up the Spryker documentation site locally

To set up the Spryker documentation site locally:

1. Clone the Spryker documentation repository and go to the newly created directory:
```bash
git clone git@github.com:spryker/spryker-docs.git ./spryker-docs
cd spryker-docs
```
2. Install all the necessary dependencies with Bundler:
```bash
bundle install
```
{% info_block infoBox "MacOS on M1 processor" %}

On a MacBook with the M1 processor, run the following command instead:

```bash
arch -arch x86_64 bundle install
```

{% endinfo_block %}

## Run the documentation site locally

To run Spryker documentation site locally:

1. Go to the local documentation site directory:
```bash
cd spryker-docs
```
2. Build the site:
```bash
bundle exec jekyll serve
```
Now, you can access the local copy of the Spryker documentation site at `http://localhost:4000`.

{% info_block infoBox "MacOS on M1 processor" %}

On a MacBook with the M1 processor, run the following command instead:

```bash
arch -arch x86_64 bundle exec jekyll serve
```

{% endinfo_block %}

## Tips and tricks

* To regenerate only those pages that were added or updated since the last build, build the site with the following command:
```bash
bundle exec jekyll serve --incremental
```
* To automatically refresh the page with each change you make to the source files, build the site with the following command:
```bash
bundle exec jekyll serve --incremental --livereload
```
