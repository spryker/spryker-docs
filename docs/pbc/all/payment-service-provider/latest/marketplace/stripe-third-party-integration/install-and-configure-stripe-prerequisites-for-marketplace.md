---
title: Install and configure Stripe prerequisites for Marketplace
description: Learn how to prepare your Marketplace project for Stripe
last_updated: Nov 1, 2024
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/payment-service-provider/latest/marketplace/stripe-third-party-integration/install-and-configure-stripe-prerequisites-for-marketplace.html
---

To install and configure the prerequisites for the [Stripe App](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/stripe.html), take the following steps.

## Prerequisites

[Install and configure Stripe prerequisites for base shop](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html)

## Install and update modules

1. Update modules using Composer:

```bash
composer update spryker-feature/order-management spryker-feature/spryker-core spryker-feature/payments spryker-feature/marketplace-merchant spryker/oauth-client --with-dependencies
```

2. Install the required modules using Composer:

```bash
composer require spryker/merchant-app spryker/merchant-app-merchant-portal-gui
```

## Add request headers configuration

1. Add the following configuration settings for the Oauth client:

{% info_block infoBox "" %}

In this example, Auth0 is used as an Oauth provider.

{% endinfo_block %}

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\OauthClient\OauthClientConstants;
use Spryker\Zed\OauthAuth0\OauthAuth0Config;

$config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_ACP] = OauthAuth0Config::PROVIDER_NAME;
$config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_ACP] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_ACP] = 'aop-app'
```

2. Add the tenant identifier to the configuration. The tenant identifier should be available in the `SPRYKER_TENANT_IDENTIFIER` environment variable.

**config/Shared/config_default.php**

```php

use Spryker\Shared\KernelApp\KernelAppConstants;

$config[KernelAppConstants::TENANT_IDENTIFIER] = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';
```

3. Add trusted hosts for stripe:

**config/Shared/config_default.php**

```php

$trustedHosts
    = $config[HttpConstants::ZED_TRUSTED_HOSTS]
    = $config[HttpConstants::YVES_TRUSTED_HOSTS]
    = array_filter(explode(',', getenv('SPRYKER_TRUSTED_HOSTS') ?: ''));

$config[KernelConstants::DOMAIN_WHITELIST] = array_merge($trustedHosts, [
    $sprykerBackendHost,
    $sprykerFrontendHost,
    //...
    'connect.stripe.com',
]);
```

## Add AsynchronousAPI message configuration

Update `config_default.php` as follows:

```php

use Spryker\Shared\MessageBrokerAws\MessageBrokerAwsConstants;
use Generated\Shared\Transfer\ReadyForMerchantAppOnboardingTransfer;
use Generated\Shared\Transfer\MerchantAppOnboardingStatusChangedTransfer;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;


$config[MessageBrokerAwsConstants::MESSAGE_TO_CHANNEL_MAP] = [
    ...
    ReadyForMerchantAppOnboardingTransfer::class => 'merchant-app-events',
    MerchantAppOnboardingStatusChangedTransfer::class => 'merchant-app-events',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    ...
    'merchant-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'merchant-app-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'app-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];
```

## Add Oms configuration

Update `config_default.php` as follows:

```php
$config[OmsConstants::PROCESS_LOCATION] = [
    //...
    OmsConfig::DEFAULT_PROCESS_LOCATION,
    APPLICATION_ROOT_DIR . '/vendor/spryker/sales-payment/config/Zed/Oms', # this line must be added if your use unmodified ForeignPaymentStateMachine01.xml
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
    //...
    'ForeignPaymentStateMachine01', # this line must be added or add your modified version of this OMS
];
```

## Update navigation

Update `config/Zed/navigation.xml` as follows:

```xml
<?xml version="1.0"?>
<config>
    ...

    <merchant-portal-payment-settings>
        <label>Payment Settings</label>
        <title>Payment Settings</title>
        <icon>payment</icon>
        <bundle>merchant-app-merchant-portal-gui</bundle>
        <controller>payment-settings</controller>
        <action>index</action>
        <pages>
            <onboarding>
                <label>Onboarding</label>
                <title>Onboarding</title>
                <icon>payment</icon>
                <bundle>merchant-app-merchant-portal-gui</bundle>
                <controller>payment-settings</controller>
                <action>onboarding</action>
                <visible>0</visible>
            </onboarding>
        </pages>
    </merchant-portal-payment-settings>
</config>
```

## Add plugins

Add the plugins to the methods:

| PLUGIN                                                                                                                                     | METHOD                                                                                                     |
|--------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| \Spryker\Zed\MerchantApp\Communication\Plugin\KernelApp\MerchantAppRequestExpanderPlugin                                                   | \Pyz\Zed\KernelApp\KernelAppDependencyProvider::getRequestExpanderPlugins()                                |
| \Spryker\Zed\OauthClient\Communication\Plugin\KernelApp\OAuthRequestExpanderPlugin                                                         | \Pyz\Zed\KernelApp\KernelAppDependencyProvider::getRequestExpanderPlugins()                                |
| \Spryker\Zed\MerchantApp\Communication\Plugin\MessageBroker\MerchantAppOnboardingMessageHandlerPlugin                                      | \Pyz\Zed\MessageBroker\MessageBrokerDependencyProvider::getMessageHandlerPlugins()                         |
| \Spryker\Zed\KernelApp\Communication\Plugin\MessageBroker\AppConfigMessageHandlerPlugin                                                    | \Pyz\Zed\MessageBroker\MessageBrokerDependencyProvider::getMessageHandlerPlugins()                         |
| \Spryker\Zed\MerchantAppMerchantPortalGui\Communication\Plugin\AclMerchantPortal\MerchantAppMerchantPortalGuiMerchantAclRuleExpanderPlugin | \Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getMerchantAclRuleExpanderPlugins()        |
| \Spryker\Zed\MerchantAppMerchantPortalGui\Communication\Plugin\AclMerchantPortal\MerchantAppAclEntityConfigurationExpanderPlugin           | \Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins() |
| \Spryker\Zed\Payment\Communication\Plugin\AclMerchantPortal\PaymentAclEntityConfigurationExpanderPlugin                                    | \Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins() |
| \Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\AclMerchantPortal\SalesPaymentMerchantAclEntityConfigurationExpanderPlugin          | \Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins() |

## Configure OMS

1. Add the following commands to `\Pyz\Zed\Oms\OmsDependencyProvider::extendCommandPlugins()`:

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Command\MerchantPayoutCommandByOrderPlugin;
use Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Command\MerchantPayoutReverseCommandByOrderPlugin;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;


class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
   /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {

            $commandCollection->add(new MerchantPayoutCommandByOrderPlugin(), 'SalesPaymentMerchant/Payout');
            $commandCollection->add(new MerchantPayoutReverseCommandByOrderPlugin(), 'SalesPaymentMerchant/ReversePayout');

          return $commandCollection;
        });

        return $container;
    }
```

2. Add the following conditions to `\Pyz\Zed\Oms\OmsDependencyProvider::extendConditionPlugins()`:

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionCollectionInterface;
use Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Command\MerchantPayoutCommandByOrderPlugin;
use Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Command\MerchantPayoutReverseCommandByOrderPlugin;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container): Container
    {
        $container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {

            $conditionCollection->add(new IsMerchantPaidOutConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPaidOut');
            $conditionCollection->add(new IsMerchantPayoutReversedConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPayoutReversed');

            return $conditionCollection;
        });

        return $container;
    }
}

```

### Add project configuration

1. To Configure ACL, add the `'merchant-app-merchant-portal-gui'` configuration:

<details>
  <summary>\Pyz\Zed\Acl\AclConfig::addMerchantPortalInstallerRules()</summary>

```php
<?php

namespace Pyz\Zed\Acl;

use ArrayObject;
use Generated\Shared\Transfer\RuleTransfer;
use Spryker\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    /**
     * @var string
     */
    protected const RULE_TYPE_DENY = 'deny';

    /**
     * @return array<array<string, mixed>>
     */
    public function getInstallerRules(): array
    {
        $installerRules = $this->addMerchantPortalInstallerRules($installerRules);

        return $installerRules;
    }


    /**
     * @param array<array<string, mixed>> $installerRules
     *
     * @return array<array<string, mixed>>
     */
    protected function addMerchantPortalInstallerRules(array $installerRules): array
    {
        $bundleNames = [
            'merchant-app-merchant-portal-gui',
        ];

        foreach ($bundleNames as $bundleName) {
            $installerRules[] = [
                'bundle' => $bundleName,
                'controller' => AclConstants::VALIDATOR_WILDCARD,
                'action' => AclConstants::VALIDATOR_WILDCARD,
                'type' => static::RULE_TYPE_DENY,
                'role' => AclConstants::ROOT_ROLE,
            ];
        }

        return $installerRules;
    }
}
```

</details>

2. To configure the message broker, add `'merchant-commands'`, `'merchant-app-events'`, and `'app-events'` events:

```php
<?php

namespace Pyz\Zed\MessageBroker;

use Spryker\Shared\MessageBrokerAws\MessageBrokerAwsConstants;
use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * @return array<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [
            //...
            'app-events',
            'merchant-commands',
            'merchant-app-events',
            //...
        ];
    }
}

```

3. To configure state machine, copy `vendor/spryker/sales-payment/config/Zed/Oms/StateMachine/ForeignPaymentProviderStateMachine01.xml` to the project and adjust it to your needs. For more information about ACP payment methods integration with your project OMS configuration, see [Integrate ACP payment apps with Spryker OMS configuration](/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration.html).

4. To enable merchants to be redirected to the Merchant Portal from third-party websites, add `redirect.php` to the public folder of your Merchant Portal: [/public/MerchantPortal/redirect.php](https://github.com/spryker-shop/b2c-demo-marketplace/blob/master/public/MerchantPortal/redirect.php).



### Enable merchant commissions for marketplace payments

To enable merchant commissions, [install the Marketplace Merchant Commission feature](/docs/pbc/all/merchant-management/202410.0/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-feature.html).

## Next step

[Configure merchant transfers for Stripe](/docs/pbc/all/payment-service-provider/202404.0/marketplace/stripe-third-party-integration/configure-merchant-transfers-for-stripe.html)
