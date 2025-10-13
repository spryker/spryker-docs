---
title: App configuration translation
Descriptions: App configuration translation is a JSON file that contains all translations for all entities from the application configuration file.
template: howto-guide-template
last_updated: Dec 15, 2023
related:
  - title: App configuration
    link: docs/dg/dev/acp/develop-an-app/app-configuration.html
  - title: Develop an app
    link: docs/acp/user/develop-an-app/develop-an-app.html
  - title: App manifest
    link: docs/acp/user/develop-an-app/app-manifest.html
redirect_from:
- /docs/acp/user/app-configuration-translation.html
- /docs/acp/user/develop-an-app/app-configuration-translation.html
---

*App Configuration Translation* represents a JSON file that contains all translations for all entities from the [application configuration file](/docs/dg/dev/acp/develop-an-app/app-configuration.html).
Translations for all configurations in all locales are contained in the same file. The default path for the translation file is: `/config/app/translation.json`.

<details>
<summary>App configuration translation example</summary>

```json
{
    "credentials": {
        "de_DE": "Referenzen",
        "en_US": "Credentials"
    },
    "credentials_clientName": {
        "de_DE": "Kundenname",
        "en_US": "Client Name"
    },
    "credentials_clientName_title": {
        "de_DE": "Kundenname",
        "en_US": "Client Name"
    },
    "credentials_siteId": {
        "de_DE": "Site ID",
        "en_US": "Site ID"
    },
    "credentials_siteId_title": {
        "de_DE": "Site ID",
        "en_US": "Site ID"
    },
    "settings": {
        "de_DE": "Einstellungen",
        "en_US": "Settings"
    },
    "settings_environment_title": {
        "de_DE": "Wählen Sie Eine Umgebung für folgende Funktionen",
        "en_US": "Select environment for the services below"
    },
    "settings_environment_staging": {
        "de_DE": "Staging",
        "en_US": "Staging"
    },
    "settings_environment_production": {
        "de_DE": "Production",
        "en_US": "Production"
    },
    "settings_settings_title": {
        "de_DE": "Funktionen auswählen",
        "en_US": "Select services"
    },
    "settings_settings_ratingsReviews": {
        "de_DE": "Bewertungen und Rezensionen",
        "en_US": "Ratings & Reviews"
    },
    "settings_settings_inlineRatings": {
        "de_DE": "Inline-Bewertungen",
        "en_US": "Inline Ratings"
    }
}

```
</details>

The translation configuration file has a very simple structure: it's a JSON object. The keys of this object represent translation keys, that are the pieces of information from a configuration file that should be translated. The values are simple objects with the structure `"{locale name}": "{translated value}"`.

You can translate the following properties of configuration:

- title
- description
- placeholder