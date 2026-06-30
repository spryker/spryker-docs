| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| product-labels | name | String | Specifies the label name. |
| product-labels | isExclusive | Boolean | Indicates whether the label is `exclusive`.<br>If the attribute is set to true, the current label takes precedence over other labels the product might have. This means that only the current label should be displayed for the product, and all other possible labels should be hidden. |
| product-labels | position | Integer | Indicates the label priority.<br>Labels should be indicated on the frontend according to their priority, from the highest (**1**) to the lowest, unless a product has a label with the `isExclusive` attribute set.|
| product-labels | frontEndReference | String |Specifies the label custom label type (CSS class).<br>If the attribute is an empty string, the label should be displayed using the default CSS style. |
