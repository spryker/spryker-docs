---
title: Catalog Schema
originalLink: https://documentation.spryker.com/v4/docs/db-schema-catalog
redirect_from:
  - /v4/docs/db-schema-catalog
  - /v4/docs/en/db-schema-catalog
---

## Products

### Abstract and Concrete Products

{% info_block infoBox %}
Spryker's product catalog is divided into Abstract Products that contain all common Attributes and Variants (~ Concrete Products
{% endinfo_block %}. The Attributes which make the difference among the Variants are called Super-Attributes (e.g. Size of T-Shirts).)
![Database product abstract](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/product-abstract.png){height="" width=""}

| | | |
| --- |---| --- |
|  **Abstract Product** | Holds all data which is the same for all variants.Holds all common attributes .Cannot be added to cart. |  "A T-shirt" |
|  **Concrete Product (~ Variant)** | A product with a specific SKU that can be added to cart.Holds these attributes which make the product unique amongst the other variants. (We are used to call them the "Super-Attributes"). The Super-Attributes are usually used for facet filters in the catalog.The final data in Yves is a merge of the attributes from an Abstract and a Concrete Product ("Attribute Inheritance"). If an attribute exist in both places then the value from the Concrete Products will be used. |  "A T-Shirt with a specific size and colour" |

### Product Attributes

{% info_block infoBox %}
Attribute keys and values are saved in JSON array to the products and their variants. This means you don't need to predefine a static schema and you don't require clean product data. Any information can be imported and then later enriched by meta data (like pre-defined values
{% endinfo_block %}, used for facet filters and full-text search. Localizable Attribute values can be translated while keys are saved without translation.)
![Product attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/product-attributes.png){height="" width=""}

**Structure:**

* There are two `*_localized_attributes` tables which hold all the localizable data (like name, seo information and attributes)
* There is an attributes field in four tables (see below)

  - The abstract and concrete product can contain attributes which don't need to be localized (e.g. dimensions)
  - The `*_localized_attributes` tables contain data which needs to be localized (e.g. material)

* The attributes field contains a json-array where the values are translated already while the keys are not.
* In contrast to most other tables we are using plural table names here. That's because every row in the `*_attributes` tables represents a set of attributes

**Example:** `/en/sony-hxr-mc2500-199`

### Attribute configuration (PIM, Search and Filters)

{% info_block infoBox %}
Any product can have any Attributes. The data is stored as pairs of keys / values in a JSON field. The idea is that inventory managers can add any kind of information and then use the Administration Interface to define what Spryker should do with the data. This way they can optimize the shop without deployments.
{% endinfo_block %}
![Attribute configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/attribute-configuration.png){height="" width=""}

**Structure:**

* Attributes are identified by the key (e.g. "material").
* The table `spy_product_attribute_key` can contain attribute keys so that it is possible to add metadata
* Super-Attributes must be declared here with `is_super=true`.
* **Data for PIM**: On the left side of `spy_product_attribute_key` you see the general attribute meta data that can be attached to the keys. (warning) This meta data is only used for the integrated PIM and does not work for imported data.

  - `spy_product_attribute_attribute::allow_input` - The user can add any input by himself.
  - `spy_product_attribute_attribute::input_type` - E.g. text, number, select, ...
  - `spy_product_attribute_attribute_value::value` - Selectable values.

* **Data for Search**: On the top right side of `spy_product_attribute_key` there is the information if an attribute is searchable.

  - `spy_product_search_attribute_map::target_field` - This field defines how the attributes is indexed in Elasticsearch (full-text, full-text-boosted, suggestion-terms, completion-terms). Multiple entries for the same attribute-key are possible.

* **Data for Filters**: On the bottom right side of `spy_product_attribute_key` there is the information if an attribute is used for facet-filters and how it looks like.

  - `spy_product_search_attribute::filter_type` - Type of filter that is shown in Yves (e.g. single-select, multi-select).

* **Searchable Products**: All the search-related information about attributes are only applied if the product is marked as searchable.

  - `spy_product_search::is_searchable` - Defines if the product appears in search results.


{% info_block warningBox %}
Synchronisation: Modifying the search and filter preferences are executing an expensive SQL query (full-text search in attributes
{% endinfo_block %} that checks all products that have the related attributes, so we've decided back then to collect all changes and "publish" them at once. The sync field is responsible for determining which attributes need to be published.)

### Multi-Store Products

{% info_block infoBox %}
Abstract Products can be activated per Store. The approach is if a product is not related to any store then it will not appear anywhere. So to make all products appear in all stores, all relations must be explicitly defined.
{% endinfo_block %}
![Multi-store products](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/multi-store-products.png){height="" width=""}

### Related Data (via Foreign Key)

{% info_block infoBox %}
Abstract and Concrete Products are related to other entities.
{% endinfo_block %}
![Related data via foreign key](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/related-data-foreign-key.png){height="" width=""}

* Every Abstract Product is represented by a Product-Detail-Page in the shop which has a unique URL per locale
* Abstract Products can be categorized
* Only Concrete Products have stocks
* Prices and Image-Sets are related to Abstract and Concrete Products. The relation to the Concrete Product has a higher priority and allows to overwrite the inherited price (or image-set)

The schema below is not complete as there are a few more entities like product reviews or product validity.

### Related Data (via SKU)

{% info_block infoBox %}
Products are also related to objects from different functional areas (e.g. sales-orders
{% endinfo_block %}. Here we are using implicit relations via the natural identifier (SKU) to avoid hard coupling among different bounded contexts which makes it easier to operate Spryker in a service approach with separated databases (product-, order-, availability-service).)
![Related data via SKU](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/related-data-sku.png){height="" width=""}

* Soft relationships:

  - We are using the SKU as a natural identifier for soft-relations.
  - These relations are not explicitly defined and therefore are not visible in the schema below.

* Sales-order-item are related to Concrete Products.
* The calculated Availability of Abstract- and Concrete Products are also related via SKU.

### Product Options

{% info_block infoBox %}
Product options are additional items with a price but without their own stock. Customers can only buy them together with a product. (e.g. an insurance for a phone
{% endinfo_block %}.)
![Product options](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/product-options.png){height="" width=""}

**Structure:**

* An Option Group can contain multiple Abstract Products. (e.g. "Warranty")
* Each group has several values (e.g. "1y", "2x", ...)
* Each value has a net and a gross price (per store and per currency)

**Example:** `/en/acer-aspire-s7-134`

### Product Bundles

{% info_block infoBox %}
Two or more product variants can be bundled together and mapped to a  Product Bundle. The Product Bundle is a regular product with its own information, price, and stock. When a customer buys a Product Bundle then each Sales-Order-Item in the Sales-Order represents one of the bundled products.
{% endinfo_block %}
![Product bundles](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/product-bundles.png){height="" width=""}

* The "Product Bundle" itself is represented by a Concrete Product while the bundled products are relations to other Concrete Products:

  - `fk_product` links to this product which represents the bundle (and which has its own price, stock, etc)
  - `fk_bundled_product` links to the bundled products which are inside the Bundle
  - If one bundled product is included several times then the quantity can higher than "1".


**Example:** `/en/hp-bundle-211`

### Product Groups

{% info_block infoBox %}
Product groups are used to link products together which are equal from the customer point of view (e.g. different colors of a T-Shirt
{% endinfo_block %}.)
![Product groups](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/product-groups.png){height="" width=""}

* Typical use case:

  - Red T-Shirt (Abstract Product)
  - Red T-Shirt in XL (Concrete Product)
  - Blue T-Shirt (Abstract Product in the same group)

**Example:** `/en/canon-ixus-160-002`

### Product Sets

{% info_block infoBox %}
Multiple products can be offered as a set so that the customer can add them to cart with a single click. Each set has its own URL and all sets can be shown on a separate section in the catalog. The typical use case is called "Shop-by-Look" and it's a common feature for fashion shops.
{% endinfo_block %}
![Product set](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/product-set.png){height="" width=""}

* The Product Set has a localizable name and can contain multiple products
* Product Sets are represented by dedicated pages in the shop and therefore have an URL
* A Product Set has its own Image Set

**Example:** `/en/sony-product-set`

### Product Relations

{% info_block infoBox %}
An Abstract Product can be related to other Abstract Products for cross- and up-selling purposes. For instance, to show "similar products" on a product detail page.
{% endinfo_block %}
![Product relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/product-relations.png){height="" width=""}

Structure:

* Like Product Sets, a Product Relation contains multiple products
* Main differences to Product Sets:

  - Relations are typed (e.g. "cross-selling")
  - Relations have a main Abstract Product (this is the product which shows the related products)


### Measurement Units

{% info_block infoBox %}
Products can be sold in different **Measurement Units**. For instance, apples can be sold in "Item" and "Kilogram" amounts. Each product variant can be sold in one or multiple different units but only one unit is the base one that we use for all internal calculations.
{% endinfo_block %}
![Measurement units](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/measurement-units.png){height="" width=""}

| Use case | Product Variant | (Internal) Base Unit | Sales Unit(s) |
| --- | --- | --- | --- |
| Appels can be bought per item or per kilogram | Apple | Item | Item, Kg |
| Cable | Cable | Kg | Kg, Meter |

**Structure:**

* **Global Measurement Units:**

  - There is a list of base units (like "cm", "meter", "kg", ...) in `spy_product_measurement_unit`
  - There is a global conversion mapping in code (e.g. "1 meter = 100 cm")

* **Base Unit**

  - An Abstract Product can have a Base Unit (otherwise we assume that the product is sold as "Item")
  - The Base Unit is used for all internal calculations of prices and stocks (e.g Cables are usually calculated in kilogram).

* **Sales Unit**

  - Concrete Products can have Sales Units which are only shown in the Shop. (e.g. Cables are usually sold in meters)
  - Sales Units are only used in Yves's presentation layer and immediately converted to the Base Unit. Either with the global or product-specific conversion rate.
  - Sales Unit attributes:

    + conversion - conversion rate to the Base Unit (e.g. "5 meter = 3 Kg")
    + precision - This number is used as a multiplier on all values (A value of 5 and a precision of 100 means a value of 5*100 = 500. This way we avoid floats).
    + `is_default` - Default Sales Unit
    + Sales Units can be toggled per store while the Base Unit has to the same on all stores

### Product Quantity

{% info_block infoBox %}
When products are added to the cart there can be restrictions like min/max quantity or an interval. This is especially useful in combination with Measurement Units (e.g. to disallow that a client buys 3g or 3 tons of apple
{% endinfo_block %}.)
![Product quantity](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/product-quantity.png){height="" width=""}

### Splittable Products

{% info_block infoBox %}
When a Quote is transferred into a Sales-Order, all Cart-Items are saved as individual Sales-Order-Items with Quantity of one. This way Spryker can assign a unique state to each Sales-Order-Item. For instance, when a customer buys the same T-Shirt five times, then the Sales-Order contains five Sales-Order-Items. Each item has its own state, so there is no problem to realize split cancelations or returns.
{% endinfo_block %}

But this does not work for all kinds of products. For instance, when a customer buys five-meter cable then she cannot cancel or return a single meter. For this reason, we introduced a new parameter for products which determines if a product is splittable or not.
![Splittable products](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/splittable-products.png){height="" width=""}

**Structure:**

* Concrete Products have a boolean `is_quantity_splittable`
* This boolean information and the quantity are also saved to the Sales-Order-Item

{% info_block warningBox %}
Even when the product is marked as splittable, Spryker may still save them into a single item. This is a performance optimization that can be applied to orders with very high quantities (e.g. "1000 nails"
{% endinfo_block %}.)

### Packaging Units

{% info_block infoBox %}
A shop can sell the same product in different Packaging Units, for example, to sell apples, options could be to sell apples as "Item", a "Bag" of apples or a "Pallet" of apples. Each Packaging Unit is represented by one product variant:
{% endinfo_block %}
![Packaging units](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/packaging-units.png){height="" width=""}

| Abstract Product | Concrete Product / Variant | Packaging Unit |
| --- | --- | --- |
| Apple |  "An apple" | Item |
| Apple |  "Bag of apples" | Bag |
| Apple |  "Pallet of apples" | Pallet |

These different product variants have their own SKU and price but they may represent the same physical product in the warehouse. For this reason, we may need to share the information about availability among these variants. We have a new optional relation between the abstract and the concrete product (variant) that marks the "Leading Product" which holds the availability. We also add a boolean *has_lead_product* to define how the calculation of the availability works.

A packaging unit contains multiple items of a product. For instance, a "Bag of apples" can contain 10 apples. This information is called the "amount" of a packaging unit. It is always related to the Leading Product.

**Structure:**

* A Packaging Unit is represented by a Concrete Product
* The Packaging Unit has a type (like "Bag", "Pallet" or "Item) and a fixed or variable amount.

  - `spy_product_packaging_unit_amount::default_amount` - E.g. a bag contains 10 apples
  - `spy_product_packaging_unit_amount::is_variable` - If true then the customer can define a different amount on the product detail page (with min/max and interval constraints)

* **Price**: In the case of a variable amount the price needs to be adjusted: (Price) * (Customer Input) / (Default Amount)
* **Availability**: there are three ways to define the availability of a Packaging Unit Product:

  1. The Packaging Unit Product has its own availability. This is used when `spy_product_packaging_unit::has_lead_product=false`
  2. The Packaging Unit Product retrieves the availability from the Leading Product (E.g. When there are 250 apples available and one bag contains 10 apples, then the availability of bags is 25).

    + This is used when `spy_product_packaging_unit::has_lead_product=true` and the stock of Packaging Unit Product is infinite

  3. Both stocks need to be obeyed and the smaller one is applied. (E.g. When there are 250 bottles and 15 crates available and one crate contains 10 bottles, then the availability of crates is 15). This is used when `spy_product_packaging_unit::has_lead_product=true` and the stock of Packaging Unit Product is not infinite

* The OMS Reservation mechanism also obeys the `has_lead_product` flag and therefore reserves either both Products or only one.

{% info_block infoBox %}
As we are using the Concrete Product to realize Product Packaging Units we may need to use Product Groups to realize deeper hierarchy structures:
{% endinfo_block %}

| What | Hierarchical Level |
| --- | --- |
| Single Chocolate BarSet of Single Chocolate BarsPallet of Sets of Single Chocolate Bars | Concrete Product (~ Packing Unit Product) |
| Chocolate Bar | Abstract Product |
| Chocolate | Product Group |

### Product Lists

{% info_block infoBox %}
A Product List can be applied to different use cases. Eg. to allow Customer Group specific product lists. There can be black- or whitelists.
{% endinfo_block %}

{% info_block errorBox %}
This feature is in progress. The schema is not final.
{% endinfo_block %}
![Product lists](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/product-lists.png){height="" width=""}

**Structure**:

* A Product List has a title and a type (blacklist or whitelist).
* There is a many-to-many relation to Concrete Products.
* **Definition**: There are several ways to define Product Lists. For instance, there is a relation to a category which says that all products that are assigned to a category are in the list as well (In the future there will be more ways to define Product Lists).
* **Use Cases**: The schema below demonstrates relation to Merchant Relationship which holds the relation information between Merchants and their Company Business Users. In the future, there will be other uses cases as well (per Customer Group, per Business Unit).

## Categories

### Categories and Nodes

{% info_block warningBox %}
Products can be categorized so that customers can filter them in the shop.
{% endinfo_block %}
![Categories and nodes](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/categories-and-nodes.png){height="" width=""}

**Structure**:

* The category has a localized name, template, an image, and some meta information

  - The name of a Category is not unique.

* The underlying tree structure is implemented via Category Nodes

  - A Category can be related do one or multiple Category Nodes
  - There is a URL per Category Node, which means that the related Category can have multiple URLs
  - For performance reasons, the tree structure is saved twice. First in `spy_category_node` and second as closure table in `spy_category_closure_table`


### Category to Product Mapping

{% info_block infoBox %}
Products can be categorized.
{% endinfo_block %}
![Category to product mapping](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/category-product-mapping.png){height="" width=""}

**Structure**:

* There is a many-to-many relation between Categories and Abstract Products

### Category Filters

{% info_block infoBox %}
Normally for categories, the system will automatically show the filters that fit the related products. But you can also manually add or remove filters and reorder them.
{% endinfo_block %}
![Category filters](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/category-filters.png){height="" width=""}

**Structure**:

* There can be additional `filter_data` value which defines the active or inactive Facet Filters that appear per Category.

## Product Prices

Spryker ships with several price related features. Here is an overview:

| | |
|---|---|
| Abstract Product Price | Price for an Abstract Product that is used as default price for all its Variants (Concrete Products) |
| Concrete Product Price | Optional price for a variant (concrete product). If there is no price then the price from the abstract product is inherited. |
| Currency / Store | Prices can exist in multiple currencies per storee..g 5 EUR in DE / 6 EUR in FR / 6 CHR in CH |
| Price Mode (Net / Gross) | Prices can exist as either net-price, gross-price or both. |
| Volume price | Price gets lower when more items of the same SKUs are purchased. |
| Merchant Price | The same product is sold by different merchants. Each merchant provides its own price (like at Amazon Marketplace).In B2C Shops the Merchant Prices are usually used for all customers while in B2B scenarios there can be individual Merchant Prices that are only valid for a relationship between a Merchant and some Company Business Units. |
| Custom Amount Price(for Packaging Units) | With packaging units we will introduce a possibility to change the amount. There is always a default amount that is related to the price of the product variant. In case the customer changes another amount then the price is adapted.Example: A bag of 10 apples costs 5.-. The customer changes the amount to 12 apples then he pays 5 * 12/10 = 6.- |
| Price Types | Some products have multiple Price Types. For instance a mobile phone contract has a one-time price, a monthly fee and a working-price per minute. |
| Promotion price(~ former "Strike Price") | A temporal lower price that is shown as a strike price in shop.This can be configured in two ways per company/business-unit: <ul><li> If the promotion price is lower than the price-per-business unit then it will be used (and vice-versa)</li><li>But it is also possible that a price-per-business is fixed and the promotion price is ignored.</li></ul>  |
{% info_block errorBox %}
The Promotional price feature is currently under development.
{% endinfo_block %}

### General Schema

{% info_block infoBox %}
Prices are related to Abstract and Concrete Products. The idea is that the Abstract Product holds the general price which can be inherited or overwritten by the Concrete Product.
{% endinfo_block %}
![Product prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/product-prices.png){height="" width=""}

**Structure**:

* The actual net and gross price values are stored in `spy_price_product_store`.

  - `spy_price_product_store::price_data` - This field holds JSON data which can be used to define alternative prices which overwrites the given net or gross values. A typical use case is the **Volume Price** feature but the data can be used for any other Use case as well.
  - The `spy_price_product::price` field is deprecated and only exists for backward compatibility reasons.

* **Price Type**:

  - Every product can have multiple prices by the defined price types (e.g. Price per working hour, Price per month, Initial price, ....).
  - The default price of the products is also a price type and the system relies on its existence.
  - This feature is not implemented yet.


### Price Dimensions

Product prices have two main characteristics: **Price Types** and **Price Dimension**
![Price dimensions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/price-dimensions.png){height="" width=""}

| | |
| ---| ---|
|  **Price Type** | Every product can have multiple prices by the defined price types at the same time. For instance when you buy a mobile phone with a contract then there is: <ul><li>One time price which is the Default Price that needs to be paid immediately</li><li>Monthly fee</li><li>Working price (per minute or sms)</li></ul>All prices need to be calculated and are shown in the Cart and Checkout but only the Default Price is used to pay the order|
|  **Price Dimension** | Prices can have dimensions which explain when the Price can be applied.The following dimensions are present at the moment: Price per .... <ul><li>Mode</li> (Net/Gross)<li>Volume</li><li>Store</li><li>Currency</li>~<li>Merchant Relationship</li></ul>In the future there can be other dimensions, like Price per Customer Group. When a product is added to the cart then the system needs to find the price which fits to the current context (Store, Currency, ....). If no price applies then the Default Price is used. It may also happen that several prices apply. In this case the lowest value is selected (See `SinglePriceProductFilterMinStrategy->findOne()` ) |
{% info_block errorBox %}
The Price type feature is prepared in the schema but not implemented yet.
{% endinfo_block %}
**Structure**:

* The price dimensions are modeled as a [Star Schema](https://en.wikipedia.org/wiki/Star_schema) around the `spy_price_product_store` table.

  -
The table `spy_price_product_store` has a bad name. When it was introduced we only considered the Store-dimension.

* We are using a virtual dimension `spy_price_product_default` to declare the Default Price.
* It can happen that the number of rows because very high. For instance when there are 5 Stores, 3 Currencies, 10 000 customers and 1000 merchants and there is one price per Merchant-Customer relation. In this case, the total amount of prices would be 5*3*10k*1k = 150Mio. For this reason we implemented three approaches to optimize the data:

  - The Price Mode (Net/Gross) are both contained in a single row.
  - The Volume Price dimension is represented in a denormalized way as JSON in a single field.
  - Prices that are defined on the Merchant Relationship are compressed. So every unique value is saved only once and then referenced from the `spy_price_product_merchant_relationship` table. This way we have a much lower number of price values but still a very high number of rows on the relationship-table.


## Stock & Availability

### Stock

{% info_block infoBox %}
The Stock of a product represents the physical amount of products in the warehouse. This information should be imported from a WMS (warehouse management system
{% endinfo_block %} and is never changed by Spryker directly.)

{% info_block warningBox %}
Stocks are not directly related to Stores but there is a Store-to-Warehouse Mapping that be configured in code (see `StockConfig`
{% endinfo_block %}. Stocks can be dedicated or shared among Stores.)
![Stock](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/stock.png){height="" width=""}

**Structure**:

* Concrete Products have one or multiple stock quantities.
* Stocks have a name which is usually the name of the warehouse which holds the stock.
* Stocks can be marked as "`is_never_out_of_stock`".

### Availability

{% info_block infoBox %}
The Availability of a Product is a calculated information: Available Quantity = Stock Quantity - Number of Reserved Items The Availability is used to determine if a product is available or sold out. The available quantity can  be a negative value (Scenario of overselling
{% endinfo_block %}.)

{% info_block warningBox %}
"Reserved Item" means that there is a Sales Order Item with a State that is marked as "Reserved" in the State Machine.
{% endinfo_block %}
![Availability](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/availability.png){height="" width=""}

**Structure**:

* The available quantity is saved per Concrete Product per Store (linked via SKU to avoid cross-boundary coupling). This information is saved when the Stock was changed or when a Sales-Order-Item enters or leaves a reserved State.
* The table `spy_availability_abstract` contains the available quantity of the Abstract Product. This information is needed to decide if a Product Detail Page  From a mathematical perspective this is the sum of the quantities of the Concrete Products that are bigger then 0 (which means we ignore Concrete Products that are oversold).
* Example:

  - T-Shirt XL has an available quantity of 5
  - T-Shirt L has an available quantity of 1
  - T-Shirt has an available quantity of -3
  - Then the quantity of the Abstract Product is 5 + 1 ~~+ (-3)~~ = 6


### Reservations

{% info_block infoBox %}
Spryker's OMS allows reserving Products which are sold but not yet shipped.
{% endinfo_block %}
![Reservations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Catalog+Schema/reservations.png){height="" width=""}

Structure:

* `spy_oms_product_reservation` contains the reserved Quantity of a product per Store.
* The table `spy_oms_product_reservation_store` is used to import reservations from other Stores which uses a different database.

{% info_block warningBox %}
This feature is not fully working.
{% endinfo_block %}

