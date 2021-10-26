---
title: Mac OSX- Wrong curl version error
description: Learn how to fix an error about a wrong curl version on Mac OS
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mac-osx-wrong-curl-version-error
originalArticleId: 7d83f9dd-33f1-4282-89e4-4a4e24b5c8b0
redirect_from:
  - /2021080/docs/mac-osx-wrong-curl-version-error
  - /2021080/docs/en/mac-osx-wrong-curl-version-error
  - /docs/mac-osx-wrong-curl-version-error
  - /docs/en/mac-osx-wrong-curl-version-error
  - /v6/docs/mac-osx-wrong-curl-version-error
  - /v6/docs/en/mac-osx-wrong-curl-version-error
---

## Description
You can receive an error about a wrong curl version on Mac OS.


## Solution

Run the following command:

```bash
sudo rm -rf /opt/vagrant/embedded/bin/curl
```
