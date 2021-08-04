---
title: Security Release Notes 2018.11.0
originalLink: https://documentation.spryker.com/v5/docs/security-release-notes-2018-11-0
redirect_from:
  - /v5/docs/security-release-notes-2018-11-0
  - /v5/docs/en/security-release-notes-2018-11-0
---

The following information pertains to security related issues that were discovered and resolved.

Issues are listed by description and affected modules.

{% info_block infoBox %}
If you need any additional support with this content please contact [support@spryker.com](mailto:support@spryker.com
{% endinfo_block %})

## Use of unserialize()
Issue with the debugging tool: Transfer Repeater was fixed to prevent running the tool in production where it might cause a security vulnerability.

**Affected module:**
ZedRequest - Fixed in version: 3.5.0

## Possible SQL Injection
Product Options got a validation plugin, which proves the Product Option existence.

**Affected module:**
ProductOptions - Fixed in version: 6.5.0

## Vulnerable JS dependencies
Several JS dependencies vulnerabilities have been found and  fixed:

* **Ratepay** contains a vulnerable dependency of JQuery7 (&gt;=1.4.0 &lt;=1.11.3 || &gt;=1.12.4 &lt;=2.2.4).
* **Gui/assets** contains a vulnerable dependency of JQuery-UI8 (&lt;=1.11.4).
* **ProductRelation** contains a vulnerable dependency of Moment9 (&lt;2.19.3).

**Affected modules:**

* Ratepay - Fixed in version: 0.6.11
* Gui - Fixed in version: 3.15.0
* ProductRelation - Fixed Version: 2.1.6

## Possible Vulnerability on File Creation
A create file vulnerability occurs when user input is embedded unsanitized into a file path used for file operations. As a solution, we used a safe base path by using method `basename()` for local files.

**Affected Module:**
ZedRequest - Fixed in version: 3.5.0

## Obsolete dependencies in Zed Gui package.json
In order to fix security vulnerabilities in 3-rd party libraries, the JQuery-UI version has been updated to 1.12.1.

**Affected Module:**
Gui - Fixed in version: 3.15.0

## Possible Open Redirection Vulnerability
Open Redirection vulnerabilities occur when applications use data controlled by a user into the target address of a redirect in an unsafe way. An attacker may construct an address within the application that causes a redirect to an arbitrary external location. This behavior can be used for example, for phishing attacks against application users. Allowed domains now can be configured and the application will disallow any other redirects to unknown domains.

**Affected Module:**
Kernel – Fixed in version 3.23.1

## XSS Vulnerabilities in Development mode
Spryker Commerce OS was audited and extensively tested for XSS vulnerabilities. Due to strict checks of input almost no XSS vulnerabilities have been uncovered. However, it was possible to inject XSS code when the development version was used. The reason was that error messages might contain a malicious payload. This is not a problem in production environments, because the detailed errors are not shown.

**Affected Module:**
Currency – Fixed in version 3.5.0
