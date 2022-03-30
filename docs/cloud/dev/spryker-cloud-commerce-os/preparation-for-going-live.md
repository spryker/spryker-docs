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

We divided the preparation into approximate timeframes, and you can adjust them to your needs. Make sure that all the following tasks are complete one week before going live.

## Until five weeks before go-live

If you are migrating from another shop or project to Spryker, that is the domain you want to use already points to a shop or a project, you need a migration plan to phase out the old project and phase in the new one. Check with your SEO experts on the strategy for your content and search engine results.

If you delegate DNS to Spryker, let us know the date on which to point the domain name to your Spryker project.

{% info_block infoBox "DNS propagation" %}

After pointing the domain name to your Spryker project, some of your customers may still see your old project due to DNS propagation. So, keep it live for up to 72 hours after the migration.

{% endinfo_block %}

## Four weeks before go-live

- **Performance Tips implemented and verified**. Double-check that you implemented all the provided performance tips.

- **Conduct Load Tests**. Conduct load tests for your application. The sample data used for testing should be comparable to the size and complexity of the production data.

- **The DNS Names and strategy for your shop are clear**. You know how users are going to access your shop. Verify that you control access to the DNS to be able to manage DNS. For example, you want to use `spryker.com` as the domain for your shop, but you want user to access the Storefront via the `www.spryker.com` subdomain.

- **Decide how email sending should be handled.** If you want to send emails using Spryker, decide whether you want to use the native mail service shipped with Spryker PaaS or integrate a third-party one. If you want to use the native one, let us know the email address you want to send emails from. We will lift sending restrictions and help you validate the needed DNS name.
- **Optional: Delegate DNS**. To find out how to delegate a DNS name, see [Setting up a custom SSL certificate](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html).

### DNS delegation

Only delegate the DNS after creating a migration plan. After you delegate the DNS, we handle the DNS configuration on our side. This lets us configure and verify everything without the need for action on your side. To set up DNS records, you need to contact us. If there are DNS records in your current zone, before delegating, send us your current zone file to set all the records on our side.

If you do not delegate DNS to Spryker, and you want to use a subdomain for your Storefront, decide how to deal with the customers reaching your shop using the root domain. In our example `www.spryker.com` is the subdomain and `spryker.com` is the root domain. We can't provide you with an IP to point the DNS name to because Spryker PaaS works only with DNS names for its endpoints. You also can't set a `CNAME` for a root domain. This means that you need to find a way to redirect your visitors via another endpoint.

## Three weeks before go-live

- **Verify that your Deploy file is set up correctly**. Verify that your project works and operates the production endpoints. You can set both testing and production endpoints in your Deploy file. Your developers need to mock a "live" operation of the project with its production endpoints by adjusting their local host entries.
- **TLS certificates are provisioned**. If you delegate DNS to Spryker, TLS certificates for your endpoints are created automatically. If you want us to create TLS certificates for your endpoints but do not want to delegate your DNS, request the verification DNS records via the [Support Portal](https://support.spryker.com). If you do not delegate your DNS and want to use your own certificates, provide them to us as described in [Setting up a custom SSL certificate](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html).
- **Deploy the production environment regularly**. This lets you detect potential issues early enough to fix them before going live. For instructions, see [Deploying in a production environment](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-production-environment.html).

## Two weeks before go-live

- **Remove all the demo data from the environment**. The project should only use the real data that will be used after the go-live. Remove all the demo data that comes with the Spryker repository, which includes demo and admin users. Demo users in a live shop pose a significant security risk for your project.
- **Let us know your go-live plan**. Reach out to your Partner or Customer Success Manager and share your go-live plans: the date and time when you want to make your shop accessible to the public. If the time changes, keep us updated. This is critical for DNS switching and the hyper care phase we provide before and after your go-live.

## One week before go-live

- **Double-check the go-live date**. If any of the preceding tasks are not complete, postpone your go-live or discuss with us how to complete them in time. DNS changes are especially sensetive to deadlines. Due to how the DNS system works, any DNS changes take time to take effect.

{% info_block infoBox "Don't hesitate to contact us" %}

If your go-live date is close and you feel like you need help with any of the described tasks, contact us via your Onboarding case *right away*.

{% endinfo_block %}

- **Validate that the rollback strategy is still valid**. Check that you have everything you need to recover from an unforeseen issue with the newest version of the project you are deploying.
- **Organize a go-live support team**. Prepare a team that can monitor your go-live, react quickly to any issues, and work with the Spryker Support or Operations teams.
