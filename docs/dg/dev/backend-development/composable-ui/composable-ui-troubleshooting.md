---
title: Composable UI troubleshooting
description: Solutions for common issues when working with Composable UI modules
template: howto-guide-template
related:
  - title: Create a Composable UI module
    link: docs/dg/dev/backend-development/composable-ui/create-a-composable-ui-module.html
  - title: Entity configuration reference
    link: docs/dg/dev/backend-development/composable-ui/entity-configuration-reference.html
  - title: Composable UI best practices
    link: docs/dg/dev/backend-development/composable-ui/composable-ui-best-practices.html
---

This document provides solutions for common issues when developing Composable UI modules.

## Module doesn't appear in navigation

**Problem**: After completing all steps, your module is not visible in the Back Office navigation menu.

**Solutions**:

1. **Check navigation.xml registration**:
   - Verify `config/Zed/navigation.xml` contains your module entry
   - Ensure `bundle`, `controller`, and `action` are set correctly:
     ```xml
     <bundle>falcon-ui</bundle>
     <controller>feature</controller>
     <action>index</action>
     ```

2. **Rebuild navigation cache**:
   ```bash
   docker/sdk cli console navigation:build-cache
   ```

3. **Clear all caches**:
   ```bash
   docker/sdk cli console cache:empty-all
   ```

4. **Check ACL permissions**:
   - Log in to Back Office as admin user
   - Navigate to Users → Roles
   - Verify your role has access to the module

## Table shows "No data" or empty

**Problem**: The table loads but shows no data or "No data available" message.

**Solutions**:

1. **Check API endpoint is accessible**:
   ```bash
   curl -X GET http://glue-backend.your-domain.local/your-entities \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```
   - Should return JSON with data or empty array
   - If 404: API resource not registered correctly
   - If 401: Authentication issue

2. **Verify Provider is registered**:
   - Check `resources/api/backend/your_entities.resource.yml` has correct `provider` class
   - Ensure Provider class exists and extends `AbstractBackendProvider`

3. **Check database has data**:
   - Verify your database table contains records
   - Check Provider's `fetchAllItems()` or `provideCollection()` returns data

4. **Regenerate API resources**:
   ```bash
   docker/sdk cli glue api:generate backend
   docker/sdk cli console transfer:generate
   ```

## Forms don't submit or show errors

**Problem**: Create/Edit forms don't work, show validation errors, or fail silently.

**Solutions**:

1. **Check Processor registration**:
   - Verify `resources/api/backend/your_entities.resource.yml` has Processor classes for POST/PATCH operations
   - Ensure Processor classes exist and implement `ProcessorInterface`

2. **Check validation rules**:
   - Review `resources/api/backend/your_entities.validation.yml`
   - Ensure required fields match form configuration

3. **Check API endpoint URLs**:
   - In entity YAML, verify form `submit.url` matches API resource path
   - For edit/delete: ensure URL includes identifier (e.g., `/your-entities/${row.reference}`)

4. **Check browser console for errors**:
   - Open browser DevTools → Console tab
   - Look for API request errors (401, 403, 422, 500)
   - Check Network tab for failed requests

## Filters or search don't work

**Problem**: Table filters or search box don't filter results.

**Solutions**:

1. **Verify field configuration in entity YAML**:
   ```yaml
   fields:
       name:
           searchable: true  # For search
       status:
           filterable: true  # For filters
   ```

2. **Check Provider implementation**:
   - `AbstractBackendProvider` automatically handles search/filtering
   - Ensure your Provider extends `AbstractBackendProvider`, not a custom implementation

3. **Verify database query supports filtering**:
   - Check Facade methods handle filter parameters
   - Ensure database columns are indexed for performance

## Page shows blank or crashes

**Problem**: Navigating to the module shows a blank page or error.

**Solutions**:

1. **Check browser console for JavaScript errors**:
   - Open DevTools → Console
   - Look for module loading errors or syntax errors in YAML

2. **Verify entity YAML syntax**:
   - Check for YAML indentation errors
   - Validate all `use:` references point to existing component IDs
   - Ensure all required properties are present

3. **Rebuild Falcon UI**:
   ```bash
   npm run falcon:install && npm run falcon:build
   ```

4. **Check feature registration**:
   - Verify `.spryker/features.yml` contains your module
   - Ensure `resources/{your-module}.yml` exists with correct `feature` and `entities` properties

## Changes to YAML don't appear

**Problem**: After modifying entity YAML configuration, changes don't reflect in the UI.

**Solutions**:

1. **Clear all caches**:
   ```bash
   docker/sdk cli console cache:empty-all
   docker/sdk cli glue cache:clear
   ```

2. **Rebuild Falcon UI** (for UI changes):
   ```bash
   npm run falcon:build
   ```

3. **Hard refresh browser**:
   - Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache

## CRUD mode: Auto-generation doesn't work

**Problem**: Using CRUD mode with `fields` and `ui.list/create/edit` configuration, but components are not auto-generated.

**Solutions**:

1. **Verify CRUD mode is active**:
   - Ensure you have `fields:` section defined
   - Ensure you have `ui.list`, `ui.create`, or `ui.edit` sections
   - If you have `ui.mode: custom`, remove it or change to `ui.mode: crud`

2. **Check field definitions**:
   ```yaml
   fields:
       email:
           type: email
           required: true
   ```
   - All fields referenced in `ui.list.columns` or `ui.create.fields` must be defined

3. **Clear caches and rebuild**:
   ```bash
   docker/sdk cli console cache:empty-all
   npm run falcon:build
   ```

## Partial override doesn't merge correctly

**Problem**: Using `view.components` to override auto-generated components, but overrides don't apply or replace entire component.

**Solutions**:

1. **Use correct component ID**:
   - For CRUD mode, component IDs follow pattern: `table.{Entity}.list`, `form.{Entity}.create`
   - Entity name must match exactly (case-sensitive)
   - Example: `table.Customer.list` for Customer entity

2. **Deep merge structure**:
   ```yaml
   view:
       components:
           table.customer.list:
               pagination: [10, 25, 50]  # Only overrides pagination
   ```
   - Only specified properties are overridden
   - Parent properties remain auto-generated

3. **Clear caches after changes**:
   ```bash
   docker/sdk cli console cache:empty-all
   npm run falcon:build
   ```

## API returns 401 Unauthorized

**Problem**: API requests return 401 Unauthorized error.

**Solutions**:

1. **Check resource security configuration**:
   ```yaml
   resource:
       security: "is_granted('IS_AUTHENTICATED_FULLY')"
   ```
   - Ensure this is set for protected endpoints

2. **Verify OAuth token generation**:
   - Check `SecurityGuiConfig::IS_ACCESS_TOKEN_GENERATION_ON_LOGIN_ENABLED = true`
   - See [Install Composable UI](/docs/dg/dev/backend-development/composable-ui/install-composable-ui.html)

3. **Test authentication**:
   - Log out and log back into Back Office
   - Check browser DevTools → Application → Local Storage for access token

## Reference data endpoint returns wrong format

**Problem**: Filter datasource endpoint returns data but filters don't populate.

**Solutions**:

1. **Verify resource properties match filter configuration**:
   ```yaml
   # Filter expects these field names
   datasource:
       url: /salutations
       valueField: value  # Must match resource property
       titleField: title  # Must match resource property
   
   # Resource must have matching properties
   properties:
       value:
           type: string
       title:
           type: string
   ```

2. **Check Provider returns correct structure**:
   ```php
   yield SalutationsBackendResource::fromArray([
       'value' => 'mr',
       'title' => 'Mr.',
   ]);
   ```

## Need more help?

If your issue is not listed here:

1. Check browser DevTools Console and Network tabs for errors
2. Review [Entity configuration reference](/docs/dg/dev/backend-development/composable-ui/entity-configuration-reference.html) for correct YAML syntax
3. Consult [API Platform troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html) for API-specific issues
4. Review [Composable UI best practices](/docs/dg/dev/backend-development/composable-ui/composable-ui-best-practices.html) for implementation patterns
