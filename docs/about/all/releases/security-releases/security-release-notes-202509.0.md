---
title: Security release notes 202509.0
description: Security updates released for version 202509.0
last_updated: Sep 29, 2025
template: concept-topic-template
redirect_from:
  - /docs/about/all/releases/security-release-notes-202509.0.html
publish_date: "2025-09-29"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).


## Potential Authorisation Bypass on Certain Endpoints

It was possible for an attacker to bypass authorisation controls that are in place, by adding multiple '/' characters to the beginning of the path of certain endpoints. Even if this is not considered an important vulnerability, it can potentially be used in combination with other vulnerabilities and under certain circumstances might lead to sensitive information being leaked.

### Fix the vulnerability

Add or adjust the $config[CustomerConstants::CUSTOMER_SECURED_PATTERN] line within the `config/Shared/config_default.php` file:

```bash
$config[CustomerConstants::CUSTOMER_SECURED_PATTERN] = '(^/login_check$|^[/]*([A-Z]{2})?[/]*(en|de)?[/]*customer($|/)|^[/]*([A-Z]{2})?[/]*(en|de)?[/]*wishlist($|/)|^[/]*([A-Z]{2})?[/]*(en|de)?[/]*shopping-list($|/)|^[/]*([A-Z]{2})?[/]*(en|de)?[/]*quote-request($|/)|^(/[A-Z]{2})?(/en|/de)?/comment($|/)|^(/[A-Z]{2})?(/en|/de)?/company(?!/register)($|/)|^[/]*([A-Z]{2})?[/]*(en|de)?[/]*multi-cart($|/)|^(/[A-Z]{2})?(/en|/de)?/shared-cart($|/)|^(/en|/de)?/cart(?!/add)($|/)|^(/en|/de)?/checkout($|/))|^(/en|/de)?/cart-reorder($|/)|^(/en|/de)?/order-amendment($|/)';
```
