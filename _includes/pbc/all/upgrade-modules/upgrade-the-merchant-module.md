

## Upgrading from version 2.* to version 3.*

The main update of the `Merchant` v3.0.0 is the ability to create stores and URLs for the merchant, activate and deactivate the merchant.

Other changes are:

- Removed `MerchantCriteriaFilter` transfer.
- Added required merchant reference in the database.
- Added is active column.
- Changed names and signatures in the merchant facade.

```php
namespace Spryker\Zed\Merchant\Business;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Generated\Shared\Transfer\MerchantCriteriaTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Spryker\Zed\Merchant\Business\MerchantBusinessFactory getFactory()
 * @method \Spryker\Zed\Merchant\Persistence\MerchantRepositoryInterface getRepository()
 * @method \Spryker\Zed\Merchant\Persistence\MerchantEntityManagerInterface getEntityManager()
 */
class MerchantFacade extends AbstractFacade implements MerchantFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\MerchantCriteriaTransfer $merchantCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function get(MerchantCriteriaTransfer $merchantCriteriaTransfer): MerchantCollectionTransfer
    {
        return $this->getFactory()
            ->createMerchantReader()
            ->get($merchantCriteriaTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\MerchantCriteriaTransfer $merchantCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer|null
     */
    public function findOne(MerchantCriteriaTransfer $merchantCriteriaTransfer): ?MerchantTransfer
    {
        return $this->getFactory()
            ->createMerchantReader()
            ->findOne($merchantCriteriaTransfer);
    }
}
```

*Estimated migration time: 1-2 hours.*

To upgrade to the new version of the module, do the following:

{% info_block warningBox "Warning" %}

Fill in all empty merchant references before migration. After the migration, you need to activate merchants.

{% endinfo_block %}

1. Update `Pyz/Zed/Merchant/Persistence/Propel/Schema/spy_merchant.schema.xml`:

```xml
<table name="spy_merchant">
    <behavior name="event">
        <parameter name="spy_merchant-name" column="name"/>
        <parameter name="spy_merchant-is_active" column="is_active"/>
    </behavior>
</table>
```

2. Update `Merchant` module version and its dependencies by running the following command:

```bash
composer require spryker/merchant:"^3.0.0" --update-with-dependencies
```

3. Update the transfer objects:

```bash
console transfer:generate
```

4. Fill in all merchant references in the database before updating it.
5. Update the database:

```bash
console propel:install
```

6. Update the transfer objects:

```bash
console transfer:generate
```

7. Activate all the active merchants.
8. Trigger events for all or related entities (`IsActive` setting can influence other entities):

```bash
console publish:trigger-events -r merchant
```

9. Register the following form plugins:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| MerchantCheckoutPreConditionPlugin | Validates merchants in the cart for offer items. | None | Spryker\Zed\Merchant\Communication\Plugin\Checkout |
| MerchantCartPreCheckPlugin | Validates merchant in the add to cart action for offer item. | None | Spryker\Zed\Merchant\Communication\Plugin\Cart |

```php
namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Merchant\Communication\Plugin\Checkout\MerchantCheckoutPreConditionPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new MerchantCheckoutPreConditionPlugin(),
        ];
    }
  }
```

```php
namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Merchant\Communication\Plugin\Cart\MerchantCartPreCheckPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[]
     */
    protected function getCartPreCheckPlugins(Container $container)
    {
        return [
            new MerchantCartPreCheckPlugin(),
        ];
    }
}
```

10. Update the glossary `data/import/glossary.csv`:

```csv
merchant.message.removed,Product %sku% is not available at the moment.,en_US
merchant.message.removed,Das Produkt %sku% ist momentan nicht verfügbar.,de_DE
merchant.message.inactive,Product %sku% from merchant %merchant_name% is not available at the moment.,en_US
merchant.message.inactive,Artikel %sku% vom Händler %merchant_name% ist momentan nicht verfügbar.,de_DE
merchant.message.inactive,Product %sku% from merchant %merchant_name% is not available at the moment.,en_US
merchant.message.inactive,Artikel %sku% vom Händler %merchant_name% ist momentan nicht verfügbar.,de_DE
```

Run the command:

```bash
console data:import:glossary
```

{% info_block warningBox "Warning" %}

If your project code contains any changes on the project level, make sure that it works correctly.

{% endinfo_block %}

{% info_block warningBox "Warning" %}

The new version of this module influences other features. You need to trigger events for the related modules.

{% endinfo_block %}

## Upgrading from version 1.* to version 2.*

The main update of the `Merchant` v2.0.0 is the ability to expand the seller using plugin stacks.

We also removed the ability to delete the seller from the database.

Other changes are listed below:

- Added `registrationNumber`, `email` (unique), `merchantReference` (unique), and `status` to the Merchant database entity.
- Added the same attributes to the `MerchantTransfer`.
- Reworked `MerchantFacade` to remove the permanent deletion of a Merchant entity from the database.
- Reworked `MerchantFacade` functions to take from `MerchantTransfer` and return the `MerchantResponseTransfer`.
- Added `MerchantFacade::find and MerchantFacade::findOne` functions with `MerchantCriteriaFilterTransfer` as input.
- Added Merchant status manipulation configuration and validation reflected in the `MerchantConfig`.
- Added the default status for the merchant on creation logic.
- Added Merchant expander plugins on fetch action.
- Added Merchant post save plugins after create and update actions.

{% info_block infoBox "Info" %}

Keep in mind that the Merchant module makes sense only in connection with the [MerchantExtension](https://github.com/spryker/merchant-extension) module.

{% endinfo_block %}

*Estimated migration time: 1-2 hours.*

To upgrade to the new version of the module, do the following:

1. Update the `Merchant` module version and its dependencies by running the following command:

```bash
composer require spryker/merchant:"^2.0.0" --update-with-dependencies
```

2. Update the transfer objects:

```bash
console transfer:generate
```

3. Install the database:

```bash
console propel:install
```

4. Update the transfer objects:

```bash
console transfer:generate
```

5. Generate translator cache by running the following command to get the latest Zed translations:

```bash
console translator:generate-cache
```

{% info_block warningBox "Warning" %}

If your project code contains any `MerchantFacade` methods usage, then update them. Some methods were removed, and the return types were updated.

{% endinfo_block %}

6. If your project has any domain entities that implement `MerchantPostCreatePluginInterface`, `MerchantPostUpdatePluginInterface`, or `MerchantExpanderPluginInterface`, add the respective plugins to the dependency provider:

```php
class MerchantDependencyProvider extends SprykerMerchantDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostCreatePluginInterface[]
     */
    public function getMerchantPostCreatePlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostUpdatePluginInterface[]
     */
    public function getMerchantPostUpdatePlugins(): array
    {
        return [];
    }

    /**
     * @return \Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantExpanderPluginInterface[]
     */
    protected function getMerchantExpanderPlugins(): array
    {
        return [];
    }
}
```

- `MerchantPostCreatePluginInterface`plugins are responsible for post creation action for merchants.
- `MerchantPostUpdatePluginInterface`plugins are responsible for post updating action for merchants.
- `MerchantExpanderPluginInterfaceplugins`are responsible for expanding merchant by additional data.
