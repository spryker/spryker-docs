---
title: Configure basic .htaccess authentication
description: Learn how to configure basic htaccess authentication for the Storefront and the Back Office.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-configure-basic-htaccess-authentication
originalArticleId: 092354ac-2368-4906-a4a7-33e93229bd2c
redirect_from:
- /docs/pbc/all/identity-access-management/202204.0/configure-basic-htaccess-authentication.html
---

This document describes how to configure basic `.htaccess` authentication for the Storefront and the Back Office.

{% info_block errorBox "Important" %}

You can't protect Glue endpoints with basic AUTH, and we do not recommend using the basic AUTH for production environments. Instead of the basic AUTH, consider other options, like IP allowlisting.

{% endinfo_block %}

To set up the `.htaccess` authentication, see the steps in the following sections.

## Define login details and endpoints

1. Add login details to `deploy.*.yml` of the desired environment as follows:

```yaml
version: "0.1"

x-frontend-auth: &frontend-auth
    auth:
        engine: basic
        users:
            - username: {secure_username} # Replace the placeholder and the brackets with the actual username
              password: {secure_password} # Replace the placeholder and the brackets with the actual password
```

2. In the same `deploy.*.yml`, define the endpoints that must be protected by adding `<<: *frontend-auth` to each desired endpoint as follows:

```yaml
...
groups:
    EU:
        region: EU
        applications:
            yves_eu:
                application: yves
                endpoints:
                    date-time-configurator-example.spryker.local:
                        entry-point: Configurator
                    yves.de.spryker.local:
                        store: DE
                        <<: *frontend-auth
                        services:
...
```

3. Bootstrap the Docker setup with the adjusted deploy file:

```bash
docker/sdk boot deploy.*.yml
```

4. Build and start the instance:

```bash
docker/sdk up
```

{% info_block warningBox "Verification" %}

Open a protected endpoint and make sure that you are prompted to enter the defined username and password.

{% endinfo_block %}

You've configured basic authentication.

## Exclude IP addresses from .htaccess authentication

To allow clients with desired IP addresses to bypass the `.htaccess` authentication, adjust the `deploy.*.yml` of the desired environment as follows:

```bash
version: "0.1"

x-frontend-auth: &frontend-auth
    auth:
        engine: basic
        users:
            - username: {secure_username} # Replace the placeholder and the brackets with the actual username.
              password: {secure_password} # Replace the placeholder and the brackets with the actual password.
        exclude:
              {ip_address} # Replace the placeholder and the brackets with the actual IP address.
```

{% info_block warningBox "Verification" %}

Open a protected endpoint from the excluded IP address and make sure that you are not prompted to enter the login details.

{% endinfo_block %}

You've excluded IP addresses from authentication.

## Using allow-listing to protect endpoints and application parts

As an alternative to basic authentication, you can use the deny and allowlist engines to determine which IPs can communicate with different application parts. The following example allows the AWS application environment IPs and the specified IPs to access the `backoffice` application.


```bash
      boffice:
        application: backoffice
        endpoints:
          backoffice.example.com.:
            store: TR
            <<: *real-ip
            auth:
              engine: whitelist
              include:
                - '${ALLOWED_IP}' # AWS gateway
                - 195.xx.xx.xx
                - 128.xx.xx.xx
                - 128.xx.xx.xx
```

You can use the same configuration for other apllication parts, such as `backgw` or `boffice`. Make sure to thoroughly test such changes in non-production environments to prevent connectivity issues in your application. For configuration reference on allow- and deny-listing, see [groups: applications:](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html#groups-applications).
