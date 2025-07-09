---
title: Self-Service Portal Service Management feature overview
description: Let customers book services for delivery or on-site at service points, with configurable products, shipment types, and review options in Storefront and Back Office.
template: concept-topic-template
last_updated: Apr 10, 2025
---

{% info_block warningBox %}

Self-Service Portal is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}


The *Service Management* feature enables customers to book a service, either for delivery to their address or for provision at a designated service point. For example, you can provide after-sales support, such as maintenance or repair.


## Prerequisites for selling services in the catalog

- Add service points and their addresses. A service point is a physical location where services are provided. For more information on service points, see [Service point](/docs/pbc/all/service-point-management/202410.0/unified-commerce/service-points-feature-overview.html#service-point).
- Enable the Service Visit service type for service points as a unique service. For more information on services, see [Service](/docs/pbc/all/service-point-management/202410.0/unified-commerce/service-points-feature-overview.html#service).
- Configure a shipment method with the On-Site Service shipment type. For more information on shipment types, see [Shipment type](/docs/pbc/all/carrier-management/202410.0/base-shop/shipment-feature-overview.html#shipment-type).

## Selling services as products

This section describes how to set up components for selling services as products:

1. Set up the service product type for abstract products. This distinguishes service products from regular products in the Back Office and Storefront.
2. Set up allowed shipment types for concrete products. This determines if a product is eligible for a specific shipment type. For services that are sold at service points, configure the on-site service shipment type.
3. Create one or more product offers for each service product. The offers must be associated with Service Points, Services, and Shipment Types.
4. Optional: Set service date and time as required for checkout. This can be enabled for concrete products if scheduling is necessary.

The following sections describe each step in more details.

### Importing product types

The product type defines the category of a product to distinguish between standard products, services, and any other product types.

Product types are imported using the console importer:  

**product-abstract-type.csv**

| Parameter | Required | Type   | Description                         |
|-----------|----------|--------|-------------------------------------|
| key       | Yes      | string | Key for the product abstract type.  |
| name      | Yes      | string | Name of the product abstract type.  |



### Adding product type to products

To add a product type to a product in the Back Office, go to **Catalog** and click the needed product.

Alternatively, you can import product type assignments using the console importer:

**product-abstract-product-abstract-type.csv**

| Parameter                 | Required | Type   | Description                     |
|--------------------------|----------|--------|---------------------------------|
| abstract_sku             | Yes      | string | Product abstract SKU            |
| product_abstract_type_key| Yes      | string | Key for the product abstract type. |




### Enabling service date and time for a product

1. In the Back Office, go to **Catalog**.
2. Click a product to enable date and time for.
3. In the **Variants** section, click a product variant to enable date and time for.
4. In the **General** tab, for **Enable Service Date and Time**, select **Yes**.

<!-- Alternatively, this can be imported using the standard console importer. See *Import file details: product-tbd.csv*. -->


### Defining allowed shipment types

1. In the Back Office, go to **Catalog**.
2. Click a product to select shipment types for.
3. In the **Variants** section, click a product variant to select shipment types for.
5. For **Allowed Shipment Types**, select one or more shipment types.
  A product requires at least one allowed shipment type to be displayed on the Storefront.

<!-- Alternatively, shipment types can be imported using the standard console importer. See *Import file details: product-type.csv*. -->


### Adding product offers for products

1. In the Back Office, go to **Catalog** > **Offers**.
2. Click **Create Offer**.
3. Fill out the form using field descriptions:

| OFFER PARAMETER     | DESCRIPTION |
|---------------------|-------------|
| Offer status        | Active or inactive. |
| Stores              | Spryker Marketplace is a multi-store environment, and an operator can define which stores to display their offers in. |
| Stock               | Offer's stock that's not dependent on the respective product's stock. |
| Quantity | Always in Stock |
| Validity Dates      | Specifies the period during which the product offer is visible on the Storefront. Concrete product validity dates have higher priority over the Offer validity dates. |
| Service Point       | A service point is a physical location where services are provided. Depending on the services provided, there can be different kinds of service points, such as a warehouse or a physical store. |
| Services            | A service represents a specific service type that is provided at a specific service point. For example, an "On-Site Service at a retail location at Julie-Wolfthorn-Straße 1, 10115", Berlin is a unique service. |
| Shipment Types      | A shipment type is a way in which a customer receives an order after placing it. Shipment type examples: Delivery, On-Site Service, In-Store Pickup, Curbside Pickup. |



### Reviewing purchased services on Storefront

Customers can review previously purchased service products in **My Account** > **Services**.

On the Services View page, the following information is displayed:
- Order Reference
- Service
- Time and Date
- Created At
- State


Customers can use the search to filter purchased services by product name, SKU, or order reference.

Also, customers can filter the view according to who purchased services:
- My booked services
- Booked services of a specific business unit
- Booked services of a specific company

The latter two require respective permissions. For more information on company permissions, see [Company user roles and permissions overview](/docs/pbc/all/customer-relationship-management/202410.0/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview.html).


## Reviewing purchased services in the Back Office

Back Office users can view previously purchased service products in **Orders** > **Services**.


## Multi-step checkout

The SSP checkout flow adds the following functionality:

- Customers can switch between single-address and multi-address checkout for items with the **Delivery** shipment type
- Items delivered with the **On-Site Service** shipment type are displayed as a separate group
- For **On-Site Service** items, customers can change the service point but not the shipment type

## Current constraints

- Product prices for product offers can't be added in the Back Office; they can only be imported.
- Some B2B features, such as Merchant Relations, are not supported by product offers. For more information, see [Product Offer constraints](/docs/pbc/all/offer-management/202410.0/marketplace/marketplace-product-offer-feature-overview.html#current-constraints).
- Customers can't change shipment type in cart and checkout.



## Related Developer documents

| INSTALLATION GUIDES |
| - |
| [Install the SSP Service Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-service-management-feature.html) |
