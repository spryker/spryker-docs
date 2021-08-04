---
title: Shop Guide - Company Account
originalLink: https://documentation.spryker.com/v2/docs/company-account-shop-guide
redirect_from:
  - /v2/docs/company-account-shop-guide
  - /v2/docs/en/company-account-shop-guide
---



Company Account Overview page allows your shop owner to manage the company in the shop application.

To open the Company Account page, go to the header of the shop application → Name of your company → Overview.

![Company account header](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Company+Account/company-account-header.png){height="" width=""}


## Graphic User Interface

![Company Account GUI](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Company+Account/company-account-gui.png){height="" width=""}

The *Company Overview* page consists of the following elements:

| # | Element | Description |
|---|---|---|
|  **1** |  **Company Account menu** | Use this menu to manage your Company: Overview, Users, Business Units, Roles. |
|  **2** |  **Company Name** | Displays the name of the company. |
|  **3** |  **Company Address** | Displays the address your company has. |

## Creating a New Company

To create a Company in the web-shop, go to `/company/register` and register a company.

![Register a company](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Company+Account/register-company.png){height="" width=""}

Fill in the required (*) fields to complete the registration.

After the company has been registered, it should be approved in the [Back Office](https://documentation.spryker.com/v2/docs/managing-companies#approving-and-activating-a-company) to continue building the hierarchy.

Once the company is approved, a Company Administrator can go to `/company/overview` page and create (and then also edit and delete) users, addresses, roles and business roles.

{% info_block infoBox %}
A Company Administrator needs to log out and then log in to refresh the changes.
{% endinfo_block %}
Don't forget to check out the video tutorial on setting up [Company](/docs/scos/dev/features/201903.0/company-account-management/company-account-overview/company-account) Structure in Spryker [B2B Demo Shop](https://documentation.spryker.com/v2/docs/demoshops#b2b-demo-shop):

<iframe src="https://fast.wistia.net/embed/iframe/qkdgkeannb" title="How to set up Company Structure in Spryker" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="589" height="315"></iframe>
<!-- Last review date: Mar 18, 2019 -->
