---
title: Amazon Pay - Order Reference and Information about Shipping Addresses
originalLink: https://documentation.spryker.com/v1/docs/amazon-pay-order-ref-info-demoshop
redirect_from:
  - /v1/docs/amazon-pay-order-ref-info-demoshop
  - /v1/docs/en/amazon-pay-order-ref-info-demoshop
---

After successful authorization, a buyer will be redirected to an order details page to enter all the information necessary for placing an order: address of shipment, payment method, delivery method and some calculations about taxes, possible discounts, delivery cost, etc.

Amazon Pay provides solutions for choosing shipping addresses and payment methods based on what the buyer previously used on Amazon. As addresses differ by country, the delivery method selection must be implemented by the shop and aligned with shipping address information.

Amazon provides two widgets for choosing shipment and payment information, they can be placed together on the same page or separately.

* Add the following widget on your page:

```xml
{% raw %}{{{% endraw %} render(path('amazonpay_checkout_widget')) {% raw %}}}{% endraw %}
```

Configuration would be used from your current settings profile.

<b>Place order</b> button should look like this:
```xml
<a href="{% raw %}{{{% endraw %} path('amazonpay_confirm_purchase') {% raw %}}}{% endraw %}" disabled="true" id="amazonpayPlaceOrderLink" class="button expanded __no-margin-bottom">Place order</a>
```

Both widgets are similar to the `paybutton` widget that we described earlier.

All necessary credentials have to be specified the same way and in order to retrieve the selected information, Amazon provides JavaScript callbacks.

The first of them to use is `onOrderReferenceCreate`, which provides an Amazon order reference ID.

This ID is a unique identifier of an order, created on Amazon's side and is required for Amazon Pay API calls.

Other important callbacks are `onAddressSelect` and `onPaymentSelect`. These callbacks are triggered after selecting shipment address information and payment method respectively. Callbacks are client side notifications informing that an event has happened.

Use the Amazon Pay API to retrieve data and run order operations.

### Checkout Step Rendering

Since payment module is generic, `PaymentController` provides method `getItems` in order to extend display of items.

For example, in order to handle bundled products, follow these steps:

Create template on project level `AmazonPay/Theme/default/payment/patials/checkout-item.twig`:
```twig
{% raw %}{%{% endraw %} if item.bundleProduct is defined {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} include '@checkout/checkout/partials/summary-item.twig' with {'item': item.bundleProduct, 'bundleItems' : item.bundleItems} {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} include '@checkout/checkout/partials/summary-item.twig' {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
 ```

Extend `AmazonPay/Controller/PaymentController` and add the following method:
```php 
/**
 * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 *
 * @return \ArrayObject|\Generated\Shared\Transfer\ItemTransfer[]
 */
 protected function getCartItems(QuoteTransfer $quoteTransfer)
 {
 return $this->getFactory()->createProductBundleGrouper()->getGroupedBundleItems(
 $quoteTransfer->getItems(),
 $quoteTransfer->getBundleItems()
 );
 }
 ```

Add corresponding method to `AmazonPayFactory`:
```php 
/**
 * @return \Spryker\Yves\ProductBundle\Grouper\ProductBundleGrouperInterface
 */
 public function createProductBundleGrouper()
 {
 return new ProductBundleGrouper();
 }
 ```
