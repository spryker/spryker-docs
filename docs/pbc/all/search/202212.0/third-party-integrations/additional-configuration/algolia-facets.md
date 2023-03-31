## Algolia Facets configuration

Algolia index configuration allows for flexible setup of search parameters and facets.
It can be found on index page on Configuration tab, section "Filtering and faceting", "Facets" entry.

Default attributes for faceting are defined accordingly to default Spryker facets list.
To add any of product fields as facets click "Add an Attribute" under facets list and enter attribute name in the input field.

Facets behavior can also be customized using a dropdown on the right side of facets list.

#### Facet configuration

##### "Searchable"
Attributes defined as searchable may be used while calling Algolia `searchForFacetValues` method which can be used for Yves integration. This method is necessary to display catalog page facets if there are many values possible for each facet - in this case only 100 of those values will be displayed by default. Accessing other values requires searching for them using aforementioned method. Select this option if you plan on having a big amount of different values for this facet and use Yves.

##### "Filter only"
Attributes defined as filter only will not be used for aggregation and can only be used to narrow down search result lists. This can be used with attributes for which aggregated counts are not important.

> Important: setting an attribute as "filter only" will prevent if from showing in facets list in Glue API search response.

#### "Not searchable"
Default option. This facet configuration will enable aggregation of search results by facet values. `searchForFacetValues` method can't be used with facets configured this way. Use this option when you have a limited amount of facet values or don't plan on using Yves.

#### "After distinct" checkbox
Checked by default. 
Unchecking this checkbox will result in change of calculation method for facet aggretation for given field. 
By default facet aggregation is calculated after search results for a given query were processed by deduplication or grouping process. 
Not recommended to turn this checkbox off.
(TBD reference to specific page is required).