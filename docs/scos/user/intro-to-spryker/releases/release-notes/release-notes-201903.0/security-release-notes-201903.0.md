---
title: Security Release Notes 201903.0
description: The following information pertains to security-related issues that were discovered and resolved during the 201903.0 release.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/security-release-notes-201903-0
originalArticleId: 11ab0ed2-762f-485e-b145-316cf52922f1
redirect_from:
  - /2021080/docs/security-release-notes-201903-0
  - /2021080/docs/en/security-release-notes-201903-0
  - /docs/security-release-notes-201903-0
  - /docs/en/security-release-notes-201903-0
  - /v5/docs/security-release-notes-201903-0
  - /v5/docs/en/security-release-notes-201903-0
  - /v4/docs/security-release-notes-201903-0
  - /v4/docs/en/security-release-notes-201903-0
  - /v3/docs/security-release-notes-201903-0
  - /v3/docs/en/security-release-notes-201903-0
  - /v2/docs/security-release-notes-201903-0
  - /v2/docs/en/security-release-notes-201903-0
  - /v1/docs/security-release-notes-201903-0
  - /v1/docs/en/security-release-notes-201903-0
  - /v6/docs/security-release-notes-201903-0
  - /v6/docs/en/security-release-notes-201903-0

---

The following information pertains to security-related issues that were discovered and resolved.

Issues are listed by description and affected modules.

{% info_block infoBox %}

If you need any additional support with this content, please contact [support@spryker.com](mailto:support@spryker.com).

{% endinfo_block %}

First, two potential vulnerabilities require direct Zed access to be exploitable; it is advised to always secure Zed, review users having access and put Zed into demilitarized zones in your infrastructure perimeter.

## Possible Cross-Site Scripting (XSS)
An admin user was able to save raw HTML in product attributes, glossary and user roles management in Zed. Additional filtering has been added.

**Affected modules:**

* ProductAttribute <!--/module_guide/spryker/product-attribute.htm -->  (1.1.2)
* ProductAttributeGui <!--(https://github.com/spryker/product-attribute-gui) -->  (1.2.1)
* Glossary <!-- (/docs/scos/user/back-office-user-guides/{{site.version}}/administration/glossary/glossary.html) --> (3.5.2)
* Acl <!--(https://github.com/spryker/acl) -->(3.1.2)

**How to get the fix:** Just update modules with'

```bash
composer update spryker/acl spryker/glossary spryker/product-attribute-gui spryker/product-attribute
```

## Possible Cross-Site Request Forgery (CSRF)
Product attribute forms were missing CSRF form tokens.

**Affected module:**
<br>ProductAttributeGui <!--(https://github.com/spryker/product-attribute-gui)--> (1.1.0)

**How to get the fix:** Just update modules with

```
composer update spryker/product-attribute-gui
```

## Potential Clickjacking
The additional header Content-Security-Policy has been added by default.

**Affected module:**
<br>Application <!--(https://github.com/spryker/application)--> (3.14.0)

**How to get the fix:** Just update modules with

```
composer update spryker/application
```

## Default Application Environment
This one is not a security vulnerability, but to prevent fatal mistakes, the default value of APPLICATION_ENV, when it is not passed from the system environment, has been set to production in the `Install` module.

**Affected module:**
<br>Install <!--(https://github.com/spryker/install) -->(0.5.1)
