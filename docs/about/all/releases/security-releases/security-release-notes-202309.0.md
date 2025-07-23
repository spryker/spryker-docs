---
title: Security release notes 202309.0
description: Security release notes for 202309.0
last_updated: Oct 4, 2023
template: concept-topic-template
redirect_from:
- /docs/scos/user/intro-to-spryker/releases/release-notes/security-release-notes-202309.0.html
- /docs/about/all/releases/security-release-notes-202309.0.html
---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

If you need any additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, inform us through [security@spryker.com](mailto:security@spryker.com).

## Insecure file upload functionality

The file upload functionality lacked robust validation controls, so it was possible to upload files of potentially malicious type or content.

### Affected modules

`spryker/price-product-schedule-gui`: 1.0.0 - 2.4.0
`spryker/file-manager-gui`: 1.0.0 - 2.4.0
`spryker/product-list-gui`: 1.0.0 - 2.3.0

### Introduced changes

Proper validation controls have been implemented for the files uploaded via the upload functionality.

### How to get the fix

To implement a fix for this vulnerability:

1. Upgrade the `spryker/file-manager` module version to 2.3.0:

```bash
composer require spryker/file-manager:"~2.3.0"
composer show spryker/file-manager # Verify the version 
```

2. Upgrade the `spryker/validator` module version to 1.2.0:

```bash
composer require spryker/validator:"~1.2.0"
composer show spryker/validator # Verify the version
```

3. Upgrade the `spryker/file-manager-gui` module version to 2.5.0:

```bash
composer require spryker/file-manager-gui:"~2.5.0"
composer show spryker/file-manager-gui # Verify the version
```

4. Upgrade the `spryker/file-manager-data-import` module version to 2.1.0:

```bash
composer require spryker/file-manager-data-import:"~2.1.0"
composer show spryker/file-manager-data-import # Verify the version
```

5. Upgrade the `spryker/price-product-schedule-gui` module version to 2.6.0:

```bash
composer require spryker/price-product-schedule-gui:"~2.6.0" --with-dependencies
composer show spryker/price-product-schedule-gui # Verify the version
```

6. Upgrade the `spryker/product-list-gui` module version to 2.4.0:

```bash
composer require spryker/product-list-gui:"~2.4.0"
composer show spryker/product-list-gui # Verify the version
```

7. Adjust the `data/import/common/common/mime_type.csv` import file: include available extensions for mime types:

```bash
name,is_allowed,extensions
text/csv,1,"csv,txt"
```

8. Import MIME types:

```bash
console data:import mime-type.
```

9. Adjust the config `src/Pyz/Zed/FileManagerGui/FileManagerGuiConfig.php`:

```bash
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FileManagerGui;

use Spryker\Zed\FileManagerGui\FileManagerGuiConfig as SprykerFileManagerGuiConfig;

class FileManagerGuiConfig extends SprykerFileManagerGuiConfig
{
    /**
     * @var bool
     */
    protected const IS_FILE_EXTENSION_VALIDATION_ENABLED = true;
}
```

10. Adjust the config `src/Pyz/Zed/PriceProductScheduleGui/PriceProductScheduleGuiConfig.php`:

```bash
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProductScheduleGui;

use Spryker\Zed\PriceProductScheduleGui\PriceProductScheduleGuiConfig as SprykerPriceProductScheduleGuiConfig;

class PriceProductScheduleGuiConfig extends SprykerPriceProductScheduleGuiConfig
{
    /**
     * @var bool
     */
    protected const IS_FILE_EXTENSION_VALIDATION_ENABLED = true;
}
```

11. Adjust the config `src/Pyz/Zed/ProductListGui/ProductListGuiConfig.php`:

```bash
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductListGui;

use Spryker\Zed\ProductListGui\ProductListGuiConfig as SprykerProductListGuiConfig;

class ProductListGuiConfig extends SprykerProductListGuiConfig
{
    /**
     * @var bool
     */
    protected const IS_FILE_EXTENSION_VALIDATION_ENABLED = true;
}
```

## Credential stuffing attack affects the Agent and Customer portals

The login portal was vulnerable to credential stuffing—an attack in which an attacker submits a large number of username and password pairs ("credentials") into the login form. This is done with the intention of fraudulently gaining access to user accounts.

### Affected modules

`spryker-shop/security-blocker-page`: 1.0.0 - 1.0.1

### Introduced changes

Possibility to limit the number of login attempts performed from a single IP address.

### How to get the fix

To implement a fix for this vulnerability:

1. Update the `spryker-shop/security-blocker-page` module version to 1.1.0:

```bash
composer require spryker-shop/security-blocker-page:"~1.1.0"
composer show spryker-shop/security-blocker-page # Verify the version
```

2. Adjust `configurationsrc/Pyz/Yves/SecurityBlockerPage/SecurityBlockerPageConfig.php`:

```bash
<?php

namespace Pyz\Yves\SecurityBlockerPage;

use SprykerShop\Yves\SecurityBlockerPage\SecurityBlockerPageConfig as SprykerSecurityBlockerPageConfig;

class SecurityBlockerPageConfig extends SprykerSecurityBlockerPageConfig
{
    /**
     * @var bool
     */
    protected const USE_EMAIL_CONTEXT_FOR_LOGIN_SECURITY_BLOCKER = false;
}
```
