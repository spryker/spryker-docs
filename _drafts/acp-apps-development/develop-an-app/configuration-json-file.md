---
title: Configuration JSON file
Descriptions: Configuration Json code snippet
template: howto-guide-template
last_updated: Dec 15, 2023
redirect_from: 
- /docs/acp/user/develop-an-app/code-snippets/configuration-json-file.html
---
To display the app you [developed with Spryker Mini-Framework](/docs/acp/user/develop-an-app/develop-an-app.html) in the ACP App Catalog, the app needs to have the `configuration.json` file. This file contains all necessary form fields for inputs required by users of your app. Add this file to `config/app/configuration.json` in your app.

For more information about the app configuration, see [App configuration](/docs/dg/dev/acp/develop-an-app/app-configuration.html).

Here is the example `configuration.json` file for the Hello World app. In this example, we assume the app needs a `clientId` and a `clientSecret` configured. Additionally, there should be an option to enable and disable the app via the ACP App Catalog.


```json
{
  "properties": {
    "clientId": {
      "type": "string",
      "title": "clientId_title",
      "placeholder": "clientId_placeholder",
      "isRequired": true,
      "isLockable": true,
      "widget": {
        "id": "password"
      }
    },
    "clientSecret": {
      "type": "string",
      "title": "clientSecret_title",
      "placeholder": "clientSecret_placeholder",
      "isRequired": true,
      "isLockable": true,
      "widget": {
        "id": "password"
      }
    },
    "isActive": {
      "type": "boolean",
      "title": "isActive_title",
      "widget": {
        "id": "app-status"
      },
      "default": false
    }
  },
  "fieldsets": [
    {
      "id": "notifications",
      "fields": [
        "isActive"
      ],
      "layout": "noLayout"
    },
    {
      "id": "configurations",
      "title": "configurations_fieldset_title",
      "fields": [
        "clientId",
        "clientSecret"
      ],
      "hint": "configurations_hint"
    }
  ],
  "required": [
    "clientId",
    "clientSecret",
    "isActive"
  ]
}
```
