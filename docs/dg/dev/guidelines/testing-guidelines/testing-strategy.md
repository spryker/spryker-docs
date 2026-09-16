---
title: Testing strategy
description: Learn which kind of test answers which question in a Spryker project, how the test layers fit together, and how to keep gaps between them from lining up.
last_updated: Sep 16, 2026
template: concept-topic-template
related:
  - title: Best practices for effective testing
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
  - title: Test API Platform resources
    link: docs/integrations/spryker-api/api-platform/testing.html
  - title: Testing the Publish and Synchronization process
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html
  - title: Testing the Publish and Synchronization golden path
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-golden-path.html
  - title: Identifying what to test with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/identifying-what-to-test.html
  - title: Test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html
---

Every kind of test answers one question. A facade test answers "is the business rule right?". An API test answers "does the endpoint honour its declared contract?". An end-to-end test answers "can a customer still complete this journey?". No single kind answers all three, and a suite that tries to answer all three at every level becomes slow, brittle, and still leaves gaps.

This document tells you which test to write for which question, what each layer must and must not cover, and how the layers are arranged so that their blind spots do not line up.

Some layers described here are still being built. Where that is the case, the document says so. Spryker extends the documentation and the test helpers over time so that projects can adopt each layer as it becomes available.

## The shape of the suite

Spryker is integration-heavy. Most tests run real code against a real database inside a single process. Browser tests are few and cover complete journeys. Tests of a single class are the smallest group and are written only where a wider test cannot reach the logic. This is the shape often called the *testing trophy*: a wide middle of integration tests, a thin top of end-to-end tests, and a narrow base of single-class tests.

The classic testing pyramid puts most weight on unit tests with mocked collaborators. In a modular monolith like Spryker, most defects live in the interaction between a facade, its persistence layer, and the plugins a project registers. Mocking those interactions away tests the mock. Running them for real, but in one process and without external services, keeps tests fast and keeps them honest.

The opposite failure is the ice-cream cone: most coverage in browser tests. Those tests are the slowest, the flakiest, and the worst at telling you which module broke. They stay at the top and they stay few.

### Layers are defined by what they touch, not by their name

"Unit", "integration", and "functional" mean different things to different people. The layers in this document are defined by observable properties, so a test's layer can be read from how it runs. Storage means the key-value storage the storefront reads from, and Search means the search engine, whichever products a project uses for them.

| Layer | Processes | Services besides the database | Database | Typical cost per test |
|---|---|---|---|---|
| End-to-end (Cypress) | full stack | all | full stack | tens of seconds to minutes |
| API integration | one | none, storage and queue substituted in-process | lightweight engine | seconds |
| API logic | one | none | none | well under a millisecond |
| Facade (functional) | one | none | production engine, transactional | milliseconds |
| Publish and Synchronize (per module) | one | none, storage, search, and queue in-memory | production engine | milliseconds to seconds |
| Publish and Synchronize (golden path) | several, with queue workers | queue, storage, search | production engine | seconds to a minute |
| Search contract | one plus the search engine | search | none | seconds |
| Unit | one | none | allowed through the same helpers as a facade test | milliseconds |

### What a layer costs

Cost is more than runtime. Each step down the table changes five things:

- **Boot cost.** A single-class test starts in microseconds. An API integration test boots the application kernel. A golden-path or end-to-end test needs the whole stack running before the first assertion.
- **Services a developer needs locally.** Facade and unit tests need a database. API tests need nothing else. Golden-path, search contract, and end-to-end tests need the services they name, so they run less often and rarely on a developer machine.
- **Failure localization.** A facade test names the module and usually the method. An end-to-end test names a screen and leaves you to search.
- **Noise.** The more processes and services a test touches, the more often it fails for reasons other than a defect: timing, startup order, leftover state.
- **Maintenance.** Tests that assert through a browser or a full HTTP round-trip break on every unrelated change to the surface they go through.

Put a test in the cheapest layer that can still see the defect you want it to catch.

## Which layer owns what

Each layer owns a set of questions and is forbidden from answering others. The forbidden column matters as much as the owned column: a layer that answers questions it does not own duplicates coverage at a higher price and hides the fact that the owning layer is missing a test.

| Layer | Owns | Must not do | Lives in |
|---|---|---|---|
| End-to-end | One customer or business-user journey per critical flow: login, search to checkout, registration, order placement, the account area. A small fixed number of journeys, about thirty | Permutations, business rules, admin CRUD, visual details, data consistency across systems | Cypress, see [Identifying what to test](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/identifying-what-to-test.html) |
| API integration | The declared contract: every verb and route, every response the resource schema declares, validation rules from the validation schema, authentication and authorization results, envelope, pagination, filters, `?include=`, round-trip of the test's own fixture | Assert derived business values, seed data, or the state of storage or search | The module's `Integration` API test suite, booting the API kernel over a lightweight database engine with storage and queue substituted in-process |
| API logic | Branches inside a provider or processor with only its named collaborators stubbed | Assert status codes, validation messages, or JSON structure. Those bypass the framework pipeline here and are meaningless | The module's `Logic` API test suite |
| Facade | All business rules, derived values (totals, prices, availability), state transitions, plugin stacks, error handling of the module | Assert HTTP status codes, response envelopes, or JSON shape | `*FacadeTest.php` in the module's `Business` test suite, using the real database through Testify helpers |
| Publish and Synchronize, per module | That saving, updating, and deleting an entity publishes an event, writes the expected storage or search table row, and lands the expected key in storage or search | Test the business logic that produced the entity | A dedicated test in each `*Storage` and `*Search` module, using the in-memory storage, search, and queue helpers, see [Testing the Publish and Synchronization process](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html) |
| Publish and Synchronize, golden path | That the real queue, storage, and search are wired correctly, once per critical domain, after a full data import | Cover more than one entity per domain, or assert business values | A dedicated `GoldenPath` suite at the project level, run in a job on the real infrastructure, see [Testing the Publish and Synchronization golden path](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-golden-path.html). Spryker is building the reference implementation |
| Search contract | That a search query built by the application returns the declared shape from a real search engine | Assert ranking of seed data or business logic above the adapter | A dedicated suite per search-backed resource, run against the search engine, separate from the API suites. Spryker is building this layer |
| Unit | One class through its own entry point, where a facade test cannot reach the branch without a heavy arrange section | Become the volume layer, or duplicate a facade test | `*Test.php` next to the class in the module's test suite, using the same database and fixture helpers as a facade test |

### The API layer in detail

API tests are contract tests. The resource schema and validation schema declare the contract, and the API integration test proves the implementation honours it. The same rules apply to the Storefront API and the Backend API; only the fixture and authentication helpers differ. Concretely, one API integration test per operation asserts the following:

- The route and verb are dispatched.
- The status code is one of the responses the schema declares. A response the implementation returns but the schema does not declare is a defect in the schema, not a reason to widen the test.
- Requests that violate a declared validation rule are rejected with the declared error shape, per rule.
- Unauthenticated and unauthorized requests get the declared status.
- The response envelope, included relations, and every attribute the schema declares are present and typed as declared.
- Data the test created through a fixture helper comes back as it was sent.

One test per operation asserts everything the schema declares. Splitting the assertions across many tests hides which attributes nobody checked.

API tests do not assert what a value *means*. Whether a cart total is right is a facade question. Whether the total appears in the response, under the declared name, with the declared type, is an API question. Keeping that line lets the API suite stay independent of seed data and business rule changes, which is what made earlier HTTP-level suites brittle.

API integration tests run without storage, search, a message broker, or a second application. They do not skip those layers. They substitute the infrastructure adapter and keep every line of application code above it running for real: the tests run on a lightweight database engine, storage reads come from the database-backed storage tables, the publish step runs in-process, and the remote call from the client to the backend is dispatched in-process. Two things are stubbed: token introspection and the search engine response. Both are paired with a test in another layer, see [Closing the gaps on purpose](#closing-the-gaps-on-purpose). The synchronize step into storage and the search query itself are the two things that do not run, and both are owned by other layers.

### The Publish and Synchronize layers in detail

The per-module test and the golden path test different things, in the same way API logic and API integration tests do, with one difference: the two API tiers test the same module at two depths, while the two Publish and Synchronize layers test different subjects.

The **per-module test** runs in one process against the real database, with the queue, storage, and search replaced by in-memory helpers. It proves that this module's publisher and synchronizer produce the right event, the right storage or search table row, and the right key and payload. It cannot see past the adapter. When it fails, the module's mapping or key logic is wrong. Each Storage and Search module has one, covering save, update, and delete.

The **golden path** runs on the fully assembled stack with the real queue, storage, and search. It runs the full data import, drains the publish and synchronize queues, and then asserts that one known imported entity per critical domain is readable through the Storage client and the Search client, under the expected key and with the declared shape. It proves wiring: queue configuration, key generation, the storage and search adapters, the index mappings, and the workers. It says nothing new about any module. When it fails, the configuration or the infrastructure is wrong.

A second entity per domain in the golden path repeats the per-module test at many times the cost and proves no new wiring. The golden path is the paired test for every in-memory storage and search helper, which is why it exists and why it stays small. It is owned by the project, because only the project knows its own wiring; Spryker ships a reference implementation in the demo shops.

## Choosing the test to write

Work through these questions in order and stop at the first match.

1. **Does the change alter a business rule, a calculated value, or a state transition?** Write or extend a facade test. If the arrange section becomes heavy because the rule is deep inside one class, add a unit test for that class as well, but keep the facade test as the proof.
2. **Does the change alter what a request may send or what a response contains?** Change the resource or validation schema first, then write or extend the API integration test for that operation. If the change is a branch inside a provider or processor that does not surface as a new response shape, add an API logic test instead.
3. **Does the change alter what lands in storage or search when an entity is saved?** Write or extend the module's Publish and Synchronize test.
4. **Does the change alter how a search query is built or what shape it returns?** Write or extend the search contract test for that resource.
5. **Does the change break one of the critical journeys, and can no lower layer see it?** Extend the existing Cypress journey. Do not add a new one unless a new critical flow exists.
6. **None of the above.** The change is covered by existing tests at the layer that owns it, or it needs no test. A refactor that keeps every layer green needs no new test.

Two heuristics apply at every step:

- **Push down.** If a higher-layer test catches a defect and no lower-layer test fails, the lower layer is missing a test. Write it there and consider whether the higher-layer test is still needed.
- **A variant earns a test only when it changes an outcome.** A second currency, a second locale, or a second store deserves its own test only if you can name the file and method that behaves differently for it. If you cannot, it is a permutation of an existing test, and running it buys nothing.

## Closing the gaps on purpose

Every layer that substitutes or omits something opens a gap. The way to keep gaps from lining up is not to test everything everywhere; it is to make the layers different in kind and to assign every gap an owner.

### The pairing rule

Every stubbed or substituted answer must be paired with a test, in some layer, proving that the real collaborator produces that answer. A stub without a paired test is a gap by definition. When you introduce a substitute in a test suite, name the test that pairs it.

### What end-to-end hands off

Cypress proves a journey works on a fully assembled system. It does not localize a failure and it does not enumerate cases. When a Cypress test fails and no lower test does, apply the push-down heuristic before fixing the Cypress test.

### What the API layer hands off, and to whom

| Not exercised in API integration tests | Owned by |
|---|---|
| The synchronize step that writes into storage, including key format and store and locale scoping | Publish and Synchronize tests per module, plus the golden path |
| The search query and its result mapping | The search contract suite for that resource |
| Minting a real access token, request header expansion, HTTP client middleware, transport-level status semantics | The Cypress journeys that log in and browse over real HTTP |
| Database-specific SQL that the lightweight engine cannot run | The facade test of the module, running on the production database engine |
| Calls to external services such as tax or payment providers | An outbound adapter with a stub seam, paired with one contract test against the provider's sandbox |

### What the facade layer hands off

Facade tests do not prove that a value reaches an API consumer, a storage key, or a screen. Those are owned by the API integration layer, the Publish and Synchronize layer, and the Cypress layer, respectively. A module with full facade coverage and no API integration test for its resource is not covered at the API.

### What the Publish and Synchronize layers hand off

The per-module test hands the real queue, storage, and search to the golden path. The golden path hands everything about the content of a payload back to the per-module test. Neither asserts business values; those belong to the facade test of the module that produced the entity.

## Rules that apply in every layer

- **Name tests Given-When-Then.** `testGivenMissingEmailWhenCreatingCustomerThenValidationErrorIsReturned()`. The name states the precondition, the action, and the observable outcome. This is the single convention for all Codeception suites.
- **Structure bodies as Arrange, Act, Assert**, marked with those three comments, in that order, once each.
- **Build fixtures through the module's helper**, never by hand in the test. If the helper lacks the case you need, add a named method to it in the core module so other suites can reuse it. See [Test helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html) and [Data builders](/docs/dg/dev/guidelines/testing-guidelines/data-builders.html).
- **Never assert against seed data.** A test that expects a specific demo customer, a specific store code, or a specific count of imported records fails as soon as the dataset changes. Round-trip the fixture the test created.
- **A skipped test is not coverage.** Do not port a live test as skipped, and do not count a skipped test toward a coverage claim.
- **Flaky tests get quarantined, not deleted and not ignored.** A quarantined test leaves the blocking gate, keeps running where it does not block anyone, is tracked in an open bug, and has a fixed maximum stay. Deleting it loses the coverage silently; leaving it blocking punishes everyone for one test. Spryker is documenting this process.

## Anti-patterns

- **End-to-end tests doing API work.** A browser or HTTP test that asserts status codes and validation errors for every operation duplicates the API integration suite at many times the cost and none of the precision.
- **Permutation tests.** The same scenario repeated per store, locale, or currency without a branch that differs.
- **Business values asserted at the API.** An API test that hard-codes a cart total is a facade test with an HTTP round-trip in the way.
- **Stubbing the thing under test.** A substitute is for infrastructure below the code you are testing, never for the resource, facade, or plugin the test is about.
- **Status codes or JSON asserted in API logic tests.** The logic tier calls the provider directly and bypasses validation, security, and serialization. Those assertions pass or fail for the wrong reasons there.
- **Unit tests as the volume layer.** A module with a hundred single-class tests and no facade test has tested every part and never the whole.
- **Coverage numbers read as behaviour.** A contract coverage report proves each declared operation and rule was exercised once. It says nothing about which branch inside the handler ran. Behaviour coverage lives in facade tests.
