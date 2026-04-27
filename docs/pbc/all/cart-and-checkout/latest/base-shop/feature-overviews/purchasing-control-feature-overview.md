---
title: Purchasing Control feature overview
description: Learn how the Purchasing Control feature lets B2B companies control departmental spending, define budget enforcement rules, and integrate with the Approval Process.
last_updated: April 13, 2026
template: concept-topic-template
label: early-access
---

The *Purchasing Control* feature lets B2B companies track and control procurement spending by assigning orders to cost centers and enforcing configurable budget rules. It extends the existing [Approval Process](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/approval-process-feature-overview.html) with a second dimension of spending governance: per-department or per-project budget limits that work alongside the existing per-person permission limits.

{% info_block infoBox "Info" %}

This feature is available in the Back Office and on the Storefront.

{% endinfo_block %}

## Cost centers

A *cost center* is an organizational unit within a company that incurs costs but does not directly generate revenue. Companies use cost centers to track and control spending by department, project, location, or function.

**Common examples:**

- **Departmental:** Marketing, Engineering, HR, Facilities
- **Project-based:** Office Renovation Q2 2026, Trade Show Berlin
- **Location-based:** Warehouse Berlin, Office London

Every purchase a buyer makes is charged to a cost center so the company can track where money is being spent. In ERP systems such as SAP, Oracle, and Microsoft Dynamics, cost centers are a foundational accounting concept - orders flow into the ERP tagged with a cost center code, enabling financial reporting and cost allocation.

## Budgets

A *budget* is a spending limit assigned to a cost center for a defined period - monthly, quarterly, or annually. It represents the maximum amount that a department or project is authorized to spend in that period.

**Example:** The Marketing department has a quarterly procurement budget of €50,000 for office supplies and event materials. Once that budget is consumed, further purchases are either blocked, flagged for review, or escalated for approval.

### Budget enforcement rules

Each budget is configured with one of three enforcement rules:

| RULE | DESCRIPTION |
| --- | --- |
| Block | The order is rejected outright when the budget is exceeded. The buyer cannot proceed to checkout. |
| Warn | A warning is displayed to the buyer, but they can proceed. |
| Require Approval | The order is sent for approval when the budget is exceeded. The buyer cannot complete checkout until an approver accepts the order. |

## Relationship to the Approval Process

Spryker's existing Approval Process triggers a workflow when a buyer's order exceeds their *Buy up to grand total* permission. The Purchasing Control feature adds a parallel check: an order might be within a buyer's personal permission limit but still exceed the cost center's remaining budget.

Both checks run independently at checkout. If either the permission limit or the budget rule is triggered, the configured action - block, warn, or require approval - is applied. This gives companies layered spending governance: per-person limits *and* per-department or per-project limits.

{% info_block warningBox "Approvals within a business unit" %}

Approvers can only approve orders of employees within their own business unit. This constraint applies to both permission-based and budget-based approval requests.

{% endinfo_block %}

## Cost centers and budgets in the procurement workflow

The typical B2B procurement flow involving cost centers and budgets:

1. **Finance sets budgets.** At the start of a fiscal period, finance allocates budgets to each cost center.
2. **Buyers are assigned to cost centers.** Buyers are linked to one or more cost centers they are authorized to purchase against. Cost centers are linked to company business units, so all users in a business unit are automatically assigned to the corresponding cost centers.
3. **Orders are tagged.** At checkout, the buyer selects which cost center the purchase is charged to. The system automatically selects the active budget for that cost center:
   - If exactly one active budget is available - it is selected automatically.
   - If multiple budgets are available - the buyer selects from a dropdown.
4. **Budget is validated.** The system checks whether the order total fits within the remaining budget for the selected cost center.
5. **Enforcement rules apply.** Based on the configured rule, the order is blocked, a warning is shown, or approval is required.
6. **Budget is consumed.** Once the order is confirmed, the budget balance is reduced by the order amount.
7. **Budget is restored.** If the order is cancelled, the consumed amount is returned to the budget balance.

## Checkout validation outcomes

| SCENARIO | OUTCOME |
| --- | --- |
| Within budget and within permission limit | Buyer completes checkout without additional steps. |
| Exceeds budget  -  Warn rule | A warning is displayed; the buyer proceeds but the order requires approval. |
| Exceeds budget  -  Require Approval rule | The order is sent for approval; the buyer cannot complete checkout until approved. |
| Exceeds Buy up to grand total permission limit | The order is sent for approval, same as the standard Approval Process. |
| Exceeds budget  -  Block rule | Checkout is blocked; no approval option is available. |

## Quote lock

When an order is sent for approval - whether triggered by a budget rule or a permission limit - the quote is locked to preserve the order state during the approval review. Neither the buyer nor the approver can modify the quote while it is pending approval. For details, see [Quote lock functionality](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/approval-process-feature-overview.html#quote-lock-functionality).

## Roles and capabilities

| ROLE | CAPABILITIES |
| --- | --- |
| Company Admin (Back Office) | Create, update, activate, and deactivate cost centers. Assign cost centers to business units. Create and manage budgets with amount, period, currency, and enforcement rule. View spend-vs-budget reports. Export reports to CSV. Review the audit log. |
| Buyer (Storefront) | Select a cost center and budget at checkout. View remaining budget for the selected cost center. Submit orders for approval when required. |
| Approver (Storefront) | Review locked quotes pending approval. Approve or reject orders, including those triggered by budget rules. |

## Related Developer documents

| INSTALLATION GUIDES |
| --- |
| [Install the Purchasing Control feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-purchasing-control-feature.html) |
