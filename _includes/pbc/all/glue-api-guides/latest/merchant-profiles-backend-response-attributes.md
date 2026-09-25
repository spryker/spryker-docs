| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| merchantReference | String | Unique reference of the merchant. It is also the resource `id`. Read-only. |
| name | String | Name of the merchant. |
| email | String | Contact email of the merchant. Unique across merchants. |
| registrationNumber | String | Official business registration number of the merchant. |
| isActive | Boolean | Defines whether the merchant's store is online. An inactive merchant is not published on the Storefront, and its product offers can't be bought; its merchant users keep their access. |
| isOpenForRelationRequest | Boolean | Defines whether the merchant accepts merchant relation requests. `null` until it is set. |
| stores | Array | Names of the stores the merchant is assigned to. Read-only. |
| merchantUrls | Array | URLs of the merchant page on the Storefront, one entry per locale. |
| merchantUrls.localeName | String | Locale of the entry—for example, `de_DE`. |
| merchantUrls.url | String | Relative URL of the merchant page in the locale—for example, `/de/merchant/spryker`. `null` if no URL is set for the locale yet—for example, right after a new store is assigned to the merchant. |
| contactPersonTitle | String | Title of the contact person: `Mr`, `Mrs`, `Dr`, or `Ms`. |
| contactPersonFirstName | String | First name of the contact person. |
| contactPersonLastName | String | Last name of the contact person. |
| contactPersonRole | String | Role of the contact person in the merchant company. |
| contactPersonPhone | String | Phone number of the contact person. |
| publicEmail | String | Email address shown to customers. |
| publicPhone | String | Phone number shown to customers. |
| faxNumber | String | Fax number of the merchant. |
| logoUrl | String | URL of the merchant logo. |
| address | Object | Business address of the merchant. A profile has exactly one address. |
| address.countryIso2Code | String | Two-letter ISO 3166-1 country code of the address. |
| address.zipCode | String | Postal code. |
| address.city | String | City. |
| address.address1 | String | First line of the address, usually the street. |
| address.address2 | String | Second line of the address, usually the house number. |
| address.address3 | String | Third line of the address. |
| address.latitude | String | Latitude of the address in decimal degrees. |
| address.longitude | String | Longitude of the address in decimal degrees. |
| localizedAttributes | Array | Texts of the merchant per locale, with `null` where a text is not translated. |
| localizedAttributes.localeName | String | Locale of the entry—for example, `de_DE`. |
| localizedAttributes.description | String | Description of the merchant. |
| localizedAttributes.bannerUrl | String | URL of the merchant banner. `null` if no banner is set for the locale yet. |
| localizedAttributes.deliveryTime | String | Delivery time information. |
| localizedAttributes.termsConditions | String | Terms and conditions. |
| localizedAttributes.cancellationPolicy | String | Cancellation policy. |
| localizedAttributes.imprint | String | Imprint. |
| localizedAttributes.dataPrivacy | String | Data privacy statement. |
