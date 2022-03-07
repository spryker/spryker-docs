---
title: Managing payment methods
description: Use the guide to view, update, activate, and assign to stores payment methods in the Back Office.
last_updated: Aug 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-payment-methods
originalArticleId: d0dc8732-295d-4072-8dc2-63f439feb324
redirect_from:
  - /2021080/docs/managing-payment-methods
  - /2021080/docs/en/managing-payment-methods
  - /docs/managing-payment-methods
  - /docs/en/managing-payment-methods
related:
  - title: Payments feature overview
    link: docs/scos/user/features/page.version/payments-feature-overview.html
---

The topic describes how to manage payment methods.

You can:
* View payment methods available on the Storefront.
* Edit payment methods: update payment method details, assign payment methods to store, and activate or deactivate payment methods.

## Prerequisites

To start working with payment methods, go to **Administration** > **Payment Methods**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Viewing payment methods

To view details of a payment method, in the *Actions* column, click **View** for the payment method. On the *View Payment Method: [Payment Method name]* page, you can see the following information:

* Payment method key
* Name of the payment method
* Payment provider
* Payment method status
* Availability of the payment method per store

For the reference information, see the [Reference information: Editing payment method pages](#reference-information-editing-payment-method-pages) section.

## Editing payment method details

To edit a payment method:

1. On the *Payment Methods* page, in the *Actions* column for the payment method you want to update, click **Edit** . This redirects you to the *Edit Payment Method [Payment Method Name]* page containing two tabs: *Configuration* and *Store relation*.
2. In the *Configuration* tab, update the availability status of the payment method under **Is the Payment Method active?**:
* Select the checkbox to make the payment method available in the *Payment* step during the checkout process.
* Clear the checkbox to make the payment method unavailable in the *Payment* step during the checkout process.

![Edit the payment method](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Payment+Management/Payment+Methods/Managing+Payment+Methods/edit-payment-method.png)

3. In the *Store relation* tab, select stores you want the payment method to be displayed in.

4. To apply the changes, click **Save**.

{% info_block warningBox "Note" %}

The payment method must be assigned to a store; otherwise, it won’t be displayed during the checkout process.

{% endinfo_block %}

### Reference information: Editing payment method pages

The following table describes the attributes you see, select, or enter while viewing or editing a payment method.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Payment Method Key | Unique identifier of the payment method defined in the database. |
| Name | Name of the payment method. |
| Payment Provider | Company that offers payment services. |
| Status | Indicates whether a payment method is displayed during the checkout process or not. |
| Available in store | Lists stores in which a payment method is available. |
| Is this Payment Method active? | Option to activate (make a payment method visible during the checkout process) or deactivate (make a payment method invisible during the checkout process) the payment method. |
