---
title: Best Practices - Twig Templates
originalLink: https://documentation.spryker.com/v5/docs/twig-best-practices
redirect_from:
  - /v5/docs/twig-best-practices
  - /v5/docs/en/twig-best-practices
---

## Include vs Macros vs Embed

With includes, you can include an entire template. The template has access to any template variables that are currently in scope.

With macros, you are defining a kind of function within Twig that can render a particular component given appropriate objects.

So you could have a macro for rendering, for example, a shopping list which takes a list as a parameter - and you could then reuse this macro. 

Variables that are not explicitly passed into the macro, won’t be within scope in that macro.

Do not confuse macros with Twig functions; twig functions can access other application logic, not just the data that’s passed into the templates.

A macro should really do one specific task to take some data and render a reusable component. An include can comprise any chunk of things - it’s a lot more up to you.

The extensible nature of the way Twig templates work means that you are likely to use includes less, by design - but there can still be use cases where it will be the easiest way to avoid duplication in your templates.

You may use embed when you need to extend a portion from the included file.

| Tag | When to Use |
| --- | --- |
| `include` | Used to define common parts in the page, such as header, sidebar, etc. that are extracted for to increase readability and reusability. |
| `macro` | Used to define functions related to the view, such as pagination. Reusable markup across other templates. |
| `embed` | If you need to overwrite some blocks of the included template, use embed. If you don’t need to overwrite blocks, use include. It will do the same in a faster way. |

## How to Create a Page in Zed
To create a new page in Zed, you need to create a new twig file that extends the `@Gui/Layout/layout.twig` main template and then extend the content block. Next, you can add your content inside content block.

```php
{% raw %}{%{% endraw %} extends '@Gui/Layout/layout.twig' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}

    ... add your code here ...

{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

{% info_block errorBox %}
We strongly recommend displaying page elements in widgets as in the next example.
{% endinfo_block %}

## How to Add Multiple Elements (Widgets) in Pages
To keep the same format of pages and in order for all to look the same on the project, we provide the widgets templates that can be used and can be extended from every page layout:

```php
{% raw %}{%{% endraw %} embed '@Gui/Partials/widget.twig' {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block widget_content {% raw %}%}{% endraw %}

        ... add here page content (forms, tables, texts, etc) ...

    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
```

By using widget templates, you have the advantage that you can overwrite elements in the widget that you cannot with normal include. A full example can be seen below:

```php
{% raw %}{%{% endraw %} embed '@Gui/Partials/widget.twig' with { widget_title: 'My new page element', row_class: 'widget-class', row_id: 'widget-id' } {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block widget_header_content {% raw %}%}{% endraw %}
        <a class="btn btn-primary" href="/sales/details/?id-sales-order={% raw %}{{{% endraw %} idOrder {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} 'View Order' | trans {% raw %}}}{% endraw %}</a>
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block widget_content {% raw %}%}{% endraw %}

        {% raw %}{{{% endraw %} form_start(form) {% raw %}}}{% endraw %}
            {% raw %}{{{% endraw %} form_widget(form) {% raw %}}}{% endraw %}

            <input type="submit" class="btn btn-primary" value="{% raw %}{{{% endraw %} 'Save' | trans {% raw %}}}{% endraw %}" />
        {% raw %}{{{% endraw %} form_end(form) {% raw %}}}{% endraw %}

    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
```

## How to Add Forms
Spryker Commerce OS uses Symfony forms which are defined in PHP classes; in the twig templates we usually need few lines of code to render them:

```php
{% raw %}{{{% endraw %} form_start(form) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} form_widget(form) {% raw %}}}{% endraw %}

    <input type="submit" class="btn btn-primary" value="{% raw %}{{{% endraw %} 'Save' | trans {% raw %}}}{% endraw %}" />
{% raw %}{{{% endraw %} form_end(form) {% raw %}}}{% endraw %}
```

{% info_block errorBox %}
We strongly recommend defining the form action buttons (like submit
{% endinfo_block %} in twig templates and not in the php form classes. Doing this, it’s much easier to extend the forms and to include forms in other forms.)

## How to Add Tables Using DataTables
The first step to display tables in a template is to add one line of code inside a widget element (``):

```php
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} embed '@Gui/Partials/widget.twig' {% raw %}%}{% endraw %}

        {% raw %}{%{% endraw %} block widget_content {% raw %}%}{% endraw %}

            {% raw %}{{{% endraw %} customerTable | raw {% raw %}}}{% endraw %}

        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

Next step is to add support in your controller; add one controller action for retrieving the data table and one for having pagination support in your table.

```php
<?php

class IndexController
{
    public function indexAction()
    {
        $table = $this->getFactory()->createCustomerTable();
    
        return $this->viewResponse([
            'customerTable' => $table->render(),
        ]);
    }
    
    public function tableAction()
    {
        $table = $this->getFactory()->createCustomerTable();
    
        return $this->jsonResponse($table->fetchData());
    }
}
```

## How to Add Navigation Buttons in Zed
In the main Zed layout `@Gui/Layout/layout.twig` you will find the empty action block which is used as a navigation menu between the module’s pages.

To add new URLs, you’ll have to extend this block and add the necessary buttons by using one of the 5 twig helper functions: `{back|create|edit|view|remove}ActionButton`.

Each of these buttons will accept three parameters: `$url, $title, array $options = []`.

```php
{% raw %}{%{% endraw %} block action {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} backActionButton($backUrl, $backTitleLabel) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} createActionButton($createUrl, 'Create' | trans}) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} editActionButton('/edit/id=' ~ entity.id, 'Edit Element' | tran) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} viewActionButton('/view/id=' ~ entity.id, 'View Element' | trans) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} removeActionButton('/remove/id=' ~ entity.id, 'Remove Element' | trans) {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

If you want to add id or class attributes to a button, just add them as a third parameter, as in the example below:

```php
{% raw %}{{{% endraw %} createActionButton('/my/url', 'Create' | trans, { id: 'create-action',
class: 'create-event-listener' }) {% raw %}}}{% endraw %}
```

## How to Add Buttons to a Table
This example refers to the case when you render a table in Zed without datatables.

For the table button, you also have 5 twig helper functions: `{back|create|edit|view|remove}TableButton`.

```php
<td>
    {% raw %}{{{% endraw %} backTableButton($backUrl, $backTitleLabel) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} createTableButton($createUrl, 'Create' | trans}) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} editTableButton('/edit/id=' ~ entity.id, 'Edit Element' | tran) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} viewTableButton('/view/id=' ~ entity.id, 'View Element' | trans) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} removeTableButton('/remove/id=' ~ entity.id, 'Remove Element' | trans) {% raw %}}}{% endraw %}
</td>
```

{% info_block warningBox %}
Table buttons will have the same layout and functionality as action buttons, except their size will be smaller.
{% endinfo_block %}

## How to Include Javascript Logic and Custom Styles in Pages
In the bundles in Zed, you can find the assets folder where the Javascript and Sass files are stored. Each assets folder must have an entry point (js file) so that webpack knows how to compile the required files.

```
assets
    Zed
        js
            modules
                main.js
            spryker-zed-bundle_name-main.entry.js
        sass
            main.scss
```

The entry point file requires the `main.je` file which loads the other required Javascript and SASS files.

### spryker-zed-bundle_name-main.entry.js

```javascrit
'use strict';

require('./modules/main.js');
```

### main.js

```javascript
'use strict';

require('ZedGui');
require('./custom/logic'); // requires ./custom/logic.js file
require('../../sass/main.scss');
```

After you add the module specific assets files, you need to include them in the twig files where they are needed.

```
<!-- Bundle/src/Spryker/Zed/Bundle/Presentation/ControllerName/actionName.twig -->

{% raw %}{%{% endraw %} block footer_js {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
   <script src="/assets/js/spryker-zed-bundle_name-main.js"></script>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

And for CSS

```
<!-- Bundle/src/Spryker/Zed/Bundle/Presentation/ControllerName/actionName.twig -->

{% raw %}{%{% endraw %} block head_css {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
    <link rel="stylesheet" href="/assets/css/spryker-zed-bundle_name-main.css" />
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

{% info_block warningBox %}
Always add `{% raw %}{{{% endraw %} parent(
{% endinfo_block %} {% raw %}}}{% endraw %}` inside CSS and Javascript extended blocks to keep the block content from the parent’s layout.)

{% info_block warningBox %}
Not using parent will replace the content of the blocks instead of appending.
{% endinfo_block %}

## How to Render an URL from a Template View
To render another page from a twig layout you will use `render(url())` functions:

```
{% raw %}{{{% endraw %} render(url('/url/to/my/page')) {% raw %}}}{% endraw %}
```

{% info_block warningBox %}
Don’t forget to pass the request as a parameter.
{% endinfo_block %}
