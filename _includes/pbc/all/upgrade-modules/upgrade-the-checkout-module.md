

## Upgrading from version 4.* to version 6.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. [Contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from version 3.* to version 4.*

If you extended `\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreConditionInterface`: find those plugins and make sure they return boolean.

{% info_block errorBox "Error" %}

Important: you can return `true` even if a plugin adds errors to the checkout response.

{% endinfo_block %}

Replace the interface with `Spryker\Zed\Checkout\Dependency\Plugin\PlaceOrder\CheckoutPreConditionInterface`.

If you extended `\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveHookInterface`: find those plugins and make sure they work with only one parameter `QuoteTransfer $quoteTransfer` in the `preSave` function. Replace the interface to `Spryker\Zed\Checkout\Dependency\Plugin\PlaceOrder\CheckoutPreSaveHookInterface`.
OMS run is not optional anymore. Order placement process will trigger the OMS run after an order is saved, and before post save hooks run. Find and remove usages of `\Spryker\Zed\Oms\Communication\Plugin\Checkout\OmsPostSaveHookPlugin` and any customer OMS trigger implementation.

### Migrate to the new saved plugins

Replace `\Spryker\Zed\ProductOption\Communication\Plugin\ProductOptionOrderSaverPlugin` with `\Spryker\Zed\ProductOption\Communication\Plugin\Checkout\ProductOptionOrderSaverPlugin`
Replace `\Spryker\Zed\ProductBundle\Communication\Plugin\Sales\ProductBundleOrderSaverPlugin` with `\Spryker\Zed\ProductBundle\Communication\Plugin\Checkout\ProductBundleOrderSaverPlugin`
Replace `\Spryker\Zed\Shipment\Communication\Plugin\OrderShipmentSavePlugin` with `\Spryker\Zed\Shipment\Communication\Plugin\Checkout\OrderShipmentSavePlugin`
Replace `\Spryker\Zed\Discount\Communication\Plugin\Sales\DiscountOrderSavePlugin` with `\Spryker\Zed\Discount\Communication\Plugin\Checkout\DiscountOrderSavePlugin`
Replace `\Spryker\Zed\Customer\Communication\Plugin\OrderCustomerSavePlugin` with `\Spryker\Zed\Customer\Communication\Plugin\Checkout\CustomerOrderSavePlugin`
Replace `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentSaverPlugin` with `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentOrderSaverPlugin`
Replace `\Spryker\Zed\Sales\Communication\Plugin\SalesOrderSaverPlugin` with `\Spryker\Zed\Sales\Communication\Plugin\Checkout\SalesOrderSaverPlugin`
Replace `\Spryker\Zed\SalesProductConnector\Communication\Plugin\ItemMetadataSaverPlugin` with `\Spryker\Zed\SalesProductConnector\Communication\Plugin\Checkout\ItemMetadataSaverPlugin`
