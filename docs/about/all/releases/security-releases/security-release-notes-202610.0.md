---
title: Security release notes 202610.0
description: Security updates released for version 202610.0
last_updated: Oct 28, 2026
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

A session ID is the value stored in the session cookie that identifies a user to the application. Storefront, Back Office and Merchant Portal applications did not regenerate the session ID when a user logged in, including after completing the multi-factor authentication (MFA) step.

Because the session ID remained unchanged, the application was vulnerable to session fixation attacks. An attacker who could set a known session ID in a victim's browser before the victim logged in could gain authenticated access once the victim completed login. The attacker could then act on behalf of the victim without knowing their credentials.

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

2. Update the npm packages:

```bash
docker/sdk cli "npm update --workspaces"
```

{% info_block warningBox "Verification" %}

1. Make sure that all `@angular/*` packages are on version 22.2.3 and that each package is installed only once:

```bash
npm ls | grep -E '@angular/[a-z-]+@'
```

2. Make sure that the packages are hosted to the project root: the `node_modules/@angular/core` directory exists, and the following command returns `0`:

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

## Rate limiting protection for email change on the StoreFront

The StoreFront email-change function had no rate limit, which allowed an authenticated user to send unlimited confirmation emails to any address. Confirmation emails are now rate-limited per customer and per recipient address.

### Affected modules

- `spryker/customer`: < 7.88.0
- `spryker/customer-data-change-request`: < 1.4.0
- `spryker/redis`: < 2.15.0
- `spryker/security-blocker`: < 1.4.0
- `spryker-shop/customer-page`: < 2.88.1
- `spryker/storage-redis`: < 1.10.1

### Fix the vulnerability

When a customer changes their email address on the Storefront profile page, the application sends a verification email to the new address. After the update, the application limits email change requests per customer and per target email address. By default, a customer can request an email change up to 3 times within 15 minutes, and a target email address can receive up to 3 verification emails within 15 minutes, regardless of which customer requests them. When the limit is reached, the email address is not changed, no verification email is sent, and the customer sees an error message on the profile page.

1. Update the affected packages:

```bash
composer update spryker/customer:"^7.88.0" spryker/customer-data-change-request:"^1.4.0" spryker/redis:"^2.15.0" spryker/security-blocker:"^1.4.0" spryker-shop/customer-page:"^2.88.1" spryker/storage-redis:"^1.10.1"
```

2. Generate the transfers:

```bash
console transfer:generate
```

3. To show the error message when the limit is reached, add the following translations to `data/import/common/common/glossary.csv`:

```csv
customer.change_customer_email_limit_exceeded,"You reached the limit of email change requests. Please try again later.",en_US
customer.change_customer_email_limit_exceeded,"Sie haben das Limit für Anfragen zur Änderung der E-Mail-Adresse erreicht. Bitte versuchen Sie es später erneut.",de_DE
```

4. Import the glossary:

```bash
console data:import:glossary
```

5. Optional: To change the default limit, override the `EMAIL_CHANGE_REQUEST_LIMIT` and `EMAIL_CHANGE_REQUEST_LIMIT_TTL_SECONDS` constants on the project level. To disable the limit, set `EMAIL_CHANGE_REQUEST_LIMIT` to `0`.

**src/Pyz/Zed/CustomerDataChangeRequest/CustomerDataChangeRequestConfig.php**

```php
<?php

namespace Pyz\Zed\CustomerDataChangeRequest;

use Spryker\Zed\CustomerDataChangeRequest\CustomerDataChangeRequestConfig as SprykerCustomerDataChangeRequestConfig;

class CustomerDataChangeRequestConfig extends SprykerCustomerDataChangeRequestConfig
{
    protected const int EMAIL_CHANGE_REQUEST_LIMIT = 3;

    protected const int EMAIL_CHANGE_REQUEST_LIMIT_TTL_SECONDS = 900;
}
```

{% info_block warningBox "Verification" %}

1. On the Storefront, log in as a customer and go to the profile page.
2. Change the email address and save the form. Repeat 3 times. Make sure each submission sends a verification email to the new address.
3. Submit the form with a new email address for the 4th time within 15 minutes. Make sure an error message about the reached limit is displayed and no verification email is sent.

{% endinfo_block %}

## SQL injection in the content item list of the Back Office

When you add a content item to a CMS page or block in the Back Office, the CMS editor shows a list of available content items. The endpoint that returns this list did not escape a request parameter before using it in a database query. As a result, an authenticated Back Office user could run arbitrary SQL queries against the application database.

### Affected modules

- `spryker/content-gui`: < 3.2.2

### Fix the vulnerability

Update the affected package:

```bash
composer update spryker/content-gui:"^3.2.2"
```

{% info_block warningBox "Verification" %}

1. In the Back Office, open a CMS page or block for editing.
2. In the content editor, add a content item, for example a banner. Make sure the list of content items is displayed and you can select an item.

{% endinfo_block %}

## Company user takeover through the Add company user form

On the Storefront, a company administrator can add users to their company on the **Add company user** page. The form submission was not validated correctly, so a company administrator could overwrite a company user that belongs to another company. As a result, the affected user was moved to the attacker's company and lost access to their own company, and data linked to that user, such as shared carts and shopping lists, became available in the attacker's company.

### Affected modules

- `spryker/company-user`: < 2.25.0
- `spryker-shop/company-page`: < 2.39.0

### Fix the vulnerability

Update the affected packages:

```bash
composer update spryker/company-user:"^2.25.0" spryker-shop/company-page:"^2.39.0"
```

## Cross-merchant price disclosure in the Merchant Portal

In the Merchant Portal, the price tables on the abstract and concrete product edit pages load their data from separate endpoints. These endpoints did not check whether the requested product belongs to the merchant of the current user. As a result, an authenticated merchant user could read the prices of another merchant's products, including prices negotiated with specific business customers through merchant relations.

### Affected modules

- `spryker/product-merchant-portal-gui`: < 5.6.0

### Fix the vulnerability

Update the affected package:

```bash
composer update spryker/product-merchant-portal-gui:"^5.6.0"
```
