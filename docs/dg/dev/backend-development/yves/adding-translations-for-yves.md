---
title: Adding translations for Yves
description: Textual translations are handled by the Glossary-module. You can use the GlossaryFacade in Zed to add entries to Glossary (or you can use the Zed UI).
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/frontend-translations
originalArticleId: 55a7c265-b42c-4faf-a1d5-2be8e3b3d13f
redirect_from:
  - /docs/scos/dev/back-end-development/yves/add-translations-for-yves.html
  - /docs/scos/dev/back-end-development/yves/adding-translations-for-yves.html
related:
  - title: How translations are managed
    link: docs/pbc/all/miscellaneous/latest/spryker-core-feature-overview/how-translations-are-managed.html
  - title: Yves overview
    link: docs/dg/dev/backend-development/yves/yves.html
  - title: CLI entry point for Yves
    link: docs/dg/dev/backend-development/yves/cli-entry-point-for-yves.html
  - title: Controllers and actions
    link: docs/dg/dev/backend-development/yves/controllers-and-actions.html
  - title: Implement URL routing in Yves
    link: docs/dg/dev/backend-development/yves/implement-url-routing-in-yves.html
  - title: Modular Frontend
    link: docs/dg/dev/backend-development/yves/modular-frontend.html
  - title: Yves bootstrapping
    link: docs/dg/dev/backend-development/yves/yves-bootstrapping.html
  - title: Yves routes
    link: docs/dg/dev/backend-development/yves/yves-routes.html
---

Textual translations are handled by the `Glossary` module. You can use the `GlossaryFacade` in Zed to add entries to `Glossary` (or you can use the Zed UI).

```php
<?php
class GlossaryFacade extends AbstractFacade
{
    public function createTranslation($keyName, LocaleTransfer $locale, $value, $isActive = true){ ... }

    // there are several other methods in this facade
}
```

In the glossary, an entry has a key and translations per locale, like this:

```php
<?php
['say.hello' => [
    'de_DE => 'Hallo',
    'en_US' => 'Hello']
]
```

Before it can be used in Yves, this data must be exported to the KV storage. You can use the [Redis Desktop Manager](http://redisdesktop.com/) to look inside and see the values.

![Glossary KV and DB](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Yves/Frontend+Translations/glossary-kv-and-db.png)

## Usage in Twig templates

The translation function is provided by the [Symfony translation component](http://symfony.com/doc/current/book/translation.html).

### Simple translation

You can use the key in a Twig template in Yves:

```twig
{% raw %}{{{% endraw %} 'say.hello' | trans {% raw %}}}{% endraw %}
```

Sometimes you need to list all keys which are used in a template. Currently, there is no good solution, but this regex does the job pretty good:

```twig
{% raw %}{{{% endraw %}.?"(.*)".?\|.?trans.?{% raw %}}}{% endraw %}
```

### Translation with placeholders

When you have a dynamic part in the translation, you can use placeholders.

**Entry in the glossary**:

| KEY       | VALUE               |
| --------- | ------------------- |
| "my.name" | "My name is %name%" |

Now replace it with a value in the Twig template:

```twig
{% raw %}{{{% endraw %} "auth.my.name" | trans({'%name%' : 'Fabian'}, "app") {% raw %}}}{% endraw %}
```

This shows "My name is Fabian".

## Translation with AJAX requests

To use an AJAX request, you need to send translated content directly from the controller. In Yves, you can locate the translator and use it directly:

```php
<?php

public function ajaxAction()
{
    $app = $this->getLocator()->application()->pluginPimple()->getApplication();   
    $text = $app->trans('what.ever');
    return $this->jsonResponse['text' => $text];
}
```
