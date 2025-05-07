---
title: Setting up a custom domain name with Route 53
description: Set up a custom domain name with Route 53 for your Spryker application, including DNS configuration and deployment in production or staging environments.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/setting-up-a-custom-domain-name-with-route-53
originalArticleId: 6a422776-6e65-48ae-8133-759954b13537
redirect_from:
  - /docs/setting-up-a-custom-domain-name-with-route-53
  - /docs/en/setting-up-a-custom-domain-name-with-route-53
  - /docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-domain-name/setting-up-a-custom-domain-name-with-route-53.html
---

This document describes how to set up a custom domain name (domain) with its DNS zone hosted by [Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html).

## 1. Set up hosted zones

To set up a hosted zone, provide the domain name via [support](https://spryker.force.com/support/s/).

## 2. Point domain names to Route 53

For a domain to start using the created hosted zone:

1. In the AWS Management Console, go to **Services** > **Route 53**.
2. Select **Hosted Zones**.
3. Select the domain you want to point.
4. In the *Records* pane, locate the record with the *NS* type.
5. Copy the *Value* of this record, which is a list of nameservers.
6. On your domain registrar's side, set up the nameservers for your domain. Refer to the domain registrar's documentation for details.
7. Optional: [Set up a custom SSL certificate for the domain](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html).


## 3. Define domain names

In Spryker Cloud Commerce OS, infrastructure deployment is based on the application configuration.
Domains are defined in a [deploy.*.yml](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html) file used by the [Docker SDK](/docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html) tool to build applications.

To define a custom domain, edit `deploy.{project_name}-prod.yml` for the production environment or `deploy.{project_name}-staging.yml` for the staging environment:

1. Find the desired `group:`.
2. In the `group: applications:`, find the desired application.
3. In the `endpoints:` section of the desired application, set the domain and its store relation:

```yaml
groups:
    DE-1:
        region: DE
        applications:
            Yves:
                application: yves
                endpoints:
                    {domain_name}:
                        store: {store_relation}
```

Example:

```yaml
groups:
    DE-1:
        region: DE
        applications:
            Yves:
                application: yves
                endpoints:
                    www.de.mysprykershop.com:
                        store: DE
```

{% info_block warningBox "Store configuration" %}

`store:` must correspond to `groups:` and `region:`. For example, it's impossible to set a US store in the DE region.

{% endinfo_block %}

See [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html) to learn more about deploy file configuration.

4. Depending on the environment you are setting up the domain for:

* [Deploy the application in the production environment](/docs/ca/dev/deploy-in-a-production-environment.html).

* [Deploy the application in the staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html).


5. Let us know about the desired change via [support](https://spryker.force.com/support/s/).

Give the DNS configuration 24-48 hours to propagate and you will be able to access your application via the domain.



## Next step

[Setting up a custom SSL certificate](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html)
