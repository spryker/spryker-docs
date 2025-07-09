---
title: Session locking issues
description: Learn how to troubleshoot and resolve session locking issues in Spryker projects.
last_updated: Jun 27, 2025
template: troubleshooting-guide-template
originalArticleId: c234b12e-5260-4f86-97b4-44c7ef5c8dbf
---

## Optimizing session handling for high-traffic pages

This guide outlines a common performance issue related to session handling on high-traffic websites and provides both immediate mitigation strategies and a long-term architectural solution.

**Note:** This guide applies specifically to the Yves (frontend) layer of Spryker-based projects and does not apply to Zed (backend).

## Problem: Session locking on read-only GET requests

A frequent performance bottleneck, especially under heavy crawler or bot traffic, is session contention in Redis.

### Core issue

By default, Spryker may initiate a session and apply a lock for every page request, including simple GET requests. This is primarily used for on-page generation of CSRF tokens for forms, such as add to cart form on a product details page or a newsletter sign-ups. The generation of this token is a session "write" operation.

When a crawler or bot hits such page, it triggers thousands of session write operations, leading to lock contention in Redis. This can degrade the performance and availability of the entire application. Globally disabling session locking for all GET requests is not a viable solution because this breaks critical CSRF security protections.

## Immediate mitigation: Exclude safe URLs from locking

For pages that are read-only and don't contain forms, you can disable session locking on the project level.

### Mechanism

You can provide a list of URL patterns that should be excluded from the session locking mechanism.

{% info_block warningBox %}

This disables CSRF protection for any matched URL, so use it only for pages that don't handle any user POST requests or contain any forms. Applying this to a page with a form will create a security vulnerability.

{% endinfo_block %}


### Implementation

Extend `SessionRedisConfig` and override the `getSessionRedisLockingExcludedUrlPatterns()` method to return your array of URL regex patterns.

Example:

**Pyz\Yves\SessionRedis\SessionRedisConfig.php**

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

## Architectural folution: Asynchronous forms and optimized session handling

Refactor pages to ensure GET requests are read-only, then optimize session handling to leverage this architectural improvement.

### Part A: Asynchronous form loading

Refactor high-traffic pages to decouple the main view from form generation.

#### Implementation steps

1. Adjust the primary controller action to remove all logic related to form creation. The initial HTML response should no longer contain a form.
2. Create a new, separate controller action that only generates the form and returns its HTML.
3. Use JavaScript on the main page to asynchronously call the new form-loading endpoint and inject the returned HTML into the DOM.

### Part B: Advanced session handling for read-only requests

After implementing async forms, your GET requests are now truly read-only. You can instruct the system to use a more performant session handler that only locks on write operations.

Create a custom session handler resolver that selects a handler based on the HTTP request method. In `\Spryker\Yves\SessionRedis\Resolver\SessionHandlerResolver::resolveConfigurableRedisLockingSessionHandler` configure `\Spryker\Shared\SessionRedis\Handler\SessionHandlerFactory::createSessionHandlerRedisWriteOnlyLocking()` to be used for GET requests. Example:

**Pyz\Yves\SessionRedis\Resolver\SessionHandlerResolver.php**

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

### Combined result

| User Type   | Request Type     | Description                                                                                                         | Locking Behavior                 |
|-------------|------------------|---------------------------------------------------------------------------------------------------------------------|----------------------------------|
| Bot         | GET              | Crawlers hit async pages; uses WriteOnlyLocking handler. No session write, so no Redis lock is created.             | No lock                          |
| Real user   | GET              | Initial page load is fast and does not involve locking.                                                             | No lock                   |
| Real user   | POST / AJAX      | AJAX calls to fetch forms or submit data use the default fully-locking handler to ensure data integrity.            | Fully-locking (default handler)  |












































