---
title: PayOne - Online Transfer Payment
originalLink: https://documentation.spryker.com/2021080/docs/payone-online-trans
redirect_from:
  - /2021080/docs/payone-online-trans
  - /2021080/docs/en/payone-online-trans
---

Supported online banking service providers are SofortBanking, Giropay, Electronic Payment Standard (Eps), PostFinance Card, PostFinance E-Finance, iDEAL, Przelewy24, and Bancontact. They are enabled  through the integration with Payone, using the online transfer payment type.

Each payment method is limited to certain set of store countries:

* SofortBanking: DE, AT, CH, NL
* Giropay: DE
* Electronic Payment Standard (Eps): AT
* PostFinance Card, PostFinance E-Finance: CH
* iDEAL: NL
* Bancontact: BE

The authorization of the transaction is done through a redirect and the customer has to execute the payment authorization. After the customer confirms the payment, their account is charged directly.

## Front-end Integration
To adjust the frontend appearance, provide the following templates inside your theme directory:

* `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/eps_online_transfer.twig`
* `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/giropay_online_transfer.twig`
* `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/ideal_online_transfer.twig`
* `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/instant_online_transfer.twig`
* `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/postfinance_card_online_transfer.twig`
* `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/postfinance_efinance_online_transfer.twig`
* `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/przelewy24_online_transfer.twig`
* `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/bancontact_online_transfer.twig`

## State Machine Integration
Payone module provides a demo state machine for Online Transfer payment method which implements Authorization flow. Preauthorization/Capture is not possible for Online Transfer payment.

To enable the demo state machine, extend the configuration with following values:
```php
<?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 PayoneConfig::PAYMENT_METHOD_EPS_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
 PayoneConfig::PAYMENT_METHOD_INSTANT_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
 PayoneConfig::PAYMENT_METHOD_GIROPAY_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
 PayoneConfig::PAYMENT_METHOD_IDEAL_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
 PayoneConfig::PAYMENT_METHOD_POSTFINANCE_CARD_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
 PayoneConfig::PAYMENT_METHOD_POSTFINANCE_EFINANCE_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
 PayoneConfig::PAYMENT_METHOD_PRZELEWY24_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
 PayoneConfig::PAYMENT_METHOD_BANCONTACT_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'PayoneOnlineTransfer',
];
```

## Online Transfer Payment Flow:
1. Customer selects the payment method and, if necessary, fills in the payment details on checkout.
2. On order placement, the customer is redirected to the payment providers page. Depending on results, the user is redirected back  to the corresponding page (success page, error page or cancellation page) in the shop after that.
