---
title: Zed API resources
originalLink: https://documentation.spryker.com/v6/docs/zed-api-resources
redirect_from:
  - /v6/docs/zed-api-resources
  - /v6/docs/en/zed-api-resources
---

Each module can have a “{module}Api” module(e.g. CustomerApi for Customer). Such an API module exposes CRUD facade methods (find, get, add, update, remove) that can be mapped to a URL via REST `resource/action` resolution.

The main `Api` module contains a dispatcher that delegates to those API module via resource map and returns the response in the expected format.

## URI, Action and Facade Method

The following table is a quick overview for the different CRUD operations the API can perform out of the box:

| HTTP Method | Meaning	 | URI | ApiResourcePlugin method |
| --- | --- | --- | --- |
| GET | index/paginate read | /<br/>/{slug/id} | find($apiRequestTransfer)<br/>get($id, $apiFilterTransfer) |
| POST | create	 | / | add($apiDataTransfer) |
| PATCH	 | update | /{slug/id} | update($id, $apiDataTransfer) |
| DELETE | delete | /{slug/id} | remove($id) |

We do not use PUT as replacing on a REST level can lead to more dangers.

There is one special HTTP method OPTIONS which can be used to determine the accepted HTTP methods for this resource URL.

This one will not have a body and return a 200 response. Check the headers for an `Accept` header with a comma separated list of methods.

## BundleApi Module

Each resource can be mapped to the following facade methods:

| Meaning | Facade method signature | Facade return type |
| --- | --- | --- |
| index/paginate | findFoos($apiRequestTransfer)	 | ApiCollectionTransfer |
| read	 | getFoo($id, $apiFilterTransfer) | ApiItemTransfer |
| create | 	addFoo($apiDataTransfer) | ApiItemTransfer |
| update | updateFoo($id, $apiDataTransfer) | ApiItemTransfer |
| delete | removeFoo($id) | ApiItemTransfer |

## Request Format

The Spryker API by default uses JSON. If you do not specify an extension in the URL, it will by default expect and return JSON.

## Request Format

The Spryker API by default uses JSON. If you do not specify an extension in the URL, it will by default expect and return JSON.

```json
{
    "code": 200,
    "message": null,
    "data": {
        ...
    }
}
```
Error responses are usually 4xx or 5xx codes, they contain an error message instead of the data:

```json
{
    "code": 404,
    "message": "Resource not found",
    "data": [],
    "_stackTrace": ...
}
```

### Collection vs Item
An index action in CRUD usually displays a collection of a resource. The same is true for our API. A “GET” call to the resource endpoint “/customers” then returns a collection. A “GET” call to “/customers/{id}” returns a single item of that resource.

The “find” action returns a collection, for JSON format this will be an array of arrays:

```json
"data": [
    {
        "id_customer" => 1,
        ...
    },
    ...
]
```

The “get”, “add” and “update” actions return a single item:

```json
"data": {
    "id_customer" => 1,
    ...
}
```

