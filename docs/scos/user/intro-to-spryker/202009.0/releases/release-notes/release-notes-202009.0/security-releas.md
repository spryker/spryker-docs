---
title: Security release notes- 202009.0
originalLink: https://documentation.spryker.com/v6/docs/security-release-notes-2020090
redirect_from:
  - /v6/docs/security-release-notes-2020090
  - /v6/docs/en/security-release-notes-2020090
---

The following information pertains to security-related issues that have been recently resolved. Issues are listed by description and affected modules.
{% info_block warningBox "Note" %}

 If you need any additional support with this content, please contact  [support@spryker.com](mailto:support@spryker.com). If you found a new security vulnerability, please inform us via [security@spryker.com](mailto:security@spryker.com).

{% endinfo_block %}

## Response redirect validation doesn’t work for URL without protocol
The issue comes from the incomplete validation of the Domain Whitelist functionality in `Spryker\Yves\Kernel\Controller\AbstractController`. The whitelist configuration `KernelConstants::DOMAIN_WHITELIST` was not working for URLs without protocol, for example, `//php.net`, because an incorrect regular expression had been utilized. Therefore it was possible for customers to be redirected to any resource.

To fix that, we did the following:

* Adjusted `AbstractController::redirectResponseExternal()` to properly validate the URL domain. 
* Introduced `RedirectUrlValidationEventDispatcherPlugin` to validate if the redirect domain is allowed.

**Affected modules:**

* Kernel (3.50.0)

**How to get the fix:**

* Update the modules:
```bash
composer update spryker/kernel
```
* Add the newly introduced plugin `RedirectUrlValidationEventDispatcherPlugin` into the `EventDispatcherDependencyProvider::getEventDispatcherPlugins()` stack of plugins on a project level.


## CSRF token was ignored in the login form 
After submitting the login form, CSRF token was ignored and not checked.

To fix the issue, we adjusted `SecurityApplicationPlugin` to get the correct `CsrfManager` service from the container.

**Affected modules:**

* Security  (1.2.0) 

**How to get the fix:**

* Update the modules:
```bash
composer update spryker/security 
```
## Add to Cart action and other forms for cart manipulation had no CSRF protection
CSRF validation for Symfony forms used in the cart-related actions was missing. Thus, it was possible to update and manipulate the user's cart externally by tricking the user into visiting an attacker website while browsing the Spryker shop.

In the release, we have fixed this behavior. To make it possible, `AddItemsFormWidget` has been introduced to render a Symfony form with CSRF protection for addItems action. Also, several `CartController` actions were adjusted, so they now check for a valid CSRF token. To properly render Symfony forms instead of plain HTML, we modified `cart-item.twig` and other TWIG templates.

For the `CustomerReorderWidget` module, several similar improvements have been made. Such as introducing `CustomerReorderFormWidget` and adjusting `OrderController::reorderAction()` along with `OrderController:: reorderItemsAction()` to render Symfony form with CSRF protection.

These templates were adjusted to incorporate the new  `AddItemsFormWidget` and `AddToCartFormWidget`: `cart-discount-promotion-products-list.twig`, `product-configurator.twig`, `product-set-cms-content.twig`, `product-set-details.twig` and `product-set.twig`.


**Affected modules:**

* CartPage  (3.17.0)
* CustomerPage  (2.17.0)
* CustomerReorderWidget (6.8.0)
* DiscountPromotionWidget (3.2.0)
* ProductDetailPage (3.7.0)
* ProductSetWidget (1.6.0)

 
**How to get the fix:**

* Update the modules:

```bash
composer update spryker-shop/cart-page spryker-shop/customer-page spryker-shop/customer-reorder-widget spryker-shop/discount-promotion-widget spryker-shop/product-detail-page spryker-shop/product-set-widget
```

* Register the following widgets in `ShopApplicationDependencyProvider::getGlobalWidgets`:

    * `AddToCartFormWidget::class`
    * `AddItemsFormWidget::class`
    * `CartChangeQuantityFormWidget::class`
    * `CustomerReorderFormWidget::class`
    * `CustomerReorderItemsFormWidget::class`

* Add the translation for `form.csrf.error.text` into `glossary.csv`.

## Fraud risk in EasyCredit payment method of Heidelpay ECO module
The issue was revealed after EasyCredit notified us about a vulnerability discovered by one of our customers. To have the EasyCredit method available in checkout, the delivery country has to be whitelisted (by default, it’s Germany), and the shipping address must be the same as the billing address. There is no fraud validation of this case on the PSP side.

To solve this problem, the following has been done:

* Adjusted `HeidelpayFacade::filterPaymentMethods()` to filter out `EasyCredit` method if the billing address is not the same as the shipping address.
* Impacted `HeidelpayPaymentMethodFilterPlugin` with facade changes.
* Introduced `HEIDELPAY:CONFIG_HEIDELPAY_EASYCREDIT_CRITERIA_COUNTRY_ISO_CODES` environment configuration to set allowed counties for `EasyCredit` payment method.


**Affected modules:**

* Heidelpay  (2.4.0) 

**How to get the fix:**

* Update the modules:
```bash
composer update spryker-eco/heidelpay
```

## CSRF validation in forms
After revealing and fixing several occurrences of the missing CSRF validations, a big audit through the whole Spryker code had been performed. And as part of this audit, all POST forms were adjusted to be equipped with proper CSRF validation. Controllers in around 30+ modules were adjusted as well as molecules and views in spryker-shop widgets.

**Affected modules:**

* Acl (3.7.0)
* BusinessOnBehalfGui (1.2.0)
* CMS (7.9.0)
* CmsBlockGui (2.5.0)
* CmsGui (5.7.0)
* CmsSlotGui (1.1.0)
* CompanyBusinessUnitGui (2.7.0)
* CompanyGui (1.4.0)
* CompanyRoleGui (1.5.0)
* CompanyUserGui (1.5.0)
* ConfigurableBundleGui (1.1.0)
* Discount (9.9.0)
* FileManagerGui (1.2.0)
* Gui (3.33.0)
* MerchantGui (3.2.0)
* MerchantRelationshipGui (1.6.0)
* NavigationGui (2.7.0)
* ProductListGui (2.1.0)
* ProductOption (8.8.0)
* ProductPackagingUnitGui (1.1.10)
* ProductReviewGui (1.2.0)
* ProductSearch (5.11.0)
* ProductSetGui (2.4.0)
* Tax (5.9.0)
* User (3.11.0)
* Shop.CartCodeWidget (1.4.0)
* Shop.CartPage (3.20.0)
* Shop.CompanyPage (2.13.0)
* Shop.ConfigurableBundlePage (1.2.0)
* Shop.ConfigurableBundleWidget (1.5.0)
* Shop.CustomerPage (2.24.0)
* Shop.DiscountWidget (1.6.0)
* Shop.GiftCardWidget (1.2.0)
* Shop.MerchantSwitcherWidget (0.4.1)
* Shop.MultiCartPage (2.4.0)
* Shop.MultiCartWidget (1.6.0)
* Shop.ProductAlternativeWidget (1.3.0)
* Shop.SharedCartPage (2.4.0)
* Shop.SharedCartWidget (1.7.0)
* Shop.ShopUi (1.42.0)
* Shop.ShoppingListPage (1.3.0)
* Shop.WishlistPage (1.8.0)
* Shop.WishlistWidget (1.2.0)

**How to get the fix:**

* Update the modules: 

```bash
composer update spryker/acl spryker/business-on-behalf-gui spryker/cms spryker/cms-block-gui spryker/cms-gui spryker/cms-slot-gui spryker/company-business-unit-gui spryker/company-gui spryker/company-role-gui spryker/company-user-gui spryker/configurable-bundle-gui spryker/configurable-bundle-gui spryker/discount spryker/file-manager-gui spryker/gui spryker/merchant-gui spryker/merchant-relationship-gui spryker/navigation-gui spryker/product-list-gui spryker/product-option spryker/product-packaging-unit-gui spryker/product-review-gui spryker/product-search spryker/product-set-gui spryker/tax spryker/user spryker-shop/cart-code-widget spryker-shop/cart-page spryker-shop/company-page spryker-shop/configurable-bundle-page spryker-shop/configurable-bundle-page spryker-shop/configurable-bundle-widget spryker-shop/customer-page spryker-shop/discount-widget spryker-shop/gift-card-widget spryker-shop/merchant-switcher-widget spryker-shop/multi-cart-page spryker-shop/product-alternative-widget spryker-shop/shared-cart-page spryker-shop/shared-cart-widget spryker-shop/shop-ui spryker-shop/shopping-list-page spryker-shop/wishlist-page spryker-shop/wishlist-widget
```

## Vulnerabilities in 3rd-party dependencies
### jQuery: Passing HTML from untrusted sources
Passing an HTML code containing `<option>` elements from untrusted sources, even after sanitizing them, to one of the jQuery's DOM manipulation methods (i.e. `.html()`, `.append()`, and others) may execute untrusted code in browser.

This problem is patched in jQuery 3.5.0.

To work around this issue without upgrading, use DOMPurify with its `SAFE_FOR_JQUERY` option to sanitize the HTML string before passing it to a jQuery method.

**Affected modules:**

* Gui (3.34.1)

**How to get the fix:**

* Update the modules:
```bash
composer update spryker/gui
```
### acorn NPM library vulnerable to Regular Expression Denial of Service
Affected versions of acorn are vulnerable to Regular Expression Denial of Service.
A regex in the form of `/[x-\ud800]/u` causes the parser to enter an infinite loop.
The string is not valid UTF16, which usually results in it being sanitized before reaching the parser.
If an application processes untrusted input and passes it directly to acorn,
attackers may leverage the vulnerability leading to Denial of Service.
 
**Affected modules:**

* Chart (1.3.1)

**How to get the fix:**

* Update the modules:
```bash
composer update spryker/chart
```

