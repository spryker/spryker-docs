---
title: Building the documentation site
description: Find out how you can build the Spryker documentation site
template: howto-guide-template
---

We use [Jekyll](https://jekyllrb.com/) to build the Spryker documentation site. To build the local copy of it, you need to:

1. Install Jekyll
2. Install the documentation site locally
3. Run the documentation site locally

## Prerequisites

Before you begin, install the following:

* [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.4.0 or higher, including all development headers. To check your Ruby version, run `ruby -v`.
* [RubyGems](https://rubygems.org/pages/download), the latest version. To check your RubyGems version, run `gem -v`.
* GCC and Make. To check your GCC version, run `gcc -v,g++ -v`, for Make version run `make -v`.
  
## Install Jekyll 

Depending on your operating system, follow the Jekyll installation guides below.

### MacOS

To install Jekyll on MacOS, do the following:

#### 1. Install command line tools
To compile native extensions, install the command line tools by running:

```bash
xcode-select --install
```

#### 2. Install Ruby
Jekyll requires Ruby version 2.4.0 to run. If you already have Ruby installed, you can check its version by running

```bash
ruby -v
```
 If you don't have Ruby installed yet, or your Ruby version is lower than 2.4.0, do the following:

 1. Install Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
2. Install Ruby:   
```bash
brew install ruby
```
3. Add the brew Ruby and gems path to your Shell configuration: 
```bash
# If you're using Zsh
echo 'export PATH="/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/3.0.0/bin:$PATH"' >> ~/.zshrc

# If you're using Bash
echo 'export PATH="/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/3.0.0/bin:$PATH"' >> ~/.bash_profile

# Unsure which shell you are using? Type
echo $SHELL
```
#### 3. Install Jekyll and Bundler
1. Install Jekyll and Bundler gems:
```bash
gem install --user-install bundler jekyll
```
2. Check the installed Ruby version:
```bash
ruby -v
ruby 3.0.0p0 (2020-12-25 revision 95aff21468)
```  
3. Append your path file with the following one, replacing X.X with the first two digits of your Ruby version:
```bash
# If you're using Zsh
echo 'export PATH="$HOME/.gem/ruby/X.X.0/bin:$PATH"' >> ~/.zshrc

# If you're using Bash
echo 'export PATH="$HOME/.gem/ruby/X.X.0/bin:$PATH"' >> ~/.bash_profile

# Not which Shell you are using? Type
echo $SHELL
```
### Windows

To install Jekyll on Windows, follow the [official Jekyll on Windows documentation](https://jekyllrb.com/docs/installation/windows/).

### Ubuntu

To install Jekyll on Ubuntu, follow the [official Jekyll on Ubuntu documentation](https://jekyllrb.com/docs/installation/ubuntu/).

### Other Linux systems

To install Jekyll on other Linux systems, follow the [official Jekyll on Linux documentation](https://jekyllrb.com/docs/installation/other-linux/).

## Install the documentation site locally

After you installed Jekyll, you should the documentation site locally. Do the following:

1. Clone the Spryker Documentation repository and go to the newly created directory:
```bash
git clone git@github.com:spryker/spryker-docs.git ./spryker-docs
cd spryker-docs
```
2. Install all the necessary dependencies with Bundler:
```bash
bundle install
```
{% info_block infoBox "MacOS on M1 processor" %}

If you use the latest generation of MacBooks running on M1 processors,  prefix this command like this:

```bash
arch -arch x86_64 bundle install
```

{% endinfo_block %}

## Run the documentation site locally

Now that you have Jekyll and the documentation site installed, you can run the site locally. Do the following:

1. Go to the local documentation site directory:
```bash
cd spryker-docs
```
2. Run:
```bash
bundle exec jekyll serve
```
Now, you can access the local copy of the Spryker documentation site at http://localhost:4000.

{% info_block infoBox "MacOS on M1 processor" %}

If you use the latest generation of MacBooks running on M1 processors,  prefix this command like this:

```bash
arch -arch x86_64 bundle exec jekyll serve
```

{% endinfo_block %}
 
## Tips and tricks

* To regenerate only those pages that were added or updated since the last build, use this command:
```bash
bundle exec jekyll serve --incremental
```
* To automatically refresh the page with each change you make to the source files, use this command:
```bash
bundle exec jekyll serve --incremental --livereload
```

