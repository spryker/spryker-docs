---
title: CMS Widget Overview
originalLink: https://documentation.spryker.com/v2/docs/cms-widget-overview-201903
redirect_from:
  - /v2/docs/cms-widget-overview-201903
  - /v2/docs/en/cms-widget-overview-201903
---

The CMS Widget feature allows shop administrators to manage content on a CMS, category or product pages from the content widget menu in the Administration interface.

With the feature integrated, the content widget menu with available widgets will appear in the Edit Placeholders page under the CMS pages menu. The widgets can include:

* chart
* product
* product_set
* product_group
* cms_file
* cms_block.

{% info_block warningBox %}
Keep in mind that some widgets require additional features to be enabled for the project. See the [CMS Widget](/docs/scos/dev/features/201903.0/cms/cms-widget/cms-widget
{% endinfo_block %} for more details.)

Say a shop administrator wants to customize a list of products on a CMS page. To do this, the CMS product widget should be used. With the **chart widget**, it is possible to show data charts built on the defined sections of the CMS page or block. The **product set** widget will add a collection of multiple products from which your customers can select an individual product or add all products in bulk to the cart with a single click. The **product group** widget will display products as a list or grid that will be connected by a specific attribute, for example, size or color. Using the **cms_file** widget will add a download link containing a file, tutorial, guide or video.

With **cms_block** widgets, you can add some content or insert banners to promote your advertising campaigns or activities.

![widgets-menu.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/CMS+Widget/CMS+Widget+Overview/widgets-menu.png){height="" width=""}

In the Admin UI, a shop administrator can simply add a content widget responsible for a particular content by selecting a respective widget. This will insert a widget template such as `{% raw %}{{{% endraw %} function name (['identifier']) {% raw %}}}{% endraw %}` where you need to replace a function name with a respective content widget and enter a parameter instead of the identifier. Parameters differ depending on the widget you use. See the CMS Widget to learn more how to add a widget to a CMS page in the Administration Interface.

After the widget is added and changes are kept and published, they appear in the shop application. For example, this is how the `product_set` widget is displayed.

![product-set-widget-zed.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/CMS+Widget/CMS+Widget+Overview/product-set-widget-zed.png){height="" width=""}

<!-- Last review date: Mar 4, 2019 -- by Yuliia Boiko -->
