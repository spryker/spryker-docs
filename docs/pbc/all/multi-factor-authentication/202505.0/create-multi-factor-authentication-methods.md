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
    link: docs/pbc/all/multi-factor-authentication/page.version/install-customer-email-multi-factor-authentication-method.html
---

This document describes how to create and implement Multi-Factor Authentication (MFA) methods. 

To lean more about MFA methods, see [Multi-Factor Authentication feature overview](/docs/pbc/all/multi-factor-authentication/{{page.version}}/multi-factor-authentication.html).

An MFA method consists of two components:

* MFA type plugin
* Code Sender Strategy

## Prerequisites

[Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html)

## 1. Create a Multi-Factor Authentication type plugin

Create a plugin that implements `\Spryker\Zed\MultiFactorAuthExtension\Dependency\Plugin\MultiFactorAuthTypePluginInterface`:

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

## 2. Create a code sender strategy

Create a sender strategy that implements `\Spryker\Zed\MultiFactorAuth\Business\Strategy\SendStrategyInterface`. Here's an example based on the email implementation:

<details>
<summary>Pyz\Zed\MultiFactorAuth\Business\Strategy\Customer\YourMfaCodeSenderStrategy.php</summary>

```php
<?php

namespace Pyz\Zed\MultiFactorAuth\Business\Strategy\Customer;

use Generated\Shared\Transfer\MultiFactorAuthTransfer;
use Spryker\Zed\MultiFactorAuth\Business\Strategy\SendStrategyInterface;

class YourMfaCodeSenderStrategy implements SendStrategyInterface
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

## 3. Wire strategy in factory

Add your strategy to the factory so that it can be used by the MFA system to resolve the correct sender strategy based on the type of MFA method selected by a customer.

<details>
<summary>Pyz\Zed\MultiFactorAuth\Business\MultiFactorAuthBusinessFactory.php</summary>

```php
<?php

namespace Pyz\Zed\MultiFactorAuth\Business;

use Spryker\Zed\MultiFactorAuth\Business\MultiFactorAuthBusinessFactory as SprykerMultiFactorAuthBusinessFactory;
use Pyz\Zed\MultiFactorAuth\Business\Strategy\Customer\YourMfaCodeSenderStrategy;

class MultiFactorAuthBusinessFactory extends SprykerMultiFactorAuthBusinessFactory
{
    /**
     * @return array<\Spryker\Zed\MultiFactorAuth\Business\Strategy\SendStrategyInterface>
     */
    protected function getCustomerCodeSenderStrategies(): array
    {
        return [
            // ... other strategies
            new YourMfaCodeSenderStrategy(),
        ];
    }
}
```

</details>

## 4. Register the plugin

Register the plugin in the dependency provider:

<details>
<summary>Pyz\Yves\MultiFactorAuth\MultiFactorAuthDependencyProvider.php</summary>

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

</details>
