---
title: HowTo - Manage a big number of categories
originalLink: https://documentation.spryker.com/v6/docs/ht-manage-a-big-number-of-categories
redirect_from:
  - /v6/docs/ht-manage-a-big-number-of-categories
  - /v6/docs/en/ht-manage-a-big-number-of-categories
---

## Preface
The default Zed UI for the _Category_ section comes in a form of a tree which is handy for managing nested categories, but impossible to use with a big number of categories. To cope with such cases, we've introduced a new _Category_ section view in a form of a table where categories are listed, paginated and can be easily found by searching.

## Installation
Perform the following steps to enable the view:

1. Install the `spryker/category-gui` module by running the command:

```bash
composer require "spryker/category-gui":"^1.0.0"
```

2. Once it's installed, configure the Zed navigation to point to the new page. Insert the following code snippet into `config/Zed/navigation.xml`:

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

