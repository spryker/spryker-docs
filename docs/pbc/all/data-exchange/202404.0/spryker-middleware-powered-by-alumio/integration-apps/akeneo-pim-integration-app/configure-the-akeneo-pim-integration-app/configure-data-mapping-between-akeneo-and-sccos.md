---
title: Configure data mapping between Akeneo and SCCOS
description: Create data transformers in the Spryker Middleware powered by Alumio
template: howto-guide-template
last_updated: Nov 17, 2023
---

After you have [connected the Spryker Middleware Powered by Alumio with Akeneo and SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html), you need to map the data you want to import between the two systems by doing the following:

- Transforming Akeneo data into the Base data by defining an Akeneo to Base model transformer.
- Transforming the Base data into the Spryker data by defining the Base model to Spryker transformer.

## Define the Akeneo to Base model transformer

To import data from Akeneo PIM, you need to transform it from the Akeneo model to the Base model. To transform the data like this, you need to create the Akeneo to Base model transformer. Do the following:

1. In the Spryker Middleware powered by Alumio platform, go to **Connections -> Entity transformers** and click the + sign.
2. In *Name*, enter the name of your entity transformer. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In *Description*, add the description of your route.
4. To activate the entity transformer, set the status to *Enabled*.
5. In *Settings*, select *Data, transform using mappers and conditions*.
6. Optional: In *Filters*, select and add the Alumio filters for transformers.
7. Click **Add data transformer** and select the Akeneo to Base transformers. Regardless of the data you wish to import, you must always select the `Memo Akeneo to Base - Product - Set Base information` transformer, as it contains the basic data necessary for the import process. Other transformers are optional, which means you can pick only those that handle product data that you need to import. For information about the available Akeneo to Base transformers, see [Akeneo to Base data transformers](#akeneo-to-base-data-transformers).
![akeneo-create-an-entity-tansformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/akeneo-create-an-entity-tansformer.png)

## Create cache

When you perform the initial product import from Akeneo, all data pertaining to the imported products is stored in the cache. During subsequent product imports, Spryker Middleware powered by Alumio compares this cached data with the information that needs to be imported from Akeneo. If no changes are detected, the product data isn't re-imported from Akeneo but is instead retrieved from the cache. This significantly speeds up the importing process. 

To create the cache, do the following:

1. Go to **Storages -> Storages** and click the + sign.
2. In *Name*, enter the name of your cache. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your cache.
3. To activate the entity transformer, set the status to *Enabled*.
4. In *Settings*, select the settings for the caching mechanism. For example, you can *Enable pruning of storage items* that allows you to set up the *Time to live*. If you set it, for instance, to 1 hour, all data will be removed from the storage every hour.
You can also enable storage logs upon creating, updating, or deleting the entities.

![cache-creation](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/cache-creation.png)

Create a separate cache for each of the Base to Spryker model transformers that are explained in the next section. Thus, if you have three Base to Spryker model transformers, you need three caches.

## Define the Base to Spryker model transformer

After the data has been transformed to the Base model, it needs to be transformed to the Spryker model. To transform the data like this, you need to create the Base model to the Spryker model transformer. Do the following:

1. In the Spryker Middleware powered by Alumio platform, go to **Connections -> Entity transformers** and click the + sign.
2. In *Name*, enter the name of your entity transformer. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In *Description*, add the description of your route.
4. To activate the entity transformer, set the status to *Enabled*.
5. In *Settings*, select *Data, transform using mappers and conditions*.
6. Optional: In *Filters*, select and add the Alumio filters for transformers.
7.  Click **Add data transformer** and select the Base to Spryker transformers. You have to select all the available transformers, irrespective of what data you want to import. For information about the available Akeneo to Base transformers, see [Base to Spryker data transformers](#base-to-spryker-data-transformers).

## Reference information: Transformers

There are two kinds of entity transformers: Akeneo data to Base data transformers and Base data to Spryker data transformers. This section describes each of the transformers and how to configure them.

### Akeneo to Base data transformers

Akeneo to Base data transformers let you define what data you want to import from Akeneo to Spryker and transform these data to Base data. This Base data is then transformed to Spryker data.

By default, there are the following Akeneo to Base data transformers that you can use depending on the data you want to transform and import:

- Memo Akeneo to Base - Product - Set Base Information
- Memo Akeneo to Base - Product - Set Price Properties
- Memo Akeneo to Base - Product - Set Product Properties
- Memo Akeneo to Base - Product - Set Product Category
- Memo Base - Product - Set Stock
- Memo Akeneo to Base - Product - Set Product Media
- Memo Akeneo to Base - Product - Set Product Associations

#### Memo Akeneo to Base - Product - Set Base Information transformer

*Memo Akeneo to Base - Product - Set Base Information* is the main Akeneo to Base transformer that processes all the basic product information. You must always select this transformer to enable the product data import.

1. In *Client*, enter the Akeneo client you created at this step: [Connect Akeneo with Spryker Middleware powered by Alumio](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-akeneo-with-spryker-middleware-powered-by-alumio).
2. In *Locale*, enter the locale from where you want to import data in the Akeneo PIM. For example, *en_US*. 

{% info_block infoBox "Locale in Akeneo" %}

If the locale isn't specified in Akeneo, the locale you specify at this step will be assigned as a default one.

{% endinfo_block %}

3. In *SKU*, select one of the following options:
 - Identifier as SKU: The product identifier in Akeneo will be used as SKU in SCCOS.
 - Value as SKU: You can specify the value of another field in Akeneo, which should be used as SKU in SCCOS. Specify the value in the *SKU Identifier* field that appears as the very last field.
 ![value-as-sku](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/value-as-sku.png)
4. In *Name*, either enter the name for your products, or if you want to import it from Akeneo, use the `&{values.name}` as a placeholder.
5. In *Description*, either enter the description for your products, or if you want to import it from Akeneo, use the `&{values.description}` as a placeholder.

{% info_block infoBox "Importing product descriptions" %}

Spryker uses a simple text editor in its product description, however Akeneo enables customers to use rich-text in their product description. If you want to use rich-text on your store you need to extend Spryker to enable the support of rich text on a project-level. 

{% endinfo_block %}

6. In *Short description*, either enter the short description for your products, or if you want to import it from Akeneo, use the `&{values.short_description}` as a placeholder.
7. Optional: Define the tax set to use for the imported products. Do the following:
  1. Go to your Spryker project's Back Office, to **Administration -> Tax Sets** page.
  2. On the *Overview of tax sets* page, copy the value from the *Name* column of the tax set you want to use for the products imported from Akeneo PIM.
  3. Go back to the Spryker Middleware powered by Alumio, to the transformer creation page, and enter the tax name in the *Tax* field.
8. Optional: In *Parent*, enter the SKU of the parent product, or if you want to import it from Akeneo, use the `&{parent}` as a placeholder.

![memo-akeneo-to-base-product-set-base-information-transformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/memo-akeneo-to-base-product-set-base-information-transformer.png)

#### Memo Base - Product - Set Price Properties transformer

*Memo Base - Product - Set Price Properties* is the optional transformer that processes price information. Since the price value refers to the "hot" product data, it's not a required field in Akeneo, and, therefore, might be empty.

To configure this transformer, do the following:

1. In *Currencies*, set the currency values.
2. In *Property name*, set the name of the price property as specified in Akeneo. For example, this value can be `price`.
3. In *Price type*, select if this is the gross or net price.

![memo-base-product-set-price-properties-transformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/memo-base-product-set-price-properties-transformer.png)

#### Memo Akeneo to Base - Product - Set Product Properties transformer

*Memo Akeneo to Base - Product - Set Product Properties* is the optional transformer that processes all properties that you select to import from Akeneo. The product properties handled by this transformer are called product attributes in Akeneo.

To configure this transformer, do the following:

1. In *Locale*, set the locale where you want to import product properties. For example, `en_US`.
2. Optional: In *Properties*, specify the product properties in Akeneo that you want to import as product attributes into SCCOS. For example, `color`. If you don't specify any properties, no properties are imported.

![memo-akeneo-to-base-product-set-product-properties-transformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/memo-akeneo-to-base-product-set-product-properties-transformer.png)

{% info_block infoBox "Super attributes" %}

Keep in mind that even though you specify the attributes to import in this entity transformer, you specify the super attributes in the [Memo Base to Spryker - Product - Akeneo Preprocessor](#memo-base-to-spryker---product---akeneo-preprocessor) transformer.

{% endinfo_block %}

#### Memo Akeneo to Base - Product - Set Product Category

*Memo Akeneo to Base - Product - Set Product Category* is the optional transformer that processes category information.

To configure this transformer, do the following:

1. In *Client*, specify the Akeneo client created at step [Connect the Spryker Middleware powered by Alumio with Akeneo PIM](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-akeneo-with-spryker-middleware-powered-by-alumio).
2. In *Locale*, set the locale where you want to import product categories. For example, `en_US`.
3. Optional: To exclude specific categories from import, in *Exclude categories*, click **Add categories** and enter the categories to exclude.

![memo-akeneo-to-base-product-set-product-category](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/memo-akeneo-to-base-product-set-product-category.png)

#### Memo Base - Product - Set Stock

*Memo Base - Product - Set Stock* is the optional transformer that processes stock information. Since the stock value refers to the "hot" product data, it's not a required field in Akeneo and, therefore, might be empty.

To configure this transformer, do the following:

1. In *Stock value*, specify the value of the stock that the product will have after it's imported into Spryker. You can specify 0 as well, but in this case, in SCCOS, this product would be considered as out-of-stock, and, therefore, be unavailable in the Storefront.
2. Optional: Specify the warehouse where this stock should be kept. For details about the warehouses in the Spryker Back Office, see [Create warehouses](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/create-warehouses.html).

![memo-base-product-set-stock](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/memo-base-product-set-stock.png)

#### Memo Akeneo to Base - Product - Set Product Media

*Memo Akeneo to Base - Product - Set Product Media* is the optional transformer that processes all media data of a product.

To configure this transformer, do the following:

1. In *Client*, specify the Akeneo client created at step [Connect the Spryker Middleware powered by Alumio with Akeneo PIM](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-akeneo-with-spryker-middleware-powered-by-alumio).
2. In *Locale*, set the locale where you want to import product media. For example, `en_US`.
3. In *Media*, for *Property name*, enter the name of media. For example, `image_1`.
4. Optional: In *Media type*, select the type of the media.

![memo-akeneo-to-base-product-set-product-media](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/memo-akeneo-to-base-product-set-product-media.png)

#### Memo Akeneo to Base - Product - Set Product Associations

*Memo Akeneo to Base - Product - Set Product Associations* is the optional transformer that processes product associations, referred to as product relations in SCCOS.

To configure this transformer, optionally, in *Relation type* specify all the association types you want to import from Akeneo. For example, `cross sell`, `pack`, `upsell`. If you don't specify the relations, no relations are imported.

![memo-akeneo-to-base-product-set-product-associations](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/memo-akeneo-to-base-product-set-product-associations.png)

### Base to Spryker data transformers
After you have transformed the data from Akeneo to Base, the Base data need to be transformed to the Spryker data.

By default, there are the following Base to Spryker data transformers:

- Memo Spryker - Product - Set General Settings
- Memo Base to Spryker - Product - Akeneo Preprocessor
- Memo Base to Spryker - Product - Insert into Spryker

You must use all of these transformers, irrespective of the data you want to import.

### Memo Spryker - Product - Set General Settings

The *Memo Spryker - Product - Set General Settings* transformer sets the destination store and the product statuses. 

To configure this transformer, do the following:

1. In *Spryker HTTP Client*, select the client you created at step [Connect SCCOS with Spryker Middleware powered by Alumio](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-sccos-with-spryker-middleware-powered-by-alumio).
2. In *Store name*, enter the store to which you want to import data from Akeneo. For example, *en_US*. 

{% info_block infoBox "Multiple stores" %}

If you want to import the same products into multiple stores, you have to create additional routes with individual *Memo Spryker - Product - Set General Settings* transformers for each store. In other words, you need as many routes with individual *Memo Spryker - Product - Set General Settings* transformers as many stores you want to import the products into.

{% endinfo_block %}

3. Optional: In the *New From* and *New To* dates, enter the starting and ending dates of when the product should be displayed with the *New* label in your store.
4. Optional: Select the approval status of the product. By default, this field has the `Approved` value. Keep in mind that only approved products are visible on the Storefront.
5. In the *Cache* field, select the cache that you created for this transformer at the [Create cache](#create-cache) step.

![memo-spryker-product-set-general-settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/memo-spryker-product-set-general-settings.png)

### Memo Base to Spryker - Product - Akeneo Preprocessor

The *Memo Base to Spryker - Product - Akeneo Preprocessor* transformer prepares the data for sending into Spryker.

To configure this transformer, do the following:

1. In *Akeneo HTTP client*, select the Akeneo client you created at step [Connect the Spryker Middleware powered by Alumio with Akeneo PIM](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-akeneo-with-spryker-middleware-powered-by-alumio).
2. In *Spryker HTTP client*, select the Spryker client you created at step [Connect SCCOS with the Middleware powered by Alumio platform](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-sccos-with-spryker-middleware-powered-by-alumio).
3. Optional: specify the super attributes for your product. If you don't specify any super attributes here, there won't be any super attributes for the products in SCCOS, even though the products might have them in Alumio. Keep in mind that once you specify an attribute as a super attribute, it can't be a normal attribute attribute in SCCOS. 
4. Optional: In *Relations*, map Akeneo relation keys to the SCCOS relation keys. To map the relation keys, do the following:
  1. In Akeneo PIM, go to **Settings -> Association types** and click the label of the necessary association type. For example, *Upsell*.
  2. On the Association type details page, copy the code and paste it in the *Akeneo Relation Key Name* field.
  ![akeneo-association-type](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/akeneo-association-type.png).
  3. In *Spryker Relation Key Name*, enter either the code of the existing SCCOS relation type key, for example, `up-selling`, or the new one that you want to be automatically created in SCCOS after the product import. 
5. Optional: To use specific Akeneo multi select attributes as labels in SCCOS, in *Akeneo label attribute code*, specify the corresponding Akeneo multi select association code.

{% info_block infoBox "Product attributes" %}

Akeneo multi select attributes correspond to the SCCOS product labels. Therefore, if you want to import product labels from Akeneo, there should be a corresponding multi select attribute in Akeneo. For information on how to create the multi select attributes in Akeneo that you can use as product labels in SCCOS, see [Reference information: Creating multi select attributes in Alumio](#reference-information-creating-multi-select-attributes-in-alumio).

{% endinfo_block %}

6. In the *Cache* field, select the cache that you created for this transformer at the [Create cache](#create-cache) step.

![memo-base-to-spryker-product-akeneo-preprocessor](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/memo-base-to-spryker-product-akeneo-preprocessor.png)

### Memo Base to Spryker - Product - Insert into Spryker

The *Memo Base to Spryker - Product - Insert into Spryker* transformer sends data to Spryker and sets the default category for the product.

To configure this transformer, do the following:

1. In *Spryker HTTP client*, select the client you created at step [Connect SCCOS with the Middleware powered by Alumio platform](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-sccos-with-spryker-middleware-powered-by-alumio).
2. In *Root category name*, enter the root category name as you have it in SCCOS. For information about the categories in SCCOS, see [Category Management feature overview](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/category-management-feature-overview.html).
3. In *Category template name*, enter the name of the category template in SCCOS where the product has to be imported. For information about the default category templates in SCCOS, see [Reference information: template](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/categories/create-categories.html#reference-information-template).
4. Optional: To mark the product as active, check *Is product active*.

{% info_block infoBox "Inactive product in Akeneo" %}

If a product is inactive in Akeneo and you want to import it as inactive as well, in the *Active product* dropdown, select *Dynamic value* and enter `&{enabled}` in the field as the placeholder.

{% endinfo_block %}

5. Optional: To mark the product as splittable, check *Is product splittable*.
4. Optional: To update prices in SCCOS with those from Akeneo, check *Update price*.
5. Optional: To update stock values in SCCOS with those from Akeneo, check *Update stock*.

![insert-into-spryker-transformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/insert-into-spryker-transformer.png)

## Reference information: Creating multi select attributes in Alumio
Multi select attributes in Akeneo correspond to the Spryker Product Labels. To import the multi select attributes as labels to Spryker, you first need to create them in Akeneo.
To create the multi select attributes in Akeneo, do the following: 

1. Go to **Settings -> Attributes**.
![settings-attributes-akeneo](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/settings-attributes-akeneo.png)
2. At the *Attributes* page, in the top right corner, click **Create attribute**.
3. On the *Create attribute* page, select *Multi select*.
![create-attribute-akeneo](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/create-attribute-akeneo.png)
4. In *Label*, enter the name of the label.
5. In *Code*, enter the code of the label. The code should not contain capital letters.
6. Check the *Value per locale* checkbox.
![create-multiselect-akeneo](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/create-multiselect-akeneo.png)
7. Click **Confirm**.
8. In the *Properties* tab, in *Attribute group*, select the attribute group.
9. Optional: In the *Label translations* tab, add translations for the label.
10. Go to *Options* tab and click *Click here to add more*.
![click-to-add-more-options](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/click-to-add-more-options.png)
11. Add as many options and translations as needed.
![options-akeneo](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/options-akeneo.png).
8. Click **Save**.
9. Go to **Familes** and click the attribute family where you want to add your attribute.
10. Go to the *Attributes* tab and click **Add attributes**.
![add-attributes-to-family-akeneo](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/add-attributes-to-family-akeneo.png)
11. Select the attribute you created and click **Add**.

The created attribute should now be available on the product details page in Akeneo:

![pdp-akeneo](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/3-configure-data-mapping-between-akeneo-and-spryker/pdp-akeneo.png)

## Next step
[Configure the data integration path between Akeneo and SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html)
