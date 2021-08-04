---
title: Configuring dynamic Yves-Zed tokens
originalLink: https://documentation.spryker.com/2021080/docs/configuring-dynamic-yves-zed-tokens
redirect_from:
  - /2021080/docs/configuring-dynamic-yves-zed-tokens
  - /2021080/docs/en/configuring-dynamic-yves-zed-tokens
---

This document describes how to improve security between Yves and Zed communication layers by implementing dynamic Yves-Zed tokens.

A dynamic Yves-Zed token is an OAuth token that is refreshed after running `docker/sdk bootstrap`.

## What is OAuth?


The OAuth 2.0 authorization framework enables a third-party application to obtain limited access to an HTTP service, either on behalf of a resource owner by orchestrating an approval interaction between the resource owner and the HTTP service, or by allowing the third-party application to obtain access on its own behalf.  
See [The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749) to learn more about OAuth.

## Why should you implement dynamic Yves-Zed tokens?

With frequent token rotation, the chances of a token being compromised are reduced to a minimum.

## How are Yves-Zed tokens generated?

After running `docker/sdk bootstrap`, you can find all the tokens in environment variables (env variables). You can find parameters that are responsible for token generation and respective env variables in the table below.



| Parameter | Parameter description | Env variable | Description of env variable value  |
| --- | --- | --- | --- |
| `OauthConstants::PUBLIC_KEY_PATH` and `OauthCryptographyConstants::PUBLIC_KEY_PATH` | SSH public key. | `SPRYKER_OAUTH_KEY_PUBLIC` |  |
| `OauthConstants::PRIVATE_KEY_PATH` | SSH private key. | `SPRYKER_OAUTH_KEY_PRIVATE` |  |
| `OauthConstants::ENCRYPTION_KEY` | Encrypts data when generating tokens. | `SPRYKER_OAUTH_ENCRYPTION_KEY` | Consists of 48 characters in lower and upper case Latin letters and digits. |
| `OauthConstants::OAUTH_CLIENT_IDENTIFIER` | OAuth client identifier for requesting access tokens. | `SPRYKER_OAUTH_CLIENT_IDENTIFIER` | The value is always `frontend`. |
| `OauthConstants::OAUTH_CLIENT_SECRET` | OAuth client secret for requesting access tokens. | `SPRYKER_OAUTH_CLIENT_SECRET` | Consists of 48 characters in lower and upper case Latin letters and digits. |
| `SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS['yves_system']['token']` | Enables access from Yves to Zed. | `SPRYKER_ZED_REQUEST_TOKEN` | Consists of 80 characters in lower and upper case Latin letters and digits. |

## Configuring dynamic Yves-Zed tokens


To configure dynamic Yves-Zed tokens:

1.  Install or update the Docker SDK to [version 1.27.1](https://github.com/spryker/docker-sdk/releases/tag/1.27.1) or higher.
    
2.  In`config/Shared/config_default.php`, update the following parameters:

    *   `OauthConstants::PUBLIC_KEY_PATH` and `OauthCryptographyConstants::PUBLIC_KEY_PATH`

    ```php
    $config[OauthConstants::PUBLIC_KEY_PATH]
        = $config[OauthCryptographyConstants::PUBLIC_KEY_PATH]
        = str_replace(
        '__LINE__',
        PHP_EOL,
        getenv('SPRYKER_OAUTH_KEY_PUBLIC') ?: ''
    ) ?: null;

    *   `OauthConstants::PRIVATE_KEY_PATH`

    ```php
    $config[OauthConstants::PRIVATE_KEY_PATH] = str_replace(
        '__LINE__',
        PHP_EOL,
        getenv('SPRYKER_OAUTH_KEY_PRIVATE') ?: ''
    ) ?: null;
    ```

    *   `OauthConstants::ENCRYPTION_KEY`

    ```php
    $config[OauthConstants::ENCRYPTION_KEY] = getenv('SPRYKER_OAUTH_ENCRYPTION_KEY') ?: null;
    ```

    *   `OauthConstants::OAUTH_CLIENT_IDENTIFIER`

    ```php
    $config[OauthConstants::OAUTH_CLIENT_IDENTIFIER] = getenv('SPRYKER_OAUTH_CLIENT_IDENTIFIER') ?: null;
    ```

    *   `OauthConstants::OAUTH_CLIENT_SECRET`

    ```php
    $config[OauthConstants::OAUTH_CLIENT_SECRET] = getenv('SPRYKER_OAUTH_CLIENT_SECRET') ?: null;
    ```

    *   `SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS['yves_system']['token']`

    ```php
    $config[SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS] = [
        'yves_system' => [
            'token' => getenv('SPRYKER_ZED_REQUEST_TOKEN') ?: '',
        ],
    ];
    ```

3. To prevent the configuration from being rewritten, remove `require 'common/config_oauth-development.php';` from the following Docker configuration files:

1.  `config_default-docker.php`
    
2.  `config_default-docker.ci.php`
    
3.  `config_default-docker.dev.php`
    

You’ve configured dynamic Yves-Zed tokens.

