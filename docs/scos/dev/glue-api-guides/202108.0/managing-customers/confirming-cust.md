---
title: Confirming customer registration
originalLink: https://documentation.spryker.com/2021080/docs/confirming-customer-registration
redirect_from:
  - /2021080/docs/confirming-customer-registration
  - /2021080/docs/en/confirming-customer-registration
---

After a customer has been created (to create a customer, see [Customers](https://documentation.spryker.com/docs/customers)), the registration must be confirmed. This endpoint allows you to do that by sending a confirmation code received by email.

## Installation 
For detailed information on the modules that provide the API functionality and related installation instructions, see [Customer Account Management feature integration](https://documentation.spryker.com/2021080/docs/customer-account-management-feature-integration).

## Confirm customer registration
To confirm customer registration, send the request:
***
`POST` **/customer-confirmation**
***

### Request

Request sample: `POST` **/customer-confirmation**

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

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| registrationKey | String | ✓ | Customer’s registration key. You can get it from the link in the customer confirmation registration email sent after customer creation. The example link: https://mysprykershop.com/register/confirm?token=e13ec2a7c45c6d1bae9b266ed90dfff0, where `e13ec2a7c45c6d1bae9b266ed90dfff0` is the registration key. |

### Response
If the customer email is confirmed successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| Code| Reason |
| --- | --- |
| 423 | Confirmation code is invalid or has been already used. |
| 901 | Confirmation code is empty. |
For generic Glue Application errors that can also occur, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

## Next Steps
* [Authenticating as a customer](https://documentation.spryker.com/docs/authenticating-as-a-customer)

