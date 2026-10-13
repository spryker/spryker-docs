---
title: Security release notes 202610.0
description: Security updates released for version 202610.0
last_updated: Oct 13, 2026
template: concept-topic-template
publish_date: "2026-10-13"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Stripe payment page can be accessed by unauthenticated users

Due to missing access controls, the Stripe payment page could be accessed by unauthenticated users. This could lead to the exposure of sensitive information, including customers' names, phone numbers, and addresses. Exploitation requires knowledge of the randomly generated order reference.

### Affected modules

- `spryker-shop/payment-page`: < 1.9.0
- `spryker-eco/stripe`: < 1.1.0

### Fix the vulnerability