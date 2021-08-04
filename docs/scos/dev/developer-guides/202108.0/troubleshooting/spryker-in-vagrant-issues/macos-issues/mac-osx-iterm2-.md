---
title: Mac OSX- iterm2 (locale error)
originalLink: https://documentation.spryker.com/2021080/docs/mac-osx-iterm2-locale-error
redirect_from:
  - /2021080/docs/mac-osx-iterm2-locale-error
  - /2021080/docs/en/mac-osx-iterm2-locale-error
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
