---
title: Release notes 202410.0
description: Release notes for the Spryker Cloud Commerce OS version 202410.0
last_updated: Oct 24, 2024
template: concept-topic-template
---

## Business intelligence powered by Amazon QuickSight<span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Amazon Quicksight is a business analytics tool now available in the Back Office. This brings powerful analytics capabilities directly into the platform, enabling users to visualize data, create customizable dashboards, and perform deep analytics on sales, product performance, customer behaviors, and marketplace KPIs. By leveraging analytics, you will unlock new monetization opportunities and make more informed business decisions.

![analytics-dashboard]()


Business benefits:

* Immediate access to data analytics with editing, sharing, and viewing tools integrated directly into the Back Office.
* With high customizability and numerous editing and sharing options, you can tailor your analyses to focus on the most important data.
* Support for multiple data sources lets you aggregate data analysis across various systems and use just one tool for all your BI needs.

![analytics-analysis]()


Documentation:
Link TBA

Technical prerequisites:
List or links to docs




## Variants section in the Merchant Portal<span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The new Variants section in Merchant Portal streamlines the management of concrete products. You can now view, sort, filter, and bulk-edit concrete products belonging to different abstract products.

![mp-variants]


Business benefits:
* Reduces the complexity of managing concrete products
* Improves operational efficiency


Documentation:
Edit marketplace concrete products
Install the Merchant Portal - Marketplace Product feature


## Audit logs<span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Audit logs improve security monitoring and transparency by letting you track all security actions performed by users in all applications: Storefront, Back Office, Merchant Portal, and Glue API. Audit logs cover login related activities, including agent assist impersonation sessions.

![audit-logs]()

### Business benefits
* Enhanced security monitoring: Track and review key user actions, such as login and password changes, across all platform areas.
* Compliance support: Automatic deletion schedules let you comply with legal and data privacy standards.
* Customizable logging: Adjust logging preferences to focus on specific events or applications, ensuring relevant activities are tracked.
* Improved accountability: Tracking security-related user activities promotes accountability and transparency across the platform.


### Documentation

* [Audit logs](/docs/dg/dev/backend-development/audit-logs/audit-logs.html)
* [Working with logs](/docs/ca/dev/working-with-logs.html)


## Product Comparison<span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Product comparison enables customers to easily compare products on mobile and desktop devices. Customers can make more informed purchase decisions by viewing side-by-side comparisons of key product specifications and attributes.

![compare-products-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/feature-overviews/product-comparison-feature-overview.md/compare-products-page.png)

### Business benefits
* Increases conversion rates and customer satisfaction
* Reduces the likelihood of returns


### Documentation
https://docs.spryker.com/docs/pbc/all/product-information-management/202410.0/base-shop/feature-overviews/product-comparison-feature-overview.html

### Technical prerequisites
https://docs.spryker.com/docs/pbc/all/install-features/202410.0/install-the-product-comparison-feature.html



## Discount condition: number of orders<span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Discounts can now be applied based on the number of order a customer placed before. Using the `customer-order-count` discount condition, you can define how many orders a customer should have placed to qualify for the discount.


 By leveraging their order history, it allows for personalized promotions targeting first-time buyers or loyal customers, offering flexibility to drive both acquisition and retention.

![discount-condition]()

**Business benefits:**

- Personalized promotions: Enable tailored discounts based on customers' order history, improving engagement with new and returning customers.  
- Boost customer acquisition: Offer specific discounts to first-time buyers, encouraging new customer sign-ups and conversions.  
- Strengthen customer retention: Reward repeat buyers with discounts, fostering loyalty and increasing the likelihood of future purchases.


**Documentation:**   
[Decision rules: Attributes and operators](/docs/pbc/all/discount-management/202410.0/base-shop/manage-in-the-back-office/create-discounts.html#decision-rules-attributes-and-operators)  
[Install the Promotions & Discounts + Order Management feature](/docs/pbc/all/discount-management/202410.0/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-order-managemet-feature.html)


## Marketplace Commissions<span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Commissions are a key way for operators to monetize their marketplaces. Our Commission Engine makes defining, calculating, and managing commissions streamlined and transparent for operators and merchants. The engine integrates seamlessly with third-party ERP systems and payment service providers like Stripe.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/merchandising/product-relations/best-practices-promote-products-with-product-relations.md/define-general-settings-of-a-product-relation.mp4" type="video/mp4">
  </video>
</figure>



**Business benefits:**

- Streamline commission management through automated calculation and application, reducing manual effort and errors.  
- Adapt commission structures to evolving business needs seamlessly, supporting marketplace growth and expansion.   
- Connect with third-party systems to generate invoices and facilitate payouts, ensuring operational efficiency and financial accuracy.

**Labels:** Feature

**Documentation:**   
[Marketplace Merchant Commission feature overview](https://docs.spryker.com/docs/pbc/all/merchant-management/202407.0/marketplace/marketplace-merchant-commission-feature-overview.html)
