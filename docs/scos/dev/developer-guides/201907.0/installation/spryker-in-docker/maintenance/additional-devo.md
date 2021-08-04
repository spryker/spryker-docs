---
title: Additional DevOPS Information
originalLink: https://documentation.spryker.com/v3/docs/additional-devops-information-201907
redirect_from:
  - /v3/docs/additional-devops-information-201907
  - /v3/docs/en/additional-devops-information-201907
---

## How to Adjust Jenkins Scheduler to be Used in a Docker-like Environment.

1. Update the scheduler configuration settings:
<details open>
<summary>src/Pyz/Zed/Scheduler/SchedulerDependencyProvider.php</summary>

```PHP
// ---------- Scheduler
$config[SchedulerConstants::ENABLED_SCHEDULERS] = [
    SchedulerConfig::SCHEDULER_JENKINS,
];
$config[SchedulerJenkinsConstants::JENKINS_CONFIGURATION] = [
    SchedulerConfig::SCHEDULER_JENKINS => [
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_BASE_URL => 'http://' . getenv('SPRYKER_SCHEDULER_HOST') . ':' . getenv('SPRYKER_SCHEDULER_PORT') . '/',
    ],
];

$config[SchedulerJenkinsConstants::JENKINS_TEMPLATE_PATH] = getenv('SPRYKER_JENKINS_TEMPLATE_PATH');
```
</details>

2. Put the template where  `SPRYKER_JENKINS_TEMPLATE_PATH ` points to, similarly to the following:

<details open>
<summary>src/Pyz/Zed/Scheduler/SchedulerDependencyProvider.php</summary>

```PHP
{% raw %}{%{% endraw %} extends 'jenkins-job.default.xml.twig' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block setup {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock setup {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block command {% raw %}%}{% endraw %}<![CDATA[
    docker run -i --rm \
        your-image \
        -e APPLICATION_STORE={% raw %}{{{% endraw %} job.store {% raw %}}}{% endraw %} \
        bash -c \
        "{% raw %}{{{% endraw %} job.command {% raw %}}}{% endraw %}"
]]>{% raw %}{%{% endraw %} endblock command {% raw %}%}{% endraw %}

```
</details>

You can define additional store-specific variables as well.

3. Set up deployment, so that the environment variables  `SPRYKER_SCHEDULER_HOST `,  `SPRYKER_SCHEDULER_PORT ` and  `SPRYKER_JENKINS_TEMPLATE_PATH ` are set in the container where  `console scheduler:setup ` is run.

<!--by Oleksandr Myrnyi, Andrii Tserkovnyi-->

*Last review date: Oct 30, 2019*
