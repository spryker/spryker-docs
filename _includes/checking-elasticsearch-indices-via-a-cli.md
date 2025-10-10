### Check Elasticsearch connection details

Check `SPRYKER_SEARCH_HOST` and `SPRYKER_SEARCH_PORT` values as follows:

{% include checking-a-service-connection-configuration.md %}

### Check the health and status of Elasticsearch indices

1. Connect to the environment's VPN.

2. Set the variables:

```
SPRYKER_SEARCH_HOST={VALUE_FROM_THE_CONNECTION_CONFIGURATION}
SPRYKER_SEARCH_PORT={VALUE_FROM_THE_CONNECTION_CONFIGURATION}
```

3. Display the status of indices:

```
curl -s "$SPRYKER_SEARCH_HOST:$SPRYKER_SEARCH_PORT/_cat/indices/*?v=true&s=index"
```

4. In the output, check the following:

- `health` is `green` or `yellow`.
- `status` is `open`.

![elasticsearch-indices](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-elasticsearch-indices-via-a-cli.md/elasticsearch-indices.png)
