---
title: HowTo — Configure basic htaccess authentication
originalLink: https://documentation.spryker.com/2021080/docs/howto-configure-basic-htaccess-authentication
redirect_from:
  - /2021080/docs/howto-configure-basic-htaccess-authentication
  - /2021080/docs/en/howto-configure-basic-htaccess-authentication
---

This document describes how to configure basic htaccess authentication for the Storefront and the Back Office.

To set up htaccess authentication, follow the instructions below.

{% info_block errorBox "Important" %}

It is not possible to protect Glue endpoints with basic auth and we do not recommend to use the basic auth for production environments. Instead of the basic oath, consider other options, like IP whitelisting.

{% endinfo_block %}

## 1. Defining login details and endpoints
To define login details and endpoints:

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

2. In the same `deploy.*.yml`, define the endpoints that should be protected by adding `<<: *frontend-auth` to each desired endpoint as follows:

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
4. Bootstrap the docker setup with the adjusted deploy file:
```bash
docker/sdk boot deploy.*.yml
```

5. Once the job finishes, build and start the instance:
```bash
docker/sdk up
```

{% info_block warningBox "Verification" %}

Open a protected endpoint and make sure that you are prompted to enter the defined username and password.

{% endinfo_block %}

You've configured basic authentication.

## 2. Excluding IP addresses from htaccess authentication

To allow clients with desired IP addresses to bypass htaccess authentication, adjust the `deploy.*.yml` of the desired environment as follows:
```bash
version: "0.1"

x-frontend-auth: &frontend-auth
    auth:
        engine: basic
        users:
            - username: {secure_username} # Replace the placeholder and the brackets with the actual username.
              password: {secure_password} # Replace the placeholder and the brackets with the actual password.
        exclude:
              {ip_address} # Replace the placeholder and the brackets with the actual ip address.
```

{% info_block warningBox "Verification" %}

Open a protected endpoint from the excluded IP address and make sure that you are not prompted to enter the login details.

{% endinfo_block %}

You've excluded IP addresses from authentication.
