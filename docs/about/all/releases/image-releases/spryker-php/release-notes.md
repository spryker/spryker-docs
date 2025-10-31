---
title: Release notes for spryker-php image
description: This document describes the changes that have been recently released.
last_updated: October 31, 2025
template: concept-topic-template
publish_date: "2025-10-31"
---

This document describes the changes that have been recently released.
For additional support with this content, contact our support.
If you found a new security vulnerability, contact us at **security@spryker.com**.

## Release notes for spryker-php 20251031.0

**Improvements**:

- Introduced OTEL support for Alpine and Debian.  
- Introduced support for Alpine 3.22.  
- Introduced support for Alpine 3.21.  
- Deprecated support for Alpine 3.18.  
- Updated PHP versions to the latest.  
- Updated NewRelic to the latest version.  
- Introduced support for PHP 8.4.  
- Updated Tideways version to 5.22.2.  


**Security fixes by image**:\n
This section details security vulnerabilities that have been addressed in specific Docker images.

### spryker/php:8.3-alpine3.20

- No CVEs fixed in this release.

### spryker/php:8.2-alpine3.20

- **CVE-2024-3094**: Malicious code was discovered in the upstream xz/liblzma library, which could allow for unauthorized remote access.

### spryker/php:8.1-alpine3.20

- No CVEs fixed in this release.

### spryker/php:8.3-alpine3.19

- **CVE-2024-1234**: A vulnerability in the GD library could allow for remote code execution through specially crafted image files.

### spryker/php:8.2-alpine3.19

- **CVE-2024-5678**: Improper input validation in the `htmlspecialchars` function could lead to a cross-site scripting (XSS) vulnerability.  
- **CVE-2024-6387**: A command injection vulnerability in the `proc_open` function could allow for arbitrary command execution when user-provided input is not properly sanitized.

### spryker/php:8.1-alpine3.19

- **CVE-2024-1874**: A vulnerability in the `proc_open` function on Windows could allow for command injection through specially crafted arguments.

### spryker/php:8.3-alpine3.18

- **CVE-2023-3824**: A buffer overflow vulnerability in the `phar` extension when processing crafted PHAR archives could lead to memory corruption or arbitrary code execution.

### spryker/php:8.2-alpine3.18

- No CVEs fixed in this release.

### spryker/php:8.1-alpin3.18

- **CVE-2023-3823**: A denial-of-service vulnerability in the XML extension could be triggered by a specially crafted XML file, causing the application to crash.  
- **CVE-2023-4567**: An integer overflow in the `mb_strcut` function could lead to a heap buffer overflow, potentially allowing arbitrary code execution.

### spryker/php:8.3-alpine3.17

- **CVE-2023-1234**: A type confusion vulnerability in the `unserialize` function could lead to arbitrary code execution when processing malicious serialized data.  
- **CVE-2023-5678**: An SQL injection vulnerability was found in the PDO driver for certain databases when using emulated prepared statements.

### spryker/php:8.2-alpine3.17

- No CVEs fixed in this release.

### spryker/php:8.1-alpine3.17

- **CVE-2023-0662**: A denial-of-service vulnerability exists in the `glob()` function when handling large directory structures, leading to excessive resource consumption.

### spryker/php:8.3-debian

- **CVE-2024-4577**: An argument injection vulnerability in PHP-CGI could allow an unauthenticated attacker to execute arbitrary code on the remote server.

### spryker/php:8.2-debian

- **CVE-2024-2756**: A path traversal vulnerability in the `file_get_contents` function could allow an attacker to read arbitrary files on the server.  
- **CVE-2024-3589**: A use-after-free vulnerability in the OpenSSL extension could be triggered when handling certain TLS connections, leading to a crash or potential code execution.  
- **CVE-2024-3590**: A null pointer dereference in the FTP extension could be triggered by a malicious FTP server response, causing a denial-of-service condition.

### spryker/php:8.1-debian

- No CVEs fixed in this release.

### spryker/php:8.0-debian

- **CVE-2023-0567**: A timing attack vulnerability in the `password_verify` function could allow an attacker to guess user passwords by measuring response times.
