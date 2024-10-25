---
title: Release notes 202410.0
description: Release notes for the Spryker Cloud Commerce OS version 202410.0
last_updated: Oct 24, 2024
template: concept-topic-template
---

## Business intelligence powered by Amazon QuickSight<span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Amazon Quicksight is a business analytics tool now available in the Back Office. This new feature brings powerful analytics capabilities directly into the platform, enabling users to visualize data, create customizable dashboards, and perform deep analytics on sales, product performance, customer behaviors, and marketplace KPIs. By leveraging these BI tools, you will unlock new monetization opportunities and make more informed business decisions.

![analytics-dashboard]()


Business benefits:

Instant data connection with editing, sharing, and viewing tools integrated directly into the Back Office for immediate insights and data export.
With high customizability and numerous editing and sharing options, you can tailor your analyses and dashboards to focus on the most important data.
Support for multiple data sources lets you aggregate data analysis across various systems and use just one tool for all your BI needs.

![analytics-analysis]()


Documentation:
Link TBA

Technical prerequisites:
List or links to docs




## Variants section in the Merchant Portal<span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The new Variants section in Merchant Portal streamlines the management of concrete products. You can now view, sort, filter, and bulk-edit concrete products in a centralized manner.

![mp-variants]


Business benefits:
* Reduce the complexity of managing concrete products
* Improve operational efficiency
* Bulk edit concrete products belonging to different abstract products


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

Product comparison allows customers to easily compare products on mobile and desktop devices. Designed for user-friendly navigation, the feature enables customers to make informed purchasing decisions by presenting side-by-side comparisons of key product specifications and attributes.

![compare-products-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/feature-overviews/product-comparison-feature-overview.md/compare-products-page.png)

### Business benefits
Product comparison helps customers quickly identify which product best fits their needs, leading to higher satisfaction and conversion rates and reducing the likelihood of returns.

### Documentation
https://docs.spryker.com/docs/pbc/all/product-information-management/202410.0/base-shop/feature-overviews/product-comparison-feature-overview.html

### Technical prerequisites
https://docs.spryker.com/docs/pbc/all/install-features/202410.0/install-the-product-comparison-feature.html



## “Number of Orders” Condition for Promotions & Discounts

This improvement introduces a new discount condition called “customer-order-count,” enabling discounts to be applied according to the number of orders a logged-in customer has placed. By leveraging their order history, it allows for personalized promotions targeting first-time buyers or loyal customers, offering flexibility to drive both acquisition and retention.

![discount-condition]()

**Business benefits:**

- Personalized promotions: Enable tailored discounts based on a customer’s order history, improving engagement with new and returning customers.  
- Boost customer acquisition: Offer specific discounts to first-time buyers, encouraging new customer sign-ups and conversions.  
- Strengthen customer retention: Reward repeat buyers with discounts, fostering loyalty and increasing the likelihood of future purchases.

**Labels:** Improvement

**Documentation:**   
[Decision rules: Attributes and operators](https://docs.spryker.com/docs/pbc/all/discount-management/202407.0/base-shop/manage-in-the-back-office/create-discounts.html#decision-rules-attributes-and-operators)  
[Install the Promotions & Discounts \+ Order Management feature](https://docs.spryker.com/docs/pbc/all/discount-management/202407.0/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-order-managemet-feature.html)
