---
title: Coding Best Practices
description: In this article we outline a few common PHP coding problems and the recommended solutions.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/coding-best-practices
originalArticleId: 5df9f9bf-c445-4d56-af59-a95757696009
redirect_from:
  - /2021080/docs/coding-best-practices
  - /2021080/docs/en/coding-best-practices
  - /docs/coding-best-practices
  - /docs/en/coding-best-practices
  - /v6/docs/oding-best-practices
  - /v6/docs/en/oding-best-practices  
  - /v5/docs/oding-best-practices
  - /v5/docs/en/oding-best-practices  
  - /v4/docs/oding-best-practices
  - /v4/docs/en/oding-best-practices  
  - /v3/docs/oding-best-practices
  - /v3/docs/en/oding-best-practices  
  - /v2/docs/oding-best-practices
  - /v2/docs/en/oding-best-practices  
  - /v1/docs/oding-best-practices
  - /v1/docs/en/oding-best-practices
---

In this article we outline a few common PHP coding problems and the recommended solutions.

## Merging Arrays

When merging arrays, one usually uses `array_merge($defaults, $options)`. However, when working with associative arrays (keys are all string identifiers), it is recommended to use the `+` operator. This is not only a lot faster, it also yields more correct results with edge cases. Beware of the switched order in this case: `$mergedOptions = $options + $defaults;`

## Operations Per Line

To facilitate readability and debugging, it is recommended to use only one operation per line.

## Method Size

Long methods tend to have too many responsibilities, and are usually harder to understand and maintain than smaller ones. Therefore it is advisable to stick to the "single responsibility" principle, when a method is just a few lines long.



<!-- Last review date: Nov. 22nd, 2017--  by Mark Scherer -->
