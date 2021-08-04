---
title: Security release notes- 202102.0 SEC
originalLink: https://documentation.spryker.com/2021080/docs/security-release-notes-2021020-sec
redirect_from:
  - /2021080/docs/security-release-notes-2021020-sec
  - /2021080/docs/en/security-release-notes-2021020-sec
---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

{% info_block warningBox "Note" %}

If you need any additional support with this content, please contact [support@spryker.com](mailto:support@spryker.com). If you found a new security vulnerability, please inform us via [security@spryker.com](mailto:security@spryker.com).

{% endinfo_block %}

## Cross-Site-Scripting (XSS) due to assigning customers function in the Back Office

In the Back Office, when an administrator assigns customers to users, an XSS attack (with user interaction) is possible.

**Changes**:
The `CustomerGroup` module:
* Added `UtilSanitizeServiceInterface` to dependencies.
* Adjusted `AbstractAssignmentTable::getSelectCheckboxColumn()` to sanitize HTML tags for customer data.

The `CustomerUserConnectorGui` module:
* Added `UtilSanitizeServiceInterface` to dependencies.
* Added `UtilEncodingServiceInterface` to dependencies.
* Adjusted `AbstractCustomerTable::getCheckboxColumn()` to sanitize HTML tags for customer data.

**Affected modules**:
* CustomerGroup (2.5.5)
* CustomerUserConnectorGui (1.2.3)


**How to get the fix**: 
* Update the modules: 
```bash
composer update spryker/customer-user-connector-gui spryker/customer-group
```
* Check `AbstractAssignmentTable::getSelectCheckboxColumn()` and `AbstractCustomerTable::getCheckboxColumn()` if they were changed on the project level.

## Stored Cross-Site-Scripting (XSS) in product reviews 
It is possible for an attacker to enter JavaScript or HTML code that will be executed in the Back Office.
This vulnerability allows an attacker to execute code in the context of the administrator.

**Changes**:
* Adjusted `ProductReviewTable::getCustomerName()` to escape HTML tags in the customer's first and last names.
* Adjusted `ProductReviewTable::getProductName()` to escape HTML tags in the product name.


**Affected modules**:
* ProductReviewGui (1.2.0)

**How to get the fix**: 
* Update the modules:
```bash
composer update spryker/product-review-gui
```

## Open redirect in login script of the administrative backend (the Back Office)
It is possible to manipulate the `referer` parameter and redirect the administrator to any URL.
The login script of the Back Office backend allows the specification of a path named `referer`. This parameter allows it to redirect an unauthenticated administrator to a specific page after login.

**Changes**:
* Adjusted `RedirectAfterLoginProvider` to make referer field validation more strict.
* Adjusted `RedirectAfterLoginEventDispatcherPlugin` to make referer field validation more strict.


**Affected modules**:
* Auth (3.7.5)

**How to get the fix**: 
* Update the modules:
```bash
composer update spryker/auth
```
## Bypass of redirection restrictions
There is a possibility to set an incorrect parameter in the Back Office backend on the *edit CMS redirect* page, which will redirect a user to another site. By default, those redirects should be possible only to the same application.

**Changes**:
* Adjusted `CmsRedirectForm` to more strict URL validation.
* Adjusted the Back Office translations for the `en_US` and `de_DE` locale.

**Affected modules**:
* CMS (7.10.1)

**How to get the fix**: 
* Update the modules: 
```bash
composer update spryker/cms
```

## Missing CSRF protection in approving product reviews
The written product reviews are present in the Back Office administrative backend (/product-review-gui). At this point, the administrator can decide if a product review will be approved or rejected. Actions for this do not have any CSRF-Token implemented. Due to that, a simple click will reject or approve a product review.

**Changes**:
* Adjusted `ProductReviewTable` to generate approve/reject buttons with the CSRF protection form.

**BC breaking impact**:
* `UpdateController::approveAction()` now becomes POST only and must be called by submitting `CloseReclamationForm` in order to use CSRF protection.
* `UpdateController::rejectAction()` now becomes POST only and must be called by submitting `CloseReclamationForm in order to use CSRF protection.

**Affected modules**:
* ProductReviewGui (1.2.0)

**How to get the fix**: 
* Update the modules: 
```bash
composer update spryker/product-review-gui
```

## Missing CSRF protection in handling reclamations
When dealing with reclamations in the backend (the Back Office), it is possible to execute an action without a token provided. Thus, the function is vulnerable against Cross-Site-Request-Forgery (CSRF).

**Changes**:
* `Adjusted ReclamationTable::createCloseAction()` to generate buttons with the CSRF protection form.

**BC breaking impact**:
* Adjusted `DetailController::closeAction()` in order to use CSRF protection, it can handle POST requests only and must be called by submitting `CloseReclamationForm`.

**Affected modules**:
* SalesReclamationGui (1.5.0)

**How to get the fix**: 
* Update the modules: 
```bash
composer update spryker/sales-reclamation-gui
```

## Missing password policy in frontend and backend (B2C and B2B)
There is a difference in the frontend (Yves) and backend (the Back Office) password policy in the following functionality:
* Registration
* Change password
* Forgot password

Administrators in the backend (the Back Office) can use weak or compromised passwords.

**Changes**:
The `SecurityGui` module:
* Adjusted `ResetPasswordForm` to use min/max length for password validation.
* Introduced `SecurityGuiConfig::getUserPasswordMinLength()`.
* Introduced `SecurityGuiConfig::getUserPasswordMaxLength()`.

The `User` module:
* Adjusted` UserForm` to use min/max length for password validation.
* Adjusted `UserUpdateForm` to use min/max length for password validation.
* Introduced `UserConfig::getUserPasswordMinLength()`.
* Introduced `UserConfig::getUserPasswordMaxLength()`.
* Introduced the `NotCompromisedPassword` validation, which will allow users to use only safe passwords.

The `CustomerPage` module:
* Adjusted `RestorePasswordForm` to use min/max length for password validation.

**Affected modules**:
* SecurityGui (0.1.1)
* User (3.12.2)
* CustomerPage (2.31.0)

**How to get the fix**: 
* Update the modules: 
```bash
composer update spryker-shop/customer-page spryker/user spryker/security-gui.
```
* Check if `ResetPasswordForm`, `UserUpdateForm`, and `UserForm` contain any changes on the project level.


## The web-server takes any given value for www-de-suite-local and if it doesn't belong to a session.
All website users can create their own cookies with a chosen name. This cookie name can have a large value (up to 4 KB) that is stored to Redis and thus can waste server memory.

**Changes**:
* Adjusted `SessionKeyBuilder::buildSessionKey()` to check maximum session key length. By default, the session key length is 32 symbols. All keys longer than 64 symbols will be trimmed.

**Affected modules**:
* SessionRedis (1.4.0)

**How to get the fix**: 
* Update the modules:
```bash
composer update spryker/session-redis
```
