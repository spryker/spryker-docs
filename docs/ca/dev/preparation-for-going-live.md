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

The preparation steps listed here are mandatory because they are critical to the success of your go-live. We strongly encourage you to complete these steps because we won't be able to resolve the issues related to the steps not completed in time. Make sure your project plan contains the tasks related to the go-live checklist and enough time for them to be completed.

{% endinfo_block %}


This document describes how to prepare a Spryker project for going live.

We divided the preparation into approximate timeframes, and you can adjust them to your needs. Make sure that all of the following tasks are completed at least one week before going live.

## Eight weeks before go-live

*Provide us with your go-live plan*. Reach out to your Partner or Customer Success Manager and share your go-live plans: the date and time when you want to make your shop accessible to the public. If the time changes, keep us updated. This is critical for DNS switching and the hypercare phase we provide before and after your go-live.

Ensure you have addressed all the items from the following checklists.

### Cloud environments

- Connected systems are checked and prepared:
    - Double-check that all VPC peering and Site-to-Site VPN connections are monitored and secure. We don't usually monitor such connections with external parties.
    - Make sure that that there is a network diagram that can be used to explain the setup quickly if need arises.
    - Make sure that routing works as expected and no internal resources are accidentally exposed via the S2S or VPC peering setup.
- DDOS prevention or mitigation is checked and implemented:
    - Check your concepts for DOS and DDOS prevention or mitigation and check with relevant vendors for products that fit your needs and are compatible with SCCOS.
    - Check your concepts for DOS and DDOS prevention for the Back Office and Merchant portal. Add basic auth if applicable. For instructions on impleneting basic auth, see [Configure basic .htaccess authentication](/docs/pbc/all/identity-access-management/{{site.version}}/configure-basic-htaccess-authentication.html).
- DNS strategy is defined. If you delegate DNS to us, let us know the date on which to point the domain name to your project.

{% info_block infoBox "DNS propagation" %}

After pointing the domain name to your project, some of your customers may still see your old project due to DNS propagation. So, keep it live for up to 72 hours after the migration.

{% endinfo_block %}


We highly recommend implementing the [security guidelines](/docs/dg/dev/guidelines/security-guidelines.html).

Double-check that you do not have any clear text passwords stored in config files or repositories.

### Application

- Upgrade your project to the latest release. Or at least upgrade to a release that supports the Docker SDK.
- Update `spryker/twig` to version 3.15.2 or higher because this and later version have important stability improvements over version 3.15.1.
- Migrate the database to MariaDB.
- Split Zed endpoints as outlined in [Integrate separate endpoint bootstraps](/docs/dg/dev/integrate-and-configure/integrate-separate-endpoint-bootstraps.html).
- Verify that the naming scheme of the services exactly matches the scheme in a Demo Shop: [sample deploy-spryker-b2c-staging.yml file](https://github.com/spryker-shop/b2c-demo-shop/blob/202204.0-p2/deploy.spryker-b2c-staging.yml).
- Create [deploy files](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file.html) for each of your environments. These files must follow the naming convention: `deploy.(project)-(environment).yml`. For example, `deploy.example-staging.yml`.
- [Define a Docker SDK version](/docs/scos/dev/the-docker-sdk/{{site.version}}/choosing-a-docker-sdk-version.html).
- Migrate data from local storages to S3 by [integrating FlySystem](/docs/ca/dev/configure-data-import-from-an-s3-bucket.html).
- Implement [Jenkins performance and stability improvements](/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-costs-without-refactoring.html).
- Implement [Publish and Sync stability best practices](/docs/ca/dev/best-practices/best-practises-jenkins-stability.html).
- Implement [security guidelines](/docs/dg/dev/guidelines/security-guidelines.html).
- Double-check that there are no clear text passwords stored in config files or repositories.

### Testing

- [Test your deployments locally](/docs/scos/dev/tutorials-and-howtos/howtos/howto-do-better-deployments.html) to understand how your application will perform and work when deployed.
- Before deploying your payment options, test them locally. For more information, see [HowTo: Debug payment integrations locally](/docs/scos/dev/tutorials-and-howtos/howtos/howto-debug-payment-integrations-locally.html).

### SEO

Make sure the SEO strategy and plan are defined. If you are migrating to Spryker, and the domain is already pointed to a live shop, prepare a migration plan to phase out the old project and phase in the new one. Check with your SEO experts on the strategy for your content and search engine results.

## Four weeks before go-live

Four weeks before your project goes live, make sure you addressed all the items from the following checklists.

### Cloud

- *Make sure you have an APM set up*. Application Performance Monitoring tools help you identify performance bottlenecks in your application. You can request NewRelic APM from Spryker (subject to additional fees).
- *Verify that your Deploy file is set up correctly*. Verify that your project works and operates the production endpoints. You can set both testing and production endpoints in your Deploy file. Your developers need to mock a "live" operation of the project with its production endpoints by adjusting their local host entries.
- *TLS certificates are provisioned*. If you delegate DNS to Spryker, TLS certificates for your endpoints are created automatically. If you want us to create TLS certificates for your endpoints but don't want to delegate your DNS, request the verification of DNS records by the [Support Portal](https://support.spryker.com). If you don't delegate your DNS and want to use your own certificates, provide them to us as described in [Setting up a custom SSL certificate](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html).
- *Deploy the production environment regularly*. This lets you detect potential issues early enough to fix them before going live. For instructions, see [Deploying in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html).
- *The DNS names and strategy for your shop are clear*. You know how users are going to access your shop. Verify that you control access to the DNS to be able to manage DNS. For example, you want to use `spryker.com` as the domain for your shop, but you want a user to access the Storefront by the `www.spryker.com` subdomain.
- *Decide how email sending should be handled*. If you want to send emails using Spryker, decide whether you want to use the native mail service shipped with Spryker Cloud Commerce OS or integrate a third-party one. If you want to use the native one, let us know the email address that you want to send emails from. We will lift sending restrictions and help you validate the needed DNS name. See [Email service](/docs/ca/dev/email-service/email-service.html) for more information about the default email service and its restrictions.
- Optional: *Delegate DNS*. To find out how to delegate a DNS name, see [Setting up a custom SSL certificate](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html).

### DNS setup

See [Set up DNS](/docs/ca/dev/set-up-dns.html) for details on how to set up DNS for your application.

### Application

- [Performance tips](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html) are implemented and verified.
- Variables and parameter store values are set up. This has some lead time on our side. If you are still missing parameters, create them.

### Testing

- Conduct load tests. The sample data used for testing should be comparable to the size and complexity of the production data.
- Performance testing and environment scale dial-in. Testing your production environment before going live and assessing its performance are critical steps for a successful launch. Because production environments typically employ horizontal auto-scaling, it's essential to conduct stress and performance tests under expected average and peak loads. These tests enable our team to optimize the environment's vertical scaling in advance, ensuring that it can seamlessly handle the expected loads from the get-go, without any potential delays caused by auto-scaling mechanisms. This proactive approach eliminates the need for post-launch adjustments, providing your team with a significant advantage and peace of mind, while delivering a fast and responsive experience for your users at the launch. To make this process work effectively, keep us updated about your load and performance test plans and share the results so that we can fine-tune the environment to meet your requirements.
- Import real data on production. You must start working with data of realistic size and quality as early as possible. At this point, you must be importing data regularly to all your environments. We recommend working with the same data across all environments. This significantly simplifies troubleshooting and helps you estimate import performance, leading up to your go-live and helping us with environment sizing estimations.
- Test payment. Non-production environments may not have the same WAF and firewall settings as production environments. So, make sure that all your requests have valid headers. Also, test the functionality of payment integrations that use call-backs or depend on API calls to your application in your production environment.



## Two weeks before go-live

- Code freeze. We recommend to have a code freeze at least two weeks before going live.
- Double-check the go-live date. If any of the preceding tasks are not complete, postpone your go-live or discuss with us how to complete them in time. DNS changes are especially sensitive to deadlines. Due to how the DNS system works, any DNS changes take time to take effect.
- Make sure the rollback strategy is valid. Check that you have everything for recovering from an unforeseen issue with the newest version of the project you are deploying.
- Validate the testing strategy.
- Organize a go-live support team. Prepare a team that can monitor your go-live, react quickly to any issues, and work with the Spryker Support and Operations teams.
- Validate BI and analytics integrations. They should not be connected to your production database, but rather to the provided read replica. Make sure no external system is interacting with your production database.
- Remove all the demo data from the environment. The project should only use the real data that will be used after the go-live. Remove all the demo data that comes with Spryker, which includes demo and admin users. Demo users in a live shop pose a significant security risk for your project.
- Define the exact plan for the go-live day:
  - Define the time of deployment.
  - Define the exact steps to be performed, including running Jenkins or other scripts if needed.
- Make sure the DNS is set.


## Contact us

If your go-live date is close and you feel like you need help with any of the described tasks, contact us by your onboarding case *right away*.
