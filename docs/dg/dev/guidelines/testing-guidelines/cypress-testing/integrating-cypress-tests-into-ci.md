---
title: Integrating Cypress tests into CI
description: Learn how to integrate Cypress tests into a continuous integration pipeline, and how to check the code quality of your Cypress tests.
last_updated: Aug 4, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: ESLint and Prettier
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/eslint-and-prettier.html
---

This document describes how Cypress tests integrated into a continuous integration (CI) pipeline.

1. Cypress tests maintained as part of the project code.
2. Verifying the code quality of your Cypress tests.


## Cypress tests as part of the project code

Cypress tests are part of the project repository. The CI pipeline runs the tests - you do not need to clone a separate Cypress tests repository. You install and run Cypress tests directly from the project repository.

```yaml
    cypress-e2e:
        needs: [js-validation, validation, cypress-quality-gate]
        name: "Cypress-boilerplate / E2E"
        runs-on: ubuntu-latest
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:8.4
            TRAVIS: 1
            SPRYKER_CURRENT_REGION: EU
            DYNAMIC_STORE_MODE: true

        steps:
            -   uses: actions/checkout@v4

            -   uses: ramsey/composer-install@v3
                with:
                    composer-options: "-q --ignore-platform-reqs --optimize-autoloader --no-interaction --prefer-install=auto"

            -   name: Setup Node.js
                uses: actions/setup-node@v5
                with:
                    node-version: '24'
                    cache: 'npm'
                    cache-dependency-path: tests/cypress-boilerplate/package-lock.json

            -   name: Install Cypress project dependencies
                working-directory: tests/cypress-boilerplate
                run: npm ci

            -   name: Run docker
                run: |
                    git clone https://github.com/spryker/docker-sdk.git ./docker && git -C ./docker fetch --depth 1 origin $(cat .git.docker) && git -C ./docker checkout $(cat .git.docker)
                    docker/sdk boot .github/deploy/deploy.ci.acceptance.mariadb.cypress-boilerplate.yml
                    sudo bash -c "echo '127.0.0.1 backend-api.eu.spryker.local backend-api.us.spryker.local backend-gateway.eu.spryker.local backend-gateway.us.spryker.local backoffice.eu.spryker.local backoffice.us.spryker.local glue-backend.eu.spryker.local glue-backend.us.spryker.local glue-storefront.eu.spryker.local glue-storefront.us.spryker.local glue.eu.spryker.local glue.us.spryker.local mail.spryker.local mp.eu.spryker.local mp.us.spryker.local queue.spryker.local spryker.local swagger.spryker.local yves.eu.spryker.local yves.us.spryker.local' >> /etc/hosts"
                    docker/sdk up -t
                    docker/sdk cli composer dump-autoload -o -a --apcu -q

            -   name: Start queue worker
                run: docker/sdk console queue:worker:start --stop-when-empty

            -   name: Warm up merchant search index
                run: |
                    docker/sdk console sync:data merchant
                    docker/sdk console queue:worker:start --stop-when-empty

            -   name: Run Cypress E2E tests
                id: cypress-tests
                working-directory: tests/cypress-boilerplate
                run: npx cypress run --env environment=ci --headless --browser chrome

            -   name: Upload Cypress artifacts
                if: always() && steps.cypress-tests.outcome == 'failure'
                uses: actions/upload-artifact@v5
                with:
                    name: cypress-e2e-failed-artifacts
                    retention-days: 5
                    path: |
                        tests/cypress-boilerplate/cypress/data/screenshots/**/*
                        tests/cypress-boilerplate/cypress/data/reports/**/*
```

## Verifying Cypress test code quality

In addition to running Cypress tests, verify the code quality of your Cypress tests using ESLint and Prettier. This job is optional, and you can include it based on your project's needs.

```yaml
    cypress-quality-gate:
        name: "Cypress-boilerplate / Lint & Format"
        runs-on: ubuntu-latest
        steps:
            -   uses: actions/checkout@v4

            -   name: Setup Node.js
                uses: actions/setup-node@v5
                with:
                    node-version: '24'
                    cache: 'npm'
                    cache-dependency-path: tests/cypress-boilerplate/package-lock.json

            -   name: Install Cypress project dependencies
                working-directory: tests/cypress-boilerplate
                run: npm ci

            -   name: ES lint
                working-directory: tests/cypress-boilerplate
                run: npm run lint:check

            -   name: Prettier check
                working-directory: tests/cypress-boilerplate
                run: npm run prettier:check

            -   name: Slack Notification for failed job
                uses: ./.github/actions/job-slack-notifications
                if: always()
```

Following these CI configurations lets you use integrated Cypress tests in your CI pipeline, while maintaining a high standard of code quality for your test code.