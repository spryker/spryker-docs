---
title: Create grant type parameters
description: This document explains how to create the grant type parameters and how to use them in code
last_updated: October 24, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-grant-type-parameters.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/how-to-create-grant-type-parameters.html
  - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/how-to-guides/how-to-create-grant-type-parameters.html
  - /docs/scos/dev/glue-api-guides/202204.0/create-grant-type-parameters.html
  - /docs/scos/dev/glue-api-guides/202404.0/create-grant-type-parameters.html

---

This document explains how to create and use a [grant type](https://oauth.net/2/grant-types/) parameter.

Integrate authentication following the [Glue API Authentication integration](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html) guide.

Glue provides [grant types](https://www.rfc-editor.org/rfc/rfc6749#appendix-A.10) `password` for a customer and a user out of the box:

| SPECIFICATION           | PLUGIN           |
| -------------- | ----------------- |
| Customer grant type | Spryker\Zed\Oauth\Communication\Plugin\Oauth\CustomerPasswordOauthRequestGrantTypeConfigurationProviderPlugin |
| User grant type | Spryker\Zed\Oauth\Communication\Plugin\Oauth\UserPasswordOauthRequestGrantTypeConfigurationProviderPlugin |


Let's say you have a user and you want to have a new grant type [authorization_code](https://oauth.net/2/grant-types/authorization-code/) for it. To create the grant type, follow these steps:

1. Create `GRANT_TYPE_AUTHORIZATION_CODE` constant:

```php
<?php

namespace Pyz\Zed\Oauth;

use Spryker\Zed\OauthConfig as SprykerOauthConfig;

class OauthConfig extends SprykerOauthConfig
{
    public const GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code';
}
```

2. Create `UserAuthCodeGrantTypeBuilder`:

```php
<?php

namespace Pyz\Zed\Oauth\Business\Grant;

use DateInterval;
use Spryker\Zed\Oauth\Business\Model\League\Grant\AuthCodeGrant;
use Spryker\Zed\Oauth\Business\Model\League\Grant\GrantTypeBuilderInterface;
use Spryker\Zed\Oauth\Business\Model\League\Grant\GrantTypeInterface;
use Spryker\Zed\Oauth\Business\Model\League\RepositoryBuilderInterface;

class UserAuthCodeGrantTypeBuilder implements GrantTypeBuilderInterface
{
    public function buildGrant(
        RepositoryBuilderInterface $repositoryBuilder,
        DateInterval $refreshTokenTTL
    ): GrantTypeInterface {
        $userAuthCodeGrantType = new AuthCodeGrant();
        $userAuthCodeGrantType->setUserRepository($repositoryBuilder->createOauthUserRepository());
        $userAuthCodeGrantType->setRefreshTokenRepository($repositoryBuilder->createRefreshTokenRepository());
        $userAuthCodeGrantType->setRefreshTokenTTL($refreshTokenTTL);

        return $userAuthCodeGrantType;
    }
}
```

3. Create `UserAuthCodeOauthRequestGrantTypeConfigurationProviderPlugin`:

```php
<?php

namespace Pyz\Zed\Oauth\Communication\Plugin\Oauth;

use Generated\Shared\Transfer\GlueAuthenticationRequestContextTransfer;
use Generated\Shared\Transfer\OauthGrantTypeConfigurationTransfer;
use Generated\Shared\Transfer\OauthRequestTransfer;
use Pyz\Zed\Oauth\Business\Grant\UserAuthorizationCodeGrantTypeBuilder;
use Pyz\Zed\Oauth\OauthConfig;
use Spryker\Glue\Kernel\AbstractPlugin;
use Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRequestGrantTypeConfigurationProviderPluginInterface;

class UserAuthCodeOauthRequestGrantTypeConfigurationProviderPlugin extends AbstractPlugin implements OauthRequestGrantTypeConfigurationProviderPluginInterface
{
    protected const GLUE_BACKEND_API_APPLICATION = 'GLUE_BACKEND_API_APPLICATION';

    public function isApplicable(
        OauthRequestTransfer $oauthRequestTransfer,
        GlueAuthenticationRequestContextTransfer $glueAuthenticationRequestContextTransfer
    ): bool {
        return (
            $oauthRequestTransfer->getGrantType() === OauthConfig::GRANT_TYPE_AUTHORIZATION_CODE &&
            $glueAuthenticationRequestContextTransfer->getRequestApplication() === static::GLUE_BACKEND_API_APPLICATION
        );
    }

    public function getGrantTypeConfiguration(): OauthGrantTypeConfigurationTransfer
    {
        return (new OauthGrantTypeConfigurationTransfer())
            ->setIdentifier(OauthConfig::GRANT_TYPE_AUTHORIZATION_CODE)
            ->setBuilderFullyQualifiedClassName(UserAuthorizationCodeGrantTypeBuilder::class);
    }
}
```

4. Declare the grant type provider plugin:

**\Pyz\Zed\Oauth\OauthDependencyProvider**

```php
<?php

namespace Pyz\Zed\Oauth;

use Spryker\Zed\Oauth\Communication\Plugin\Oauth\CustomerPasswordOauthRequestGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\Oauth\Communication\Plugin\Oauth\UserPasswordOauthRequestGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    protected function getOauthRequestGrantTypeConfigurationProviderPlugins(): array
    {
        return [
            new UserPasswordOauthRequestGrantTypeConfigurationProviderPlugin(),
            new CustomerPasswordOauthRequestGrantTypeConfigurationProviderPlugin(),
            new UserAuthCodeOauthRequestGrantTypeConfigurationProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox “Verification” %}

* Ensure that you can authenticate as a user:

    1. Send the request to get the authorization code:
    ```
    POST /token/ HTTP/1.1
    Host: glue-backend.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 66

    response_type=code&client_id={user_client_id}
    ```  

    2. Send the following request to the access token:
    ```
    POST /token/ HTTP/1.1
    Host: glue-backend.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 66

    grant_type=authorization_code&code={user_authorization_code}&client_id={user_client_id}
    ```

    2. Check that the output contains the `201` response with a valid token.

{% endinfo_block %}
