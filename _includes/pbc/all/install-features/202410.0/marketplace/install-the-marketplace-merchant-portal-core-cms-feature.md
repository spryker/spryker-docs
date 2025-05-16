This document describes how to install the Marketplace Merchant Portal Core + CMS feature.

## Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| -------------------- | ---------- | ---------|
| Spryker Core         | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| CMS      | {{page.version}} | [Install the Spryker CMS feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cms-feature.html)
| Marketplace Merchant Portal Core | {{page.version}} | [Install the Marketplace Merchant Portal Core feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)

## 1) Create merchant restore password email templates

**src/Pyz/Zed/MerchantUserPasswordResetMail/Presentation/Mail/merchant_restore_password.html.twig**

```twig
{% raw %}{{ renderCmsBlockAsTwig({% endraw %}
'merchant_restore_password--html',
constant('APPLICATION_STORE'),
mail.locale.localeName,
{% raw %}{mail: mail}) \}\}{% endraw %}
```

**src/Pyz/Zed/MerchantUserPasswordResetMail/Presentation/Mail/merchant_restore_password.text.twig**

```twig
{% raw %}{{ renderCmsBlockAsTwig({% endraw %}
'merchant_restore_password--text',
constant('APPLICATION_STORE'),
mail.locale.localeName,
{% raw %}{mail: mail}) \}\}{% endraw %}
```

## 2) Import data

You can import and enable CMS blocks as described below or do it in the Back Office.

1. Prepare in import file using the following example:

<details>
  <summary>data/import/common/common/cms_block.csv</summary>

```csv
block_key,block_name,template_name,template_path,active,placeholder.title.de_DE,placeholder.title.en_US,placeholder.description.de_DE,placeholder.description.en_US,placeholder.link.de_DE,placeholder.link.en_US,placeholder.content.de_DE,placeholder.content.en_US
cms-block-email--merchant_restore_password--html,merchant_restore_password--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"">   <!--[if gte mso 9]>   <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"">   <![endif]-->   <tbody class=""sprykerBoxedTextBlockOuter"">     <tr>       <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">         <!--[if gte mso 9]>         <td align=""center"" valign=""top"" "">         <![endif]-->         <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left"">           <tbody>             <tr>               <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">                 <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0"">                   <tbody>                     <tr>                       <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;"" valign=""top"">                         <div style=""margin-bottom: 18px;""><img src=""https://mcusercontent.com/30fe9351d1b2906f35382f223/images/05a16670-0886-4fcb-8b0a-85d81f972554.png"" style=""border-image: none 100% / 1 / 0 stretch;width:80px;height: 80px;margin: 0px;border: 0;outline: none;text-decoration: non=e;-ms-interpolation-mode: bicubic;"" width=""80"" height=""80""></div>                         <h1 style=""text-align: center;display: block;margin: 0;padding: 0;color: #8F8F8F;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: lighter;line-height: 125%;letter-spacing: normal;"">                           <span style=""font-family:helvetica,arial,verdana,sans-serif;font-size:22px"">{{ 'mail.trans.common.hello_for_first_name' | trans }} {{ mail.user.firstName }} {{ mail.user.lastName}},</span>                         </h1>                         <h1 style=""text-align: center;display: block;margin: 10px 0 0 0;padding: 0;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">                           <span style=""font-family:helvetica,arial,verdana,sans-serif;font-size:22px""><strong>{{ 'mail.trans.merchant.restore_password.title' | trans }}</strong></span>                         </h1>                         <p style=""text-align: center;color:#4A4A4A;font-size: 15px;margin: 10px auto;line-height: 150%;"">{{ 'mail.trans.customer_restore_password.subtitle' | trans }}</p>                       </td>                     </tr>                     <tr>                       <td style=""padding-top: 0;padding-right: 18px;padding-bottom: 36px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center"">                         <table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse: separate !important;border-radius: 2px;background-color: #1EBEA0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" cellspacing=""0"" cellpadding=""0"" border=""0"">                           <tbody>                             <tr>                               <td class=""sprykerButtonContent"" style=""font-family: Helvetica, Helvetica, Arial, Verdana, sans-serif;font-size: 14px;padding: 13px 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""middle"" align=""center"">                                 <a class=""sprykerButton"" href=""{{ mail.resetPasswordLink }}"" target=""_blank"" style=""font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;"">{{ 'mail.trans.customer_restore_password.change_password' | trans }}</a>                               </td>                             </tr>                           </tbody>                         </table>                       </td>                     </tr>                   </tbody>                 </table>               </td>             </tr>           </tbody>         </table>         <!--[if gte mso 9]>         </td>         <![endif]-->         <!--[if gte mso 9]>         </tr>         </table>         <![endif]-->       </td>     </tr>   </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE --> ","<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"">   <!--[if gte mso 9]>   <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"">   <![endif]-->   <tbody class=""sprykerBoxedTextBlockOuter"">     <tr>       <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">         <!--[if gte mso 9]>         <td align=""center"" valign=""top"" "">         <![endif]-->         <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left"">           <tbody>             <tr>               <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">                 <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0"">                   <tbody>                     <tr>                       <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;"" valign=""top"">                         <div style=""margin-bottom: 18px;""><img src=""https://mcusercontent.com/30fe9351d1b2906f35382f223/images/05a16670-0886-4fcb-8b0a-85d81f972554.png"" style=""border-image: none 100% / 1 / 0 stretch;width:80px;height: 80px;margin: 0px;border: 0;outline: none;text-decoration: non=e;-ms-interpolation-mode: bicubic;"" width=""80"" height=""80""></div>                         <h1 style=""text-align: center;display: block;margin: 0;padding: 0;color: #8F8F8F;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: lighter;line-height: 125%;letter-spacing: normal;"">                           <span style=""font-family:helvetica,arial,verdana,sans-serif;font-size:22px"">{{ 'mail.trans.common.hello_for_first_name' | trans }} {{ mail.user.firstName }} {{ mail.user.lastName}},</span>                         </h1>                         <h1 style=""text-align: center;display: block;margin: 10px 0 0 0;padding: 0;color: #202020;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">                           <span style=""font-family:helvetica,arial,verdana,sans-serif;font-size:22px""><strong>{{ 'mail.trans.merchant.restore_password.title' | trans }}</strong></span>                         </h1>                         <p style=""text-align: center;color:#4A4A4A;font-size: 15px;margin: 10px auto;line-height: 150%;"">{{ 'mail.trans.customer_restore_password.subtitle' | trans }}</p>                       </td>                     </tr>                     <tr>                       <td style=""padding-top: 0;padding-right: 18px;padding-bottom: 36px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center"">                         <table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse: separate !important;border-radius: 2px;background-color: #1EBEA0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" cellspacing=""0"" cellpadding=""0"" border=""0"">                           <tbody>                             <tr>                               <td class=""sprykerButtonContent"" style=""font-family: Helvetica, Helvetica, Arial, Verdana, sans-serif;font-size: 14px;padding: 13px 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""middle"" align=""center"">                                 <a class=""sprykerButton"" href=""{{ mail.resetPasswordLink }}"" target=""_blank"" style=""font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;"">{{ 'mail.trans.customer_restore_password.change_password' | trans }}</a>                               </td>                             </tr>                           </tbody>                         </table>                       </td>                     </tr>                   </tbody>                 </table>               </td>             </tr>           </tbody>         </table>         <!--[if gte mso 9]>         </td>         <![endif]-->         <!--[if gte mso 9]>         </tr>         </table>         <![endif]-->       </td>     </tr>   </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE --> "
cms-block-email--merchant_restore_password--text,merchant_restore_password--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,{{ 'mail.trans.common.hello_for_first_name' | trans }} {{ mail.user.firstName }} {{mail.user.lastName}} {{ 'mail.trans.merchant.restore_password.title' | trans }}  {{ 'mail.trans.restore_password.subtitle' | trans }}  {{ 'mail.trans.restore_password.change_password' | trans }} ({{ mail.resetPasswordLink }}) ,{{ 'mail.trans.common.hello_for_first_name' | trans }} {{ mail.user.firstName }} {{mail.user.lastName}} {{ 'mail.trans.merchant.restore_password.title' | trans }}  {{ 'mail.trans.restore_password.subtitle' | trans }}  {{ 'mail.trans.restore_password.change_password' | trans }} ({{ mail.resetPasswordLink }})
```

</details>

2. Import CMS blocks:

```bash
console data:import:cms-block
```

3. Prepare data import files per store to enable CMS blocks:

**data/import/common/AT/cms_block_store.csv**

```csv
block_key,store_name
cms-block-email--merchant_restore_password--html,AT
cms-block-email--merchant_restore_password--text,AT
```

**data/import/common/DE/cms_block_store.csv**

```csv
block_key,store_name
cms-block-email--merchant_restore_password--html,DE
cms-block-email--merchant_restore_password--text,DE
```

**data/import/common/US/cms_block_store.csv**

```csv
block_key,store_name
cms-block-email--merchant_restore_password--html,US
cms-block-email--merchant_restore_password--text,US
```

4. Import CMS blocks per store:

```bash
console data:import:cms-block-store
```

{% info_block warningBox "Verification" %}

Make sure that the imported data has been added to the following database tables:

- `spy_cms_block`
- `spy_cms_block_store`

{% endinfo_block %}
