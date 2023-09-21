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

1. Connect the Spryker Middleware powered by Alumio with Akeneo PIM.
2. Configure connection to the SCCOS environment.
3. Configure data mapping between Akeneo and Spryker.
4. Run the import.

## Prerequisites

- To use the Akeneo PIM integration app, you need to buy the Spryker Middleware and the Akeneo PIM app. Contact the Spryker support team with your request.
- Make sure the Data Exchange API is installed with the minimum version 202307.0. [See Data Exchange API installation guide](/docs/scos/dev/feature-integration-guides/202307.0/glue-api/dynamic-data-api/data-exchange-api-integration.html) for the installation instructions.


## 1. Connect the Spryker Middleware powered by Alumio with Akeneo PIM

To connect the Spryker Middleware powered by Alumio with Akeneo PIM, you need to create an HTTP client. To create the client, do the following.

1. Go to **Clients->HTTP client** and click the + sign.
![create-http-client]
2. In the platform selection filed, start typing "Akeneo" and select *Akeneo HTTP Client*.
![akeneo-http-client]
3. In *Base URL*, enter the URL to your Akeneo PIM environment.
3. Enter the *Client ID* and *Client Secret* received from Akeneo. See [Akeneo Documentation](https://api.akeneo.com/documentation/authentication.html#client-idsecret-generation) for details on how to get them.

## 2. Create a transformer

1. Go to Coonnections->Entity transformers and click the "+" sign.
2. Enter the Name of your transformer. As you are entering the name, the identifier will be populated automatically based on the name.
3. In *Settings*, select *Data, transform using mappers and conditions*.
4. Click **Add data transformer** and select *Memo Akeneo to Base - Product - Set Base information*.
![akeneo-create-an-entity-tansformer]

## 1. Create an incoming:
 1. Go to Connections-Incoming-click the + sign.
  1. Enter the Name of your configuration. As you are entering the name, the identifier will be populated automatically based on the name.
  2. Optional: Add a description of you incoming configuration.
  3. To activate the incoming configuration, set the status to *Enabled*.
  4. In the *Subscriber* field, select *HTTP Subscriber*. 
  QUESTION: What is the subscriber, what is each subscriber in the dropdown for, and how do they know which subscriber to select here?
  5. In *Request URL*, enter the URL to the product in Akeneo in the following format: QUESTION: WHAT SHOULD BE THE FORMAT? For example, /api/rest/v1/products/1273192971 (1273192971 is the product SKU).
  6. In *Entity schema*, click **Add entity transformer**.
  7. Select the Akenoe to base transformer. QUESTION: WHAT TRANSFORMER SHOULD CUSTOMERS SELECT, AND WHERE ARE THESE TRANSFORMERS ACTUALLY CREATED?
  6. Live other fields as they are and in the top right click **Save and continue**. You should see the message that the incomfing configuration has been created.
  7. Optional: To check the created configuration, go to **Configurations->Incoming**.

QUESTION: Is it possible import products in batch? Say 100 product at once?
