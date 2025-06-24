## 2) Activating MFA (First-time Setup)

If the method status is 0 (not enabled), you need to activate MFA.

### 2.1) Trigger activation

This sends a code to the user via the selected method (for example, email).

**Request**

```http
POST /multi-factor-auth-type-activate
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "data": {
    "type": "multi-factor-auth-type-activate",
    "attributes": {
      "type": "email"
    }
  }
}
```

**Response**: 204 No Content — code has been sent.

### 2.2) Verify the code

After the activation request, the system sends a verification code to the user's email address (or the method specified). The user should retrieve the code from their email inbox.

{% info_block infoBox "Note" %}

💡 For email MFA, the code is typically sent to the email address associated with the authenticated user.

{% endinfo_block %}

Once the code is received, verify it using the following request. The verification code must be provided in the `X-MFA-Code` header:

**Request**

```http
POST /multi-factor-auth-type-verify
Authorization: Bearer <access_token>
X-MFA-Code: 123456
Content-Type: application/json

{
  "data": {
    "type": "multi-factor-auth-type-verify",
    "attributes": {
      "type": "email"
    }
  }
}
```

**Response**: 204 No Content — the MFA method is now activated and enabled.







## 4) Deactivate an MFA Method

To remove an active MFA method, you must first [trigger the code](#3.1-trigger-mfa) (if needed), and then call the deactivation endpoint with the received code.

**Request**

```http
POST /multi-factor-auth-type-deactivate
Authorization: Bearer <access_token>
X-MFA-Code: 123456
Content-Type: application/json

{
  "data": {
    "type": "multi-factor-auth-type-deactivate",
    "attributes": {
      "type": "email"
    }
  }
}
```