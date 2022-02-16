---
title: Building the documentation site
description: Find out how you can build the Spryker documentation site
template: howto-guide-template
---

We use [Jekyll](https://jekyllrb.com/) to build the Spryker documentation site. To build it locally, you need to:

1. Install Jekyll
2. Set up the documentation site locally
3. Run the documentation site locally

## Prerequisites

Before you begin, install the following:

* [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.4.0 or higher, including all development headers. To check your version, run `ruby -v`.
* [RubyGems](https://rubygems.org/pages/download), the latest version. To check your RubyGems version, run `gem -v`.
* [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/). To check your GCC version, run `gcc -v,g++ -v`, for Make version run `make -v`.
  
## Install Jekyll 

Depending on your operating system, follow the Jekyll installation guides below.

### Install Jekyll on MacOS

To install Jekyll on MacOS:

#### 1. Install command line tools
To compile native extensions, install the command line tools:

```bash
xcode-select --install
```

#### 2. Install Ruby
Check your current Ruby version:

```bash
ruby -v
```
If Ruby is not installed or the version is below 2.4.0, do the following: 

 1. Install Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
2. Install Ruby:   
```bash
brew install ruby
```
3. Add the brew Ruby and gems path to your Shell configuration:
    1. Check what Shell you are using:
    ```
    echo $SHELL
    ```
    2. Add the path using one of the following commands:
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
### Install Jekyll on Windows

To install Jekyll on Windows, follow the [official Jekyll on Windows documentation](https://jekyllrb.com/docs/installation/windows/).

### Install Jekyll on Ubuntu

To install Jekyll on Ubuntu, follow the [official Jekyll on Ubuntu documentation](https://jekyllrb.com/docs/installation/ubuntu/).

### Other Linux systems

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

On a MacBook with the M1 processor, run the following command instead::

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

