| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| customer | Object | &check; | A list of attributes describing the [customer](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html) to submit checkout data of. |
| customer.salutation | String | &check; | Salutation to use when addressing the customer. |
| customer.email | String | &check; | Customer's email address. |
| customer.firstName | String | &check; | Customer's first name. |
| customer.lastName | String | &check; | Customer's last name. |
| idCart | String | &check; | Unique identifier of the customer's [cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html) to check out. |
| billingAddress | Object | &check; | Customer's billing [address](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html). |
| billingAddress.id | String | | A hyphenated alphanumeric value of an existing customer address. To get it, include the `addresses` resource in your request or [retrieve a customer's addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html). If you pass this value for a billing or shipping address, do not pass the other address attributes. |
| billingAddress.salutation | String | &check; | Salutation to use when addressing the customer. |
| billingAddress.email | String | &check; | Customer's email address. |
| billingAddress.firstName | String | &check; | Customer's first name. |
| billingAddress.lastName | String | &check; | Customer's last name. |
| billingAddress.address1 | String | &check; | The 1st line of the customer's address. |
| billingAddress.address2 | String | &check; | The 2nd line of the customer's address. |
| billingAddress.address3 | String | &check; | The 3rd line of the customer's address. |
| billingAddress.zipCode | String | &check; | ZIP code. |
| billingAddress.city | String | &check; | Specifies the city. |
| billingAddress.iso2Code | String | &check; | Specifies an ISO 2 Country Code to use. |
| billingAddress.company | String | | Customer's company. |
| billingAddress.phone | String | | Customer's phone number. |
| payments | Array | &check; | A list of payment methods selected for this order. |
| payments.paymentMethodName | String | &check; | Name of the payment method for this order. |
| payments.paymentProviderName | String | &check; | Name of the payment provider for this order. |
| shipment | Object | &check; | A list of attributes describing the shipping method selected for this order. |
| shipment.items | object | &check; | A list of items that are to be delivered to the shipping address defined in this shipment. |
| shipment.shippingAddress | Object | &check; | Customer's shipping [address](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html) for this shipment. |
| shipment.shippingAddress.id | String | | A hyphenated alphanumeric value of an existing customer address. To get it, include the `addresses` resource in your request or [retrieve a customer's addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html). If you pass this value for a billing or shipping address, do not pass the other address attributes. |
| shipment.shippingAddress.idCompanyBusinessUnitAddress | String | | A hyphenated alphanumeric value of an existing company business unit address. To get it, [retrieve a company business unit](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-units.html) with the `company-business-unit-addresses` resource included. If you pass this value for a billing or shipping address, do not pass the other address attributes. |
| shipment.shippingAddress.salutation | String | &check; | Salutation to use when addressing the customer. |
| shipment.shippingAddress.email | String | &check; | Customer's email address. |
| shipment.shippingAddress.firstName | String | &check; | Customer's first name. |
| shipment.shippingAddress.lastName | String | &check; | Customer's last name. |
| shipment.shippingAddress.address1 | String | &check; | The 1st line of the customer's address. |
| shipment.shippingAddress.address2 | String | &check; | The 2nd line of the customer's address. |
| shipment.shippingAddress.address3 | String | &check; | The 3rd line of the customer's address. |
| shipment.shippingAddress.zipCode | String | &check; | ZIP code. |
| shipment.shippingAddress.city | String | &check; | Specifies the city. |
| shipment.shippingAddress.iso2Code | String | &check; | Specifies an ISO 2 Country Code to use. |
| shipment.shippingAddress.company | String | | Customer's company. |
| shipment.shippingAddress.phone | String | | Customer's phone number. |
| shipment.shippingAddress.idShipmentMethod | String | | Unique identifier of the shipment method for this order or shipment. |
| shipment.shippingAddress.idShipmentMethod | String | &check; | Unique identifier of the shipment method for this shipment. |
| shipment.shippingAddress.requestedDeliveryDate | Date | | The delivery date for this shipment requested by the customer. |

{% info_block warningBox "Purchasing a gift card" %}

To prevent fraud, the *invoice* payment method is not accepted if a cart contains a gift card.

{% endinfo_block %}
