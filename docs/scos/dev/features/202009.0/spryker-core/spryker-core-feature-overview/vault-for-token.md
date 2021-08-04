---
title: Vault for tokens
originalLink: https://documentation.spryker.com/v6/docs/vault-for-tokens
redirect_from:
  - /v6/docs/vault-for-tokens
  - /v6/docs/en/vault-for-tokens
---

Vault for Tokens provides the functionality to store sensitive data. This feature doesn't have any GUI and consists of two modules: _Spryker.UtilEncryption_ and _Spryker.Vault_. 

_Spryker.UtilEncryption_ provides data encryption / decryption functionality and _Spryker.Vault_ module uses this functionality to store and retrieve data from the database.

![Module relations of Vault for Tokens](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Vault+for+Tokens/Vault+for+Tokens+Feature+Overview/module-relations-vault-for-tokens.png){height="" width=""}

The database structure includes the following fields:

* dataType
* dataKey
* data

_dataType_ and _dataKey_ entries are used for the distinction between the provided data. Thus, multiple and various entries of data can be filtered and stored in the vault.

The database fields are mandatory and should contain either an empty string or a string with value. 

By default, we provide encryption algorithm AES256. The encryption functionality won't be used until the ENCRYPTION_KEY is set in the project config file. You can change the encryption algorithm in the module config on the project level.

The feature supports special characters and different [writing systems](https://en.wikipedia.org/wiki/Writing_system#Logographic_systems).


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
              <li><a href="https://documentation.spryker.com/docs/en/spryker-core-feature-integration" class="mr-link">Enable the vault for tokens by integrating the Spryker Core feature into your project</a></li>
            </ul>
        </div>
     </div>
</div>  
