---
title: Email Deliverability
description: Explanation and Tips on Email Deliverability
last_updated: Jun 19, 2024
template: concept-topic-template
---

## Email Deliverability
Be it informing customers about offers, sending them receipts or password reset links, sending emails is one of the most basic functions of an e-commerce system.
It is essential for businesses to make sure that emails they are sending are actually received by their recipients. There are several factors that can increase or decrease email deliverability.

### Reputation
In an effort to reduce spam reaching their customers, many email service providers work with reputation databases. If a remote email server tries to connect to and deliver an email to the receiving email server, this server can check the reputation of the sending server and sender domain.
If the server and domain has been reported before for spamming or distributing malicious content, it can be that the message that it wants to transmit will either be outright rejected or flagged as spam.
There are several domain reputation checkers available that you can use to assess the reputation of your email domain.
To improve your domain's reputation and increase the deliverability of your emails, there are several things you should do:

#### Debug and troubleshoot carefully
Your Spryker PaaS non-production environments are - by default - using a sandboxed Simple Email Service Account. This means that you can only send emails to [validated recipients](https://docs.spryker.com/docs/ca/dev/email-service/verify-email-addresses.html).
This protects you from mistakenly sending faulty emails to many recipients that might report this behavior and damage the reputation of your sender's domain.
Only request the SES Sandbox to be disabled if you are confident that your email functionality works as expected

#### Configure SPF, DKIM and DMARC
There are extensive resources available on these three concepts, so we will only provide a short explanation. We will be using example.com as an example email domain.

**SPF (Sender Policy Framework)**
Purpose: Lists authorized servers for sending emails from a domain.
How It Works: Mail servers check SPF records before delivering emails.
How to configure:
When you are using Spryker PaaS, you are using AWS SES to send emails. To entitle this email server to send emails with your domain, you will need to set
the following DNS records (TXT) for the domain you are using to send emails:
```bash
v=spf1 include:amazonses.com -all
```

**DKIM (DomainKeys Identified Mail)**
Purpose: Digitally signs emails to verify their origin.
How It Works: Public key cryptography ensures authenticity.
How to configure:
In the AWS Console, switch to the SES Dashboard. You will be able to find the DKIM DNS CNAMES in the DKIM section under Configuration>Identities.
You should find three DNS CNAME records in this format. You will need to set them as CNAMES for the email domain you are using.

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

**DMARC (Domain-based Message Authentication Reporting and Conformance)**
Purpose: Handles emails that fail SPF or DKIM checks.
How It Works: Specifies actions (e.g., quarantine, reject) based on authentication results.
How to configure:
In the AWS Console, switch to the SES Dashboard. You will be able to find the DMARC DNS entries in the DMARC section under Configuration>Identities.
You will need to set an MX and TXT record

```bash

TXT

_dmarc.example.com

"v=DMARC1; p=none;"

```

#### Regularly review your SES Standing, Bounces and Complaints Rate
The AWS SES Console gives you an overview of the emails you are sending. The Account Dashboard section gives you insights into your sending statistics. It is important to regularly review your usage of the sending quota and [request increases](/docs/ca/dev/email-service/email-quota-restrictions.html) when they are needed. 
Please pay attention to the Account Health information, which will indicate issues with your account. Amazon can review, suspend or close your SES account if your account is reported due to spam or complaints.
In the Reputation Metrics section, you can check your bounce and complaints rate.

#### Keep your emails relevant and desirable
After you have completed the technical setup, the best way to avoid complaints and spam reports is to keep your emails relevant and interesting for your customers.
You should not use AWS SES service for "cold" advertisement or send email notifications to your customers in a high frequency.

# Conclusion
Email Deliverability is a multi-faceted topic. By making sure your application's email sending mechanism works as intended before deploying to production, you are protecting your email domain's reputation. By setting up DKIM, SPF, and DMARC you are using industry standard mechanisms to legitimize AWS SES as email sender and by keeping your email content is relevant, you keep your audience engaged and avoid blocks and complaints.
