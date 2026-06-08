---
title: Security release notes 202603.0
description: Security updates released for version 202603.0
last_updated: May 18, 2026
template: concept-topic-template
publish_date: "2026-03-23"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Data storage inconsistency

A data storage inconsistency was identified where certain sensitive data was being written to an additional database table beyond its intended storage location. Although the data was properly encrypted at rest and no exposure occurred, retaining sensitive information in non-designated tables does not align with the principle of data minimization and security best practices.

### Affected modules

`spryker/quote-request`: < 2.8.0

### Fix the vulnerability

Update the `spryker/quote-request` package to version 2.8.0 or higher

Extend the `src/Pyz/Zed/QuoteRequest/QuoteRequestConfig.php` file as described below:

Remove the customer field from the `getQuoteFieldsAllowedForSaving` function

```bash
    /**
     * @return array<string>
     * @return array<int|string, string|array<int|string, mixed>>
     */
    public function getQuoteFieldsAllowedForSaving(): array
    {
        return array_merge(parent::getQuoteFieldsAllowedForSaving(), [
            ...
            QuoteTransfer::CUSTOMER, // <-- should be removed from the list, since it contains hashed passwords.
            ...
        ]);
    }
```

In case there is a need to save additional fields to quote request, extend it only with required subfields as shown in the example below:

```bash
    /**
     * @return array<string>
     * @return array<int|string, string|array<int|string, mixed>>
     */
    public function getQuoteFieldsAllowedForSaving(): array
    {
        return array_merge(parent::getQuoteFieldsAllowedForSaving(), [
            ...
            QuoteTransfer::CUSTOMER => [ // provide only required sub-fields for saving
                CustomerTransfer::ID_CUSTOMER,
                CustomerTransfer::CUSTOMER_REFERENCE,
                CustomerTransfer::COMPANY_USER_TRANSFER => [
                    CompanyUserTransfer::ID_COMPANY_USER,
                    CompanyUserTransfer::COMPANY,
                    CompanyUserTransfer::COMPANY_BUSINESS_UNIT => [
                        CompanyBusinessUnitTransfer::NAME,
                    ],
                ],
            ],
            ...
        ]);
    }
```

## Open redirect vulnerability

An open redirect vulnerability was identified that could potentially be leveraged in social engineering attacks by redirecting users to untrusted external domains.

### Affected modules

`spryker-shop/product-comparison-page`: < 1.0.1

### Fix the vulnerability

Update the `spryker-shop/product-comparison-page` package to version 1.0.1 or higher

Update the `comparison-link` molecule if needed, based on the below:

In case `vendor/spryker-shop/product-comparison-page/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/comparison-link/comparison-link.ts` was not extended on the project level, no actions is required.

In case `vendor/spryker-shop/product-comparison-page/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/comparison-link/comparison-link.ts` was extended on the project level, replace the `get url` method with the below:

```bash
get url(): string {
    const url = this.getAttribute('url') ?? '';
    try {
        const { pathname, search, hash } = new URL(url, window.location.origin);
        return (pathname + search + hash).replace(/\/\//g, '/');
    } catch (error) {
        return '/';
    }
}
```

## DOM-based cross-site scripting (XSS) in Back Office JavaScript modules

Several Back Office JavaScript modules passed untrusted, unsanitized data directly into jQuery execution sinks, such as the `$()` constructor, `.append()`, `.html()`, or sensitive attributes like `href`. If the data contained malicious HTML or JavaScript, jQuery's internal engine evaluated and executed it, leading to DOM-based cross-site scripting (XSS).

### Affected modules

- `spryker/cms`: < 7.20.2
- `spryker/cms-slot-block-gui`: < 1.6.2
- `spryker/company-role-gui`: < 1.11.2
- `spryker/content-gui`: < 3.1.2
- `spryker/file-manager-gui`: < 3.1.2
- `spryker/gui`: < 5.3.2

### Fix the vulnerability

Update the affected packages to the fixed versions:

```bash
composer update spryker/cms spryker/cms-slot-block-gui spryker/company-role-gui spryker/content-gui spryker/file-manager-gui spryker/gui
```

Verify the installed versions:

```bash
composer show spryker/cms spryker/cms-slot-block-gui spryker/company-role-gui spryker/content-gui spryker/file-manager-gui spryker/gui
```

If you extended any of the affected JavaScript modules on the project level, never pass untrusted user input directly into the jQuery `$()` constructor or DOM manipulation methods. Use secure alternatives such as `.text()` or the native `textContent` property to render text. If you must render dynamic HTML, sanitize the input first with [DOMPurify](https://www.npmjs.com/package/dompurify).

1. Install the `dompurify` package:

```bash
npm install dompurify
```

2. Import `DOMPurify` and sanitize the untrusted data before passing it into a jQuery sink:

```js
import DOMPurify from 'dompurify';

// Before
$(container).html(untrustedData);

// After
$(container).html(DOMPurify.sanitize(untrustedData));
```
