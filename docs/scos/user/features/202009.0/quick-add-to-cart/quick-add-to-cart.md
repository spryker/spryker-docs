---
title: Quick Add to Cart
description: The Quick Add to Cart feature enables customers to buy their commonly ordered products in just a few clicks, encouraging them to come back and buy more.
originalLink: https://documentation.spryker.com/v6/docs/quick-add-to-cart
originalArticleId: 3b7df09a-85ae-4afe-aae1-d52cb68fef9e
redirect_from:
  - /v6/docs/quick-add-to-cart
  - /v6/docs/en/quick-add-to-cart
---

Regular buyers, and especially B2B wholesale customers, often know what exactly they want to order from the shop—by product SKU, product name, etc. The *Quick Add to Cart* feature enables your customers to find and buy products in just a few clicks. Instead of going to each product page individually, they can go to the *Quick Add to Cart* page, accessible directly from the header, and quickly order items by typing product SKU and its quantity in respective fields. At the same time, if some specific [quantity restrictions](/docs/scos/user/features/{{page.version}}/non-splittable-products-feature-overview.html) apply to products, they will also be taken into account when ordering through the *Quick Add to Cart* page. The *Quick Add to Cart* form can also be used to add items to [shopping lists](/docs/scos/user/features/{{page.version}}/shopping-lists-feature-overview/multiple-and-shared-shopping-lists/multiple-and-shared-shopping-lists.html). Also, if a customer has a list of products to be ordered, for example, in a .csv file or other, the ordering process becomes even faster. The customer can bulk add SKUs and put quantities next to them in a single field. This being done, the customer either adds the items to cart or proceeds directly to checkout.

Placing an order through the *Quick Add to Cart* page requires significantly less navigation. This adds convenience and saves time for your new and returning customers, encouraging them to come back and buy more.


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="docs\scos\user\features\202009.0\quick-add-to-cart\quick-add-to-cart-feature-overview.md" class="mr-link">Familiarize yourself with the Quick Add to Cart feature</a><ul><li><a href="docs\scos\user\features\202009.0\quick-add-to-cart\quick-add-to-cart-feature-overview.md#quantity-restrictions-for-quick-add-to-cart" class="mr-link">Quantity restrictions for Quick Add to Cart</a></li><li><a href="docs\scos\user\features\202009.0\quick-add-to-cart\quick-add-to-cart-feature-overview.md#product-prices-for-quick-add-to-cart" class="mr-link">Product prices for Quick Add to Cart</a></li><li><a href="docs\scos\user\features\202009.0\quick-add-to-cart\quick-add-to-cart-feature-overview.md#file-upload-form-for-concrete-products" class="mr-link">The File Upload Form</a></li></ul></li>
                <li><a href="docs\scos\dev\module-migration-guides\202009.0\migration-guide-quickorderpage.md#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate QuickOrderPage module from version 1.* to version 2.*</a></li>
                <li><a href="docs\scos\dev\module-migration-guides\202009.0\migration-guide-productpackagingunitstorage.md" class="mr-link">Migrate ProductPackagingUnitStorage module from version 1.* to version 2.*</a></li>
                <li><a href="docs\scos\dev\module-migration-guides\202009.0\migration-guide-productpagesearch.md#upgrading-from-version-2---to-version-3--" class="mr-link">Migrate ProductPageSearch module from version 2.* to version 3.*</a></li>
                <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\quick-add-to-cart-feature-integration.md" class="mr-link">Integrate the Quick Add to Cart feature into your project</a></li>
                <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\quick-add-to-cart-shopping-lists-feature-integration.md" class="mr-link">Integrate the Quick Add to Cart + Shopping Lists feature into your project</a></li>
                <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\quick-order-measurement-units-feature-integration.md" class="mr-link">Integrate the Quick Add to Cart + Measurement Units feature into your project</a></li>
                <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\quick-order-packaging-units-feature-integration.md" class="mr-link">Integrate the Quick Add to Cart + Packaging Units feature into your project</a></li>
                <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\quick-add-to-cart-discontinued-products-feature-integration.md" class="mr-link">Integrate the Quick Add to Cart + Discontinued Products feature into your project</a></li>
                <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\quick-order-non-splittable-products-feature-integration.md" class="mr-link">Integrate the Quick Add to Cart + Non-splittable Products feature into your project</a></li>
            </ul>
        </div>
    </div>
</div>
