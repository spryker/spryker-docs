---
title: Security release notes 202603.0
description: Security updates released for version 202603.0
last_updated: Mar 23, 2026
template: concept-topic-template
publish_date: "2026-03-23"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).


## Information disclosure via phpinfo() method

Instances of phpinfo() were identified in the codebase, which could potentially expose sensitive configuration details and environment variables to unauthorized parties. Such an instance was found to be part of the default Back Office setup.

### Affected modules

- `spryker/setup`: < 4.8.0
- `spryker/maintenance`: < 3.6.0

### Fix the vulnerability

Update the `spryker/setup` package to version 4.8.0 or higher:

```bash
composer update spryker/setup:"^4.8.0"
composer show spryker/setup # Verify the version
```

Update the `spryker/maintenance` package to version 4.0.0 or higher:

```bash
composer update spryker/setup:"^4.0.0"
composer show spryker/setup # Verify the version
```

## Data storage inconsistency

A data storage inconsistency was identified where certain sensitive data was being written to an additional database table beyond its intended storage location. Although the data was properly encrypted at rest and no exposure occurred, retaining sensitive information in non-designated tables does not align with the principle of data minimization and security best practices.

### Affected modules

`spryker/quote-request`: < 2.8.0

### Fix the vulnerability

Update the `spryker/quote-request` package to version 2.8.0 or higher

Extend the `src/Pyz/QuoteRequest/src/Pyz/Zed/QuoteRequest/QuoteRequestConfig.php` file as described below:

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
            QuoteTransfer::CUSTOMER, // <-- should be removed from the list.
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

In case `src/SprykerShop/ProductComparisonPage/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/comparison-link/comparison-link.ts` was not extended on the project level, no actions is required.

In case `src/SprykerShop/ProductComparisonPage/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/comparison-link/comparison-link.ts` was extended on the project level, replace the `get url` method with the below:

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
