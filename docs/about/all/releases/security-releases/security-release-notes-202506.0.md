---
title: Security release notes 202506.0
description: Security updates released for version 202506.0
last_updated: Jun 20, 2025
template: concept-topic-template
redirect_from:
  - /docs/about/all/releases/security-release-notes-202506.0.html
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Improved password policy

The password policy enforced by our applications was improved to adhere to the latest NIST standards and guidelines. All password-related functionalities now consistently enforce these guidelines.


### Affected modules

* `spryker-shop/customer-page`: 1.0.0 - 2.56.0
* `spryker-shop/company-page`: 1.0.0 - 2.30.0
* `spryker/customer`: 1.0.0 - 7.64.0
* `spryker/customers-rest-api`: 1.0.0 - 1.22.0
* `spryker/security-gui`: 1.0.0 - 1.7.1
* `spryker/security-merchant-portal-gui`: 1.0.0 - 3.2.0
* `spryker/user`: 1.0.0 - 3.24.1
* `spryker/user-merchant-portal-gui`: 1.0.0 - 3.0.0

### Fix the vulnerability

1. Update the modules to the specified version or higher:


| MODULE | VERSION |
| - | - |
| `spryker-shop/customer-page`  | 2.58.0 |
| `spryker-shop/company-page`  | 2.31.0 |
| `spryker/customer`  | 7.65.0 |
| `spryker/customers-rest-api`  | 1.23.0 |
| `spryker/security-gui`  | 1.8.0 |
| `spryker/security-merchant-portal-gui`  | 3.3.0 |
| `spryker/user`  | 3.25.0 |
| `spryker/user-merchant-portal-gui`  | 3.1.0 |


```bash
composer update spryker-shop/customer-page spryker-shop/company-page spryker/customer spryker/customers-rest-api spryker/security-gui spryker/security-merchant-portal-gui spryker/user spryker/user-merchant-portal-gui
```

2. Update the glossary:

**data/import/common/common/glossary.csv**

```csv
global.password.invalid_password,"Your password must include at least one uppercase letter, one lowercase letter, one number, and one special character from the following list: !@#$%^&*()_-+=[]{}|;:<>.,/?\~. Non-Latin and other special characters are not allowed.",en_US
global.password.invalid_password,"Das Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen aus der folgenden Liste enthalten: !@#$%^&*()_-+=[]{}|;:<>.,/?\~. Nicht-lateinische und andere Sonderzeichen sind nicht erlaubt.",de_DE
```

3. Update `src/Pyz/Glue/CustomersRestApi/Validation/customers.validation.yaml`:

```bash
customers:
    post:
        password:
            - NotBlank
            - Length:
                  min: 12
                  max: 128
            - Regex:
                  pattern: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\_\-\=\+\[\]\{\}\|;:<>.,\/?\\~])[A-Za-z\d!@#$%^&*()\_\-\=\+\[\]\{\}\|;:<>.,\/?\\~]+$/'
            - NotCompromisedPassword
        confirmPassword:
            - NotBlank
            - Length:
                  min: 12
                  max: 128
    patch:
        password:
            - Optional:
                  constraints:
                      - Length:
                            min: 12
                            max: 128
                      - Regex:
                            pattern: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\_\-\=\+\[\]\{\}\|;:<>.,\/?\\~])[A-Za-z\d!@#$%^&*()\_\-\=\+\[\]\{\}\|;:<>.,\/?\\~]+$/'
                      - NotCompromisedPassword

        confirmPassword:
            - Optional:
                  constraints:
                      - Length:
                            min: 12
                            max: 128

customer-password:
    patch:
        password:
            - NotBlank
        newPassword:
            - NotBlank
            - Length:
                  min: 12
                  max: 128
            - Regex:
                  pattern: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\_\-\=\+\[\]\{\}\|;:<>.,\/?\\~])[A-Za-z\d!@#$%^&*()\_\-\=\+\[\]\{\}\|;:<>.,\/?\\~]+$/'
            - NotCompromisedPassword
        confirmPassword:
            - NotBlank
            - Length:
                  min: 12
                  max: 128

customer-restore-password:
    patch:
        password:
            - NotBlank
            - Length:
                  min: 12
                  max: 128
            - Regex:
                  pattern: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\_\-\=\+\[\]\{\}\|;:<>.,\/?\\~])[A-Za-z\d!@#$%^&*()\_\-\=\+\[\]\{\}\|;:<>.,\/?\\~]+$/'
            - NotCompromisedPassword
        confirmPassword:
            - NotBlank
            - Length:
                  min: 12
                  max: 128
```

4. Update `src/Pyz/Yves/CustomerPage/CustomerPageConfig.php`:

```bash
namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageConfig as SprykerCustomerPageConfig;

class CustomerPageConfig extends SprykerCustomerPageConfig
{
...

    /**
     * @uses \Pyz\Zed\Customer\CustomerConfig::MIN_LENGTH_CUSTOMER_PASSWORD
     *
     * @var int
     */
    protected const MIN_LENGTH_CUSTOMER_PASSWORD = 12;

    /**
     * @uses \Pyz\Zed\Customer\CustomerConfig::MAX_LENGTH_CUSTOMER_PASSWORD
     *
     * @var int
     */
    protected const MAX_LENGTH_CUSTOMER_PASSWORD = 128;

    /**
     * @var string
     */
    protected const PASSWORD_VALIDATION_PATTERN = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\_\-\=\+\[\]\{\}\|;:<>.,\/?\\~])[A-Za-z\d!@#$%^&*()\_\-\=\+\[\]\{\}\|;:<>.,\/?\\~]+$/';

    /**
     * @var string
     */
    protected const PASSWORD_VALIDATION_MESSAGE = 'global.password.invalid_password';
    
    /**
     * Specification:
     * - Returns the pattern for customer password validation.
     *
     * @api
     *
     * @return string
     */
    public function getCustomerPasswordPattern(): string
    {
        return static::PASSWORD_VALIDATION_PATTERN;
    }

    /**
     * Specification:
     * - Returns the message for customer password validation.
     *
     * @api
     *
     * @return string
     */
    public function getPasswordValidationMessage(): string
    {
        return static::PASSWORD_VALIDATION_MESSAGE;
    }
...
```

5. Update `src/Pyz/Zed/Customer/CustomerConfig.php`:

```bash
namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerConfig as SprykerCustomerConfig;

class CustomerConfig extends SprykerCustomerConfig
{
...
    /**
     * @var int
     */
    protected const MAX_LENGTH_CUSTOMER_PASSWORD = 128;
    
    /**
     * @var int
     */
    protected const MIN_LENGTH_CUSTOMER_PASSWORD = 12;
...
```


## Authorization Bypass on Cent Amount Parameter

Due to missing authorization controls, it was possible for a user with appropriate privileges to modify the cent amount of a role belonging to a different company.

### Affected modules

* `spryker-shop/company-page`: 1.0.0 - 2.34.0

### Fix the vulnerability

Update the `spryker-shop/company-page` package to version 2.35.0 or higher:

```bash
composer update spryker-shop/company-page # updpate package
composer show spryker-shop/company-page # verify the version
```


## Regular Expression Denial of Service (ReDoS) in cross-spawn

`cross-spawn` third-party dependency was vulnerable to Regular Expression Denial of Service (ReDoS) due to improper input sanitization. An attacker can increase the CPU usage and perform a Denial of Service attack by crafting a very large and well crafted string.

### Fix the vulnerability

Update the `cross-spawn` package to version 7.0.5 or higher:

```bash
npm update cross-spawn@7.0.5
```

In case there is no a `cross-spawn` dependency in your `package.json`file, add an override section into it:

```bash
"overrides": {
    "cross-spawn": "^7.0.5"
}
```











































