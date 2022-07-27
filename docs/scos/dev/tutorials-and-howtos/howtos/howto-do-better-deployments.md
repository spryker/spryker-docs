---
title: HowTo: Do better deployments
description: In this article we want to share some tips and advice on how to do better deployments by using your local environment as a preview for how your application will behave when deployed to PaaS
template: howto-guide-template
---

#HowTo: Do better deployments
You are about to roll out an important feature to your staging or production environment and want to be extra sure that everything will work out right? In this article we have compiled some tips that should help you avoid surprises and will help you prepare our project optimally for being deployed.

## Prerequisites
Read access to your codebase

## {Step-by-step instructions}
A very easy way to simulate how your application will behave and look like when deployed to staging or production environment is to bootstrap the deploy.yml files that will be used by those enviornments. In the following we show what needs to be done.

### Prepare your local hosts file
In these deploy.yml files you specify the actual endpoint names that will determine the URLs under which your environment will be reachable. For this to work locally, you would need to point your DNS names to your local development environment somehow. Luckily there is an easy way to make that possible.
You can add host entries in your local /etc/hosts file. Make sure that all endpoints are in your deploy.*.yml file are referenced there and point to 127.0.0.1 

### Bootstrap with the deploy.yml file that will be used
Your project has different deploy.yml files. Mostly, you will be using deploy.dev.yml for development purposes, but you can use the deploy.yml files that will be used during deployment to staging and production environments, as well and simulate how the app wil be behave when deployed to these environments.
You should have the following deploy.yml files in your project (will vary a bit, dedpending on how many environments you have):
- deploy.(project name)-prod.yml
- deploy(project name)-staging.yml

You can now run
```
docker/sdk boot (yml file of your choice) && docker/sdk up
```

## {Summary and the end result description}
This should start up your application and it should be reachable through its staging and production URLs and behave just like it would on your PaaS environments. This setup is a good way to see whether your application builds correctly with the deploy files that will be used in the PaaS pipelines and gives you the opportunity to check out the look and feel of your application in a more authentic fashion.
