---
title: {Feature Name} feature integration
description: Integrate the {Feature Name} into your project
template: feature-integration-guide-template
---

<!-- This document is an integration guide template.
All the described steps are optional. If you want to add a step that's not described in the template, contact Karoly Gerner.


Before you start, check out the formatting templates in [Formatting templates for feature integration guides](formatting-templates-for-feature-integration-guides.md).-->

---
title: {Meta name}
description: {Meta description}
tags: [, ]
---

# {Feature Name} feature integration

This document describes how to integrate the [Feature Name feature]({link to a respective feature overview}) into a Spryker project.

## Install feature core

Follow the steps below to install the {Feature Name} feature core.

### Prerequisites
<!-- List the features a project must have before they can integrate the current feature. -->

To start feature integration, integrate the required features and Glue APIs:
<!--See feature mapping at [Features](https://release.spryker.com/features). -->

| NAME           | VERSION           | INTEGRATION GUIDE |
| -------------- | ----------------- | ----------------- |
| {feature name / Glue API name} | {feature version} | {integration guide link} |

### 1) Install the required modules using Composer
<!--Provide one or more console commands with the exact latest version numbers of all required modules. If the Composer command contains the modules that are not related to the current feature, move them to the [prerequisites](#prerequisites).-->

Install the required modules:

```bash
{commands to install the required modules}
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

Make sure that the following modules have been installed:

| MODULE       | EXPECTED DIRECTORY <!--for public Demo Shops--> |
| ------------ | ---------------- |
| {ModuleName} | {expected directory}                            |

---

### Set up the configuration
<!--Describe system and module configuration changes. If the default configuration is enough for a primary behavior, skip this step.-->

Add the following configuration:

| CONFIGURATION   | SPECIFICATION   | NAMESPACE   |
| --------------- | --------------- | ----------- |
| {configuration} | {specification} | {namespace} |

```php
{code sample with the updated configuration}
```

{% info_block warningBox "Verification" %}

<!--Describe how a developer can check they have completed the step correctly.-->

{% endinfo_block %}


### Set up database schema and transfer objects
<!--Provide the following with a description before each item:
* Code snippets with DB schema changes.
* Code snippets with transfer schema changes.
* The console command to apply the changes in project and core. -->

Set up database schema and transfer objects as follows:
1. ...
2. ...
...
5. Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE          | EVENT   |
| --------------- | ------------- | ------- |
| {entity}        | {entity type} | {event} |

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER   | TYPE   | EVENT   | PATH   |
| ---------- | ------ | ------- | ------ |
| {transfer} | {type} | {event} | {path} |

---

### Set up database schema
<!--If the feature has transfer object definition changes, merge the steps as described in [Set up database schema and transfer objects](#set-up-database-schema-and-transfer-objects). Provide code snippets with DB schema changes, describing the changes before each code snippet. Provide the console commands to apply the changes in project and core. -->

Set up database schema as follows:

1. Adjust the schema definition so entity changes trigger events:

| AFFECTED ENTITY   | TRIGGERED EVENTS  |
| ----------------- | ----------------- |
| {affected entity} | {triggered event} |

```xml
{database schema code}
```

2. Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE   | EVENT   |
| --------------- | ------ | ------- |
| {entity}        | {type} | {event} |

---

### Set up transfer objects
<!--If the feature has database definition changes, merge the steps as described in [Set up database schema and transfer objects](#set-up-database-schema-and-transfer-objects). Provide code snippet with transfer schema changes, describing the changes before each code snippet. Provide the console commands to apply the changes in project and core.-->



Generate transfers:

```bash
console transfer:generate
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

Ensure the following transfers have been created:

| TRANSFER   | TYPE   | EVENT   | PATH   |
| ---------- | ------ | ------- | ------ |
| {transfer} | {type} | {event} | {path} |

---

### Add translations
<!--Provide glossary keys for `DE` and `EN` of your feature as a code snippet. When a glossary key is dynamically generated, describe how to construct the key.-->

Add translations as follows:

1. Append glossary for the feature:

```
{glossary code snippet}
```

2. Import data:

```bash
console data:import glossary
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

Make sure that the configured data has been added to the `spy_glossary` table.

---

### Configure export to Redis and Elasticsearch
<!--Provide the plugins for wiring P&S up. Provide the plugins for enabling re-generate and re-sync features of P&S.-->


Configure tables to be published and synchronized to the Storage on create, edit, and delete changes.

| PLUGIN | SPECIFICATION | PREREQUISITES   | NAMESPACE   |
| --------------- | -------------- | ------ | -------------- |
| {plugin} | {description} | {prerequisite}  <!--leave blank if "None"--> |   {namespace} |

```php
{code snippet with plugin setup}
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.

Usually, it is technically impossible to verify the current step before the [Import data](#import-data) step. In such a case, move the verification of this step there. -->

Make sure that, when an {entity} is created, updated or deleted, it is exported to or removed from Redis and Elasticsearch.

| STORAGE TYPE | TARGET ENTITY | EXPECTED DATA IDENTIFIER EXAMPLE | EXPECTED DATA FRAGMENT EXAMPLE     |
| ------------ | ------------- | -------------------------------- | ---------------------------------- |
| {Redis / Elasticsearch} | {entity}                         | {expected data identifier example} | See below the table. |

Expected data fragment example:

```
{expected data fragment example}
```

---


### Configure export to Redis
<!--If the feature has Elasticsearch configuration changes, merge the steps as described in [Configure export to Redis and Elasticsearch](#configure-export-to-redis-and-elasticsearch). Provide the plugins for wiring P&S up. Provide the plugins for enabling re-generate and re-sync features of P&S.-->

Configure tables to be published to the {table name} table and synchronized to the Storage on create, edit, and delete changes.


| PLUGIN   | SPECIFICATION | PREREQUISITES    | NAMESPACE |
| -------- | ------------- | ---------------- | --------- |
| {plugin} | {description} | {{prerequisite} /      } <!-- if none, leave blank --> | {namespace} |

```php
{code snippet with plugin setup}
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.

Usually, it is technically impossible to verify the current step before the [Import data](#import-data) step. In such a case, move the verification of this step there. -->

Make sure that, when an {entity} is created, updated or deleted, it is exported to or removed from Redis and Elasticsearch.

| STORAGE TYPE | TARGET ENTITY | EXPECTED DATA IDENTIFIER EXAMPLE | EXPECTED DATA FRAGMENT EXAMPLE     |
| ------------ | ------------- | -------------------------------- | ---------------------------------- |
| {Redis / Elasticsearch} | {target entity}                  | {expected data identifier example} | See below the table. |

Expected data fragment example: {target entity}

```
{expected data fragment example}
```

---

#### Configure export to Elasticsearch
<!--If the feature has Redis configuration changes, merge the steps as described in [Configure export to Redis and Elasticsearch](#configure-export-to-redis-and-elasticsearch). Provide a plugin list for wiring P&S up. Provide a plugin list for enabling Re-generate and Re-sync features of P&S.-->

Install the following plugins:

| PLUGIN   | SPECIFICATION | PREREQUISITES   | NAMESPACE |
| -------- | ------------- | --------------- | --------- |
| {plugin} | {Description} | {prerequisite}<!--leave blank if "None"-->| {namespace} |

```php
{code snippet with plugin setup}
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.

Usually, it is technically impossible to verify the current step before the [Import data](#import-data) step. In such a case, move the verification of this step there. -->

Make sure that, when an {entity} is created, updated or deleted, it is exported to or removed from Redis and Elasticsearch.

| STORAGE TYPE | TARGET ENTITY | EXPECTED DATA IDENTIFIER EXAMPLE | EXPECTED DATA FRAGMENT EXAMPLE     |
| ------------ | ------------- | -------------------------------- | ---------------------------------- |
| {Redis / Elasticsearch} | {entity}                         | {expected data identifier example} | See below the table. |

Expected data fragment example:

```
{expected data fragment example}
```

---


### Import data
<!--This section contains as many sub-sections as many data importers the feature has; additionally, infrastructural importers appear here.-->

Import data as follows:

1. Prepare your data according to your requirements using the demo data:

```csv
{demo data}
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DESCRIPTION |
| -------- | ------------- | --------------- | --------- |
| {column_name} | {&check; /  } | {data_type} | {example_of_column_data} | {description} |

2. Import data:

```bash
{command to import data}
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

Make sure that the configured data has been added to the `{table_name}` table.

---

#### Import infrastructural data
<!--Provide the plugin list for wiring up the installation of infrastructural data. Provide the console command to run the installation of the infrastructural data.-->

Import infrastructural data as follows:

1. Install the plugins:

| PLUGIN   | SPECIFICATION | PREREQUISITES   | NAMESPACE |
| -------- | ------------- | --------------- | --------- |
| {plugin} | {Description} | {{prerequisite} /      } <!-- if none, leave blank -->| {namespace} |

```php
{code snippet with plugin setup}
```

2. To install the infrastructural data, execute the installer plugins you've registered:

```bash
console setup:init-db
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly. Provide verification for "Configure Export to Redis and Elasticsearch".-->

Ensure that the {entities} have been added to the `{table_name}` table.

---

#### Import {DataImporterName}
<!--Provide demo data for the current data importer as a code snippet. Provide additional information about glossary key generation if it depends on data import. Provide a table with data import column definitions. Provide the plugin list to wire up the data importer. Provide a code snippet showing how to attach the data import to a console command. Provide the console command to import data.-->

| PLUGIN   | SPECIFICATION | PREREQUISITES   | NAMESPACE |
| -------- | ------------- | --------------- | --------- |
| {plugin} | {Description} | {{prerequisite} /      } <!-- if none, leave blank -->| {namespace} |

```php
{code snippet with plugin setup}
```

---
**Verification**
<!--Describe how a developer can check that they have completed the following steps correctly:
* Current step
* [Configure Export to Redis and Elasticsearch](#configure-export-to-redis-and-elasticsearch)
* [Configure Export to Elasticsearch](#configure-export-to-elasticsearch)
* [Configure Export to Redis](#configure-export-to-redis)  -->

---

### Set up behavior
<!--This is a comment, it will not be included -->
Enable the following behaviors by registering the plugins:

| PLUGIN   | SPECIFICATION | PREREQUISITES   | NAMESPACE |
| -------- | ------------- | --------------- | --------- |
| {plugin} | {description} | {{prerequisite} /      } <!-- if none, leave blank -->| {namespace} |

```php
{code snippet with plugin setup}
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

---

## Install feature front end

Follow the steps below to install the {Feature Name} feature front end.

### Prerequisites
<!--Describe the features the project must have before the current feature can be integrated.-->

To start feature integration, integrate the required features and Glue APIs:
<!--See feature mapping at [Features](https://release.spryker.com/features). -->

| NAME           | VERSION           | INTEGRATION GUIDE |
| -------------- | ----------------- | ----------------- |
| {feature name / Glue API name} | {feature version} | {integration guide link} |

### 1) Install the required modules using Composer
<!--Provide the console command\(s\) with the exact latest version numbers of all required modules. If the Composer command contains the modules that are not related to the current feature, move them to the [prerequisites](#prerequisites).-->

Install the required modules:

```bash
{command to install the required modules}
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

Make sure that the following modules have been installed:

| MODULE       | EXPECTED DIRECTORY <!--for public Demo Shops--> |
| ------------ | ----------------------------------------------- |
| {ModuleName} | {expected directory}                            |

---

### Add translations

Add translations as follows:

1. Append glossary for the feature:

```
{glossary code snippet}
```

2. Import data:

```bash
console data:import glossary
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

Make sure that the configured data has been added to the `spy_glossary` table.

---

### Enable controllers
<!--Provide a list of controller providers and route providers to enable -->

Register the following route providers on the Storefront:

| PROVIDER   | NAMESPACE   |
| ---------- | ----------- |
| {provider} | {namespace} |

```php
{code snippet with provider setup}
```

---
**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

---

### Set up widgets
<!--Provide a list of plugins and global widgets to enable widgets. Add descriptions for complex javascript code snippets. Provide a console command for generating front-end code.-->

Set up widgets as follows:

1. Register the following plugins to enable widgets:

| PLUGIN   | SPECIFICATION | PREREQUISITES   | NAMESPACE |
| -------- | ------------- | --------------- | --------- |
| {plugin} | {description} | {{prerequisite} /      } <!-- if none, leave blank -->| {namespace} |

```php
{code snippet with provider setup}
```

{% info_block warningBox "Verification" %}

<!--Describe how a developer can check they have completed the step correctly.-->

Make sure that the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET   | VERIFICATION                  |
| -------- | ----------------------------- |
| {widget} | {steps to verify the changes} |

{% endinfo_block %}

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

---



## Related features

Integrate the following related features and Glue APIs:

| NAME        | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| -------------- | -------------------------------- | ----------------- |
| {feature name / Glue API name} | {&check; /  }    | [{Integration guide name}](link to the integration guide) |
