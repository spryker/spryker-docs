---
title: Installing Spryker with DevVM version 4.1.0
description: This article provides step-by-step instructions on the B2B or B2C Demo Shop installation on Mac OS, Linux, and Windows with Development Virtual Machine version 4.1.0.
last_updated: Dec 10, 2021
template: howto-guide-template
---

The 4.1.0 version of the Development Virtual Machine (DevVM) was released due to Virtualbox and Vagrant updates, as the old DevVM version had issues with the old DevVM boxes and Vagrant configs.

The release of the DevVM version 4.1.o also includes fixes for: 

- Virtualbox and Vagrant release 6.1.26
- New Virtualbox and Vagrant releases 6.1.26+
- Configuration of the network connections

To install the Demo Shop for [B2B](/docs/scos/user/intro-to-spryker/b2b-suite.html) or [B2C](/docs/scos/user/intro-to-spryker/b2c-suite.html) implementations on MacOs, Linux or Windows, with DevVM version 4.1.0, follow the steps below.

## System requirements

- CPU Intel: i5, i7, i9 6th generation or higher, AMD CPU models after 2018 
x64 CPU and OS with virtualization support in CPU 

{% info_block infoBox "Info" %}

M1 MacBooks are not supported yet

{% endinfo_block %}

- Free disk space of 40GB on storage type SSD or NVME (recommended)
- Memory 16GB, 32GB or higher (recommended)

## 1. Install prerequisites

To prepare your environment for the set-up, do the following:

* Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* Install [VirtualBox 6.1.26](https://download.virtualbox.org/virtualbox/6.1.26/)
* Install [VirtualBox Extension pack 6.1.26](https://download.virtualbox.org/virtualbox/6.1.26/Oracle_VM_VirtualBox_Extension_Pack-6.1.26.vbox-extpack)
* Install [Vagrant (latest version)](https://www.vagrantup.com/)
* Remove old *vagrant-vbguest* and *vagrant-hostmanager* plugins and install their new versions:



