---
title: Configure access to applications in maintenance mode
description: Learn how to configure access to Spryker applications in maintenance mode.
template: howto-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/manage-maintenance-mode/configure-access-to-applications-in-maintenance-mode.html
---

When you [enable maintenance mode](/docs/ca/dev/manage-maintenance-mode/enable-and-disable-maintenance-mode.html) for an application, visitors see a maintenance page and can't access the application. To enable access to an application in maintenance mode, you can allowlist IP addresses as follows.

## Define gateway IP addresses

All requests go through the AWS VPC network. To fetch real IP addresses for all defined application, in the needed deploy file, define gateway IP addresses. Example:

```yaml
x-real-ip: &real-ip
    real-ip:
        from:
            - 10.0.0.0/8 # AWS VPC network

x-frontend-auth: &frontend-auth
    <<: *real-ip

groups:
    EU:
        region: EU
        applications:
            boffice:
                application: backoffice
                endpoints:
                    backoffice.de.spryker.com:
                        store: DE
                        primal: true
                        <<: *frontend-auth
                    backoffice.at.spryker,com:
                        store: AT
                        <<: *frontend-auth
            Yves:
                application: yves
                endpoints:
                    www.de.spryker.com:
                        store: DE
                        <<: *frontend-auth
                    www.at.spryker.com:
                        store: AT
                        <<: *frontend-auth
            ...
```

For more information about the deploy file configuration, see [groups: applications:](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html#groups-applications).


## Define allowlisted IP addresses

To allow access from particular IP addresses, define them in the needed deploy file. Example:

```yaml
version: 1.0

docker:
    maintenance:
        enabled: true
        whitelist:
          ips:
              - 192.158.1.38
              - 192.0.2.1
 ```

For more information about the deploy file configuration, see [docker: maintenance: whitelist: ips:](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html#docker-maintenance-whitelist-ips).


## Deploy the changes

Deploy the application with the updated configuration by following one of the following docs:
  * [Deploying in a staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html)
  * [Deploying in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html)

Now you can access the applications from the `192.158.1.38` and `192.0.2.1` IP addresses.
