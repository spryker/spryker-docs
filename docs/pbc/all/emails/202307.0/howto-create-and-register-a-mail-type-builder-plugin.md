---
title: "HowTo: Create and register a MailTypeBuilderPlugin"
description: Use this guide to create and register the  MailTypeBuilderPlugin in the Mail module.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-mail-create-mailtype-plugin
originalArticleId: ba04380c-00b9-4815-9023-839c99a31497
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-create-and-register-a-mailtypeplugin
  - /2021080/docs/ht-mail-create-mailtype-plugin
  - /2021080/docs/en/ht-mail-create-mailtype-plugin
  - /docs/ht-mail-create-mailtype-plugin
  - /docs/en/ht-mail-create-mailtype-plugin
  - /v6/docs/ht-make-product-shown-on-frontend-by-url
  - /v6/docs/en/ht-make-product-shown-on-frontend-by-url
  - /v5/docs/ht-make-product-shown-on-frontend-by-url
  - /v5/docs/en/ht-make-product-shown-on-frontend-by-url
  - /v4/docs/ht-make-product-shown-on-frontend-by-url
  - /v4/docs/en/ht-make-product-shown-on-frontend-by-url
  - /v3/docs/ht-make-product-shown-on-frontend-by-url
  - /v3/docs/en/ht-make-product-shown-on-frontend-by-url
  - /v2/docs/ht-make-product-shown-on-frontend-by-url
  - /v2/docs/en/ht-make-product-shown-on-frontend-by-url
  - /v1/docs/ht-make-product-shown-on-frontend-by-url
  - /v1/docs/en/ht-make-product-shown-on-frontend-by-url
---

`MailTypeBuilderPlugin` is used to build the entire `MailTransfer` through an easy-to-use interface. Create the `MailTypeBuilderPlugin` within the `Mail` module, which sends out the emails, and implement `MailTypeBuilderPluginInterface`.
Then, in the `build()` method, set up your email.

All `MailTransfers` need to know which mail type has to be used for further internal processing. The mail type has to be a string.

In most cases, you can add a specific transfer to the `MailTransfer`—for example, a `CustomerTransfer` when a customer registers. This transfer object is available in your `MailTypeBuilderPlugin` through the `MailTransfer`.

Let’s say you have a module named `FooBar`, where you want to add automated mail sending. To enable that feature, follow these steps:

Example of a `FooBarMailTypeBuilderPlugin`:

```php
<?php
namespace Pyz\Zed\FooBar\Communication\Plugin\Mail;

use Generated\Shared\Transfer\MailRecipientTransfer;
use Generated\Shared\Transfer\MailTemplateTransfer;
use Generated\Shared\Transfer\MailTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\MailExtension\Dependency\Plugin\MailTypeBuilderPluginInterface;

class FooBarMailTypeBuilderPlugin extends AbstractPlugin implements MailTypeBuilderPluginInterface
{
    protected const MAIL_TYPE = 'a name of the mail';

    protected const MAIL_TEMPLATE_HTML = 'FooBar/mail/your_mail.html.twig';

    protected const MAIL_TEMPLATE_TEXT = 'FooBar/mail/your_mail.text.twig';

    protected const GLOSSARY_KEY_MAIL_SUBJECT = 'foo_bar.mail.your_mail.subject';

    protected const PARAMETER_NAME = '%name%';

    public function getName(): string
    {
        return static::MAIL_TYPE;
    }

    public function build(MailTransfer $mailTransfer): MailTransfer
    {
        return $mailTransfer
            ->setSubject(static::GLOSSARY_KEY_MAIL_SUBJECT)
            ->setSubjectTranslationParameters([static::PARAMETER_NAME => $fooBarTransfer->getFooBarNameOrFail()])
            ->addTemplate(
                (new MailTemplateTransfer())
                    ->setName(static::MAIL_TEMPLATE_HTML)
                    ->setIsHtml(true),
            )
            ->addTemplate(
                (new MailTemplateTransfer())
                    ->setName(static::MAIL_TEMPLATE_TEXT)
                    ->setIsHtml(false),
            )
            ->addRecipient(
                (new MailRecipientTransfer())
                    ->setEmail($mailTransfer->getFooBar()->getEmail())
                    ->setName($mailTransfer->getFooBar()->getName()),
            );
    }
}
```

Register the `FooBarMailTypeBuilderPlugin`:

```php
<?php
namespace Pyz\Zed\Mail;

use Pyz\Zed\FooBar\Communication\Plugin\Mail\FooBarMailTypeBuilderPlugin;
use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    protected function getMailTypeBuilderPlugins(): array
    {
        return [
            new FooBarMailTypeBuilderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

In order to activate the mail functionality, follow these steps:
1. To verify the mail provider is created and registered, go to [How to create and register a mail provider](/docs/pbc/all/emails/{{page.version}}/howto-create-and-register-a-mail-provider.html).
2. Create and adjust `MailTransfer`:

```php
    $mailTransfer = new MailTransfer();
    $mailTransfer->setType('MAIL_TYPE');
    $mailTransfer->setFooBar(new FooBarTransfer());
    $mailTransfer->setLocale('DE');
```
Call `MailFacade::handleMail($mailTransfer)`.

If everything is set up properly the mail will be sent.

Follow [Tutorial sending an email](/docs/pbc/all/emails/{{site.version}}/tutorial-sending-an-email.html) to get more information.

{% endinfo_block %}
