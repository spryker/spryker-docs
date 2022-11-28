---
title: "HowTo: Manage a big number of categories"
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-manage-a-big-number-of-categories
originalArticleId: 54f92b50-1aa0-44db-8a7c-b3eb4dbaa99c
redirect_from:
  - /2021080/docs/ht-manage-a-big-number-of-categories
  - /2021080/docs/en/ht-manage-a-big-number-of-categories
  - /docs/ht-manage-a-big-number-of-categories
  - /docs/en/ht-manage-a-big-number-of-categories
  - /v6/docs/ht-manage-a-big-number-of-categories
  - /v6/docs/en/ht-manage-a-big-number-of-categories
  - /v5/docs/ht-manage-a-big-number-of-categories-201903
  - /v5/docs/en/ht-manage-a-big-number-of-categories-201903
  - /v4/docs/ht-manage-a-big-number-of-categories-201903
  - /v4/docs/en/ht-manage-a-big-number-of-categories-201903
  - /v3/docs/ht-manage-a-big-number-of-categories-201903
  - /v3/docs/en/ht-manage-a-big-number-of-categories-201903
  - /v2/docs/ht-manage-a-big-number-of-categories-201903
  - /v2/docs/en/ht-manage-a-big-number-of-categories-201903
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-manage-a-big-number-of-categories.html
---

## Overview

The default Zed UI for the **Category** section comes in the form of a tree, which is handy for managing nested categories but impossible to use with a large number of categories. To cope with such cases, we've introduced a new _Category_ section view in the form of a table, where categories are listed, paginated, and can be easily found by searching.

## Installation

Perform the following steps to enable the view:

1. Install the `spryker/category-gui` module by running the command:

```bash
composer require "spryker/category-gui":"^1.0.0"
```

2. Configure the Zed navigation to point to the new page. Insert the following code snippet into `config/Zed/navigation.xml`:

```xml
<?xml version="1.0"?>
<config>
    <category>
        <label>Category</label>
        <title>Category</title>
        <bundle>category-gui</bundle>
        <controller>list</controller>
        <action>index</action>
        <order>0</order>
        <shortcut>c</shortcut>
        <icon>fa-sitemap</icon>
    </category>
</config>
```
