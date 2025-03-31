---
title: Security release notes 202212.0
description: Security release notes for the Spryker Product release 202212.0
last_updated: Dec 21, 2022
template: concept-topic-template
redirect_from:
- /docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202212.0/security-release-notes-202212.0.html

---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

{% info_block infoBox "Note" %}

If you need any additional support with this content,  contact [support@spryker.com](mailto:support@spryker.com). If you found a new security vulnerability,  inform us via [security@spryker.com](mailto:security@spryker.com).

{% endinfo_block %}

## CmsGui:5.6.0 added XSS sanitizing options without adding spryker/form dependency

XSS sanitizing options have been added for CmsGui version [5.6.0](https://github.com/spryker/cms-gui/releases/tag/5.6.0). However, the version failed if these options were not extended by `SanitizeXssTypeExtensionFormPlugin`.

**Changes:**
- Gui module:
    - Introduced the `SanitizeXssTypeExtensionFormPlugin` plugin to register the `SanitizeXssTypeExtension` extension that extends `TextType` and `TextAreaType` form types with such options as `sanitize_xss`, `allowed_attributes` and `allowed_html_tags` to enable and configure XSS sanitizing on text fields.
    - Added `GuiToUtilSanitizeXssServiceInterface` to dependencies.
    - Added `spryker/util-sanitize-xss` to dependencies.

- CmsGui module:
Adjusted CmsGlossaryTranslationFormType to enable XSS sanitizing for the translation field.

**Affected modules:**
spryker/cms-gui (5.6.0)

**How to get the fix:**
1. Check the version of the related modules:
- spryker/gui (3.29.0)
- spryker/cms-gui (5.6.0)
- spryker/form (1.0.0)
2. Update the modules if the versions are earlier than those mentioned above. For example:

```bash
composer update spryker/cms-gui`
```
3. Add `Spryker\Zed\Gui\Communication\Plugin\Form\SanitizeXssTypeExtensionFormPlugin` to `\Pyz\Zed\Form\FormDependencyProvider::getFormPlugins()` on the project level.

## Twig - twig could load a template outside of a configured directory when the filesystem loader was used
There was a vulnerability in PHP package twig/twig. When using the filesystem loader to load templates for which the name is user input, it was possible to use the source or include a statement to read arbitrary files from outside of the templates directory.

**Changes:**
Twig module:
Increased the `twig/twig` dependency version to ensure the security issue on the filesystem loader is resolved.

**Affected modules:**
spryker/twig (3.17.0 or earlier)

**How to get the fix:**
1. Update the module: `composer update spryker/twig`
2. Make sure that the current version of the `spryker/twig` twig module is equal to or later than 3.17.1.

## Missing validation of the wishlist name on adding an item

Because of the way the characters are handled, it was possible to abuse the name in a way that the constructed URL linked to another resource of the shop instead of the wishlist.

**Changes:**
Wishlist module:
- Introduced `WishlistFacade::validateWishlistItemBeforeCreation()` to validate a wishlist item before adding it to wishlist.
- Introduced the `WishlistItemAddItemPreCheckPlugin` plugin implementing `AddItemPreCheckPluginInterface` to validate wishlist item before adding to wishlist.
- Adjusted `WishlistFacade::addItem()` to validate item's wishlist name before adding to wishlist.
- Adjusted `WishlistFacade::addItemCollection()` to validate item's wishlist name before adding to wishlist.
WishlistPage module:
- Adjusted `WishlistController::addItemAction()` to redirect to the wishlist overview page when wishlist item is not added successfully.
- Adjusted `WishlistController::addItemAction()` to create a default wishlist when wishlist name is not provided.
- Introduced the `WishlistResponse.wishlist` transfer field.
- Added the Transfer module to dependencies.

**Affected modules:**
spryker/wishlist (8.6.0 or earlier)

**How to get the fix:**
1. Update the module:
```bash
`composer update spryker/wishlist`
```
2. If Yves is used, also update the WishlistPage module: `composer update spryker/wishlist-page`
3. Make sure that for these modules the current version is equal to or later than the following:
- spryker/wishlist: 8.7.0
- spryker-shop/wishlist-page: 1.11.0
4. Add `Spryker\Zed\Wishlist\Communication\Plugin\Wishlist\WishlistItemAddItemPreCheckPlugin` to `Pyz/Zed/Wishlist/WishlistDependencyProvider::getAddItemPreCheckPlugins()` on the project level.

## User enumeration when creating a customer via the API
It was possible to enumerate users if creating them via the API. The message in response was "Customer with this email already exists."

**Changes:**
The response message has been changed as follows: "If this email address is already in use, you will receive a password reset link. Otherwise you must first validate your e-mail address to finish registration. Please check your e-mail."

**Affected modules:**
No changes.

**How to get the fix:**
Update the translation in the `data/import/common/common/glossary.csv for customer.authorization.invalid_account` key.

## ZED token default value can be empty
The default Zed tokens could be empty if it was not set during installation.

**Changes:**
We've removed the default value `SPRYKER_ZED_REQUEST_TOKEN`. The value has to be set or the fallback value must be properly handled with an exception.

**Affected modules:**
No changes.

**How to get the fix:**
In the related config files like `config/Shared/config_default.php`, remove the default value for the default value `SPRYKER_ZED_REQUEST_TOKEN`.

## Leakage of table names and parameters when inserting long strings in the file directory name
When creating a new directory within the file tree (*Content > File Tree*) it was possible to
include very long strings in the name.

**Changes:**
FileManagerGui module:
Adjusted AddDirectoryController::indexAction() to add validation for the maximum length of the file directory name.

**Affected modules:**
spryker/file-manager-gui (version 2.1.0 or earlier)

**How to get the fix:**
1. Update the modules: composer update spryker/file-manager-gui
2. Make sure that for the `spryker/file-manager-gui` module, the current version is equal to or later than 2.2.0.

## Links could be embedded into registration emails
After registration, the application sends a notification email to the user. It was possible to embed links into the email by filling out the first and the last name fields.


**Changes:**

CompanyUserGui module:
- Adjusted `CompanyUserCustomerForm::addFirstNameField()` by adding field validation to avoid special .
- Adjusted `CompanyUserCustomerForm::addLastNameField()` by adding field validation to avoid special characters.

Customer module:
- Introduced `CustomerConfig::PATTERN_FIRST_NAME`.
- Introduced `CustomerConfig::PATTERN_LAST_NAME`.
- Adjusted `AddressForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `AddressForm::addLastNameField()` by adding field validation to avoid special characters.
- Adjusted `CustomerForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `CustomerForm::addLastNameField()` by adding field validation to avoid special characters.

MerchantProfileMerchantPortalGui module:
- Adjusted `BusinessInfoMerchantProfileForm::addContactPersonFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `BusinessInfoMerchantProfileForm::addContactPersonLastNameField()` by adding field validation to avoid special characters.

MerchantUserGui module:
- Adjusted `MerchantUserCreateForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `MerchantUserCreateForm::addLastNameField()` by adding field validation to avoid special characters.

Sales module:
- Introduced `SalesConfig::PATTERN_FIRST_NAME`.
- Introduced `SalesConfig::PATTERN_LAST_NAME`.
- Adjusted `AddressForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `AddressForm::addLastNameField()` by adding field validation to avoid special characters.
- Adjusted `CustomerForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `CustomerForm::addLastNameField()` by adding field validation to avoid special characters.

User module:
- Adjusted `UserForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `UserForm::addLastNameField()` by adding field validation to avoid special characters.

UserMerchantPortalGui module:
- Adjusted `MerchantAccountForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `MerchantAccountForm::addLastNameField()` by adding field validation to avoid special characters.

CompanyPage module:
- Introduced `CompanyPageConfig::PATTERN_FIRST_NAME`.
- Introduced `CompanyPageConfig::PATTERN_LAST_NAME`.
- Adjusted `CompanyRegisterForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `CompanyRegisterForm::addLastNameField()` by adding field validation to avoid special characters.
- Adjusted `CompanyUserForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `CompanyUserForm::addLastNameField()` by adding field validation to avoid special characters.

CustomerPage module:
- Introduced `CustomerPageConfig::PATTERN_FIRST_NAME`.
- Introduced `CustomerPageConfig::PATTERN_LAST_NAME`.
- Adjusted `AddressForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `AddressForm::addLastNameField()` by adding field validation to avoid special characters.
- Adjusted `GuestForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `GuestForm::addLastNameField()` by adding field validation to avoid special characters.
- Adjusted `ProfileForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `ProfileForm::addLastNameField()` by adding field validation to avoid special characters.
- Adjusted `RegisterForm::addFirstNameField()` by adding field validation to avoid special characters.
- Adjusted `RegisterForm::addLastNameField)` by adding field validation to avoid special characters.

**Affected modules:**
- spryker/customer (7.45.0 or earlier)
- spryker/sales (11.32.0 or earlier)
- spryker/user (3.13.6 or earlier)


**How to get the fix:**
1. Update the modules:
```bash
composer update spryker/company-user-gui
```
```bash
spryker/customer spryker/merchant-profile-merchant-portal-gui
```
```bash
spryker/merchant-user-gui spryker/sales spryker/user-merchant-portal-gui
```
If if use Yves, also update these modules:
```bash
composer update spryker-shop/company-page
```
```bash
spryker-shop/customer-page
```
2. Make sure that for these modules the current version is equal to or later than the following:
spryker/company-user-gui: 1.9.0
spryker/customer: 7.46.0
spryker/merchant-profile-merchant-portal-gui: 1.6.0
spryker/merchant-user-gui: 1.2.0
spryker/sales: 11.33.0
spryker/user: 3.14.0
spryker/user-merchant-portal-gui: 1.6.0
spryker-shop/company-page: 2.20.0
spryker-shop/customer-page: 2.39.0

## Extension of CSP directives
The main CSP directives were not implemented and needed to be extended.

**Changes:**
Application module:
Added the `sandbox`, `base-uri`, `form-action` directives to `Content-Security-Policy` headers for the Yves application.

**Affected modules:**
spryker/application (3.28.0 or earlier)


**How to get the fix:**
1. Update the module:
```bash
composer update spryker/application
```
2. Make sure that for the spryker/application module, the current version is equal to or later than 3.28.1.

## Possibility to request malformed files (wrong content type)
It was possible to request malformed files (PDF, PNG) in the backend. This request was possible because the generator for state machines allowed the specification of the filetype—without switching the content type.

**Changes:**
- Oms module:
Adjusted `IndexController::drawAction()`, so that if format is not supported, an error message is displayed.
- StateMachine module:
Adjusted `GraphController::drawAction()`, so that if format is not supported, an error message is displayed.

**Affected modules:**
- spryker/oms (11.19.0 or less)
- spryker/state-machine (2.15.1 or less)

**How to get the fix:**
1. Update the following modules:
```bash
composer update spryker/oms
```

```bash
spryker/state-machine
```
Make sure that for the following modules, the current version is equal to or later than the following:
- spryker/oms: 11.20.0
- spryker/state-machine: 2.16.0

## Stored XSS on ZED in the company name
It was possible to store JavaScript code in the company name on ZED.

**Changes:**
CompanyUnitAddressGui module:
- Adjusted `CompanyUnitAddressTable` so it converts special characters to HTML entities for the company name

**Affected modules:**
spryker/company-unit-address-gui (1.1.0 or earlier)

**How to get the fix:**
1. Update the modules:
```bash
composer update spryker/company-unit-address-gui
```
2. Make sure that for the spryker/company-unit-address-gui module, the current version is equal to or later than 1.1.1.

## Missing Server-side validation on ZED
The application did not perform sufficient authorization checks on the server side. For example, it was possible to change the role of a company user using only the frontend webshop access.

**Changes:**

- ProductCategoryFilterGui module:
    - Adjusted `ProductCategoryFilterController::indexAction()` to validate product category filters when the product category filter form is submitted.
    - Added `ProductSearchFacadeInterface::getAllProductAttributeKeys()` to dependencies.
    - Increased version of thr ProductSearch module version dependency.

- ProductSearch module:
Introduced `ProductSearchFacade::getAllProductAttributeKeys()` to get all the product attribute keys.

**Affected modules:**
spryker/product-search (5.16.0 or earlier)

**How to get the fix:**
1. Update the module:
```bash
composer update spryker/product-category-filter-gui
```
2. Make sure that for these modules, the current version is equal to or later than:
- spryker/product-category-filter-gui: 2.1.0
- spryker/product-search: 5.17.0

## Vulnerabilities in third-party dependencies: Codeception version 4.1.8
CVE-2021-23420: This affected the package codeception/codeception from version 4.0.0 and before 4.1.22, before 3.1.3. The RunProcess class could be leveraged as a gadget to run arbitrary commands on a system that was deserializing user input without validation.


**Changes:**
Updated the Сodeception version to ^4.1.22

**Affected modules:**
codeception/codeception (3.1.3 or less, and 4.0.0 - 4.1.21)


**How to get the fix:**
1. Change  *codeception/codeception* version to ^4.1.22 in composer.json on the project level.
2. Update this module:
```bash
composer update codeception/codeception
```
Make sure that for the codeception/codeception module, the current version is equal to or later than 4.1.22.

## Known vulnerabilities in frontend dependencies
- The datatables.net package is vulnerable to Prototype Pollution because of an incomplete fix.
- Known Regular Expression Denial of Service (ReDoS) vulnerabilities in the hosted-git-info package.
- Known vulnerabilities in the lodash package (Command Injection, ReDoS, Prototype Pollution).
- Known vulnerabilities in the ssri package (ReDoS).
- Known vulnerabilities in the y18n package (Prototype Pollution).
- Known vulnerabilities in the elliptic package (Cryptographic Issues, Timing Attack).

**Changes:**

- Updated the version of datatables.net to 1.10.23.
- Updated the version of hosted-git-info to 2.8.9.
- Updated the version of lodash to 4.17.21.
- Updated the version of ssri to 6.0.2.
- Updated the version of y18n to 3.2.2.
- Updated the version of elliptic to 6.5.4.

**Affected modules:**
spryker/gui (3.43.0 or earlier)

**How to get the fix:**
1. To receive the current versions of the npm packages, update the module
```bash
composer update spryker/gui
```
2. Make sure that for the spryker/gui module, the current version is equal to or later than 3.43.1.
3. Run the following command:
```bash
npm list <packagename>
```
4. Make sure that your npm packages have at least these versions:
hosted-git-info to 2.8.9
lodash to 4.17.21
ssri to 6.0.2
y18n to 3.2.2
elliptic to 6.5.4

5. To apply the current versions of npm packages, run the following command:
```bash
npm i
```

## Missing CSRF protection in ZED (File Manager > MIME Type Settings)
While a request usually contained a CSRF token in form of an HTTP POST parameter, the token could still be simply omitted from the request, as it was not checked on the server-side when the *_method* parameter highlighted in red was specified. Since the SameSite attribute was not set for the session cookie in the administrative backend, a third-party website could simply embed the HTML code which could submit a form on behalf of the user and lead to the deletion of content for logged-in users.


**Changes:**
FileManagerGui module:
Adjusted `MimeTypeController::deleteAction()` so it uses CSRF protection for the MIME type deletion.


**Affected modules:**
spryker/file-manager-gui (2.0.0 or earlier)

**How to get the fix:**
Update the modules:
```bash
composer update spryker/file-manager-gui
```
Make sure that for the spryker/file-manager-gui module, the current version is equal to or later than 2.1.0.

## Cross Domain Script Include
The application loads a subset of included JavaScript files from third-party domains.
If the application included a script from an external domain, then the application is entrusting that domain with the application's data and functionality. It has to trust that the external domain is secure enough to prevent an attacker from modifying the script to perform malicious actions within the application.

**Changes:**

- Gui module:
Adjusted the `backward-compatible-breadcrumb.twig` template to remove breadcrumbs web-component with dependencies and restore the default breadcrumbs functionality.

- ZedNavigation module:
Adjusted `BreadcrumbHelper::seeBreadcrumbNavigation()` in to support two possible breadcrumbs frontend components.

**Affected modules:**
spryker/gui (3.43.1 or earlier)

**How to get the fix:**
1. Update the modules:
```bash
composer update spryker/gui
```
```bash
spryker/zed-navigation
```
2. Make sure that the current version is equal to or later than the following:
- spryker/gui (3.44.0)
- spryker/zed-navigation (1.12.1)

## Stored XSS for user roles on Yves and Zed
A user role name was vulnerable to the stored XSS.

**Changes:**
CompanyRoleGui module:
Adjusted CompanyRoleGuiFormatter::formatCompanyRoleNames() so it returns an escaped string.

**Affected modules:**
spryker/company-role-gui (1.6.1 or earlier)

**How to get the fix:**
Update the modules:
```bash
composer update spryker/company-role-gui
```
Make sure that for the spryker/company-role-gui module, the current version is equal to or later than 1.6.2.

## Stored XSS for business unit address on Yves and ZED

A user role name was vulnerable to the stored XSS.

**Changes:**
CompanyBusinessUnitGui module:
Adjusted CompanyBusinessUnitTable so it converts special characters to HTML entities for addresses.

**Affected modules:**
spryker/company-business-unit-gui ( 2.9.0 or earlier)

**How to get the fix:**
1. Update the modules:
```bash
composer update spryker/company-business-unit-gui
```
Make sure that for the spryker/company-business-unit-gui module, the current version is equal to or later than 2.9.1.
