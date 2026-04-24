---
title: Error Handling
description: Learn how API Platform handles errors, validation failures, and domain-specific error codes in JSON:API format.
last_updated: Apr 7, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: Validation Schemas
    link: docs/dg/dev/architecture/api-platform/validation-schemas.html
  - title: Security
    link: docs/dg/dev/architecture/api-platform/security.html
  - title: Troubleshooting
    link: docs/dg/dev/architecture/api-platform/troubleshooting.html
---

API Platform automatically converts all exceptions into JSON:API formatted error responses. This includes domain errors thrown by Providers and Processors, validation failures, authentication errors, and unexpected exceptions.

## Error response format

All error responses follow the JSON:API error structure:

```json
{
  "errors": [
    {
      "code": "3701",
      "status": 404,
      "detail": "Product offer not found.",
      "message": "Product offer not found"
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `code` | `string` | Domain-specific numeric error code |
| `status` | `integer` | HTTP status code |
| `detail` | `string` | Human-readable error description |
| `message` | `string` | Short error message (detail without trailing period) |

## Throwing domain errors

Use `GlueApiException` in Providers and Processors to return domain-specific errors:

```php
use Spryker\ApiPlatform\Exception\GlueApiException;
use Symfony\Component\HttpFoundation\Response;

class ProductOffersStorefrontProvider extends AbstractProvider
{
    protected const string ERROR_CODE_OFFER_NOT_FOUND = '3701';
    protected const string ERROR_MESSAGE_OFFER_NOT_FOUND = 'Product offer not found.';

    protected const string ERROR_CODE_OFFER_ID_NOT_SPECIFIED = '3702';
    protected const string ERROR_MESSAGE_OFFER_ID_NOT_SPECIFIED = 'Product offer ID is not specified.';

    protected function provideItem(): ?object
    {
        $offerReference = $this->getUriVariables()['productOfferReference'] ?? null;

        if ($offerReference === null) {
            throw new GlueApiException(
                Response::HTTP_BAD_REQUEST,
                static::ERROR_CODE_OFFER_ID_NOT_SPECIFIED,
                static::ERROR_MESSAGE_OFFER_ID_NOT_SPECIFIED,
            );
        }

        $offer = $this->productOfferFacade->findByReference($offerReference);

        if ($offer === null) {
            throw new GlueApiException(
                Response::HTTP_NOT_FOUND,
                static::ERROR_CODE_OFFER_NOT_FOUND,
                static::ERROR_MESSAGE_OFFER_NOT_FOUND,
            );
        }

        return $this->mapToResource($offer);
    }
}
```

The `GlueApiException` constructor accepts:

| Parameter | Type | Description |
|-----------|------|-------------|
| `statusCode` | `int` | HTTP status code (use `Response::HTTP_*` constants) |
| `errorCode` | `string` | Domain-specific numeric error code |
| `message` | `string` | Human-readable error message |
| `previous` | `?\Throwable` | Optional previous exception for chaining |
| `headers` | `array` | Optional additional HTTP headers |

## Automatic not-found error codes

For `404 Not Found` responses, the system automatically resolves domain-specific error codes from Provider constants. Define constants following this naming convention:

```php
class CategoryNodesStorefrontProvider extends AbstractProvider
{
    protected const string ERROR_CODE_NODE_NOT_FOUND = '703';
    protected const string ERROR_MESSAGE_NODE_NOT_FOUND = 'Cannot find category node with the given id.';
}
```

When a Provider returns `null` for a `Get` operation, the system:
1. Checks the Provider class for `ERROR_CODE_*_NOT_FOUND` and `ERROR_MESSAGE_*_NOT_FOUND` constants
2. Returns those values in the error response instead of a generic `404` code

This convention removes the need to explicitly throw `GlueApiException` for simple not-found cases.

## Validation errors

Validation errors from resource schema constraints are handled automatically. When validation fails, the response returns status `422` with code `901`:

**Request:**

```http
POST /customers
Content-Type: application/vnd.api+json

{
  "data": {
    "type": "customers",
    "attributes": {
      "email": "invalid-email"
    }
  }
}
```

**Response (422):**

```json
{
  "errors": [
    {
      "code": "901",
      "status": 422,
      "detail": "email => This value is not a valid email address."
    },
    {
      "code": "901",
      "status": 422,
      "detail": "firstName => This value should not be blank."
    }
  ]
}
```

Validation error details use the format `"fieldName => error message"` for backward compatibility with the legacy Glue REST API.

### Glossary translation

Validation messages are translated through the Spryker glossary system. The locale is determined from the `Accept-Language` request header.

## Authentication and authorization errors

Authentication and authorization errors are handled automatically by the security layer.

### Missing access token (401)

When a request to a protected resource does not include a `Bearer` token:

```json
{
  "errors": [
    {
      "code": "002",
      "status": 401,
      "detail": "Missing access token."
    }
  ]
}
```

### Unauthorized request (403)

When a request includes a valid token but the user lacks the required permissions:

```json
{
  "errors": [
    {
      "code": "802",
      "status": 403,
      "detail": "Unauthorized request."
    }
  ]
}
```

## Built-in error codes

The following error codes are used by the API Platform infrastructure:

| Code | Status | Description |
|------|--------|-------------|
| `002` | 401 | Missing access token |
| `802` | 403 | Unauthorized request |
| `901` | 422 | Validation error (constraint violations, deserialization failures) |

Domain modules define their own error codes (for example, `101` for cart not found, `703` for category not found). Consult each module's Provider constants for the specific codes.

## Error code conventions

When defining error codes for your modules, follow these conventions:

- Error codes are **numeric strings** (for example, `'3701'`, not integers)
- Define codes as **protected constants** on the Provider or Processor class
- Use the naming pattern `ERROR_CODE_*` and `ERROR_MESSAGE_*`
- For not-found errors specifically, use `ERROR_CODE_*_NOT_FOUND` and `ERROR_MESSAGE_*_NOT_FOUND` to enable automatic resolution
- Group related codes by module (for example, all product offer codes start with `37xx`)

## Deserialization errors

When the request body cannot be deserialized (for example, invalid JSON structure, wrong type for a field), the response returns status `422` with code `901`. API Platform natively returns `400` for these cases, but the system converts them to `422` for consistency with the validation error format.
