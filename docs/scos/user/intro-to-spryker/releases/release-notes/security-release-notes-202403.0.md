---
title: Security release notes 202403.0
description: Security release notes for 202403.0
last_updated: Mar 26, 2024
template: concept-topic-template
---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

If you need any additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, inform us through [security@spryker.com](mailto:security@spryker.com).

## Privilege Escalation via 'Adding Users to Companies' Function

Due to an access controls vulnerability in the `adding users to companies` function, it was possible for attackers with access to the vulnerable functionality of a company to create Admin users to another company. This could result in targeting the other company after having granted themselves with elevated privileges.

### Affected modules

* `spryker-shop/company-page`: 1.0.0 - 2.24.0

### How to get the fix

To implement the fix for this vulnerability, update the `spryker-shop/company-page` module as follows:

Upgrade the `spryker-shop/company-page` module to version to 2.25.0:

```bash
composer update spryker-shop/company-page
composer show spryker-shop/company-page # Verify the version
```

## User Enumeration via Response Content

A user enumeration vulnerability was affecting the change email functionality due to different responses by the application when the provided email existed in the database. A potential attacker can leverage this vulnerability in order to determine valid user accounts which could then be used for other attacks, such as phishing campaigns and password brute-forcing.

### Affected modules

* `spryker/user-merchant-portal-gui`: 1.0.0 - 2.5.0

### How to get the fix

To implement the fix for this vulnerability, update the `UserMerchantPortalGui` module as follows:

1. Upgrade the `spryker/user-merchant-portal-gui` module to version to 2.6.0:

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

## Re-authentication missing from change email functionality

Merchant users of the application were able to change the email of their account without confirmation that they are the legitimate users. Requiring re-authentication for sensitive functionalities is considered an additional protection against attacks targeting the modification of users' emails. These functionalities could be targeted remotely in combination with cross-site request forgery (CSRF) or clickjacking vulnerabilities.

### Affected modules

* `spryker/user-merchant-portal-gui`: 1.0.0 - 2.4.0

### Introduced changes

Re-authentication was added as an additional protection against attacks targeting the functionality of changing a user's email. 

### How to get the fix

To implement the fix for this vulnerability, update the `UserMerchantPortalGui` module as follows:

1. Upgrade the `spryker/user-merchant-portal-gui` module to version to 2.5.0:

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

3. Rebuild Merchant Portal frontend:

```bash
console frontend:mp:build.
```

4. Rebuild the cache for the Merchant Portal router:

```bash
console router:cache:warm-up:merchant-portal
```

5. Clear the cache:

```bash
console cache:empty-all
```

## SameSite attribute added to Storefront and Backoffice cookies 

SameSite prevents the browser from sending the cookie along with cross-site requests. The main goal is to mitigate the risk of cross-origin information leakage. It also provides some protection against cross-site request forgery attacks.

### Introduced changes

The SameSite attribute was added to the cookies of the Storefront and Backoffice applications.

### How to get the fix

Add the following lines on the project level:

```bash
$config[SessionConstants::YVES_SESSION_COOKIE_SAMESITE] = getenv('SPRYKER_YVES_SESSION_COOKIE_SAMESITE') ?: Cookie::SAMESITE_LAX; 
$config[SessionConstants::ZED_SESSION_COOKIE_SAMESITE] = getenv('SPRYKER_ZED_SESSION_COOKIE_SAMESITE') ?: Cookie::SAMESITE_STRICT;
```

{% info_block infoBox "Info" %}

Please note that some payment providers can perform POST redirect requests. In this case, the value for `$config[SessionConstants::YVES_SESSION_COOKIE_SAMESITE]` should be set to `Cookie::SAMESITE_STRICT`.

{% endinfo_block %}