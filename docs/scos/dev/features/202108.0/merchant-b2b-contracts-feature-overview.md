---
title: Merchant B2B Contracts feature overview
description: In the context of Spryker B2B eCommerce platform, there can be three key figures- marketplace owner, merchant, and buyer.
originalLink: https://documentation.spryker.com/2021080/docs/merchant-b2b-contracts-feature-overview
originalArticleId: 5cc762f1-aee0-4f60-8030-14cc53e7cb6c
redirect_from:
  - /2021080/docs/merchant-b2b-contracts-feature-overview
  - /2021080/docs/en/merchant-b2b-contracts-feature-overview
  - /docs/merchant-b2b-contracts-feature-overview
  - /docs/en/merchant-b2b-contracts-feature-overview
---

In the B2B partnership, which is usually based on contracts, the selling company is also referred to as a merchant and the buyer is often represented by a business unit of a buying company. In Spryker B2B shop system, the merchant relation entity is used to connect merchants and buyers together.

There are three key figures: marketplace owner, merchant, and buyer.

* The marketplace owner owns the platform and acts as a broker between merchants and buyers.
* The merchants are sellers usually represented by a [company](/docs/scos/dev/features/{{page.version}}/company-account/company-account-feature-overview/company-accounts-overview.html#company).
* The buyers are often [business units](/docs/scos/dev/features/{{page.version}}/company-account/company-account-feature-overview/business-units-overview.html) of companies that purchase products or services from the merchants.

The business relationships between merchants and buyers are usually based on contracts.

The diagram below shows relations within the merchant domain:
<!-- the following schema was already added to [Merchant B2B Contracts feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/merchant-b2b-contracts-feature-walkthrpugh.html)->


![merchants-diagram.png](https://confluence-connect.gliffy.net/embed/image/9c3eb6cd-8492-4550-a280-e218bd3b974a.png?utm_medium=live&utm_source=custom)

A Back Office user can manage merchants and merchant relataions. See [Managing merchants](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/marketplace/merchants-and-merchant-relations/managing-merchants.html) and [Managing merchant relations](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/marketplace/merchants-and-merchant-relations/managing-merchant-relations.html) to learn how to do that.

A developer can also import merchants and merchant relations.

Check out this video tutorial on how to set up merchants and merchant relations:
<iframe src="https://fast.wistia.net/embed/iframe/aowgi1c6k1" title="How to Setup Merchant B2B Contractships in Spryker B2B Video" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="589" height="315"></iframe>

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Manage merchants](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/merchants/managing-merchants.html)  |
| [Manage merchant relations](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/marketplace/merchants-and-merchant-relations/managing-merchant-relations.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Merchant B2B Contracts feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/merchant-b2b-contracts-feature-walkthrpugh.html) for developers.

{% endinfo_block %}
