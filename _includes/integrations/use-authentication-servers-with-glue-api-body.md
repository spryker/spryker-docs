This document describes how to use authentication servers with Backend API.

Integrate authentication following the [Glue API Authentication integration](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html) guide.

Backend API allows switching between different authentication servers. In order to provide that ability, the `AuthenticationServerPluginInterface` must be implemented.
That conception allows wiring plugins implemented an authentication server and extend the default functionality.

`OauthAuthenticationServerPlugin` implements `AuthenticationServerPluginInterface` and builds the request to the `Oauth` server out of the box.

<details><summary>AuthenticationServerPluginInterface</summary>

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Spryker\Zed\AuthenticationOauth\Communication\Plugin\Authentication;

use Generated\Shared\Transfer\GlueAuthenticationRequestTransfer;
use Generated\Shared\Transfer\GlueAuthenticationResponseTransfer;
use Spryker\Shared\AuthenticationExtension\Dependency\Plugin\AuthenticationServerPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\AuthenticationOauth\Business\AuthenticationOauthFacadeInterface getFacade()
 * @method \Spryker\Zed\AuthenticationOauth\AuthenticationOauthConfig getConfig()
 */
class OauthAuthenticationServerPlugin extends AbstractPlugin implements AuthenticationServerPluginInterface
{
    /**
     * @see \Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\ApplicationIdentifierRequestBuilderPlugin::GLUE_BACKEND_API_APPLICATION
     *
     * @var string
     */
    protected const GLUE_BACKEND_API_APPLICATION = 'GLUE_BACKEND_API_APPLICATION';

    /**
     * {@inheritDoc}
     *  - Checks whether the requested application context equals to GlueBackendApiApplication.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\GlueAuthenticationRequestTransfer $glueAuthenticationRequestTransfer
     *
     * @return bool
     */
    public function isApplicable(GlueAuthenticationRequestTransfer $glueAuthenticationRequestTransfer): bool
    {
        return $glueAuthenticationRequestTransfer->getRequestContextOrFail()->getRequestApplication() === static::GLUE_BACKEND_API_APPLICATION;
    }

    /**
     * {@inheritDoc}
     * - Makes request to proccess access token.
     * - Builds `GlueAuthenticationResponseTransfer` with proper access token if the credentials are valid.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\GlueAuthenticationRequestTransfer $glueAuthenticationRequestTransfer
     *
     * @return \Generated\Shared\Transfer\GlueAuthenticationResponseTransfer
     */
    public function authenticate(GlueAuthenticationRequestTransfer $glueAuthenticationRequestTransfer): GlueAuthenticationResponseTransfer
    {
         return $this->getFacade()->authenticate($glueAuthenticationRequestTransfer);
    }
}

```
</details>

This plugin is run by `AuthenticationFacade::authenticate()`.

For the Storefront API application, `Spryker\Client\AuthenticationOauth\Communication\Plugin\Authentication\OauthAuthenticationServerPlugin` is used and run by `AuthenticationClient::authenticate()`.

To enable the provided authentication server for the Backend API application, connect the implemented `AuthenticationServerPluginInterface` in the following way:

**Pyz\Zed\Authentication\AuthenticationDependencyProvider**

```php
<?php
namespace Pyz\Zed\Authentication;

use Spryker\Zed\Authentication\AuthenticationDependencyProvider as SprykerAuthenticationDependencyProvider;
use Spryker\Zed\AuthenticationOauth\Communication\Plugin\OauthAuthenticationServerPlugin;

class AuthenticationDependencyProvider extends SprykerAuthenticationDependencyProvider
{
    protected function getAuthenticationServerPlugins(): array
    {
        return [
            new OauthAuthenticationServerPlugin(),
        ];
    }
}
```

For the Storefront API application perform the following step:

**Pyz\Client\Authentication\AuthenticationDependencyProvider**

```php
<?php

namespace Pyz\Client\Authentication;

use Spryker\Client\Authentication\AuthenticationDependencyProvider as SprykerAuthenticationDependencyProvider;
use Spryker\Client\AuthenticationOauth\Plugin\OauthAuthenticationServerPlugin;

class AuthenticationDependencyProvider extends SprykerAuthenticationDependencyProvider
{
    protected function getAuthenticationServerPlugins(): array
    {
        return [
            new OauthAuthenticationServerPlugin(),
        ];
    }
}
```