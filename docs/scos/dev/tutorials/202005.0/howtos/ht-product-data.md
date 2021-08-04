---
title: HowTo - Product Data from Import to Front-End View
originalLink: https://documentation.spryker.com/v5/docs/ht-product-data-import-frontend
redirect_from:
  - /v5/docs/ht-product-data-import-frontend
  - /v5/docs/en/ht-product-data-import-frontend
---

{% info_block warningBox "Product Customization" %}
This article describes flow of the product data from importing it to the SQL database to showing it in the front-end view.
{% endinfo_block %}

## Importing Products to SQL Database

Products are imported in the SQL database through the `Importer` module. The product details are parsed from CSV files, from where they are processed and inserted in the SQL database. This step is done when installing the application, after the database is created, when running the `./setup -i` script.

The products can also be imported separately, by running the dedicated command below:

```bash
vendor/bin/console data:import:product-abstract
```

In the Demoshop we import abstract (`product_abstract.csv`) and concrete (`product_concrete.csv`) products separately. The first line in the CSV files describes the structure of the entries stored in database.

Both abstract and concrete products have some attributes that are localized and non-localized. In the csv files the localized attributes contains the locales as suffix, such as `abstract_sku` which is a non-localized attribute of the product or `name.en_US` which is the localized name of the product.

There are also several fields such as `attribute_key_1` and `value_1` which represent a non-localized product attribute and it’s value. Localized product attributes also contain the locales as a suffix in the header of the csv file. These product attributes are stored in json format in the database as key-value pairs.

### Load Products Into the Redis Data Store
To have this data available on front-end, we must collect it and export to Redis; Yves has no connection to the SQL database and it retrieves the product information through the Redis and Elasticsearch data stores.
The export is done by the collectors. You can manually execute the export to the key-value data stores by running the following command from console:

```bash
vendor/bin/console collector:storage:export
```

### Display Product Information in Front-end

Now that we have the data in the key-value storage, we are able to show the product details in the front-end views.

When requesting a page in front-end, the `Collector` module takes care of identifying the type of request (if it is a product details page or a category page) and retrieves necessary data from Redis.

It also takes care of routing the request to the correct controller action.

**Example:**
When in Demoshop we request this page: `/en/canon-1200d-+-efs-1855mm-89`, the `StorageRouter` will try to find the route for this request. This is done in the `StorageRouter::match($pathInfo)` operation.

The `UrlMatcher` will get the URL details for this request; it will decode the URL and generate a key and it will try to retrieve the value for this key from Redis:

```bash
{"reference_key":"de.en_us.resource.product_abstract.89","type":"product_abstract"}
```

If it succeeds in finding a key-value entry for this URL, it will get the value for the returned reference key (in this example `de.en_us.resource.product_abstract.89`). Now that we have the data, the resource creator according to the resource type will transform the returned JSON in a more understandable format (`ProductResourceCreator`).

After building the product, the resource creator will route the request to the corresponding controller action and will pass the built product to it.

In Demoshop, product details requests are routed to `ProductController::detailAction(ProductAbstractInterface $product)` from the `Product` module.

You can find the view associated with this controller action under `Pyz\Yves\Product\Theme\demoshop\product\detail.twig`.

```php
{% raw %}{%{% endraw %} extends "@application/layout/layout.twig" {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
<h1>{% raw %}{{{% endraw %} product.name {% raw %}}}{% endraw %}</h1>
<p>{% raw %}{{{% endraw %} product.description {% raw %}}}{% endraw %}</p>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

In the example above, when rendering the product details page, we’ll be able to see the name and description of the product.

## Adding New Attributes to a Product

Adding a new attribute to a product can be done very easy, without having to make many changes.

Let’s consider that we want to add a waterproof attribute to abstract products that have associated boolean values.

In the `product_abstract.csv` file, add the “waterproof” key to one of the already defined and yet empty `attribute_key_x` (where **"x"** is a number) field and the desired value to its related `value_x` field. If there’s no empty product attribute key-value field for the product you’d like to edit, then you can simply introduce a new column in the csv with the same pattern.

The process of importing products can only happen once so in order to re-import every product we’ll need to reset the data stores and reinstall it with the following command:

```php
./setup -i
```

Now you have the data containing your changes imported in the SQL database and in the Redis data store, and the product detail page should also display the new attribute we’ve just added.
