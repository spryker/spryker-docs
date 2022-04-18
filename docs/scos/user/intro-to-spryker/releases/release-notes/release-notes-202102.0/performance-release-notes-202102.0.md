---
title: "Performance release notes: 202102.0 SEC"
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/security-release-notes-2021020-sec
originalArticleId: d994a867-d0c8-4c47-b8a7-ed7cc14e8345
redirect_from:
  - /2021080/docs/performance-release-notes-2021020
  - /2021080/docs/en/performance-release-notes-2021020
  - /docs/performance-release-notes-2021020
  - /docs/en/performance-release-notes-2021020
---

This document describes the performance improvements we implemented in release `202102`. To install an improvement, migrate the provided modules to the specified versions.


## spryker/comment

Improvements:

* Added `CommentFacade::getCommentThreads()` to retrieve `CommentThreadTransfer` transfers in batches.

* Added `CommentThreadQuoteExpanderPlugin` and new plugin interfaces to prefetch data.


To install this improvement, update the following module:

| MODULE | VERSION |
| - | - |
| spryker/comment | 1.1.0 |



## spryker/quote-approval

Improvements:

* Added `QuoteApprovalFacade::getQuoteApprovals()` to retrieve `QuoteApprovalTransfer` transfers in batches.

* Added `QuoteApprovalExpanderPlugin` and new plugin interfaces to prefetch data.


To install this improvement, update the following module:

| MODULE | VERSION |
| - | - |
| spryker/quote-approval | 1.4.0 |



## spryker/shared-cart

Improvements:

* Added `SharedCartFacade:: getSharedCartDetails()` to retrieve `ShareDetailTransfer` transfers in batches.

* Added `ShareDetailsQuoteExpanderPlugin` and new plugin interfaces to prefetch data.


To install this improvement, update the following module:


| MODULE | VERSION |
| - | - |
| spryker/shared-cart | 1.18.0 |

## spryker/product  

Improvement: United the queries used to retrieve data from `ProductConcreteManager::findProductConcretesBySkus()`.


To install this improvement, update the following module:

| MODULE | VERSION |
| - | - |
| spryker/product | 6.22.2 |

## spryker/quote   

Improvement: Added new plugin interfaces to prefetch data before processing single items.

To install this improvement, update the following module:

| MODULE | VERSION |
| - | - |
| spryker/quote | 2.15.1 |

## spryker/session    

Improvement: Moved `Session::save()` to the `KernelEvents::Terminate` event.

Additional information: Improved page load speed by moving session saving to the terminate event where it does not affect the performance.


To install this improvement, update the following module:


| MODULE | VERSION |
| - | - |
| spryker/session | 4.9.2 |

## spryker/shopping-list

Improvements:

* Removed a duplicated database call to retrieve blacklisted shopping list IDs.

* Optimized the database query for retrieving shopping lists.

* Adjusted `ShoppingListReader` to expand data in bulk.

* Adjusted `QuoteToShoppingListConverter` to save shopping list items in bulk.

Additional information: Reduced shopping list loading time by 20%.

To install this improvement, update the following module:

| MODULE | VERSION |
| - | - |
| spryker/shopping-list | 4.5.0 |


## spryker/cart    

Improvement: Fixed the N+1 query problem by adjusting Operation to add the current operation type to the incoming `CartChangeTransfer` instead of creating a new `CartChangeTransfer` for each item.

{% info_block infoBox "N+1 query problem" %}

The N+1 query problem appears when you need to make N+1 SQL queries where N is the number of items that are queried.

{% endinfo_block %}


To install this improvement, update the following module:

| MODULE | VERSION |
| - | - |
| spryker/cart | 7.9.1 |



## spryker/shopping-list and spryker/cart

Improvement: Fixed the N+1 query problem.

Additional information: Reduced the time of creating a shopping list from cart by 33%.

To install this improvement, update the following modules:


| MODULE | VERSION |
| - | - |
| spryker/shopping-list | 4.5.0 |
| spryker/cart | 7.9.1 |
