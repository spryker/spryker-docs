# {title} ({Feature Name feature integration})

This document describes how to integrate the [Feature Name](link to a respective feature overview page) feature into a Spryker project.

## Install feature core

Follow the steps below to install the {Feature Name} feature core.

### Prerequisites
[comment]: <> "Describe the required other features \(if any\) with a version that should be in place before the current feature can be installed."

To start feature integration, overview, and install the necessary features:
[comment]: <> "Refer to feature mapping: https://release.spryker.com/features."

| NAME | VERSION |
| --------- | ------ |
| {Feature Name} | feature version |

### 1) Install required modules using Сomposer
[comment]: <> "Provide the console command\(s\) with the exact latest version numbers of all required modules. If you have other modules except for the feature modules in the composer command, you need to move them to the prerequisites."

Run the following command(s) to install the required modules:

```
command to install the required modules
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."
Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY |
| -------- | ------------------- |
| {ModuleName} | path for a directory (example: vendor/spryker/product-configuration) |

### 2) Set up the configuration
[comment]: <> "Provide config change list for altering config \(both system config or module config\). This is only necessary if it is mandatory to change the configuration. When the default configuration is enough for primary behavior, this step can be skipped."

Add the following configuration to your project:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| ------------- | ------------ | ------------ |
|example configuration | example specification|example namespace |

```
code sample with the updated configuration
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."





### 3) Set up database schema and transfer objects
[comment]: <> "\(Optional\) Provide "code snippet\(s\)" with DB schema modifications that customers need to add to project code. \(Optional\) Provide code snippet\(s\) with transfer schema modifications that customers need to add to project code.\(Optional\) Provide "info" prior to each code snippet\(s\) explaining the purpose of these changes. Provide the console command\(s\) customers need to run to apply the changes \(in project + core\). "

Set up database schema and transfer objects as follows:
1.
2.

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."

Make sure that the following changes have been applied by checking your database:

| Database Entity | Type | Event |
| --------------- | ---- | ------ |
| sample entity | table | sample event |

Make sure that the following changes have been triggered in transfer objects:

| Transfer  | Type  | Event   | Path   |
| ---------- | ---- | ------ | -------------- |
| example transer | class | example event | example path   |



### 4) Set up database schema
[comment]: <> "This step is only possible if your feature has no transfer object definition changes. \(Optional\) Provide code snippet\(s\) with DB schema modifications that customers need to add to project code. \(Optional\) Provide "info" prior to each code snippet\(s\)  explaining the purpose of these changes. Provide the console command\(s\) customers need to run to apply the changes \(in project + core\). "

Adjust the schema definition so entity changes will trigger events.

| Affected Entity | Triggered Events  |
| ------------- | ----------- |
| example entity | example event |

```
example code of the database schema
```

Run the following commands to apply database changes and generate entity and transfer changes:

```
console transfer:generate
console propel:install
console transfer:generate
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."

Make sure that the following changes have been applied by checking your database:

| Database Entity | Type | Event |
| --------------- | ---- | ----- |
| example entity   | table | example event |


### 5) Set up transfer objects
[comment]: <> "This step is only possible if your feature has no database definition changes. \(Optional\) Provide code snippet\(s\) with transfer schema modifications that customers need to add to project code. \(Optional\) Provide "info" prior to each code snippet\(s\) explaining the purpose of these changes. Provide the console command\(s\) customers need to run to apply the changes \(in project + core\)."

Run the following commands to generate transfers:

```
console transfer:generate
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."

Ensure the following transfers have been created:

| Transfer | Type | Event  | Path  |
| --------- | ------- | ----- | ------------- |
| example traansfer | example type | example event | example path |



### 6) Add translations
[comment]: <> "Provide the list of glossary keys for DE and EN for your feature in the code snippet. When the glossary key is dynamically generated, provide the additional description of how to construct these glossary keys."

Append glossary for the feature:

```
code snippet
```

Run the following console command to import data:

```
console data:import glossary
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."

Make sure that the configured data is added to the `spy_glossary` table in the database.



### 7) Configure export to Redis and Elasticsearch
[comment]: <> "Provide a plugin list for wiring Pub & Sync up. Provide a plugin list" for enabling Re-generate and Re-sync features of Pub & Sync."

This step will publish tables on change (create, edit) to the \<table_name\> and synchronize the data to Storage.

| Plugin | Specification | Prerequisites | Namespace   |
| --------------- | -------------- | ------ | -------------- |
| example plugin | Description | None  | example namespace |

```
code snippet
```


### 8) Configure export to Redis
[comment]: <> "This step is only possible if your feature has no elasitcsearch configuration changes. Provide a plugin list for wiring Pub & Sync up. Provide a plugin list for enabling Re-generate and Re-sync features of Pub & Sync."

This step will publish tables on change (create, edit, delete) to the \<table_name\> and synchronize the data to Storage.


| Plugin | Specification | Prerequisites | Namespace   |
| --------------- | -------------- | ------ | -------------- |
| example plugin | Description | None  | example namespace |

```
code snippet
```

##### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."

Make sure that when \<action\> is created, updated or deleted, they are exported (or removed) to Redis and Elasticsearch accordingly.

| Target entity | Example expected data identifier |
| ------------------ |------------------- |
| example entity | example data identifier |

Example expected fragment:

```
code snippet
```


#### Configure export to Elasticsearch
[comment]: <> "This step is only possible if your feature has no redis configuration changes. Provide a plugin list for wiring Pub & Sync up. Provide a plugin list for enabling Re-generate and Re-sync features of Pub & Sync."

Install the following plugins:

| Plugin | Specification | Prerequisites | Namespace   |
| --------------- | -------------- | ------ | -------------- |
| example plugin | Description | None  | example namespace |

```
code snippet
```

##### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."




### Import data
[comment]: <> "This section contains as many sub-steps as many data importers the feature has; additionally, infrastructural importers appear here."

Prepare your data according to your requirements using our demo data:

```
code snippet
```

Run the following console command to import data:

```
command sample
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."

Make sure that the configured data is added to the \<table_name\> table in the database.



#### Add infrastructural data
[comment]: <> "Define the plugin list that is necessary for wiring up infrastructural data installation. Define the console command that is necessary for running the infrastructural data installation."

Import infrastructural data as follows:

1. Install the plugin(s):

   | Plugin  | Specification | Prerequisites | Namespace |
   | ------------ | ----------- | ----- | ------------ |
   | example plugin | description | None  | example namespace |

   ```
   code snippet
   ```

2. Execute the registered installer plugins and install the infrastructural data:

   ```
   console setup:init-db
   ```

##### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly. Provide verification for "Configure Export to Redis and Elastisearch"."

Ensure that, in the database, the \<entities\> have been added to the \<table_name\> table.


#### Import {DataImporterName}
[comment]: <> "Provide demo data for the current data importer in the code snippet. Provide additional "info" for glossary key generation if it depends on data import. Provide data import column definition table. Provide plugin list describing how to wire up data importer. Provide a code snippet showing how to attach the data import to a console command. Provide a console command demonstrating how to import data."

| Plugin  | Specification | Prerequisites | Namespace |
| ------------ | ----------- | ----- | ------------ |
| example plugin | description | None  | example namespace |

```
code snippet
```

##### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly. Provide verification for "Configure Export to Redis and Elastisearch"."


### Set up behavior
[comment]: <> "This is a comment, it will not be included"
Enable the following behaviors by registering the plugins:

| Plugin  | Specification | Prerequisites | Namespace |
| ------------ | ----------- | ----- | ------------ |
| example plugin | description | None  | example namespace |

```
code snippet
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."


## Install feature front end

Follow the steps below to install the {Feature Name} feature front end.

### Prerequisites
[comment]: <> "Describe the required other features \(if any\) with a version that should be in place before the current feature can be installed."

To start feature integration, overview, and install the necessary features:

| NAME  | VERSION    |
| ---------------- | ------------- |
| Feature name (is taken from https://release.spryker.com/features) | feature version |

### 1) Install required modules using Сomposer
[comment]: <> "Provide the console command\(s\) with the exact latest version numbers of all required modules. If you have other modules except for the feature modules in the composer command, you need to move them to the prerequisites."

Run the following command(s) to install the required modules:

```
command to install the required modules
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."

Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY |
| -------- | ------------------- |
| {ModuleName} | path for a directory (example: vendor/spryker/product-configuration) |


### 2) Add translations

Add translations as follows:

1. Append glossary according to your configuration:

   ```
   code snippet
   ```

2.  Import data:

   ```
   code snippet
   ```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."


### 3) Enable controllers
[comment]: <> "Provide controller provider list \/\ route provider list which should be enabled"
Register the following route provider(s) on the Storefront:

| Provider| Namespace  |
| --------------- | --------------------- |
| provider sample | namespace sample |

```
code sample
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."


### 4) Set up widgets

Set up widgets as follows:
[comment]: <> "Provide plugin list \/\ global widget list for enabling widgets. Provide complex javascript clarification when necessary. Provide console command for generating frontend code, if necessary."

1. Register the following plugins to enable widgets:

| Plugin | Specification | Prerequisites | Namespace   |
| --------------- | -------------- | ------ | -------------- |
| example plugin | Description | None  | example namespace |

```
code sample
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."

Make sure that the following widgets have been registered by adding the respective code snippets to a Twig template:

| Widget | Verification |
| ---------------- | ----------------- |
|widget sample | verification description |

2. Enable Javascript and CSS changes:

```
console frontend:yves:build
```

#### Verification
[comment]: <> "Provide the verification steps how to confirm that the step was performed correctly."

## Related Features

Here you can find a list of related feature integration guides: