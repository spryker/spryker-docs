---
title: Glue API - Request For Quote feature integration
description: Integrate the Request For Quote feature API into a Spryker project
template: feature-integration-guide-template
---

## Install feature API

Follow the steps below to install the {Feature Name} feature core.

### Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME                | VERSION          | INTEGRATION GUIDE                                                                                                                                                |
|---------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core API    | {{page.version}} | [Glue API: Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-spryker-core-feature-integration.html) |
| Cart API            | {{page.version}} | [Glue API: Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-cart-feature-integration.html)                 |
| Company Account API | {{page.version}} | [Glue API: Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-company-account-feature-integration.html)      |
| Quotation Process   | {{page.version}} | [Quotation process feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quotation-process-feature-integration.html)                   |


### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/quote-requests-rest-api:"^0.1.4" spryker/quote-request-agents-rest-api:"^0.1.4" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                        | EXPECTED DIRECTORY <!--for public Demo Shops-->  |
|-------------------------------|--------------------------------------------------|
| QuoteRequestAgentsRestApi     | vendor/spryker/quote-request-agents-rest-api     |
| QuoteRequestsRestApi          | vendor/spryker/quote-requests-rest-api           |
| QuoteRequestsRestApiExtension | vendor/spryker/quote-requests-rest-api-extension |

{% endinfo_block %}

### 2) Set up the configuration

Add following configuration to your project configuration:

| CONFIGURATION                                     | SPECIFICATION                                                    | NAMESPACE                        |
|---------------------------------------------------|------------------------------------------------------------------|----------------------------------|
| CompanyUsersRestApiConfig::COMPANY_USER_RESOURCES | Specifies resources which are accessible only for company users. | Spryker\Glue\CompanyUsersRestApi |

```php
<?php

namespace Pyz\Glue\CompanyUsersRestApi;

use Spryker\Glue\CompanyUsersRestApi\CompanyUsersRestApiConfig as SprykerCompanyUsersRestApiConfig;
use Spryker\Glue\QuoteRequestsRestApi\QuoteRequestsRestApiConfig;

class CompanyUsersRestApiConfig extends SprykerCompanyUsersRestApiConfig
{
    /**
     * @var array<string>
     */
    protected const COMPANY_USER_RESOURCES = [
        QuoteRequestsRestApiConfig::RESOURCE_QUOTE_REQUESTS,
        QuoteRequestsRestApiConfig::RESOURCE_QUOTE_REQUEST_CANCEL,
        QuoteRequestsRestApiConfig::RESOURCE_QUOTE_REQUEST_REVISE,
        QuoteRequestsRestApiConfig::RESOURCE_QUOTE_REQUEST_SEND_TO_CUSTOMER,
    ];
}
```

{% info_block warningBox "Verification" %}

Check that specified resources are only accessible if authenticated customer has company user assigned.

{% endinfo_block %}


### 3) Set up transfer objects
Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER                                | TYPE  | EVENT   | PATH                                                                          |
|-----------------------------------------|-------|---------|-------------------------------------------------------------------------------|
| RestAgentQuoteRequestsRequestAttributes | class | created | src/Generated/Shared/Transfer/RestAgentQuoteRequestsRequestAttributesTransfer |
| RestAgentQuoteRequestCancelAttributes   | class | created | src/Generated/Shared/Transfer/RestAgentQuoteRequestCancelAttributesTransfer   |
| RestAgentQuoteRequestReviseAttributes   | class | created | src/Generated/Shared/Transfer/RestAgentQuoteRequestReviseAttributesTransfer   |
| RestAgentQuoteRequestSendAttributes     | class | created | src/Generated/Shared/Transfer/RestAgentQuoteRequestSendAttributesTransfer     |
| RestQuoteRequestsAttributes             | class | created | src/Generated/Shared/Transfer/RestQuoteRequestsAttributesTransfer             |
| RestQuoteRequestCancelAttributes        | class | created | src/Generated/Shared/Transfer/RestQuoteRequestCancelAttributesTransfer        |
| RestQuoteRequestReviseAttributes        | class | created | src/Generated/Shared/Transfer/RestQuoteRequestReviseAttributesTransfer        |
| RestQuoteRequestSendAttributes          | class | created | src/Generated/Shared/Transfer/RestQuoteRequestSendAttributesTransfer          |
| RestQuoteRequestVersion                 | class | created | src/Generated/Shared/Transfer/RestQuoteRequestVersionTransfer                 |
| RestQuoteRequestsRequestAttributes      | class | created | src/Generated/Shared/Transfer/RestQuoteRequestsRequestAttributesTransfer      |
| RestQuoteRequestsCart                   | class | created | src/Generated/Shared/Transfer/RestQuoteRequestsCartTransfer                   |
| RestQuoteRequestsTotals                 | class | created | src/Generated/Shared/Transfer/RestQuoteRequestsTotalsTransfer                 |
| RestQuoteRequestsDiscounts              | class | created | src/Generated/Shared/Transfer/RestQuoteRequestsDiscountsTransfer              |
| RestQuoteRequestsAddress                | class | created | src/Generated/Shared/Transfer/RestQuoteRequestsAddressTransfer                |
| RestQuoteRequestItem                    | class | created | src/Generated/Shared/Transfer/RestQuoteRequestItemTransfer                    |
| RestQuoteRequestsCalculations           | class | created | src/Generated/Shared/Transfer/RestQuoteRequestsCalculationsTransfer           |

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                     | SPECIFICATION                                                  | PREREQUISITES | NAMESPACE                                                     |
|--------------------------------------------|----------------------------------------------------------------|---------------|---------------------------------------------------------------|
| QuoteRequestAgentCancelResourceRoutePlugin | Registers the `agent-quote-request-cancel` resource.           |               | Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication |
| QuoteRequestAgentReviseResourceRoutePlugin | Registers the `agent-quote-request-revise` resource.           |               | Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication |
| QuoteRequestAgentSendResourceRoutePlugin   | Registers the `agent-quote-request-send-to-customer` resource. |               | Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication |
| QuoteRequestAgentsResourceRoutePlugin      | Registers the `agent-quote-requests` resource.                 |               | Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication |
| QuoteRequestCancelResourceRoutePlugin      | Registers the `quote-request-cancel` resource.                 |               | Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication      |
| QuoteRequestReviseResourceRoutePlugin      | Registers the `quote-request-revise` resource.                 |               | Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication      |
| QuoteRequestSendResourceRoutePlugin        | Registers the `quote-request-send-to-customer` resource.       |               | Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication      |
| QuoteRequestsResourceRoutePlugin           | Registers the `quote-requests` resource.                       |               | Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication      |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentCancelResourceRoutePlugin;
use Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentReviseResourceRoutePlugin;
use Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentSendResourceRoutePlugin;
use Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentsResourceRoutePlugin;
use Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestCancelResourceRoutePlugin;
use Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestReviseResourceRoutePlugin;
use Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestSendResourceRoutePlugin;
use Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new QuoteRequestsResourceRoutePlugin(),
            new QuoteRequestAgentsResourceRoutePlugin(),
            new QuoteRequestAgentCancelResourceRoutePlugin(),
            new QuoteRequestAgentReviseResourceRoutePlugin(),
            new QuoteRequestAgentSendResourceRoutePlugin(),
            new QuoteRequestCancelResourceRoutePlugin(),
            new QuoteRequestReviseResourceRoutePlugin(),
            new QuoteRequestSendResourceRoutePlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}
To verify that the `QuoteRequestsResourceRoutePlugin` resource route plugin is set up correctly, make sure that `http://glue.mysprykershop.com/quote-requests` endpoint is available for authenticated company user.

<details open>
<summary markdown='span'>Example</summary>

```json
{
  "data": [
    {
      "type": "quote-requests",
      "id": "DE--21-1",
      "attributes": {
        "quoteRequestReference": "DE--21-1",
        "status": "closed",
        "isLatestVersionVisible": true,
        "createdAt": "2021-12-03 23:45:50.000000",
        "validUntil": null,
        "versions": [],
        "shownVersion": {
          "version": 1,
          "versionReference": "DE--21-1-1",
          "createdAt": "2021-12-03 23:45:50.000000",
          "metadata": {
            "purchase_order_number": 228,
            "delivery_date": null,
            "note": "test"
          },
          "cart": {
            "priceMode": "GROSS_MODE",
            "store": "DE",
            "currency": "EUR",
            "totals": {
              "expenseTotal": 0,
              "discountTotal": 14341,
              "taxTotal": {
                "tax_rate": null,
                "amount": 0
              },
              "subtotal": 143412,
              "grandTotal": 129071,
              "priceToPay": 129071
            },
            "billingAddress": null,
            "items": [
              {
                "groupKey": "115_27295368",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "115_27295368",
                "quantity": 1,
                "abstractSku": "115",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              },
              {
                "groupKey": "118_29804739",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "118_29804739",
                "quantity": 1,
                "abstractSku": "118",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              },
              {
                "groupKey": "124_31623088",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "124_31623088",
                "quantity": 1,
                "abstractSku": "124",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              },
              {
                "groupKey": "126_26280142",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "126_26280142",
                "quantity": 1,
                "abstractSku": "126",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              },
              {
                "groupKey": "119_29804808",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "119_29804808",
                "quantity": 1,
                "abstractSku": "119",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              },
              {
                "groupKey": "128_29955336",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "128_29955336",
                "quantity": 1,
                "abstractSku": "128",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              },
              {
                "groupKey": "127_20723326",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "127_20723326",
                "quantity": 1,
                "abstractSku": "127",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              },
              {
                "groupKey": "122_22308524",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "122_22308524",
                "quantity": 1,
                "abstractSku": "122",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              },
              {
                "groupKey": "117_30585828",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "117_30585828",
                "quantity": 1,
                "abstractSku": "117",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              },
              {
                "groupKey": "129_30706500",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "129_30706500",
                "quantity": 1,
                "abstractSku": "129",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              },
              {
                "groupKey": "131_24872891",
                "productOfferReference": null,
                "merchantReference": null,
                "sku": "131_24872891",
                "quantity": 1,
                "abstractSku": "131",
                "amount": null,
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "calculations": null,
                "selectedProductOptions": []
              }
            ],
            "discounts": [],
            "shipments": []
          }
        }
      },
      "links": {
        "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
      }
    }
  ],
  "links": {
    "self": "http://glue.de.spryker.local/quote-requests"
  }
}
```
</details>

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that the `QuoteRequestCancelResourceRoutePlugin` resource route plugin is set up correctly, make sure that `http://glue.mysprykershop.com/quote-requests/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-request-cancel` endpoint is available for authenticated company user.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that the `QuoteRequestReviseResourceRoutePlugin` resource route plugin is set up correctly, make sure that `http://glue.mysprykershop.com/quote-requests/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-request-revise` endpoint is available for authenticated company user.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that the `QuoteRequestSendResourceRoutePlugin` resource route plugin is set up correctly, make sure that `http://glue.mysprykershop.com/quote-requests/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-request-send-to-customer` endpoint is available for authenticated company user.

{% endinfo_block %}

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that the `QuoteRequestAgentsResourceRoutePlugin` resource route plugin is set up correctly, make sure that `http://glue.mysprykershop.com/quote-request-agents` endpoint is available for authenticated agent.


<details open>
<summary markdown='span'>Example</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-03 23:45:50.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-03 23:45:50.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            }
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests"
    }
}
```

</details>

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that the `QuoteRequestAgentCancelResourceRoutePlugin` resource route plugin is set up correctly, make sure that `http://glue.mysprykershop.com/quote-request-agents/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-agent-request-cancel` endpoint is available for authenticated agent.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that the `QuoteRequestAgentReviseResourceRoutePlugin` resource route plugin is set up correctly, make sure that `http://glue.mysprykershop.com/quote-request-agents/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-agent-request-cancel` endpoint is available for authenticated agent.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that the `QuoteRequestAgentSendResourceRoutePlugin` resource route plugin is set up correctly, make sure that `http://glue.mysprykershop.com/quote-request-agents/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-agent-request-cancel` endpoint is available for authenticated company user.

{% endinfo_block %}
