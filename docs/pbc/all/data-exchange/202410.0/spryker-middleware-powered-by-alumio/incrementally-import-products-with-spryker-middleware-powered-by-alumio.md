---
title: Incrementally import recently updated products with Spryker Middleware Powered by Alumio
description: Learn how to incrementally import products that have been updated a day ago
last_updated: Apr 18, 2024
template: howto-guide-template
---

This document describes how to import products that have recently been updated. Following the described procedure, you can import products that have been updated within the past day.

To run the incremental import of products, follow these steps.

## 1. Configure the Spryker Middleware Powered by Alumio connection with Akeneo PIM and Spryker

* If you create the new configuration, follow [Configure the Spryker Middleware Powered by Alumio connection with Akeneo PIM and SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html).
* If you update the existing configuration, proceed with [3. Create an incoming configuration](#create-an-incoming-configuration).

## 2. Configure the data mapping between Akeneo and Spryker

* If you create a new configuration, follow [Configure data mapping between Akeneo and SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html).
* If you update the existing configuration, proceed with [3. Create an incoming configuration](#create-an-incoming-configuration).

## 3. Create an incoming configuration

1. In Spryker Middleware powered by Alumio, go to **Connections** > **Incoming** and click **+**.
  This opens the **Create an incoming configuration** page.
2. For **Name**, enter the name for this configuration.
  As you are entering the name, the **Identifier** is automatically populated.
3. Optional: For **Description**, add the description of the configuration.
4. To activate the incoming configuration after creating, make sure **Status** is set to **Enabled**.
5. For **Subscriber**, enter and select **HTTP Subscriber**.
6. For **Request URI**, enter `/api/rest/v1/products`.
7. In **HTTP Client**, enter and select the Akeneo client you created in [Connect Akeneo with Spryker Middleware powered by Alumio](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-akeneo-with-spryker-middleware-powered-by-alumio).

![akeneo-client](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/2-akeneo-client.png)

8. For **Input transformer**, select **Chain**.
9. Click **Add data transformer**.
10. For **Select a prototype**, select **Value setter**.
11. For **Key**, enter `lastTimestamp`.

![input-transformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/3-input-transformer.png)

12. Click **Add data transformer**.
13. For **Select a prototype**, select **Get an entity from storage**.
<a name="step-10"></a>
14. For **Storage**, enter and select the storage you created. For example, **[Default] Akeneo to Spryker - Products - update lastTimestamp**. For instructions on creating new storage, see [Create cache](/docs/pbc/all/data-exchange/202404.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html#create-cache).
15. For **Storage entity identifier**, enter `lastTimestamp`.
16. For **Destination**, enter `lastTimestamp`.

![entity-from-storage](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/4-entity-from-storage.png)

17. Click **Add data transformer**.
18. For **Select a prototype**, select **Conditional transformer**.
19. For **If all conditions are met**, select **Value condition**.
20. For **Accessor**, select **Pattern accessor**.
21. For **Pattern**, enter `lastTimestamp`.
22. For **Conditions**, click **Add conditions**.
23. For **Select a prototype**, select **is empty**.

![conditional-transformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/5-conditional-transformer.png)

24. In **Then apply transformer**, for **Select a prototype**, select **Value setter**.
25. For **Key**, enter `LastTimestamp`.
26. For **Value**, select **string** and enter `-1 day`.
27. For **Mappers**, click **Add a mapper**.
28. For **Select a prototype**, select **Format: Date**.
29. For **Output format**, enter `Y-m-d H:i:s`.

![apply-transformer](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/6-apply-transformers.png)

30. For **Follow pagination**, select **Follow next links**.
31. For **Pattern to the link for the next page**, enter `_links.next.href`.
32. In **Maximum number of pages to fetch**, enter the needed value. For example, 100.
33. For **Entity schema**, select **Akeneo Product**.

![response-decoder](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/7-response-decoder.png)

34. Click **Save & continue**.
This opens the edit page for this configuration with a success message displayed.

## 4. Create an outgoing connection

For the incremental import to work, you need to add to your [outgoing connection](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#create-an-outgoing-configuration) an additional entity transformer with two data transformers in it.

To create the additional transformer, follow the steps:

1. In the Spryker Middleware powered by Alumio platform, go to **Connections** > **Entity transformers** and click **+**.
  This opens the **Create an entity transformer** page.
2. For **Name**, enter the name for the entity transformer. As you are entering the name, the **Identifier** is  automatically populated based on the name.
3. Optional: In **Description**, add the description for the transformer.
4. To activate the entity transformer after creating, set the status to **Enabled**.
5. For **Settings**, select **Chain multiple entity transformers**.
add entity transformer
6. Click **Add entity transformer**.
7. For **Select a prototype or configuration**, enter and select **Data, transform using mappers and conditions**.
  This is the first data transformer in the entity transformer.

8. In **Data transformers** click **Add data transformer**.
9. For **Select a prototype**, enter and select **Value setter**.
10. For **Configurations** > **Key**, enter `lastTimestamp`.
11. For **Value**, select **string** and enter `&{updated}`.
12. In **Mappers**, click **Add a mapper**.
13. For **Select a prototype**, enter and select **String: Replace**.
14. For **Search**, enter `T`.
15. Click **Add a mapper**.
11. For **Select a prototype**, enter and select **String: Cut**.
12. For **Start**, enter `0`.
13. For **Length**, enter `19`.

![manage-name](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/tutorials-and-howtos/docs%5Cpbc%5Call%5Cdata-exchange%5C202311.0%5Ctutorials-and-howtos%5Chow-to-incrementally-import-products-with-spryker-middleware-powered-by-alumio/8-manage-name.png)

15. Click **Add entity transformer**.
16. For **Select a prototype or configuration**, enter and select **Data, transform using mappers and conditions**
  This is the second data transformer in the entity transformer.
17. In **Data transformers** click **Add data transformer**.
18. For **Select a prototype**, enter and select select **Save entity to storage**.
16. For **Storage**, enter and select the storage you created when establishing the incoming configuration at [Create an incoming configuration](#step-10). In our example, it's **[Default] Akeneo to Spryker - Products - update lastTimestamp**.
17. For **Storage entity identifier**, enter `lastTimestamp`.
18. For **Source**, enter `lastTimestamp`.
19. Click **Save & continue**.
  This opens the edit page for this connection with a success message displayed.

## 5. Define the route

Define the route as described in [Define the route](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#define-the-route).

## 6. Create tasks and import products from Akeneo to SCCOS

Follow the instructions in [Create tasks and import products from Akeneo to SCCOS](/docs/pbc/all/data-exchange/202311.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos.html).
