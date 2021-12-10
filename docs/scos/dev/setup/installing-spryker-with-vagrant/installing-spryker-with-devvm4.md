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

## Windows OS prerequisites

If you install the Spryker Demo Shop on Windows, execute the following prerequisites first:

1. Disable Windows firewall. See the [official Microsoft documentation](https://support.microsoft.com/en-us/windows/turn-microsoft-defender-firewall-on-or-off-ec0844f7-aebd-0583-67fe-601ecf5d774f) for details on how to do that.
2. [Disable User Account Control](https://articulate.com/support/article/how-to-turn-user-account-control-on-or-off-in-windows-10).
3. Make sure you execute all the actions (opening PowerShell, running GitBash, installing programs, etc.) as the Administrator.
4. Configure the openSSH Agent service:
    1. [Enable and start OpenSSH](https://dev.to/aka_anoop/how-to-enable-openssh-agent-to-access-your-github-repositories-on-windows-powershell-1ab8).
    2. Run
    ```bash
    eval `ssh-agent -s`
    ```
    {% info_block infoBox "GitBash" %}

    If you use GitBash, the command is

    ```bash
    eval $(ssh-agent -s)
    ```

    {% endinfo_block %}
    3. Run
    ```bash
    ssh-add {path to the ssh key}
    ```
5. [Enable symbolic links](https://community.perforce.com/s/article/3472) and reboot.


## 1. Execute prerequisites

To prepare your environment for the set-up, do the following:

1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). For Windows OS, consider the [Installing Vagrant and Git Bash](https://www.jeevisoft.com/installing-vagrant-and-git-bash/) for the installation.
2. For _macOS, Linux and Windows_: Install [VirtualBox 6.1.26](https://download.virtualbox.org/virtualbox/6.1.26/)
   
{% info_block infoBox "macOS Big Sur" %}

For macOS Big Sur, when you install VirtualBox, click **Open System Preferences**, then proceed to **Mac System Preferences -> Security & Privacy** and allow loading for _VirtualBox and Terminal_:

![masOS settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/setup/installing-spryker-with-vagrant/installing-spryker-with-devvm-version-4.1.0/macos-system-preferences.jpg)

{% endinfo_block %}

For _macOS Monterey_, they still plan to release a new VirtualBox. For now, do the following:
   1. Install [this VirtualBox package](https://www.virtualbox.org/download/testcase/VirtualBox-6.1.29r148140.dmg).
   2. Allow loading of the application the same way as for Big Sur from the previous step. If installation fails, reboot. 
   3. If installation failed at the previous step, install VirtualBox again and reboot.
3. Install [VirtualBox Extension pack 6.1.26](https://download.virtualbox.org/virtualbox/6.1.26/Oracle_VM_VirtualBox_Extension_Pack-6.1.26.vbox-extpack)
   
{% info_block infoBox "macOS Monterey" %}
    
Skip this step if you use macOS Monterey, as there is no VirtualBox Extension for it yet. Solution for macOS Monterey from the previous step fixes this issue.

{% endinfo_block %}
   
4. Install [Vagrant (latest version)](https://www.vagrantup.com/). For Windows OS, consider the [Installing Vagrant and Git Bash](https://www.jeevisoft.com/installing-vagrant-and-git-bash/) for the installation.
5. Remove old *vagrant-vbguest* and *vagrant-hostmanager* plugins and install their new versions:

```bash
vagrant plugin list
vagrant plugin install vagrant-hostsupdater vagrant-hostmanager vagrant-vbguest
```
6. Remove all the Vagrant boxes and old configs from the old directories. To do so:
   1. Run
    ```bash
    vagrant destroy -f
    ```
    2. To obtain the list of the Vagrant boxes to be removed:
    ```bash
    vagrant box list
    ```
    3. Remove the old boxes listed after running the previous step:
    ```bash
    vagrant box remove {vagrant box name}
    ```
    For example, if the `vagrant box list` command returned `devvm3.0.0`, the next command would be:
    ```bash
    vagrant box remove devvm3.0.0
    ```

## 2. Install Spryker virtual machine v. 4.1.0

1. Create a folder where you want to place source code:

```bash
mkdir devvm
cd devvm						
```

2. Initialize the Vagrant environment:
   
```bash
vagrant init devv410 https://u220427-sub1:PpiiHzuF2OIUzmcH@u220427-sub1.your-storagebox.de/devvm_v4.1.0.box
```
3. Update the Vagrantfile.
- For _Linux_ and _macOs_:

```bash
mv Vagrantfile Vagrantfile.bak
awk '/^end/{print " config.hostmanager.enabled = true\n config.hostmanager.manage_host = true"}1' Vagrantfile.bak > Vagrantfile
```
- For _Windows_:
    1. Open the Vagrantfile with any text editor, for example, Notepad:
    
    ```bash
    notepad Vagrantfile
    ```
    2. Add these two lines before _end_ in the Vagrantfile:
    
    ```
    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true
    ```
    3. Save the file.
4. Build and start the virtual machine.
- For a B2B Demo Shop:
  On _Linux_ and _macOs_:
  ```bash
  VM_PROJECT=suite SPRYKER_REPOSITORY="git@github.com:spryker-shop/b2b-demo-shop.git" vagrant up
  ```
  On _Windows_:
  ```bash
  $env:VM_PROJECT = 'suite'; $env:SPRYKER_REPOSITORY = 'git@github.com:spryker-shop/b2b-demo-shop.git'; vagrant up
  ```
- For a B2C Demo Shop:
  <br>On _Linux_ and _macOs_:
  ```bash
  VM_PROJECT=suite SPRYKER_REPOSITORY="git@github.com:spryker-shop/b2c-demo-shop.git" vagrant up
  ```
  On _Windows_:
  ```bash
  $env:VM_PROJECT = 'suite'; $env:SPRYKER_REPOSITORY = 'git@github.com:spryker-shop/b2c-demo-shop.git'; vagrant up
  ```
## 3. Install the shop
1. Log into the virtual machine:
   ```bash
   vagrant ssh
   ```
   {% info_block infoBox "Info" %}

    At this step, consider disabling Xdebug and enabling OPcache so your application runs faster. See [Application runs slowly](/docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/application-runs-slowly.html) for details.

    {% endinfo_block %}
2. Generate a read-only token on GitHub, in [Settings->Developer Settings->Personal access tokens](https://github.com/settings/tokens).
3. Run:
   ```bash
   composer config --global --auth github-oauth.github.com {your_github_token}
   ```
   where `{your_github_token}` is the GitHub token you generated in the previous step.
4. Run the installation commands:
   ```bash
   composer install
   vendor/bin/install
   ```

{% info_block infoBox "Info" %}

If your infrastructure presupposes different entry points, note the ports mapping and LEDDC. See [Port numbering](https://github.com/spryker/devvm/tree/develop/saltstack#port-numbering) for details.

{% endinfo_block %}

When the installation process is complete, Spryker Commerce OS is ready to use. It can be accessed via the following links:

**B2B Demo Shop:**
* `http://de.b2b-demo-shop.local` - front-end (Storefront);
* `http://zed.de.b2b-demo-shop.local` - backend (the Back Office).
* `http://glue.de.b2b-demo-shop.local` - REST API (Glue).

**B2C Demo Shop:**
* `http://de.b2c-demo-shop.local/` - front-end (Storefront);
* `http://zed.de.b2c-demo-shop.local` - backend (the Back Office).
* `http://glue.de.b2c-demo-shop.local` - REST API (Glue).

Credentials to access the administrator interface: user `admin@spryker.com` and password `change123`.