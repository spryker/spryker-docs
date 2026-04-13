# Migration Guide Review — Branch `feature/cc-37354/master-glue-rest-api-migration-phase-1`

Reviewed against suite branch of the same name. Every item below is an actionable error found by comparing docs line-by-line against the actual suite code diff.

---

## CROSS-CUTTING ISSUES

### [CROSS-1] `last_updated` date is wrong in every file

**Rule:** `last_updated` must be `Apr 08, 2026` (today).

Files with `Mar 31, 2026` (must change to `Apr 08, 2026`):
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-authrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartcodesrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartsrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customersrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-ordersrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productsrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productavailabilitiesrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productimagesetsrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productlabelsrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productpricesrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-categoriesrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.md:4`

Files with `Apr 07, 2026` (must change to `Apr 08, 2026`):
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-agentauthrestapi.md:3`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-alternativeproductsrestapi.md:3`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartpermissiongroupsrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-catalogsearchrestapi.md:3`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-companiesrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-companyusersrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-contentproductabstractlistsrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customeraccessrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-merchantopeninghoursrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-merchantproductoffersrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-merchantsrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-navigationsrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-oauthapi.md:5`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-orderpaymentsrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productattributesrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productbundlesrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productmeasurementunitsrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productofferavailabilitiesrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productofferpricesrestapi.md:4`
- `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-checkoutrestapi.md:4`

**Fix:** `sed -i 's/last_updated: Mar 31, 2026/last_updated: Apr 08, 2026/g'` and `sed -i 's/last_updated: Apr 07, 2026/last_updated: Apr 08, 2026/g'` across all files.

---

## `migrate-glue-api-to-api-platform.md` (MAIN CROSS-CUTTING GUIDE)

### [MAIN-1] "No changes required before starting module migration" claim is FALSE

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.md` — approximately line 32

**Offending text:** `"There are no changes required before starting the module migration."`

The suite diff contains the following cross-cutting changes that are **not documented in any guide**:

**a. `config/Glue/ApplicationServices.php`, `config/GlueBackend/ApplicationServices.php`, `config/GlueStorefront/ApplicationServices.php` — Remove `ProxyFactory` registration**

All three files had this removed:
```php
use Spryker\Service\Container\ProxyFactory;
// ...
$services->set(ProxyFactory::class)->public();
```
No guide documents this.

**b. `config/GlueStorefront/ApplicationServices.php` — Remove `CustomerOwnershipVoter` and `CustomerReferenceResolver` registrations**

```php
-use Spryker\Glue\Customer\Api\Storefront\Security\CustomerOwnershipVoter;
-use Spryker\Glue\Customer\Api\Storefront\Security\CustomerReferenceResolver;
-use Spryker\Glue\Customer\Api\Storefront\Security\CustomerReferenceResolverInterface;
-$services->set(CustomerReferenceResolver::class);
-$services->alias(CustomerReferenceResolverInterface::class, CustomerReferenceResolver::class);
-$services->set(CustomerOwnershipVoter::class);
```
No guide documents this.

**c. `config/Glue/bundles.php` and `config/GlueStorefront/bundles.php` — `ApiPlatformBundle` moved before `SprykerApiPlatformBundle`**

```php
-    SprykerApiPlatformBundle::class => ['all' => true],
     ApiPlatformBundle::class => ['all' => true],
+    SprykerApiPlatformBundle::class => ['all' => true],
```
No guide documents this.

**d. `config/Glue/packages/api_platform.php` and `config/GlueStorefront/packages/api_platform.php` — New normalization settings and MIME types**

Added to Glue and GlueStorefront:
```php
$apiPlatform->defaults()->normalizationContext(['skip_null_values' => false]);
$apiPlatform->defaults()->denormalizationContext(['disable_type_enforcement' => true]);
```
Added to all three contexts (Glue, GlueBackend, GlueStorefront):
```php
$apiPlatform->formats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);
$apiPlatform->patchFormats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);
$apiPlatform->errorFormats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);
```
No guide documents this.

**e. `config/install/docker.yml` — `provider-processor-glue` moved from `build-development` to `build` section**

Before: in `build-development`. After: in `build` (early in the install recipe). No guide documents this.

**Fix:** Either remove the "no changes required" claim entirely and document items a–e as pre-migration steps in this guide, or add a dedicated "Pre-migration steps" section.

---

## `migrate-authrestapi.md`

### [AUTH-1] Steps 3 and 5 duplicate `migrate-oauthapi.md` — must be removed

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-authrestapi.md`

- **Lines ~52–58, Step 3:** Instructs removal of `OauthApiTokenResource` from `GlueStorefrontApiApplicationDependencyProvider`. This exact step is also in `migrate-oauthapi.md` step 2. One guide must own it — it belongs in `migrate-oauthapi.md` only. Remove step 3 from this file.

- **Lines ~88–90, Step 5:** Instructs deletion of `src/Pyz/Glue/OauthApi/OauthApiConfig.php`. This is also covered in `migrate-oauthapi.md` step 3. Remove step 5 from this file.

**Fix:** Delete steps 3 and 5 from `migrate-authrestapi.md`. Renumber remaining steps.

---

## `migrate-oauthapi.md`

### [OAUTH-1] Step 2 ownership conflict with `migrate-authrestapi.md`

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-oauthapi.md` — approximately lines 39–46

**Issue:** `OauthApiTokenResource` removal from `GlueStorefrontApiApplicationDependencyProvider` appears in both this guide (step 2) and `migrate-authrestapi.md` (step 3). Confirmed fix: remove step 3 from `migrate-authrestapi.md` (see `[AUTH-1]`). This guide is the correct owner. No change needed here.

---

## `migrate-cartcodesrestapi.md`

### [CARTCODES-1] Missing step: Create `CartCodeDependencyProvider`

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartcodesrestapi.md` — after line 64 (before the "Regenerate" step)

**What the suite shows:** A **new file** was created:
`src/Pyz/CartCode/src/Pyz/Glue/CartCode/CartCodeDependencyProvider.php`

```php
namespace Pyz\Glue\CartCode;

use Spryker\Glue\CartCode\CartCodeDependencyProvider as SprykerCartCodeDependencyProvider;
use Spryker\Glue\SalesOrderThreshold\Plugin\Cart\SalesOrderThresholdCartResourceMapperPlugin;

class CartCodeDependencyProvider extends SprykerCartCodeDependencyProvider
{
    public function getCartStorefrontResourceMapperPlugins(): array
    {
        return [
            new SalesOrderThresholdCartResourceMapperPlugin(),
        ];
    }
}
```

The migration guide has no step for this. Without it, the `SalesOrderThreshold` data is not mapped onto cart code responses.

**Fix:** Insert a new step (before "Regenerate") instructing users to create `src/Pyz/Glue/CartCode/CartCodeDependencyProvider.php` with the content above.

---

## `migrate-cartsrestapi.md`

### [CARTS-1] Step 4: No warning that plugin FQCNs changed namespaces entirely

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartsrestapi.md` — approximately line 85

**Offending text:** The step describes deleting `Pyz\Zed\CartsRestApi\CartsRestApiDependencyProvider` without noting that all plugins in that file had their namespaces changed from `*RestApi\Plugin\CartsRestApi\*` to `*\Plugin\Cart\*`.

Examples of namespace changes:
- `Spryker\Zed\CompanyUsersRestApi\Communication\Plugin\CartsRestApi\CustomerCompanyUserQuoteExpanderPlugin` → `Spryker\Zed\CompanyUser\Communication\Plugin\Cart\CustomerCompanyUserQuoteExpanderPlugin`
- `Spryker\Zed\SharedCartsRestApi\Communication\Plugin\CartsRestApi\QuotePermissionGroupQuoteExpanderPlugin` → `Spryker\Zed\SharedCart\Communication\Plugin\Cart\QuotePermissionGroupQuoteExpanderPlugin`
- `Spryker\Zed\DiscountPromotionsRestApi\Communication\Plugin\CartsRestApi\DiscountPromotionCartItemMapperPlugin` → `Spryker\Zed\DiscountPromotion\Communication\Plugin\Cart\DiscountPromotionCartItemMapperPlugin`

A user copying old `use` statements will end up with wrong FQCNs silently.

**Fix:** In step 4, add a note: "Do not copy the old `use` statements from this file — the plugins have moved to new modules with new namespaces. Use the FQCNs listed in the subsequent step."

### [CARTS-2] Wrong verb for `OauthDependencyProvider.php` step

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartsrestapi.md` — approximately lines 233–234

**Offending text:** `"If your project has a src/Pyz/Zed/Oauth/OauthDependencyProvider.php, add the method below. If it does not exist yet, create it…"`

**What the suite shows:** `src/Pyz/Oauth/src/Pyz/Zed/Oauth/OauthDependencyProvider.php` existed before this migration and was **modified**. For any suite-based project this file pre-exists. The "if it does not exist yet, create it" branch is misleading.

**Fix:** Change to: "In `src/Pyz/Zed/Oauth/OauthDependencyProvider.php`, add the following method."

---

## `migrate-customersrestapi.md`

### [CUSTOMERS-1] Wrong FQCN for `CustomerAddressCheckoutDataValidatorPlugin`

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customersrestapi.md:104`

**Offending text:**
```php
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\CustomerAddressCheckoutDataValidatorPlugin;
```

**What the suite shows:**
```php
use Spryker\Zed\Customer\Communication\Plugin\Checkout\CustomerAddressCheckoutDataValidatorPlugin;
```

The namespace changed from `Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\` to `Spryker\Zed\Customer\Communication\Plugin\Checkout\`.

**Fix:** Replace line 104 with the correct FQCN.

### [CUSTOMERS-2] Step 5: "Create" file instruction is incomplete and conflicts with `migrate-checkoutrestapi.md`

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customersrestapi.md` — lines 111–129

**Issue:** Step 5 says "Create `src/Pyz/Glue/Checkout/CheckoutDependencyProvider.php`" but only shows a partial plugin-swap stub. The full file is created by `migrate-checkoutrestapi.md` step 6. Users following both guides will receive two conflicting "Create" instructions for the same file.

**Fix:** Replace step 5 with: "The plugin swap (`BillingAddressCheckoutRequestAttributesValidatorPlugin` → `BillingAddressCheckoutValidatorPlugin`) is reflected in `src/Pyz/Glue/Checkout/CheckoutDependencyProvider.php`, which is created in the `CheckoutRestApi` migration guide. If you have already completed that migration, verify that `BillingAddressCheckoutValidatorPlugin` is registered instead of `BillingAddressCheckoutRequestAttributesValidatorPlugin`."

---

## `migrate-checkoutrestapi.md`

### [CHECKOUT-1] Missing `getCheckoutDataValidatorPluginsForOrderAmendment()` method in step 8

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-checkoutrestapi.md` — step 8

**What the suite shows:** `src/Pyz/Checkout/src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php` adds a fifth method `getCheckoutDataValidatorPluginsForOrderAmendment()` that is entirely absent from the doc's code block. The method:

```php
/**
 * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDataValidatorPluginInterface>
 */
protected function getCheckoutDataValidatorPluginsForOrderAmendment(): array
{
    return [
        new CountriesCheckoutDataValidatorPlugin(),
        new ShipmentMethodCheckoutDataValidatorPlugin(),
        new ItemsCheckoutDataValidatorPlugin(),
        new CustomerAddressCheckoutDataValidatorPlugin(),
        new CompanyBusinessUnitAddressCheckoutDataValidatorPlugin(),
        new ShipmentTypeCheckoutDataValidatorPlugin(),
        new ClickAndCollectExampleReplaceCheckoutDataValidatorPlugin(),
    ];
}
```

**Fix:** Add this method to the code block in step 8, immediately after `getCheckoutDataValidatorPlugins()`.

---

## `migrate-agentauthrestapi.md`

### [AGENT-1] Missing step: Update `security.php` for `AgentOauthAuthenticator`

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-agentauthrestapi.md` — no step exists for this

**What the suite shows:** `config/Glue/packages/security.php` and `config/GlueStorefront/packages/security.php` both received:

```php
use Spryker\ApiPlatform\Security\GlueAuthenticationEntryPoint;
use Spryker\Glue\Agent\Api\Storefront\Security\AgentOauthAuthenticator;
// ...
->customAuthenticators([OauthAuthenticator::class, AgentOauthAuthenticator::class])
->entryPoint(GlueAuthenticationEntryPoint::class);
```

The guide has no step to update these files. Without this change, agent authentication will not work on the API Platform.

**Fix:** Add a step instructing users to update `config/Glue/packages/security.php` and `config/GlueStorefront/packages/security.php` to add `AgentOauthAuthenticator::class` to `customAuthenticators` and set the entry point to `GlueAuthenticationEntryPoint::class`.

### [AGENT-2] Guide does not mention that three `AgentAuthRestApi` plugins must be kept

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-agentauthrestapi.md` — around line 41–61

**Issue:** The guide instructs removal of route plugins only and states "The `AgentAuthRestApi` module did not register any relationship plugins." It is silent about three plugins that must be **retained** in `GlueApplicationDependencyProvider`:

- `Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentAccessTokenRestRequestValidatorPlugin` (in `getRestRequestValidatorPlugins()`)
- `Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentAccessTokenRestUserFinderPlugin` (in `getRestUserFinderPlugins()`)
- `Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentRestUserValidatorPlugin` (in `getRestUserValidatorPlugins()`)

A user cleaning up all `AgentAuthRestApi` imports would break the validation chain.

**Fix:** Add a "Plugins to keep" table listing these three plugins with their plugin stacks.

---

## `migrate-customeraccessrestapi.md`

### [CUSTACCESS-1] Guide does not mention `CustomerAccessFormatRequestPlugin` must be kept

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customeraccessrestapi.md` — step 2

**Issue:** The guide instructs removal of `CustomerAccessResourceRoutePlugin` from the route plugins, but is entirely silent about `CustomerAccessFormatRequestPlugin` registered in `getFormatRequestPlugins()`. The suite diff confirms this plugin stays. A user removing all `CustomerAccessRestApi` plugin registrations would break customer access enforcement.

**Fix:** Add a note in step 2 or a "Plugins to keep" section: "Do not remove `Spryker\Glue\CustomerAccessRestApi\Plugin\GlueApplication\CustomerAccessFormatRequestPlugin` from `getFormatRequestPlugins()` — it remains active."

---

## `migrate-merchantsrestapi.md`

### [MERCHANTS-1] Missing step: Create `MerchantDependencyProvider`; false claim about category mapping

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-merchantsrestapi.md` — approximately line 52

**Offending text:** Claims that "The API Platform `Merchant` module inlines category mapping directly in its provider — no plugin is needed."

**What the suite shows:** A **new file** `src/Pyz/Glue/Merchant/MerchantDependencyProvider.php` was created:

```php
namespace Pyz\Glue\Merchant;

use Spryker\Glue\Merchant\MerchantDependencyProvider as SprykerMerchantDependencyProvider;
use Spryker\Glue\MerchantCategory\Plugin\Merchant\MerchantCategoryMerchantStorefrontResourceMapperPlugin;

class MerchantDependencyProvider extends SprykerMerchantDependencyProvider
{
    protected function getMerchantStorefrontResourceMapperPlugins(): array
    {
        return [
            new MerchantCategoryMerchantStorefrontResourceMapperPlugin(),
        ];
    }
}
```

Category mapping is **not inlined** — it is wired via a plugin in a new Pyz dependency provider.

**Fix:**
1. Remove the false claim about category mapping being inlined.
2. Add a new step: "Create `src/Pyz/Glue/Merchant/MerchantDependencyProvider.php`" with the content above.

---

## `migrate-navigationsrestapi.md`

### [NAV-1] Missing config file migration: delete `NavigationsRestApiConfig`, create `NavigationConfig`

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-navigationsrestapi.md` — entire document

**What the suite shows:** The migration commit performs a rename and content change:
- **Deleted:** `src/Pyz/Glue/NavigationsRestApi/NavigationsRestApiConfig.php` (namespace `Pyz\Glue\NavigationsRestApi`, class `NavigationsRestApiConfig`)
- **Created:** `src/Pyz/Glue/Navigation/NavigationConfig.php` (namespace `Pyz\Glue\Navigation`, class `NavigationConfig extends SprykerNavigationConfig`)

The new file overrides `getNavigationTypeToUrlResourceIdFieldMapping()`:
```php
return [
    'category' => 'fkResourceCategorynode',
    'cms_page'  => 'fkResourcePage',
];
```

The guide has no step for either action. Any project with a customized `NavigationsRestApiConfig` will silently lose that configuration.

**Fix:** Insert a step (before the "Regenerate" step):
1. If `src/Pyz/Glue/NavigationsRestApi/NavigationsRestApiConfig.php` exists, delete it.
2. Create `src/Pyz/Glue/Navigation/NavigationConfig.php` with the content above (adapting any project-specific overrides).

---

## `migrate-productavailabilitiesrestapi.md`

### [PRODAVAIL-1] Step 3 missing row: `AbstractProductAvailabilitiesByResourceIdResourceRelationshipPlugin`

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productavailabilitiesrestapi.md` — step 3 table (~line 55)

**Issue:** Step 3 correctly documents removing `ConcreteProductAvailabilitiesByResourceIdResourceRelationshipPlugin` from `concrete-products`. The suite diff also shows `AbstractProductAvailabilitiesByResourceIdResourceRelationshipPlugin` was removed from its old top-level `RESOURCE_ABSTRACT_PRODUCTS` registration. This removal is not listed in the step — only in the status table.

**Fix:** Add a second row to the step 3 removal table:

| Plugin to remove | FQCN | Resource |
|---|---|---|
| `AbstractProductAvailabilitiesByResourceIdResourceRelationshipPlugin` | `Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\GlueApplication\AbstractProductAvailabilitiesByResourceIdResourceRelationshipPlugin` | `abstract-products` |

---

## `migrate-productimagesetsrestapi.md`

### [PRODIMG-1] Missing step: Remove old relationship plugin registrations

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productimagesetsrestapi.md` — between step 2 and step 3 (Regenerate)

**What the suite shows:** The following were removed from their top-level registrations in `GlueApplicationDependencyProvider`:
- `Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship\AbstractProductsProductImageSetsResourceRelationshipPlugin` (from `abstract-products`)
- `Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship\ConcreteProductsProductImageSetsResourceRelationshipPlugin` (from `concrete-products`)

The guide has no step instructing users to remove these.

**Fix:** Insert a new step 3 before "Regenerate":

Remove the following relationship plugin registrations from `getResourceRelationshipPlugins()` in `GlueApplicationDependencyProvider`:

| Plugin | FQCN | Resource |
|---|---|---|
| `AbstractProductsProductImageSetsResourceRelationshipPlugin` | `Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship\AbstractProductsProductImageSetsResourceRelationshipPlugin` | `abstract-products` |
| `ConcreteProductsProductImageSetsResourceRelationshipPlugin` | `Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship\ConcreteProductsProductImageSetsResourceRelationshipPlugin` | `concrete-products` |

---

## `migrate-productlabelsrestapi.md`

### [PRODLABEL-1] Missing step: Remove old relationship plugin registrations

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productlabelsrestapi.md` — between step 2 and step 3 (Regenerate)

**What the suite shows:** The following were removed from their top-level registrations:
- `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsRelationshipByResourceIdPlugin` (from `abstract-products`)
- `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelByProductConcreteSkuResourceRelationshipPlugin` (from `concrete-products`)

**Fix:** Insert a new step 3 before "Regenerate":

Remove the following relationship plugin registrations from `getResourceRelationshipPlugins()` in `GlueApplicationDependencyProvider`:

| Plugin | FQCN | Resource |
|---|---|---|
| `ProductLabelsRelationshipByResourceIdPlugin` | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsRelationshipByResourceIdPlugin` | `abstract-products` |
| `ProductLabelByProductConcreteSkuResourceRelationshipPlugin` | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelByProductConcreteSkuResourceRelationshipPlugin` | `concrete-products` |

---

## `migrate-productpricesrestapi.md`

### [PRODPRICE-1] Missing step: Remove old relationship plugin registrations

**File:** `docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productpricesrestapi.md` — between step 2 and step 3 (Regenerate)

**What the suite shows:** The following were removed from their top-level registrations:
- `Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication\AbstractProductPricesByResourceIdResourceRelationshipPlugin` (from `abstract-products`)
- `Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication\ConcreteProductPricesByResourceIdResourceRelationshipPlugin` (from `concrete-products`)

**Fix:** Insert a new step 3 before "Regenerate":

Remove the following relationship plugin registrations from `getResourceRelationshipPlugins()` in `GlueApplicationDependencyProvider`:

| Plugin | FQCN | Resource |
|---|---|---|
| `AbstractProductPricesByResourceIdResourceRelationshipPlugin` | `Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication\AbstractProductPricesByResourceIdResourceRelationshipPlugin` | `abstract-products` |
| `ConcreteProductPricesByResourceIdResourceRelationshipPlugin` | `Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication\ConcreteProductPricesByResourceIdResourceRelationshipPlugin` | `concrete-products` |

---

## Summary Table

| ID | File | Line | Type | Description |
|---|---|---|---|---|
| CROSS-1 | All files | :4 | Date | `last_updated` wrong — update to `Apr 08, 2026` everywhere |
| MAIN-1a | `migrate-glue-api-to-api-platform.md` | ~32 | Missing step | ProxyFactory removal from all 3 ApplicationServices.php files undocumented |
| MAIN-1b | `migrate-glue-api-to-api-platform.md` | ~32 | Missing step | CustomerOwnershipVoter/CustomerReferenceResolver removal from GlueStorefront undocumented |
| MAIN-1c | `migrate-glue-api-to-api-platform.md` | ~32 | Missing step | `bundles.php` reordering (ApiPlatformBundle before SprykerApiPlatformBundle) undocumented |
| MAIN-1d | `migrate-glue-api-to-api-platform.md` | ~32 | Missing step | `api_platform.php` normalization/MIME type additions undocumented |
| MAIN-1e | `migrate-glue-api-to-api-platform.md` | ~32 | Missing step | `config/install/docker.yml` provider-processor-glue moved from build-development to build undocumented |
| AUTH-1 | `migrate-authrestapi.md` | ~52–90 | Duplicate | Steps 3 and 5 duplicate oauthapi.md — remove them |
| CARTCODES-1 | `migrate-cartcodesrestapi.md` | after ~64 | Missing step | No instruction to create `Pyz\Glue\CartCode\CartCodeDependencyProvider` with `SalesOrderThresholdCartResourceMapperPlugin` |
| CARTS-1 | `migrate-cartsrestapi.md` | ~85 | Misleading | No warning that plugin FQCNs changed modules/namespaces; old use statements are wrong |
| CARTS-2 | `migrate-cartsrestapi.md` | ~233 | Wrong verb | "if it does not exist yet, create it" for `OauthDependencyProvider.php` — file pre-exists, say "update" |
| CUSTOMERS-1 | `migrate-customersrestapi.md` | 104 | Wrong FQCN | `Spryker\Zed\CustomersRestApi\...\CustomerAddressCheckoutDataValidatorPlugin` → `Spryker\Zed\Customer\Communication\Plugin\Checkout\CustomerAddressCheckoutDataValidatorPlugin` |
| CUSTOMERS-2 | `migrate-customersrestapi.md` | ~111–129 | Conflicting step | Step 5 "Create" file with partial stub conflicts with checkoutrestapi.md step 6; replace with cross-reference |
| CHECKOUT-1 | `migrate-checkoutrestapi.md` | step 8 | Missing method | `getCheckoutDataValidatorPluginsForOrderAmendment()` entirely absent from code block |
| AGENT-1 | `migrate-agentauthrestapi.md` | (missing) | Missing step | No step to add `AgentOauthAuthenticator` + `GlueAuthenticationEntryPoint` to security.php in Glue and GlueStorefront |
| AGENT-2 | `migrate-agentauthrestapi.md` | ~41–61 | Incomplete | No mention that 3 AgentAuthRestApi plugins (validator, finder, user-validator) must be kept |
| CUSTACCESS-1 | `migrate-customeraccessrestapi.md` | step 2 | Incomplete | No mention that `CustomerAccessFormatRequestPlugin` in `getFormatRequestPlugins()` must be kept |
| MERCHANTS-1 | `migrate-merchantsrestapi.md` | ~52 | Wrong + missing | False claim category mapping is inlined; missing step to create `Pyz\Glue\Merchant\MerchantDependencyProvider` |
| NAV-1 | `migrate-navigationsrestapi.md` | (missing) | Missing step | No step to delete `NavigationsRestApiConfig` and create `NavigationConfig` with type-to-URL mapping |
| PRODAVAIL-1 | `migrate-productavailabilitiesrestapi.md` | step 3 | Incomplete | `AbstractProductAvailabilitiesByResourceIdResourceRelationshipPlugin` removal from `abstract-products` not in step |
| PRODIMG-1 | `migrate-productimagesetsrestapi.md` | after step 2 | Missing step | No step to remove `AbstractProductsProductImageSetsResourceRelationshipPlugin` and `ConcreteProductsProductImageSetsResourceRelationshipPlugin` |
| PRODLABEL-1 | `migrate-productlabelsrestapi.md` | after step 2 | Missing step | No step to remove `ProductLabelsRelationshipByResourceIdPlugin` and `ProductLabelByProductConcreteSkuResourceRelationshipPlugin` |
| PRODPRICE-1 | `migrate-productpricesrestapi.md` | after step 2 | Missing step | No step to remove `AbstractProductPricesByResourceIdResourceRelationshipPlugin` and `ConcreteProductPricesByResourceIdResourceRelationshipPlugin` |
