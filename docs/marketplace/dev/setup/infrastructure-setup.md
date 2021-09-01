---
title: Infrastructure setup
description: This article provides required system infrastructure setup for a Marketplace project.
template: concept-topic-template
---

This article provides required system infrastructure setup for a Marketplace project.

## Applications resources visibility

| Service                          | Resources available               | exposed to WAN? |
| -------------------------------- | --------------------------------- | ---------------- |
| MerchantPortal                                | PrimaryDatabase, QueueBroker, MerchantPortalSessionStorage | yes
| Backoffice                                | PrimaryDatabase, QueueBroker, BackofficeSessionStorage | no, accessed through VPN
| Scheduler                                | PrimaryDatabase, QueueBroker, Storage, Search | no, accessed through a Bastion
| REST API (Glue)                                | Storage, Search, Gateway | yes
| Storefront (Yves)                                | Storage, Search, Gateway | yes

The following diagram shows the recommended infrastructure setup for a Marketplace Spryker cluster:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/d10f1622-0c0e-44f0-b4f6-46d294448dec.png?utm_medium=live&utm_source=custom)

## Merchant Portal endpoints whitelisting

Merchant Portal is exposed to WAN and MUST NOT provide any Gateway or Backoffice facilities. 

The webserver config (AWS WAF can be used as well), should only allow HTTP endpoints of MerchantPortalGui to be used. They all have a special prefix (/domain-merchant-portal-gui). 

`/^[a-zA-Z-]+-merchant-portal-gui.*` - use this pattern as a whitelist in Nginx (or WAF) configuration.

## Merchant portal network

The merchant portal should be in the same network as Yves and Glue.

## Firewall rules for Merchant portal (NACLs or Security groups)

| Firewall       | From                | To                  | Action     | 
| -------------- | ------------------- | ------------------- | ---------- |
| SG / NACLs     | Merchant portal     | Redis(session):6379 | Allow
| NACLs     | Redis(session):6379     | Merchant portal | Allow
| SG / NACLs     | Merchant portal     | RDS:3306 | Allow
| NACLs     | RDS:3306     | Merchant portal | Allow
| SG / NACLs     | Merchant portal     | RabbitMQ:5672 | Allow
| NACLs    | RabbitMQ:5672     | Merchant portal | Allow
| SG / NACLs    | Nginx     | Merchant portal:900x | Allow
| NACLs    | Merchant portal:9001     | Nginx | Allow
| Default rule    | any     | Merchant portal | Deny

- If Security groups or host-based firewall is used need to implement “allow” rules for Merchant portal on Redis, RDS, Rabbit MQ, Nginx side as well.
- Depend on the monitoring system is used need to implement “allow” rules for it as well.

## Database (Transaction holder)

Each database user must have dedicated user credentials:

| User                          | DB User rights               |
| -------------------------------- | --------------------------------- |
| Sheduler                   | FULL ADMIN [Create shema, create tables, drop tables, create users, etc]
| Gateway                   | CRUD for the tables
| MerchantPortal                   | CRUD for the tables related to MerchantPortal. By default the same as Gateway

## Storage and Search

| User                          | User rights               |
| -------------------------------- | --------------------------------- |
| REST API                   | Read-only
| StoreFront Yves                   | Read-only
| Scheduler                   | Read-write
