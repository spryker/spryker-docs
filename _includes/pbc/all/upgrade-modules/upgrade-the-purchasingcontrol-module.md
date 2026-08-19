
## Upgrading from version 1.* to version 2.*

In this new version of the `PurchasingControl` module, we have:

- Made it possible to select a cost center and a budget together in a single submit. The budget dropdown now offers the budgets of every available cost center and is narrowed to the selected cost center in the browser, so changing the cost center no longer reloads the page.
- Added cost center and budget selection for quote requests, in both the customer and the agent context.

This release contains a breaking change. It also contains changes that are backward compatible but require action in projects that have customized the module. Review the following sections before upgrading.

*Estimated migration time: 30 min*

### Breaking changes

| CHANGE | IMPACT |
| --- | --- |
| `spryker/quote-request` and `spryker/quote-request-agent` became hard requirements of `spryker-feature/purchasing-control`. | Both modules are installed even in projects that do not use quote requests. Because `spryker/quote-request` brings its own database tables, installing them requires migration effort. |
| Two new glossary keys are used in existing business logic: `purchasing_control.budget.validation.cost_center_mismatch` and `purchasing_control.quote_request.cost_center_updated`. | Import both keys as described in [Upgrade steps](#upgrade-steps). Until they are imported, the Storefront displays the raw keys instead of the messages. |

### Changes affecting project customizations

The following changes are backward compatible: every class involved sits behind the module API, and every new argument is optional. They still require action in projects that extend these classes or override these templates.

| CHANGE | IMPACT |
| --- | --- |
| `CostCenterResolverInterface::resolveCostCenters()`, `CostCenterSelectorFormDataProvider::getDataAndOptions()`, and `PurchasingControlFactory::createCostCenterSelectorForm()` each gained an optional `?int $idCompanyBusinessUnit = null` parameter. | Call sites are unaffected. Project implementations, decorators, and overrides must adopt the new signature: PHP rejects an inherited method that declares fewer parameters than the method it overrides, so an override written against the old signature fails with a fatal error. When the argument is `null`, the business unit of the logged-in company user is used, which preserves the previous behavior. |
| `CostCenterSelectorFormDataProvider::buildOptions()` was replaced by `getCostCenterBudgetOptions()`, and `buildBudgetChoices()` was replaced by `buildBudgetLabels()`. | Project classes that extend the data provider and override either method must be updated. An override of a method that no longer exists is never called, so the customization is lost without an error. |
| `CostCenterSelectorFormDataProvider::buildBudgetChoiceAttrs()` gained a new second parameter: `array $formattedRemainingAmounts` replaces `string $currencyCode`. | Project overrides must adopt the new signature. An override that keeps the old signature fails with a `TypeError` at runtime. The new parameter is an array of formatted remaining amounts keyed by budget ID. |
| `CostCenterSelectorFormDataProvider::buildBudgetChoiceLabel()` keeps its name and parameter types, but its second parameter changed meaning: `string $formattedRemainingAmount` replaces `string $currencyCode`. | Project overrides must be updated. Because the method signature is unchanged, an override keeps running and silently receives an already-formatted money string where it expects a currency code, which produces incorrect budget labels instead of an error. |
| `CostCenterSelectorForm` gained two required options, `OPTION_BUDGET_LABELS` and `OPTION_BUDGET_COST_CENTER_MAP`, and the shape of the required `OPTION_BUDGET_CHOICES` option changed from `array<string, int>`, which mapped a budget label to a budget ID, to a plain list of budget IDs, `array<int>`. | Code that builds the form without going through `CostCenterSelectorFormDataProvider` must pass all three options. `OPTION_BUDGET_LABELS` holds the labels keyed by budget ID and is resolved through a `choice_label` closure. `OPTION_BUDGET_COST_CENTER_MAP` is an `array<int, int>` that maps a budget ID to the ID of the cost center that owns it. `OPTION_BUDGET_CHOICES` now takes `array_keys($budgetLabels)` instead of the label-to-ID map. |
| `cost-center-selector.twig` was restructured: its `define` gained a `formAction` parameter that defaults to `null` and falls back to `path('company/cost-center/update-quote')`, and the submit button moved into its own `apply_field` block that is always rendered. When at least one budget is available across the cost centers offered to the user, the budget field, the remaining amount, and the no-budgets row are all rendered and toggled with `is-hidden` as the cost center changes. When no cost center has a budget, the template falls back to a static message and nothing is toggled. | Project template overrides must be re-based against the new blocks, and an override must accept `formAction` and use it as the form action. An override that ignores the parameter posts every submit to the cart route, so the quote request pages stop working. Previously, the budget field and the submit button were not rendered at all until a cost center was persisted. |
| The cost center selector is rendered from a new `costCenter` block in the `quote-request-details.twig` and `quote-request-edit.twig` templates of `QuoteRequestPage` and `QuoteRequestAgentPage`. | Projects that override any of these templates do not render the selector on the affected pages until the overrides are re-based against the new module templates or the `costCenter` block is added to them. |

{% info_block warningBox "Silent change in project overrides" %}

If your project overrides `CostCenterSelectorFormDataProvider`, check `buildBudgetChoiceLabel()` before upgrading. Its signature is identical in both versions, so neither PHP nor static analysis reports a problem, but the second argument is now a formatted remaining amount instead of a currency code. An unadjusted override renders wrong budget labels without raising an error.

{% endinfo_block %}

{% info_block warningBox "Behavior change" %}

On the cart and quote path, submitting a new cost center together with a budget now persists the budget. Previously, the budget was discarded whenever the submitted cost center differed from the persisted one, so a first-time selection saved the cost center and left the budget empty. Consistency between the two values is now guaranteed by the new server-side validation instead.

The `onchange="this.form.submit()"` attribute was removed from the cost center select, because changing the cost center no longer requires a page reload to narrow the budget list. Projects that relied on the automatic form submit must adopt the client-side filtering shipped in `cost-center-selector.ts`.

{% endinfo_block %}

### Upgrade steps

To upgrade to the new version of the module, do the following:

1. Upgrade the `PurchasingControl` module to the new version:

```bash
composer require spryker-feature/purchasing-control:"^2.0.0" --update-with-dependencies
```

2. Generate the transfer objects:

```bash
console transfer:generate
```

3. Add the following glossary keys to `data/import/common/common/glossary.csv` and import them:

```csv
purchasing_control.budget.validation.cost_center_mismatch,"The selected budget does not belong to the selected cost center.",en_US
purchasing_control.budget.validation.cost_center_mismatch,"Das ausgewählte Budget gehört nicht zur ausgewählten Kostenstelle.",de_DE
purchasing_control.quote_request.cost_center_updated,Cost center and budget have been saved.,en_US
purchasing_control.quote_request.cost_center_updated,Kostenstelle und Budget wurden gespeichert.,de_DE
```

```bash
console data:import:glossary
```

4. Review the preceding tables and update the affected project classes, forms, and templates.

5. If you want buyers and agents to assign cost centers and budgets to quote requests, follow [Integrate cost centers with quote requests](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-purchasing-control-feature.html#integrate-cost-centers-with-quote-requests). This step requires the [Quotation Process](/docs/pbc/all/request-for-quote/latest/install-and-upgrade/install-features/install-the-quotation-process-feature.html) feature and adds a mandatory `QuoteRequestConfig` change: without it, the cost center and budget are stripped when a quote request version is saved.

{% info_block warningBox "Verification" %}

- On the checkout summary page, select a cost center and a budget in one submit and make sure both values are saved.
- Change the cost center and make sure the budget dropdown is narrowed immediately, without a page reload, and that the remaining amount is updated.
- Select a cost center that has no budgets and make sure the budget field is hidden and a message states that no budgets are available.
- Create two cost centers that each own a budget with the same name and make sure both budgets are offered.

{% endinfo_block %}
