---
title: Security Release Notes 201903.0
originalLink: https://documentation.spryker.com/v6/docs/security-release-notes-201903-0
redirect_from:
  - /v6/docs/security-release-notes-201903-0
  - /v6/docs/en/security-release-notes-201903-0
---

The following information pertains to security-related issues that were discovered and resolved.

Issues are listed by description and affected modules.

{% info_block infoBox %}
If you need any additional support with this content, please contact [support@spryker.com](mailto:support@spryker.com
{% endinfo_block %}.)

First, two potential vulnerabilities require direct Zed access to be exploitable; it is advised to always secure Zed, review users having access and put Zed into demilitarized zones in your infrastructure perimeter.

## Possible Cross-Site Scripting (XSS)
An admin user was able to save raw HTML in product attributes, glossary and user roles management in Zed. Additional filtering has been added.

**Affected modules:**

* ProductAttribute <!--/module_guide/spryker/product-attribute.htm -->  (1.1.2)
* ProductAttributeGui <!--(https://documentation.spryker.com/module_guide/spryker/product-attribute-gui.htm) -->  (1.2.1)
* Glossary <!-- (https://documentation.spryker.com/module_guide/spryker/glossary.htm) --> (3.5.2)
* Acl <!--(https://documentation.spryker.com/module_guide/spryker/acl.htm) -->(3.1.2) 

**How to get the fix:** Just update modules with'

```bash
composer update spryker/acl spryker/glossary spryker/product-attribute-gui spryker/product-attribute
```

## Possible Cross-Site Request Forgery (CSRF)
Product attribute forms were missing CSRF form tokens.

**Affected module:**

* ProductAttributeGui <!--(https://documentation.spryker.com/module_guide/spryker/product-attribute-gui.htm)--> (1.1.0)

**How to get the fix:** Just update modules with 

```
composer update spryker/product-attribute-gui
```

## Potential Clickjacking
The additional header Content-Security-Policy has been added by default.

**Affected module:**

* Application <!--(https://documentation.spryker.com/module_guide/spryker/application.htm)--> (3.14.0)

**How to get the fix:** Just update modules with 

```
composer update spryker/application
```

## Default Application Environment
This one is not a security vulnerability, but to prevent fatal mistakes, the default value of APPLICATION_ENV, when it is not passed from the system environment, has been set to production in the `Install` module.

**Affected module:**

* Install <!--(https://documentation.spryker.com/module_guide/spryker/install.htm) -->(0.5.1)
