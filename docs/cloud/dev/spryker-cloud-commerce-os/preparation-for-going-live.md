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

This document describes how to prepare a Spryker project for going live.

## Spryker go-live preparation

We divided the preparation into the following timeframes and you can adjust them to your needs. Make sure that all the following tasks are complete one week before going live.

## Until five weeks before go-live

If you migrate from another shop or project to Spryker, that is the domain you want to use already points to a shop or a project, you need a migration plan to phase out the old project and phase in the new one. 

Check with your SEO experts on the strategy for your content and search engine results. 

If you delegate DNS to Spryker, let us know when you want us to point the domain name to your Spryker project.

{% info_block infoBox "Note" %}

After pointing the domian name to your Spryker project, some of your customers may still see your old poject due to DNS propagation. So, make sure to keep it live for up to 72 hours after the migration. 

{% endinfo_block %}

## Four weeks before go-live

- **Performance Tips implemented and verified**. Double-check that you implemented all the provided performance tips.

- **Conduct Load Tests**. Make sure that you conducted load tests for your application. The dataload with sample data used for testing should be comparable to the size and complexity of the production data.

- **The DNS Names and strategy for your shop are clear**. You should know how users access your shop, and you should verify that you controll access to the DNS for future domains. <br>For example, you determined that you want to use `spryker.com` as the domain for your shop. You might want to use the `www.spryker.com` subdomain for your Storefront. This is the URL your customers will be using to access your shop. 

- **Decide how email sending should be handled.** If you want to send emails using Spryker, decide whether you want to use the native  Mail Service shipped with Spryker PaaS or integrate a third-party Mail Server. If you want to use the native one, validate your DNS name and lift sending restrictions. Let us know the email address you want to send from, and we will help you with the validation. If you already delegated the NS records, we can set it ourselves.
- **Optional: Delegate DNS**. To find out how to delegate a DNS name, see [Setting up a custom SSL certificate](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html).

{% info_block infoBox "Note" %}
	
Only delegate the DNS after creating a migration plan. Once these records are set on your side, we handle the DNS configuration on our side. This lets us configure and verify everything without the need for action on your side. This also means that, to set up DNS records in future, you will need to contact us. If there are DNS records in your currrent thone, to delegate your DNS, send us your  current zone file to set all the records on our side.
	
{% endinfo_block %}

{% info_block warningBox "Warning" %}

If you do not delegate DNS to Spryker and you want to use a subdomain for your Storefront, decide how to deal with the customers reaching your shop using the root domain. In our example `www.spryker.com` is the subdomain and `spryker.com` is the root domain. We  cannot provide you with an IP to point the DNS name to because Spryker PaaS works only with DNS names for its endpoints.  You also cannot set a `CNAME` for a root domain. This means that you need to find a way to redirect your visitors via another endpoint.

{% endinfo_block %}

## Three weeks before go-live

- **Verify that your Deploy file is set up correctly**. Verify that your project works and operates the production endpoints. You can set both testing and production endpoints in your Deploy file. Your developers can now mock a "live" operation of the project with its production endpoints by adjusting their local host entries.
- **TLS certificates are provisioned**. If you delegate DNS to Spryker, TLS certificates for your endpoints are created automatically. If you want us to create TLS certificates for your endpoints but do not want to delegate your DNS, we can provide you with the verification records. Request them via the [Support Portal](https://support.spryker.com). If you do not delegate your DNS and want to use your own certificates, provide them to us as described in [Setting up a custom SSL certificate](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html).
Make sure to deploy to your production environment and run checks regularly. For instructions, see [Deploying in a production environment](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-production-environment.html).

## Two weeks before go-live

- **Remove all demo data from your environment**. Make that you exclusively work with the real data that which will be used after the go-live. Remove all demo data that comes with the Spryker repository, which explicitly includes all demo and admin user. Demo users in a live shop pose a significant security risk for your project.
- **Communicate your go-live plan to us**. Make sure to reach out to your Partner or Customer Success Manager and share your go-live plans—the day and time when you want to make your shop accessible to the public. If this time should change, keep us updated. This is mission-critical for DNS switching and the hyper care phase, which Spryker Support does for you before and after your go-live.

## One week before go-live

- **Double-check the go-live date**. If any of the preceding tasks remain uncompleted, postpone your go-live, or discuss with us how to complete them in time. All DNS-related topics are affected by delays that are inherent to the DNS system, and we cannot apply DNS changes or validations any faster. 

{% info_block infoBox "Note" %}
	
If you struggle with the preceding points, reach out to Spryker Support using your Onboarding case *immediately*.
	
{% endinfo_block %}

- **Validate that the rollback strategy is still valid**. Check that you have everything you need to recover from an unforeseen problem with the newest version of the project you are deploying.
- **Build up Go-Live Support Team**. Prepare a team that can monitor your go-live, react quickly to any problems, and work with the Spryker Support or Operations teams.
