1. In the AWS Management Console, go to **Services** > **EC2**.
2. In the navigation pane, select **Instances**.
3. Select the checkbox next to the Jenkins instance you want to check for issues. The *Name* format is `{ENVIRONMENT_NAME}-scheduler`.
4. Next to the instance name, check *Instance state* and *Status check*.
5. In the pane of the instance that has appeared below, switch to the **Monitoring** tab.
6. Select the desired time period.
7. Check the graphs for spikes. Consider 10 times the usual usage a spike.

![jenkins-status](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-jenkins-status.md/jenkins-status.png)


{% info_block infoBox "" %}

Depending on your screen size, you may have to scroll down to see all the graphs.

{% endinfo_block %}
