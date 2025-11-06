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

## Release notes for spryker-php 20251106.0

### Improvements

- Added optional support for the PHP excimer extension
- Marked Alpine 3.19 as deprecated (EOL)
- Introduced OTEL support for Alpine and Debian.  
- Introduced support for Alpine 3.22.  
- Introduced support for Alpine 3.21.  
- Deprecated support for Alpine 3.18.  
- Updated PHP versions to the latest.  
- Updated NewRelic to the latest version.  
- Introduced support for PHP 8.4.  
- Updated Tideways version to 5.22.2.  

## Security fixes by image

This section details security vulnerabilities that have been addressed in specific Docker images.

### spryker/php:8.4-alpine3.22

- **CVE-2025-10148**: curl's websocket code did not update the 32 bit mask pattern for each new outgoing frame as the specification says. Instead it used a fixed mask that persisted and was used throughout the entire connection.

- **CVE-2025-49795**: A NULL pointer dereference vulnerability was found in libxml2 when processing XPath XML expressions. This flaw allows an attacker to craft a malicious XML input to libxml2, leading to a denial of service.

- **CVE-2025-9231**: A timing side-channel which could potentially allow remote recovery of the private key exists in the SM2 algorithm implementation on 64 bit ARM platforms.

- **CVE-2025-47907**: Cancelling a query (for example by cancelling the context passed to one of the query methods) during a call to the Scan method of the returned Rows can result in unexpected results if other queries are being made in parallel

- **CVE-2025-49794**: A use-after-free vulnerability was found in libxml2. This issue occurs when parsing XPath elements under certain circumstances when the XML schematron has the <sch:name path="..."/> schema elements. This flaw allows a malicious actor to craft a malicious XML document used as input for libxml, resulting in the program's crash using libxml or other possible undefined behaviors.

- **CVE-2025-59375**: libexpat in Expat before 2.7.2 allows attackers to trigger large dynamic memory allocations via a small document that is submitted for parsing.

- **CVE-2025-6021**: A flaw was found in libxml2's xmlBuildQName function, where integer overflows in buffer size calculations can lead to a stack-based buffer overflow. This issue can result in memory corruption or a denial of service when processing crafted input.

- **CVE-2025-6170**: A flaw was found in the interactive shell of the xmllint command-line tool, used for parsing XML files. When a user inputs an overly long command, the program does not check the input size properly, which can cause it to crash. This issue might allow attackers to run harmful code in rare configurations without modern protections.

- **CVE-2025-49796**: A vulnerability was found in libxml2. Processing certain sch:name elements from the input XML file can trigger a memory corruption issue. This flaw allows an attacker to craft a malicious XML input file that can lead libxml to crash, resulting in a denial of service or other possible undefined behavior due to sensitive data being corrupted in memory.

- **CVE-2025-58050**: Vulnerability of improper access permission in the HDC module. Impact: Successful exploitation of this vulnerability may affect service confidentiality.

- **CVE-2025-9232**: An application using the OpenSSL HTTP client API functions may trigger an out-of-bounds read if the 'no_proxy' environment variable is set and the host portion of the authority component of the HTTP URL is an IPv6 address.

- **CVE-2025-9086**: A cookie is set using the secure keyword for target . The bug either causes a crash or it potentially makes the comparison come to the wrong conclusion and lets the clear-text site override the contents of the secure cookie, contrary to expectations and depending on the memory contents immediately following the single-byte allocation that holds the path.

- **CVE-2025-9230**: An application trying to decrypt CMS messages encrypted using password based encryption can trigger an out-of-bounds read and write.


### spryker/php:8.3-alpine3.22

- **CVE-2025-58050**: Vulnerability of improper access permission in the HDC module. Impact: Successful exploitation of this vulnerability may affect service confidentiality.

- **CVE-2025-47907**: Cancelling a query (for example by cancelling the context passed to one of the query methods) during a call to the Scan method of the returned Rows can result in unexpected results if other queries are being made in parallel

- **CVE-2025-49796**: A vulnerability was found in libxml2. Processing certain sch:name elements from the input XML file can trigger a memory corruption issue. This flaw allows an attacker to craft a malicious XML input file that can lead libxml to crash, resulting in a denial of service or other possible undefined behavior due to sensitive data being corrupted in memory.

- **CVE-2025-9231**: A timing side-channel which could potentially allow remote recovery of the private key exists in the SM2 algorithm implementation on 64 bit ARM platforms.

- **CVE-2025-6170**: A flaw was found in the interactive shell of the xmllint command-line tool, used for parsing XML files. When a user inputs an overly long command, the program does not check the input size properly, which can cause it to crash. This issue might allow attackers to run harmful code in rare configurations without modern protections.

- **CVE-2025-59375**: libexpat in Expat before 2.7.2 allows attackers to trigger large dynamic memory allocations via a small document that is submitted for parsing.

- **CVE-2025-10148**: curl's websocket code did not update the 32 bit mask pattern for each new outgoing frame as the specification says. Instead it used a fixed mask that persisted and was used throughout the entire connection.

- **CVE-2025-49795**: A NULL pointer dereference vulnerability was found in libxml2 when processing XPath XML expressions. This flaw allows an attacker to craft a malicious XML input to libxml2, leading to a denial of service.

- **CVE-2025-9232**: An application using the OpenSSL HTTP client API functions may trigger an out-of-bounds read if the 'no_proxy' environment variable is set and the host portion of the authority component of the HTTP URL is an IPv6 address.

- **CVE-2025-9230**: An application trying to decrypt CMS messages encrypted using password based encryption can trigger an out-of-bounds read and write.

- **CVE-2025-9086**: A cookie is set using the secure keyword for target . The bug either causes a crash or it potentially makes the comparison come to the wrong conclusion and lets the clear-text site override the contents of the secure cookie, contrary to expectations and depending on the memory contents immediately following the single-byte allocation that holds the path.


- **CVE-2025-6021**: A flaw was found in libxml2's xmlBuildQName function, where integer overflows in buffer size calculations can lead to a stack-based buffer overflow. This issue can result in memory corruption or a denial of service when processing crafted input.

- **CVE-2025-49794**: A use-after-free vulnerability was found in libxml2. This issue occurs when parsing XPath elements under certain circumstances when the XML schematron has the <sch:name path="..."/> schema elements. This flaw allows a malicious actor to craft a malicious XML document used as input for libxml, resulting in the program's crash using libxml or other possible undefined behaviors.



### spryker/php:8.2-alpine3.22

- **CVE-2025-9086**: A cookie is set using the secure keyword for target . The bug either causes a crash or it potentially makes the comparison come to the wrong conclusion and lets the clear-text site override the contents of the secure cookie, contrary to expectations and depending on the memory contents immediately following the single-byte allocation that holds the path.

- **CVE-2025-9230**: An application trying to decrypt CMS messages encrypted using password based encryption can trigger an out-of-bounds read and write.

- **CVE-2025-9231**: A timing side-channel which could potentially allow remote recovery of the private key exists in the SM2 algorithm implementation on 64 bit ARM platforms.

- **CVE-2025-10148**: curl's websocket code did not update the 32 bit mask pattern for each new outgoing frame as the specification says. Instead it used a fixed mask that persisted and was used throughout the entire connection.

- **CVE-2025-59375**: libexpat in Expat before 2.7.2 allows attackers to trigger large dynamic memory allocations via a small document that is submitted for parsing.

- **CVE-2025-9232**: An application using the OpenSSL HTTP client API functions may trigger an out-of-bounds read if the 'no_proxy' environment variable is set and the host portion of the authority component of the HTTP URL is an IPv6 address.

- **CVE-2025-58050**: Vulnerability of improper access permission in the HDC module. Impact: Successful exploitation of this vulnerability may affect service confidentiality.

- **CVE-2025-6170**: A flaw was found in the interactive shell of the xmllint command-line tool, used for parsing XML files. When a user inputs an overly long command, the program does not check the input size properly, which can cause it to crash. This issue might allow attackers to run harmful code in rare configurations without modern protections.

- **CVE-2025-49796**: A vulnerability was found in libxml2. Processing certain sch:name elements from the input XML file can trigger a memory corruption issue. This flaw allows an attacker to craft a malicious XML input file that can lead libxml to crash, resulting in a denial of service or other possible undefined behavior due to sensitive data being corrupted in memory.

- **CVE-2025-6021**: A flaw was found in libxml2's xmlBuildQName function, where integer overflows in buffer size calculations can lead to a stack-based buffer overflow. This issue can result in memory corruption or a denial of service when processing crafted input.

- **CVE-2025-47907**: Cancelling a query (for example by cancelling the context passed to one of the query methods) during a call to the Scan method of the returned Rows can result in unexpected results if other queries are being made in parallel

- **CVE-2025-49795**: A NULL pointer dereference vulnerability was found in libxml2 when processing XPath XML expressions. This flaw allows an attacker to craft a malicious XML input to libxml2, leading to a denial of service.


### spryker/php:8.3-alpine3.20

- **CVE-2025-9232**: An application using the OpenSSL HTTP client API functions may trigger an out-of-bounds read if the 'no_proxy' environment variable is set and the host portion of the authority component of the HTTP URL is an IPv6 address.

- **CVE-2025-59375**: libexpat in Expat before 2.7.2 allows attackers to trigger large dynamic memory allocations via a small document that is submitted for parsing.

- **CVE-2025-5025**: libcurl supports pinning of the server certificate public key for HTTPS transfers.

- **CVE-2025-9231**: A timing side-channel which could potentially allow remote recovery of the private key exists in the SM2 algorithm implementation on 64 bit ARM platforms.

- **CVE-2025-4947**: libcurl accidentally skips the certificate verification for QUIC connections when connecting to a host specified as an IP address in the URL. Therefore, it does not detect impostors or man-in-the-middle attacks.

- **CVE-2025-9086**: A cookie is set using the secure keyword for target . The bug either causes a crash or it potentially makes the comparison come to the wrong conclusion and lets the clear-text site override the contents of the secure cookie, contrary to expectations and depending on the memory contents immediately following the single-byte allocation that holds the path.

- **CVE-2025-9230**: An application trying to decrypt CMS messages encrypted using password based encryption can trigger an out-of-bounds read and write.

- **CVE-2025-5399**: Due to a mistake in libcurl's WebSocket code, a malicious server can send a particularly crafted packet which makes libcurl get trapped in an endless
busy-loop.

- **CVE-2025-10148**: curl's websocket code did not update the 32 bit mask pattern for each new outgoing frame as the specification says. Instead it used a fixed mask that persisted and was used throughout the entire connection.

- **CVE-2025-47907**: Cancelling a query (for example by cancelling the context passed to one of the query methods) during a call to the Scan method of the returned Rows can result in unexpected results if other queries are being made in parallel


### spryker/php:8.2-alpine3.20

- **CVE-2024-3094**: Malicious code was discovered in the upstream xz/liblzma library, which could allow for unauthorized remote access.

- **CVE-2025-47907**: Cancelling a query (for example by cancelling the context passed to one of the query methods) during a call to the Scan method of the returned Rows can result in unexpected results if other queries are being made in parallel

- **CVE-2025-59375**: libexpat in Expat before 2.7.2 allows attackers to trigger large dynamic memory allocations via a small document that is submitted for parsing.

- **CVE-2025-10148**: curl's websocket code did not update the 32 bit mask pattern for each new outgoing frame as the specification says. Instead it used a fixed mask that persisted and was used throughout the entire connection.

- **CVE-2025-5025**: libcurl supports pinning of the server certificate public key for HTTPS transfers.

- **CVE-2025-9232**: An application using the OpenSSL HTTP client API functions may trigger an out-of-bounds read if the 'no_proxy' environment variable is set and the host portion of the authority component of the HTTP URL is an IPv6 address.

- **CVE-2025-9086**: A cookie is set using the secure keyword for target . The bug either causes a crash or it potentially makes the comparison come to the wrong conclusion and lets the clear-text site override the contents of the secure cookie, contrary to expectations and depending on the memory contents immediately following the single-byte allocation that holds the path.


### spryker/php:8.1-alpine3.20

- **CVE-2025-47907**: Cancelling a query (for example by cancelling the context passed to one of the query methods) during a call to the Scan method of the returned Rows can result in unexpected results if other queries are being made in parallel

- **CVE-2025-5025**: libcurl supports pinning of the server certificate public key for HTTPS transfers.

- **CVE-2025-10148**: curl's websocket code did not update the 32 bit mask pattern for each new outgoing frame as the specification says. Instead it used a fixed mask that persisted and was used throughout the entire connection.

- **CVE-2025-9232**: An application using the OpenSSL HTTP client API functions may trigger an out-of-bounds read if the 'no_proxy' environment variable is set and the host portion of the authority component of the HTTP URL is an IPv6 address.

- **CVE-2025-4947**: libcurl accidentally skips the certificate verification for QUIC connections when connecting to a host specified as an IP address in the URL. Therefore, it does not detect impostors or man-in-the-middle attacks.

- **CVE-2025-59375**: libexpat in Expat before 2.7.2 allows attackers to trigger large dynamic memory allocations via a small document that is submitted for parsing.

- **CVE-2025-5399**: Due to a mistake in libcurl's WebSocket code, a malicious server can send a particularly crafted packet which makes libcurl get trapped in an endless
busy-loop.

- **CVE-2025-9086**: A cookie is set using the secure keyword for target . The bug either causes a crash or it potentially makes the comparison come to the wrong conclusion and lets the clear-text site override the contents of the secure cookie, contrary to expectations and depending on the memory contents immediately following the single-byte allocation that holds the path.

- **CVE-2025-9230**: An application trying to decrypt CMS messages encrypted using password based encryption can trigger an out-of-bounds read and write.

- **CVE-2025-9231**: A timing side-channel which could potentially allow remote recovery of the private key exists in the SM2 algorithm implementation on 64 bit ARM platforms.



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
