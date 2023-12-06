---
title: Translation Json
Descriptions: Translation Json code snippet
template: howto-guide-template
redirect_from:
- /docs/acp/user/developing-an-app.html
---

This is a `translation.json` for the Hello World App. This file is used to translate the form fields which are defined in the `configuration.json`.

This file has to be in `config/app/translation.json` of your App.

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
