---
title: Recurring Orders feature overview
description: Learn how the Recurring Orders feature lets B2B buyers automate repeat purchases on a configurable schedule.
last_updated: Jun 30, 2026
template: concept-topic-template
label: early-access
---

{% info_block warningBox "Early Access" %}

This feature is in Early Access. We'd love for you to try it out and share feedback as we work toward general availability.

{% endinfo_block %}

The *Recurring Orders* feature lets B2B buyers set up automated repeat purchases directly from the checkout. Once configured, the system places orders automatically at the chosen interval, sends notifications before each execution, and pauses for buyer review when prices change or products become unavailable.

![Recurring order list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Recurring+Orders/RecurringOrders_1.png)

![Recurring order detail](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Recurring+Orders/RecurringOrders_2.png)

## Concepts

| TERM | DESCRIPTION |
| --- | --- |
| Recurring schedule | The configuration record that drives automated order placement. Stores the cadence, the serialized quote snapshot, and the state machine state. |
| Cadence | The interval at which the order is placed. One of: weekly, bi-weekly, monthly, or every N weeks. |
| Trigger date | The date on which the state machine attempts to place the next order. |
| Notification window | The number of hours before the trigger date when the pre-trigger notification is sent to the buyer. |
| Review Required | A state the schedule enters when price increases or product issues are detected at pre-placement validation. The buyer must accept or adjust the order before it is placed. |

## Setting up a recurring order

At checkout, an eligible buyer can enable the recurring order setup widget. The buyer selects a cadence (for example, weekly or monthly) and optionally sets a schedule name and an interval value for the *every N weeks* cadence.

When the order is placed, the system:

1. Saves a serialized snapshot of the quote — including products, quantities, prices, shipment method, and payment method.
2. Creates a recurring schedule record in `spy_recurring_schedule` with the first trigger date calculated from the cadence.
3. Registers the schedule with the `RecurringOrder` state machine in the `draft` state and immediately activates it.

A recurring schedule is **only available** for quotes that meet all of the following conditions:

- The quote is not locked (not sent for approval).
- The quote does not originate from a Request for Quote (RFQ).
- The customer is not a guest.
- The payment method is invoice-based (`invoice`, `purchaseOnAccount`, or a configured equivalent).

## Cadence types

| CADENCE | DESCRIPTION |
| --- | --- |
| Weekly | Places an order every 7 days. |
| Bi-weekly | Places an order every 14 days. |
| Monthly | Places an order on the same calendar day each month. If the day does not exist in the target month (for example, day 31 when the next month has fewer days), the date overflows into the following month. |
| Every N weeks | Places an order every N weeks. Requires a positive integer value for N. |

![Recurring order setup at checkout](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Recurring+Orders/RecurringOrders_3.png)

## Schedule lifecycle

The recurring schedule moves through states managed by the `RecurringOrder` state machine. The following diagram describes the full lifecycle:

| STATE | DESCRIPTION |
| --- | --- |
| `draft` | Newly created. Transitions to `active` immediately after checkout. |
| `active` | Running. The state machine checks the trigger date on every cron run. |
| `notifying` | The trigger date is within the notification window. The system sends a pre-trigger notification to the buyer. |
| `pre_trigger_notified` | The buyer has been notified. The schedule waits for the placement window to open or for a manual action (skip or cancel). |
| `validation` | Pre-placement validation is running. Price and availability are checked. |
| `confirmed` | Validation passed. The order is ready for placement. |
| `order_placed` | The checkout has been initiated. The system waits for confirmation. |
| `completing` | The order was successfully placed. The next trigger date is calculated and the schedule returns to `active`. |
| `skipped` | The buyer skipped the current execution. The next trigger date is advanced by one full cadence interval. |
| `review_required` | Validation detected an issue (price increase or product unavailability). The buyer must review before placement can proceed. |
| `paused` | The buyer manually paused the schedule. No orders are placed until it is resumed. |
| `failed` | The last order placement attempt failed. The buyer can retry, which moves the schedule to `review_required`. |
| `cancelled` | The schedule has been permanently stopped. This is a terminal state. |

### Buyer actions

Buyers can perform the following manual actions from the recurring order detail page on the storefront:

| ACTION | AVAILABLE FROM STATES | DESCRIPTION |
| --- | --- | --- |
| Pause | `active` | Temporarily stops order placement. The schedule can be resumed at any time with an optional custom resume date. |
| Resume | `paused` | Reactivates the schedule. The buyer can set a new next trigger date or keep the existing one. |
| Skip | `active`, `pre_trigger_notified`, `review_required` | Skips the next scheduled execution. The new trigger date is calculated by advancing the current trigger date by one cadence interval. If the current trigger date is already in the past due to processing lag, the recalculated date may also fall in the past and the schedule will process on the next cron run. |
| Cancel | `active`, `paused`, `pre_trigger_notified`, `review_required`, `failed`, `draft` | Permanently cancels the schedule. This action cannot be undone. The `draft` state is transient and is normally activated synchronously at checkout; cancellation from `draft` is a safety fallback. |
| Review | `review_required` | Opens the Review Required page where the buyer can accept price changes, remove unavailable items, and place the order. |
| Retry | `failed` | Moves the schedule to `review_required` so the buyer can review and re-attempt placement. |

![Recurring order list with attention banner](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Recurring+Orders/RecurringOrders_4.png)

## Pre-trigger notification

Before each order placement, the system sends an email to the buyer within the configured **Schedule Grace Period** (default: 48 hours before the trigger date). The notification includes:

- The schedule name and the upcoming execution date.
- A link to the schedule detail page where the buyer can skip, pause, or cancel before the order is placed.

The Schedule Grace Period is configured globally in the Back Office under **Configuration > Recurring Orders > General > Schedule**. Individual schedules can override the global value via `getDefaultNotificationWindowHours()` in `OrderExperienceManagementConfig`.

## Review Required flow

Before placing each order, the system validates the stored quote snapshot against current product and pricing data. If issues are detected, the schedule moves to the `review_required` state and the buyer receives a review notification email.

The buyer reviews the flagged items on the **Review Required** page. The following table lists common issue types. The full set of checkout error types that map to each group is configurable via `getReviewReasonGroupMap()` in `OrderExperienceManagementConfig`.

| ISSUE | DESCRIPTION |
| --- | --- |
| Price increased | The current unit price is higher than the reference price stored on the schedule item. |
| Unavailable | The product is out of stock, inactive, or blocked by a merchant or product approval rule. |
| Packaging unit unavailable | The product packaging unit constraints cannot be satisfied — for example, the required minimum or lead quantity is not available. |
| Discontinued | The product has been discontinued. |
| Substituted | The product has been replaced by another product. |
| Not approved | The product is pending approval and cannot be purchased. |
| Price unavailable | No current price could be resolved for the product. |
| Configurable bundle unavailable | A member of a configurable bundle is unpurchasable, so the entire bundle is dropped. |

Items flagged as **unavailable** or **not approved** are non-purchasable and must be removed before the order can proceed. Items with a price increase can be accepted or removed. The buyer confirms the changes, which updates the stored quote snapshot and places the order.

![Review Required page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Recurring+Orders/RecurringOrders_5.png)

## Execution history

Each recurring schedule maintains a full execution history. Every significant event is recorded:

| EVENT | DESCRIPTION |
| --- | --- |
| Placed | An order was successfully placed. The history entry links to the resulting sales order. |
| Failed | An order placement attempt failed. The entry includes the failure reason. |
| Skipped | The execution was skipped by the buyer. |
| Paused | The schedule was paused. |
| Resumed | The schedule was resumed. |
| Cancelled | The schedule was permanently cancelled. |

## Storefront pages

| PAGE | PATH | DESCRIPTION |
| --- | --- | --- |
| Recurring order list | `/recurring-orders` | Lists all recurring schedules for the current buyer, with status, cadence, and trigger date. Company users with the appropriate permission can filter by scope (own, company, or business unit). |
| Recurring order detail | `/recurring-orders/{uuid}` | Shows the full schedule configuration, the items and quantities, the next execution date, and the full execution history. |
| Review Required | `/recurring-orders/{uuid}/review-required` | Shows flagged items with issue reasons and price comparisons. The buyer accepts changes and places the order from this page. |

## B2B visibility and permissions

By default, a buyer can only view their own recurring schedules. Company users with additional permissions can view schedules across their organization:

| PERMISSION | DESCRIPTION |
| --- | --- |
| `SeeCompanyOrdersPermissionPlugin` | Grants visibility over all recurring schedules within the company. |
| `SeeBusinessUnitOrdersPermissionPlugin` | Grants visibility over all recurring schedules within the buyer's business unit. |

These permissions are registered as company role permissions and assigned in the Back Office under **Customers > Company Roles**.

## Attention banner

When a buyer has schedules in the `paused`, `review_required`, or `failed` states, an attention banner is displayed on the storefront. The banner shows the count of schedules requiring attention and provides quick-access links to filter the recurring order list by each status.

## Related documents

- [Install the Recurring Orders feature](/docs/pbc/all/order-experience-management/latest/base-shop/install-and-upgrade/install-features/install-the-recurring-orders-feature.html)
