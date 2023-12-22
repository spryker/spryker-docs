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

To successfully deploy a project on Spryker Cloud Commerce OS, make sure you follow all the guidelines described in this document.


## Eight weeks before go-live

Eight weeks before your project goes live, *let us know your go-live plan*. Reach out to your Partner or Customer Success Manager and share your go-live plans: the date and time when you want to make your shop accessible to the public. If the time changes, keep us updated. This is critical for DNS switching and the hypercare phase we provide before and after your go-live.

Ensure you have addressed all the items from the following checklists.

### Cloud

- *DDOS prevention or mitigation checked and implemented.*
    - Check your concepts for DOS and DDOS prevention or mitigation and check with relevant vendors for products that fit your needs and are compatible with SCCOS.
    - Check your concepts for DOS and DDOS prevention Admin panel and Merchant portal. Add basic auth if applicable. For details, see [Configure basic .htaccess authentication](/docs/pbc/all/identity-access-management/{{site.version}}/configure-basic-htaccess-authentication.html)
- *DNS strategy is defined*. If you delegate DNS to Spryker, let us know the date on which to point the domain name to your Spryker project.

{% info_block infoBox "DNS propagation" %}

After pointing the domain name to your Spryker project, some of your customers may still see your old project due to DNS propagation. So, keep it live for up to 72 hours after the migration.

{% endinfo_block %}

### Application

- Upgrade your project's code to match the latest Demo Shop release, or at minimum, upgrade to a release that fully supports the Docker SDK.
- Update `spryker/twig` to version 3.15.2 or later because this version and the later ones have important stability improvements over version 3.15.1.
- Migrate the project's database to MariaDB if you don't use it already.
- Split up your project's Zed endpoints as outlined in [Integrating separate endpoint bootstraps](/docs/scos/dev/technical-enhancement-integration-guides/integrating-separate-endpoint-bootstraps.html) guide.
- Verify that your project's service naming scheme is an exact match for the examples inside the [sample deploy-spryker-b2c-staging.yml file](https://github.com/spryker-shop/b2c-demo-shop/blob/202204.0-p2/deploy.spryker-b2c-staging.yml).
- Create [deploy files](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file.html) for each of your environments. These files must be named in a particular manner: `deploy.(project)-(environment).yml`. For example, `deploy.example-staging.yml`.
- [Define a Docker SDK version](/docs/scos/dev/the-docker-sdk/{{site.version}}/choosing-a-docker-sdk-version.html) for the project to use.
- Integrate [FlySystem](/docs/ca/dev/configure-data-import-from-an-s3-bucket.html) so that the project is using data in S3 Buckets instead of local storage.
- *Performance tips are implemented and verified*:
  - Double-check that you implemented all the [performance guidelines](https://docs.spryker.com/docs/scos/dev/guidelines/performance-guidelines/performance-guidelines.html).
  - Make sure that, where applicable, you have implemented our recommended Jenkins [performance and stability improvements](/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-costs-without-refactoring.html).
  - Make sure that, where applicable, you have implemented our [Publish and Sync stability best practices](/docs/ca/dev/best-practices/best-practises-jenkins-stability.html#memory-management).
- *Security guidelines are implemented and verified*:
  - Apply Spryker [Security guidelines](https://docs.spryker.com/docs/scos/dev/guidelines/security-guidelines.html).
  - Double-check that you don't have any clear text passwords or API secrets stored in config files or repositories.
  - Make sure to install all the [security updates](https://docs.spryker.com/docs/scos/user/intro-to-spryker/whats-new/security-updates.html) from all Spryker packages.
  - Make sure to install all the security updates from all external packages. [Security checker](https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-security-checker.html) can be used.
- *Compliance and Legal Checks* 
  - Consult your legal team to ensure the platform complies with relevant legal and regulatory requirements, especially for international operations. Check [Guidelines for new GDPR rules](https://docs.spryker.com/docs/scos/user/intro-to-spryker/support/guidelines-for-new-gdpr-rules.html) as a starting point.
- *Admin panel ACL set up and verified*. Ensure that the admin Access Control List (ACL) setup is configured correctly to manage user permissions and access rights within the system's administrative interface.

### Testing 

- *Test deployments*. [Test your deployments locally](/docs/scos/dev/tutorials-and-howtos/howtos/howto-do-better-deployments.html#bootstrap-with-codedeployymlcode) to understand how your application will perform and work when deployed.
- *Test All Payment options*. Before deploying your payment options, test them locally. For more information, see [HowTo: Debug payment integrations locally](/docs/scos/dev/tutorials-and-howtos/howtos/howto-debug-payment-integrations-locally.html).
- *User Acceptance Testing (UAT)*. Besides internal testing, conducting extensive UAT to validate the functionality and user experience from an end-user perspective is always a great idea before opening your system publicly. If applicable, ensure the platform's compatibility and optimal performance across various devices and browsers

### SEO ### 

- *Make sure the SEO strategy and plan are defined.*
  - *Redirects*. If you are migrating from another shop or project to Spryker, that is, the domain you want to use already points to a shop or a project, you need a migration plan to phase out the old project and phase in the new one. Check with your SEO experts on the strategy for your content and search engine results.
  - *Best practices*. Make sure that best practices are implemented. See [Basic SEO techniques to use in your project](/https://docs.spryker.com/docs/scos/dev/best-practices/basic-seo-techniques-to-use-in-your-project.html)

### Training ### 

- *Training and Documentation for End-Users and Admins*: 
  - Prepare role-specific enablement trainings for all internal users of the platform. These may include: backoffice administrators (incl. role specifics), support assistants and agents, marketplace operators, merchant portal users.
  - Consider also external users, such as those interacting with the platform via APIs or 3rd party systems.
  - And last but not least, your end customers should be aware of changes (if any) that the new platform may bring. Besides striving for good user experience and transparency, make sure to consult with your legal team about any obligations in that regard.

## Four weeks before go-live

Four weeks before your project goes live, ensure you addressed all the items from the following checklists.

### Cloud 

- *Make sure you have an APM set up*:
  - Application Performance Monitoring tools help you identify performance bottlenecks in your application. You can request NewRelic APM from Spryker (subject to additional fees).
  - Establish robust post-launch monitoring plan, with the aim to watch system's performance and configuring alerting mechanisms.
- *Verify that your Deploy file is set up correctly*. Verify that your project works and operates the production endpoints. You can set both testing and production endpoints in your Deploy file. Your developers need to mock a "live" operation of the project with its production endpoints by adjusting their local host entries.
- *Deploy the production environment regularly*. This lets you detect potential issues early enough to fix them before going live. For instructions, see [Deploying in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html).
- *The DNS names and strategy for your shop are clear*. 
    - You know how users are going to access your shop. Verify that you control access to the DNS to be able to manage DNS. For example, you want to use `spryker.com` as the domain for your shop, but you want a user to access the Storefront by the `www.spryker.com` subdomain. See [Set up DNS](/docs/ca/dev/set-up-dns.html) for details on how to set up DNS for your application.
    - Optional: *Delegate DNS*. To find out how to delegate a DNS name, see [Setting up a custom SSL certificate](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html).
    - *TLS certificates are provisioned*. If you delegate DNS to Spryker, TLS certificates for your endpoints are created automatically. If you want us to create TLS certificates for your endpoints but don't want to delegate your DNS, request the verification of DNS records by the [Support Portal](https://support.spryker.com). If you don't delegate your DNS and want to use your own certificates, provide them to us as described in [Setting up a custom SSL certificate](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html).
- *Decide how email sending should be handled*. If you want to send emails using Spryker, decide whether you want to use the native mail service shipped with Spryker Cloud Commerce OS or integrate a third-party one. If you want to use the native one, let us know the email address that you want to send emails from. We will lift sending restrictions and help you validate the needed DNS name. See [Email service](/docs/ca/dev/email-service/email-service.html) for more information about the default email service and its restrictions.

### Application

- *Prepare and communicate technical debt mitigation plan*. Develop a comprehensive plan to identify, address, and communicate strategies for managing technical debt before the system goes live.
- *Variables and parameter store values are set up*. Double-check whether you have all environment variables and parameter store values set up. Remember that this has some lead time on our side. If you are still missing parameters, create them.
- *Third-Party Integrations and Compatibility Checks*. Make sure to test that your third-party integrations (and plugins) are available and working when turned into production mode, using production credential. It is often the case that you'd need to comply with specific additional security measures, such as IP whitelisting, port configuration or similar. 

### Testing

- *Conduct load tests*. Conduct load tests for your application. The sample data used for testing should be comparable to the size and complexity of the production data.
- *Performance testing and environment scale dial-in*. Testing your production environment before officially going live and assessing its performance are critical steps for a successful launch. Because production environments typically employ horizontal auto-scaling, it's essential to conduct stress and performance tests under expected average and peak loads. These tests enable our team to optimize the environment's vertical scaling in advance, ensuring that it can seamlessly handle the expected loads from the get-go, without any potential delays caused by auto-scaling mechanisms. This proactive approach eliminates the need for post-launch adjustments, providing your team with a significant advantage and peace of mind, while delivering a fast and responsive experience to your users right from the first request to the application.
To make this process work effectively, maintain active communication with us. Inform us about your load and performance test plans and share the results so that we can fine-tune the environment to meet your specific requirements.
- TO BE DISCUSSED *Perform security audits to identify and address vulnerabilities.* 
- *Import real data on production*. After import is done, it is crucial double-checking the completeness and accuracy of migrated data, especially if transitioning from another platform.

{% info_block warningBox "Data import" %}

You must start working with data of realistic size and quality as early as possible. At this point, you must be importing data regularly to all your environments. We recommend working with the same import data across all your environments. This significantly simplifies troubleshooting and helps you estimate import performance, leading up to your go-live and helping us with environment sizing considerations. We expect all our customers to follow this advice.

{% endinfo_block %}

- *Validate Checkout/OMS process*
  - Test general checkout steps.
  - Test OMS.
  - Test shipment.
  - Test payment.

{% info_block warningBox "Integration with payment providers" %}

Lower or nonproduction environments may not have the same WAF and firewall settings configured as production environments. Therefore, make sure that all your requests have valid headers. Also, test the functionality of payment integrations that use call-backs or depend on API calls to your application in your production environment.

{% endinfo_block %}

### Data ### 

- *Prepare a data migration plan*. Include all the data.

### SEO ### 

- *Sitemap is generated*.
- *File robots.txt is prepared*.
- *All the content is prepared*. All the CMS pages and other content are prepared (including meta tags, internal and external links, etc).
- *Favicon is set*.

## Two weeks before go-live ##

- *Code freeze*. We recommend having a code freeze at least two weeks before going live.
- *Double-check the go-live date*. If any of the preceding tasks are not complete, postpone your go-live or discuss with us how to complete them in time. DNS changes are especially sensitive to deadlines. Due to how the DNS system works, any DNS changes take time to take effect.
- *Make sure that the rollback strategy is still valid*. Check that you have everything you need to recover from an unforeseen issue with the newest version of the project you are deploying.
- *Make sure that DNS is set*.
- *Make sure that 3rd party systems are switched to "Production mode"*
  - *Set up production configuration for all the 3rd party systems* (in environment variables). Make sure to not expose secrets in the codebase.
  - *Validate BI and analytics integrations*. They should not be connected to your production database, but rather to the provided read replica. Make sure no external system is interacting with your production database.
- *Organize a go-live support team*. Prepare a team that can monitor your go-live, react quickly to any issues, and work with the Spryker Support or Operations teams.
- *Define the exact plan for the go-live day.*:
  - Define the time of deployment.
  - Define the exact steps to be performed (including running Jenkins or other scripts if needed).
  - *Prepare a go live communication plan*. Develop a communication plan to inform stakeholders, customers, and support teams about the launch date and any changes or updates.


### Testing ###

- *Perform end-to-end testing on production*. Make sure to test customer journey with all the 3rd party systems switched to production mode. Make sure to cover all the parts of application, including:
  - Customer registration, account.
  - Main E-commerce flow (search, checkout/OMS process).
  - User/Merchant flow.
  - etc

### Data ### 

- *Remove all the demo data from the environment*. The project should only use the real data that will be used after the go-live. Remove all the demo data that comes with the Spryker repository, which includes demo and admin users. Demo users in a live shop pose a significant security risk for your project.
- *Make sure that real data is set on production*
  - Categories
  - Product and all related data (prices, offers, attributes, images, stock, labels, reviews and ratings, cross and up selling etc.)
  - Customers, Companies, Users, Merchants
  - Taxes
  - Discounts
  - CMS pages (including homepage, CSM blocks, final terms & conditions check)
  - Custom data
  - Other data
- *Make sure that all the translations are provided*. Including all the needed languages.
- *Make sure that all Emails are correct*. Including all the needed data and translations.

### SEO ### 

- *File robots.txt is set up*.
- *All the content is set*. All the CMS pages and other content are set (including meta tags, internal and external links, etc).
- Optional: *Redirects are set up.*

## Go-live ##
- *Perform end-to-end testing on production*.
- Remove basic auth from the frontend part and deploy the change.
- Run Go-live communication plan.
- Disable the destructive pipeline after successful go-live.

{% info_block infoBox "Don't hesitate to contact us" %}

If your go-live date is close and you feel like you need help with any of the described tasks, contact us by your onboarding case *right away*.

{% endinfo_block %}
