
Spryker Analytics is a powerful business intelligence tool powered by Amazon QuickSight. It's highly customizable and has a lot of tools that can't be covered in one document. This document describes a typical use case and how you can start working with analytics, but doesn't cover all the editing options.

For more insights into creating analyses and dashboards, see [Author Workshop](https://catalog.workshops.aws/quicksight/en-US/author-workshop).

## Prerequisites

[Amazon QuickSight getting started]


## Optional: Back up the default analysis

The Analytics feature is shipped with a default analises that can be useful while you're learning how to create your own. If you need to play around with an existing analisis, we recommend duplicating the default one as follows:

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

![concrete-product-availability]  


### Add one more visual

1. Hover over **Data** and select **Add Dataset**.
2. In the **Choose dataset to add** window, click on **Category + Localized Product Abstract**.
3. Click **Select**
  This shows a success message and the **Datasets in this analysis** window. Click **Close** to close the window.
4. In the toolbar, for **ADD:**, click on visual and select a horizontal bar chart.
This adds an empty visual to the sheet.

![add-visual]()

5. Click on the visual you've added.
6. In the **Data** pane, for **Dataset**, select **Category + Localized Product Abstract**.
7. Add the **name[spy_category_attribute]** as a dimension to the **Y AXIS** section.
8. Add the **sku** field as a measure to the **VALUE** field.

![Visual values] values highlighted

9. Name of the visual is inherited from the fields you've added. To make it presentable, double-click the name.
10. In the **Edit title** window, enter a name for the visual. For example, `Products per category`.
11. To apply the change, click **Save**.
This closes the the window and the new name of the visual is displayed.




## Share the analysis



## Publish analysis as a dashboard



## Share a dashboard

## Using filters
