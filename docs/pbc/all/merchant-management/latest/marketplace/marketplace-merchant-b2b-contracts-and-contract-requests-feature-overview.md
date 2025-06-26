---
title: Marketplace Merchant B2B Contracts and Contract Requests features overview
description: In the context of Spryker Marketplace, there can be three key figures- company user and merchant, that can set up relations.
last_updated: March 15, 2024
template: concept-topic-template
---

In a B2B business model, the partnership is usually based on contracts, or relations, between buyers and merchants. Both features Marketplace Merchant B2B Contracts and Marketplace Merchant B2B Contract Requests allow for the creation and management of such relation and relation requests. Based on merchant relations, you can define buyer-specific [prices](/docs/pbc/all/price-management/latest/base-shop/merchant-custom-prices-feature-overview.html) and [products](/docs/pbc/all/merchant-management/latest/base-shop/merchant-product-restrictions-feature-overview/merchant-product-restrictions-feature-overview.html), as well as [merchant order thresholds](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/checkout-feature-overview/order-thresholds-overview.html#merchant-order-thresholds).

In the context of merchant relations in a Marketplace, there are three key actors: marketplace operator, merchant, and buyer:

- The marketplace operator owns the platform and acts as a broker between merchants and buyers.
- The [merchants](/docs/pbc/all/merchant-management/latest/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html) are sellers in the marketplace.
- The buyers are represented through [business units](/docs/pbc/all/customer-relationship-management/latest/base-shop/company-account-feature-overview/business-units-overview.html) of [companies](/docs/pbc/all/customer-relationship-management/latest/base-shop/company-account-feature-overview/company-accounts-overview.html#company) that purchase products or services from the merchants. Individual employees of the business units are called *company users*.

There are two ways to establish a merchant relation:
- Marketplace operator manually creates a merchant relation in the Back Office.
- Company user submits a relation request on the Storefront. The merchant relation is created once the merchant or marketplace operator approves this request.


## Creation of a merchant relation by a marketplace operator

A marketplace operator can create a merchant relation in the Back Office. For details on how to do that, see [Create merchant relations](/docs/pbc/all/merchant-management/latest/marketplace/manage-in-the-back-office/manage-merchant-relations/create-merchant-relations.html).

After a relation has been created in the Back Office, it appears on the Storefront in *My Company -> Merchant Relations* and in the Merchant Portal in *B2B Contracts -> Merchant Relations*.

{% info_block infoBox "Info" %}

Merchants can't create a merchant relation in the Merchant Portal. Instead, merchants can ask their buyers to initiate a merchant relation request as described in the following section.

{% endinfo_block %}

## Initiation of a merchant relation by a company user

Company user can request a merchant relation from a merchant. Once a merchant approves the request, the merchant relation is automatically created.

### Merchant relation request creation by a company user

Company user can initiate the merchant relation by creating a merchant relation request on the Storefront. There are several ways for a company user to create the relation request:
- From the merchant profile page, by clicking **Send request**.
- From the product details page, by clicking **Merchant Relation Request** under the name of the merchant selling the product.
- From the *Company Account page*, in *Merchant Relation Requests*, by clicking **Create request** and selecting the relevant merchant.

In the merchant relation request form, the company user has to specify the business units for which they want to create the merchant relation and the business unit owner. This business unit will have the formal contract for this relation. Optionally, the company user can also leave a message for the merchant with more details regarding the relation request. After the company user submits the relation request, it appears with a *Pending* status on the *Company Account* page.

The company user can view details of all the merchant relation requests and cancel pending requests on the Storefront, on the *My Company -> Merchant Relation Requests* page. However, they can't edit the submitted requests.

### Merchant relation request approval by a merchant or marketplace operator

When a company user creates a request, the merchant receives a notification via email and can start processing this request.
The merchant can leave notes for the company that requested the relation. Merchant can also leave internal comments that only their merchant users can view and respond to.
Once the merchant approves or rejects a relation request, its status changes to *Approved* or *Rejected*. The company user receives the email about the status change of the request.

For details on how a merchant can process the merchant relation requests in the Merchant Portal, see [Manage merchant relation requests](/docs/pbc/all/merchant-management/latest/marketplace/manage-in-the-merchant-portal/manage-merchant-relation-requests.html).

Even though it's usually a merchant who approves or rejects a merchant relation request, a marketplace operator can also process the merchant relation request from the Back Office. For details on how they can do this, see [Manage merchant relation requests](/docs/pbc/all/merchant-management/latest/marketplace/manage-in-the-back-office/manage-merchant-relations/manage-merchant-relation-requests.html).


## Automatic creation of a merchant relation

Based on the data in a request, one or multiple merchant relations are automatically created for approved requests and displayed in the Back Office, in the Merchant Portal, and on the Storefront.

## Merchant relations in business operations

Based on merchant relations, you can assign buyer-specific product prices in the [Back Office](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html#define-prices) and in the [Merchant Portal](/docs/pbc/all/price-management/latest/marketplace/marketplace-merchant-custom-prices-feature-overview.html). You can also define [buyer-specific products](/docs/pbc/all/merchant-management/latest/base-shop/merchant-product-restrictions-feature-overview/merchant-product-restrictions-feature-overview.html) and [merchant order thresholds](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-in-the-back-office/define-merchant-order-thresholds.html) in the Back Office.

The following demonstrates the Marketplace Merchant B2B Contracts and Contract Requests features features:

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/merchant-b2b-contracts-and-contract-requests-features-overview/Merchant+Request+Demo.mp4" type="video/mp4">
  </video>
</figure>

## Related Developer documents

| INSTALLATION GUIDES |
|---|
| [Install the Merchant B2B Contracts feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-b2b-contracts-feature.html)   |
| [Install the Merchant B2B Contracts + Company Account feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-b2b-contracts-company-account-feature.html) |
|   [Install the Marketplace Merchant B2B Contracts feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-b2b-contracts-feature.html)  |
|   [Install the Merchant B2B Contract Requests feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-b2b-contract-requests-feature.html)  |
|   [Install the Merchant B2B Contract Requests + Company Account feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-b2b-contract-requests-company-account-feature.html)  |
|  [Install the Marketplace Merchant B2B Contract Requests feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-b2b-contract-requests-feature.html)   |
|   [Install the Comments feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-comments-feature.html)  |
|  [Install the Comments + Spryker Core Back Office feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-comments-spryker-core-back-office-feature.html)   |
|   [Install the Comments + Merchant B2B Contracts feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-comments-merchant-b2b-contracts-feature.html)  |
|   [Install the Comments + Merchant B2B Contract Requests feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-comments-merchant-b2b-contract-requests-feature.html)  |
