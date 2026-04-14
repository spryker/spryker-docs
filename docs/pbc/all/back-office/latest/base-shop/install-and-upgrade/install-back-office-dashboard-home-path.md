---
title: Install Back Office dashboard home path
description: Learn how to configure the Back Office to redirect users to the dashboard as the default landing page after login.
template: howto-guide-template
last_updated: Apr 14, 2026
---

This document explains how to configure the Back Office to redirect users to `/dashboard` as the default landing page after login, replacing the default Spryker home path.

## Prerequisites

Install the following features:

| NAME                        | REQUIRED | VERSION              | INTEGRATION GUIDE                                                                                                                                                       |
|-----------------------------|----------|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core Back Office    | &#9989;  | {{page.release_tag}} | [Install the Spryker Core Back Office feature](/docs/pbc/all/back-office/{{site.version}}/base-shop/install-and-upgrade/install-the-spryker-core-back-office-feature.html) |
| SecurityGui                 | &#9989;  | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)              |
| SecurityOauthUser           |          | {{page.release_tag}} | -                                                                                                                                                                       |

## 1) Set up configuration

1. Create or update `src/Pyz/Zed/Application/ApplicationConfig.php` to redirect the Back Office index action to `/dashboard`:

**src/Pyz/Zed/Application/ApplicationConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationConfig as SprykerApplicationConfig;

class ApplicationConfig extends SprykerApplicationConfig
{
    protected const string INDEX_ACTION_REDIRECT_URL = '/dashboard';

    /**
     * @return string|null
     */
    public function getIndexActionRedirectUrl(): ?string
    {
        return static::INDEX_ACTION_REDIRECT_URL;
    }
}
```

2. Update `src/Pyz/Zed/Gui/GuiConfig.php` to set `/dashboard` as the navigation home path:

**src/Pyz/Zed/Gui/GuiConfig.php**

```php
<?php

namespace Pyz\Zed\Gui;

use Spryker\Zed\Gui\GuiConfig as SprykerGuiConfig;

class GuiConfig extends SprykerGuiConfig
{
    protected const string HOME_PATH = '/dashboard';
}
```

3. Update `src/Pyz/Zed/SecurityGui/SecurityGuiConfig.php` to redirect users to `/dashboard` after password-based login:

**src/Pyz/Zed/SecurityGui/SecurityGuiConfig.php**

```php
<?php

namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\SecurityGui\SecurityGuiConfig as SprykerSecurityGuiConfig;

class SecurityGuiConfig extends SprykerSecurityGuiConfig
{
    protected const string HOME_PATH = '/dashboard';
}
```

4. If your project uses OAuth-based login, create `src/Pyz/Zed/SecurityOauthUser/SecurityOauthUserConfig.php`:

**src/Pyz/Zed/SecurityOauthUser/SecurityOauthUserConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\SecurityOauthUser;

use Spryker\Zed\SecurityOauthUser\SecurityOauthUserConfig as SprykerSecurityOauthUserConfig;

class SecurityOauthUserConfig extends SprykerSecurityOauthUserConfig
{
    protected const string HOME_PATH = '/dashboard';
}
```

{% info_block warningBox "Verification" %}

Log in to the Back Office. Make sure you are redirected to `/dashboard` after a successful login.

{% endinfo_block %}

## 2) Set up behavior

Enable the following behavior by registering the plugins:

| PLUGIN                | SPECIFICATION                                                                                          | PREREQUISITES | NAMESPACE                                         |
|-----------------------|--------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------|
| HomePathTwigPlugin    | Exposes the `homePath` Twig variable so Back Office templates can render the correct home link URL.   | -             | Spryker\Zed\Gui\Communication\Plugin\Twig         |

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Gui\Communication\Plugin\Twig\HomePathTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new HomePathTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

In the Back Office, click the Spryker logo or any home navigation link. Make sure you are redirected to `/dashboard`.

{% endinfo_block %}
