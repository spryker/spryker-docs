---
title: Security release notes 202503.0
description: Security updates released for version 202503.0
last_updated: Mar 24, 2025
template: concept-topic-template
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Server-Side Template Injection (SSTI) vulnerability could lead to Remote Code Execution (RCE)

A Server-Side Template Injection (SSTI) vulnerability in the CMS page editing feature could lead to Remote Code Execution (RCE). High-privileged users were able to inject and execute arbitrary Twig template code, potentially exposing sensitive server data, including application secrets, credentials, and configurations.


### Affected modules

`spryker/twig`: 1.0.0 - 3.26.0

### Fix the vulnerability

Update the `spryker/twig` module to version 3.27.0 or higher:

```bash
composer update spryker/twig
composer show spryker/twig # Verify the version
```

## CSRF leading to privilege escalation via manage users for a role

The company user role assign and unassign functionality lacked Cross-Site Request Forgery (CSRF) validation, potentially allowing an attacker to trick an admin into changing user roles without authorization.


### Affected modules

`spryker-shop/company-page`: 1.0.0 - 2.33.0

### Fix the vulnerability

Update the `spryker-shop/company-page` module to version 2.34.0 or higher:

```bash
composer update spryker-shop/company-page # Udpate package
composer show spryker-shop/company-page # Verify the version
```

## Email change verification on Storefront

On the Storefront, a user could change their email address without verifying the new email address. With this change, a user now needs to verify the new email address and confirm the change using the old email address.


### Affected modules

* `spryker-shop/customer-page`: 1.0.0 - 2.58.0
* `spryker/customer`: 1.0.0 - 7.66.0
* `spryker/customer-extension`: 1.0.0 - 1.5.0

### Fix the vulnerability

1. Update the modules to the specified version or higher:


| MODULE | VERSION |
| - | - |
| `spryker-shop/customer-page`  | 2.59.0 |
| `spryker/customer`  | 7.67.0 |
| `spryker/customer-extension`  | 1.6.0 |

```bash
composer require spryker/user-merchant-portal-gui:"~1.0.0"
composer update spryker-shop/customer-page spryker/customer spryker/customer-extension
```

2. Update the data import files:

**data/import/common/STORE_NAME/cms_block_store.cs**
```csv
cms-block-email--customer_email_change_verification--html,STORE_NAME
cms-block-email--customer_email_change_verification--text,STORE_NAME
cms-block-email--customer_email_change_notification--html,STORE_NAME
cms-block-email--customer_email_change_notification--text,STORE_NAME
```

<details>
  <summary>data/import/common/common/cms_block.csv</summary>
  
```csv
cms-block-email--customer_email_change_verification--html,customer_email_change_verification--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <!--[if gte mso 9]> <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%""> <![endif]--> <tbody class=""sprykerBoxedTextBlockOuter""> <tr> <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <!--[if gte mso 9]> <td align=""center"" valign=""top"" ""> <![endif]--> <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""> <tbody> <tr> <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0""> <tbody> <tr> <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top""> <h1 style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 22px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">{{ 'mail.customer.customer_email_change_verification.text' | trans }} <a href=""{{ mail.verificationLink }}"">link</a></h1> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if gte mso 9]> </td> <![endif]--> <!--[if gte mso 9]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <tbody class=""sprykerTextBlockOuter""> <tr> <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top""><br> <!--[if mso]> </td> <![endif]--> <!--[if mso]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE -->","<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <!--[if gte mso 9]> <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%""> <![endif]--> <tbody class=""sprykerBoxedTextBlockOuter""> <tr> <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <!--[if gte mso 9]> <td align=""center"" valign=""top"" ""> <![endif]--> <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""> <tbody> <tr> <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0""> <tbody> <tr> <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top""> <h1 style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 22px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">{{ 'mail.customer.customer_email_change_verification.text' | trans }} <a href=""{{ mail.verificationLink }}"">link</a></h1> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if gte mso 9]> </td> <![endif]--> <!--[if gte mso 9]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <tbody class=""sprykerTextBlockOuter""> <tr> <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top""><br> <!--[if mso]> </td> <![endif]--> <!--[if mso]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE -->"
cms-block-email--customer_email_change_notification--html,customer_email_change_notification--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <!--[if gte mso 9]> <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%""> <![endif]--> <tbody class=""sprykerBoxedTextBlockOuter""> <tr> <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <!--[if gte mso 9]> <td align=""center"" valign=""top"" ""> <![endif]--> <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""> <tbody> <tr> <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0""> <tbody> <tr> <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top""> <p style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">{{ 'mail.customer.customer_email_change_notification.text' | trans }}</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if gte mso 9]> </td> <![endif]--> <!--[if gte mso 9]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <tbody class=""sprykerTextBlockOuter""> <tr> <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top""><br> <!--[if mso]> </td> <![endif]--> <!--[if mso]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE -->","<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <!--[if gte mso 9]> <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%""> <![endif]--> <tbody class=""sprykerBoxedTextBlockOuter""> <tr> <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <!--[if gte mso 9]> <td align=""center"" valign=""top"" ""> <![endif]--> <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""> <tbody> <tr> <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0""> <tbody> <tr> <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top""> <p style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">{{ 'mail.customer.customer_email_change_notification.text' | trans }}</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if gte mso 9]> </td> <![endif]--> <!--[if gte mso 9]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <tbody class=""sprykerTextBlockOuter""> <tr> <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top""><br> <!--[if mso]> </td> <![endif]--> <!--[if mso]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE -->"
cms-block-email--customer_email_change_verification--text,customer_email_change_verification--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'mail.customer.customer_email_change_verification.text' | trans }} <a href=""{{ mail.verificationLink }}"">link</a>","{{ 'mail.customer.customer_email_change_verification.text' | trans }} <a href=""{{ mail.verificationLink }}"">link</a>"
cms-block-email--customer_email_change_notification--text,customer_email_change_notification--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'mail.customer.customer_email_change_notification.text' | trans }}","{{ 'mail.customer.customer_email_change_notification.text' | trans }}"
```

</details>


3. Update the glossary:

<details>
  <summary>data/import/common/common/glossary.csv</summary>

```csv
customer.data_change_request.email_change.success,"Your email address was successfully changed.",en_US
customer.data_change_request.email_change.success,"Ihre E-Mail-Adresse wurde erfolgreich geändert.",de_DE
customer.data_change_request.email_change.requested,"You requested to change your e-mail to `%newEmail%` confirm it by clicking the verification link in the e-mail sent to it.",en_US
customer.data_change_request.email_change.requested,"Sie haben eine Änderung Ihrer E-Mail-Adresse zu `%newEmail%` angefordert. Bestätigen Sie dies, indem Sie auf den Verifizierungslink in der E-Mail klicken, die an diese Adresse gesendet wurde.",de_DE
customer.data_change_request.email_change.error,"Something went wrong. Please try again.",en_US
customer.data_change_request.email_change.error,"Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",de_DE
customer.data_change_request.invalid,"No valid data change request found.",en_US
customer.data_change_request.invalid,"Keine gültige Datenänderungsanforderung gefunden.",de_DE
mail.customer.customer_email_change_verification.text,"Please validate your email address by clicking the",en_US
mail.customer.customer_email_change_verification.text,"Bitte bestätigen Sie Ihre E-Mail-Adresse, indem Sie auf den",de_DE
mail.customer.customer_email_change_notification.text,"We would like to inform you that the email address associated with your account has been successfully changed. If you made this change, no further action is required. However, if you did not request this change,  contact the store owner immediately to secure your account.",en_US
mail.customer.customer_email_change_notification.text,"Wir möchten Sie darüber informieren, dass die mit Ihrem Konto verknüpfte E-Mail-Adresse erfolgreich geändert wurde. Wenn Sie diese Änderung vorgenommen haben, ist keine weitere Aktion erforderlich. Wenn Sie diese Änderung jedoch nicht angefordert haben, wenden Sie sich bitte umgehend an den Shop-Besitzer, um Ihr Konto zu sichern.",de_DE
mail.customer.customer_email_change_notification.subject,Your Email Address Has Been Changed,en_US
mail.customer.customer_email_change_notification.subject,Ihre E-Mail-Adresse wurde geändert,de_DE
mail.customer.customer_email_change_verification.subject,Validate your email address,en_US
mail.customer.customer_email_change_verification.subject,Valideer uw e-mailadre,de_DE
customer.change_customer_email_mail_sent,"Almost there! We send you an email to validate your email address. Please confirm it to be able to log in.",en_US
customer.change_customer_email_mail_sent,"Fast dort! Wir senden Ihnen eine E-Mail, um Ihre E-Mail-Adresse zu bestätigen. Bitte bestätigen Sie dies, um sich anmelden zu können.",de_DE
```

</details>

4. Register `CustomerDataChangeRequestRouteProviderPlugin` in `RouterDependencyProvider`:

```bash
namespace Pyz\Yves\Router;

use Spryker\Yves\CustomerDataChangeRequest\Plugin\Router\CustomerDataChangeRequestRouteProviderPlugin;
use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
...
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            ...
            new CustomerDataChangeRequestRouteProviderPlugin(),
        ];
    }
...
```

5. Register `CustomerEmailChangeRequestWidget` in `ShopApplicationDependencyProvider`:

```bash
namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\CustomerDataChangeRequest\Widget\CustomerEmailChangeRequestWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
...
    /**
     * @phpstan-return array<class-string<\Spryker\Yves\Kernel\Widget\AbstractWidget>>
     *
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ...
            CustomerEmailChangeRequestWidget::class,
        ];
    }
...
```

6. Register `CustomerEmailChangeVerificationMailTypePlugin` and `CustomerEmailChangeNotificationMailTypePlugin` in `MailDependencyProvider`:

```bash
namespace Pyz\Zed\Mail;

use Spryker\Zed\CustomerDataChangeRequest\Communication\Plugin\Mail\CustomerEmailChangeNotificationMailTypePlugin;
use Spryker\Zed\CustomerDataChangeRequest\Communication\Plugin\Mail\CustomerEmailChangeVerificationMailTypePlugin;
use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
...
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        return [
            ...
            new CustomerEmailChangeVerificationMailTypePlugin(),
            new CustomerEmailChangeNotificationMailTypePlugin(),
        ];
    }
...
```

7. Register `EmailChangeRequestSendVerificationCustomerPreUpdatePlugin` in `CustomerDependencyProvider`:

```bash
namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Zed\CustomerDataChangeRequest\Communication\Plugin\Customer\EmailChangeRequestSendVerificationCustomerPreUpdatePlugin;

class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
...
    /**
     * @return array<\Spryker\Zed\CustomerDataChangeRequest\Communication\Plugin\Customer\EmailChangeRequestSendVerificationCustomerPreUpdatePlugin>
     */
    protected function getCustomerPreUpdatePlugins(): array
    {
        return [
            ...
            new EmailChangeRequestSendVerificationCustomerPreUpdatePlugin(),
        ];
    }
...
```


## Hardcoded Remember Me secret

A secret related to the "Remember Me" functionality was found to be hardcoded in the code, violating security best practices.

### Affected modules

`spryker/docker-sdk`: 1.0.0 - 1.63.0

### Fix the vulnerability

1. Update the `spryker/docker-sdk` module to version 1.64.0 or higher.

2. Update `.git.docker` with hash commit `ac17ea980d151c6b4dd83b7093c0c05a9205c244` or higher.

3. Add `CUSTOMER_REMEMBER_ME_SECRET` environment variable in the cloud. For instructions, see [Add variables in the Parameter Store](/docs/ca/dev/add-variables-in-the-parameter-store.html).

4. Update `config/Shared/config_default.php`:

```php
$config[CustomerPageConstants::CUSTOMER_REMEMBER_ME_SECRET] = getenv('CUSTOMER_REMEMBER_ME_SECRET');
```





























