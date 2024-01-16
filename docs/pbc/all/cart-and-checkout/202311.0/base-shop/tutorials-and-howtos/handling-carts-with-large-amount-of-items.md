---
title: Handling carts with large amount of items
description: This overview provides a comprehensive list of potential challenges you may encounter to handle carts with large amount of items. Use this information to identify the most critical challenges and develop mitigation strategies tailored to your specific project requirements and resource constraints.
last_updated: Jan 09, 2024
template: howto-guide-template
---

Spryker's cart management easily covers small to medium-sized shopping carts, which satisfies the majority of use cases. However, you may have to deal with really large carts counting many hundreds and sometimes even thousands of line items. Handling such big carts usually means you have to go beyond the usual setup and customize on the project level. This document describes the challenges introduced by large carts and how you can effectively customize Spryker to deal with them.

Because UI plays a crucial role while working with big carts, this document focuses on Storefront. If you're using Spryker in a headless way, you can focus on Glue and Backend strategies. However, we encourage you to consider if you can apply Storefront strategies to your third-party frontend solution.

## Challenges and mitigation strategies

The following sections describe the possible challenges you need to consider. Use it as a guidance and evaluate, what challenges have the biggest impact on your project, and what mitigation strategies are the most effective given your business requirements and available resources.

Mitigation strategies are divided into the following categories:

- *Backend*: calculations, caching strategies; applies to every project, regardless of whether Yves or headless approach is used.
- *Storefront*: applies only to projects with Yves Storefront.
- *Glue*: applies only to projects with headless approach.

Choose and apply the mitigation strategies that meet your requirements. Implementing them altogether might not be cost-efficient or even compatible. Consider implementing strategies in a “conditional“ mode, which enables the feature after achieving a certain cart size threshold. Despite having to maintain two solutions, it can give you good flexibility and a fallback tolerance.

## Heavy rendering with atomic design

Atomic design leads to long rendering time for large carts, consuming a significant portion of display processing time.

Storefront: rework the cart page to reduce reliance on atomic design, simplifying the UI components and the overall rendering process.


## Database-intensive cart calculation

Price calculation and cart checks, like actualizing prices and availability, that involve database or third-party calls are done on the cart item level and performed on each cart change.

Backend:
- Shift from item-by-item data extraction to batch processing before looping through items in the calculation stack.
- Implement caching strategies to avoid recalculating the entire cart each time, focusing especially on resource-heavy calculation.

Storefront:
- Extract heavy operations, like price and availability updates, into dedicated async calls.
- Shift from full-cart to partial lookups for operations like removing or updating a single cart item.

Glue: Implement dedicated “lightweight“ API endpoints for partial updates or heavy operations.


## Slow session handling

While not every session request requires cart data, a large cart being part of a session leads to a slow session lookup and update.

Yves: Move cart data to separate Redis entries, leaving only the key reference in the session.

## Concurrency in shared carts    

Sharing large carts among multiple users can lead to concurrency issues.

Backend: implement the following:

- Business-level limitations for working in a shared mode with large carts.
- Locking mechanisms to manage concurrent updates more efficiently. Focus on optimistic locking.
- A versioning system for carts where changes are tracked, and real-time feedback is provided to users when conflicts occur.                      

## UI display challenges

Displaying a full cart in an overlay on each page and managing cart pages with hundreds of items brings significant UI challenges.

Backend: Implement search and sorting mechanisms for the cart.

Yves:
- Rethink the cart UI design to better accommodate large numbers of items and enhance UX.
- Implement the following:
  - Generalized or simplified info in the cart overlay.
  - Pagination when viewing cart items.
  - Asynchronous rendering.
  - Infinite scrolling.

Glue: Implement API endpoints that support sorting, searching, pagination, or asynchronous cart rendering.


## Placing large orders from large cart

Converting large carts into orders results in orders with many items, complicating order management.   

Backend:
- Plan the OMS design with a focus on bulk processing and asynchronous (background) operations. Be cautious with functionalities like [Splittable Order Items](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/splittable-order-items-overview.html) to avoid creating too large orders.</p><p>- If placing an order is inevitably complex and slow, consider making it asynchronously to not let your customer wait. Make sure to cover the cases of overbooking and failed order placements. </p><p>

Yves: Consider UI changes, similar to the cart UI changes mentioned in the previous point.

Glue: Implement an API endpoint that supports async order creation.|

## Complex checkout process

When the whole cart information is loaded, handling split payments, shipping costs, and summarizing large carts during checkout can be challenging.

Backend:
- Reduce unnecessary backend checks between steps and excessive quote walkthroughs.
- Unless it’s really needed, don’t load or involve full cart information on checkout steps.

Yves: Redesign the checkout process to better manage large carts and enhance the UX.

Glue:
- Prepare dedicated “lightweight“ checkout API endpoints for specific updates or recalculations.
- Introduce pagination for the `checkout-data` endpoint.                                                                                                                                |

## Conclusion

The strategies outlined in this document aim to provide a solid foundation for tackling common issues related to performance, database load, user interface design, and more. However, the world of e-commerce is ever-evolving, and every project brings its own unique set of challenges and opportunities.

We understand that the solutions presented here might not cover every scenario, and there's always room for innovation and improvement. That's why we highly value the experiences and insights from our customers and partners. If you've encountered additional challenges or creative mitigation strategies in your projects, we encourage you to share your experiences with us. Your contributions not only help us refine our approaches but also enrich the Spryker community as a whole and learn together!
