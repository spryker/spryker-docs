

## Upgrading from version 1.* to version 2.*

In the `MultiCartPage` module version 2, we have adjusted `MultiCartController` actions. Now in case if a customer doesn't have permission to write cart or the quote is not editable, a redirect to the referrer page is made with the corresponding messages. Since the `QuoteClient::isQuoteEditable` method is used now, the `Quote` module's version must be 2.8.0 or higher.

To upgrade to the new version of the module, do the following:

1. Install the `Quote` module:

```bash
composer require spryker/quote:"^2.8.0"
```

2. Regenerate transfer objects:

```bash
vendor/bin/console transfer:generate
```

3. Resolve deprecations:

{% info_block warningBox %}

Before upgrading to the new version, make sure that you do not use any deprecated code from version 1.* You can find replacements for the deprecated code in the table below.

{% endinfo_block %}

| DEPRECATED CODE | REPLACEMENT |
| --- | --- |
| `\SprykerShop\Yves\MultiCartPage\Dependency\Plugin\CartListPermissionGroupWidget\CartListPermissionGroupWidgetPluginInterface` | `\SprykerShop\Yves\SharedCartWidget\Widget\CartListPermissionGroupWidget` |
| `\SprykerShop\Yves\MultiCartPage\Dependency\Plugin\ProductBundleItemCounterWidget\ProductBundleItemCounterWidgetPluginInterface` | `\SprykerShop\Yves\ProductBundleWidget\Widget\ProductBundleItemCounterWidget` |
| `\SprykerShop\Yves\MultiCartPage\Dependency\Plugin\SharedCartWidget\CartDeleteCompanyUsersListWidgetPluginInterface` | `\SprykerShop\Yves\SharedCartWidget\Widget\CartDeleteCompanyUsersListWidget` |
| `\SprykerShop\Yves\MultiCartPage\Dependency\Plugin\CartToShoppingListWidget\CartToShoppingListWidgetPluginInterface` | molecule('cart-to-shopping-list', 'ShoppingListWidget') |
| `\SprykerShop\Yves\MultiCartPage\Controller\MultiCartController::GLOSSARY_KEY_CART_WAS_DELETED` | `Removed without replacement` |
