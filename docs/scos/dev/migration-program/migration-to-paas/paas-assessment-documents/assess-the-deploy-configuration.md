---
title: Assess the deploy configuration
description: This document allows you to assess if the latest version of Docker SDK is integrated in a project.
template: howto-guide-template
---


## Resources for assessment

Backend

## Description

1. In the project's root folder, check if deploy files exist. They have the following naming structure `deploy.{PROJECT_NAME}-{ENVIRONMENT_NAME}.yml`.
2. Make sure there is a deploy file for each environment. The list of environments should be in the prerequisites form.
3. Compare the structure of the project's deploy files to those of the [public demo shops](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.aws-env-template.yml). The structure should the same.
4. In the `Services` section, check for custom services that are not shipped by default with the Docker SDK.
    For the reference list of the default services, see the [B2C Demo Shop deploy file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.aws-env-template.yml). The project having less default services doesn't increase the migration effort.
5. In the `Groups` section, check for custom applications that are not shipped by default with the Docker SDK.
    For the reference list of the default applications, see the [B2C Demo Shop deploy file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.aws-env-template.yml). The project having less default applications doesn't increase the migration effort.


Based on the steps, consider each unmet requirement as migration effort. If all the requirements are met, no additional migration effort is required.

## Formula for calculating the migration effort

Approximately 1.5d per environment.
