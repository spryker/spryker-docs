By default, Glue REST API is configured to run using the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy), which remains the recommended default security level for web applications. However, if requests to Glue API originate from touchpoints located across multiple domains, you can enable *Cross-Origin Resource Sharing* (CORS). When CORS is enabled, Glue API can accept requests from a list of allowed origins or any origin, depending on the configuration.


## Configure CORS

To configure CORS, edit the needed deploy file. Example:

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

 Configuration options:

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

* `{ORIGIN}: allow CORS requests only from the specified origin. Example:

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

## Verify the CORS configuration

1. Make an _OPTIONS_ pre-flight request to any valid Glue API resource with the correct `Origin` header, for example, `http://www.example1.com`:

```bash
curl -X OPTIONS -H "Origin: http://www.example1.com" -i http://glue.de.mysprykershop.com
```

2. Check that the response contains the following:

* The `Access-Control-Allow-Origin` header is the same as set in the configuration.
* The `Access-Control-Allow-Methods` header contains all available REST methods.

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