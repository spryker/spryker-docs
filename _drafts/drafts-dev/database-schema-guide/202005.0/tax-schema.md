---last_updated: Apr 3, 2020

title: Tax Schema
originalLink: https://documentation.spryker.com/v5/docs/db-schema-tax
originalArticleId: d43a3442-e4ef-49e8-9c5c-a80f48535e49
redirect_from:
  - /v5/docs/db-schema-tax
  - /v5/docs/en/db-schema-tax
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
