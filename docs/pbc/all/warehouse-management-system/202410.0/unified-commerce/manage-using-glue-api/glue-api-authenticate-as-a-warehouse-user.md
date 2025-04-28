---
title: "Glue API: Authenticate as a warehouse user"
description: Learn how to authenticate as a warehouse user using Glue API in your Spryker Unified Commerce projects.
last_updated: Nov 13, 2023
template: glue-api-storefront-guide-template
---

This endpoint allows authenticating as a warehouse user. Warehouse users need to authenticate to interact with picklists.

## Installation

[Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html).

## Authenticate as a warehouse user

***
`POST` **/warehouse-tokens**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

Request sample: `POST http://glue-backend.mysprykershop.com/warehouse-tokens`

### Response

<details><summary>Response sample: authenticate as a warehouse user</summary>

```json
[
    {
        "tokenType": "Bearer",
        "expiresIn": 604800,
        "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6ImEzZTViZTc0NjdkZTIwZTQ4YmEzN2YzNmM0YzRhZGUxZWQyNDc5MTJhZWVmODBlOGZhNjQ2NGYzYTI3NjUyYTE5NDRjNGI5ODVlYTA2YjQ0IiwiaWF0IjoxNzAwMDM2MjY2Ljc1MTI1MjksIm5iZiI6MTcwMDAzNjI2Ni43NTEyNTY5LCJleHAiOjE3MDA2NDEwNjYuNzM1ODMxLCJzdWIiOiJ7XCJpZF93YXJlaG91c2VcIjoxfSIsInNjb3BlcyI6WyJ3YXJlaG91c2UiXX0.deE1iflg8DSACky5lwua074FamXCJV3PPmUgNubhQ-YeVaspXc-saPl5-juF53uJUENTA9_uUmBK9i9hwLhzivEup5Oz8UpY0dYfzyvlq2CkL_FbaHvLNJXZUsnFeliqF0Py_Cdf54avQsqYgxKcbk9VeidRlzwGD2DgntqQnkpW-GOrMTNimR1XmbMbnTSQiz4H-wyS33fNMUcASkrJYt-Olorc_JVebVP4kjnUcHTOQJXeZvMWz3TciVBk0oWVeIY8hDqC8qK-rKrdbQCsSaS6R4L9G-CvUu8LcwhOXY3p57tsowQgwDLjLsVtIZyAWApXNOT8CGhCq_4wfl114Q",
        "refreshToken": "def50200336e5b86d14b6e91ff16b70ebeb322f7dbf37138ba336e0c2c69b120835e3ff74481bf2f9e8c4e87ffe4d3da7081f5555b193a826514ccfddb50f2ea1665c803f94edfb95f8b8f07d3b8ead91dc2be6a529cc19a752b7113d80bdbe4804b4a21e3ba9a431af5cb667cd2eb8ccdd68939e72f10d56c89f1c7d95475bf6d67e55ac6bd43dad86878fdfab9ab2adf18577800e26338bd24329f1d3f58d920e415aabca412ae33f9600a0c0b2d11586c4a90e5a0fb47bae2b14eed3f33121e054f5ea0a47579d4e2b6e6fd166a4b8cb26a0e8dee3763fb59408748f7cda02e098d7297e68a4a8ae77c5d266195c5629ee7bd9234735c9599733d91222da0b3945748da0eae30e7da17eedb75821220db84be08aafb5f070cdc310c475ccf2ea15af148088d6d067b2dab86dba584d2122ec772bf4274b98b0bfbb684635829718653bb0cac58296da1bc8fb3c1700324ad140f3457b613ba58a9f1ac8405746a543ba2a05c6a07753265ca36496e1bcde0984e6ea8ee0d100fb457a12970bb6ded995848922f"
    }
]
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|
| tokenType | String | Type of the authentication token. Set this type when sending a request with the token. |
| expiresIn | Integer | Time in seconds in which the `access_token` token expires. |
| accessToken | String | Authentication token used to send requests to the protected resources available for this warehouse user. |
| refreshToken | String | Authentication token used to refresh `access_token`. |


## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | The provided access token is invalid. To get an access token, see [Authenticate as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
