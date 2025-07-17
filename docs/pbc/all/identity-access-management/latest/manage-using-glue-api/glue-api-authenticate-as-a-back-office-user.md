---
title: "Glue API: Authenticate as a Back Office user"
description: Learn how to authenticate as a Back Office user using the Spryker Glue API for your Spryker users
last_updated: Nov 13, 2023
template: glue-api-storefront-guide-template
---

This endpoint allows authenticating as a Back Office user.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Customer Account Management Glue API](/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-the-customer-account-management-glue-api.html).

## Authenticate as a Back Office user

---
`POST` **/token**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Content-Type | application/x-www-form-urlencoded | &check; | `x-www-form-urlencoded` is a URL encoded form. This is the default value if the encrypted attribute is not set to anything. The keys and values are encoded in key-value tuples separated by `&`, with a `=` between the key and the value. Non-alphanumeric characters in both keys and values are percent encoded. |

<details><summary>Request sample: authenticate as a Back Office user</summary>

| REQUEST BODY KEY | VALUE |
|-|-|
| grant_type | password |
| username | sonia@spryker.com |
| password | change123 |

</details>

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| grant_type | password | &check; | Method through which the application can gain Access Tokens and by which you grant limited access to the resources to another entity without exposing credentials. |
| username | String | &check; | Back Office user's username. You define it when [creating](/docs/pbc/all/user-management/latest/base-shop/manage-in-the-back-office/manage-users/create-users.html) or [editing users](/docs/pbc/all/user-management/latest/base-shop/manage-in-the-back-office/manage-users/edit-users.html). |
| password | String | &check; | Back Office user's password. You define it when [creating](/docs/pbc/all/user-management/latest/base-shop/manage-in-the-back-office/manage-users/create-users.html) or [editing users](/docs/pbc/all/user-management/latest/base-shop/manage-in-the-back-office/manage-users/edit-users.html). |

### Response

<details><summary>Response sample: authenticate as a Back Office user</summary>

```json
{
    "token_type": "Bearer",
    "expires_in": 28800,
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6IjMwZWM0NDEwMDBhYzM3NmJmZTU2NGVjNjVhODdjYWY0ODUzZGMwYjZjOGM2MzRlZTk2ODlmOTZkMzZmODIzMzgzNDM1MWYzMTM3MzZiYTYyIiwiaWF0IjoxNjk5MzQ3ODM0LjQ2MTU5MDEsIm5iZiI6MTY5OTM0NzgzNC40NjE1OTI5LCJleHAiOjE2OTkzNzY2MzQuNDQyNjc2MSwic3ViIjoie1widXNlcl9yZWZlcmVuY2VcIjpudWxsLFwiaWRfdXNlclwiOjQsXCJ1dWlkXCI6XCIwZDc0M2NjMy1hNzcyLTUxNDUtOTcxZS1kNDAxOGVlN2E0ODlcIn0iLCJzY29wZXMiOlsidXNlciJdfQ.o96j8nuU8EPf674f449KZxGAQi3TGL17U45DNqiJUZQJXpABmJG-qUug4HdlFLnzIMMHLUKIdsjF4Dd2ArOJ_1o6uaxtPB_z_4Kau8bUiittTye1y0wJ3YjCy1VbQIKynIJ7E0_VCOv1Ok0gRiYJC5hfwiHOhXdIbkoG1d9CWWE542nAm1xH__QDYlrwh57RJBLAXB7HCF7EGobQkYiiQXnJ4-qPkSHGL_sXuHQgnkXD7qLpLILv0TwCe-ZrOM1RwI53AFyKrZDU2cJQdFNTF3zI6hsadZOTcvRVk8wS95G3KKrAuURHi46w13oLqFL3-V1lq_JnjCZp3Uu68xGtiA",
    "refresh_token": "def5020074bed6be1f1310453251c9f9cffff6ed531b7d1ea31dbc7e5ef072a7f56a54fbda6a6b2126d46b9a8b9b4ae649ca1502cc0f01fbbcfb95ab79299a9b6fe310966fdcb58b8688b424b95b123503fdc388d318fad63f1e86a184321f097b4c4e51648952448bcee315df2cac018089591c31348b5e107e8d37e8256afbd142da1011b9cf390715c11f5dfeff0b106bd5bd3df1a142c8c72fcafc5b682f2fb110e03a387c1041a21e3ee15165dff52b159fc6ef57c50b2c3b39381d604648c413d7ca6845f5ae62fb649caabd6f5f87da2535406b91c6f042fc98989289f9f0ab7b7be33597418149a394aea31194be458db2877c22b7eb48f190f351e7bbaee7563f0a5e16cc5bb1da9449c713771c47d164e105a2d27b378824fa322c5038df8e64049eb5bdbd28e8994e59e4c05da788fb064a081d78e14cb360be1fe76621f2da11d85255031f59f5859033b5029c53ac647f61c132fa5f3e04853d126d58f5bd115aadc9f3d36543167f285c115e7593212b7d85816ecf3749e3d19f17d8f86f999fca3e5a9dbea3a6026a321f52309b2068f1487cf11212f0515f5399906fbc167dda9ae3325b500f150397c7b07858568decc7668244bc59cd439fc8e7255f970c20"
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|
| token_type | String | Type of the authentication token. Set this type when sending a request with the token. |
| access_token | String | Authentication token used to send requests to the protected resources available for this Back Office user. |
| expires_in | Integer | Time in seconds in which the `access_token` token expires. |
| refresh_token | String | Authentication token used to refresh `access_token`. |


## Possible errors

| ERROR NAME | DESCRIPTION |
|-|-|
| invalid_grant | The provided user credentials are incorrect or invalid. |
| unsupported_grant_type | The provided grant type is not supported. The grant type must be `password`. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).
