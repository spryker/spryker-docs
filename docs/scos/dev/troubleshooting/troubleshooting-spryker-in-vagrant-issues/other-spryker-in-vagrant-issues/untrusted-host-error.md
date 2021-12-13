---
title: Untrusted host error
description: Fix the issue when the Spryker application runs slowly
template: troubleshooting-guide-template
---

## Description

When browsing your project after installation, you get an error like this one:

![Untrusted host error](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/untrusted-host-error.png)

## Solution

To fix the issue, do the following:

1. Go to your project directory folder, to file `{your_project}/project/config/shared/config_default-development.php`.
2. Replace the `$domain` variable with the project name you used when starting the virtual machine. For example, if you used the `newshop` name in command `VM_PROJECT=newshop SPRYKER_REPOSITORY="git@github.com:spryker-shop/b2c-demo-shop.git" vagrant up`, then your change in the `config_default-development.php` file will look like this:

```
// ###########################################################
// ##################### DEVELOPMENT IN DEVVM ################
// ###########################################################

$domain = 'newshop';
```

