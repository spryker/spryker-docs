| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| key | String | Unique key of the glossary entry. It is also the resource `id`. |
| translations | Array | Translations of the key, one entry per configured locale, ordered by `localeName`. The list is always complete: a locale without an active translation is included with `value: null`. |
| translations.localeName | String | Locale name—for example, `en_US`. |
| translations.value | String | Translated text in the locale. `null` when the key has no active translation in the locale. |
