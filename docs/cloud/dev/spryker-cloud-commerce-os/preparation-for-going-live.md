---
title: Preparation for going live
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/preparation-for-going-live
originalArticleId: 738903ac-4167-47ed-93c8-b225c8041582
redirect_from:
  - /docs/preparation-for-going-live
  - /docs/en/preparation-for-going-live
---

# Spryker Go Live Preparation

You worked hard, and you are almost there. Your Spryker project is ready for Go-Live. This is an exciting period of your project, and we thought it would be valuable to you if we share with you some things you must not forget to look into while preparing your Go-Live. Please note that the timeframes suggested below should serve as orientation and might be different for you. It is important that in the last week leading up to your go-live, none of these tasks are still open!


## Until five weeks before go-live:

If you migrate from another shop or project to Spryker (read, the domain you want to use already points to a shop or project), you will both need a migration plan, as well as a plan to phase out your old project and phase in your new one. Please note that the migration concept from your old project to Spryker needs to be planned thoroughly. Please check with your SEO experts on what the strategy for your content and search engine results should be. This concept needs to be ready before you delegate your DNS to us (see note on DNS delegation down below)

When you have delegated DNS to us, you will need to inform us when you want us to switch the relevant records from one system to the other. Please also note that DNS propagation is not instant, meaning that you should not "switch off" your old project immediately after the switch was done. Please assign time in your project to plan this if you need to migrate.


## Four weeks before go-live:

- **The DNS Names and strategy for your shop are clear**. You should know how users access your shop, and you have verified that you have controlling access to the DNS for future domains. 

For example, you have determined that you want to use spryker.com as the domain for your shop. You know how your customers should visit your Storefront and which URL they should use for that. Let's say you want to use the [www.spryker.com](http://www.spryker.com) subdomain for your Storefront.

- **Decide how email sending should be handled**: If you are sending emails using Spryker, you will also need to decide whether you want to use the Mail Service our PaaS offers, or whether you wanted to attach your own Mail Server to your project. In case you want to use ours, we will need to validate your DNS name as well as lift sending restrictions. Let us know the email address you want to send from, and we can help you with the validation or set it our ourselves if you have already delegated the NS records.
- **Optional: Delegate DNS**: In your onboarding questionnaire and interview, you were asked whether you want to delegate the DNS to Spryker. To find out how you can delegate your DNS name, see [Setting up a custom SSL certificate](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html), but pay attention to the important notes down below. Note that this should only be done after you have already clarified your migration plan. Once these records are set on your side, the DNS configuration will be done by Spryker for you. On the one hand, this makes it very easy for us to configure and verify everything on our end without need for action on your side. On the other hand, if you have a lot of DNS records set for your domain name and are planning to set more DNS records in the future, Spryker will need to manage those for you going forward. Also, if you are delegating DNS to us, you should send us your DNS name’s current zone file, so we can set all the records on our side.



If you have decided to not delegate DNS to Spryker please think about how you want to deal with customers reaching your shop via the root domain (in our example spryker.com). Why is this important? Since our PaaS is working with DNS names for its endpoints almost exclusively, we cannot provide you with an IP to point the DNS name to. It is unfortunate that you also cannot set a CNAME for a root domain. This means, you either find a way to redirect your visitors via another endpoint, or you delegate your DNS to us to resolve this issue.


## Three weeks before go-live

- **Verify that your deploy.yml file is set up correctly**. Verify that your project works and works with the final endpoints. You can set both testing and final endpoints in your deploy.yml file. Your developers can now mock a "live" operation of the project with its final endpoints by adjusting their local host entries and test your shop thoroughly.
- **TLS certificates to be used are provisioned**. In case of delegation DNS to Spryker, TLS certificates for your endpoints should be created automatically. If you want us to create a TLS certificate for your endpoints but do not want to delegate your DNS, we can provide you with the verification records. If you have not received them already, contact us using the [Support Portal](https://support.spryker.com). If you do not delegate your DNS, make sure to provide us with the TLS certificates as detailed in the [Setting up a custom SSL certificate](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html#next-step) instruction so we can configure the certificates for you.
Make sure to deploy to your production environment and run checks regularly—see [Deploying in a production environment](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-production-environment.html).


## Two weeks before go-live

- **Remove all demo data from your environment**. Ensure that you exclusively work with real data, which will be used after the go-live. Remove all demo data that comes with the Spryker repository, which explicitly includes all demo users (as well as the standard admin user), because having demo users active poses a significant security risk for your project.
- **Communicate your go-live plan to Spryker**. Make sure to reach out to your Partner or Customer Success Manager and share your go-live plans—the day and time when you want to make your shop accessible to the public. If this time should change, keep us updated. This is mission-critical for DNS switching and the hyper care phase, which Spryker Support provides for you before and after your go-live.


## One week before go-live

- **Double-check the go-live date**. If any of the preceding tasks remain uncompleted, postpone your go-live, or discuss with us how to complete them in time.

{% info_block infoBox "Note" %}
		
All DNS-related topics are affected by delays that are inherent to the DNS system, and we cannot apply DNS changes or validations any faster. 

{% endinfo_block %}

{% info_block infoBox "Note" %}
	
If you find yourself struggling with the preceding points, reach out to Spryker Support using your Onboarding case **immediately**.
	
{% endinfo_block %}
- **Validate that the rollback strategy is still valid**. Check that everything you need to recover from an unforeseen problem with the newest version of the project you are deploying is available and in place.
- **Build up Go Live Support Team**. Prepare a team that can monitor your Go-Live, react quickly to any problems, and work with Spryker Support or Operations teams.
