---
title: "Glue API: Retrieve store configuration"
description: This article explains how to retrieve the store configuration including currencies, countries, locales, and time zones.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-store-configuration
originalArticleId: 555482d7-5661-42bc-86c7-382a702172ab
redirect_from:
  - /2021080/docs/retrieving-store-configuration
  - /2021080/docs/en/retrieving-store-configuration
  - /docs/retrieving-store-configuration
  - /docs/en/retrieving-store-configuration
  - /docs/scos/dev/glue-api-guides/202200.0/retrieving-store-configuration.html
  - /docs/scos/dev/glue-api-guides/202212.0/retrieving-store-configuration.html
---

Depending on your project needs, you can set up a single store that serves all your business needs or have multiple stores designed for different applications or available in different countries. Regardless of how many stores you have, a store contains such generic configuration as the currencies that can be used in transactions, countries where a store is available, supported languages, and the time zone of the store.

The configuration of the current store in a project can be retrieved via an endpoint provided by the **Stores API**.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html).

## Retrieve store configuration

To retrieve store configuration, send the request:

***
`GET` **/stores**
***

### Request

Request sample: retrieve stores

`GET https://glue.mysprykershop.com/stores`

### Response

<details>
<summary>Response sample: retrieve stores</summary>

```json
{
		"data": [
			{
				"type": "stores",
				"id": "DE",
				"attributes": {
					"timeZone": "Europe/Berlin",
					"defaultCurrency": "EUR",
					"currencies": [
						{
							"code": "EUR",
							"name": "Euro"
						},
						{
							"code": "CHF",
							"name": "Swiss Franc"
						}
					],
					"locales": [
						{
							"code": "en",
							"name": "en_US"
						},
						{
							"code": "de",
							"name": "de_DE"
						}
					],
					"countries": [
						{
							"iso2Code": "AT",
							"iso3Code": "AUT",
							"name": "Austria",
							"postalCodeMandatory": true,
							"postalCodeRegex": "\\d{4}",
							"regions": []
						},
						{
							"iso2Code": "DE",
							"iso3Code": "DEU",
							"name": "Germany",
							"postalCodeMandatory": true,
							"postalCodeRegex": "\\d{5}",
							"regions": []
						}
					]
				},
				"links": {
					"self": "https://glue.mysprykershop.com/stores/DE"
				}
			}
		],
		"links": {
			"self": "https://glue.mysprykershop.com/stores"
		}
}
```
</details>


| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| timeZone | String | Name of the time zone of the selected store. |
| defaultCurrency | String | Default currency of the store. |
| code | String | Currency code. |
| name | String | Currency name. |
| code | String | Locale code. |
| name | String | Locale name. |
| iso2Code | String | 2 digit country code. |
| iso3Code | String | 3 digit country code. |
| name | String | Country name. |
| postalCodeMandatory | Boolean | Boolean to tell if a postal code is mandatory or not. |
| postalCodeRegex | String | Regular expression for the allowed postal codes. |
| iso2Code | String | Iso 2 code for the region. |
| name | String | Region name. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
