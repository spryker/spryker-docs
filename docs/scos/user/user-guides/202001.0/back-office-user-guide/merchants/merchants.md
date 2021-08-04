---
title: Merchants
originalLink: https://documentation.spryker.com/v4/docs/merchants
redirect_from:
  - /v4/docs/merchants
  - /v4/docs/en/merchants
---

The Merchants section in the Back Office is mostly used by Spryker Admins. In a B2B environment, the business partnership between a buyer (company/business unit) and a seller (merchant) is often based on a range of agreements. So you should consider the Merchant and Merchant Relation sections as a contract between the seller and buyer.
**Standardized flow of actions for a Spryker Admin**
![Merchants - Spryker Admin](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Merchants/merchants-section.png){height="" width=""}

![Merchant Relations - Spryker Admin](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Merchants/merchant-relations-section.png){height="" width=""}

{% info_block infoBox %}
This is how the Spryker Admin sets up the merchant and merchant relations according to the contract conditions. 
{% endinfo_block %}
{% info_block warningBox "Note" %}
For a common B2B solution it should be only one merchant in the system, as two and more merchants are required only for B2B Marketplaces.
{% endinfo_block %}
***
The **Merchants** section in the Back Office is designed to set up the contract conditions.

The **Merchant Relations** section is tight to the **Company Account > Companies** and **Company Units** sections as when you create the relation, you select the company and the respective business unit based on the contract.

In order to have a correct set, you should:
* Have a company setup done in the **Company Account** section. This company is the one with which the contract is signed. (See articles in the [Company Account](https://documentation.spryker.com/v4/docs/company-account-2) section.)
* Create a merchant
* Set up a merchant relation.
***
**What's next?**

* To know more about how the merchant record is managed, see [Managing Merchants](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/merchants/merchants-and-merchant-relations/managing-mercha).
* To know more about merchant relations and their setup, see [Managing Merchant Relations](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/merchants/merchants-and-merchant-relations/managing-mercha).
