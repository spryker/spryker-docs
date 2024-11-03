---
title: Amazon QuickSight getting started guide
description: First steps to set up Amazon QuickSight
template: concept-topic-template
last_updated: Oct 24, 2024
---





The Amazon QuickSight feature brings customizable and powerful business intelligence tools to the Back Office.

## Data sources and data sets

This feature supports data from Spryker projects and third-party systems. When you set up Amazon QuickSight, the data from your project is available by default, and you can add other data sources if needed.

!QuickSight-datasets

For more details on data sources, see Supported data sources https://docs.aws.amazon.com/quicksight/latest/user/supported-data-sources.html

### Extending project data for analytics

By looking at datasets, you can see what data from your project is available for adding to analytics. By default, for each dataset, only the data that can be useful for analytics is available from a respective database table. For example, the Customer dataset doesn't include customer passwords.

You can extend the data available to datasets on the project level. For more details, see  



### Refreshing data

To make datasets up to date, you need to refresh them by resyncing data from your project or third-party systems.

You can refresh data manually or automatically by setting up a schedule per data set.


![refresh-dataset]

For instructions, see [Refresh analytics datasets]()




## User management and permissions


When working with analytics, users can have the following roles:
* Author: can view, create, and edit assets.
* Reader: can view assets.

<!--
To give a Back Office user access to analytics, you need to assign one of these roles to them. For instructions, see [Create users]() and [Edit users]().

-->

The analytics roles are derived from Amazon QuickSight and are separate from the [Back Office user roles](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/best-practices-manage-users-and-their-permissions-with-roles-and-groups.html).


## Analyses and dashboards

In Amazon QuickSight, you are going to work with analyses and dashboards.

An analysis is a customizable visual representation of data. Using the provided tools, you can manipulate your data to extract and present the most important information.

Each analysis can contain multiple data visualizations, which can be rearranged and customized.


![QuickSight-analyses]


A dashboard is a representation of data prepared in an analysis. It serves as a published version of data analysis, which can be shared with other users.

![QuickSight-dashboard]


Both analyses and dashboards are shareable, you can share a complete dashboard or collaborate on an analysis.

! QuickSight sharing

You can share dashboards with authors and readers, and analyses – only with authors.

### Default dashboards

For those new to Amazon QuickSight analytics, while you're learning how to create your own dashboards, you can start using the default dashboards right away.

The feature is shipped with the following dashboards.

#### Sales dashboard

* Track sales performance over time
* Gain insights into orders and return rate
* Monitor discounts, product categories, brands
* Monitor the usage of payment and shipping methods

! sales-dashboard

#### Products dashboard

* Track performance of products
* Monitor availability and returns
* Analyze top-selling items, category distribution, and trends in shopping lists and customer carts

! Products-dashboard

#### Customers dashboard

Track the following customer metrics:
* Order number and value
* Registration trends
* Locations
* Demographics

! Customers-dashboard

#### Marketplace dashboard
* Track marketplace performance with insights into merchant status and commission
* Get an overview of merchant orders, products, and offers

! Marketplace-dashboard


## Resetting analytics


Sometimes you might want to start from scratch and get a fresh analytics account. Resetting analytics removes all assets and returns your account to the default state.

!reset-analytics
