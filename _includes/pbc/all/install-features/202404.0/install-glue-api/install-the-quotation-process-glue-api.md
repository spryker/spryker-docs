

## Install feature API

Follow the steps below to install the Quotation Process feature API.

### Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME                | VERSION          | INSTALLATION GUIDE  |
|---------------------|------------------|--------------------|
| Spryker Core API    | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)       |
| Cart API            | {{page.version}} | [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)                       |
| Company Account API | {{page.version}} | [Install the Company account Glue API](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-company-account-glue-api.html) |
| Agent Assist API    | {{page.version}} | [Install the Agent Assist Glue API](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-agent-assist-glue-api.html)       |
| Quotation Process   | {{page.version}} | [Install the Quotation Process feature](/docs/pbc/all/request-for-quote/{{page.version}}/install-and-upgrade/install-features/install-the-quotation-process-feature.html)                         |


### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/quote-requests-rest-api:"^0.1.4" spryker/quote-request-agents-rest-api:"^0.3.0" --update-with-dependencies
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
| AgentAuthRestApiConfig::getAgentResources()       | Specifies resources which are accessible only for agents.        | Spryker\Glue\AgentAuthRestApi    |

**src/Pyz/Glue/CompanyUsersRestApi/CompanyUsersRestApiConfig.php**

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

**src/Pyz/Glue/AgentAuthRestApi/AgentAuthRestApiConfig.php**

```php
<?php

namespace Pyz\Glue\AgentAuthRestApi;

use Spryker\Glue\AgentAuthRestApi\AgentAuthRestApiConfig as SprykerAgentAuthRestApiConfig;
use Spryker\Glue\QuoteRequestAgentsRestApi\QuoteRequestAgentsRestApiConfig;

class AgentAuthRestApiConfig extends SprykerAgentAuthRestApiConfig
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return array<string>
     */
    public function getAgentResources(): array
    {
        return [
            QuoteRequestAgentsRestApiConfig::RESOURCE_AGENT_QUOTE_REQUESTS,
            QuoteRequestAgentsRestApiConfig::RESOURCE_AGENT_QUOTE_REQUEST_SEND_TO_CUSTOMER,
            QuoteRequestAgentsRestApiConfig::RESOURCE_AGENT_QUOTE_REQUEST_REVISE,
            QuoteRequestAgentsRestApiConfig::RESOURCE_AGENT_QUOTE_REQUEST_CANCEL,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Check that resources specified in `CompanyUsersRestApiConfig::COMPANY_USER_RESOURCES` are only accessible if authenticated customer has company user assigned.

Check that resources specified in `AgentAuthRestApiConfig::getAgentResources()` are only accessible with agent access token.

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

### 4) Add translations

Add translations as follows:

1. Append glossary for the feature:

```
quote_request.validation.error.is_not_applicable,Quote request is not applicable for the given quote.,en_US
quote_request.validation.error.is_not_applicable,Die Angebotsanfrage gilt nicht für das angegebene Angebot.,de_DE
quote_request.validation.error.cart_is_empty,The cart is empty.,en_US
quote_request.validation.error.cart_is_empty,Der Warenkorb ist leer.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN     | SPECIFICATION  | PREREQUISITES | NAMESPACE     |
|------------------|--------------------|---------------|-------------------------------|
| QuoteRequestAgentCancelResourceRoutePlugin      | Registers the `agent-quote-request-cancel` resource.   | Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication  |
| QuoteRequestAgentReviseResourceRoutePlugin     | Registers the `agent-quote-request-revise` resource.     | Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication    |
| QuoteRequestAgentSendResourceRoutePlugin    | Registers the `agent-quote-request-send-to-customer` resource.  | Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication    |
| QuoteRequestAgentsResourceRoutePlugin    | Registers the `agent-quote-requests` resource.    | Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication  |
| QuoteRequestCancelResourceRoutePlugin   | Registers the `quote-request-cancel` resource.  | Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication     |
| QuoteRequestReviseResourceRoutePlugin     | Registers the `quote-request-revise` resource.   | Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication  |
| QuoteRequestSendResourceRoutePlugin    | Registers the `quote-request-send-to-customer` resource.   | Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication   |
| QuoteRequestsResourceRoutePlugin    | Registers the `quote-requests` resource.                                                            |               | Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication    |
| CompanyUserByQuoteRequestResourceRelationshipPlugin    | Adds the `company-users` resource as relationship to the `quote-request` resource.    |               | Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication    |
| CompanyByQuoteRequestResourceRelationshipPlugin               | Adds the `companies` resource as relationship to the `quote-request` resource.    |               | Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication      |
| CompanyBusinessUnitByQuoteRequestResourceRelationshipPlugin   | Adds the `company-business-units` resource as relationship to the `quote-request` resource.   |               | Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\GlueApplication    |
| CustomerByQuoteRequestResourceRelationshipPlugin    | Adds the `customer` resource as a relationship to the `quote-request` resource.   |               | Spryker\Glue\CustomersRestApi\Plugin\GlueApplication     |
| ConcreteProductByQuoteRequestResourceRelationshipPlugin    | Adds the `concrete-products` resource as relationship to the `quote-request` resource.   |               | Spryker\Glue\ProductsRestApi\Plugin\GlueApplication    |
| ProductOptionsRestQuoteRequestAttributesExpanderPlugin        | Expands `RestQuoteRequestItemTransfer` with product options data.    |               | Spryker\Glue\ProductOptionsRestApi\Plugin\QuoteRequestsRestApi  |
| SalesUnitRestQuoteRequestAttributesExpanderPlugin   | Expands `RestQuoteRequestItemTransfers` with sales unit data.   |               | Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\QuoteRequestsRestApi |
| ConfiguredBundleRestQuoteRequestAttributesExpanderPlugin  | Expands `RestQuoteRequestItemTransfers` with configure bundle data and configure bundle items data. |               | Spryker\Glue\ConfigurableBundlesRestApi\Plugin\QuoteRequestsRestApi     |
| ShipmentsRestQuoteRequestAttributesExpanderPlugin   | Expands `RestQuoteRequestItemTransfer` with shipments data.                                         |               | Spryker\Glue\ShipmentsRestApi\Plugin\QuoteRequestsRestApi   |
| MerchantProductOffersRestQuoteRequestAttributesExpanderPlugin | Expands `RestQuoteRequestItemTransfer` with merchants data.     |               | Spryker\Glue\MerchantProductOffersRestApi\Plugin\QuoteRequestsRestApi   |
| DiscountsRestQuoteRequestAttributesExpanderPlugin  | Expands `RestQuoteRequestsAttributesTransfer` with discount data.                                   |               | Spryker\Glue\DiscountsRestApi\Plugin\QuoteRequestsRestApi    |

<details>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByQuoteRequestResourceRelationshipPlugin;
use Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\GlueApplication\CompanyBusinessUnitByQuoteRequestResourceRelationshipPlugin;
use Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUserByQuoteRequestResourceRelationshipPlugin;
use Spryker\Glue\CustomersRestApi\Plugin\GlueApplication\CustomerByQuoteRequestResourceRelationshipPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ConcreteProductByQuoteRequestResourceRelationshipPlugin;
use Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentCancelResourceRoutePlugin;
use Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentReviseResourceRoutePlugin;
use Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentSendResourceRoutePlugin;
use Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentsResourceRoutePlugin;
use Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestCancelResourceRoutePlugin;
use Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestReviseResourceRoutePlugin;
use Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestSendResourceRoutePlugin;
use Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestsResourceRoutePlugin;
use Spryker\Glue\QuoteRequestsRestApi\QuoteRequestsRestApiConfig;

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

    /**
     * {@inheritDoc}
     *
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            QuoteRequestsRestApiConfig::RESOURCE_QUOTE_REQUESTS,
            new CompanyUserByQuoteRequestResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            QuoteRequestsRestApiConfig::RESOURCE_QUOTE_REQUESTS,
            new CompanyByQuoteRequestResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            QuoteRequestsRestApiConfig::RESOURCE_QUOTE_REQUESTS,
            new CompanyBusinessUnitByQuoteRequestResourceRelationshipPlugin(),
        );
        $resourceRelationshipCollection->addRelationship(
            QuoteRequestsRestApiConfig::RESOURCE_QUOTE_REQUESTS,
            new CustomerByQuoteRequestResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            QuoteRequestsRestApiConfig::RESOURCE_QUOTE_REQUESTS,
            new ConcreteProductByQuoteRequestResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```
</details>

**src/Pyz/Glue/QuoteRequestsRestApi/QuoteRequestsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\QuoteRequestsRestApi;

use Spryker\Glue\ConfigurableBundlesRestApi\Plugin\QuoteRequestsRestApi\ConfiguredBundleRestQuoteRequestAttributesExpanderPlugin;
use Spryker\Glue\DiscountsRestApi\Plugin\QuoteRequestsRestApi\DiscountsRestQuoteRequestAttributesExpanderPlugin;
use Spryker\Glue\MerchantProductOffersRestApi\Plugin\QuoteRequestsRestApi\MerchantProductOffersRestQuoteRequestAttributesExpanderPlugin;
use Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\QuoteRequestsRestApi\SalesUnitRestQuoteRequestAttributesExpanderPlugin;
use Spryker\Glue\ProductOptionsRestApi\Plugin\QuoteRequestsRestApi\ProductOptionsRestQuoteRequestAttributesExpanderPlugin;
use Spryker\Glue\QuoteRequestsRestApi\QuoteRequestsRestApiDependencyProvider as SprykerQuoteRequestsRestApiDependencyProvider;
use Spryker\Glue\ShipmentsRestApi\Plugin\QuoteRequestsRestApi\ShipmentsRestQuoteRequestAttributesExpanderPlugin;

class QuoteRequestsRestApiDependencyProvider extends SprykerQuoteRequestsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\QuoteRequestsRestApiExtension\Dependency\Plugin\RestQuoteRequestAttributesExpanderPluginInterface[]
     */
    protected function getRestQuoteRequestAttributesExpanderPlugins(): array
    {
        return [
            new ProductOptionsRestQuoteRequestAttributesExpanderPlugin(),
            new SalesUnitRestQuoteRequestAttributesExpanderPlugin(),
            new ConfiguredBundleRestQuoteRequestAttributesExpanderPlugin(),
            new ShipmentsRestQuoteRequestAttributesExpanderPlugin(),
            new MerchantProductOffersRestQuoteRequestAttributesExpanderPlugin(),
            new DiscountsRestQuoteRequestAttributesExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

* To verify that the `QuoteRequestsResourceRoutePlugin` resource route plugin and `CompanyUserByQuoteRequestResourceRelationshipPlugin`, `CompanyByQuoteRequestResourceRelationshipPlugin`, `CompanyBusinessUnitByQuoteRequestResourceRelationshipPlugin`, `CustomerByQuoteRequestResourceRelationshipPlugin` and `ConcreteProductByQuoteRequestResourceRelationshipPlugin` relationship plugins are set up correctly, make sure that the `https://glue.mysprykershop.com/quote-requests?include=company-users,companies,company-business-units,customer,concrete-products` endpoint is available for authenticated company user.

* To verify that `ProductOptionsRestQuoteRequestAttributesExpanderPlugin`, `SalesUnitRestQuoteRequestAttributesExpanderPlugin`, `ConfiguredBundleRestQuoteRequestAttributesExpanderPlugin`, `ShipmentsRestQuoteRequestAttributesExpanderPlugin`, `MerchantProductOffersRestQuoteRequestAttributesExpanderPlugin` and `DiscountsRestQuoteRequestAttributesExpanderPlugin` plugins are set up correctly, make sure that the following properties are present in the response body and contain correct data:
  - data[].attributes.shownVersion.cart.items[].productOfferReference
  - data[].attributes.shownVersion.cart.items[].merchantReference
  - data[].attributes.shownVersion.cart.items[].configuredBundle
  - data[].attributes.shownVersion.cart.items[].configuredBundleItem
  - data[].attributes.shownVersion.cart.items[].salesUnit
  - data[].attributes.shownVersion.cart.items[].selectedProductOptions
  - data[].attributes.shownVersion.cart.items[].selectedProductOptions
  - data[].attributes.shownVersion.cart.discounts
  - data[].attributes.shownVersion.cart.shipments

  <details>
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
        },
        "relationships": {
          "company-users": {
            "data": [
              {
                "type": "company-users",
                "id": "ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac"
              }
            ]
          },
          "companies": {
            "data": [
              {
                "type": "companies",
                "id": "62de4ab6-b768-5c21-8835-455d9f341625"
              }
            ]
          },
          "company-business-units": {
            "data": [
              {
                "type": "company-business-units",
                "id": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
              }
            ]
          },
          "concrete-products": {
            "data": [
              {
                "type": "concrete-products",
                "id": "115_27295368"
              },
              {
                "type": "concrete-products",
                "id": "118_29804739"
              },
              {
                "type": "concrete-products",
                "id": "124_31623088"
              },
              {
                "type": "concrete-products",
                "id": "126_26280142"
              },
              {
                "type": "concrete-products",
                "id": "119_29804808"
              },
              {
                "type": "concrete-products",
                "id": "128_29955336"
              },
              {
                "type": "concrete-products",
                "id": "127_20723326"
              },
              {
                "type": "concrete-products",
                "id": "122_22308524"
              },
              {
                "type": "concrete-products",
                "id": "117_30585828"
              },
              {
                "type": "concrete-products",
                "id": "129_30706500"
              },
              {
                "type": "concrete-products",
                "id": "131_24872891"
              }
            ]
          }
        }
      }
    ],
    "links": {
      "self": "http://glue.de.spryker.local/quote-requests"
    },
    "included": [
      {
        "type": "companies",
        "id": "62de4ab6-b768-5c21-8835-455d9f341625",
        "attributes": {
          "isActive": true,
          "name": "Spryker Systems GmbH",
          "status": "approved"
        },
        "links": {
          "self": "http://glue.de.spryker.local/companies/62de4ab6-b768-5c21-8835-455d9f341625"
        }
      },
      {
        "type": "company-business-units",
        "id": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2",
        "attributes": {
          "defaultBillingAddress": null,
          "name": "Spryker Systems HR department",
          "email": "HR@spryker.com",
          "phone": "4902890031",
          "externalUrl": "",
          "bic": "",
          "iban": ""
        },
        "links": {
          "self": "http://glue.de.spryker.local/company-business-units/5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
        }
      },
      {
        "type": "company-users",
        "id": "ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac",
        "attributes": {
          "isActive": true,
          "isDefault": false
        },
        "links": {
          "self": "http://glue.de.spryker.local/company-users/ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac"
        },
        "relationships": {
          "companies": {
            "data": [
              {
                "type": "companies",
                "id": "62de4ab6-b768-5c21-8835-455d9f341625"
              }
            ]
          },
          "company-business-units": {
            "data": [
              {
                "type": "company-business-units",
                "id": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
              }
            ]
          }
        }
      },
      {
        "type": "concrete-products",
        "id": "115_27295368",
        "attributes": {
          "sku": "115_27295368",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "115",
          "name": "DELL OptiPlex 3020",
          "description": "Great performance. Outstanding value Get the job done with business-ready desktops offering superb value with strong performance, exceptional security and easy serviceability. Stop advanced threats and zero-day attacks with Dell Data Protection | Protected Workspace — a proactive, real-time solution for malware protection. Ensure authorized access through multifactor, single sign-on (SSO) and preboot authentication with Dell Data Protection | Security Tools. Streamline administration with integration into Dell KACE appliances, Microsoft System Center and industry-standard tools. Deploy with flexibility through multiple chassis options. Select the small form factor chassis, optimized for constrained workspaces, or the expandable mini tower with support for up to four PCIe cards.",
          "attributes": {
            "processor_cache": "3 MB",
            "bus_type": "DMI",
            "processor_threads": "2",
            "tcase": "72 °",
            "brand": "DELL",
            "processor_frequency": "3.2 GHz"
          },
          "superAttributesDefinition": [
            "processor_cache",
            "processor_frequency"
          ],
          "metaTitle": "DELL OptiPlex 3020",
          "metaKeywords": "DELL,Tax Exempt",
          "metaDescription": "Great performance. Outstanding value Get the job done with business-ready desktops offering superb value with strong performance, exceptional security and ",
          "attributeNames": {
            "processor_cache": "Processor cache type",
            "bus_type": "Bus type",
            "processor_threads": "Processor Threads",
            "tcase": "Tcase",
            "brand": "Brand",
            "processor_frequency": "Processor frequency"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/115_27295368"
        }
      },
      {
        "type": "concrete-products",
        "id": "118_29804739",
        "attributes": {
          "sku": "118_29804739",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "118",
          "name": "Fujitsu ESPRIMO E420",
          "description": "Energy Efficiency As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficiency of our products. The Fujitsu ESPRIMO E420 features proven technology regarding Intel® chipset and processor and an 85% energy efficient power supply. Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to minimize risk to end users and to the environment. This strategy is captured in Environmental Guideline FTS03230 and forms the basis on which all Fujitsu's products are designed. Especially for Fujitsu ESPRIMO PCs this means that all used printed circuit boards are halogen free. Furthermore they are compliant with several certificates awarding environmental conscience such as ENERGY STAR® and EPEAT.",
          "attributes": {
            "processor_cache": "6 MB",
            "bus_type": "DMI",
            "processor_model": "i5-4590",
            "product_type": "PC",
            "brand": "Fujitsu",
            "color": "Black"
          },
          "superAttributesDefinition": [
            "processor_cache",
            "color"
          ],
          "metaTitle": "Fujitsu ESPRIMO E420",
          "metaKeywords": "Fujitsu,Tax Exempt",
          "metaDescription": "Energy Efficiency As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficien",
          "attributeNames": {
            "processor_cache": "Processor cache type",
            "bus_type": "Bus type",
            "processor_model": "Processor model",
            "product_type": "Product type",
            "brand": "Brand",
            "color": "Color"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/118_29804739"
        }
      },
      {
        "type": "concrete-products",
        "id": "124_31623088",
        "attributes": {
          "sku": "124_31623088",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "124",
          "name": "HP ProDesk 400 G3",
          "description": "New powerful processors Give your business the strong foundation it needs for growth with the affordable and reliable HP ProDesk 400 SFF. Designed with essential security and manageability features, the HP ProDesk 400 helps keep your business growing. New 6th Gen Intel® Core™ processors bring powerful processing with Intel® HD 530 Graphics. Available DDR4 memory helps meet the demands of today’s businesses. HP ProDesks are rigorously tested to help ensure reliability. During the HP Total Test Process, PCs experience 120,000 hours of performance trials to help get you through your business day. The HP ProDesk 400 SFF helps affordably build a solid IT infrastructure for your growing business and fits in smaller workspaces for easy deployment.",
          "attributes": {
            "processor_codename": "Skylake",
            "bus_type": "DMI3",
            "processor_threads": "4",
            "processor_cores": "2",
            "brand": "HP",
            "total_storage_capacity": "128 GB"
          },
          "superAttributesDefinition": [
            "total_storage_capacity"
          ],
          "metaTitle": "HP ProDesk 400 G3",
          "metaKeywords": "HP,Tax Exempt",
          "metaDescription": "New powerful processors Give your business the strong foundation it needs for growth with the affordable and reliable HP ProDesk 400 SFF. Designed with ess",
          "attributeNames": {
            "processor_codename": "Processor codename",
            "bus_type": "Bus type",
            "processor_threads": "Processor Threads",
            "processor_cores": "Processor cores",
            "brand": "Brand",
            "total_storage_capacity": "Total storage capacity"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/124_31623088"
        }
      },
      {
        "type": "concrete-products",
        "id": "126_26280142",
        "attributes": {
          "sku": "126_26280142",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "126",
          "name": "HP Z 440",
          "description": "Get the job done fast Cross items off your to-do list fast. Achieve massive computational performance with a single processor personal workstation delivering support for up to 8 cores of processing power. Add in powerful graphics and performance features like optional Thunderbolt™ 23, HP Z Turbo Drive4, and HP Remote Graphics Software, and you get a world-class workstation experience that never slows you down.    Take your business to the next level of performance, expandability, and no compromise reliability in one complete package. Featuring a perfect mix of HP Z DNA in a performance workstation package with up to 8 discrete processor cores, up to 128 GB of RAM, and multiple storage and PCIe configuration options. Protect your investment and make downtime a thing of the past. Get no-compromise reliability and a standard 3/3/3 limited warranty from the HP Z440 Workstation.",
          "attributes": {
            "fsb_parity": "no",
            "bus_type": "QPI",
            "processor_cores": "8",
            "processor_threads": "16",
            "brand": "HP",
            "processor_frequency": "2.8 GHz"
          },
          "superAttributesDefinition": [
            "processor_frequency"
          ],
          "metaTitle": "HP Z 440",
          "metaKeywords": "HP,Tax Exempt",
          "metaDescription": "Get the job done fast Cross items off your to-do list fast. Achieve massive computational performance with a single processor personal workstation deliveri",
          "attributeNames": {
            "fsb_parity": "FSB Parity",
            "bus_type": "Bus type",
            "processor_cores": "Processor cores",
            "processor_threads": "Processor Threads",
            "brand": "Brand",
            "processor_frequency": "Processor frequency"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/126_26280142"
        }
      },
      {
        "type": "concrete-products",
        "id": "119_29804808",
        "attributes": {
          "sku": "119_29804808",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "119",
          "name": "Fujitsu ESPRIMO E920",
          "description": "Green IT Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to minimize risk to end users and to the environment. This strategy is captured in Environmental Guideline FTS03230 and forms the basis on which all Fujitsu's products are designed. Especially for Fujitsu ESPRIMO PCs this means that all used printed circuit boards are halogen free. Furthermore they are compliant with several certificates awarding environmental conscience such as ENERGY STAR® and EPEAT. As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficiency of our products. The Fujitsu ESPRIMO E920 features latest technology regarding Intel® chipset and processor and optional an up to 94% energy efficient power supply. Furthermore it delivers enhanced power management settings and optional 0-Watt power consumption in off-mode.",
          "attributes": {
            "internal_memory": "32 GB",
            "intel_smart_cache": "yes",
            "product_type": "PC",
            "processor_cache": "6 MB",
            "brand": "Fujitsu",
            "color": "Silver"
          },
          "superAttributesDefinition": [
            "internal_memory",
            "processor_cache",
            "color"
          ],
          "metaTitle": "Fujitsu ESPRIMO E920",
          "metaKeywords": "Fujitsu,Tax Exempt",
          "metaDescription": "Green IT Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to min",
          "attributeNames": {
            "internal_memory": "Max internal memory",
            "intel_smart_cache": "Intel Smart Cache",
            "product_type": "Product type",
            "processor_cache": "Processor cache type",
            "brand": "Brand",
            "color": "Color"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/119_29804808"
        }
      },
      {
        "type": "concrete-products",
        "id": "128_29955336",
        "attributes": {
          "sku": "128_29955336",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "128",
          "name": "Lenovo ThinkCentre E73",
          "description": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep your business-critical information safe through USB port disablement and the password-protected BIOS and HDD. You can also safeguard your hardware by physically securing your mouse and keyboard, while the Kensington slot enables you to lock down your E73. Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology.",
          "attributes": {
            "processor_threads": "8",
            "pci_express_slots_version": "3",
            "internal_memory": "8 GB",
            "stepping": "C0",
            "brand": "Lenovo",
            "processor_frequency": "3.2 GHz"
          },
          "superAttributesDefinition": [
            "internal_memory",
            "processor_frequency"
          ],
          "metaTitle": "Lenovo ThinkCentre E73",
          "metaKeywords": "Lenovo,Tax Exempt",
          "metaDescription": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep",
          "attributeNames": {
            "processor_threads": "Processor Threads",
            "pci_express_slots_version": "PCI Express slots version",
            "internal_memory": "Max internal memory",
            "stepping": "Stepping",
            "brand": "Brand",
            "processor_frequency": "Processor frequency"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/128_29955336"
        }
      },
      {
        "type": "concrete-products",
        "id": "127_20723326",
        "attributes": {
          "sku": "127_20723326",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "127",
          "name": "HP Z 620",
          "description": "Big Possibilities. Compact Form Factor. More versatile than ever before. With up to 16 discrete processor cores, the HP Z620 Workstation packs a ton of computing and visualization power into a quiet, compact footprint. This dual-socket system helps you boost productivity with next-generation Intel® Xeon® processors and support for up to 8 displays. Get massive system performance with a small footprint. The HP Z620 features the next evolution in processor technology and system architecture, setting the standard for versatility with support for a single Intel E5-1600 Series Xeon® processor or dual Intel E5-2600 Series Xeon® processors. With 800W 90% efficient power supply and support for up to 8 displays, the HP Z620 gives you the freedom of doing and seeing more.",
          "attributes": {
            "processor_frequency": "2.1 GHz",
            "processor_cache": "15 MB",
            "processor_threads": "12",
            "fsb_parity": "no",
            "brand": "HP",
            "total_storage_capacity": "1000 GB"
          },
          "superAttributesDefinition": [
            "processor_frequency",
            "processor_cache",
            "total_storage_capacity"
          ],
          "metaTitle": "HP Z 620",
          "metaKeywords": "HP,Tax Exempt",
          "metaDescription": "Big Possibilities. Compact Form Factor. More versatile than ever before. With up to 16 discrete processor cores, the HP Z620 Workstation packs a ton of com",
          "attributeNames": {
            "processor_frequency": "Processor frequency",
            "processor_cache": "Processor cache type",
            "processor_threads": "Processor Threads",
            "fsb_parity": "FSB Parity",
            "brand": "Brand",
            "total_storage_capacity": "Total storage capacity"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/127_20723326"
        }
      },
      {
        "type": "concrete-products",
        "id": "122_22308524",
        "attributes": {
          "sku": "122_22308524",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "122",
          "name": "HP EliteDesk 800 G1 Mini",
          "description": "Big power. Space saving design. Smaller than some desk phones, this Desktop Mini can fit almost anywhere vertically or horizontally. The clean, easily serviceable design with integrated wireless antenna allows flexible deployment options1 to help optimize the workspace. Keep productivity high and downtime low with HP BIOSphere firmware-level automation. Your PCs have extra protection thanks to automatic updates and security checks. Enjoy customization that allows your PC to evolve with your business.",
          "attributes": {
            "processor_cores": "2",
            "processor_codename": "Haswell",
            "processor_threads": "4",
            "bus_type": "DMI",
            "brand": "HP",
            "processor_frequency": "2.9 GHz"
          },
          "superAttributesDefinition": [
            "processor_frequency"
          ],
          "metaTitle": "HP EliteDesk 800 G1 Mini",
          "metaKeywords": "HP,Tax Exempt",
          "metaDescription": "Big power. Space saving design. Smaller than some desk phones, this Desktop Mini can fit almost anywhere vertically or horizontally. The clean, easily serv",
          "attributeNames": {
            "processor_cores": "Processor cores",
            "processor_codename": "Processor codename",
            "processor_threads": "Processor Threads",
            "bus_type": "Bus type",
            "brand": "Brand",
            "processor_frequency": "Processor frequency"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/122_22308524"
        }
      },
      {
        "type": "concrete-products",
        "id": "117_30585828",
        "attributes": {
          "sku": "117_30585828",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "117",
          "name": "Fujitsu ESPRIMO D556",
          "description": "The FUJITSU ESPRIMO  Desktop provides high-quality computing for your daily office tasks. It supports attractive price points and delivers the continuity needed for daily operations. Your valuable business data is protected by the latest TPM controller and the Erasedisk option. To meet your specific hardware needs it can be either individually configured or customized.",
          "attributes": {
            "processor_frequency": "3.7 GHz",
            "processor_cores": "2",
            "bus_type": "DMI3",
            "tcase": "65 °",
            "brand": "Fujitsu",
            "internal_memory": "4 GB"
          },
          "superAttributesDefinition": [
            "processor_frequency",
            "internal_memory"
          ],
          "metaTitle": "Fujitsu ESPRIMO D556",
          "metaKeywords": "Fujitsu,Tax Exempt",
          "metaDescription": "The FUJITSU ESPRIMO  Desktop provides high-quality computing for your daily office tasks. It supports attractive price points and delivers the continuity n",
          "attributeNames": {
            "processor_frequency": "Processor frequency",
            "processor_cores": "Processor cores",
            "bus_type": "Bus type",
            "tcase": "Tcase",
            "brand": "Brand",
            "internal_memory": "Max internal memory"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/117_30585828"
        }
      },
      {
        "type": "concrete-products",
        "id": "129_30706500",
        "attributes": {
          "sku": "129_30706500",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "129",
          "name": "Lenovo ThinkCenter E73",
          "description": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology. With 10% more processing power, 4th generation Intel® Core™ processors deliver the performance to increase business productivity for your business. They can also guard against identity theft and ensure safe access to your network with built-in security features.",
          "attributes": {
            "processor_threads": "8",
            "processor_cores": "4",
            "processor_codename": "Haswell",
            "pci_express_slots_version": "3",
            "brand": "Lenovo",
            "processor_frequency": "3.2 GHz"
          },
          "superAttributesDefinition": [
            "processor_frequency"
          ],
          "metaTitle": "Lenovo ThinkCenter E73",
          "metaKeywords": "Lenovo,Tax Exempt",
          "metaDescription": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is",
          "attributeNames": {
            "processor_threads": "Processor Threads",
            "processor_cores": "Processor cores",
            "processor_codename": "Processor codename",
            "pci_express_slots_version": "PCI Express slots version",
            "brand": "Brand",
            "processor_frequency": "Processor frequency"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/129_30706500"
        }
      },
      {
        "type": "concrete-products",
        "id": "131_24872891",
        "attributes": {
          "sku": "131_24872891",
          "isDiscontinued": false,
          "discontinuedNote": null,
          "averageRating": null,
          "reviewCount": 0,
          "productAbstractSku": "131",
          "name": "Lenovo ThinkStation P900",
          "description": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on — and a direct cooling air baffle directs fresh air into the CPU and memory. ThinkStation P900 delivers new technologies and design to keep your workstation cool and quiet. The innovative Flex Module lets you customize I/O ports, so you add only what you need. Using the 5.25\" bays, you can mix and match components including an ultraslim ODD, 29-in-1 media card reader, Firewire, and eSATA. The Flex Connector is a mezzanine card that fits into the motherboard and allows for expanded storage and I/O, without sacrificing the use of rear PCI. It supports SATA/SAS/PCIe advanced RAID solution. ThinkStation P900 includes two available connectors (enabled with each CPU).",
          "attributes": {
            "processor_frequency": "2.4 GHz",
            "processor_cores": "6",
            "processor_threads": "12",
            "stepping": "R2",
            "brand": "Lenovo",
            "color": "Silver"
          },
          "superAttributesDefinition": [
            "processor_frequency",
            "color"
          ],
          "metaTitle": "Lenovo ThinkStation P900",
          "metaKeywords": "Lenovo,Tax Exempt",
          "metaDescription": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on — an",
          "attributeNames": {
            "processor_frequency": "Processor frequency",
            "processor_cores": "Processor cores",
            "processor_threads": "Processor Threads",
            "stepping": "Stepping",
            "brand": "Brand",
            "color": "Color"
          },
          "productConfigurationInstance": null
        },
        "links": {
          "self": "http://glue.de.spryker.local/concrete-products/131_24872891"
        }
      }
    ]
  }
  ```
  </details>


* To verify that the `QuoteRequestCancelResourceRoutePlugin` resource route plugin is set up correctly, make sure that the `https://glue.mysprykershop.com/quote-requests/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-request-cancel` endpoint is available for an authenticated company user.

* To verify that the `QuoteRequestReviseResourceRoutePlugin` resource route plugin is set up correctly, make sure that the `https://glue.mysprykershop.com/quote-requests/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-request-revise` endpoint is available for an authenticated company user.

* To verify that the `QuoteRequestSendResourceRoutePlugin` resource route plugin is set up correctly, make sure that the `https://glue.mysprykershop.com/quote-requests/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-request-send-to-customer` endpoint is available for an authenticated company user.

* To verify that the `QuoteRequestAgentsResourceRoutePlugin` resource route plugin is set up correctly, make sure that the `https://glue.mysprykershop.com/quote-request-agents` endpoint is available for authenticated agent.

  <details>
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

* To verify that the `QuoteRequestAgentCancelResourceRoutePlugin` resource route plugin is set up correctly, make sure that the `https://glue.mysprykershop.com/quote-request-agents/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-agent-request-cancel` endpoint is available for an authenticated agent.

* To verify that the `QuoteRequestAgentReviseResourceRoutePlugin` resource route plugin is set up correctly, make sure that the `https://glue.mysprykershop.com/quote-request-agents/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-agent-request-cancel` endpoint is available for an authenticated agent.

* To verify that the `QuoteRequestAgentSendResourceRoutePlugin` resource route plugin is set up correctly, make sure that the `https://glue.mysprykershop.com/quote-request-agents/{% raw %}{{{% endraw %}quote_request_id{% raw %}}}{% endraw %}/quote-agent-request-cancel` endpoint is available for an authenticated company user.

{% endinfo_block %}
