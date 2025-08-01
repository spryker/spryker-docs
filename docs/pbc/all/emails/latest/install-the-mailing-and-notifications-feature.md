---
title: Install the Mailing and Notifications feature
description: The guide describes the process of installing the mailing provider in your project.
last_updated: Nov 21, 2022
template: feature-integration-guide-template
redirect_from:
  - /docs/scos/dev/feature-integration-guides/202311.0/mailing-and-notifications-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202204.0/mailing-and-notifications-feature-integration.html
---

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place.
This guide describes all the required steps in order to integrate a mailing provider into your project.

{% endinfo_block %}

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|---|---|---|
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/symfony-mailer:^1.1.0 --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| SymfonyMailer | spryker/symfony-mailer |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| Mail.subjectTranslationParameters | property | added | src/Generated/Shared/Transfer/MailTransfer |
| MailRecipient.nameTranslationParameters | property | added | src/Generated/Shared/Transfer/MailRecipientTransfer |
| MailSender.nameTranslationParameters | property | added | src/Generated/Shared/Transfer/MailSenderTransfer |

{% endinfo_block %}

### 3) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| SymfonyMailerProviderPlugin | Provides mail sending using `SymfonyMailer` component. | Spryker\Zed\SymfonyMailer\Communication\Plugin\Mail |

**src/Pyz/Zed/Mail/MailDependencyProvider.php**

```php
<?php
namespace Pyz\Zed\Mail;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Mail\Business\Model\Provider\MailProviderCollectionAddInterface;
use Spryker\Zed\Mail\MailConfig;
use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use Spryker\Zed\SymfonyMailer\Communication\Plugin\Mail\SymfonyMailerProviderPlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    protected function extendMailProviderCollection(Container $container): Container
    {
        $container->extend(static::MAIL_PROVIDER_COLLECTION, function (MailProviderCollectionAddInterface $mailProviderCollection) {
            $mailProviderCollection
                ->addProvider(new SymfonyMailerProviderPlugin(), [
                    MailConfig::MAIL_TYPE_ALL,
                ]);

            return $mailProviderCollection;
        });

        return $container;
    }
}
```

To verify that everything is set up correctly and send an email, see [How to create and register MailTypeBuilderPlugin](/docs/pbc/all/emails/latest/howto-create-and-register-a-mail-type-builder-plugin.html).


## Migrate from SwiftMailer to Symfony Mailer

If your application is using SwiftMailer, the following variables have the values:
1. SPRYKER_SMTP_PORT = 587
2. SPRYKER_SMTP_ENCRYPTION='tls'

To migrate to Symfony Mailer, follow the steps:

1. Force the port for SMTP to 465 and release this change with the migration release:

```php
$config[SymfonyMailerConstants::SMTP_PORT] = '465';
```

2. Create a support ticket to change `SPRYKER_SMTP_PORT` to 465.

3. Revert configuration to the previous state to use a port from the env variable:

```php
$config[SymfonyMailerConstants::SMTP_PORT] = getenv('SPRYKER_SMTP_PORT') ?: null;
```

4. Redeploy the application.



























