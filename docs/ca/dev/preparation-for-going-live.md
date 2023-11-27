---
title: Preparation for going live
description: This instruction explains how to prepare a Spryker project for going live.
last_updated: Jan 23, 2023
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/preparation-for-going-live
originalArticleId: 738903ac-4167-47ed-93c8-b225c8041582
redirect_from:
  - /docs/preparation-for-going-live
  - /docs/en/preparation-for-going-live
  - /docs/cloud/dev/spryker-cloud-commerce-os/preparation-for-going-live.html
---

{% info_block warningBox "Do not risk your Go-Live!" %}

The preparation steps listed here are mandatory because they are critical to the success of your go-live. We strongly encourage you to complete these steps because we won't be able to resolve the issues related to the steps not completed in time. Ensure that your project plan contains the tasks related to the go-live checklist and allows enough time for them to be completed.

{% endinfo_block %}


This document describes how to prepare a Spryker project for going live on Spryker Cloud Commerce OS (SCCOS).

We divided the preparation into approximate timeframes, and you can adjust them to your needs. Make sure that all the following tasks are completed one week before going live.


## Eight weeks before go-live

Review this preparatory checklist before initiating your go-live plan.  
You cannot successfully deploy a project on Spryker Cloud Commerce OS unless you do the following:

- Check your concepts for (D)DOS prevention or mitigation and check with relevant vendors for products that fit your needs and that are compatible with Spryker PaaS
- Upgrade your project's code to match the latest demoshop release, or at minimum, upgrade to a release that fully supports the Docker SDK.
- Update spryker/twig to version 3.15.2 or higher because this version and higher have important stability improvements over version 3.15.1.
- Migrate the project's database to MariaDB if you are not already using it.
- Split up your project's Zed endpoints as outlined in the [Integrating separate endpoint bootstraps](/docs/scos/dev/technical-enhancement-integration-guides/integrating-separate-endpoint-bootstraps.html) guide.
- Verify that your project's service naming scheme is an exact match for the examples inside the [sample deploy-spryker-b2c-staging.yml file](https://github.com/spryker-shop/b2c-demo-shop/blob/202204.0-p2/deploy.spryker-b2c-staging.yml).
- Create [deploy files](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file.html) for each of your environments. These files must be named in a particular manner: `deploy.(project)-(environment).yml`. For example, `deploy.example-staging.yml`.
- [Define a Docker SDK version](/docs/scos/dev/the-docker-sdk/{{site.version}}/choosing-a-docker-sdk-version.html) for the project to use.
- Integrate [FlySystem](/docs/ca/dev/configure-data-import-from-an-s3-bucket.html) so that the project is using data in S3 Buckets instead of local storage.
- Use the option to [test your deployments locally](/docs/scos/dev/tutorials-and-howtos/howtos/howto-do-better-deployments.html#bootstrap-with-codedeployymlcode) to understand how your application will perform and work when deployed.
- Before deploying your payment options, test them locally. For more information, see [HowTo: Debug payment integrations locally](/docs/scos/dev/tutorials-and-howtos/howtos/howto-debug-payment-integrations-locally.html).
- Make sure that, where applicable, you have implemented our recommended Jenkins [performance and stability improvements](/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-costs-without-refactoring.html) and that you are observing the general [Publish and Sync stability best practices](/docs/ca/dev/best-practices/best-practises-jenkins-stability.html#memory-management). 

If you are migrating from another shop or project to Spryker, that is, the domain you want to use already points to a shop or a project, you need a migration plan to phase out the old project and phase in the new one. Check with your SEO experts on the strategy for your content and search engine results.

If you delegate DNS to Spryker, let us know the date on which to point the domain name to your Spryker project.

{% info_block infoBox "DNS propagation" %}

After pointing the domain name to your Spryker project, some of your customers may still see your old project due to DNS propagation. So, keep it live for up to 72 hours after the migration.

We highly recommend you to follow our [Security guidelines](/docs/scos/dev/guidelines/making-your-spryker-shop-secure.html) and ensure all the points are acknowledged and applied.

Double check that you do not have any clear text passwords stored in config files or repositories.

{% endinfo_block %}

## Four weeks before go-live

- *Make sure you are familiar with NewRelic APM*. If you have not requested NewRelic APM to be set up for you, do so. For more details about requesting changes, see [Platform change requests](https://docs.spryker.com/docs/scos/user/intro-to-spryker/support/how-to-use-the-support-portal.html#platform-change-requests).
- *Performance Tips implemented and verified*. Double-check that you implemented all the provided [performance tips](/docs/scos/dev/guidelines/performance-guidelines/general-performance-guidelines.html).
- *Conduct Load Tests*. Conduct load tests for your application. The sample data used for testing should be comparable to the size and complexity of the production data.
- *Performance testing and environment scale dial-in*. Testing your production environment before officially going live and assessing its performance are critical steps for a successful launch. Because production environments typically employ horizontal auto-scaling, it's essential to conduct stress and performance tests under expected average and peak loads. These tests enable our team to optimize the environment's vertical scaling in advance, ensuring that it can seamlessly handle the expected loads from the get-go, without any potential delays caused by auto-scaling mechanisms. This proactive approach eliminates the need for post-launch adjustments, providing your team with a significant advantage and peace of mind, while delivering a fast and responsive experience to your users right from the first request to the application.
To make this process work effectively, maintain active communication with us. Inform us about your load and performance test plans and share the results so that we can fine-tune the environment to meet your specific requirements.

{% info_block warningBox "Data import" %}

You must start working with data of realistic size and quality as early as possible. At this point, you must be importing data regularly to all your environments. We recommend working with the same import data across all your environments. This significantly simplifies troubleshooting and helps you estimate import performance, leading up to your go-live and helping us with environment sizing considerations. We expect all our customers to follow this advice.

{% endinfo_block %}

- *The DNS names and strategy for your shop are clear*. You know how users are going to access your shop. Verify that you control access to the DNS to be able to manage DNS. For example, you want to use `spryker.com` as the domain for your shop, but you want a user to access the Storefront by the `www.spryker.com` subdomain.
- *Decide how email sending should be handled*. If you want to send emails using Spryker, decide whether you want to use the native mail service shipped with Spryker PaaS or integrate a third-party one. If you want to use the native one, let us know the email address that you want to send emails from. We will lift sending restrictions and help you validate the needed DNS name.

{% info_block warningBox "Email quota restrictions" %}

PaaS production email service has the following quotas:
* Daily sending limit: 50.000 emails.
* Sending limit messages per second: 14.

PaaS non-production email service has the following quotas:
* Daily sending limit: 200 emails.
* Sending limit messages per second: 1

Recipients of emails need to be individually [verified](/docs/ca/dev/verify-email-addresses.html) for non-production systems.

Reach out to [Spryker Support](/docs/scos/user/intro-to-spryker/support/getting-support.html) if these are not sufficient to support your use case.

{% endinfo_block %}

- Optional: *Delegate DNS*. To find out how to delegate a DNS name, see [Setting up a custom SSL certificate](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html).

### DNS setup

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

### Deployment preparation and configurations

- *Verify that your Deploy file is set up correctly*. Verify that your project works and operates the production endpoints. You can set both testing and production endpoints in your Deploy file. Your developers need to mock a "live" operation of the project with its production endpoints by adjusting their local host entries.
- *Variables and parameter store values are set up*. Double-check whether you have all environment variables and parameter store values set up. Remember that this has some lead time on our side. If you are still missing parameters, create them.
- *TLS certificates are provisioned*. If you delegate DNS to Spryker, TLS certificates for your endpoints are created automatically. If you want us to create TLS certificates for your endpoints but do not want to delegate your DNS, request the verification of DNS records by the [Support Portal](https://support.spryker.com). If you do not delegate your DNS and want to use your own certificates, provide them to us as described in [Setting up a custom SSL certificate](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html).
- *Deploy the production environment regularly*. This lets you detect potential issues early enough to fix them before going live. For instructions, see [Deploying in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html).

{% info_block warningBox "Integration with payment providers" %}

Lower or nonproduction environments may not have the same WAF and Firewall settings configured as production environments. Therefore, make sure that all your requests have valid headers. Also, test the functionality of payment integrations that use call-backs or depend on API calls to your application in your production environment.

{% endinfo_block %}

### Data preparation and communication

- *Remove all the demo data from the environment*. The project should only use the real data that will be used after the go-live. Remove all the demo data that comes with the Spryker repository, which includes demo and admin users. Demo users in a live shop pose a significant security risk for your project.
- *Let us know your go-live plan*. Reach out to your Partner or Customer Success Manager and share your go-live plans: the date and time when you want to make your shop accessible to the public. If the time changes, keep us updated. This is critical for DNS switching and the hypercare phase we provide before and after your go-live.

### Last checks

- *Double-check the go-live date*. If any of the preceding tasks are not complete, postpone your go-live or discuss with us how to complete them in time. DNS changes are especially sensitive to deadlines. Due to how the DNS system works, any DNS changes take time to take effect.

{% info_block infoBox "Don't hesitate to contact us" %}

If your go-live date is close and you feel like you need help with any of the described tasks, contact us by your onboarding case *right away*.

{% endinfo_block %}

- *Validate that the rollback strategy is still valid*. Check that you have everything you need to recover from an unforeseen issue with the newest version of the project you are deploying.
- *Organize a go-live support team*. Prepare a team that can monitor your go-live, react quickly to any issues, and work with the Spryker Support or Operations teams.
- *Validate BI and Analytics Integrations*. They should not be connected to your production database, but should be connected to the provided read replica. Make sure that no external system is working with your production database.
