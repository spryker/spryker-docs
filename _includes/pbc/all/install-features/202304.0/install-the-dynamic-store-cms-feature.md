
This document describes how to integrate the Dynamic Store + CMS feature into a Spryker project.

## Install Feature Frontend

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |  
| --- | --- | 
| Spryker Core | {{page.version}} | 
| CMS | {{page.version}} |

### Set up behavior

If you are using the twig function `renderCmsBlockAsTwig` in twig templates, make sure to provide `storeName` name as a parameter. Otherwise, the function will throw an exception.

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
