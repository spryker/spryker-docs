---
title: Define if carts are deleted after placing an order
last_updated: Jul 20, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-define-if-a-cart-should-be-deleted-after-placing-an-order
originalArticleId: d465e11a-6ed9-4729-bce8-e6c82d961d37
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-define-if-a-cart-should-be-deleted-after-placing-an-order.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/tutorials-and-howtos/howto-define-if-a-cart-should-be-deleted-after-placing-an-order.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/tutorials-and-howtos/define-if-carts-are-deleted-after-placing-an-order.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/tutorials-and-howtos/enable-guest-checkout-in-the-b2b-demo-shop.html
---

After placing an order, the cart can either be deleted or saved. If you configure carts to be saved, after placing an order, the cart is duplicated, and the customer can access it.

To define this behavior, in `CheckoutPageConfig`, set `cleanCartAfterOrderCreation()` to one of the following:

* `true`: after placing an order, the cart is deleted.
* `false`: after placing an order, the cart is saved.

**Pyz\Shared\CheckoutPage\CheckoutPageConfig**

```php
    /**
     * @api
     *
     * @return bool
     */
    public function cleanCartAfterOrderCreation()
    {
        return true;
    }
```
