---
title: Configuring Outdated Refresh Token Life Time
originalLink: https://documentation.spryker.com/v5/docs/configuring-outdated-refresh-token-life-time
redirect_from:
  - /v5/docs/configuring-outdated-refresh-token-life-time
  - /v5/docs/en/configuring-outdated-refresh-token-life-time
---

Refresh tokens generated when accessing Glue REST API expire after a certain period of time. In addition to that, they can be [forcibly revoked](https://documentation.spryker.com/docs/en/authentication-and-authorization#token-revocation) at any time. No matter how a token becomes invalidated, it is set to expire but remains in the Storage.

For security reasons and to reduce the database storage space, it is recommended to delete outdated refresh tokens once they are expired. There are **two** ways how tokens can be removed from the Storage:

* automatically on a schedule,
* manually.

To configure the time during which an outdated refresh token is stored:

1. [Extend](https://documentation.spryker.com/docs/en/t-extend-spryker) the `Spryker\Shared\Oauth\OauthConfig` class on your project level.
2. Configure the time interval for the job via the `Spryker\Shared\Oauth\OauthConfig::getRefreshTokenRetentionInterval()` method.

After configuring the token lifetime, invalidated tokens will be deleted automatically by a [Cron job](https://documentation.spryker.com/docs/en/cronjob-scheduling) once their storage time expires.

{% info_block infoBox "Note" %}

If necessary, you can delete invalidated refresh tokens with expired storage time manually at any time. To do so, run the following console command:
```bash
vendor/bin/console oauth:refresh-token:remove-expired
```

{% endinfo_block %}


