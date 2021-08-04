---
title: Deleting expired refresh tokens
originalLink: https://documentation.spryker.com/2021080/docs/deleting-expired-refresh-tokens
redirect_from:
  - /2021080/docs/deleting-expired-refresh-tokens
  - /2021080/docs/en/deleting-expired-refresh-tokens
---

After an authentication refresh token is [revoked](https://documentation.spryker.com/docs/authentication-and-authorization) or expires, it remains in the database.

For security reasons and to reduce the database storage space, we recommend deleting the tokens by setting their liftime. Once they have a lifetime, you can configure a cron job to delete them automatically or do it manually.


To configure the lifetime of refresh tokens, [extend](https://documentation.spryker.com/docs/t-extend-spryker) the `Spryker\Shared\Oauth\OauthConfig` class on a project level.

To configure the [cron job](https://documentation.spryker.com/docs/cronjob-scheduling) to delete the tokens with expired lifetime, configure the time interval for the job via the `Spryker\Shared\Oauth\OauthConfig::getRefreshTokenRetentionInterval()` method.

To delete the tokens with expired lifetime manually, run the command:
```bash
vendor/bin/console oauth:refresh-token:remove-expired
```



