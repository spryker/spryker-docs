---
title: Cypress commands vs scenarios
description: Learn the difference between Cypress commands and scenarios in the Cypress boilerplate project, and when to use each.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Best practices
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/best-practices.html
  - title: Test writing conventions
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/test-writing-conventions.html
---

This document explains the difference between Cypress commands and scenarios in the cypress-boilerplate, and when to use each.

- Cypress commands are located in `cypress/support/cy-commands/`.
- Scenarios are located in `cypress/support/scenarios/`.

## Cypress commands

Cypress commands are reusable functions that encapsulate common actions or interactions with the application. They simplify test scripts by abstracting complex sequences of actions into a single, readable command.

Key features of Cypress commands:

- **Reusability**: commands can be used across multiple tests.
- **Encapsulation**: commands encapsulate complex actions, which makes tests easier to write and maintain.
- **Simplified syntax**: commands provide a simplified syntax for common interactions, which improves code readability.

For example:

```typescript
Cypress.Commands.add(
  'placeOrderViaGlue',
  (
    email: string,
    password: string,
    sku: string,
    shipment: number,
    paymentProvider: string,
    paymentMethod: string,
    offer: string,
    merchant: string
  ): Cypress.Chainable<string> => {
    let token: string
    let cartId: string

    return cy.wrap(null).then(() => {
      return tokenEndpoint
        .getCustomerAccessToken(email, password)
        .then((response) => {
          token = response.body.data.attributes.accessToken
          return token
        })
        .then((token) => {
          return cartEndpoint.createGrossCart(token).then((response) => {
            cartId = response.body.data.id
            return { token, cartId }
          })
        })
        .then(({ token, cartId }) => {
          return itemsEndpoint
            .addOfferToCart(token, cartId, sku, 1, offer, merchant)
            .then(() => {
              return { token, cartId }
            })
        })
        .then(({ token, cartId }) => {
          return checkoutEndpoint
            .placeOrder(
              token,
              cartId,
              email,
              shipment,
              paymentProvider,
              paymentMethod
            )
            .then((response) => {
              return response.body.data.attributes.orderReference
            })
        })
    })
  }
)
```

## Scenarios

Scenarios are a structured, organized representation of repeatable user flows, such as registration or checkout. They simulate real user interactions and workflows, creating comprehensive and maintainable test suites that reflect real-world usage of the application.

Key features of scenarios:

- **User-centric testing**: focus on how end users interact with the application.
- **Modular structure**: organize tests into modules or files, each representing a specific user story or functionality.
- **Reusable components**: use reusable commands and functions to streamline the testing process.

For example:

```typescript
placeOrder = (
    email: string,
    password: string,
    sku: string,
    shipment: number,
    paymentProvider: string,
    paymentMethod: string,
    offer: string,
    merchant: string
  ): Cypress.Chainable<string> => {
    let token: string
    let cartId: string

    return cy.wrap(null).then(() => {
      return tokenEndpoint
        .getCustomerAccessToken(email, password)
        .then((response) => {
          token = response.body.data.attributes.accessToken
          return token
        })
        .then((token) => {
          return cartEndpoint.createGrossCart(token).then((response) => {
            cartId = response.body.data.id
            return { token, cartId }
          })
        })
        .then(({ token, cartId }) => {
          return itemsEndpoint
            .addOfferToCart(token, cartId, sku, 1, offer, merchant)
            .then(() => {
              return { token, cartId }
            })
        })
        .then(({ token, cartId }) => {
          return checkoutEndpoint
            .placeOrder(
              token,
              cartId,
              email,
              shipment,
              paymentProvider,
              paymentMethod
            )
            .then((response) => {
              return response.body.data.attributes.orderReference
            })
        })
    })
  }
```

## Usage difference

The following examples show the same order-processing flow implemented with a command and with a scenario.

### Cypress command example

In `cypress/e2e/backoffice/backoffice-process-order.cy.ts`:

```typescript
context('Order management', () => {
  before(function () {
    // Reset customer addresses
    cy.deleteAllCustomerAddresses(
      customerCredentials.email,
      customerCredentials.password,
      customerCredentials.reference
    )
    // Place an order for processing
    cy.placeOrderViaGlue(
      customerCredentials.email,
      customerCredentials.password,
      productData.availableOffer.concreteSku,
      checkoutData.glueShipment.id,
      checkoutData.gluePayment.providerName,
      checkoutData.gluePayment.methodName,
      productData.availableOffer.offer,
      productData.availableOffer.merchantReference
    ).then((response: string) => {
      orderReference = response
    })
  })
})
```

### Scenario example

In `cypress/e2e/backoffice/backoffice-process-order-scenario.cy.ts`:

```typescript
import { GlueCheckoutScenarios } from 'cypress/support/scenarios/glue/glue-checkout-scenarios'
import { OmsTransitionScenarios } from '../../support/scenarios/backoffice/oms-transition-scenarios'
import { GlueAddressesScenarios } from '../../support/scenarios/glue/glue-addresses-scenarios'

const glueCheckoutScenarios = new GlueCheckoutScenarios()
const glueAddressesScenarios = new GlueAddressesScenarios()
const omsTransitionScenarios = new OmsTransitionScenarios()

context('Order management', () => {
  before(function () {
    // Reset customer addresses
    glueAddressesScenarios.deleteAllCustomerAddresses(
      customerCredentials.email,
      customerCredentials.password,
      customerCredentials.reference
    )
    // Place an order for processing
    glueCheckoutScenarios
      .placeOrder(
        customerCredentials.email,
        customerCredentials.password,
        productData.availableOffer.concreteSku,
        checkoutData.glueShipment.id,
        checkoutData.gluePayment.providerName,
        checkoutData.gluePayment.methodName,
        productData.availableOffer.offer,
        productData.availableOffer.merchantReference
      )
      .then((response: string) => {
        orderReference = response
      })
  })
})
```

The main technical difference is that you must import scenarios separately into your test files, while Cypress calls commands directly without an import.

## Cypress commands vs scenarios comparison

| Feature | Cypress commands | Scenarios |
|---|---|---|
| Purpose | Encapsulate reusable actions | Structure end-to-end test cases |
| Reusability | High—used across multiple tests | Moderate—scenario-specific |
| Readability | High—abstracts complex actions | Moderate—reflects user workflows |
| Maintainability | High—update in one place | High—organized by functionality |
| Setup complexity | Simple to set up | Requires logical organization |
| Execution speed | Fast—efficient code reuse | Moderate—comprehensive user journeys |
| Test granularity | Low—specific actions | High—complete user scenarios |
| Best use case | Repeated actions, such as login or form submission | Full user flows, such as registration or checkout |
| Team collaboration | Enhances consistency in common tasks | Enhances modular testing and collaboration |
| Debugging | Easier to pinpoint issues in individual actions | Easier to debug entire user workflows |
| Developer experience | Moderate—harder to trace and manage, because commands are globally available and can lack context | High—more intuitive, because you can navigate directly to a scenario's definition for better context |

Understanding the difference between Cypress commands and scenarios helps you decide which approach fits your project. Using commands and scenarios together lets you build a well-structured, maintainable, and scalable test suite.
