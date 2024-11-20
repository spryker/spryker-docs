---
title: Email deliverability
description: Ensure high email deliverability in Spryker Cloud Commerce OS by configuring SPF, DKIM, and DMARC DNS records
last_updated: Jun 19, 2024
template: concept-topic-template
---


Sending emails is one of the most basic functions of an e-commerce system. This document describes how you can make sure your emails are received be recipients by setting up special DNS records and monitoring email statistics.

## Reputation

To reduce spam reaching their customers, email service providers use reputation databases. If a remote email server tries to connect to and deliver an email to the receiving email server, this server checks the reputation of the sending server and sender domain.

If the server and domain has been reported for spamming or distributing malicious content, the message that it wants to transmit may be outright rejected or flagged as spam.

You can use domain reputation checkers to assess the reputation of your email domain. To improve your domain's reputation and increase the deliverability of your emails, follow the instructions in the next sections.

## Testing email sending features

Your Spryker cloud non-production environments are using a sandboxed Simple Email Service Account *by default*. This means that you can only send emails to [validated recipients](https://docs.spryker.com/docs/ca/dev/email-service/verify-email-addresses.html). This protects you from mistakenly sending faulty emails to many recipients that might report this behavior and damage the reputation of your sender's domain. Only request the SES Sandbox to be disabled when you're confident that your email functionality works as expected.

## Configure email authentication DNS records

There are extensive resources available on email DNS records, so we only provide a short explanation. `example.com` is used as an example domain.

### Configure SPF

Sender Policy Framework (SPF) record lists authorized servers for sending emails from a domain. Mail servers check SPF records before delivering emails.

Your cloud environments use AWS SES to send emails. To allow this email server to send emails with your domain, set the following TXT DNS record for the domain you are using to send emails:
```bash
v=spf1 include:amazonses.com -all
```

### Configure DKIM

 DomainKeys Identified Mail (DKIM) digitally signs emails to verify their origin. Public key cryptography ensures authenticity of the emails sent from this domain.

To configure this record, follow the steps:
1. In the AWS Management Console, go to **Amazon Simple Email Service**.
2. In the navigation, go to **Configuration**>**Identities**.
3. On the **Identities** page, click on the domain name you want to configure DKIM for.
  This opens the domain's page.
4. In the **DomainKeys Identified Mail (DKIM)** pane, click **Publish DNS records**.
This displays CNAME records in the following format:
```bash
CNAME
NAME 123EXAMPLEHASH123._domainkey.example.com
VALUE 456EXAMPLEHASH456.dkim.amazonses.com

CNAME
NAME 789EXAMPLEHASH789._domainkey.example.com
VALUE 789EXAMPLEHASH789.dkim.amazonses.com

CNAME
NAME abcEXAMPLEHASHabc._domainkey.example.com
VALUE abcEXAMPLEHASHabc.dkim.amazonses.com
```

5. Add the CNAME records to the domain's DNS zone.


### Configure DMARC

Domain-based Message Authentication Reporting and Conformance (DMARC) handles emails that fail SPF or DKIM checks. It specifies actions, like quarantine or reject, based on authentication results.

To configure DMARC, follow the steps:

1. In the AWS Management Console, go to **Amazon Simple Email Service**.
2. In the navigation, go to **Configuration**>**Identities**.
3. On the **Identities** page, click on the domain name you want to configure DKIM for.
  This opens the domain's page.
4. In the **Domain-based Message Authentication, Reporting, and Conformance (DMARC)** pane, click **Publish DNS records**
This displays a TXT record in the following format:

```bash

TXT

_dmarc.example.com

"v=DMARC1; p=none;"

```

5. Add the TXT record to the domain's DNS zone.



## Reviewing SES standing, bounces, and complaints rate

The AWS SES Console gives you an overview of the emails you are sending. The **Account dashboard** section gives you insights into your sending statistics. It is important to regularly review your usage of the sending quota and [request increases](/docs/ca/dev/email-service/email-quota-restrictions.html) when they are needed. Pay attention to the **Account Health** pane, which indicates issues if any.

In the **Reputation Metrics** section, you can check the bounce and complains rate. If a SES account is reported for spam, Amazon can review, suspend, or close it.

## Sending relevant emails

After completing the technical setup, the best way to avoid complaints and spam reports is to keep your emails relevant and interesting for your customers. Avoid using the AWS SES service for "cold" advertisement or sending high-frequency email notifications.
