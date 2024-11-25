---
title: Amazon QuickSight
description: Amazon QuickSight overview
template: concept-topic-template
last_updated: Oct 24, 2024
---

Amazon QuickSight brings customizable and powerful business intelligence tools to the Back Office. This feature lets you visualize data, create customizable dashboards, and perform deep analytics on sales, product performance, customer behaviors, and marketplace KPIs. By leveraging analytics, you can unlock new monetization opportunities and make more informed business decisions.

Highlights:

* Default dashboards let you start using the feature right away
* Direct access within the Back Office
* Data from your Spryker projects is connected by default
* Highly customizable, offering multiple options to tailor reports & analytics workflows
* Aggregate data across various systems

## Data sources and datasets

This feature supports data from Spryker projects and third-party systems. When you set up Amazon QuickSight, the data from your project is available by default, and you can add other data sources if needed.

![QuickSight-datasets](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/amazon-quicksight.md/qs-data-sets.png)

For more details on data sources, see [Supported data sources](https://docs.aws.amazon.com/quicksight/latest/user/supported-data-sources.html).

### Extending project data for analytics

By looking at datasets, you can see what data from your project is available for analytics. By default, for each dataset, only secure data that can be useful for analytics and is available from a respective database table. For example, the Customer dataset doesn't include customer names or passwords.

You can extend the data available to datasets on the project level. For more details, see [Install Amazon QuickSight]().


### SPICE data

SPICE (Super-fast, Parallel, In-memory Calculation Engine) is a robust in-memory engine used by Amazon QuickSight to calculate and serve data. All data in datasets is store as SPICE data, which has the following advantages:

* Your analytical queries process faster.
* You don't need to wait for a direct query to process.
* Data stored in SPICE can be reused multiple times without incurring additional costs. If you use a data source that charges per query, you're charged for querying the data when you first create the dataset and later when you refresh the dataset.

You can check your SPICE storage capacity in the Back Office > **Analytics** > **Datasets** > **New dataset**.

![sprice-storage](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/amazon-quicksight.md/sprice-storage.png)

For more details on SPICE data, see [Importing data into SPICE](https://docs.aws.amazon.com/quicksight/latest/user/spice.html).

### Refreshing data

To make datasets up to date, you need to refresh them by resyncing data from your project or third-party systems.

You can refresh data manually or automatically by setting up a schedule per data set. We recommend configuring an automatic refresh shortly after you set up Amazon QuickSight.


![refresh-dataset](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/amazon-quicksight.md/refresh-dataset.png)

For instructions, see [Refresh analytics datasets](/docs/pbc/all/business-intelligence/{{page.version}}/amazon-quicksight-third-party-integration/back-office-refresh-analytics-datasets.html).


## Analyses and dashboards

In Amazon QuickSight, you are going to work with analyses and dashboards.

An analysis is a customizable visual representation of data. Using the provided tools, you can manipulate your data to extract and present the most important information.

Each analysis can contain multiple data visualizations, which can be rearranged and customized.


![QuickSight-analyses](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/amazon-quicksight.md/qs-analysis.png)


A dashboard is a representation of data prepared in an analysis. It serves as a published version of data analysis, which can be shared with other users.

![QuickSight-dashboard](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/amazon-quicksight.md/qs-dashboard.png)


Both analyses and dashboards are shareable, you can share a complete dashboard or collaborate on an analysis.

![QuickSight-sharing](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/amazon-quicksight.md/qs-sharing.png)

You can share dashboards with authors and readers, and analyses – only with authors.



## User management and permissions

User roles define what assets a user has access to, including the following:
* Analyses
* Dashboards
* Datasets
* Datasources

When working with analytics, users can have the following roles:
* Author: can view, create, and edit assets.
* Reader: can view dashboards.

The analytics roles are derived from Amazon QuickSight and are separate from the [Back Office user roles](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/best-practices-manage-users-and-their-permissions-with-roles-and-groups.html).

The number of users with different roles depends on your contract.

<!-- To request new users or roles to be updated, contact your Customer Success Manager at [the analytics contact page](https://now.spryker.com/contact-analytics). -->


### Default dashboard

While you're learning how to create your own dashboards, you can start using the default dashboard right away.

The default dashboard contains the following sheets.

#### Sales sheet

* Track sales performance over time
* Gain insights into orders and return rate
* Monitor discounts, product categories, brands
* Monitor the usage of payment and shipping methods

<details>
  <summary>Visuals in the sales sheet</summary>

| Visual                              | Visual Type    |
| ----------------------------------- | -------------- |
| Total Sales                         | KPI            |
| Total Orders                        | Table          |
| Total Canceled                      | KPI            |
| Cancelation Rate                    | Donut chart    |
| Return Rate                         | Donut chart    |
| "Waiting for Return" Order Items    | KPI            |
| Average Fulllment Time in Hours     | KPI            |
| Order Items by Status               | Donut chart    |
| Number of Orders                    | Line chart     |
| Order Value and Discounts           | Bar chart      |
| Average Order Value                 | Bar chart      |
| Average Order Size                  | Bar chart      |
| Applied Discount Value              | Table          |
| Payment Methods                     | Pie chart      |
| Shipping Methods                    | Pie chart      |
| Sales by Top Brands                 | Tree map chart |
| Sales by Product Category           | Donut chart    |
| Sales over time by Product Category | Line chart     |
| Order Item Status by Customer       | Table          |
| Order Items by Status               | Table          |

</details>


#### Products sheet

* Track performance of products
* Monitor availability and returns
* Analyze top-selling items, category distribution, and trends in shopping lists and customer carts

<details>
  <summary>Visuals in the products sheet</summary>

| Visual                                      | Visual Type |
| ------------------------------------------- | ----------- |
| Ratio of Active Concrete Products           | Gauge       |
| Product Availability                        | Pie chart   |
| Top Products Sold by Quantity               | Bar chart   |
| Top Products Sold by Revenue incl. Discount | Bar chart   |
| Top Products Returned by Quantity           | Bar chart   |
| Products per Category                       | Bar chart   |
| Not Active Abstract Products per Category   | Donut chart |
| Top Products in Orders                      | Table       |
| Top Product in Carts of Logged-in Customers | Table       |
| Top Product in Shopping Lists               | Table       |
| Not Available Products                      | Table       |
| Concrete Products                           | Table       |


</details>


#### Customers sheet

Track the following customer metrics:
* Order number and value per customer and B2B company
* Registration trends
* Locations with the most customers


<details>
  <summary>Visuals in the customers sheet</summary>

| Visual                         | Visual Type |
| ------------------------------ | ----------- |
| Number of Customers            | KPI         |
| Customers by Gender            | Pie chart   |
| Number of Active Companies     | Gauge       |
| Customers by Order Value       | Bar chart   |
| Customers by Number of Orders  | Bar chart   |
| Customers by Location          | Map         |
| Customers by Registration Date | Line chart  |
| Companies by Order Value       | Bar chart   |
| Companies by Number of Orders  | Bar chart   |
| Number of Merchants            | KPI         |


</details>

#### Marketplace sheet

* Track marketplace performance with insights into merchant status and commission
* Get an overview of merchant orders, products, and offers

<details>
  <summary>Visuals in the marketplace sheet</summary>

| Visual                                   | Visual Type |
| ---------------------------------------- | ----------- |
| Merchants Waiting for Approval           | Table       |
| Merchant Online Status                   | Pie chart   |
| Total Commissions                        | KPI         |
| Merchants by Order Value                 | Bar chart   |
| Merchants by Number of Orders            | Bar chart   |
| Merchants by Number of Abstract Products | Bar chart   |
| Merchants by Number of Product Offers    | Bar chart   |
| Merchant Product Approval Status         | Donut chart |
| Merchant Product Offer Approval Status   | Donut chart |
| Commission by Merchant                   | Bar chart   |
| Commission by Product Category           | Bar chart   |
| Commission Value                         | Table       |
| Merchant Order Items by Status           | Pie chart   |
| Merchants by Registration Date           | Line chart  |

</details>


## Exporting data


When you need to share analytics data with users outside of Back Office, you can share individual visuals or whole analyses.

For instructions, see the following docs:

* [Exporting data from visuals](https://docs.aws.amazon.com/quicksight/latest/user/exporting-data.html)
* [Exporting Amazon QuickSight analyses or dashboards as PDFs](https://docs.aws.amazon.com/quicksight/latest/user/export-dashboard-to-pdf.html)



## Resetting analytics


Sometimes you might want to start from scratch and get a fresh analytics account. Resetting analytics removes all assets and returns your account to the default state.

Sometimes you might want to start from scratch and get a fresh analytics account.

{% info_block warningBox %}

Resetting analytics returns all default assets to the default state, erasing your changes. This recreates the default assets from scratch.
The user initiating the reset becomes the ownes of the default assets, with all other users losing access to them. All custom assets created by other authors will remain in their ownership.

{% endinfo_block %}

## Next step

[Best practices: working with analytics](/docs/pbc/all/business-intelligence/{{page.version}}/amazon-quicksight-third-party-integration/best-practices-working-with-analytics.html)
