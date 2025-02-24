---
title: Create tasks and import products from Akeneo to SCCOS
description: Test the configuration, create tasks, schedulers and run the import of products from Akeneo to SCCOS
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos.html
last_updated: Nov 10, 2023
---

After you have [configured the data integration path between Akeneo and SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html), you have to test the created configuration, create tasks and, optionally, schedulers for running the import.

## Create a task for the products import from Akeneo

To create a task for the products import from Akeneo, you have to run the incoming created at step [Create an incoming configuration](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#create-an-incoming-configuration).

To run the incoming, do the following:

1. In the Spryker Middleware powered by Alumio platform, go to **Connections -> Incoming** and click the necessary incoming configuration.
2. In the top right corner, click **Run incoming**.
3. Go to *Tasks* and make sure that there is the new task with the route you created at step [Define the route](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#define-the-route). The task's status should be *Processing*.

![tasks](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos/tasks.png)

{% info_block infoBox "Separate task for each product" %}

A separate task is created for every product. That is, if you initiate an incoming bulk import of, for instance, 40 products, this results in the creation of 40 individual tasks.

{% endinfo_block %}

### Filtering task messages

You can filter the task messages by different categories such as info, notice, error, and others. This is especially useful when you need to determine a reason why the task execution has failed. In such a case, you can filter the messages by errors and see details of the errors.
To filter the messages, do the following:
1. On the *Tasks* page, click the necessary task, for example, the one with the *Failed* status.
2. On the task details page, go to *Export Messages* tab.
3. In the filter dropdown, select the category you want to filter by.
4. Optional: To view details of the message, click *Details*.

![task-messages-filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos/task-messages-filter.png)

## Test the outgoing connection

Before importing data from Akeneo, you can test whether the configuration of the outgoing connection and Akeneo to Base transformer is set up correctly and processes the data as needed. To test the outgoing connection and its transformers, do the following:

1. Go to *Tasks* and click any of the tasks you created in the previous step.
2. Click the **Entity data** tab.
3. To copy the contents of the tab, click the blue button in the top left corner of the content area.
![entity-data](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos/entity-data.png)
4. Go to **Connection -> Outgoing** and select the configuration you created at step [Create an outgoing configuration](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#create-an-outgoing-configuration).
5. On the *Outgoing connections* page, in the *Entity transformers* section, click **View configuration** for you Akeneo to Base transformer.
6. Paste the copied content into the *Input* field of the transformer tester on the right.
6. Click **Run test**. The test is run for all the transformers in the outgoing connection.

The product that will be imported into SCCOS, appears at the bottom of the transformer tester.

![transformer-tester](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos/transformer-tester.png)

## Run the route

To get the task processed, you need to run the full route.
To run the route, do the following:
1. Go to *Routes* and click the route you created at step [Define the route](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#define-the-route).
2. At the *Routes* page, click **Run route**.

![run-route](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos/run-route.png)

In case of successful processing, this returns a message saying that the publisher has been exported. The status of the task you created at step [Create a task for the products import from Akeneo](#create-a-task-for-the-products-import-from-akeneo) should change to *Finished*.

{% info_block infoBox "Route execution logs" %}

You can check the execution status of the route in the route execution logs. To check the status, on the *Routes* page, in the *Action* column of the route, click **Logs**. In the *Logs* window, you can filter the records by error messages, warnings, etc. The logs are especially useful when you need to determine a reason why the route execution has failed.

{% endinfo_block %}

## Optional: Create a scheduler

To run the product import automatically on a regular basis, you would need to create a scheduler—
a job that would run the route. You need to create two schedulers: one for the incoming configuration and the other one for the outgoing configuration.

To create the scheduler, do the following:

1. Go to **Settings -> Scheduler** and click the + sign.
2. In *Name*, enter the name of your scheduler. As you are entering the name, the identifier will be populated automatically based on the name.
3. In *Job*, click **Add job** and select *Run incoming configuration*.
4. In *Incoming*, select the incoming configuration you created at step [Create an incoming configuration](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html#create-an-incoming-configuration).
5. In *Expression*, enter the time you want the scheduler to run. Use [Crontab guru](https://crontab.guru/) to set the time in the right format.
6. Create one more scheduler with the same parameters, but for step 3, select the *Run outgoing configuration* job.

Since the number of tasks that can be processed is limited, it's recommended to create a scheduler that would remove completed tasks after the specified intervals.

To create such a scheduler, do the following:

1. Go to **Settings -> Scheduler** and click the + sign.
2. In *Name*, enter the name of your scheduler. As you are entering the name, the identifier will be populated automatically based on the name.
3. In *Job*, click **Add job** and select *Prune tasks*.
4. Populate the *Maximum age of tasks* or *Minimum number of tasks to keep* fields depending on how you want the tasks to be deleted: based on age or based on their number.
5. In *Expression*, enter the time you want the scheduler to run. Use [Crontab guru](https://crontab.guru/) to set the time in the right format.


## Check the product in the SCCOS Back Office

To check the imported product in the SCCOS Back Office, go to **Catalog -> Products** and check if the product appeared on the list.
