---
title: Using FACT-Finder search
description: FACT-Finder suggests error-tolerant on-site search. FACT-Finder delivers relevant results even when spelling errors and typos occur.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/search-factfinder-search
originalArticleId: 4d1987e5-ae5c-4884-84ae-d5bc2eaa99a6
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202108.0/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search.html
  - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search.html
  - /docs/scos/dev/technology-partner-guides/202212.0/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search.html
  - /docs/scos/dev/technology-partner-guides/202311.0/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search.html
related:
  - title: Installing and configuring FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder.html
  - title: Integrating FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/integrating-fact-finder.html
  - title: Installing and configuring FACT-Finder web components
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder-web-components.html
  - title: Using FACT-Finder campaigns
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-campaigns.html
  - title: Exporting product data for FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/exporting-product-data-for-fact-finder.html
  - title: Using FACT-Finder recommendation engine
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-recommendation-engine.html
  - title: Using FACT-Finder tracking
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-tracking.html
  - title: Using FACT-Finder search suggestions
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search-suggestions.html
---

## Prerequisites

FACT-Finder suggests error-tolerant on-site search. The online shop's search function is its most powerful sales tool.

FACT-Finder delivers relevant results even when spelling errors and typos occur.

## Usage

By default, you can use the `/fact-finder` route to see an example catalog page. Another option is to use FactFinderSdk module client to request FACT-Finder API. All parameters from `GET` request will be sent to the FACT-Finder API.

As a response, you'll receive a `FactFinderSdkSearchResponseTransfer` object that contains data, after search navigation, bread crumbs, paging.

Basic parameters:

* `query` - The search term indicates the term or phrase that is to be used to search in the FACT- Finder database.
* `channel` -  If your search environment consists of multiple channels, you can define  what channel to search here. If no channel is specified, the first channel in the channel list is used.
* `page` -  If a search result contains many results, they will be divided into pages. It limits the amount of data that has to be sent in one go. You can indicate what page should be returned. Page numbering starts with 1.
* `productsPerPage` - In the FACT-Finder Management Interface, you can define the number of results that will be returned on a page by default. To change the number, you can set it with this parameter.
* `sort` - By default, the result that is returned has been sorted for relevance. However, you can specify a different sort order here.
* `filter` - When a filter parameter is sent to FACT-Finder, the Search engine only returns results that correspond to the filter indicated.
* `searchField` -  Normally FACT-Finder searches all fields defined as searchable. However, it's possible to search only one specific field as well.
* `noArticleNumberSearch` - Normally an article number search is carried out if the search term matches one or more set formats. You can also use parameters to prevent an article number search from being carried out.
* `sid` - Session ID.
* `useAsn` - Controls whether or not the ASN (after-search navigation block) is created.
* `useFoundWords` - FACT-Finder is able to return the words that were used to find the data record for the located records.
* `useCampaigns` - If you want to prevent the Campaign Manager from checking whether the search query matches a campaign, use this parameter.
* `navigation` - FACT-Finder can also replicate your entire shop navigation.
* `idsOnly` - The result normally contains all field information about the products that have been found.
* `generateAdvisorTree` - This parameter is used in conjunction with advisor campaigns.
* `disableCache` - This parameter controls whether or not the search result cache is used.
* `followSearch` - The parameter is automatically attached to all follow-up parameter sets of a search result. The parameter must not be passed on initial requests.
* `usePersonalization` - Allows the activation / deactivation of the queries personalization.
* `useSemanticEnhancer` - Allows activation / deactivation of the semantic enhancement of queries.
* `useAso` - Allows the activation / deactivation of the automatic search optimization.

Controller example:

**Code sample**

 ```php
<?php

...

 /**
 * @param \Symfony\Component\HttpFoundation\Request $request
 *
 * @return array
 */
 public function indexAction(Request $request)
 {
 $factFinderSearchRequestTransfer = new FactFinderSdkSearchRequestTransfer();
 $requestArray = $request->query->all();

 $factFinderSearchRequestTransfer->setRequest($requestArray);

 $ffSearchResponseTransfer = $this->getFactory()
 ->getFactFinderClient()
 ->search($factFinderSearchRequestTransfer);

 if ($ffSearchResponseTransfer->getCampaignIterator()->getHasRedirect()) {
 return $this->redirectResponseExternal($ffSearchResponseTransfer->getCampaignIterator()->getRedirectUrl());

 }

 $feedbackForm = $this->getFactory()
 ->createFeedbackForm();

 if (!$ffSearchResponseTransfer->getResult()) {
 $this->addErrorMessage('Search is not available at the moment');
 }

 return [
 'searchResponse' => $ffSearchResponseTransfer,
 'pagingRote' => 'fact-finder',
 'lang' => Store::getInstance()->getCurrentLanguage(),
 'query' => isset($requestArray['query']) ? $requestArray['query'] : '',
 'page' => isset($requestArray['page']) ? $requestArray['page'] : '',
 'feedbackForm' => $feedbackForm->createView(),
 ];
 }

...
```

The FactFinder module includes templates. Templates can be used for changing the default partial templates in the following way:

In `src/Pyz/Yves/Catalog/Theme/default/catalog/catalog.twig` you can put:

```php
{% raw %}{%{% endraw %} include '@FactFinder/layout/catalog/filters.twig' with {
 afterSearchNavigation: factFinderSearchResponse.getAfterSearchNavigation
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} include '@FactFinder/layout/partials/sort.twig' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} include '@FactFinder/search/partials/pagination.twig' with {
 showAlwaysFirstAndLast: true
 } {% raw %}%}{% endraw %}
```

According to the template examples, you can set up default demoshop template for using FACT-Finder responses.

## After Search

`FactFinderSdkSearchResponseTransfer` has campaign iterator, bread crumbs, paging, search result, sorting parameters, result per page option, filter groups.

You can build any front end and templates using those options in the response transfer object.

### Filter Groups

Default settings in the FACT-Finder admin panel are:

For categories filter:

* Source field -`CategoryPath`
* Field type -`CategoryPath`

For price filter:

* Source field - Price
* Field type - Number
* Range type - Slider

For stock filter:

* Source field - Stock
* Field type - Text
* Selection Type - Multi-select

Filter groups have the following options (name - type):

* filters -`FactFinderSdkDataFilter[]`
* name - string
* `detailedLinkCount` - int
* unit - string
* `isRegularStyle` - bool
* `isSliderStyle` - bool
* `isTreeStyle` - bool
* `isMultiSelectStyle` - bool
* `hasPreviewImages` - bool
* `hasSelectedItems` - bool
* `isSingleHideUnselectedType` - bool
* `isSingleShowUnselectedType` - bool
* `isMultiSelectOrType` - bool
* `isMultiSelectAndType` - bool
* `isTextType` - bool
* `isNumberType` - bool

Filter has the following options (name - type):

* item -`FactFinderSdkDataItem`
* `fieldName` - string
* `matchCount` - int
* `clusterLevel` - int
* `previewImage` - string
* `hasPreviewImage` - bool
* `absoluteMinimum` - string
* `absoluteMaximum` - string
* `selectedMinimum` - string
* `selectedMaximum` - string

### Bread Crumbs

Bread crumbs have following options (name - type):

* item -`FactFinderSdkDataItem`
* `isSearchBreadCrumb` - bool
* `isFilterBreadCrumb` - bool
* `fieldName` - string

### Paging

Paging has the following options (name - type):

* `pageCount` - int
* `firstPage` -`FactFinderSdkDataPage`
* `lastPage` -`FactFinderSdkDataPage`
* `previousPage` -`FactFinderSdkDataPage`
* `currentPage` -`FactFinderSdkDataPage`
* `nextPage` -`FactFinderSdkDataPage`

Data page has the following options (name - type):

* item -`FactFinderSdkDataItem`
* `pageNumber` - int

Data item has the following options (name - type):

* label - string
* url - string
* selected - bool

### Sorting Options

Is array of data items.
