---
title: Project configuration for PunchOut Gateway
description: Project guidelines for running a shop that handles eProcurement systems via PunchOut flow.
template: concept-topic-template
last_updated: Apr 24, 2026
---

This document describes the project configuration to enable eProcurement systems support via PunchOut flow.

## PunchOut connection configuration

Since the UI for connection setup is not yet ready, we provide these two console commands to create a demo configuration:

- OCI flow:

```bash
  vendor/bin/console punchout-gateway:oci:demo-connection:create
```

- cXML flow:

```bash
  vendor/bin/console punchout-gateway:cxml:demo-connection:create
```

To configure a connection, create a row in the `spy_punchout_connection` table:

| Column | Value                                    | Comments                                                                                                                                                 |
|--------|------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fk_store` | Store ID (for example, DE)               | ID of the store the customer must be logged in to.                                                                                                       |
| `name` | Human-readable label                     | Used only for readability                                                                                                                                |
| `is_active` | `true`                                   | Determines whether the connection can be used.                                                                                                           |
| `allow_iframe` | `true` / `false`                         | Enforces iframe-specific headers when the PunchOut session is active. If **~TARGET** is sent during the request, the headers are sent regardless of this value. |
| `protocol_type` | `'oci'` or `'xml'`                       | Flow type.                                                                                                                                               |
| `processor_plugin_class` | Full class name of the processor plugin. | Processor to be used.                                                                                                                                    |

### OCI connection configuration

OCI-specific configuration

| Column | Value                                    | Comments                                                                                                                                                                                                          |
|--------|------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `request_url` | `'/punchout-gateway/oci/my-company'`     | Endpoint path the buyer posts the OCI login form to. This URL without a domain is the unique identifier of each connection, and can be anything that starts with ``https://<shop-domain>/punchout-gateway/oci/``. |
| `configuration` | JSON configuration                       | See the *OCI Login configuration* section below.                                                                                                                                                                   |
| `protocol_type` | `'oci'`                       | Flow type.                                                                                                                                               |
| `processor_plugin_class` | Full class name of the processor plugin. | `\SprykerEco\Zed\PunchoutGateway\Communication\Plugin\PunchoutGateway\DefaultOciProcessorPlugin` or a project's implementation.                                                                                   |

The triplet `protocol_type`, `fk_store` and `request_url` must be unique.

Column `configuration` contains JSON with the following optional keys. Override only when the value differs from the default.

| Key | Default | Purpose                                                     |
|-----|---------|-------------------------------------------------------------|
| `usernameField` | `USERNAME` | Form field name carrying the username during login request. |
| `passwordField` | `PASSWORD` | Form field name carrying the password during login request. |

Additionally, configure credentials for customers who will access the shop.
To do this, create rows in the `spy_punchout_credential` table:

| Column                 | Value           | Comment                                                                                                                                                       |
|------------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fk_punchout_connection` | integer         | ID of the connection                                                                                                                                          |
| `fk_customer`            | int             | ID of the customer                                                                                                                                            |
| `username`               | string          | Username, that's sent in the `username` field                                                                                                                 |
| `password_hash`          | hashed password | Hashed password, that's sent in the `password` field. Validation happens using [password_verify](https://www.php.net/manual/en/function.password-verify.php). |
| `is_active`              | `true`/`false`  | Active flag of this customer                                                                                                                                  |

Customers used for an OCI connection are expected to be fully configured in the shop so that only permitted products and prices are accessible.

### cXML connection configuration

cXML-specific configuration columns:

| Column | Value                                    | Comments                                                                                                                                                                                                          |
|--------|------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `request_url` | `'/punchout-gateway/cxml/my-company'`    | Endpoint path the cXML request is posted to. This URL without a domain is the unique identifier of each connection, and can be anything that starts with ``https://<shop-domain>/punchout-gateway/cxml/``.        |
| `configuration` | JSON configuration                       | See the *cXML configuration* section below.                                                                                                                                                                        |
| `protocol_type` | `'xml'`                       | Flow type.                                                                                                                                                                                                        |
| `processor_plugin_class` | Full class name of the processor plugin. | `\SprykerEco\Zed\PunchoutGateway\Communication\Plugin\PunchoutGateway\DefaultCxmlProcessorPlugin` or a project's implementation.                                                                                  |

The `sender_identity` value must be globally unique — each cXML system maps to exactly one connection.

Column `configuration` contains JSON with the following keys:

| Key | Required | Purpose                                          |
|-----|----------|--------------------------------------------------|
| `senderSharedSecret` | yes | Shared secret used to authenticate the request. Validation happens using [password_verify](https://www.php.net/manual/en/function.password-verify.php). |

For a cXML connection, no additional PunchOut-related configuration is required.
The logged-in customer is identified by the `UserEmail` extrinsic field.
Customers used for a cXML connection are expected to be fully configured in the shop so that only permitted products and prices are accessible.


## PunchOut flow processor plugin

Each PunchOut connection resolves its processor plugin at runtime using the fully qualified class name stored in `spy_punchout_connection.processor_plugin_class`.
The plugin must implement one of the following interfaces:
- for OCI flow - `\SprykerEco\Zed\PunchoutGateway\Dependency\Plugin\PunchoutProcessorPluginInterface`
- for cXML flow - `\SprykerEco\Zed\PunchoutGateway\Dependency\Plugin\PunchoutCxmlProcessorPluginInterface`.

This module provides default functionality:
- \SprykerEco\Zed\PunchoutGateway\Communication\Plugin\PunchoutGateway\DefaultCxmlProcessorPlugin - for cXML flow,
- \SprykerEco\Zed\PunchoutGateway\Communication\Plugin\PunchoutGateway\DefaultOciProcessorPlugin - for OCI flow.

No dependency injection registration is required. The plugin is loaded at runtime.

### Creation of a custom plugin

Place the plugin in your project's Zed communication layer, for example:

**src/Pyz/Zed/ProjectPunchoutGateway/Communication/Plugin/PunchoutGateway/CustomOciProcessorPlugin.php**

The simplest approach is to extend the default OCI plugin and override only the methods you need:

```php
namespace Pyz\Zed\ProjectPunchoutGateway\Communication\Plugin\PunchoutGateway;

use SprykerEco\Zed\PunchoutGateway\Communication\Plugin\PunchoutGateway\DefaultOciProcessorPlugin;

class CustomOciProcessorPlugin extends DefaultOciProcessorPlugin
{
    // Override only the methods you need to customise.
}
```

Set `spy_punchout_connection.processor_plugin_class` on the connection that uses this plugin to `\Pyz\Zed\ProjectPunchoutGateway\Communication\Plugin\PunchoutGateway\CustomOciProcessorPlugin`.

### Global plugin methods

| Method | Called when                                                  | Functionality                                                                                                     |
|--------|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `authenticate` | First step of the login flow                                 | Finds a connection based on the setup request. Returns `null` if no valid connection is found.                    |
| `resolveCustomer` | After a valid connection was found                           | Finds the customer to use for the PunchOut session. Returns `null` if no valid customer is found.                 |
| `resolveQuote` | After a valid customer is resolved                           | Creates a new quote or reuses an existing one. An empty `QuoteTransfer` can be returned.                          |
| `expandQuote` | After the quote is resolved                                  | Allows adjusting the quote after PunchOut-specific preparations are done.                                         |
| `resolveSession` | After the quote is expanded, before the session is persisted | Additional session validation logic can be added here.                                                            |

#### cXML-specific plugin methods

| Method | Called when                                      | Functionality                                                                                           |
|--------|--------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `parseCxmlRequest` | XML was parsed and a valid connection was found. | Additional mapping of the cXML data onto setup request.                                                 |
| `expandResponse` | After successful session creation                | Response to the login request can be expanded, for example, with the default start URL for the customer. |


## Form handler plugin

Projects extend or replace the storefront "Transfer Cart" form via plugins implementing `\SprykerEco\Yves\PunchoutGateway\Plugin\Form\PunchoutFormHandlerPluginInterface`.
At render time, `PunchoutFormDataBuilder::build()` iterates the registered handlers in order and returns the result of the first whose `isApplicable()` returns `true`.

The module ships two defaults, both registered in `\SprykerEco\Yves\PunchoutGateway\PunchoutGatewayDependencyProvider::getPunchoutFormHandlerPlugins()`:

- `\SprykerEco\Yves\PunchoutGateway\Plugin\Form\DefaultCxmlPunchoutFormHandlerPlugin` — for cXML sessions.
- `\SprykerEco\Yves\PunchoutGateway\Plugin\Form\DefaultOciPunchoutFormHandlerPlugin` — for OCI sessions.

### Plugin methods

| Method | Called when                                                              | Functionality                                                                                                                                                                    |
|--------|--------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `isApplicable` | Before each render of the widget                                         | Returns `true` when the quote's PunchOut session matches this handler's protocol.                                                                                                |
| `handle` | After `isApplicable()` returned `true`                                   | Builds the `PunchoutFormDataTransfer` carrying the action URL and all hidden form fields, or returns `null` when the form cannot be built (for example, missing session data). |

### Register a custom handler

Place the plugin in your project's Yves layer, for example:

**src/Pyz/Yves/ProjectPunchoutGateway/Plugin/Form/CustomCxmlPunchoutFormHandlerPlugin.php**

Then register it before the defaults so it takes precedence for the same protocol:

**src/Pyz/Yves/PunchoutGateway/PunchoutGatewayDependencyProvider.php**

```php
namespace Pyz\Yves\PunchoutGateway;

use Pyz\Yves\ProjectPunchoutGateway\Plugin\Form\CustomCxmlPunchoutFormHandlerPlugin;
use SprykerEco\Yves\PunchoutGateway\PunchoutGatewayDependencyProvider as SprykerEcoPunchoutGatewayDependencyProvider;

class PunchoutGatewayDependencyProvider extends SprykerEcoPunchoutGatewayDependencyProvider
{
    protected function getPunchoutFormHandlerPlugins(): array
    {
        return [
            new CustomCxmlPunchoutFormHandlerPlugin(),
            ...parent::getPunchoutFormHandlerPlugins(),
        ];
    }
}
```


## Punchout-specific security header expander plugin

At PunchOut session start, Yves applies protocol-specific `Content-Security-Policy` directives to allow the Storefront to be embedded and to post back to the buyer's procurement system.

Directive generation is delegated to plugins implementing `\SprykerEco\Yves\PunchoutGateway\Dependency\Plugin\PunchoutSecurityHeaderExpanderPluginInterface`.
`PunchoutSecurityHeaderSessionWriter` walks the registered plugins and accumulates their directives for the active session once, persisting the value into the session.

By default, we provide an OCI-specific plugin only:

- `\SprykerEco\Yves\PunchoutGateway\Plugin\SecurityHeader\DefaultOciSecurityHeaderExpanderPlugin` — adds `frame-ancestors` to the CSP for OCI sessions when `spy_punchout_connection.allow_iframe` is `true` or the OCI login carries a `~TARGET` form field.

### Plugin methods

| Method | Called when                                      | Functionality                                                                                                                                        |
|--------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `isApplicable` | Before the directives are collected for a session | Returns `true` when this plugin handles the PunchOut session's protocol.                                                                              |
| `expand` | After `isApplicable()` returned `true`           | Appends protocol-specific CSP directive strings to the given list. Implementations must not add duplicate directives.                                 |

### Register a custom expander

In case your system requires additional Punchout-specific security headers, add your plugin to the Yves dependency provider. 

**src/Pyz/Yves/PunchoutGateway/PunchoutGatewayDependencyProvider.php**

```php
namespace Pyz\Yves\PunchoutGateway;

use Pyz\Yves\ProjectPunchoutGateway\Plugin\SecurityHeader\CustomCxmlSecurityHeaderExpanderPlugin;
use SprykerEco\Yves\PunchoutGateway\PunchoutGatewayDependencyProvider as SprykerEcoPunchoutGatewayDependencyProvider;

class PunchoutGatewayDependencyProvider extends SprykerEcoPunchoutGatewayDependencyProvider
{
    protected function getPunchoutSecurityHeaderExpanderPlugins(): array
    {
        return [
            ...parent::getPunchoutSecurityHeaderExpanderPlugins(),
            new CustomCxmlSecurityHeaderExpanderPlugin(),
        ];
    }
}
```


## Session-in-quote expander plugin

`PunchoutQuoteExpander` (Zed) loads the PunchOut session that belongs to the current quote and runs it through every registered `\SprykerEco\Zed\PunchoutGateway\Dependency\Plugin\PunchoutSessionInQuoteExpanderPluginInterface` before stamping it on the `QuoteTransfer`.
Use this extension point to enrich or override PunchOut session fields based on the quote (for example, to copy a project-specific field onto the session before it is persisted with the cart).

### Plugin methods

| Method | Called when                                               | Functionality                                                                                           |
|--------|-----------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `isApplicable` | For each plugin, before `expand()` runs                   | Returns `true` when the plugin should run for the given session/quote combination.                      |
| `expand` | After `isApplicable()` returned `true`                    | Expands the `PunchoutSessionTransfer` before it is assigned to the `QuoteTransfer`.                     |

## Default implementations

This section describes the behavior of the two shipped default processor plugins and the storefront "Transfer Cart" widget for each lifecycle step.
Use it to understand what you get out-of-the-box and to identify which plugin method to override when customising.

### Shared behavior

Both `DefaultOciProcessorPlugin` and `DefaultCxmlProcessorPlugin` rely on `QuoteCreator` to stamp the following fields on every new quote:

- **Store** — resolved from `spy_punchout_connection.fk_store`.
- **Currency** — set to the default currency of the resolved store.

### OCI

**Customer identification**

`OciCustomerResolver` looks up the customer by the `idCustomer` that is already on the connection transfer.
That value is stamped during authentication: `PunchoutOciAuthenticator` matches the username and password from the OCI form fields against `spy_punchout_connection_credential` and, on success, writes `connection.idCustomer`.
The buyer identity therefore comes entirely from the credential record — nothing from the buyer's login payload is used.
Override `resolveCustomer` on the processor plugin to source the customer differently (for example, from a custom form field).

**Quote identification**

`OciPunchoutQuoteFinder` always returns a fresh empty `QuoteTransfer` with `DEFAULT_QUOTE_NAME`.
There is no session-to-quote lookup on OCI login; every login starts a new cart.
Store and currency are set by `QuoteCreator` as described in the shared behavior section above.
Override `resolveQuote` to reuse a per-customer cart across sessions.

**Quote fill with items**

OCI login does not carry item data.
`DefaultOciProcessorPlugin::expandQuote` is a pass-through and leaves the quote empty.
Items are transferred back to the buyer's procurement system via the storefront form POST (see "Transfer Cart button" below), not populated during login.

**Transfer Cart button**

`DefaultOciPunchoutFormHandlerPlugin` (registered in `YvesPunchoutGatewayDependencyProvider`) makes the button visible when the current quote has a PunchOut session whose `punchoutData.ociLoginRequest` is not `null`.
When applicable, the action URL is taken from the `HOOK_URL` form field of the OCI login request (validated to start with `https://` at session creation time).
The hidden form fields are OCI-flat `NEW_ITEM-…` key/value pairs produced by `OciFormFieldBuilder`.
The button is not rendered when no punchout session exists on the quote, when the session was created by a cXML login, or when no handler plugin is registered for the Yves factory.

### cXML

**Customer identification**

`CxmlCustomerResolver` reads the `Extrinsic[name="UserEmail"]` field from the parsed `PunchOutSetupRequest` and resolves the customer via `CustomerFacade::getCustomer` by email.
Connection authentication is a separate step that runs first: `PunchoutCxmlAuthenticator` verifies the `senderSharedSecret` from the cXML header against the connection record using `password_verify`.
If the `UserEmail` extrinsic is absent or empty, `resolveCustomer` returns `null` and the session is rejected.
Override `resolveCustomer` to read identity from a different extrinsic or from a custom header field.

**Quote identification**

`CxmlPunchoutQuoteFinder` uses `BuyerCookie` from the `PunchOutSetupRequest` to look up an existing PunchOut session via `PunchoutGatewayRepository::findPunchoutSessionByBuyerCookie`.
When a session is found, the linked quote is reused — allowing the buyer to resume an in-progress cart.
If the found quote belongs to a different store than the current connection's `idStore`, the old quote is deleted and a new empty one is created.
When `BuyerCookie` is missing or no session matches, a new `DEFAULT_QUOTE_NAME` quote is returned.
Store and currency are then set by `QuoteCreator`.
Override `resolveQuote` to change cookie-matching rules or to support cross-store quote reuse.

**Quote fill with items**

`CxmlPunchoutQuoteExpander::expand` runs during `expandQuote` and handles three operations:

- `operation=edit` — maps each `PunchoutItemTransfer` to an `ItemTransfer` (`sku` = `SupplierPartId`, `quantity` from the request, `unitGrossPrice = UnitPrice × 100` in minor currency units) and adds them to the quote via `CartFacade::addToCart`, which runs the full cart validation and expander pipeline.
  The `ShipTo` address from the setup request is also mapped to `QuoteTransfer.shippingAddress` and propagated to each item's shipment.
- `operation=create` — clears all existing items on the quote; `ShipTo` is still mapped if present.
- `operation=inspect` — items and address are left untouched.

Override `expandQuote` to change how SKUs are matched, how prices are converted, or to add custom item attributes.

**Transfer Cart button**

`DefaultCxmlPunchoutFormHandlerPlugin` makes the button visible when the current quote has a PunchOut session whose `punchoutData.cxmlSetupRequest` is not `null`.
The action URL is `punchoutSession.browserFormPostUrl`, captured from the original `PunchOutSetupRequest.BrowserFormPost.URL` at login time.
A single hidden field (`CXML_FORM_FIELD_NAME`) carries the `PunchOutOrderMessage` built by `PunchoutGatewayService::buildCxmlPunchoutOrderMessage`.
The button is not rendered when no punchout session exists, when the session was created by an OCI login, or when no handler plugin is registered.

### Widget visibility summary

`PunchoutCartWidget` is always instantiated on pages where it is embedded.
Actual form visibility is determined by `PunchoutFormDataBuilder::build()`, which calls plugins of interface `PunchoutFormHandlerPluginInterface` and returns the result of the first whose `isApplicable()` returns `true`.
The Twig template renders the `<form>` and submit button only when `formData` is not `null` and `formData.actionUrl` is not empty.
If you register a custom handler plugin, place it before the default plugins in the dependency provider so it takes precedence for the same protocol.

For OCI flow, the button is rendered for the empty cart as well to allow empty-order return to the eProcurement platform.

For cXML flow, no button is rendered for the empty cart. This behavior will be improved in the next version.