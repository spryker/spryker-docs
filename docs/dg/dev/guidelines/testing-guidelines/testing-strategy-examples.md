---
title: Testing strategy examples
description: Worked examples that apply the testing strategy to concrete changes, showing which test types own the change, which tests buy nothing, and which gaps are left on purpose.
last_updated: Sep 18, 2026
template: concept-topic-template
related:
  - title: Testing strategy
    link: docs/dg/dev/guidelines/testing-guidelines/testing-strategy.html
  - title: Identifying what to test with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/identifying-what-to-test.html
  - title: Test API Platform resources
    link: docs/integrations/spryker-api/api-platform/testing.html
  - title: Testing the Publish and Synchronization process
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html
  - title: Best practices for effective testing
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
---

The [Testing strategy](/docs/dg/dev/guidelines/testing-guidelines/testing-strategy.html) states which test type owns which question. This page applies it to concrete changes.

A rule is short enough to remember and too short to settle an argument. Each example below takes a change a developer actually makes, walks it through [Choosing the test to write](/docs/dg/dev/guidelines/testing-guidelines/testing-strategy.html#choosing-the-test-to-write), and ends with the tests that get written, the tests that get left unwritten, and the gaps that stay open on purpose.

Read the strategy page first. This page uses its terms without redefining them: *application layer*, *test tier*, *test type*, *browser request*, and *API request*.

## How to read an example

Every example has the same six parts:

| Part | What it gives you |
|---|---|
| **The change** | The work in one sentence. |
| **The question** | The confusion that earned this example a place. |
| **Walking the decision list** | Which step matches, and why the steps before it do not. |
| **Tests to write** | The test types that own the change, and what each asserts. |
| **What not to write** | The tempting test, named, with what it would cost. |
| **Gaps and their owners** | What stays uncovered, and which test type is expected to cover it. |

## Serving multiple stores and locales

### The change

A project adds a store with its own locale, currency, country, and tax treatment, or changes how an existing store is resolved and served.

### The question

Two opposite ones, and both are wrong.

The first is "do we run the suite once per store?". The second comes from the strategy page itself, which says that a second currency, locale, or store earns a test only when you can name the file and method that behaves differently, and is then read as "multi-store must not be tested at all".

The rule forbids the permutation, not the subject. What changes per store is configuration, and configuration is proven where it is read, not once per store at the top of the trophy. One claim survives that push-down: that store and locale context, established when a request arrives, still holds at every point where it is read.

### Walking the decision list

Most of this change is not one step. It is several, because a store touches several owners:

1. **Business rules.** A tax rate that follows the store's country, and a price that follows the store's currency and price mode, are calculated values. Step 1 matches, and the facade test owns them.
2. **API responses.** If a store-scoped request changes what an operation returns, or adds a store parameter, the resource schema changes first and the operation's API contract test follows.
3. **Storage and search writes.** Storage keys carry store and locale. Step 3 matches, and the Publish and Synchronize module test owns the key format and the payload.
4. **Search queries.** A query scoped to a store and locale, and the mapping of its result, belong to the search query test for that resource.
5. **A flow a journey already walks.** Checkout is walked today. Step 5 says extend that journey rather than add one.

Step 5 is where the interesting decision sits. A journey earns its place only for the claim no cheaper test type can make, and here that claim is composition: context established at the edge surviving the trip through resolution, catalog, price, cart, order, notification, and the Back Office.

### Tests to write

| Test type | What it asserts | Why it owns this |
|---|---|---|
| Facade test | The tax rate for the store's country, the price for the store's currency and price mode, availability against the store's warehouse | These are calculated values, and the facade test names the module and the method when one is wrong |
| Publish and Synchronize module test | The storage key for a store-scoped entity carries the store and the locale, and the payload is the localized one | The strategy page already assigns store and locale key scoping to this test type |
| Search query test | The query built for a store and locale, and the mapping of its result | The query is built per store and locale, and its shape is not visible anywhere else |
| API contract test | A store-scoped operation is dispatched, and the declared attributes are present and typed | Only if the schema changed; the contract test never asserts which price came back |
| One Cypress journey | A single session establishes the store, browses, adds to the cart, switches to the second store, returns, orders, and the order appears under the originating store | Composition across the whole assembled system, which no lower test type can see |

The journey walks one store end to end. The second store appears twice, as a difference rather than as a repetition: a product served by one store and not the other, and a store switch in the middle of a live session with a cart already filled. The switch is the highest-value moment in the journey, because a cart bound to a store and a customer account shared between stores only meet in a real session.

### What not to write

- **The same journey once per store.** It multiplies the most expensive test type by the number of stores and proves nothing the first walk did not. This is the permutation anti-pattern.
- **A journey assertion on a price, a tax amount, or a translated string.** Those are business values and glossary content. The journey asserts that a price is rendered in the store's currency, never that it equals a number.
- **A contract test per store.** The contract is one contract. If a store changes the declared shape, the schema is wrong.
- **A test for a locale that only adds translations.** No file and no method behaves differently, so there is nothing to assert that the glossary does not already carry.

### Gaps and their owners

- Store and locale scoping is not exercised by API contract tests, because the synchronize step does not run there. The [pairing register](/docs/dg/dev/guidelines/testing-guidelines/testing-strategy.html#the-pairing-register) assigns it to the Publish and Synchronize module test and the golden path.
- A store served on its own domain is proven by configuration and by the one journey that enters through it. Resolution from every host pattern the project supports belongs to a class unit test on the resolver.

## Adding a field to an API response

### The change

An existing resource gains an attribute.

### The question

"The value is calculated, so does the API test assert the calculation? And does a customer-visible field need a journey?"

### Walking the decision list

Two steps match, in order.

Step 1 matches if the attribute is a calculated value or the result of a state transition: the facade test owns whether the value is right. Step 2 then matches for the response: the resource schema declares the attribute, and the operation's API contract test proves the implementation honours the declaration.

Step 5 does not match. A field appearing in a response is not a flow, and no journey changes.

### Tests to write

| Test type | What it asserts | Why it owns this |
|---|---|---|
| Facade test | The value is correct, for every branch that produces a different one | The business rule question, answered in milliseconds with the module named |
| API contract test | The attribute is present, under the declared name, with the declared type, on the operation that declares it | The contract question; one test per operation asserts everything the schema declares |

### What not to write

- **An API contract test asserting the value.** That is a facade test with an API round-trip in the way: slower, and it fails when the business rule changes rather than when the contract breaks.
- **A second contract test for the new attribute.** The operation already has one test that asserts everything declared. Splitting the assertions hides which attributes nobody checks.
- **A journey.** Rendering an existing field in an existing view changes no flow.

### Gaps and their owners

None new. The response shape is fully owned by the contract test, and the value by the facade test. If the attribute has to reach storage as well, the change also matches step 3 and the Publish and Synchronize module test.

## Adding a rule that changes an order total

### The change

A new discount condition, or any rule that changes what a customer pays.

### The question

"This is money, and the customer sees it. Surely that needs an end-to-end test?"

### Walking the decision list

Step 1 matches and the list stops there. The rule is a calculated value, so the facade test owns it, with one test per branch that changes an outcome.

If the condition sits deep inside one class and the facade test's arrange section becomes heavy, add a class unit test for the branch and keep the facade test as the proof. The class unit test is the addition, never the replacement.

Step 5 does not match in the sense people expect. The checkout journey already walks cart to order. It needs no change, and it does not learn the new rule.

### Tests to write

| Test type | What it asserts | Why it owns this |
|---|---|---|
| Facade test | The total, per branch of the new condition, including the branch where the rule does not apply | The rule is a business rule, and this test type names the module and the method |
| Class unit test | Only the branch that the facade test cannot reach without a heavy arrange | Written as well as the facade test, not instead of it |

### What not to write

- **A journey per discount type.** Every one of them costs a full run and proves the same flow.
- **A journey assertion on the discounted total.** Visible to a customer does not mean owned by the browser. The journey proves a customer can order; what they pay is the facade test's claim.
- **A contract test asserting the discounted total.** The contract test proves the total is present and typed as declared.

### Gaps and their owners

If the rule adds an attribute to a response, the change also matches step 2 and [Adding a field to an API response](#adding-a-field-to-an-api-response) applies. If it changes what is written to storage, step 3 applies.

## Adding an example

This page grows from real confusion, not from completeness. An example earns a place when a rule on the strategy page has been read the wrong way more than once, and when the change it describes is one many projects make.

When you add one:

- Keep the six parts, in order, with the same headings.
- Walk the decision list by its step numbers, and say why the earlier steps do not match. The walk is the part readers copy.
- Name what not to write. An example that only lists tests to write teaches half the strategy.
- End with the gaps and point at the pairing register rather than restating it.
- Use the strategy page's terms. Do not introduce a new name for a test type here; if a change has no owner, the strategy page is missing a row and that is the fix.
