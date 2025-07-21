| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|-|
| abstract-products | sku | String | SKU of the abstract product. |
| abstract-products | averageRating | String | Average rating of the product based on customer rating. |
| abstract-products | reviewCount | Integer | Number of reviews left by customer for this abstract product. |
| abstract-products | name | String | Name of the abstract product. |
| abstract-products | description | String | Description of the abstract product. |
| abstract-products | attributes | Object | List of attributes and their values. |
| abstract-products | superAttributeDefinition | String | Attributes flagged as super attributes that are, however, not relevant to distinguish between the product variants. |
| abstract-products | attributeMap | Object | Each super attribute / value combination and the corresponding concrete product IDs are listed here. |
| abstract-products | attributeMap.super_attributes | Object | Applicable super attribute and its values for the product variants. |
| abstract-products | attributeMap.attribute_variants | Object | List of super attributes with the list of values. |
| abstract-products | attributeMap.product_concrete_ids | String | Product IDs of the product variants. |
| abstract-products | metaTitle | String | Meta title of the product. |
| abstract-products | metaKeywords | String | Meta keywords of the product. |
| abstract-products | metaDescription | String | Meta description of the product. |
| abstract-products | attributeNames | Object | All non-super attribute / value combinations for the abstract product. |
