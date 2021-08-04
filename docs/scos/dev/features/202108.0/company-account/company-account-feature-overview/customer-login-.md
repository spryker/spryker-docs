---
title: Customer Login by Token overview
originalLink: https://documentation.spryker.com/2021080/docs/customer-login-by-token-overview
redirect_from:
  - /2021080/docs/customer-login-by-token-overview
  - /2021080/docs/en/customer-login-by-token-overview
---

Most modern e-commerce applications allow customers to log in by token or, in other words, they support token-based authentication. They do so for several good reasons:

* Tokens are stateless: They are stored on the client side and already contain all the information they need for authentication. No session information on the server is great for scaling your application.

* Tokens are secure: Tokens (not cookies) are sent on every request, which helps to prevent attacks. Since the session is not stored, there is no session-based information that could be manipulated.

* Extensibility and access control: In the token payload, you can specify user roles, permissions as well as resources that the user can access. Besides, you can share some permissions with other applications.

*Customer Login* by Token feature allows B2B users to log in to Spryker Shop using a token. 

A *token* is a unique identifier that contains all the information needed for authentication to fetch a specific resource without using a username and password. The tokens are JSON strings that are encoded in base64url format.

The lifetime of the token is 8 hours by default, but this value can be changed on the project level.

## Token Structure
Every token consists of the three sections separated by periods.

![Token struc](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Customer+Login+by+Token/Customer+Login+by+Token+Feature+Overview/token-structure.png)

* **Header** contains the information about the token type (JWT) and the encryption algorithm (RS256). For example:

```json
{
  "typ": "JWT",
  "alg": "RS256",
  "jti": "9ced66ac5cefe17681576bf95b800078e3020142faaa524da871ffb2a63508952045e10453136bde"
}
```
Once the header is encoded, we get the part of the token:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjljZWQ2NmFjNWNlZmUxNzY4MTU3NmJmOTViODAwMDc4ZTMwMjAxNDJmYWFhNTI0ZGE4NzFmZmIyYTYzNTA4OTUyMDQ1ZTEwNDUzMTM2YmRlIn0
```

* **Payload** is the part where multiple claims (statements) about the user identity and additional data, for example, permissions are stored. Here we put the information that we need to transmit.  _id_customer_ and _idcompanyuser_ are included by default, however, you can extend the payload with any data according to your project requirements.

Example payload:

```json
{
     "aud": "frontend",
      "jti": "9ced66ac5cefe17681576bf95b800078e3020142faaa524da871ffb2a63508952045e10453136bde",
      "iat": 1557926620,
      "nbf": 1557926620,
      "exp": 1557955420,
      "sub": "    {\"customer_reference\":null,\"id_customer\":6,\"id_company_user\":\"1\",\"permissions\":null}",
  "scopes": []
}
```
The example above contains six [registered claims](https://www.iana.org/assignments/jwt/jwt.xhtml) that, when encoded, correspond to:

```
eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6IjljZWQ2NmFjNWNlZmUxNzY4MTU3NmJmOTViODAwMDc4ZTMwMjAxNDJmYWFhNTI0ZGE4NzFmZmIyYTYzNTA4OTUyMDQ1ZTEwNDUzMTM2YmRlIiwiaWF0IjoxNTU3OTI2NjIwLCJuYmYiOjE1NTc5MjY2MjAsImV4cCI6MTU1Nzk1NTQyMCwic3ViIjoie1wiY3VzdG9tZXJfcmVmZXJlbmNlXCI6bnVsbCxcImlkX2N1c3RvbWVyXCI6NixcImlkX2NvbXBhbnlfdXNlclwiOlwiMVwiLFwicGVybWlzc2lvbnNcIjpudWxsfSIsInNjb3BlcyI6W119
```

* **Signature** contains the hash of the header, the payload and the secret needed

The example signature is the following:

```json
RSASHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

The final part of the encoded token will look like this:
```
v6kvCtNMM-_x-sRWugigT2j7qXVXQ9Ds5a-65sD_d4Oaun0toGnM_A-458mCyV1FCdyOHU572hdz7w3SFcIHzFw4zGGr_cqMdBmCF6VJS21lcOK401j2Li4NJB-8TmOHMk1XmjrJ92EyBScvycTg8TCkY3w4jcIGN7TPGAwzvEWaJhIwqYGjEUcTWtsiIemeWijTWVYd4qE6gnXdzMeyekFLon9syLnXdxeAQ8qNM7BML5QfvazvuMBvFQWfatDcRd2SFfIkNmMrxEQ6daEaPEfyqpdXpHfhpzvuQpA0hQQ9BfYBrwvTskpH_CWTht7IsOqlY4KYRNIg-t3tcZYt6Q
```
Combining the three parts, an exemplary URL with the full token will look like:

```
http://mysprykershop.com/access-token/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjljZWQ2NmFjNWNlZmUxNzY4MTU3NmJmOTViODAwMDc4ZTMwMjAxNDJmYWFhNTI0ZGE4NzFmZmIyYTYzNTA4OTUyMDQ1ZTEwNDUzMTM2YmRlIn0.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6IjljZWQ2NmFjNWNlZmUxNzY4MTU3NmJmOTViODAwMDc4ZTMwMjAxNDJmYWFhNTI0ZGE4NzFmZmIyYTYzNTA4OTUyMDQ1ZTEwNDUzMTM2YmRlIiwiaWF0IjoxNTU3OTI2NjIwLCJuYmYiOjE1NTc5MjY2MjAsImV4cCI6MTU1Nzk1NTQyMCwic3ViIjoie1wiY3VzdG9tZXJfcmVmZXJlbmNlXCI6bnVsbCxcImlkX2N1c3RvbWVyXCI6NixcImlkX2NvbXBhbnlfdXNlclwiOlwiMVwiLFwicGVybWlzc2lvbnNcIjpudWxsfSIsInNjb3BlcyI6W119.v6kvCtNMM-_x-sRWugigT2j7qXVXQ9Ds5a-65sD_d4Oaun0toGnM_A-458mCyV1FCdyOHU572hdz7w3SFcIHzFw4zGGr_cqMdBmCF6VJS21lcOK401j2Li4NJB-8TmOHMk1XmjrJ92EyBScvycTg8TCkY3w4jcIGN7TPGAwzvEWaJhIwqYGjEUcTWtsiIemeWijTWVYd4qE6gnXdzMeyekFLon9syLnXdxeAQ8qNM7BML5QfvazvuMBvFQWfatDcRd2SFfIkNmMrxEQ6daEaPEfyqpdXpHfhpzvuQpA0hQQ9BfYBrwvTskpH_CWTht7IsOqlY4KYRNIg-t3tcZYt6Q

```

In Spryker Commerce OS, token generation is performed using a facade method, that is why no GUI is present. To generate a token, see [HowTo - Generate a Token for Login](/docs/scos/dev/tutorials-and-howtos/202009.0/howtos/feature-howtos/howto-generate-).

Token-based authentication works closely with the [Punch Out](https://documentation.spryker.com/docs/punchout) feature. It allows B2B buyers to log in from their ERP system to a Spryker company user account using a token without entering the username and password and buy the products from Spryker e-commerce shop.

To make the feature more flexible, we have implemented the functionality that allows you to disable switching between the Business-on Behalf accounts. E.g., if the user logs in to the pre-defined company account that has Business-on-Behalf feature integrated, the shop owner can disable the ability to switch between the accounts. In case the Business-on-Behalf is disabled, the company user will log in to the default account and will not be able to switch between the company users within their company account.

Module Relations for Customer Login by Token feature are schematically represented in the following diagram:

![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Customer+Login+by+Token/Customer+Login+by+Token+Feature+Overview/customer-login-by-token-module-relations.png)


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/howto-generate-a-token-for-login" class="mr-link">Generate a token for login</a></li>
                <!---<li><a href="https://documentation.spryker.com/docs/ht-disable-accounts-switch-for-bob" class="mr-link">HowTo - Disable Accounts Switch for Business on Behalf</a></li>-->
                 <li><a href="https://documentation.spryker.com/docs/company-account-integration" class="mr-link">Enable Customer Login by Token by integrating the Company Account feature into your project</a></li>
            </ul>
        </div>

