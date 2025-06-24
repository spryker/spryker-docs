---
title: Security release notes 202403.0
description: Security release notes for 202403.0
last_updated: Mar 26, 2024
template: concept-topic-template
redirect_from:
  - /docs/about/all/releases/security-release-notes-202403.0.html
---

The following information pertains to security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Privilege escalation through the "adding users to companies" function

Because of an access controls vulnerability in the "adding users to companies" function, it was possible for attackers with access to the vulnerable functionality of a company to create admin users to another company.

### Affected modules

`spryker-shop/company-page`: 1.0.0 - 2.24.0

### Fix the vulnerability

Upgrade the `spryker-shop/company-page` module to version 2.25.0 or higher:

```bash
composer update spryker-shop/company-page
composer show spryker-shop/company-page # Verify the version
```

## User enumeration using response content

When changing the email address, based on the application's response to a provided email, it was possible to identify whether an account with the provided email existed in the system. This information could be leveraged for attacks like phishing campaigns and password brute forcing.

### Affected modules

`spryker/user-merchant-portal-gui`: 1.0.0 - 2.5.0

### Fix the vulnerability

1. Upgrade the `spryker/user-merchant-portal-gui` module to version 2.6.0:

```bash
composer require spryker/user-merchant-portal-gui:"~2.6.0"
composer show spryker/user-merchant-portal-gui # Verify the version
```

2. Create or update `src/Pyz/Zed/UserMerchantPortalGui/UserMerchantPortalGuiConfig.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\UserMerchantPortalGui;

use Spryker\Zed\UserMerchantPortalGui\UserMerchantPortalGuiConfig as SprykerUserMerchantPortalGuiConfig;

class UserMerchantPortalGuiConfig extends SprykerUserMerchantPortalGuiConfig
{
    /**
     * @var bool
     */
    protected const IS_SECURITY_BLOCKER_FOR_MERCHANT_USER_EMAIL_CHANGING_ENABLED = true;
}
```

## Reauthentication missing from change email functionality

Merchant users were able to change the email of their account without authentication. Requiring reauthentication for sensitive functionalities is an additional protection against attacks targeting the modification of users' details. These functionalities could be targeted remotely in combination with cross-site request forgery (CSRF) or clickjacking vulnerabilities.

### Affected modules

`spryker/user-merchant-portal-gui`: 1.0.0 - 2.4.0

### Introduced changes

Reauthentication was added as an additional protection against attacks targeting the functionality of changing a user's email.

### Fix the vulnerability

1. Upgrade the `spryker/user-merchant-portal-gui` module to version 2.5.0:

```bash
composer require spryker/user-merchant-portal-gui:"~2.5.0"
composer show spryker/user-merchant-portal-gui # Verify the version
```

2. Create or update `src/Pyz/Zed/UserMerchantPortalGui/UserMerchantPortalGuiConfig.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\UserMerchantPortalGui;

use Spryker\Zed\UserMerchantPortalGui\UserMerchantPortalGuiConfig as SprykerUserMerchantPortalGuiConfig;

class UserMerchantPortalGuiConfig extends SprykerUserMerchantPortalGuiConfig
{
    /**
     * @var bool
     */
    protected const IS_EMAIL_UPDATE_PASSWORD_VERIFICATION_ENABLED = true;
}
```

3. Rebuild the Merchant Portal frontend:

```bash
console frontend:mp:build.
```

4. Rebuild the cache for the Merchant Portal router:

```bash
console router:cache:warm-up:merchant-portal
```

5. Clear cache:

```bash
console cache:empty-all
```

## SameSite attribute added to Storefront and Backoffice cookies

SameSite prevents the browser from sending the cookie along with cross-site requests. This mitigates the risk of cross-origin information leakage. It also provides protection against cross-site request forgery attacks.

### Introduced changes

The SameSite attribute was added to the cookies of the Storefront and Backoffice applications.

### Fix the vulnerability

Add the following configuration on the project level:

```text
$config[SessionConstants::YVES_SESSION_COOKIE_SAMESITE] = getenv('SPRYKER_YVES_SESSION_COOKIE_SAMESITE') ?: Cookie::SAMESITE_LAX;
$config[SessionConstants::ZED_SESSION_COOKIE_SAMESITE] = getenv('SPRYKER_ZED_SESSION_COOKIE_SAMESITE') ?: Cookie::SAMESITE_STRICT;
```

{% info_block infoBox "Payment provider redirects" %}

If an integrated payment provider needs to perform `POST` redirect requests, the configuration for Storefront should be as follows:

```text
$config[SessionConstants::YVES_SESSION_COOKIE_SAMESITE] = getenv('SPRYKER_YVES_SESSION_COOKIE_SAMESITE') ?: Cookie::SAMESITE_STRICT;
```

{% endinfo_block %}
