---
title: App Composition Platform overview
description: Learn about the App Orchestration Platform and how to use it.
template: concept-topic-template
redirect_from:
    - /docs/aop/user/intro-to-acp/acp-overview.html
---

The App Composition Platform (ACP) lets Spryker Cloud customers connect, configure, and use the available third-party services or apps, in their application with a click of a button, without development efforts from their side.

![ACP](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop.png)

The following apps are supported:

- [Payone](/docs/pbc/all/payment-service-providers/payone/payone.html), a Payment Service Provider (PSP)
- [Usercentrics](/docs/pbc/all/usercentrics/usercentrics.html), a Consent Management Platform (CMP)
- [BazaarVoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/bazaarvoice.html), a platform for User-Generated Content (UGC)

Spryker builds all integrations of the apps and provides them in a secure and no-code way for the SCCOS.

The ACP has the following advantages:

- Quick, no-code integrations
- Fully functional trials
- Consumption-based billing
- Contains only approved and secure apps
- Always up-to-date apps

## Installing the ACP catalog

{% info_block warningBox "" %}

Your project must be hosted in Spryker Cloud.

{% endinfo_block %}

ACP catalog is included by default to the Spryker Cloud product. However, if you started your Spryker project before March 31, 2022, to use the ACP catalog, you must install the following module into your Spryker project:

* `spryker/app-catalog-gui: ^1.2.0` or higher

Add the configuration for the module and its dependencies.

<details open>
<summary>config/Shared/config_default.php</summary>

```php
use Spryker\Shared\AppCatalogGui\AppCatalogGuiConstants;
use Spryker\Shared\OauthAuth0\OauthAuth0Constants;
use Spryker\Shared\Store\StoreConstants;
use Spryker\Zed\OauthAuth0\OauthAuth0Config;

$aopApplicationConfiguration = json_decode(html_entity_decode((string)getenv('SPRYKER_AOP_APPLICATION')), true);
$aopAuthenticationConfiguration = json_decode(html_entity_decode((string)getenv('SPRYKER_AOP_AUTHENTICATION')), true);

$config[AppCatalogGuiConstants::APP_CATALOG_SCRIPT_URL] = $aopApplicationConfiguration['APP_CATALOG_SCRIPT_URL'] ?? '';
$config[AppCatalogGuiConstants::OAUTH_PROVIDER_NAME] = OauthAuth0Config::PROVIDER_NAME;
$config[AppCatalogGuiConstants::OAUTH_GRANT_TYPE] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[AppCatalogGuiConstants::OAUTH_OPTION_AUDIENCE] = 'aop-atrs';
$config[OauthAuth0Constants::AUTH0_CUSTOM_DOMAIN] = $aopAuthenticationConfiguration['AUTH0_CUSTOM_DOMAIN'] ?? '';
$config[OauthAuth0Constants::AUTH0_CLIENT_ID] = $aopAuthenticationConfiguration['AUTH0_CLIENT_ID'] ?? '';
$config[OauthAuth0Constants::AUTH0_CLIENT_SECRET] = $aopAuthenticationConfiguration['AUTH0_CLIENT_SECRET'] ?? '';
$config[StoreConstants::STORE_NAME_REFERENCE_MAP] = $aopApplicationConfiguration['STORE_NAME_REFERENCE_MAP'] ?? [];
```
</details>

## Accessing the ACP catalog

The ACP catalog is a page inside the Back Office containing the application list you can connect to your shop.
You can access the ACP catalog only if you are a SCCOS customer. If you were onboarded after March 31, 2022, you get the ACP catalog into your Back Office by default. If you were onboarded earlier, [contact us](https://support.spryker.com/). Once you complete the installation, the ACP catalog appears in the Back Office:

![aop-catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop-catalog.png)

## Using an app from the ACP catalog

In most cases, to try an app from the ACP catalog, you do the following:

1. In the ACP catalog, select the necessary app and connect it to your shop by clicking the **Connect app** button on the app details page. You are redirected to the configuration page of the newly connected app. You can find a link to the app provider's website if you need to register with them.
2. You obtain the necessary credentials on the app provider's website.
3. In the Spryker ACP catalog, on the selected app details page, you click **Configure** and enter the credentials obtained from the app provider. Here you also make necessary settings for the app.

{% info_block infoBox "Info" %}

Make sure you check the configuration guidelines for the app you need because additional settings in the Back Office might be required for individual apps to run.

{% endinfo_block %}

That's it! You are all set to try the app out.
