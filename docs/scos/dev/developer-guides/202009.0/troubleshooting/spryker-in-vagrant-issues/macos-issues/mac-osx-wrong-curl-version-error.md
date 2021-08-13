---
title: Mac OSX- Wrong curl version error
description: Learn how to fix an error about a wrong curl version on Mac OS
originalLink: https://documentation.spryker.com/v6/docs/mac-osx-wrong-curl-version-error
originalArticleId: 1b79ec8e-4924-4ccb-b2fe-b9d299727b13
redirect_from:
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
