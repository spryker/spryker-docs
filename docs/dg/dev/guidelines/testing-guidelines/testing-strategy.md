---
title: Testing strategy
description: Learn which test type answers which question in a Spryker project, how the test types map onto the testing trophy, and how to keep the gaps between them from lining up.
last_updated: Sep 17, 2026
template: concept-topic-template
related:
  - title: Testing strategy examples
    link: docs/dg/dev/guidelines/testing-guidelines/testing-strategy-examples.html
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

Every kind of test answers one question. A facade test answers "is the business rule right?". An API test answers "does the endpoint honour its declared contract?". An end-to-end test answers "can a customer still complete this journey?". No single kind answers all three, and a suite that tries to answer all three everywhere becomes slow, brittle, and still leaves gaps.

This document tells you which test to write for which question, what each test type must and must not cover, and how the test types are arranged so that their blind spots do not line up.

## Terminology this page uses

Spryker already uses the term *layer* for the code layers inside a module, so this page never uses that word for anything else.

| Term | What it means | Examples |
|---|---|---|
| **Application layer** | A code layer inside a Spryker module. | Communication, Business, Persistence, Shared, Presentation |
| **Test tier** | Where a test sits in the testing trophy: how much of the system it starts and what it therefore costs. | static analysis, unit, integration, end-to-end |
| **Test type** | A named kind of test with one subject and a fixed set of substitutions. Every test type belongs to exactly one tier. | facade test, API contract test, Publish and Synchronize module test, golden path, Cypress journey |
| **Browser request** | A request a person's browser makes to Yves or the Back Office. It carries a session cookie, returns HTML, and passes through form binding, CSRF protection, redirects, and template rendering. | Logging in on the storefront, activating a CMS page in the Back Office |
| **API request** | A request a client makes to the Storefront API or the Backend API. It carries a bearer token, returns JSON, and is described by a resource schema. | `GET /cms-pages`, `POST /carts` |

The last two are not two names for the same thing, and this page never writes "HTTP" on its own. A browser request enters Yves or the Back Office; an API request enters Glue. They share the Business and Persistence layers and nothing above them, so they have separate authentication, separate error shapes, and separate failure modes. A test that proves one proves nothing about the other.

"Unit", "integration", and "functional" mean different things to different people. The tiers on this page are therefore defined by observable properties: how many processes a test starts, which services besides the database it needs, and which database engine it runs on. A test's tier can be read from how it runs, not from what somebody called it.

Storage means the key-value storage the storefront reads from, and Search means the search engine, whichever products a project uses for them.

### What already exists

Not every test type on this page exists yet. Each one carries a status:

| Status | What it means |
|---|---|
| **Available** | Exists today. Adopt it now. |
| **Rolling out** | Spryker is building it. Some modules have it already, and the description on this page is the target shape. |
| **Planned** | Does not exist yet. The description on this page is the target design, published so that projects can plan for it and so that the reference implementation has something to match. |

A test type marked *Rolling out* or *Planned* is never a reason to leave a gap uncovered. Until it arrives, the question it owns stays with the test type that owns it today, and this page says which one that is.

## The shape of the suite

{% include diagrams/testing/testing-trophy.md %}

Spryker is integration-heavy. Most tests run real code against a real database inside a single process. Browser tests are few and cover complete journeys. Tests of a single class are the smallest group and are written only where a wider test cannot reach the logic. This is the shape often called the *testing trophy*: a broad base of static analysis, a narrow stem of single-class tests, a wide middle of integration tests, and a thin top of end-to-end tests.

The classic testing pyramid puts most weight on unit tests with mocked collaborators. In a modular monolith like Spryker, most defects live in the interaction between a facade, its persistence layer, and the plugins a project registers. Mocking those interactions away tests the mock. Running them for real, but in one process and without external services, keeps tests fast and keeps them honest.

The opposite failure is the ice-cream cone: most coverage in browser tests. Those tests are the slowest, the flakiest, and the worst at telling you which module broke. They stay at the top and they stay few.

### What a test type costs

Cost is more than runtime. Each step up the trophy changes five things:

- **Boot cost.** A single-class test starts in microseconds. An API contract test boots the application kernel. A golden-path or end-to-end test needs the whole stack running before the first assertion.
- **Services a developer needs locally.** Facade and unit tests need a database. API contract tests need nothing else. Golden-path, search query, and end-to-end tests need the services they name, so they run less often and rarely on a developer machine.
- **Failure localization.** A facade test names the module and usually the method. An end-to-end test names a screen and leaves you to search.
- **Noise.** The more processes and services a test touches, the more often it fails for reasons other than a defect: timing, startup order, leftover state.
- **Maintenance.** Tests that assert through a browser, or over the network, break on every unrelated change to the surface they go through.

Put a test in the cheapest tier that can still see the defect you want it to catch.

## The test types at a glance

| Test type | Tier | Status | The question it answers | Typical cost per test |
|---|---|---|---|---|
| [Cypress journey](#cypress-journey) | end-to-end | Available | Can a customer still complete this journey in the browser, on the assembled system? | tens of seconds to minutes |
| [Publish and Synchronize golden path](#publish-and-synchronize-golden-path) | end-to-end | Planned | Are the real queue, storage, and search wired correctly on this project? | seconds to a minute |
| [API golden path](#api-golden-path) | end-to-end | Planned | Do real tokens, headers, and transport status work on the deployed application? | seconds |
| [API contract test](#api-contract-test) | integration | Rolling out | Does the endpoint honour the contract its schemas declare? | seconds |
| [Facade test](#facade-test) | integration | Available | Is the business rule right? | milliseconds |
| [Publish and Synchronize module test](#publish-and-synchronize-module-test) | integration | Available | Does saving this entity produce the right event, table row, key, and payload? | milliseconds to seconds |
| [Search query test](#search-query-test) | integration | Planned | Does the query this module builds return the shape the application maps? | seconds |
| [API Provider or Processor test](#api-provider-or-processor-test) | unit | Rolling out | Which branch inside this provider or processor runs? | well under a millisecond |
| [Class unit test](#class-unit-test) | unit | Available | Is this one class right, where no wider test can reach the branch? | milliseconds |
| [Static analysis](#static-analysis) | static | Available | Do the types, the style, and the application layer boundaries hold? | no test to write |

## Where each test type enters the application

A test type does not *belong to* a set of application layers. It enters the application at one point and runs everything below that point for real. The picture is a depth, not a list.

{% include diagrams/testing/test-types-entry-points.md %}

There are two ways in from the outside, and they meet only at the Business layer. A browser request enters Yves or the Back Office. An API request enters Glue. A Cypress journey therefore proves nothing about an API request, and an API test proves nothing about a page.

A facade test enters at the Business layer and runs the Persistence layer and the real database underneath it. An API contract test enters at the Communication layer of a Glue module and runs the Business and Persistence layers underneath it. This is why an API contract test that asserts a business value is a facade test with an API round-trip in the way: the deeper test type already owns that question and answers it faster.

The Publish and Synchronize test types enter the same stack from the side, where an entity save turns into an event. [The Publish and Synchronize test types](#publish-and-synchronize-module-test) show that path.

## Choosing the test to write

Work through these questions in order and stop at the first match.

1. **Does the change alter a business rule, a calculated value, or a state transition?** Write or extend a facade test. If the arrange section becomes heavy because the rule is deep inside one class, add a class unit test as well, but keep the facade test as the proof.
2. **Does the change alter what an API request may send or what its response contains?** Change the resource or validation schema first, then write or extend the API contract test for that operation. If the change is a branch inside a provider or processor that does not surface as a new response shape, add a provider or processor test instead.
3. **Does the change alter what lands in storage or search when an entity is saved?** Write or extend the module's Publish and Synchronize test.
4. **Does the change alter how a search query is built or what shape it returns?** Write or extend the search query test for that resource.
5. **Does the change touch a flow that a Cypress journey already walks?** Extend that journey. A *new* journey needs a reviewer other than the author to agree that no cheaper test type can see the defect, because every new journey is paid for on every run from then on. See [Identifying what to test](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/identifying-what-to-test.html) for what a journey may assert.
6. **None of the above.** The change is covered by existing tests at the type that owns it, or it needs no test. A refactor that keeps every test type green needs no new test.

Not every change earns a test at every type. Most changes match exactly one line above, and the tests at every other type stay untouched. A test type exists so that there is one obvious place for its question, not so that every change has to visit it.

[Testing strategy examples](/docs/dg/dev/guidelines/testing-guidelines/testing-strategy-examples.html) walks concrete changes through this list, including the ones that match several steps at once.

Two heuristics apply at every step:

- **Push down.** If a test in a higher tier catches a defect and no test in a lower tier fails, the lower tier is missing a test. Write it there and consider whether the higher-tier test is still needed.
- **A variant earns a test only when it changes an outcome.** A second currency, a second locale, or a second store deserves its own test only if you can name the file and method that behaves differently for it. If you cannot, it is a permutation of an existing test, and running it buys nothing.

## Each test type in detail

Each test type owns a set of questions and is forbidden from answering others. The *must not* list matters as much as the *owns* list: a test type that answers questions it does not own duplicates coverage at a higher price and hides the fact that the owning type is missing a test.

### Cypress journey

*Tier: end-to-end. Status: Available.*

- **Owns.** One customer or business-user journey per critical flow, through the browser: login, search to checkout, registration, order placement, the account area.
- **Must not.** Permutations, business rules, visual details, data consistency across systems, and any assertion on an API response. Back Office CRUD qualifies only as the one journey that proves a browser-only flow, and everything past that first journey belongs to the facade test.
- **Lives in.** The Cypress suite. See [Identifying what to test](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing/identifying-what-to-test.html).

A Cypress journey proves a flow works on a fully assembled system. It does not localize a failure and it does not enumerate cases, so a second journey through the same flow costs a full run and proves almost nothing the first one did not. What keeps this test type small is the *must not* list above, applied on every addition, rather than a number.

A Cypress journey proves a browser request. Calling a fixture endpoint to arrange state is fine, because arranging is not asserting, but the moment a spec asserts what an endpoint returns it has become a contract test running in the most expensive tier. That claim belongs to the [API contract test](#api-contract-test), or, when what it proves is deployment wiring rather than the contract, to the [API golden path](#api-golden-path).

One consequence of the two entry points is that a journey is the only transport proof available for a flow that no API operation reaches — activating a CMS page in the Back Office, for example. Being that proof is not a licence to enumerate: one journey walks the flow, and every case, rule, and permutation behind it stays in the facade test.

### API contract test

*Tier: integration. Status: Rolling out.*

- **Owns.** The declared contract: every verb and route, every response the resource schema declares, validation rules from the validation schema, authentication and authorization results, the envelope, pagination, filters, `?include=`, and the round-trip of the test's own fixture.
- **Must not.** Assert derived business values, assert against seed data, or assert the state of storage or search.
- **Lives in.** Today, the module's `BackendApi` or `StorefrontApi` suite, for example `tests/PyzTest/Glue/Customer/StorefrontApi`. Spryker is splitting these into an `Integration` suite, which holds the contract tests described here, and a `Logic` suite, which holds [provider or processor tests](#api-provider-or-processor-test). See [Test API Platform resources](/docs/integrations/spryker-api/api-platform/testing.html).

API tests are contract tests. The resource schema and the validation schema declare the contract, and the API contract test proves the implementation honours it. The same rules apply to the Storefront API and the Backend API; only the fixture and authentication helpers differ. One API contract test per operation asserts the following:

- The route and verb are dispatched.
- The status code is one of the responses the schema declares. A response the implementation returns but the schema does not declare is a defect in the schema, not a reason to widen the test.
- Requests that violate a declared validation rule are rejected with the declared error shape, per rule.
- Unauthenticated and unauthorized requests get the declared status.
- The response envelope, included relations, and every attribute the schema declares are present and typed as declared.
- Data the test created through a fixture helper comes back as it was sent.

One test per operation asserts everything the schema declares. Splitting the assertions across many tests hides which attributes nobody checked.

API contract tests do not assert what a value *means*. Whether a cart total is right is a facade question. Whether the total appears in the response, under the declared name, with the declared type, is an API question. Keeping that line lets the API suite stay independent of seed data and business rule changes, which is what made earlier end-to-end API suites brittle.

API contract tests run without storage, search, a message broker, or a second application. They do not skip those parts of the system. They substitute the infrastructure adapter and keep every line of application code above it running for real: the tests run on a lightweight database engine, storage reads come from the database-backed storage tables, the publish step runs in-process, and the remote call from the client to the backend is dispatched in-process. Two things are stubbed: token introspection and the search engine response. Every one of those substitutions is paired with a test in another test type. See [Closing the gaps on purpose](#closing-the-gaps-on-purpose).

The kernel is booted in-process, so nothing between the network and the kernel runs: no real token is minted or introspected, no gateway or proxy is in the path, and no client middleware expands a header. That band is what the [API golden path](#api-golden-path) owns.

### API Provider or Processor test

*Tier: unit. Status: Rolling out.*

- **Owns.** Branches inside a provider or processor, with only its named collaborators stubbed.
- **Must not.** Assert status codes, validation messages, or JSON structure. This test type calls the provider directly and bypasses the framework pipeline, so those assertions pass or fail for the wrong reasons.
- **Lives in.** The `Logic` suite that Spryker is introducing alongside the `Integration` suite described under [API contract test](#api-contract-test).

This is a unit test with a fixed home, not a separate tier. It exists because a provider or processor can hold a branch that never changes the declared response shape, which means no API contract test can see it.

### Facade test

*Tier: integration. Status: Available.*

- **Owns.** All business rules, derived values such as totals, prices, and availability, state transitions, plugin stacks, and the error handling of the module.
- **Must not.** Assert anything that exists only on a request: status codes, response envelopes, JSON shape, or rendered markup.
- **Lives in.** `*FacadeTest.php` in the module's `Business` test suite, using the real database through Testify helpers.

The facade test carries the volume of the suite. It runs the real code of several modules together in one process, which is where most Spryker defects are.

### Publish and Synchronize module test

*Tier: integration. Status: Available.*

- **Owns.** That saving, updating, and deleting an entity publishes an event, writes the expected storage or search table row, and produces the expected key and payload.
- **Must not.** Test the business logic that produced the entity, or assert anything about the real queue, storage, or search.
- **Lives in.** A dedicated test in each `*Storage` and `*Search` module, in that module's `Communication` suite, using the in-memory storage, search, and queue helpers. See [Testing the Publish and Synchronization process](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html).

{% include diagrams/testing/publish-and-synchronize-coverage.md %}

The module test runs in one process against the real database, with the queue, storage, and search replaced by in-memory helpers. It proves that this module's publisher and synchronizer produce the right event, the right storage or search table row, and the right key and payload. It cannot see past the adapter. When it fails, the module's mapping or key logic is wrong. Each Storage and Search module has one, covering save, update, and delete.

### Publish and Synchronize golden path

*Tier: end-to-end. Status: Planned. Spryker is building the reference implementation in the demo shops.*

- **Owns.** That the real queue, storage, and search are wired correctly, once per critical domain, after a full data import.
- **Must not.** Cover more than one entity per domain, or assert business values.
- **Lives in.** A dedicated `GoldenPath` suite at the project level, run in a job on the real infrastructure. See [Testing the Publish and Synchronization golden path](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-golden-path.html).

The golden path runs on the fully assembled stack with the real queue, storage, and search. It runs the full data import, drains the publish and synchronize queues, and then asserts that one known imported entity per critical domain is readable through the Storage client and the Search client, under the expected key and with the declared shape. It proves wiring: queue configuration, key generation, the storage and search adapters, the index mappings, and the workers. It says nothing new about any module. When it fails, the configuration or the infrastructure is wrong.

A second entity per domain repeats the module test at many times the cost and proves no new wiring. The golden path is the paired test for every in-memory storage and search helper, which is why it exists and why it stays small. It is owned by the project, because only the project knows its own wiring.

A Cypress journey reaches the same data, so it is fair to ask what the golden path adds. It adds attribution and reach. An unregistered publisher plugin makes a product page return "not found" after a fresh import; Cypress reports a missing page and leaves you to bisect the stack, while the golden path reports that an imported product abstract never reached storage. It also runs in the job that already assembles the stack and already runs the import, so a developer can reproduce it without a browser.

### API golden path

*Tier: end-to-end. Status: Planned.*

- **Owns.** That an API request survives the deployed application: a real token is issued and introspected, request headers arrive expanded as the client sends them, client middleware runs, and the status a caller sees is the one the application returned. A handful of requests, once per deployment.
- **Must not.** Re-assert the contract, enumerate operations or validation rules, assert business values, or grow an endpoint at a time. Every one of those is an API contract test paying a full deployment for an answer it already has.
- **Lives in.** A dedicated project-level suite run against the deployed application, next to the Publish and Synchronize golden path.

An API contract test boots the kernel in-process and stubs token introspection, which is what makes it fast and what makes it blind to everything in front of the kernel. A token that is never minted cannot expire, be rejected by the wrong issuer, or carry the wrong scopes. A header that is never sent over a network cannot be dropped by a proxy. A status the application returns is not always the status the caller sees.

The API golden path closes exactly that band and nothing else: mint a token against the running application, call one secured endpoint with it, call one without it, and assert the status and the envelope in each case. It proves deployment wiring, so it belongs to the project, and Spryker ships a reference implementation in the demo shops. When it fails, the deployment is wrong, not a module.

This is the home of the few API requests that a browser suite used to carry. An API request in a Cypress spec proves the same thing at the price of a browser runner and under a test type that must not own it.

### Search query test

*Tier: integration. Status: Planned.*

- **Owns.** That the query the application builds is accepted by a real search engine and that its result maps into the transfers the application expects.
- **Must not.** Assert the ranking of seed data, assert business logic above the adapter, or test behaviour that belongs to the search product itself.
- **Lives in.** A dedicated suite per search-backed resource, run against the search engine, separate from the API suites.

This test type does not test the search engine. Relevance, sharding, and availability belong to the search product a project runs, and asserting them would test somebody else's software. What belongs to Spryker is the query the application builds from its own query expanders and plugins, and the mapping of the raw result back into transfers. Neither of those is exercised anywhere else: an API contract test stubs the search response, and a facade test never reaches the adapter. Without this test type, a query that the engine rejects, or a result field that moved, is first seen by a customer.

### Class unit test

*Tier: unit. Status: Available.*

- **Owns.** One class through its own entry point, where a facade test cannot reach the branch without a heavy arrange section.
- **Must not.** Carry the volume of the suite, or duplicate a facade test.
- **Lives in.** `*Test.php` next to the class in the module's test suite, using the same database and fixture helpers as a facade test.

A Spryker unit test may use the database through the same helpers a facade test uses. The word *unit* here names the subject, one class, not an absence of infrastructure.

### Static analysis

*Tier: static. Status: Available.*

- **Owns.** Types, coding style, and application layer boundaries, on every file, without anybody writing a test.
- **Must not.** Be worked around with an ignore entry in place of a fix.

PHPStan, Code Sniffer, and Architecture Sniffer are part of the strategy, not separate from it. Every rule they enforce is a rule no test has to assert, which is why they sit at the widest part of the base.

## Closing the gaps on purpose

Every test type that substitutes or omits something opens a gap. The way to keep gaps from lining up is not to test everything everywhere; it is to make the test types different in kind and to assign every gap an owner.

### The pairing rule

Every substituted or stubbed answer must be paired with a test, in another test type, proving that the real collaborator produces that answer. A stub without a paired test is a gap by definition.

A substitute is an in-memory helper, a stub, or a lighter engine that stands in for a real collaborator, and the answer it returns is written by the test rather than produced by the system. The `StorageHelper`, `SearchHelper`, and `QueueHelper` are substitutes. So is a stubbed token introspection response and a lightweight database engine in place of the production one.

When you introduce a substitute in a test suite, name the test type that pairs it in a comment on the line that registers the substitute, and check that the pairing register below already covers it. If it does not, the pairing register gains a row and somebody writes that test.

### The pairing register

{% include diagrams/testing/substitution-pairing.md %}

| Substituted or not exercised | Which test type proves the real thing |
|---|---|
| The synchronize step that writes into storage, including key format and store and locale scoping, is not run in API contract tests | Publish and Synchronize module test, plus the golden path |
| The queue, storage, and search are in-memory helpers in a Publish and Synchronize module test | Publish and Synchronize golden path, on the real services |
| The search engine response is stubbed in API contract tests | Search query test for that resource |
| Token introspection is stubbed in API contract tests, and so are token issuance, request header expansion, client middleware, and transport-level status semantics on an API request | API golden path, against the deployed application |
| API contract tests run on a lightweight database engine, so database-specific SQL is not exercised | The facade test of the module, on the production database engine |
| A facade test never goes over an API request, so status codes, envelope, and JSON shape are not exercised | API contract test for the operation |
| A facade test never goes over a browser request, so controller wiring, form binding, CSRF, session login, redirects, and rendering are not exercised | The Cypress journey that walks that flow. A browser-only flow that no journey walks carries this gap knowingly, because the journey costs a full run |
| Calls to external services such as tax or payment providers are stubbed at an outbound adapter seam | One contract test against the provider's sandbox |

### What each test type hands off

- **Cypress** proves a browser journey works on a fully assembled system. It hands every question about an API request to the API test types. When a Cypress test fails and no cheaper test does, apply the push-down heuristic before fixing the Cypress test.
- **The API golden path** hands everything a response *contains* back to the API contract test. It only proves that a real request reaches the application and that a real answer comes back.
- **Facade tests** do not prove that a value reaches an API consumer, a storage key, or a screen. A module with full facade coverage and no API contract test for its resource is not covered at the API.
- **The Publish and Synchronize module test** hands the real queue, storage, and search to the golden path. **The golden path** hands everything about the content of a payload back to the module test. Neither asserts business values; those belong to the facade test of the module that produced the entity.

## Rules that apply to every test type

These rules apply to every test you write or change from now on. Existing tests are brought in line when they are touched; nobody rewrites a green suite to satisfy a naming rule.

- **Name tests Given-When-Then.** `testGivenMissingEmailWhenCreatingCustomerThenValidationErrorIsReturned()`. The name states the precondition, the action, and the observable outcome. This is the single convention for all Codeception suites.
- **Structure bodies as Arrange, Act, Assert**, marked with those three comments, in that order, once each.
- **Build fixtures through the module's helper**, never by hand in the test. If the helper lacks the case you need, add a named method to it in the core module so other suites can reuse it. See [Test helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html) and [Data builders](/docs/dg/dev/guidelines/testing-guidelines/data-builders.html).
- **Never assert against seed data.** A test that expects a specific demo customer, a specific store code, or a specific count of imported records fails as soon as the dataset changes. Round-trip the fixture the test created.
- **A skipped test is not coverage.** Do not port a live test as skipped, and do not count a skipped test toward a coverage claim.
- **Flaky tests get quarantined, not deleted and not ignored.** A quarantined test leaves the blocking gate, keeps running where it does not block anyone, is tracked in an open bug, and has a fixed maximum stay. Deleting it loses the coverage silently; leaving it blocking punishes everyone for one test. The quarantine process itself is *Planned*.

## Anti-patterns

- **End-to-end tests doing API work.** A browser test, or a test on the deployed application, that asserts status codes and validation errors for every operation duplicates the API contract suite at many times the cost and none of the precision.
- **Endpoint behaviour asserted in a browser test.** A Cypress spec that asserts what an endpoint returns is a contract test running on a browser runner. The contract belongs to the API contract test, the deployment wiring to the API golden path. Arranging state through a fixture endpoint is not this anti-pattern.
- **Permutation tests.** The same scenario repeated per store, locale, or currency without a branch that differs.
- **Business values asserted at the API.** An API test that hard-codes a cart total is a facade test with an API round-trip in the way.
- **Stubbing the thing under test.** A substitute is for infrastructure below the code you are testing, never for the resource, facade, or plugin the test is about.
- **Status codes or JSON asserted in a provider or processor test.** That test type calls the provider directly and bypasses validation, security, and serialization.
- **Unit tests carrying the volume of the suite.** A module with a hundred single-class tests and no facade test has tested every part and never the whole.
- **Coverage numbers read as behaviour.** A contract coverage report proves each declared operation and rule was exercised once. It says nothing about which branch inside the handler ran. Behaviour coverage lives in facade tests.
