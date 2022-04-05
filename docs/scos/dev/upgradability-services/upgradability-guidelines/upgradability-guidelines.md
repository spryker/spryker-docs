---
title: Evaluator reference
description: Find solutions to Evaluator errors
template: concept-topic-template
---

The documents in this section will help you resolve the issues related to code evaluation in a way that keeps your code upgradable and up to date with Spryker's and industry coding standards. 

When you get an evaluation error, check the name of the triggered check in the Evaluation output logs. The name is at the beginning of each error log.

Example:
```bash
-------------------- ----------------------------------------------------------------------------------------------------
PrivateApi:Extension Please avoid extension of the PrivateApi Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm in Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
-------------------- ----------------------------------------------------------------------------------------------------
```

In the example, the name is `PrivateApi:Extension`. To find the documentation for this error, check the name in the table below.

| Group name |  Group description  | Check name  | Error message template | Documentation |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| NotUnique | Covers the cases that are related to project-level entity names that can conflict with the entity names on the core level. | NotUnique:TransferName | Transfer object name **{transfer_name}** has to have project prefix Pyz in **{absolute_transfer_path}**, like **Pyz{transfer_name}** |  {link - unique-entity-name-not-unique.md#Making transfer names unique}  |
| NotUnique |  | NotUnique:TransferProperty | Transfer property **{transfer_property_name}** for **{transfer}** has to have project prefix Pyz in **{absolute_transfer_path}**, like **pyz{transfer_property_name}** | {link - unique-entity-name-not-unique.md#Making transfer property names unique} |
| NotUnique |  | NotUnique:DatabaseTable | Database table **{table_name}** has to have project prefix Pyz in **{absolute_schema_path}**, like **pyz_{table_name}**| {link - unique-entity-name-not-unique.md#Making table names unique} |
| NotUnique |  | NotUnique:DatabaseColumn | Database column **{table_column_name}** has to have project prefix Pyz in **{absolute_schema_path}**, like **pyz_{table_column_name}** | {link - unique-entity-name-not-unique.md#Making database column names unique} |
| NotUnique |  | NotUnique:Method | Method name **{class}::{method_name}** should contains project prefix, like **{method_name_with_prefix}** | {link - unique-entity-name-not-unique.md#Making method names unique} |
| NotUnique |  | NotUnique:Constant | **{class_name}::{constant_name}** name has to have project namespace, like **PYZ_{constant_name}**.| {link - unique-entity-name-not-unique.md#Making constant names unique} |
| PrivateApi | Evaluator's group PrivateApi covers functionality for cases when project-level code uses core dependency that can be potentially removed in the minor or major versions. | PrivateApi:Dependency | Avoid this dependency: **{dependency_provider_class_name}::{dependency_name_constant}** | {link - private-api-class-extended-or-used.md#Private API class was extended or used} |
| PrivateApi |  | PrivateApi:MethodIsOverwritten | Please avoid usage of core method **{class_namespace}::{method_name}** in the class **{class_namespace}** | {link - method-of-extended-class-overridden-on-project-level.md#Method of an extended class is overridden on the project level} |
| PrivateApi |  | PrivateApi:Extension | Please avoid extension of the PrivateApi **{class_name}** in **{class_name}** | {link - method-of-extended-class-overridden-on-project-level.md#Method of an extended class is overridden on the project level} |
| PrivateApi |  | PrivateApi:Persistence | Please avoid Spryker dependency: $this->**{method_name}**(...) | {link - core-method-used-on-project-level.md#A core method is used on the project level} |
| PrivateApi |  | PrivateApi:CorePersistenceUsage | Please avoid usage of PrivateApi method **{method_name}** in **{class_namespace}** | {link - private-api-class-extended-or-used.md} |
| PrivateApi |  | PrivateApi:PrivateApiDependencyInBusinessModel | Please avoid Spryker dependency: **{class_namespace}** in **{class_namespace}** | {link - private-api-class-extended-or-used.md} |
| PrivateApi |  | PrivateApi:Facade | Please avoid Spryker dependency: **{method_name}** | {link - private-api-class-extended-or-used.md} |
| PrivateApi |  | PrivateApi:ObjectInitialization | Please avoid Spryker dependency: **{class_namespace}** in **{class_namespace}** | {link - private-api-class-extended-or-used.md} |
| PrivateApi |  | PrivateApi:PersistenceInBusinessModel | Please avoid Spryker dependency: **{object_name}**->**{method_name}(...)** | {link - private-api-class-extended-or-used.md} |
