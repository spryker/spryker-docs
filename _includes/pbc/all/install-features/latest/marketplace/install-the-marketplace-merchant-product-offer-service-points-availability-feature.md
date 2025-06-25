

This document describes how to install the Marketplace Merchant + Product Offer Service Points Availability.

## Prerequisites

Install the required features:

| NAME                                      | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                                      |
|-------------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Product Offer Service Points Availability | 202507.0 | [Install the Product Offer Service Points Availability feature](/docs/pbc/all/offer-management/latest/unified-commerce/install-features/install-the-product-offer-service-points-availability-feature.html) |
| Merchant                                  | 202507.0 | [Install the Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html)                                      |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-merchant-product-offer-service-points-availability: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                                | EXPECTED DIRECTORY                                                           |
|-------------------------------------------------------|------------------------------------------------------------------------------|
| MerchantProductOfferServicePointAvailability          | vendor/spryker/merchant-product-offer-service-point-availability             |
| MerchantProductOfferServicePointAvailabilitiesRestApi | vendor/spryker/merchant-product-offer-service-point-availabilities-rest-api  |
| MerchantProductOfferServicePointAvailabilityWidget    | vendor/spryker-shop/merchant-product-offer-service-point-availability-widget |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

- Make sure the following changes have been applied in transfer objects:

| TRANSFER                                                       | TYPE  | EVENT   | PATH                                                                                                 |
|----------------------------------------------------------------|-------|---------|------------------------------------------------------------------------------------------------------|
| ProductOfferServicePointAvailabilityRequestItem                | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityRequestItemTransfer                |
| ProductOfferServicePointAvailabilityResponseItem               | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointAvailabilityResponseItemTransfer               |
| RestProductOfferServicePointAvailabilityRequestItemsAttributes | class | created | src/Generated/Shared/Transfer/RestProductOfferServicePointAvailabilityRequestItemsAttributesTransfer |

- Make sure you can use the  `merchantReference` filter when sending requests to the `product-offer-service-point-availabilities` resource. Example:

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
                      "quantity": 1,
                      "merchantReference": "{{merchant-reference}}"
                  }
              ]
          }
      }
  }
```

{% endinfo_block %}
