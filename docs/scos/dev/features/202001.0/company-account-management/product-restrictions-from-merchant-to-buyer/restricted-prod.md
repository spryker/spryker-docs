---
title: Restricted Products Behavior
originalLink: https://documentation.spryker.com/v4/docs/restricted-products-behavior
redirect_from:
  - /v4/docs/restricted-products-behavior
  - /v4/docs/en/restricted-products-behavior
---

On this page, you can find commonly encountered cases of product restrictions behavior.
<table cellspacing="0">
   <thead>
      <tr>
         <td>Name</td>
         <td>Blacklist/Whitelist</td>
         <td>Description</td>
         <td>Example</td>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td rowspan="6">Product Catalog</td>
         <td rowspan="2">Blacklist</td>
         <td>
            <p>If the merchant relation has a blacklist, all buyers in the associated business units can not interact with any products from the blacklist. The blacklisted products are excluded from view, search, existing lists and carts. If the category is a part of a blacklist, it is greyed out in the shop navigation, however, you can change this setting on the project level so, for example, that the category is not greyed out.</p>
            <p>All products assigned to a category are also included in the black/white list.</p>
         </td>
         <td> 
            <img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/categories-blacklist.png" alt="" />
            <p>In case the products are added to the category after it was included in a list, it is reflected after some time with the help of <a href="https://documentation.spryker.com/architecture_concepts/publish_and_synchronization/publish-and-synchronization.htm">publish &amp; sync</a> process.</p>
         </td>
      </tr>
      <tr>
         <td>Upon entering the direct link for the blacklisted product, the shop visitor will see <em>404 Not found</em> page.</td>
         <td><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/404-not-found-blacklisted-product.png" alt="" /></td>
      </tr>
      <tr>
         <td>Whitelist</td>
         <td>If the merchant relation has a whitelist, all buyers in the associated business units can interact only with the whitelisted products, except if they are also blacklisted. If a category is not part of any whitelist (if a whitelist exists), they are greyed out in navigation (you can also change this setting on the project level so, for example, that category is not greyed out).</td>
         <td><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/categories-whitelist.png" alt="" /></td>
      </tr>
      <tr>
         <td>Blacklist and Whitelist</td>
         <td>If a product is in a whitelist as well as in a blacklist, Blacklist wins.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>Neither blacklist nor whitelist</td>
         <td>If a merchant relation has neither black nor whitelist, all associated business units will not have any product restrictions.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>Multiple categories</td>
         <td>In case a product is a part of multiple categories and one category is a part of a list, the product is also a part of that list.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>Shopping cart</td>
         <td>Blacklist</td>
         <td>In case the products that already exist in carts get blacklisted, they are automatically removed from the cart.</td>
         <td><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/blacklisted-product-in-cart.png" alt="" /></td>
      </tr>
      <tr>
         <td>
            <p>Reorder</p>
         </td>
         <td>
            <p>Blacklist</p>
         </td>
         <td>
            <p>During the <a href="https://documentation.spryker.com/capabilities/order_management/reorder.htm">reorder</a> process, products that are restricted but exist in a previous order are automatically removed from the cart.</p>
         </td>
         <td>
            <p><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/reorder-blacklist.png" alt="" /></p>
            <p>In the Order History, the customer is still able to see the order details even if the previously ordered items are currently blacklisted.</p>
         </td>
      </tr>
      <tr>
         <td>
            <p>Shopping List</p>
         </td>
         <td>
            <p>Blacklist</p>
         </td>
         <td>
            <p>If the product, that is added to the shopping list, has been blacklisted, it is displayed as if it is unavailable.</p>
         </td>
         <td>
            <p><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/blacklisted-prodiuct-in-shopping-list.png" alt="" /></p>
         </td>
      </tr>
      <tr>
         <td>
            <p>Alternative products</p>
         </td>
         <td>
            <p>Blacklist</p>
         </td>
         <td>
            <p>If a product that has been added to a list of the alternative products, is restricted, it is not suggested on product pages.</p>
         </td>
         <td>
            <p><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/alternative-product-blacklisted.png" alt="" /></p>
         </td>
      </tr>
      <tr>
         <td>
            <p>Product Groups</p>
         </td>
         <td>
            <p>Blacklist</p>
         </td>
         <td>
            <p>If any of the products that are added to a product group, is restricted, it is not displayed in the Shop Application.</p>
         </td>
         <td>
            <p><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/product-groups-blacklisted.png" alt="" /></p>
         </td>
      </tr>
      <tr>
         <td>
            <p>Related Products</p>
         </td>
         <td>
            <p>Blacklist</p>
         </td>
         <td>
            <p>If any of the related products is added to a blacklist - it is not displayed in the Shop Application.</p>
         </td>
         <td>
            <p><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/related-product-blacklist.png" alt="" /></p>
         </td>
      </tr>
      <tr>
         <td rowspan="2">
            <p>Product Sets</p>
         </td>
         <td>
            <p>Whitelist</p>
         </td>
         <td>
            <p>In case any of the products in the product set are added to a whitelist - the other products are not displayed in the shop application.</p>
         </td>
         <td>
            <p><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/product-set-whitelist.png" alt="" /></p>
         </td>
      </tr>
      <tr>
         <td>
            <p>Blacklist</p>
         </td>
         <td>
            <p>In the case with the blacklist, when the whole product set is blacklisted - <em>This product is not available</em> message is shown on the product detail page, though the product set is still displayed on the <em>Product Sets</em> page.</p>
         </td>
         <td>
            <p><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/product-set-blacklisted.png" alt="" /></p>
         </td>
      </tr>
      <tr>
         <td>
            <p>CMS</p>
         </td>
         <td>
            <p>Blacklist</p>
         </td>
         <td>
            <p>If the products from CMS block have been added to a blacklist - they are not displayed on the website.</p>
         </td>
         <td>
            <p><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/cms-blacklisted.png" alt="" /></p>
         </td>
      </tr>
      <tr>
         <td>
            <p>Promotional Products</p>
         </td>
         <td>
            <p>Blacklist</p>
         </td>
         <td>
            <p>If any of the promotional products are restricted, they are not available for purchase.</p>
            <p>If all the variants for a promotional product are restricted - the restricted product is not shown at all.</p>
         </td>
         <td>
            <p><img title="Click Me!" src="https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/promotional-products-blacklist.png" alt="" /></p>
         </td>
      </tr>
      <tr>
         <td>
            <p>Product Bundles</p>
         </td>
         <td>
            <p>Blacklist</p>
         </td>
         <td>
            <p>If you want to restrict the whole product bundle, a bundle SKU needs to be entered in the blacklist rule. If any of the products contained in a product bundle are restricted, the whole bundle is still available for purchase.</p>
         </td>
         <td></td>
      </tr>
      <tr>
         <td>
            <p>Business on Behalf</p>
         </td>
         <td>
            <p>Blacklist/Whitelist</p>
         </td>
         <td>
            <p>When switching Company User accounts by using the Business on Behalf feature a company user has the product restrictions lists that are assigned to the new company user they are logged in into.</p>
         </td>
         <td>
            <p>N/A</p>
         </td>
      </tr>
      <tr>
         <td>
            <p>Product search widget</p>
         </td>
         <td>
            <p>Blacklist</p>
         </td>
         <td>
            <p>If there are products that are blacklisted, they do not appear in search results in the search widget.</p>
         </td>
         <td>
            <p>[An image showing a restricted product in the Admin Interface and searching for this product in Yves]</p>
         </td>
      </tr>
   </tbody>
</table>

{% info_block infoBox %}
If there are cases you would like to get overview of within Product Restrictions feature, email us.
{% endinfo_block %}
