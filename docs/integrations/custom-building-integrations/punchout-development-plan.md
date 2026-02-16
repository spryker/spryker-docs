---
title: PunchOut development plan
description: Enable projects to connect to procurement systems following PunchOut protocol.
last_updated: Feb 19, 2026
template: default
layout: custom_new
---

# Introduction

This document provides a comprehensive development plan for connecting Spryker projects to procurement systems using PunchOut flow.

It includes detailed technical specifications for implementing database modifications, authentication endpoints, Yves and BackOffice customizations.

# Prerequisites

To start, familiarize yourself with the PunchOut flow. You can find an overview and the most common protocols on the [PunchOut Commerce](https://punchoutcommerce.com/guides/punchout/) resource.

# Assumptions

In order to make this plan universally usable, we base it on the following assumptions:
1. We assume cXML implementation as described [here](https://punchoutcommerce.com/guides/punchout/cxml-punchout-setup-request/).
2. External customer identification is based on the **email**, which is provided as the `UserEmail` attribute of the buyer. Shop owners must ensure that the customer is configured correctly in the shop, including their company, business unit, prices, product lists, discounts, and other relevant settings.
3. The PunchOut BuyerCookie (session cookie or identifier) is used to maintain cart state during the procurement workflow.

# Development Plan

The guide includes step-by-step instructions for:
- configuring customer data,
- updating necessary transfer definitions,
- security headers that might require update,
- and the checkout flow changes

to enable your Spryker shop to operate within a PunchOut procurement workflow.

## PunchOut platforms registration

**src/Pyz/Zed/PunchOut/Persistence/Propel/Schema/spy_punchout.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\PunchOut\Persistence"
          package="src.Orm.Zed.PunchOut.Persistence">

    <table name="spy_punchout" idMethod="native">
        <column name="id_punchout" required="true" type="INTEGER" primaryKey="true" autoIncrement="true"/>
        <column name="platform_name" type="VARCHAR" required="true" />
        <column name="identity" type="VARCHAR" required="true" />
        <column name="shared_secret" type="VARCHAR" required="true" />
    </table>
</database>
```

You must implement at least a PunchoutFacade to validate the request data against the allowed pairs.

If you plan to support multiple PunchOut protocols, you might extend this table with additional parameters.

Implement BackOffice UI to edit this table.

## Update Customer

Update table `spy_customer`, adding string field **login_hash**.

**src/Pyz/Zed/PunchOut/Persistence/Propel/Schema/spy_customer.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\Customer\Persistence"
          package="src.Orm.Zed.Customer.Persistence">

    <table name="spy_customer">
        <column name="login_hash" type="VARCHAR" required="false" />
        <column name="login_hash_validity" type="TIMESTAMP" required="false" />
    </table>
</database>
```

Corresponding update to the transfer object `CustomerTransfer` is also needed:

**src/Pyz/Shared/PunchOut/Transfer/punchout.transfer.xml**

```xml
    <transfer name="Customer">
        <property name="loginHash" type="string"/>
        <property name="loginHashValidity" type="TIMESTAMP"/>
    </transfer>
```

### Update Customer in the Back Office

Update to the Customer edit/view UI in the Back Office

## Update quote object

To enable handling of the PunchOut session, some data must be stored in the cart.
To do so, adjust Quote transfer, representing cart.

| Field | Comment |
|-------|---------|
| punchoutSessionID | Store BuyerCookie or related PunchOut session identifier |
| hideCartSelector | Flag to hide cart selector to prevent PunchOut logic disruption |
| disableCheckout | Flag to disable native checkout, replacing it with `return` button |
| allowPunchOut | Flag indicating if PunchOut session is in progress for this cart |
| punchOutFormData | Used to carry over form data to the checkout form |

**src/Pyz/Shared/PunchOut/Transfer/punchout.transfer.xml**

```xml
    <transfer name="Quote">
        <property name="punchoutSessionID" type="string"/>
        <property name="disableCheckout" type="int"/>
        <property name="allowPunchOut" type="int"/>
        <property name="punchOutSubmitUrl" type="string"/>
        <property name="punchOutFormData" type="string"/>
    </transfer>
```

Add newly created fields into `\Pyz\Zed\Quote\QuoteConfig::getQuoteFieldsAllowedForSaving` to save them into session:
- punchoutSessionID,
- disableCheckout,
- allowPunchOut,
- punchOutSubmitUrl.

Field **punchOutFormData** is used only to transfer data on the summary step.

If you know that some additional fields are required, add them as well.

## Yves UI changes

To enable a safe PunchOut flow, introduce a `Return To Procurement System` button.

### Introduce Return To Procurement System button

To generate the PunchOut form data, implement a plugin with interface `\SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\CheckoutStepPreConditionPluginInterface`
**\Pyz\Yves\PunchOut\Plugin\PunchOutCheckoutStepPreConditionPlugin**

```php
...
class PunchOutCheckoutStepPreConditionPlugin extends AbstractPlugin implements CheckoutStepPreConditionPluginInterface
...
    public function preCondition(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        $quoteTransfer = $this->getFactory()
            ->createPunchOutSummaryStepData()
            ->prepareData($quoteTransfer);

        return $quoteTransfer;
    }

...
```

**\Pyz\Yves\PunchOut\Models\PunchOutSummaryStepData**

```php
...
class PunchOutSummaryStepData {
    public function prepareData(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        $quoteTransfer->setPunchOutFormData(/* build the PunchOut form data */);

        return $quoteTransfer;
    }
}
...
```

**\Pyz\Yves\PunchOut\PunchOutFactory**

```php
...
    public function createPunchOutSummaryStepData(): PunchOutSummaryStepData
    {
        return new PunchOutSummaryStepData();
    }
...
```

`src/Pyz/Yves/CheckoutPage/Theme/default/views/summary/summary.twig`
```twig
{% extends template('page-layout-checkout', '@Spryker:CheckoutPage') %}

{% block submit %}
    {% if data.cart.disableCheckout %}
        {{ parent() }}
    {% endif %}
    {% if data.cart.allowPunchOut %}
        <form action="{{ data.cart.punchOutSubmitUrl }}" method="POST">
            {{ data.cart.punchOutFormData }}

            <input type="submit" value="{{ 'Return To Procurement System' | trans }}" />
        </form>
    {% endif %}
{% endblock %}
```

After changing Twig templates, ensure the cache is cleared using your project's standard cache clearing mechanism.

## Handling PunchOut Start request

To handle a PunchOut start request, implement a Yves controller.

Since selection of the protocol may vary the scope of the implementation, we assume the bare minimum:

**src/Pyz/Shared/PunchOut/Transfer/punchout.transfer.xml**

```xml
    <transfer name="PunchoutLoginRequest">
        <property name="requestUrl" type="string"/>
        <property name="requestBody" type="string"/>
    </transfer>

    <transfer name="PunchoutLoginResponse">
        <property name="isSuccessful" type="bool"/>
        <property name="loginURL" type="string"/>
    </transfer>


```

**src/Pyz/Yves/PunchOut/Controller/PunchOutController.php**

```php
...
...
use Spryker\Shared\Log\LoggerTrait;
...
class PunchOutController extends AbstractController
{
    use LoggerTrait;

    public function loginAction(Request $request): Response
    {
        $punchoutLoginRequestTransfer = new PunchoutLoginRequestTransfer();
        $punchoutLoginRequestTransfer->setRequestUrl($request->getUri());
        $punchoutLoginRequestTransfer->setRequestBody($request->getBody());
        $this->getLogger()->info('PunchOut login request', $punchoutLoginRequestTransfer->toArray());

        $punchoutLoginResponseTransfer = $this->getFactory()->getPunchoutClient()
            ->processLoginRequest($punchoutLoginRequestTransfer);

        $this->getLogger()->info('PunchOut login response', $punchoutLoginResponseTransfer->toArray());

        if (!$punchoutLoginResponseTransfer->getIsSuccessful()) {
            return new Response('', 403);
        }

        return $this->createResponse($punchoutLoginResponseTransfer->getLoginURL());
    }
}

```

**src/Pyz/Client/PunchOut/PunchoutClient.php**

```php

class PunchoutClient extends \Spryker\Client\Kernel\AbstractClient
{
    public function processLoginRequest(PunchoutLoginRequestTransfer $punchoutLoginRequestTransfer): PunchoutLoginResponseTransfer
    {
        // Call the Facade through a Gateway, which performs:
        // - Validation of request credentials
        // - Finding a customer by UserEmail
        // - Cart preparation with required data: punchoutSessionID, disableCheckout, allowPunchOut, punchOutSubmitUrl
        // - Generation of login URL
    }
}

```

### Generation of the login URL.

The simplest way of handling this is to use a **loginHash** as a one-time token to find a customer.

You can implement another Yves controller that locates the customer by this hash and logs them in by calling **\Spryker\Client\Customer\CustomerClient::setCustomer**.
As a reference, see implementation in: **\SprykerShop\Yves\CustomerPage\Controller\AccessTokenController::executeIndexAction**.

If you detect during login that a store must be set, call **\Spryker\Client\Session\SessionClient::set('current_store', <calculated store>);** to change the store and issue a redirect so the changes will take effect.

## How to handle embedding of the shop into iFrame

### Security headers

To allow the Spryker shop to be embedded in an iframe, you must adjust security headers as follows:

```shell
X-Frame-Options: ALLOW-FROM https://example.com/
Content-Security-Policy: frame-ancestors 'self' https://example.com;
```

To implement this, create a project-level version of the plugin: `\Spryker\Shared\Application\ServiceProvider\HeadersSecurityServiceProvider::onKernelResponse`.

On punchout start, set a session flag `isPunchout` to true. Then, in the customized version of this plugin (e.g., `PunchoutHeadersSecurityServiceProvider`), produce a valid set of headers for the _iframe_.

### Cookies configuration

The cookie configuration is defined in: `\Spryker\Yves\Session\SessionConfig::getSessionStorageOptions`.

You must configure at least **cookie_samesite=None** to allow cookies to be set inside the iframe.
