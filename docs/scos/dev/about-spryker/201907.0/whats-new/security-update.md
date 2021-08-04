---
title: Security Updates
originalLink: https://documentation.spryker.com/v3/docs/security-updates
redirect_from:
  - /v3/docs/security-updates
  - /v3/docs/en/security-updates
---

To receive a security updates email, subscribe here:

<div class="script-embed" data-code="hbspt.forms.create({
				portalId: '2770802',
                formId: '418706df-28ef-44a2-817d-261032aa7113'
				}); ">
</div>
     
Check out our Security Release notes in the [Release Notes](/docs/scos/dev/about-spryker/202001.0/releases/release-notes/release-notes) article for each respective release.

## March 2018
    
### Upgrade to the Latest Properl2 Tag

Previously, an SQL injection might be possible for a custom code of projects, since query, provided to the limit setter, could be run. With this release, Propel2 has been upgraded to the latest tag in order to pull in SQL injection vulnerability fixes for queries. The limit can now not be hijacked for custom SQL queries anymore.

Spryker Core itself was not affected, but projects might have been in custom code. Please check all queries where user data is passed to ORM without casting the limit.

**Affected Modules**
|Major  | Minor | Patch |
| --- | --- | --- |
|n/a  | n/a | [PropelOrm 1.6.1](https://github.com/spryker/propel-orm/releases/tag/1.6.1) |

## December 2017

### Zed Side Email Validation on Newsletter Subscription and Guest Form
    
Previously validation of e-mail addresses by newsletter subscription or checkout as a guest wasn't done on Zed side, which could cause storing invalid email addresses. With this release we added Zed validation of e-mail addresses against RFC for both newsletter subscriptions and checkout guest form. Now the final validation in checkout workflow also implies validation of the e-mail address right before storing customer details to the database.

**Affected Modules**
| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | - [Customer 7.1.0](https://github.com/spryker/Customer/releases/tag/7.1.0) </br> - [Newsletter 4.2.0](https://github.com/spryker/Newsletter/releases/tag/4.2.0)  | n/a |

## November - 2 2017

### Email Validation in Zed

We have identified that Zed is accepting invalidly formatted email strings (for example on customer login) if the HTTP request between Yves and Zed is manipulated on the fly or Yves frontend is manipulated on purpose. As far as we have observed, this does not lead to XSS within Yves, yet it might throw exceptions within Zed where the email string is processed (for example in Sales or Customers sections). To avoid any potential vulnerability we have added email validations in Zed and Yves. In successive releases, we will also add Zed side validation on newsletter subscription and guest checkout.

With this release, we are introducing Egulias module, which is a wrapper module for "egulias/email-validator" 3rd party library.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| - [Egulias 1.0.0](https://github.com/spryker/Egulias/releases/tag/1.0.0) </br> - [UtilValidate 1.0.0](https://github.com/spryker/util-validate/releases/tag/1.0.0) | [Customer 6.4.0](https://github.com/spryker/Customer/releases/tag/6.4.0) | n/a |

**Migration Guides**

To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/egulias:"^1.0.0" spryker/util-validate:"^1.0.0"
```

## November - 1 2017

### SQL Injection Security Vulnerability in Zed Tables
    
Previously there was an SQL injection security vulnerability in our Zed table filters. With an authenticated user it was possible to inject arbitrary SQL statements in certain request. This vulnerability issue for tables is fixed now. We advise you to upgrade to the latest version of the Gui module.
    
**Affected Modules**

|  Major| Minor | Patch |
| --- | --- | --- |
|n/a  |  n/a| [Gui 3.10.1](https://github.com/spryker/Gui/releases/tag/3.10.1) |

### Lazy XSS Injections Fix for Customer View in Zed
    
Lazy XSS injections refer to the case where it is possible to inject a backend/back office component such as Zed, through malicious input that can be supplied from the outside - in this case Yves. Attacks like this are very common because once a system like Zed is compromised, the door is usually open to highly sensitive data such as customer information and more.
    
We had a vulnerability issue where it could have been possible to infect Zed persistently through XSS originating from Yves (like, for example, via a malicious script through the street field in the address management section of Yves). XSS vulnerability in Zed customer view page is fixed now. We advise you to upgrade to the latest version of the Customer module.

**Affected Modules**

|Major  | Minor | Patch |
| --- | --- | --- |
| n/a | n/a |  [Customer 6.3.2](https://github.com/spryker/Customer/releases/tag/6.3.2)|

### Validate Customer Login Redirect
    
Previously our demoshop contained an unsafe redirection during customer login. The security issue was eliminated by enhancing the Demoshop implementation of the `CustomerAuthenticationFailureHandler` and `CustomerAuthenticationSuccessHandler` plugins. `CustomerConfig` is introduced to provide a base class for Demoshop implementation. Please use our demoshop implementation reference to eliminate any potential security issue in your project as well. 

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | n/a | [Customer 6.3.1](https://github.com/spryker/Customer/releases/tag/6.3.1) |
