---
title: How to create grant type parameters
description: This document explains how to create the grant type parameters and how to use them in code
last_updated: October 24, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-grant-type-parameters.html
---

This document explains how to create the grant type parameter and use it.

Integrate authentication following the [Glue API Authentication integration](/docs/scos/dev/technical-enhancement-integration-guides/glue-authentication-integration.html) guide.

Glue provides grant types `password` for a customer, and a user out of the box:

| SPECIFICATION           | PLUGIN           |
| -------------- | ----------------- |
| Customer grant type | Spryker\Zed\Oauth\Communication\Plugin\Oauth\CustomerPasswordOauthRequestGrantTypeConfigurationProviderPlugin |
| User grant type | Spryker\Zed\Oauth\Communication\Plugin\Oauth\UserPasswordOauthRequestGrantTypeConfigurationProviderPlugin |


Let's say you have a `Foo` user, and you want to have a new grant type `password` for it. To create the grant type, follow these steps:

1. Create `FooUserPasswordGrantTypeBuilder`.
   
```php
<?php

namespace Pyz\Zed\Oauth\Business\Grant;

use DateInterval;
use Spryker\Zed\Oauth\Business\Model\League\Grant\GrantTypeBuilderInterface;
use Spryker\Zed\Oauth\Business\Model\League\Grant\GrantTypeInterface;
use Spryker\Zed\Oauth\Business\Model\League\Grant\PasswordGrantType;
use Spryker\Zed\Oauth\Business\Model\League\RepositoryBuilderInterface;

class FooPasswordGrantTypeBuilder implements GrantTypeBuilderInterface
{
    public function buildGrant(
        RepositoryBuilderInterface $repositoryBuilder,
        DateInterval $refreshTokenTTL
    ): GrantTypeInterface {
        $fooUserPasswordGrantType = new PasswordGrantType();
        $fooUserPasswordGrantType->setUserRepository($repositoryBuilder->createOauthFooUserRepository());
        $fooUserPasswordGrantType->setRefreshTokenRepository($repositoryBuilder->createRefreshTokenRepository());
        $fooUserPasswordGrantType->setRefreshTokenTTL($refreshTokenTTL);

        return $fooUserPasswordGrantType;
    }
}
```

2. Create `FooPasswordOauthRequestGrantTypeConfigurationProviderPlugin`.

```php
<?php

namespace Pyz\Zed\Oauth\Communication\Plugin\Oauth;

use Generated\Shared\Transfer\GlueAuthenticationRequestContextTransfer;
use Generated\Shared\Transfer\OauthGrantTypeConfigurationTransfer;
use Generated\Shared\Transfer\OauthRequestTransfer;
use Pyz\Zed\Oauth\Business\Grant\FooPasswordGrantTypeBuilder;
use Spryker\Glue\Kernel\AbstractPlugin;
use Spryker\Zed\Oauth\OauthConfig;
use Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRequestGrantTypeConfigurationProviderPluginInterface;

class FooPasswordOauthRequestGrantTypeConfigurationProviderPlugin extends AbstractPlugin implements OauthRequestGrantTypeConfigurationProviderPluginInterface
{
    protected const GLUE_BACKEND_API_APPLICATION = 'GLUE_BACKEND_API_APPLICATION';

    public function isApplicable(
        OauthRequestTransfer $oauthRequestTransfer,
        GlueAuthenticationRequestContextTransfer $glueAuthenticationRequestContextTransfer
    ): bool {
        return (
            $oauthRequestTransfer->getGrantType() === OauthConfig::GRANT_TYPE_PASSWORD &&
            $glueAuthenticationRequestContextTransfer->getRequestApplication() === static::GLUE_BACKEND_API_APPLICATION
        );
    }

    public function getGrantTypeConfiguration(): OauthGrantTypeConfigurationTransfer
    {
        return (new OauthGrantTypeConfigurationTransfer())
            ->setIdentifier(OauthConfig::GRANT_TYPE_PASSWORD)
            ->setBuilderFullyQualifiedClassName(FooPasswordGrantTypeBuilder::class);
    }
}

```

3. Declare the grant type provider plugin.

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
            new FooPasswordOauthRequestGrantTypeConfigurationProviderPlugin(),
        ];
    }
}

```

* Ensure that you can authenticate as a foo user:

    1. Send the request:
    ```
    POST /token/ HTTP/1.1
    Host: glue-backend.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 66

    grantType=password&username={foo_user_username}&password={foo_user_password}
    ```

    2. Check that the output contains the 201 response with a valid token.

{% endinfo_block %}
