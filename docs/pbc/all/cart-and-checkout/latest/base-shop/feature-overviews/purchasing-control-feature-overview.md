---
title: Purchasing Control feature overview
description: Learn how the Purchasing Control feature lets B2B companies control departmental spending, define budget enforcement rules, assign cost centers to quote requests, and integrate with the Approval Process.
last_updated: Aug 21, 2026
template: concept-topic-template
---

The *Purchasing Control* feature lets B2B companies track and control procurement spending by assigning orders to cost centers and enforcing configurable budget rules. It extends the existing [Approval Process](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/approval-process-feature-overview.html) with a second dimension of spending governance: per-department or per-project budget limits that work alongside the existing per-person permission limits.

Buyers assign a cost center and a budget to a cart at checkout or to a quote request, and agents can do the same on a customer's behalf.

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

### Deactivated cost centers and budgets

A cost center or budget can be deactivated instead of deleted, which preserves the history of the orders already charged to it. Deactivated records are not offered in the cost center and budget selectors, and a deactivated cost center is no longer shown where the assignment of a cart or quote is displayed. If every cost center available to a buyer is deactivated, or if the selected cost center has no active budget left, no choices are rendered and the buyer cannot assign one until an active record is available again.

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

### Budgets in recurring orders

With the [Recurring Orders feature](/docs/pbc/all/order-experience-management/latest/base-shop/feature-overviews/recurring-orders-feature-overview.html) installed, a recurring order carries a cost center and a budget, selected on the recurring order forms and changeable when the buyer edits the schedule or approves a review.

Budgets with the **Require Approval** enforcement rule cannot be used for a recurring order. A recurring order places its follow-up orders unattended, so no approver can accept them at placement time. The restriction applies in two places:

- Such budgets are not offered in the recurring order budget selector.
- Checkout is blocked if a quote being set up as a recurring order carries one. This check applies regardless of the quote grand total and of the remaining budget amount, so the budget does not have to be exceeded for the block to take effect.

Regular, non-recurring checkouts are not affected—there, the **Require Approval** rule behaves as described above.

## Relationship to the Approval Process

Spryker's existing Approval Process triggers a workflow when a buyer's order exceeds their *Buy up to grand total* permission. The Purchasing Control feature adds a parallel check: an order might be within a buyer's personal permission limit but still exceed the cost center's remaining budget.

Both checks run independently at checkout. If either the permission limit or the budget rule is triggered, the configured action - block, warn, or require approval - is applied. This gives companies layered spending governance: per-person limits *and* per-department or per-project limits.

{% info_block infoBox "Permissions required for the Require Approval enforcement rule" %}

To use budgets with the **Require Approval** enforcement rule, the following [Approval Process](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/approval-process-feature-overview.html) permissions must be assigned to the relevant company roles:

| PERMISSION | REQUIRES |
| --- | --- |
| Buy up to grand total | Send cart for approval |
| Send cart for approval | Buy up to grand total |
| Approve up to grand total | None |

{% endinfo_block %}

{% info_block warningBox "Approvals within a business unit" %}

Approvers can only approve orders of employees within their own business unit. This constraint applies to both permission-based and budget-based approval requests.

{% endinfo_block %}

## Cost centers and budgets in the procurement workflow

The typical B2B procurement flow involving cost centers and budgets:

1. **Finance sets budgets.** At the start of a fiscal period, finance allocates budgets to each cost center.
2. **Buyers are assigned to cost centers.** Buyers are linked to one or more cost centers they are authorized to purchase against. Cost centers are linked to company business units, so all users in a business unit are automatically assigned to the corresponding cost centers.
3. **Orders are tagged.** At checkout, the buyer selects the cost center the purchase is charged to and the budget it is drawn from. Both fields are saved together in a single step:
   - The budget dropdown offers the budgets of every cost center available to the buyer, narrowed to the selected cost center.
   - Changing the cost center narrows the budget list immediately, without reloading the page. If the previously selected budget does not belong to the new cost center, the budget field is cleared.
   - If the selected cost center has no active budgets, the budget field is hidden and a message states that no budgets are available.
   - A budget that is selected must belong to the selected cost center. The pairing is validated on the server, so a mismatched combination is rejected even when the browser-side filtering is bypassed.
   - The selector form does not enforce a budget selection by itself, but the field is marked as required in the browser whenever the selected cost center has active budgets. An order cannot be placed without an active budget: if the buyer's business unit has active cost centers and no active budget is resolved, checkout fails and the buyer is asked to select a cost center and a budget.
4. **Budget is validated.** The system checks whether the order total fits within the remaining budget for the selected cost center.
5. **Enforcement rules apply.** Based on the configured rule, the order is blocked, a warning is shown, or approval is required.
6. **Budget is consumed.** Once the order is confirmed, the budget balance is reduced by the order amount.
7. **Budget is restored.** If the order is cancelled or refunded, the budget balance is restored by the amount corresponding to the cancelled or refunded items. For partial cancellations or refunds, only the amounts of the affected items are restored.

## Checkout validation outcomes

| SCENARIO | OUTCOME |
| --- | --- |
| Within budget and within permission limit | Buyer completes checkout without additional steps. |
| Exceeds budget  -  Warn rule | A warning is displayed; the buyer can proceed to checkout. |
| Exceeds budget  -  Require Approval rule | The order is sent for approval; the buyer cannot complete checkout until approved. |
| Exceeds Buy up to grand total permission limit | The order is sent for approval, same as the standard Approval Process. |
| Exceeds budget  -  Block rule | Checkout is blocked; no approval option is available. |
| Recurring order with a Require Approval budget | Checkout is blocked, whether or not the budget is exceeded. The buyer must select a budget bound to the Block or Warn rule. |
| No active budget resolved while the business unit has active cost centers | Checkout fails; the buyer must select a cost center and a budget before placing the order. |

## Quote lock

When an order is sent for approval - whether triggered by a budget rule or a permission limit - the quote is locked to preserve the order state during the approval review. Neither the buyer nor the approver can modify the quote while it is pending approval. For details, see [Quote lock functionality](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/approval-process-feature-overview.html#quote-lock-functionality).

## Cost centers and budgets on quote requests

Buyers do not have to wait until checkout to attribute spending. The same cost center and budget selection is available on quote requests, so a purchase is assigned to a cost center while it is still being negotiated.

{% info_block infoBox "Info" %}

Cost center selection on quote requests requires the [Quotation Process](/docs/pbc/all/request-for-quote/latest/install-and-upgrade/install-features/install-the-quotation-process-feature.html) feature.

{% endinfo_block %}

| CONTEXT | WHERE THE SELECTION IS AVAILABLE |
| --- | --- |
| Buyer (Storefront) | Quote request details page and quote request edit page in the company area. |
| Agent (Storefront) | Agent quote request details page and agent quote request edit page. |

### Cost centers follow the quote request owner

Cost centers are scoped per company business unit. On a quote request, the applicable cost centers are those of the business unit that owns the request - the business unit of the company user who created it - and not those of the person currently viewing it. An agent working on a customer's quote request therefore sees the customer's cost centers rather than their own.

Buyers can only change the cost center on their own quote requests. A quote request reference that belongs to another company user is treated as not found, so an unauthorized reference is indistinguishable from a reference that does not exist.

### Editability

On a quote request, selecting a budget is optional: there is no checkout to pass, so a quote request is saved with a cost center and no budget. A budget that is selected must still belong to the selected cost center.

A cost center and a budget can be changed only while the quote request is in an editable status. The status check runs on the server, so a quote request that is no longer editable is rejected even when the form is submitted directly. Quote requests that are not editable still display the assigned cost center and budget as read-only.

## Roles and capabilities

| ROLE | CAPABILITIES |
| --- | --- |
| Site Operator (Back Office) | Create, update, activate, and deactivate cost centers. Assign cost centers to business units. Create and manage budgets with amount, period, currency, and enforcement rule. View the **Cost Center** column in the orders table. Filter and search orders by cost center and budget. View spend-vs-budget reports. Export reports to CSV. Review the audit log. Import cost centers, budgets, and business unit assignments in bulk using data import. |
| Cost Center Manager (Storefront) | Create, update, activate, and deactivate cost centers and budgets from the company area. Requires the **Manage Cost Centers** permission assigned to their company role. |
| Buyer (Storefront) | Select a cost center and budget at checkout. Assign a cost center and budget to their own quote requests. View the remaining budget for the selected cost center. Submit orders for approval when required. Filter order history by cost center and budget. View the assigned cost center and budget on order detail pages. |
| Approver (Storefront) | Review locked quotes pending approval. Approve or reject orders, including those triggered by budget rules. |
| Agent (Storefront) | Assign a cost center and budget to a customer's quote request on the customer's behalf, using the cost centers of the quote request owner's business unit. |

## Related Developer documents

| INSTALLATION GUIDES |
| --- |
| [Install the Purchasing Control feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-purchasing-control-feature.html) |

| MIGRATION GUIDES |
| --- |
| [Upgrade the PurchasingControl module](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-purchasingcontrol-module.html) |
