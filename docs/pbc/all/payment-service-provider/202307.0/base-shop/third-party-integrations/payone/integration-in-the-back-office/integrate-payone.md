---
title: Integrate Payone
description: Learn how you can integrate the Payone app into your Spryker shop
template: howto-guide-template
last_updated: Oct 12, 2023
redirect_from:
  - /docs/pbc/all/payment-service-providers/payone/integrate-payone.html
  - /docs/pbc/all/payment-service-provider/202307.0/third-party-integrations/payone/integration-in-the-back-office/integrate-payone.html
---

To integrate Payone, follow these steps.

## Prerequisites

Before you can integrate Payone, make sure that your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

The Payone app requires the following Spryker modules:

* `spryker/message-broker: ^1.3.0`
* `spryker/message-broker-aws: ^1.3.2`
* `spryker/payment: ^5.10.0`
* `spryker/sales: ^11.32.0`
* `spryker/sales-return: ^1.4.0`
* `spryker-shop/checkout-page: ^3.21.0`
* `spryker-shop/payment-page: ^1.2.0`
* `spryker/oms: ^11.21.0`
* `spryker/sales-payment: ^1.2.0`

## 1. Connect Payone

1. In your store's Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Payone**.
   This takes you to the Payone app details page.
3. In the top right corner of the Payone app details page, click **Connect app**.
   This displays a message about the successful connection of the app to your SCCOS. The Payone app's status changes to *Connection pending*.   
4. Go to [Payone](https://www.payone.com/DE-en) and obtain the credentials.

   {% info_block infoBox "Info" %}

   It takes some time to obtain credentials from Payone because you have to go through a thorough vetting process by Payone, such as the "know your customer" (KYC) process before Payone verifies you.

   {% endinfo_block %}

## 2. Configure Payone

1. Go to your store's Back Office, to the Payone app details page.
2. In the top right corner of the Payone app details page, click **Configure**.
3. On the Payone app details page, fill in fields in the **Credentials** section.
   ![payone-app-detais](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-app-details.png)
4. Select **Payone Environment Mode**.
5. Enter your *Shop Name*. This name will be displayed on **Payment** page as a merchant label for whom to pay:
   ![payone-shop-name](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-shop-name.png)
6. Select one or more payment methods.
   ![payone-payment-methods](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-payment-methods.png)
7. Optional: To configure payment methods per store, click **Payment methods per store configuration** and select stores for the defined payment methods.
8. Click **Save**.

![configure-payone](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/payment-service-providers/payone/integrate-payone/configure-payone.png)

If the app was connected successfully, a corresponding message appears, and the app status changes to **Connected**. The payment methods you've selected in step 8, appear in **Administration&nbsp;<span aria-label="and then">></span>  Payment methods**:
![payone-credit-card](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-credit-card.png).

## 3. Add Payone domain to your allowlist

To enable Payone to redirect your customers to their 3D Secure page and later to your success page, you must add the ACP domain inside your **Content Security Policy** allowlist. To do that, change your `deploy.yml` file or your `config/Shared/config_default.php` file if changing the environment variable is not possible.

 In the `deploy.yml` file, introduce the required changes:

```yml
image:
  environment:
    SPRYKER_AOP_APPLICATION: '{
      "APP_DOMAINS": [
        "os.apps.aop.spryker.com",
        ...
      ],
      ...
    }'
```

Alternatively, you may add the domain to the allowlist from the `config/Shared/config_default.php` file. If you updated the `deploy.yml` file, this step can be ignored.

```php
$config[KernelConstants::DOMAIN_WHITELIST][] = 'os.apps.aop.spryker.com';
```

## Next steps

[Activate the added payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html)
