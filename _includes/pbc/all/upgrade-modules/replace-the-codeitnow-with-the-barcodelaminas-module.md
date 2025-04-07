

Because of a DMCA takedown of a third-party library that the `spryker/code-it-now` module uses, the `spryker/code-it-now` module is deprecated. Therefore, migration to the `BarcodeLaminas` module is required.

This document describes how to replace the deprecated `CodeItNow` module with `BarcodeLaminas`.

## Migrating from `CodeItNow` to `BarcodeLaminas`

*Estimated migration time: 10 minutes*

To migrate from `CodeItNow` to `BarcodeLaminas`, follow these steps:

1. Remove the deprecated `CodeItNow` module:
```bash
composer remove spryker/code-it-now
```

2. Install the replacement `BarcodeLaminas` module:
```bash
composer require spryker/barcode-laminas
```

3. In the dependency provider, replace the old `Code128BarcodeGeneratorPlugin` from `spryker/code-it-now` with the new plugin from `spryker/barcode-laminas`:

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

To verify that `BarcodeLaminas` has been installed and works correctly, in the Back Office, go to **Catalog&nbsp;<span aria-label="and then">></span> Product Barcodes** and check that barcode images are generated successfully.   

{% endinfo_block %}
