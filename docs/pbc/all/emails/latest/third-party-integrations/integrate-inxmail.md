---
title: Integrating Inxmail
description: Learn how you can integrate third party Inxmail in your Spryker Cloud Commerce OS projects
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
    - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/customer-communication/inxmail/integrating-inxmail.html
    - /docs/scos/dev/technology-partner-guides/202204.0/marketing-and-conversion/customer-communication/inxmail/integrating-inxmail.html
    - /docs/pbc/all/emails/latest/third-party-integrations/integrate-inxmail.html
---

This document desribes how to integrate Inxmail.

## New customer registration event

Inxmail module has `\SprykerEco\Zed\Inxmail\Communication\Plugin\Customer\InxmailPostCustomerRegistrationPlugin`. This plugin implements `PostCustomerRegistrationPluginInterface` and can be used in `\Pyz\Zed\Customer\CustomerDependencyProvider::getPostCustomerRegistrationPlugins.`

```php
 ...
 use SprykerEco\Zed\Inxmail\Communication\Plugin\Customer\InxmailPostCustomerRegistrationPlugin
 ...

 /**
 * @return \Spryker\Zed\CustomerExtension\Dependency\Plugin\PostCustomerRegistrationPluginInterface[]
 */
 protected function getPostCustomerRegistrationPlugins(): array
 {
 return [
 ...
 new InxmailPostCustomerRegistrationPlugin(),
 ...
 ];
 }
 ```

## The customer asked to reset password event

Inxmail module has `\SprykerEco\Zed\Inxmail\Communication\Plugin\Customer\InxmailCustomerRestorePasswordMailTypePlugin`. This plugin implements `MailTypePluginInterface` and can be used in `\Pyz\Zed\Mail\MailDependencyProvider::provideBusinessLayerDependencies`

```php
 ...
 use \SprykerEco\Zed\Inxmail\Communication\Plugin\Customer\InxmailCustomerRestorePasswordMailTypePlugin;
 ...

 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Kernel\Container
 */
 public function provideBusinessLayerDependencies(Container $container)
 {
 $container = parent::provideBusinessLayerDependencies($container);

 $container->extend(self::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
 $mailCollection
 ...
 ->add(new InxmailCustomerRestorePasswordMailTypePlugin())
 ...

 return $mailCollection;
 });

 ...

 return $container;
 }
 ```
