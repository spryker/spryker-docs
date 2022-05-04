---
title: Company Account feature overview
description: The Company Account page gives a clear overview of business’ structure, hierarchy, shipping, billing addresses, and other users in the Business Unit.
last_updated: Jun 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/company-account
originalArticleId: a634f862-aa74-4dad-a078-3f8b14b51a8f
redirect_from:
  - /v6/docs/company-account
  - /v6/docs/en/company-account
---

A B2B business model implies bilateral commercial relations between businesses, so a company is the top figure of every B2B marketplace. Each company has a specific organizational structure with its divisions (units) and employee roles. At some point or another, a B2B business owner would need separate accounts for employees to constrain or extend rights in regards to products, orders, confidential information, etc.

The *Company Account* feature allows you to control user access to the system within an organization by configuring different permissions and roles for the company's entities (units) and users. You can set up your own company structure of business units and users with various levels of permissions and roles.

One of the most important building blocks of the company account is business units, or sub-divisions of the company formed for different locations, entities or departments of your company. Each business unit can have their own billing and shipping addresses, hierarchy level, and users. Business units enable to narrow down responsibilities, establish permissions within them, and gain better control of all processes.

The feature enables you to create your own permission rules and assign them to company users. Implement any kind of business logic, from simple checks, like single permissions, to complex ones, like purchasing limit, customer allocation and business unit check.

Organizations with multiple business units that support their own set of accounts, customers, and vendors often need some of their company users to be able to access (and eventually manage) not one business unit but several business units within the whole company. Business on behalf enables you to set up multiple company users for one customer account. You can assign a company user to multiple business units with different roles and permissions to match your organization's policies and procedures.

The feature allows customer login by token. By dynamically generating a token, a user is able to log in with a pre-defined company user to a new e-commerce provider. All this happens without sharing the login information or having to fill out a sign-up form.



Check out the following videos about managing company accounts:
Setting up company structure:

{% wistia qkdgkeannb 960 720 %}

Setting up company users and roles:

{% wistia 72qy3slwjo 960 720 %}


