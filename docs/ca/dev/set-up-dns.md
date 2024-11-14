---
title: Set up DNS
description: Set up DNS for your Spryker Cloud Commerce OS application by adding CNAME or A records, ensuring proper domain routing and TLS certificate configuration.
template: concept-topic-template
last_updated: Dec 18, 2023
---

You normally add a CNAME record in your DNS Management for the domains you want to use for your application. This CNAME corresponds to the DNS name of the load balancer of your environment to make your application accessible to the outside world. You can get the load balancer information from our support team. Generally, the DNS setup has these steps:
- You add the endpoint you want to use in the appropriate `deploy.yml` file and send it to us using a support case, mentioning that you have added a new endpoint that you want to set up for DNS configuration.
- We terraform this endpoint and send you back DNS entries for TLS verification (so that we can issue TLS certificates for your site).
- You set these entries in your DNS management and let us know when you are done.
- Terraforming can then be completed, and you receive the CNAME DNS records that you can then set in your DNS management to point your DNS names to the newly created endpoints.
- After this is completed, your application becomes accessible through the new endpoints.

{% info_block infoBox "Info" %}

This process can take a full week to complete due to DNS propagation and the terraform work that needs to be done. To avoid double work, ensure the endpoint selection is final and tested.

{% endinfo_block %}

To use a root domain for your application (for example, spryker.com), use an IP address instead of the load balancer DNS name, as this is required for an ARECORD. In this case, let our team know so they can provide you with an IP instead of the load balancer address. Do not set load balancer IP addresses as an ARECORD. The IP addresses are subject to rotation.

{% info_block infoBox "Info" %}

We do not normally support full delegation of your DNS to us and, therefore, do not suggest that you change your domain’s NS records to ours.

{% endinfo_block %}