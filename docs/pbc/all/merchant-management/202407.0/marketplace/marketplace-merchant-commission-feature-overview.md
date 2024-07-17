The Marketplace Merchant Commission feature lets you collect commission from the merchants in a marketplace.

There can be several commission in a shop at a time. This lets you set up different types of commissions to cater for different merchant categories. For example, you might want to collect a smaller commission from merchants that sell products in categories with smaller selling volumes.

## Managing merchant commissions

Commissions can be imported by a developer. For import details, see [Import file details: merchant_commission.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant-comission.csv.html).


Back Office users can view commissions in **Marketplace**>**Merchant Commissions**.

## Applying merchant commissions conditionally

Conditions are used to identify which commission is to be applied to individual order items.

Conditions are based on the following criteria:
* Product attribute, like brand or color.
* Product category, like Electronics.
* Item price, for example—a price range of 100€ to 200€.
* Product SKU
* Merchant, like ACME Inc.

For a commission to be applied to an item, the item needs to fulfilled all the conditions defined for a commission.


### Product attribute conditions

To specify conditions based on attributes, the following format is used: `attribute.{ATTRIBUTE_KEY} {OPERATOR} '{ATTRIBUTE_VALUE}'`.

|PLACEHOLDER | DESCRIPTION |
| - | - |
| {ATTRIBUTE_KEY} | A product category attribute. For example, brand or color. |
| {OPERATOR} | The relationship between `{ATTRIBUTE_KEY}` and `{ATTRIBUTE_VALUE}`. Accepted operators: `>`, `<`, `>=`, `<=`,`!=`,`=`, `IS NOT IN`, `IS IN`. |
| {ATTRIBUTE_VALUE} | The attribute of a product in the category of ``{ATTRIBUTE_KEY}`. For example, in the brand category, the value can be Sony. Accepts multiple values separated by `;`.|

Examples:

* Apply commission to all black products: `attribute.color = 'black'`

* Apply commission to all black and blue products: `attribute.color IS IN 'black;blue'`


### Product category conditions

To specify conditions based on categories, the following format is used: `category {OPERATOR} '{CATEGORY_VALUE}'`

|PLACEHOLDER | DESCRIPTION |
| - | - |
| {OPERATOR} | The relationship between category and `{CATEGORY_VALUE}`. Accepted operators: `IS NOT IN`, `IS IN`, `=`, `!=`. |
| {CATEGORY_VALUE} | The category for defining a condition. Accepts multiple values separated by `;`. |


Examples:

Apply commission to all products in the Electronics category: `category IS IN 'electronics'`

Apply commission to all products in the Smartphones and Smartwatches categories: `category IS IN 'smartphones';smartwatches'`.


If a category has child categories, applying a commission to the category applies it to the child categories too. For example, applying commission to the Electronics category also apply it to the Smart Watches category. So, you might want to set up conditions using child categories or exclude some child categories.

### Item price conditions

To specify conditions based on item prices, the following format is used: `item-price {OPERATOR} '{PRICE_VALUE}'`

|PLACEHOLDER | DESCRIPTION |
| - | - |
| {OPERATOR} | The relationship between item-price and `{PRICE_VALUE}`. Accepted operators: `<`, `<=`, `=`, `!=`, `>=`, `>`, `IS IN`, `IS NOT IN`. |
| {PRICE_VALUE} | The price to check the condition against. Accepts decimal numbers and ranges. Item price is taken from the product's gross or net price depending on the price mode of the order. The product gross price is configured in the backend (including volume pricing) and does not include any discounts applied afterward in the shopping cart or checkout. |

Example: `item-price > '2' AND item-price <= '10.99'`.



### SKU-based conditions


To specify conditions based on SKU, use the following format: `SKU {OPERATOR} {SKU_VALUE}`

|PLACEHOLDER | DESCRIPTION |
| - | - |
| {OPERATOR} | The relationship between category and `{CATEGORY_VALUE}`. Accepted operators: `IS NOT IN`, `IS IN`, `=`, `!=`. |
| {SKU_VALUE} | The SKU to check the condition against. Accepts product concrete SKUs. Accepts multiple values separated by `;`. |

Example: `SKU IS IN '136_24425591;134_29759322'`

### Merchant-based commission
You can use merchants_allow_list to specify one or multiple merchants who will receive a special commission. Make sure priority is higher than a default marketplace commission (mc02); otherwise, it will not be applied. Your commission setup will look like this:

The system will apply mc01 first as it has a higher priority. If a merchant is not in the merchants_allow_list, the system will proceed with second priority mc02 and apply a 10% commission.

key
priority
amount
merchants_allow_list
mc01
1
5
MER000002,MER000004
mc02
2
10






Priority and Groups
Commissions are applied based on priority within a single group, ​​starting from 1.
Let's look at the example, let's say you have four commissions:

Commission Key
Priority
Group
MC01
1
Primary
MC02
2
Primary
MC03
1
Secondary
MC04
2
Secondary


Let's assume a product in the order matches the condition rules of all commissions above. In this case, two commissions will be applied: MC01 and MC03. The system will start with the Primary group, sort commissions by priority within this group, and apply their conditions one by one. Once the Primary commission is applied, it will proceed to the Secondary group, and so on. Using a standard CSV importer, you can add as many groups as you want on a project level.

If the same priority, then the last created commission applies. Make sure to set different priorities for overlapping commissions to ensure transparency of the commission.

Applying different commissions to orders placed in NET and GROSS mode
Add a condition Price-mode = Gross or Net to the Order Condition (represented by order_condition in the CSV file). This can be useful if you decide to have different rules depending on the Price Mode selected by the customer. This will require you to change how the commission is applied to use Apply commission on the sum item total price to pay after discounts with additions. (Represented by sumPriceToPayAggregation in GLUE API). Such customizations are easy, and we already factored that into our application design. To do that, follow the integration guide, on average, changing this logic requires 2h of developer's time: (spryker-docs/docs/pbc/all/merchant-management/202407.0/marketplace/install-and-upgrade/tutorials-and-howtos/create-merchant-commission-calculator-type-plugin.md)

You might want to set up different commission rules based on this since it affects commission totals.

For example, if customer uses Net mode, you might want to apply 10% commission, while if customer uses Gross mode commission applied will be 12%.


Complex conditions

Conditions can be combined using AND/OR operator. For example:

(Category IS IN 'electronics';smart-watches' AND attribute.color IS IN 'black;blue')

(Category IS IN 'electronics';smart-watches') OR (attribute.color IS IN 'black;blue')


Info
When conditions are combined by the OR operator, they do not exclude each other. If an order fulfills both such conditions, the commission is still applied.



Apply commission to GROSS or NET price
This Merchant Commission Price Mode configuration controls which prices are used as a basis to calculate commission: Gross Price or Net Price.

The item Gross Price and Net Price is configured in the backend (including volume pricing) and does not include any discounts applied afterward in the shopping cart.

Its defined by MERCHANT_COMMISSION_PRICE_MODE_PER_STORE, see https://github.com/spryker/spryker-docs/blob/master/_includes/pbc/all/install-features/202407.0/marketplace/install-the-marketplace-merchant-commission.md#2-set-up-configuration
This configuration is different from an order price mode and defines behavior for the whole store.

Current Limitations:
Price Mode switcher is not supported. The Merchant Commission Price Mode must match the default price mode of the store that sets it for the sales order as a result. Otherwise, the percentage commission will be set to 0 for all items in the order.

Supported configuration:

Order Price Mode
Merchant Commission Price Mode
GROSS_MODE
GROSS_MODE
NET_MODE
NET_MODE



Adjusting logic of commission calculation to apply it to the sum item total price to pay after discounts with additions

You might want to change how commission is calculated on a project level by applying commission on the sum item total price to pay after discounts with additions. (Represented by sumPriceToPayAggregation in GLUE API), this is useful when you want to apply commission on total paid by the customer for this exact line item. This amount is what customer is getting charged. Sum of all line items plus expenses (e.g. Shipment fee)  is equal to Grand Total.

Such customizations are easy and we already factored that in our application design, to do that, follow the integration guide, on average, changing this logic requires 2h of developer's time: (spryker-docs/docs/pbc/all/merchant-management/202407.0/marketplace/install-and-upgrade/tutorials-and-howtos/create-merchant-commission-calculator-type-plugin.md)

Other use cases might be:
Apply commission to product price including product options differently
Apply commission to special products like bundles or configurable differently



Note
There are also “contains, does not contain” operators that engine supports for attributes, item-price, categories and SKU in conditions, but we do not recommend using unless you fully understand the risks. While these can be useful when you use some special codes inside the attributes and do not want to use a separate product attribute for this purpose, this can also lead to applying commission in case there is a typo in the string or accidentally created match e.g. "art" inside "cartoon".
