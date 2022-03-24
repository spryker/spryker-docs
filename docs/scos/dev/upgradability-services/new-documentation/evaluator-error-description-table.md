---
title: Evaluator errors reference page
description: Evaluator error list with the descriptions
last_updated: Mar 23, 2022
template: concept-topic-template
---

## Evaluator errors reference page

This error page provides information about the error that is may occur while evaluator validation.
Current page can be used to search for needed documentation faster and in most appropriate way. 

#### Reference table usage flow

To find needed documentation for your problem need to find check name that you have a problem

Name of the specific check can be found at the Evaluation output logs. Check name placed at the beginning of each error log. 
For example
```bash
-------------------- ----------------------------------------------------------------------------------------------------
PrivateApi:Extension Please avoid extension of the PrivateApi Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm in Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
-------------------- ----------------------------------------------------------------------------------------------------
```
At this particular log example check name equal "PrivateApi:Extension"

#### Reference table for evaluation check names and documentation pages links 
| Check name  | Error message template | Link to Documentation page |
| ----------- | ----------- | ----------- |
| NotUnique:TransferName | Transfer object name **{transfer_name}** has to have project prefix Pyz in **{absolute_transfer_path}**, like **Pyz{transfer_name}** |  {link - unique-entity-name-not-unique.md#Making transfer names unique}  |
| NotUnique:TransferProperty | Transfer property **{transfer_property_name}** for **{transfer}** has to have project prefix Pyz in **{absolute_transfer_path}**, like **pyz{transfer_property_name}** | {link - unique-entity-name-not-unique.md#Making transfer property names unique} |
| NotUnique:DatabaseTable | Database table **{table_name}** has to have project prefix Pyz in **{absolute_schema_path}**, like **pyz_{table_name}**| {link - unique-entity-name-not-unique.md#Making table names unique} |
| NotUnique:DatabaseColumn | Database column **{table_column_name}** has to have project prefix Pyz in **{absolute_schema_path}**, like **pyz_{table_column_name}** | {link - unique-entity-name-not-unique.md#Making database column names unique} |
| NotUnique:Method | Method name **{class}::{method_name}** should contains project prefix, like **{method_name_with_prefix}** | {link - unique-entity-name-not-unique.md#Making method names unique} |
| NotUnique:Constant | **{class_name}::{constant_name}** name has to have project namespace, like **PYZ_{constant_name}**.| {link - unique-entity-name-not-unique.md#Making constant names unique} |
| PrivateApi:Dependency | Avoid this dependency: **{dependency_provider_class_name}::{dependency_name_constant}** | {link - private-api-class-extended-or-used.md#Private API class was extended or used} |
| PrivateApi:MethodIsOverwritten | Please avoid usage of core method **{class_namespace}::{method_name}** in the class **{class_namespace}** | {link - method-of-extended-class-overridden-on-project-level.md#Method of an extended class is overridden on the project level} |
| PrivateApi:Extension | Please avoid extension of the PrivateApi **{class_name}** in **{class_name}** | {link - method-of-extended-class-overridden-on-project-level.md#Method of an extended class is overridden on the project level} |
| PrivateApi:Persistence | Please avoid Spryker dependency: $this->**{method_name}**(...) | {link - core-method-used-on-project-level.md#A core method is used on the project level} |