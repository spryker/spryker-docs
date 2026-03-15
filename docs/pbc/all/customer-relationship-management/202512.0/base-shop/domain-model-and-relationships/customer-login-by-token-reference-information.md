---
title: "Customer Login by Token: reference information"
description: Learn about the Customer login by token within Spryker, using the base64url format for the tokens and how tokens are structured.
template: feature-walkthrough-template
last_updated: Nov 17, 2023
originalLink: https://documentation.spryker.com/2021080/docs/customer-login-by-token-overview
redirect_from:
- /docs/scos/dev/feature-walkthroughs/202200.0/company-account-feature-walkthrough/customer-login-by-token-reference-information.html
- /docs/scos/dev/feature-walkthroughs/202311.0/company-account-feature-walkthrough/customer-login-by-token-reference-information.html
- /docs/scos/dev/feature-walkthroughs/202204.0/company-account-feature-walkthrough/customer-login-by-token-reference-information.html
---

A *token* is a unique identifier that contains all the information needed for authentication to fetch a specific resource without using a username and password. The tokens are JSON strings that are encoded in base64url format.

The lifetime of the token is 8 hours by default, but this value can be changed at the project level.

## Token structure

Every token consists of three sections separated by periods.

![Token structure](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Customer+Login+by+Token/Customer+Login+by+Token+Feature+Overview/token-structure.png)

- The *header* contains the information about the token type (JWT) and the encryption algorithm (RS256). For example:

```json
{
  "typ": "JWT",
  "alg": "RS256",
  "jti": "9ced66ac5cefe17681576bf95b800078e3020142faaa524da871ffb2a63508952045e10453136bde"
}
```

Once the header is encoded, we get the part of the token:

```text
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjljZWQ2NmFjNWNlZmUxNzY4MTU3NmJmOTViODAwMDc4ZTMwMjAxNDJmYWFhNTI0ZGE4NzFmZmIyYTYzNTA4OTUyMDQ1ZTEwNDUzMTM2YmRlIn0
```

- The *payload* stores multiple claims (statements) about the user's identity and additional data—for example, permissions. Here, you can find the needed information for transmission. The `id_customer` and `idcompanyuser` identifiers are included by default. However, you can extend the payload with any data according to your project requirements.

Example payload:

```json
{
     "aud": "frontend",
      "jti": "9ced66ac5cefe17681576bf95b800078e3020142faaa524da871ffb2a63508952045e10453136bde",
      "iat": 1557926620,
      "nbf": 1557926620,
      "exp": 1557955420,
      "sub": "    {/"customer_reference/":null,/"id_customer/":6,/"id_company_user/":/"1/",/"permissions/":null}",
  "scopes": []
}
```

The example above contains six [registered claims](https://www.iana.org/assignments/jwt/jwt.xhtml) that, when encoded, correspond to the following:

```text
eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6IjljZWQ2NmFjNWNlZmUxNzY4MTU3NmJmOTViODAwMDc4ZTMwMjAxNDJmYWFhNTI0ZGE4NzFmZmIyYTYzNTA4OTUyMDQ1ZTEwNDUzMTM2YmRlIiwiaWF0IjoxNTU3OTI2NjIwLCJuYmYiOjE1NTc5MjY2MjAsImV4cCI6MTU1Nzk1NTQyMCwic3ViIjoie1wiY3VzdG9tZXJfcmVmZXJlbmNlXCI6bnVsbCxcImlkX2N1c3RvbWVyXCI6NixcImlkX2NvbXBhbnlfdXNlclwiOlwiMVwiLFwicGVybWlzc2lvbnNcIjpudWxsfSIsInNjb3BlcyI6W119
```

- The *signature* contains the hash of the header, payload, and secret needed.

The following is an example signature:

```json
RSASHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

The final part of the encoded token looks like this:

```text
v6kvCtNMM-_x-sRWugigT2j7qXVXQ9Ds5a-65sD_d4Oaun0toGnM_A-458mCyV1FCdyOHU572hdz7w3SFcIHzFw4zGGr_cqMdBmCF6VJS21lcOK401j2Li4NJB-8TmOHMk1XmjrJ92EyBScvycTg8TCkY3w4jcIGN7TPGAwzvEWaJhIwqYGjEUcTWtsiIemeWijTWVYd4qE6gnXdzMeyekFLon9syLnXdxeAQ8qNM7BML5QfvazvuMBvFQWfatDcRd2SFfIkNmMrxEQ6daEaPEfyqpdXpHfhpzvuQpA0hQQ9BfYBrwvTskpH_CWTht7IsOqlY4KYRNIg-t3tcZYt6Q
```

Combining the three parts, an example URL with the full token looks like the following:

```text
http://mysprykershop.com/access-token/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjljZWQ2NmFjNWNlZmUxNzY4MTU3NmJmOTViODAwMDc4ZTMwMjAxNDJmYWFhNTI0ZGE4NzFmZmIyYTYzNTA4OTUyMDQ1ZTEwNDUzMTM2YmRlIn0.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6IjljZWQ2NmFjNWNlZmUxNzY4MTU3NmJmOTViODAwMDc4ZTMwMjAxNDJmYWFhNTI0ZGE4NzFmZmIyYTYzNTA4OTUyMDQ1ZTEwNDUzMTM2YmRlIiwiaWF0IjoxNTU3OTI2NjIwLCJuYmYiOjE1NTc5MjY2MjAsImV4cCI6MTU1Nzk1NTQyMCwic3ViIjoie1wiY3VzdG9tZXJfcmVmZXJlbmNlXCI6bnVsbCxcImlkX2N1c3RvbWVyXCI6NixcImlkX2NvbXBhbnlfdXNlclwiOlwiMVwiLFwicGVybWlzc2lvbnNcIjpudWxsfSIsInNjb3BlcyI6W119.v6kvCtNMM-_x-sRWugigT2j7qXVXQ9Ds5a-65sD_d4Oaun0toGnM_A-458mCyV1FCdyOHU572hdz7w3SFcIHzFw4zGGr_cqMdBmCF6VJS21lcOK401j2Li4NJB-8TmOHMk1XmjrJ92EyBScvycTg8TCkY3w4jcIGN7TPGAwzvEWaJhIwqYGjEUcTWtsiIemeWijTWVYd4qE6gnXdzMeyekFLon9syLnXdxeAQ8qNM7BML5QfvazvuMBvFQWfatDcRd2SFfIkNmMrxEQ6daEaPEfyqpdXpHfhpzvuQpA0hQQ9BfYBrwvTskpH_CWTht7IsOqlY4KYRNIg-t3tcZYt6Q
```

In the Spryker Commerce OS, token generation is performed using a facade method, which is why no GUI is present. To generate a token, see [HowTo: Generate a token for login](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/generate-login-tokens.html).

To make the feature more flexible, we have implemented the functionality that lets you disable switching between the Business-on Behalf accounts. For example, if the user logs in to the pre-defined company account that has Business-on-Behalf feature integrated, the shop owner can disable the ability to switch between the accounts. In case the Business-on-Behalf is disabled, the company user logs in to the default account and can't switch between the company users within their company account.
