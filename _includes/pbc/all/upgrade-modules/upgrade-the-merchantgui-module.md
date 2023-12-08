

## Upgrading from version 2.* to version 3.*

The main update of the `MerchantGui` v3.0.0 is the ability to edit stores, URLs for the merchant, activate and deactivate merchant.

Other changes are:

* Removed MerchantCriteriaFilter transfer.
* Renamed `MerchantGuiDependencyProvider::getMerchantProfileFormExpanderPlugins()`.

{% info_block infoBox "Info" %}

Keep in mind that `MerchantGui` module migration depends on the [Merchant](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-the-merchant-module.html#upgrading-from-version-2-to-version-3) module migration.

{% endinfo_block %}

{% info_block infoBox "Info" %}

If your project code contains the MerchantProfile module, you need to remove registered plugins for expanding the form in MerchantGuiDependencyProvider.

{% endinfo_block %}

*Estimated migration time: 1-2 hours.*

To upgrade to the new version of the module, do the following:

1. Update `MerchantGui` module version and its dependencies by running the following command:

```bash
composer require spryker/merchant-gui:"^3.0.0" --update-with-dependencies
```

2. Update the transfer objects:

```bash
console transfer:generate
```

3. Generate translator cache by running the following command to get the latest Zed translations:

```bash
console translator:generate-cache
```

4. Register the following form plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreRelationToggleFormTypePlugin | Represent store relation toggle form based on stores registered in the system. | None | \Spryker\Zed\Store\Communication\Plugin\Form |

```php
namespace Pyz\Zed\MerchantGui;

use Spryker\Zed\MerchantGui\MerchantGuiDependencyProvider as SprykerMerchantGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class MerchantGuiDependencyProvider extends SprykerMerchantGuiDependencyProvider
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

5. Generate translator cache by running the following command to get the latest Zed translations:

```bash
console translator:generate-cache
```

6. Rename method for plugins stack `getMerchantProfileFormExpanderPlugins` to `getMerchantFormExpanderPlugins`:

```php
namespace Pyz\Zed\MerchantGui;

use Spryker\Zed\MerchantGui\MerchantGuiDependencyProvider as SprykerMerchantGuiDependencyProvider;
use Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\MerchantProfileFormExpanderPlugin;
use Spryker\Zed\MerchantStockGui\Communication\Plugin\MerchantGui\MerchantStockMerchantFormExpanderPlugin;

class MerchantGuiDependencyProvider extends SprykerMerchantGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormExpanderPluginInterface[]
     */
    protected function getMerchantFormExpanderPlugins(): array
    {
        return [
            new MerchantProfileFormExpanderPlugin(),
            new MerchantStockMerchantFormExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Warning" %}

If your project code contains any changes, make sure that it works correctly.

{% endinfo_block %}

## Upgrading from version 1.* to version 2.*

The main update of the `MerchantGui` v2.0.0 is the ability to expand Table, Form, Tabs for merchant entity. We also removed Merchant delete functionality.

Other changes are:

* Added the new Merchant fields.
* Added the unique email and unique merchant reference fields and constraints to Merchant create and edit forms.
* Added status as a new column to Merchant table.
* Added Merchant table expander plugins.
* Added an ability to change Merchant status in the Merchant edit page based on the Merchant available statuses.

{% info_block infoBox "Info" %}

Keep in mind that the `MerchantGui` module makes sense only in connection with modules [MerchantGuiExtension](https://github.com/spryker/merchant-gui-extension) and [Merchant](https://github.com/spryker/merchant).

{% endinfo_block %}

*Estimated migration time: 1-2 hours.*

To upgrade to the new version of the module, do the following:

1. Update the `MerchantGui` module version and its dependencies by running the following command:

```bash
composer require spryker/merchant-gui:"^2.0.0" --update-with-dependencies
```

{% info_block infoBox "Info" %}

Also, check the Migration Guide for the [Merchant](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-the-merchant-module.html#upgrading-from-version-1-to-version-2).

{% endinfo_block %}

2. Update transfer objects:

```bash
console transfer:generate
```

3. Generate translator cache by running the following command to get the latest Zed translations:

```bash
console translator:generate-cache
```

{% info_block warningBox "Warning" %}

If your project code contains any changes for the frontend part, make sure that it works correctly.

{% endinfo_block %}

4. If your project has any domain entities, that implement `MerchantFormExpanderPluginInterface`,  `MerchantTableActionExpanderPluginInterface`,  `MerchantTableActionExpanderPluginInterface`, `MerchantTableHeaderExpanderPluginInterface`, `MerchantTableConfigExpanderPluginInterface`, `MerchantFormTabExpanderPluginInterface`, add the respective plugins to the dependency provider:

```php
class MerchantGuiDependencyProvider extends SprykerMerchantGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormExpanderPluginInterface[]
     */
    protected function getMerchantProfileFormExpanderPlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantTableDataExpanderPluginInterface[]
     */
    protected function getMerchantTableDataExpanderPlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantTableActionExpanderPluginInterface[]
     */
    protected function getMerchantTableActionExpanderPlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantTableHeaderExpanderPluginInterface[]
     */
    protected function getMerchantTableHeaderExpanderPlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantTableConfigExpanderPluginInterface[]
     */
    protected function getMerchantTableConfigExpanderPlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormTabExpanderPluginInterface[]
     */
    protected function getMerchantFormTabsExpanderPlugins(): array
    {
        return [];
    }
}
```

* `MerchantFormTabExpanderPluginInterface` plugins are responsible for expanding the tabs in the form.
* `MerchantTableConfigExpanderPluginInterface` plugins are responsible for expanding the config data for the table.
* `MerchantTableHeaderExpanderPluginInterface` plugins are responsible for expanding the header for the table.
* `MerchantTableActionExpanderPluginInterface` plugins are responsible for expanding the action column for the table.
* `MerchantTableDataExpanderPluginInterface` plugins are responsible for expanding the data for the table.
* `MerchantFormExpanderPluginInterface` plugins are responsible for expanding the form.
