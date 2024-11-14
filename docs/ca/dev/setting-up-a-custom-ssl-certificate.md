---
title: Setting up a custom SSL certificate
description: Set up a custom SSL certificate for your Spryker Cloud Commerce OS production environment, including steps for certificate registration and configuration for secure connections.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/setting-up-a-custom-ssl-certificate
originalArticleId: 2e1dea17-21b4-4b25-ac8f-7cf2766f07eb
redirect_from:
  - /docs/setting-up-a-custom-ssl-certificate
  - /docs/en/setting-up-a-custom-ssl-certificate
  - /docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html
---

This document describes how to set up an SSL certificate (SSL) for a production environment.

By default, all the domain names (domains) are provided with generic SSLs, which are managed automatically. For the production environment, you can set up a custom SSL certificate.

{% info_block infoBox "Third-party DNS zone provider" %}

If the DNS zone of a domain name is hosted with a third-party provider, it is impossible to use the generic SSLs and manage custom SSLs in Spryker Cloud Commerce OS.

{% endinfo_block %}

{% info_block warningBox "Pre-installed SSLs" %}

If you provided custom SSLs for the initial setup, they are already installed and you can skip this step.

{% endinfo_block %}


## Setting up a custom SSL certificate

To set up a custom SSL:

1. Register an SSL.
2. Provide the following details via [support](https://spryker.force.com/support/s/):
    * Domain name
    * Certificate body
    * Certificate private key
    * Optional: Certificate chain

{% info_block warningBox "Format" %}

The values should be [PEM-encoded](https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-format.html).

{% endinfo_block %}

We set up the SSL shortly after you have provided it.


## Next step
[Deploying in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html)
