| ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|
| sku | String | SKU of the abstract product. |
| averageRating | String | Average rating of the product based on customer rating. |
| reviewCount | Integer | Number of reviews left by customer for this abstract product. |
| name | String | Name of the abstract product. |
| description | String | Description of the abstract product. |
| attributes | Object | List of attributes and their values. |
| superAttributeDefinition | String | Attributes flagged as super attributes that are, however, not relevant to distinguish between the product variants. |
| attributeMap | Object | Each super attribute / value combination and the corresponding concrete product IDs are listed here. |
| attributeMap.super_attributes | Object | Applicable super attribute and its values for the product variants. |
| attributeMap.attribute_variants | Object | List of super attributes with the list of values. |
| attributeMap.product_concrete_ids | String | Product IDs of the product variants. |
| metaTitle | String | Meta title of the product. |
| metaKeywords | String | Meta keywords of the product. |
| metaDescription | String | Meta description of the product. |
| attributeNames | Object | All non-super attribute / value combinations for the abstract product. |
