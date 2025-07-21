---
title: Create Multi-Factor Authentication methods
description: Learn how to create and implement your own Multi-Factor Authentication method in Spryker.
template: howto-guide-template
last_updated: Apr 7, 2025
related:
  - title: Multi-Factor Authentication Feature overview
    link: docs/pbc/all/multi-factor-authentication/page.version/multi-factor-authentication.html
  - title: Install the Multi-Factor Authentication feature
    link: docs/pbc/all/multi-factor-authentication/page.version/install-multi-factor-authentication-feature.html
  - title: Install Customer Email Multi-Factor Authentication method
    link: docs/pbc/all/multi-factor-authentication/page.version/install-email-multi-factor-authentication-method.html

redirect_from:
  - /docs/pbc/all/multi-factor-authentication/202505.0/create-multi-factor-authentication-methods.html
---

This document describes how to create and implement Multi-Factor Authentication (MFA) methods.

To lean more about MFA methods, see [Multi-Factor Authentication feature overview](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication.html).

An MFA method consists of two components:

- MFA type plugin
- Code Sender Strategy plugin

## Prerequisites

[Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html)

## 1) Create an MFA type plugin

Create one of the following plugins depending on the application:

- Yves: Implements `\Spryker\Shared\MultiFactorAuthExtension\Dependency\Plugin\MultiFactorAuthPluginInterface` and calls a client method
- Zed: Resides in the Zed layer, implements `\Spryker\Zed\MultiFactorAuthExtension\Dependency\Plugin\MultiFactorAuthTypePluginInterface`, and delegates the logic through the Facade

<details>
<summary>Pyz\Yves\MultiFactorAuth\Plugin\Factors\YourMultiFactorAuthType\YourMfaTypePlugin.php</summary>

```php
<?php

namespace Pyz\Yves\MultiFactorAuth\Plugin\Factors\YourMultiFactorAuthType;

use Generated\Shared\Transfer\CustomerMultiFactorAuthTypeTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Spryker\Yves\Kernel\AbstractPlugin;
use Spryker\Shared\MultiFactorAuthExtension\Dependency\Plugin\MultiFactorAuthPluginInterface;

class YourMfaTypePlugin extends AbstractPlugin implements MultiFactorAuthPluginInterface
{
    /**
     * @var string
     */
    protected const YOUR_MULTI_FACTOR_AUTH_TYPE = 'your-multi-factor-auth-type';
    
    /**
     * {@inheritDoc}
     *
     * @api
     * 
     * @var string
     */
    public function getName(): string
    {
        return static::YOUR_MULTI_FACTOR_AUTH_TYPE;
    }
    
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $multiFactorAuthMethod
     *
     * @return bool
     */
    public function isApplicable(string $multiFactorAuthMethod): bool
    {
        return $multiFactorAuthMethod === static::YOUR_MULTI_FACTOR_AUTH_TYPE;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\MultiFactorAuthTransfer $multiFactorAuthTransfer
     *
     * @return void
     */
    public function sendCode(MultiFactorAuthTransfer $multiFactorAuthTransfer): void
    {
        $this->getClient()->sendCustomerCode($multiFactorAuthTransfer);
    }
}
```

</details>


## 2) Create a code sender strategy plugin

Create a sender strategy that implements `\Spryker\Shared\MultiFactorAuthExtension\Dependency\Plugin\SendStrategyPluginInterface`. Here's an example based on the email implementation:

<details>
<summary>Pyz\Zed\MultiFactorAuth\Communication\Plugin\Sender\Customer\YourMfaCodeSenderStrategyPlugin.php</summary>

```php
<?php

namespace Pyz\Zed\MultiFactorAuth\Communication\Plugin\Sender\Customer;

use Generated\Shared\Transfer\MultiFactorAuthTransfer;
use Spryker\Shared\MultiFactorAuthExtension\Dependency\Plugin\SendStrategyPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class YourMfaCodeSenderStrategyPlugin extends AbstractPlugin implements SendStrategyPluginInterface
{
    /**
     * @var string
     */
    protected const YOUR_MFA_TYPE = 'your-multi-factor-auth-type';

    /**
     * @param \Generated\Shared\Transfer\MultiFactorAuthTransfer $multiFactorAuthTransfer
     *
     * @return bool
     */
    public function isApplicable(MultiFactorAuthTransfer $multiFactorAuthTransfer): bool
    {
        return $multiFactorAuthTransfer->getType() === static::YOUR_MFA_TYPE;
    }

    /**
     * @param \Generated\Shared\Transfer\MultiFactorAuthTransfer $multiFactorAuthTransfer
     *
     * @return \Generated\Shared\Transfer\MultiFactorAuthTransfer
     */
    public function send(MultiFactorAuthTransfer $multiFactorAuthTransfer): MultiFactorAuthTransfer
    {
        // Implement your code sending logic here
        // For example, send via SMS, authenticator app, etc.

        return $multiFactorAuthTransfer;
    }
}
```

</details>

## 3) Register the plugins

Register the plugins in the dependency providers:

- Back Office users: Use the `MultiFactorAuthDependencyProvider::getUserMultiFactorAuthPlugins()` class in the Zed module
- Agents: Use the `MultiFactorAuthDependencyProvider::getAgentMultiFactorAuthPlugins()` method
- Universal plugin for all users: Use the `MultiFactorAuthDependencyProvider::getUserSendStrategyPlugins()` method


**src/Pyz/Yves/MultiFactorAuth/MultiFactorAuthDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\MultiFactorAuth;

use Spryker\Yves\MultiFactorAuth\MultiFactorAuthDependencyProvider as SprykerMultiFactorAuthDependencyProvider;

class MultiFactorAuthDependencyProvider extends SprykerMultiFactorAuthDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MultiFactorAuthExtension\Dependency\Plugin\MultiFactorAuthTypePluginInterface>
     */
    protected function getCustomerMultiFactorAuthPlugins(): array
    {
        return [
            // ... other plugins
            new YourMfaTypePlugin(),
        ];
    }
}
```


**src/Pyz/Zed/MultiFactorAuth/MultiFactorAuthDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MultiFactorAuth;

use Spryker\Zed\MultiFactorAuth\MultiFactorAuthDependencyProvider as SprykerMultiFactorAuthDependencyProvider;

class MultiFactorAuthDependencyProvider extends SprykerMultiFactorAuthDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\MultiFactorAuthExtension\Dependency\Plugin\SendStrategyPluginInterface>
     */
    protected function getCustomerSendStrategyPlugins(): array
    {
        return [
            new YourMfaCodeSenderStrategyPlugin(),
        ];
    }
}
```
