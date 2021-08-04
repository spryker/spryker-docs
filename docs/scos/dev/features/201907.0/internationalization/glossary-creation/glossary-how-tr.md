---
title: How Translations are Managed
originalLink: https://documentation.spryker.com/v3/docs/glossary-how-translations-managed
redirect_from:
  - /v3/docs/glossary-how-translations-managed
  - /v3/docs/en/glossary-how-translations-managed
---

The key concept for rendering web pages with translated content very fast and with limited resource usage is using a key-value storage.

Yves has no connection to Zed’s SQL database and it fetches all dynamic data from a key-value storage(Redis) and a search engine(Elasticsearch). This data contains translations but also product information, product categories, URL mappings, stock information, image paths.

Accessing the key-value storage (Redis) is faster than making a request to Zed’s SQL database. Also, by limiting the connections to the SQL database, the performance of the entire application is optimized.

The localized content is added by using Zed’s Back Office user interface. For every configured locale, the Back Office user can add the corresponding resource such as translations or path to images. The changes are updated in the Zed’s SQL database.

The diagram bellow pictures the DB schema for the tables in which the translations are being stored.
![Database schema with translations stored](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Internationalization/Glossary/How+Translations+are+Managed/glossary_kv_and_db.png){height="" width=""}

When the web application is first installed, the data stored in the Zed’s database is exported in the key-value storage (Redis) used by Yves. To assure that the key-value storage is in sync with the data stored in the SQL database, Queue processes will consume translation events and publish the data to key -value storage (Redis). These events will be triggered when a translation is created, updated or deleted. There is also a command that can be used for triggering the events manually in case of data refreshment:

`console event:trigger -r translation`
If you lost your storage data, you can sync the published data to storage by calling this command:

`console sync:data translation`

The schema bellow summarizes the levels of persistence used in order to offer localized content into the front office interface ( Yves ).
![Levels of persistence](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Internationalization/Glossary/How+Translations+are+Managed/glossarykeyspersistence.png){height="" width=""}

## Command Query Separation
We can consider the key-value storage as a denormalized model of the relational model stored in the Sql database and the request of rendering a page as a query that the user makes. Statistically, query requests are happening a lot more often than command requests ( such as checkout or submitting a payment) and using a dedicated storage for them brings a lot of speed in the application.

Another advantage of using a denormalized model for displaying localized content is that we don’t have to do the transformations of the objects stored in the relational database when using them on the client side logic.

<!-- Last review date: Apr 4, 2019 by Ehsan Zanjani -->
