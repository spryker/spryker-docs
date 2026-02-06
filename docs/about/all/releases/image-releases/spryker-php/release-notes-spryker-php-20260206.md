---
title: Release notes for spryker-php image
description: This document describes the changes that have been recently released.
last_updated: February 04, 2026
template: concept-topic-template
publish_date: "2026-02-04"
---

This document describes the changes that have been recently released.
For additional support with this content, contact our support.
If you found a new security vulnerability, contact us at **security@spryker.com**.

## Release notes for spryker-php 20260206.0

### Improvements

- Added support for Alpine 3.23
- Changed the default base image to Alpine 3.20
- Upgraded Composer to 2.9.3
- Upgraded Tideways to 5.32.0
- Upgraded NewRelic to the latest

## Security fixes by image

This section details security vulnerabilities that have been addressed in specific Docker images.

### spryker/php:8.4-alpine3.22

- **CVE-2025-15468**: If an application using the SSL_CIPHER_find() function in a QUIC protocol client or server receives an unknown cipher suite from the peer, a NULL dereference occurs.

- **CVE-2025-69421**: Processing a malformed PKCS#12 file can trigger a NULL pointer dereference in the PKCS12_item_decrypt_d2i_ex() function.

- **CVE-2026-22796**: A type confusion vulnerability exists in the signature verification of signed PKCS#7 data where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing malformed PKCS#7 data.

- **CVE-2026-15467**: Parsing CMS AuthEnvelopedData message with maliciously crafted AEAD parameters can trigger a stack buffer overflow.

- **CVE-2025-69420**: A type confusion vulnerability exists in the TimeStamp Response verification code where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing a malformed TimeStamp Response file.

- **CVE-2025-69418**: When using the low-level OCB API directly with AES-NI or other hardware-accelerated code paths, inputs whose length is not a multiple of 16 bytes can leave the final partial block unencrypted and unauthenticated.

- **CVE-2026-22801**: LIBPNG is a reference library for use in applications that read, create, and manipulate PNG (Portable Network Graphics) raster image files. From 1.6.26 to 1.6.53, there is an integer truncation in the libpng simplified write API functions png_write_image_16bit and png_write_image_8bit causes heap buffer over-read when the caller provides a negative row stride (for bottom-up image layouts) or a stride exceeding 65535 bytes. The bug was introduced in libpng 1.6.26 (October 2016) by casts added to silence compiler warnings on 16-bit systems. This vulnerability is fixed in 1.6.54.

- **CVE-2026-22695**: A flaw was found in Podman. In a Containerfile or Podman, data written to RUN --mount=type=bind mounts during the podman build is not discarded. This issue can lead to files created within the container appearing in the temporary build context directory on the host, leaving the created files accessible.

- **CVE-2025-66199**: A TLS 1.3 connection using certificate compression can be forced to allocate a large buffer before decompression without checking against the configured certificate size limit.

- **CVE-2025-68160**: Writing large, newline-free data into a BIO chain using the line-buffering filter where the next BIO performs short writes can trigger a heap-based out-of-bounds write.

- **CVE-2025-69419**: Calling PKCS12_get_friendlyname() function on a maliciously crafted PKCS#12 file with a BMPString (UTF-16BE) friendly name containing non-ASCII BMP code point can trigger a one byte write before the allocated buffer.

- **CVE-2026-22795**: An invalid or NULL pointer dereference can happen in an application processing a malformed PKCS#12 file.

- **CVE-2025-61730**: During the TLS 1.3 handshake if multiple messages are sent in records that span encryption level boundaries (for instance the Client Hello and Encrypted Extensions messages), the subsequent messages may be processed before the encryption level changes. This can cause some minor information disclosure if a network-local attacker can inject messages during the handshake.

- **CVE-2025-11187**: PBMAC1 parameters in PKCS#12 files are missing validation which can trigger a stack-based buffer overflow, invalid pointer or NULL pointer dereference during MAC verification.

- **CVE-2025-15469**: The 'openssl dgst' command-line tool silently truncates input data to 16MB when using one-shot signing algorithms and reports success instead of an error.

- **CVE-2026-24515**: In libexpat before 2.7.4, XML_ExternalEntityParserCreate does not copy unknown encoding handler user data.

### spryker/php:8.3-alpine3.22

- **CVE-2025-15468**: If an application using the SSL_CIPHER_find() function in a QUIC protocol client or server receives an unknown cipher suite from the peer, a NULL dereference occurs.

- **CVE-2026-24515**: In libexpat before 2.7.4, XML_ExternalEntityParserCreate does not copy unknown encoding handler user data.

- **CVE-2025-69421**: Processing a malformed PKCS#12 file can trigger a NULL pointer dereference in the PKCS12_item_decrypt_d2i_ex() function.

- **CVE-2026-22796**: A type confusion vulnerability exists in the signature verification of signed PKCS#7 data where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing malformed PKCS#7 data.

- **CVE-2026-15467**: Parsing CMS AuthEnvelopedData message with maliciously crafted AEAD parameters can trigger a stack buffer overflow.

- **CVE-2025-69420**: A type confusion vulnerability exists in the TimeStamp Response verification code where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing a malformed TimeStamp Response file.

- **CVE-2025-69418**: When using the low-level OCB API directly with AES-NI or other hardware-accelerated code paths, inputs whose length is not a multiple of 16 bytes can leave the final partial block unencrypted and unauthenticated.

- **CVE-2026-22801**: LIBPNG is a reference library for use in applications that read, create, and manipulate PNG (Portable Network Graphics) raster image files. From 1.6.26 to 1.6.53, there is an integer truncation in the libpng simplified write API functions png_write_image_16bit and png_write_image_8bit causes heap buffer over-read when the caller provides a negative row stride (for bottom-up image layouts) or a stride exceeding 65535 bytes. The bug was introduced in libpng 1.6.26 (October 2016) by casts added to silence compiler warnings on 16-bit systems. This vulnerability is fixed in 1.6.54.

- **CVE-2026-22695**: A flaw was found in Podman. In a Containerfile or Podman, data written to RUN --mount=type=bind mounts during the podman build is not discarded. This issue can lead to files created within the container appearing in the temporary build context directory on the host, leaving the created files accessible.

- **CVE-2025-66199**: A TLS 1.3 connection using certificate compression can be forced to allocate a large buffer before decompression without checking against the configured certificate size limit.

- **CVE-2025-68160**: Writing large, newline-free data into a BIO chain using the line-buffering filter where the next BIO performs short writes can trigger a heap-based out-of-bounds write.

- **CVE-2025-69419**: Calling PKCS12_get_friendlyname() function on a maliciously crafted PKCS#12 file with a BMPString (UTF-16BE) friendly name containing non-ASCII BMP code point can trigger a one byte write before the allocated buffer.

- **CVE-2026-22795**: An invalid or NULL pointer dereference can happen in an application processing a malformed PKCS#12 file.

- **CVE-2025-61730**: During the TLS 1.3 handshake if multiple messages are sent in records that span encryption level boundaries (for instance the Client Hello and Encrypted Extensions messages), the subsequent messages may be processed before the encryption level changes. This can cause some minor information disclosure if a network-local attacker can inject messages during the handshake.

- **CVE-2025-11187**: PBMAC1 parameters in PKCS#12 files are missing validation which can trigger a stack-based buffer overflow, invalid pointer or NULL pointer dereference during MAC verification.

- **CVE-2025-15469**: The 'openssl dgst' command-line tool silently truncates input data to 16MB when using one-shot signing algorithms and reports success instead of an error.

### spryker/php:8.4-alpine3.21

- **CVE-2025-15468**: If an application using the SSL_CIPHER_find() function in a QUIC protocol client or server receives an unknown cipher suite from the peer, a NULL dereference occurs.

- **CVE-2025-69421**: Processing a malformed PKCS#12 file can trigger a NULL pointer dereference in the PKCS12_item_decrypt_d2i_ex() function.

- **CVE-2026-22796**: A type confusion vulnerability exists in the signature verification of signed PKCS#7 data where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing malformed PKCS#7 data.

- **CVE-2026-15467**: Parsing CMS AuthEnvelopedData message with maliciously crafted AEAD parameters can trigger a stack buffer overflow.

- **CVE-2025-69420**: A type confusion vulnerability exists in the TimeStamp Response verification code where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing a malformed TimeStamp Response file.

- **CVE-2025-69418**: When using the low-level OCB API directly with AES-NI or other hardware-accelerated code paths, inputs whose length is not a multiple of 16 bytes can leave the final partial block unencrypted and unauthenticated.

- **CVE-2026-22801**: LIBPNG is a reference library for use in applications that read, create, and manipulate PNG (Portable Network Graphics) raster image files. From 1.6.26 to 1.6.53, there is an integer truncation in the libpng simplified write API functions png_write_image_16bit and png_write_image_8bit causes heap buffer over-read when the caller provides a negative row stride (for bottom-up image layouts) or a stride exceeding 65535 bytes. The bug was introduced in libpng 1.6.26 (October 2016) by casts added to silence compiler warnings on 16-bit systems. This vulnerability is fixed in 1.6.54.

- **CVE-2026-22695**: A flaw was found in Podman. In a Containerfile or Podman, data written to RUN --mount=type=bind mounts during the podman build is not discarded. This issue can lead to files created within the container appearing in the temporary build context directory on the host, leaving the created files accessible.

- **CVE-2025-66199**: A TLS 1.3 connection using certificate compression can be forced to allocate a large buffer before decompression without checking against the configured certificate size limit.

- **CVE-2025-14178**: A heap buffer overflow occurs in array_merge() when the total element count of packed arrays exceeds 32-bit limits or HT_MAX_SIZE, due to an integer overflow in the precomputation of element counts using zend_hash_num_elements(). This may lead to memory corruption or crashes and affect the integrity and availability of the target server.

- **CVE-2025-68160**: Writing large, newline-free data into a BIO chain using the line-buffering filter where the next BIO performs short writes can trigger a heap-based out-of-bounds write.

- **CVE-2025-61726**: The net/url package does not set a limit on the number of query parameters in a query. While the maximum size of query parameters in URLs is generally limited by the maximum request header size, the net/http.Request.ParseForm method can parse large URL-encoded forms. Parsing a large form containing many unique query parameters can cause excessive memory consumption.

- **CVE-2025-69419**: Calling PKCS12_get_friendlyname() function on a maliciously crafted PKCS#12 file with a BMPString (UTF-16BE) friendly name containing non-ASCII BMP code point can trigger a one byte write before the allocated buffer.

- **CVE-2026-22795**: An invalid or NULL pointer dereference can happen in an application processing a malformed PKCS#12 file.

- **CVE-2025-14177**: The getimagesize() function may leak uninitialized heap memory into the APPn segments (for example, APP1) when reading images in multi-chunk mode (such as via php://filter). This occurs due to a bug in php_read_stream_all_chunks() that overwrites the buffer without advancing the pointer, leaving tail bytes uninitialized. This may lead to information disclosure of sensitive heap data and affect the confidentiality of the target server.

- **CVE-2025-14180**: Apport 2.13 through 2.20.7 does not properly handle crashes originating from a PID namespace allowing local users to create certain files as root which an attacker could leverage to perform a denial of service via resource exhaustion or possibly gain root privileges

### spryker/php:8.3-alpine3.21

- **CVE-2025-15468**: If an application using the SSL_CIPHER_find() function in a QUIC protocol client or server receives an unknown cipher suite from the peer, a NULL dereference occurs.

- **CVE-2025-69421**: Processing a malformed PKCS#12 file can trigger a NULL pointer dereference in the PKCS12_item_decrypt_d2i_ex() function.

- **CVE-2026-22796**: A type confusion vulnerability exists in the signature verification of signed PKCS#7 data where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing malformed PKCS#7 data.

- **CVE-2026-15467**: Parsing CMS AuthEnvelopedData message with maliciously crafted AEAD parameters can trigger a stack buffer overflow.

- **CVE-2025-69420**: A type confusion vulnerability exists in the TimeStamp Response verification code where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing a malformed TimeStamp Response file.

- **CVE-2025-69418**: When using the low-level OCB API directly with AES-NI or other hardware-accelerated code paths, inputs whose length is not a multiple of 16 bytes can leave the final partial block unencrypted and unauthenticated.

- **CVE-2026-22801**: LIBPNG is a reference library for use in applications that read, create, and manipulate PNG (Portable Network Graphics) raster image files. From 1.6.26 to 1.6.53, there is an integer truncation in the libpng simplified write API functions png_write_image_16bit and png_write_image_8bit causes heap buffer over-read when the caller provides a negative row stride (for bottom-up image layouts) or a stride exceeding 65535 bytes. The bug was introduced in libpng 1.6.26 (October 2016) by casts added to silence compiler warnings on 16-bit systems. This vulnerability is fixed in 1.6.54.

- **CVE-2026-22695**: A flaw was found in Podman. In a Containerfile or Podman, data written to RUN --mount=type=bind mounts during the podman build is not discarded. This issue can lead to files created within the container appearing in the temporary build context directory on the host, leaving the created files accessible.

- **CVE-2025-66199**: A TLS 1.3 connection using certificate compression can be forced to allocate a large buffer before decompression without checking against the configured certificate size limit.

- **CVE-2025-68160**: Writing large, newline-free data into a BIO chain using the line-buffering filter where the next BIO performs short writes can trigger a heap-based out-of-bounds write.

- **CVE-2025-69419**: Calling PKCS12_get_friendlyname() function on a maliciously crafted PKCS#12 file with a BMPString (UTF-16BE) friendly name containing non-ASCII BMP code point can trigger a one byte write before the allocated buffer.

- **CVE-2026-22795**: An invalid or NULL pointer dereference can happen in an application processing a malformed PKCS#12 file.

### spryker/php:8.2-alpine3.21

- **CVE-2025-15468**: If an application using the SSL_CIPHER_find() function in a QUIC protocol client or server receives an unknown cipher suite from the peer, a NULL dereference occurs.

- **CVE-2025-69421**: Processing a malformed PKCS#12 file can trigger a NULL pointer dereference in the PKCS12_item_decrypt_d2i_ex() function.

- **CVE-2026-22796**: A type confusion vulnerability exists in the signature verification of signed PKCS#7 data where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing malformed PKCS#7 data.

- **CVE-2026-15467**: Parsing CMS AuthEnvelopedData message with maliciously crafted AEAD parameters can trigger a stack buffer overflow.

- **CVE-2025-61728**: archive/zip uses a super-linear file name indexing algorithm that is invoked the first time a file in an archive is opened. This can lead to a denial of service when consuming a maliciously constructed ZIP archive.

- **CVE-2025-69420**: A type confusion vulnerability exists in the TimeStamp Response verification code where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing a malformed TimeStamp Response file.

- **CVE-2025-69418**: When using the low-level OCB API directly with AES-NI or other hardware-accelerated code paths, inputs whose length is not a multiple of 16 bytes can leave the final partial block unencrypted and unauthenticated.

- **CVE-2026-22801**: LIBPNG is a reference library for use in applications that read, create, and manipulate PNG (Portable Network Graphics) raster image files. From 1.6.26 to 1.6.53, there is an integer truncation in the libpng simplified write API functions png_write_image_16bit and png_write_image_8bit causes heap buffer over-read when the caller provides a negative row stride (for bottom-up image layouts) or a stride exceeding 65535 bytes. The bug was introduced in libpng 1.6.26 (October 2016) by casts added to silence compiler warnings on 16-bit systems. This vulnerability is fixed in 1.6.54.

- **CVE-2026-22695**: A flaw was found in Podman. In a Containerfile or Podman, data written to RUN --mount=type=bind mounts during the podman build is not discarded. This issue can lead to files created within the container appearing in the temporary build context directory on the host, leaving the created files accessible.

- **CVE-2025-66199**: A TLS 1.3 connection using certificate compression can be forced to allocate a large buffer before decompression without checking against the configured certificate size limit.

- **CVE-2025-14178**: A heap buffer overflow occurs in array_merge() when the total element count of packed arrays exceeds 32-bit limits or HT_MAX_SIZE, due to an integer overflow in the precomputation of element counts using zend_hash_num_elements(). This may lead to memory corruption or crashes and affect the integrity and availability of the target server.

- **CVE-2025-68160**: Writing large, newline-free data into a BIO chain using the line-buffering filter where the next BIO performs short writes can trigger a heap-based out-of-bounds write.

- **CVE-2025-61726**: The net/url package does not set a limit on the number of query parameters in a query. While the maximum size of query parameters in URLs is generally limited by the maximum request header size, the net/http.Request.ParseForm method can parse large URL-encoded forms. Parsing a large form containing many unique query parameters can cause excessive memory consumption.

- **CVE-2025-69419**: Calling PKCS12_get_friendlyname() function on a maliciously crafted PKCS#12 file with a BMPString (UTF-16BE) friendly name containing non-ASCII BMP code point can trigger a one byte write before the allocated buffer.

- **CVE-2026-22795**: An invalid or NULL pointer dereference can happen in an application processing a malformed PKCS#12 file.

- **CVE-2025-61730**: During the TLS 1.3 handshake if multiple messages are sent in records that span encryption level boundaries (for instance the Client Hello and Encrypted Extensions messages), the subsequent messages may be processed before the encryption level changes. This can cause some minor information disclosure if a network-local attacker can inject messages during the handshake.

- **CVE-2025-14177**: The getimagesize() function may leak uninitialized heap memory into the APPn segments (for example, APP1) when reading images in multi-chunk mode (such as via php://filter). This occurs due to a bug in php_read_stream_all_chunks() that overwrites the buffer without advancing the pointer, leaving tail bytes uninitialized. This may lead to information disclosure of sensitive heap data and affect the confidentiality of the target server.

### spryker/php:8.4-alpine3.20

- **CVE-2025-15468**: If an application using the SSL_CIPHER_find() function in a QUIC protocol client or server receives an unknown cipher suite from the peer, a NULL dereference occurs.

- **CVE-2025-69421**: Processing a malformed PKCS#12 file can trigger a NULL pointer dereference in the PKCS12_item_decrypt_d2i_ex() function.

- **CVE-2026-22796**: A type confusion vulnerability exists in the signature verification of signed PKCS#7 data where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing malformed PKCS#7 data.

- **CVE-2026-15467**: Parsing CMS AuthEnvelopedData message with maliciously crafted AEAD parameters can trigger a stack buffer overflow.

- **CVE-2025-61728**: archive/zip uses a super-linear file name indexing algorithm that is invoked the first time a file in an archive is opened. This can lead to a denial of service when consuming a maliciously constructed ZIP archive.

- **CVE-2025-69420**: A type confusion vulnerability exists in the TimeStamp Response verification code where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing a malformed TimeStamp Response file.

- **CVE-2025-69418**: When using the low-level OCB API directly with AES-NI or other hardware-accelerated code paths, inputs whose length is not a multiple of 16 bytes can leave the final partial block unencrypted and unauthenticated.

- **CVE-2025-6491**: When parsing XML data in SOAP extensions, overly large (>2Gb) XML namespace prefix may lead to null pointer dereference. This may lead to crashes and affect the availability of the target server.

- **CVE-2026-22801**: LIBPNG is a reference library for use in applications that read, create, and manipulate PNG (Portable Network Graphics) raster image files. From 1.6.26 to 1.6.53, there is an integer truncation in the libpng simplified write API functions png_write_image_16bit and png_write_image_8bit causes heap buffer over-read when the caller provides a negative row stride (for bottom-up image layouts) or a stride exceeding 65535 bytes. The bug was introduced in libpng 1.6.26 (October 2016) by casts added to silence compiler warnings on 16-bit systems. This vulnerability is fixed in 1.6.54.

- **CVE-2025-1220**: NetSarang Xmanager Enterprise 5.0 Build 1232, Xmanager 5.0 Build 1045, Xshell 5.0 Build 1322, Xftp 5.0 Build 1218, and Xlpd 5.0 Build 1220 contain a malicious nssock2.dll that implements a multi-stage, DNS-based backdoor. The dormant library contacts a C2 DNS server via a specially crafted TXT record for a month‑generated domain. After receiving a decryption key, it then downloads and executes arbitrary code, creates an encrypted virtual file system (VFS) in the registry, and grants the attacker full remote code execution, data exfiltration, and persistence. NetSarang released builds for each product line that remediated the compromise: Xmanager Enterprise Build 1236, Xmanager Build 1049, Xshell Build 1326, Xftp Build 1222, and Xlpd Build 1224. Kaspersky Lab identified an instance of exploitation in the wild in August 2017.

- **CVE-2026-22695**: A flaw was found in Podman. In a Containerfile or Podman, data written to RUN --mount=type=bind mounts during the podman build is not discarded. This issue can lead to files created within the container appearing in the temporary build context directory on the host, leaving the created files accessible.

- **CVE-2025-66199**: A TLS 1.3 connection using certificate compression can be forced to allocate a large buffer before decompression without checking against the configured certificate size limit.

- **CVE-2025-68160**: Writing large, newline-free data into a BIO chain using the line-buffering filter where the next BIO performs short writes can trigger a heap-based out-of-bounds write.

- **CVE-2025-69419**: Calling PKCS12_get_friendlyname() function on a maliciously crafted PKCS#12 file with a BMPString (UTF-16BE) friendly name containing non-ASCII BMP code point can trigger a one byte write before the allocated buffer.

- **CVE-2026-22795**: An invalid or NULL pointer dereference can happen in an application processing a malformed PKCS#12 file.

- **CVE-2025-1735**: A vulnerability in Palantir's Aries service allowed unauthenticated access to log viewing and management functionality on Apollo instances using default configuration. The defect resulted in both authentication and authorization checks being bypassed, potentially allowing any network-accessible client to view system logs and perform operations without valid credentials. No evidence of exploitation was identified during the vulnerability window.

- **CVE-2025-14177**: The getimagesize() function may leak uninitialized heap memory into the APPn segments (for example, APP1) when reading images in multi-chunk mode (such as via php://filter). This occurs due to a bug in php_read_stream_all_chunks() that overwrites the buffer without advancing the pointer, leaving tail bytes uninitialized. This may lead to information disclosure of sensitive heap data and affect the confidentiality of the target server.

### spryker/php:8.3-alpine3.20

- **CVE-2025-14178**: A heap buffer overflow occurs in array_merge() when the total element count of packed arrays exceeds 32-bit limits or HT_MAX_SIZE, due to an integer overflow in the precomputation of element counts using zend_hash_num_elements(). This may lead to memory corruption or crashes and affect the integrity and availability of the target server.

- **CVE-2025-15468**: If an application using the SSL_CIPHER_find() function in a QUIC protocol client or server receives an unknown cipher suite from the peer, a NULL dereference occurs.

- **CVE-2025-69421**: Processing a malformed PKCS#12 file can trigger a NULL pointer dereference in the PKCS12_item_decrypt_d2i_ex() function.

- **CVE-2026-22796**: A type confusion vulnerability exists in the signature verification of signed PKCS#7 data where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing malformed PKCS#7 data.

- **CVE-2026-15467**: Parsing CMS AuthEnvelopedData message with maliciously crafted AEAD parameters can trigger a stack buffer overflow.

- **CVE-2025-61726**: The net/url package does not set a limit on the number of query parameters in a query. While the maximum size of query parameters in URLs is generally limited by the maximum request header size, the net/http.Request.ParseForm method can parse large URL-encoded forms. Parsing a large form containing many unique query parameters can cause excessive memory consumption.

- **CVE-2025-61730**: During the TLS 1.3 handshake if multiple messages are sent in records that span encryption level boundaries (for instance the Client Hello and Encrypted Extensions messages), the subsequent messages may be processed before the encryption level changes. This can cause some minor information disclosure if a network-local attacker can inject messages during the handshake.

- **CVE-2025-14180**: Apport 2.13 through 2.20.7 does not properly handle crashes originating from a PID namespace allowing local users to create certain files as root which an attacker could leverage to perform a denial of service via resource exhaustion or possibly gain root privileges

- **CVE-2025-69420**: A type confusion vulnerability exists in the TimeStamp Response verification code where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing a malformed TimeStamp Response file.

- **CVE-2025-69418**: When using the low-level OCB API directly with AES-NI or other hardware-accelerated code paths, inputs whose length is not a multiple of 16 bytes can leave the final partial block unencrypted and unauthenticated.

- **CVE-2026-22801**: LIBPNG is a reference library for use in applications that read, create, and manipulate PNG (Portable Network Graphics) raster image files. From 1.6.26 to 1.6.53, there is an integer truncation in the libpng simplified write API functions png_write_image_16bit and png_write_image_8bit causes heap buffer over-read when the caller provides a negative row stride (for bottom-up image layouts) or a stride exceeding 65535 bytes. The bug was introduced in libpng 1.6.26 (October 2016) by casts added to silence compiler warnings on 16-bit systems. This vulnerability is fixed in 1.6.54.

- **CVE-2025-1220**: NetSarang Xmanager Enterprise 5.0 Build 1232, Xmanager 5.0 Build 1045, Xshell 5.0 Build 1322, Xftp 5.0 Build 1218, and Xlpd 5.0 Build 1220 contain a malicious nssock2.dll that implements a multi-stage, DNS-based backdoor. The dormant library contacts a C2 DNS server via a specially crafted TXT record for a month‑generated domain. After receiving a decryption key, it then downloads and executes arbitrary code, creates an encrypted virtual file system (VFS) in the registry, and grants the attacker full remote code execution, data exfiltration, and persistence. NetSarang released builds for each product line that remediated the compromise: Xmanager Enterprise Build 1236, Xmanager Build 1049, Xshell Build 1326, Xftp Build 1222, and Xlpd Build 1224. Kaspersky Lab identified an instance of exploitation in the wild in August 2017.

- **CVE-2026-22695**: A flaw was found in Podman. In a Containerfile or Podman, data written to RUN --mount=type=bind mounts during the podman build is not discarded. This issue can lead to files created within the container appearing in the temporary build context directory on the host, leaving the created files accessible.

- **CVE-2025-66199**: A TLS 1.3 connection using certificate compression can be forced to allocate a large buffer before decompression without checking against the configured certificate size limit.

- **CVE-2025-68160**: Writing large, newline-free data into a BIO chain using the line-buffering filter where the next BIO performs short writes can trigger a heap-based out-of-bounds write.

- **CVE-2025-1734**: In the Linux kernel, the following vulnerability has been resolved: HID: appleir: Fix potential NULL dereference at raw event handle.

- **CVE-2025-1861**: When parsing HTTP redirect in the response to an HTTP request, there is currently limit on the location value size caused by limited size of the location buffer to 1024. However as per RFC9110, the limit is recommended to be 8000. This may lead to incorrect URL truncation and redirecting to a wrong location.

- **CVE-2025-1219**: When requesting a HTTP resource using the DOM or SimpleXML extensions, the wrong content-type header is used to determine the charset when the requested resource performs a redirect. This may cause the resulting document to be parsed incorrectly or bypass validations.

- **CVE-2025-69419**: Calling PKCS12_get_friendlyname() function on a maliciously crafted PKCS#12 file with a BMPString (UTF-16BE) friendly name containing non-ASCII BMP code point can trigger a one byte write before the allocated buffer.

- **CVE-2026-22795**: An invalid or NULL pointer dereference can happen in an application processing a malformed PKCS#12 file.

- **CVE-2025-1217**: When http request module parses HTTP response obtained from a server, folded headers are parsed incorrectly, which may lead to misinterpreting the response and using incorrect headers, MIME types, etc.

- **CVE-2025-1735**: A vulnerability in Palantir's Aries service allowed unauthenticated access to log viewing and management functionality on Apollo instances using default configuration. The defect resulted in both authentication and authorization checks being bypassed, potentially allowing any network-accessible client to view system logs and perform operations without valid credentials. No evidence of exploitation was identified during the vulnerability window.

- **CVE-2025-14177**: The getimagesize() function may leak uninitialized heap memory into the APPn segments (for example, APP1) when reading images in multi-chunk mode (such as via php://filter). This occurs due to a bug in php_read_stream_all_chunks() that overwrites the buffer without advancing the pointer, leaving tail bytes uninitialized. This may lead to information disclosure of sensitive heap data and affect the confidentiality of the target server.

### spryker/php:8.2-alpine3.20

- **CVE-2025-14178**: A heap buffer overflow occurs in array_merge() when the total element count of packed arrays exceeds 32-bit limits or HT_MAX_SIZE, due to an integer overflow in the precomputation of element counts using zend_hash_num_elements(). This may lead to memory corruption or crashes and affect the integrity and availability of the target server.

- **CVE-2025-15468**: If an application using the SSL_CIPHER_find() function in a QUIC protocol client or server receives an unknown cipher suite from the peer, a NULL dereference occurs.

- **CVE-2025-69421**: Processing a malformed PKCS#12 file can trigger a NULL pointer dereference in the PKCS12_item_decrypt_d2i_ex() function.

- **CVE-2026-22796**: A type confusion vulnerability exists in the signature verification of signed PKCS#7 data where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing malformed PKCS#7 data.

- **CVE-2026-15467**: Parsing CMS AuthEnvelopedData message with maliciously crafted AEAD parameters can trigger a stack buffer overflow.

- **CVE-2025-61726**: The net/url package does not set a limit on the number of query parameters in a query. While the maximum size of query parameters in URLs is generally limited by the maximum request header size, the net/http.Request.ParseForm method can parse large URL-encoded forms. Parsing a large form containing many unique query parameters can cause excessive memory consumption.

- **CVE-2025-61730**: During the TLS 1.3 handshake if multiple messages are sent in records that span encryption level boundaries (for instance the Client Hello and Encrypted Extensions messages), the subsequent messages may be processed before the encryption level changes. This can cause some minor information disclosure if a network-local attacker can inject messages during the handshake.

- **CVE-2025-14180**: Apport 2.13 through 2.20.7 does not properly handle crashes originating from a PID namespace allowing local users to create certain files as root which an attacker could leverage to perform a denial of service via resource exhaustion or possibly gain root privileges

- **CVE-2025-61728**: archive/zip uses a super-linear file name indexing algorithm that is invoked the first time a file in an archive is opened. This can lead to a denial of service when consuming a maliciously constructed ZIP archive.

- **CVE-2025-69420**: A type confusion vulnerability exists in the TimeStamp Response verification code where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing a malformed TimeStamp Response file.

- **CVE-2025-69418**: When using the low-level OCB API directly with AES-NI or other hardware-accelerated code paths, inputs whose length is not a multiple of 16 bytes can leave the final partial block unencrypted and unauthenticated.

- **CVE-2025-6491**: When parsing XML data in SOAP extensions, overly large (>2Gb) XML namespace prefix may lead to null pointer dereference. This may lead to crashes and affect the availability of the target server.

- **CVE-2026-22801**: LIBPNG is a reference library for use in applications that read, create, and manipulate PNG (Portable Network Graphics) raster image files. From 1.6.26 to 1.6.53, there is an integer truncation in the libpng simplified write API functions png_write_image_16bit and png_write_image_8bit causes heap buffer over-read when the caller provides a negative row stride (for bottom-up image layouts) or a stride exceeding 65535 bytes. The bug was introduced in libpng 1.6.26 (October 2016) by casts added to silence compiler warnings on 16-bit systems. This vulnerability is fixed in 1.6.54.

- **CVE-2025-1220**: NetSarang Xmanager Enterprise 5.0 Build 1232, Xmanager 5.0 Build 1045, Xshell 5.0 Build 1322, Xftp 5.0 Build 1218, and Xlpd 5.0 Build 1220 contain a malicious nssock2.dll that implements a multi-stage, DNS-based backdoor. The dormant library contacts a C2 DNS server via a specially crafted TXT record for a month‑generated domain. After receiving a decryption key, it then downloads and executes arbitrary code, creates an encrypted virtual file system (VFS) in the registry, and grants the attacker full remote code execution, data exfiltration, and persistence. NetSarang released builds for each product line that remediated the compromise: Xmanager Enterprise Build 1236, Xmanager Build 1049, Xshell Build 1326, Xftp Build 1222, and Xlpd Build 1224. Kaspersky Lab identified an instance of exploitation in the wild in August 2017.

- **CVE-2026-22695**: A flaw was found in Podman. In a Containerfile or Podman, data written to RUN --mount=type=bind mounts during the podman build is not discarded. This issue can lead to files created within the container appearing in the temporary build context directory on the host, leaving the created files accessible.

- **CVE-2025-66199**: A TLS 1.3 connection using certificate compression can be forced to allocate a large buffer before decompression without checking against the configured certificate size limit.

- **CVE-2025-68160**: Writing large, newline-free data into a BIO chain using the line-buffering filter where the next BIO performs short writes can trigger a heap-based out-of-bounds write.

- **CVE-2025-69419**: Calling PKCS12_get_friendlyname() function on a maliciously crafted PKCS#12 file with a BMPString (UTF-16BE) friendly name containing non-ASCII BMP code point can trigger a one byte write before the allocated buffer.

- **CVE-2026-22795**: An invalid or NULL pointer dereference can happen in an application processing a malformed PKCS#12 file.

- **CVE-2025-1735**: A vulnerability in Palantir's Aries service allowed unauthenticated access to log viewing and management functionality on Apollo instances using default configuration. The defect resulted in both authentication and authorization checks being bypassed, potentially allowing any network-accessible client to view system logs and perform operations without valid credentials. No evidence of exploitation was identified during the vulnerability window.

- **CVE-2025-14177**: The getimagesize() function may leak uninitialized heap memory into the APPn segments (for example, APP1) when reading images in multi-chunk mode (such as via php://filter). This occurs due to a bug in php_read_stream_all_chunks() that overwrites the buffer without advancing the pointer, leaving tail bytes uninitialized. This may lead to information disclosure of sensitive heap data and affect the confidentiality of the target server.

### spryker/php:8.1-alpine3.20

- **CVE-2025-14178**: A heap buffer overflow occurs in array_merge() when the total element count of packed arrays exceeds 32-bit limits or HT_MAX_SIZE, due to an integer overflow in the precomputation of element counts using zend_hash_num_elements(). This may lead to memory corruption or crashes and affect the integrity and availability of the target server.

- **CVE-2025-15468**: If an application using the SSL_CIPHER_find() function in a QUIC protocol client or server receives an unknown cipher suite from the peer, a NULL dereference occurs.

- **CVE-2025-69421**: Processing a malformed PKCS#12 file can trigger a NULL pointer dereference in the PKCS12_item_decrypt_d2i_ex() function.

- **CVE-2026-22796**: A type confusion vulnerability exists in the signature verification of signed PKCS#7 data where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing malformed PKCS#7 data.

- **CVE-2026-15467**: Parsing CMS AuthEnvelopedData message with maliciously crafted AEAD parameters can trigger a stack buffer overflow.

- **CVE-2025-61726**: The net/url package does not set a limit on the number of query parameters in a query. While the maximum size of query parameters in URLs is generally limited by the maximum request header size, the net/http.Request.ParseForm method can parse large URL-encoded forms. Parsing a large form containing many unique query parameters can cause excessive memory consumption.

- **CVE-2025-61730**: During the TLS 1.3 handshake if multiple messages are sent in records that span encryption level boundaries (for instance the Client Hello and Encrypted Extensions messages), the subsequent messages may be processed before the encryption level changes. This can cause some minor information disclosure if a network-local attacker can inject messages during the handshake.

- **CVE-2025-14180**: Apport 2.13 through 2.20.7 does not properly handle crashes originating from a PID namespace allowing local users to create certain files as root which an attacker could leverage to perform a denial of service via resource exhaustion or possibly gain root privileges

- **CVE-2025-61728**: archive/zip uses a super-linear file name indexing algorithm that is invoked the first time a file in an archive is opened. This can lead to a denial of service when consuming a maliciously constructed ZIP archive.

- **CVE-2025-69420**: A type confusion vulnerability exists in the TimeStamp Response verification code where an ASN1_TYPE union member is accessed without first validating the type, causing an invalid or NULL pointer dereference when processing a malformed TimeStamp Response file.

- **CVE-2025-69418**: When using the low-level OCB API directly with AES-NI or other hardware-accelerated code paths, inputs whose length is not a multiple of 16 bytes can leave the final partial block unencrypted and unauthenticated.

- **CVE-2025-6491**: When parsing XML data in SOAP extensions, overly large (>2Gb) XML namespace prefix may lead to null pointer dereference. This may lead to crashes and affect the availability of the target server.

- **CVE-2026-22801**: LIBPNG is a reference library for use in applications that read, create, and manipulate PNG (Portable Network Graphics) raster image files. From 1.6.26 to 1.6.53, there is an integer truncation in the libpng simplified write API functions png_write_image_16bit and png_write_image_8bit causes heap buffer over-read when the caller provides a negative row stride (for bottom-up image layouts) or a stride exceeding 65535 bytes. The bug was introduced in libpng 1.6.26 (October 2016) by casts added to silence compiler warnings on 16-bit systems. This vulnerability is fixed in 1.6.54.

- **CVE-2025-1220**: NetSarang Xmanager Enterprise 5.0 Build 1232, Xmanager 5.0 Build 1045, Xshell 5.0 Build 1322, Xftp 5.0 Build 1218, and Xlpd 5.0 Build 1220 contain a malicious nssock2.dll that implements a multi-stage, DNS-based backdoor. The dormant library contacts a C2 DNS server via a specially crafted TXT record for a month‑generated domain. After receiving a decryption key, it then downloads and executes arbitrary code, creates an encrypted virtual file system (VFS) in the registry, and grants the attacker full remote code execution, data exfiltration, and persistence. NetSarang released builds for each product line that remediated the compromise: Xmanager Enterprise Build 1236, Xmanager Build 1049, Xshell Build 1326, Xftp Build 1222, and Xlpd Build 1224. Kaspersky Lab identified an instance of exploitation in the wild in August 2017.

- **CVE-2026-22695**: A flaw was found in Podman. In a Containerfile or Podman, data written to RUN --mount=type=bind mounts during the podman build is not discarded. This issue can lead to files created within the container appearing in the temporary build context directory on the host, leaving the created files accessible.

- **CVE-2025-66199**: A TLS 1.3 connection using certificate compression can be forced to allocate a large buffer before decompression without checking against the configured certificate size limit.

- **CVE-2025-68160**: Writing large, newline-free data into a BIO chain using the line-buffering filter where the next BIO performs short writes can trigger a heap-based out-of-bounds write.

- **CVE-2025-69419**: Calling PKCS12_get_friendlyname() function on a maliciously crafted PKCS#12 file with a BMPString (UTF-16BE) friendly name containing non-ASCII BMP code point can trigger a one byte write before the allocated buffer.

- **CVE-2026-22795**: An invalid or NULL pointer dereference can happen in an application processing a malformed PKCS#12 file.