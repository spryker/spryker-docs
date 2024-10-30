---
title: "HowTo: Create and register a MailTypePlugin"
description: Use the guide to create and register the  MailTypePlugin in the Mail module.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-mail-create-mailtype-plugin
originalArticleId: ba04380c-00b9-4815-9023-839c99a31497
redirect_from:
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
  - /docs/pbc/all/emails/202204.0/howto-create-and-register-a-mai%E2%80%A6
  - /docs/pbc/all/emails/202204.0/howto-create-and-register-a-mailtypeplugin.html
---

This document shows how to create and register a mail provider you want to use.

## Create a `MailTypePlugin`

`MailType` is a class used to build the entire `MailTransfer` through an easy-to-use interface. Create the `MailTypePlugin` within the `Mail` module, which sends out the emails, and implement `MailTypePluginInterface`. Then, in the `build()` method, set up your email.

`MailType` is a class used to build the entire `MailTransfer` through an easy-to-use interface. Create the `MailTypePlugin` within the `Mail` module, which sends out the emails, and implement `MailTypePluginInterface`. Then, in the `build()` method, set up your email.

Within the `build()` method, you have access to the `MailBuilderInterface`, which makes it easy to enrich the `MailTransfer` with the information needed to send out the emails. You also have access to the `MailTransfer` itself through the `MailBuilderInterface`. This one, for example, is used to get the recipient information from a given transfer object.

In most cases, you can add a specific transfer to the `MailTransfer`—for example, a `CustomerTransfer` when a customer registers. This transfer object is available in your `MailType` through the `MailTransfer`.

Example of a `MailTypePlugin`:

```php
<?php
namespace Pyz\Zed\YourBundle\Communication\Plugin\Mail;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface;
use Spryker\Zed\Mail\Dependency\Plugin\MailTypePluginInterface;

class YourMailTypePlugin extends AbstractPlugin implements MailTypePluginInterface
{
    const MAIL_TYPE = 'name of your mail';

    /**
     * @return string
     */
    public function getName(): string
    {
        return static::MAIL_TYPE;
    }

    /**
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

    ...

}
```

## Register the `MailTypePlugin`

To add your `MailType` to the `MailTypeCollection`, add it to your `MailDependencyProvider`:

```php
<?php
namespace Pyz\Zed\Mail;

...

public function provideBusinessLayerDependencies(Container $container)
{
    ...

    $container->extend(self::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
        $mailCollection->add(new YourMailTypePlugin());

        return $mailCollection;
    }

    ...
}
...
```
