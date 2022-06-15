---
title: PayOne - Authorization and Preauthorization Capture Flows
description: Payone module makes it possible for a project to choose which Payone flow it wants to implement- authorize or preauthorize + capture.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payone-authorization-and-preauthorization-capture-flows
originalArticleId: f890f6c2-8597-4b66-8df4-6f1de2776447
redirect_from:
  - /2021080/docs/payone-authorization-and-preauthorization-capture-flows
  - /2021080/docs/en/payone-authorization-and-preauthorization-capture-flows
  - /docs/payone-authorization-and-preauthorization-capture-flows
  - /docs/en/payone-authorization-and-preauthorization-capture-flows
related:
  - title: PayOne - Prepayment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-prepayment.html
  - title: PayOne - Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-invoice-payment.html
  - title: PayOne - Cash on Delivery
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/scos-integration/payone-cash-on-delivery.html
  - title: PayOne - Credit Card Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-credit-card-payment.html
  - title: PayOne - Security Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-security-invoice-payment.html
  - title: PayOne - Direct Debit Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-direct-debit-payment.html
---

Payone module makes it possible for a project to choose which Payone flow it wants to implement: authorize or preauthorize + capture.

## Authorization Example State Machine:

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/BS+Payone/payone-authorization-flow-example.png)

Authorization state machine example xml can be found in `vendor/<payone_module_folder>/src/config/Zed/Oms/PayoneInvoice.xml`

### Commands and Conditions Used in Authorization Flow:

 Commands:
  - `src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Command/AuthorizeCommandPlugin.php`

Conditions:
  - `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Condition/AuthorizationIsApprovedConditionPlugin.php`
  - `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Condition/AuthorizationIsErrorConditionPlugin.php`
  - `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Condition/AuthorizationIsRedirectConditionPlugin.php`

## Preauthorization-Capture Example State Machine:
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/BS+Payone/payone-preauthorization-capture-flow-example.png)

Preauthorization-capture state machine example XML can be found in `vendor/<payone_module_folder>/config/Zed/Oms/DirectDebit.xml`

### Commands and Conditions Used in Preauthorization-Capture Flow:

Commands:
  * `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Command/PreAuthorizeCommandPlugin.php`
  * `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Command/CaptureCommandPlugin.php`
  * `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Command/PreAuthorizaWithSettlementCommandPlugin.php`

Conditions:
  * `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Condition/PreAuthorizationIsApprovedConditionPlugin.php`
  * `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Condition/PreAuthorizationIsErrorConditionPlugin.php`
  * `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Condition/PreAuthorizationIsRedirectConditionPlugin.php`
  * `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Condition/CaptureIsApprovedConditionPlugin.php`
  * `vendor/<payone_module_folder>/src/SprykerEco/Zed/Payone/Communication/Plugin/Oms/Condition/CaptureIsErrorConditionPlugin.php`
