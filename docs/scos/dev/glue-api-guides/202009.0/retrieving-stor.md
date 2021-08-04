---
title: Retrieving store configuration
originalLink: https://documentation.spryker.com/v6/docs/retrieving-store-configuration
redirect_from:
  - /v6/docs/retrieving-store-configuration
  - /v6/docs/en/retrieving-store-configuration
---

Depending on your project needs, you can set up a single store that serves all your business needs or have multiple stores designed for different applications or available in different countries. Regardless of how many stores you have, a store contains such generic configuration as the currencies that can be used in transactions, countries where a store is available, supported languages, and the time zone of the store.

The configuration of the current store in a project can be retrieved via an endpoint provided by the **Stores API**.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue Application Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio).

## Retrieve store configuration

To retrieve store configuration, send the request:

***
`GET` **/stores**
***

### Request

Request sample : `GET https://glue.mysprykershop.com/stores`

### Response

<details open>
    <summary>Response sample</summary>
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


| Attribute | Type | Description |
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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
