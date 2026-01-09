The Spryker Middleware powered by Alumio is a cloud-based integration Platform as a Service (iPaaS). It lets you exchange data between your Spryker system and third-party systems via a user-friendly interface.
The Spryker Middleware Powered by Alumio isn't a part of SCCOS by default. To obtain it, reach out to [Spryker support](https://spryker.com/support/). To connect the Spryker Middleware powered by Alumio with SCCOS, you need to have the [Data Exchange API feature](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api-inventory-management-feature.html) in your environment.

{% info_block infoBox "Alumio" %}

Alumio is a cloud-based iPaaS solution which is the foundation of Spryker Middleware and Spryker Integration Apps. Alumio has integrations or connectors with several solutions in its marketplace allowing to connect Spryker with other systems.

{% endinfo_block %}

With the Spryker Middleware powered by Alumio, the data exchange process looks like this:

1. Transfer of data from the source system via the API connector. The data is transferred in real-time, which ensures that the data is always current across all integrated platforms.
2. Data is fed into Alumio and transformed there.
3. Transfer of data to the target system via the API connector.

The Spryker Middleware powered by Alumio is the foundation of the Spryker Integration Apps. You can also use it to build [custom integrations](/docs/pbc/all/data-exchange/{{page.version}}/data-exchange.html#custom-integrations-with-alumio-connectors).
