---
title: Mac OSX- Wrong curl version error
originalLink: https://documentation.spryker.com/2021080/docs/mac-osx-wrong-curl-version-error
redirect_from:
  - /2021080/docs/mac-osx-wrong-curl-version-error
  - /2021080/docs/en/mac-osx-wrong-curl-version-error
---

## Description
You can receive an error about a wrong curl version on Mac OS.


## Solution

Run the following command:

```bash
sudo rm -rf /opt/vagrant/embedded/bin/curl
```
