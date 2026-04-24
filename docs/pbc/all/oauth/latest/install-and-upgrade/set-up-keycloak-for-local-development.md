---
title: Set up Keycloak for local development
description: How to add a Keycloak Identity Provider to your local Spryker Docker environment for testing Federated Authentication on Storefront, Back-office, and Merchant Portal.
template: feature-integration-guide-template
last_updated: Apr 21, 2026
---

This guide sets up a local Keycloak instance alongside your Spryker Docker environment. Keycloak runs as an additional Docker service, is backed by the existing MariaDB instance, and is automatically provisioned with a realm, three OAuth2 clients, and test users on first boot — no manual UI configuration required.

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

Create the realm configuration file that Keycloak imports on first boot. This file defines the realm settings, one OAuth2 client per Spryker application, and test users.

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
      "username": "sonia@spryker.com",
      "email": "sonia@spryker.com",
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

The `defaultClientScopes: ["openid", "profile", "email"]` ensures Keycloak returns the `email`, `given_name`, and `family_name` claims that Spryker requires. No additional claim mapping is needed.

**Test users** — three pre-configured users, all with password `change123`:

| Name | Email | Use for |
|---|---|---|
| Admin Spryker | `admin@spryker.local` | Storefront login |
| Sonia Wagner | `sonia@spryker.com` | Back-office login |
| Harald Schmidt | `herald@spryker.com` | Merchant Portal login |

Make sure the email address of the Merchant Portal test user exists in Spryker's database before testing. Storefront and Back-office users are created automatically on first SSO login.

---

## Step 4 — Set environment variables

Add the following to the `image.environment` section of `deploy.dev.yml`. The client names (`SSO_YVES`, `SSO_ZED`, `SSO_MP`) follow the `SPRYKER_OAUTH_{CLIENT_NAME}_{FIELD}` convention described in [Add an OAuth provider](/docs/pbc/all/oauth/latest/install-and-upgrade/add-an-oauth-provider.html).

**`deploy.dev.yml`**

```yaml
image:
    environment:
        SPRYKER_OAUTH_SSO_YVES_BASE_URL: 'http://keycloak.spryker.local:28080'
        SPRYKER_OAUTH_SSO_YVES_REALM: 'spryker'
        SPRYKER_OAUTH_SSO_YVES_CLIENT_ID: 'spryker-yves'
        SPRYKER_OAUTH_SSO_YVES_CLIENT_SECRET: 'spryker-yves-secret'
        SPRYKER_OAUTH_REDIRECT_URI_YVES: 'http://yves.eu.spryker.local/login/oauth-callback'

        SPRYKER_OAUTH_SSO_ZED_BASE_URL: 'http://keycloak.spryker.local:28080'
        SPRYKER_OAUTH_SSO_ZED_REALM: 'spryker'
        SPRYKER_OAUTH_SSO_ZED_CLIENT_ID: 'spryker-zed'
        SPRYKER_OAUTH_SSO_ZED_CLIENT_SECRET: 'spryker-zed-secret'
        SPRYKER_OAUTH_REDIRECT_URI_ZED: 'http://backoffice.eu.spryker.local/security-oauth-user/login'

        SPRYKER_OAUTH_SSO_MP_BASE_URL: 'http://keycloak.spryker.local:28080'
        SPRYKER_OAUTH_SSO_MP_REALM: 'spryker'
        SPRYKER_OAUTH_SSO_MP_CLIENT_ID: 'spryker-merchant-portal'
        SPRYKER_OAUTH_SSO_MP_CLIENT_SECRET: 'spryker-merchant-portal-secret'
        SPRYKER_OAUTH_REDIRECT_URI_MERCHANT_PORTAL: 'http://mp.eu.spryker.local/security-merchant-portal-gui/oauth-login'
```

These values must match the client IDs, secrets, and redirect URIs defined in `spryker-realm.json`.

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

2. Confirm Keycloak is running by opening `http://keycloak.spryker.local:28080`. Log in with `admin` / `admin` and verify the `spryker` realm and its three clients exist.

3. Test each application:

| Surface | URL | Test user |
|---|---|---|
| Storefront | `http://yves.eu.spryker.local/login` | Admin Spryker — `admin@spryker.local` |
| Back-office | `http://backoffice.eu.spryker.local/security-gui/login` | Sonia Wagner — `sonia@spryker.com` |
| Merchant Portal | `http://mp.eu.spryker.local/security-merchant-portal-gui/login` | Harald Schmidt — `herald@spryker.com` |

On each login page, click the SSO button, authenticate with the test user credentials (`change123`), and confirm you are redirected back and logged in.

For troubleshooting Keycloak-specific issues, refer to the [Keycloak documentation](https://www.keycloak.org/documentation).
