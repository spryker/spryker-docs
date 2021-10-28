---last_updated: Aug 27, 2020

title: Tax Schema
originalLink: https://documentation.spryker.com/v6/docs/db-schema-tax
originalArticleId: a7d65feb-d6e5-436a-ba8b-72da46227bab
redirect_from:
  - /v6/docs/db-schema-tax
  - /v6/docs/en/db-schema-tax
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
