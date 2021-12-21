---
title: Launching Storefronts
description: Learn how to launch Storefronts
template: concept-topic-template
---

This tutorial describes how to deploy Storefronts using the Spryker Launchpad.

## Logging into the Launchpad

Using the login details provided by your FeS account owner, log into the [Launchpad](https://launchpad.spryker.com).

After logging in, the *List of Applications* page opens.

## Creating a Storefront

To create a Storefront, do the following:

1. On the *List of Applications* page, select **Create new application**.

2. Enter a descriptive **Name** for the Storefront.
  As you can have multiple Storefronts, it's handy to have a unique name for each fo them.

3. For **Type**, select **Spryker VueStorefront**.
  In future, you'll be able to create other types of applications. For now, let's stick with the Storefront.

  *Code Repository provider*, *Hosting provider*, and *Commerce provider* sections appear.

4. In the *Code Repository provider* section, select **Install GitHub organization**.

5. On the GitHub page that opens, connect your GitHub organization and grant access to the repository with the VueStorefront application.

This takes you back to the *Create new Application* page.

6. Select the **ORGANISATION** you've connected.

7. Select the **REPOSITORY** with the VueStorefront application.

8. Select the **BRANCH** you want to deploy.

We recommend mapping branches to Storefronts as follows:
* master branch — production Storefront
* development branch — staging Storefront




## How do I set up an infrastructure for a front end?


### How do I connect my hosting?

### How do I connect my back end?

### Anything else I need to configure?

Result: The *List of Applications* page opens with the success message displayed. The application is displayed in the list.

To publish the application, do the following:

1. Select the application you've created.
  This opens the the pane of the application.

2. In the *Hosting provider* section, select **Install Application**.
  This shows the success message. Each time you update the code in the connected repository, the Storefront is updated with the changes.


To edit the application, select **Edit** in the top-right corner.   


...
