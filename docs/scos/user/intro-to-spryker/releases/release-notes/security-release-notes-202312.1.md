---
title: Security release notes 202312.1
description: Security release notes for 202312.1
last_updated: Dec 7, 2023
template: concept-topic-template
---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

If you need any additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, inform us through [security@spryker.com](mailto:security@spryker.com).

## Token validation issue

Backend API access tokens are not validated. An attacker is able to request as many access tokens as he likes. Each requested token is valid and not expired.


### Affected modules

* `spryker/oauth-backend-api`: 0.1.0 - 1.4.0

### Introduced changes

All the security-related flaws in the access token functionality have been addressed. The token becomes invalid if it has not been used for a while.

### How to get the fix

1. Update `spryker/oauth-backend-api`.

* If your version of `spryker/oauth-backend-api` is earlier than or equal to 1.4.0, update to version 1.5.0:

```bash
composer require spryker/oauth-backend-api:"~1.5.0"
composer show spryker/oauth-backend-api # Verify the version
```
2. Register the plugin `Spryker\Glue\OauthBackendApi\Plugin\GlueApplication\BackendApiAccessTokenValidatorPlugin` in `src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php`:

{% info_block warningBox "Warning" %}

If you already use the plugin  `Spryker\Glue\OauthBackendApi\Plugin\AccessTokenValidatorPlugin` in `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php` - get rid of it.

{% endinfo_block %}

```php
namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\OauthBackendApi\Plugin\GlueApplication\BackendApiAccessTokenValidatorPlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
...
    /**
     * @return array<\Spryker\Glue\GlueBackendApiApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    protected function getRequestValidatorPlugins(): array
    {
        return [
            ...
            new BackendApiAccessTokenValidatorPlugin(),
        ];
    }
...
```
