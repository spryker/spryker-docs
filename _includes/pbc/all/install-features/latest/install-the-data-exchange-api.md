This document describes how to install the Data Exchange API.

Data Exchange API is a powerful tool that enables seamless interaction with databases. You can easily access data by sending requests to a dedicated API endpoint. It lets you retrieve, create, update, and manage data in a flexible and efficient manner.

## Install feature core

Follow the steps below to install the Data Exchange API core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Glue Backend Api Application | {{page.version}} | [Integrate Storefront and Backend Glue API applications](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-storefront-and-backend-glue-api-applications.html) |
| Glue Authentication | {{page.version}} | [Glue API - Authentication integration](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html) |

### Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/dynamic-entity-backend-api:"^1.12.0" spryker/dynamic-entity-gui:"^1.3.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| DynamicEntity | vendor/spryker/dynamic-entity |
| DynamicEntityBackendApi | vendor/spryker/dynamic-entity-backend-api |
| DynamicEntityGui | vendor/spryker/dynamic-entity-gui |

{% endinfo_block %}

### Set up the configuration

1. Move the following commands into the `setup-glue` section after the `demodata` step:

**config/install/docker.yml**

```yaml
setup-glue:
    controller-cache-warmup:
        command: 'vendor/bin/glue glue-api:controller:cache:warm-up'

    api-generate-documentation:
        command: 'vendor/bin/glue api:generate:documentation'
```

2. By default, requests are sent to `/dynamic-entity/{entity-alias}`. To replace the `dynamic-entity` part of the endpoint, adjust `DynamicEntityBackendApiConfig`:

**src/Pyz/Glue/DynamicEntityBackendApi/DynamicEntityBackendApiConfig.php**

```php
<?php

namespace Pyz\Glue\DynamicEntityBackendApi;

use Spryker\Glue\DynamicEntityBackendApiDynamicEntityBackendApiConfig as SprykerDynamicEntityBackendApiConfig;

class DynamicEntityBackendApiConfig extends SprykerDynamicEntityBackendApiConfig
{
    /**
     * Specification:
     * - Returns a route prefix value for a dynamic entity.
     *
     * @api
     *
     * @return string
     */
    public function getRoutePrefix(): string
    {
        return 'your-route-prefix';
    }
}
```

3. Optional: The Data Exchange API provides a logging mechanism to capture important information about requests and thrown exceptions.
   Logging is enabled by default. To disable logging or change the path of the log file, adjust `DynamicEntityBackendApiConfig`:

**src/Pyz/Glue/DynamicEntityBackendApi/DynamicEntityBackendApiConfig.php**

```php
<?php

namespace Pyz\Glue\DynamicEntityBackendApi;

use Spryker\Glue\DynamicEntityBackendApiDynamicEntityBackendApiConfig as SprykerDynamicEntityBackendApiConfig;

class DynamicEntityBackendApiConfig extends SprykerDynamicEntityBackendApiConfig
{
    /**
     * Specification:
     * - Returns absolute file path for dynamic entities logs.
     *
     * @api
     *
     * @return string
     */
    public function getLogFilepath(): string
    {
        return 'your-log-filepath.log';
    }

    /**
     * Specification:
     * - Defines whether logging for dynamic entities is enabled.
     *
     * @api
     *
     * @return bool
     */
    public function isLoggingEnabled(): bool
    {
        return true;
    }
}
```

<a name="exclude-database-schemas-from-configuring"></a>

4. Optional: To exclude database schemas from configuring, define them as follows:

**src/Pyz/Zed/DynamicEntityGui/DynamicEntityGuiConfig.php**

```php
<?php

namespace Pyz\Zed\DynamicEntityGui;

use Spryker\Zed\DynamicEntityGuiConfig as SprykerDynamicEntityGuiConfig;

class DynamicEntityGuiConfig extends SprykerDynamicEntityGuiConfig
{
    /**
     * Specification:
     * - Returns a list of tables that should not be used for dynamic entity configuration.
     *
     * @api
     *
     * @return array<string>
     */
    public function getDisallowedTables(): array
    {
        return [
            'spy_dynamic_entity_configuration',
        ];
    }
}
```

{% info_block infoBox "" %}

Tables that aren't allowed for configuration are defined in `Spryker\Zed\DynamicEntity\Business\Reader\DisallowedTablesReader::getDefaultDisallowedTables()`.

{% endinfo_block %}



### Configure Dynamic Data installation

1. Optional: To set the default configuration data, create a configuration file following the example:

<details><summary>src/Pyz/Zed/DynamicEntity/data/installer/configuration.json</summary>

#### Example

```json
[
  {
        "tableName": "spy_tax_rate",
        "tableAlias": "taxRates",
        "isActive": true,
        "definition": {
            "identifier": "id_tax_rate",
            "isDeletable": false,
            "fields": [
                {
                    "fieldName": "id_tax_rate",
                    "fieldVisibleName": "id_tax_rate",
                    "isCreatable": true,
                    "isEditable": true,
                    "type": "integer",
                    "validation": { "isRequired": false }
                },
                {
                    "fieldName": "fk_country",
                    "fieldVisibleName": "fk_country",
                    "isCreatable": true,
                    "isEditable": true,
                    "type": "integer",
                    "validation": { "isRequired": false }
                },
                {
                    "fieldName": "name",
                    "fieldVisibleName": "name",
                    "isCreatable": true,
                    "isEditable": true,
                    "type": "string",
                    "validation": { "isRequired": true }
                },
                {
                    "fieldName": "rate",
                    "fieldVisibleName": "rate",
                    "isCreatable": true,
                    "isEditable": true,
                    "type": "float",
                    "validation": { "isRequired": true }
                }
            ]
        }
    },
    {
      "tableName": "spy_country",
      "tableAlias": "countries",
      "isActive": true,
      "definition": {
        "identifier": "id_country",
        "isDeletable": false,
        "fields": [
          {
            "fieldName": "id_country",
            "fieldVisibleName": "id_country",
            "isCreatable": true,
            "isEditable": true,
            "type": "integer",
            "validation": { "isRequired": false }
          },
          {
            "fieldName": "iso2_code",
            "fieldVisibleName": "iso2_code",
            "isCreatable": true,
            "isEditable": true,
            "type": "string",
            "validation": { "isRequired": true }
          },
          {
            "fieldName": "iso3_code",
            "fieldVisibleName": "iso3_code",
            "isCreatable": true,
            "isEditable": true,
            "type": "string",
            "validation": { "isRequired": false }
          },
          {
            "fieldName": "name",
            "fieldVisibleName": "name",
            "isCreatable": true,
            "isEditable": true,
            "type": "string",
            "validation": { "isRequired": false }
          },
          {
            "fieldName": "postal_code_mandatory",
            "fieldVisibleName": "postal_code_mandatory",
            "isCreatable": true,
            "isEditable": true,
            "type": "string",
            "validation": { "isRequired": false }
          },
          {
            "fieldName": "postal_code_regex",
            "fieldVisibleName": "postal_code_regex",
            "isCreatable": true,
            "isEditable": true,
            "type": "string",
            "validation": { "isRequired": false }
          }
        ]
      },
      "childRelations": [
        {
          "name": "countryTaxRates",
          "isEditable": true,
          "childDynamicEntityConfiguration": {
            "tableAlias": "tax-rates"
          },
          "relationFieldMappings": [
            {
              "childFieldName": "fk_country",
              "parentFieldName": "id_country"
            }
           ]
        }
     ]
    }
]
```

</details>

</details>


2. Import new configuration relations:

```bash
vendor/bin/console setup:init-db
```

{% info_block warningBox "Verification" %}

To check the configuration in the database, send the following request:

```bash
GET /dynamic-entity/countries?include=countryTaxRates HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
```

Response sample:

```json
{
    "data": [
        {
            "id_country": 60,
            "iso2_code": "DE",
            "iso3_code": "DEU",
            "name": "Germany",
            "postal_code_mandatory": true,
            "postal_code_regex": "\\d{5}",
            "countryTaxRates": [
                {
                    "id_tax_rate": 7,
                    "fk_country": 60,
                    "name": "Germany Standard",
                    "rate": "19.00"
                },
                {
                    "id_tax_rate": 16,
                    "fk_country": 60,
                    "name": "Germany Reduced",
                    "rate": "7.00"
                }
            ]
        },
        // ... other countries with tax rates
    ]
}
```

{% endinfo_block %}





{% info_block infoBox "" %}
Structure:

| Name                                                      | Imported to                                                                     | Description                                                                                                                                                                                                                                                                                     |
|-----------------------------------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| tableName                                                 | spy_dynamic_entity_configuration.table_name                                     | For details see [How to configure Data Exchange API](/docs/pbc/all/data-exchange/202311.0/configure-data-exchange-api.html#create-and-configure-a-data-exchange-api-endpoint)                                                                                                          |
| tableAlias                                                | spy_dynamic_entity_configuration.table_alias                                    | For details see [How to configure Data Exchange API](/docs/pbc/all/data-exchange/202311.0/configure-data-exchange-api.html#create-and-configure-a-data-exchange-api-endpoint)                                                                                                          |
| isActive                                                  | spy_dynamic_entity_configuration.is_active                                      | For details see [How to configure Data Exchange API](/docs/pbc/all/data-exchange/202311.0/configure-data-exchange-api.html#create-and-configure-a-data-exchange-api-endpoint)                                                                                                          |
| definition                                                | spy_dynamic_entity_configuration.definition                                     | For details see [How to configure Data Exchange API](/docs/pbc/all/data-exchange/202311.0/configure-data-exchange-api.html#create-and-configure-a-data-exchange-api-endpoint)                                                                                                          |
| childRelations                                            | spy_dynamic_entity_configuration_relation                                       | Relation between two Data Exchange API configurations. Allows to execute complex requests to retrieve or save data together with relations. See details [How to send request in data exchange API](/docs/pbc/all/data-exchange/202311.0/sending-requests-with-data-exchange-api.html) |
| childRelations.name                                       | spy_dynamic_entity_configuration_relation.name                                  | Name of the relation, used to include relations as part of Data Exchange API requests, see details [How to send request in data exchange API](/docs/pbc/all/data-exchange/202311.0/sending-requests-with-data-exchange-api.html)                                                      |
| childRelations.isEditable                                 | spy_dynamic_entity_configuration_relation.is_editable                           | If set to `false` limits relation functionality to only GET requests, POST/PATCH/PUT requests are restricted.                                                                                                                                                                                   |
| childRelations.childDynamicEntityConfiguration.tableAlias | spy_dynamic_entity_configuration_relation.fk_child_dynamic_entity_configuration | The alias of the child Data Exchange API configuration for the relation, parent configuration details are determined based on the configuration where the child relations added.                                                                                                                |
| childRelations.relationFieldMapping                       | spy_dynamic_entity_configuration_relation_field_mapping                         | Details about how child and parent configuration of the relations are connected.                                                                                                                                                                                                                |

{% endinfo_block %}

3. Add the path to the configuration file:

**src/Pyz/Zed/DynamicEntity/DynamicEntityConfig.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DynamicEntity;

use Spryker\Zed\DynamicEntity\DynamicEntityConfig as SprykerDynamicEntityConfig;

class DynamicEntityConfig extends SprykerDynamicEntityConfig
{
    /**
     * @var string
     */
    protected const CONFIGURATION_FILE_PATH = '%s/src/Pyz/Zed/DynamicEntity/data/installer/configuration.json';

    /**
     * @return string
     */
    public function getInstallerConfigurationDataFilePath(): string
    {
        return sprintf(static::CONFIGURATION_FILE_PATH, APPLICATION_ROOT_DIR);
    }
}
```

### Set up database schema and transfer objects

1. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure you've triggered the following changes by checking the database:

| DATABASE ENTITY | TYPE |
| --- | --- |
| spy_dynamic_entity_configuration | table |
| spy_dynamic_entity_configuration_relation | table |
| spy_dynamic_entity_configuration_relation_field_mapping | table |

Make sure the following transfers have been created:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ApiApplicationSchemaContext | class | created | src/Generated/Shared/Transfer/ApiApplicationSchemaContextTransfer.php |
| CriteriaRangeFilter | class | created | src/Generated/Shared/Transfer/CriteriaRangeFilterTransfer.php |
| DocumentationInvalidationVoterRequest | class | created | src/Generated/Shared/Transfer/DocumentationInvalidationVoterRequestTransfer.php |
| DynamicApiDefinition | class | created | src/Generated/Shared/Transfer/DynamicApiDefinitionTransfer.php |
| DynamicEntity | class | created | src/Generated/Shared/Transfer/DynamicEntityTransfer.php |
| DynamicEntityCollection | class | created | src/Generated/Shared/Transfer/DynamicEntityCollectionTransfer.php |
| DynamicEntityCollectionDeleteCriteria | class | created | src/Generated/Shared/Transfer/DynamicEntityCollectionDeleteCriteriaTransfer.php |
| DynamicEntityCollectionRequest | class | created | src/Generated/Shared/Transfer/DynamicEntityCollectionRequestTransfer.php |
| DynamicEntityCollectionResponse | class | created | src/Generated/Shared/Transfer/DynamicEntityCollectionResponseTransfer.php |
| DynamicEntityConfiguration | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationTransfer.php |
| DynamicEntityConfigurationCollection | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationCollectionTransfer.php |
| DynamicEntityConfigurationCollectionRequest | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationCollectionRequestTransfer.php |
| DynamicEntityConfigurationCollectionResponse | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationCollectionResponseTransfer.php |
| DynamicEntityConfigurationConditions | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationConditionsTransfer.php |
| DynamicEntityConfigurationCriteria | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationCriteriaTransfer.php |
| DynamicEntityConfigurationRelation | class | created | src/Generated/Shared/Transfer/DynamicEntityConfigurationRelationTransfer.php |
| DynamicEntityConditions | class | created | src/Generated/Shared/Transfer/DynamicEntityConditionsTransfer.php |
| DynamicEntityCriteria | class | created | src/Generated/Shared/Transfer/DynamicEntityCriteriaTransfer.php |
| DynamicEntityDefinition | class | created | src/Generated/Shared/Transfer/DynamicEntityDefinitionTransfer.php |
| DynamicEntityFieldCondition | class | created | src/Generated/Shared/Transfer/DynamicEntityFieldConditionTransfer.php |
| DynamicEntityFieldDefinition | class | created | src/Generated/Shared/Transfer/DynamicEntityFieldDefinitionTransfer.php |
| DynamicEntityFieldValidation | class | created | src/Generated/Shared/Transfer/DynamicEntityFieldValidationTransfer.php |
| DynamicEntityRelation | class | created | src/Generated/Shared/Transfer/DynamicEntityRelationTransfer.php |
| DynamicEntityRelationFieldMapping | class | created | src/Generated/Shared/Transfer/DynamicEntityRelationFieldMappingTransfer.php |
| Error | class | created | src/Generated/Shared/Transfer/ErrorTransfer.php |
| ErrorCollection | class | created | src/Generated/Shared/Transfer/ErrorCollectionTransfer.php |
| GlueError | class | created | src/Generated/Shared/Transfer/GlueErrorTransfer.php |
| GlueFilter | class | created | src/Generated/Shared/Transfer/GlueFilterTransfer.php |
| GlueRequest | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer.php |
| GlueResource | class | created | src/Generated/Shared/Transfer/GlueResourceTransfer.php |
| GlueResponse | class | created | src/Generated/Shared/Transfer/GlueResponseTransfer.php |
| Pagination | class | created | src/Generated/Shared/Transfer/PaginationTransfer.php |

Ensure successful generation of Propel entities by verifying that they exist. Additionally, modify the generated entity classes to extend from Spryker core classes.

| CLASS PATH | EXTENDS |
| --- | --- |
| src/Generated/Entity/SpyDynamicEntityConfiguration.php | \Spryker\Zed\DynamicEntity\Persistence\Propel\AbstractSpyDynamicEntityConfiguration |
| src/Generated/Entity/SpyDynamicEntityConfigurationQuery.php | \Spryker\Zed\DynamicEntity\Persistence\Propel\AbstractSpyDynamicEntityConfigurationQuery |
| src/Generated/Entity/SpyDynamicEntityConfigurationRelation.php | \Spryker\Zed\DynamicEntity\Persistence\Propel\AbstractSpyDynamicEntityConfigurationRelation |
| src/Generated/Entity/SpyDynamicEntityConfigurationRelationQuery.php | \Spryker\Zed\DynamicEntity\Persistence\Propel\AbstractSpyDynamicEntityConfigurationRelationQuery |
| src/Generated/Entity/SpyDynamicEntityConfigurationRelationFieldMapping.php | \Spryker\Zed\DynamicEntity\Persistence\Propel\AbstractSpyDynamicEntityConfigurationRelationFieldMapping |
| src/Generated/Entity/SpyDynamicEntityConfigurationRelationFieldMappingQuery.php | \Spryker\Zed\DynamicEntity\Persistence\Propel\AbstractSpyDynamicEntityConfigurationRelationFieldMappingQuery |


{% endinfo_block %}


### Add translations

1. Append the glossary according to your language configuration:


<details>
  <summary>src/data/import/glossary.csv</summary>

```yaml
dynamic_entity.validation.invalid_data_format,"Invalid or missing data format. Please ensure that the data is provided in the correct format. Example request body: {'data':[{...},{...},..]}",en_US
dynamic_entity.validation.invalid_data_format,"Ungültiges oder fehlendes Datenformat. Stellen Sie bitte sicher, dass die Daten im richtigen Format bereitgestellt werden. Beispiel Anforderungskörper: {'data':[{...},{...}]}",de_DE
dynamic_entity.validation.persistence_failed,"Failed to persist the data for `%errorPath%`. Please verify the provided data and try again.",en_US
dynamic_entity.validation.persistence_failed,"Das Speichern der Daten ist fehlgeschlagen für `%errorPath%`. Bitte überprüfen Sie die bereitgestellten Daten und versuchen Sie es erneut.",de_DE
dynamic_entity.validation.persistence_failed_duplicate_entry,"Failed to persist the data for `%errorPath%`. Please verify the provided data and try again. Entry is duplicated.",en_US
dynamic_entity.validation.persistence_failed_duplicate_entry,"Das Speichern der Daten ist fehlgeschlagen für `%errorPath%`. Bitte überprüfen Sie die bereitgestellten Daten und versuchen Sie es erneut. Eintrag is doppelt vorhanden.",de_DE
dynamic_entity.validation.persistence_failed_not_nullable_field,"Failed to persist the data for `%errorPath%`. Please verify the provided data and try again. Field must not be null.",en_US
dynamic_entity.validation.persistence_failed_not_nullable_field,"Das Speichern der Daten ist fehlgeschlagen für `%errorPath%`. Bitte überprüfen Sie die bereitgestellten Daten und versuchen Sie es erneut. Das Feld darf nicht null sein.",de_DE
dynamic_entity.validation.delete_foreign_key_constraint_fails,"Failed to delete the data for `%errorPath%`. The entity has a child entity and can not be deleted. Child entity: `%childEntity%`.",en_US
dynamic_entity.validation.delete_foreign_key_constraint_fails,"Die Daten für `%errorPath%` konnten nicht gelöscht werden. Die Entität hat eine untergeordnete Entität und kann nicht gelöscht werden. Untergeordnete Entität: `%childEntity%`.",de_DE
dynamic_entity.validation.entity_does_not_exist,"The entity `%errorPath%` could not be found in the database.",en_US
dynamic_entity.validation.entity_does_not_exist,"Die Entität `%errorPath%` konnte in der Datenbank nicht gefunden werden.",de_DE
dynamic_entity.validation.invalid_field_type,"Invalid data type `%errorPath%` for field `%fieldName%`",en_US
dynamic_entity.validation.invalid_field_type,"Ungültiger Datentyp `%errorPath%` für das Feld `%fieldName%`",de_DE
dynamic_entity.validation.invalid_field_value,"Invalid data value `%errorPath%` for field: `%fieldName%`. Field rules: %validationRules%",en_US
dynamic_entity.validation.invalid_field_value,"Ungültiger Datenwert `%errorPath%` für das Feld: `%fieldName%`. Feldregeln: %validationRules%",de_DE
dynamic_entity.validation.required_field_is_missing,"The required field must not be empty. Field: `%errorPath%.%fieldName%`",en_US
dynamic_entity.validation.required_field_is_missing,"Das erforderlich Feld darf nicht leer sein. Feld: `%errorPath%.%fieldName%`",de_DE
dynamic_entity.validation.entity_not_found_or_identifier_is_not_creatable,"Entity `%errorPath%.%identifier%` not found by identifier, and new identifier can not be persisted. Please update the request.",en_US
dynamic_entity.validation.entity_not_found_or_identifier_is_not_creatable,"Entität `%errorPath%.%identifier%` konnte anhand der ID nicht gefunden werden, und die neue ID kann nicht dauerhaft gespeichert werden. Bitte aktualisieren Sie die Anfrage.",de_DE
dynamic_entity.validation.modification_of_immutable_field_prohibited,"Modification of immutable field `%errorPath%.%fieldName%` is prohibited",en_US
dynamic_entity.validation.modification_of_immutable_field_prohibited,"Änderung des unveränderlichen Feldes `%errorPath%.%fieldName%` ist nicht zulässig.",de_DE
dynamic_entity.validation.missing_identifier,"Incomplete Request - missing identifier for `%errorPath%`",en_US
dynamic_entity.validation.missing_identifier,"Unvollständige Anforderung - fehlende ID für `%errorPath%`",de_DE
dynamic_entity.validation.provided_field_is_invalid,"The provided `%errorPath%.%fieldName%` is incorrect or invalid.",en_US
dynamic_entity.validation.provided_field_is_invalid,"Der angegebene `%errorPath%.%fieldName%` ist falsch oder ungültig.",de_DE
dynamic_entity.validation.relation_is_not_editable,"The relationship `%relationName%` is not editable by configuration.",en_US
dynamic_entity.validation.relation_is_not_editable,"Die Beziehung `%relationName%` kann nicht per Konfiguration bearbeitet werden.",de_DE
dynamic_entity.validation.relation_not_found,"Relation `%relationName%` not found. Please check the requested relation name and try again.",en_US
dynamic_entity.validation.relation_not_found,"Beziehung `%relationName%` nicht gefunden. Bitte überprüfen Sie den angeforderten Beziehungsnamen und versuchen Sie es erneut.",de_DE
dynamic_entity.validation.configuration_not_found,"Dynamic entity configuration for table alias `%aliasName%` not found.",en_US
dynamic_entity.validation.configuration_not_found,"Dynamische Entitätskonfiguration für Tabellenalias `%aliasName%` nicht gefunden.",de_DE
dynamic_entity.validation.filter_field_not_found,"Filter field `%filterField%` for table alias `%aliasName%` not found.",en_US
dynamic_entity.validation.filter_field_not_found,"Filterfeld `%filterField%` für Tabellen alias `%aliasName%` nicht gefunden.",de_DE
dynamic_entity.validation.invalid_url,"The URL is invalid. `%errorPath%` field `%fieldName%` must have a URL data format.",en_US
dynamic_entity.validation.invalid_url,"Die URL ist ungültig. `%errorPath%` Feld `%fieldName%` muss ein URL-Datenformat haben.",de_DE
dynamic_entity.validation.method_not_allowed,"Method not allowed for the entity `%aliasName%`.",en_US
dynamic_entity.validation.method_not_allowed,"Die Methode ist für die Entität nicht zulässig `%aliasName%`.",de_DE
```

</details>


2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the `spy_glossary` database table.

{% endinfo_block %}

### Configure navigation

1. Add the Dynamic Exchange API section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <dynamic-entities-gui>
        <label>Data Exchange API Configuration</label>
        <title>Data Exchange API Configuration</title>
        <icon>fa-exchange-alt</icon>
        <bundle>dynamic-entity-gui</bundle>
        <controller>configuration-list</controller>
        <action>index</action>
        <pages>
            <dynamic-entity-create>
                <label>Create new configuration</label>
                <title>Create new configuration</title>
                <bundle>dynamic-entity-gui</bundle>
                <controller>configuration-create</controller>
                <action>index</action>
                <visible>0</visible>
            </dynamic-entity-create>
            <dynamic-entity-edit>
                <label>Edit configuration</label>
                <title>Edit configuration</title>
                <bundle>dynamic-entity-gui</bundle>
                <controller>configuration-edit</controller>
                <action>index</action>
                <visible>0</visible>
            </dynamic-entity-edit>
        </pages>
    </dynamic-entities-gui>
</config>
```


2. Update the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure the Data Exchange API section has been added to the Back Office navigation.

{% endinfo_block %}

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| PropelApplicationPlugin | Initializes `PropelOrm`. | Spryker\Zed\Propel\Communication\Plugin\Application |
| DynamicEntityApiSchemaContextExpanderPlugin | Adds dynamic entities to the documentation generation context. | Spryker\Glue\DynamicEntityBackendApi\Plugin\DocumentationGeneratorApi |
| DynamicEntityDocumentationInvalidationVoterPlugin | Checks if the dynamic entity configuration was changed within the provided interval. | Spryker\Glue\DynamicEntityBackendApi\Plugin\DocumentationGeneratorApi |
| DynamicEntityOpenApiSchemaFormatterPlugin | Formats dynamic entities of the Open API 3 schema: info, components, paths, tags. | Spryker\Glue\DynamicEntityBackendApi\Plugin\DocumentationGeneratorOpenApi |
| DynamicEntityRouteProviderPlugin | Adds routes for the provided dynamic entity to the RouteCollection. | Spryker\Glue\DynamicEntityBackendApi\Plugin |
| DynamicEntityProtectedPathCollectionExpanderPlugin | Expands the list of protected endpoints with dynamic entity endpoints. | Spryker\Glue\DynamicEntityBackendApi\Plugin\GlueBackendApiApplicationAuthorizationConnector |

<details>
<summary>src/Pyz/Glue/Console/ConsoleDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\Console;

use Spryker\Glue\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Glue\Kernel\Container;
use Spryker\Zed\Propel\Communication\Plugin\Application\PropelApplicationPlugin;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Glue\Kernel\Container $container
     *
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    public function getApplicationPlugins(Container $container): array
    {
        $applicationPlugins = parent::getApplicationPlugins($container);

        $applicationPlugins[] = new PropelApplicationPlugin();

        return $applicationPlugins;
    }
}
```

</details>

<details>
<summary>src/Pyz/Glue/DocumentationGeneratorApi/DocumentationGeneratorApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\DocumentationGeneratorApi;

use Spryker\Glue\DocumentationGeneratorApi\DocumentationGeneratorApiDependencyProvider as SprykerDocumentationGeneratorApiDependencyProvider;
use Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface;
use Spryker\Glue\DynamicEntityBackendApi\Plugin\DocumentationGeneratorApi\DynamicEntityApiSchemaContextExpanderPlugin;
use Spryker\Glue\DynamicEntityBackendApi\Plugin\DocumentationGeneratorApi\DynamicEntityDocumentationInvalidationVoterPlugin;

class DocumentationGeneratorApiDependencyProvider extends SprykerDocumentationGeneratorApiDependencyProvider
{
    /**
     * @var string
     */
    protected const GLUE_BACKEND_API_APPLICATION_NAME = 'backend';	    

    /**
     * @param \Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface $contextExpanderCollection	     
     *	     
     * @return \Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface	     
     */
    protected function getContextExpanderPlugins(ContextExpanderCollectionInterface $contextExpanderCollection): ContextExpanderCollectionInterface	    
    {	    
        $contextExpanderCollection->addExpander(new DynamicEntityApiSchemaContextExpanderPlugin(), [static::GLUE_BACKEND_API_APPLICATION_NAME]);
    }

    /**
     * @return array<\Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\Plugin\DocumentationInvalidationVoterPluginInterface>
     */
    protected function getInvalidationVoterPlugins(): array
    {
        return [
            new DynamicEntityDocumentationInvalidationVoterPlugin(),
        ];
    }
}
```

</details>

{% info_block infoBox "" %}

The `DocumentationGeneratorApiDependencyProvider::getInvalidationVoterPlugins()` stack contains plugins that are used to invalidate the documentation cache.
If the documentation cache isn't invalidated, the documentation will not be updated.

{% endinfo_block %}

<details>
<summary>src/Pyz/Glue/DocumentationGeneratorOpenApi/DocumentationGeneratorOpenApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\DocumentationGeneratorOpenApi;

use Spryker\Glue\DocumentationGeneratorOpenApi\DocumentationGeneratorOpenApiDependencyProvider as SprykerDocumentationGeneratorOpenApiDependencyProvider;
use Spryker\Glue\DynamicEntityBackendApi\Plugin\DocumentationGeneratorOpenApi\DynamicEntityOpenApiSchemaFormatterPlugin;

class DocumentationGeneratorOpenApiDependencyProvider extends SprykerDocumentationGeneratorOpenApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\DocumentationGeneratorOpenApiExtension\Dependency\Plugin\OpenApiSchemaFormatterPluginInterface>
     */
    protected function getOpenApiSchemaFormatterPlugins(): array
    {
        return [
            new DynamicEntityOpenApiSchemaFormatterPlugin(),
        ];
    }
}
```

</details>

<details>
<summary>src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\DynamicEntityBackendApi\Plugin\DynamicEntityRouteProviderPlugin;
use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface>	    
     */	    
    protected function getRouteProviderPlugins(): array	    
    {	    
        return [
            new DynamicEntityRouteProviderPlugin(),
        ];
    }	    
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure you can operate data. For instructions, see [Requesting data using the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/sending-requests-with-data-exchange-api.html)

{% endinfo_block %}

{% info_block infoBox %}

The only ways to configure child relations for Data Exchange API is by updating the database or the import configuration in `src/Pyz/Zed/DynamicEntity/data/installer/configuration.json`.

{% endinfo_block %}

### Configure the scheduler

1. Adjust the scheduler project configuration:

**config/Zed/cronjobs/jenkins.php**

```php
$jobs[] = [
    'name' => 'glue-api-generate-documentation',
    'command' => '$PHP_BIN vendor/bin/glue api:generate:documentation --invalidated-after-interval 90sec',
    'schedule' => '*/1 * * * *',
    'enable' => true,
];
```

2. Apply the scheduler configuration update:

```bash
vendor/bin/console scheduler:suspend
vendor/bin/console scheduler:setup
vendor/bin/console scheduler:resume
```

{% info_block warningBox "Verification" %}

1. Configure at least one entity in `spy_dynamic_entity_configuration`. For instructions, see [How to configure Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/configure-data-exchange-api.html).
2. Make sure `src\Generated\GlueBackend\Specification\spryker_backend_api.schema.yml` has been generated and contains the corresponding endpoint with correct configurations.

{% endinfo_block %}
