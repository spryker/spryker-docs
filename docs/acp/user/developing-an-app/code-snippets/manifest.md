---
title: Manifest Json
Descriptions: Manifest Json code snippet
template: howto-guide-template
redirect_from:
- /docs/acp/user/developing-an-app.html
---

This is an example manifest for the English version of the Hello World App.

This file has to be placed in `config/app/manifest/en_US.json` in your App.

{% info_block infoBox "Info" %}
Additional info about the (configuration)[https://docs.spryker.com/docs/acp/user/app-manifest.html]
{% endinfo_block %}

```json
{
    "name": "Hello World App",
    "provider": "Example, Inc.",
    "description": "Simple Hello World App for showcasing.",
    "descriptionShort": "Hello World App.",
    "url": "https://www.example.com",
    "isAvailable": true,
    "categories": [
        "PLAYGROUND"
    ],
    "assets": [
        {
            "type": "icon",
            "url": "/assets/img/hello-world/logo.png"
        },
        {
            "type": "image",
            "url": "/assets/img/hello-world/gallery/image.png"
        }
    ],
    "resources": [
        {
            "title": "User Guide",
            "url": "https://docs.spryker.com/docs/acp/user/intro-to-acp/acp-overview.html",
            "type": "internal-documentation",
            "fileType": "spryker-docs"
        }
    ],
    "pages": {
        "Overview": []
    },
    "labels": [],
    "businessModels": [
        "B2C",
        "B2B",
        "B2C_MARKETPLACE",
        "B2B_MARKETPLACE"
    ],
    "dependencies": [],
    "dialogs": {},
    "developedBy": "Spryker Systems GmbH"
}
```
