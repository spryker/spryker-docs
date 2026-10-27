---
title: Adding buttons to Zed tables
description: Enhance Zed tables by adding custom buttons with this guide. Learn how to configure button actions and integrate them seamlessly into your backend UI.
last_updated: Oct 22, 2026
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-add-button-table
originalArticleId: a4d8ebed-1c73-47d6-9dad-fc3672736cf6
redirect_from:
  - /docs/scos/dev/back-end-development/zed-ui-tables/add-buttons-to-zed-tables.html
  - /docs/scos/dev/back-end-development/zed-ui-tables/adding-buttons-to-zed-tables.html
related:
  - title: Create and configure Zed tables
    link: docs/dg/dev/backend-development/zed-ui-tables/create-and-configure-zed-tables.html
---

Depending on the button type that needs to be added (`Update/Create/Remove/View`), you can add the following operations:

```php
<?php
$this->generateCreateButton('destination_URL', 'Button title', array $buttonOptions);
$this->generateEditButton('destination_URL', 'Button title', array $buttonOptions);
$this->generateViewButton('destination_URL', 'Button title', array $buttonOptions);
$this->generateRemoveButton('destination_URL', 'Button title', array $buttonOptions);
```

Each generated button has corresponding color and icon according to its type.

**Usage example:**

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

The third parameter `$buttonOptions` is an array through which extra properties can be appended to the HTML code that is generated.

**Example:**

```php
<?php
$buttonOptions = [
    'class' => 'my-custom-class', // will append this class to default class list
    'id' => 'my-custom-id-for-this-button', // will add id property to generated HTML link
    'icon' => 'button-icon'
];
```

## Ask for confirmation before an action

To prevent a user from running a destructive or important action by mistake, open a confirmation modal before the action runs. The modal is available in `spryker/gui` 5.11.0 and later, and it opens for any link or submit button in the Back Office that has the `data-confirm` attribute. The modal is rendered by the core `@Gui/Layout/layout.twig`. A project layout that extends `@Spryker:Gui/Layout/layout.twig` keeps the modal. If your project replaces the layout without extending it, add `{% raw %}{% include '@Gui/Modal/action-confirmation-modal.twig' %}{% endraw %}` to it.

In a table, build the attributes with `buildConfirmationAttributes()` and pass them as button options to `generateFormButton()`:

```php
<?php

use Generated\Shared\Transfer\ActionConfirmationTransfer;
use Spryker\Zed\Gui\Communication\Form\DeleteForm;

$this->generateFormButton('/category/delete?id-category=1', 'Delete', DeleteForm::class, [
    static::BUTTON_CLASS => 'btn-danger',
    static::BUTTON_ICON => 'fa-trash',
] + $this->buildConfirmationAttributes(
    (new ActionConfirmationTransfer())
        ->setTitle('Delete %name%?')
        ->setMessage('The category will be deleted permanently.')
        ->setConfirmButtonLabel('Delete')
        ->setType(static::CONFIRMATION_TYPE_DANGER)
        ->setTranslationParameters(['%name%' => 'Cameras']),
));
```

`buildConfirmationAttributes()` translates the title, message, and button label, and escapes them for HTML. The `ActionConfirmationTransfer` properties are as follows:

| PROPERTY | REQUIRED | DESCRIPTION |
|----------|----------|-------------|
| title | yes | Modal title. |
| message | yes | Modal text. |
| confirmButtonLabel | yes | Label of the button that runs the action. |
| type | no | Style of the confirm button: `static::CONFIRMATION_TYPE_DANGER` (default) or `static::CONFIRMATION_TYPE_PRIMARY`. |
| translationParameters | no | Placeholders to replace in the title and message. |

Outside a table, add the attributes directly in Twig:

```twig
{% raw %}<a href="/category/delete?id-category=1"
   class="btn btn-danger"
   data-confirm="1"
   data-confirm-title="{{ 'Delete category?' | trans }}"
   data-confirm-message="{{ 'The category will be deleted permanently.' | trans }}"
   data-confirm-button="{{ 'Delete' | trans }}"
   data-confirm-type="danger">{{ 'Delete' | trans }}</a>{% endraw %}
```

If an attribute is omitted, the modal shows a default title, message, or button label.
