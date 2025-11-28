---
title: Bot control
description: This guideline explains how to manage bot traffic, including both honest and malicious bots, to optimize performance and protect your application.
last_updated: Nov 28, 2025
template: concept-topic-template
---

Bot traffic is unavoidable in the modern internet and there are two kinds of bots:

- **official/honest bots** - HTTPS clients representing themselves as bots (crawlers, scanners originating from search engines, LLMs, social media, etc)
- **malicious bots** - HTTPS clients mimicking user browsers, usually harvesting information for different purposes or simply attacking the application to make it slow, not stable or even failing, or increasing cloud costs significantly.

Because of that difference, the countermeasures are also different.

## Managing honest bots

Honest bots usually respect the industry standard file - `robots.txt`. This is a **must-have, simple tool** that defines rules for bots: what is allowed for bots, what is not, frequency of scan, etc.

For more information, see [Crawler Control](/docs/pbc/all/miscellaneous/{{site.version}}/crawler-control.html).

## Managing malicious bots

Malicious bots, on the other hand, usually ignore such recommendations. For that reason, the only effective way of limiting their negative impact is to filter out their requests.

There are a few options here:

### Basic HTTP auth

Close application or part of it behind authentication, using nginx configuration.

### IP Filtering

Filter out IP ranges based on geoip databases, user agents, URLs, or any combination of those.

### AWS WAF

[AWS WAF](https://aws.amazon.com/waf/) - a firewall that has a set of standard rules to block suspicious, not useful traffic.

### Advanced bot management services

The most efficient, dynamic, and feature-rich solutions are tools like **Akamai, Cloudflare**-like services for bot control, not only to granularly control official bots (e.g., social networks and commercial LLMs), but also those unofficial - crawlers, scanners, and malicious ones.

## The problem with nginx-based solutions

It requires a custom nginx configuration, which leads to the necessity of creating a custom [docker/sdk](https://github.com/spryker/docker-sdk) branch and using it in the cloud environment. But that approach **moves the responsibility** of maintaining this branch from Spryker to a partner or customer (for updates, upgrades, etc).
