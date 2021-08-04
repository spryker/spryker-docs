---
title: Tutorial - Managing glossary keys
originalLink: https://documentation.spryker.com/2021080/docs/tutorial-managing-glossary-keys
redirect_from:
  - /2021080/docs/tutorial-managing-glossary-keys
  - /2021080/docs/en/tutorial-managing-glossary-keys
---

Glossary keys present two layers of persistence:

* SQL database storage
* in-memory key-value storage: Redis

In this tutorial, we show how to manage the glossary keys of the Back Office user interface and how to manage the glossary keys of the Storefront interface via Twig extensions.

Update, insert and delete operations for glossary keys are exposed in the `Glossary` module through the `GlossaryFacade` class.

For update and insert operations, `GlossaryFacade` exposes `saveGlossaryKeyTranslations` that can be accessed as follows:

```php
<?php
// Insert or update the translations for a glossary key
$facade = $this->getFactory()->getGlossaryFacade();
$facade->saveGlossaryKeyTranslations($formData);

//Delete the translation for a glossary key
$facade->deleteTranslation($keyName,$locale);
```

## Retrieving glossary keys 
The support for listing the glossary keys is exposed through `GlossaryBusinessContainer`:

```php
<?php
$availableLocales = $this->getFactory()->getEnabledLocales();
$grid = $this->getFactory()->createGlossaryKeyTranslationGrid($request);
```

* `getEnabledLocales()` retrieves the list of locales that are contained in the `stores.php` configuration file.
* `createGlossaryKeyTranslationGrid()` queries the database for the list of glossary keys for each of the supported languages.

{% info_block warningBox "Removing locales from configuration" %}
If a locale is removed from configuration, the glossary keys for the locale are not retrieved from the database, even if they exist.
{% endinfo_block %}

### Configuring locales

Locales are configured in `config/Shared/stores.php` as follows:

```php
<?php
$stores['DE'] = [
  ...
    'locales' => ['de_DE','en_US'],
];
```

## Using glossary keys
On the Storefront, you can use glossary keys to translate rendered content. The following examples shows how to do it using a dedicated extension for the Twig template engine:

```xml
<div class="form-group"><label class="col-sm-2 control-label">First Name</label>
    <div class="col-sm-10">
    
        <input type="text" class="form-control" name="first_name" value="{% raw %}{{{% endraw %} form.first_name.value {% raw %}}}{% endraw %}">
        {#{% raw %}{{{% endraw %} form_row(form.first_name) {% raw %}}}{% endraw %}#}
        
    </div>
</div>
```

The keyword `trans` marks an operation exposed by the `TwigTranslator` extension. This means that the text of the label is either the default value provided in the view or the corresponding translation for it.
