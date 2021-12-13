---
title: Long file or directory names
description: Fix the issue with the long file or directory names on Windows
template: troubleshooting-guide-template
---

## Description

When a file, directory, or subdirectory name is too long, an error appears.

## Solution
1. To add fixes to the registry, run [this REG file](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/setup/installing-spryker-with-vagrant/installing-spryker-with-devvm-version-4.1.0/long_paths_fix.reg).
2. Reboot your PC.
3. Run the following command as administrator:
   ```bash
   git config --system core.longpaths true
   ```