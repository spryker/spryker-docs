---
title: Release notes for spryker-php 20260113
description: This document describes the changes that have been recently released.
last_updated: January 13, 2026
template: concept-topic-template
publish_date: "2026-01-13"
---

This document describes the changes that have been recently released.
For additional support with this content, contact our support.
If you found a new security vulnerability, contact us at **security@spryker.com**.

---

## Release notes for spryker-php 20260113

**Improvements**:


- Bump NewRelic to the latest
- Bump minors for PHP 8.4
- Updated PHP versions to the latest patch releases
- Updated NewRelic to version 12.1.0.26 (from 11.10.0.24) to fix security vulnerabilities
- Updated Tideways to version 5.30.0 (from 5.22.2)
- Updated Composer to version 2.8.12 (from 2.8.10)
- Updated Blackfire to version 1.92.48 (from 1.92.28)
- Alpine 3.22: tightened build dependencies (openssl/zlib/scdoc), included an APK tools build v3.0.0_rc7 from source for compatibility, and cleaned temporary artifacts.

### Security fixes by image


- [CVE-2025-47907](https://github.com/advisories/GHSA-j5pm-7495-qmr3): Cancelling a query (for example by cancelling the context passed to one of the query methods) during a call to the Scan method of the returned Rows can result in unexpected results if other queries are being made in parallel. This can result in a race condition that may overwrite the expected results with those of another query, causing the call to Scan to return either unexpected results from the other query or an error.

- [CVE-2025-47906](https://github.com/advisories/GHSA-gwrf-jf3h-w649): If the PATH environment variable contains paths which are executables (rather than just directories), passing certain strings to LookPath ("", ".", and ".."), can result in the binaries listed in the PATH being unexpectedly returned.
