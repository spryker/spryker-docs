---
title: Manifest Json
Descriptions: Manifest Json code snippet
template: howto-guide-template
redirect_from:
- /docs/acp/user/develop-an-app.html
---
To display the app you [developed with Spryker Mini-Framework](/docs/acp/user/develop-an-app/develop-an-app.html) in the App Store Catalog,, the app needs to have the manifest file. Add this file has to `config/app/manifest/en_US.json` in your App.

For more information about configuration of the manifest file, see [App manifest](https://docs.spryker.com/docs/acp/user/app-manifest.html).

Here is the example manifest for the English version of the Hello World app:

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
