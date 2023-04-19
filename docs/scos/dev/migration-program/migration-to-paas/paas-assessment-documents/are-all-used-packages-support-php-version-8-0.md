---
title: Are all used packages support PHP Version >=8.0?
description: This document allows you to assess if all used packages support PHP Version >=8.0.
template: howto-guide-template
---

# Are all used packages support PHP Version >=8.0?

{% info_block infoBox %}

Resources: Backend

{% endinfo_block %}

## Description

1. Run the `why-not` command from composer and see how many packages are not compatible with PHP 8.0:
    ```bash
    composer why-not php 8.0
    ```
2. Use the list of packages to understand the effort of migration.

## Formula

1. ONLY IF MODULES HAVE PHP 8 support:
    * Approx 2h-4h per major
    * Approx 1h per minor/patch 
2. IF MODULES DO NOT HAVE PHP 8 support:
   * Additional investigation is needed
