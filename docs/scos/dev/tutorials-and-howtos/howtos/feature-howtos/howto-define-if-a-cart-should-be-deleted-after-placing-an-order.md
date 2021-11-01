---
title: HowTo - define if a cart should be deleted after placing an order
last_updated: Jul 20, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-define-if-a-cart-should-be-deleted-after-placing-an-order
originalArticleId: d465e11a-6ed9-4729-bce8-e6c82d961d37
redirect_from:
  - /2021080/docs/howto-define-if-a-cart-should-be-deleted-after-placing-an-order
  - /2021080/docs/en/howto-define-if-a-cart-should-be-deleted-after-placing-an-order
  - /docs/howto-define-if-a-cart-should-be-deleted-after-placing-an-order
  - /docs/en/howto-define-if-a-cart-should-be-deleted-after-placing-an-order
---

After placing an order, the cart can either be deleted or saved. If you configure carts to be saved, after placing an order, the cart is duplicated, and the customer can access it. 

To define this behavior, in `CheckoutPageConfig`, set `cleanCartAfterOrderCreation()` to one of the following:
* `true`: after placing an order, the cart is deleted.
* `false`: after placing an order, the cart is saved. 

**Pyz\Shared\CheckoutPage\CheckoutPageConfig**
   
```
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

