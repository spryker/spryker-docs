---
title: Are all used packages support PHP Version >=8.0?
description: This document allows you to assess if all used packages support PHP Version >=8.0.
template: howto-guide-template
---


Check how many packages are not compatible with PHP 8.0:

```bash
composer why-not php 8.0
```
This should let you estimate the migration effort.


## Resources

Backend

## Formula

* If modules support PHP 8.O:
    * Approximately 2h-4h per major.
    * Approximately 1h per minor or patch.
* If modules don't support PHP 8.O:
   * Additional investigation is needed.
