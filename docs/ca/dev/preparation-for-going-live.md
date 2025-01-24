---
title: Preparation for going live
description: Prepare your Spryker Cloud Commerce OS environment for a successful launch with essential pre-live checks, testing, and configuration steps to ensure smooth deployment.
last_updated: Jan 23, 2023
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/preparation-for-going-live
redirect_from:
  - /docs/preparation-for-going-live
  - /docs/en/preparation-for-going-live
  - /docs/cloud/dev/spryker-cloud-commerce-os/preparation-for-going-live.html
---

{% info_block warningBox "Don't risk your go-live" %}

The preparation steps listed here are mandatory because they're crucial for the success of your go-live. We strongly encourage you to complete these steps where applicable because we won't be able to resolve issues related to steps not completed in time. Make sure that your project plan contains the tasks related to the go-live checklist and allocates enough time for their completion.

{% endinfo_block %}


This document describes how to prepare a Spryker project for going live.

We've divided the preparation into approximate timeframes, and you can adjust them to your needs. Make sure that all of the following tasks are completed at least one week before going live.

## Eight weeks before go-live

* Let us know all the details of your go-live plan. Reach out to your Partner or Customer Success Manager and share your go-live plans: the date and time when you want to make your shop accessible to the public. If the time changes, keep us updated. This is critical for Domain Name System (DNS) switching and the hypercare phase we provide before and after your go-live.

* Make sure you've addressed all the items from the following checklists.

### Cloud environments

- Project and connected systems are checked and prepared:
    - Double-check that all VPC peering and Site-to-Site VPN connections are monitored and secure. We don't usually monitor such connections with external parties.
    - Make sure that there is a network diagram that can be used to explain the setup quickly if the need arises.
    - Make sure that routing works as expected, and no internal resources are accidentally exposed via the Site-to-Site or VPC peering setup.
- Denial-of-service (DOS) and Distributed Denial-of-service (DDOS) prevention or mitigation is checked and implemented:
    - Check your concepts for DOS and DDOS prevention or mitigation, and check with relevant vendors for products that fit your needs and are compatible with SCCOS.
    - Check your concepts for DOS and DDOS prevention in the Back office and Merchant portal. Add basic auth if applicable. For instructions on implementing basic auth, see [Configure basic .htaccess authentication](/docs/pbc/all/identity-access-management/{{site.version}}/configure-basic-htaccess-authentication.html)
- The DNS strategy is defined. If you delegate DNS to Spryker, let us know the date on which to point the domain name to your Spryker project.
- Web Application Firewalls (WAF) IPs, proxies, and other security and traffic filtering systems used to route traffic to Spryker are whitelisted. This prevents these systems to be accidentally blocked by Spryker security systems. You can request IPs to be whitelisted via an Infrastructure Change Request on the [Support Portal](https://support.spryker.com/s/).

{% info_block infoBox "DNS propagation" %}

After pointing the domain name to your Spryker project, some of your customers may still see your old project until the DNS propagation is completed. So, keep it live for at least 72 hours after the migration.

{% endinfo_block %}

### Application

- [Activating IP tracking](https://github.com/spryker/docker-sdk/blob/master/docs/07-deploy-file/02-deploy.file.reference.v1.md#cloud-define-gateway-ip-addresses) significantly increases chances to mitigate or spot malicious activities like DOS attacks. You might need to evaluate this from a data protection policy perspective.
- Upgrade your project's code to the [latest Demo Shop release](/docs/about/all/releases/product-and-code-releases.html). Or at least upgrade to a release that fully supports the Docker SDK (202009.0 and later).
- Update `spryker/twig` to version 3.15.2 or later because this and later versions have important stability improvements over version 3.15.1.
- Migrate the project's database to MariaDB.
- Split the project's Zed endpoints as described in [Integrating separate endpoint bootstraps](/docs/dg/dev/integrate-and-configure/integrate-separate-endpoint-bootstraps.html).
- Verify that your project's service naming scheme exactly matches the examples in the [sample deploy-spryker-b2c-staging.yml file](https://github.com/spryker-shop/b2c-demo-shop/blob/202204.0-p2/deploy.spryker-b2c-staging.yml).
- Create [deploy files](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html) for each of your environments. File names must follow the naming convention: `deploy.(project)-(environment).yml`. For example, `deploy.example-staging.yml`.
- [Define a Docker SDK version](/docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html).
- Integrate [FlySystem](/docs/ca/dev/configure-data-import-from-an-s3-bucket.html) to use data in S3 Buckets instead of local storage for the project.
- Connect S3 buckets to correct environments:
  - Connect Production S3 bucket to a production environment.
  - Connect Staging S3 bucket to a staging environment.
  - If you're using CSV imports, make sure they're imported from S3 buckets.
- Implement the following performance tips:
  - Implement approaches described in all the [performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines.html).
  - Implement [Jenekins operational best practices](/docs/ca/dev/best-practices/jenkins-operational-best-practices.html)
  - Implement the [Publish and Sync stability best practices](/docs/ca/dev/best-practices/best-practises-jenkins-stability.html#memory-management) where applicable.
- Implement the security tips:
  - Apply Spryker [security guidelines](/docs/dg/dev/guidelines/security-guidelines.html).
  - Make sure that you don't have any plain-text passwords, private keys, or API secrets in config files or Git repositories.
  - Minimize the use of personal credentials and choose work-specific accounts based on each environment (production, staging, testing). We highly recommend employing Centralized Credential Management to securely store and manage these credentials.
  - Install all the [security updates](/docs/about/all/releases/product-and-code-releases.html) from all Spryker packages.
  - Install all the security updates from all the external packages. To check if your project modules require security updates, you can use the [Security checker](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-security-checker.html).
- Perform compliance and legal checks. To ensure the platform complies with relevant legal and regulatory requirements, especially for international operations, consult your legal team. Make sure to check [Guidelines for GDPR compliance](/docs/about/all/support/gdpr-compliance-guidelines.html).
- Make sure that the Back Office Access Control List (ACL) setup is configured correctly to manage user permissions and access rights within the system's administrative interface. For instructions on how to configure ACL, see [Users and rights overview](/docs/pbc/all/user-management/{{site.version}}/base-shop/user-and-rights-overview.html).
- If your application is writing logs into your database, develop a strategy on how these logs can be regularly rotated or truncated to avoid large table sizes that can affect the application's performance. By default, the `spy_oms_transition_log` is used to log state machine transitions and can get very large if not [truncated](/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/the-spy-oms-transition-log-table-takes-up-too-much-space.html) regularly.
- If possible, check if you can implement payment options in a redundant way so that, if one payment provider has an outage, customers can still pay using another one.
- Secrets, like API tokens, should be rotated regularly. Outline and test rotation strategies to make sure they're not going to cause issues during live operation.

### Testing

- Perform deployment tests. To understand how your application will perform and work when deployed, [test your deployments locally](/docs/dg/dev/miscellaneous-guides/simulating-deployments-locally.html).
- Before deploying your payment options, test them all locally. For more information, see [HowTo: Debug payment integrations locally](/docs/pbc/all/payment-service-provider/{{site.version}}/base-shop/debug-payment-integrations-locally.html).
- Perform User Acceptance Testing (UAT). Besides internal testing, before opening your system publicly, we highly recommend conducting extensive UAT to validate the functionality and user experience from an end-user perspective. If applicable, ensure the platform's compatibility and optimal performance across various devices and browsers

### Search engine optimization (SEO)

- Make sure the SEO strategy and plan are defined. Do the following:
  - Set up redirects. If you are migrating from another shop or project to Spryker, that is, the domain you want to use already points to a shop or a project, you need a migration plan to phase out the old project and phase in the new one. Check with your SEO experts on the strategy for your content and search engine results.
  - Review and implement the best practices where applicable. For details, see [Basic SEO techniques to use in your project](/docs/dg/dev/best-practices/basic-seo-techniques-to-use-in-your-project.html).

### Training

- Prepare role-specific enablement training for all internal users of the platform. These may include: Back Office administrators (including role specifics), support assistants and agents, marketplace operators, merchant portal users.
- Prepare trainings for external users, such as those interacting with the platform via APIs or third-party systems.
- Make sure your end customers are aware of any changes that the new platform may bring. Besides striving for good user experience and transparency, make sure to consult with your legal team about any obligations in that regard.

## Four weeks before go-live

Make sure you've addressed all the items from the following checklists.

### Cloud

- We highly recommend you to set up an Application Performance Monitoring (APM). The APM tools help you identify performance bottlenecks in your application.
- To watch the system's performance and configure alerting mechanisms, establish a robust post-launch monitoring plan. To ensure effective investigation in case of security incidents, we recommend configuring logs to gather in a centralized SIEM system.
- Verify that your deploy file is set up correctly and aligns with your project needs. Verify that your project works and operates the production endpoints. You can set both testing and production endpoints in your deploy file. Your developers need to mock a "live" operation of the project with its production endpoints by adjusting their local host entries.
- Deploy the production environment regularly. This lets you detect potential issues early enough to fix them before going live. For instructions, see [Deploying in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html). Make sure to test all [recipes](/docs/dg/dev/sdks/the-docker-sdk/installation-recipes-of-deployment-pipelines.html#staging-and-production-environment-recipes).
- Make sure the DNS names and strategy for your shop are clear. Do the following:
    - You know how users are going to access your shop. Verify that you control access to the DNS to be able to manage DNS. For example, you want to use `spryker.com` as the domain for your shop, but you want a user to access the Storefront by the `www.spryker.com` subdomain. For details on how to set up DNS for your application, see [Set up DNS](/docs/ca/dev/set-up-dns.html).
    - Optional: Delegate DNS. To find out how to delegate a DNS name, see [Setting up a custom SSL certificate](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html).
    - Make sure Transport Layer Security (TLS) certificates are provisioned. If you delegate DNS to Spryker, TLS certificates for your endpoints are created automatically. If you want us to create TLS certificates for your endpoints but don't want to delegate your DNS, request the verification of DNS records through the [Support Portal](https://support.spryker.com). If you don't delegate your DNS and want to use your own certificates, provide them to us as described in [Setting up a custom SSL certificate](/docs/ca/dev/setting-up-a-custom-ssl-certificate.html).
- Decide how email sending should be handled. If you want to send emails using Spryker, decide whether you want to use the native mail service shipped with Spryker Cloud Commerce OS or integrate a third-party one. If you want to use the native one, let us know the email address that you want to send emails from. We will lift sending restrictions and help you validate the needed DNS name. For more information about the default email service and its restrictions, see [Email service](/docs/ca/dev/email-service/email-service.html).

### Application

- Prepare and communicate technical debt mitigation plan. Develop a comprehensive plan to identify, address, and communicate strategies for managing technical debt before the system goes live. Make sure that all the stakeholders are aware of any missing or incomplete features and agree on the mitigation plan.
- Double-check whether you have all needed environment variables and parameter store values set up. Remember that this has some lead time on our side. If you are still missing parameters, create them.
- Make sure to test that your third-party integrations and plugins are available and working properly when switched to production mode, using production credentials. Often, you may need to comply with specific additional security measures, such as IP whitelisting or port configuration. Conduct performance testing for third-party systems, especially if they are involved in critical customer flows like checkout or order placement.
- Prepare and implement database creation in production. For example, commit Propel migration for production and update deploy file to install the database from the committed migration files.

### Testing

- Conduct load tests. The sample data used for testing should be comparable to the size and complexity of the production data.
- Test your production environment and assess its performance. Learn [how](https://docs.spryker.com/docs/ca/dev/environment-scaling.html) Spryker Infrastructure scaling works. Since production environments typically employ horizontal auto-scaling, it's essential to conduct stress and performance tests under expected average and peak loads. These tests enable our team to optimize the environment's vertical scaling in advance, ensuring that it can seamlessly handle the expected loads from the get-go without any potential delays caused by auto-scaling mechanisms. This proactive approach eliminates the need for post-launch adjustments.
To make this process work effectively, maintain active communication with us. Inform us about your load and performance test plans and share the results so that we can fine-tune the environment to meet your specific requirements.
- We highly recommend performing a penetration test by an independent third-party provider and addressing the identified vulnerabilities. Before conducting a penetration test, inform Spryker at least two weeks in advance by completing [this form](https://docs.google.com/forms/d/e/1FAIpQLSfunn1HY-nsqueP6sRQSLmScUWlmmQyQJk9cscIVIP_5BmuOw/viewform?usp=sf_link).
- Import real data on production. After the import is complete, double-check the completeness and accuracy of the migrated data, especially if transitioning from another platform.

{% info_block warningBox "Data import" %}

Start working with data of realistic size and quality as early as possible. At this point, you must be importing data regularly to all your environments. We recommend working with the same import data across all your environments. This significantly simplifies troubleshooting and helps you estimate import performance, leading up to your go-live and helping us with environment sizing considerations. We expect all our customers to follow this advice.

{% endinfo_block %}

- Validate the checkout and OMS process:
  - Test general checkout steps.
  - Test OMS.
  - Test shipment.
  - Test payment.

{% info_block warningBox "Integration with payment providers" %}

Lower or nonproduction environments may not have the same WAF and firewall settings configured as production environments. Therefore, make sure that all your requests have valid headers. Also, test the functionality of payment integrations that use call-backs or depend on API calls to your application in your production environment.

{% endinfo_block %}

### Data

Prepare a data migration plan. Include all the data.

### SEO

- Generate sitemap.
- Prepare the `robots.txt` file.
- Prepare all the CMS pages and other content, including meta tags, internal and external links, etc.
- Set the [favicon](https://en.wikipedia.org/wiki/Favicon).

## Two weeks before go-live

Make sure you've addressed all the items from the following checklists:

- Implement the code freeze. We recommend having a code freeze at least two weeks before going live.
- Double-check the go-live date. If any of the preceding tasks aren't complete, postpone your go-live or discuss with us how to complete them in time. DNS changes are especially sensitive to deadlines. Because of the way the DNS system works, any DNS changes take time to take effect.
- Make sure that the rollback strategy is still valid. Check that you have everything you need to recover from an unforeseen issue with the newest version of the project you are deploying.
- Make sure that DNS is set up. For details on the DNS setup, see [Set up DNS](/docs/ca/dev/set-up-dns.html).
- Make sure that the third-party systems have been switched to the production mode:
  - Set up production configuration for all the third-party systems (in environment variables). Make sure not to expose secrets in the codebase.
  - Validate BI and analytics integrations. They should not be connected to your production database but rather to the provided read replica. Make sure no external system is interacting with your production database.
- Establish a go-live support team. Have a team that can monitor your go-live process, react quickly to any issues, and work with the Spryker Support or Operations teams.
- Configure email boxes and DMARC policy.
- Define the exact plan for the go-live day:
  - Define the time of deployment.
  - Define the exact steps to be performed, including running Jenkins or other scripts, if needed.
  - Prepare a go-live communication plan: Develop a communication plan to inform stakeholders, customers, and support teams about the launch date and any changes or updates.


### Testing

- Perform end-to-end testing on production. Make sure to test the customer journey with all the third-party systems switched to the production mode. Make sure to cover all parts of the application, including:
  - Customer registration, account
  - Main E-commerce flow (search, checkout/OMS process)
  - User or Merchant flow

### Data

- Remove all the demo data from the environment. The project should only use the real data that will be used after the go-live. Remove all the demo data that comes with the Spryker repository, which includes demo and admin users. Demo users in a live shop pose a significant security risk for your project.
- Make sure that real data is set on the production environment:
  - Categories
  - Product and all related data (prices, offers, attributes, images, stock, labels, reviews and ratings, cross and up-selling etc.)
  - Customers, companies, users, merchants
  - Taxes
  - Discounts
  - CMS pages (including homepage, CSM blocks, final terms & conditions check)
  - Custom data
  - Other data
- Make sure that all the translations are provided. Double-check that all the needed languages are available.
- Make sure that all emails are correct. Double-check that all the needed data and translations are available.
- Define the glossary update strategy. For example, make sure to exclude glossary updates during the normal deployment or adjust the strategy according to your business needs.

### SEO

- Make sure that the `robots.txt` file is set up.
- Make sure that all the content is set. Verify that all the CMS pages and other content are set, including meta tags, internal and external links, etc.
- Optional: Set up redirects.

## Go-live
- Perform the end-to-end testing on production.
- Disable email sending restrictions, if any.
- Remove basic authentication from the frontend part and deploy the change.
- Run the go-live communication plan.
- Disable the destructive pipeline after the successful go-live process.

{% info_block infoBox "Don't hesitate to contact us" %}

If your go-live date is close and you need help with any of the described tasks, contact us via your Partner or Customer Success Manager *right away*.

{% endinfo_block %}
