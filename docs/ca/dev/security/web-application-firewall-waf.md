---
title: Web Application Firewall (WAF)
description: WAF protects your SCCOS applications from web exploits and bots.
template: concept-topic-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/security/web-application-firewall-waf.html
---

AWS WAF is a web application firewall that helps protect your web applications or APIs against common web exploits, SQL injections, cross-site scripting, or bots that may affect availability, compromise security, or consume excessive resources.

WAF protects your Spryker applications using a set of pre-defined rules. When a web request triggers a rule, WAF blocks it. Occasionally, you may be getting false positives. Usually, in a web application, a false positive results into error 403. If you get the error, troubleshoot it by following [Tutorial — Troubleshooting 403 error](/docs/ca/dev/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-403-error.html).

AWS WAF is shipped with all environments, production and non-production.

For more information on WAF, see [AWS WAF](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html).
