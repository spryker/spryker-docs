---
title: "Glue API: Impersonate customers as an agent assist"
description: As an agent assist, authenticate as a customer and impersonate them.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/impersonating-customers-as-an-agent-assist
originalArticleId: 603fa249-5eab-42d0-93c3-3c09f75da9d0
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-agent-assists/impersonating-customers-as-an-agent-assist.html
  - /docs/pbc/all/user-management/202204.0/base-shop/manage-using-glue-api/glue-api-impersonate-customers-as-an-agent-assist.html
related:
  - title: Agent Assist feature overview
    link: docs/pbc/all/user-management/page.version/base-shop/agent-assist-feature-overview.html
  - title: Authenticate as an agent assist
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-an-agent-assist.html
  - title: Managing agent assist authentication tokens
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-agent-assist-authentication-tokens.html
  - title: Search by customers as an agent assist
    link: docs/pbc/all/user-management/page.version/base-shop/manage-using-glue-api/glue-api-search-by-customers-as-an-agent-assist.html
---

Impersonating a customer allows an [agent assist](/docs/pbc/all/user-management/{{page.version}}/base-shop/agent-assist-feature-overview.html) to perform actions on their behalf. To impersonate a customer, they receive their Glue API authentication token. Using the token, agent assists perform any action available to the customer.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

* [Install the Agent Assist Glue API](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-agent-assist-glue-api.html)

* [Install the Customer Account Management + Agent Assist feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-agent-assist-feature.html)

* [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html)

## Impersonate a customer


To impersonate a customer, authenticate as a customer by sending the request:

***
`POST` **/agent-customer-impersonation-access-tokens**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Agent-Authorization | string | &check; | String containing digits, letters, symbols that authorized the agent assist. [Authenticate as an agent assist](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-an-agent-assist.html#authenticate-as-an-agent-assist) to get the value.  |


Request sample: impersonate a customer

`POST http://glue.mysprykershop.com/agent-customer-impersonation-access-tokens`

```json
{
    "data": {
        "type": "agent-customer-impersonation-access-tokens",
        "attributes": {
            "customerReference": "DE--5"
        }
    }
}
```


| ATTRIBUTE | TYPE |
| --- | --- |
| customerReference | String | v | Defines the customer to impersonate. [Search by customers](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-search-by-customers-as-an-agent-assist.html#search-by-customers) to get it. |


### Response

<details>
<summary markdown='span'>Response sample: impersonate a customer</summary>

```json
{
    "data": {
        "type": "agent-customer-impersonation-access-tokens",
        "id": null,
        "attributes": {
            "tokenType": "Bearer",
            "expiresIn": 28800,
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6ImZkNTYzYTJhZjcyZmRmMzk5NzRmZTk3MGFjZDg1Njc5MmY5ZmU2MzkyZjY1NDdjMmZkODk2NGIzNzlkMDRlMGFjYTg2ZGNmNTgwYjg1MTNkIiwiaWF0IjoxNjAwODQ1NDI4LCJuYmYiOjE2MDA4NDU0MjgsImV4cCI6MTYwMDg3NDIyOCwic3ViIjoie1wiaWRfY29tcGFueV91c2VyXCI6XCJkZmZjNjIyYi04ZGQ2LTU5ZWMtOGUxOS1jNWE0ZDVlNzRiMWFcIixcImlkX2FnZW50XCI6bnVsbCxcImN1c3RvbWVyX3JlZmVyZW5jZVwiOlwiREUtLTVcIixcImlkX2N1c3RvbWVyXCI6NSxcInBlcm1pc3Npb25zXCI6e1wicGVybWlzc2lvbnNcIjpbe1wiaWRfcGVybWlzc2lvblwiOjEsXCJrZXlcIjpcIlJlYWRTaGFyZWRDYXJ0UGVybWlzc2lvblBsdWdpblwiLFwiY29uZmlndXJhdGlvblwiOntcImlkX3F1b3RlX2NvbGxlY3Rpb25cIjpbMzMsNV19LFwiY29uZmlndXJhdGlvbl9zaWduYXR1cmVcIjpcIltdXCIsXCJpZF9jb21wYW55X3JvbGVcIjpudWxsLFwiaXNfaW5mcmFzdHJ1Y3R1cmFsXCI6bnVsbH0se1wiaWRfcGVybWlzc2lvblwiOjIsXCJrZXlcIjpcIldyaXRlU2hhcmVkQ2FydFBlcm1pc3Npb25QbHVnaW5cIixcImNvbmZpZ3VyYXRpb25cIjp7XCJpZF9xdW90ZV9jb2xsZWN0aW9uXCI6WzMzLDVdfSxcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6XCJbXVwiLFwiaWRfY29tcGFueV9yb2xlXCI6bnVsbCxcImlzX2luZnJhc3RydWN0dXJhbFwiOm51bGx9LHtcImlkX3Blcm1pc3Npb25cIjpudWxsLFwia2V5XCI6XCJSZWFkU2hvcHBpbmdMaXN0UGVybWlzc2lvblBsdWdpblwiLFwiY29uZmlndXJhdGlvblwiOntcImlkX3Nob3BwaW5nX2xpc3RfY29sbGVjdGlvblwiOltdfSxcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6W10sXCJpZF9jb21wYW55X3JvbGVcIjpudWxsLFwiaXNfaW5mcmFzdHJ1Y3R1cmFsXCI6bnVsbH0se1wiaWRfcGVybWlzc2lvblwiOm51bGwsXCJrZXlcIjpcIldyaXRlU2hvcHBpbmdMaXN0UGVybWlzc2lvblBsdWdpblwiLFwiY29uZmlndXJhdGlvblwiOntcImlkX3Nob3BwaW5nX2xpc3RfY29sbGVjdGlvblwiOltdfSxcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6W10sXCJpZF9jb21wYW55X3JvbGVcIjpudWxsLFwiaXNfaW5mcmFzdHJ1Y3R1cmFsXCI6bnVsbH1dfX0iLCJzY29wZXMiOlsiY3VzdG9tZXJfaW1wZXJzb25hdGlvbiIsImN1c3RvbWVyIl19.XlUS6iR\_HAQxybsihbeWB1mC2-A1lSfWVMjsfWQwXcxO1QoBo61DIJoHPGerwSQpRCf3j5gHg3NkXyUUnTjWAj1U1zteIL2Dp9St6V8-K0teVvGPhkEuwCkK5ltHKnjyk5oXT36rq4KOrIY3yv2siaCHeSM18YhacGMMyE4xsoNGByccuQ7B0FZ\_IjLE1TXecEswvO6Bz5MDZ2D8vatWZ3DxTQuvX5QULJ1zjPQVeBAM1Kioz0pWIpcxwRY-66nDiLu4hMtJtiB2RtmaDyrVt-yu-ZjccRIaF6FZXJ1HmPJrVIS2R67ZKee5qixkFoy3lr3RsHPZW0fETrp4NprxJw",
            "refreshToken": "def50200576b97231d167a623f227fd375212f1923e9e5afd1ec5fd7a6d6347052b3daa2e8858436ebbc5e5fb519699bd931acdb64aba3f472e3b5e6ef1ce1c896c6f6580c2d30e158e3c7b15d08462c45d88235b4f38979a9d5a14f3072cf9a5de628718dc858f2eae063a81bc69bde25b89e1e67eda2fddf52a0bb576f6d687b5fb1e11cd1a6e349e743a99e28f4f17a27ad3323634d7c0152e707c07ceaefbccb0fb4000aa2f9d78ae5e8cc8b39e5f25db3de52c11d49412925d14456b3156ecdd5c43890383b2db6c5851a4241cea91f5fa70c3ce9756ba335ada48f833c94cd8ee9945d63a34d92eee5471626849b365f26ee9e047ab8409d2c8aaae9d9fc76f3e47cc247a4776ff05e9723ed23a51406da3d877e2c6cf0a614282b18841a17ec04790431097fc5591c0b1b0eb3c4bdbb057d29f09bb1d3f6816231ee5f6cca0fd4e8cbfaaf51a4a54e4cb2eb14aabe37cb320ebeec58b7ed23f3e0ef84099d4db47d8bcd320cf45861cb7b8efa31f8bbaebb616c4d4d494672fe20f49492a5a0981389ecdf5630b38abdaf53a3cca38fe3bcb32869fdd1461105d6a179d300777bed2a1a3d2c77e29094a31b473d606871531fc8b115f0826c779e58e8b44a2ca6aab3a73e29456e109e586c241118ae3cf51387341d0a95b87b83f0fcb11c1b0028fa4b74864424d1a68795ca51d29517fa9a5b5e28cec251dc57d556448cb50dbce8ac4c19d92aff9dc610feba44f5acb7ef2b3708b45ff1f2bc5873c6d1b25bfb426be48c50e6cf3bc24abcfacd661b76a33fa3082ab5a8cc7ef98d980094489d6363df62fd1c89390be29592eed8c220b39466be428cdfff552fd94ff3a83ea6c72ec2cadd4c00d83dd196767ef5662e788a4379212bb04ee466df067a9165bcd2ab1053e6b5831f43ce5844130ad7a8ad6aca06ff5bc3efe31211db1243bdcb7470a9b8616a5548166a25eee43ab2c9fe51b8b29f4ce6cc0aa1adb2eeaa8ae56d7e4801b8ac0149b2bda27b5160a5b9e220459f74b8546c6ab430f412935295e9e30b666156cd8bea426c366b896d9c0a5b58ce0fc7449880d534bd8b4328f3b55bcf039c028fc5c1c69f5e198dc3c231baf02bed922aeebe851c03fd075ff052ec244e66dcc277e56831cd3fdff7ecf7f8ec608af1d3e829e007dcfa3c54362e2b2a7ec9512c4fb949400bcd6bef7a25a43dc75333bd4447d50fcb6528c201b45c751875874fe00b15a16c04dcb3c141ecb211a218ba47b5369c3ef1dc5de3773d79c55d6650218b30969e1c7c8b85f45374d0a12aff0fd0643bac36c469b691320064cd6a509f0158ce4cfecd20d92d7d36667781b27117ac69c35c28ccdd765abe2462169e974aa2d03ecc1a8e4262d3847e86c43d82e168bc35886e531b2eaa6f1eacc6b60483c36435af6e7ce2b5365a17de844d1b254c0edcde6bebacbfef86f6a15ad81fbc6e4a598eba1d61ff763137a794aa2bb4e0513ec754fa2cfe0e1a931d678709a8e657ff476de0db74291f6e3c11f8c1e4f10b00c1ddc30c1a4673d0cd1ab8eb6ad832477e511d6bbdd24a67aecb071043ed78aafeebb0b5b2dd24eb061943de3a52503a4a16dde76bbbee1b9d629397e0c5b845c023a3dbaad7b0e9686bf7abfc88bc52b397629b57fb5c242a6baa2ac1d078d03e53a813fef2962c83f8fc993b7b5553d27c0ec971b20347ec78ad03f6abe56f4c5da3b8a08ba85ff43580db181308b29cd5b06e89a07bb91daf7edf4729a06969f906db1bb62b9fcf783a609b046d05671fec262ffe70b3ca073e4adfba3a6dfcc77349b6419eb8e94a1751b3dca38c69b7390e447cfa2afccef26dd3140cbfd03e2d286aa35da5f65c06c9782c288c1d36747af34629796d4b4d600ce3018c651593701c2cf8f48bb14b96cb7717d86746dc4617158aea924eb469648aceb76a6e43aa7df12ac06d0e72383bb5"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/agent-customer-impersonation-access-tokens"
        }
    }
}
```
</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| tokenType | String | Type of the [authentication token](/docs/dg/dev/glue-api/{{page.version}}/authentication-and-authorization.html). Set this type when sending a request with the token. |
| expiresIn | Integer | The time in seconds in which the token expires. |
| accessToken | String | Authentication token used to send requests to the protected resources available for the impersonated customer. |
| refreshToken | String | Token used to [refresh](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html#refresh-an-authentication-token) the `accessToken`. |

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is invalid. |
| 4103 | Action is available to an agent user only. |
| 4104  | Failed to impersonate a customer. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).

## Next steps

After you’ve authenticated as a customer, you can impersonate them:
* [Manage carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html)
* [Manage cart items](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html)
* [Manage gift cards](/docs/pbc/all/gift-cards/{{page.version}}/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html)
* [Manage wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html)
* [Manage orders](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html)  

Also, you can [refresh the agent assist authentication token](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-agent-assist-authentication-tokens.html#refresh-an-agent-assist-authentication-token) or [revoke the agent assist refresh token](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-agent-assist-authentication-tokens.html#revoke-an-agent-assist-refresh-token).
