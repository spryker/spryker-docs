---
title: Mac OSX - iterm2 (locale error)
description: Learn how to fix the issue with Mac OSX- iterm2 (locale error)
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mac-osx-iterm2-locale-error
originalArticleId: e6923c4f-7d41-41f7-ae5b-10b7efaf27f2
redirect_from:
  - /2021080/docs/mac-osx-iterm2-locale-error
  - /2021080/docs/en/mac-osx-iterm2-locale-error
  - /docs/mac-osx-iterm2-locale-error
  - /docs/en/mac-osx-iterm2-locale-error
  - /v6/docs/mac-osx-iterm2-locale-error
  - /v6/docs/en/mac-osx-iterm2-locale-error
related:
  - title: Mac OSX - Installation fails or project folder can not be mounted because of SIP
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/macos-issues/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip.html
  - title: Mac OSX - Wrong curl version error
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/macos-issues/mac-osx-wrong-curl-version-error.html
---

## Description

You can encounter error messages like this one:

```bash
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
LANGUAGE = (unset),
LC_ALL = (unset),
LC_CTYPE = "de_DE.UTF-8",
LANG = "C"
are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
LANGUAGE = (unset),
LC_ALL = (unset),
LC_CTYPE = "de_DE.UTF-8",
LANG = "C"
are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
```

## Solution

Go to iterm2 Preferences -> Profiles -> Terminal and disable option *Set locale variables automatically*.
