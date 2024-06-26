---
title: Connect to services via AWS Systems Manager & the docker-sdk
description: Access Spryker Cloud services via AWS Systems Manager & the docker-sdk.
template: howto-guide-template
last_updated: Jun 26, 2024
---

{% info_block warningBox %}

Connecting to services via AWS Systems Manager & the docker-sdk is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

At Spryker, our customers mainly connect to their PAAS services via a VPN connection. The VPN connection works very well for 99% of our customers. But, there are instances where customers have difficulty using the VPN Connection. For these customers, and customers who would like to explore an alternative method to connect to their PAAS services, we created a solution to connect to services via AWS Systems Manager & the docker-sdk

This method enables you to connect to PAAS services, as soon as you have received access to your AWS Account

## Prerequisites
1. [Install or update to the latest version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. [Install the Session Manager plugin for the AWS CLI](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html)
3. Install the patch to the docker-sdk  
3.1. Clone the docker-sdk
```shell
git clone git@github.com:spryker/docker-sdk.git
```  
3.2 Apply the diff [docker-sdk-paas.diff](https://github.com/spryker-community/docker-sdk-vpn-alternative/commit/009ecdedbad9d99505de6210064dcb2fa194b20e.diff)
```shell
cd docker-sdk
git apply --whitespace=nowarn ../docker-sdk-paas.diff
```

4. Set the [AWS Authentication Environment Variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html#envvars-set) in your shell
```shell
export AWS_ACCESS_KEY_ID="AWS_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="AWS_SECRET_ACCESS_KEY"
export AWS_SESSION_TOKEN="AWS_SESSION_TOKEN"
export AWS_REGION="AWS_REGION"
```

## Connect to a service

1. Issue the PAAS `create-tunnel` command, with `--environment={environment_name} service1 service2`
```shell
docker/sdk paas create-tunnel --environment=spryker-b2bmarketplace database database-ro-replica storage search scheduler broker
-->  DEVELOPMENT MODE

Environment spryker-b2bmarketplace

Fetching Service Connection Parameters

Selecting Random EC2 Instance Jump Host Within Environment spryker-b2bmarketplace

Selected EC2 Instance i-0c8e03846...

Establishing tunnel to database service
Port 5000 is Free
Waiting for connections...

Remote Endpoint: spryker-b2bmarketplace.abcdefg.us-east-2.rds.amazonaws.com Remote Port: 3306 Local Endpoint: localhost Local Port: 5000

Establishing tunnel to database-ro-replica RO REPLICA service. Only for PRODUCTION environments. Use the credentials for the database to connect
READ-REPLICA not found.

Establishing tunnel to storage service
Port 5020 is Free
Waiting for connections...

Remote Endpoint: spryker-b2bmarketplace-cluster.abcdefg.ng.0001.use2.cache.amazonaws.com Remote Port: 6379 Local Endpoint: localhost Local Port: 5020

Establishing tunnel to search service
Port 5030 is Free
Waiting for connections...

Remote Endpoint: vpc-spryker-b2bmarketplace-abcdefg.us-east-2.es.amazonaws.com Remote Port: 80 Local Endpoint: localhost Local Port: 5030

Establishing tunnel to scheduler service
Port 5040 is Free
Waiting for connections...

Remote Endpoint: scheduler.b2b-marketplace.demo-spryker.com Remote Port: 80 Local Endpoint: localhost Local Port: 5040

Establishing tunnel to broker service
Port 5050 is Free
Waiting for connections...

Remote Endpoint: rabbitmq.b2b-marketplace.demo-spryker.com Remote Port: 15672 Local Endpoint: localhost Local Port: 5050
```
2. Once the tunnels to each service has been established, use your favourite tools and connect to `{Local Endpoint}:{Local Port}` for example 
```shell
mysql --host=127.0.0.1 --port=5000 --user=$SPRYKER_DB_USERNAME --password=$SPRYKER_DB_PASSWORD
```

{% info_block warningBox %}

By default, sessions time out after 20 minutes of inactivity.

{% endinfo_block %}
