---
title: "Unified Commerce: Create and edit product offers"
description: Learn how to create and edit product offers in the Merchant Portal
template: back-office-user-guide-template
last_updated: Jan 19, 2024
---

This document describes how to create and edit product offers in the Merchant Portal.

## Prerequisites

* To start managing product offers, in the Merchant Portal, go to **Offers**.

* Review the [reference information](#reference-information-create-and-edit-product-offers) before you start, or look up the necessary information as you go through the process.

## Create a product offer

1. On the **Offers** page, click **Add Offer**.
    This opens the **Create Offer** page.

2. In the **List of Products** pane, select the product to create an offer for.
    This opens the **Create Offer** drawer.

3. Optional: To make the offer active after creating it, select **Offer is Active**.
4. Optional: Enter a **Merchant SKU**.
5. Select one or more **Stores**.
6. Enter a **Quantity**.
7. Optional: To always display the product offer as available on the Storefront, select **Always in Stock**.
8. To add prices, in the **Price** section, do the following:
  1. Click **Add**.
  2. Select a **STORE**.
  3. Select a **CURRENCY**.
  4. Optional: Enter any of the prices:
      * **NET DEFAULT**
      * **GROSS DEFAULT**
      * **NET ORIGINAL**
      * **GROSS ORIGINAL**

  5. Optional: Enter a **VOLUME QUANTITY**.
  6. Repeat steps 1-5 until you add all the needed prices.
9. Optional: Select **Validity Dates**.
10. For **SERVICE POINT**, start typing and select a service point.
11. Select one or more **SERVICES**.
12. Optional: Select one or more **Shipment Types**.
13. Scroll up and click **Create**.

    This reloads the page with a success message displayed. The created offer is displayed in the list.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/unified-commerce/unified-commerce-create-and-edit-product-offers.md/creating-product-offers.mp4" type="video/mp4">
  </video>
</figure>

## Edit a product offer

1. On the **Offers** page, select the offer you want to edit.
2. In the drawer that opens, change the needed fields.
3. Click **Save**.
    This closes the drawer with a success message displayed.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/unified-commerce/unified-commerce-create-and-edit-product-offers.md/edit-offers.mp4" type="video/mp4">
  </video>
</figure>


## Reference information: Create and edit product offers

{% include pbc/all/manage-in-the-merchant-portal/offer-management/reference-information-create-and-edit-product-offers.md %} <!-- To edit, see _includes/pbc/all/manage-in-the-merchant-portal/offer-management/reference-information-create-and-edit-product-offers.md -->

| ATTRIBUTE     | DESCRIPTION |
| --- | --- |
| SERVICE POINT | Location in which this offer is provided. |
| SERVICES | Services that are provided for this offer in the **SERVICE POINT**. |
| Shipment Types | Types of shipment available for this offer. |
