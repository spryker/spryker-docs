---
title: Adding Buttons to Zed Tables
description: The article describes how to add buttons to Zed tables.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-add-button-table
originalArticleId: a4d8ebed-1c73-47d6-9dad-fc3672736cf6
redirect_from:
  - /2021080/docs/t-add-button-table
  - /2021080/docs/en/t-add-button-table
  - /docs/t-add-button-table
  - /docs/en/t-add-button-table
  - /v6/docs/t-add-button-table
  - /v6/docs/en/t-add-button-table
  - /v5/docs/t-add-button-table
  - /v5/docs/en/t-add-button-table
  - /v4/docs/t-add-button-table
  - /v4/docs/en/t-add-button-table
  - /v3/docs/t-add-button-table
  - /v3/docs/en/t-add-button-table
  - /v2/docs/t-add-button-table
  - /v2/docs/en/t-add-button-table
  - /v1/docs/t-add-button-table
  - /v1/docs/en/t-add-button-table
---

<!-- used to be: http://spryker.github.io/tutorials/yves/adding-buttons-to-tables/ -->

Depending on the button type that needs to be added (`Update/Create/Remove/View`), the following operations can be called:

```php
<?php
$this->generateCreateButton('destination_URL', 'Button title', array $buttonOptions);
$this->generateEditButton('destination_URL', 'Button title', array $buttonOptions);
$this->generateViewButton('destination_URL', 'Button title', array $buttonOptions);
$this->generateRemoveButton('destination_URL', 'Button title', array $buttonOptions);
```
Each generated button will have the corresponding style(color,icon) according to its type.

Usage example:

```php
<?php
$this->generateCreateButton('/category/create', 'Add new Category');
$this->generateEditButton('/category/edit/?id-category=1', 'Edit Category');
$this->generateViewButton('/category/view/?id-category=1', 'View Category');
$this->generateRemoveButton('#', 'Remove Category', [
    'id' => 'category-' . $this->getIdCategory(),
    'class' => 'remove-item',
]);
```

The third parameter (`$buttonOptions`) is an array through which extra properties can be appended to the HTML code that is generated.

Example:

```php
<?php
$buttonOptions = [
    'class' => 'my-custom-class', // will append this class to default class list
    'id' => 'my-custom-id-for-this-button', // will add id property to generated HTML link
    'icon' => 'button-icon'
];
```
