---
title: Setting up a custom domain name
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/setting-up-a-custom-domain-name
originalArticleId: fbf9cb02-2a68-45bd-a404-258011585225
redirect_from:
  - /docs/setting-up-a-custom-domain-name
  - /docs/en/setting-up-a-custom-domain-name
---

With Spryker Cloud Commerce OS, you get domain names (domains) which are managed automatically for the staging and production environments. You can also set up custom domains during the initial setup or any time later.
If you provided custom domains for the initial setup, follow [Set up a DNS zone](#set-up-a-dns-zone).
If you want to set up a custom domain after the initial setup, depending on the desired DNS zone provider, see:

* [Setting up a custom domain name with Route 53](/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-domain-name/setting-up-a-custom-domain-name-with-route-53.html)
* [Setting up a custom domain name with a third-party DNS zone provider](/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-domain-name/setting-up-a-custom-domain-name-with-a-third-party-dns-zone-provider.html)

## Set up a DNS zone
You can host the DNS zone of a domain with [Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html) or with a third-party provider. 
If you choose the latter, you need to manage DNS records and SSL certificates with the DNS zone provider.

### Set up a DNS zone with Route 53
We created [Route 53 Hosted Zones](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html) for all the domains you’ve provided for the initial setup. For a domain to start using the created hosted zone:

1. In the AWS Management Console, go to **Services** > **Route 53**.
2. Select **Hosted Zones**.
3. Select the domain you want to configure.
4. In the *Records* section, locate the record with the *NS* type.
5. Copy the *Value* of this record, which is a list of nameservers.
6. On your domain registrar's side, set up the nameservers for the domain. Refer to the domain registrar's documentation for details.
7. Optional: [Set up a custom SSL certificate for the domain](/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html).

Give the DNS configuration 24-48 hours to propagate and you will be able to access your application via the domain. 

### Set up a DNS zone with a third-party DNS zone provider

We created load balancers for the staging and production environment during the initial setup. To point a domain to an application, point it to the respective load balancer as follows:

1. In the AWS Management Console, go to **Services** > **EC2** > **Load Balancers**.
2. Depending on the environment, select one of the load balancers with the *application* type:
    * *{project_name}-staging*
    * *{project_name}-prod*

3. In the *Load balancer:{load balancer name}* section, select **Copy** ![copy icon](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Setting+up+a+custom+domain+name/Setting+up+a+custom+domain+name/copy-icon.png) next to the DNS name field.
 
4. On the side of the DNS zone provider, set up a CNAME record using the copied *DNS name* as the record value. Refer to the DNS zone provider’s documentation for details.

Give the DNS configuration about an hour to propagate and you will be able to access your application via the domain. 
 
## Next step

[Setting up a custom SSL certificate](/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html)

