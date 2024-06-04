---
title: Incrementally import recently updated products with Spryker Middleware Powered by Alumio
description: Learn how to incrementally import products that have been updated a day ago
last_updated: Apr 18, 2024
template: howto-guide-template
---

This document describes how to import products that have recently been updated. Following the described procedure, you can import products that have been updated within the past day.

To run the incremental import of products, follow these steps.

## 1. Configure the Spryker Middleware Powered by Alumio connection with Akeneo PIM and SCCOS

* If you create the new configuration, follow [Configure the Spryker Middleware Powered by Alumio connection with Akeneo PIM and SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html).
* If you update the existing configuration, proceed with [3. Create an incoming configuration](#3-create-an-incoming-configuration).

## 2. Configure the data mapping between Akeneo and SCCOS

* If you create the new configuration, follow the procedure described in [If you create the new configuration, follow the procedure described in](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html).
* If you update the existing configuration, proceed with [3. Create an incoming configuration](#3-create-an-incoming-configuration).

## 3. Create an incoming configuration

1. In Spryker Middleware powered by Alumio, go to **Connections** > **Incoming** and click **+**.
2. In **Name**, enter the name of your configuration. As you are entering the name, the identifier is automatically populated based on the name.
3. Optional: In **Description**, add the description of your incoming configuration.
4. To activate the incoming configuration after creating, set the status to **Enabled**.
5. For **Subscriber**, select **HTTP subscriber**.
6. For **Request URL**, enter `/api/rest/v1/products`.
7. For **Payload type**, select **Encoded data**.
8. For **Request Parameters**, enter the following string: `search={"updated":[{"operator":">","value":"&{lastTimestamp}"}]}&limit=10`. For the **limit** value, you can specify any number of products you want to import. If you want to import all updated products, see [Batch products import](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#batch-products-import).

![http-subscriber](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/1-http-subscriber.png)

9. In **HTTP Client**, select the Akeneo client you created in [Connect Akeneo with Spryker Middleware powered by Alumio](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-akeneo-with-spryker-middleware-powered-by-alumio).

![akeneo-client](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/2-akeneo-client.png)

10. In **Input transformer**, add the following transformer parts:
First part:
  1. In **Input transformers** -> **Manage name**, select **Chain**.
  2. In **Data transformers** -> **Manage name**, select **Value setter**.
  3. In **Data transformers** -> **Configuratio*ns** -> **Key**, enter `lastTimestamp`.

![input-transformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/3-input-transformer.png)
<a name="step-10"></a>

Second part:
  1. In **Manage name**, select **Get an entity from storage**.
  2. In **Storage**, provide the name of the new storage. For example, `[Default] Akeneo to Spryker - Products - update lastTimestamp`.
  3. For **Storage indentifier**, enter `lastTimestamp`.
  4. For **Destination**, enter `lastTimestamp`.

![entity-from-storage](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/4-entity-from-storage.png)

Third part:
  1. For **Manage name**, select **Conditional transformer**.
  2. For **If all conditions are met**, select **Value condition**.
  3. For **Accessor**, select **Pattern accessor**.
  4. For **Pattern**, enter `lastTimestamp`.
  5. For **Keys-conditions**, select **is empty**.

![conditional-transformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/5-conditional-transformer.png)

11. Apply **Then apply transformer**. Populate the fields as follows:
    1. For **Manage name**, select **Value setter**.
    2. For **Key**, enter **LastTimestamp**.
    3. For **Value**, select **string** and enter the placeholder `-1 day`.
    4. For **Mappers**, select **Format: Date**.
    5. In **Mappers** -> **Output for*mat**, enter `Y-m-d H:i:s`.
    6. Leave **Input format**, **Output timezone** and **Input timezone** with the default `Automatic` value.

![apply-transformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/6-apply-transformers.png)

12. In **Follow pagination**, select **Follow next links**.
13. In **Pattern to the link for the next page**, enter `_links.next.href`.
14. In **Maximum number of pages to fetch**, enter you value. For example, 100.
15. In **Entity schema**, select `Akeneo Product`.

![response-decoder](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/7-response-decoder.png)

## 4. Create an outgoing connection

For the incremental import to work, you need to add to your [outgoing connection](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#create-an-outgoing-configuration) an additional entity transformer with two data transformers in it.

To create the additional transformer, do the following:

1. In the Spryker Middleware powered by Alumio platform, go to **Connections -> Entity transformers** and click the + sign.
2. In **Name**, enter the name of your entity transformer. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In **Description**, add the description of your transformer.
4. To activate the entity transformer, set the status to Enabled.
5. In **Settings**, select `Chain multiple entity transformers`.
6. In **Manage name and description**, select `Data, transform using mappers and conditions`. This is the first data transformer in the entity transformer.
6. In **Data transformers** -> **Manage name**, select `Value setter`.
7. In **Configurations** -> **Key**, enter `lastTimestamp`.
8. In **Value**, select **string** and enter the placeholder `&{updated}`
9. In **Mappers**, select `String: Replace`.
10. In **Search**, enter `T`.
11. Leave the **Replace** field empty.
12. Select **String: Cut**.
13. In **Start**, enter `0`.
14. In **Length**, enter `19`.

![manage-name](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/8-manage-name.png)

15. In **Manage name and description**, select `Data, transform using mappers and conditions`. This is the second data transformer in the entity transformer.
16. In **Data transformers** -> **Manage name**, select `Save entity to storage`.
17. In **Storage**, select the name of storage you created when establishing the incoming configuration at [step 10](#step-10). In our example, it is `[Default] Akeneo to Spryker - Products - update lastTimestamp`.
18. In **Storage entity identifier**, enter `lastTimestamp`.
19. In **Source**, enter `lastTimestamp`.

## 5. Define the route

Define the route as described in [Define the route](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#define-the-route).

## 6. Create tasks and import products from Akeneo to SCCOS

Follow the instructions in [Create tasks and import products from Akeneo to SCCOS](/docs/pbc/all/data-exchange/202311.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos.html).
