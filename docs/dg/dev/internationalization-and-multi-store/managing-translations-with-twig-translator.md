---
title: Managing translations with Twig translator
last_updated: Jun 16, 2021
template: howto-guide-template

---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


The data stored in the key-value storage can be used for multiple purposes:

- URL mappings
- Localized product details
- Localized product categories details

## Using twig translator

Twig Translator uses the data that comes from the key-value store (Redis or Valkey). The glossary keys store static localized text that's not likely to be subject of a change, like the caption of a label.

The format of the glossary keys is as follows: `{store}.{locale}.glossary.translation.{glossary_key}`

Example:

- **key** : `demo.de_de.glossary.translation.catalog.next`
- **value** : `weiter`

```twig
<div class="catalog__pagination">
    <button class="pagination__button js-pagination-prev">{% raw %}{{{% endraw %} 'catalog.prev' | trans {% raw %}}}{% endraw %}</button>
    <button class="pagination__button js-pagination-next">{% raw %}{{{% endraw %} 'catalog.next' | trans {% raw %}}}{% endraw %}</button>
</div>
```

The following example shows how to use the Twig Translator:

When the page containing this template is requested, the Twig Translator will replace the text containing the key (for example, `catalog.next`) with the value of the key stored in the key-value store (Redis or Valkey) that corresponds to the current locale (for example, for locale `de_DE`, will replace with the value of the key `demo.de_de.glossary.translation.catalog.next`).
