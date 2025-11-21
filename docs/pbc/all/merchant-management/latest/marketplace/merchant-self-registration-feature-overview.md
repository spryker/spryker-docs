---
title: Merchant Self-Registration feature overview
description: The Merchant Self-Registration feature enables prospective merchants to submit registration requests through the Storefront, which marketplace operators can review and approve in the Back Office.
last_updated: Nov 21, 2025
template: concept-topic-template
---

The Merchant Self-Registration feature streamlines the merchant onboarding process by providing a self-service registration form on the Storefront. Prospective merchants can submit registration requests with their company and contact information. Marketplace operators review these requests in the Back Office and can either approve them—which automatically creates merchant and merchant user accounts—or reject them.

## Storefront registration form

The feature provides a dedicated registration page on the Storefront, accessible via a configurable link (typically in the footer). The registration form collects the following information:

**Company information:**
- Company name
- Registration number
- Country
- Street address
- House number
- Zip code
- City

**Contact person details:**
- Title (Mr, Mrs, Dr, Ms, n/a)
- First name
- Last name
- Role in the company
- Email address (used for merchant user account)
- Phone number (optional)

**Terms acceptance:**
- Checkbox to accept marketplace terms and conditions

### Validation

The system performs the following validations on registration requests:
- Required field validation
- Email uniqueness check (against existing merchant users and pending/accepted requests)
- Company name uniqueness check
- Data format validation (email format, field lengths)

Validation errors are displayed to the user with specific error messages.

## Back Office registration request management

Marketplace operators manage merchant registration requests through the Back Office under **Marketplace** > **Merchant Registrations**.

### Registration request list

The list view displays all submitted requests with the following information:
- **ID**: Unique identifier of the request
- **Created**: Timestamp when the request was submitted (format: MMM DD, YYYY HH:MM)
- **Merchant**: Full name of the contact person (Title, First Name, Last Name)
- **Email**: Email address for the merchant user account
- **Status**: Current status of the request (Pending, Accepted, Rejected)
- **Actions**: View button to see request details

The list supports:
- Sorting by ID, Created date, Merchant name, Email, or Status
- Searching by Merchant name or Email
- Pagination for large numbers of requests

### Request details view

The details page shows:
- **Company Information**: All submitted company details including registration number and address
- **Contact Person**: Contact person details including role and phone number
- **Internal Comments**: Thread for team communication (not visible to the merchant)

### Request approval

When a marketplace operator approves a registration request:

1. The operator clicks **Create Merchant** on the request details page
2. A confirmation dialog appears: "Approving this request will create a merchant account"
3. Upon confirmation, the system:
   - Updates the request status to **Accepted**
   - Creates a new merchant with the provided company information
   - Creates a merchant user account with the submitted email address
   - Assigns the merchant:
     - Status: **Inactive**
     - Approval status: **Waiting for Approval**
   - Creates a comment thread for the merchant
4. Displays a success message: "Merchant has been created"

The marketplace operator must then:
- Manually update the merchant status to **Active** and approval status to **Approved** in the merchant management section
- Notify the merchant user about their new account credentials

### Request rejection

When a marketplace operator rejects a registration request:

1. The operator clicks **Reject Merchant** on the request details page
2. Optionally adds an internal comment explaining the rejection reason
3. A confirmation dialog appears: "Reject this request if you do not want to create a merchant account"
4. Upon confirmation, the system:
   - Updates the request status to **Rejected**
   - Displays a success message: "Merchant has been rejected"

Rejected requests cannot be reopened. If a merchant wants to register again, they must submit a new registration request.

## Registration request statuses

Registration requests have three possible statuses:

| STATUS   | DESCRIPTION                                                          |
|----------|----------------------------------------------------------------------|
| Pending  | Request submitted and awaiting review by the marketplace operator    |
| Accepted | Request approved and merchant account created                        |
| Rejected | Request declined and no merchant account created                     |

## Internal communication

The feature includes an internal comments system that allows marketplace operators to:
- Leave comments on registration requests
- Communicate with team members about specific requests
- Track the decision-making process

These comments are:
- Visible only to Back Office users
- Not visible to the prospective merchant
- Timestamped with the author's name
- Threaded for easy conversation tracking

## Data storage

Registration request data is stored in the `spy_merchant_registration_request` database table with the following key information:
- Company details (name, registration number, address)
- Contact person information (name, title, role, phone, email)
- Status tracking
- Foreign key relationships to country and store
- Automatic timestamps (created_at, updated_at)

The table includes indexes on:
- email + status
- company_name + status
- status

These indexes optimize searches and validation checks for duplicate registrations.

## Related Business User documents

- [Manage merchant registration requests](/docs/pbc/all/merchant-management/latest/marketplace/manage-in-the-back-office/manage-merchant-registration-requests.html)

## Related Developer documents

- [Install the Merchant Self-Registration feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-self-registration-feature.html)
