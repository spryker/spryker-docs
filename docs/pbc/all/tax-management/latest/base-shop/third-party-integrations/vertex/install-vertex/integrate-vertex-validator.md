---
title: Integrate Vertex Validator
description: Find out how you can integrate the Vertex Validator into your Spryker shop
last_updated: Mar 5, 2026
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-taxamo.html
---

To integrate Vertex Validator, take the following steps.

## 1. Install required modules

```bash
composer require spryker-eco/vertex
```

## 2. Add glossary keys

1. Add the following keys to your existing glossary file:

<details>
<summary>Click to view all glossary keys</summary>

```csv
key,translation,locale
vertex.tax-number-country-blocked,Dieses Land ist in den Einstellungen blockiert.,de_DE
vertex.tax-number-validation-not-available,Die Steuernummer konnte nicht durch den Dienst überprüft werden.,de_DE
vertex.tax-number-ignored,"Die Steuernummer wurde ignoriert, da Nummern für diese Region, dieses Land oder diesen Verkäufer blockiert wurden.",de_DE
vertex.tax-number-syntax-valid,Das Format der Steuernummer ist korrekt. Es wurden jedoch keine weiteren Prüfungen durchgeführt.,de_DE
vertex.tax-number-syntax-invalid,Das Format der Steuernummer ist ungültig.,de_DE
vertex.tax-number-considered-valid-in-domestic-country,Die Steuernummer ist im Heimatland des Verkäufers gültig.,de_DE
vertex.tax-number-valid-according-to-external-service,Die Steuernummer wurde erfolgreich bei der Steuerbehörde validiert.,de_DE
vertex.tax-number-invalid-according-to-external-service,Die Steuernummer wurde bei der Steuerbehörde überprüft und ist ungültig.,de_DE
vertex.tax-number-validation-requested-additional-interactions,"Die Steuerbehörde verlangt zusätzliche Informationen (z. B. CAPTCHA), um die Nummer zu validieren.",de_DE
vertex.tax-number-service-temporarily-unavailable,Der Validierungsdienst ist vorübergehend nicht erreichbar.,de_DE
vertex.tax-number-syntax-considered-valid-but-not-verified,"Das Format der Steuernummer ist korrekt, aber der Status konnte nicht bestätigt werden, da der externe Dienst nicht reagierte.",de_DE
vertex.tax-number-country-blocked,This county is blocked in the settings.,en_US
vertex.tax-number-validation-not-available,The service was not able to validate this number.,en_US
vertex.tax-number-ignored,"The number is ignored because the settings have been changed to block numbers for this region, country or seller.",en_US
vertex.tax-number-syntax-valid,"The syntax of the ID is valid. However, no further validations were done. In cases where a checksum is required, like for India, the ID is considered valid if the syntax is valid and the checksum is not configured.",en_US
vertex.tax-number-syntax-invalid,The syntax of the ID is invalid.,en_US
vertex.tax-number-considered-valid-in-domestic-country,The Tax ID is valid in the domestic country of the supplier.,en_US
vertex.tax-number-valid-according-to-external-service,The Tax ID has been validated against the Tax Authority's database of Tax IDs and is valid.,en_US
vertex.tax-number-invalid-according-to-external-service,The Tax ID has been validated against the Tax Authority's database of Tax IDs and is invalid.,en_US
vertex.tax-number-validation-requested-additional-interactions,"The Tax Authority has requested additional parameters. For example, a country might require CAPTCHA validation and needs more information before they can validate the ID.",en_US
vertex.tax-number-service-temporarily-unavailable,Could not connect to validation service due to temporary unavailability of the service.,en_US
vertex.tax-number-syntax-considered-valid-but-not-verified,The Tax ID syntax is valid but the ID's status could not be verified by the external service. This occurs when the on-error settings is set to syntax-check and external service does not respond.,en_US
vertex.invalid-request-data,Invalid request data.,en_US
vertex.invalid-request-data,Ungültige Anfragedaten.,de_DE
vertex.tax-app-disabled,Tax service is disabled.,en_US
vertex.tax-app-disabled,Die Steueranwendung ist deaktiviert.,de_DE
vertex.tax-validator-unavailable,Tax Validator API is unavailable.,en_US
vertex.tax-validator-unavailable,Die Steuerprüfungs-API ist nicht verfügbar.,de_DE
vertex.validator-api-inactive,Unable to connect to Vertex Validator API: vertex app or tax id validation is inactive.,en_US
vertex.validator-api-inactive,Verbindung zur Vertex Validator API fehlgeschlagen: Die Vertex-Anwendung oder der Steuernummern-Prüfdienst ist nicht aktiv.,de_DE
vertex.request-failed,Request to Vertex API failed.,en_US
vertex.request-failed,Anfrage an die Vertex-API fehlgeschlagen.,de_DE
vertex.invalid-credentials,Invalid credentials.,en_US
vertex.invalid-credentials,Ungültige Anmeldeinformationen.,de_DE
```

</details>

2. Import the updated glossary:

```bash
console data:import:glossary
```

### 3. Register the Glue API plugin

{% info_block infoBox "Optional" %}

This step is required only if you want to expose tax validation via the REST API.

{% endinfo_block %}

Add the Glue plugin to `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`:

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use SprykerEco\Glue\Vertex\Plugin\VertexTaxValidateIdResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    protected function getResourceRoutePlugins(): array
    {
        return [
            // ... other plugins
            new VertexTaxValidateIdResourceRoutePlugin(),
        ];
    }

}
```

## 4. Use translations

To use translations, send requests with the `Accept-Language` header. For example, to use German translations, include the `Accept-Language: de` header.

## Next step

[Verify Vertex connection](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/verify-vertex-connection.html)
