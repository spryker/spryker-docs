---
title: Configure the Spryker Middleware Powered by Alumio connection with Akeneo PIM and SCCOS
description: Create clients for Akeneo and Spryker in the Spryker Middleware Powered by Alumio
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html
last_updated: Nov 10, 2023
---
To start importing products from Akeneo to your Spryker project using the Spryker Middleware powered by Alumio, you need to connect Spryker Middleware powered by Alumio with Akeneo and SCCOS.

You can establish this connection directly in the Spryker Middleware Powered by Alumio platform by following these guidelines.

## Prerequisite

Before you can connect the Spryker Middleware powered by Alumio with the Akeneo PIM, you need to establish a connection to Spryker in Akeneo. The connection to Spryker should use the *Data destination* flow type. For step-by-step instructions on how to set up this connection in Akeneo, refer to the [Akeneo documentation](https://help.akeneo.com/serenity-connect-your-pim/serenity-manage-your-connections).

## Connect Akeneo with Spryker Middleware Powered by Alumio

To connect Akeneo with Spryker Middleware powered by Alumio, you need to create an HTTP client. To create the client, do the following:

1. In the Spryker Middleware powered by Alumio platform, go to **Clients -> HTTP client** and click the + sign.
![create-http-client](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/2-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim-and-spryker/create-http-client.png)
2. In the platform selection field, start typing "Akeneo" and select *Akeneo HTTP Client*.
![akeneo-http-client](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/2-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim-and-spryker/akeneo-http-client.png)
3. Click **Next step**.
4. In *Base URL*, enter the URL to your Akeneo PIM environment. For example, `https://test.cloud.akeneo.com`
5. Go to your Akeneo PIM environment, to **Connections -> Connection settings**, and copy the following information from there to the *Create Client* page of the Spryker Middleware Powered by Alumio platform:  
 - Client ID
 - Client Secret
 - Username
 - Password: Keep in mind that the password is hidden in Akeneo. If you don't remember it, you have to generate a new one.

 ![connection-credentials](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/2-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim-and-spryker/connection-credentials.png)

6. Optional: Check the *Enable logging of requests* checkbox.
7. Click **Grant access to Alumio** and proceed to the next step.
8. Enter the name of your client. As you are entering the name, the identifier will be populated automatically based on the name.
9. Click **Save**.

The client should now be on the list of the *HTTP clients* page.

## Connect SCCOS with Spryker Middleware powered by Alumio

To connect SCCOS to Spryker Middleware powered by Alumio, you also need to create an HTTP client. To create the client, do the following:

1. In the Spryker Middleware powered by Alumio platform, go to **Clients -> HTTP client** and click the + sign.
2. In the platform selection field, start typing "Spryker" and select *Spryker Dynamic Data Exchange HTTP Client*.
3. Click **Next step**.
4. In *Base URL*, enter the URL to your Spryker Glue API environment with the Dynamic Data Exchange API. For example, `https://glue-backend.de.alumio.mysprykershop.com/dynamic-entity`.
5. Enter the username and password from your Spryker Glue API environment.
6. Optional: Check the *Enable caching of the token* checkbox.
7. Optional: Check the *Enable logging of requests* checkbox.
8. Click **Grant access to Alumio** and proceed to the next step.
9. Enter the name of your client. As you are entering the name, the identifier will be populated automatically based on the name.
10. Click **Save**.

The client should now be on the list of the *HTTP clients* page.

Now that the client is created, you can test if it works. To test the client, do the following:

1. Find the client on the *HTTP clients* page and click it. The client details page opens.
2. In *Request Method*, enter select *GET*.
3. In *Test URL*, enter `/product-abstracts`.
![sccos-to-middleware-client](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/2-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim-and-spryker/sccos-to-middleware-client.png)
4. Click **Run test**. If the configuration is successful, the response field should return a list of abstract products available in your project.
![sccos-to-middleware-response](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/2-connect-the-spryker-middleware-powered-by-alumio-with-akeneo-pim-and-spryker/sccos-to-middleware-response.png)

## Next step
[Configure data mapping between Akeneo and SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html)
