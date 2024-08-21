---
title: Translation JSON file
Descriptions: Translation Json code snippet
template: howto-guide-template
last_updated: Dec 15, 2023
redirect_from:
- /docs/acp/user/develop-an-app/code-snippets/translation-json-file.html
---

The `translation.json` file contains translations of the form files which are defined in the `configuration.json` file of your app [developed with Spryker Mini-Framework](/docs/acp/user/develop-an-app/develop-an-app.html). Add this file to `config/app/translation.json`in your app.

For more information about the app configuration translation, see [App configuration translation](/docs/acp/user/develop-an-app/app-configuration-translation.html).

Here is the example `translation.json` file for the Hello World app.

```json
{
  "configurations_fieldset_title": {
    "en_US": "Configurations",
    "de_DE": "Konfigurationen"
  },
  "configurations_hint": {
    "en_US": "Add the Client details.",
    "de_DE": "Füge die Client details hinzu."
  },
  "clientId_title": {
    "en_US": "Client ID",
    "de_DE": "Client ID"
  },
  "clientId_placeholder": {
    "en_US": "Enter Client ID here.",
    "de_DE": "Geben Sie hier die Client ID ein."
  },
  "clientSecret_title": {
    "en_US": "Client Secret",
    "de_DE": "Client Secret"
  },
  "clientSecret_placeholder": {
    "en_US": "Enter Client Secret here.",
    "de_DE": "Geben Sie hier den Client Secret ein."
  },
  "isActive_title": {
    "en_US": "Activate",
    "de_DE": "Aktivieren"
  }
}
```