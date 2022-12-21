---
title: Security release notes 202212.0
description: Security release notes for the Spryker Product release 
last_updated: Aug 27, 2021
template: concept-topic-template
---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

{% info_block infoBox "Note" %}

If you need any additional support with this content, please contact [support@spryker.com](mailto:support@spryker.com). If you found a new security vulnerability, please inform us via [security@spryker.com](mailto:security@spryker.com).

{% endinfo_block %}

## CmsGui:5.6.0 added XSS sanitizing options without adding spryker/form dependency

CmsGui version [5.6.0](https://github.com/spryker/cms-gui/releases/tag/5.6.0) added XSS sanitizing options, which fails if these options were not extended by `SanitizeXssTypeExtensionFormPlugin`.

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
- spryker/form(1.0.0)
2. Update the modules if the versions are less than those mentioned above with the command like `composer update spryker/cms-gui`.
3. Add `Spryker\Zed\Gui\Communication\Plugin\Form\SanitizeXssTypeExtensionFormPlugin` to `\Pyz\Zed\Form\FormDependencyProvider::getFormPlugins()` on the project level.

## Twig - twig might load a template outside of a configured directory when using the filesystem loader 
There was a vulnerability in PHP package twig/twig. When using the filesystem loader to load templates for which the name is user input, it was possible to use the source or include a statement to read arbitrary files from outside of the templates directory.

**Changes:**
Twig module
Increased the `twig/twig` dependency version to ensure a security issue on the filesystem loader is resolved.


**Affected modules:**
spryker/twig (3.17.0 or less)

**How to get the fix:**
Update the module: `composer update spryker/twig`
Make sure that the current version of the `spryker/twig` twig module is equal to or later than3.17.1.

## Missing validation of the wishlist name on adding an item

Due to the way the characters are handled, it was possible to abuse the name in a way that the constructed URL links to another resource of the shop instead of the wishlist.

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
1. Update the module: `composer update spryker/wishlist`
2. If Yves is used, also update the WishlistPage module: `composer update spryker/wishlist-page`
3. Make sure that for these modules the current version is equal to or later than:
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
The default Zed tokens could be empty if it not set during installation. 

**Changes:**
We've removed the default value `SPRYKER_ZED_REQUEST_TOKEN`. The value has to be set or the fallback value must be properly handled with an exception.

**Affected modules:**
No changes.

**How to get the fix:**
Remove in the related config files like  config/Shared/config_default.php the default value for default value SPRYKER_ZED_REQUEST_TOKEN.

## Leakage of table names and parameters when inserting long strings in the file directory name
When creating a new directory within the file tree (*Content > File Tree*) it is possible to
include very long strings (in the name).

Changes:
Module FileManagerGui

Adjusted AddDirectoryController::indexAction() to add validation for the maximum length of the file directory name.

Affected modules:
spryker/file-manager-gui (2.1.0 or less)

How to get the fix: 
Update the modules: composer update spryker/file-manager-gui
Validate that current version is equal or upper for this module:
 spryker/file-manager-gui (2.2.0) 




