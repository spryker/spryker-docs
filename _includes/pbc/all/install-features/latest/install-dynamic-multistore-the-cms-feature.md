This document describes how to install the [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/latest/base-shop/dynamic-multistore-feature-overview.html) + the [CMS](/docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/cms-feature-overview.html) feature, install the required features:

| NAME | VERSION |  
| --- | --- |
| Spryker Core | 202507.0 |
| CMS | 202507.0 |

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
