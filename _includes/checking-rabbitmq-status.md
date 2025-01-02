

### Check RabbitMQ connection details

To connect to the RabbitMQ Management interface, you need to check the following details:
- `SPRYKER_BROKER_API_USERNAME`
- `SPRYKER_BROKER_API_PASSWORD`
- `SPRYKER_BROKER_API_HOST`
- `SPRYKER_BROKER_API_PORT`

Check the details as follows:
{% include checking-a-service-connection-configuration.md %} <!-- To edit, see /_includes/checking-a-service-connection-configuration.md -->



### Check RabbitMQ node status and errors

1. Using the login details you’ve checked in the [Check RabbitMQ connection details](#check-rabbitmq-connection-details), log into the RabbitMQ Management interface at `http://rabbitmq.{ENVIRONMENT_NAME}.{SPRYKER_BROKER_API_HOST}:{SPRYKER_BROKER_API_PORT}`
2. In the *Nodes* section of the **Overview** tab, check the node status. If all the columns are green, the node is working properly.

![status-of-nodes](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-rabbitmq-status.md/status-of-nodes.png)

3. Switch to the **Queues** tab.
4. Check the *State* of queues.
5. Check if there are messages in the queues postfixed with `error`. For example, `publish.error`.

![rabbitmq-queue-messages](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-rabbitmq-status.md/rabbitmq-queue-messages.png)

6. If the error count is above zero for an error queue, check the errors as follows:
    a. Select the queue with the error.
    b. On the page of the queue, select **Get messages** > **Get message(s)**.

![rabbitmq-get-messages](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-rabbitmq-status.md/rabbitmq-queue-messages.png)
