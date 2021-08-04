---
title: Validating REST Request Format
originalLink: https://documentation.spryker.com/v5/docs/validating-rest-request-format
redirect_from:
  - /v5/docs/validating-rest-request-format
  - /v5/docs/en/validating-rest-request-format
---

Glue API allows you to validate requests sent to REST endpoints. It allows you to check whether all required fields are present, the type and the correct format of the fields.

## 1. Installation
To be able to validate REST requests, first, you need to install the `RestRequestValidation` Module that provides the functionality. For details, see [Request Validation Integration](https://documentation.spryker.com/docs/en/rest-schema-validation-feature-integration-201903). 

## 2. Default Validation Schema
Spryker Glue API comes with a default validation schema. The schema provides default validation rules for REST APIs shipped with Spryker. You can find it in the following file: `vendor/spryker/spryker/Bundles/RestRequestValidator/config/validation.dist.yaml`. The schema can be used as a sample and reference for your own validation implementations.

By default, the schema is not applied.

## 3. Validating APIs
To apply validation rules in any of APIs, be that your own APIs or APIs shipped with Spryker, you need to:

1. Copy the default validation schema file to the project level and to each API module that you want to be validated. For example, if you want to provide validation for module StoresRestAPI, you need to copy the file to `src/Pyz/Glue/StoresRestAPI/Validation`.
ss
2. Rename the file to the name of the API you are providing validation for.  For the `StoresRestAPI`, the name will be `STORES.validation.yaml`.

3. Provide validation for the endpoints provided by the API. For details, see [Validation Rule Format](https://documentation.spryker.com/docs/en/validating-rest-request-format#4--validation-rule-format).

4. Run `vendor/bin/console glue:rest:build-request-validation-cache`.

5. Make sure that the following file has changed: `src/Pyz/Generated/Glue/Validator/validation.cache`.

Now, the API endpoints you provided validation rules for will validate all incoming requests.

## 4. Validation Rule Format
The general format of validation YAML files is as follows:

```yaml
endpoint_name1:
  method:
    field1:
      - Constraint1
      - Constraint2
      - ConstraintWithParameters:
          parameterName: '/\w*/'
    field2:
      - Constraint1
  
endpoint_name2:
  method:
    field1:
    - Constraint1
```

The validation rules are the same as those of the Symfony Validator component. For details, see [Supported Constraints](https://symfony.com/doc/current/validation.html#supported-constraints).

If you want to disable validation for any field of the APIs shipped with Spryker on your project level, you need to add the field on the project or store level without any constraints. For example, if an API is validated on the core level as follows:

```yaml
access-tokens:
  post:
    username:
      - NotBlank
      - Email
      - Regex:
          pattern: '/\w*/'
  
refresh-tokens:
  post:
    refresh_token:
    - Required
```
To remove validation on the **username** field, your project level implementation should look as follows:

```yaml
access-tokens:
  post:
    username:
  
refresh-tokens:
  post:
    refresh_token:
    - Required
```
By default, all the fields in a request are required. To make a field optional, the schema should be written as follows:

```yaml
refresh-tokens:
  post:
    refresh_token:
    - Optional:
        constraints:
        - NotBlank
```

## 5. Validation Cache
All validation rules in Spryker Glue API are cached. For this purpose, rules are not applied immediately after you create or change them. To apply changes, you need to re-build the validation cache. For this purpose, run the following console command: 

```bash
vendor/bin/console glue:rest:build-request-validation-cache
```
{% info_block infoBox %}

You can also use a [Spryk](https://documentation.spryker.com/docs/en/glue-spryks) for the validation. Run the following command: 
```Bash
cconsole spryk:run AddGlueValidation --mode=project --module=ResourcesRestApi --organization=Pyz --resourceType=resources
```
This command will place the default validation.yaml file into the specified module. Attributes should be added manually.

{% endinfo_block %}
