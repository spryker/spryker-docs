---
title: Integrate the latest version of Docker SDK and run project on it
description: This document describes how to integrate the latest version of Docker SDK and run project on it.
template: howto-guide-template
---

## Resources for assessment

* Backend
* Optional: DevOps


1. For all required environments, create deploy files with the `deploy.{PROJECT_NAME}-{ENVIRONMENT_NAME}.yml` naming pattern. For an example, see the [B2C Demo Shop boot file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.spryker-b2c-staging.yml).
2. Based on the deploy files you've created, deploy the local environments and make sure they are working correctly.
3. In sync with the cloud engineer check the naming of hosts for services per each environment.
4. Deploy other environments in Spryker Cloud and ensure they are running well with new/updated deploy files.
   The first deployment of any environment has to be in destructive mode.
5. Custom applications have to be added by DevOps, the following instructions are needed in case it is not part of Spryker applications:
    * app name;
    * hostname;
    * Docker file in order to build an image.
        * Docker container with this image has to be able to respond to HTTP queries;
    * list of required ENV variables;
    * a port which has to be dedicated to the application inside the docker container;
    * [optional] instructions on how to run the application.
6. Default Spryker applications will be working fine right away (see the list in [demoshop](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.aws-env-template.yml#L80)):
    * Yves;
    * Zed;
    * Glue;
    * Backoffice;
    * Backend-gateway;
    * Merchant-portal.
7. Custom services have to be replaced by default with Spryker Cloud services, see details [here](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-non-standard-services.html).
