---
title: Tisax Certification
description: Learn about Spryker's Tisax certification and capabilities enabling Tisax in automotive.
last_updated: Jun 10, 2025
template: concept-topic-template
originalArticleId: 0798f4ee-6a6b-46ed-baa8-g3e885700585

---

Spryker is a modular commerce solution hosted in Spryker Cloud (PaaS / Platform-as-a-Service), which runs on TISAX-certified AWS infrastructure (Assessment Level 3). While Spryker itself is not TISAX-certified (as it’s not transferable from vendor to projects), we provide an architectural foundation, technical capabilities, and flexibility that can be used to implement TISAX-aligned projects, particularly in regulated industries such as automotive and mobility.

This document outlines how Spryker’s PaaS solution can be used by enterprise customers and system integrators when meeting TISAX security objectives is a requirement, and provides practical guidance for Spryker-based projects in light of TISAX VDA ISA requirements. Spryker’s guidance does not replace a customer’s own evaluation of the applicable requirements or a customer’s compliant implementation on project-level - the responsibility for both lies with the customer.

## What is TISAX?

TISAX (Trusted Information Security Assessment Exchange) is an automotive industry-specific information security assessment, based on ISO/IEC 27001, and maintained by the ENX Association. It focuses on the protection of sensitive data - particularly:

- Personal and operational data
- Supplier and prototype information
- Secure data exchange between partners

Each project and/or company must undergo its own assessment, with compliance depending on internal processes, architecture, and hosting setup.

## Key Considerations

🛠 **Spryker cannot transfer TISAX compliance to customers.**  
Due to the flexible, customizable nature of Spryker and the variability in project code and operations, each customer implementation must undergo its own TISAX audit.

However, Spryker uses a TISAX-ready AWS foundation and provides capabilities that can help a customer to meet compliance requirements when used appropriately.

## Spryker’s Compliance-Enabling Capabilities

| TISAX Requirement Area            | Spryker Feature / Architectural Capability                                                                                            |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Secure Hosting Infrastructure    | Spryker Cloud is hosted on AWS, which is [certified under TISAX](https://aws.amazon.com/de/compliance/tisax/) AL3 across relevant regions.                                       |
| Environment Separation           | Supports fully isolated production, staging, testing, and preview environments to protect sensitive or prototype data.                |
| Access Control and RBAC          | Role-Based Access Control (RBAC) is built into the Backoffice (Zed) and API authentication.                                           |
| Secure APIs & Data Exchange      | API-first architecture with token-based authentication, encryption in transit (TLS), and fine-grained access scopes.                  |
| Modular and Auditable Architecture | Code and features are modularized by business domain, simplifying the implementation of least-privilege and audit logging strategies. |
| DevSecOps and CI/CD Compatibility | Supports integration with secure CI/CD practices, including secret management, audit logging, and code scanning tools.                |
| Encryption Support               | Encryption at rest and in transit is supported via AWS services (S3, RDS, etc.).                                                      |
| Custom Security Enhancements     | Customers can implement prototype protection, NDA management, and data classification tagging based on project needs.                 |

## Steps to Achieve TISAX Alignment on Spryker

1. **Define Scope and Target Assessment Level**  
   Identify whether your project will handle sensitive supplier data, prototypes, or vehicle configurations (often triggers TISAX Level 3 requirements).

2. **Choose TISAX-Certified Hosting**  
   Deploy on Spryker Cloud in a TISAX-certified AWS region.

3. **Design Architecture with Isolation & Access Control**  
   Use Spryker’s environment separation, RBAC, and API scopes to minimize data access and enforce protection boundaries.

4. **Secure Development and Customization**  
   Ensure that any partner or internal development follows secure coding guidelines, includes code reviews, and avoids sensitive data in non-production environments.

5. **Implement Logging & Monitoring**  
   Extend Spryker’s default logging to cover key user actions, especially in Backoffice, APIs, and data exports. Consider integrating a SIEM.

6. **Document and Audit**  
   Maintain documentation on your technical setup, access controls, risk assessments, and processes to prepare for the TISAX audit.

## Limitations & Disclaimer

Spryker does not provide TISAX certification out of the box and is not responsible for TISAX compliance for individual customer projects.  
Spryker uses TISAX-aligned architectures through certified AWS infrastructure and secure platform features. Customers are responsible for ensuring full alignment, documentation, and audit-readiness based on their own organizational practices.
