---
title: Configuration Json
Descriptions: Configuration Json code snippet
template: howto-guide-template
---
To display the app you [developed with Spryker Mini-Framework](/docs/acp/user/develop-an-app/develop-an-app.html) in the App Store Catalog, the app needs to have the `configuration.json` file. This file contains all necessary form fields for inputs required by users of your app. Add this file to `config/app/configuration.json` in your app.

For more information about the app configuration, see [App configuration](/docs/acp/user/app-configuration.html).

Here is the example `configuration.json` file for the Hello World app. In this example, we assume the app needs a `clientId` and a `clientSecret` configured. Additionally, there should be an option to enable and disable the app via the App Store Catalog.


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
