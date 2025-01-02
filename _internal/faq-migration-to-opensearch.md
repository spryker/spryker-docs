# FAQ: Migration to OpenSearch

This document provides answers to the frequently asked questions about the migration to OpenSearch.

## What is OpenSearch, and how is it different from Elasticsearch?

[OpenSearch](https://opensearch.org/) is an open-source search and analytics suite derived from Elasticsearch 7.10.2.  It had been the same before it was forked. After the fork, the projects started to diverge slightly. OpenSearch consists of the OpenSearch search engine and OpenSearch Dashboards, which are based on Kibana. OpenSearch maintains compatibility with Elasticsearch 7.10.2 while introducing additional enhancements and features. It is fully open source and developed in a community-driven manner.

## What is Amazon OpenSearch Service?

Amazon OpenSearch Service is a managed search solution that is based on OpenSearch. As part of the service, AWS provides the OpenSearch suite and continues to support legacy Elasticsearch versions until 7.10.

## How is OpenSearch different from the Amazon OpenSearch Service?

OpenSearch refers to the community-driven open-source search and analytics technology. On the other hand, Amazon OpenSearch Service is a managed service provided by AWS that lets users deploy, secure, and run OpenSearch and Elasticsearch at scale without the need to manage the underlying infrastructure. It offers the benefits of a fully managed service, including simplified deployment and management, while leveraging the power and capabilities of OpenSearch and Elasticsearch.

## How does Spryker Cloud Commerce OS leverage Amazon OpenSearch service?

As a recognized AWS Partner, Spryker Cloud Commerce OS(SCCOS) relies on AWS-managed services. SCCOS leverages Amazon OpenSearch Service to securely unlock real-time search, monitoring, and analysis of business and operational data for use cases like application monitoring, log analytics, observability, and website search.

## Does it mean that all SCCOS projects are already using Amazon OpenSearch Service?

Yes, all SCCOS projects are already running Amazon OpenSearch Service, regardless of the engine version of Elasticsearch or OpenSearch you are currently using.

## Can my project migrate to OpenSearch if it's running Spryker Commerce OS on-premises?

Yes, you can enable OpenSearch until version 1.2 on-premises because OpenSearch is an open-source project that can be deployed and run on your own infrastructure.

## If my SCCOS project is running Elasticsearch, do I need to prepare for the migration from Elasticsearch to OpenSearch?

If you are running Elasticsearch version 6.8 or above, no action is required on your part. We will handle the migration from Elasticsearch to OpenSearch. For the projects running lower versions of Elasticsearch, before migrating, we recommend updating Elasticsearch to version 6.8. If you need technical guidance for updating Elasticsearch, [contact our Support team](https://support.spryker.com).

## How long does it take to migrate from Elasticsearch to OpenSearch?

The migration takes a short time, usually within the maintenance window. We can migrate your project during the maintenance window or on demand.

## Will there be any data loss during the migration?

No, the migration to OpenSearch follows AWS's blue-green deployment strategy, which ensures data continuity and prevents any loss. Your data will remain intact and available in the upgraded environment.

## Will any functionality be lost during the migration?

No, there won't be any loss of functionality during the migration. Because OpenSearch 1 is backward compatible with Elasticsearch 7, all features and functions remain accessible after the migration.

## Will there be any downtime during the migration or scaling process?

No, AWS's blue-green deployment strategy ensures uninterrupted service during the migration.

## I am currently using Elasticsearch 7 or older versions. What are the benefits of migrating to OpenSearch?

Migration to OpenSearch provides several benefits:

* Enhanced security: OpenSearch includes built-in security features to protect your data better.

* Continued support: OpenSearch receives long-term support and updates, ensuring ongoing improvements and maintenance.

* Advanced features: OpenSearch introduces new features such as better observability, anomaly detection, and data lifecycle management.

* Active community: OpenSearch benefits from a thriving open-source community, driving continuous enhancement and innovation.

## Why didn’t we get access to OpenSearch earlier?

We prioritize our services' stability, security, and compatibility above all else. That's why we approach upgrades with the utmost caution, ensuring that we have extensively tested and verified their functionality and compatibility before they are introduced into our ecosystem. Elasticsearch has been a reliable and robust search engine, and many of our customers still use versions under 7.10. Despite Elastic's decision to deprecate some older versions of Elasticsearch, we've been able to maintain their service continuity through our partnership with AWS, which has committed to supporting these versions without deprecation notice. As a result, there was no immediate need to rush the migration to OpenSearch.

However, we recognize the potential benefits and features that OpenSearch brings. After thorough testing and validation, we are confident that OpenSearch is a solid platform, and the transition will be smooth, backward compatible, and minimally disruptive.

## Does the migration to OpenSearch entail any additional costs?

No, we take care of the migration on our side as part of your existing agreement. The cost of running OpenSearch is similar to Elasticsearch. However, any changes in usage or scale can affect overall costs.

## Can I continue using Elasticsearch APIs with OpenSearch?

Yes, OpenSearch maintains backward compatibility with Elasticsearch 7.10. All your existing APIs, clients, and applications should continue to work as expected with OpenSearch.

## How is backward compatibility maintained in OpenSearch?

OpenSearch maintains backward compatibility by ensuring its APIs and core search functionality are compatible with Elasticsearch 7.10.2. When OpenSearch was forked from Elasticsearch 7.10.2, the goal was to keep the base functionality and APIs the same. This lets applications and tools built work with Elasticsearch 7.10.2 to continue functioning with OpenSearch.

Also, OpenSearch includes a compatibility mode, which lets OpenSearch respond with a version number of 7.10.2. This can be useful for tools or clients that check the version of the search engine and expect to communicate with Elasticsearch 7.10.2.

However, while backward compatibility is a priority, certain features or functionalities from older versions of Elasticsearch are not supported in OpenSearch. We recommend  thoroughly testing your application in a non-production environment when upgrading or migrating to different software.

Also, as OpenSearch continues to evolve and new versions are released, for the updates on backward compatibility, make sure to check the [OpenSearch documentation](https://opensearch.org/docs/latest/) or their [GitHub repository](https://github.com/opensearch-project/OpenSearch).

## Does OpenSearch support all the plugins that I used with Elasticsearch?

OpenSearch supports most plugins compatible with Elasticsearch 7.10.2. However, make sure to check the compatibility of specific plugins in the OpenSearch documentation or with a particular plugin's provider. Some cases require plugins to be updated or replaced with OpenSearch-compatible versions. To get the list of the plugins you are currently using,  [contact our Support team](https://support.spryker.com). Before the production environment is migrated, we will migrate your development and staging environments, so you can test backward compatibility.

## How will the migration affect my configuration and settings?

The migration from Elasticsearch to OpenSearch should not affect your current configuration and settings. OpenSearch is backward compatible with Elasticsearch 7.10.2, so it should respect your existing configuration and settings. However, when updating to a major version, we recommend always reviewing and updating documentation or notes provided by OpenSearch.

## Can I roll back to Elasticsearch if I face issues after migrating to OpenSearch?

While rolling back is generally not recommended, if you experience any significant issues after the migration, a rollback to Elasticsearch 7 is still possible. The rollback may require downtime and data migration, but we will facilitate this process.

Because long-term support, security patches, and updates will be provided for OpenSearch, a rollback should be a temporary solution. After the compatibility issues are fixed, to ensure the project's security and long-term support, it should be migrated to OpenSearch.

## Is there any change in the way I interact with the platform after the upgrade?

No, OpenSearch maintains compatibility with the Elasticsearch APIs, so the operations, requests, and procedures you are accustomed to using with Elasticsearch will continue functioning as before.

## How will the migration impact my data ingestion and query processes?

The migration should not impact your data ingestion and query processes. OpenSearch is designed to be fully backward compatible with Elasticsearch. The APIs used for data ingestion, such as the Index and Bulk APIs, and the query DSL for searching your data, will work as they did in Elasticsearch.

## Are there any security implications with the migration to OpenSearch?

No, there are no security implications. OpenSearch includes improved security features, such as granular access control, audit logging, and integration with identity providers, which further enhance the security of your deployments. However, we recommend reviewing the security settings and ensuring they align with your organization's security policies.

## Does OpenSearch support the languages and frameworks that Elasticsearch does?

Yes, OpenSearch supports all the official clients supported by Elasticsearch, such as those for Java, JavaScript, Python, Ruby, Go, .NET, and PHP. You should be able to continue using the same languages and frameworks with OpenSearch.

## Will SCCOS support Elasticsearch 8+?

 As SCCOS heavily relies on Amazon OpenSearch Service, which does not support Elasticsearch 8+, SCCOS does not support it by default. This decision is based on our commitment to ensuring the best possible stability, security, and compatibility for our users within the supported AWS ecosystem. We continue to closely monitor the developments in this area and adjust our strategies as needed to best serve the needs of our community.

## My on-premises project is running Elasticsearch 8+. What steps should I take to ensure compatibility when migrating to SCCOS?

To ensure compatibility with SCCOS, you need to migrate from Elasticsearch 8+ to OpenSearch 1.

However, we understand that sophisticated business models have unique needs, and we are always open to exploring new patterns that enable our customers to leverage and extend SCCOS with their own solutions. Therefore, if you have ideas or requirements related to Elasticsearch 8+ or any other technology, we encourage you to contact us. Our primary goal is to ensure that SCCOS is a robust and reliable platform and a customizable solution that can adapt to your needs.


## When can we expect the upgrade to OpenSearch 2 within the Spryker ecosystem?

OpenSearch 2 is already available. We are analyzing the changes to understand their implications and develop an upgrade strategy that ensures you experience no disruption in  services during the upgrade. Once we have a robust and tested upgrade plan, we will provide detailed guidance on how to do it.
