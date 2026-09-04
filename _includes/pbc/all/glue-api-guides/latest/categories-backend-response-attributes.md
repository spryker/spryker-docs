| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| categoryKey | String | Unique key of the category. It is also the resource `id`. |
| isActive | Boolean | Defines whether the category is active. |
| isInMenu | Boolean | Defines whether the category is shown in the Storefront navigation menu. |
| isSearchable | Boolean | Defines whether the category is searchable. |
| isClickable | Boolean | Defines whether the category is clickable in the Storefront. |
| templateName | String | Name of the category template. |
| parentCategoryKey | String | `categoryKey` of the parent category. `null` for the root category. |
| position | Integer | Sort weight of the category among its siblings. Siblings are ordered by this value in ascending order. |
| extraParentCategoryKeys | Array | `categoryKey` values of the additional parent categories. |
| localizedAttributes | Array | Localized attributes of the category, one entry per locale. |
| localizedAttributes.localeName | String | Locale name—for example, `en_US`. |
| localizedAttributes.name | String | Name of the category in the locale. |
| localizedAttributes.metaTitle | String | Meta title of the category in the locale. |
| localizedAttributes.metaDescription | String | Meta description of the category in the locale. |
| localizedAttributes.metaKeywords | String | Meta keywords of the category in the locale. |
| localizedAttributes.url | String | URL of the category in the locale. It is generated from the category name and the parent categories. |
| stores | Array | Names of the stores the category is assigned to. |
| imageSets | Array | Image sets of the category. |
| imageSets.localeName | String | Locale name of the image set. `null` for the default image set. |
| imageSets.name | String | Name of the image set. |
| imageSets.images | Array | Images of the image set. |
| imageSets.images.externalUrlSmall | String | URL of the small image. |
| imageSets.images.externalUrlLarge | String | URL of the large image. |
| imageSets.images.sortOrder | Integer | Order of the image within the image set. |
| isRoot | Boolean | Defines whether the category is the root category. |
