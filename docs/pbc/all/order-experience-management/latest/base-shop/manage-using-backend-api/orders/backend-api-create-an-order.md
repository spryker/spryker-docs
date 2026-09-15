---
title: "Backend API: Create an order"
description: Learn how to place a sales order from an intake payload—including line items, shipment, payment, and on-behalf-of ordering—using the Spryker Backend API.
last_updated: Sep 15, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Retrieve orders
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html
  - title: Fire an order event
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-fire-an-order-event.html
---

The `orders` resource of the Backend API lets Back Office integrations place a sales order from an intake payload. This document describes how to create an order and which validations the request has to pass.

Order intake does not reimplement checkout: the payload is assembled into a quote and handed to the same checkout flow the Storefront uses, so an API-placed order goes through the same pre-condition plugins, calculation, order-management bootstrapping, and mail as one placed by a customer.

## Installation

The endpoints are provided by the `OrderExperienceManagement` module, which delegates to the existing `Checkout`, `Sales`, `Oms`, and pricing modules rather than reimplementing them. For details on installing it, see [Install the Orders Backend API feature](/docs/pbc/all/order-experience-management/latest/base-shop/install-and-upgrade/install-features/install-the-orders-backend-api-feature.html).

## Create an order

To place an order, send the request:

---
`POST` **/orders**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: create an order for an existing customer

`POST https://glue-backend.mysprykershop.com/orders`

```json
{
    "data": {
        "type": "orders",
        "attributes": {
            "customerReference": "DE--6",
            "store": "DE",
            "currency": "EUR",
            "paymentMethod": "dummyPaymentInvoice",
            "shipment": {
                "shipmentMethod": "Standard",
                "shippingAddress": {
                    "salutation": "Ms",
                    "firstName": "Ada",
                    "lastName": "Lovelace",
                    "address1": "Julie-Wolfthorn-Strasse",
                    "address2": "1",
                    "zipCode": "10115",
                    "city": "Berlin",
                    "iso2Code": "DE"
                }
            },
            "billingAddress": {
                "salutation": "Ms",
                "firstName": "Ada",
                "lastName": "Lovelace",
                "address1": "Julie-Wolfthorn-Strasse",
                "address2": "1",
                "zipCode": "10115",
                "city": "Berlin",
                "iso2Code": "DE"
            },
            "items": [
                {
                    "sku": "001_25904006",
                    "quantity": 1
                }
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| customerReference | String | &check; | Reference of the customer the order belongs to. Must reference an existing customer—intake never registers one. |
| store | String | &check; | Store to place the order in. |
| currency | String | &check; | ISO 4217 currency code. |
| paymentMethod | String | &check; | Payment method key—for example, `dummyPaymentInvoice`—not the display name. For an order with no payment charged, use the platform's zero-payment method key—for example, `Nopayment`. |
| billingAddress | Object | &check; | Billing address. Give `uuid` to reference one of the customer's saved addresses, or supply `firstName`, `lastName`, `zipCode`, `city`, and `iso2Code` inline. |
| billingAddress.uuid | String | | Reference to one of the customer's saved addresses; must belong to the order's customer. The other `billingAddress` fields are ignored when set. |
| billingAddress.iso2Code | String | | ISO 3166-1 alpha-2 country code. |
| shipment | Object | &check; | Default delivery for every item that doesn't override it with its own `shipment`. |
| shipment.shipmentMethod | String | &check; | Shipment method name applied to every item that doesn't override it. |
| shipment.shippingAddress | Object | &check; | Delivery address for the order. Same shape as `billingAddress`. Individual lines can override this with `items.shipment.shippingAddress`. |
| shipment.requestedDeliveryDate | String | | Requested delivery date applied to every item that doesn't override it. |
| items | Array | &check; | Order line items. At least one is required. |
| items.sku | String | &check; | Concrete product SKU. |
| items.quantity | Integer | | Ordered quantity, in the product's base measurement unit. Required, except when `items.salesUnit.amount` is supplied—the quantity is then derived from it, and must either be omitted or match what it derives to. |
| items.salesUnit | Object | | The measurement unit the line is ordered in—"2 metres" rather than "200 base units". Omit it for a product sold in base units. |
| items.salesUnit.code | String | | Measurement unit code—for example, `METR`, `KILO`. Must be a unit the line's product is sold in, and available in the order's store. |
| items.salesUnit.amount | Number | | How many of `code` are ordered. The base-unit `quantity` is derived as `amount * conversion`; the order is rejected when that is not a whole number of base units. Omit it to supply `quantity` directly instead. |
| items.unitCustomPrice | Integer | | Unit price in cents to charge instead of the product's own price—a deliberate admin capability. Omitted lines are priced from the catalog. |
| items.merchantReference | String | | Merchant fulfilling the line, for a marketplace line. Supply with `sku`; omit for an operator-sold line. |
| items.productOfferReference | String | | The specific offer to buy, when a merchant holds several offers for the SKU. |
| items.note | String | | Free-text note carried on the line. |
| items.packagingAmount | Object | | For a product sold as a package, how much of the contained product the package holds. Omit it to order the package's configured default amount, and omit the whole object for a product that isn't sold as a package. |
| items.packagingAmount.amount | Number | | Amount per package, not for the whole line—3 boxes of 250 is `quantity: 3` with `packagingAmount.amount: 250`. Must respect the package's configured minimum, maximum, and step, and can differ from the default only when the package allows a variable amount. |
| items.packagingAmount.salesUnitCode | String | | Measurement unit the amount is expressed in—a unit of the contained product, not of the package itself. Defaults to the contained product's default unit when omitted. |
| items.productOptions | Array | | Product options selected for the line, as `[{"sku": "..."}]`. Options are per line, so the same product ordered twice with different options is two lines. |
| items.productOptions.sku | String | | Product option SKU. The option must be active, offered for the line's product, and priced in the order's store and currency. |
| items.shipment | Object | | Per-line delivery override. Same shape as the order-level `shipment`. Falls back to the order-level `shipment` when omitted. |
| orderCustomReference | String | | The caller's own reference for the order—for example, a purchase-order number or EDI document ID. Shown in the Back Office. |
| companyBusinessUnitUuid | String | | Business unit to place the order for. Selects which merchant-relationship contract prices apply, and is recorded on the order. Must be one the order's customer belongs to through an active company user. Resolved automatically when the customer belongs to exactly one business unit, and required when they belong to several. |
| priceMode | String | | Whether submitted unit prices are gross or net: `GROSS_MODE` or `NET_MODE`. Default: `GROSS_MODE`. |
| locale | String | | Locale to place the order in—for example, `de_DE`. Also selects the language of the order-confirmation email. Falls back to whatever checkout resolves by default when omitted. Must be a locale known to the platform. |
| cardCodes | Array | | Codes to apply to the order at placement—gift cards, vouchers, or any other code a registered cart-code plugin resolves. See `payments` in the response for how much a redeemed gift card actually covered. |

{% info_block infoBox "On-behalf-of ordering" %}

Passing `companyBusinessUnitUuid` also decides whose place-order permission is checked. Naming a business unit whose company user lacks that permission gets the order rejected as requiring approval, even though the named business unit is a valid one for the customer.

{% endinfo_block %}

### Response

The response contains the created order in the same shape as [retrieving a single order](/docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html#retrieve-an-order), except `comments` is always empty—a freshly placed order has none yet.

<details>
<summary>Response sample: create an order</summary>

```json
{
    "data": {
        "id": "DE--1235",
        "type": "orders",
        "attributes": {
            "orderReference": "DE--1235",
            "customerReference": "DE--6",
            "store": "DE",
            "currency": "EUR",
            "createdAt": "2026-09-04 09:12:31",
            "priceMode": "GROSS_MODE",
            "itemsCount": 1,
            "itemStates": ["new"],
            "availableEvents": ["ship", "cancel"],
            "customer": {
                "email": "ada@spryker.com",
                "salutation": "Ms",
                "firstName": "Ada",
                "lastName": "Lovelace"
            },
            "totals": {
                "subtotal": 34500,
                "expenseTotal": 490,
                "discountTotal": 0,
                "taxTotal": 4658,
                "taxBreakdown": [],
                "grandTotal": 29176,
                "canceledTotal": 0,
                "refundableTotal": 29176,
                "remunerationTotal": 0
            },
            "expenses": [
                {
                    "type": "SHIPMENT_EXPENSE_TYPE",
                    "name": "Standard",
                    "sumPrice": 490,
                    "taxRate": 19,
                    "sumTaxAmount": 78,
                    "sumDiscountAmountAggregation": 0,
                    "sumPriceToPayAggregation": 490,
                    "canceledAmount": 0
                }
            ],
            "calculatedDiscounts": [],
            "payments": [
                {
                    "paymentProvider": "DummyPayment",
                    "paymentMethod": "dummyPaymentInvoice",
                    "amount": 29176,
                    "meta": {}
                }
            ],
            "items": [
                {
                    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "sku": "001_25904006",
                    "name": "Canon PowerShot SC620",
                    "quantity": 1,
                    "unitPrice": 34500,
                    "sumPrice": 34500,
                    "taxRate": 19,
                    "sumTaxAmount": 4658,
                    "refundableAmount": 29176,
                    "canceledAmount": 0,
                    "calculatedDiscounts": [],
                    "sumSubtotalAggregation": 34500,
                    "sumDiscountAmountFullAggregation": 0,
                    "sumPriceToPayAggregation": 29176,
                    "state": "new",
                    "availableEvents": ["ship", "cancel"]
                }
            ],
            "comments": []
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/orders/DE--1235"
        }
    }
}
```

</details>

{% include /pbc/all/order-experience-management/latest/manage-using-backend-api/orders-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/order-experience-management/latest/manage-using-backend-api/orders-backend-response-attributes.md -->

{% include /pbc/all/order-experience-management/latest/manage-using-backend-api/orders-item-backend-attributes.md %} <!-- To edit, see _includes/pbc/all/order-experience-management/latest/manage-using-backend-api/orders-item-backend-attributes.md -->

## Possible errors

The request is validated as a whole: if any check fails, nothing is created and all failed checks are returned in the `errors` array, each `detail` naming the offending field path—for example, `items[1].sku => Product with SKU "nope" was not found.`.

| STATUS | CODE | REASON |
| --- | --- | --- |
| 422 | 901 | A required attribute is missing, is blank, or has a wrong type—for example, `customerReference => This value should not be blank.`. |
| 422 | N/A | The customer referenced by `customerReference` doesn't exist. |
| 422 | N/A | `companyBusinessUnitUuid` doesn't belong to the named customer, or the customer's company user lacks the place-order permission for it. |
| 422 | N/A | A line item's `sku` doesn't exist, or isn't available in the order's store. |
| 422 | N/A | A line item's `productOptions.sku` doesn't exist, isn't offered for the product, or isn't priced in the order's store and currency. |
| 422 | N/A | A line item's `salesUnit.code` isn't a unit the product is sold in, or `salesUnit.amount` doesn't derive to a whole number of base units. |
| 422 | N/A | A line item's `packagingAmount.amount` violates the package's configured minimum, maximum, or step. |
| 422 | N/A | A referenced address `uuid` doesn't belong to the order's customer. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `orders` resource. |

Checkout errors are translated into the caller's `Accept-Language` where a glossary translation exists.

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
