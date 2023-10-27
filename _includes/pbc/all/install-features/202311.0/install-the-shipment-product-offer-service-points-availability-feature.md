

This document describes how to integrate the Shipment Product Offer Service Points Availability feature into a Spryker project.

## Install feature core

Follow the steps below to install the Shipment Product Offer Service Points Availability feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                                      | VERSION          | INTEGRATION GUIDE                                                                                                                                                                                                      |
|-------------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Product Offer Service Points Availability | {{page.version}} | [Install the Product Offer Service Points Availability feature](/docs/pbc/all/service-points/{{page.version}}/unified-commerce/install-and-upgrade/install-the-product-offer-service-points-availability-feature.html) |
| Shipment                                  | {{page.version}} | [Shipment feature integration](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)                                                     |

### 1) Install the required modules using Composer

```bash
composer require spryker-feature/shipment-product-offer-service-points-availability: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                                    | EXPECTED DIRECTORY                                                               |
|-----------------------------------------------------------|----------------------------------------------------------------------------------|
| ShipmentTypeProductOfferServicePointAvailabilitiesRestApi | vendor/spryker/shipment-type-product-offer-service-point-availabilities-rest-api |

{% endinfo_block %}


### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                                                    | TYPE  | EVENT   | PATH                                                                                              |
|-------------------------------------------------------------|-------|---------|---------------------------------------------------------------------------------------------------|
| RestProductOfferServicePointAvailabilitiesRequestAttributes | class | created | src/Generated/Shared/Transfer/RestProductOfferServicePointAvailabilitiesRequestAttributesTransfer |
| ProductOfferServicePointAvailabilityConditions              | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityConditionsTransfer              |

{% endinfo_block %}

### 3) Set up behavior

{% info_block warningBox "Verification" %}

Make sure that `shipmentTypeUuid` filter can be used with `product-offer-service-point-availabilities` resource in Storefront API.

* `POST https://glue.mysprykershop.com/product-offer-service-point-availabilities`
   ```json
      {
          "data": {
              "type": "product-offer-service-point-availabilities",
              "attributes": {
                  "servicePointUuids": [
                      "{{service-point-uuid}}"
                  ],
                  "serviceTypeUuid": "{{service-type-uuid}}",
                  "productOfferServicePointAvailabilityRequestItems": [
                      {
                          "productConcreteSku": "{{product-concrete-sku}}",
                          "productOfferReference": "{{product-offer-reference}}",
                          "quantity": 1
                      }
                  ],
                  "shipmentTypeUuid": "{{shipment-type-uuid}}"
              }
          }
      }
   ```

{% endinfo_block %}