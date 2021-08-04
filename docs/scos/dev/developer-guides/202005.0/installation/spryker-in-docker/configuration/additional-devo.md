---
title: Additional DevOPS Guidelines
originalLink: https://documentation.spryker.com/v5/docs/additional-devops-guidelines
redirect_from:
  - /v5/docs/additional-devops-guidelines
  - /v5/docs/en/additional-devops-guidelines
---

This document provides additional DevOPS guidelines for running Spryker in Docker.

## Adjust Jenkins for Docker Environment
Follow the steps to adjust the Jenkins scheduler to docker like environments:
1. Update the scheduler configuration settings in `src/Pyz/Zed/Scheduler/SchedulerDependencyProvider.php`:

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

2. Using the example in `src/Pyz/Zed/Scheduler/SchedulerDependencyProvider.php`, put the template where  `SPRYKER_JENKINS_TEMPLATE_PATH ` points to:

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

{% info_block infoBox %}

You can define additional store-specific variables if needed.

{% endinfo_block %}

3. Set up deployment, so that the following environment variables are set in the container where  `console scheduler:setup ` is run:
*  `SPRYKER_SCHEDULER_HOST `
*   `SPRYKER_SCHEDULER_PORT `
*    `SPRYKER_JENKINS_TEMPLATE_PATH `
