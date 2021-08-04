---
title: Zed API (BETA)
originalLink: https://documentation.spryker.com/v1/docs/zed-api
redirect_from:
  - /v1/docs/zed-api
  - /v1/docs/en/zed-api
---

The Spryker OS offers a flexible REST API for Zed. It maps basic REST functionality to the persistence layer of the Spryker backend.

By default, the API accepts and returns JSON as format. But it can be extended to work with any format. As for JSON, the API specification is close to JSON API standard 1.0, with a few small differences, mainly where the Spryker API is a bit more allowing.

{% info_block infoBox "BETA version " %}
This module is still in development. For questions and inquiries please contact [academy@spryker.com](academy@spryker.com
{% endinfo_block %})

## Meta Information
Links as part of the meta information will be part of the response on the same level as the data:

```JS
{
    "data": ...,
    "links": [
        "self" => ...                         
        ...
    ],
    ...
}
```

“self” URIs are included, for example for adding an item.

## Logging
By default all incoming requests and outgoing responses will be logged as “info” level.

## Security Recommendations
Secure the API with a token system (e.g. JWT) and also apply basic API Rate Limiting, e.g. using X-Rate-Limit-Limit header. You can add your custom ServiceProvider in the mentioned stack above.

For CORS you should add a ServiceProvider.

{% info_block infoBox %}
To protect your ZED server, a setup must include the use of VPN, BasicAuth or IP whitelisting.
{% endinfo_block %}

## Overriding the HTTP Method
Some HTTP clients can only work with simple GET and POST requests. To increase accessibility to these limited clients, the API as well as Spryker in general provides override functionality for the HTTP method. It accepts a request header X-HTTP-Method-Override with a string value containing one of PUT, PATCH or DELETE. Silex provides this for us internally.

{% info_block warningBox %}
The override header is only accepted on POST requests. GET requests should never change data on the server.
{% endinfo_block %}

## JSON Encoding
The Spryker UtilEncoding module provides a service and by default ships with the following flags enabled:

```
JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT | 
JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_PRETTY_PRINT
```

## HTTP Status Codes

* 200 OK - Response to a successful GET, PUT, PATCH or DELETE. Can also be used for a POST that doesn’t result in a creation.
* 201 Created - Response to a POST that results in a creation. The resulting item will be returned.
* 204 No Content - Response to a successful request that won’t be returning a body (like a DELETE request).
* 206 Partial Content - When paginating a collection with more than a single page.
* 304 Not Modified - Used when HTTP caching headers are in play.
* 400 Bad Request - The request is malformed, such as if the body does not parse.
* 401 Unauthorized - When no or invalid authentication details are provided. Also useful to trigger an auth popup if the API is used from a browser.
* 403 Forbidden - When authentication succeeded but authenticated user doesn’t have access to the resource.
* 404 Not Found - When a non-existent resource is requested.
* 405 Method Not Allowed - When an HTTP method is being requested that isn’t allowed for the authenticated user. 410 Gone - Indicates that the resource at this end point is no longer available. Useful as a blanket response for old API versions.
* 415 Unsupported Media Type - If incorrect content type was provided as part of the request.
* 422 Unprocessable Entity - Used for validation errors.
* 429 Too Many Requests - When a request is rejected due to rate limiting.
* 500 Internal Server Error - An internal error of the API. Something is broken.

## Development Tools
We recommend using [Postman](https://www.getpostman.com/) to import resource endpoints and to send API requests. This allows testing the functionality including request type, headers and post data. It is fairly easy to use and provides a visually very clean output.

## ToDos
The next pre-release is planned to contain the following:

* Auth layer (e.g. basic token auth)
* API docs parsing and an overview at http://zed.de.demoshop.local/api of all resource endpoints
* Better abstraction and invertion of control for {module}Api code via ApiQueryBuilder module
* Useful customer feedback/requests

<!--
**See also:**

* Configure Zed API
* Learn about Zed API CRUD functions
* Zed API Processor Stack
* Implement Zed API
* Learn about Zed API resources
 -->
