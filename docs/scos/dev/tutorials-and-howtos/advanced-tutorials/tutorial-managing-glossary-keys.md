---
title: Tutorial - Managing glossary keys
description: Glossary keys present two layers of persistence. This topic covers the usage of the functionality for managing the glossary keys.
last_updated: Aug 10, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/tutorial-managing-glossary-keys
originalArticleId: 761b1f67-31a5-425e-b897-a622eb230a23
redirect_from:
  - /2021080/docs/tutorial-managing-glossary-keys
  - /2021080/docs/en/tutorial-managing-glossary-keys
  - /docs/tutorial-managing-glossary-keys
  - /docs/en/tutorial-managing-glossary-keys
  - /v6/docs/tutorial-managing-glossary-keys
  - /v6/docs/en/tutorial-managing-glossary-keys
  - /v5/docs/glossary-keys
  - /v5/docs/en/glossary-keys
  - /v4/docs/glossary-keys
  - /v4/docs/en/glossary-keys
  - /v3/docs/glossary-keys
  - /v3/docs/en/glossary-keys
  - /v2/docs/glossary-keys
  - /v2/docs/en/glossary-keys
  - /v1/docs/glossary-keys
  - /v1/docs/en/glossary-keys
---

Glossary keys present two layers of persistence:

* SQL database storage
* in-memory key-value storage: Redis

In this tutorial, we show how to manage the glossary keys of the Back Office user interface and how to manage the glossary keys of the Storefront interface via Twig extensions.

Update, insert and delete operations for glossary keys are exposed in the `Glossary` module through the `GlossaryFacade` class.

For update and insert operations, `GlossaryFacade` exposes `saveGlossaryKeyTranslations` that can be accessed as follows:

```php
getFactory()-&gt;getGlossaryFacade();
$facade-&gt;saveGlossaryKeyTranslations($formData);

//Delete the translation for a glossary key
$facade-&gt;deleteTranslation($keyName,$locale);
```

## Retrieving glossary keys
The support for listing the glossary keys is exposed through `GlossaryBusinessContainer`:

```php
getFactory()-&gt;getEnabledLocales();
$grid = $this-&gt;getFactory()-&gt;createGlossaryKeyTranslationGrid($request);
```

* `getEnabledLocales()` retrieves the list of locales that are contained in the `stores.php` configuration file.
* `createGlossaryKeyTranslationGrid()` queries the database for the list of glossary keys for each of the supported languages.

{% info_block warningBox "Removing locales from configuration" %}
If a locale is removed from configuration, the glossary keys for the locale are not retrieved from the database, even if they exist.
{% endinfo_block %}

### Configuring locales

Locales are configured in `config/Shared/stores.php` as follows:

```php
 ['de_DE','en_US'],
];
```

## Using glossary keys
On the Storefront, you can use glossary keys to translate rendered content. The following examples shows how to do it using a dedicated extension for the Twig template engine:

```xml
<div><label>{% raw %}{{{% endraw %} 'First Name' | trans {% raw %}}}{% endraw %}</label>
    <div>

        <input type="text" name="first_name" value="{% raw %}{{{% endraw %} form.first_name.value {% raw %}}}{% endraw %}">
        {#{% raw %}{{{% endraw %} form_row(form.first_name) {% raw %}}}{% endraw %}#}

    </div>
</div>
```

The keyword `trans` marks an operation exposed by the `TwigTranslator` extension. This means that the text of the label is either the default value provided in the view or the corresponding translation for it.
