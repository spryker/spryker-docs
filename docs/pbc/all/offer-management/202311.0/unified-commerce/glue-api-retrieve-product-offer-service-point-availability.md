---
title: "Glue API: Retrieve product offer service point availability"
description: Learn how to retrieve product offer service point availability using Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you product offer availability per service points.

## Installation

[Install the Product Offer Service Points Availability feature](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-features/install-the-product-offer-service-points-availability-feature.html)

## Retrieve service points

***
`POST` **/product-offer-service-point-availabilities**
***

### Request

Request sample: `POST https://glue.mysprykershop.com/product-offer-service-point-availabilities`
```json
{
    "data": {
        "type": "product-offer-service-point-availabilities",
        "attributes": {
            "servicePointUuids": [
                "262feb9d-33a7-5c55-9b04-45b1fd22067e",
                "7e3b03e0-c53c-5298-9ece-968f4628b4f8"
            ],
            "serviceTypeUuid": "2370ad95-4e9f-5ac3-913e-300c5805b181",
            "productOfferServicePointAvailabilityRequestItems": [
                {
                    "productConcreteSku": "093_24495843",
                    "productOfferReference": "offer419",
                    "quantity": 1,
                    "merchantReference": "MER000001"
                },
                {
                    "productConcreteSku": "091_25873091",
                    "productOfferReference": "offer420",
                    "quantity": 1,
                    "merchantReference": "MER000001"
                }
            ],
            "shipmentTypeUuid": "174d9dc0-55ae-5c4b-a2f2-a419027029ef"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| servicePointUuids | Object | &check; | The list of service points to retrieve the availability from. To get them, [retrieve service points](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-retrieve-service-points.html) |
| serviceTypeUuid | String | &check; | The service type to retrieve the product offer availability for. To get it, [retrieve service types](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/manage-using-glue-api/manage-service-types/glue-api-retrieve-service-types.html)|
| productConcreteSku | String | &check; | The concrete product to retrieve the availability of. To get it, [retrieve concrete products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-concrete-products.html)|
| productOfferReference | String | &check; | The product offer to retrieve the availability of. To get it, [retrieve product offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/glue-api-retrieve-product-offers.html)|
| quantity | String | &check; | The quantity to retrieve the availability for. |
| merchantReference | String | &check; | The merchant to retrieve the product offer availability of. To get it, retrieve product offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/glue-api-retrieve-product-offers.html)|
| shipmentTypeUuid | String | &check; | The shipment type to check the product offer availability for. To get it, [retrieve shipment types](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-using-glue-api/manage-shipment-types/glue-api-retrieve-shipment-types.html)|


### Response



```json
{
    "data": {
        "type": "product-offer-service-point-availabilities",
        "id": null,
        "attributes": {
            "productOfferServicePointAvailabilities": [
                {
                    "servicePointUuid": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
                    "productOfferServicePointAvailabilityResponseItems": [
                        {
                            "productOfferReference": "offer419",
                            "isNeverOutOfStock": false,
                            "isAvailable": false,
                            "availableQuantity": 0,
                            "productConcreteSku": "093_24495843",
                            "identifier": "0"
                        },
                        {
                            "productOfferReference": "offer420",
                            "isNeverOutOfStock": false,
                            "isAvailable": false,
                            "availableQuantity": 0,
                            "productConcreteSku": "091_25873091",
                            "identifier": "1"
                        }
                    ]
                },
                {
                    "servicePointUuid": "7e3b03e0-c53c-5298-9ece-968f4628b4f8",
                    "productOfferServicePointAvailabilityResponseItems": [
                        {
                            "productOfferReference": "offer419",
                            "isNeverOutOfStock": false,
                            "isAvailable": false,
                            "availableQuantity": 0,
                            "productConcreteSku": "093_24495843",
                            "identifier": "0"
                        },
                        {
                            "productOfferReference": "offer420",
                            "isNeverOutOfStock": false,
                            "isAvailable": false,
                            "availableQuantity": 0,
                            "productConcreteSku": "091_25873091",
                            "identifier": "1"
                        }
                    ]
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/product-offer-service-point-availabilities"
        }
    }
}
```

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| product-offer-service-point-availabilities | servicePointUuid | String | Define the service point for which the availability is provided. |
| product-offer-service-point-availabilities | productOfferServicePointAvailabilityResponseItems | Object | List of product offers returned for a `servicePointUuid`. |
| product-offer-service-point-availabilities | productOfferReference | String | Identifier of the product offer for which availability is returned. |
| product-offer-service-point-availabilities | isNeverOutOfStock | Boolean | Defines if the product offer can run out of stock. |
| product-offer-service-point-availabilities | isAvailable | String | Defines if the product offer is available for ordering. |
| product-offer-service-point-availabilities | availableQuantity | String | Defines the quantity of the product offer available for ordering.  |
| product-offer-service-point-availabilities | productConcreteSku | String |  |
| product-offer-service-point-availabilities | identifier | String |  |





## Possible errors

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
