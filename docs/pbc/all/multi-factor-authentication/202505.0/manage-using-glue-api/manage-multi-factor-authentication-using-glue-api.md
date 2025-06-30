---
title: Manage Multi-Factor Authentication using Glue API
description: Learn how to create and implement your own Multi-Factor Authentication method in Spryker.
template: howto-guide-template
last_updated: Apr 7, 2025
related:
  - title: Multi-Factor Authentication Feature overview
    link: docs/pbc/all/multi-factor-authentication/page.version/multi-factor-authentication.html
  - title: Install the Multi-Factor Authentication feature
    link: docs/pbc/all/multi-factor-authentication/page.version/install-multi-factor-authentication-feature.html
  - title: Install Customer Email Multi-Factor Authentication method
    link: docs/pbc/all/multi-factor-authentication/page.version/install-customer-email-multi-factor-authentication-method.html
  - title: Create Multi-Factor Authentication methods
    link: docs/pbc/all/multi-factor-authentication/page.version/create-multi-factor-authentication-methods.html
---

This section explains how to activate, deactivate, and use Multi-Factor Authentication (MFA) when sending requests to protected resources using Glue API.

To learn more about MFA methods, see [Multi-Factor Authentication feature overview](/docs/pbc/all/multi-factor-authentication/{{page.version}}/multi-factor-authentication.html).


The usual flow of using MFA is as follows:

1. [Retrieve MFA methods and check the status of your user]()
2. [Activate MFA for your user]
3. [Authenticate through MFA and send requests to protected resources]