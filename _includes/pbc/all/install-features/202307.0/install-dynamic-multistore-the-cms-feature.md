{% info_block warningBox %}

Dynamic Multistore is currently running under an *Early Access Release*. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

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
