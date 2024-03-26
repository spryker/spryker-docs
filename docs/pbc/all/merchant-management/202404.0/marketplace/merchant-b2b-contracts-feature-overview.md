---
title: Merchant B2B Contracts feature overview
description: In the context of Spryker Marketplace, there can be three key figures- company user and merchant, that can set up relations.
last_updated: March 15, 2024
template: concept-topic-template
---

In a Marketplace business model, the partnership is usually based on contracts, or relations, between sellers and buyers.
The B2B Merchant Contracts feature allows for the creation and management of such relations and relation requests.

In the context of the Marketplace relations, there are three key actors: marketplace operator, merchant, and buyer:

* The marketplace operator owns the platform and acts as a broker between merchants and buyers.
* The merchants are sellers usually represented by a [company](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-accounts-overview.html#company).
* The buyers are often [business units](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/business-units-overview.html) of companies that purchase products or services from the merchants.

There are two ways to initiate a merchant relation:

- Merchant or marketplace operator creates the merchant relation in the Back Office.
- Company user creates a relation request on the Storefront. Once the merchant approves the request, the relation is created.

## Creation of a merchant relation in a Back Office by a merchant or a marketplace operator

A merchant or a marketplace operator can create a merchant relation in the Back Office. For details on how to do that, see [Create merchant relations](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchant-relations\create-merchant-relations.html).

After the relation has been created in the Back Office, it appears on the Storefront on *My Company -> Merchant relations* page of the company user.

## Initiation of the merchant relation by a company user

Company user can request a merchant relation from a merchant. Once the merchant approves the request, the merchant relation is created.

### Merchant relation request creation by a company user

Company user can initiate the merchant relation by creating a merchant relation request on the Storefront. There are several ways for a company user to create the relation request:
- From the merchant page, by clicking **Send request**.
- From the Product Details page, by clicking **Merchant Relation Request** under the name of the merchant selling the product.
- From the *Merchant Relation Requests* page, by clicking **Create request**.

In the merchant relation request form, the company user has to specify the business units for which they want to create the merchant relation and the business unit owner - the business unit that will have the formal contract for this relation. Optionally, the company user can also leave a message for the merchant.
After the company user submits the relation request, it appears on the *Merchant Relation Requests* page with *Pending* status. Once the merchant approves or rejects the relation requests, its status changes to *Approved* or *Rejected*.

The company user can view details of the created merchant request and cancel pending merchant relations requests. However, they cannot edit the submitted requests.

### Merchant relation request approval by a merchant or marketplace operator

Once the company user submits the merchant relation request, the merchant receives a notification via email.
The merchant can approve or reject the merchant relation request. They can leave comments for the company that requested the relation. Merchant can also leave internal comments that only the merchant and their users can view and respond to.

For details on how a merchant can process the merchant relation requests in the Merchant Portal, see [Manage merchant relation requests](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/merchant-relations-in-merchant-portal/manage-merchant-relation-requests.html).

Even though usually it's a merchant who approves or rejects a merchant relation request, a marketplace operator can also do this from the Back Office. For details on how they can do this, see [Manage merchant relation requests](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/merchant-relations-in-merchant-portal/manage-merchant-relation-requests.html).


With the merchant relations, the merchants can assign [specific product prices](/docs/pbc/all/price-management/{{page.version}}/marketplace/marketplace-merchant-custom-prices-feature-overview.html) and [product offers](/docs/pbc/all/price-management/{{page.version}}/marketplace/marketplace-product-offer-prices-feature-overview.html) to the buyer with whom the merchant has the relation.