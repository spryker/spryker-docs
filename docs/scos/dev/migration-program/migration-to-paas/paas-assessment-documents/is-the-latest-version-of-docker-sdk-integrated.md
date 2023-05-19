---
title: Is latest version of Docker SDK integrated and project is running on Docker SDK?
description: This document allows you to assess if the latest version of Docker SDK is integrated in a project.
template: howto-guide-template
---


{% info_block infoBox %}

Resources: Backend

{% endinfo_block %}

## Description

1. In the project's root folder, check if deploy files exist. They have the following naming structure `deploy.{PROJECT_NAME}-{ENVIRONMENT_NAME}.yml`.
2. Make sure there is a deploy file for each environment. The list of environments should be in the prerequisites form.
3. Compare the structure of the project's deploy files to those of the [public demo shops](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.aws-env-template.yml). The structure should the same.
4. Compare the section `Services` it has to be fitting default services as in the [example](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.aws-env-template.yml) (having less is fine).
5. Compare the section `Groups` it has to be fitting default applications as in the [example](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.aws-env-template.yml) (having less is fine).


Based on the steps, consider each unmet requirement as migration effort. If all the requirements are met, no additional migration effort is required. 

## Formula

Approximately 1.5d per environment.
