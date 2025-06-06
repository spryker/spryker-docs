---
title: Environment provisioning
description: This document explains core concepts that are important to understand before filing an environment provisioning request.
last_updated: Mar 14, 2023
template: concept-topic-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/environment-provisioning.html
---

This document describes the information you need to provide for an environment to be provisioned.

To initiate the environment provisioning, you need to create a support portal case. If you have questions, visit the [Spryker Support Portal](https://support.spryker.com). If you don't have access to the support portal yet, request it through the [request form](https://www.surveymonkey.com/r/XYK5R26) on SurveyMonkey.
Once you are logged in to the Spryker Support Portal, you can submit an [Infrastructure Change Request/Access Management Case](https://support.spryker.com/s/case-funnel-problem) selecting that you want to "Create a new Environment".

The following sections outline the information you need to provide to initiate provisioning of your environment.

{% info_block warningBox "Mandatory information" %}

* This process can only be initiated through a customer account. To request an environment, partners should work with their respective customers.
* All the sections that aren't prefixed with *Optional* are mandatory for a provisioning request to be processed.

{% endinfo_block %}

## Environment

This section explains how different attributes of your environment are used.

### Optional: Environment name

The environment name is derived from the combination of the project name and environment type. The environment name is referenced in AWS services endpoints:
* Redis
* DB
* Elasticsearch
* Deploy files
* S3 buckets

### Project name

The *project name* is the name of the customer or the customer's preferred name for their project. The project name can't be modified once the environment is provisioned. It shouldn't contain special characters or spaces.

**Recommended:** myshop

**Not recommended:** myshöp, my shop, my-shop, my$shop

### Environment type

The *[environment type](/docs/ca/dev/environments-overview.html)* corresponds to the popular naming convention for environment tiers in software development. You can refer to your contract for information on what environments you are entitled to and choose the respective one—for example:

Lower environments: STAGE, DEV

Production: PROD-LIKE, PROD

**Example:**

If `myshop` is the customer, then `myshop-PROD` is an environment name, where `myshop` is the project name, and `PROD` is the environment type.

### AWS region

AWS region is not part of the provisioning request but is defined in the order form. For information about the AWS region you are entitled to use, check your contract. The *AWS region* indicates where customers want their infrastructure resources to be available. For more information about available options for the AWS region, refer to the AWS [official documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html).

The following AWS regions are supported:
- Asia Pacific (Tokyo)
- Asia Pacific (Seoul)
- Asia Pacific (Mumbai)
- Asia Pacific (Singapore)
- Asia Pacific (Sydney)
- Canada (Central)
- Europe (Frankfurt am Main)
- Europe (Stockholm)
- Europe (Milan)
- Europe (Ireland)
- Europe (London)
- Europe (Paris)
- South America (São Paulo)
- US East (Ohio)
- US East (N. Virginia)
- US West (N. California)
- US West (Oregon)

### Repository

A repository is the place where Spryker application code resides. Spryker supports GitHub, GitLab, and Bitbucket code hosting services. Providing a repository with Spryker code is a prerequisite to provision a Spryker Cloud environment.

#### GitHub repository

When using GitHub, provide a link to the GitHub repository, including a branch and a valid GitHub token. This enables code pipelines to access the repository. Make sure to share these details securely, according to [our recommendations](/docs/about/all/support/share-secrets-with-the-spryker-support-team.html).

#### GitLab or Bitbucket repositories

GitLab and Bitbucket repositories can't be directly connected to pipelines directly, so they are connected using the codecommit feature. A connection with pipelines is established only after an environment is provisioned. If possible, grant GitLab or Bitbucket access to the Spryker engineer working on this request. For instructions on connecting a repository, see [Connect a GitLab code repository](/docs/ca/dev/connect-a-code-repository.html#connect-a-gitlab-code-repository) and [Connect a Bitbucket code repository](/docs/ca/dev/connect-a-code-repository.html#connect-a-bitbucket-code-repository).

{% info_block infoBox "" %}

We can share the required credentials mentioned in the preceding documentation only after environment provisioning is complete.

{% endinfo_block %}

### Deploy file

The *Deploy file* is a YAML file used by the Docker SDK to build infrastructure for applications. Providing Spryker with a valid deploy file is a mandatory prerequisite to proceed with environment provisioning. A repository usually has multiple deploy files that are relevant for different purposes and environments. Demo Shops have a `deploy.dev.yml` file that is mostly used for local development purposes. The naming of deploy files is important. The naming convention is `deploy.{PROJECT_NAME}-{ENVIRONEMENT_NAME}.yml`—for example, `deploy.myshop-production.yml`. For more information about deploy files, see [Deploy file](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html). The most relevant deploy file you can use as a reference is [deploy.aws-env-template.yml](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.aws-env-template.yml). Each Demo Shop repository has its respective deploy file template. Adjust this according to your requirements and preferences following the [deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html) and share it with us.

## Domains

This section explains how you can choose a domain name for your project. The domain name determines the URL under which your shop is available. You can manage your domains or let us do it for you. If you want us to manage a domain, it shouldn't be a top-level domain, like `companyshop.com`, but the specific domain used for your Spryker shop, like `shop.companyname.com`.

### Domain name

A domain name must be set for each environment. If not provided, it's going to be a default non-public Spryker domain—for example, `myshop-production.cloud.spryker.toys`. Domain names can be changed later. However, if you already know a domain for the application, you can specify this domain in your deploy files. During the provisioning process, we provide you with CNAME and validation records, which you can set in your DNS management. The validation records let us provide an SSL certificate for you, and the CNAME records point your domain to the public DNS name of the load balancers responsible for your environment, effectively directing visitors of that domain to your Spryker application.


## User access

Customer and partner users can have access to the following:
* AWS Management Console: You can use it to access environment CloudWatch logs, deployment pipelines, parameter store, S3 buckets. Provide the email addresses of users who need access to AWS Console.
* VPN: You can use it to access services such as databases, Jenkins, and RabbitMQ. Usually, developers or DevOps personnel need it. Provide the email addresses of users that need VPN access.
* SSH: You can use it to access the Bastion Host, and from there, reach other services via [port forwarding](/docs/ca/dev/access/connect-to-services-via-ssh.html). Usually, developers or DevOps personnel need it in special cases. Provide an SSH public key and email addresses of users who need access to SSH. Keep in mind that VPN access is required to use SSH.
* SFTP: This access is required for the SFTP Bastion Host. Provide an SSH public key and email addresses of users who need access to SFTP. Keep in mind that VPN access is required to use SFTP. For data import purposes, make sure to use S3 buckets.

## Optional: Additional attributes

This section explains what additional attributes you can specify at the beginning of your provisioning, as well as accesses you can request.

### Optional: SFTP
SFTP is implemented on top of EFS. You can use SFTP for any third-party integrations or for explicit data imports via Jenkins jobs if required on the project level. Note that SFTP is only available on Bastion and Jenkins. This feature is disabled by default. You can also request it later via the support ticket, but it's preferred to validate this option during provisioning.

For data import, we recommend using S3 buckets.

### Optional: Site to Site VPN
A Site-to-Site VPN (Virtual Private Network) is a type of network connection that enables secure communication between two or more geographically separated networks. This type of VPN allows two or more sites to establish a secure and encrypted connection over the internet or other public networks, creating a virtual private network between the two sites.
The following configuration parameters are required to set up the Site-to-Site VPN tunnel:
- Customer gateway IP address
- IP ranges on the customer side that would need access to Spryker VPC
The following configuration parameters are optional:
- Device name on customer gateway
- Custom BGP(Border Gateway Protocol) ASN
- Dynamic BGP routes
- Other Parameters of tunnels

{% info_block infoBox "Site to Site VPN" %}

If you need Site to Site VPN, provide your internal subnet CIDR, so our Spryker VPC doesn't overlap with it. It is crucial to evaluate this option during provisioning, as Spryker can't change it later once the environment is provisioned. If overlapping is identified, the environment will need to be recreated.

{% endinfo_block %}

### Optional: Default network settings
Each Spryker Cloud Commerce environment uses a dedicated Virtual Private Cloud (VPC).
The default Classless Inter-Domain Routings (CIDRs) are as follows:
- For the first non-production environment: `10.105.0.0/16`.
- For the first production environment: `10.106.0.0/16`.
- Subsequent environment of any type: `10.107.0.0/16` - `10.200.0.0/16`.

To change the default CIDRs, request it with your environment.

### Optional: Clone environment

If you want to clone an existing environment together with its setup, like access rights or database, make sure to mention it in your request.
