---
title: Release notes for spryker-php 20261119
description: This document describes the changes that have been recently released.
last_updated: November 19, 2026
template: concept-topic-template
publish_date: "2026-11-19"
---

This document describes the changes that have been recently released.
For additional support with this content, contact our support.
If you found a new security vulnerability, contact us at **security@spryker.com**.

---

## Release notes for spryker-php 20261119

**Improvements**:


- Updated PHP to 8.2.36, 8.3.37, 8.4.28, and 8.5.13 in the Alpine 3.23, Alpine 3.24, and Debian bookworm images.

### Security fixes \n
This update includes the PHP security releases of November 19, 2026, which fix the following vulnerabilities:

| CVE | Vulnerability | Affected versions|
|:----|:--------------|:---------|
| CVE-2026-129289 | PHP-FPM request smuggling through an unread HTTP request body | 8.2–8.5 |
| CVE-2026-129291 | PHP-FPM epoll use-after-free can lead to local privilege escalation | 8.2–8.5 |
| CVE-2026-129292 | PHP-FPM status endpoint XSS via unescaped user and script fields | 8.2–8.5 |
| CVE-2026-129496 | Timezone cache use-after-free can lead to remote code execution | 8.2–8.5 |
| CVE-2026-126714 | Partially overwritten session files can lead to remote code execution | 8.2–8.5 |
| CVE-2026-115560 | Session serializer mismatch can lead to remote code execution | 8.2–8.5 |
| CVE-2026-129506 | SOAP use-after-free when processing DTD entity references | 8.2–8.5 |
| CVE-2026-15353 | SOAP information disclosure through malformed array dimensions | 8.2–8.5 |
| CVE-2026-128090 | PHAR OpenSSL signature bypass via algorithm downgrade | 8.2–8.5 |
| CVE-2026-129538 | PHP-CGI out-of-bounds read and write during PATH_INFO correction | 8.2–8.5 |
| CVE-2026-128064 | Mixed-case HTTPS and FTPS URLs can expose data in plaintext | 8.2–8.5 |
| CVE-2026-127960 | Denial of service through folded HTTP response headers | 8.2–8.5 |
| CVE-2026-129481 | Use-after-free after interrupted session shutdown | 8.3–8.5 |
| CVE-2026-129501 | Double free during DOM XML serialization | 8.4–8.5 |
| CVE-2026-129474 | Use-after-free in magic method backtraces can lead to remote code execution | 8.5 |
| CVE-2026-129182 | Use-after-free via repopulation of last_fatal_error_backtrace global after shutdown | 8.5 |
| CVE-2026-129438 | Incorrect RFC 3986 URI serialization for oversized input | 8.5 |
| CVE-2026-48841 | Vulnerability in the bundled uriparser library, updated to 1.0.3 | 8.5 |

For details, see the [PHP 8 changelog](https://www.php.net/ChangeLog-8.php).
