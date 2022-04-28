---
title: Release notes 202108.0
last_updated: Apr 28, 2022
template: concept-topic-template
---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and enhancements.
For information about installing the Spryker Commerce OS see [Getting started guide](https://documentation.spryker.com/docs/dev-getting-started).

## Spryker Cloud Commerce OS

This section describes the new features released for Spryker Commerce OS.

### Cart & Checkout

Inside the cart and checkout endpoints, we added  information about the minimal, soft, and hard thresholds defined in your Spryker project.

#### Documentation

[Order Threshold feature overview](/docs/scos/user/features/202108.0/checkout-feature-overview/order-thresholds-overview.html)

### Discount management

We added a number of new features and improvements to discounts to allow for more control and transparency around your promotions.

#### Documentation

[Promotions & Discounts feature overview](/docs/scos/user/features/{{site.version}}/promotions-discounts-feature-overview.html)


### Discount priority

For cases when several non-exclusive discounts apply to a customer’s cart, a Back Office user can set discount priorities to define the order in which discounts are applied and calculated.

![discount-priority](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/discount-priority.png)

#### Documentation

[Discount priority](/docs/scos/user/features/{{site.version}}/promotions-discounts-feature-overview.html#discount-priority)

### Category-based discounts

We have added `category` to the list of fields for discount conditions and calculation. A Back Office user can now use categories and subcategories to define when a discount should be applied or to what products a discount should apply.

![category-based-discounts](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/category-based-discounts.png)

#### Documentation

[Decision rule](/docs/scos/user/features/{{site.version}}/promotions-discounts-feature-overview.html#discount-priority)



### Time-defined discount validity

Discount validity now supports HH:MM times in addition to dates. For example, a voucher can be redeemed or a discount applies to the cart starting from 01.12.2021 23:00 until 31.01.2022 22:59, UTC.

![time-defined-discount-validity](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/time-defined-discount-validity.png)

#### Documentation

[Discount validity interval](/docs/scos/user/features/{{site.version}}/promotions-discounts-feature-overview.html#discount-priority)

### Strikethrough prices on Promotional Products

When the **Cart** page shows eligible promotional products, these products now show the discounted price with a strikethrough default price. This improves the customer experience by showing the discount a customer will receive if they add the product to the cart.

![strikethrough-prices-on-promotional-products](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/strikethrough-prices-on-promotional-products.png)

#### Documentation

[Promotions & Discounts feature overview](/docs/scos/user/features/{{site.version}}/promotions-discounts-feature-overview.html)


### Multiple abstract products within a Promotional Product discount

Promotional Product discounts can now designate more than one abstract SKU as the Promotional Product. Back Office users can enter as many abstract SKUs as they wish into the discount creation form, and customers will see all eligible products in a carousel below the products in their cart.

![multiple-abstract-products-within-a-promotional-product-discount](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/multiple-abstract-products-within-a-promotional-product-discount.png)


#### Documentation
[Promotional products](/docs/scos/user/features/{{site.version}}/promotions-discounts-feature-overview.html#discount-priority)


### Storefront

Wherever a number is displayed, it will be according to the current locale of the session of the guest or customer.

### Back-Office

Wherever a number is displayed, it will be according to the current locale of the user’s session.

### Ecosystem

#### Computop

#### PayU (Poland)

Through Computop, you can now use the PayU set of payment services. This capability is only available in Poland.

#### PayPal Express

With PayPal Express, your customers can complete transactions in just a few steps, using their shipping and billing information already stored securely at PayPal to check out, so they don’t have to re-enter it on your site. When PayPal Express is configured with the default settings, customers must have a PayPal account to complete a payment.

### Payone

#### Klarna

Use Klarna services to let your customers pay later for their purchases.
