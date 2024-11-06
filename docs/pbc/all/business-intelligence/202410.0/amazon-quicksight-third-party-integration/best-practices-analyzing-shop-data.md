---
title: "Best practices: Analyzing shop data"
description: Learn how to analyze and present shop data.
last_updated: Oct 24, 2024
template: back-office-user-guide-template
related:
---

Amazon Quicksight is a powerful business intelligence tool. It's highly customizable and has a lot of tools that can't be covered in one document. This document describes a typical use case and how you can start working with analytics, but doesn't cover all the editing options.

For more insights into creating analyses and dashboards, see [Author Workshop](https://catalog.workshops.aws/quicksight/en-US/author-workshop).

## Prerequisites

[Set up Amazon QuickSight](/docs/pbc/all/business-intelligence/202410.0/amazon-quicksight-third-party-integration/set-up-amazon-quicksight.html)


## Optional: Back up the default analysis

The Analytics feature is shipped with a default analysis that can be useful while you're learning how to create your own. If you need to play around with the existing analysis, we recommend duplicating the default one as follows:

1. In the Back Office, go to **Analytics**.
2. On the **Analytics** page, click **Analyses**.
3. Click on **MASTER Analysis**.
4. On the page of the analysis, click **File**>**Save as Analysis**.
5. In the **Save a copy** window, enter an **Analysis name**.
6. Click **SAVE**.
  This duplicates the analysis and opens it. Now you can safely play around with this duplicate or the original analysis.  



## Refresh data

In this example, you're going to create an analysis with product availability data. Because availability is constantly changing, it's important for data to be up to date.

To refresh product related datasets, do the following:
1. On the **Analytics** page, go to **Datasets**.
2. In the **Datasets** section, click on the **Product Concrete Availability** dataset.
  This opens the dataset's details.
3. Click the **Refresh** tab.
4. Click **REFRESH NOW**.
5. In the **Refresh type** window, select **Full refresh**.
6. In the **Confirm refresh** window, click **REFRESH**
  This refreshes the page. A new refresh entry is displayed in the **History** pane. You can check the status of the refresh in the **Status** column.
7. To go back to the list of datasets, cilck **< Datasets**.
8. Repeat steps 2-7 for all the other product datasets, like **Product Concrete + Store**

Now the data is fresh and you can use it to create an anlysis.


## Create an analysis

Analysis is basically a visualization of data in your datasets. To create one, follow the steps:

1. On the **Analytics** page, go to **Analyses**.
2. In the **Analyses** section, click **New analysis**.
3. In the **Your Datasets** section, click on the **Order Totals (Custom SQL)** dataset.
  This opens the dataset's details.
4. Click **USE IN ANALYSIS**.
  This creates an analysis called **Order Totals (Custom SQL)** with one visual.

### Edit the visual

In this example, you're going to create a product availability visual:

1. To select the visual, click on it.
2. In the **Data** pane, click on **Availability**.
  This highlights the field and adds its data to the visual.
3. In **Visuals** select the pie chart.
  This shows the data as a pie chart.

![concrete-product-availability](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/best-practices-analyzing-shop-data.md/concrete-product-availability.png)


### Add one more visual

1. Go to **Data** > **Add Dataset**.
2. In the **Choose dataset to add** window, click on **Category + Localized Product Abstract**.
3. Click **Select**
  This shows a success message and the **Datasets in this analysis** window. Click **Close** to close the window.
4. In the **Visuals** pane, click **+ADD**.
This adds an empty visual to the sheet.
5. Click on the visual you've added.
6. In the **Data** pane, for **Dataset**, select **Category + Localized Product Abstract**.
7. Add the **name[spy_category_attribute]** as a dimension to the **Y AXIS** section.
8. Add the **sku** field as a measure to the **VALUE** field.

![product-per-category](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/best-practices-analyzing-shop-data.md/product-per-category.png)

9. Name of the visual is inherited from the fields you've added. To make it presentable, double-click the name.
10. In the **Edit title** window, enter a name for the visual. For example, `Products per category`.
11. To apply the change, click **Save**.

This closes the the window and the new name of the visual is displayed.

Now you know how to add data and format it in different ways. For more information on how to create analyses, see [Author Workshop](https://catalog.workshops.aws/quicksight/en-US/author-workshop).


## Add filters

1. In the toolbar, click the filter button.

2. In the **Filters** pane, click **+ ADD** and select **store**.
  This adds the filter to the pane.
3. To edit the filter, click on it.
4. To apply the filter to all the visual in the sheet, for **Applied to**, select **Single sheet**.
5. To add filter controls, click the three dots next to the filter and select **Add control**>**Top of this sheet**.
  This adds the filter controls to the top of the sheet.

![store-filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/best-practices-analyzing-shop-data.md/store-filter.png)  


## Share the analysis

If you want another author to collaborate with you on the analysis, you can share it.

To share an analysis, follow the steps:

1. On the page of the analysis, go to **File** > **Share**.
2. In the **Share analysis**, enter and select the email address of the author to share the analysis with.
  This displays the user in the table.
3. Repeat the previous step until you've added all the authors you want to share the analysis with.
4. Click **Share**
  This closes the window. The added users can now edit the analysis.

{% info_block infoBox "Manage permissions" %}

You can check and manage permissions of all users to an analysis in **File**>**Share**>**Manage analysis permissions**.

{% endinfo_block %}




## Publish analysis as a dashboard and share

Most of your analytics users will have view permissions. When you're ready to share the analysis with a wider audience, you need to publish it as a dashboard. Users with view permissions can access only dashboards.

To publish and share a dashboard, follow the steps:

1. To publish a dashboard, on the page of an analysis click **PUBLISH**.
2. For **Publish new dashboard as**, enter a name for the dashboard.
3. To confirm, click **Publish dashboard**.
  This publisher the dashboard and opens its page.

![published-dashboard](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/business-intelligence/amazon-quicksight-third-party-integration/best-practices-analyzing-shop-data.md/published-dashboard.png)

4. To share the dashboard, in the top-right corner, click the share icon and select **Share dashboard**.
  This opens the **Share dashboard** page.
5. In the **Invite users and groups to dashboard** pane, start entering the email address of a user.
  This shows users with matching email addresses as you're typing.
6. Next to the needed user, click **ADD** and select the permissions to assign to them.
  This shows the user in the **Manage permissions** pane with the permissions you've assigned.


## Conclusion

In this guide, you've followed a typical user journey of creating, collaborating, and presenting data in a meaningful way. Now you can play around with these tools or learn by following [Author Workshop](https://catalog.workshops.aws/quicksight/en-US/author-workshop).
