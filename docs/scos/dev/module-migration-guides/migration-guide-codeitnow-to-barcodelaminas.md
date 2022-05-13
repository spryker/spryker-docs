---
title: Migration guide - CodeItNow module to BarcodeLaminas module
description: 
template: module-migration-guide-template
---

This document describes how to switch from using deprecated `CodeItNow` module to `BarcodeLaminas`.

## Migrating from `CodeItNow` to `BarcodeLaminas`

*Estimated migration time: 10 minutes*

Because of a DMCA takedown of a 3rd party library the `spryker/code-it-now` module was using a replacement for it was required. The `spryker/code-it-now` module is for that reason now deprecated and a migration to the new module is required.

1. Remove the deprecated module:
```bash
composer remove spryker/code-it-now
```

2. Install the replacement:

```bash
composer require spryker/barcode-laminas
```

3. Replace the old `Code128BarcodeGeneratorPlugin` from `spryker/code-it-now` with the new plugin from `spryker/barcode-laminas` in the dependency provider:

**src/Pyz/Service/Barcode/BarcodeDependencyProvider.php**

```php
// Use the new plugin, remove the old one
use Spryker\Service\BarcodeLaminas\Plugin\Code128BarcodeGeneratorPlugin;

class BarcodeDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @return array<\Spryker\Service\BarcodeExtension\Dependency\Plugin\BarcodeGeneratorPluginInterface>
     */
    protected function getBarcodeGeneratorPlugins(): array
    {
        return [
            new Code128BarcodeGeneratorPlugin(),
        ];
    }
}
```

4. Generate the transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

To verify that the `BarcodeLaminas` has been installed and works correctly, in the Back Office, go to **Catalog** > **Product Barcodes** and check that barcode images are generated successfully.   

{% endinfo_block %}
