https://docs.google.com/document/d/18P3yepqhyVQP2kSaSEIKpglDstysEJmXweTuFEJgLWY/edit#heading=h.tgvj6mw8do4i

The Akeneo PIM Integration App uses the dynamic Data Exchange API 
User journey: https://spryker.atlassian.net/wiki/spaces/Data/pages/3752787969/WIP+PRD+Akeneo+PIM+Integration+App#NOW-(for-MVP-%3Aquestion_mark%3A----import-data-from-Akeneo-PIM-to-Spryker)

Akeneo Integration App MVP - Demo Recording (by Memo-ICT) - 23.06.2023: 

https://spryker.zoom.us/rec/play/Kd5gss431LQN2Dg247HQM4CxSxSPe1b-q0HAO2ed2OHEPTUBeDin2Z0fP5jOMdjwE61LqDBSayRHzwKB.2FyR29MgRDG0J1H-?canPlayFromShare=true&from=share_recording_detail&continueMode=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fspryker.zoom.us%2Frec%2Fshare%2FyxgPY437hP88vPVPGrNpGmsyw7RCpWNnFeXKIiKRmTZLqczOSydzzjmNAB_DV90n.0DzhpgeTQsoRbuiL

Passcode: 0p^@.Pqv

Ask if it is still relevant

You need to create a base in Alumio that you would use for communication between Spryker and Akeneo (incoming?) - Spryker http client.

In Alumio

To import data from Akeneo PIM to your Spryker project, you need to do the following:

1. Connect the Spryker Middleware Powered by Alumio with Akeneo PIM.
2. Connect SCCOS with the Middleware Powered by Alumio platform.
3. Configure data mapping between Akeneo and Spryker.
4. Run the import.

## Prerequisites

- To use the Akeneo PIM integration app, you need to buy the Spryker Middleware and the Akeneo PIM app. Contact the Spryker support team with your request.
- Make sure the Data Exchange API is installed with the minimum version 202307.0. [See Data Exchange API installation guide](/docs/scos/dev/feature-integration-guides/202307.0/glue-api/dynamic-data-api/data-exchange-api-integration.html) for the installation instructions.


## 1. Connect the Spryker Middleware powered by Alumio with Akeneo PIM

To connect the Spryker Middleware powered by Alumio with Akeneo PIM, you need to create an HTTP client. To create the client, do the following.

1. In the Spryker Middleware Powered by Alumio platform, go to **Clients->HTTP client** and click the + sign.
![create-http-client]
2. In the platform selection filed, start typing "Akeneo" and select *Akeneo HTTP Client*.
![akeneo-http-client]
3. Click **Next step**.
4. In *Base URL*, enter the URL to your Akeneo PIM environment.
5. Enter the *Client ID* and *Client Secret* received from Akeneo. See [Akeneo Documentation](https://api.akeneo.com/documentation/authentication.html#client-idsecret-generation) for details on how to get them.
6. Enter the username and password (QUESTION: WHAT USERNAME AND PASSWORD ARE THESE? WHERE SHOULD I GET THEM? OR ARE THESE CREDENTIALS FOR THE CLIENT THAT I SHOULD CREATE?)
7. Optional: Check the *Enable logging of requests* checkbox.
8. Click **Grant access to Alumio** and proceed to the next step.
9. Enter the name of your client. As you are entering the name, the identifier will be populated automatically based on the name.
10. Click **Save**. The client should now be in the list of the *HTTP clients* page.

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

## 3. Configure data mapping between Akeneo and Spryker

To configure data mapping between Akeneo and Spryker, you need to create an incoming and outgoing configuration.

### Craete an incoming configuration

The incoming configuation defines what data should be retrieved from Akeneo and how this should be done.
To create an incoming configuration, do the following:

1. Go to Connections-Incoming-click the + sign.
2. Enter the Name of your configuration. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: Add a description of you incoming configuration.
4. To activate the incoming configuration, set the status to *Enabled*.
5. In the *Subscriber* field, select *Akeneo Subscriber*. 
  QUESTION: What is the subscriber, what is each subscriber in the dropdown for, and how do they know which subscriber to select here?
6. In *Entity*, select the entity depending on what data you want to import from Akeneo. For example, to import product abstracts, select *Get list of products*.
7. Leave the *Input transformer* field empty.
8. In *HTTP Client*, select the Akeneo client that you created at this step: [Connect the Spryker Middleware powered by Alumio with Akeneo PIM](#1-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim).
10. Live other fields empty. In the top right click **Save and continue**. You should see the message that the incomfing configuration has been created.
![incoming-for-akeneo-product-import.png]

The incoming configuration should now appear at **Configurations->Incoming** page.



## 2. Create a transformer

1. Go to Coonnections->Entity transformers and click the "+" sign.
2. Enter the Name of your transformer. As you are entering the name, the identifier will be populated automatically based on the name.
3. In *Settings*, select *Data, transform using mappers and conditions*.
4. Click **Add data transformer** and select *Memo Akeneo to Base - Product - Set Base information*.
![akeneo-create-an-entity-tansformer]

## 1. Create an incoming:


QUESTION: Is it possible import products in batch? Say 100 product at once?
