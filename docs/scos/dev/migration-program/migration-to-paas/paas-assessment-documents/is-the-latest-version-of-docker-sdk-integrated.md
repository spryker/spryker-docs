---
title: Is latest version of Docker SDK integrated and project is running on Docker SDK?
description: This document allows you to assess if the latest version of Docker SDK is integrated in a project.
template: howto-guide-template
---

# Is latest version of Docker SDK integrated and project is running on Docker SDK?

{% info_block infoBox %}

Resources: Backend

{% endinfo_block %}

## Description

1. Search in the root of the project for the deploy files, they should have the following naming structure `deploy.(projectname)-(environmentname).yml`.
2. Ensure there are deploy files for each environment. A list of environments can be taken from the prerequisites form.
3. Compare the structure of the existing deploy files to what we have in [public demo shops](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.aws-env-template.yml), the structure has to be the same.
4. Compare the section “Services“ it has to be fitting default services as in the [example](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.aws-env-template.yml) (having less is fine).
5. Compare the section “Groups“ it has to be fitting default applications as in the [example](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.aws-env-template.yml) (having less is fine).
6. If all the steps above are satisfying the requirements then it means no additional migration effort is required.
7. If some of the steps are not satisfied then the difference should be considered as migration effort.

## Formula

Approximately 1.5d per environment.
