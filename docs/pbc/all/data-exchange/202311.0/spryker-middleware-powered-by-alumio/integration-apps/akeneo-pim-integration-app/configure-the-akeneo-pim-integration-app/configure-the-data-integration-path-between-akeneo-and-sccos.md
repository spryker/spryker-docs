---
title: Configure the data integration path between Akeneo and SCCOS
description: Create incoming configuration, outgoing configuration, and route in the Spryker Middleware powered by Alumio
template: howto-guide-template
last_updated: Nov 10, 2023
---

After you have [configured data mapping between Akeneo and SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html), you need to configure the data integration path.
To configure the data integration between Akeneo and SCCOS, you need to do the following in the Spryker Middleware Powered by Alumio platform:

- Create an incoming configuration
- Create an outgoing configuration
- Define the route

## Create an incoming configuration

The incoming configuration defines what data should be retrieved from Akeneo and how this should be done.

To create the incoming configuration, do the following:

1. In Spryker Middleware powered by Alumio, go to **Connections -> Incoming** and click the + sign.
2. In *Name*, enter the name of your configuration. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In *Description*, add the description of your incoming configuration.
4. To activate the incoming configuration, set the status to *Enabled*.
5. In the *Subscriber* field, select the *HTTP subscriber*. You may also select the *Akeneo subscriber*, however, in this document, we consider the settings for the *HTTP subscriber*.
6. In the *Request URL*, specify the URL to a specific product or the URL to a list of products. The URL should include just the path after `akeneo.com`, as the base path to the Akeneo environment is already specified in the HTTP client you created. For example, if the actual path to a specific product you want to import from Akeneo is `https://test.cloud.akeneo.com/api/rest/v1/producs/1234567890`, the path to specify in the *Request URL* field is `/api/rest/v1/producs/1234567890`. 

<a name="batch-products-import"></a> 

{% info_block infoBox "Batch products import" %}

If you want to import products in batch, say 100 products from page `https://test.cloud.akeneo.com//api/rest/v1/products`, the path you should specify is `/api/rest/v1/products?limit=100`. If you don't specify the limit value in the URL for batch import, by default, 10 products are imported. If you want to import all the products, do the following:

1. In the *Request URL* field, add the link to the page with the product without the limit value. For example: `/api/rest/v1/products`.
2. In *Follow pagination*, select *Follow next links*.
3. in *Pattern to the link for the next page* enter `_links.next`.

{% endinfo_block %}

8. Optional: In *Request Parameters*, you can specify the request parameters to configure your incoming in a certain way. For example, you can specify the parameters that would enable the import of products that were updated in Akeneo: `search={"updated":[{"operator":">","value":"&{timestamp}"}],"completeness":[{"operator":"=","value":100,"scope":"ecommerce"}],"enabled":[{"operator":"=","value":true}]}`.

![incoming-request-parameters](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos/incoming-request-parameters.png)

9. In *HTTP Client*, select the Akeneo client that you created at step [Connect Akeneo with Spryker Middleware powered by Alumio](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-akeneo-with-spryker-middleware-powered-by-alumio).
10. In *Entity schema*, select *Akeneo Product*.
11. Leave other fields empty. In the top right, click **Save and continue**. You should see the message that the incoming configuration has been created.

![incoming-configuration-batch-products](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos/incoming-configuration-batch-products.png)

The incoming configuration should now appear at the *Configurations -> Incoming* page.

<!--This is a hidden comment. This configuration is for the Akeneo Subscriber

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Incoming** and click the + sign.
2. In *Name*, enter the Name of your configuration. As you are entering the name, the identifier will be populated automatically based on the name.
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

1. In Spryker Middleware powered by Alumio, go to **Connections -> Outgoing** and click the + sign.
2. In *Name*, enter the name of your configuration. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In *Description*, add the description of your incoming configuration.
4. To activate the incoming configuration, set the status to *Enabled*.
5. In *Publisher*, select *No action publisher*. You may also select the *Akeneo publisher*, however, in this document, we consider the settings for the *No action publisher*.
6. Click **Add entity transformer** and add two transformers: the one you created at step [Define the Akeneo to Base model transformer](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html#define-the-akeneo-to-base-model-transformer) step and the one you created at step [Define the Base to Spryker model transformer](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html#define-the-base-to-spryker-model-transformer).

![outgoing-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos/outgoing-configuration.png)

### Define the route

The route configuration connects the incoming configuration and outgoing configuration to enable the import of data from Akeneo PIM into SCCOS.

To define the route, do the following:

1. In the Spryker Middleware powered by Alumio platform, go to **Connections -> Routes** and click the + sign.
2. In *Name*, enter the name of your client. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In *Description* field, add the description of your route.
4. To activate the route, set the status to *Enabled*.
5. In *Incoming configuration* fieled, select the configuration you created at step [Create an incoming configuration](#create-an-incoming-configuration).
6. In *Outgoing configuration*, select the outgoing configuration created at step [Create and outgoing configuration](#create-an-outgoing-configuration).
![create-a-new-route](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos/create-a-new-route.png)

7. Click **Save & Continue**. 

The route should now appear on the *Configurations -> Routes* page.

## Next step
[Create tasks and import products from Akeneo into SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos.html)

