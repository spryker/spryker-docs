---
title: Has multi-store support?
description: This document allows you to assess if a project has multi-store support.
template: howto-guide-template
---

# Has multi-store support?

{% info_block infoBox %}

Resources: Backend

{% endinfo_block %}

## Description

This assessment step doesn’t have migration instructions, it’s necessary to know to understand overall additional efforts
for project migration.

* Navigate to `config/Shared/stores.php` and see the multi-store settings.
* Clarify with the customer how much different multi-store concept usage is from the default Spryker multi-store concept:
    * Is it single DB per store?
    * Do stores getting deployed simultaneously?
    * How do URLs build per store?
    * etc.

Having this information aggregated it should be possible to add additional effort on top to make multi-store concept
usage compatible with default Spryker multi-store usage.

## Formula

Efforts have to be estimated per specific issue.
