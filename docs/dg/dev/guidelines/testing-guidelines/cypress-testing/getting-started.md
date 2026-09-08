---
title: Getting started with the Cypress boilerplate
description: Learn how to set up the Cypress boilerplate project locally and adapt it to your own Spryker project.
last_updated: Aug 5, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Cypress boilerplate project structure
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/project-structure.html
---

The Cypress boilerplate is part of the [Spryker B2B Marketplace demo shop](https://github.com/spryker-shop/b2b-demo-marketplace) project. This document describes how to install and run the Cypress tests that come with the demo shop, and how to adapt them to your own Spryker project.

{% info_block infoBox "New to Cypress?" %}

If you are new to Cypress, start with the [Cypress introduction](https://docs.cypress.io/guides/overview/why-cypress) and explore the Core Concepts section of the official Cypress documentation to learn about testing types, best practices, and the Cypress Learning Center.

{% endinfo_block %}

## Prerequisites

Install the following tools before you start:

- Node.js version 18 or higher. You can use NVM to manage multiple Node.js versions.
- npm.

## Step 1: Install dependencies

In your Spryker B2B Marketplace demo shop project, navigate to the `tests/cypress` folder and install the dependencies:

```bash
cd tests/cypress
npm install
```

## Step 2: Run the tests

```bash
npx cypress open
```

In the Cypress Test Runner, select the test suites you want to run against the demo shop.

## Step 3: Customize the boilerplate for your project

### Update the configuration

Make sure the URLs in `cypress.config.ts` and in `.env.local` match your project.

### Update the test data

Review and adjust the test data in `cypress/fixtures`, for example:

```json
{
  "username": "custom_username",
  "password": "custom_password"
}
```

### Run the tests against your project

```bash
npx cypress open
```

## Troubleshooting

1. **Check the logs**: review the terminal output and the Cypress Test Runner for error messages.
2. **Verify the URLs**: compare the configuration URLs with your project's URLs.
3. **Update the test data**: adjust the fixture files in `cypress/fixtures` to match your project.
4. **Update the page object models**: if UI elements differ from the demo shop, update the following:
   - Page objects in `cypress/support/page-objects`.
   - API endpoints in `cypress/support/glue-endpoints`.

   For example, update a locator as follows:

   ```typescript
   const loginForm = 'form[name="loginForm"]'

   export class LoginPage extends AbstractPage {
     getEmailField = (): Cypress.Chainable => {
       return cy.get(loginForm).find('#loginForm_email')
     }
   }
   ```

   Or update an API endpoint as follows:

   ```typescript
   export class AccessTokens extends GlueRequest {
     protected ENDPOINT_NAME = '/access-tokens'

     getCustomerAccessToken = (
       email: string,
       password: string
     ): Cypress.Chainable => {
       return cy.api({
         method: 'POST',
         url: this.GLUE_ENDPOINT,
         headers: {
           'Accept-Language': 'de-DE, de;q=0.9',
         },
         body: {
           data: {
             type: 'access-tokens',
             attributes: {
               username: email,
               password: password,
             },
           },
         },
         failOnStatusCode: false,
       })
     }
   }
   ```

5. **Re-run the tests** after making adjustments:

   ```bash
   npx cypress run
   ```

## Next steps

Customize the tests further by adding new tests, modifying existing ones, or integrating additional testing tools and frameworks.
