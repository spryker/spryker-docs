---
title: Set up Keycloak for local development
description: How to add a Keycloak Identity Provider to your local Spryker Docker environment for testing Federated Authentication on Storefront, Back-office, Merchant Portal, Storefront API, and Backend API.
template: feature-integration-guide-template
last_updated: Nov 27, 2026
---

This guide sets up a local Keycloak instance alongside your Spryker Docker environment. Keycloak runs as an additional Docker service, is backed by the existing MariaDB instance, and is automatically provisioned with a realm, five OAuth2 clients, and test users on first boot — no manual UI configuration required. There is one client for each browser application and one for each API.

This is a local development setup only. For production IdP configuration, refer to your IdP's documentation.

## Prerequisites

- A working local Spryker Docker environment booted with `docker/sdk boot deploy.dev.yml`

---

## Step 1 — Add the Keycloak service

Docker SDK supports merging additional Compose files into the main stack. Create `keycloak-docker-compose.yml` in the project root with the Keycloak service and a database initializer:

**`keycloak-docker-compose.yml`**

```yaml
services:
    keycloak-db-init:
        image: mariadb:11.8
        command:
            - sh
            - -c
            - |
                until mariadb -h database -u root -psecret -e 'SELECT 1' 2>/dev/null; do
                  echo 'Waiting for database...'
                  sleep 2
                done
                mariadb -h database -u root -psecret -e "
                  CREATE DATABASE IF NOT EXISTS keycloak CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
                  DROP USER IF EXISTS 'keycloak'@'%';
                  CREATE USER 'keycloak'@'%' IDENTIFIED BY 'keycloak-secret';
                  GRANT ALL PRIVILEGES ON keycloak.* TO 'keycloak'@'%';
                  FLUSH PRIVILEGES;
                "
                echo 'Keycloak database and user ready.'
                sleep infinity
        healthcheck:
            test: ["CMD-SHELL", "mariadb -h database -u keycloak -pkeycloak-secret -e 'USE keycloak'"]
            interval: 5s
            timeout: 5s
            retries: 10
        networks:
            - private

    keycloak:
        image: quay.io/keycloak/keycloak:25.0
        depends_on:
            keycloak-db-init:
                condition: service_healthy
        environment:
            KC_DB: mariadb
            KC_DB_URL: jdbc:mariadb://database:3306/keycloak
            KC_DB_USERNAME: keycloak
            KC_DB_PASSWORD: keycloak-secret
            KEYCLOAK_ADMIN: admin
            KEYCLOAK_ADMIN_PASSWORD: admin
            KC_HTTP_PORT: 28080
            KC_HOSTNAME_STRICT: false
            KC_HTTP_ENABLED: true
        command: start-dev --import-realm
        ports:
            - "28080:28080"
        volumes:
            - ./data/keycloak:/opt/keycloak/data/import
        networks:
            public:
                aliases:
                    - keycloak.spryker.local
            private:
                aliases:
                    - keycloak.spryker.local
```

The `keycloak-db-init` service waits for the shared MariaDB to be available, then creates a dedicated `keycloak` database and user. The `keycloak` service depends on it being healthy before starting.

The `--import-realm` flag tells Keycloak to import any JSON files found in `/opt/keycloak/data/import` on startup. The `./data/keycloak` directory is mounted there — this is where the realm configuration lives (see step 3).

---

## Step 2 — Hook into deploy.dev.yml

Tell Docker SDK to merge your custom Compose file into the stack by adding the following to `deploy.dev.yml`:

**`deploy.dev.yml`**

```yaml
docker:
    compose:
        yamls:
            - keycloak-docker-compose.yml
```

Docker SDK merges this file with the generated one during `docker/sdk boot`, so the Keycloak service starts alongside the rest of the stack.

---

## Step 3 — Configure the realm

Create the realm configuration file that Keycloak imports on first boot. This file defines the realm settings, one OAuth2 client per Spryker application and API, and test users.

**`data/keycloak/spryker-realm.json`**

```json
{
  "realm": "spryker",
  "enabled": true,
  "sslRequired": "none",
  "registrationAllowed": false,
  "loginWithEmailAllowed": true,
  "duplicateEmailsAllowed": false,
  "resetPasswordAllowed": true,
  "editUsernameAllowed": false,
  "bruteForceProtected": true,
  "roles": {
    "realm": [
      { "name": "user", "description": "Standard user privileges" },
      { "name": "admin", "description": "Administrator privileges" }
    ]
  },
  "defaultRoles": ["user"],
  "users": [
    {
      "username": "admin@spryker.local",
      "email": "admin@spryker.local",
      "firstName": "Admin",
      "lastName": "Spryker",
      "enabled": true,
      "emailVerified": true,
      "credentials": [{ "type": "password", "value": "change123" }],
      "realmRoles": ["user"]
    },
    {
      "username": "sonia@acme.com",
      "email": "sonia@acme.com",
      "firstName": "Sonia",
      "lastName": "Wagner",
      "enabled": true,
      "emailVerified": true,
      "credentials": [{ "type": "password", "value": "change123" }],
      "realmRoles": ["user", "admin"]
    },
    {
      "username": "herald@spryker.com",
      "email": "herald@spryker.com",
      "firstName": "Harald",
      "lastName": "Schmidt",
      "enabled": true,
      "emailVerified": true,
      "credentials": [{ "type": "password", "value": "change123" }],
      "realmRoles": ["user", "admin"]
    }
  ],
  "clients": [
    {
      "clientId": "spryker-yves",
      "name": "Spryker Yves Storefront",
      "description": "OAuth2 client for Yves storefront authentication",
      "enabled": true,
      "clientAuthenticatorType": "client-secret",
      "secret": "spryker-yves-secret",
      "publicClient": false,
      "protocol": "openid-connect",
      "standardFlowEnabled": true,
      "implicitFlowEnabled": false,
      "directAccessGrantsEnabled": false,
      "serviceAccountsEnabled": false,
      "redirectUris": ["http://yves.eu.spryker.local/*"],
      "webOrigins": ["http://yves.eu.spryker.local"],
      "defaultClientScopes": ["openid", "profile", "email"]
    },
    {
      "clientId": "spryker-zed",
      "name": "Spryker Zed Backoffice",
      "description": "OAuth2 client for Zed backoffice authentication",
      "enabled": true,
      "clientAuthenticatorType": "client-secret",
      "secret": "spryker-zed-secret",
      "publicClient": false,
      "protocol": "openid-connect",
      "standardFlowEnabled": true,
      "implicitFlowEnabled": false,
      "directAccessGrantsEnabled": true,
      "serviceAccountsEnabled": false,
      "redirectUris": [
        "http://backoffice.eu.spryker.local/*",
        "http://zed.eu.spryker.local/*"
      ],
      "webOrigins": [
        "http://backoffice.eu.spryker.local",
        "http://zed.eu.spryker.local"
      ],
      "defaultClientScopes": ["openid", "profile", "email"]
    },
    {
      "clientId": "spryker-merchant-portal",
      "name": "Spryker Merchant Portal",
      "description": "OAuth2 client for Merchant Portal authentication",
      "enabled": true,
      "clientAuthenticatorType": "client-secret",
      "secret": "spryker-merchant-portal-secret",
      "publicClient": false,
      "protocol": "openid-connect",
      "standardFlowEnabled": true,
      "implicitFlowEnabled": false,
      "directAccessGrantsEnabled": false,
      "serviceAccountsEnabled": false,
      "redirectUris": ["http://mp.eu.spryker.local/*"],
      "webOrigins": ["http://mp.eu.spryker.local"],
      "defaultClientScopes": ["openid", "profile", "email"]
    },
    {
      "clientId": "spryker-storefront-api",
      "name": "Spryker Storefront API",
      "description": "OAuth2 client for Storefront API authentication",
      "enabled": true,
      "clientAuthenticatorType": "client-secret",
      "secret": "spryker-storefront-api-secret",
      "publicClient": false,
      "protocol": "openid-connect",
      "standardFlowEnabled": true,
      "implicitFlowEnabled": false,
      "directAccessGrantsEnabled": false,
      "serviceAccountsEnabled": false,
      "redirectUris": ["http://localhost:3000/auth/callback"],
      "webOrigins": ["http://localhost:3000"],
      "defaultClientScopes": ["openid", "profile", "email"],
      "attributes": {
        "pkce.code.challenge.method": "S256"
      }
    },
    {
      "clientId": "spryker-backend-api",
      "name": "Spryker Backend API",
      "description": "OAuth2 client for Backend API authentication",
      "enabled": true,
      "clientAuthenticatorType": "client-secret",
      "secret": "spryker-backend-api-secret",
      "publicClient": false,
      "protocol": "openid-connect",
      "standardFlowEnabled": true,
      "implicitFlowEnabled": false,
      "directAccessGrantsEnabled": false,
      "serviceAccountsEnabled": false,
      "redirectUris": ["http://localhost:3000/auth/callback"],
      "webOrigins": ["http://localhost:3000"],
      "defaultClientScopes": ["openid", "profile", "email"],
      "attributes": {
        "pkce.code.challenge.method": "S256"
      }
    }
  ]
}
```

### What this configures

**Realm** — a `spryker` realm with brute-force protection enabled and self-registration disabled.

**Clients** — one per application, all using the Authorization Code flow (`standardFlowEnabled: true`) with a confidential client secret:

| Client ID | Surface | Secret |
|---|---|---|
| `spryker-yves` | Storefront | `spryker-yves-secret` |
| `spryker-zed` | Back-office | `spryker-zed-secret` |
| `spryker-merchant-portal` | Merchant Portal | `spryker-merchant-portal-secret` |
| `spryker-storefront-api` | Storefront API | `spryker-storefront-api-secret` |
| `spryker-backend-api` | Backend API | `spryker-backend-api-secret` |

The `defaultClientScopes: ["openid", "profile", "email"]` ensures Keycloak returns the `email`, `given_name`, and `family_name` claims that Spryker requires. No additional claim mapping is needed.

The API clients require PKCE with the `S256` method (`pkce.code.challenge.method`). Their redirect URI, `http://localhost:3000/auth/callback`, stands for a frontend that runs locally on port 3000. Replace it with the redirect URI of your frontend, and add the same address to **Redirect URIs** of the identity provider in the Back Office.

**Test users** — three pre-configured users, all with password `change123`:

| Name | Email | Use for |
|---|---|---|
| Sonia Wagner | `sonia@acme.com` | Storefront login |
| Admin Spryker | `admin@spryker.local` | Back-office login |
| Harald Schmidt | `herald@spryker.com` | Merchant Portal login |

Make sure the email address of the Merchant Portal test user exists in Spryker's database before testing. Storefront and Back-office users are created automatically on first SSO login.

---

## Step 4 — Set environment variables

Add the following to the `image.environment` section of `deploy.dev.yml`.

**`deploy.dev.yml`**

```yaml
image:
    environment:
        OAUTH_SSO_YVES_BASE_URL: 'http://keycloak.spryker.local:28080'
        OAUTH_SSO_YVES_REALM: 'spryker'
        OAUTH_SSO_YVES_CLIENT_ID: 'spryker-yves'
        OAUTH_SSO_YVES_CLIENT_SECRET: 'spryker-yves-secret'
        OAUTH_REDIRECT_URI_YVES: 'http://yves.eu.spryker.local/login/oauth-callback'

        OAUTH_SSO_ZED_BASE_URL: 'http://keycloak.spryker.local:28080'
        OAUTH_SSO_ZED_REALM: 'spryker'
        OAUTH_SSO_ZED_CLIENT_ID: 'spryker-zed'
        OAUTH_SSO_ZED_CLIENT_SECRET: 'spryker-zed-secret'
        OAUTH_REDIRECT_URI_ZED: 'http://backoffice.eu.spryker.local/security-oauth-user/login'

        OAUTH_SSO_MP_BASE_URL: 'http://keycloak.spryker.local:28080'
        OAUTH_SSO_MP_REALM: 'spryker'
        OAUTH_SSO_MP_CLIENT_ID: 'spryker-merchant-portal'
        OAUTH_SSO_MP_CLIENT_SECRET: 'spryker-merchant-portal-secret'
        OAUTH_REDIRECT_URI_MERCHANT_PORTAL: 'http://mp.eu.spryker.local/security-merchant-portal-gui/oauth-login'

        OAUTH_SSO_BASE_URL: 'http://keycloak.spryker.local:28080'

        OAUTH_SSO_GLUE_STOREFRONT_REALM: 'spryker'
        OAUTH_SSO_GLUE_STOREFRONT_CLIENT_ID: 'spryker-storefront-api'
        OAUTH_SSO_GLUE_STOREFRONT_CLIENT_SECRET: 'spryker-storefront-api-secret'
        OAUTH_REDIRECT_URI_GLUE_STOREFRONT: 'http://localhost:3000/auth/callback'

        OAUTH_SSO_GLUE_BACKEND_REALM: 'spryker'
        OAUTH_SSO_GLUE_BACKEND_CLIENT_ID: 'spryker-backend-api'
        OAUTH_SSO_GLUE_BACKEND_CLIENT_SECRET: 'spryker-backend-api-secret'
        OAUTH_REDIRECT_URI_GLUE_BACKEND: 'http://localhost:3000/auth/callback'
```

These values must match the client IDs, secrets, and redirect URIs defined in `spryker-realm.json`. The API variables are the ones that the KnpU clients in [Install Federated Authentication (SSO) for the Storefront API and Backend API](/docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication-for-the-storefront-and-backend-api.html#3-configure-the-knpu-clients) use.

{% info_block warningBox "Cloud environments" %}

For non-local environments, do not add secrets to `deploy.*.yml`. Store them in your secure secrets manager instead — for example, AWS Parameter Store provided by your Spryker cloud environment.

{% endinfo_block %}

---

## Verification

1. Boot the stack:

```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

2. Confirm Keycloak is running by opening `http://keycloak.spryker.local:28080`. Log in with `admin` / `admin` and verify the `spryker` realm and its five clients exist.

3. Test each application:

| Surface | URL | Test user |
|---|---|---|
| Storefront | `http://yves.eu.spryker.local/login` | Sonia Wagner — `sonia@acme.com` |
| Back-office | `http://backoffice.eu.spryker.local/security-gui/login` | Admin Spryker — `admin@spryker.local` |
| Merchant Portal | `http://mp.eu.spryker.local/security-merchant-portal-gui/login` | Harald Schmidt — `herald@spryker.com` |

On each login page, click the SSO button, authenticate with the test user credentials (`change123`), and confirm you are redirected back and logged in.

4. Test each API. First, add the identity providers to the **Storefront API** and **Backend API** groups in the Back Office, as described in [Configure the identity providers](/docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication-for-the-storefront-and-backend-api.html#4-configure-the-identity-providers). Then, complete a sign-in as described in [Glue API: Authenticate with an identity provider](/docs/pbc/all/oauth/latest/manage-using-glue-api/glue-api-authenticate-with-an-identity-provider.html):

| API | Test user |
|---|---|
| Storefront API | Sonia Wagner — `sonia@acme.com` |
| Backend API | Admin Spryker — `admin@spryker.local` as a Back Office user, Harald Schmidt — `herald@spryker.com` as a merchant user |

If no frontend runs on `http://localhost:3000`, open the authorization URL in a browser and sign in. After the sign-in, Keycloak redirects to `http://localhost:3000/auth/callback`. The page does not load, but the address bar contains the `code` and `state` query parameters that you need for the access token request.

Open the authorization URL exactly as the API returns it, with the `keycloak.spryker.local` host. Keycloak takes the issuer of a token from the host of the sign-in. If you replace the host, for example with `localhost`, the user info request of Spryker fails, and the access token request returns the `003` error.

For troubleshooting Keycloak-specific issues, refer to the [Keycloak documentation](https://www.keycloak.org/documentation).
