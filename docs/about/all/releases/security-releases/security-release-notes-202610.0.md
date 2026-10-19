---
title: Security release notes 202610.0
description: Security updates released for version 202610.0
last_updated: Oct 19, 2026
template: concept-topic-template
publish_date: "2026-10-13"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Stripe payment page can be accessed by unauthenticated users

Due to missing access controls, the Stripe payment page could be accessed by unauthenticated users. This could lead to the exposure of sensitive information, including customers' names, phone numbers, and addresses. Also, a visitor who was not logged in could cancel any order through the payment cancel page. Exploiting either issue requires knowledge of the randomly generated order reference.

### Affected modules

- `spryker-shop/payment-page`: < 1.9.0
- `spryker-eco/stripe`: < 1.1.0

### Fix the vulnerability

After the fix, only the following visitors can open the Stripe payment page:

- A logged-in customer who owns the order.
- A guest whose current session placed the order.
- A visitor who returns from Stripe with the `payment_intent_client_secret` query parameter of the order's PaymentIntent.

A visitor who is not logged in and does not meet these conditions is redirected to the login page. A logged-in customer who does not own the order is redirected to the home page. Also, a visitor who is not logged in can cancel an order on the payment cancel page only when the current session placed the order.

1. Update the affected packages:

```bash
composer update spryker-eco/stripe:"^1.1.0" spryker-shop/payment-page:"^1.9.0"
composer show spryker-eco/stripe spryker-shop/payment-page # Verify the versions
```

2. The update adds the `StripePaymentDetailsRequest` transfer and the `/stripe/gateway/get-payment-details-by-request` backend gateway route. Generate the transfers and rebuild the backend gateway route cache. Without the rebuilt route cache, the payment page fails with a 404 error from the backend gateway.

```bash
console transfer:generate
console router:cache:warm-up:backend-gateway
```

3. To return customers to the payment page after they log in, make sure `RedirectUriCustomerRedirectStrategyPlugin` is registered. If your project uses `LastVisitedPageCustomerRedirectStrategyPlugin`, register `RedirectUriCustomerRedirectStrategyPlugin` before it.

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\CustomerPage\Plugin\CustomerPage\RedirectUriCustomerRedirectStrategyPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CustomerRedirectStrategyPluginInterface>
     */
    protected function getAfterLoginCustomerRedirectPlugins(): array
    {
        return [
            new RedirectUriCustomerRedirectStrategyPlugin(),
        ];
    }
}
```

4. If your project overrides `SprykerEco\Yves\Stripe\Controller\PaymentController` or `SprykerShop\Yves\PaymentPage\Controller\PaymentCancelController`, apply the same access checks to your overrides.

5. If your project calls `StripeFacade::getPaymentDetails()` or `StripeClient::getPaymentDetails()`, replace the calls with `getPaymentDetailsByRequest()`. The old methods are deprecated and now return an unsuccessful response unless the passed customer reference belongs to the order owner.

{% info_block warningBox "Verification" %}

1. Place an order with Stripe as a logged-in customer.
2. In a private browser window, open `/stripe/payment?orderReference={order_reference}`. Make sure you are redirected to the login page and the URL contains the `redirectUri` parameter.
3. Log in as the customer who placed the order. Make sure you are redirected to the payment page.
4. Log in as a different customer and open the same URL. Make sure you are redirected to the home page.

{% endinfo_block %}

## Session fixation on login

A session ID is the value stored in the session cookie that identifies a visitor's browser to the application. On the Storefront, Back Office, and Merchant Portal, the application kept the same session ID before and after a user logged in, including after the multi-factor authentication (MFA) step.

Because the session ID did not change, an attacker could use a session fixation attack: if the attacker planted a known session ID in a victim's browser before the victim logged in, the attacker's session became authenticated as soon as the victim logged in. The attacker could then act as the victim without knowing their credentials.

### Affected modules

- `spryker/multi-factor-auth`: < 2.10.0
- `spryker/multi-factor-auth-merchant-portal`: < 2.5.0
- `spryker/security`: < 1.12.0
- `spryker-shop/session-agent-validation`: < 1.3.0

### Fix the vulnerability

After the fix, the application generates a new session ID when a user logs in, so a session ID issued before login cannot be used to access the authenticated session.

Update the affected packages:

```bash
composer update spryker/multi-factor-auth:"^2.10.0" spryker/multi-factor-auth-merchant-portal:"^2.5.0" spryker/security:"^1.12.0" spryker-shop/session-agent-validation:"^1.3.0"
```

{% info_block warningBox "Verification" %}

1. On the Storefront, open the login page and, in your browser's developer tools, note the value of the session cookie.
2. Log in. If MFA is enabled, complete the MFA step.
3. Make sure the value of the session cookie differs from the value you noted before login.
4. Repeat the steps in the Back Office and Merchant Portal.

{% endinfo_block %}

## Vulnerability in the @angular/router package of the Merchant Portal

The Merchant Portal frontend is built with Angular. The `@angular/router` package, which handles navigation between Merchant Portal pages, has a known security vulnerability in versions 22.0.0 to 22.1.x. This issue affects only projects that use the Merchant Portal.

### Affected packages

- `@angular/router`: >= 22.0.0 < 22.2.0

### Check if your project is affected

To check if your project uses a vulnerable version of `@angular/router`, run an npm audit:

```bash
docker/sdk cli "npm audit"
```

If the output reports `@angular/router`, apply the fix.

### Fix the vulnerability

To fix the vulnerability, update the Spryker packages that define the Angular dependencies of the Merchant Portal, and then update all `@angular/*` packages to 22.2.3. All `@angular/*` packages must have the same version to work together.

1. Update the Spryker packages:

```bash
composer update spryker/falcon-ui:"^0.1.5" spryker-shop/date-time-configurator-page-example:"^0.7.5" spryker/zed-ui:"^4.5.1"
```

2. In the lockfile, resolve all `@angular/*` packages to 22.2.3. Run the command from the project root, not with the `-w mp-zed-ui` workspace option:

```bash
docker/sdk cli "npm install --package-lock-only \
  @angular/animations@22.2.3 @angular/cdk@22.2.3 @angular/common@22.2.3 \
  @angular/compiler@22.2.3 @angular/core@22.2.3 @angular/elements@22.2.3 \
  @angular/forms@22.2.3 @angular/platform-browser@22.2.3 \
  @angular/platform-browser-dynamic@22.2.3 @angular/router@22.2.3 \
  @angular/cli@22.2.3 @angular/compiler-cli@22.2.3 @angular/language-service@22.2.3"
```

3. The previous command adds the `@angular/*` packages to the root `package.json`. Restore the original `package.json`:

```bash
git checkout package.json
```

4. Sync the lockfile with the restored `package.json`. npm keeps version 22.2.3 because it satisfies the version range defined by `spryker/zed-ui`:

```bash
docker/sdk cli "npm install --package-lock-only"
```

5. Install `node_modules` from the lockfile:

```bash
docker/sdk cli "npm ci"
```

{% info_block warningBox "Verification" %}

1. Make sure that all `@angular/*` packages are on version 22.2.3 and that each package is installed only once:

```bash
npm ls | grep -E '@angular/[a-z-]+@'
```

2. Make sure that the packages are hoisted to the project root: the `node_modules/@angular/core` directory exists, and the following command returns `0`:

```bash
grep -c 'zed-ui/node_modules/@angular/' package-lock.json
```

3. Make sure that the audit no longer reports `@angular/router`:

```bash
docker/sdk cli "npm audit | grep -A3 '@angular/router'"
```

4. Build the Merchant Portal and make sure the build succeeds:

```bash
docker/sdk cli "npm run mp:build"
```

{% endinfo_block %}
