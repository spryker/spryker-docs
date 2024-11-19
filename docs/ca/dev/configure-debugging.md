---
title: Configure debugging
description: Configure debugging in Spryker by enabling extended logs and setting up environment-specific parameters for efficient troubleshooting
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/debugging
originalArticleId: 23eb2efb-7de7-46d5-a525-1524e8d66d08
redirect_from:
  - /docs/debugging
  - /docs/en/debugging
  - /docs/cloud/dev/spryker-cloud-commerce-os/debugging
  - /docs/cloud/dev/spryker-cloud-commerce-os/configuring-debugging.html
---

{% info_block warningBox "Security" %}

Once debugging is completed, turn off debugging mode. Leaving it permanently enabled can lead to the disclosure of sensitive information.

{% endinfo_block %}

Currently, Xdebug is not supported, but you can enable extended logs in the deploy file to debug an application. Extended logs provide extra information about application state and behavior.

To enable extended logs:

1. Edit `deploy.*.yml` of the desired environment:

```yaml
docker:
    debug:
        enabled: true
```

2. Depending on the `environment` value of `deploy.*.yml`, edit the respective `config_default.php`:

```php
$config[LogConstants::LOG_LEVEL] = getenv('SPRYKER_DEBUG_ENABLED') ? Logger::INFO : Logger::DEBUG;
```

3. Commit the changes and deploy the application in the desired environment:
    * [Deploy in the production environment](/docs/ca/dev/deploy-in-a-production-environment.html)
    * [Deploy in the staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html)

Extended logs are enabled and you can check them in the AWS Management Console. See [Working with logs](/docs/ca/dev/working-with-logs.html) for more details.

## Next step
[Working with logs](/docs/ca/dev/working-with-logs.html)
