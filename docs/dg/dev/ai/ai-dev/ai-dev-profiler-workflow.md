---
title: AI Dev SDK Profiler Workflow
description: Read the Spryker WebProfiler as hard performance numbers — driven by the spryker-profiler skill
last_updated: Aug 12, 2026
label: early-access
keywords: ai, ai-dev, claude, claude code, spryker-profiler, performance, webprofiler, n+1, sql
template: concept-topic-template
---

{% info_block warningBox "Experimental module" %}

The AiDev module is experimental and not stable. There is no backward compatibility promise for this module. We welcome your feedback and contributions as we continue to develop and improve this module.

{% endinfo_block %}

## What the skill does

`spryker-profiler` turns the Spryker and Symfony WebProfiler into performance numbers you can act on, and explains how to switch profiling on when there is nothing to read.

Spryker records every web request automatically. That history is the cheapest source of truth for performance work: instead of guessing which code is slow, the skill reads what actually ran. It reduces a stored profile to the metrics that matter and prints JSON, so nobody has to scrape the profiler's HTML or open a browser.

Invoke it when you ask why a page, endpoint, or Back Office screen is slow, want the heaviest request, suspect an N+1 query, need before-and-after evidence that a performance fix worked, or want to know what a request logged, threw, or which controller handled it. It also covers profiler setup — a missing toolbar, a collector showing no data, or enabling profiling for a specific application.

## What it can tell you

The I/O counters say how much work a request did:

| Metric | Answers |
|--------|---------|
| `queries` / `unique` / `duplicates` | How many SQL statements a request ran, and how many were repeats |
| `redis` | Key-value operations per request |
| `elasticsearch` | Search calls per request |
| `zed_requests` | Yves-to-Zed calls — the architecture boundary check |
| `external_http` | Third-party calls blocking the response |
| `duration_ms` / `memory_mb` | Wall time and peak memory |
| `segments` | Queries attributed to a named code path you wrapped |

These say why, and whether the numbers are comparable between runs:

| Metric | Answers |
|--------|---------|
| `logs` | Errors, warnings, and deprecations logged during the request |
| `audit_log` | Security and compliance events by channel — a separate stream from `logs` |
| `exception` | What was thrown, with message and status code |
| `twig` | Template count and render time |
| `events` | Listeners called synchronously, plus Spryker application events |
| `http` | Which controller and route handled the request, and where a 3xx redirected to |
| `session` | Session payload size |
| `runtime` | Debug mode and Xdebug flags — check these before comparing any timing |

A Spryker request records 20 collectors. The skill reads every one that carries request data and maps it onto the fields above. The three it does not read hold no per-request measurements — they are toolbar plumbing and a dump of resolved configuration.

## One user action is many profiles

The mistake that most often produces a wrong answer is treating a profile as a user action. A profile is one HTTP request. Clicking **Login** on the storefront creates six profiles across two applications and two storage directories — and the storefront profile itself reports zero queries, because Yves has no SQL collector by design.

The skill reconstructs the full tree instead. Yves-to-Zed links are exact, because the callee returns its own debug token, which the caller stores. Browser-issued AJAX and ESI sub-requests carry no such link, so those are grouped by time window and flagged as the heuristic they are.

## The workflow

1. If you do not know which page is slow, rank the recorded profiles by a metric to find the outlier.
2. Reproduce the request, then read the profile and check that its age is seconds — profiles accumulate for days, and without checking you may analyze last week's request.
3. If a collector is absent or there are no profiles at all, the skill walks the setup layers that must be enabled.
4. For a page or user action, read the full trace rather than the entry request alone.
5. Read the counts, not the milliseconds. Local wall time swings widely for identical work, while I/O counts are stable and are what scales badly in production.
6. If the counts are high, profile a small and a large entity to see whether the count scales with the data.

{% info_block infoBox "An absent collector is not zero" %}

`collector: "absent"` means the metric was never measured for that application — Yves has no SQL collector, and the Back Office has no Redis collector. Reporting zero queries from an absent collector is a false conclusion. `collector: "incompatible"` means the collector is recording but an upgrade renamed part of its API, so the data is still available in the browser panel.

{% endinfo_block %}

## Going deeper than counts

Segmented SQL attributes queries to a named code path, turning "this page runs 261 queries" into "the calculator stack runs 180 of them". Wrap the suspect code and the reader reports it under `database.segments`:

```php
use Spryker\Shared\Propel\Logger\PropelInMemoryLogger;

PropelInMemoryLogger::startSegment('order-validation');
try {
    $this->validateOrder($orderTransfer);
} finally {
    PropelInMemoryLogger::endSegment();
}
```

Always use `try`/`finally`. The logger is static, so an unclosed segment swallows every later query in the request. Remove segments once you have the answer — they are debugging scaffolding.

A stored profile holds far more than the reader prints, including full SQL text, headers, routing, events, and logger entries. When a question needs something the reader does not expose, the skill extends the script rather than stopping at the available options.

## Things that will confuse you

- **Timings are only comparable at equal runtime.** Xdebug inflates wall time several-fold and debug mode disables caches, so a "regression" can be nothing more than a differently configured container.
- **Each application writes to its own directory.** Yves and Glue write to one directory; Zed, the Back Office, the Backend Gateway, and the Merchant Portal write to another. The reader picks the most recently written one, which is often not the one you want.
- **The index outlives the data.** Stored profiles are deleted after two days, but the index is never trimmed, so it can list thousands of requests when only a few dozen files survive. The skill reports how many profiles a ranking actually covered.
- **`external_http: 0` may mean "not instrumented".** External calls appear only if the calling code uses the external HTTP logger trait, so a zero is never proof that a request makes no outbound calls.
- **Login walls profile the redirect.** An unauthenticated request to the Back Office or Merchant Portal records the redirect to the login form, which says nothing about the page you wanted. Reproduce with an authenticated session.
- **Back Office tables are two requests.** The page renders an empty grid and loads its rows through a separate table route, which is usually where the real cost sits. Profile both.
- **Console commands, queue workers, and cron jobs are never profiled.** The WebProfiler is request-scoped. Use Xdebug profiling or explicit timing for those.

## When there is no data

Three independent layers must all be in place, and the skill checks each one:

1. The web profiler is enabled in the project configuration.
2. The web profiler application plugin is registered for the application you are profiling. Zed alone has four separate stacks — Zed, Back Office, Backend Gateway, and Backend API.
3. A collector plugin for the metric you want is registered in that application's `WebProfilerDependencyProvider`.

After changing any of these, empty the cache and reproduce the request.

## Requirements

- A running Spryker project (Docker SDK up) with the web profiler enabled
- An AI tool with the SDK's skills loaded — either through the [Claude Code plugin](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin.html) or via `ai-dev:setup` for another supported tool

## Related

- [WebProfiler](/docs/dg/dev/integrate-and-configure/integrate-development-tools/web-profiler.html) — why the profiler matters and how to integrate it per application
- [`spryker-profiler` README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-profiler/README.md) — the skill's own reference in the plugin repository
- [AI Dev SDK Skills and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html) — the full reference of every skill and agent
- [AI Dev SDK Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) — module and `ai-dev:setup` command
