---
title: "Glue API: Confirm customer registration"
description: Confirm customer registration via API
last_updated: Jun 21, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/confirming-customer-registration
originalArticleId: ce75d090-7be3-4d28-98a2-4ea49eb0d00c
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/managing-customers/confirming-customer-registration.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-customers/confirming-customer-registration.html
  - /docs/scos/dev/glue-api-guides/201907.0/managing-customers/confirming-customer-registration.html
  - /docs/scos/dev/glue-api-guides/202005.0/managing-customers/confirming-customer-registration.html
  - /docs/pbc/all/identity-access-management/202204.0/manage-using-glue-api/glue-api-authenticate-as-an-agent-assist.html
related:
  - title: Authentication and authorization
    link: docs/dg/dev/glue-api/page.version/rest-api/glue-api-authentication-and-authorization.html
  - title: Searching by company users
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html
  - title: Authenticating as a customer
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
  - title: Managing customer authentication tokens
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html
  - title: Managing customer authentication tokens via OAuth 2.0
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-customer-authentication-tokens-via-oauth-2.0.html
  - title: Managing customers
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html
  - title: Managing customer passwords
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-customer-passwords.html
  - title: Managing customer addresses
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html
  - title: Retrieve customer carts
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-customer-carts.html
  - title: Retrieving customer orders
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html
---

After a customer has been created (to create a customer, see [Customers](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html)), the registration must be confirmed. This endpoint allows you to do that by sending a confirmation code received by email.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html).

## Confirm customer registration

To confirm customer registration, send the request:

***
`POST` **/customer-confirmation**
***

### Request

Request sample: confirm customer registration

`POST` **/customer-confirmation**

```json
{
  "data" : {
     "type": "customer-confirmation",
     "attributes": {
            "registrationKey": "e13ec2a7c45c6d1bae9b266ed90dfff0"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| registrationKey | String | ✓ | Customer's registration key. You can get it from the link in the customer confirmation registration email sent after customer creation. The example link: `https://mysprykershop.com/register/confirm?token=e13ec2a7c45c6d1bae9b266ed90dfff0`, where `e13ec2a7c45c6d1bae9b266ed90dfff0` is the registration key. |

### Response

If the customer email is confirmed successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE| REASON |
| --- | --- |
| 423 | Confirmation code is invalid or has been already used. |
| 901 | Confirmation code is empty. |
For generic Glue Application errors that can also occur, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).

## Next Steps

[Authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html)
