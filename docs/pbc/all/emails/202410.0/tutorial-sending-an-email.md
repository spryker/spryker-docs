---
title: "Tutorial: Sending an email"
description: The tutorial provides code samples on how to process customer registration information in Zed to register the customer and send a confirmation email.
last_updated: Sep 27, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/sending-an-email
originalArticleId: cdce91fc-fc1b-40f5-9442-b88f5036c86c
redirect_from:
  - /2021080/docs/sending-an-email
  - /2021080/docs/en/sending-an-email
  - /docs/sending-an-email
  - /docs/en/sending-an-email
  - /v6/docs/sending-an-email
  - /v6/docs/en/sending-an-email
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-sending-an-email
  - /docs/pbc/all/emails/202204.0/tutorial-sending-an-email.html
---

The following example represents a real-world scenario: `CustomerRegistration`.

A customer goes through the registration process in your frontend (Yves) and all customer information is sent to Zed. Zed uses the information to register the customer. Once the registration is completed, the customer receives a confirmation email.

## 1. Handle mail usage

In the model which handles the registration, you can override the `sendRegistrationToken` function:

```php
<?php

namespace Pyz\Zed\Customer\Business\Customer;

use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\MailTransfer;
use Spryker\Zed\Customer\Business\Customer\Customer as SprykerCustomer;
use Spryker\Zed\Customer\Communication\Plugin\Mail\CustomCustomerRegistrationMailTypeBuilderPlugin;

class Customer extends SprykerCustomer
{
    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return bool
     */
    protected function sendRegistrationToken(CustomerTransfer $customerTransfer)
    {
        // Create a MailTransfer instance which is
        // used for further processing
        $mailTransfer = new MailTransfer();

        // Set the mail type which is used for the
        // internal mapping—for example, which mail provider
        // should send this mail
        $mailTransfer->setType(CustomCustomerRegistrationMailTypeBuilderPlugin::MAIL_TYPE);

        // Set the CustomerTransfer to the MailTransfer
        // this can be any Transfer object which is
        // needed in the Mail
        $mailTransfer->setCustomer($customerTransfer);

        // Set the LocaleTransfer which should be used
        // for, for example, translation inside your templates
        $mailTransfer->setLocale($customerTransfer->getLocale());

        // Trigger the mail facade to handle the mail
        $this->mailFacade->handleMail($mailTransfer);
    }
}
```

Also, override factory:

```php
<?php

namespace Pyz\Zed\Customer\Business;

use Pyz\Zed\Customer\Business\Customer\Customer;
use Spryker\Zed\Customer\Business\Customer\CustomerInterface;
use Spryker\Zed\Customer\Business\CustomerBusinessFactory as SprykerCustomerBusinessFactory;

class CustomerBusinessFactory extends SprykerCustomerBusinessFactory
{
    /**
     * @return \Spryker\Zed\Customer\Business\Customer\CustomerInterface
     */
    public function createCustomer(): CustomerInterface
    {
        $config = $this->getConfig();

        $customer = new Customer(
            $this->getQueryContainer(),
            $this->createCustomerReferenceGenerator(),
            $config,
            $this->createEmailValidator(),
            $this->getMailFacade(),
            $this->getLocaleQueryContainer(),
            $this->getStore(),
            $this->createCustomerExpander(),
            $this->getPostCustomerRegistrationPlugins()
        );

        return $customer;
    }
}
```

All `MailTransfers` need to know which mail type (nothing more than a string) must be used for further internal processing.

A simple example is as follows:

```php
protected function sendRegistrationToken()
{
    $mailTransfer = new MailTransfer();
    $mailTransfer->setType(YourMailTypePlugin::MAIL_TYPE);
    $this->mailFacade->handleMail($mailTransfer);
}
```

## 2. Creating a MailTypeBuilderPlugin

Create `MailTypeBuilderPlugin` implementing the `MailTypeBuilderPluginInterface`. For more information about creating a `MailTypeBuilderPlugin`, see [HowTo: Create and register a MailTypeBuilderPlugin](/docs/pbc/all/emails/{{page.version}}/howto-create-and-register-a-mailtypeplugin.html):

<details><summary>Code sample:</summary>

```php
<?php

namespace Pyz\Zed\Customer\Communication\Plugin\Mail;

use Generated\Shared\Transfer\MailRecipientTransfer;
use Generated\Shared\Transfer\MailTemplateTransfer;
use Generated\Shared\Transfer\MailTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\MailExtension\Dependency\Plugin\MailTypeBuilderPluginInterface;

class CustomCustomerRegistrationMailTypeBuilderPlugin extends AbstractPlugin implements MailTypeBuilderPluginInterface
{
    protected const MAIL_TYPE = 'custom customer registration mail';

    protected const MAIL_TEMPLATE_HTML = 'customer/mail/customer_registration.html.twig';

    protected const MAIL_TEMPLATE_TEXT = 'customer/mail/customer_registration.text.twig';

    protected const GLOSSARY_KEY_MAIL_SUBJECT = 'mail.customer.registration.subject';

    public function getName(): string
    {
        return static::MAIL_TYPE;
    }

    public function build(MailTransfer $mailTransfer): MailTransfer
    {
        $customerTransfer = $mailTransfer->requireCustomer()->getCustomer();

        return $mailTransfer
            ->setSubject(static::GLOSSARY_KEY_MAIL_SUBJECT)
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
                    ->setEmail($customerTransfer->getEmail())
                    ->setName(sprintf('%s %s', $customerTransfer->getFirstName(), $customerTransfer->getLastName())),
            );
    }
}
```
</details>

## 3. Registering a plugin

When the plugin is created, it must be registered in `MailDependencyProvider`:

```php
<?php
namespace Pyz\Zed\Mail;

use Pyz\Zed\Customer\Communication\Plugin\Mail\CustomCustomerRegistrationMailTypeBuilderPlugin;
use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    protected function getMailTypeBuilderPlugins(): array
    {
        return [
            new CustomCustomerRegistrationMailTypeBuilderPlugin(),
        ];
    }
}
```

## 4. Mail translations

The `MailTypeBuilderPlugin` also has access to the glossary with the `setSubject()` method.

A string is used as a key of the translation. The default mail provider internally does the translation through `GlossaryFacade`.

You can also translate with the parameters setting up the placeholder to be replaced. For the `mail.order.shipped.subject` key, you have `Your order {orderReference} is on its way as translation`.
In your `MailTypeBuilderPlugin` you can use the `orderReference` from the given `OrderTransfer` within the subject translations:

```php
<?php
use Generated\Shared\Transfer\MailTransfer;
use Generated\Shared\Transfer\MailRecipientTransfer;
use Generated\Shared\Transfer\MailSenderTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\MailExtension\Dependency\Plugin\MailTypeBuilderPluginInterface;

class CustomCustomerRegistrationMailTypeBuilderPlugin extends AbstractPlugin implements MailTypeBuilderPluginInterface
{
    public function build(MailTransfer $mailTransfer): MailTransfer
    {
        return $mailTransfer
            //
            ->setSubject('Registration {customerName}')
            ->setSubjectTranslations([
                '{customerName}' => 'Spencor Hopkins'
            ])
            ->addRecipient(
                (new MailRecipientTransfer())
                    ->setName('{customerName}')
                    ->setNameTranslationParameters([
                        '{customerName}' => 'Spencor Hopkins'
                ]),
            )
            ->addSender(
                (new MailSenderTransfer())
                    ->setName('{senderName}')
                    ->setNameTranslationParameters([
                        '{senderName}' => 'Spryker'
                ]),
            );
    }
}
```

{% info_block infoBox "Info" %}
Note `MailSenderTransfer.setName()` and `MailRecipientTransfer.setName()` as well as `MailTransfer.setSubject()` allow setting up the translations.
Besides that `MailSenderTransfer.setNameTranslations()` and  `MailRecipientTransfer.setNameTranslations()` are used in order to translate with parameters.
{% endinfo_block %}

## Set templates

Usually, you have a `.twig` file which contains the template you want to use for mail.

Set the template in `MailTransfer` which must be used in your `MailTypeBuilderPlugin` plugin.

```php
<?php
use Generated\Shared\Transfer\MailTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\MailExtension\Dependency\Plugin\MailTypeBuilderPluginInterface;

class CustomCustomerRegistrationMailTypeBuilderPlugin extends AbstractPlugin implements MailTypeBuilderPluginInterface
{
    protected const MAIL_TEMPLATE_TEXT = 'customer/mail/customer_registration.text.twig';

    public function build(MailTransfer $mailTransfer): MailTransfer
    {
        return $mailTransfer
            //
            ->addTemplate(
                (new MailTemplateTransfer())
                    ->setName(static::MAIL_TEMPLATE_TEXT)
                    ->setIsHtml(false),
            );
    }
}
```

The provider determines the template's final look. It can contain plain text or HTML. For example, you can even have a template that generates JSON:

```twig
{
    customer: "{% raw %}{{{% endraw %} mail.customer.firstName {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} mail.customer.lastName {% raw %}}}{% endraw %}",
}
```

In the following example, you have a plain text template with:

```twig
{% raw %}{{{% endraw %} 'mail.customer.registration.text' | trans {% raw %}}}{% endraw %}
```

The templates must be placed within the module's `Presentation` layer—for example, `src/Pyz/Zed/Customer/Presentation/Mail/customer_registration.text.twig`. You can use the same trans filter as used with Yves and Zed templates.

`TwigRenderer` is the default renderer, but you can add your own renderer by implementing `RendererInterface`.

We also provide a basic layout file, where you can inject concrete content files into. If you want to build your own layout, you need the following in your template:

```twig
{% raw %}{%{% endraw %} for template in mail.templates {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if not template.isHtml {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} include "@" ~ template.name with {mail: mail} {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
```

The preceeding template is used for plain text messages, and templates can also be used to generate JSON or query strings like `customer={% raw %}{{{% endraw %} mail.customer.firstName {% raw %}}}{% endraw %}&orderReference={% raw %}{{{% endraw %} mail.order.orderReference {% raw %}}}{% endraw %}`. It's up to your provider to decide what to render.

For HTML messages, you need to have this in your layout file:

```twig
{% raw %}{%{% endraw %} for template in mail.templates {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if template.isHtml {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} include "@" ~ template.name with {mail: mail} {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
```

When you complete the steps, to activate the mail functionality, call `MailFacade::handleMail()`.
