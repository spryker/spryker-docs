---
title: Integrate Unzer
description: Learn how to integrate Unzer into your Spryker Cloud Commerce OS project.
last_updated: Aug 11, 2022
template: feature-integration-guide-template
redirect_from:
  - /docs/pbc/all/payment-service-providers/unzer/install-unzer/integrate-unzer.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/unzer/install-unzer/integrate-unzer.html
related:
- title: Install and configure Unzer
  link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/unzer/install-unzer/install-and-configure-unzer.html
---

# Unzer feature integration

This document describes how to integrate [Unzer](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/unzer/unzer.html) into your project.

## Install feature core

To integrate the Unzer, follow these steps.

### Prerequisites

[Install and configure Unzer](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/unzer/install-unzer/install-and-configure-unzer.html).

{% info_block infoBox "Exemplary content" %}

The following state machines are examples of the payment service provider flow.

{% endinfo_block %}

### 1) Set up the configuration

1. Add the Unzer OMS processes to the project on the project level or provide your own:

```php
$config[OmsConstants::PROCESS_LOCATION] = [
    ...
    APPLICATION_ROOT_DIR . '/vendor/spryker-eco/unzer/config/Zed/Oms',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
    ...
    'UnzerMarketplaceBankTransfer01',
    'UnzerMarketplaceSofort01',
    'UnzerMarketplaceCreditCard01',
    'UnzerCreditCard01',
    'UnzerBankTransfer01',
    'UnzerSofort01',
];

$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    ...
    UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_BANK_TRANSFER => 'UnzerMarketplaceBankTransfer01',
    UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_CREDIT_CARD => 'UnzerMarketplaceCreditCard01',
    UnzerConfig::PAYMENT_METHOD_KEY_CREDIT_CARD => 'UnzerCreditCard01',
    UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_SOFORT => 'UnzerMarketplaceSofort01',
    UnzerConfig::PAYMENT_METHOD_KEY_BANK_TRANSFER => 'UnzerBankTransfer01',
    UnzerConfig::PAYMENT_METHOD_KEY_SOFORT => 'UnzerSofort01',
];
```

2. Add the Unzer Zed navigation part:

**config/Zed/navigation.xml**

```xml
<config>
    ...
    <unzer-gui>
        <label>Unzer</label>
        <title>Unzer</title>
        <icon>offers</icon>
        <bundle>unzer-gui</bundle>
        <controller>list-unzer-credentials</controller>
        <action>index</action>
    </unzer-gui>
</config>
```

---

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                | TYPE  | EVENT   |
|--------------------------------|-------|---------|
| spy_payment_unzer              | table | created |
| spy_payment_unzer_order_item   | table | created |
| spy_payment_unzer_transaction  | table | created |
| spy_payment_unzer_notification | table | created |
| spy_payment_unzer_customer     | table | created |
| spy_unzer_credentials          | table | created |
| spy_unzer_credentials_store    | table | created |
| spy_unzer_credentials_store    | table | created |
| spy_payment_unzer_api_log      | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER                              | TYPE      | EVENT   | PATH                                                                        |
|---------------------------------------|-----------|---------|-----------------------------------------------------------------------------|
| UnzerAddress                          | class     | created | src/Generated/Shared/Transfer/UnzerAddressTransfer                          |
| UnzerApiAuthorizeRequest              | class     | created | src/Generated/Shared/Transfer/UnzerApiAuthorizeRequestTransfer              |
| UnzerApiAuthorizeResponse             | class     | created | src/Generated/Shared/Transfer/UnzerApiAuthorizeResponseTransfer             |
| UnzerApiChargeRequest                 | class     | created | src/Generated/Shared/Transfer/UnzerApiChargeRequestTransfer                 |
| UnzerApiChargeResponse                | class     | created | src/Generated/Shared/Transfer/UnzerApiChargeResponseTransfer                |
| UnzerApiCreateBasketRequest           | class     | created | src/Generated/Shared/Transfer/UnzerApiCreateBasketRequestTransfer           |
| UnzerApiCreateBasketResponse          | class     | created | src/Generated/Shared/Transfer/UnzerApiCreateBasketResponseTransfer          |
| UnzerApiCreateCustomerRequest         | class     | created | src/Generated/Shared/Transfer/UnzerApiCreateCustomerRequestTransfer         |
| UnzerApiCreateCustomerResponse        | class     | created | src/Generated/Shared/Transfer/UnzerApiCreateCustomerResponseTransfer        |
| UnzerApiCreateMetadataRequest         | class     | created | src/Generated/Shared/Transfer/UnzerApiCreateMetadataRequestTransfer         |
| UnzerApiCreateMetadataResponse        | class     | created | src/Generated/Shared/Transfer/UnzerApiCreateMetadataResponseTransfer        |
| UnzerApiCreatePaymentResourceRequest  | class     | created | src/Generated/Shared/Transfer/UnzerApiCreatePaymentResourceRequestTransfer  |
| UnzerApiCreatePaymentResourceResponse | class     | created | src/Generated/Shared/Transfer/UnzerApiCreatePaymentResourceResponseTransfer |
| UnzerApiDeleteWebhookRequest          | class     | created | src/Generated/Shared/Transfer/UnzerApiDeleteWebhookRequestTransfer          |
| UnzerApiDeleteWebhookResponse         | class     | created | src/Generated/Shared/Transfer/UnzerApiDeleteWebhookResponseTransfer         |
| UnzerApiErrorResponse                 | class     | created | src/Generated/Shared/Transfer/UnzerApiErrorResponseTransfer                 |
| UnzerApiGetPaymentMethodsRequest      | class     | created | src/Generated/Shared/Transfer/UnzerApiGetPaymentMethodsRequestTransfer      |
| UnzerApiGetPaymentMethodsResponse     | class     | created | src/Generated/Shared/Transfer/UnzerApiGetPaymentMethodsResponseTransfer     |
| UnzerApiGetPaymentRequest             | class     | created | src/Generated/Shared/Transfer/UnzerApiGetPaymentRequestTransfer             |
| UnzerApiGetPaymentResponse            | class     | created | src/Generated/Shared/Transfer/UnzerApiGetPaymentResponseTransfer            |
| UnzerApiGetWebhookRequest             | class     | created | src/Generated/Shared/Transfer/UnzerApiGetWebhookRequestTransfer             |
| UnzerApiGetWebhookResponse            | class     | created | src/Generated/Shared/Transfer/UnzerApiGetWebhookResponseTransfer            |
| UnzerApiMarketplaceAuthorizeRequest   | class     | created | src/Generated/Shared/Transfer/UnzerApiMarketplaceAuthorizeRequestTransfer   |
| UnzerApiMarketplaceAuthorizeResponse  | class     | created | src/Generated/Shared/Transfer/UnzerApiMarketplaceAuthorizeResponseTransfer  |
| UnzerApiMarketplaceRefundRequest      | class     | created | src/Generated/Shared/Transfer/UnzerApiMarketplaceRefundRequestTransfer      |
| UnzerApiMarketplaceRefundResponse     | class     | created | src/Generated/Shared/Transfer/UnzerApiMarketplaceRefundResponseTransfer     |
| UnzerApiMarketplaceTransaction        | class     | created | src/Generated/Shared/Transfer/UnzerApiMarketplaceTransactionTransfer        |
| UnzerApiMessage                       | class     | created | src/Generated/Shared/Transfer/UnzerApiMessageTransfer                       |
| UnzerApiPaymentMethod                 | class     | created | src/Generated/Shared/Transfer/UnzerApiPaymentMethodTransfer                 |
| UnzerApiPaymentTransaction            | class     | created | src/Generated/Shared/Transfer/UnzerApiPaymentTransactionTransfer            |
| UnzerApiRefundRequest                 | class     | created | src/Generated/Shared/Transfer/UnzerApiRefundRequestTransfer                 |
| UnzerApiRefundResponse                | class     | created | src/Generated/Shared/Transfer/UnzerApiRefundResponseTransfer                |
| UnzerApiRequest                       | class     | created | src/Generated/Shared/Transfer/UnzerApiRequestTransfer                       |
| UnzerApiResponse                      | class     | created | src/Generated/Shared/Transfer/UnzerApiResponseTransfer                      |
| UnzerApiResponseError                 | class     | created | src/Generated/Shared/Transfer/UnzerApiResponseErrorTransfer                 |
| UnzerApiSetWebhookRequest             | class     | created | src/Generated/Shared/Transfer/UnzerApiSetWebhookRequestTransfer             |
| UnzerApiSetWebhookResponse            | class     | created | src/Generated/Shared/Transfer/UnzerApiSetWebhookResponseTransfer            |
| UnzerApiUpdateCustomerRequest         | class     | created | src/Generated/Shared/Transfer/UnzerApiUpdateCustomerRequestTransfer         |
| UnzerApiUpdateCustomerResponse        | class     | created | src/Generated/Shared/Transfer/UnzerApiUpdateCustomerResponseTransfer        |
| UnzerBasket                           | class     | created | src/Generated/Shared/Transfer/UnzerBasketTransfer                           |
| UnzerBasketItem                       | class     | created | src/Generated/Shared/Transfer/UnzerBasketItemTransfer                       |
| UnzerCharge                           | class     | created | src/Generated/Shared/Transfer/UnzerChargeTransfer                           |
| UnzerCredentials                      | class     | created | src/Generated/Shared/Transfer/UnzerCredentialsTransfer                      |
| UnzerCredentialsCollection            | class     | created | src/Generated/Shared/Transfer/UnzerCredentialsCollectionTransfer            |
| UnzerCredentialsConditions            | class     | created | src/Generated/Shared/Transfer/UnzerCredentialsConditionsTransfer            |
| UnzerCredentialsCriteria              | class     | created | src/Generated/Shared/Transfer/UnzerCredentialsCriteriaTransfer              |
| UnzerCredentialsParameterMessage      | class     | created | src/Generated/Shared/Transfer/UnzerCredentialsParameterMessageTransfer      |
| UnzerCredentialsResponse              | class     | created | src/Generated/Shared/Transfer/UnzerCredentialsResponseTransfer              |
| UnzerCustomer                         | class     | created | src/Generated/Shared/Transfer/UnzerCustomerTransfer                         |
| UnzerGeolocation                      | class     | created | src/Generated/Shared/Transfer/UnzerGeolocationTransfer                      |
| UnzerKeypair                          | class     | created | src/Generated/Shared/Transfer/UnzerKeypairTransfer                          |
| UnzerMetadata                         | class     | created | src/Generated/Shared/Transfer/UnzerMetadataTransfer                         |
| UnzerNotification                     | class     | created | src/Generated/Shared/Transfer/UnzerNotificationTransfer                     |
| UnzerNotificationConfig               | class     | created | src/Generated/Shared/Transfer/UnzerNotificationConfigTransfer               |
| UnzerPayment                          | class     | created | src/Generated/Shared/Transfer/UnzerPaymentTransfer                          |
| UnzerPaymentResource                  | class     | created | src/Generated/Shared/Transfer/UnzerPaymentResourceTransfer                  |
| UnzerRefund                           | class     | created | src/Generated/Shared/Transfer/UnzerRefundTransfer                           |
| UnzerRefundItem                       | class     | created | src/Generated/Shared/Transfer/UnzerRefundItemTransfer                       |
| UnzerRefundItemCollection             | class     | created | src/Generated/Shared/Transfer/UnzerRefundItemCollectionTransfer             |
| UnzerTransaction                      | class     | created | src/Generated/Shared/Transfer/UnzerTransactionTransfer                      |
| UnzerWebhook                          | class     | created | src/Generated/Shared/Transfer/UnzerWebhookTransfer                          |
| Address                               | class     | created | src/Generated/Shared/Transfer/AddressTransfer                               |																									
| CheckoutResponse                      | class     | created | src/Generated/Shared/Transfer/CheckoutResponseTransfer                      |																									
| Currency                              | class     | created | src/Generated/Shared/Transfer/CurrencyTransfer                              |																									
| Customer                              | class     | created | src/Generated/Shared/Transfer/CustomerTransfer                              |																									
| Expense                               | class     | created | src/Generated/Shared/Transfer/ExpenseTransfer                               |																									
| Item                                  | class     | created | src/Generated/Shared/Transfer/ItemTransfer                                  |																									
| ItemCollection                        | class     | created | src/Generated/Shared/Transfer/ItemCollectionTransfer                        |																									
| Locale                                | class     | created | src/Generated/Shared/Transfer/LocaleTransfer                                |																									
| Merchant                              | class     | created | src/Generated/Shared/Transfer/MerchantTransfer                              |																									
| MerchantCollection                    | class     | created | src/Generated/Shared/Transfer/MerchantCollectionTransfer                    |																									
| MerchantCriteria                      | class     | created | src/Generated/Shared/Transfer/MerchantCriteriaTransfer                      |																									
| MerchantResponse                      | class     | created | src/Generated/Shared/Transfer/MerchantResponseTransfer                      |																									
| MerchantUnzerParticipant              | class     | created | src/Generated/Shared/Transfer/MerchantUnzerParticipantTransfer              |																									
| MerchantUnzerParticipantCollection    | class     | created | src/Generated/Shared/Transfer/MerchantUnzerParticipantCollectionTransfer    |																									
| MerchantUnzerParticipantConditions    | class     | created | src/Generated/Shared/Transfer/MerchantUnzerParticipantConditionsTransfer    |																									
| MerchantUnzerParticipantCriteria      | class     | created | src/Generated/Shared/Transfer/MerchantUnzerParticipantCriteriaTransfer      |																									
| Message                               | class     | created | src/Generated/Shared/Transfer/MessageTransfer                               |																									
| Order                                 | class     | created | src/Generated/Shared/Transfer/OrderTransfer                                 |																									
| OrderFilter                           | class     | created | src/Generated/Shared/Transfer/OrderFilterTransfer                           |																									
| OrderItemFilter                       | class     | created | src/Generated/Shared/Transfer/OrderItemFilterTransfer                       |																									
| Pagination                            | class     | created | src/Generated/Shared/Transfer/PaginationTransfer                            |																									
| Payment                               | class     | created | src/Generated/Shared/Transfer/PaymentTransfer                               |																									
| PaymentMethod                         | class     | created | src/Generated/Shared/Transfer/PaymentMethodTransfer                         |																									
| PaymentMethodCollectionRequest        | class     | created | src/Generated/Shared/Transfer/PaymentMethodCollectionRequestTransfer        |																									
| PaymentMethodCollectionResponse       | class     | created | src/Generated/Shared/Transfer/PaymentMethodCollectionResponseTransfer       |																									
| PaymentMethods                        | class     | created | src/Generated/Shared/Transfer/PaymentMethodsTransfer                        |																									
| PaymentProvider                       | class     | created | src/Generated/Shared/Transfer/PaymentProviderTransfer                       |																									
| PaymentProviderCollection             | class     | created | src/Generated/Shared/Transfer/PaymentProviderCollectionTransfer             |																									
| PaymentProviderCollectionRequest      | class     | created | src/Generated/Shared/Transfer/PaymentProviderCollectionRequestTransfer      |																									
| PaymentProviderCollectionResponse     | class     | created | src/Generated/Shared/Transfer/PaymentProviderCollectionResponseTransfer     |																									
| PaymentProviderConditions             | class     | created | src/Generated/Shared/Transfer/PaymentProviderConditionsTransfer             |																									
| PaymentProviderCriteria               | class     | created | src/Generated/Shared/Transfer/PaymentProviderCriteriaTransfer               |																									
| PaymentUnzer                          | class     | created | src/Generated/Shared/Transfer/PaymentUnzerTransfer                          |																									
| PaymentUnzerApiLog                    | class     | created | src/Generated/Shared/Transfer/PaymentUnzerApiLogTransfer                    |																									
| PaymentUnzerOrderItem                 | class     | created | src/Generated/Shared/Transfer/PaymentUnzerOrderItemTransfer                 |																									
| PaymentUnzerOrderItemCollection       | class     | created | src/Generated/Shared/Transfer/PaymentUnzerOrderItemCollectionTransfer       |																									
| PaymentUnzerTransaction               | class     | created | src/Generated/Shared/Transfer/PaymentUnzerTransactionTransfer               |																									
| PaymentUnzerTransactionCollection     | class     | created | src/Generated/Shared/Transfer/PaymentUnzerTransactionCollectionTransfer     |																									
| PaymentUnzerTransactionConditions     | class     | created | src/Generated/Shared/Transfer/PaymentUnzerTransactionConditionsTransfer     |																									
| PaymentUnzerTransactionCriteria       | class     | created | src/Generated/Shared/Transfer/PaymentUnzerTransactionCriteriaTransfer       |																									
| Quote                                 | class     | created | src/Generated/Shared/Transfer/QuoteTransfer                                 |																									
| Refund                                | class     | created | src/Generated/Shared/Transfer/RefundTransfer                                |																									
| RestUnzerNotificationAttributes       | class     | created | src/Generated/Shared/Transfer/RestUnzerNotificationAttributesTransfer       |																									
| SaveOrder                             | class     | created | src/Generated/Shared/Transfer/SaveOrderTransfer                             |																									
| Shipment                              | class     | created | src/Generated/Shared/Transfer/ShipmentTransfer                              |																									
| ShipmentMethod                        | class     | created | src/Generated/Shared/Transfer/ShipmentMethodTransfer                        |																									
| Sort                                  | class     | created | src/Generated/Shared/Transfer/SortTransfer                                  |																									
| Store                                 | class     | created | src/Generated/Shared/Transfer/StoreTransfer                                 |																									
| StoreRelation                         | class     | created | src/Generated/Shared/Transfer/StoreRelationTransfer                         |																									
| TabItem                               | class     | created | src/Generated/Shared/Transfer/TabItemTransfer                               |																									
| TabsView                              | class     | created | src/Generated/Shared/Transfer/TabsViewTransfer                              |																									
| TaxTotal                              | class     | created | src/Generated/Shared/Transfer/TaxTotalTransfer                              |																									
| Totals                                | class     | created | src/Generated/Shared/Transfer/TotalsTransfer                                |

{% endinfo_block %}

---

### 3) Add translations

Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```
oms.state.authorize-succeeded,Authorization succeeded,en_US
oms.state.authorize-succeeded,Authorization succeeded,de_DE
oms.state.payment-completed,Payment completed,en_US
oms.state.payment-completed,Payment completed,de_DE
oms.state.charge-pending,Charge pending,en_US
oms.state.charge-pending,Charge pending,de_DE
oms.state.authorize-pending,Authorization pending,en_US
oms.state.authorize-pending,Authorization pending,de_DE
UnzerMarketplaceCreditCard,Unzer Marketplace Credit Card,en_US
UnzerMarketplaceCreditCard,Unzer Marktplatz Kreditkarte,de_DE
UnzerCreditCard,Credit Card,en_US
UnzerCreditCard,Kreditkarte,de_DE
UnzerSofort,Unzer Sofort,en_US
UnzerSofort,Unzer Sofort,de_DE
UnzerBankTransfer,Unzer Bank Transfer,en_US
UnzerBankTransfer,Unzer Bank Transfer,de_DE
UnzerMarketpaceSofort,Unzer Marketplace Sofort,en_US
UnzerMarketplaceSofort,Unzer Marktplatz Sofort,de_DE
UnzerMarketplaceBankTransfer,Unzer Marketplace Bank Transfer,en_US
UnzerMarketplaceBankTransfer,Unzer Marktplatz Bank Transfer,de_DE
checkout.payment.provider.Unzer,Unzer,en_US
checkout.payment.provider.Unzer,Unzer,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

---

### 4) Add Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure that all labels and help tooltips in the Unzer forms have English and German translations.

{% endinfo_block %}

---

### 5) Set up behavior

Set up the following behaviors:

| PLUGIN                                      | SPECIFICATION                                                                                                                                                | PREREQUISITES | NAMESPACE                                               |
|---------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------|
| UnzerCredentialsCartOperationPostSavePlugin | Expands `QuoteTransfer` with `UnzerCredentialsTransfer` according to the added items.                                                                            | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Cart          |
| UnzerCheckoutDoSaveOrderPlugin              | Saves Unzer payment details to Persistence.                                                                                                                  | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Checkout      |
| UnzerCheckoutPostSavePlugin                 | Executes Unzer API calls and saves payment detailed info to Persistence.                                                                                    | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Checkout      |
| UnzerCheckoutPreSaveOrderPlugin             | Performs Unzer Create Customer, Unzer Update Customer, and Unzer Create Metadata API calls.                                                                   | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Checkout      |
| UnzerChargeCommandByOrderPlugin             | Executes Unzer API Charge request and saves Unzer payment details to Persistence.                                                                            | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Command   |
| UnzerRefundCommandByOrderPlugin             | Executes Unzer API Refund request and saves Unzer payment details to Persistence.                                                                            | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Command   |
| UnzerIsAuthorizeCanceledConditionPlugin     | Checks if Unzer Authorization is canceled.                                                                                                                   | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition |
| UnzerIsAuthorizeFailedConditionPlugin       | Checks if Unzer Authorization is failed.                                                                                                                     | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition |
| UnzerIsAuthorizePendingConditionPlugin      | Checks if Unzer Authorization is pending.                                                                                                                    | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition |
| UnzerIsAuthorizeSucceededConditionPlugin    | Checks if Unzer Authorization is successful.                                                                                                                 | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition |
| UnzerIsChargeFailedConditionPlugin          | Checks if Unzer Charge failed.                                                                                                                               | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition |
| UnzerIsPaymentChargebackConditionPlugin     | Checks if Unzer Payment is charged-back.                                                                                                                     | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition |
| UnzerIsPaymentCompletedConditionPlugin      | Checks if Unzer Payment is completed.                                                                                                                        | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition |
| UnzerEnabledPaymentMethodFilterPlugin       | Takes enabled payment methods from `QuoteTransfer` received from the Unzer local config and filters the given payment methods based on the enabled payment methods.  | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Payment       |
| UnzerMarketplacePaymentMethodFilterPlugin   | Filters available marketplace payment methods based on quote items.                                                                                          | None          | SprykerEco\Zed\Unzer\Communication\Plugin\Payment       |
| StoreRelationToggleFormTypePlugin           | Represents a store relation toggle form based on stores registered in the system.                                                                            | None          | Spryker\Zed\Store\Communication\Plugin\Form             |
| UnzerStepHandlerPlugin                      | Sets payment provider and payment method based on the payment selection.                                                                                         | None          | SprykerEco\Yves\Unzer\Plugin\StepEngine                 |
| UnzerCreditCardSubFormPlugin                | Creates the `CreditCard` subform.                                                                                                                                | None          | SprykerEco\Yves\Unzer\Plugin\StepEngine                 |
| UnzerBankTransferSubFormPlugin              | Creates the `BankTransfer` subform.                                                                                                                              | None          | SprykerEco\Yves\Unzer\Plugin\StepEngine                 |
| UnzerSofortSubFormPlugin                    | Creates the `Sofort` subform.                                                                                                                                    | None          | SprykerEco\Yves\Unzer\Plugin\StepEngine                 |
| UnzerMarketplaceBankTransferSubFormPlugin   | Creates the `Marketplace BankTransfer` subform data provider.                                                                                                    | None          | SprykerEco\Yves\Unzer\Plugin\StepEngine                 |
| UnzerMarketplaceCreditCardSubFormPlugin     | Creates the `MarketplaceCreditCard` subform.                                                                                                                     | None          | SprykerEco\Yves\Unzer\Plugin\StepEngine                 |
| UnzerMarketplaceSofortSubFormPlugin         | Creates the `Marketplace Sofort` subform.                                                                                                                        | None          | SprykerEco\Yves\Unzer\Plugin\StepEngine                 |

1.Add the Unzer plugin for `CartDepenencyProvider`:

<details>
<summary>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart;

...
use SprykerEco\Zed\Unzer\Communication\Plugin\Cart\UnzerCredentialsCartOperationPostSavePlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    ...
     /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationPostSavePluginInterface>
     */
    protected function getPostSavePlugins(Container $container): array
    {
        return [
            ...
            new UnzerCredentialsCartOperationPostSavePlugin(),
        ];
    }
    ...
}
```
</details>

2. Add checkout Unzer plugins for integrating into the checkout flow:

<details>
<summary>src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Zed\Checkout;

...
use SprykerEco\Zed\Unzer\Communication\Plugin\Checkout\UnzerCheckoutDoSaveOrderPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Checkout\UnzerCheckoutPostSavePlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Checkout\UnzerCheckoutPreSaveOrderPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    ...
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface>|array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface>
     */
    protected function getCheckoutOrderSavers(Container $container): array
    {
        return [
            ...
            new UnzerCheckoutDoSaveOrderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface>
     */
    protected function getCheckoutPostHooks(Container $container): array
    {
        return [
            ...
            new UnzerCheckoutPostSavePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveHookInterface>|array<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveInterface>|array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreSavePluginInterface>
     */
    protected function getCheckoutPreSaveHooks(Container $container): array
    {
        return [
            ...
            new UnzerCheckoutPreSaveOrderPlugin(),
        ];
    }

    ...
}
```
</details>

3. In `OmsDependencyProvider`, add the OMS command and condition plugins:

<details>
<summary>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms;

...
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Command\UnzerChargeCommandByOrderPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Command\UnzerRefundCommandByOrderPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsAuthorizeCanceledConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsAuthorizeFailedConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsAuthorizePendingConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsAuthorizeSucceededConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsChargeFailedConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsPaymentChargebackConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsPaymentCompletedConditionPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    ...
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            ...
            // ----- Unzer
            $commandCollection->add(new UnzerChargeCommandByOrderPlugin(), 'Unzer/Charge');
            $commandCollection->add(new UnzerRefundCommandByOrderPlugin(), 'Unzer/Refund');
            ...

            return $commandCollection;
        });
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container): Container
    {
        $container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            ...
            // ----- Unzer
            $conditionCollection->add(new UnzerIsAuthorizePendingConditionPlugin(), 'Unzer/IsAuthorizePending');
            $conditionCollection->add(new UnzerIsAuthorizeSucceededConditionPlugin(), 'Unzer/IsAuthorizeSucceeded');
            $conditionCollection->add(new UnzerIsAuthorizeFailedConditionPlugin(), 'Unzer/IsAuthorizeFailed');
            $conditionCollection->add(new UnzerIsAuthorizeCanceledConditionPlugin(), 'Unzer/IsAuthorizeCanceled');
            $conditionCollection->add(new UnzerIsPaymentCompletedConditionPlugin(), 'Unzer/IsPaymentCompleted');
            $conditionCollection->add(new UnzerIsChargeFailedConditionPlugin(), 'Unzer/IsChargeFailed');
            $conditionCollection->add(new UnzerIsPaymentChargebackConditionPlugin(), 'Unzer/IsPaymentChargeback');

            return $conditionCollection;
        });
    }
}
```
</details>

4. Add Unzer payment filter plugins:

<details>
<summary>src/Pyz/Zed/Payment/PaymentDependencyProvider.php</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Zed\Payment;

...
use SprykerEco\Zed\Unzer\Communication\Plugin\Payment\UnzerEnabledPaymentMethodFilterPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Payment\UnzerMarketplacePaymentMethodFilterPlugin;

class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PaymentExtension\Dependency\Plugin\PaymentMethodFilterPluginInterface>
     */
    protected function getPaymentMethodFilterPlugins(): array
    {
        return [
            ...
            new UnzerMarketplacePaymentMethodFilterPlugin(),
            new UnzerEnabledPaymentMethodFilterPlugin(),
        ];
    }
}

```

</details>

5. To use Unzer expense refund strategies, disable the default refund flow by overriding `RefundBusinessFactory`:

<details>
<summary>src/Pyz/Zed/Refund/Business/RefundBusinessFactory.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Refund\Business;

use Spryker\Zed\Refund\Business\RefundBusinessFactory as SprykerRefundBusinessFactory;
use Spryker\Zed\Refund\RefundDependencyProvider;

/**
 * @method \Spryker\Zed\Refund\Persistence\RefundQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Refund\RefundConfig getConfig()
 */
class RefundBusinessFactory extends SprykerRefundBusinessFactory
{
    /**
     * @return array<\Spryker\Zed\Refund\Dependency\Plugin\RefundCalculatorPluginInterface>
     */
    protected function getRefundCalculatorPlugins(): array
    {
        return [
            $this->getProvidedDependency(RefundDependencyProvider::PLUGIN_ITEM_REFUND_CALCULATOR),
        ];
    }
}

```

</details>

6. To use Unzer Gui, override `UnzerGuiDependencyProvider`:

<details>
<summary>src/Pyz/Zed/UnzerGui/UnzerGuiDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\UnzerGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;
use SprykerEco\Zed\UnzerGui\UnzerGuiDependencyProvider as SprykerUnzerGuiDependencyProvider;

class UnzerGuiDependencyProvider extends SprykerUnzerGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getStoreRelationFormTypePlugin(): FormTypeInterface
    {
        return new StoreRelationToggleFormTypePlugin();
    }
}

```

</details>

7. Add `StepHandler` plugins to `CheckoutPageDependencyProvider`:

<details>
<summary>src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage;

...
use SprykerEco\Shared\Unzer\UnzerConfig;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerBankTransferSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerCreditCardSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerMarketplaceBankTransferSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerMarketplaceCreditCardSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerMarketplaceSofortSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerSofortSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerStepHandlerPlugin;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendPaymentMethodHandler(Container $container): Container
    {
        $container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandler) {
            ...
            // --- Unzer
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_BANK_TRANSFER);
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_CREDIT_CARD);
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_SOFORT);
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_CREDIT_CARD);
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_SOFORT);
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_BANK_TRANSFER);

            return $paymentMethodHandler;
        });
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendSubFormPluginCollection(Container $container): Container
    {
        $container->extend(static::PAYMENT_SUB_FORMS, function (SubFormPluginCollection $paymentSubFormPluginCollection) {
            ...
            // --- Unzer
            $paymentSubFormPluginCollection->add(new UnzerMarketplaceBankTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new UnzerMarketplaceCreditCardSubFormPlugin());
            $paymentSubFormPluginCollection->add(new UnzerCreditCardSubFormPlugin());
            $paymentSubFormPluginCollection->add(new UnzerMarketplaceSofortSubFormPlugin());
            $paymentSubFormPluginCollection->add(new UnzerBankTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new UnzerSofortSubFormPlugin());

            return $paymentSubFormPluginCollection;
        });
    }
}
```

</details>

---

## Install feature frontend

Follow these steps to install the Unzer feature front end.

### 1) Set up behavior

Set up the following behaviors:

| PLUGIN                   | SPECIFICATION                                | PREREQUISITES | NAMESPACE                           |
|--------------------------|----------------------------------------------|---------------|-------------------------------------|
| UnzerRouteProviderPlugin | Adds Unzer module routes to RouteCollection. | None          | SprykerEco\Yves\Unzer\Plugin\Router |

<details>
<summary>src/Pyz/Yves/Router/RouterDependencyProvider.php</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\Router;

...
use SprykerEco\Yves\Unzer\Plugin\Router\UnzerRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        $routeProviders = [
            ...
            new UnzerRouteProviderPlugin(),
        ];
        ...

        return $routeProviders;
    }
}

```

</details>

### 2) Set up template

<details>
<summary>src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig</summary>

```twig
{% raw %}{%{% endraw %} define data = {
    ...
    customForms: {
        'Unzer/views/marketplace-credit-card/marketplace-credit-card': ['marketplace-credit-card', 'unzer'],
        'Unzer/views/credit-card/credit-card': ['credit-card', 'unzer'],
        'Unzer/views/marketplace-sofort': ['marketplace-sofort', 'unzer'],
        'Unzer/views/sofort': ['sofort', 'unzer'],
        'Unzer/views/marketplace-bank-transfer': ['marketplace-bank-transfer', 'unzer'],
        'Unzer/views/bank-transfer': ['bank-transfer', 'unzer'],
    },
} {% raw %}%}{% endraw %}
```

</details>

### 3) Enable Javascript and CSS changes

```bash
console frontend:yves:build
```
