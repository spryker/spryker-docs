This document describe how to configure the Akeneo PIM integration app to import data from there to a Spryker project via the [Spryker Middleware powered by Alumio](/docs/scos/dev/data-exchange/spryker-middleware-powered-by-alumio/spryker-middleware-powered-by-alumio.html).

To import data from Akeneo PIM to your Spryker project, you need to do the following:

1. Connect the Spryker Middleware Powered by Alumio with Akeneo PIM. 
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
![akeneo-http-client]
3. Click **Next step**.
4. In *Base URL*, enter the URL to your Spryker Glue API environment with the Dyanmic Data exchange. For example, `https://glue-backend.de.alumio.mysprykershop.com/dynamic-entity`.
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

## 3. Configure the data integration path of the Akeneo PIM integration app.

To Configure the data integration path of the Akeneo PIM integration app., you need to do the followoing:
- create an incoming configuraiton
- create an outgoing configuration
- defined the route

### Create an incoming configuration

The incoming configuation defines what data should be retrieved from Akeneo and how this should be done.
To create an incoming configuration, do the following:

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Incoming** and click the + sign.
2. In the **Name** field, enter the Name of your configuration. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your incoming configuration.
4. To activate the incoming configuration, set the status to *Enabled*.
5. In the *Subscriber* field, select the *HTTP subscriber*. 
  QUESTION: What is the subscriber, what is each subscriber in the dropdown for, and how do they know which subscriber to select here?
6. In the *Request URL*, specify the URL to a specific product, or a list of products. 

{% info_block infoBox "Info" %}

The URL should include the just the path after `akeneo.com`, as the base path to the Akeneo environment is already specified in the HTTP client you created. For example, if the actual path to a specific product you want to import from akeneo is `https://test.cloud.akeneo.com/api/rest/v1/producs/1234567890`, the path to specify in the *Request URL* field is `/api/rest/v1/producs/1234567890`. If you want to import multiple products from page `https://test.cloud.akeneo.com//api/rest/v1/products?limit=10`, the path you should specify is `/api/rest/v1/products?limit=10`.

{% endinfo_block %}

8. In *HTTP Client*, select the Akeneo client that you created at this step: [Connect the Spryker Middleware powered by Alumio with Akeneo PIM](#1-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim).
10. Live other fields empty. In the top right click **Save and continue**. You should see the message that the incoming configuration has been created.
![incoming-configuration-batch-products]

The incoming configuration should now appear at the **Configurations->Incoming** page.

QUESTION: HOW AND WHAT CONFIGURATIONS SHOULD BE DIFFERENT IF WE WANT TO EXPORT 1 PROUDCT OR MULTIPLE PRODUCTS AT ONCE?

The incoming configuation defines what data should be retrieved from Akeneo and how this should be done.


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

QUESTION: WHERE IS THE OUTGOING CONFIGURATION?

### Define the route

The route configuration connects the incoming configuration and outgoing configuration to enable import of data from Akeneo PIM to SCCOS.

To define the route, do the following:

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Routes** and click the + sign.
2. In the **Name** field, enter the name of your client. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your route.
4. To activate the route, set the status to *Enabled*.
5. In the **Incoming configuration** filed, select the configuration you created at this step:[Create an incoming configuration](#create-an-incoming-configuration).
6. In the **Outgoing configuration** field, select *No action publisher*. QUESTION: SHOULD THEY ALWAYS SELECT THIS PUBLISHER? WHAT DOES IT MEAN?

![create-a-new-route]
5. Click **Save & Continue**. 

The route should now appear at the **Configurations->Routes** page.

## Configure data mapping between Akeneo and Spryker

To import data from Akeneo PIM to your Spryker project, you need to map the data you want to import between the two systems. To map the data, you need to do the following:

- Transform Akeneo data into the Base data by defining an Akeneo to Base model transformer.
- Transform the Base data into the Spryker data by defining the Base model to Spryker transformer.


## Define the Akeneo to Base model transformer

To import data from Akeneo PIM, you need to transform it from the Akeneo model to the Base model. To transform the data like this, you need to create the Akeneo to Base model transformer. Do the following:

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Entity transformers** and click the + sign.
2. In the **Name** field, enter the name of your entity transformer. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In the **Description** field, add the description of your route.
4. To activate the entity transformer, set the status to *Enabled*.
5. In *Settings*, select *Data, transform using mappers and conditions*. QUESTIONS: WHAT DOES THIS SETTING MEAN? CAN THEY SELECT OTHER SETTINGS, AND IF YES, THEN IN WHAT CASES WHAT SETTING SHOULD BE SELECTED?
6.  Click **Add data transformer** and select *Memo Akeneo to Base - Product - Set Base information*. QUESTIONS: WHAT DOES THIS TRANSFORMER MEAN? CAN THEY SELECT OTHER TRANSFORMERS, AND IF YES, THEN IN WHAT CASES WHAT TRANSFORMER SHOULD BE SELECTED?
![akeneo-create-an-entity-tansformer]
7. In the **Client** field, enter the client you created at this step: [Connect SCCOS with the Middleware Powered by Alumio platform](#1-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim).
8. In the **Locale** field, enter the locale from which you want to import data from Akeneo. For example, *us_US*. 

{% info_block infoBox "Locale in Akeneo" %}

If the locale in Akeneo is not specified, the locale you specify at this step will be assigned as a default one.

{% endinfo_block %}

9. In the SKU field, select one the following options:
 - Identifier as SKU: The product identifier in Akeneo will be used as SKU in SCCOS
 - Value as SKU: You can specify the value of another filed in Akeneo which should be used as SKU in SCCOS. Specify the value in the *SKU Identifier* field that appears as the very last field
 ![value-as-sku]

10. In the *Description* field, enter the description for the products you are importing.
11. In the *Short description* field, enter the short description for the products you are importing.

12. Define the tax set to use for the imported products. Do the following:
  1. Go to your project's Back Office, to **Administration -> Tax Sets** page.
  2. On the *Overview of tax sets* page, copy the value from the *Name* column of the tax set you want to use for the products imported from Akeneo PIM.
  3. Go back to the transformer creation page in the Spryker Middleware powered by Alumio and enter the tax name in the **Tax** field.

## Create a task for the products import from Akeneo

To create a task for the products import from Akeneo, you have to run the incoming created at step [Create an incoming configuration](#create-an-incoming-configuration). 
To run the incoming, do the following:

1. In the Spryker Middleware Powered by Alumio platform, go to **Connections->Incoming** and click on the necessary incoming configuration.
2. In the top right corner, click *Run incoming*.
3. Go to *Tasks* and make sure that there are new tasks with the route you created at step [Define the route](#define-the-route). 

![tasks]

## 1. Create an incoming:


QUESTION: Is it possible import products in batch? Say 100 product at once?


## Transformers

Data transformers let you define the data you want to import from Akeneo PIM and map them accordingly to your Spryker system. There are two kinds of entity transformers: Akeneo data to Base data transformers and Base data to Spryker data transformers.

### Akeneo to Base data transformers

Akeneo to Base data transformers let you define what data you want to import from Akeneo to Spryker and transform these data to Base data. This Base data is then transformed to Spryker data.

{% info_block infoBox "Info" %}

It can be that some fields that Product pages have are not required in the Akeneo PIM, but required in the Spryker system. For example, the *Price* information is not required in Akeneo, but it is required in Spryker. Even though you cannot really import these values if they are not provided in Akeneo, you must enter them manually in the corresponding fields of the entity transformers.

![placeholders-in-entity-transformers]

{% endinfo_block %}

By default, there are the following data transformers that you can use depening on the data you want to import:

- Memo Akeneo to Base - Product - Set Base information: Imports basic product information, such as name, description, SKU, tax.
- Memo Akeneo to Base - Product - Set Price Properties
- Memo Akeneo to Base - Product - Set Product Properties
- Memo Akeneo to Base - Product - Set Product Category
- Memo Base - Product - Set Stock
- Memo Akeneo to Base - Product - Set Product Media


