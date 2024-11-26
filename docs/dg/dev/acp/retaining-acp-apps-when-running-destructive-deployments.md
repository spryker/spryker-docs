---
title: Retaining ACP apps when running destructive deployments
Description: Learn how to retain your Spryker ACP applications during destructive deployments, ensuring uninterrupted app performance and minimizing downtime.
template: concept-topic-template
last_updated: Sep 15, 2024
related:
    - title: Deployment pipelines
      link: docs/ca/dev/configure-deployment-pipelines/deployment-pipelines.html
    - title: App Composition Platform
      link: docs/dg/dev/acp/app-composition-platform.html
---

Destructive deployment is a deployment strategy that involves deleting the existing resources and creating new ones. This strategy is useful when you need to recreate resources from scratch, for example–when you need to implement BC breaking changes to your database.

When you integrate an ACP app, you add a configuration for that app. Running a destructive pipeline permanently deletes that configuration, preventing the app from working properly.

To run a destructive deployment without deleting the configuration of integrated apps, *before you run the deployment*, you need to disconnect all the apps using the ACP catalog. If additional steps are needed to disconnect an app, respective instructions will be displayed in the catalog.

After the application is redeployed, you can reconnect all the apps. This way, you can run a destructive deployment and keep your apps working.
