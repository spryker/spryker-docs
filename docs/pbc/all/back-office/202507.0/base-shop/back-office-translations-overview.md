---
title: Back Office Translations overview
description: Learn how to manage translations for Spryker Cloud Commerce OS Back Office, enabling seamless localization and improved global usability for back-office users.
template: concept-topic-template
last_updated: Nov 23, 2023
originalLink: https://documentation.spryker.com/2021080/docs/back-office-translations-overview
redirect_from:
  - /2021080/docs/back-office-translations-overview
  - /2021080/docs/en/back-office-translations-overview
  - /docs/back-office-translations-overview
  - /docs/en/back-office-translations-overview
  - /docs/scos/user/features/202200.0/spryker-core-back-office-feature-overview/back-office-translations-overview.html
  - /docs/pbc/all/back-office/202311.0/back-office-translations-overview.html
  - /docs/scos/user/features/202204.0/spryker-core-back-office-feature-overview/back-office-translations-overview.html
---

The *Back Office Translations* feature introduces a way to translate the Administration interface (Zed) into different languages in a per-user manner. In terms of hierarchy, only the user with administrative rights who has access to the User Control section of Zed can manage the feature. For example, a team of developers might include French and German. In this case, the shop administrator might set up French and German Zed translations for their accounts accordingly, and those translations wouldn't interfere with each other.

There are two ways to assign a language to a user account: from the **Create new User** page of the **User Control&nbsp;<span aria-label="and then">></span> User** section or from the **Edit User** page of **User Control&nbsp;<span aria-label="and then">></span> User section** if the user is already created. Once the account language is changed, the respective user sees that their interface is translated into the corresponding language upon their next login.

Translations are added by means of uploading CSV extension files to the folders of the target modules `src/Pyz/Zed/Translator/data/{ModuleName}/{locale_code}.csv`

The following are file name examples:

- `en_US.csv`
- `en_UK.csv`
- `de_DE.csv`
- `fr_FR.csv`

Once a new translation file is uploaded, regenerate the translation cache to reflect the changes:

```bash
translator:clean-cache
translator:generate-cache
```

Each file must consist of the `key` and `translation` columns without headers. Example:


|  |  |
| --- | --- |
| Add Group | Gruppe hinzufügen |
| Add new Role | Neue Rolle hinzufügen |
| Add Rule | Regel hinzufügen |

{% info_block warningBox %}

If a translation is missing, the corresponding key is displayed instead.

{% endinfo_block %}

Unlike the **Glossary** section of Zed, which is used for managing Front-end (Yves) translations, there is no interface for managing Zed translations. All the translations are managed by updating corresponding CSV files directly. Similarly to uploading translation files, you need to regenerate the translation cache to reflect the changes after updating them. Use the commands to do that.

Newly created and all the existing modules are shipped with German translation by default. If you want to add a different language, you can follow the instructions from the [Install the Back Office translations feature guide](/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-the-spryker-core-back-office-feature.html).

The following schema illustrates relations between Translator, UserExtension, User, UserLocale, and UserLocaleGui modules:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Back+Office/Back+Office+Translations/Back+Office+Translations+Feature+Overview/module-diagram.png)
