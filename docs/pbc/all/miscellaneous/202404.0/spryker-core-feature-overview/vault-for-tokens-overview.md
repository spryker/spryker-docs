---
title: Vault for Tokens overview
description: The feature contains two modules where one of them encrypts/decrypts data and the other one - stores and retrieves data from the database
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/vault-for-tokens-feature-overview
originalArticleId: 74b81715-3f9b-4f34-af9d-30ca5f480597
redirect_from:
  - /2021080/docs/vault-for-tokens-feature-overview
  - /2021080/docs/en/vault-for-tokens-feature-overview
  - /docs/vault-for-tokens-feature-overview
  - /docs/en/vault-for-tokens-feature-overview
  - /2021080/docs/vault-for-tokens
  - /2021080/docs/vault-for-tokens
  - /docs/vault-for-tokens
  - /docs/vault-for-tokens
  - /docs/scos/dev/feature-walkthroughs/202212.0/spryker-core-feature-walkthrough/vault-for-tokens-overview.html  
  - /docs/scos/user/features/202204.0/spryker-core-feature-overview/vault-for-tokens-overview.html
---

*Vault for Tokens* provides the functionality to store sensitive data. This feature doesn't have any GUI and consists of two modules: `Spryker.UtilEncryption` and `Spryker.Vault`.

`Spryker.UtilEncryption` provides data encryption and decryption functionality, and the `Spryker.Vault` module uses this functionality to store and retrieve data from the database.

![Module relations of Vault for Tokens](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Vault+for+Tokens/Vault+for+Tokens+Feature+Overview/module-relations-vault-for-tokens.png)

The database structure includes the following fields:

* `dataType`
* `dataKey`
* `data`

`dataType` and `dataKey` entries are used for the distinction between the provided data. Thus, multiple and various entries of data can be filtered and stored in the vault.

The database fields are mandatory and must contain either an empty string or a string with a value.

By default, we provide the encryption algorithm AES256. The encryption functionality won't be used until ` ENCRYPTION_KEY` is set in the project configuration file. You can change the encryption algorithm in the module configuration on the project level.

The feature supports special characters and different [writing systems](https://en.wikipedia.org/wiki/Writing_system#Logographic_systems).

<!-- Last review date: Aug 06, 2019 by Oksana Karasyova-->
