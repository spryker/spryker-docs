---
title: HowTo - Create and Register a MailTypePlugin
originalLink: https://documentation.spryker.com/v5/docs/ht-mail-create-mailtype-plugin
redirect_from:
  - /v5/docs/ht-mail-create-mailtype-plugin
  - /v5/docs/en/ht-mail-create-mailtype-plugin
---

{% info_block infoBox %}
This HowTo describes how to create and register a mail provider you want to use.
{% endinfo_block %}

## Creating a MailTypePlugin
MailType is a class used to build the entire `MailTransfer` through an easy-to-use interface. Create the `MailTypePlugin` within the Mail module which would send out the emails and implement `MailTypePluginInterface`. Then, just set up your email in the `build()` method.

Within the `build()` method you have access to the `MailBuilderInterface`, which makes it easy to enrich the `MailTransfer` with the information needed to send out the emails. You also have access to the `MailTransfer` itself through the `MailBuilderInterface`. This one, for example, is used to get the recipient information from a given transfer object.

In most cases, you will add a specific transfer to the `MailTransfer`, for example, a `CustomerTransfer` when a customer registers. This transfer object is then available in your `MailType` through the `MailTransfer`.

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

## Registering a MailTypePlugin
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
