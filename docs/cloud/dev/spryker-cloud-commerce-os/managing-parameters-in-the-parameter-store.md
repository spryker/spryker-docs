---
title: Managing parameters in the Parameter Store
description: Learn how to manage parameters in the Parameter Store.
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/managing-parameters-in-the-parameter-store
originalArticleId: 2047c84c-bd7b-4bce-9203-08945367ad46
redirect_from:
  - /docs/managing-parameters-in-the-parameter-store
  - /docs/en/managing-parameters-in-the-parameter-store
---

This document describes how you can add new parameters and edit the values of existing parameters. You can use parameters for multiple purposes, like storing mail server details or providing Composer authentication details to the build and deploy process securely.

## Adding new parameters

Currently, only our team can add new parameters. To add a new parameter, fill out this [parameter creation form](https://spryker.force.com/support/s/hosting-change-requests/change-request-new-param-store-variable).

## Changing parameters values

Currently, you can change the parameters that follow the synax `parameter/${var.project.name}/custom-secrets/*`. For example, `parameter/testcompany-prod/custom-secrets/xyz`.

  
To edit the value of a parameter that does not follow the syntax, fill out the [parameter change form](https://spryker.force.com/support/s/hosting-change-requests/change-request-change-parameter).

To edit the value of a parameter that follows the syntax:

1.  In the AWS Management Console, go to **Services** > **System manager** > [**Parameter Store**](http://console.aws.amazon.com/systems-manager/parameters).
    
2.  Select the parameter that you want to edit
    
3.  Select **Edit**.
    
4.  On the *Edit parameter* page, update the **Value**.
    
5.  Select **Save Changes**.
    

You’ve updated the value of the parameter everywhere it is used.

