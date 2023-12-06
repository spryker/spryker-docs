---
title: Configuration Json
Descriptions: Configuration Json code snippet
template: howto-guide-template
redirect_from:
- /docs/acp/user/developing-an-app.html
---

This is a `configuration.json` for the Hello World App. This is an example file where we assume the App needs a `clientId` and a `clientSecret` to be configured. On top of this, we can also enable/disable the App via the App Store Catalog.
This file has to be in config/app/configuration.json of your App.

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
