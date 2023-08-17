---
title: Configuring Glue for cross-origin requests
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-configuring-glue-for-cross-origin-requests-201903
originalArticleId: 340bd1d9-3055-488a-81e0-aad02e5c5220
redirect_from:
  - /2021080/docs/ht-configuring-glue-for-cross-origin-requests-201903
  - /2021080/docs/en/ht-configuring-glue-for-cross-origin-requests-201903
  - /docs/ht-configuring-glue-for-cross-origin-requests-201903
  - /docs/en/ht-configuring-glue-for-cross-origin-requests-201903
  - /v6/docs/ht-configuring-glue-for-cross-origin-requests-201903
  - /v6/docs/en/ht-configuring-glue-for-cross-origin-requests-201903
  - /v5/docs/ht-configuring-glue-for-cross-origin-requests-201903
  - /v5/docs/en/ht-configuring-glue-for-cross-origin-requests-201903
  - /v4/docs/ht-configuring-glue-for-cross-origin-requests-201903
  - /v4/docs/en/ht-configuring-glue-for-cross-origin-requests-201903
  - /v3/docs/ht-configuring-glue-for-cross-origin-requests-201903
  - /v3/docs/en/ht-configuring-glue-for-cross-origin-requests-201903
  - /v2/docs/ht-configuring-glue-for-cross-origin-requests-201903
  - /v2/docs/en/ht-configuring-glue-for-cross-origin-requests-201903
---

By default, Glue REST API is configured to run using the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy), which remains the recommended default security level for web applications. However, taking into account that requests to Glue REST API can originate from touchpoints located across multiple domains, we made it possible to enable *Cross-Origin Resource Sharing* (CORS) in Glue. When CORS is enabled, Glue REST API can accept requests from a list of allowed origins or any origin, depending on the configuration.

To enable CORS support in Glue, follow the Installation Guide.

## Configure CORS behavior

CORS is configured in Spryker Glue using `deploy.yml` file. For example, you can configure different lists of allowed origins for the `http://glue.de.mysprykershop.com` and `http://glue.at.mysprykershop.com` domains.

To configure CORS behavior, follow these steps:

1. Open the necessary configuration file depending on which CORS configuration you want to set up.
2. Modify the value of `cors-allow-origin`.

    ```yml
    glue_eu:
        application: glue
        endpoints:
            glue.de.mysprykershop.com:
                store: DE
                cors-allow-origin: 'http://cors-allow-origin1.domain'
                cors-allow-headers: "accept,content-type,content-language,accept-language,authorization,User-Agent,newrelic,traceparent,tracestate"
            glue.at.mysprykershop.com:
                store: AT
                cors-allow-origin: 'http://cors-allow-origin2.domain'
                cors-allow-headers: "accept,content-type,content-language,accept-language,authorization,If-Match,Cache-Control,If-Modified-Since,User-Agent,newrelic,traceparent,tracestate,X-Device-Id"
    ```

    You can set its value as follows:
    
    * CORS is disabled. Example:

    ```yml
    glue_eu:
        application: glue
        endpoints:
            glue.de.mysprykershop.com:
                store: DE
            glue.at.mysprykershop.com:
                store: AT
    ```

    *  `*`: allow CORS requests from any domain. Example:

    ```yml
        glue_eu:
        application: glue
        endpoints:
            glue.de.mysprykershop.com:
                store: DE
                cors-allow-origin: '*'
            glue.at.mysprykershop.com:
                store: AT
                cors-allow-origin: '*'
    ```

    * `http://www.example1.com`: allow CORS requests only from the specified origin. Example:

    ```yml
        glue_eu:
        application: glue
        endpoints:
            glue.de.mysprykershop.com:
                store: DE
                cors-allow-origin: 'http://www.example1.com'
            glue.at.mysprykershop.com:
                store: AT
                cors-allow-origin: 'http://www.example1.com'
    ```

3. Save the file.

## Verify the configuration

To verify that the configuration has been completed successfully, make an _OPTIONS_ pre-flight request to any valid Glue resource with the correct `Origin` header, for example, `http://www.example1.com`, and make sure the following:

* The `Access-Control-Allow-Origin` header is present and is the same as set in the configuration.
* The `Access-Control-Allow-Methods` header is present and contains all available REST methods.

```bash
curl -X OPTIONS -H "Origin: http://www.example1.com" -i http://glue.de.mysprykershop.com
```

```bash
Content-Type: text/plain; charset=utf-8
Content-Length: 0
Connection: keep-alive
Access-Control-Http-Origin: http://www.example1.com
Access-Control-Allow-Origin: http://www.example1.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
Access-Control-Allow-Headers: accept,content-type,content-language,accept-language,authorization,X-Anonymous-Customer-Unique-Id,Merchant-Reference,If-Match,Cache-Control,If-Modified-Since,User-Agent,newrelic,traceparent,tracestate
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: ETag
```
