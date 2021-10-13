---
title: Vault for Tokens overview
description: The feature contains two modules where one of them encrypts/decrypts data and the other one - stores and retrieves data from the database
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/vault-for-tokens-feature-overview
originalArticleId: d7017b8-59c6-4ad7-9b03-21d3de53974a
redirect_from:
  - /v5/docs/vault-for-tokens-feature-overview
  - /v5/docs/en/vault-for-tokens-feature-overview
  - /v5/docs/vault-for-tokens
  - /v5/docs/vault-for-tokens
---

Vault for Tokens provides the functionality to store sensitive data. This feature doesn't have any GUI and consists of two modules: _Spryker.UtilEncryption_ and _Spryker.Vault_. 

_Spryker.UtilEncryption_ provides data encryption / decryption functionality and _Spryker.Vault_ module uses this functionality to store and retrieve data from the database.

![Module relations of Vault for Tokens](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Vault+for+Tokens/Vault+for+Tokens+Feature+Overview/module-relations-vault-for-tokens.png) 

The database structure includes the following fields:

* dataType
* dataKey
* data

_dataType_ and _dataKey_ entries are used for the distinction between the provided data. Thus, multiple and various entries of data can be filtered and stored in the vault.

The database fields are mandatory and should contain either an empty string or a string with value. 

By default, we provide encryption algorithm AES256. The encryption functionality won't be used until the ENCRYPTION_KEY is set in the project config file. You can change the encryption algorithm in the module config on the project level.

The feature supports special characters and different [writing systems](https://en.wikipedia.org/wiki/Writing_system#Logographic_systems).

<!-- Last review date: Aug 06, 2019 by Oksana Karasyova-->
