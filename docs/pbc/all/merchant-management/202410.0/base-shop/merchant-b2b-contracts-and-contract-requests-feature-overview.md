---
title: Merchant B2B Contracts and Contract Requests features overview
description: In the context of Spryker B2B eCommerce platform, there can be three key figures- marketplace owner, merchant, and buyer.
last_updated: Jul 22, 2021
template: concept-topic-template
redirect_from:
  - /docs/scos/user/features/201811.0/merchant-b2b-contracts/merchant-b2b-contracts.html
  - /docs/scos/user/features/202311.0/merchant-b2b-contracts/merchant-b2b-contracts.html
  - /docs/scos/user/features/202204.0/merchant-b2b-contracts-feature-overview.html
---

In a B2B business model, the partnership is usually based on contracts, or relations, between buyers and merchants. Both features Merchant B2B Contracts and Merchant B2B Contract Requests allow for the creation and management of such relation and relation requests. Based on merchant relations, you can define buyer-specific [prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/merchant-custom-prices-feature-overview.html), [products](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/merchant-product-restrictions-feature-overview/merchant-product-restrictions-feature-overview.html), and [merchant order thresholds](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/checkout-feature-overview/order-thresholds-overview.html#merchant-order-thresholds).
In the context of merchant relations in a Shop, there are two key actors: the merchant and the buyer:
- A merchant is a seller usually represented by a company that owns the platform.
- The buyers are represented by [business units](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/business-units-overview.html) of [companies](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-accounts-overview.html#company) that purchase products or services from the merchant. Individual employees of the business units are called *company users*.

There are two ways to establish a merchant relation:

- Merchant manually creates a merchant relation in the Back Office.
- Company user submits a relation request on the Storefront. The merchant relation is created once the admin approves this request.

## Creation of a merchant relation in the Back Office

Merchants can create a merchant relation in the Back Office. For details on how to do that, see [Create merchant relations](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/manage-in-the-back-office/create-merchant-relations.html).
After a relation has been created in the Back Office, it appears on the Storefront in *My Company -> Merchant Relations*.

## Initiation of a merchant relation by a company user

Company user can request a merchant relation from the merchant. Once the merchant approves the request, the merchant relation is automatically created.

### Merchant relation request creation by a company user

Company user can initiate the merchant relation by placing a request on the Storefront from the *Merchant Relation Requests* page in the Company Account by clicking **Create request**.

In the merchant relation request form, the company user need to specify the business unit owner and business unit they want to create the merchant relation for. This business unit has a formal contract for this relation. Optionally, the company user can leave a message for the merchant with more details regarding the relation request. After the company user submits the relation request, it appears with the **Pending** status on the **Company Account** page.

![Merchant relation request](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/base-shop/merchant-b2b-contracts-feature-overview.md/merchant-relation-request.png)

The company user can view details of all the merchant relation requests and cancel pending requests on the Storefront on the *My Company -> Merchant Relation Requests* page. However, they can't edit the submitted requests.

## Merchant relation request approval by a merchant

When a company user creates a request, the merchant receives a notification via email and can start processing this request.

The merchant can leave notes for the company that requested the relation. Merchant can also leave internal comments that only their users can view and respond to.

Once the merchant approves or rejects a relation request, its status changes to Approved or Rejected. The company user receives the email about the status change of the request.

For details on how a merchant can process the merchant relation requests in the Merchant Portal, see [Manage merchant relation requests](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/manage-merchant-relation-requests.html).


## Automatic creation of a merchant relation
Based on the data in a request, one or multiple merchant relations are automatically created for approved requests and displayed in the Back Office and on the Storefront.

## Merchant relations in business operations
Based on merchant relations, you can assign [buyer-specific products](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/merchant-product-restrictions-feature-overview/merchant-product-restrictions-feature-overview.html), [product prices](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html#define-prices), and [merchant order thresholds](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-in-the-back-office/define-merchant-order-thresholds.html) in the Back Office.


Check out this video tutorial on how to set up merchants and merchant relations:


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/base-shop/merchant-b2b-contracts-feature-overview.md/How+to+Setup+Merchants+and+Merchant+Relationships+in+Spryker+B2B-aowgi1c6k1.mp4" type="video/mp4">
  </video>
</figure>


## Related Developer documents

| INSTALLATION GUIDES |
|---|
| [Install the Merchant B2B Contracts feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-b2b-contracts-feature.html)  |
| [Install the Merchant B2B Contracts + Company Account feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-b2b-contracts-company-account-feature.html) |
| [Install the Merchant B2B Contract Requests feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-b2b-contract-requests-feature.html) |
| [Install the Merchant B2B Contract Requests + Company Account feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-b2b-contract-requests-company-account-feature.html)  |
| [Install the Comments feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-feature.html) |
| [Install the Comments + Spryker Core Back Office feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-spryker-core-back-office-feature.html) |
| [Install the Comments + Merchant B2B Contracts feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-merchant-b2b-contracts-feature.html)  |
| [Install the Comments + Merchant B2B Contract Requests feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-merchant-b2b-contract-requests-feature.html) |
