1. In the AWS Management Console, go to **Services** > **Elastic Container Service**.
2. In the navigation pane, select **Task Definitions**.
3. Select the service you want to get the configuration for.
4. Select the latest revision of the definition. For example, if the available definitions are `{ENVIRONMENT_NAME}-zed:1` and `{ENVIRONMENT_NAME}-zed:2`, select `{ENVIRONMENT_NAME}-zed:2`.
5. On the page of the definition, switch to the **JSON** tab.
6. Search by the desired service name. For example, to find the connection configuration of the broker, search by *broker*. You should be able to find the following information:
   - `SPRYKER_BROKER_API_USERNAME`
   - `SPRYKER_BROKER_API_PASSWORD`
   - `SPRYKER_BROKER_API_HOST`
   - `SPRYKER_BROKER_API_PORT`

![task-definition](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-a-service-connection-configuration.md/task-definition.png)
