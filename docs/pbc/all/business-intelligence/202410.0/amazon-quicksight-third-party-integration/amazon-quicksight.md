---
title: Amazon QuickSight
description: Amazon QuickSight overview
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/business-intelligence/latest/amazon-quicksight-third-party-integration/amazon-quicksight.html
last_updated: Oct 24, 2024
---

Amazon QuickSight brings customizable and powerful business intelligence tools to the Back Office. This feature lets you visualize data, create customizable dashboards, and perform deep analytics on sales, product performance, customer behaviors, and marketplace KPIs. By leveraging analytics, you can unlock new monetization opportunities and make more informed business decisions.

Highlights:

- Default dashboards let you start using the feature right away
- Direct access within the Back Office
- Data from your Spryker projects is connected by default
- Highly customizable, offering multiple options to tailor reports & analytics workflows
- Aggregate data across various systems

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/amazon-quicksight.md/Amazon+QuickSight+Demo.mp4" type="video/mp4">
  </video>
</figure>



## Data sources and datasets

This feature supports data from Spryker projects and third-party systems. When you set up Amazon QuickSight, the data from your project is available by default, and you can add other data sources if needed.

![QuickSight-datasets](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/amazon-quicksight.md/qs-data-sets.png)

For more details on data sources, see [Supported data sources](https://docs.aws.amazon.com/quicksight/latest/user/supported-data-sources.html).

### Extending project data for analytics

Datasets represent the data from your project that's available for analytics. By default, only the data that is secure and can be useful for analytics is available in datasets from respective database tables. For example, the Customer dataset doesn't include customer names or passwords.

You can extend the data available to datasets on the project level. For more details, see [Install Amazon QuickSight](/docs/pbc/all/business-intelligence/{{page.version}}/amazon-quicksight-third-party-integration/install-amazon-quicksight.html).


### SPICE data

SPICE (Super-fast, Parallel, In-memory Calculation Engine) is a robust in-memory engine used by Amazon QuickSight to calculate and serve data. All data in datasets is stored as SPICE data, which has the following advantages:

- Your analytical queries process faster.
- You don't need to wait for a direct query to process.
- Data stored in SPICE can be reused multiple times without incurring additional costs. If you use a data source that charges per query, you're charged for querying the data when you first create the dataset and later when you refresh the dataset.

You can check your SPICE storage capacity in the Back Office > **Analytics** > **Datasets** > **New dataset**.

![sprice-storage](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/amazon-quicksight.md/sprice-storage.png)

For more details on SPICE data, see [Importing data into SPICE](https://docs.aws.amazon.com/quicksight/latest/user/spice.html).

### Refreshing data

To make datasets up to date, you need to refresh them by resyncing data from your project or third-party systems.

You can refresh data manually or automatically by setting up a schedule per data set. We recommend configuring an automatic refresh shortly after you set up Amazon QuickSight.


![refresh-dataset](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/amazon-quicksight.md/refresh-dataset.png)

For instructions on refreshing data, see [Refresh analytics datasets](/docs/pbc/all/business-intelligence/{{page.version}}/amazon-quicksight-third-party-integration/back-office-refresh-analytics-datasets.html).


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
- Analyses
- Dashboards
- Datasets
- Data sources

When working with analytics, users can have the following roles:
- Author: can view, create, and edit assets.
- Reader: can view dashboards.

The analytics roles are derived from Amazon QuickSight and are separate from the [Back Office user roles](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/best-practices-manage-users-and-their-permissions-with-roles-and-groups.html).

The number of users with different roles depends on your contract.

<!-- To request new users or roles to be updated, contact your Customer Success Manager at [the analytics contact page](https://now.spryker.com/contact-analytics). -->


### Default dashboard

While you're learning how to create your own dashboards, you can start using the default dashboard right away.

The default dashboard contains the following sheets.

#### Sales sheet

- Track sales performance over time
- Gain insights into orders and return rate
- Monitor discounts, product categories, brands
- Monitor the usage of payment and shipping methods

<details>
  <summary>Visuals in the sales sheet</summary>

  | Visual                              | Visual Type    | Business Value                                                                                                                                                                      | Actionable Insight                                                                                                                     |
  | ----------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
  | Total Sales                         | KPI            | Indicates overall business revenue and helps track growth or identify trends.                                                                                                       | Track overall revenue trends. If growth slows, evaluate pricing strategies, marketing efforts, or product performance.                 |
  | Total Orders                        | Table          | Reflects customer activity and signals demand and operational performance.                                                                                                          | Monitor order volume to measure demand. Sudden changes may indicate issues with pricing, stock availability, or competition.           |
  | Total Canceled                      | KPI            | Quantifies the financial loss because of order cancellations, helping assess the monetary impact of cancellations and identify trends or root causes                                    | Analyze canceled order trends to identify common causes like shipping delays or inventory shortages and take corrective action.        |
  | Cancelation Rate                    | Donut chart    | Reveals issues in inventory, delivery, or customer decision-making.                                                                                                                 | Investigate and reduce factors causing high cancellation rates, such as unclear product descriptions or lack of customer support.      |
  | Return Rate                         | Donut chart    | Highlights product quality or customer dissatisfaction issues.                                                                                                                      | Identify patterns in high return rates and address them by improving product quality, descriptions, or customer expectations.          |
  | "Waiting for Return" Order Items    | KPI            | Tracks pending returns, aiding better inventory and refund management.                                                                                                              | Monitor pending returns to ensure timely processing and better inventory management.                                                   |
  | Average Fulllment Time in Hours     | KPI            | Measures operational efficiency and impacts customer satisfaction.                                                                                                                  | Reduce fulfillment times by streamlining logistics, optimizing warehouse operations, or enhancing coordination with shipping partners. |
  | Order Items by Status               | Donut chart    | Provides insight into order processing and highlights bottlenecks.                                                                                                                  | Identify bottlenecks in order processing and implement targeted solutions to streamline the fulfillment pipeline.                      |
  | Number of Orders                    | Line chart     | Provides a visual representation of order trends over time, helping identify seasonality, promotional effectiveness, or shifts in customer demand.                                  | Use order volume trends to assess promotional effectiveness or customer demand across periods.                                         |
  | Order Value and Discounts           | Bar chart      | Tracks revenue per order while accounting for promotional costs.                                                                                                                    | Evaluate the financial impact of discounts on revenue. Adjust promotional strategies if discounts are eroding margins excessively.     |
  | Average Order Value                 | Bar chart      | Indicates customer spending per order, revealing purchasing behavior.                                                                                                               | Boost average order value through upselling, bundling, or offering free shipping thresholds.                                           |
  | Average Order Size                  | Bar chart      | Reflects the number of items per order, showing cross-sell or upsell effectiveness.                                                                                                 | Monitor the number of items per order. Encourage customers to add more products through cross-sell campaigns or discounts.             |
  | Applied Discount Value              | Table          | Assesses the financial impact of discounts and promotional campaigns.                                                                                                               | Assess the effectiveness of discounts. Focus on high-impact promotions that drive sales without significantly reducing profitability.  |
  | Payment Methods                     | Pie chart      | Provides insights into customer payment preferences, aiding optimization.                                                                                                           | Analyze customer payment preferences to optimize checkout processes and ensure support for popular payment options.                    |
  | Shipping Methods                    | Pie chart      | Tracks delivery preferences, helping improve logistics offerings.                                                                                                                   | Adjust shipping options based on customer preferences to improve conversion rates and satisfaction.                                    |
  | Sales by Top Brands                 | Tree map chart | Identifies high-performing brands for inventory and marketing optimization.                                                                                                         | Promote high-performing brands and focus marketing efforts on increasing visibility for underperforming brands with potential.         |
  | Sales by Product Category           | Donut chart    | Highlights popular categories to adjust product strategies.                                                                                                                         | Refine product category offerings by investing in high-performing categories and reassessing the strategy for underperforming ones.    |
  | Sales over time by Product Category | Line chart     | Reveals seasonal trends and demand fluctuations per category.                                                                                                                       | Identify seasonal trends and plan inventory, marketing, and promotions accordingly to maximize sales during peak times.                |
  | Order Item Status by Customer       | Table          | Identifies issues or patterns related to specific customers.                                                                                                                        | Monitor customer-specific order issues to provide personalized support and improve satisfaction for at-risk customers.                 |
  | Order Items by Status               | Table          | Tracks the processing stages, such as pending, shipped, or delivered, of individual items, enabling identification of bottlenecks, delays, or inefficiencies in the fulfillment process. | Evaluate operational efficiency and resolve delays at specific stages of the fulfillment process, like packing or shipping.            |

</details>


#### Products sheet

- Track performance of products
- Monitor availability and returns
- Analyze top-selling items, category distribution, and trends in shopping lists and customer carts

<details>
  <summary>Visuals in the products sheet</summary>

  | Visual                                      | Visual Type | Business Value                                                                                       | Actionable Insight                                                                                                                                               |
  | ------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Ratio of Active Concrete Products           | Gauge       | Ensures a high percentage of available products for sale, reducing missed revenue opportunities.     | Monitor the ratio to ensure sufficient product availability. If low, focus on reactivating inactive products or onboarding new inventory.                        |
  | Product Availability                        | Pie chart   | Tracks inventory health, minimizing out-of-stock situations.                                         | Identify products frequently out of stock and improve inventory management or supplier reliability to reduce missed sales.                                       |
  | Top Products Sold by Quantity               | Bar chart   | Identifies bestsellers for marketing and inventory focus.                                            | Focus marketing campaigns and inventory prioritization on high-demand products to maximize revenue and customer satisfaction.                                    |
  | Top Products Sold by Revenue incl. Discount | Bar chart   | Highlights high-revenue products, factoring in discount impact.                                      | Assess the effectiveness of discounts in driving revenue. Use insights to refine pricing and promotional strategies for top-selling items.                       |
  | Top Products Returned by Quantity           | Bar chart   | Uncovers quality issues or customer dissatisfaction with specific products.                          | Investigate reasons for high return rates, such as quality or misaligned customer expectations, and address them through better quality control or descriptions. |
  | Products per Category                       | Bar chart   | Evaluates category diversity and completeness.                                                       | Ensure balanced category distribution. If certain categories are underrepresented, encourage merchants to expand their catalog.                                  |
  | Not Active Abstract Products per Category   | Donut chart | Flags inactive products for inventory optimization.                                                  | Identify inactive product categories and either reactivate or phase out underperforming categories to optimize the catalog.                                      |
  | Top Products in Orders                      | Table       | Identifies frequently purchased products for cross-selling.                                          | Highlight frequently ordered items to create bundling opportunities or improve marketing efforts for similar products.                                           |
  | Top Product in Carts of Logged-in Customers | Table       | Helps target marketing campaigns for high-interest products.                                         | Target cart abandonment campaigns with discounts or reminders for high-interest products to convert these into purchases.                                        |
  | Top Product in Shopping Lists               | Table       | Tracks potential future purchases for upselling opportunities.                                       | Use shopping list data to anticipate future demand and strategically adjust inventory or pricing for these products.                                             |
  | Not Available Products                      | Table       | Highlights inventory gaps, reducing potential lost sales.                                            | Track unavailable products to minimize stockouts. Work with suppliers to ensure critical items are consistently in stock.                                        |
  | Concrete Products                           | Table       | Shows the table with concrete products to improve the user experience working with the product data. | Monitor the performance and availability of specific SKUs. Focus on optimizing inventory for high-performing or trending products.                               |


</details>


#### Customers sheet

Track the following customer metrics:
- Order number and value per customer and B2B company
- Registration trends
- Locations with the most customers


<details>
  <summary>Visuals in the customers sheet</summary>

  | Visual                         | Visual Type | Business Value                                                       | Actionable Insight                                                                                                                                        |
  | ------------------------------ | ----------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Number of Customers            | KPI         | Reflects overall reach and customer base growth.                     | Track customer base growth over time. If growth is slow, reassess marketing strategies or loyalty programs to attract and retain more customers.          |
  | Customers by Gender            | Pie chart   | Provides demographic insights for targeted marketing.                | Use gender distribution to refine marketing campaigns and product offerings tailored to your primary customer demographic.                                |
  | Number of Active Companies     | Gauge       | Tracks engagement in B2B scenarios.                                  | Identify inactive business accounts and implement engagement campaigns, such as B2B-specific discounts or targeted outreach.                              |
  | Customers by Order Value       | Bar chart   | Identifies high-value customers for loyalty or premium services.     | Focus retention efforts and exclusive promotions on high-value customers to maximize lifetime value and build loyalty.                                    |
  | Customers by Number of Orders  | Bar chart   | Reveals repeat customers and opportunities for retention strategies. | Identify repeat customers and design loyalty programs or personalized discounts to further encourage frequent purchases.                                  |
  | Customers by Location          | Map         | Helps focus regional marketing or logistical optimization.           | Optimize regional marketing efforts and shipping logistics by identifying high-demand areas. Consider expanding offerings in underserved regions.         |
  | Customers by Registration Date | Line chart  | Tracks acquisition trends over time.                                 | Analyze customer acquisition trends over time. Use insights to replicate successful campaigns or refine acquisition strategies during low-growth periods. |
  | Companies by Order Value       | Bar chart   | Identifies top B2B clients for strategic relationship building.      | Develop tailored relationship strategies for high-value business customers, such as personalized account management or premium service options.           |
  | Companies by Number of Orders  | Bar chart   | Highlights active business clients for retention efforts.            | Identify frequently ordering businesses and offer incentives like volume discounts or preferred shipping rates to enhance retention.                      |


</details>

#### Marketplace sheet

- Track marketplace performance with insights into merchant status and commission
- Get an overview of merchant orders, products, and offers

<details>
  <summary>Visuals in the marketplace sheet</summary>

  | Visual                                   | Visual Type | Business Value                                                                                                                                                  | Actionable Insight                                                                                                                                               |
  | ---------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Number of Merchants                      | KPI         | Tracks marketplace growth and merchant diversity.                                                                                                               | Monitor the growth of marketplace participants. If growth is stagnant, adjust merchant acquisition strategies or improve onboarding experiences.                 |
  | Merchants Waiting for Approval           | Table       | Helps streamline onboarding processes.                                                                                                                          | Identify bottlenecks in the approval process and implement faster verification workflows or automate routine checks to reduce delays.                            |
  | Merchant Online Status                   | Pie chart   | Monitors merchant activity for marketplace health.                                                                                                              | Track inactive merchants and deploy reactivation campaigns, offering incentives, training, or reminders to encourage engagement.                                 |
  | Total Commissions                        | KPI         | Measures revenue generated from marketplace commissions.                                                                                                        | Regularly evaluate commission policies to ensure profitability while remaining competitive. Use trends to forecast future marketplace earnings.                  |
  | Merchants by Order Value                 | Bar chart   | Identifies high-performing merchants for partnerships.                                                                                                          | Identify high-performing merchants and provide exclusive benefits like marketing support or reduced commissions to strengthen partnerships.                      |
  | Merchants by Number of Orders            | Bar chart   | Highlights active merchants for retention and optimization.                                                                                                     | Assist low-order-volume merchants by providing sales analytics, customer behavior insights, or promotional opportunities.                                        |
  | Merchants by Number of Abstract Products | Bar chart   | Reflects inventory diversity per merchant.                                                                                                                      | Encourage merchants with low product counts to expand their offerings, providing tools or guides to simplify product listing.                                    |
  | Merchants by Number of Product Offers    | Bar chart   | Indicates competitive variety offered by merchants.                                                                                                             | Analyze product diversity trends. Support merchants with fewer offers to list more products, enhancing marketplace variety.                                      |
  | Merchant Product Approval Status         | Donut chart | Tracks pending product approvals to maintain catalog health.                                                                                                    | Accelerate approval workflows by standardizing guidelines or automating common checks, ensuring products go live quicker.                                        |
  | Merchant Product Offer Approval Status   | Donut chart | Ensures timely processing of merchant offers.                                                                                                                   | Optimize product offer review processes to reduce delays, helping merchants stay competitive and responsive to customer demands.                                 |
  | Commission by Merchant                   | Bar chart   | Tracks individual merchant contribution to revenue.                                                                                                             | Use commission data to segment merchants and offer performance-based incentives or support to underperforming merchants.                                         |
  | Commission by Product Category           | Bar chart   | Highlights lucrative categories for commission revenue.                                                                                                         | Identify high-commission categories and prioritize them in marketing efforts. Consider adjusting commission rates for underperforming categories to drive sales. |
  | Commission Value                         | Table       | Monitors overall commission revenue health.                                                                                                                     | Analyze trends in commission growth or decline to identify risks or opportunities. Adjust commission structures to balance revenue and merchant satisfaction.    |
  | Merchant Order Items by Status           | Pie chart   | Tracks merchant-specific order fulfillment performance.                                                                                                         | Detect fulfillment issues, such as pending or delayed items, by merchant and address them with process optimizations or additional support.                        |
  | Merchants by Registration Date           | Line chart  | Visualizes the rate of merchant onboarding over time, helping assess growth trends, evaluate marketing efforts, and identify periods of high or low engagement. | Assess periods of high registration to replicate successful campaigns. Address periods of low sign-ups by analyzing and resolving barriers.                      |

</details>


## Exporting data


When you need to share analytics data with users outside of Back Office, you can export individual visuals or whole analyses.

For instructions, see the following docs:

- [Exporting data from visuals](https://docs.aws.amazon.com/quicksight/latest/user/exporting-data.html)
- [Exporting Amazon QuickSight analyses or dashboards as PDFs](https://docs.aws.amazon.com/quicksight/latest/user/export-dashboard-to-pdf.html)



## Resetting analytics


Sometimes you might want to start from scratch and get a fresh analytics account. Resetting analytics removes all assets and returns your account to the default state.

{% info_block warningBox %}

- Resetting Analytics returns all default assets, such as dashboards, analyses, and datasets, to their original state, erasing any changes you've made.
- The user performing the reset becomes the owner of the default assets, and all other users lose access to them.
- Custom assets created by other users remain under their ownership.
- Custom analyses will lose access to the default datasets. If the default datasets are used in custom analyses, duplicate the datasets and configure the analyses to use the copies. For instructions, see [Duplicating datasets](https://docs.aws.amazon.com/quicksight/latest/user/duplicate-a-data-set.html).

{% endinfo_block %}

## Next step

[Best practices: working with analytics](/docs/pbc/all/business-intelligence/{{page.version}}/amazon-quicksight-third-party-integration/best-practices-working-with-analytics.html)
