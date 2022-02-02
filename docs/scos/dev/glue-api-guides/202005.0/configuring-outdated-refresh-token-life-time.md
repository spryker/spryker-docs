---
title: Configuring Outdated Refresh Token Life Time
last_updated: Sep 14, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v5/docs/configuring-outdated-refresh-token-life-time
originalArticleId: b695d109-b38a-430f-b0c4-b9fc86284bf8
redirect_from:
  - /v5/docs/configuring-outdated-refresh-token-life-time
  - /v5/docs/en/configuring-outdated-refresh-token-life-time
related:
  - title: Authentication and Authorization
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/authenticating-as-a-customer.html
  - title: Glue API - Customer Account Management feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/glue-api/glue-api-customer-account-management-feature-integration.html
---

Refresh tokens generated when accessing Glue REST API expire after a certain period of time. In addition to that, they can be [forcibly revoked](/docs/scos/dev/glue-api-guides/{{page.version}}/authentication-and-authorization.html#token-revocation) at any time. No matter how a token becomes invalidated, it is set to expire but remains in the Storage.

For security reasons and to reduce the database storage space, it is recommended to delete outdated refresh tokens once they are expired. There are **two** ways how tokens can be removed from the Storage:

* automatically on a schedule,
* manually.

To configure the time during which an outdated refresh token is stored:

1. [Extend](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/spryker-os-module-customisation/extending-the-spryker-core-functionality.html) the `Spryker\Shared\Oauth\OauthConfig` class on your project level.
2. Configure the time interval for the job via the `Spryker\Shared\Oauth\OauthConfig::getRefreshTokenRetentionInterval()` method.

After configuring the token lifetime, invalidated tokens will be deleted automatically by a [Cron job](/docs/scos/user/features/{{page.version}}/sdk/cronjob-scheduling.html) once their storage time expires.

{% info_block infoBox "Note" %}

If necessary, you can delete invalidated refresh tokens with expired storage time manually at any time. To do so, run the following console command:
```bash
vendor/bin/console oauth:refresh-token:remove-expired
```

{% endinfo_block %}


