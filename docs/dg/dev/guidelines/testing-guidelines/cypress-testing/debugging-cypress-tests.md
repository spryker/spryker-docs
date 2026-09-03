---
title: Debugging Cypress tests
description: Learn how to debug, pause, and step through Cypress test execution, and inspect test step inputs and outputs.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: HTML reporter
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/html-reporter.html
  - title: Integrating Cypress tests into CI
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/integrating-cypress-tests-into-ci.html
---

Cypress provides several ways to debug and investigate test output.

## The `cy.pause()` command

Use `cy.pause()` when running tests in UI mode. You can insert this command at any point in a test, and when Cypress reaches it, the test execution pauses. Use the **Resume** and **Next** buttons at the top of the run log window: **Resume** continues until the next `pause` command, and **Next** executes the following command one at a time.

```typescript
// Set a breakpoint
cy.pause()
```

```typescript
// Pause after the get command yields an object
cy.get('nav').pause()
```

## The `cy.debug()` command

`cy.debug()` outputs the value returned by the previous command to the Developer Tools console, and pauses test execution. Execution pauses only if Developer Tools are open in the Cypress Runner UI, which lets you step through code at a lower level than `cy.pause()`.

```typescript
// Set a breakpoint
cy.debug()
```

```typescript
// Set a breakpoint after the get command executes, and log the returned object
cy.get('nav').debug()
```

## The `cy.log()` command

`cy.log()` outputs any value to the test run logs, visible on the left side of the screen when a test runs in UI mode, or in the console output when a test runs in headless mode. Execution is asynchronous, so output placement can vary slightly.

```typescript
// Output a string into the logs
cy.log('Checkout start')

// Output a string with an embedded variable value
cy.log(`Item with ID: ${itemId} deleted.`)

// Output an environment variable
cy.log('Env used: ' + (Cypress.env('environment')))

// Output other types of values
cy.log('Found element: ' + $element.text())
```

## The Cypress time machine

When a test runs, the Cypress Runner UI lets you go back and forth through the test to see what happened, such as what was clicked or which value was entered.

Click any command in the test run log, on the left side of the screen, to open a screenshot of the system state at the moment that command executed. The UI highlights the identified element. For action commands, such as `type` and `clear`, the **before** and **after** options show the field state before and after the action.

## Checking command yields and API requests and responses

Using the test execution logs in UI execution mode, you can check what each command returned, even without pausing at a breakpoint. After a test finishes, open Developer Tools, go to the **Console** tab, and click any event in the execution log on the left side of the screen.

- If the command is `get` or `find`, the console shows the following:
  - **Selector**: the selector used for this command.
  - **Applied to**: the HTML element to which the selector was applied, for example, a table.
  - **Yielded**: the HTML element found by Cypress using that selector, for example, a table cell.
- If the command is an action, the console shows the following:
  - **Command**: the command that was executed, for example, `type`, `clear`, or `submit`.
  - **Applied to**: the HTML element the command was applied to.
  - **Keyboard or mouse events**: shown if the command was `type` or `click`.
- If the command is an API request, the **Yielded** section shows all the information about the request and response, including headers, the URL, the body, and parameter values, for example:

```text
{body: {…}, headers: {…}, status: 201, statusText: 'Created', isOkStatusCode: true, …}
allRequestResponses: […]
body: {data: {…}}
duration: 985
headers: {date: 'Mon, 09 Sep 2024 09:01:44 GMT', content-type: 'application/vnd.api+json', transfer-encoding: 'chunked', connection: 'keep-alive', server: 'nginx', …}
isOkStatusCode: true
requestBody: "{\"data\":{\"type\":\"guest-cart-items\",\"attributes\":{\"sku\":\"012_25904598\",\"quantity\":\"1\"}}}"
requestHeaders: {Connection: 'keep-alive', X-Anonymous-Customer-Unique-Id: 0.6828321926598329, user-agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…, like Gecko) Chrome/118.0.5993.159 Safari/537.36', accept: '*/*', accept-encoding: 'gzip, deflate', …}
size: 0
status: 201
statusText: "Created"
```
