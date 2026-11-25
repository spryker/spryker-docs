---
title: Configure deployment pipeline notifications
description: Receive email notifications when a deployment in Spryker Cloud Commerce OS fails or changes its state.
template: howto-guide-template
last_updated: Nov 24, 2026
---

Deployments often run without anyone watching them — for example, when a repository update starts a deployment automatically. Deployment pipeline notifications tell you by email when a deployment fails, so you can react quickly without monitoring the pipelines in the AWS Management Console.

This document describes which notifications you receive, what they contain, and how to choose who receives them and for which deployment states.

## Notifications you receive

By default, you receive no email notification when the status of a deployment pipeline changes. For details about these pipelines, see [Deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/deployment-pipelines.html). To receive such notifications you need to set them up, see [Set up or change notifications](#set-up-or-change-notifications).


Once set, notifications are sent to the email addresses registered for deployment notifications of your environment. The sender name is `Spryker deployments - {environment_name}`, where `{environment_name}` is the name of your environment.

If the notifications are not set up or your email addresses is not registered for notifications for your environment, you do not receive notifications. If it is set up and your email address is registered but you do not get notifications, make sure you confirmed your subscription all `AWS Notification - Subscription Confirmation` emails you get.

## Notification content

Each notification is a short plain-text email. For example, a notification about a failed deployment in the normal deployment pipeline of the `example-prod` environment looks as follows:

```text
Deployment FAILED: NORMAL_Deploy_Spryker_example-prod
Account: 123456789012 (eu-central-1)
Time: 2026-11-24T09:15:42Z
Execution ID: 0a1b2c3d-4e5f-6789-abcd-ef0123456789
Details: https://eu-central-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/NORMAL_Deploy_Spryker_example-prod/executions/0a1b2c3d-4e5f-6789-abcd-ef0123456789/timeline?region=eu-central-1
```

The email contains the following information:

| Line | Description |
| --- | --- |
| `Deployment` | The deployment state and the name of the deployment pipeline. |
| `Account` | The ID of the AWS account and the AWS Region of your environment. |
| `Time` | The time when the deployment changed its state, in UTC and ISO 8601 format. |
| `Execution ID` | The ID of the deployment, which is a pipeline execution in AWS CodePipeline. |
| `Details` | A link to the deployment in the AWS Management Console, where you can see which stage failed and open its logs. To open the link, you need [access to the AWS Management Console](/docs/ca/dev/access/connecting-to-aws-console-and-cli-with-an-iam-user.html). |

## Deployment states

You can receive notifications for one or more of the following deployment states. The states you choose apply to all deployment pipelines of your environment.

| State | When you receive a notification |
| --- | --- |
| `STARTED` | A deployment starts. |
| `SUCCEEDED` | A deployment completes successfully. |
| `FAILED` | A deployment fails. This is the default state. |
| `STOPPING` | Someone stops a deployment, and the deployment is being stopped. |
| `STOPPED` | A deployment is stopped. |
| `CANCELED` | A deployment is canceled because the pipeline was updated while the deployment was running. |
| `SUPERSEDED` | A newer deployment overtakes a deployment that is waiting for the next stage. |
| `RESUMED` | A failed deployment is retried. |

We recommend always keeping `FAILED`. To also get a confirmation of every completed deployment, add `SUCCEEDED`. For more details about these states, see [Monitoring CodePipeline events](https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html) in the AWS documentation.

## Set up or change notifications

To set up notifications, add or remove recipients, or change the deployment states you receive notifications for, [create a support case](https://portal.spryker.com) and provide the following information:

- The name of your environment.
- Optional: The email addresses to add or remove.
- Optional: The deployment states to receive notifications for. For the list of states, see [Deployment states](#deployment-states). 

The notifications setup should have at least one email address and at least one state.

When the change is applied, each new email address receives a subscription confirmation. Notifications are delivered only after the subscription is confirmed.

## Confirm a subscription

A subscription confirmation makes sure that notifications are sent only to recipients who agreed to receive them.

The recipient receives an email from AWS Notifications with the subject `AWS Notification - Subscription Confirmation`. To confirm, click **Confirm subscription** in the email. If the email does not arrive, check the spam folder. There may be more than one subscription confirmation email, to get all the requested the notifications subscriptions must be confirmed for all of them.

If a recipient does not confirm the subscription, [create a support case](https://portal.spryker.com) to send a new subscription confirmation.

## Stop receiving notifications

To stop receiving notifications, do one of the following:

- To stop notifications only for your email address, click the unsubscribe link at the end of any notification email.
- To remove one or more email addresses, [create a support case](https://portal.spryker.com) and provide the email addresses to remove.
