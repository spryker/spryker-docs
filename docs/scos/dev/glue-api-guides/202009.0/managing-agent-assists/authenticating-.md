---
title: Authenticating as an agent assist
originalLink: https://documentation.spryker.com/v6/docs/authenticating-as-an-agent-assist
redirect_from:
  - /v6/docs/authenticating-as-an-agent-assist
  - /v6/docs/en/authenticating-as-an-agent-assist
---


Log into the Storefront as an [agent assist](https://documentation.spryker.com/docs/agent-assist-overview) to help customers by performing actions on their behalf. After you’ve logged in, you can search by customers and impersonate them to perform any action available to them.


## Installation


For detailed information on the modules that provide the API functionality and related installation instructions, see:

*   [Glue API: Agent Assist feature integration](https://documentation.spryker.com/docs/glue-api-agent-assist-feature-integration)
    
*   [Customer Account Management + Agent Assist feature integration](https://documentation.spryker.com/docs/customer-account-management-agent-assist-feature-integration)
    
*   [Customer Account Management feature integration](https://documentation.spryker.com/docs/customer-account-management-feature-integration)
    


## Authenticate as an agent assist


To login as an agent, send the request:

* * *
`POST` **/agent-access-tokens**
* * *

### Request

Request sample: `POST https://glue.mysprykershop.com/agent-access-tokens`

```json
{
    "data": {
        "type": "agent-access-tokens",
        "attributes": {
            "username": "admin@spryker.com",
            "password": "change123"
        }
    }
}
```

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| username | String | &check; | Username of the agent assist. |
| password | String | &check; | Password of the agent assist. |


### Response

<details open>
    <summary>Response sample</summary>

```json
{
    "data": {
        "type": "agent-access-tokens",
        "id": null,
        "attributes": {
            "tokenType": "Bearer",
            "expiresIn": 28800,
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6ImIyYjZiOTJjZmQxMmJjM2VhYWY4ZDlmYTkwZDM3ODBkMWFiYmI3YzI5ZjY3NjQ5OTNjMjhlODlkNTBmZGU3OTA4NWFlODYwN2I0NWMyOGEzIiwiaWF0IjoxNjAwNzc1NjYwLCJuYmYiOjE2MDA3NzU2NjAsImV4cCI6MTYwMDgwNDQ2MCwic3ViIjoie1wiaWRfY29tcGFueV91c2VyXCI6bnVsbCxcImlkX2FnZW50XCI6MSxcImN1c3RvbWVyX3JlZmVyZW5jZVwiOm51bGwsXCJpZF9jdXN0b21lclwiOm51bGwsXCJwZXJtaXNzaW9uc1wiOm51bGx9Iiwic2NvcGVzIjpbImFnZW50Il19.RsW6bVZD1GotR_Nse8_m972aXzNaiQ1gVV42u-So0dQ91ebPgjCYnKBwfl9sZHZfuT5kV3e6UyY0WBzhBz12vTdPGh9AZ3LvOCVJ5f8fts2PHTdsnmcnWURlHzf0jjuw5cJLJzqItONAWke8Dd5cZfEybHTVAyUJuMe6kX_HqONiLiljnLE0_N9I7zw5l9rkuk8vlHRKmyl4vyf24bb22N5RcaXO5medMGgEqO3E6lQKzgjkk6d3iVS7pDuD_96uiHUddLLH9r1d5ba5JJ6M9oAgIUYpjxKNIHJIUV1sbZ9wYg5YAkxHp6RekjZOIigxflBDyRprIjHjelBsukZiSA",
            "refreshToken": "def50200546e22676da0c33a0af7a0d5d8c5f279b7f3f0709d5e2711e42ef0ee08015c3aaa1c46e15f2ce5a61f671f36db3f07d6a0105c5b3989ba6e87a8fb27534290dda6cbcee1ae249a7093505b927824d86dd3d62b8e5064c7f2b39fb79802fc16118e5245ae50b9ec92d2b3d63444dab761d16a36fd759e4d80661489ea422c4b03773935a49830290babe608a2bc09e9d48b4fd4d29eadc1bcfaee5523d14ad84d0b5e317a28cc0d4788a02cb1131a60947aff37bc3edfce5d3634181e372f7617bc4d973502b9b2e483944de772c680a00c2db51d614e486c52b7a49dd160d8edf34f76a9d9520f76fbbdb61f3343afe6f2399827190352b7d2a9101d70a669beb90623a511e0ab4dfafde887ebb306d44e0cad3cbc5e62a65a305e4ed6a749a527293584708109f9f0b3b3be9a00e08953b5b649a99e3b8acf4a30125d7eecc44b7d8611bbd6fd5d4ab3edee3011a4787b9a9130462c000aa685b93ffd394e87f384741e50e8194bfa8b310615769e22ab05dc61767a02ede133c02b792c8342429073b3ae2340772bed62c5d82227c35633375203d9e71328b1706dc1056a172e6bd9c4918f49ada7ea2233da880d56acad4367f2c69197e573dc762fa63c46a58740262fecb49e3a0413b1c742182ee085d6168c7bdb837bb6c5"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/agent-access-tokens"
        }
    }
}
```

</details>


| Attribute | Type | Description |
| --- | --- | --- |
| tokenType | String | Type of the authentication token. Set this type when sending a request with the token. |
| expiresIn | Integer | Time in seconds in which the `accessToken` token expires. |
| accessToken | String | Authentication token used to send requests to the protected resources available for this agent assist. |
| refreshToken | String | Authentication token used to refresh the `accessToken`. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

## Possible errors

| Code  | Reason |
| --- | --- |
|4101 | Failed to authenticate an agent. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

## Next steps


After you’ve authenticated in as an agent assist, you can:

*   [Search by customers](https://documentation.spryker.com/docs/searching-by-customers-as-an-agent-assist#search-by-customers)
    
*   [Impersonate a customer](https://documentation.spryker.com/docs/impersonating-customers-as-an-agent-assist#impersonate-a-customer)

