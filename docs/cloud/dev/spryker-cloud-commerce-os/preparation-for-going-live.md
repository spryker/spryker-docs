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

- **The DNS Names and strategy for your shop are clear**: This means you know how people will access your shop, and you have verified that you have controlling access to the DNS for the domains you want to use. For example:

You have determined that you want to use spryker.com as the domain for your shop. You know how your customers should visit your shop front and which URL they will be using for that. Let’s say we have decided that we want to use the [www.spryker.com](http://www.spryker.com) subdomain for our Storefront.

- **Decide how email sending should be handled**: If you are sending emails using Spryker, you will also need to decide whether you want to use the Mail Service our PaaS offers, or whether you wanted to attach your own Mail Server to your project. In case you want to use ours, we will need to validate your DNS name as well as lift sending restrictions. Let us know the email address you want to send from, and we can help you with the validation or set it our ourselves if you have already delegated the NS records.
- **Optional: Delegate DNS**: In your onboarding questionnaire and interview, you were asked whether you want to delegate the DNS to Spryker. To find out how you can delegate your DNS name, see [Setting up a custom SSL certificate](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html), but pay attention to the important notes down below. Note that this should only be done after you have already clarified your migration plan. Once these records are set on your side, the DNS configuration will be done by Spryker for you. On the one hand, this makes it very easy for us to configure and verify everything on our end without need for action on your side. On the other hand, if you have a lot of DNS records set for your domain name and are planning to set more DNS records in the future, Spryker will need to manage those for you going forward. Also, if you are delegating DNS to us, you should send us your DNS name’s current zone file, so we can set all the records on our side.


### Important:

If you have decided to not delegate DNS to Spryker please think about how you want to deal with customers reaching your shop via the root domain (in our example spryker.com). Why is this important? Since our PaaS is working with DNS names for its endpoints almost exclusively, we cannot provide you with an IP to point the DNS name to. It is unfortunate that you also cannot set a CNAME for a root domain. This means, you either find a way to redirect your visitors via another endpoint, or you delegate your DNS to us to resolve this issue.


## Three weeks before go-live

- **Verify that your deploy.yml file is set up correctly**. Verify that your project works and works with the final endpoints. You can set both testing and final endpoints in your deploy.yml file. Your developers can now mock a "live" operation of the project with its final endpoints by adjusting their local host entries and test your shop thoroughly.
- **TLS certificates to be used are provisioned.** If you have delegated DNS to us, we will have created the TLS certificates for your endpoints automatically by now. If you want us to create a TLS certificate for your endpoints but do not want to delegate your DNS to us, we can provide you with the verification records. If you have not received them already, contact us via the [Support Portal](https://support.spryker.com). If you do not delegate your DNS, please make sure that you have provided us with the TLS certificates as detailed in the [Setting up a custom SSL certificate](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/setting-up-a-custom-ssl-certificate.html#next-step) instruvtion so we can configure the certificates for you.
- **Deploy to production:** If you have not already, to make sure to now also deploy regularly to your production environment and run checks, see [Deploying in a production environment](https://docs.spryker.com/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-production-environment.html).


## Two weeks before go-live

- **Remove all demo data from your environment.** Please make sure that you are now exclusively working with real data that will also be used after the go live. Make sure to remove all demo data that comes with the Spryker repository. This explicitly includes all demo users (as well as the standard admin user). Please double check this is done as having demo users active still will pose a significant security risk for your project.
- **Communicate your go live plan to Spryker**. Please make sure to reach out to your Partner/Customer Success Manager and share your go live plans. This should include the day and time when you want to make your shop accessible to the public. If this time should change, please make sure to keep us updated. This is mission critical for both DNS switching topics, as well as the hypercare phase Spryker Support will provide for you shortly before and after your go live.


## One week before go-live

- **Double Check Go Live Date.** If any of the tasks listed previously have not been completed up until now, you either need to postpone your go live, or find ways with us how the above tasks can be completed in time still. Please note that all DNS related topics will be affected by delays that are inherent to the DNS system and we cannot make DNS changes or validations be applied any faster. Reach out to Spryker Support using your Onboarding case *immediately* if you find yourself still struggling with the points above now. Make sure Spryker knows about your Go Live!
- **Validate that the rollback strategy is still valid**. You planned for the worst case, but is the plan still valid? Please check that everything you need to have to recover from an unforeseen problem with the newest version of the project you are deploying is still available and in place.
- **Build up Go Live Support Team**. Prepare a team that can monitor your Go-Live, react quickly to any problems, and work with Spryker Support or Operations teams.
