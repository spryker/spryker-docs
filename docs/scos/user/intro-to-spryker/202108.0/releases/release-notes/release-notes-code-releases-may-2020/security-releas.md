---
title: Security Release Notes- Code Releases May, 2020
originalLink: https://documentation.spryker.com/2021080/docs/security-release-notes-code-releases-may-2020
redirect_from:
  - /2021080/docs/security-release-notes-code-releases-may-2020
  - /2021080/docs/en/security-release-notes-code-releases-may-2020
---

The following information pertains to security-related issues that have been recently resolved. Issues are listed by description and affected modules.

 {% info_block warningBox "Note" %}

If you need any additional support with this content, please contact support@spryker.com. If you found a new security vulnerability, please inform us via security@spryker.com.

{% endinfo_block %}

## CSRF vulnerabilities
Starting from PHP 7.3, the session cookie supports the [SameSite attribute](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite){target="_blank"}, which decreases the attack surface. `symfony/http-foundation` supports the attribute since version 3.4.28, having it empty by default but configurable. Since versions 4.2.0, 4.3.0, and 4.4.0, the attribute is set to `lax` by default. We recommend updating and activating the feature accordingly.

## CSRF protection in cart manipulation forms
Previously, without CSRF protection, it was possible to manipulate carts externally. To prevent this possibility, we’ve set a CSRF token to be generated for each cart-related operation.

Affected modules:

* CartPage (3.17.0)
* CustomerPage (2.17.0)
* CustomerReorderWidget (6.8.0)
* DiscountPromotionWidget (3.2.0)
* ProductDetailPage (3.7.0)
* ProductSetWidget (1.6.0)


Implementation instructions:
1. Update the modules: 
```bash
composer update spryker-shop/cart-page spryker-shop/customer-page spryker-shop/customer-reorder-widget spryker-shop/discount-promotion-widget spryker-shop/product-detail-page spryker-shop/product-set-widget
```
2. Add the following global widgets to `ShopApplicationDependencyProvider::getGlobalWidgets()` on the project level:
* `AddToCartFormWidget::class`
* `AddItemsFormWidget::class`
* `CartChangeQuantityFormWidget::class`
* `CustomerReorderFormWidget::class`
* `CustomerReorderItemsFormWidget::class`

3. Adjust project-level templates for the cart-related operations, if you have any. Check the changes in core templates as an example.

## CSRF protection in the login form
Previously, the login form was vulnerable to [Login CSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Forging_login_requests){target="_blank"}. To avoid this vulnerability, we’ve set a CSRF token to be generated for every login form.

Affected modules:
* Security (1.2.0)
* CustomerPage (2.18.0)
* AgentPage (1.6.0)

To implement the changes, update the modules:
```bash
composer update spryker/security spryker-shop/agent-page spryker-shop/customer-page
```
## CSRF protection for account deletion
To prevent CSRF attacks, we’ve set account deletion to be done only on POST requests with a CSRF token.

Affected modules:

* Customer (7.27.0)

To implement the changes, update the modules: 
```bash
composer require spryker/customer:"^7.27.0" --update-with-dependencies
```

## Vulnerabilities in Symfony components
We’ve updated Symfony components to get the security fixes.

Affected modules:
* Symfony (3.3.8)

To implement the changes, update the modules: 
```bash
composer require spryker/symfony:"^3.3.8" --update-with-dependencies
```
## Validation for the log file name of Zed request Repeater 
The Log file name of the Repeater is now validated by regex and does not allow forbidden symbols.

Affected modules:
* ZedRequest (3.14.0)

To implement the changes, update the modules:
 ```bash
 composer require spryker/zed-request:"^3.14.0" --update-with-dependencies
 ```

P.S. Thanks for reading, stay safe.

