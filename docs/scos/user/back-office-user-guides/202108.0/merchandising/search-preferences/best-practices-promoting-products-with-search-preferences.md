



This document describes how to use search preferences as a merchandising tool.

By default, customers can search by product names and SKUs. Search preferences enable searching by product attribute values. However, enabling search preferences for a big number of attributes will result in a huge list of search results. We recommend enabling search preferences only for the attributes that you really want your customers to find.

For example, there is a new camera in your shop which is popular on the market for its video recording properties: geotagging and autofocus. To add the product and search preferences, do the following:

1. Create a *video_recording* product attribute with *Geotagging* and *Autofocus* values. For instructions, see [Creating product attributes](/docs/scos/user/back-office-user-guides/202108.0/catalog/attributes/creating-product-attributes.html).
2. 










You know that users are very interested in a device with such property and they might search for products by it. You create the *video_recording* attribute with the values *Geotagging* and *Autofocus*.

There are other attributes with these values. To promote the needed device, you disable all or part of active search preference types for all the other attributes with **Geotagging** and **Autofocus** values. Then, you enable most or all the search preference types for the _video_recording_ attribute. This  makes the _video_recording_ product attribute more searchable. Subsequently,  the products with this attribute stand out in the search results.

{% endinfo_block %}

Also, it does not make much sense to activate search preferences for attributes with the **numeric** and **Yes/No** values. As numbers may occur not only in attributes but in product SKUs, names and descriptions (which are actually ranked higher than attributes in search results), therefore the probability that a user will find what they were looking for is low, but the list of search results will be huge, and the search term will be present in multiple places.
Besides, it is very unlikely that users will be searching for an attribute with a numeric value or the Yes/No values.
