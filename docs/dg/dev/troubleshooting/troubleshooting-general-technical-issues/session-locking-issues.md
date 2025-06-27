---
title: Session Locking Issues
description: Learn how to troubleshoot and resolve session locking issues in Spryker-based projects.
last_updated: Jun 27, 2025
template: troubleshooting-guide-template
originalArticleId: c234b12e-5260-4f86-97b4-44c7ef5c8dbf
---

# Optimizing Session Handling for High-Traffic Pages

This guide outlines a common performance issue related to session handling on high-traffic websites and provides both immediate mitigation strategies and a long-term architectural solution.

## The Problem: Session Locking on Read-Only GET Requests

A frequent performance bottleneck, especially under heavy crawler or bot traffic, is session contention in Redis.

### Core Issue

By default, Spryker may initiate a session and apply a lock for every page request, including simple GET requests. This is primarily due to the on-page generation of CSRF tokens for forms (e.g., "Add to Cart" forms on a product page, newsletter sign-ups). The generation of this token is a session "write" operation.

**Impact:** When crawlers or bots hit these pages, they trigger thousands of session write operations, leading to lock contention in Redis. This can degrade the performance and availability of the entire application. Globally disabling session locking for all GET requests is not a viable solution, as it would break critical CSRF security protections.

## Immediate Mitigation: Exclude Safe URLs from Locking

For pages that are genuinely read-only and contain no forms of any kind, you can disable session locking at the project level.

### Mechanism

You can provide a list of URL patterns that should be excluded from the session locking mechanism.

**Warning:** This tactic effectively disables CSRF protection for any matched URL. It must only be used for pages that do not handle any user POST requests or contain any forms. Applying this to a page with a form will create a security vulnerability.

### Implementation

Extend `SessionRedisConfig` and override the `getSessionRedisLockingExcludedUrlPatterns()` method to return your array of URL regex patterns.

#### Example: `Pyz\Yves\SessionRedis\SessionRedisConfig.php`

```php
<?php

namespace Pyz\Yves\SessionRedis;

use Spryker\Yves\SessionRedis\SessionRedisConfig as SprykerSessionRedisConfig;

class SessionRedisConfig extends SprykerSessionRedisConfig
{
    /**
     * Returns a list of regular expression patterns for URLs
     * that should be excluded from session locking.
     *
     * @return array<string>
     */
    public function getSessionRedisLockingExcludedUrlPatterns(): array
    {
        return [
            // Excludes all product detail pages under /en
            '~/en/product/.*~',
            // Excludes all CMS pages under /de
            '~/de/cms/.*~',
        ];
    }
}
```

## Architectural Solution: Asynchronous Forms & Optimized Session Handling

The most robust solution involves two key parts: refactoring your pages to make GET requests truly read-only, and then configuring session handling to capitalize on this change.

### Part A: Asynchronous Form Loading

Refactor high-traffic pages to decouple the main view from form generation.

#### Implementation Steps

1. **Refactor Page Controllers:** Modify the primary controller action to remove all logic related to form creation. The initial HTML response should no longer contain a form.
2. **Create a Form-Loading Endpoint:** Create a new, separate controller action whose only job is to generate the form and return its HTML.
3. **Implement Client-Side Loading:** Use JavaScript on the main page to asynchronously call the new form-loading endpoint and inject the returned HTML into the DOM.

### Part B: Advanced Session Handling for Read-Only Requests

After implementing async forms, your GET requests are now truly read-only. You can instruct the system to use a more performant session handler that only locks on write operations.

#### Mechanism

Create a custom session handler resolver that selects a handler based on the HTTP request method.

#### Implementation

Utilize `\Spryker\Yves\SessionRedis\Resolver\SessionHandlerResolver::resolveConfigurableRedisLockingSessionHandler`. Inside this method, decide to use the `\Spryker\Shared\SessionRedis\Handler\SessionHandlerFactory::createSessionHandlerRedisWriteOnlyLocking()` for GET requests.

#### Example: `Pyz\Yves\SessionRedis\Resolver\SessionHandlerResolver.php`

```php
<?php

namespace Pyz\Yves\SessionRedis\Resolver;

use Spryker\Shared\SessionRedis\Handler\SessionHandlerFactory;
use Spryker\Shared\SessionRedis\Redis\SessionRedisWrapperInterface;
use Spryker\Yves\SessionRedis\Resolver\SessionHandlerResolver as SprykerSessionHandlerResolver;
use Symfony\Component\HttpFoundation\Request;

class SessionHandlerResolver extends SprykerSessionHandlerResolver
{
    /**
     * @param \Spryker\Shared\SessionRedis\Redis\SessionRedisWrapperInterface $sessionRedisWrapper
     *
     * @return \SessionHandlerInterface
     */
    protected function resolveConfigurableRedisLockingSessionHandler(SessionRedisWrapperInterface $sessionRedisWrapper): \SessionHandlerInterface
    {
        // For truly read-only GET requests, use a handler that only locks on writes.
        if ($this->requestStack->getCurrentRequest()->isMethod(Request::METHOD_GET)) {
            return $this->sessionHandlerFactory->createSessionHandlerRedisWriteOnlyLocking($sessionRedisWrapper);
        }

        // For all other requests (POST, etc.), use the default locking handler.
        return parent::resolveConfigurableRedisLockingSessionHandler($sessionRedisWrapper);
    }
}
```

### Combined Result

- **Bot Traffic (GET):** Crawlers hit your async pages, and the WriteOnlyLocking handler is used. Since no session write occurs, no Redis lock is created.
- **Real User (GET):** The initial page load is fast and non-locking.
- **Real User (POST/AJAX):** The subsequent AJAX call to fetch the form and any form submission will use the default, fully-locking handler, ensuring data integrity is preserved.
