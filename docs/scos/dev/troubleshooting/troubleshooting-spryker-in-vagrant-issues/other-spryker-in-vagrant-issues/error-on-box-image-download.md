---
title: Error on box image download
description: Learn how to to fix the error on box image download
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/error-on-box-image-download
originalArticleId: b2c494e8-3621-463b-9d8b-b175d525d1c7
redirect_from:
  - /2021080/docs/error-on-box-image-download
  - /2021080/docs/en/error-on-box-image-download
  - /docs/error-on-box-image-download
  - /docs/en/error-on-box-image-download
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
