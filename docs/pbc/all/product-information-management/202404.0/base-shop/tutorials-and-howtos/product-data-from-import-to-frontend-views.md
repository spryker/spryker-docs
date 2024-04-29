---
title: "Product data: From import to frontend views"
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-product-data-import-frontend
originalArticleId: 7f644291-3453-4725-a3a3-5a37c38fc567
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-product-data-from-import-to-frontend-view.html
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-product-data-from-import-to-front-end-view.html
---

This document describes the product data follow from importing it to the SQL database to showing it in the frontend view.

## Import products to SQL database

Products are imported into the SQL database through the `Importer` module. The product details are parsed from CSV files, from where they are processed and inserted in the SQL database. This step is done when installing the application after the database is created when running the `./setup -i` script.

You can import products separately:

```bash
vendor/bin/console data:import:product-abstract
```

In Demoshop, abstract (`product_abstract.csv`) and concrete (`product_concrete.csv`) products are imported separately. The first line in CSV files describes the structure of the entries stored in the database.

Both abstract and concrete products have some attributes that are localized and non-localized. In CSV files, the localized attributes contain locales as suffixes, such as `abstract_sku`. It is a non-localized attribute of the product or `name.en_US`, which is a product's localized name.

There are also several fields, such as `attribute_key_1` and `value_1`, which represent a non-localized product attribute and its value. Localized product attributes also contain locales as a suffix in the header of the CSV file. These product attributes are stored in JSON format in the database as key-value pairs.

### Load Products Into the Redis Data Store

To have this data available on the frontend, you must collect and export it to Redis. Yves has no connection to the SQL database, and it retrieves the product information through the Redis and Elasticsearch data stores.
T
he export is done by the collectors. You can manually execute the export to the key-value data stores:

```bash
vendor/bin/console collector:storage:export
```

### Display product information in frontend

When you have data in the key-value storage, you can display the product details in the frontend views.

When requesting a page in frontend, the `Collector` module takes care of identifying the type of request (if it is a product details page or a category page) and retrieves necessary data from Redis.

It also takes care of routing the request to the correct controller action.

**Example:**

 In Demoshop, when you request this page: `/en/canon-1200d-+-efs-1855mm-89`, the `StorageRouter` tries to find the route for this request. This is done in the `StorageRouter::match($pathInfo)` operation.

The `UrlMatcher` gets the URL details for this request. It decodes the URL, generates a key, and tries to retrieve the value for this key from Redis:

```bash
{"reference_key":"de.en_us.resource.product_abstract.89","type":"product_abstract"}
```

If it succeeds in finding a key-value entry for this URL, it gets the value for the returned reference key—in this example, it's `de.en_us.resource.product_abstract.89`. When you have data, the resource creator, according to the resource type, transforms the returned JSON in a more understandable format—`ProductResourceCreator`.

After building the product, the resource creator routes the request to the corresponding controller action and passes the built product to it.

In Demoshop, product details requests are routed to `ProductController::detailAction(ProductAbstractInterface $product)` from the `Product` module.

You can find the view associated with this controller action under `Pyz\Yves\Product\Theme\demoshop\product\detail.twig`.

```twig
{% raw %}{%{% endraw %} extends "@application/layout/layout.twig" {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
<h1>{% raw %}{{{% endraw %} product.name {% raw %}}}{% endraw %}</h1>
<p>{% raw %}{{{% endraw %} product.description {% raw %}}}{% endraw %}</p>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

In the preceding example, when rendering the product details page, you can see the name and description of the product.

## Add new attributes to a product

Adding a new attribute to a product can be done without having to make many changes.

Let’s consider that you want to add a `waterproof` attribute to abstract products that have associated boolean values.

In the `product_abstract.csv` file, add the `waterproof` key the already defined but empty `attribute_key_x` (where *`x`* is a number) field and the desired value to its related `value_x` field. If there’s no empty product attribute key-value field for the product to edit, you can introduce a new column in CSV with the same pattern.

The process of importing products can happen only once to reimport every product, reset the data stores, and reinstall it:

```php
./setup -i
```

After this, you have the data containing your changes imported in the SQL database and Redis data store. The product details page also must display the new attribute.
