---
title: Upgradability guidelines
description: Find solutions to Evaluator errors
template: concept-topic-template
related:
  - title: Entity name is not unique
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/entity-name-is-not-unique.html
  - title: Private API is extended
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-extended.html
  - title: Private API is used on the project level
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-used-on-the-project-level.html
  - title: Private API method is overridden on the project level
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-method-is-overridden-on-the-project-level.html
---

Spryker has more than one thousand modules, and a bunch of them uses in each Spryker-based project. At the same time, the Sprykers team implements about 50 module updates each month. In this case, keeping your project up to date and receiving all necessary updates, coud take a lot of time for the project team.

To improve the developer experience and decrease the time to keep your project up to date - we implemented the Upgrader and Integrator tools. These tools can automatically update vendors of the spryker-based projects and integrate changes to the project side.

For correct updating a project by Upgrader and Integrator, the project has to follow some Spryker upgradability rules. You can check that your project code is compliant with the rules by the Evaluator tool.

The documents in this section will help you resolve the issues related to code evaluation in a way that keeps your code upgradable and up to date with Spryker's and industry coding standards.

When you get an evaluation error, check the name of the triggered check in the Evaluation output logs. The name is at the beginning of each error log.

Example:
```bash
-------------------- ----------------------------------------------------------------------------------------------------
PrivateApi:Extension Please avoid extension of the PrivateApi Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm in Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
-------------------- ----------------------------------------------------------------------------------------------------
```

In the example, the name is `PrivateApi:Extension`. To find the documentation for this error, check the name in the table below.

<div class="width-100">


| Group name |  Group description  | Check name  | Error message template | Documentation |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| NotUnique | Covers the cases related to project-level entity names that can conflict with the entity names on the core level. | NotUnique:TransferName | Transfer object name `{transfer_name}` has to have project prefix Pyz in **{absolute_transfer_path}**, like **Pyz{transfer_name}** |  [Transfer name is not unique](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/entity-name-is-not-unique.html#transfer-name-is-not-unique)  |
| NotUnique |  | NotUnique:TransferProperty | Transfer property `{transfer_property_name}` for `{transfer}` has to have project prefix Pyz in **{absolute_transfer_path}**, like **pyz{transfer_property_name}** | [Transfer property name is not unique](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/entity-name-is-not-unique.html#transfer-property-name-is-not-unique) |
| NotUnique |  | NotUnique:DatabaseTable | Database table **{table_name}** has to have project prefix Pyz in **{absolute_schema_path}**, like **pyz_{table_name}**| [Database table name is not unique](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/entity-name-is-not-unique.html#database-table-name-is-not-unique)  |
| NotUnique |  | NotUnique:DatabaseColumn | Database column **{table_column_name}** has to have project prefix Pyz in **{absolute_schema_path}**, like **pyz_{table_column_name}** | [Name of database table column is not unique](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/entity-name-is-not-unique.html#name-of-database-table-column-is-not-unique)  |
| NotUnique |  | NotUnique:Method | Method name **{class}::{method_name}** should contains project prefix, like **{method_name_with_prefix}** | [Method name is not unique](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/entity-name-is-not-unique.html#method-name-is-not-unique) |
| NotUnique |  | NotUnique:Constant | **{class_name}::{constant_name}** name has to have project namespace, like **PYZ_{constant_name}**.| [Constant name is not unique](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/entity-name-is-not-unique.html#constant-name-is-not-unique) |
| NotUnique |  | NotUnique:ModuleName | Module **{module_name}** has to have project prefix, like **Pyz{module_name}**.| [Module name is not unique](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/entity-name-is-not-unique.html#module-name-is-not-unique) |
| PrivateApi | Covers the cases related to project-level code using core dependencies that can be potentially removed in minor or major versions. | PrivateApi:Dependency | Avoid this dependency: **{dependency_provider_class_name}::{dependency_name_constant}** | [Private API is extended](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-extended.html) |
| PrivateApi |  | PrivateApi:MethodIsOverwritten | Please avoid usage of core method **{class_namespace}::{method_name}** in the class **{class_namespace}** | [Private API method is overridden on the project level](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-method-is-overridden-on-the-project-level.html) |
| PrivateApi |  | PrivateApi:Extension | Please avoid extension of the PrivateApi **{class_name}** in **{class_name}** | [Private API method is overridden on the project level](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-method-is-overridden-on-the-project-level.html) |
| PrivateApi |  | PrivateApi:Persistence | Please avoid Spryker dependency: $this->**{method_name}**(...) | [private-api-is-used-on-the-project-level](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-used-on-the-project-level.html) |
| PrivateApi |  | PrivateApi:CorePersistenceUsage | Please avoid usage of PrivateApi method **{method_name}** in **{class_namespace}** | [Private API is extended](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-extended.html)  |
| PrivateApi |  | PrivateApi:PrivateApiDependencyInBusinessModel | Please avoid Spryker dependency: **{class_namespace}** in **{class_namespace}** | [Private API is extended](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-extended.html)  |
| PrivateApi |  | PrivateApi:Facade | Please avoid Spryker dependency: **{method_name}** | [Private API is extended](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-extended.html)  |
| PrivateApi |  | PrivateApi:ObjectInitialization | Please avoid Spryker dependency: **{class_namespace}** in **{class_namespace}** | [Private API is extended](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-extended.html)  |
| PrivateApi |  | PrivateApi:PersistenceInBusinessModel | Please avoid Spryker dependency: **{object_name}**->**{method_name}(...)** | [Private API is extended](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-extended.html) |

</div>
