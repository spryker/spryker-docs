---
title: Managing Glossary Keys
originalLink: https://documentation.spryker.com/v5/docs/glossary-keys
redirect_from:
  - /v5/docs/glossary-keys
  - /v5/docs/en/glossary-keys
---

Glossary keys present two layers of persistence:

* SQL database storage
* in-memory key-value storage (Redis)

In this section, we’ll exemplify the usage of the functionality for managing the glossary keys from the backoffice user interface and the usage of them for the Yves interface through twig extensions.

The update/insert and delete operations for glossary keys are exposed in the `Glossary` module through the `GlossaryFacade` class.

For both update and insert operations, `GlossaryFacade` exposes `saveGlossaryKeyTranslations` that can be accessed in the following manner:

```php
<?php
// Insert or update the translations for a glossary key
$facade = $this->getFactory()->getGlossaryFacade();
$facade->saveGlossaryKeyTranslations($formData);

//Delete the translation for a glossary key
$facade->deleteTranslation($keyName,$locale);
```

Retrieving the glossary keys : the support for listing the glossary keys is exposed through the `GlossaryBusinessContainer`:

```php
<?php
$availableLocales = $this->getFactory()->getEnabledLocales();
$grid = $this->getFactory()->createGlossaryKeyTranslationGrid($request);
```

* `getEnabledLocales()` retrieves the list of locales that are contained in the stores.php configuration file.
* `createGlossaryKeyTranslationGrid()` queries the database for the list of glossary keys in the database for each of the supported languages.

{% info_block warningBox "Note" %}
If one of the locales is removed from configuration, its corresponding glossary keys won’t be retrieved from the database, but they would still exist in the database.
{% endinfo_block %}

### Configuring Locales

The locales supported by the application can be configured through the configuration file `stores.php` that’s under the `config/Shared/` folder.

```php
<?php
$stores['DE'] = [
  ...
    'locales' => ['de_DE','en_US'],
];
```

## Using Glossary Keys
One of the usages of the glossary keys in the Shop Application is for rendering translated content. For allowing you to render translated content, a dedicated extension for the twig template engine is available to be used. You can see below how you can add the translated content to Yves.

```xml
<div class="form-group"><label class="col-sm-2 control-label">First Name</label>
    <div class="col-sm-10">
    
        <input type="text" class="form-control" name="first_name" value="{% raw %}{{{% endraw %} form.first_name.value {% raw %}}}{% endraw %}">
        {#{% raw %}{{{% endraw %} form_row(form.first_name) {% raw %}}}{% endraw %}#}
        
    </div>
</div>
```

The keyword `trans` marks an operation exposed by the `TwigTranslator` extension.

{% info_block infoBox %}
This means that the text of the label will either be the default value provided in the view or the corresponding translation for it.
{% endinfo_block %}
