| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| merchantReference | String | Unique reference of the merchant that owns the profile. It is also the resource `id`. Read-only. |
| merchantName | String | Name of the merchant. It belongs to the merchant, not to the profile, and is read-only here. |
| contactPersonRole | String | Role of the merchant's contact person. |
| contactPersonTitle | String | Title of the contact person: `Mr`, `Mrs`, `Dr`, or `Ms`. |
| contactPersonFirstName | String | First name of the contact person. |
| contactPersonLastName | String | Last name of the contact person. |
| contactPersonPhone | String | Phone number of the contact person. |
| publicEmail | String | Email address shown to customers. |
| publicPhone | String | Phone number shown to customers. |
| faxNumber | String | Fax number of the merchant. |
| logoUrl | String | URL of the merchant logo. |
| localizedAttributes | Array | Merchant texts per locale. The response contains one entry for every locale of the store, with `null` values where a text is not translated. |
| localizedAttributes.localeName | String | Locale of the entry, for example, `de_DE`. |
| localizedAttributes.description | String | Description of the merchant. |
| localizedAttributes.bannerUrl | String | URL of the merchant banner. |
| localizedAttributes.deliveryTime | String | Delivery time information. |
| localizedAttributes.termsConditions | String | Terms and conditions. |
| localizedAttributes.cancellationPolicy | String | Cancellation policy. |
| localizedAttributes.imprint | String | Imprint. |
| localizedAttributes.dataPrivacy | String | Data privacy statement. |
| addresses | Array | Addresses of the merchant profile. |
| addresses.uuid | String | Universally unique identifier of the address. Use it to update the address. It is `null` on installations that do not have the `Uuid` feature of the `MerchantProfile` module enabled. Read-only. |
| addresses.iso2Code | String | Two-letter country code of the address. |
| addresses.countryName | String | Name of the country, derived from `iso2Code`. Read-only. |
| addresses.address1 | String | First line of the address, usually the street. |
| addresses.address2 | String | Second line of the address, usually the house number. |
| addresses.address3 | String | Third line of the address. |
| addresses.city | String | City. |
| addresses.zipCode | String | Postal code. |
| addresses.latitude | String | Latitude of the address. |
| addresses.longitude | String | Longitude of the address. |
