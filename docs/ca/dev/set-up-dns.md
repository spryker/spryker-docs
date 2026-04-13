---
title: Set up DNS
description: Set up DNS for your Spryker Cloud Commerce OS application by adding CNAME or A records, ensuring proper domain routing and TLS certificate configuration.
template: concept-topic-template
last_updated: Apr 8, 2026
---

To make your application accessible through your own domain, configure DNS records that point your domain to the Spryker-managed endpoint.

In most cases, this means adding a `CNAME` record in your DNS management for the domain you want to use. Spryker provides the target values as part of the setup process.

## Before you start

Before requesting DNS setup:

- Make sure the endpoint you want to use is final.
- Make sure the endpoint has been tested and approved internally.
- Make sure the `deploy.yml` file you provide to Spryker is the same file that will later be used for the Normal or Destructive deployment pipeline.
- Be aware that DNS setup is not immediate and can take up to a week to complete.

{% info_block infoBox "Info" %}

This process can take up to a full week because it includes both DNS propagation time and Spryker infrastructure work. To avoid rework, submit only final endpoint selections.

{% endinfo_block %}

## DNS setup process

The DNS setup usually follows these steps:

1. Add the endpoint you want to use to the appropriate `deploy.yml` file. For example, add a new endpoint under the desired application in your `deploy.yml`:

    ```yaml
    groups:
        EU:
            region: EU
            applications:
                yves:
                    application: yves
                    endpoints:
                        www.example.com:
                            store: DE
    ```

2. Create a support case and provide the `deploy.yml` file that contains the endpoint configuration. For example: "We have added the endpoint `www.example.com` to our `deploy.yml` and would like to set up DNS for it."
3. Ensure that this is the same `deploy.yml` file that will later be used for the Normal or Destructive deployment pipeline.
4. Spryker prepares the endpoint configuration and sends you the DNS records required for TLS verification. For example, you may receive a `CNAME` record like `_acme-challenge.www.example.com` pointing to a validation target.
5. Add the provided TLS verification records in your DNS management.
6. After the records are in place and have propagated, notify Spryker Support.
7. Spryker completes the infrastructure configuration.
8. Spryker sends you the final DNS target values, usually `CNAME` records, that must be added in your DNS management. For example: `www.example.com CNAME xxx.elb.amazonaws.com`. Root domains are treated differently — see [Root domain configuration](#root-domain-configuration).
9. After the DNS records are added and propagated, your application becomes accessible through the new domain.
10. Trigger the Normal or Destructive deployment pipeline using the same `deploy.yml` file that was provided to Spryker.

## Important: Configuration changes are staged

DNS-related endpoint changes are prepared first, but they do not become active immediately.

After Spryker prepares the new endpoint configuration, the change remains staged until a deployment pipeline is triggered.

This is especially important for infrastructure components that support only one active endpoint at a time.

## Critical constraint for Scheduler and Queue endpoints

The following services support only **one active endpoint configuration at a time**:

- Scheduler (`Jenkins`)
- Queue (`RabbitMQ`)

When a new domain endpoint is configured for either of these services, the previous endpoint is replaced. It is not kept in parallel.

Dual-domain operation is **not supported** for these components.

{% info_block warningBox "Warning" %}

If a deployment is triggered before the required DNS records are fully added and propagated, `Jenkins` and `RabbitMQ` can become unreachable because their previous endpoints will already have been replaced.

{% endinfo_block %}

## Safe activation sequence

Do **not** trigger deployment immediately after receiving the DNS records from Spryker.

Before triggering a Normal or Destructive deployment pipeline:

1. Confirm that the pipeline will use the same `deploy.yml` file that was provided to Spryker for DNS setup.
2. Add all required TLS verification records.
3. Add all required final DNS records at your registrar or DNS provider.
4. Verify that DNS propagation is complete.
5. Notify Spryker Support that DNS setup is complete.
6. Wait for confirmation from Spryker that the infrastructure-side setup is finished.
7. Only then trigger the deployment pipeline.

## Recommended pre-deployment checklist

Before triggering deployment for a new domain or domain migration, confirm all of the following:

- The `deploy.yml` file used for deployment is the same one that was provided to Spryker for DNS setup.
- TLS verification records were added.
- Final DNS records were added at the registrar or DNS provider.
- DNS propagation was verified, for example with `dig` or another DNS checker.
- Spryker Support was notified that DNS setup is complete.
- Spryker confirmed that the infrastructure configuration is complete.

Only after all items are completed should deployment be triggered.

## Root domain configuration

If you want to use a root domain such as `example.com`, use an `A` record instead of a `CNAME` record.

In this case, contact Spryker so the team can provide the correct IP address to use.

Do **not** use the load balancer IP addresses directly as your `A` record target, because those IP addresses are subject to rotation.

## NS record delegation

Spryker does not normally support full DNS delegation.

Do **not** change your domain's `NS` records to delegate the full DNS zone to Spryker unless explicitly instructed by Spryker.

## Troubleshooting and practical notes

### Adding the endpoint to deploy.yml does not make it active

Adding the endpoint in code only starts the setup flow. The endpoint becomes active only after the DNS setup is complete and deployment is triggered.

### The deploy.yml file must match the one shared for DNS setup

The `deploy.yml` file used in the Normal or Destructive deployment pipeline must match the one provided to Spryker during the DNS setup process. Otherwise, the deployed configuration may not match the DNS configuration prepared by Spryker.

### Old and new domains cannot be active at the same time for Jenkins or RabbitMQ

These services support only one active endpoint configuration at a time.

### Biggest risk: premature deployment or mismatched deploy.yml

The main risk is triggering deployment too early or using a different `deploy.yml` file than the one shared with Spryker. If DNS records are not fully in place and propagated, or if the deployed configuration does not match the prepared DNS setup, `Jenkins` and `RabbitMQ` can become unavailable.

### Verifying DNS propagation

You can verify propagation with tools such as `dig` or another public DNS checker. Check that the records returned publicly match the values provided by Spryker.
