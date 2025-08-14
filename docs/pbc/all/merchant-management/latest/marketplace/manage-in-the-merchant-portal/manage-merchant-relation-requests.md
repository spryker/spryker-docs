---
title: Manage merchant relation requests
description: Learn how to approve, deny, and process merchant relation requests in the Spryker Merchant Portal
last_updated: Mar 19, 2024
template: back-office-user-guide-template
redirect_from:
  - /docs/pbc/all/merchant-management/latest/marketplace/manage-in-the-merchant-portal/manage-merchant-relation-requests.html
---

This document describes how to process the [merchant relation requests](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-b2b-contracts-and-contract-requests-feature-overview.html) created by a company user.

## Approve or reject merchant relation requests

Once a company user creates a merchant relation request, it appears in the Merchant Portal in *B2B Contracts -> Merchant Relation Requests*.

![view-merchant-relation-requests-mp](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/merchant-relations-in-merchant-portal/manage-merchant-relation-requests/view-merchant-relation-requests-mp.png)

To approve or reject the merchant request, do the following:

1. Click the relation request you want to process.
2. Optional: Clear the checkbox for the business units for which you don't want to create a relation.
3. Optional: To create a separate merchant relation per each business unit, check the respective checkbox.
4. Optional: In *Company Note*, leave the note for the company that requested the relation.
5. Optional: In *Internal Comments*, leave the comments for internal usage within your company. Your colleagues can see and respond to the internal comments. The company that requested the merchant relation won't see these comments.
6. In the top right corner, click **Approve** or **Reject**.
7. Confirm approval or rejection of the merchant request.

If you approved the merchant relation, it appears on the *Merchant relations* page. For the buyer, the status of the merchant request on the Storefront changes to *Approved*.

{% info_block infoBox "Info" %}

You can also manage merchant requests from the Dashboard. Go to the *B2B Contracts* widget and click **Manage Pending Requests**.

![mp-dashboard](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/merchant-relations-in-merchant-portal/manage-merchant-relation-requests/mp-dashboard.png)

{% endinfo_block %}


## View merchant relations created from merchant relation requests

For the approved merchant relation requests, you can view the merchant relations created from them. Do the following:
1. Click **Merchant Relation Requests** and select the approved relation request.
2. In the top right corner of the form with the request details, click **Merchant Relations.**

![view-merchant-relation-from-request](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/merchant-management/merchant-relations-in-merchant-portal/manage-merchant-relation-requests/view-merchant-relation-from-request.png)

This takes you to the *Merchant Relations* page with the respective merchant relations.

## What's next

[Manage merchant relations](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/manage-merchant-relations.html)
