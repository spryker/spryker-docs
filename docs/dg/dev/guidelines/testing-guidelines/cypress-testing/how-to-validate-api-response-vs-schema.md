---
title: Validate API responses against a schema
description: Learn how to add response schema validation to your Cypress API tests.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Identifying what to test
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/identifying-what-to-test.html
  - title: Debugging Cypress tests
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/debugging-cypress-tests.html
---

Validating API responses against a schema ensures that the responses from your API are in the expected format and adhere to a predefined structure.

## Why schema validation is needed

Schema validation in Cypress tests provides the following benefits:

- **Ensures data consistency**: verifies that the API response structure is consistent with the defined schema, which prevents unexpected changes or issues from going unnoticed.
- **Catches errors early**: identifies deviations from the expected schema format, which can indicate bugs or integration issues.
- **Improves test reliability**: provides a clear, structured approach to validating API responses, which reduces the likelihood of false positives or negatives in tests.

## How to validate API responses against a schema

### Step 1: Define your schema

The schema describes the expected structure of your API response. In the cypress-boilerplate you can find example schemas in the following files:

- `checkout-response.ts`
- `access-tokens-response.ts`

### Step 2: Implement the schema validation helper

The `validateSchema` function, implemented in `api-helper.ts`, validates an API response against a schema, such as the `checkoutSchema` constant.

### Step 3: Use the validateSchema function in your test

```typescript
import { validateSchema } from '@support/api-helper/api-helper'
import checkoutSchema from '@support/glue-endpoints/checkout/checkout-response'

describe('API response validation', () => {
  it('should match the checkout schema', () => {
    cy.request('GET', '/api/checkout')
      .should((response) => {
        expect(response.status).to.eq(200)
        validateSchema(checkoutSchema, response)
      })
  })
})
```

For examples of schema validation, see the access token response and checkout response implementations in the boilerplate.

### Step 4: Run your tests

Run your Cypress tests as usual. The schema validation ensures that the API responses conform to the expected structure.

Validating API responses against schemas is a critical step in ensuring the reliability and consistency of your API. By incorporating schema validation into your Cypress tests, you can detect issues early, improve test precision, and preserve the integrity of your API responses.
