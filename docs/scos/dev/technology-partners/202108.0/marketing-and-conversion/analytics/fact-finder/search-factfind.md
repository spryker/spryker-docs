---
title: FACT-Finder - Suggest
originalLink: https://documentation.spryker.com/2021080/docs/search-factfinder-suggest
redirect_from:
  - /2021080/docs/search-factfinder-suggest
  - /2021080/docs/en/search-factfinder-suggest
---

## Prerequisites

The FACT-Finder Suggest module enables you to provide customers with suggested search terms while they are entering a search term. In this way, users do not necessarily have to enter the entire search term themselves but can choose a suggestion. As the users are presented with similar search queries, it enables them to select a suitable, more precise search term and save time when searching. The FACT-Finder Suggest entries are provided by the product information in the Search database as well as from the recent frequently searched and found search terms. The suggestions in this database are no longer linked to the data in the product database, which is why filtering by attributes (such as category) is unfortunately not possible by default.

## Usage

To check example implementation, please see  [Fact Finder - Search Integration](/docs/scos/dev/technology-partners/202001.0/marketing-and-conversion/analytics/fact-finder/search-factfind). Typing in a search box triggers an API suggest request. By default , use `/fact-finder/suggestions` to get suggestions. Or you can use the `FactFinderSdk` module to make a suggest request.

It will return a `FactFinderSdkSuggestResponseTransfer` object that contains an array of suggestions.

Basic parameters:

* `query` - Query text.
* `sid` - FACT-Finder session id.

Controller example:
```php
<?php

...

/**
 * @param \Symfony\Component\HttpFoundation\Request $request
 *
 * @return \Symfony\Component\HttpFoundation\JsonResponse
 */
public function indexAction(Request $request)
{
 $factFinderSuggestRequestTransfer = new FactFinderSdkSuggestRequestTransfer();
 $query = $request->query->get('query', '*');

 $factFinderSuggestRequestTransfer->setQuery($query);
 $factFinderSuggestRequestTransfer->setSid($request->cookies->get(FactFinderConstants::COOKIE_SID_NAME));

 $response = $this->getFactory()
 ->getFactFinderClient()
 ->getSuggestions($factFinderSuggestRequestTransfer);

 return $this->jsonResponse($response->getSuggestions());
}

...
```

`FactFinderSdkSuggestResponse` has array with suggests. FACT-Finder supports multiple suggest types.
The standard types are: Product name, Manufacturer, Category, Search term. We have created suggestion for Product name, Category, Search term, Brand in our demo.
