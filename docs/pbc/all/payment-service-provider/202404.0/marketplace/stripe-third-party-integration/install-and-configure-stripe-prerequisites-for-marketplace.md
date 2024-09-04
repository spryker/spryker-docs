---
title: Install and configure Stripe prerequisites for Marketplace
description: Learn how to prepare your Marketplace project for Stripe
last_updated: Jul 1, 2024
template: howto-guide-template
---

To install and configure the prerequisites for the [Stripe App](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/stripe.html), take the following steps.

## Prerequisites

[Install and configure Stripe prerequisites for base shop](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html)


## Install modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-app spryker/merchant-app-merchant-portal-gui
```


## Add request headers configuration

Update `config_default.php` as follows:

```php
$config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_ACP]
$config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_ACP]
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_ACP]
$config[KernelAppConstants::TENANT_IDENTIFIER]
```

`OauthClientConstants` are replacing the deprecated `OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_PAYMENT_*` constants.


## Add AsynchronousAPI message configuration

Update `config_default.php` as follows:

```php
$config[MessageBrokerAwsConstants::MESSAGE_TO_CHANNEL_MAP] = [
    ...
    ReadyForMerchantAppOnboardingTransfer::class => 'merchant-app-events',
    MerchantAppOnboardingStatusChangedTransfer::class => 'merchant-app-events',
    ...
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    ...
    'merchant-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'merchant-app-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    ...
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

| PLUGIN | METHOD |
| - | - |
| \Spryker\Zed\MerchantApp\Communication\Plugin\KernelApp\MerchantAppRequestExpanderPlugin | \Pyz\Zed\KernelApp\KernelAppDependencyProvider::getRequestExpanderPlugins() |
| \Spryker\Zed\OauthClient\Communication\Plugin\KernelApp\OAuthRequestExpanderPlugin |  \Pyz\Zed\KernelApp\KernelAppDependencyProvider::getRequestExpanderPlugins() |
| \Spryker\Zed\MerchantApp\Communication\Plugin\MessageBroker\MerchantAppOnboardingMessageHandlerPlugin | \Pyz\Zed\MessageBroker\MessageBrokerDependencyProvider::getMessageHandlerPlugins() |
| \Spryker\Zed\KernelApp\Communication\Plugin\MessageBroker\AppConfigMessageHandlerPlugin` | \Pyz\Zed\MessageBroker\MessageBrokerDependencyProvider::getMessageHandlerPlugins() |
| \Spryker\Zed\MerchantAppMerchantPortalGui\Communication\Plugin\AclMerchantPortal\MerchantAppMerchantPortalGuiMerchantAclRuleExpanderPlugin | \Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getMerchantAclRuleExpanderPlugins() |
| \Spryker\Zed\MerchantAppMerchantPortalGui\Communication\Plugin\AclMerchantPortal\MerchantAppAclEntityConfigurationExpanderPlugin | \Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins() |

## Configure OMS

1. Add the following commands to `\Pyz\Zed\Oms\OmsDependencyProvider::extendCommandPlugins()`:
```php
$commandCollection->add(new MerchantPayoutCommandByOrderPlugin(), 'SalesPaymentMerchant/Payout');
$commandCollection->add(new MerchantPayoutReverseCommandByOrderPlugin(), 'SalesPaymentMerchant/ReversePayout');
```

2. Add the following conditions to `\Pyz\Zed\Oms\OmsDependencyProvider::extendConditionPlugins()`:
```php
$conditionCollection->add(new IsMerchantPaidOutConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPaidOut');
$conditionCollection->add(new IsMerchantPayoutReversedConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPayoutReversed');
```

### Add project configuration

1. To configure ACL, add `'merchant-app-merchant-portal-gui'` to `\Pyz\Zed\Acl\AclConfig::addMerchantPortalInstallerRules()`.
2. To configure the message broker, add `'merchant-commands'`, `'merchant-app-events'`, and `'app-events'` to `\Pyz\Zed\MessageBroker\MessageBrokerConfig::getDefaultWorkerChannels()`.
3. To configure state machine, copy `vendor/spryker/sales-payment/config/Zed/Oms/StateMachine/ForeignPaymentProviderStateMachine01.xml` to the project and adjust to your needs.
4. Add `redirect.php` to your Merchant Portal application public folder: [/public/MerchantPortal/redirect.php](https://github.com/spryker-shop/b2c-demo-marketplace/blob/master/public/MerchantPortal/redirect.php).

### Enable merchant commissions for marketplace payments

To enable merchant commissions, [install the Marketplace Merchant Commission feature](/docs/pbc/all/merchant-management/202407.0/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-feature.html).

## Next step

[Configure merchant transfers for Stripe](/docs/pbc/all/payment-service-provider/202404.0/marketplace/stripe-third-party-integration/configure-merchant-transfers-for-stripe.html)
