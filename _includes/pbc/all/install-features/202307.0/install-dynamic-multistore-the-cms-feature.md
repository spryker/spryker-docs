{% info_block warningBox %}

Dynamic Multistore is part of an *Early Access Release*. This *Early Access* feature introduces the ability to handle the store entity in the Back Office. Business users can try creating stores without editing the `Stores.php` file and redeploying the system.

{% endinfo_block %}

To install Dynamic Store + the CMS feature, install the required features:

| NAME | VERSION |  
| --- | --- |
| Spryker Core | {{page.version}} |
| CMS | {{page.version}} |

## Troubleshooting

If you are using the `renderCmsBlockAsTwig()` Twig function in Twig templates, make sure to provide `storeName` name as a parameter. Otherwise, the function throws an exception.

Example:
```twig
 {% raw %}
{{ renderCmsBlockAsTwig(
    'template-name',
    mail.storeName,
    mail.locale.localeName,
    {mail: mail}
) }}
{% endraw %}
```
