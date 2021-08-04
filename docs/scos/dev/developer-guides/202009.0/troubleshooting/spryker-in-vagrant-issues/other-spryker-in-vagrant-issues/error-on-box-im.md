---
title: Error on box image download
originalLink: https://documentation.spryker.com/v6/docs/error-on-box-image-download
redirect_from:
  - /v6/docs/error-on-box-image-download
  - /v6/docs/en/error-on-box-image-download
---

## Description
When downloading Spryker VM box image file, an error occurs.

## Solution
Try running Vagrant with debug to see potential errors: `vagrant up --debug`. 

Also, you can go to [Spryker VM Releases](https://github.com/spryker/devvm/releases/) page and download the box manually. After finishing the box download, you need to run the following:

```bash
vagrant box add /path/to/downloaded/image/file.box --name <boxname>
vagrant up
```
