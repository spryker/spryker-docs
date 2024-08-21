---
title: "HowTo: Create and register a mail provider"
description: Use the guide to create and register a mail provider in the Mail module.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-create-register-provider-plugin
originalArticleId: 423f4609-d088-428a-bbe9-6718a7e235ed
redirect_from:
  - /2021080/docs/ht-create-register-provider-plugin
  - /2021080/docs/en/ht-create-register-provider-plugin
  - /docs/ht-create-register-provider-plugin
  - /docs/en/ht-create-register-provider-plugin
  - /v6/docs/ht-create-register-provider-plugin
  - /v6/docs/en/ht-create-register-provider-plugin
  - /v5/docs/ht-create-register-provider-plugin
  - /v5/docs/en/ht-create-register-provider-plugin
  - /v4/docs/ht-create-register-provider-plugin
  - /v4/docs/en/ht-create-register-provider-plugin
  - /v3/docs/ht-create-register-provider-plugin
  - /v3/docs/en/ht-create-register-provider-plugin
  - /v2/docs/ht-create-register-provider-plugin
  - /v2/docs/en/ht-create-register-provider-plugin
  - /v1/docs/ht-create-register-provider-plugin
  - /v1/docs/en/ht-create-register-provider-plugin
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-create-and-register-a-mail-provider.html
  - /docs/pbc/all/emails/202204.0/howto-create-and-register-a-mail-provider.html
related:
  - title: "HowTo: Create and register a MailTypeBuilderPlugin"
    link: docs/pbc/all/emails/page.version/howto-create-and-register-a-mail-type-builder-plugin.html
  - title: "Tutorial: Sending an email"
    link: docs/pbc/all/emails/page.version/tutorial-sending-an-email.html
---

{% info_block infoBox "Info" %}

Spryker lets you send emails via the Symfony mailer component.
Follow the instructions in this link in order to use it [Install the Mailing and Notifications feature guide](/docs/pbc/all/emails/{{page.version}}/install-the-mailing-and-notifications-feature.html).
For information on how to you use, see [Install the Mailing and Notifications feature guide](/docs/pbc/all/emails/{{page.version}}/install-the-mailing-and-notifications-feature.html).
{% endinfo_block %}

This guide shows how to create and register a mail provider you want to use.

A mail provider is defined in the provider class. Since each provider behaves differently, the provider class is also different.

## Create and register a mail provider

1. Create a class that implements `MailProviderPluginInterface`.
2. In the `Mail` module, register your provider.
2. To register a provider, add it to `MailProviderCollection` by adding the provider to `MailDependencyProvider`:

```php
<?php
namespace Pyz\Zed\Mail;

...

public function provideBusinessLayerDependencies(Container $container)
{
    ...

    $container->extend(self::MAIL_PROVIDER_COLLECTION, function (MailProviderCollectionAddInterface $mailProviderCollection) {
        $mailProviderCollection->addProvider(new YourProviderPlugin(), MailConfig::MAIL_TYPE_ALL);

        return $mailProviderCollection;
    });

    ...
}
...
```

By using `$container->extend()`, you get `MailProviderCollectionAddInterface`, where you can add your provider. `MailProviderCollectionAddInterface::addProvider()` takes the provider you want to use as the first argument, and as the second argument, a `MailType` or a list of `MailType` classes, which this provider must use.

As you can see in the preceding example, the provider is registered to all `MailType` classes by using `MailConfig::MAIL_TYPE_ALL`. If you want the provider to handle only a specific `MailType`, use the `MailType` constant from your `MailTypePlugin`—for example, `CustomerRegistrationMailTypePlugin::MAIL_TYPE`. For information about creating and registering a `MailTypePlugin`, see [HowTo: Creating and registering a MailTypePlugin](/docs/pbc/all/emails/{{page.version}}/howto-create-and-register-a-mailtypeplugin.html).

## Use more than one provider

To send emails through different providers, register more than one provider to the `Mail` module. You can even create a scenario when all marketing emails go through provider A and all others through provider B. In the preceding section, this technique is used to register one provider to all types. The following example demonstrates how to wire up more than one provider:

```php
<?php
namespace Pyz\Zed\Mail;

...

public function provideBusinessLayerDependencies(Container $container)
{
    ...

    $container->extend(self::MAIL_PROVIDER_COLLECTION, function (MailProviderCollectionAddInterface $mailProviderCollection) {
        $mailProviderCollection
            ->addProvider(new ProviderAPlugin(), [MailTypeA::MAIL_TYPE, MailTypeB::MAIL_TYPE])
            ->addProvider(new ProviderBPlugin(), MailTypeC::MAIL_TYPE);

        return $mailProviderCollection;
    });

    ...
}
...
```

If a `MailType` class can be handled by more than one provider, the email is sent by both of them.
