---
title:  PunchOut Protocols Coverage
description: Find out which parts of supported PunchOut protocols are covered in Spryker implementation
last_updated: June 9, 2026
template: howto-guide-template
label: early-access
---

PunchOut flow protocols cXML and OCI contain a big range of features, which also consist of different functional elements, XML and form fields.

Find out below which parts are supported out of the box and plan extension of the missing ones on the project accordingly.

## cXML Flow fields mapping

This section lists the cXML elements that the PunchOut Gateway interprets on the inbound `PunchOutSetupRequest` and emits on the outbound `PunchOutSetupResponse` and `PunchOutOrderMessage`. Elements that are not listed are not parsed by the default flow.

### Received elements (buyer to Spryker)

The buyer's eProcurement system posts a `PunchOutSetupRequest` cXML document to the connection's `request_url`. The raw XML body is parsed by `DefaultCxmlContentParser` into `PunchoutCxmlSetupRequestTransfer`.

#### cXML Header

| Element | Required | Purpose                                                                                                       |
| --- | --- |---------------------------------------------------------------------------------------------------------------|
| `cXML/@payloadID` | Yes | Stored as `payloadId`. Echoed in logs.                                                                        |
| `cXML/@timestamp` | Yes | Stored as `timestamp` in ISO 8601 format.                                                                     |
| `Header/From/Credential/Identity` | Yes | Stored as `fromIdentity` and `buyerIdentity`. Used as `To` in the cart return message.                        |
| `Header/To/Credential/Identity` | Yes | Stored as `toIdentity`. Used as `From` and `Sender` in the cart return message.                               |
| `Header/Sender/Credential/Identity` | Yes | Stored as `senderIdentity`. Used for connection identification, lookup .                                      |
| `Header/Sender/Credential/SharedSecret` | Yes | Stored as `senderSharedSecret`. Verified by `PunchoutCxmlAuthenticator` against the connection's stored hash. |

#### cXML Payload

| Element | Required | Purpose |
| --- | --- | --- |
| `PunchOutSetupRequest/@operation` | Yes | Either `create` or `edit`. For `edit` the existing items are parsed and used to find the matching session quote. |
| `PunchOutSetupRequest/BuyerCookie` | Yes | Stored as `buyerCookie`. Echoed verbatim in the cart return message. |
| `PunchOutSetupRequest/BrowserFormPost/URL` | Yes | Stored as `browserFormPostUrl`. The cart return message is POSTed to this URL. |
| `PunchOutSetupRequest/Extrinsic` | No | All `Extrinsic` children are collected into `extrinsicFields` as a key/value map for project-level customization. |

#### Ship-to address

When `PunchOutSetupRequest/ShipTo/Address` is present, the following are mapped to `PunchoutAddressTransfer`:

| Element | Maps to |
| --- | --- |
| `Address/Name` | `addressName` |
| `Address/PostalAddress/Street` | `streetLines[]` (multiple lines supported) |
| `Address/PostalAddress/City` | `city` |
| `Address/PostalAddress/State` | `state` |
| `Address/PostalAddress/PostalCode` | `postalCode` |
| `Address/PostalAddress/Country` | `country` (text) |
| `Address/PostalAddress/Country/@isoCountryCode` | `countryCode` |

#### Item list (only when `operation="edit"`)

For each `ItemOut`, a `PunchoutItemTransfer` is built:

| Element | Maps to |
| --- | --- |
| `ItemOut/@lineNumber` | `lineNumber` |
| `ItemOut/@quantity` | `quantity` |
| `ItemOut/ItemID/SupplierPartID` | `supplierPartId` |
| `ItemOut/ItemID/SupplierPartAuxiliaryID` | `supplierPartAuxiliaryId` |
| `ItemOut/ItemDetail/Description` | `description` |
| `ItemOut/ItemDetail/UnitOfMeasure` | `unitOfMeasure` |
| `ItemOut/ItemDetail/UnitPrice/Money` | `unitPrice` |
| `ItemOut/ItemDetail/UnitPrice/Money/@currency` | `currency` |
| `ItemOut/ItemDetail/Classification` (first) | `classification` |
| `ItemOut/ItemDetail/ManufacturerPartID` | `manufacturerPartId` |
| `ItemOut/ItemDetail/ManufacturerName` | `manufacturerName` |

### Returned elements (Spryker to buyer)

The PunchOut Gateway emits two outbound cXML documents.

#### `PunchOutSetupResponse` — synchronous reply to `PunchOutSetupRequest`

Returned with HTTP `200 OK` and `Content-Type: text/xml`. Built by `CxmlResponseBuilder`.

| Element | Source | Notes |
| --- | --- | --- |
| `Response/PunchOutSetupResponse/StartPage/URL` | `PunchoutSetupResponseTransfer.startPageUrl` | Absolute URL the buyer's browser opens to launch the shopping session. Includes the session token query parameter. |

On authentication, validation, or processing errors a cXML `Status` document is returned instead, with a non-`200` status code:

| Element | Source |
| --- | --- |
| `Response/Status/@code` | `statusCode` |
| `Response/Status/@text` | `statusText` |
| `Response/Status` (text) | `errorMessage` |

#### `PunchOutOrderMessage` — cart return to the buyer

Built by `CxmlPunchoutOrderMessageMapper` and POSTed to `BrowserFormPost.URL` from the original setup request when the buyer transfers the cart back.

Header:

| Element | Source | Notes |
| --- | --- | --- |
| `cXML/@xml:lang` | Default `en-US` | `SharedPunchoutGatewayConfig::DEFAULT_CXML_LANGUAGE`. |
| `Header/From/Credential` | `toIdentity` from setup request | Domain defaults to `DUNS` (`SharedPunchoutGatewayConfig::DEFAULT_CXML_CREDENTIAL_DOMAIN`). |
| `Header/To/Credential` | `fromIdentity` from setup request | Domain defaults to `DUNS`. |
| `Header/Sender/Credential` | `toIdentity` + stored `senderSharedSecret` | Domain defaults to `DUNS`. |
| `Header/Sender/UserAgent` | Default `Spryker cXML` | `SharedPunchoutGatewayConfig::DEFAULT_CXML_SENDER_USER_AGENT`. |
| `cXML/@payloadID`, `cXML/@timestamp` | Generated | Set by the `cxml-lib` builder. |

Message payload:

| Element | Source | Notes |
| --- | --- | --- |
| `PunchOutOrderMessage/BuyerCookie` | `PunchoutSessionTransfer.buyerCookie`                              | Echoed from the setup request.                                                                                        |
| `PunchOutOrderMessageHeader/@operationAllowed` | `PunchoutSessionTransfer.operation`                                | Either `create` or `edit`, the value is taken from the setup request.                                                 |
| `PunchOutOrderMessageHeader/Total/Money/@currency` | Currency of the cart, taken from the quote currency code | The builder propagates it to every monetary element. |
| `ItemIn/ItemID/SupplierPartID` (per item) | Product concrete SKU, taken from `ItemTransfer.sku`                |                                                                                                                       |
| `ItemIn/@quantity` (per item) | Quantity of this item, taken from `ItemTransfer.quantity`           |                                                                                                                       |
| `ItemIn/ItemDetail/Description` (per item) | Product name, taken from `ItemTransfer.name`                        |                                                                                                                       |
| `ItemIn/ItemDetail/UnitOfMeasure` (per item) | Constant `EA` | `SharedPunchoutGatewayConfig::DEFAULT_UNIT_OF_MEASURE`. |
| `ItemIn/ItemDetail/UnitPrice/Money` (per item) | Product price, taken from `ItemTransfer.unitPrice`                 |                                                                                                                       |
| `ItemIn/ItemDetail/Classification@domain` (per item) | Constant `UNSPSC`                                                  |                                                                                                                       |
| `ItemIn/ItemID/SupplierPartAuxiliaryID` (per item) | — | Optional; emitted only when mapped. |
| `ItemIn/ItemID/BuyerPartID` (per item) | `ItemTransfer.groupKey` | Falls back to the item group key. |
| `ItemIn/ItemDetail/Classification` (per item) | — | Optional; empty unless mapped. |
| `ItemIn/ItemDetail/ManufacturerPartID` (per item) | — | Optional; emitted only when mapped. |
| `ItemIn/ItemDetail/ManufacturerName` (per item) | — | Optional; emitted only when mapped. |
| `ItemIn/ItemDetail/LeadTime` (per item) | — | Optional; emitted only when mapped. |
| `ItemIn/ItemDetail/Extrinsic` (per item) | `extrinsicFields` from the setup request | Per-item extrinsics with the blacklist applied. |
| `PunchOutOrderMessageHeader/ShipTo/Address/Name` | `QuoteTransfer.shippingAddress.firstName + lastName`               | Falls back to `Ship To` when both are empty.                                                                          |
| `PunchOutOrderMessageHeader/ShipTo/Address/PostalAddress/Street` | `address1`, `address2`, `address3`                                 | Empty lines are skipped.                                                                                              |
| `PunchOutOrderMessageHeader/ShipTo/Address/PostalAddress/City` | `QuoteTransfer.shippingAddress.city`                               |                                                                                                                       |
| `PunchOutOrderMessageHeader/ShipTo/Address/PostalAddress/State` | `QuoteTransfer.shippingAddress.region`, with fallback to `QuoteTransfer.shippingAddress.state` |                                                                                                                       |
| `PunchOutOrderMessageHeader/ShipTo/Address/PostalAddress/PostalCode` | `QuoteTransfer.shippingAddress.zipCode`                            |                                                                                                                       |
| `PunchOutOrderMessageHeader/ShipTo/Address/PostalAddress/Country/@isoCountryCode` | `QuoteTransfer.shippingAddress.iso2Code`                           |                                                                                                                       |
| `PunchOutOrderMessageHeader/Shipping/Money` + `Description` | `sumGrossPrice` of the first expense of type `SHIPMENT_EXPENSE_TYPE`                                | Description fixed to `Shipping`. Omitted when no expense total is set.                                                |
| `PunchOutOrderMessageHeader/Tax/Money` + `Description` | `QuoteTransfer.totals.taxTotal.amount`                             | Description fixed to `Tax`. Omitted when no tax total is set.                                                         |
| `PunchOutOrderMessageHeader/Extrinsic` (per field) | `extrinsicFields` from the original `PunchOutSetupRequest`         | Echoed back inside `PunchOutOrderMessageHeader`, with the keys in `PunchoutGatewayConfig::EXTRINSIC_BLACKLIST` removed. See [Extrinsic blacklist](#extrinsic-blacklist) below. |

For field-level changes, use the per-connection mapping described in [Per-connection field mapping](#per-connection-field-mapping). For deeper changes, replace the parser or message-mapper services, 
or set a custom cXML processor plugin FQCN on the connection's `processor_plugin_class` column. Processor plugins are loaded at runtime by class name; no dependency-provider registration is required. For details, see [Project configuration for PunchOut Gateway](/docs/pbc/all/punchout-gateway/project-configuration-for-punchout-gateway.html).

### Per-connection field mapping

Beyond the defaults above, you can remap any emitted field or property per connection without custom code. Each connection stores a `mappings` map of *key* to *source expression*, 
edited in the Back Office connection configuration (the cXML and OCI configuration forms). At cart-return time, `FieldValueResolver` evaluates each expression against the current quote and item.

The **key** identifies the target field by its full location in the outbound document, written as a dot-separated path (for cXML) or as the form field name (for OCI). You do not need to memorize these keys:
the complete catalog of mappable keys is defined in code by `PunchoutGatewayConfig::getSupportedCxmlFields()` for cXML and `PunchoutGatewayConfig::getSupportedOciFields()` for OCI, 
and the same lists populate the field drop-downs in the Back Office configuration forms.

Resolution follows two rules:

- **Required fields** (those with a default in the tables above) fall back to the default when the field is unmapped, or the expression resolves to `null`.
- **Optional fields** are omitted entirely when unmapped or unresolved.

A source expression is one of the following:

- A **property path** in the form `pluginKey.field`. The `item` plugin reads from the current `ItemTransfer` and the `quote` plugin reads from the `QuoteTransfer`. For example, `item.sku` or `quote.currency.code`.
- A **quoted literal**, single- or double-quoted, emitted verbatim. For example, `"EA"`.
- A **concatenation** of the above, joined with `&`. For example, `item.sku & "-" & item.groupKey`.
- An empty literal `""`, which forces an empty value.

The tables on this page list the fields that the default flow emits; any other key from the supported catalog is emitted only when you map it.

### Extrinsic blacklist

`CxmlPunchoutOrderMessageMapper::filterExtrinsics()` removes any extrinsic whose key matches `PunchoutGatewayConfig::EXTRINSIC_BLACKLIST` before echoing the remaining values back inside each `PunchOutOrderMessageHeader`.
The blacklist guards against leaking personally identifiable information that the buyer's procurement system sent for customer resolution. 

## OCI Flow fields mapping

This section lists the OCI form fields that the PunchOut Gateway interprets on the inbound login and emits on the outbound cart return.
Any inbound fields that are not listed are preserved in `PunchoutOciLoginRequestTransfer.formData` for a potential project level customisation.

### Received fields (buyer to Spryker)

The buyer's eProcurement system posts an HTML form to the connection's `request_url`. The default OCI flow reads the following fields:

| Field | Required | Purpose |
| --- | --- | --- |
| `USERNAME` | Yes | Identifies the buyer user. The field name is configurable per connection through `usernameField`; `USERNAME` is the default. Matched against `spy_punchout_credential.username`. |
| `PASSWORD` | Yes | Authenticates the buyer user. The field name is configurable per connection through `passwordField`; `PASSWORD` is the default. Verified against the stored password hash. |
| `HOOK_URL` | Yes | Target URL the cart return form is posted to at checkout. Must start with `https://`. Stored on the session as `browserFormPostUrl`. |
| `~TARGET` | No | Frame target echoed back to the buyer. |
| `~OkCode` | No | SAP control field. |
| `~CALLER` | No | SAP control field. |

### Returned fields (Spryker to buyer)

When the Spryker Shop transfers the cart back, HTML form with a button `Transfer Cart` is rendered, whose `action` is the `HOOK_URL` received at login.
`~TARGET` rendered as the `target` attribute of the form.

The form contains the following fields. The six `NEW_ITEM-*` fields below are required and always emitted; every other field in `PunchoutGatewayConfig::getSupportedOciFields()` 
(for example, `NEW_ITEM-MATNR`, `NEW_ITEM-MANUFACTMAT`, `NEW_ITEM-LEADTIME`, `NEW_ITEM-LONGTEXT`, and `NEW_ITEM-CUST_FIELD1` through `NEW_ITEM-CUST_FIELD5`) is emitted only when mapped on the connection.
`NEW_ITEM-LONGTEXT` is rendered with the SAP-specific name `NEW_ITEM-LONGTEXT_<n>:132[]` instead of `NEW_ITEM-LONGTEXT[<n>]`.

| Field | Source | Notes                                                                                                          |
| --- | --- |----------------------------------------------------------------------------------------------------------------|
| `NEW_ITEM-DESCRIPTION[N]` | `ItemTransfer.name` | Item name.                                                                                                     |
| `NEW_ITEM-QUANTITY[N]` | `ItemTransfer.quantity` | Quantity as integer string.                                                                                    |
| `NEW_ITEM-UNIT[N]` | Constant `EA` | Unit of measure. Fixed to `EA` (see `PunchoutGatewayConfig::DEFAULT_UNIT_OF_MEASURE`).                         |
| `NEW_ITEM-PRICE[N]` | `ItemTransfer.unitPrice` | Unit price. Converted from cents using the currency's fraction digits and formatted with three decimal places. |
| `NEW_ITEM-CURRENCY[N]` | `QuoteTransfer.currency.code` | ISO currency code of the quote.                                                                                |
| `NEW_ITEM-VENDORMAT[N]` | `ItemTransfer.sku` | Vendor material number.                                                                                        |
| `~OkCode` | Echoed from login | Echoed only when present in the original login.                                                                |
| `~CALLER` | Echoed from login | Echoed only when present in the original login.                                                                |

For field-level changes, use the per-connection mapping described in [Per-connection field mapping](#per-connection-field-mapping). For deeper changes, 
replace the form-builder service or set a custom OCI processor plugin FQCN on the connection's `processor_plugin_class` column. 
Processor plugins are loaded at runtime by class name; no dependency-provider registration is required. For details, see [Project configuration for PunchOut Gateway](/docs/pbc/all/punchout-gateway/project-configuration-for-punchout-gateway.html).
