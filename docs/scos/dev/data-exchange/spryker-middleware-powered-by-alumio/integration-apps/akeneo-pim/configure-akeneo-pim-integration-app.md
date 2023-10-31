
https://spryker.zoom.us/rec/share/iIT09oPsDPKNEAU0SjmYzisAzRpv4ePf_5-8WgZsQFz1x1whZmUPHUfe6X0qRgLM.MzEjpIcO3rNVtAzM
Passcode: NRFW0#1L

This document describes how to configure the Akeneo PIM integration app to import data from there to a Spryker project via the [Spryker Middleware powered by Alumio](/docs/scos/dev/data-exchange/spryker-middleware-powered-by-alumio/spryker-middleware-powered-by-alumio.html).

To import data from Akeneo PIM to your Spryker project, you need to do the following:

1. Connect the Spryker Middleware Powered by Alumio with Akeneo PIM. - Connect the Spryker Middleware Powered by Alumio with Akeneo PIM and Spryker 
2. Connect SCCOS with the Middleware Powered by Alumio platform.
3. Configure the data integration path of the Akeneo PIM integration app.
4. Configure data mapping between Akeneo and Spryker.
5. Run the import.

## Prerequisites

Make sure to review reference information before you start, or look up the necessary information as you go through the process.

## 1. Connect the Spryker Middleware powered by Alumio with Akeneo PIM

{% info_block warningBox "Prerequisite" %}

Before you can connect the Spryker Middleware powered by Alumio with Akeneo, you must establish a connection in Akeneo for Spryker. The connection to Spryker must be with the *Data destination* flow type. For step-by-step instructions on how to set up the connection in Akeneo, refer to the [Akeneo documentation](https://help.akeneo.com/serenity-connect-your-pim/serenity-manage-your-connections).

{% endinfo_block %}


To connect the Spryker Middleware powered by Alumio with Akeneo PIM, you need to create an HTTP client. To create the client, do the following.

1. In the Spryker Middleware Powered by Alumio platform, go to **Clients->HTTP client** and click the + sign.
![create-http-client]
2. In the platform selection filed, start typing "Akeneo" and select *Akeneo HTTP Client*.
![akeneo-http-client]
3. Click **Next step**.
4. In *Base URL*, enter the URL to your Akeneo PIM environment. For example, `https://test.cloud.akeneo.com`
5. Go to your Akeneo PIM environment, to **Connections->Connection settings** and copy the following information from there to the *Create Client* page of the Spryker Middleware Powered by Alumio platform:  
 - Client ID
 - Client Secret
 - Username
 - Password: Keep in mind that password is hidden in Akeneo. If you don't remember it, you have to generate a new one.

 ![connection-credentials]

6. Optional: Check the *Enable logging of requests* checkbox.
7. Click **Grant access to Alumio** and proceed to the next step.
8. Enter the name of your client. As you are entering the name, the identifier will be populated automatically based on the name.
9. Click **Save**. The client should now be in the list of the *HTTP clients* page.

## 2. Connect SCCOS with the Middleware Powered by Alumio platform

To connect SCCOS to the Spryker Middleware powered by Alumio, you also need to create an HTTP client. To create the client, do the following.

1. In the Spryker Middleware Powered by Alumio platform, go to **Clients->HTTP client** and click the + sign.
![create-http-client]
2. In the platform selection filed, start typing "Spryker" and select *Spryker Dynamic Data Exchange HTTP Client*.
3. Click **Next step**.
4. In *Base URL*, enter the URL to your Spryker Glue API environment with the Dynamic Data exchange. For example, `https://glue-backend.de.alumio.mysprykershop.com/dynamic-entity`.
5. Enter the username and password from your Spryker Glue API environment.
6. Optional: Check the *Enable chaching of the token* checkbox.
7. Optional: Check the *Enable logging of requests* checkbox.
8. Click **Grant access to Alumio** and proceed to the next step.
9. Enter the name of your client. As you are entering the name, the identifier will be populated automatically based on the name.
10. Click **Save**. The client should now be in the list of the *HTTP clients* page.

Now that the client is created, you can test if it works. To test the client, do the following:

1. Find the client on the *HTTP clients* page and click it. The client details page opens.
2. In *Request Method*, enter select *GET*.
3. In *Test URL*, enter `/product-abstracts`.
![sccos-to-middleware-client]
4. Click **Run test**. If the configuration is successful, the response field should return a list of abstract products available in your project.
![sccos-to-middleware-response]

## Configure data mapping between Akeneo and Spryker

To import data from Akeneo PIM to your Spryker project, you need to map the data you want to import between the two systems. To map the data, you need to do the following:

- Transform Akeneo data into the Base data by defining an Akeneo to Base model transformer.
- Transform the Base data into the Spryker data by defining the Base model to Spryker transformer.


### Define the Akeneo to Base model transformer

To import data from Akeneo PIM, you need to transform it from the Akeneo model to the Base model. To transform the data like this, you need to create the Akeneo to Base model transformer. Do the following:

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Entity transformers** and click the + sign.
2. In the **Name** field, enter the name of your entity transformer. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your route.
4. To activate the entity transformer, set the status to *Enabled*.
5. In *Settings*, select *Data, transform using mappers and conditions*.
6. Optional: In *Filters* select and add the Alumio filters for transformers.
7. Click **Add data transformer** and select the Akeneo to Base transformers. Regardless of the data you wish to import, you must always select the `Memo Akeneo to Base - Product - Set Base information` transformer, as it contains the basic data necessary for the import process. Other transformers are optional, which means you can pick only those that handle product data that you need to import. For information about the available Akeneo to Base transformers, see [Akeneo to Base data transformers](#akeneo-to-base-data-transformers).
![akeneo-create-an-entity-tansformer]

### Create cache

When you perform the initial product import from Akeneo, all data pertaining to the imported products is stored in the cache. During subsequent product imports, the Spryker Middleware Powered by Alumio compares this cached data with the information that needs to be imported from Akeneo. If no changes are detected, the product data is not re-imported from Akeneo but is instead retrieved from the cache. This significantly speeds up the importing process. 

To create the cache, do the following:

1. Go to **Storages -> Storages** and click the + sign.
2. In the **Name** field, enter the name of your cache. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your cache.
3. To activate the entity transformer, set the status to *Enabled*.
4. In *Settings*, select the settings for the caching mechanism. For example, you can *Enable pruning of storage items* that allows you to set up the *Time to live*. If you set it for instance to 1 hour, all data will be removed from the storage every hour.
You can also enable storage logs upon creating, updating, or deletng the entities.

Create a separate cache for each of the Base to Spryker model transformers that are explained in the next sections LINK. Thus, if you have three Base to Spryker model transformers, you need three caches.

### Define the Base to Spryker model transformer

After the data has been transformed to the Base model, they need to be transformed to the Spryker model. To transform the data like this, you need to create the Base model to Spryker model transformer. Do the following:

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Entity transformers** and click the + sign.
2. In the **Name** field, enter the name of your entity transformer. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your route.
4. To activate the entity transformer, set the status to *Enabled*.
5. In *Settings*, select *Data, transform using mappers and conditions*.
6. Optional: In *Filters* select and add the Alumio filters for transformers.
7.  Click **Add data transformer** and select the Base to Spryker transformers. You can select multiple transformers depending on what product information you want to import. For information about the available Akeneo to Base transformers, see [Base to Spryker data transformers](#base-to-spryker-data-transformers).

## 3. Configure the data integration path of the Akeneo PIM integration app.

To Configure the data integration path of the Akeneo PIM integration app., you need to do the following:
- create an incoming configuration
- create an outgoing configuration
- define the route

### Create an incoming configuration

The incoming configuration defines what data should be retrieved from Akeneo and how this should be done.
To create an incoming configuration, do the following:

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Incoming** and click the + sign.
2. In the **Name** field, enter the Name of your configuration. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your incoming configuration.
4. To activate the incoming configuration, set the status to *Enabled*.
5. In the *Subscriber* field, select the *HTTP subscriber*. You may also select the *Akeneo subscriber*, however, in this procedure, we consider the settings for the HTTP subscriber.
6. In the *Request URL*, specify the URL to a specific product, or the URL to a list of products. The URL should include just the path after `akeneo.com`, as the base path to the Akeneo environment is already specified in the HTTP client you created. For example, if the actual path to a specific product you want to import from Akeneo is `https://test.cloud.akeneo.com/api/rest/v1/producs/1234567890`, the path to specify in the *Request URL* field is `/api/rest/v1/producs/1234567890`. 

{% info_block infoBox "Batch products import" %}

If you want to import products in batch, say 100 products from page `https://test.cloud.akeneo.com//api/rest/v1/products`, the path you should specify is `/api/rest/v1/products?limit=100`. If you do not specify the limit value in the URL for batch import, by default, 10 products are imported. If you want to import all the products, do the following:

1. In the *Request URL* field, add the link to the page with product without the limit value. For example: `/api/rest/v1/products`.
2. In *Follow pagination*, select *Follow next links*.
3. in *Pattern to the link for the next page* enter `_links.next`.

{% endinfo_block %}

8. In *HTTP Client*, select the Akeneo client that you created at this step: [Connect the Spryker Middleware powered by Alumio with Akeneo PIM](#1-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim).
9. In *Entity schema*, select *Akeneo Product*.
10. Live other fields empty. In the top right click **Save and continue**. You should see the message that the incoming configuration has been created.
![incoming-configuration-batch-products]

The incoming configuration should now appear at the **Configurations->Incoming** page.


<!--This is a hidden comment. This configuration is for the Akeneo Subscriber

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Incoming** and click the + sign.
2. In the **Name** field, enter the Name of your configuration. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your incoming configuration.
4. To activate the incoming configuration, set the status to *Enabled*.
5. In the *Subscriber* field, select the subscriber. 
  QUESTION: What is the subscriber, what is each subscriber in the dropdown for, and how do they know which subscriber to select here?
6. In *Entity*, select the entity depending on what data you want to import from Akeneo. For example, to import product abstracts, select *Get list of products*.
7. Leave the *Input transformer* field empty.
8. In *HTTP Client*, select the Akeneo client that you created at this step: [Connect the Spryker Middleware powered by Alumio with Akeneo PIM](#1-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim).
10. Live other fields empty. In the top right click **Save and continue**. You should see the message that the incomfing configuration has been created.

![incoming-for-akeneo-product-import.png]
-->

### Create an outgoing configuration

The outgoing configuration defines how data retrieved from Akeneo should be sent to SCCOS.

To create the outgoing configuration, do the following:

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Outgoing** and click the + sign.
2. In the **Name** field, enter the Name of your configuration. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your incoming configuration.
4. To activate the incoming configuration, set the status to *Enabled*.
5. In the *Publisher* field, select *No action publisher*. You may also select the *Akeneo publisher*, however, in this procedure, we consider the settings for the No action publisher.
6. Click **Add entity transformer** and add two transformers: the one you created at the [Define the Akeneo to Base model transformer](#define-the-akeneo-to-base-model-transformer) step and the one you created at the [Define the Base to Spryker model transformer](#define-the-base-to-spryker-model-transformer) step.

### Define the route

The route configuration connects the incoming configuration and outgoing configuration to enable import of data from Akeneo PIM to SCCOS.

To define the route, do the following:

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Routes** and click the + sign.
2. In the **Name** field, enter the name of your client. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your route.
4. To activate the route, set the status to *Enabled*.
5. In the **Incoming configuration** filed, select the configuration you created at this step:[Create an incoming configuration](#create-an-incoming-configuration).
6. In the **Outgoing configuration** field, select the outgoing configuration created at this step:. LINK TO INSTRUCTIONS ON CREATING AN OUTGOING CONFIGURATION

![create-a-new-route]
7. Click **Save & Continue**. 

The route should now appear at the **Configurations->Routes** page.

## Test the outgoing connection

Before importing data from Akeneo, you can test whether configuration of the Akeneo to Base transformer is set up correctly and processes the data as needed. To test the transformer, do the following:

1. Go to *Tasks* and click any of the tasks you created at the previous step.
2. Click the **Entity data** tab.
3. To copy the contents of the tab, click the blue button in the top left corner of the content area.
![entity-data]
4. Go to *Connection - Outgoing* and select the configuration you created at step [Create an outgoing configuration](#create-an-outgoing-configuration).
5. On the *Outgoing connections* page, in the *Entity transformers* section, click **View configuration** for you Akeneo to Base transformer.
6. Paste the copied content to the *Input* field of the transformer tester on the right.
6. Click **Run test**. The test is run for all the transformers in the outgoing connection.

The product that will be sent to SCCOS appears at the bottom of the transformer tester.

![transformer-tester]

## Create a task for the products import from Akeneo

To create a task for the products import from Akeneo, you have to run the incoming created at step [Create an incoming configuration](#create-an-incoming-configuration). 
To run the incoming, do the following:

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Incoming** and click on the necessary incoming configuration.
2. In the top right corner, click *Run incoming*. 
3. Go to *Tasks* and make sure that there the new task with the route you created at step [Define the route](#define-the-route). The task's status should be *Processing*, and then *Finished*.

![tasks]

{% info_block infoBox "Separate task for each product" %}

A separate task is created for every product. In other words, if you initiate an incoming bulk import of, for instance, 40 products, this results in the creation of 40 individual tasks.

{% endinfo_block %}

### Filtering task messages

You can filter the task messages by different categories such as info, notice, error and others. This is especially useful when you need to determine a reason why the task execution has failed. In such a case, you can filter the messages by errors and see details of the errors. To filter the messages, do the following:
1. On the *Tasks* page, click the necessary task, for example, the one with the *Failed* status.
2. On the task details page, go to *Export Messages* tab.
3. In the filter dropdown, select the category you want to filter by.
4. Optional: To view details of the message, click *Details*.

![task-messages-filter]


## Run the route

To get the task processed, you need to run the full route. To run the route, do the following:
1. Go to *Routes* and click the route you created at step [Define the route](#define-the-route).
2. At the *Routes* page, click **Run route**.

![run-route]

In case of the successful processing, this returns a message saying that the publisher has been exported. The status of task you created at the previous step, should change to *Finished*.

{% info_block infoBox "Route execution logs" %}

You can check the execution status of the route in the route execution logs. To check the status, on the *Routes* page, in *Action* column of the route, click **Logs**. In the *Logs* window, you can filter the records by error messages, warnings, etc. The logs are especially useful when you need to determine a reason why the route execution has failed.

{% endinfo_block %}

## Check the product in the Back Office

To check the imported product in the Back Office, go to **Catalog - Products* page and check if the product appeared on the list.


## Reference information: Transformers

Data transformers let you define the data you want to import from Akeneo PIM and map them accordingly to your Spryker system. There are two kinds of entity transformers: Akeneo data to Base data transformers and Base data to Spryker data transformers.

### Akeneo to Base data transformers

ADD SCREENSHOTS FOR EACH TRANSFORMER

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

The Memo Akeneo to Base - Product - Set Base Information is the main Akeneo to Base transformer that processes all the basic product information. You must always select this transformer to enable the product data import.

1. In the **Client** field, enter the Akeneo client you created at this step: [Connect SCCOS with the Middleware Powered by Alumio platform](#1-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim).
2. In the **Locale** field, enter the locale from which you want to import data from Akeneo. For example, *us_US*. 

{% info_block infoBox "Locale in Akeneo" %}

If the locale in Akeneo is not specified, the locale you specify at this step will be assigned as a default one.

{% endinfo_block %}

3. In *SKU*, select one of the following options:
 - Identifier as SKU: The product identifier in Akeneo will be used as SKU in SCCOS.
 - Value as SKU: You can specify the value of another filed in Akeneo which should be used as SKU in SCCOS. Specify the value in the *SKU Identifier* field that appears as the very last field.
 ![value-as-sku]
4. In *Name*, either enter the name for your products or if you want to import it from Akeneo, use the `&{values.name}` as a placeholder.
4. In *Description*, either enter the description for your products or if you want to import it from Akeneo, use the `&{values.description}` as a placeholder.
5. In *Short description*, either enter the short description for your products or if you want to import it from Akeneo, use the `&{values.short_description}` as a placeholder.
6. Optional: Define the tax set to use for the imported products. Do the following:
  1. Go to your project's Back Office, to **Administration -> Tax Sets** page.
  2. On the *Overview of tax sets* page, copy the value from the *Name* column of the tax set you want to use for the products imported from Akeneo PIM.
  3. Go back to the transformer creation page in the Spryker Middleware powered by Alumio and enter the tax name in the **Tax** field.
7. Optional: In *Parent*, enter the SKU of the parent product, or if you want to import it from Akeneo, use the `&{parent}` as a placeholder.

#### Memo Base - Product - Set Price Properties transformer

Memo Base - Product - Set Price Properties is the optional transformer that processes price information. Since the price value refers to the "hot" product data, it's not a required field in Akeneo, and, therefore, might be empty.

To configure this transformer, do the following:

1. In *Currencies*, set the currency values.
2. In *Property name*, set the name of the price property as specified in Akeneo. For example, this value can be `price`.
3. In *Price type*, select if this is the gross or net price.

#### Memo Akeneo to Base - Product - Set Product Properties transformer

Memo Akeneo to Base - Product - Set Product Properties is the Optional transformer that processes all properties that you select for import from Akeneo. The product properties handled by this transformer are called product attributes in Akeneo.

To configure this transformer, do the following:

1. In *Locale*, set the locale where you want to import product properties. For example, `en_US`.
2. Optional: In *Properties*, specify the product properties in Akeneo that you want to import as product attributes to SCCOS. For example, `color`. If you do not specify any properties, no properties are imported.

Keep in mind, that even though you specify the attributes for import in this entity transformer, you specify the super attributes in the [Memo Base to Spryker - Product - Akeneo Preprocessor](#memo-base-to-spryker---product---akeneo-preprocessor) transformer.

#### Memo Akeneo to Base - Product - Set Product Category

Memo Akeneo to Base - Product - Set Product Category is the optional transformer that processes category information.

To configure this transformer, do the following:

1. In *Client*, specify the Akeneo client created at step [Connect the Spryker Middleware powered by Alumio with Akeneo PIM](#1-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim).
2. In *Locale*, set the locale where you want to import product categories. For example, `en_US`.
3. Optional: To exclude specific categories from import, in *Exclude categories*, click **Add categories** and enter the categories to exclude.

#### Memo Base - Product - Set Stock

Memo Base - Product - Set Stock is the optional transformer that processes stock information. Since the stock value refers to the "hot" product data, it's not a required field in Akeneo, and, therefore, might be empty.

To configure this transformer, do the following:

1. In *Stock value*, specify the value of stock that the product will have after it is imported to Spryker. You can specify 0 as well, but in this case, in SCCOS, this product would be considered as out-of-stock, and, therefore, be unavailable on the Storefront.
2. Optional: Specify the warehouse where this stock should be kept. For details about the warehouses in the Back Office, see [Create warehouses](/docs/pbc/all/warehouse-management-system/202307.0/base-shop/manage-in-the-back-office/create-warehouses.html).

#### Memo Akeneo to Base - Product - Set Product Media

Memo Akeneo to Base - Product - Set Product Media is the optional transformer that processes all media data of a product.

To configure this transformer, do the following:

1. In *Client*, specify the Akeneo client created at step [Connect the Spryker Middleware powered by Alumio with Akeneo PIM](#1-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim).
2. In *Locale*, set the locale where you want to import product media. For example, `en_US`.
3. In *Media*, for *Property name*, enter the name of media.?

#### Memo Akeneo to Base - Product - Set Product Associations

Memo Akeneo to Base - Product - Set Product Associations is the optional transformer that processes product associations, referred to as product relations in SCCOS.

To configure this transformer, optionally, in *Relation type* specify all association types you want to import from Akeneo. For example, `cross sell`, `pack`, `upsell` If you do not specify the relations, no relations are imported.


### Base to Spryker data transformers
After you have transformed the data from Akeneo to Base, the Base data need to be transformed to the Spryker data.

By default, there are the following Base to Spryker data transformers that you must use irrespective of the data you want to import:

- Memo Spryker - Product - Set General Settings
- Memo Base to Spryker - Product - Akeneo Preprocessor
- Memo Base to Spryker - Product - Insert into Spryker

### Memo Spryker - Product - Set General Settings

The Memo Spryker - Product - Set General Settings transformer sets the store where the products are imported and the product statuses. 

To configure this transformer, do the following:

1. In *Spryker HTTP Client*, select the client you created at step [Connect SCCOS with the Middleware Powered by Alumio platform](#2-connect-sccos-with-the-middleware-powered-by-alumio-platform).
2. In *Store name*, enter the store to which you want to import data from Akeneo. For example, *us_US*. 

{% info_block infoBox "Multiple stores" %}

If you want to import the same products to multiple stores, you have to create additional routes with individual Memo Spryker - Product - Set General Settings transformers for each store. TIn other words, you need as many routes with individual Memo Spryker - Product - Set General Settings transformers, as many stores you want to import the products to.

{% endinfo_block %}

3. Optional: In the *New From* and *New To* dates, enter the starting and ending dates of when the product should be displayed with the *New* label in your store.
4. Optional: Select the approval status of the product. By default, this field has the `Approved` value. Keep in mind that only approved products are visible on the Storefront.
5. In the *Cache* field, select the cache that you created for this transformer at the [Create cache](#create-cache) step.

### Memo Base to Spryker - Product - Akeneo Preprocessor

The Memo Base to Spryker - Product - Akeneo Preprocessor transformer prepares the data for sending to Spryker.

To configure this transformer, do the following:

1. In *Akeneo HTTP client*, select the Akeneo client you created at step [Connect the Spryker Middleware powered by Alumio with Akeneo PIM](#1-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim).
2. In *Spryker HTTP client*, select the Spryker client you created at step [Connect SCCOS with the Middleware Powered by Alumio platform](#2-connect-sccos-with-the-middleware-powered-by-alumio-platform).
3. Optional: specify the super attributes for your product. If you don't specify any super attributes here, there will not be any super attributes for the products in SCCOS as well, even though the products might have them in Alumio. Keep in mind, that once you specify an attribute as a super attribute, it can't be a normal attribute attribute in SCCOS. 
4. Optional: In *Relations*, Map Akeneo relation keys to the SCCOS relation keys. To map the relation keys, do the following:
  1. In Akeneo PIM, go to **Settings -> Association types** and click the label of the necessary association type. For example, *Upsell*.
  2. On the Association type details page, copy the code and paste it in the *Akeneo Relation Key Name* field.
  ![akeneo-association-type].
  3. In *Spryker Relation Key Name*, enter either the code of the existing SCCOS relation type key, for example, `up-selling`, or the new one that you want to be automatically created in SCCOS after the product import. 
5. Optional: To use specific Akeneo multi select attributes as labels in SCCOS, in *Akeneo label attribute code*, specify the corresponding Akeneo multi select association code.

{% info_block infoBox "Product attributes" %}

Akeneo multi select attributes correspond to the SCCOS product labels. Therefore, if you want to import product labels from Akeneo, there should be a corresponding multi select attribute in Akeneo. For information on how to create the multi select attributes in Akeneo that you can use as product labels in SCCOS, see [LINK TO GUIDE ON HOW TO CREATE MULTI SELECT ATTRIBUTES].

{% endinfo_block %}

6. In the *Cache* field, select the cache that you created for this transformer at the [Create cache](#create-cache) step.

### Memo Base to Spryker - Product - Insert into Spryker

The Memo Base to Spryker - Product - Insert into Spryker transformer sends data to Spryker and sets the default category for the product.

To configure this transformer, do the following:

1. In *Spryker HTTP client*, select the client you created at step [Connect SCCOS with the Middleware Powered by Alumio platform](#2-connect-sccos-with-the-middleware-powered-by-alumio-platform).
2. In *Root category name*, enter the root category name as you have it in SCCOS. For information about the categories in SCCOS, see [Category Management feature overview](/docs/pbc/all/product-information-management/202307.0/base-shop/feature-overviews/category-management-feature-overview.html).
3. In *Category template name*, enter the name of the category template in SCCOS where the product has to be imported. For information about the default category templates in SCCOS, see /docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/categories/create-categories.html#reference-information-template).
4. Optional: To mark the product as active, check *Is product active*.
5. Optional: To mark the product as splittable, check *Is product splittable*.
4. Optional: To update prices in SCCOS with those from Akeneo, check *Update price*.
5. Optional: To update stock values in SCCOS with those from Akeneo, check *Update stock*.

![insert-into-spryker-transformer]






