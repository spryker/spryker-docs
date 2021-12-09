1. In the AWS Management Console, go to **Services** > **Elastic Container Service**.
2. In the navigation pane, select **Clusters**.
3. Select the cluster of the environment to which an unavailable service belongs.
4. On the page of the cluster, select the unavailable service.
5. On the page of the service, check if the *Running count* is equal to the *Desired count*. If the numbers are equal, the service is running correctly.
6. Switch to the **Tasks** tab.  
7. Check if the *Last status* is *Running.*

![service-tasks](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-the-status-of-ecs-services-and-tasks.md/service-tasks.png)

8. If the task is not running, switch to the Events tab and check the errors.

![ecs-service-events](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-the-status-of-ecs-services-and-tasks.md/ecs-service-events.png)

9. Switch to the **Tasks** tab.
10. For the **Desired task status**, select **Stopped**.

![stopped-service-tasks](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-the-status-of-ecs-services-and-tasks.md/stopped-service-tasks.png)

11. Select the latest stopped task.

{% info_block infoBox "Multiple stopped tasks" %}

If there are multiple stopped tasks, to identify the latest one, open the page of every task and compare the *Stopped at* dates and times.

{% endinfo_block %}

12. In the *Containers* section, select the arrow before the container name.

13. In the *Details* section, check the exit code and the errors.


![task-exit-code](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-the-status-of-ecs-services-and-tasks.md/task-exit-code.png)
