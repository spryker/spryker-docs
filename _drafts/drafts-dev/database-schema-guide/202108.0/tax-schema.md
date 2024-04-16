---last_updated: Jun 16, 2021

title: Tax Schema
originalLink: https://documentation.spryker.com/2021080/docs/db-schema-tax
originalArticleId: ce550a8e-4afe-4151-b24a-6a2f098c8044
redirect_from:
  - /2021080/docs/db-schema-tax
  - /2021080/docs/en/db-schema-tax
  - /docs/db-schema-tax
  - /docs/en/db-schema-tax
---

## Tax

### Tax Set and Rate

{% info_block infoBox %}
Each product can be related to a tax set which contains the tax rates for each destination country.
{% endinfo_block %}
![Tax set rate](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Tax+Schema/tax-set-rate.png)

**Structure**:

* A Tax Set has a name (e.g. "Food") It represents a group of products which have the same tax rates
* The Rate (e.g. 19%) is stored in `spy_tax_rate`. There is one Rate per Country which allows tax conversions for cross-border shipments.
