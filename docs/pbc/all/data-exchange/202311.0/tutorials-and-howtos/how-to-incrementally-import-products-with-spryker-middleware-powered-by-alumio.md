---
title: How to incrementally import products with Spryker Middleware Powered by Alumio
description: This guide shows how to send a request in Data Exchange API.
last_updated: Apr 18, 2024
template: howto-guide-template
---

This document describes how to import products that have recently been updated. Following the described procedure, you can import only products that have been updated maximum one day ago.

To run the incremental import of products, follow this steps.

## 1. Configure the Spryker Middleware Powered by Alumio connection with Akeneo PIM and SCCOS

If you create the new configuration, follow the procedure described in [Configure the Spryker Middleware Powered by Alumio connection with Akeneo PIM and SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html). If you update the existing configuration, skip this step and go to [3. Create an incoming configuration](#3-create-an-incoming-configuration)

## 2. Configure data mapping between Akeneo and SCCOS
If you create the new configuration, follow the procedure described in [If you create the new configuration, follow the procedure described in](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html). If you update the existing configuration, skip this step and go to [3. Create an incoming configuration](#3-create-an-incoming-configuration).

## 3. Create an incoming configuration

1. In Spryker Middleware powered by Alumio, go to **Connections -> Incoming** and click the + sign.
2. In *Name*, enter the name of your configuration. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In *Description*, add the description of your incoming configuration.
4. To activate the incoming configuration, set the status to *Enabled*.
5. In the *Subscriber* field, select the *HTTP subscriber*. 
6. In *Request URL*, enter */api/rest/v1/products*.
7. In *Payload type*, select *Encoded data*.
8. In *Request Parameters*, enter the following string: *search={"updated":[{"operator":">","value":"&{lastTimestamp}"}]}&limit=10*. For the *limit* value, you can specify any number of products you want to import. If you want to import all updated products, see [Batch products import](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#batch-products-import).

IMAGE

9. In *HTTP Client*, select the Akeneo client that you created at step [Connect Akeneo with Spryker Middleware powered by Alumio](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html#connect-akeneo-with-spryker-middleware-powered-by-alumio).
10. In *Input transformer*, add three transformer parts as follows.
First part:
    1. In *Input transformers* -> *Manage name*, select *Chain*.
    2. In *Data transformers* -> *Manage name*, select *Value setter*.
    3. In *Data transformers* -> *Configurations* -> *Key*, enter *lastTimestamp*.

    IMAGE
<a name="step-10"></a>
Second part:
    1. In *Manage name*, select *Get an entity from storage*. 
    2. In *Storage*, provide the name of the new storage. For example, `[Default] Akeneo to Spryker - Products - update lastTimestamp`.
    3. In *Storage indentifier* enter *lastTimestamp*.
    4. In *Destination*, enter *lastTimestamp*.
    IMAGE

Third part:
    1. In *Manage name*, select *Conditional transformer*.
    2. In *If all conditions are met*, select *Value condition*.
    3. In *Accessor*, select *Pattern accessor*.
    4. In *Pattern*, select *lastTimestamp*.
    5. In *Keys-conditions*, select *is empty*.

    IMAGE 
11. Apply *Then apply transformer*. Populate the fields as follows:
    1. In *Manage name*, select *Value setter*.
    2. In *Key*, enter *LastTimestamp*.
    3. In *Value*, select *string* and enter the placeholder `-1 day`.
    4. In *Mappers*, select *Format: Date*.
    5. In *Mappers* -> *Output for*mat*, enter `Y-m-d H:i:s`.
    6. Leave *Input format*, *Output timezone* and *Input timezone* with the default `Automatic` value. 

    IMAGE
## 4. Create an outgoing connection

For the incremental import to work, you need to update your outgoing connection with an additional entity transformer with two data transformers in it.

To create the transformer, do the following:

1. In the Spryker Middleware powered by Alumio platform, go to **Connections -> Entity transformers** and click the + sign.
2. In *Name*, enter the name of your entity transformer. As you are entering the name, the identifier will be populated automatically based on the name.
3. Optional: In Description, add the description of your transformer.
4. To activate the entity transformer, set the status to Enabled.
5. In *Settings*, select `Chain multiple entity transformers`.
6. In *Manage name and description*, select `Data, transform using mappers and conditions`. This is the first data transformer in the entity transformer.
6. In *Data transformers* -> *Manage name*, select `Value setter`.
7. In *Configurations* -> *Key*, select `lastTimestamp*. 
8. In *Value*, select *string* and enter the placeholder `&{updated}`
9. In *Mappers*, select `String: Replace`.
10. In *Search*, enter `T`.
11. Leave the *Replace* field empty.
12. Select *String: Cut*.
13. In *Start*, enter `0`.
14. In *Length*, enter `19`.

IMAGE
15. In *Manage name and description*, select `Data, transform using mappers and conditions`. This is the second data transformer in the entity transformer.
16. In *Data transformers* -> *Manage name*, select `Save entity to storate`.
17. In *Storage*, select the name of storage you created when establishing the incoming configuration at [step 10](#step-10). In our example, it is `[Default] Akeneo to Spryker - Products - update lastTimestamp`.
18. In *Storage entity identifier*, enter `lastTimestamp`.
19. In *Source*, enter `lastTimestamp`.

## 5. Define the route