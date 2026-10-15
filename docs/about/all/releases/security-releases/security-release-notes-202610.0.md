---
title: Security release notes 202610.0
description: Security updates released for version 202610.0
last_updated: Oct 15, 2026
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