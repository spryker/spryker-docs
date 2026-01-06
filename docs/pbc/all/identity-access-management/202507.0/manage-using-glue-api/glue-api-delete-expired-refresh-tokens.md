---
title: "Glue API: Delete expired refresh tokens"
description: Once a refresh token has expired, learn how you can delete them by setting their lifetime or manually through Spryker GLUE API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/deleting-expired-refresh-tokens
originalArticleId: acf43e94-6fa4-46dd-8f39-b971e5f6aa04
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/deleting-expired-refresh-tokens.html
  - /docs/pbc/all/identity-access-management/202204.0/manage-using-glue-api/glue-api-delete-expired-refresh-tokens.html
related:
  - title: Authenticating as a customer
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
  - title: Glue API - Customer Account Management feature integration
    link: docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-the-customer-account-management-glue-api.html
---

After an authentication refresh token is [revoked](/docs/integrations/spryker-glue-api/authenticating-and-authorization/authenticating-and-authorization.html) or expires, it remains in the database.

For security reasons and to reduce the database storage space, we recommend deleting the tokens by setting their lifetime. Once they have a lifetime, you can configure a cron job to delete them automatically or do it manually.

To configure the lifetime of refresh tokens, [extend](/docs/dg/dev/backend-development/extend-spryker/spryker-os-module-customisation/extend-the-spryker-core-functionality.html) the `Spryker\Shared\Oauth\OauthConfig` class on a project level.

To configure the [cron job](/docs/scos/dev/sdk/cronjob-scheduling.html) to delete the tokens with expired lifetime, configure the time interval for the job via the `Spryker\Shared\Oauth\OauthConfig::getRefreshTokenRetentionInterval()` method.

To delete the tokens with expired lifetime manually, run the command:

```bash
vendor/bin/console oauth:refresh-token:remove-expired
```
