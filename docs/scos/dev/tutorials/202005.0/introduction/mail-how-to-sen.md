---
title: Tutorial - Sending a Mail
originalLink: https://documentation.spryker.com/v5/docs/mail-how-to-send
redirect_from:
  - /v5/docs/mail-how-to-send
  - /v5/docs/en/mail-how-to-send
---

The following example represents a real-world scenario: `CustomerRegistration`.

A сustomer goes through the registration process in your frontend (Yves) and all customer information is sent to Zed. Zed uses the information to register the customer. Once the registration is completed, the customer will receive a confirmation email.

## 1. Handling Mail Usage
In the model which handles the registration, you can override the  `sendRegistrationToken` function:

```php
<?php

namespace Pyz\Zed\Customer\Business\Customer;

use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\MailTransfer;
use Spryker\Zed\Customer\Business\Customer\Customer as SprykerCustomer;
use Spryker\Zed\Customer\Communication\Plugin\Mail\CustomerRegistrationMailTypePlugin;

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
        // internal mapping e.g. which mail provider
        // should send this mail
        $mailTransfer->setType(CustomerRegistrationMailTypePlugin::MAIL_TYPE);
        
        // Set the CustomerTransfer to the MailTransfer
        // this can be any Transfer object which is 
        // needed in the Mail
        $mailTransfer->setCustomer($customerTransfer);
        
        // Set the LocaleTransfer which should be used 
        // for e.g. translation inside your templates
        $mailTransfer->setLocale($customerTransfer->getLocale());

        // Trigger the mail facade to handle the mail
        $this->mailFacade->handleMail($mailTransfer);
    }
}
```
Also, you need to override factory:

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

All MailTransfer’s need at least to know which mail type (nothing more than a string) should be used for further internal processing.

A minimalistic example could look like this:

```php
protected function sendRegistrationToken() 
{
    $mailTransfer = new MailTransfer();
    $mailTransfer->setType(YourMailTypePlugin::MAIL_TYPE);
    $this->mailFacade->handleMail($mailTransfer);
}
```
## 2. Creating a MailTypePlugin

Now, create the `MailType` plugin for this example. See [HowTo - Create and Register a MailTypePlugin](https://documentation.spryker.com/docs/en/ht-mail-create-mailtype-plugin) for more information on creating a MailTypePlugin:

**Code sample:**
    
```php
<?php

namespace Pyz\Zed\Customer\Communication\Plugin\Mail;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface;
use Spryker\Zed\Mail\Dependency\Plugin\MailTypePluginInterface;

class CustomCustomerRegistrationMailTypePlugin extends AbstractPlugin implements MailTypePluginInterface
{
    public const MAIL_TYPE = 'custom customer registration mail';

    /**
     * @api
     *
     * @return string
     */
    public function getName(): string
    {
        return static::MAIL_TYPE;
    }

    /**
     * @api
     *
     * @param \Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface $mailBuilder
     *
     * @return void
     */
    public function build(MailBuilderInterface $mailBuilder): void
    {
        $this
            ->setSubject($mailBuilder)
            ->setHtmlTemplate($mailBuilder)
            ->setTextTemplate($mailBuilder)
            ->setSender($mailBuilder)
            ->setRecipient($mailBuilder);
    }

    /**
     * @param \Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface $mailBuilder
     *
     * @return $this
     */
    protected function setSubject(MailBuilderInterface $mailBuilder)
    {
        $mailBuilder->setSubject('mail.customer.registration.subject');

        return $this;
    }

    /**
     * @param \Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface $mailBuilder
     *
     * @return $this
     */
    protected function setHtmlTemplate(MailBuilderInterface $mailBuilder)
    {
        $mailBuilder->setHtmlTemplate('customer/mail/customer_registration.html.twig');

        return $this;
    }

    /**
     * @param \Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface $mailBuilder
     *
     * @return $this
     */
    protected function setTextTemplate(MailBuilderInterface $mailBuilder)
    {
        $mailBuilder->setTextTemplate('customer/mail/customer_registration.text.twig');

        return $this;
    }

    /**
     * @param \Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface $mailBuilder
     *
     * @return $this
     */
    protected function setRecipient(MailBuilderInterface $mailBuilder)
    {
        $customerTransfer = $mailBuilder->getMailTransfer()->requireCustomer()->getCustomer();

        $mailBuilder->addRecipient(
            $customerTransfer->getEmail(),
            $customerTransfer->getFirstName() . ' ' . $customerTransfer->getLastName()
        );

        return $this;
    }

    /**
     * @param \Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface $mailBuilder
     *
     * @return $this
     */
    protected function setSender(MailBuilderInterface $mailBuilder)
    {
        $mailBuilder->setSender('mail.sender.email', 'Custom email sender name');

        return $this;
    }
}
```

The Mail module’s default `MailBuilder` is already pre-defined to build the `MailTransfer`. `MailBuilder` internally adds a new `MailRecipientTransfer` with the passed information, email, and name.

## 3. Registering a Plugin

When the plugin is created, it should be registered in `MailDependencyProvider`:

```php
<?php
        ...
        $container->extend(self::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
            .... 
            $mailCollection->add(new CustomCustomerRegistrationMailTypePlugin());

            return $mailCollection
        });
        ...
 ?>
```

## 4. Mail translations
The default `MailBuilder` also has access to the glossary with the `setSubject()` method. This is used for translations as follows:

```php
<?php
namespace Pyz\Zed\Customer\Communication\Plugin\Mail;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface;
use Spryker\Zed\Mail\Dependency\Plugin\MailTypeInterface;

class CustomerCustomerRegistrationMailTypePlugin extends AbstractPlugin implements MailTypePluginInterface
{
    ...
    protected function setSubject(MailBuilderInterface $mailBuilder)
    {
        $mailBuilder->setSubject('mail.customer.registration.subject');
    }
    ...
}
```

A string is used as a key of the translation. The `MailBuilder` internally does the translation through `GlossaryFacade`:

```php
<?php
namespace Spryker\Zed\Mail\Business\Model\Mail\Builder;
    
    ...
    
    protected function setSubject($subject, array $data = [])
    {
        $subject = $this->translate($subject, $data);
        
        $this->getMailTransfer()->setSubject($subject);
        
        return $this;
    }
    ...
    
    protected function translate($keyName, array $data = [])
    {
        $localeTransfer = $this->getLocaleTransfer();

        if ($this->glossaryFacade->hasTranslation($keyName, $localeTransfer)) {
            $keyName = $this->glossaryFacade->translate($keyName, $data, $localeTransfer);
        }

        return $keyName;
    }
}
```

As you can see above, you can also translate with the placeholder. For the `mail.order.shipped.subject` key, we have ` Your order {orderReference} is on its way as translation`.

In your `MailType` plugin, you can use the `orderReference` from the given `OrderTransfer` within the subject:

```php
<?php
...
protected function setSubject(MailBuilderInterface $mailBuilder)
{
    $orderTransfer = $mailBuilder->getMailTransfer()->getOrder();
    
    $mailBuilder->setSubject(
        'mail.order.shipped.subject',
        [
            '{orderReference}' => $orderTransfer->getOrderReference()
        ]
    );
}
...
}
...
}
```

## Setting Templates
Usually you will have a `.twig` file which contains the template you want to use for mail. You need to set the template which should be used in your `MailType` plugin:

```php
<?php
...
protected function setTextTemplate(MailBuilderInterface $mailBuilder)
{
    $mailBuilder->setTextTemplate('customer/mail/customer_registration.text.twig');
}
...
}
```
The provider determines the template final look. It can contain a plain text, HTML, etc. For example, you can even have a template which generates JSON:

```json
{
    ...
    customer: "{% raw %}{{{% endraw %} mail.customer.firstName {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} mail.customer.lastName {% raw %}}}{% endraw %}",
    ...
}
```

In our example we have a plain text template with:

```json
{% raw %}{{{% endraw %} 'mail.customer.registration.text' | trans {% raw %}}}{% endraw %}
```

The templates must be placed within the module's Presentation layer. In our example `src/Pyz/Zed/Customer/Presentation/Mail/customer_registration.text.twig`, you can use the same trans filter as used with Yves and Zed templates.

`TwigRenderer` is the default renderer, but you can add your own Renderer by implementing the `RendererInterface`.

We also provide a basic layout file where you can inject concrete content files to. If you want to build your own layout, you need to have the following in your template:

```json
{% raw %}{%{% endraw %} for template in mail.templates {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if not template.isHtml {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} include "@" ~ template.name with {mail: mail} {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
```

This one is used for plain text messages, and templates can also be used to generate JSON or a query strings like `customer={% raw %}{{{% endraw %} mail.customer.firstName {% raw %}}}{% endraw %}&orderReference={% raw %}{{{% endraw %} mail.order.orderReference {% raw %}}}{% endraw %}` - it’s up to your provider to decide what you need to render.

For HTML messages you need to have this in your layout file:

```json
{% raw %}{%{% endraw %} for template in mail.templates {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if template.isHtml {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} include "@" ~ template.name with {mail: mail} {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
```

Once you have completed the steps below, call `MailFacade::handleMail()` to activate the mail functionality.
