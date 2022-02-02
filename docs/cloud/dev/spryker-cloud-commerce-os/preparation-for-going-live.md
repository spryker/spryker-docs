---
title: Preparation for going live
description: This instruction explains how to prepare a Spryker project for going live.
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/preparation-for-going-live
originalArticleId: 738903ac-4167-47ed-93c8-b225c8041582
redirect_from:
  - /docs/preparation-for-going-live
  - /docs/en/preparation-for-going-live
---

This instruction explains how to prepare a Spryker project for going live.

## Spryker go-live preparation

When preparing your project for go-live, consider the following sections and timeframes. 

{% info_block infoBox "Note" %}

The suggested timeframes should serve as orientation and might be different for you. Ensure that in the last week leading up to your go-live, none of the following tasks are still open.

{% endinfo_block %}

## Until five weeks before go-live

If you migrate from another shop or project to Spryker (the domain you want to use already points to a shop or a project), you need a migration plan and a plan to phase out your old project and phase in your new one. 

Plan the migration concept from your old project to Spryker thoroughly. Check with your SEO experts on what the strategy for your content and search engine results should be. Prepare this concept before you delegate your DNS to Spryker.

If you delegate DNS to Spryker, inform us when you want us to switch the relevant records from one system to the other.

{% info_block infoBox "Note" %}

DNS propagation is not instant. Therefore, do not "switch off" your old project after the switch is done. To migrate, assign time in your project to plan the switch.

{% endinfo_block %}

When you have delegated DNS to us, you will need to inform us when you want us to switch the relevant records from one system to the other. Also note that DNS propagation is not instant, meaning that you should not "switch off" your old project immediately after the switch was done. Assign time in your project to plan this if you need to migrate.

## Four weeks before go-live

- **The DNS Names and strategy for your shop are clear**. You should know how users access your shop, and you should verify that you controll access to the DNS for future domains. <br>For example, you have determined that you want to use spryker.com as the domain for your shop. You know how your customers should visit your Storefront and which URL they should use for that. For example, you might want to use the [www.spryker.com](http://www.spryker.com) subdomain for your Storefront.

- **Decide how email sending should be handled.** If you want to send emails using Spryker, decide whether you want to use the Mail Service that Spryker PaaS offers or attach your own Mail Server to your project. In case you want to use ours, validate your DNS name and lift sending restrictions. Let us know the email address you want to send from, and we can help you with the validation. If you have already delegated the NS records, we can set it ourselves.
- **Delegate DNS (Optional)**. To find out how to delegate a DNS name, see [Setting up a custom SSL certificate](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html).

{% info_block infoBox "Note" %}
	
The DNS delegation should be done after clarifying your migration plan. Once these records are set on your side, the DNS configuration is done by Spryker. This lets us configure and verify everything without the need for action on your side. However, if you have multiple DNS records set for your domain name and plan to set more DNS records later, Spryker needs to manage those for you in the future. Also, to delegate your DNS, send us your DNS name's current zone file to set all the records on our side.
	
{% endinfo_block %}

{% info_block warningBox "Warning" %}

If you do not delegate DNS to Spryker, decide how to deal with customers reaching your shop using the root domain (in our example, this is spryker.com). Spryker cannot provide you with an IP to point the DNS name to because Spryker PaaS works with DNS names for its endpoints exclusively.  You also cannot set a `CNAME` for a root domain. This means that you either find a way to redirect your visitors via another endpoint or delegate your DNS to us to resolve this issue.

{% endinfo_block %}

## Three weeks before go-live

- **Verify that your deploy.yml file is set up correctly**. Verify that your project works and works with the final endpoints. You can set both testing and final endpoints in your deploy.yml file. Your developers can now mock a "live" operation of the project with its final endpoints by adjusting their local host entries and test your shop thoroughly.
- **TLS certificates to be used are provisioned**. In case you delegate DNS to Spryker, TLS certificates for your endpoints should be created automatically. If you want us to create a TLS certificate for your endpoints but do not want to delegate your DNS, we can provide you with the verification records. You can request them via the [Support Portal](https://support.spryker.com). If you do not delegate your DNS, make sure to provide us with the TLS certificates as described in [Setting up a custom SSL certificate](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html#next-step) so we can configure the certificates for you.
Make sure to deploy to your production environment and run checks regularly—see [Deploying in a production environment](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-production-environment.html).

## Two weeks before go-live

- **Remove all demo data from your environment**. Ensure that you exclusively work with real data, which will be used after the go-live. Remove all demo data that comes with the Spryker repository, which explicitly includes all demo users (as well as the standard admin user), because having demo users active poses a significant security risk for your project.
- **Communicate your go-live plan to Spryker**. Make sure to reach out to your Partner or Customer Success Manager and share your go-live plans—the day and time when you want to make your shop accessible to the public. If this time should change, keep us updated. This is mission-critical for DNS switching and the hyper care phase, which Spryker Support does for you before and after your go-live.

## One week before go-live

- **Double-check the go-live date**. If any of the preceding tasks remain uncompleted, postpone your go-live, or discuss with us how to complete them in time.

{% info_block infoBox "Note" %}
		
All DNS-related topics are affected by delays that are inherent to the DNS system, and we cannot apply DNS changes or validations any faster. 

{% endinfo_block %}

{% info_block infoBox "Note" %}
	
If you find yourself struggling with the preceding points, reach out to Spryker Support using your Onboarding case **immediately**.
	
{% endinfo_block %}

- **Validate that the rollback strategy is still valid**. Check that everything you need to recover from an unforeseen problem with the newest version of the project you are deploying is available and in place.
- **Build up Go-Live Support Team**. Prepare a team that can monitor your Go-Live, react quickly to any problems, and work with Spryker Support or Operations teams.
