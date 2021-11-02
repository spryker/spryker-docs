---
title: .NFS files crash my console commands
description: Learn how to fix the issue when .NFS files crash the console commands
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/nfs-files-crash-my-console-commands
originalArticleId: 70361f23-5559-4d46-87bd-408d3b704061
redirect_from:
  - /2021080/docs/nfs-files-crash-my-console-commands
  - /2021080/docs/en/nfs-files-crash-my-console-commands
  - /docs/nfs-files-crash-my-console-commands
  - /docs/en/nfs-files-crash-my-console-commands
  - /v6/docs/nfs-files-crash-my-console-commands
  - /v6/docs/en/nfs-files-crash-my-console-commands
---

## Description

You can get the following error when running `vendor/bin/console` or console commands inside the development VM:

```
Error: ENOTEMPTY, directory not empty
'/data/shop/development/current/static/public/Yves/images/icons' at Error (native)
```
## Cause
The issue is caused by peculiarities of the NFS file system design.

## Solution
Make sure you have the latest version of the VM installed and also disable the Ngnix `open_file_cache` feature. To do so, execute the following commands:

```bash
sudo grep -r open_file_cache /etc/nginx/
/etc/nginx/nginx.conf:  open_file_cache off;
```

To get the latest Saltstack for your VM and reconfigure Nginx, do the following:

```bash
# on your host
cd vendor/spryker/saltstack # (or where you have the Saltstack repository on your host)
git pull
# inside the vm
sudo salt-call state.highstate whitelist=nginx
```
### Mac OSX
If you are running Mac OSX as a host system: disable Spotlight for your Code directory. For details, see: [How to disable spotlight index for specific folder in Mac OS X](http://www.techiecorner.com/254/how-to-disable-spotlight-index-for-specific-folder-in-mac-os-x/).

To remove stale .nfs files, execute the following either on your host or inside the VM:

```bash
find . -name .nfs\* -exec rm {} \;
```
