---
title: Prices feature overview
description: In the article, you can find the price definition, its types, how the price is inherited and calculated.
last_updated: Jul 9, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/prices-overview
originalArticleId: 003e8985-3230-4498-838b-234a10f1a810
redirect_from:
  - /2021080/docs/prices-overview
  - /2021080/docs/en/prices-overview
  - /docs/prices-overview
  - /docs/en/prices-overview
  - /2021080/docs/prices
  - /2021080/docs/en/prices
  - /docs/prices
  - /docs/en/prices
---

A price can be attached to an abstract product or a concrete product. The price is stored as an integer in the smallest unit of the currency—for example, for Euro, that would be cents (100 = 1,00 EUR).

Each price is assigned to a price type such as DEFAULT or ORIGINAL. There can be one to N product prices defined for a price type. The price type entity is used to differentiate between different use cases. You use DEFAULT to define the customer's price at the checkout. You use ORIGINAL to define the previous price of this product like a sale pricing.

The price can have GROSS or NET value which can be used based on a price mode selected by the customer in Yves. For example, you can run the shop in both price modes and select the NET mode for business customers. Price also has currency and store assigned to it.
![Price calculation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_calculation.png)

## Price inheritance

As a general rule, if a concrete product doesn't have a specific entity stored, it inherits the values stored for its abstract product. It means that when getting the price entity for a particular product, first, a check is made if a price is defined for the SKU corresponding to that product: if yes, then it returns that price, but if not, then it queries an abstract product linked to that product and checks if it has a price entity defined.

If it still can't find a price, it throws an exception. It shouldn't happen if the prices of the products are up to date.

The following diagram summarizes the logic for retrieving the price for a product:
<!-- ![Price retrieval logic](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_retrieval_logic.png) -->

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-06-03T11:32:46.067Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36\&quot; etag=\&quot;T7hhuAMpPM_ldUqpfC10\&quot; version=\&quot;19.0.0\&quot; type=\&quot;device\&quot;&gt;&lt;diagram id=\&quot;3DaTv75cO_2HJDJPcYRU\&quot; name=\&quot;Page-1\&quot;&gt;5ZrNcpswEICfxsd0QAJMjs3/dNpOp+lMm6MMwtBiRGUR4z59FyTAsrDjpqY4aQ4OWgkkdvdbrdae4MtFectJHn9gIU0nyArLCb6aIIQsD8G/SrKWEtt2HSmZ8yRUsk5wn/yiSmgpaZGEdKkNFIylIsl1YcCyjAZCkxHO2UofFrFUnzUnc2oI7gOSmtKvSShiKfVdq5Pf0WQeNzPblupZkGawEixjErLVhghfT/AlZ0zIq0V5SdNKe41e5H03O3rbhXGaiUNuwJ/RQtje6uv5zYfywXm3Lq9/ntnKPo8kLdQbq9WKdaMCGoJGVJNxEbM5y0h63UkvOCuykFbzWNDqxrxnLAehDcLvVIi1Mi8pBANRLBap6pVzVhPtfDklWrKCB3TfGyknIXxOxb5xdmsD8F7KFlTwNdzIaUpE8qgvhCgvmrfjOkXDhdL1H+gd4x69eyks+CJi8MqbBvB+FqzpOFvWKnwLA2ycl7Xqmn64mlf/H4AX9SxYm3yc7Ok17XsyA2g1c5A0mWdwHYD2KQfBI+UiASjeqo5FEobS8hQWRGb18yrb5yzJRK0s92LiXqlVN95jq/YlSxmvV4DPp1fWdNqurZqIln1kq0k6njadY49vmxZWj7feWNhSZlDRqXGeg31APfxT9dYbQ1gULcH5tp2kXcPz/cZ2/lte8ai8mnr/yEbDSZoFNGLgZNV/BnbHZ8t5gi3b9881tk4fLcPCdzApzCz1FHAqaKUazsIiEKqjCbQz3sRYuB+mqcYlQTWeCEGCuILtxvAXHrPFrIA3u1jFiaD3OalRWUEupXtQlKTphpWjKEJBAPKl4OwH3egJvZnnevvCqcHoTiOiqaVZ0FfNVZcH2c2QeDMHaoRHp9D2Xl30Ozj8uWOGP9uE45Y2DDSenibZDxrWCXr1EdMd4GxD0JrD/mMQQkL9qBcEL/DpLDoOCLajg4C8HhJQDwmDgdCeKf6p34O6+Ppbdf8bt2k+qMfVjatSa61V65i84AN5QX+bLmztP8oVXKS7gmNtmVguTN01wCZlnhsUiFn1MQMOSL05ddtUBEjswbFvW9Ic5ShEhjQiRSqOw6Pjuc/j0RtsY3INs3ymouBZq3kVJLc0fWTd6oYbIPK17j5e5DN3oheeAqCDQ9qoKQA2XbxNfvsrD7PRyw67z0kDlh2eQAqORp471ag6Ux5wumejBrL/kbrpqNT1nXi0OmHQOnVXB2zKAEZp0CC2KmL0AXta5cNxOH6qfIgcX89DTr98iMz0URY5ZJLSmz8SOX7wokboUj90Bs4ct/MZe/SaBnp1FV3kHhpa/TFDK9qd0Czz+jhlfgVjRtTDyiB9YLUhVs62I8Se+lkMWzpR7vnoJ4SpYdcvMWeryr3LgOYiYdmLU7OHnqnmwY68Et7Xd+TddugpHtuh8cv/ZuKoLJze9xLYPB4NUB4/zcj0L4vj0Ox+LyNz4u5nR/j6Nw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

## Price calculation

The concerns for the product price calculation are the following:

* Retrieve valid price for the product.
* Calculate the amount of tax.          
* Product Option prices selected for the product (warranty or gift wrapping).

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of Volume Prices](/docs/scos/user/features/{{page.version}}/prices-feature-overview/volume-prices-overview.html)   |
| [Define prices when creating abstract products and product bundles](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html)   |
| [Edit prices of an abstract product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products-and-product-bundles/editing-abstract-products.html#editing-prices-of-an-abstract-product)   |
| [Define prices when creating a concrete product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/creating-product-variants.html)  |
| [Edit prices of a concrete product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/editing-product-variants.html)   |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Prices feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/prices-feature-walkthrough/prices-feature-walkthrough.html) for developers.

{% endinfo_block %}
