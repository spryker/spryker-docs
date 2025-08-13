---
title: Enable Click & Collect
description: Learn how to enable the Spryker Click&Collect feature in to your Spryker unified commerce project.
last_updated: Nov 23, 2023
template: howto-guide-template
---

To enable the default implementation of Click & Collect, follow the steps.

## Prerequisites

Install the following features:

- [Service Points Cart + Checkout](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-cart-checkout-feature.html)
- [Service Points Cart](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-cart-feature.html)
- [Service Points + Customer Account Management](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-customer-account-management-feature.html)
- [Service Points](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-feature.html)
- [Service Points + Order Management](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-order-management-feature.html)
- [Service Points + Product Offer](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-product-offer-feature.html)
- [Service Points Cart + Shipment](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-shipment-feature.html)
- [Marketplace Merchant Portal Product Offer Service Points](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-features/install-the-marketplace-merchant-portal-product-offer-service-points-feature.html)
- [Marketplace Merchant + Product Offer Service Points Availability](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-features/install-the-marketplace-merchant-product-offer-service-points-availability-feature.html)
- [Marketplace Product Offer + Service Points](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-features/install-the-marketplace-product-offer-service-points-feature.html)
- [Product Offer Service Points Availability](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-features/install-the-product-offer-service-points-availability-feature.html)
- [Product Offer Service Points](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-features/install-the-product-offer-service-points-feature.html)
- [Shipment Cart](/docs/pbc/all/carrier-management/{{page.version}}/unified-commerce/install-features/install-the-shipment-cart-feature.html)
- [Shipment Product Offer Service Points Availability](/docs/pbc/all/carrier-management/{{page.version}}/unified-commerce/install-features/install-the-shipment-product-offer-service-points-availability-feature.html)
- [Shipment Service Points](/docs/pbc/all/carrier-management/{{page.version}}/unified-commerce/install-features/install-the-shipment-service-points-feature.html)
- [Install the Product Offer Shipment Availability feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-product-offer-shipment-availability-feature.html)


## 1. Add service points and their addresses

To add service points and addresses using Glue API, see [Add service point addresses](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-point-addresses/glue-api-add-service-point-addresses.html).

To import service points, see [Import file details: service_point.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service-point.csv.html).

To import service point addresses, see [Import file details: service_point_address.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service-point-address.csv.html).

## 2. Add service types

For Click & Collect, you most probably need the pickup service type.

To add service types using Glue API, see [Add service types](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-types/glue-api-add-service-types.html).

To import service types, see [Import file details: service_type.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service-type.csv.html).


## 3. Add services

You need to add services per service point based on the service types you've added.

To add services using Glue API, see [Add services](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-services/glue-api-add-services.html).

To import service types, see [Import file details: service.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service.csv.html).


## 4. Assign service types to shipment types

To import service to shipment type assignments, see [Import file details: shipment_type_service_type.csv](/docs/pbc/all/carrier-management/{{page.version}}/unified-commerce/file-details-shipment-type-service-type.csv.html).


## 5. Assign product offers to shipment types

To import offers to shipment type assignments, see [Import file details: product_offer_shipment_type.csv](/docs/pbc/all/offer-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-product-offer-shipment-type.csv.html).


## 6. Assign product offers to services


To import offers to services assignments, see [Import file details: product_offer_service.csv](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/import-file-details-product-offer-service.csv.html).


## Recommended customizations for Click & Collect

Since the product catalog and the product details page (PDP) do not support Click & Collect, we recommend customizing the PDP as follows:

1. To display a specific offer in the first position of the offers section, implement the Default Product Offer Reference Strategy. For more details, see [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html#set-up-behavior).

2. To show only one product offer in the offers section, override the Merchant Product Offer Widget behavior with a filter. This filter should display one product offer with an empty service and shipment type set to *empty* or *Delivery*. When adding products to cart, the delivery shipment type applies by default, and the customer can change it to pickup during checkout if needed. For more details on the product offers widget, see [Render merchant product offers on the Storefront](/docs/pbc/all/offer-management/{{page.version}}/marketplace/render-merchant-product-offers-on-the-storefront.html).

3. To show information about product availability in the service point locations, add the Service Point Widget to the PDP. For instructions, see [Install the Service Points feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-feature.html).

As a result, customers have the following user journey with Click & Collect:
1. Go to the PDP.
2. Discover possible shipment options: delivery and pickup.
3. Add the product to cart.
4. Go to checkout and select the pickup shipment type.
5. Discover product availability in the retail locations and select one.
6. Place the order.
