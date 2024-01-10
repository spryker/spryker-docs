---
title: Coding Best Practices
description: In this article we outline a few common PHP coding problems and the recommended solutions.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/coding-best-practices
originalArticleId: 5df9f9bf-c445-4d56-af59-a95757696009
redirect_from:
  - /docs/scos/dev/best-practices/coding-best-practices.html
---

This document outlines a few common PHP coding problems and the recommended solutions.

## Merging arrays

When merging arrays, one usually uses `array_merge($defaults, $options)`. However, when working with associative arrays (keys are all string identifiers), it is recommended to use the `+` operator. This is not only a lot faster, it also yields more correct results with edge cases. Beware of the switched order in this case: `$mergedOptions = $options + $defaults;`

## Operations per line

To facilitate readability and debugging, it is recommended to use only one operation per line.

## Method size

Long methods tend to have too many responsibilities, and are usually harder to understand and maintain than smaller ones. Therefore it is advisable to stick to the "single responsibility" principle, when a method is just a few lines long.
