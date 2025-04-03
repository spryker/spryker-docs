---
title: Setting up a custom domain name with a third-party DNS zone provider
description: Set up a custom domain name with a third-party DNS provider on Spryker, following detailed steps for load balancer configuration and domain management.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/setting-up-a-custom-domain-name-with-a-third-party-dns-zone-provider
originalArticleId: a0bdd6d7-2603-4bb6-8ab9-0899a6b2041f
redirect_from:
  - /docs/setting-up-a-custom-domain-name-with-a-third-party-dns-zone-provider
  - /docs/en/setting-up-a-custom-domain-name-with-a-third-party-dns-zone-provider
  - /docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-domain-name/setting-up-a-custom-domain-name-with-a-third-party-dns-zone-provider.html
---

This document describes how to set up a custom domain name (domain) with a third-party DNS zone provider.


## 1. Point domain names to load balancers

To point a domain to your application, point it to the respective load balancer as follows:

1. In the AWS Management Console, go to **Services** > **EC2** > **Load Balancers**.
2. Depending on the environment, select one of the load balancers with the *application* type:
    * *{project_name}-staging*
    * *{project_name}-prod*

3. In the *Load balancer:{load balancer name}* section, select **Copy** ![copy icon](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Setting+up+a+custom+domain+name/Setting+up+a+custom+domain+name+with+a+third-party+DNS+zone+provider/copy-icon.png) next to the DNS name field.

4. On the side of the DNS zone provider, set up a CNAME record using the copied *DNS name* as the record value. Refer to the DNS zone provider's documentation for details.


## 2. Define domain names

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

## Next step

[Setting up a custom SSL certificate](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html)
