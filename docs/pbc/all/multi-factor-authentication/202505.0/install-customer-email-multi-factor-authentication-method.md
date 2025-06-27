---
title: Install customer email Multi-Factor Authentication method 
description: Learn how to install and configure customer email multi-factor authentication in Spryker.
template: howto-guide-template
last_updated: Mar 6, 2025
---

Email Multi-Factor Authentication (MFA) is a security mechanism that requires users to verify their identity through an authentication code sent to their registered email. This document describes how to install and configure email MFA.

For more information about MFA, see [Multi-Factor Authentication feature overview](/docs/pbc/all/multi-factor-authentication/{{page.version}}/multi-factor-authentication.html).


## Email multi-factor authentication mechanism

1. The user attempts to log in or perform a protected action.
2. A one-time code is sent to their email.
3. The user enters the received code to complete authentication.

## Prerequisites

[Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html)

## 1) Set up transfer objects

Generate transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                          | TYPE     | EVENT   | PATH                                                                    |
|-----------------------------------|----------|---------|-------------------------------------------------------------------------|
| Mail.multiFactorAuth              | property | added   | src/Generated/Shared/Transfer/MailTransfer                              |

{% endinfo_block %}

## 2) Add translations

1. Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```csv
customer.multi_factor_auth.email.text,"To proceed with your request, please use the following verification code: %code%. If you did not request this code, please ignore this email.",en_US
customer.multi_factor_auth.email.text,"Um mit Ihrer Anfrage fortzufahren, verwenden Sie bitte den folgenden Bestätigungscode: %code%. Wenn Sie diesen Code nicht angefordert haben, ignorieren Sie bitte diese E-Mail.",de_DE
mail.customer.multi_factor_auth.email.subject,"Verification Code for Secure Access",en_US
mail.customer.multi_factor_auth.email.subject,"Bestätigungscode für sicheren Zugriff",de_DE
```



2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

## 3) Import data

Import MFA email templates per store:

data/import/common/AT/cms_block_store.csv

```csv
cms-block-email--customer_multi_factor_auth_email--html,AT
cms-block-email--customer_multi_factor_auth_email--text,AT
```



data/import/common/DE/cms_block_store.csv

```csv
cms-block-email--customer_multi_factor_auth_email--html,DE
cms-block-email--customer_multi_factor_auth_email--text,DE
```



data/import/common/US/cms_block_store.csv

```csv
cms-block-email--customer_multi_factor_auth_email--html,US
cms-block-email--customer_multi_factor_auth_email--text,US
```

<details>
<summary>data/import/common/common/cms_block.csv</summary>

```csv
{% raw %}
cms-block-email--customer_multi_factor_auth_email--html,customer_multi_factor_auth_email--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"">   <!--[if gte mso 9]>   <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"">   <![endif]-->   <tbody class=""sprykerBoxedTextBlockOuter"">     <tr>       <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">         <!--[if gte mso 9]>         <td align=""center"" valign=""top"" "">         <![endif]-->         <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left"">           <tbody>             <tr>               <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">                 <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0"">                   <tbody>                     <tr>                       <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top"">                         <h1 style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;""><br>                           <span style=""font-family:helvetica,arial,verdana,sans-serif;font-size:22px""><strong>{{ 'mail.customer.multi_factor_auth.email.subject' | trans }}</strong></span></h1>                       </td>                     </tr>                   </tbody>                 </table>               </td>             </tr>           </tbody>         </table>         <!--[if gte mso 9]>         </td>         <![endif]-->         <!--[if gte mso 9]>         </tr>         </table>         <![endif]-->       </td>     </tr>   </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"">   <tbody class=""sprykerTextBlockOuter"">     <tr>       <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top"">         <!--[if mso]>         <table align=""left"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100%;"">         <tr>         <![endif]-->         <!--[if mso]>         <td valign=""top"" width=""600"" style=""width:600px;"">         <![endif]-->         <table style=""max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left"">           <tbody>             <tr>               <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;"" valign=""top"">                 <div style=""text-align: center;""><span style=""font-family:helvetica,arial,verdana,sans-serif"">{{ 'customer.multi_factor_auth.email.text' | trans({'%code%': mail.multiFactorAuth.multiFactorAuthCode.code}) }} <br>                 </div>               </td>             </tr>             <tr>               <td style=""padding-top: 0;padding-right: 18px;padding-bottom: 36px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center"">      </td>             </tr>           </tbody>         </table>         <!--[if mso]>         </td>         <![endif]-->         <!--[if mso]>         </tr>         </table>         <![endif]-->       </td>     </tr>   </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE --> ","<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"">   <!--[if gte mso 9]>   <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"">   <![endif]-->   <tbody class=""sprykerBoxedTextBlockOuter"">     <tr>       <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">         <!--[if gte mso 9]>         <td align=""center"" valign=""top"" "">         <![endif]-->         <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left"">           <tbody>             <tr>               <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">                 <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0"">                   <tbody>                     <tr>                       <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top"">                         <h1 style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;""><br>                           <span style=""font-family:helvetica,arial,verdana,sans-serif;font-size:22px""><strong>{{ 'mail.customer.multi_factor_auth.email.subject' | trans }}</strong></span></h1>                       </td>                     </tr>                   </tbody>                 </table>               </td>             </tr>           </tbody>         </table>         <!--[if gte mso 9]>         </td>         <![endif]-->         <!--[if gte mso 9]>         </tr>         </table>         <![endif]-->       </td>     </tr>   </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"">   <tbody class=""sprykerTextBlockOuter"">     <tr>       <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top"">         <!--[if mso]>         <table align=""left"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100%;"">         <tr>         <![endif]-->         <!--[if mso]>         <td valign=""top"" width=""600"" style=""width:600px;"">         <![endif]-->         <table style=""max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left"">           <tbody>             <tr>               <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;"" valign=""top"">                 <div style=""text-align: center;""><span style=""font-family:helvetica,arial,verdana,sans-serif"">{{ 'customer.multi_factor_auth.email.text' | trans({'%code%': mail.multiFactorAuth.multiFactorAuthCode.code}) }} <br>           </div>               </td>             </tr>             <tr>               <td style=""padding-top: 0;padding-right: 18px;padding-bottom: 36px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center"">         </td>             </tr>           </tbody>         </table>         <!--[if mso]>         </td>         <![endif]-->         <!--[if mso]>         </tr>         </table>         <![endif]-->       </td>     </tr>   </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE --> "
cms-block-email--customer_multi_factor_auth_email--text,customer_multi_factor_auth_email--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'mail.customer.multi_factor_auth.email.subject' | trans }}  {{ 'customer.multi_factor_auth.email.text' | trans({'%code%': mail.multiFactorAuth.multiFactorAuthCode.code}) }}","{{ 'mail.customer.multi_factor_auth.email.subject' | trans }}  {{ 'customer.multi_factor_auth.email.text' | trans({'%code%': mail.multiFactorAuth.multiFactorAuthCode.code}) }}"
{% endraw %}
```

</details>

## 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                            | SPECIFICATION                                                                                                                                 | PREREQUISITES | NAMESPACE                                                      |
|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------|
| CustomerEmailMultiFactorAuthPlugin                | Handles email-based MFA authentication, enabling customers to verify their identity via an authentication code sent to their registered email. |               | Spryker\Yves\MultiFactorAuth\Plugin\Factors\Email              |
| CustomerEmailMultiFactorAuthMailTypeBuilderPlugin | Builds and processes an email template for sending MFA codes to customers.                                                                   |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Mail\Customer |

src/Pyz/Yves/MultiFactorAuth/MultiFactorAuthDependencyProvider.php

```php
namespace Pyz\Yves\MultiFactorAuth;

use Spryker\Yves\MultiFactorAuth\MultiFactorAuthDependencyProvider as SprykerMultiFactorAuthDependencyProvider;
use Spryker\Yves\MultiFactorAuth\Plugin\Factors\Email\CustomerEmailMultiFactorAuthPlugin;

class MultiFactorAuthDependencyProvider extends SprykerMultiFactorAuthDependencyProvider
{
    protected function getCustomerMultiFactorAuthPlugins(): array
    {
        return [
            new CustomerEmailMultiFactorAuthPlugin(),
        ];
    }
} 
```


rc/Pyz/Zed/Mail/MailDependencyProvider.php

```php
namespace Pyz\Zed\Mail;

use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use Spryker\Zed\MultiFactorAuth\Communication\Plugin\Mail\Customer\CustomerEmailMultiFactorAuthMailTypeBuilderPlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    protected function getMailTypeBuilderPlugins(): array
    {
        return [
            new CustomerEmailMultiFactorAuthMailTypeBuilderPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

1. On the Storefront, go to the MFA setup page: `https://yves.mysprykershop.com/multi-factor-auth/set`. Make sure the following applies:
- The **Set up Multi-Factor Authentication** menu item is displayed in the customer profile navigation menu
- The **Email** authentication method is displayed in the list of available authentication methods
2. For **Email Multi-Factor Authentication**, click **Activate**.
 This sends a verification code to the customer's email address.
3. Enter the received code in the confirmation form.
 If the code is valid, Email MFA should be successfully activated.
4. Log out and attempt to log in with the account with Email MFA enabled.
  Make sure you're prompted to enter an MFA code.
5. Enter the code in the form.
  Make sure this logs you in successfully.
6. In the customer profile, try updating the email address, password, or deleting the account. Make sure the following applies:
- Completing the actions requires entering an MFA code
- You can perform several actions without entering a code within the configured grace period.

{% endinfo_block %}






























