---
title: Connect to services via AWS Systems Manager & the docker-sdk
description: Access Spryker Cloud services via AWS Systems Manager & the docker-sdk.
template: howto-guide-template
last_updated: Jun 26, 2024
---

{% info_block warningBox %}

Connecting to services via AWS Systems Manager & the docker-sdk is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

At Spryker, our customers mainly connect to their PaaS services via a VPN connection. This feature introduces an alternative method to connect to PaaS services. We created a solution to connect to services via AWS Systems Manager integrated into the the docker-sdk

{% info_block infoBox "docker/sdk VPN Alternative" %}

This method enables you to connect to PaaS services, as soon as you have received access to your AWS Account and you no longer need to request VPN Access

{% endinfo_block %}

## Prerequisites
1. [Install or update to the latest version of the AWS CLI V2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. [Install the Session Manager plugin for the AWS CLI](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html)
3. Install or Upgrade to the latest version of the docker-sdk  
3.1. Clone the docker-sdk
```shell
git clone git@github.com:spryker/docker-sdk.git
```  
3.2 Verify the docker/sdk paas (or cloud) commands exist
```shell
docker/sdk

┌────╮       ┌─┐           ╭────┬────╮─┬─┐
│  ╮ │───┬───┤ ├─┬───┬─┬─┐ │ ───┤  ╮ │ ┌─┘
│  ╯ │ ┼ │ ├─┤───┤ ┼─┤ ┌─╯ ├─── │  ╯ │ └─┐
└────┴───┴───┴─┴─┴───┴─┘   └────┴────┴─┴─┘



Basic usage:
 SPRYKER_PROJECT_NAME=<project-name> docker/sdk <command> [args...]                                    Runs the command for the specified <project-name>.
 docker/sdk [-p <project-name>] <command> [args...]                                                    Runs the command for the specified <project-name>.

Installation:
 docker/sdk bootstrap | boot [-v] <project-yml-file>                                                   Prepares all the files to run the application based on <project-yml-file>.
 docker/sdk bootstrap | boot [-v]                                                                      Prepares all the files to run the application based on deploy.local.yml or deploy.yml.
 docker/sdk config                                                                                     Outputs deploy file into the cli.

Quick start:
docker/sdk bootstrap && docker/sdk up

Paas | Cloud:
 The AWS CLI is required for Paas | Cloud Commands
 The AWS Session Manager plugin for the AWS CLI is required for Paas | Cloud Commands. See https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html
 AWS Access credentials are required for Paas | Cloud Commands. See https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

Commands:
 docker/sdk paas | cloud environments                                                                  Search the AWS Account for Paas Environments, and list them
 docker/sdk paas | cloud service-details --environment=ENVIRONMENT_NAME service [database storage ..]  List Paas Environment Service Details. See output from environments command. Services: database database-ro-replica storage search scheduler broker
 docker/sdk paas | cloud create-tunnel --environment=ENVIRONMENT_NAME service [database storage ..]    Create AWS SSM Tunnels to one or more Paas Environment Services. See output from environments command. Services: database database-ro-replica storage search scheduler broker
 docker/sdk paas | cloud close-tunnel service [database storage ..]                                    Close ALL Active AWS SSM Tunnels for Service. Services: database database-ro-replica storage search scheduler broker
 docker/sdk paas | cloud tunnels
```

4. Set the [AWS Authentication Environment Variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html#envvars-set) in your shell
```shell
export AWS_ACCESS_KEY_ID="AWS_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="AWS_SECRET_ACCESS_KEY"
```

## Search for PaaS environments in your AWS Account (All AWS Regions)
If you are unsure which environments exist within your AWS Account, and in which AWS Regions these environments exist, issue the `docker/sdk paas environments` command. This command, will search your entire AWS Account, all AWS Regions, and return all PaaS environments found, together with their AWS Regions  

```shell
docker/sdk paas environments

┌────╮       ┌─┐           ╭────┬────╮─┬─┐
│  ╮ │───┬───┤ ├─┬───┬─┬─┐ │ ───┤  ╮ │ ┌─┘
│  ╯ │ ┼ │ ├─┤───┤ ┼─┤ ┌─╯ ├─── │  ╯ │ └─┐
└────┴───┴───┴─┴─┴───┴─┘   └────┴────┴─┴─┘



You are authenticated with AWS Account ******
This operation is currently searching the AWS account for Paas environments (All AWS regions)


Creating environments cache file
Found Environment spryker-b2bmarketplace in AWS Region eu-central-1
Found Environment spryker-b2cmarketplace in AWS Region eu-central-1

Environments cache file /tmp/******_spryker_paas_environments.tmp
```

## Retrieve service credentials
Issue the `docker/sdk paas service-details` command, with `service1 service2 --environment={environment_name}`  
Service options are: `database database-ro-replica storage search scheduler broker`

```shell
docker/sdk paas service-details database database-ro-replica storage search scheduler broker --environment=spryker-b2bmarketplace

┌────╮       ┌─┐           ╭────┬────╮─┬─┐
│  ╮ │───┬───┤ ├─┬───┬─┬─┐ │ ───┤  ╮ │ ┌─┘
│  ╯ │ ┼ │ ├─┤───┤ ┼─┤ ┌─╯ ├─── │  ╯ │ └─┐
└────┴───┴───┴─┴─┴───┴─┘   └────┴────┴─┴─┘



You are authenticated with AWS Account ******

Target environment spryker-b2bmarketplace AWS region eu-central-1

Fetching database details
SPRYKER_DB_PASSWORD=******
SPRYKER_DB_DATABASE=******
SPRYKER_DB_HOST=******
SPRYKER_DB_PORT=******
SPRYKER_DB_ROOT_PASSWORD=******
SPRYKER_DB_IDENTIFIER=******
SPRYKER_DB_ROOT_USERNAME=******
SPRYKER_DB_ENGINE=******
SPRYKER_DB_COLLATE=******
SPRYKER_DB_CHARACTER_SET=******
SPRYKER_DB_USERNAME=******

Fetching database-ro-replica details. Only for PRODUCTION environments. Use the credentials for the database to connect
READ-REPLICA not found.

Fetching storage details
SPRYKER_KEY_VALUE_STORE_ENGINE=******
SPRYKER_KEY_VALUE_STORE_HOST=******
SPRYKER_KEY_VALUE_STORE_CONNECTION_OPTIONS=******
SPRYKER_KEY_VALUE_STORE_PORT=******
SPRYKER_SESSION_FE_PORT=******
SPRYKER_SESSION_FE_HOST=******
SPRYKER_SESSION_BE_ENGINE=******
SPRYKER_SESSION_BE_PORT=******
SPRYKER_SESSION_BE_HOST=******

Fetching search details
SPRYKER_SEARCH_INDEX_PREFIX=******
SPRYKER_SEARCH_HOST=******
SPRYKER_SEARCH_PORT=******
SPRYKER_SEARCH_ENGINE=******

Fetching scheduler details
SPRYKER_SCHEDULER_HOST=******
SPRYKER_SCHEDULER_PORT=******

Fetching broker details
SPRYKER_BROKER_API_PASSWORD=******
SPRYKER_BROKER_PROTOCOL=******
SPRYKER_BROKER_CONNECTIONS=******
SPRYKER_BROKER_ENGINE=******
SPRYKER_BROKER_USERNAME=******
SPRYKER_BROKER_API_PORT=******
SPRYKER_BROKER_API_USERNAME=******
SPRYKER_BROKER_PORT=******
SPRYKER_BROKER_API_HOST=******
SPRYKER_BROKER_HOST=******
SPRYKER_BROKER_PASSWORD=******
```

## Connect to a service

1. Issue the `docker/sdk paas create-tunnel` command, with `service1 service2 --environment={environment_name}`  
Service options are: `database database-ro-replica storage search scheduler broker`
```shell
docker/sdk paas create-tunnel database database-ro-replica storage search scheduler broker --environment=spryker-b2bmarketplace

┌────╮       ┌─┐           ╭────┬────╮─┬─┐
│  ╮ │───┬───┤ ├─┬───┬─┬─┐ │ ───┤  ╮ │ ┌─┘
│  ╯ │ ┼ │ ├─┤───┤ ┼─┤ ┌─╯ ├─── │  ╯ │ └─┐
└────┴───┴───┴─┴─┴───┴─┘   └────┴────┴─┴─┘



You are authenticated with AWS Account ******

Target environment spryker-b2bmarketplace AWS region eu-central-1
Fetching service connection parameters
Selecting random EC2 instance jump host within the environment spryker-b2bmarketplace
Selected EC2 instance i-0c951b987b22e0ed9

Establishing tunnel to database service
Port 5000 is Free
Waiting for connections...
Remote Endpoint: spryker-b2bmarketplace.abcdefg.eu-central-1.rds.amazonaws.com Remote Port: 3306 Local Endpoint: localhost Local Port: 5000

Establishing tunnel to database-ro-replica RO REPLICA service. Only for PRODUCTION environments. Use the credentials for the database to connect
Port 5010 is Free
Waiting for connections...
Remote Endpoint: spryker-b2bmarketplace-ro-replica-0.abcdefg.eu-central-1.rds.amazonaws.com Remote Port: 3306 Local Endpoint: localhost Local Port: 5010

Establishing tunnel to storage service
Port 5020 is Free
Waiting for connections...
Remote Endpoint: spryker-b2bmarketplace-cluster.abcdefg.ng.0001.apse1.cache.amazonaws.com Remote Port: 6379 Local Endpoint: localhost Local Port: 5020

Establishing tunnel to search service
Port 5030 is Free
Waiting for connections...
Remote Endpoint: vpc-spryker-b2bmarketplace-abcdefg.eu-central-1.es.amazonaws.com Remote Port: 80 Local Endpoint: localhost Local Port: 5030

Establishing tunnel to scheduler service
Port 5040 is Free
Waiting for connections...
Remote Endpoint: scheduler.b2b-marketplace.demo-spryker.com Remote Port: 80 Local Endpoint: localhost Local Port: 5040

Establishing tunnel to broker service
Port 5050 is Free
Waiting for connections...
Remote Endpoint: rabbitmq.b2b-marketplace.demo-spryker.com Remote Port: 15672 Local Endpoint: localhost Local Port: 5050
```
2. Once the tunnels to each service has been established, use your favourite tools and connect to `{Local Endpoint}:{Local Port}` 
```shell
mysql --host=127.0.0.1 --port=5000 --user=$SPRYKER_DB_USERNAME --password=$SPRYKER_DB_PASSWORD
```

{% info_block warningBox %}

By default, sessions time out after 20 minutes of inactivity.

{% endinfo_block %}

## Frequently Asked Questions

### Do I still need VPN Access?
No. The docker/sdk VPN alternative solution can replace your VPN access, and when you use the docker/sdk VPN alternative solution you no longer need the Spryker VPN.

The docker/sdk VPN alternative solution is not a replacement for a Site-to-Site VPN solution. The solution is intended for users. 

### Where do I find my AWS Access Keys
You can use the AWS Management Console to manage the access keys of an IAM user. See [Managing access keys (console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)

When you create an access key pair, save the access key ID and secret access key in a secure location. The secret access key is available only at the time you create it. If you lose your secret access key, you must delete the access key and create a new one. For more instructions, see [Update access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_RotateAccessKey.html)

### Where do I find the Credentials and Service details for my PaaS Services?
The `docker/sdk paas service-details` command will retrieve and display PaaS Services details. Alternatively see [Locate service credentials](/docs/ca/dev/access/locate-service-credentials.html)

```shell
docker/sdk paas service-details database database-ro-replica storage search scheduler broker --environment={environment_name}
```

### When I execute the `docker/sdk paas create-tunnel` command I receive no errors, and the command executes successfully, but no tunnels are created

Verify that you [installed the Session Manager plugin for the AWS CLI](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html)

Verify that your local firewall software, or your organisation firewall is not blocking your tunnel requests.

### Can I connect to multiple environments at the same time?
Yes. You can connect to multiple environments at the same time.  
Set the the correct AWS Access Keys for the AWS Accoun. Then specify the correct `--environment={environment_name}` within the `docker/sdk paas create-tunnel` command

Each tunnel to a PaaS service will claim a different port. The solution allows for 10 tunnel connections for each PaaS service at the same time.

The local port ranges are  
database (RDS) 5000-5009  
database-ro-replica (RDS READ-REPLICA) 5010-5019  
storage (REDIS) 5020-5029  
search (ElasticSearch/OpenSearch) 5030-5039  
scheduler (Jenkins) 5040-5049  
broker (RabbitMQ) 5050-5059  

### Can I specify my own ports?
No. Specifying your own ports is not a feature.

### How long does the tunnels stay active?
By default, sessions time out after 20 minutes of inactivity.

### Can I create a tunnel to any EC2 instances?
No. You will not be able to use this method to connect to any EC2 instances.

### I am unable to connect to my services using the docker/sdk VPN alternative
Please [contact support](https://support.spryker.com) via **Create Case** - **Get Help**.

Be sure to add the example commands that you tried, and the errors that you received.



