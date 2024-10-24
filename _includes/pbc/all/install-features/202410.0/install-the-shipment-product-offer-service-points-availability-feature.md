

This document describes how to install the Shipment Product Offer Service Points Availability feature.

## Prerequisites

Install the required features:

| NAME                                      | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                                      |
|-------------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Product Offer Service Points Availability | {{page.version}} | [Install the Product Offer Service Points Availability feature](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-features/install-the-product-offer-service-points-availability-feature.html) |
| Shipment                                  | {{page.version}} | [Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)                                                     |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/shipment-product-offer-service-points-availability: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                                    | EXPECTED DIRECTORY                                                               |
|-----------------------------------------------------------|----------------------------------------------------------------------------------|
| ShipmentTypeProductOfferServicePointAvailabilitiesRestApi | vendor/spryker/shipment-type-product-offer-service-point-availabilities-rest-api |

{% endinfo_block %}


## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

* Make sure the following changes have been applied in transfer objects:

| TRANSFER                                                    | TYPE  | EVENT   | PATH                                                                                              |
|-------------------------------------------------------------|-------|---------|---------------------------------------------------------------------------------------------------|
| RestProductOfferServicePointAvailabilitiesRequestAttributes | class | created | src/Generated/Shared/Transfer/RestProductOfferServicePointAvailabilitiesRequestAttributesTransfer |
| ProductOfferServicePointAvailabilityConditions              | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityConditionsTransfer              |

* Make sure you can use the `shipmentTypeUuid` filter when sending requests to the  `product-offer-service-point-availabilities` resource. Example:

`POST https://glue.mysprykershop.com/product-offer-service-point-availabilities`
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
