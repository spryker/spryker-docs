---
title: Deleting expired refresh tokens
description: Delete expired refresh tokens by setting their lifetime or manually.
originalLink: https://documentation.spryker.com/2021080/docs/deleting-expired-refresh-tokens
originalArticleId: acf43e94-6fa4-46dd-8f39-b971e5f6aa04
redirect_from:
  - /2021080/docs/deleting-expired-refresh-tokens
  - /2021080/docs/en/deleting-expired-refresh-tokens
  - /docs/deleting-expired-refresh-tokens
  - /docs/en/deleting-expired-refresh-tokens
---

After an authentication refresh token is [revoked](/docs/scos/dev/glue-api-guides/{{page.version}}/authentication-and-authorization.html) or expires, it remains in the database.

For security reasons and to reduce the database storage space, we recommend deleting the tokens by setting their liftime. Once they have a lifetime, you can configure a cron job to delete them automatically or do it manually.


To configure the lifetime of refresh tokens, [extend](/docs/scos/dev/back-end-development/zed/data-manipulation/data-enrichment/extending-spryker/extending-the-spryker-core-functionality.html) the `Spryker\Shared\Oauth\OauthConfig` class on a project level.

To configure the [cron job](/docs/scos/dev/sdk/{{page.version}}/cronjob-scheduling.html) to delete the tokens with expired lifetime, configure the time interval for the job via the `Spryker\Shared\Oauth\OauthConfig::getRefreshTokenRetentionInterval()` method.

To delete the tokens with expired lifetime manually, run the command:
```bash
vendor/bin/console oauth:refresh-token:remove-expired
```



