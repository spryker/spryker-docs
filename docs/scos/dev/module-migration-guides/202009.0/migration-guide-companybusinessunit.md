---
title: Migration Guide - CompanyBusinessUnit
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/migration-guide-companybusinessunit
originalArticleId: f830f84d-dc3b-4b20-8af4-d4bbd33ad588
redirect_from:
  - /v6/docs/migration-guide-companybusinessunit
  - /v6/docs/en/migration-guide-companybusinessunit
---

## Upgrading from Version 1* to Version 2*
The second version of the CompanyBusinessUnit module added the parent Company Business Units functionality.
CompanyBusinessUnit v2.0.0 major version adds a new `fk_parent_company_business_unit`to the `spy_company_business_unit` database table:

```XML
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\CompanyBusinessUnit\Persistence" package="src.Orm.Zed.CompanyBusinessUnit.Persistence">
 
    <table name="spy_company_business_unit" phpName="SpyCompanyBusinessUnit" identifierQuoting="true">
        <column name="fk_parent_company_business_unit" type="INTEGER" required="false"/>
         
        <foreign-key name="spy_company_business_unit-fk_parent_company_business_unit" foreignTable="spy_company_business_unit" phpName="ParentCompanyBusinessUnit" refPhpName="ChildrenCompanyBusinessUnits">
            <reference local="fk_parent_company_business_unit" foreign="id_company_business_unit"/>
        </foreign-key>
    </table>
 
</database>
```
This change allowed company business units to have parent company business units, which made it possible to create hierarchies of company business units inside the company.

**To upgrade to the new version, do the following:**

### 1. Update modules
    1. Update `spryker/company-business-unit` module version in your `composer.json`:
 ```Bash
   {
  "require": {
    "spryker/company-business-unit": "^2.0.0"
  }
}
```
     
2. Run `composer update` to update the installed packages. If the execution of this command fails because of the dependency issues, they should be resolved first. 

### 2. Perform the database update and migration: 
    1. Execute the following SQL query to apply `spy_company_business_unit` database table changes:
```SQL
BEGIN;
 
ALTER TABLE "spy_company_business_unit" ADD "fk_parent_company_business_unit" INTEGER;
 
ALTER TABLE "spy_company_business_unit" ADD CONSTRAINT "spy_company_business_unit-fk_parent_company_business_unit"
    FOREIGN KEY ("fk_parent_company_business_unit")
    REFERENCES "spy_company_business_unit" ("id_company_business_unit");
 
COMMIT;
```
2. Execute the following commands to build Propel models:
```BASH
console propel:diff;
console propel:migrate;
console propel:model:build;
```

3.  Execute the `console transfer:generate` command to apply transfer objects changes.

