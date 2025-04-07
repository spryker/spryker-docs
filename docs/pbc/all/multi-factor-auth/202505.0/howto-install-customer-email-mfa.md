---
title: How to Install Customer Email Multi-Factor Authentication Method
description: Learn how to install and configure customer email multi-factor authentication in Spryker.
template: howto-guide-template
last_updated: Mar 6, 2025
---

This document describes how to install and configure customer email Multi-Factor Authentication (MFA) in Spryker.
Follow the link to the [Multi-Factor Authentication feature overview](/docs/pbc/all/multi-factor-auth/{{site.version}}/multi-factor-auth.html) to learn more about the feature and its benefits.

## What is Email Multi-Factor Authentication?

Email Multi-Factor Authentication (MFA) is a security mechanism that requires users to verify their identity through an authentication code sent to their registered email. This adds an extra layer of protection beyond just a password.

### How It Works?

1.	The user attempts to log in or perform a protected action.
2.	A one-time code is sent to their email.
3.	The user enters the received code to complete authentication.

This method enhances security by ensuring that even if a password is compromised, access to the account still requires possession of the registered email.

## Prerequisites

To start the integration, make sure that the following [Install the Multi-Factor Authentication Feature](/docs/pbc/all/multi-factor-auth/{{site.version}}/install-and-upgrade/install-multi-factor-auth.html) has been installed in your project.

## 1) Set up the transfer objects

Run the following command to generate the transfer objects:

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

Append glossary according to your configuration:

<details>
<summary>data/import/common/common/glossary.csv</summary>

```csv
customer.multi_factor_auth.email.text,"To proceed with your request, please use the following verification code: %code%. If you did not request this code, please ignore this email.",en_US
customer.multi_factor_auth.email.text,"Um mit Ihrer Anfrage fortzufahren, verwenden Sie bitte den folgenden Bestätigungscode: %code%. Wenn Sie diesen Code nicht angefordert haben, ignorieren Sie bitte diese E-Mail.",de_DE
mail.customer.multi_factor_auth.email.subject,"Verification Code for Secure Access",en_US
mail.customer.multi_factor_auth.email.subject,"Bestätigungscode für sicheren Zugriff",de_DE
```

</details>

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

## 3) Import data

Append the following data to ensure the correct email templates for each store are used when sending MFA codes: 

<details>
<summary>data/import/common/AT/cms_block_store.csv</summary>

```csv
cms-block-email--customer_multi_factor_auth_email--html,AT
cms-block-email--customer_multi_factor_auth_email--text,AT
```
</details>

<details>
<summary>data/import/common/DE/cms_block_store.csv</summary>

```csv
cms-block-email--customer_multi_factor_auth_email--html,DE
cms-block-email--customer_multi_factor_auth_email--text,DE
```
</details>

<details>
<summary>data/import/common/US/cms_block_store.csv</summary>

```csv
cms-block-email--customer_multi_factor_auth_email--html,US
cms-block-email--customer_multi_factor_auth_email--text,US
```
</details>

<details>
<summary>data/import/common/common/cms_block.csv</summary>

```csv
cms-block-email--customer_multi_factor_auth_email--html,customer_multi_factor_auth_email--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"">   <!--[if gte mso 9]>   <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"">   <![endif]-->   <tbody class=""sprykerBoxedTextBlockOuter"">     <tr>       <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">         <!--[if gte mso 9]>         <td align=""center"" valign=""top"" "">         <![endif]-->         <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left"">           <tbody>             <tr>               <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">                 <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0"">                   <tbody>                     <tr>                       <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top"">                         <h1 style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;""><br>                           <span style=""font-family:helvetica,arial,verdana,sans-serif;font-size:22px""><strong>{{ 'mail.customer.multi_factor_auth.email.subject' | trans }}</strong></span></h1>                       </td>                     </tr>                   </tbody>                 </table>               </td>             </tr>           </tbody>         </table>         <!--[if gte mso 9]>         </td>         <![endif]-->         <!--[if gte mso 9]>         </tr>         </table>         <![endif]-->       </td>     </tr>   </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"">   <tbody class=""sprykerTextBlockOuter"">     <tr>       <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top"">         <!--[if mso]>         <table align=""left"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100%;"">         <tr>         <![endif]-->         <!--[if mso]>         <td valign=""top"" width=""600"" style=""width:600px;"">         <![endif]-->         <table style=""max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left"">           <tbody>             <tr>               <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;"" valign=""top"">                 <div style=""text-align: center;""><span style=""font-family:helvetica,arial,verdana,sans-serif"">{{ 'customer.multi_factor_auth.email.text' | trans({'%code%': mail.multiFactorAuth.multiFactorAuthCode.code}) }} <br>                 </div>               </td>             </tr>             <tr>               <td style=""padding-top: 0;padding-right: 18px;padding-bottom: 36px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center"">      </td>             </tr>           </tbody>         </table>         <!--[if mso]>         </td>         <![endif]-->         <!--[if mso]>         </tr>         </table>         <![endif]-->       </td>     </tr>   </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE --> ","<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"">   <!--[if gte mso 9]>   <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"">   <![endif]-->   <tbody class=""sprykerBoxedTextBlockOuter"">     <tr>       <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">         <!--[if gte mso 9]>         <td align=""center"" valign=""top"" "">         <![endif]-->         <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left"">           <tbody>             <tr>               <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">                 <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0"">                   <tbody>                     <tr>                       <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top"">                         <h1 style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;""><br>                           <span style=""font-family:helvetica,arial,verdana,sans-serif;font-size:22px""><strong>{{ 'mail.customer.multi_factor_auth.email.subject' | trans }}</strong></span></h1>                       </td>                     </tr>                   </tbody>                 </table>               </td>             </tr>           </tbody>         </table>         <!--[if gte mso 9]>         </td>         <![endif]-->         <!--[if gte mso 9]>         </tr>         </table>         <![endif]-->       </td>     </tr>   </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"">   <tbody class=""sprykerTextBlockOuter"">     <tr>       <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top"">         <!--[if mso]>         <table align=""left"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100%;"">         <tr>         <![endif]-->         <!--[if mso]>         <td valign=""top"" width=""600"" style=""width:600px;"">         <![endif]-->         <table style=""max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left"">           <tbody>             <tr>               <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;"" valign=""top"">                 <div style=""text-align: center;""><span style=""font-family:helvetica,arial,verdana,sans-serif"">{{ 'customer.multi_factor_auth.email.text' | trans({'%code%': mail.multiFactorAuth.multiFactorAuthCode.code}) }} <br>           </div>               </td>             </tr>             <tr>               <td style=""padding-top: 0;padding-right: 18px;padding-bottom: 36px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center"">         </td>             </tr>           </tbody>         </table>         <!--[if mso]>         </td>         <![endif]-->         <!--[if mso]>         </tr>         </table>         <![endif]-->       </td>     </tr>   </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE --> "
cms-block-email--customer_multi_factor_auth_email--text,customer_multi_factor_auth_email--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'mail.customer.multi_factor_auth.email.subject' | trans }}  {{ 'customer.multi_factor_auth.email.text' | trans({'%code%': mail.multiFactorAuth.multiFactorAuthCode.code}) }}","{{ 'mail.customer.multi_factor_auth.email.subject' | trans }}  {{ 'customer.multi_factor_auth.email.text' | trans({'%code%': mail.multiFactorAuth.multiFactorAuthCode.code}) }}"
```
</details>

## 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                            | SPECIFICATION                                                                                                                                 | PREREQUISITES | NAMESPACE                                                      |
|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------|
| CustomerEmailMultiFactorAuthPlugin                | Handles email-based MFA authentication allowing customers to verify their identity via an authentication code sent to their registered email. |               | Spryker\Yves\MultiFactorAuth\Plugin\Factors\Email              |
| CustomerEmailMultiFactorAuthMailTypeBuilderPlugin | Builds and processes the email template for sending MFA codes to customers.                                                                   |               | Spryker\Zed\MultiFactorAuth\Communication\Plugin\Mail\Customer |

<details>
<summary>src/Pyz/Yves/MultiFactorAuth/MultiFactorAuthDependencyProvider.php</summary>

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
</details>

<details>
<summary>src/Pyz/Zed/Mail/MailDependencyProvider.php</summary>

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
</details>

{% info_block warningBox "Verification" %}

## Verification

After completing all the integration steps, follow these steps to verify that Multi-Factor Authentication (MFA) via email is working correctly:

### Verify Email MFA Setup
1. Log in to the Yves application as a customer.
2. Go to the MFA Setup Page:
 - Navigate to https://yves.mysprykershop.com/multi-factor-auth/set.
 - Ensure that the **Set up Multi-Factor Authentication** menu item is visible in the customer profile sidebar.
3. Check Available MFA Methods:
 - On the MFA setup page, verify that **Email** appears in the list of available authentication methods.
4. Activate Email MFA:
 - Click the **Activate** button for **Email Multi-Factor Authentication**.
 - The system should send a verification code to your registered email.
 - Enter the received code in the confirmation form.
 - If the code is valid, **Email MFA** should be successfully activated.

### Test Multi-Factor Authentication During Login
1. Log out and attempt to log in with an account where Email MFA is enabled.
2. After entering valid credentials, you should be prompted to enter an MFA code.
3. Check your email for the authentication code and enter it.
4. If successful, you should be redirected to the dashboard.

### Test Multi-Factor Authentication for Profile Actions
1. Try updating the email address, password, or deleting the account in the customer profile.
2. The system should prompt for MFA validation before allowing the action.

### Check the Grace Period
1. After entering a valid MFA code, attempt another MFA-protected action within the configured grace period.
2. If the grace period is working correctly, the system should not prompt for MFA again.
3. After the grace period expires, MFA should be required again.

{% endinfo_block %}
