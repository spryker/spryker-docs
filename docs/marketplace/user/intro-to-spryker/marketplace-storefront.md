*Marketplace Storefront* is a web application designed for the marketplace business model. Being based on the regular Storefront, it supports all the Spryker Commerce OS features. Marketplace specific functionalities enable buyers to effectively browse shops, view and buy products from multiple merchants.


## Shop by merchant

In every section of the Marketplace Storefront, products are either sorted by merchants or customers can do it on their own. 

### Catalog and Search pages

On the *Catalog* and *Search* pages, the left-side navigation menu contains the *Merchant* section. In this section, customers can select one or more merchants they want to view products from.

![Catalog and Search pages]

### Product Details pages

On the *Product Details* page, the *Sold by* section contains the product itself and the offers of all the merchants for it. Each entry has a price and a link to the respective [merchant's profile page](#merchant profiles).

![Product Details page]

When a customer opens a *Product Details* page, in the *Sold by* section, the product is pre-selected, and they can switch to any other offer. The pre-selected product is always first on the list and is followed by offers in the ascending order of price. If the product is not available, but there are offers for it, the cheapest offer is pre-selected.

The sorting of the *Sold by* section is configurable on a project level.

The product price on top of the *Product Details* page is taken from the selected merchant's product or offer. When a customer selects a product or offer in the *Sold by* section, the page refreshes showing selected merchant's price.

### Cart page

On the *Cart* page, a merchant relation is displayed for each product. The merchant names are clickable and lead to the merchant profile pages.

![Cart page]



### Checkout

At the Shipment checkout step, a merchant relation is displayed for each product. The merchant names are clickable and lead to the merchant profile pages.


If a customer is ordering products from multiple merchants, the products are going to be shipped from multiple location, so the [shipments](https://documentation.spryker.com/docs/split-delivery-overview) are automatically grouped by merchants.

![Shipment step]

At the Summary checkout step,  merchant relation is displayed for each product. The merchant names are clickable and lead to the merchant profile pages. If a customer is ordering products from multiple merchants, the products are automatically grouped by merchants, which also represents the order's shipments.

![Summary step]


### Order Details pages

 On the *Order Details* page, a merchant relation is displayed for each product. The merchant names are clickable and lead to the merchant profile pages. If a customer ordered products from multiple merchants, the products are grouped by merchants, which also represents the order's shipments.

 ![Order Details page]

If the customer clicks **Reorder all**, the items are added to their current cart with the merchant relations from the order.

### Marketplace returns

On the *Create Return* page, products are grouped by merchants. Merchant names are clickable and lead to the merchant profile pages. A customer can return products from one merchant at a time. After creating a return for the products of one merchant, they can create a return for the products of another merchant from the same order.

![Create Return page]

The *Return Details* page follows the same behavior.


### Marketplace wishlists


When a customer adds a product to a wishlist, the product is added with the merchant relation selected in the *Sold by* section.

On the page of the wishlist, a merchant relation is displayed for each product. Merchant names are clickable and lead to the merchant profile pages.

If, after a product was added to a wishlist, a merchant becomes inactive, the merchant relation is no longer displayed for the product and the customer can't add it to cart. If the merchant becomes active again, the relation is displayed and the customer can add the product to cart.

If a product in a wishlist is out of stock, an [alternative product](https://documentation.spryker.com/docs/alternative-products-overview) is displayed. A merchant relation is displayed for the alternative product. Currently, merchant offers are not supported by alternative products, so the product displayed is a merchant or a regular product.



### Merchant profiles

A merchant profile is a page where all the information about a merchant is located. From all the pages where a Merchant is mentioned, customers can access the merchant profile by selecting a merchant name.

On a *Merchant Profile* page, customers can find the following merchant specific information:
* Logo
* Banner
* Contact details and address
* Estimated delivery time
* Regular and special opening hours
* Terms and conditions
* Cancellation policy
* Imprint
* Data privacy statement



Customers can only access the profile pages of active merchants.
