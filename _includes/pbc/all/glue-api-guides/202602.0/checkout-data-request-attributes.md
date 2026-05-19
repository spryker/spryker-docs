| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| billingAddress | Object | | Customer's billing [address](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html). |
| billingAddress.id | String | . | A hyphenated alphanumeric value of an existing customer address. To get it, include the `addresses` resource in your request or [add a customer address](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/customers/add-customer-addresses.html). If you pass this value for a billing or shipping address, do not pass the other address attributes. |
| billingAddress.salutation | String | &check; | Salutation to use when addressing the customer. |
| billingAddress.email | String | &check; | Customer's email address. |
| billingAddress.firstName | String | &check; | Customer's first name. |
| billingAddress.lastName | String | &check; | Customer's last name. |
| billingAddress.address1 | String | &check; | The first line of the customer's address. |
| billingAddress.address2 | String | &check; | The second line of the customer's address. |
| billingAddress.address3 | String | | The third line of the customer's address. |
| billingAddress.zipCode | String | &check; | ZIP code. |
| billingAddress.city | String | &check; | Specifies the city. |
| billingAddress.iso2Code | String | &check; | Specifies an ISO 2 Country Code to use. |
| billingAddress.company | String | | Customer's company. |
| billingAddress.phone | String | | Customer's phone number. |
| payments | Array | | The payment methods used in this order. |
| shipments | Array | | A list of shipments. |
| shipments.items | Array | &check; | A list of items in a shipment. |
| shipments.shippingAddress | Object | &check; | Shipping address for the items in the shipment. |
| shipments.shippingAddress.id | String | . | A hyphenated alphanumeric value of an existing customer address. To get it, include the `addresses` resource in your request or [add a customer addresses](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/customers/add-customer-addresses.html). If you pass this value for a billing or shipping address, do not pass the other address attributes. |
| shipments.shippingAddress.idCompanyBusinessUnitAddress | String | | A hyphenated alphanumeric value of an existing company business unit address. To get it, include the `company-business-unit-addresses` resource in your request. Alternatively,  [retrieve a company business unit](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-units.html) with the company-business-unit-addresses resource included. If you pass this value for a billing or shipping address, do not pass the other address attributes. |
| shipments.shippingAddress.salutation | String | &check; | Salutation to use when addressing the customer. |
| shipments.shippingAddress.email | String | &check; | Customer's email address. |
| shipments.shippingAddress.firstName | String | &check; | Customer's first name. |
| shipments.shippingAddress.lastName | String | &check; | Customer's last name. |
| shipments.shippingAddress.address1 | String | &check; | The first line of the customer's address. |
| shipments.shippingAddress.address2 | String | &check; | The second line of the customer's address. |
| shipments.shippingAddress.address3 | String | | The third line of the customer's address. |
| shipments.shippingAddress.zipCode | String | &check; | ZIP code. |
| shipments.shippingAddress.city | String | &check; | Specifies the city. |
| shipments.shippingAddress.iso2Code | String | &check; | Specifies an ISO 2 Country Code to use. |
| shipments.shippingAddress.company | String | | Customer's company. |
| shipments.shippingAddress.phone | String | | Customer's phone number. |
| shipments.shippingAddress.idShipmentMethod | Integer | &check; | Unique identifier of a shipment method used for a shipment. |
| shipments.shippingAddress.requestedDeliveryDate | Date | &check; | Desired delivery date for a shipment. |
