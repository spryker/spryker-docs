---
title: Punchout Catalog Feature Integration
originalLink: https://documentation.spryker.com/v6/docs/punchout-catalog-feature-integration
redirect_from:
  - /v6/docs/punchout-catalog-feature-integration
  - /v6/docs/en/punchout-catalog-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview, and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core	 | 202009.0 |
| Company Account	 | 202009.0 |
| Cart | 202009.0 |
| Product | 202009.0 |
| Vault | 202009.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
```bash
composer require punchout-catalogs/punchout-catalog-spryker: "^2.0.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`PunchoutCatalogsSpryker`</td><td>`vendor/punchout-catalogs/punchout-catalog-spryker`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Configuration
{% info_block errorBox "Attention" %}
The following configuration creates a Zed access-point (for ERPs
{% endinfo_block %} without authentication. Make sure that your Zed is only accessible through a secured channel and only for the trusted clients (ERPs).)

Add the following configuration to your project:

| Configuration | Specification | Namespace |
| --- | --- | --- |
| Update config `KernelConstants::PROJECT_NAMESPACES` and `KernelConstants::CORE_NAMESPACES` | Enables autoloading for Punchout module directories. | None |
| Update config `AclConstants::ACL_DEFAULT_RULES` | Allow access to `PunchoutCatalog` routes for ALL users. | None |
| `AuthConfig::getIgnorable()` | Allow access to PunchoutCatalog routes without authentication. | Pyz\Zed\Auth |
| `PunchoutCatalogConfig::getBaseUrlYves()` | Defines urls for Punchout API endpoints. | Pyz\Zed\PunchoutCatalog |

**config/Shared/config_default.php**

```php
<?php
$config[KernelConstants::PROJECT_NAMESPACES] = [
    'PunchoutCatalog',
];
 
$config[KernelConstants::CORE_NAMESPACES] = [
    'PunchoutCatalog',
];
 
$config[AclConstants::ACL_DEFAULT_RULES] = [
[     
     [
        'bundle' => 'punchout-catalog',
        'controller' => 'request',
        'action' => 'index',
        'type' => 'allow',
    ],
];
```

{% info_block warningBox "Verification" %}
Make sure that you can access `http://zed.mysprykershop/punchout-catalog/request` URL when logged in as any user, e.g. admin.<br>Make sure that you don't receive class not found exception after  "Setup Behaviour" section plugins registration.
{% endinfo_block %}

**src/Pyz/Zed/Auth/AuthConfig.php**

```php
<?php
 
namespace Pyz\Zed\Auth;
 
use Spryker\Zed\Auth\AuthConfig as SprykerAuthConfig;
 
class AuthConfig extends SprykerAuthConfig
{
    /**
     * @return array
     */
    public function getIgnorable()
    {
        $this->addIgnorable('punchout-catalog', 'request', 'index');
 
        return parent::getIgnorable();
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that you can access `http://zed.mysprykershop/punchout-catalog/request` without authentication.
{% endinfo_block %}

**config/Shared/config_default.php**

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Zed\PunchoutCatalog;
use PunchoutCatalog\Zed\PunchoutCatalog\PunchoutCatalogConfig as SprykerPunchoutCatalogConfig;
 
class PunchoutCatalogConfig extends SprykerPunchoutCatalogConfig
{
    /**
     * @return string[]
     */
    protected function getBaseUrlYves(): array
    {
        $domain = getenv('VM_PROJECT') ?: 'suite-nonsplit';
 
        return [
            'DE' => sprintf('http://www.de.%s.local', $domain),
            'AT' => sprintf('http://www.at.%s.local', $domain),
            'US' => sprintf('http://www.us.%s.local', $domain),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that you do not receive an `MissingYvesUrlConfigurationException` exception when trying to click on the Transfer Cart button on a cart page (this button will be available when the "Feature Frontend" is fully installed
{% endinfo_block %}.)

### 3) Set up Database Schema and Transfer Objects
Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```
{% info_block warningBox "Verification" %}
Make sure that the following changes applied by checking your database:<table><thead><tr><th>Database Entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`pgw_punchout_catalog_connection`</td><td>table</td><td>created</td></tr><tr><td>`pgw_punchout_catalog_connection_cart`</td><td>table</td><td>created</td></tr><tr><td>`pgw_punchout_catalog_connection_setup`</td><td>table</td><td>created</td></tr><tr><td>`pgw_punchout_catalog_transaction`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}
{% info_block infoBox "Verification" %}
Make sure that the following changes in transfer objects:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`PunchoutCatalogSetupRequest`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogSetupRequest`</td></tr><tr ><td>`PunchoutCatalogSetupResponse`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogSetupResponse`</td></tr><tr><td>`PunchoutCatalogProtocolData`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogProtocolData`</td></tr><tr><td>`PunchoutCatalogProtocolDataCart`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogProtocolDataCart`</td></tr><tr><td>`PunchoutCatalogProtocolDataOciCredentials`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogProtocolDataOciCredentials`</td></tr><tr><td>`PunchoutCatalogProtocolDataCxmlCredentials`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogProtocolDataCxmlCredentials`</td></tr><tr><td>`PunchoutCatalogConnectionCriteria`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogConnectionCriteria`</td></tr><tr><td>`PunchoutCatalogConnectionCredentialSearch`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogConnectionCredentialSearch`</td></tr><tr><td>`PunchoutCatalogConnectionList`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogConnectionList`</td></tr><tr><td>`PunchoutCatalogCxmlCredential`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogCxmlCredential`</td></tr><tr><td>`PunchoutCatalogOciCredential`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogOciCredential`</td></tr><tr><td>`PunchoutCatalogConnection`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogConnection`</td></tr><tr><td>`PunchoutCatalogConnectionCart`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogConnectionCart`</td></tr><tr><td>`PunchoutCatalogConnectionSetup`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogConnectionSetup`</td></tr><tr><td>`PunchoutCatalogCancelRequest`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogCancelRequest`</td></tr><tr><td>`PunchoutCatalogCartResponse`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogCartResponse`</td></tr><tr><td>`PunchoutCatalogCartResponseField`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogCartResponseField`</td></tr><tr><td>`PunchoutCatalogDocumentCart`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogDocumentCart`</td></tr><tr><td>`PunchoutCatalogDocumentCartItem`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogDocumentCartItem`</td></tr><tr><td>`PunchoutCatalogDocumentCartCustomer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogDocumentCartCustomer`</td></tr><tr><td>`PunchoutCatalogDocumentCustomAttribute`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogDocumentCustomAttribute`</td></tr><tr><td>`PunchoutCatalogMapping`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogMapping`</td></tr><tr><td>`PunchoutCatalogMappingObject`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogMappingObject`</td></tr><tr><td>`PunchoutCatalogMappingObjectField`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogMappingObjectField`</td></tr><tr><td>`PunchoutCatalogMappingTransform`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogMappingTransform`</td></tr><tr><td>`PunchoutCatalogMappingTransformParams`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogMappingTransformParams`</td></tr><tr><td>`PunchoutCatalogCommonContext`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogCommonContext`</td></tr><tr><td>`PunchoutCatalogCartRequestContext`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogCartRequestContext`</td></tr><tr><td>`PunchoutCatalogCartResponseContext`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogCartResponseContext`</td></tr><tr><td>`PunchoutCatalogDocumentCustomer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogDocumentCustomer`</td></tr><tr><td>`PunchoutCatalogDocumentCartItem`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogDocumentCartItem`</td></tr><tr><td>`PunchoutCatalogSetupRequestDocument`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogSetupRequestDocument`</td></tr><tr><td>`PunchoutCatalogEntryPoint`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogEntryPoint`</td></tr><tr><td>`PunchoutCatalogEntryPointFilter`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PunchoutCatalogEntryPointFilter`</td></tr></tbody></table>
{% endinfo_block %}

### 4) Add Translations
Append glossary according to your configuration:

<details open>
<summary>data/import/glossary.csv</summary>

```html
punchout-catalog.connection.list.title,Punch-out Catalog,en_US
punchout-catalog.connection.list.title,Ausstanzungskatalog,de_DE
punchout-catalog.connection.list.name,Name,en_US
punchout-catalog.connection.list.name,Name,de_DE
punchout-catalog.connection.list.date,Date,en_US
punchout-catalog.connection.list.date,Date,de_DE
punchout-catalog.connection.list.edit,Edit,en_US
punchout-catalog.connection.list.edit,Ändern,de_DE
punchout-catalog.connection.list.delete,Delete,en_US
punchout-catalog.connection.list.delete,Löschen,de_DE
punchout-catalog.connection.add-new-connection,New connection,en_US
punchout-catalog.connection.add-new-connection,Neu Anschluss,de_DE
punchout-catalog.connection.list.empty,No connections were found,en_US
punchout-catalog.connection.list.empty,Kein Anschluss wurde gefunden,de_DE
punchout-catalog.connection.create.title,Add new connection,en_US
punchout-catalog.connection.create.title,Neue Anschluss hinzufügen,de_DE
punchout-catalog.connection.name,Name,en_US
punchout-catalog.connection.name,Name,de_DE
punchout-catalog.connection.added,Connection added,en_US
punchout-catalog.connection.added,Connection wurde hinzufügt,de_DE
punchout-catalog.connection.updated,Connection updated,en_US
punchout-catalog.connection.updated,Anschluss wurde erfolgreich aktualisiert,de_DE
punchout-catalog.connection.not_updated,Error during connection update,en_US
punchout-catalog.connection.not_updated,Error during connection update DE,de_DE
punchout-catalog.error.is-not-punchout,Current session is not PunchOut,de_DE
punchout-catalog.error.is-not-punchout,Current session is not PunchOut,en_US
punchout-catalog.error.is-not-allowed,Current cart is not valid to transfer,de_DE
punchout-catalog.error.is-not-allowed,Current cart is not valid to transfer,en_US
punchout-catalog.error.missing-connection,Could not define PunchOut Connection,de_DE
punchout-catalog.error.missing-connection,Could not define PunchOut Connection,en_US
punchout-catalog.error.missing-cart-format,Could not define PunchOut Format,de_DE
punchout-catalog.error.missing-cart-format,Could not define PunchOut Format,en_US
punchout-catalog.error.general,An error happened,de_DE
punchout-catalog.error.general,An error happened,en_US
punchout-catalog.error.authentication,Authentication Failed,de_DE
punchout-catalog.error.authentication,Authentication Failed,en_US
punchout-catalog.error.invalid-data,Invalid PunchOut Format,de_DE
punchout-catalog.error.invalid-data,Invalid PunchOut Format,en_US
punchout-catalog.error.unexpected,An unexpected error happened,de_DE
punchout-catalog.error.unexpected,An unexpected error happened,en_US
punchout-catalog.cart.return,Transferring Cart to eProcurement client...,de_DE
punchout-catalog.cart.return,Transferring Cart to eProcurement client...,en_US
punchout-catalog.cart.checkout,Transfer Cart,de_DE
punchout-catalog.cart.checkout,Transfer Cart,en_US
punchout-catalog.cart.cancel,Cancel Cart & Return,de_DE
punchout-catalog.cart.cancel,Cancel Cart & Return,en_US
punchout-catalog.cart.go-to-transfer,Transfer Cart to eProcurement client,de_DE
punchout-catalog.cart.go-to-transfer,Transfer Cart to eProcurement client,en_US
punchout-catalog.cart.go-to-cancel,Cancel & Return to eProcurement client,de_DE
punchout-catalog.cart.go-to-cancel,Cancel & Return to eProcurement client,en_US
punchout-catalog.error.missing-company-business-unit,Missed Company Business Unit,de_DE
punchout-catalog.error.missing-company-business-unit,Missed Company Business Unit,en_US
punchout-catalog.error.missing-company-user,Missed Company User,de_DE
punchout-catalog.error.missing-company-user,Missed Company User,en_US
punchout-catalog.error.invalid.document.data,Invalid Document Data,de_DE
punchout-catalog.error.invalid.document.data,Invalid Document Data,en_US
punchout-catalog.error.invalid.source.data,Invalid Source Data,de_DE
punchout-catalog.error.invalid.source.data,Invalid Source Data,en_US
punchout-catalog.error.invalid.mapping.source,Invalid Mapping Source,de_DE
punchout-catalog.error.invalid.mapping.source,Invalid Mapping Source,en_US
punchout-catalog.error.invalid.mapping.format,Invalid Mapping Format,de_DE
punchout-catalog.error.invalid.mapping.format,Invalid Mapping Format,en_US
punchout-catalog.error.too-many-company-users,Customer should have only one Company user to login,de_DE
punchout-catalog.error.too-many-company-users,Customer should have only one Company user to login,en_US
```
<br>
</details>

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}

### 5) Import Data
#### Import Punchout Catalog data
Prepare your data according to your requirements using our demo data:

<details open>
<summary>vendor/punchout-catalogs/punchout-catalog-spryker/data/import/punchout_catalog_connection.csv</summary>

```html
business_unit_key,username,password,credentials,is_active,type,format,name,mapping
business-unit-regular-1,user_1,user_1_pass,,1,setup_request,cxml,Client 1 - cXml - User 1,"{
  ""customer"": {
    ""fields"": {
      ""first_name"": {
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/Extrinsic[@name='FirstName']""
      },
      ""last_name"": {
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/Extrinsic[@name='LastName']""
      },
      ""email"": {
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/Extrinsic[@name='UserEmail']""
      }
    }
  },
  ""cart_item"": {
    ""fields"": {
      ""internal_id"":{
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/ItemOut/ItemID[1]/SupplierPartAuxiliaryID""
      }
    }
  }
}"
business-unit-regular-1,user_1,user_1_pass,,1,setup_request,oci,Client 1 - Oci - User 1,"{
  ""customer"": {
    ""fields"": {
      ""first_name"": {
        ""path"": ""first_name""
      },
      ""last_name"": {
        ""path"": ""last_name""
      },
      ""email"": {
        ""path"": ""email""
      }
    }
  }
}"
Supplier_Department,user_2,user_2_pass,,1,setup_request,cxml,Client 1 - cXml - User 2,"{
  ""customer"": {
    ""fields"": {
      ""first_name"": {
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/Contact[1]/Name[1]"",
        ""transform"": [{
          ""split"": {
            ""sep"": ""\\s"",
            ""index"": ""1""
          }
        }]
      },
      ""last_name"": {
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/Contact[1]/Name[1]"",
        ""transform"": [{
          ""split"": {
            ""sep"": ""\\s"",
            ""index"": ""2""
          }
        }]
      },
      ""email"": {
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/Contact[1]/Email[1]""
      }
    }
  },
  ""cart_item"": {
    ""fields"": {
      ""internal_id"":{
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/ItemOut/ItemID[1]/SupplierPartAuxiliaryID""
      }
    }
  }
}"
Supplier_Department,user_2,user_2_pass,,1,setup_request,oci,Client 2 - Oci - User 2,"{
  ""customer"": {
    ""fields"": {
      ""first_name"": {
        ""path"": ""first_name""
      },
      ""last_name"": {
        ""path"": ""last_name""
      },
      ""email"": {
        ""path"": ""email""
      }
    }
  }
}"
business-unit-regular-1,user_10,user_10_pass,,1,setup_request,cxml,Client 2 - cXml - User 1,"{}"
business-unit-regular-1,user_20,user_20_pass,,0,setup_request,cxml,Client 2 - cXml - User 20,"{}"
business-unit-mitte-1,user_30,user_30_pass,,1,setup_request,cxml,Client 3 - cXml - User 3,"{
  ""customer"": {
    ""fields"": {
      ""first_name"": {
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/Extrinsic[@name='FirstName']""
      },
      ""last_name"": {
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/Extrinsic[@name='LastName']""
      },
      ""email"": {
        ""path"": ""/cXML/Request[1]/PunchOutSetupRequest[1]/Extrinsic[@name='UserEmail']""
      }
    }
  }
}"
business-unit-mitte-1,user_30,user_30_pass,,1,setup_request,oci,Client 3 - Oci - User 3,"{
  ""customer"": {
    ""fields"": {
      ""first_name"": {
        ""path"": ""first_name""
      },
      ""last_name"": {
        ""path"": ""last_name""
      },
      ""email"": {
        ""path"": ""email""
      }
    }
  }
}"
```
<br>
</details>


| Column | Is Obligatory? | Data Type | Data Example |
| --- | --- | --- | --- |
| `business_unit_key` | mandatory | string | `Sales_Department` |
| `username` | mandatory | string | `user_1` |
| `password` | mandatory | string | `user_1_pass` |
| `credentials` | no | string |  |
| `is_active` | mandatory | bool | `1|0` |
| `type` | mandatory | string | `setup_request` |
| `format` | mandatory | string | `cxml|oci` |
| `name` | mandatory | string | `Client 1 - cXml - User 2` |
| `mapping` | mandatory | string | |

**Data Example for mapping:** 

```html
{
  "customer": {
    "fields": {
      "first_name": {
        "path": "/cXML/Request[1]/PunchOutSetupRequest[1]/Extrinsic[@name='FirstName']"
      },
      "last_name": {
        "path": "/cXML/Request[1]/PunchOutSetupRequest[1]/Extrinsic[@name='LastName']"
      },
      "email": {
        "path": "/cXML/Request[1]/PunchOutSetupRequest[1]/Extrinsic[@name='UserEmail']"
      }
    }
  },
  "cart_item": {
    "fields": {
      "internal_id":{
        "path": "/cXML/Request[1]/PunchOutSetupRequest[1]/ItemOut/ItemID[1]/SupplierPartAuxiliaryID"
      }
    }
  }
}
```

<details open>
<summary>vendor/punchout-catalogs/punchout-catalog-spryker/data/import/punchout_catalog_connection_cart.csv</summary>

```html
connection_name,default_supplier_id,max_description_length,bundle_mode,totals_mode,encoding,mapping
Client 1 - cXml - User 1,spryker_sup_1,100,composite,header,base64,"{
  ""cart"": {
    ""fields"": {
      ""grand_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Total[1]/Money[1]""
      },
 
      ""tax_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Money[1]""
      },
      ""tax_description"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Description[1]""
      },
 
      ""discount_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Money[1]""
      },
      ""discount_description"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Description[1]""
      },
 
      ""currency"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Total[1]/Money[1]/@currency,/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Money[1]/@currency,/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Money[1]/@currency"",
                                ""append"": true
      },
                        ""cart_note"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Comments[1]""
      }
    }
  },
  ""cart_item"": {
    ""fields"": {
      ""line_number"": {
        ""path"": ""@lineNumber""
      },
                        ""parent_line_number"": {
        ""path"": ""@parentLineNumber""
      },
                        ""item_type"": {
        ""path"": ""@itemType""
      },
                        ""composite_item_type"": {
        ""path"": ""@compositeItemType""
      },
      ""quantity"": {
        ""path"": ""@quantity""
      },
      ""internal_id"": {
        ""path"": ""ItemID[1]/SupplierPartAuxiliaryID[1]""
      },
                        ""sku"": {
        ""path"": ""ItemID[1]/SupplierPartID[1],ItemDetail[1]/BuyerPartID[1],ItemDetail[1]/ManufacturerPartID[1]""
      },
                        ""unit_total"": {
        ""path"": ""ItemDetail[1]/UnitPrice[1]/Money[1]""
      },
      ""currency"": {
        ""path"": ""ItemDetail[1]/UnitPrice[1]/Money[1]/@currency""
      },
      ""name"": {
        ""path"": ""ItemDetail[1]/Description[1]/ShortName""
      },
      ""long_description"": {
        ""path"": ""ItemDetail[1]/Description[1]""
      },
      ""uom"": {
        ""path"": ""ItemDetail[1]/UnitOfMeasure[1]"",
        ""transform"": [{
          ""default"": {
            ""value"": ""EA""
          }
        }]
      },
      ""brand"": {
        ""path"": ""ItemDetail[1]/ManufacturerName[1]""
      },
      ""supplier_id"": {
        ""path"": ""ItemDetail[1]/SupplierID[1]""
      },
      ""cart_note"": {
        ""path"": ""ItemDetail[1]/Comments[1]""
      },
      ""image_url"": {
        ""path"": ""ItemDetail[1]/Extrinsic[@name='ImageURL']""
      },
      ""locale"": {
        ""path"": ""ItemDetail[1]/Description[1]/@xml:lang""
      }
    }
  }
}"
Client 1 - Oci - User 1,spryker_sup_2,128,composite,line,,"
{
  ""cart_item"": {
    ""fields"": {
      ""quantity"": {
        ""path"": ""NEW_ITEM-QUANTITY[%line_number%]""
      },
      ""internal_id"": {
        ""path"": ""NEW_ITEM-EXT_PRODUCT_ID[%line_number%]""
      },
      ""parent_line_number"": {
        ""path"": ""NEW_ITEM-PARENT_ID[%line_number%]""
      },
      ""item_type"": {
        ""path"": ""NEW_ITEM-ITEM_TYPE[%line_number%]"",
        ""transform"":
                                [
                                        {
                                                ""map"": {
                                                        ""value"": ""composite"",
                                                        ""result"": ""R""
                                                }
                                        },
                                        {
                                                ""map"": {
                                                        ""value"": ""item"",
                                                        ""result"": ""O""
                                                }
                                        }
        ]
      },
      ""sku"": {
        ""path"": ""NEW_ITEM-VENDORMAT[%line_number%],NEW_ITEM-MANUFACTMAT[%line_number%]""
      },
      ""currency"": {
        ""path"": ""NEW_ITEM-CURRENCY[%line_number%]""
      },
      ""unit_total"": {
        ""path"": ""NEW_ITEM-PRICE[%line_number%]""
      },
      ""name"": {
        ""path"": ""NEW_ITEM-DESCRIPTION[%line_number%]""
      },
      ""long_description"": {
        ""path"": ""NEW_ITEM-LONGTEXT_%line_number%:132[]""
      },
      ""uom"": {
        ""path"": ""NEW_ITEM-UNIT[%line_number%]"",
        ""transform"": [{
          ""default"": {
            ""value"": ""EA""
          }
        }]
      },
      ""unspsc"": {
        ""path"": ""NEW_ITEM-MATGROUP[%line_number%]""
      },
      ""supplier_id"": {
        ""path"": ""NEW_ITEM-VENDOR[%line_number%]""
      }
    }
  }
}"
Client 1 - cXml - User 2,spryker_sup_3,,single,line,url-encoded,"{
  ""cart"": {
    ""fields"": {
      ""grand_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Total[1]/Money[1]""
      },
 
      ""tax_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Money[1]""
      },
      ""tax_description"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Description[1]""
      },
 
      ""discount_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Money[1]""
      },
      ""discount_description"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Description[1]""
      },
                         
      ""currency"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Total[1]/Money[1]/@currency,/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Money[1]/@currency,/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Money[1]/@currency"",
        ""append"": true
      },
                        ""cart_note"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Comments[1]""
      }
    }
  },
  ""cart_item"": {
    ""fields"": {
      ""line_number"": {
        ""path"": ""@lineNumber""
      },
                        ""parent_line_number"": {
        ""path"": ""@parentLineNumber""
      },
                        ""item_type"": {
        ""path"": ""@itemType""
      },
                        ""composite_item_type"": {
        ""path"": ""@compositeItemType""
      },
      ""quantity"": {
        ""path"": ""@quantity""
      },
      ""internal_id"": {
        ""path"": ""ItemID[1]/SupplierPartAuxiliaryID[1]""
      },
      ""sku"": {
        ""path"": ""ItemID[1]/SupplierPartID[1],ItemDetail[1]/BuyerPartID[1],ItemDetail[1]/ManufacturerPartID[1]""
      },
      ""unit_total"": {
        ""path"": ""ItemDetail[1]/UnitPrice[1]/Money[1]""
      },
      ""currency"": {
        ""path"": ""ItemDetail[1]/UnitPrice[1]/Money[1]/@currency""
      },
      ""name"": {
        ""path"": ""ItemDetail[1]/Description[1]/ShortName""
      },
      ""long_description"": {
        ""path"": ""ItemDetail[1]/Description[1]""
      },
      ""uom"": {
        ""path"": ""ItemDetail[1]/UnitOfMeasure[1]"",
        ""transform"": [{
          ""default"": {
            ""value"": ""EA""
          }
        }]
      },
      ""brand"": {
        ""path"": ""ItemDetail[1]/ManufacturerName[1]""
      },
      ""supplier_id"": {
        ""path"": ""ItemDetail[1]/SupplierID[1]""
      },
      ""cart_note"": {
        ""path"": ""ItemDetail[1]/Comments[1]""
      },
      ""image_url"": {
        ""path"": ""ItemDetail[1]/Extrinsic[@name='ImageURL']""
      },
      ""locale"": {
        ""path"": ""ItemDetail[1]/Description[1]/@xml:lang""
      },
      ""options"": {
        ""path"": ""ItemDetail[1]/Extrinsic/customOption()"",
        ""multiple"": true
      }
    }
  },
  ""customOption"": {
    ""fields"": {
      ""code"": {
        ""path"": ""@name""
      },
      ""value"": {
        ""path"": ""./""
      }
    }
  }
}"
Client 2 - Oci - User 2,spryker_sup_6,,single,line,,"
{
  ""cart_item"": {
    ""fields"": {
      ""quantity"": {
        ""path"": ""NEW_ITEM-QUANTITY[%line_number%]""
      },
      ""internal_id"": {
        ""path"": ""NEW_ITEM-EXT_PRODUCT_ID[%line_number%]""
      },
      ""parent_line_number"": {
        ""path"": ""NEW_ITEM-PARENT_ID[%line_number%]""
      },
      ""item_type"": {
        ""path"": ""NEW_ITEM-ITEM_TYPE[%line_number%]"",
        ""transform"":
                                [
                                        {
                                                ""map"": {
                                                        ""value"": ""composite"",
                                                        ""result"": ""R""
                                                }
                                        },
                                        {
                                                ""map"": {
                                                        ""value"": ""item"",
                                                        ""result"": ""O""
                                                }
                                        }
        ]
      },
      ""sku"": {
        ""path"": ""NEW_ITEM-VENDORMAT[%line_number%],NEW_ITEM-MANUFACTMAT[%line_number%]""
      },
      ""currency"": {
        ""path"": ""NEW_ITEM-CURRENCY[%line_number%]""
      },
      ""unit_total"": {
        ""path"": ""NEW_ITEM-PRICE[%line_number%]""
      },
      ""name"": {
        ""path"": ""NEW_ITEM-DESCRIPTION[%line_number%]""
      },
      ""long_description"": {
        ""path"": ""NEW_ITEM-LONGTEXT_%line_number%:132[]""
      },
      ""uom"": {
        ""path"": ""NEW_ITEM-UNIT[%line_number%]"",
        ""transform"": [{
          ""default"": {
            ""value"": ""EA""
          }
        }]
      },
      ""unspsc"": {
        ""path"": ""NEW_ITEM-MATGROUP[%line_number%]""
      },
      ""supplier_id"": {
        ""path"": ""NEW_ITEM-VENDOR[%line_number%]""
      }
    }
  }
}"
Client 2 - cXml - User 1,spryker_sup_4,,composite,header,url-encoded,{}
Client 3 - cXml - User 3,spryker_sup_5,,composite,line,base64,{}
Client 2 - cXml - User 20,spryker_sup_5,,composite,line,base64,{}
Client 3 - Oci - User 3,spryker_sup_5,,composite,line,,{}
```
<br>
</details>


| Column | Is Obligatory? | Data Type | Data Example |
| --- | --- | --- | --- |
| `connection_name` | mandatory | string | `Client 1 - cXml - User 1` |
| default_supplier_id | mandatory | string | `323332` |
| max_description_length | mandatory | integer | `9999` |
| bundle_mode | mandatory | string | `composite | single` |
| totals_mode | mandatory | string | `list | header` |
| encoding | mandatory | string | `base64` |
| mapping | mandatory | string |  |

**Data Example for mapping:**

```php
{
  "cart": {
    "fields": {
      "grand_total": {
        "path": "/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Total[1]/Money[1]"
      },

      "tax_total": {
        "path": "/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Money[1]"
      },
      "tax_description": {
        "path": "/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Description[1]"
      },

      "discount_total": {
        "path": "/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Money[1]"
      },
      "discount_description": {
        "path": "/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Description[1]"
      },
                  
      "currency": {
        "path": "/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Total[1]/Money[1]/@currency,/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Money[1]/@currency,/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Money[1]/@currency",
        "append": true
      },
                  "cart_note": {
        "path": "/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Comments[1]"
      }
    }
  },
  "cart_item": {
    "fields": {
      "line_number": {
        "path": "@lineNumber"
      },
                  "parent_line_number": {
        "path": "@parentLineNumber"
      },
                  "item_type": {
        "path": "@itemType"
      },
                  "composite_item_type": {
        "path": "@compositeItemType"
      },
      "quantity": {
        "path": "@quantity"
      },
      "internal_id": {
        "path": "ItemID[1]/SupplierPartAuxiliaryID[1]"
      },
      "sku": {
        "path": "ItemID[1]/SupplierPartID[1],ItemDetail[1]/BuyerPartID[1],ItemDetail[1]/ManufacturerPartID[1]"
      },
      "unit_total": {
        "path": "ItemDetail[1]/UnitPrice[1]/Money[1]"
      },
      "currency": {
        "path": "ItemDetail[1]/UnitPrice[1]/Money[1]/@currency"
      },
      "name": {
        "path": "ItemDetail[1]/Description[1]/ShortName"
      },
      "long_description": {
        "path": "ItemDetail[1]/Description[1]"
      },
      "uom": {
        "path": "ItemDetail[1]/UnitOfMeasure[1]",
        "transform": [{
          "default": {
            "value": "EA"
          }
        }]
      },
      "brand": {
        "path": "ItemDetail[1]/ManufacturerName[1]"
      },
      "supplier_id": {
        "path": "ItemDetail[1]/SupplierID[1]"
      },
      "cart_note": {
        "path": "ItemDetail[1]/Comments[1]"
      },
      "image_url": {
        "path": "ItemDetail[1]/Extrinsic[@name='ImageURL']"
      },
      "locale": {
        "path": "ItemDetail[1]/Description[1]/@xml:lang"
      },
      "options": {
        "path": "ItemDetail[1]/Extrinsic/customOption()",
        "multiple": true
      }
    }
  },
  "customOption": {
    "fields": {
      "code": {
        "path": "@name"
      },
      "value": {
        "path": "./"
      }
    }
  }
}
```

<details open>
<summary>vendor/punchout-catalogs/punchout-catalog-spryker/data/import/punchout_catalog_connection_setup.csv</summary>

```php
connection_name,default_supplier_id,max_description_length,bundle_mode,totals_mode,encoding,mapping
Client 1 - cXml - User 1,spryker_sup_1,100,composite,header,base64,"{
  ""cart"": {
    ""fields"": {
      ""grand_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Total[1]/Money[1]""
      },
 
      ""tax_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Money[1]""
      },
      ""tax_description"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Description[1]""
      },
 
      ""discount_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Money[1]""
      },
      ""discount_description"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Description[1]""
      },
 
      ""currency"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Total[1]/Money[1]/@currency,/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Money[1]/@currency,/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Money[1]/@currency"",
                                ""append"": true
      },
                        ""cart_note"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Comments[1]""
      }
    }
  },
  ""cart_item"": {
    ""fields"": {
      ""line_number"": {
        ""path"": ""@lineNumber""
      },
                        ""parent_line_number"": {
        ""path"": ""@parentLineNumber""
      },
                        ""item_type"": {
        ""path"": ""@itemType""
      },
                        ""composite_item_type"": {
        ""path"": ""@compositeItemType""
      },
      ""quantity"": {
        ""path"": ""@quantity""
      },
      ""internal_id"": {
        ""path"": ""ItemID[1]/SupplierPartAuxiliaryID[1]""
      },
                        ""sku"": {
        ""path"": ""ItemID[1]/SupplierPartID[1],ItemDetail[1]/BuyerPartID[1],ItemDetail[1]/ManufacturerPartID[1]""
      },
                        ""unit_total"": {
        ""path"": ""ItemDetail[1]/UnitPrice[1]/Money[1]""
      },
      ""currency"": {
        ""path"": ""ItemDetail[1]/UnitPrice[1]/Money[1]/@currency""
      },
      ""name"": {
        ""path"": ""ItemDetail[1]/Description[1]/ShortName""
      },
      ""long_description"": {
        ""path"": ""ItemDetail[1]/Description[1]""
      },
      ""uom"": {
        ""path"": ""ItemDetail[1]/UnitOfMeasure[1]"",
        ""transform"": [{
          ""default"": {
            ""value"": ""EA""
          }
        }]
      },
      ""brand"": {
        ""path"": ""ItemDetail[1]/ManufacturerName[1]""
      },
      ""supplier_id"": {
        ""path"": ""ItemDetail[1]/SupplierID[1]""
      },
      ""cart_note"": {
        ""path"": ""ItemDetail[1]/Comments[1]""
      },
      ""image_url"": {
        ""path"": ""ItemDetail[1]/Extrinsic[@name='ImageURL']""
      },
      ""locale"": {
        ""path"": ""ItemDetail[1]/Description[1]/@xml:lang""
      }
    }
  }
}"
Client 1 - Oci - User 1,spryker_sup_2,128,composite,line,,"
{
  ""cart_item"": {
    ""fields"": {
      ""quantity"": {
        ""path"": ""NEW_ITEM-QUANTITY[%line_number%]""
      },
      ""internal_id"": {
        ""path"": ""NEW_ITEM-EXT_PRODUCT_ID[%line_number%]""
      },
      ""parent_line_number"": {
        ""path"": ""NEW_ITEM-PARENT_ID[%line_number%]""
      },
      ""item_type"": {
        ""path"": ""NEW_ITEM-ITEM_TYPE[%line_number%]"",
        ""transform"":
                                [
                                        {
                                                ""map"": {
                                                        ""value"": ""composite"",
                                                        ""result"": ""R""
                                                }
                                        },
                                        {
                                                ""map"": {
                                                        ""value"": ""item"",
                                                        ""result"": ""O""
                                                }
                                        }
        ]
      },
      ""sku"": {
        ""path"": ""NEW_ITEM-VENDORMAT[%line_number%],NEW_ITEM-MANUFACTMAT[%line_number%]""
      },
      ""currency"": {
        ""path"": ""NEW_ITEM-CURRENCY[%line_number%]""
      },
      ""unit_total"": {
        ""path"": ""NEW_ITEM-PRICE[%line_number%]""
      },
      ""name"": {
        ""path"": ""NEW_ITEM-DESCRIPTION[%line_number%]""
      },
      ""long_description"": {
        ""path"": ""NEW_ITEM-LONGTEXT_%line_number%:132[]""
      },
      ""uom"": {
        ""path"": ""NEW_ITEM-UNIT[%line_number%]"",
        ""transform"": [{
          ""default"": {
            ""value"": ""EA""
          }
        }]
      },
      ""unspsc"": {
        ""path"": ""NEW_ITEM-MATGROUP[%line_number%]""
      },
      ""supplier_id"": {
        ""path"": ""NEW_ITEM-VENDOR[%line_number%]""
      }
    }
  }
}"
Client 1 - cXml - User 2,spryker_sup_3,,single,line,url-encoded,"{
  ""cart"": {
    ""fields"": {
      ""grand_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Total[1]/Money[1]""
      },
 
      ""tax_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Money[1]""
      },
      ""tax_description"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Description[1]""
      },
 
      ""discount_total"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Money[1]""
      },
      ""discount_description"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Description[1]""
      },
                         
      ""currency"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Total[1]/Money[1]/@currency,/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Tax[1]/Money[1]/@currency,/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Discount[1]/Money[1]/@currency"",
        ""append"": true
      },
                        ""cart_note"": {
        ""path"": ""/cXML/Message[1]/PunchOutOrderMessage[1]/PunchOutOrderMessageHeader[1]/Comments[1]""
      }
    }
  },
  ""cart_item"": {
    ""fields"": {
      ""line_number"": {
        ""path"": ""@lineNumber""
      },
                        ""parent_line_number"": {
        ""path"": ""@parentLineNumber""
      },
                        ""item_type"": {
        ""path"": ""@itemType""
      },
                        ""composite_item_type"": {
        ""path"": ""@compositeItemType""
      },
      ""quantity"": {
        ""path"": ""@quantity""
      },
      ""internal_id"": {
        ""path"": ""ItemID[1]/SupplierPartAuxiliaryID[1]""
      },
      ""sku"": {
        ""path"": ""ItemID[1]/SupplierPartID[1],ItemDetail[1]/BuyerPartID[1],ItemDetail[1]/ManufacturerPartID[1]""
      },
      ""unit_total"": {
        ""path"": ""ItemDetail[1]/UnitPrice[1]/Money[1]""
      },
      ""currency"": {
        ""path"": ""ItemDetail[1]/UnitPrice[1]/Money[1]/@currency""
      },
      ""name"": {
        ""path"": ""ItemDetail[1]/Description[1]/ShortName""
      },
      ""long_description"": {
        ""path"": ""ItemDetail[1]/Description[1]""
      },
      ""uom"": {
        ""path"": ""ItemDetail[1]/UnitOfMeasure[1]"",
        ""transform"": [{
          ""default"": {
            ""value"": ""EA""
          }
        }]
      },
      ""brand"": {
        ""path"": ""ItemDetail[1]/ManufacturerName[1]""
      },
      ""supplier_id"": {
        ""path"": ""ItemDetail[1]/SupplierID[1]""
      },
      ""cart_note"": {
        ""path"": ""ItemDetail[1]/Comments[1]""
      },
      ""image_url"": {
        ""path"": ""ItemDetail[1]/Extrinsic[@name='ImageURL']""
      },
      ""locale"": {
        ""path"": ""ItemDetail[1]/Description[1]/@xml:lang""
      },
      ""options"": {
        ""path"": ""ItemDetail[1]/Extrinsic/customOption()"",
        ""multiple"": true
      }
    }
  },
  ""customOption"": {
    ""fields"": {
      ""code"": {
        ""path"": ""@name""
      },
      ""value"": {
        ""path"": ""./""
      }
    }
  }
}"
Client 2 - Oci - User 2,spryker_sup_6,,single,line,,"
{
  ""cart_item"": {
    ""fields"": {
      ""quantity"": {
        ""path"": ""NEW_ITEM-QUANTITY[%line_number%]""
      },
      ""internal_id"": {
        ""path"": ""NEW_ITEM-EXT_PRODUCT_ID[%line_number%]""
      },
      ""parent_line_number"": {
        ""path"": ""NEW_ITEM-PARENT_ID[%line_number%]""
      },
      ""item_type"": {
        ""path"": ""NEW_ITEM-ITEM_TYPE[%line_number%]"",
        ""transform"":
                                [
                                        {
                                                ""map"": {
                                                        ""value"": ""composite"",
                                                        ""result"": ""R""
                                                }
                                        },
                                        {
                                                ""map"": {
                                                        ""value"": ""item"",
                                                        ""result"": ""O""
                                                }
                                        }
        ]
      },
      ""sku"": {
        ""path"": ""NEW_ITEM-VENDORMAT[%line_number%],NEW_ITEM-MANUFACTMAT[%line_number%]""
      },
      ""currency"": {
        ""path"": ""NEW_ITEM-CURRENCY[%line_number%]""
      },
      ""unit_total"": {
        ""path"": ""NEW_ITEM-PRICE[%line_number%]""
      },
      ""name"": {
        ""path"": ""NEW_ITEM-DESCRIPTION[%line_number%]""
      },
      ""long_description"": {
        ""path"": ""NEW_ITEM-LONGTEXT_%line_number%:132[]""
      },
      ""uom"": {
        ""path"": ""NEW_ITEM-UNIT[%line_number%]"",
        ""transform"": [{
          ""default"": {
            ""value"": ""EA""
          }
        }]
      },
      ""unspsc"": {
        ""path"": ""NEW_ITEM-MATGROUP[%line_number%]""
      },
      ""supplier_id"": {
        ""path"": ""NEW_ITEM-VENDOR[%line_number%]""
      }
    }
  }
}"
Client 2 - cXml - User 1,spryker_sup_4,,composite,header,url-encoded,{}
Client 3 - cXml - User 3,spryker_sup_5,,composite,line,base64,{}
Client 2 - cXml - User 20,spryker_sup_5,,composite,line,base64,{}
Client 3 - Oci - User 3,spryker_sup_5,,composite,line,,{}
```
<br>
</details>

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `connection_name` | mandatory | string | `Client 1 - cXml - User 1` | Name of the PunchoutCatalog connection. |
| `business_unit_key` | mandatory | string | `Sales_Department` | Allows customers to configure in which BU the new company user should be created (dynamic login mode) |
| `company_user_key` | mandatory | string | `Ottom--1` | Defines a dedicated company user that will be used by all ERP users (single company user login mode) |
| `login_mode` | mandatory | string | `single_user | dynamic_user_creation` | Defines if the connection uses "dynamic login" or "single company user login". |

Register the following plugins to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PunchoutCatalogConnectionDataImportPlugin` | Imports connections data into the database. | None | `PunchoutCatalog\Zed\PunchoutCatalog\Communication\Plugin\DataImport` |
| `PunchoutCatalogSetupDataImportPlugin` | Imports connections setup data into the database. | None | `PunchoutCatalog\Zed\PunchoutCatalog\Communication\Plugin\DataImport` |
| `PunchoutCatalogCartDataImportPlugin` | Imports connections cart data into the database. | None | `PunchoutCatalog\Zed\PunchoutCatalog\Communication\Plugin\DataImport` |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php
  
namespace Pyz\Zed\DataImport;
  
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use PunchoutCatalog\Zed\PunchoutCatalog\Communication\Plugin\DataImport\PunchoutCatalogCartDataImportPlugin;
use PunchoutCatalog\Zed\PunchoutCatalog\Communication\Plugin\DataImport\PunchoutCatalogConnectionDataImportPlugin;
use PunchoutCatalog\Zed\PunchoutCatalog\Communication\Plugin\DataImport\PunchoutCatalogSetupDataImportPlugin;
 
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new PunchoutCatalogConnectionDataImportPlugin(),
            new PunchoutCatalogSetupDataImportPlugin(),
            new PunchoutCatalogCartDataImportPlugin(),     
        ];
    }
}
```

Run the following console command to import data:

```bash
console data:import punchout-catalog-connection
console data:import punchout-catalog-connection-setup
console data:import punchout-catalog-connection-cart
```

{% info_block warningBox "Verification" %}
Make sure that the configured data are added to the `pgw_punchout_catalog_connection`, `pgw_punchout_catalog_connection_cart`, `pgw_punchout_catalog_connection_setup`  tables in the database.
{% endinfo_block %}

### 6) Set up Behavior
#### Set up Punchout Catalogs Workflow
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `DisallowPunchoutCompanyUserChangePlugin` | Prevets company user change for logged in punchout catalog customers.  | None | `PunchoutCatalog\Client\PunchoutCatalog\Plugin\BusinessOnBehalf.` |
| `SingleCompanyUserDatabaseStrategyPreCheckPlugin` | Disables persistent cart for Single User `PunchoutCatalog` connection types. | None | `PunchoutCatalog\Client\PunchoutCatalog\Plugin\Quote` |
| `ProductBundleCartItemTransformerPlugin` | Provides functionality to transform bundled items structure during punchout catalog cart transfer. | This plugin should be registered only if ProductBundle feature is already present. | `PunchoutCatalog\Yves\PunchoutCatalog\Plugin\PunchoutCatalog` |
| `ImpersonationDetailsCustomerOauthRequestMapperPlugin` | Maps Punchout impersonation details from `CustomerTransfer` into access token request. | None | `PunchoutCatalog\Zed\PunchoutCatalog\Communication\Plugin\OauthCompanyUser` |
| `ImpersonationDetailsCustomerExpanderPlugin` | Expands `CustomerTransfer` with Punchout impersonation details. | None |`PunchoutCatalog\Zed\PunchoutCatalog\Communication\Plugin\OauthCompanyUser` |

**src/Pyz/Client/BusinessOnBehalf/BusinessOnBehalfDependencyProvider.php**

```php
<?php
 
namespace Pyz\Client\BusinessOnBehalf;
 
use PunchoutCatalog\Client\PunchoutCatalog\Plugin\BusinessOnBehalf\DisallowPunchoutCompanyUserChangePlugin;
use Spryker\Client\BusinessOnBehalf\BusinessOnBehalfDependencyProvider as BaseBusinessOnBehalfDependencyProvider;
 
class BusinessOnBehalfDependencyProvider extends BaseBusinessOnBehalfDependencyProvider
{
    /**
     * @return \Spryker\Client\BusinessOnBehalfExtension\Dependency\Plugin\CompanyUserChangeAllowedCheckPluginInterface[]
     */
    protected function getCompanyUserChangeAllowedCheckPlugins(): array
    {
        return [
            new DisallowPunchoutCompanyUserChangePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that you can't change the company user in your account details when you are in progress of transferred cart creation.
{% endinfo_block %}

**src/Pyz/Client/Quote/QuoteDependencyProvider.php**

```php
<?php
 
namespace Pyz\Client\Quote;
 
use PunchoutCatalog\Client\PunchoutCatalog\Plugin\Quote\SingleCompanyUserDatabaseStrategyPreCheckPlugin;
use Spryker\Client\Quote\QuoteDependencyProvider as BaseQuoteDependencyProvider;
 
class QuoteDependencyProvider extends BaseQuoteDependencyProvider
{
    /**
     * @return \Spryker\Client\QuoteExtension\Dependency\Plugin\DatabaseStrategyPreCheckPluginInterface[]
     */
    protected function getDatabaseStrategyPreCheckPlugins(): array
    {
        return [
            new SingleCompanyUserDatabaseStrategyPreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that punchout catalogs carts for `SingleUser` connection types do not appear in `spy_quote` DB table.
{% endinfo_block %}

**src/Pyz/Yves/PunchoutCatalog/PunchoutCatalogDependencyProvider.php**

```php
<?php
 
namespace Pyz\Yves\PunchoutCatalog;
 
use PunchoutCatalog\Yves\PunchoutCatalog\Plugin\PunchoutCatalog\ProductBundleCartItemTransformerPlugin;
use PunchoutCatalog\Yves\PunchoutCatalog\PunchoutCatalogDependencyProvider as BasePunchoutCatalogDependencyProvider;
 
/**
 * @method \PunchoutCatalog\Yves\PunchoutCatalog\PunchoutCatalogConfig getConfig()
 */
class PunchoutCatalogDependencyProvider extends BasePunchoutCatalogDependencyProvider
{
    /**
     * @return \PunchoutCatalog\Yves\PunchoutCatalog\Dependency\Plugin\CartItemTransformerPluginInterface[]
     */
    protected function getCartItemTransformerPlugins(): array
    {
        return [
            new ProductBundleCartItemTransformerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that in transferred cart XML bundled product items has `childBundleItems` section (in case you have Product Bundles feature - otherwise this plugin should not be registered
{% endinfo_block %}.)

**src/Pyz/Zed/OauthCompanyUser/OauthCompanyUserDependencyProvider.php**

```php
namespace Pyz\Zed\OauthCompanyUser;
 
use PunchoutCatalog\Zed\PunchoutCatalog\Communication\Plugin\OauthCompanyUser\ImpersonationDetailsCustomerExpanderPlugin;
use PunchoutCatalog\Zed\PunchoutCatalog\Communication\Plugin\OauthCompanyUser\ImpersonationDetailsCustomerOauthRequestMapperPlugin;
use Spryker\Zed\OauthCompanyUser\OauthCompanyUserDependencyProvider as SprykerOauthCompanyUserDependencyProvider;

class OauthCompanyUserDependencyProvider extends SprykerOauthCompanyUserDependencyProvider
{
    /**
     * @return \Spryker\Zed\OauthCompanyUserExtension\Dependency\Plugin\CustomerOauthRequestMapperPluginInterface[]
     */
    protected function getCustomerOauthRequestMapperPlugins(): array
    {
        return [
            new ImpersonationDetailsCustomerOauthRequestMapperPlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Zed\OauthCompanyUserExtension\Dependency\Plugin\CustomerExpanderPluginInterface[]
     */
    protected function getCustomerExpanderPlugins(): array
    {
        return [
            new ImpersonationDetailsCustomerExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that when you chose the supplier for transferred cart in ERP, and redirected to the shop - you are logged in.
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Cart | 202009.0 |
| Spryker Core | 202009.0 |

### 1) Set up Widgets
Register the following global widgets:

| Plugin | Description | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PunchoutCatalogCheckoutButtonsWidget` | Displays `Transfer Cart` and `Cancel Cart & Return` buttons on the cart page. | None | `PunchoutCatalog\Yves\PunchoutCatalog\Widget` |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use PunchoutCatalog\Yves\PunchoutCatalog\Widget\PunchoutCatalogCheckoutButtonsWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
 
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            PunchoutCatalogCheckoutButtonsWidget::class,
        ];
    }
}
```

Adjust codebase to register `PunchoutCatalogCheckoutButtonsWidget` widget.

**src/Pyz/Yves/CartPage/CartPageDependencyProvider.php**

```php
<?php
 
namespace Pyz\Yves\CartPage;
 
use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use Spryker\Yves\Kernel\Container;
use SprykerShop\Yves\CartPage\Dependency\Client\CartPageToCustomerClientBridge;
 
class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    public const CLIENT_CUSTOMER = 'CLIENT_CUSTOMER';
 
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = $this->addCustomerClient($container);
 
        return $container;
    }
 
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addCustomerClient(Container $container)
    {
        $container[static::CLIENT_CUSTOMER] = function (Container $container) {
            return $container->getLocator()->customer()->client();
        };
 
        return $container;
    }
}
```
 
 **src/Pyz/Yves/CartPage/CartPageFactory.php**

```php
<?php
 
namespace Pyz\Yves\CartPage;
 
use SprykerShop\Yves\CartPage\CartPageFactory as SprykerCartPageFactory;
use SprykerShop\Yves\CartPage\Dependency\Client\CartPageToCustomerClientInterface;
 
class CartPageFactory extends SprykerCartPageFactory
{
    /**
     * @return \SprykerShop\Yves\CartPage\Dependency\Client\CartPageToCustomerClientInterface
     */
    public function getCustomerClient(): CartPageToCustomerClientInterface
    {
        return $this->getProvidedDependency(CartPageDependencyProvider::CLIENT_CUSTOMER);
    }
}
```

**src/Pyz/Yves/CartPage/Controller/CartController.php**

```php
namespace Pyz\Yves\CartPage\Controller;
 
use SprykerShop\Yves\CartPage\Controller\CartController as SprykerCartController;
use SprykerShop\Yves\ShopApplication\Controller\AbstractController;
 
/**
 * @method \SprykerShop\Yves\CartPage\CartPageFactory getFactory()
 */
class CartController extends SprykerCartController
{
    /**
     * @param array|null $selectedAttributes
     *
     * @return array
     */
    protected function executeIndexAction(?array $selectedAttributes): array
    {
        $data = parent::executeIndexAction($selectedAttributes);
 
        $data['customer'] = $$this->getFactory()
            ->getCustomerClient()
            ->getCustomer();
 
        return $data;
    }
```

**src/Pyz/Yves/CartPage/Theme/default/components/molecules/cart-summary/cart-summary.twig**

```html
{% raw %}{%{% endraw %} define data = {
    customer: required,
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} set canProceedToCheckout = data.cart.items is not empty
    and data.isQuoteValid
    and (not is_granted('ROLE_USER') or can('WriteSharedCartPermissionPlugin', data.cart.idQuote))
    and (not is_granted('ROLE_USER')
        or can('WriteSharedCartPermissionPlugin', data.cart.idQuote)
        or data.customer.punchoutCatalogImpersonationDetails.is_punchout
    )
{% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if canProceedToCheckout {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} if data.customer.punchoutCatalogImpersonationDetails.is_punchout is defined {% raw %}%}{% endraw %}
            <hr>
            {% raw %}{%{% endraw %} widget 'PunchoutCatalogCheckoutButtonsWidget' args [data.customer] {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} widget 'ProceedToCheckoutButtonWidget' args [data.cart] {% raw %}%}{% endraw %}
                 {% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
                     <hr>
                     {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
                 {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

**src/Pyz/Yves/CartPage/Theme/default/templates/page-layout-cart/page-layout-cart.twig**

```html
{% raw %}{%{% endraw %} define data = {
    customer: _view.customer,
} {% raw %}%}{% endraw %}
 
  {% raw %}{%{% endraw %} block cartSummary {% raw %}%}{% endraw %}
     {% raw %}{%{% endraw %} include molecule('cart-summary', 'CartPage') with {
         data: {
             customer: data.customer,
         },
     } only {% raw %}%}{% endraw %}
  {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

Run the following command to enable Javascript and CSS changes:
```bash
console frontend:yves:build
```
{% info_block warningBox "Verification" %}
Make sure that you see `Transfer Cart` and `Cancel Cart & Return` buttons on the cart page for `PunchoutCatalog` carts.
{% endinfo_block %}

### 2) Enable Controllers
Register the following plugin:

| Plugin | Description | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PunchoutCatalogControllerProvider` | Provides routes used in `PunchoutCatalogCheckoutButtonsWidget`. | None | `PunchoutCatalog\Yves\PunchoutCatalog\Plugin\Provider` |

**src/Pyz/Yves/ShopApplication/YvesBootstrap.php**

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use PunchoutCatalog\Yves\PunchoutCatalog\Plugin\Provider\PunchoutCatalogControllerProvider;
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;
 
class YvesBootstrap extends SprykerYvesBootstrap
{
    /**
     * @param bool|null $isSsl
     *
     * @return \SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider[]
     */
    protected function getControllerProviderStack($isSsl)
    {
        return [
            new PunchoutCatalogControllerProvider($isSsl),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that when you click `Transfer Cart` button on a cart page, it redirects you back to the connected ERP system.
{% endinfo_block %}

### 3) Set up Behavior
#### Set up Punchout Catalogs Workflow

**src/Pyz/Yves/CustomerPage/Controller/AccessTokenController.php**

```php
<?php
 
namespace Pyz\Yves\CustomerPage\Controller;
 
use SprykerShop\Yves\CustomerPage\Controller\AccessTokenController as SprykerAccessTokenController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
 
/**
 * @method \SprykerShop\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class AccessTokenController extends SprykerAccessTokenController
{
    /**
     * @param string $token
     * @param \Symfony\Component\HttpFoundation\Request|null $request
     *
     * @throws \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(string $token, ?Request $request = null): RedirectResponse
    {
        $customerResponseTransfer = $this
            ->getFactory()
            ->getCustomerClient()
            ->getCustomerByAccessToken($token);
 
        if (!$customerResponseTransfer->getIsSuccess()) {
            $this->addErrorMessage(static::GLOSSARY_KEY_INVALID_ACCESS_TOKEN);
            throw new AccessDeniedHttpException();
        }
 
        if ($this->isLoggedInCustomer()) {
            $this->getFactory()
                ->getCustomerClient()
                ->logout();
        }
 
        $customerTransfer = $customerResponseTransfer->getCustomerTransfer();
        $token = $this->getFactory()->createUsernamePasswordToken($customerTransfer);
 
        $this->getFactory()
            ->createCustomerAuthenticator()
            ->authenticateCustomer($customerTransfer, $token);
 
        $returnRoute = $this->getReturnRoute($request);
 
        return $this->redirectResponseInternal($returnRoute);
    }
 
    /**
     * @param \Symfony\Component\HttpFoundation\Request|null $request
     *
     * @return string
     */
    protected function getReturnRoute(?Request $request = null): string
    {
        if ($request === null) {
            return static::ROUTE_CUSTOMER_OVERVIEW;
        }
 
        $returnRoute = $request->query->get('returnUrl');
 
        return empty($returnRoute) ? static::ROUTE_CUSTOMER_OVERVIEW : $returnRoute;
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that when you came to shop from ERP it logins you by the proper user, according to your connection Login Mode preferences, even if previously you were logged in by another customer.
{% endinfo_block %}
