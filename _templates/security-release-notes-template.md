---
title: Security release notes {version}
description: Security release notes for the Spryker Product release {version}
last_updated: {Date}
template: concept-topic-template
---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

If you need any additional support with this content, [contact our support](mailto:support@spryker.com). If you found a new security vulnerability, inform us through [security@spryker.com](mailto:security@spryker.com).


## {Issue} <!--for example, SQL injection in the Propel module-->

{Description of the actual issues} 

{Description of the technical changes in the affected modules}

<!-- Description example: Administrators can place a malicious payload in placeholders, which can be executed while trying to save, preview, or view the new page, resulting in an XSS vulnerability. -->

## Affected modules

{module}: {version} <!--Example: `spryker/propel`: 1.0.0-3.37.0-->

<!-- Link the module with the version to the respective release tag page on GitHub—for example, "[spryker/comment 1.1.0.](https://github.com/spryker/comment/releases/tag/1.1.0)" -->

## Introduced changes

{Specify the modules and list changes made in them} 

<!--
Example:

spryker/product-review-gui module:
* Added `UtilSanitizeServiceInterface` to dependencies.
* Adjusted `AbstractAssignmentTable::getSelectCheckboxColumn()` to sanitize HTML tags for customer data.
-->

## How to get the fix

1. {Step 1, in imperative mood}<!-- Install or update the following modules: -->

```bash
composer {module}: {version}
composer show spryker/propel # Verify the version
```

2. {Next steps to get the fix, in imperative mood}